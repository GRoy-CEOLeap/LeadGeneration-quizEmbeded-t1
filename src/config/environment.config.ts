interface EnvironmentConfig {
  api: {
    leadSubmit: string;
    contactSubmit: string;
    zipValidation: string;
    emailValidation: string;
    phoneValidation: string;
    sendOTP: string;
    verifyOTP: string;
    qualification: string;
    errorReporting: string;
  };
  features: {
    mockValidation: boolean;
    debugMode: boolean;
  };
}

const getConfig = (): EnvironmentConfig => {
  const env = import.meta.env.VITE_ENV || 'development';
  const isDevelopment = env === 'development';
  
  return {
    api: {
      // Lead submission
      leadSubmit: import.meta.env.VITE_LEAD_WEBHOOK || '',

      // Contact form submission
      contactSubmit: import.meta.env.VITE_CONTACT_WEBHOOK || '',

      // Validation endpoints
      zipValidation: import.meta.env.VITE_ZIP_VALIDATOR || '',
      emailValidation: import.meta.env.VITE_EMAIL_VALIDATOR || '',
      phoneValidation: import.meta.env.VITE_PHONE_VALIDATOR || '',
      
      // OTP endpoints
      sendOTP: import.meta.env.VITE_SEND_OTP || '',
      verifyOTP: import.meta.env.VITE_VERIFY_OTP || '',
      
      // Qualification
      qualification: import.meta.env.VITE_QUALIFICATION_API || '',
      
      // Error reporting (optional)
      errorReporting: import.meta.env.VITE_ERROR_REPORTING || '',
    },
    features: {
      mockValidation: false,
      debugMode: import.meta.env.VITE_DEBUG_MODE === 'true' || isDevelopment,
    }
  };
};

export const config = getConfig();