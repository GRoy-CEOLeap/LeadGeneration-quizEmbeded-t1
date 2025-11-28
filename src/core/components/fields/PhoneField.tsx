import React from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { usePhoneValidation } from '../../hooks/usePhoneValidation';
import { InlineOTPInput } from '../InlineOTPInput';

interface PhoneFieldProps {
  initialValue?: string;
  onValidationComplete?: (isValid: boolean, value: string) => void;
  onOTPVerified?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  initialValue = '',
  onValidationComplete,
  onOTPVerified,
  disabled = false,
  className = '',
  placeholder = 'Phone Number',
  autoFocus = false
}) => {
  const {
    value,
    validationState,
    workflowStage,
    handleChange,
    handleSendOTP,
    handleVerifyOTP,
    isValid,
    isTyping
  } = usePhoneValidation(initialValue);

  React.useEffect(() => {
    if (onValidationComplete && validationState.status !== null) {
      onValidationComplete(validationState.status === 'valid', value);
    }
  }, [validationState.status, value, onValidationComplete]);

  React.useEffect(() => {
    if (workflowStage === 'otp_verified' && onOTPVerified) {
      onOTPVerified();
    }
  }, [workflowStage, onOTPVerified]);

  return (
    <div>
      <div className="relative">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`w-full p-4 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-teal focus:outline-none transition-all
            ${validationState.status === 'invalid' ? 'border-red-500 bg-red-50/30' :
             validationState.status === 'valid' ? 'border-secondary bg-secondary-50/30 shadow-sm' : 'border-primary-300 focus:border-teal'} ${className}`}
        />

        {validationState.loading && (
          <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-teal" />
        )}

        {validationState.status === 'valid' && (
          <div className="absolute right-4 top-4 bg-secondary text-white rounded-full p-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}

        {validationState.status === 'invalid' && (
          <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-500" />
        )}
      </div>

      {workflowStage === 'otp_sent' && (
        <InlineOTPInput
          phoneNumber={value}
          onVerify={handleVerifyOTP}
          onResend={handleSendOTP}
        />
      )}

      {validationState.error && !isTyping && (
        <p className="mt-1 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border-l-4 border-accent">
          {validationState.error}
        </p>
      )}
      {validationState.status === 'invalid' && validationState.message && !isTyping && (
        <p className="mt-1 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border-l-4 border-accent">
          {validationState.message}
        </p>
      )}
    </div>
  );
};
