// Session Management Utilities
import { SessionData } from '../types/quiz.types';
import { normalizePhoneNumber } from './validation';
import { getStateName } from './stateMapping';

// Generate unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize session data structure
const initializeSession = (): SessionData => {
  // Capture URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};

  // Capture all query parameters
  urlParams.forEach((value, key) => {
    utmData[key] = value;
  });

  const session: SessionData = {
    session_id: generateSessionId(),
    landing_page: window.location.href,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    quiz_answers: {},
    form_fields: {},
    validations: {},
    compliance: {},
    utm: utmData,
    ip_address: null,
    user_agent: navigator.userAgent,
    qualification_status: null,
    disqualification_reasons: []
  };

  // Store in sessionStorage immediately
  sessionStorage.setItem('quiz_session', JSON.stringify(session));

  return session;
};

// Get session data from storage
export const getSessionData = (): SessionData => {
  try {
    const stored = sessionStorage.getItem('quiz_session');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse session data:', error);
  }
  
  // Initialize new session if none exists or parsing failed
  const newSession = initializeSession();
  sessionStorage.setItem('quiz_session', JSON.stringify(newSession));
  return newSession;
};

// Evaluate qualification status based on answers
const evaluateQualification = (session: SessionData): void => {
  const disqualifyingAnswers = [
    { questionId: 'accident_timing', value: '12_24_months', reason: 'Accident occurred 12-24 months ago' },
    { questionId: 'accident_timing', value: '24_months_plus', reason: 'Accident occurred 24+ months ago' },
    { questionId: 'at_fault', value: 'yes', reason: 'User was found at fault for the accident' },
    { questionId: 'medical_treatment_required', value: 'no', reason: 'No medical treatment required' },
    { questionId: 'attorney_status', value: 'yes', reason: 'User already has legal representation' },
  ];

  const reasons: string[] = [];
  let isDisqualified = false;

  disqualifyingAnswers.forEach(({ questionId, value, reason }) => {
    if (session.quiz_answers[questionId] === value) {
      isDisqualified = true;
      reasons.push(reason);
    }
  });

  session.qualification_status = isDisqualified ? 'unqualified' : 'qualified';
  session.disqualification_reasons = reasons;
};

// Store quiz answer
export const storeQuizAnswer = (questionId: string, answer: any): void => {
  try {
    const session = getSessionData();
    session.quiz_answers[questionId] = answer;

    // Evaluate qualification after storing answer
    evaluateQualification(session);

    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store quiz answer:', error);
  }
};

// Store validation result
export const storeValidation = (field: string, validationResult: any): void => {
  try {
    const session = getSessionData();
    session.validations[field] = validationResult;
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store validation:', error);
  }
};

// Store form field data
export const storeFormField = (field: string, value: any): void => {
  try {
    const session = getSessionData();
    session.form_fields[field] = value;
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store form field:', error);
  }
};

// Store compliance data
export const storeComplianceData = (data: Record<string, any>): void => {
  try {
    const session = getSessionData();
    session.compliance = {
      ...session.compliance,
      ...data
    };
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store compliance data:', error);
  }
};

// Store TCPA consent
export const storeTCPAConsent = (tcpaText: string, agreed: boolean = true): void => {
  try {
    const session = getSessionData();
    session.compliance = {
      ...session.compliance,
      tcpa_agreed: agreed,
      tcpa_timestamp: new Date().toISOString(),
      tcpa_text: tcpaText,
      tcpa_version: '2025-01'
    };
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store TCPA consent:', error);
  }
};

// Store quiz metadata (version and start time)
export const storeQuizMetadata = (version: string): void => {
  try {
    const session = getSessionData();
    if (!session.quiz_version) {
      session.quiz_version = version;
      session.quiz_started_at = new Date().toISOString();
      sessionStorage.setItem('quiz_session', JSON.stringify(session));
    }
  } catch (error) {
    console.error('Failed to store quiz metadata:', error);
  }
};

