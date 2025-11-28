import React from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useEmailValidation } from '../../hooks/useEmailValidation';

interface EmailFieldProps {
  initialValue?: string;
  onValidationComplete?: (isValid: boolean, value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  showField?: boolean;
  autoFocus?: boolean;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  initialValue = '',
  onValidationComplete,
  disabled = false,
  className = '',
  placeholder = 'Email Address',
  showField = true,
  autoFocus = false
}) => {
  const { value, validationState, handleChange, applySuggestion, isValid, isTyping } = useEmailValidation(initialValue);

  React.useEffect(() => {
    if (onValidationComplete && validationState.valid !== null) {
      onValidationComplete(validationState.valid, value);
    }
  }, [validationState.valid, value, onValidationComplete]);

  if (!showField) return null;

  return (
    <>
      <div className="relative">
        <input
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`w-full p-4 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-teal focus:outline-none transition-all
            ${validationState.valid === false ? 'border-red-500 bg-red-50/30' :
             validationState.valid === true ? 'border-secondary bg-secondary-50/30 shadow-sm' : 'border-primary-300 focus:border-teal'} ${className}`}
        />
        {(isTyping || validationState.loading) && (
          <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-teal" />
        )}
        {validationState.valid === true && !isTyping && (
          <div className="absolute right-4 top-4 bg-secondary text-white rounded-full p-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
        {validationState.valid === false && !isTyping && (
          <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-500" />
        )}
      </div>
      {validationState.error && !isTyping && (
        <div className="mt-1">
          {validationState.suggestion ? (
            <button
              onClick={() => applySuggestion(validationState.suggestion!)}
              className="text-sm text-blue-600 hover:text-blue-700 underline bg-blue-50 px-3 py-2 rounded-md border-l-4 border-blue-400"
            >
              {validationState.error}
            </button>
          ) : (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border-l-4 border-accent">
              {validationState.error}
            </p>
          )}
        </div>
      )}
    </>
  );
};
