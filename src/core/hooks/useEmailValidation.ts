import { useState, useRef, useEffect } from 'react';
import { validateField } from '../utils/validation';
import { getSessionData, storeValidation } from '../utils/session';
import { config } from '../../config/environment.config';

interface EmailValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
  suggestion?: string;
}

interface UseEmailValidationReturn {
  value: string;
  validationState: EmailValidationState;
  handleChange: (newValue: string) => void;
  applySuggestion: (suggestedEmail: string) => void;
  isValid: boolean;
  isTyping: boolean;
}

export const useEmailValidation = (initialValue: string = ''): UseEmailValidationReturn => {
  const [value, setValue] = useState(initialValue);
  const [validationState, setValidationState] = useState<EmailValidationState>({
    loading: false,
    valid: null,
    error: null,
    suggestion: undefined
  });
  const [isTyping, setIsTyping] = useState(false);

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

  const validateEmail = async (email: string) => {
    if (!email) {
      setValidationState({ loading: false, valid: null, error: null });
      setIsTyping(false);
      return;
    }

    if (validationInProgress.current) {
      console.log('Email validation already in progress, skipping duplicate call');
      return;
    }

    if (email === lastValidatedValue.current) {
      console.log('Email already validated in this session, skipping duplicate call');
      return;
    }

    console.log('Validating email via API:', email);

    const emailLower = email.toLowerCase();

    const hasAt = email.includes('@');
    const parts = email.split('@');
    const hasDotAfterAt = parts.length > 1 && parts[1].includes('.') && parts[1].split('.')[1].length > 0;

    if (!hasAt || !hasDotAfterAt) {
      setValidationState({
        loading: false,
        valid: null,
        error: 'Please enter a valid email address',
        suggestion: undefined
      });
      setIsTyping(false);
      return;
    }

    const [localPart, domain] = emailLower.split('@');

    const domainTypos: Record<string, string> = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmil.com': 'gmail.com',
      'hotmial.com': 'hotmail.com',
      'hotmal.com': 'hotmail.com',
      'hotmil.com': 'hotmail.com',
      'hotmsl.com': 'hotmail.com',
      'hotms.com': 'hotmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'outloo.com': 'outlook.com'
    };

    if (domainTypos[domain]) {
      const suggestedEmail = `${localPart}@${domainTypos[domain]}`;
      setValidationState({
        loading: false,
        valid: false,
        error: `Did you mean ${suggestedEmail}?`,
        suggestion: suggestedEmail
      });
      setIsTyping(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationState({
        loading: false,
        valid: false,
        error: 'Please enter a valid email format',
        suggestion: undefined
      });
      setIsTyping(false);
      return;
    }

    if (email.includes(' ')) {
      setValidationState({
        loading: false,
        valid: false,
        error: 'Email cannot contain spaces',
        suggestion: undefined
      });
      setIsTyping(false);
      return;
    }

    validationInProgress.current = true;
    setValidationState({ loading: true, valid: null, error: null });

    const emailConfig = {
      id: 'email',
      validation: {
        apiEndpoint: config.api.emailValidation,
        mockDelay: 1500,
        message: 'Please enter a valid email address'
      }
    };

    const sessionData = getSessionData();

    try {
      const result = await validateField(emailConfig, email, sessionData);

      validationInProgress.current = false;

      setValidationState({
        loading: false,
        valid: result.valid,
        error: result.error
      });

      if (result.valid) {
        lastValidatedValue.current = email;
        storeValidation('email', result);
      }

      setIsTyping(false);
    } catch (error) {
      validationInProgress.current = false;

      setValidationState({
        loading: false,
        valid: false,
        error: 'Validation failed'
      });
      setIsTyping(false);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (validationTimeout.current) {
      clearTimeout(validationTimeout.current);
      validationTimeout.current = null;
    }

    lastValidatedValue.current = '';

    setValidationState({ loading: false, valid: null, error: null, suggestion: undefined });

    if (newValue.length === 0) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setValidationState({ loading: true, valid: null, error: null });

    validationTimeout.current = setTimeout(() => {
      validateEmail(newValue);
    }, 1200);
  };

  const applySuggestion = (suggestedEmail: string) => {
    setValue(suggestedEmail);
    setValidationState({
      loading: false,
      valid: null,
      error: null,
      suggestion: undefined
    });
    validateEmail(suggestedEmail);
  };

  return {
    value,
    validationState,
    handleChange,
    applySuggestion,
    isValid: validationState.valid === true,
    isTyping
  };
};
