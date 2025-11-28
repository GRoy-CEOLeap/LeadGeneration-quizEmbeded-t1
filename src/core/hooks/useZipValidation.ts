import { useState, useEffect } from 'react';
import { validateField } from '../utils/validation';
import { getSessionData, storeQuizAnswer, storeValidation } from '../utils/session';
import { quizConfig } from '../../config/quiz.config';

interface ZipValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
}

interface UseZipValidationReturn {
  value: string;
  validationState: ZipValidationState;
  handleChange: (newValue: string) => void;
  isValid: boolean;
}

export const useZipValidation = (initialValue: string = ''): UseZipValidationReturn => {
  const [value, setValue] = useState(initialValue);
  const [validationState, setValidationState] = useState<ZipValidationState>({
    loading: false,
    valid: null,
    error: null
  });

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = async (newValue: string) => {
    setValue(newValue);

    if (newValue.length === 5) {
      storeQuizAnswer('zip', newValue);

      setValidationState({ loading: true, valid: null, error: null });

      const configStep = quizConfig.steps[0];
      const sessionData = getSessionData();

      try {
        const result = await validateField(configStep, newValue, sessionData);

        setValidationState({
          loading: false,
          valid: result.valid,
          error: result.error
        });

        if (result.valid) {
          storeValidation('zip', result);
        }
      } catch (error) {
        setValidationState({
          loading: false,
          valid: false,
          error: 'Validation failed'
        });
      }
    } else {
      setValidationState({ loading: false, valid: null, error: null });
    }
  };

  return {
    value,
    validationState,
    handleChange,
    isValid: validationState.valid === true
  };
};