// Get final submission payload
export const getFinalSubmissionPayload = () => {
  const session = getSessionData();

  const normalizedFormFields = { ...session.form_fields };
  if (normalizedFormFields.phone) {
    normalizedFormFields.phone = normalizePhoneNumber(normalizedFormFields.phone);
  }

  // Build standardized payload structure
  // IMPORTANT: Only quiz_answers should be dynamic based on quiz config
  // All other fields maintain consistent structure
  const payload: any = {
    // Root level tracking fields
    session_id: session.session_id,
    landing_page: session.landing_page,
    referrer: session.referrer,
    timestamp: session.timestamp,
    quiz_version: session.quiz_version,
    quiz_started_at: session.quiz_started_at,

    // Dynamic quiz answers (ONLY dynamic part of payload)
    quiz_answers: session.quiz_answers,

    // Lead contact info (always first_name, last_name, email, phone)
    lead: normalizedFormFields,

    // Validations object
    validations: session.validations,

    // UTM tracking parameters
    utm: session.utm,

    // Metadata object (user_agent, ip_address only)
    metadata: {
      user_agent: session.user_agent,
      ip_address: session.ip_address
    }
  };

  // Add compliance fields at root level if present
  if (session.compliance) {
    // Jornaya LeadID
    if (session.compliance.leadid_token) {
      payload.leadid_token = session.compliance.leadid_token;
      payload.leadid_timestamp = session.compliance.leadid_timestamp;
    }

    // TrustedForm
    if (session.compliance.trusted_form_cert) {
      payload.xxTrustedFormCertUrl = session.compliance.trusted_form_cert;
    }

    // TCPA Consent object
    if (session.compliance.tcpa_agreed !== undefined) {
      payload.consent = {
        tcpa_agreed: session.compliance.tcpa_agreed,
        tcpa_timestamp: session.compliance.tcpa_timestamp,
        tcpa_text: session.compliance.tcpa_text,
        tcpa_version: session.compliance.tcpa_version
      };
    }
  }

  // Add webhook URL and execution mode if available
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Determine execution mode based on hostname
    payload.executionMode = hostname.includes('localhost') || hostname.includes('127.0.0.1') ? 'development' : 'production';
  }

  return payload;
};

// Get outcome display data from session
export const getOutcomeDisplayData = () => {
  const session = getSessionData();

  const firstName = session.form_fields?.firstName ||
                  session.form_fields?.first_name ||
                  session.quiz_answers?.firstName ||
                  session.quiz_answers?.first_name ||
                  'there';

  const lastName = session.form_fields?.lastName ||
                 session.form_fields?.last_name ||
                 session.quiz_answers?.lastName ||
                 session.quiz_answers?.last_name ||
                 '';

  const email = session.form_fields?.email || '';
  const phone = session.form_fields?.phone || '';

  const zip = session.quiz_answers?.zip || session.form_fields?.zip || '';
  const state = session.quiz_answers?.state || '';

  const city = session.validations?.zip?.data?.city ||
               session.validations?.zip?.city ||
               '';

  const stateCode = session.quiz_answers?.state || '';
  const incidentState = stateCode ? getStateName(stateCode) : '';

  const accidentDate = session.quiz_answers?.accident_date || '';
  const accidentTiming = session.quiz_answers?.accident_timing || '';
  let incidentDate = '';

  if (accidentDate && typeof accidentDate === 'string') {
    try {
      const date = new Date(accidentDate);
      if (!isNaN(date.getTime())) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        incidentDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      }
    } catch (error) {
      incidentDate = '';
    }
  }

  if (!incidentDate) {
    if (accidentDate === 'within_30_days') {
      incidentDate = 'Within 30 days';
    } else if (accidentDate === '1_6_months') {
      incidentDate = 'Between 1 and 6 months';
    } else if (accidentDate === '6_12_months') {
      incidentDate = 'Between 6 and 12 months';
    } else if (accidentDate === 'over_12_months') {
      incidentDate = 'More than 12 months';
    } else if (accidentTiming === 'within_6_months') {
      incidentDate = 'Within 6 months';
    } else if (accidentTiming === '6_12_months') {
      incidentDate = 'Between 6 and 12 months ago';
    } else if (accidentTiming === '12_24_months') {
      incidentDate = 'Between 12 and 24 months ago';
    } else if (accidentTiming === '24_months_plus') {
      incidentDate = '24 months or more ago';
    } else if (accidentTiming === 'within_2_years') {
      incidentDate = 'Within the last 2 years';
    } else if (accidentTiming === 'over_2_years') {
      incidentDate = 'Over 2 years ago';
    }
  }

  const medicalTreatment = session.quiz_answers?.medical_treatment_required || '';
  const injurySeverity = session.quiz_answers?.injury_severity || '';
  const currentPain = session.quiz_answers?.current_pain || '';
  const vehicleStatus = session.quiz_answers?.vehicle_status || '';

  let accidentType = 'Motor Vehicle Accident';
  if (injurySeverity === 'severe') {
    accidentType = 'Severe Motor Vehicle Accident';
  } else if (injurySeverity === 'moderate') {
    accidentType = 'Moderate Motor Vehicle Accident';
  } else if (injurySeverity === 'minor') {
    accidentType = 'Minor Motor Vehicle Accident';
  }

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    phone,
    zip,
    city,
    state,
    incidentState,
    accidentType,
    incidentDate,
    medicalTreatment,
    injurySeverity,
    currentPain,
    vehicleStatus,
    atFault: session.quiz_answers?.at_fault || '',
    insuranceClaim: session.quiz_answers?.insurance_claim || '',
    attorneyStatus: session.quiz_answers?.attorney_status || ''
  };
};

