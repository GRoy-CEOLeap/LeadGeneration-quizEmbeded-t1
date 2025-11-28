// Quiz Types and Interfaces
export interface EmailValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
  suggestion?: string;
}

export interface PhoneValidationState {
  loading: boolean;
  status: 'valid' | 'invalid' | 'needs_otp' | 'otp_sent' | null;
  error: string | null;
  message?: string;
  phoneType?: string;
  phone_type?: string;
  phone_location?: string;
  validation_date?: string;
  otp_required?: boolean;
}

export interface QuizData {
  zip: string;
  home_status: string;
  install_pref: string;
  intent_timing: string;
  existing_system: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  leadid_token: string;
}

export interface ValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
}

export interface SessionData {
  session_id: string;
  landing_page: string;
  referrer: string;
  timestamp: string;
  quiz_version?: string;
  quiz_started_at?: string;
  quiz_answers: Record<string, any>;
  form_fields: Record<string, any>;
  validations: Record<string, any>;
  compliance?: Record<string, any>;
  utm: Record<string, string>;
  ip_address: string | null;
  user_agent: string;
  qualification_status?: 'qualified' | 'unqualified' | null;
  disqualification_reasons?: string[];
}

// Add compliance types
export interface ComplianceData {
  // Jornaya fields
  leadid_token?: string;
  leadid_timestamp?: string;
  
  // TrustedForm fields
  trusted_form_cert?: string;
  trusted_form_timestamp?: string;
  
  // Shared fields
  page_url?: string;
  consent_language?: string;
  tcpa_version?: string;
}

export interface ComplianceState {
  jornayaLoaded: boolean;
  jornayaReady: boolean;
  leadIdCaptured: boolean;
  leadId: string | null;
}