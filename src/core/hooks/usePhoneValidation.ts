import { useState, useRef, useEffect } from 'react';
import { validateField, normalizePhoneNumber } from '../utils/validation';
import { getSessionData, storeValidation } from '../utils/session';
import { config } from '../../config/environment.config';

interface PhoneValidationState {
  loading: boolean;
  status: 'valid' | 'invalid' | null;
  error: string | null;
  message?: string;
  phoneType?: string;
}

type WorkflowStage = 'not_validated' | 'otp_sent' | 'otp_verified';

interface UsePhoneValidationReturn {
  value: string;
  validationState: PhoneValidationState;
  workflowStage: WorkflowStage;
  handleChange: (newValue: string) => void;
  handleSendOTP: () => Promise<void>;
  handleVerifyOTP: (code: string) => Promise<{ success: boolean; message?: string }>;
  isValid: boolean;
  isTyping: boolean;
}

export const usePhoneValidation = (initialValue: string = ''): UsePhoneValidationReturn => {
  const [value, setValue] = useState(initialValue);
  const [validationState, setValidationState] = useState<PhoneValidationState>({
    loading: false,
    status: null,
    error: null
  });
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>('not_validated');
  const [isTyping, setIsTyping] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const validationTimeout = useRef<NodeJS.Timeout | null>(null);
  const validationInProgress = useRef(false);
  const lastValidatedValue = useRef<string>('');

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    return () => {
      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
      }
    };
  }, []);

  const validatePhone = async (phone: string) => {
    const cleaned = normalizePhoneNumber(phone);

    if (cleaned.length !== 10) {
      setValidationState({
        loading: false,
        status: null,
        error: null,
        message: cleaned.length > 0 ? 'Please enter a complete mobile phone number (10 digits)' : undefined
      });
      setIsTyping(false);
      return;
    }

    if (validationInProgress.current) {
      console.log('Phone validation already in progress, skipping duplicate call');
      return;
    }

    if (cleaned === lastValidatedValue.current) {
      console.log('Phone already validated in this session, skipping duplicate call');
      return;
    }

    console.log('Validating phone via API:', cleaned);

    validationInProgress.current = true;
    setValidationState({ loading: true, status: null, error: null });

    try {
      const sessionData = getSessionData();

      const phoneStep = {
        id: 'phone',
        validation: {
          apiEndpoint: config.api.phoneValidation,
          mockDelay: 1500,
          message: 'Please enter a valid mobile phone number'
        }
      };

      const result = await validateField(phoneStep, cleaned, sessionData);

      validationInProgress.current = false;

      const otpRequired = result.otp_required || result.data?.otp_required;

      if (otpRequired) {
        lastValidatedValue.current = cleaned;

        setValidationState({
          loading: false,
          status: 'otp_sent',
          error: null,
          message: result.message || 'Verification code sent',
          phoneType: result.data?.phone_type
        });
        setWorkflowStage('otp_sent');
        setIsTyping(false);
      } else if (result.valid) {
        lastValidatedValue.current = cleaned;

        setValidationState({
          loading: false,
          status: 'valid',
          error: null,
          message: 'Phone number verified',
          phoneType: result.data?.phone_type
        });
        setWorkflowStage('otp_verified');
        setIsTyping(false);
        storeValidation('phone', result.data || result);
      } else {
        setValidationState({
          loading: false,
          status: 'invalid',
          error: null,
          message: result.error || 'Please enter a valid mobile phone number'
        });
        setWorkflowStage('not_validated');
        setIsTyping(false);
      }
    } catch (error) {
      validationInProgress.current = false;

      setValidationState({
        loading: false,
        status: 'invalid',
        error: null,
        message: 'Unable to validate mobile phone number. Please try again.'
      });
      setWorkflowStage('not_validated');
      setIsTyping(false);
    }
  };

  const handleChange = (newValue: string) => {
    const cleaned = newValue.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      let formatted: string;
      if (cleaned.length > 6) {
        formatted = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6);
      } else if (cleaned.length > 3) {
        formatted = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3);
      } else {
        formatted = cleaned;
      }
      setValue(formatted);

      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
        validationTimeout.current = null;
      }

      lastValidatedValue.current = '';

      setValidationState({ loading: false, status: null, error: null });
      setWorkflowStage('not_validated');

      if (cleaned.length === 0) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setValidationState({ loading: true, status: null, error: null });

      if (cleaned.length > 0) {
        validationTimeout.current = setTimeout(() => {
          if (cleaned.length < 10) {
            setValidationState({
              loading: false,
              status: null,
              error: 'We are expecting 10 digits',
              message: 'We are expecting 10 digits'
            });
            setIsTyping(false);
          } else {
            validatePhone(formatted);
          }
        }, 1200);
      }
    }
  };

  const handleSendOTP = async () => {
    const cleaned = normalizePhoneNumber(value);
    setSendingOTP(true);

    try {
      const sessionData = getSessionData();

      const response = await fetch(config.api.sendOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sessionData,
          phone: cleaned
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.data?.success || result.data?.status === 'sent' || result.success || result.status === 'sent') {
        setWorkflowStage('otp_sent');
        setValidationState(prev => ({
          ...prev,
          status: 'otp_sent',
          error: null,
          message: 'Verification code sent'
        }));
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      alert('Failed to send verification code. Please try again.');
    } finally {
      setSendingOTP(false);
    }
  };

  const handleVerifyOTP = async (code: string): Promise<{ success: boolean; message?: string }> => {
    const cleaned = normalizePhoneNumber(value);

    try {
      const sessionData = getSessionData();

      const response = await fetch(config.api.verifyOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sessionData,
          phone: cleaned,
          otp: code
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success || result.status === 'approved' || result.status === 'valid' || result.data?.success || result.data?.status === 'approved') {
        setValidationState({
          loading: false,
          status: 'valid',
          error: null,
          message: 'Phone verified successfully'
        });
        setWorkflowStage('otp_verified');
        storeValidation('phone', { status: 'valid', verified: true, ...result });
        return { success: true };
      }

      return { success: false, message: result.message || 'Invalid code' };
    } catch (error) {
      return { success: false, message: 'Verification failed' };
    }
  };

  return {
    value,
    validationState,
    workflowStage,
    handleChange,
    handleSendOTP,
    handleVerifyOTP,
    isValid: validationState.status === 'valid',
    isTyping
  };
};