// Clear specific quiz answer
export const clearQuizAnswer = (questionId: string): void => {
  try {
    const session = getSessionData();
    delete session.quiz_answers[questionId];
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to clear quiz answer:', error);
  }
};

// Clear specific form field
export const clearFormField = (fieldId: string): void => {
  try {
    const session = getSessionData();
    delete session.form_fields[fieldId];
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to clear form field:', error);
  }
};

// Clear specific validation result
export const clearValidation = (fieldId: string): void => {
  try {
    const session = getSessionData();
    delete session.validations[fieldId];
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to clear validation:', error);
  }
};

// Clear question data (handles both quiz answers and form fields)
export const clearQuestionData = (questionId: string, fields: string[] = []): void => {
  try {
    const session = getSessionData();

    // Clear main question answer
    delete session.quiz_answers[questionId];

    // Clear any associated fields
    fields.forEach(fieldId => {
      delete session.quiz_answers[fieldId];
      delete session.form_fields[fieldId];
      delete session.validations[fieldId];
    });

    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to clear question data:', error);
  }
};

// Build ClickMagick parameters from session data
export const buildClickMagickParams = (): Record<string, string> => {
  const session = getSessionData();
  const params: Record<string, string> = {};

  const email = session.form_fields?.email;
  if (email) {
    params.cmc_email = email;
  }

  const phone = session.form_fields?.phone;
  if (phone) {
    params.cmc_phone = phone;
  }

  const firstName = session.form_fields?.firstName || session.form_fields?.first_name;
  if (firstName) {
    params.cmc_firstname = firstName;
  }

  const lastName = session.form_fields?.lastName || session.form_fields?.last_name;
  if (lastName) {
    params.cmc_lastname = lastName;
  }

  const city = session.validations?.zip?.data?.city || session.validations?.zip?.city;
  if (city) {
    params.cmc_city = city;
  }

  const state = session.validations?.zip?.data?.state || session.validations?.zip?.state;
  if (state) {
    params.cmc_state_prov = state;
  }

  const postalCode = session.quiz_answers?.zip;
  if (postalCode) {
    params.cmc_postal_code = postalCode;
  }

  params.cmc_country = 'US';

  return params;
};

// Clear session data
export const clearSessionData = (): void => {
  try {
    sessionStorage.removeItem('quiz_session');
  } catch (error) {
    console.error('Failed to clear session data:', error);
  }
};