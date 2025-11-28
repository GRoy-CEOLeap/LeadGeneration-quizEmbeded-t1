import { config } from '../../config/environment.config';
import { reportError } from './errorHandler';
import { getSessionData, storeValidation } from './session';

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const normalizePhoneNumber = (phone: string): string => {
  let normalized = phone.trim();

  if (normalized.startsWith('+1')) {
    normalized = normalized.substring(2).trim();
  } else if (normalized.startsWith('1') && normalized.length === 11) {
    normalized = normalized.substring(1);
  }

  return normalized.replace(/\D/g, '');
};

// Blacklisted ZIP patterns
const INVALID_ZIP_PATTERNS = [
  '00000', '11111', '22222', '33333', '44444', 
  '55555', '66666', '77777', '88888',
  '12345', '54321', '98765', '56789',
  '12121', '98989', '10101'
];

// Test ZIPs allowed in development
const TEST_ZIP_WHITELIST = ['99999'];

export const isBlacklistedZIP = (zip: string): boolean => {
  const isDev = import.meta.env.VITE_ENV === 'development';
  
  // Allow test ZIPs in development
  if (isDev && TEST_ZIP_WHITELIST.includes(zip)) {
    return false;
  }
  
  // Check blacklist
  if (INVALID_ZIP_PATTERNS.includes(zip)) {
    return true;
  }
  
  return false;
};

export const validateZIP = (zip: string): boolean => {
  // Check format first
  if (!/^\d{5}$/.test(zip)) {
    return false;
  }
  // Then check blacklist
  return !isBlacklistedZIP(zip);
};

export const validateField = async (step: any, value: any, sessionData: any) => {
  // Quick fail for blacklisted ZIPs before any API call
  if (step.id === 'zip' && isBlacklistedZIP(value)) {
    await sleep(step.validation?.mockDelay || 1500); // Still show loading for UX
    return { 
      valid: false, 
      error: 'Please enter a valid ZIP code',
      data: null 
    };
  }

  // Determine the correct API endpoint based on step ID
  let apiEndpoint = step.validation?.apiEndpoint;
  
  if (step.id === 'zip') {
    apiEndpoint = config.api.zipValidation;
  } else if (step.id === 'email') {
    apiEndpoint = config.api.emailValidation;
  } else if (step.id === 'phone') {
    apiEndpoint = config.api.phoneValidation;
  }
  
  if (!apiEndpoint) {
    console.error(`No endpoint configured for ${step.id} validation`);
    return { 
      valid: false, 
      error: 'Validation not configured',
      data: null 
    };
  }
  
  if (apiEndpoint) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const normalizedValue = step.id === 'phone' ? normalizePhoneNumber(value) : value;

      // Send complete session data to validation endpoint
      const requestBody: any = {
        ...sessionData
      };

      // Add the field-specific value as a top-level property for easy access
      requestBody[step.id] = normalizedValue;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle new response format for validation endpoints
      if (step.id === 'zip' || step.id === 'email' || step.id === 'phone') {
        console.log('Raw API response:', data);

        // Handle both response structures
        // Some endpoints return {status: "valid"} at root
        // Others return {data: {status: "valid"}}
        const status = data.status || data.data?.status;
        const message = data.message || data.data?.message;

        // For phone validation, extract additional metadata from nested data object
        const responseData = data.data || data;
        const phoneType = responseData.phone_type;
        const phoneLocation = responseData.phone_location;
        const validationDate = responseData.validation_date;
        const otpRequired = responseData.otp_required || data.otp_required;

        if (status === 'valid') {
          const result = {
            valid: true,
            error: null,
            data: data.data || data, // Use nested data if available
            message: message,
            otp_required: otpRequired,
            // Include phone metadata if present
            ...(phoneType && { phone_type: phoneType }),
            ...(phoneLocation && { phone_location: phoneLocation }),
            ...(validationDate && { validation_date: validationDate }),
            ...data
          };
          console.log('Validation result for', step.id, ':', result);
          return result;
        } else if (status === 'invalid') {
          const result = {
            valid: false,
            error: message || 'Validation failed',
            data: data.data || null,
            message: message,
            ...data
          };
          console.log('Validation result for', step.id, ':', result);
          return result;
        } else {
          // No valid status found
          const result = {
            valid: false,
            error: message || 'Validation failed',
            data: null,
            message: message,
            ...data
          };
          console.log('Validation result for', step.id, ':', result);
          return result;
        }
      } else {
        // Original format for other endpoints
        if (data.response === 'success') {
          return { valid: true, data: data.additionalData };
        } else {
          return { valid: false, error: data.message || 'Validation failed' };
        }
      }
    } catch (error: any) {
      // Report to error webhook if available
      if (config.api.errorReporting) {
        await reportError(error as Error, {
          type: `${step.id}_validation_timeout`,
          message: error.name === 'AbortError' ? 'Validation timeout' : error.message,
          details: {
            field: step.id,
            endpoint: apiEndpoint
          }
        });
      }
      
      // Fall back to local validation
      await sleep(step.validation?.mockDelay || 1500);
      return validateLocally(step, value);
    }
  } else {
    // No API endpoint configured - use local validation
    await sleep(step.validation?.mockDelay || 1500);
    return validateLocally(step, value);
  }
};

const validateLocally = (step: any, value: any) => {
  if (step.id === 'zip') {
    const valid = validateZIP(value);
    return {
      valid,
      error: valid ? null : step.validation?.message || 'Please enter a valid ZIP code'
    };
  }
  
  if (step.id === 'email') {
    const valid = validateEmail(value);
    return {
      valid,
      error: valid ? null : 'Please enter a valid email address'
    };
  }
  
  if (step.id === 'phone') {
    const valid = validatePhone(value);
    return {
      valid,
      error: valid ? null : 'Please enter a valid mobile phone number'
    };
  }
  
  if (step.validation?.pattern) {
    const valid = step.validation.pattern.test(value);
    return {
      valid,
      error: valid ? null : step.validation.message
    };
  }
  
  return { valid: true };
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(normalizePhoneNumber(phone));
};

export const validateName = (name: string): { valid: boolean; error: string | null } => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { valid: false, error: null };
  }

  const letterCount = trimmedName.replace(/[^a-zA-Z]/g, '').length;

  if (letterCount < 3) {
    return { valid: false, error: 'Please enter at least 3 letters' };
  }

  return { valid: true, error: null };
};