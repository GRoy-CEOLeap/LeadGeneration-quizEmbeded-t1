import React from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useZipValidation } from '../../hooks/useZipValidation';

interface ZipFieldProps {
  initialValue?: string;
  onValidationComplete?: (isValid: boolean, value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const ZipField: React.FC<ZipFieldProps> = ({
  initialValue = '',
  onValidationComplete,
  disabled = false,
  className = '',
  placeholder = 'Enter ZIP code'
}) => {
  const { value, validationState, handleChange, isValid } = useZipValidation(initialValue);

  React.useEffect(() => {
    if (onValidationComplete && validationState.valid !== null) {
      onValidationComplete(validationState.valid, value);
    }
  }, [validationState.valid, value, onValidationComplete]);

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${className}`}
          maxLength={5}
        />
        {validationState.loading && (
          <Loader2 className="absolute right-4 top-5 w-5 h-5 animate-spin text-blue-500" />
        )}
        {validationState.valid === true && (
          <CheckCircle className="absolute right-4 top-5 w-5 h-5 text-green-500" />
        )}
        {validationState.valid === false && (
          <XCircle className="absolute right-4 top-5 w-5 h-5 text-red-500" />
        )}
      </div>
      {validationState.error && (
        <p className="mt-2 text-sm text-red-600">{validationState.error}</p>
      )}
    </div>
  );
};
