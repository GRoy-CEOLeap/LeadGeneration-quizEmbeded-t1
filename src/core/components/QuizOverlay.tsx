import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle, XCircle, AlertCircle, Shield, ChevronDown, Car, Truck, Bike, HelpCircle } from 'lucide-react';
import { piQuizConfig } from '../../config/pi/quiz.config';
import { piContent } from '../../config/pi/content.config';
import { complianceContent } from '../../config/compliance.content.config';
import { getSessionData, storeQuizAnswer, storeFormField, getFinalSubmissionPayload, storeComplianceData, storeValidation, storeTCPAConsent, clearQuestionData, buildClickMagickParams } from '../utils/session';
import { getLeadIdToken } from '../utils/leadidMonitor';
import { config } from '../../config/environment.config';
import { withErrorBoundary, reportError } from '../utils/errorHandler';
import { ZipField, EmailField, PhoneField } from './fields';
import { complianceConfig } from '../../config/compliance.config';
import { useCompliance } from '../hooks/useCompliance';
import { JornayaField } from './JornayaField';
import { STATES_LIST } from '../utils/stateMapping';
import { InlineOTPInput } from './InlineOTPInput';
import { validateField, normalizePhoneNumber, validateName } from '../utils/validation';
import {
  loadJornayaScript,
  waitForComplianceFields,
  cloneComplianceFieldsToForm,
  syncComplianceFieldsBeforeSubmit,
  type ComplianceFieldsStatus
} from '../utils/compliance';


interface QuizOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ isOpen, onClose }) => {
  // Build steps from PI quiz config - qualifying questions only
  // Contact form is separate and stays as a single combined step
  const qualifyingQuestions = useMemo(() =>
    piQuizConfig.questions.filter(q =>
      !['first_name', 'last_name', 'email', 'phone'].includes(q.id)
    ),
  []);

  const steps = useMemo(() => [
    ...qualifyingQuestions.map(q => ({
      id: q.id,
      title: q.question,
      type: q.type === 'button-group' ? 'radio' : q.type,
      options: q.options,
      fields: q.fields
    })),
    {
      id: 'contact',
      title: 'Please enter your contact details:',
      type: 'contact'
    }
  ], [qualifyingQuestions]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [validationState, setValidationState] = useState<any>({});
  const [tcpaConsent, setTcpaConsent] = useState(false);
  const [consentTimestamp, setConsentTimestamp] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);

  // Advanced validation state objects from QuestionsFlow
  const [zipValidation, setZipValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null }>({ loading: false, valid: null, error: null });
  const [emailValidation, setEmailValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null }>({ loading: false, valid: null, error: null });
  const [phoneValidation, setPhoneValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null; message?: string }>({ loading: false, valid: null, error: null });
  const [phoneWorkflowStage, setPhoneWorkflowStage] = useState<'not_validated' | 'validated_needs_otp' | 'otp_sent' | 'otp_verified'>('not_validated');
  const [firstNameValidation, setFirstNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });
  const [lastNameValidation, setLastNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });

  // Validation timeout refs for debouncing
  const zipValidationTimeout = useRef<NodeJS.Timeout | null>(null);
  const emailValidationTimeout = useRef<NodeJS.Timeout | null>(null);
  const phoneValidationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Validation caching to prevent duplicate API calls
  const lastValidatedZip = useRef<{ value: string; isValid: boolean } | null>(null);
  const lastValidatedEmail = useRef<{ value: string; isValid: boolean } | null>(null);
  const lastValidatedPhone = useRef<{ value: string; isValid: boolean } | null>(null);

  // Track phone field visibility
  const [showPhoneField, setShowPhoneField] = useState(false);

  // Compliance field bridge state
  const [complianceFieldsReady, setComplianceFieldsReady] = useState(false);
  const [complianceFieldsStatus, setComplianceFieldsStatus] = useState<ComplianceFieldsStatus | null>(null);
  const [complianceLoading, setComplianceLoading] = useState(false);
  const [complianceSuccess, setComplianceSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);


  // Store answers using PI quiz config IDs
  const [quizData, setQuizData] = useState<{[key: string]: string}>({
    // PI qualifying questions
    state: '',
    accident_type: '',
    accident_date: '',
    at_fault: '',
    accident_treatment_window: '',
    attorney_status: '',
    zip: '',
    // Contact form fields
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    leadid_token: '',
    xxTrustedFormCertUrl: ''
  });

  // Show phone field after email is validated
  useEffect(() => {
    if (emailValidation.valid === true && !showPhoneField) {
      setShowPhoneField(true);
    }
  }, [emailValidation.valid, showPhoneField]);

  // Fallback: Ensure compliance scripts are initialized when modal opens
  // This handles cases where the parent page didn't load scripts (non-form routes)
  useEffect(() => {
    if (!isOpen) return;

    console.log('🔐 QuizOverlay: Modal opened, checking if compliance scripts are initialized');

    const checkScripts = () => {
      const jornayaScript = document.getElementById('LeadiDscript_campaign');
      const jornayaField = document.getElementById('leadid_token');

      if (!jornayaScript && complianceConfig.jornaya.enabled) {
        console.log('⚠ QuizOverlay: Jornaya script not found, initializing fallback...');
        loadJornayaScript()
          .then(() => {
            console.log('✓ QuizOverlay: Fallback Jornaya script loaded successfully');
          })
          .catch((error) => {
            console.error('✗ QuizOverlay: Fallback Jornaya script load failed', error);
          });
      } else if (jornayaScript) {
        console.log('✓ QuizOverlay: Jornaya script already initialized by parent page');
        console.log('  Field status:', {
          fieldExists: !!jornayaField,
          hasValue: !!(jornayaField as HTMLInputElement)?.value,
          valueLength: (jornayaField as HTMLInputElement)?.value?.length || 0
        });
      }
    };

    checkScripts();
  }, [isOpen]);
  
  // Compliance Field Bridge System
  // Wait for fields from page DOM and clone them into the modal form
  useEffect(() => {
    // Only run on contact form step
    if (currentStep !== steps.length - 1) return;

    console.log('🔐 QuizOverlay: Contact form step detected, initializing compliance bridge');
    const bridgeStartTime = Date.now();
    setComplianceLoading(true);
    setComplianceSuccess(false);
    setComplianceFieldsReady(false);

    // Wait for compliance fields to be ready in the main page DOM with extended timeout
    waitForComplianceFields(10000)
      .then((status) => {
        const bridgeTime = Date.now() - bridgeStartTime;
        console.log(`✓ QuizOverlay: Compliance fields ready in ${bridgeTime}ms`, status);
        setComplianceFieldsStatus(status);

        // Clone fields into the modal form if form ref exists
        if (formRef.current) {
          cloneComplianceFieldsToForm(formRef.current);
          console.log('✓ QuizOverlay: Fields cloned to modal form');
        } else {
          console.warn('⚠ QuizOverlay: Form ref not available, will retry on next render');
        }

        setComplianceFieldsReady(status.allReady);

        // Stop loading animation and show success
        setComplianceLoading(false);
        setComplianceSuccess(true);

        // Hide success message after 2 seconds
        setTimeout(() => {
          setComplianceSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        const bridgeTime = Date.now() - bridgeStartTime;
        console.error(`✗ QuizOverlay: Error waiting for compliance fields after ${bridgeTime}ms`, error);

        // Stop loading and show as ready (allow form to proceed even if compliance fails)
        setComplianceLoading(false);
        setComplianceFieldsReady(true);
      });

    // Cleanup is handled by promise completion
  }, [currentStep, steps.length]);

  // Re-clone fields when form ref becomes available
  useEffect(() => {
    if (currentStep === steps.length - 1 && formRef.current && complianceFieldsStatus && !complianceFieldsReady) {
      console.log('QuizOverlay: Form ref now available, cloning compliance fields');
      cloneComplianceFieldsToForm(formRef.current);
      setComplianceFieldsReady(true);
    }
  }, [formRef.current, complianceFieldsStatus, currentStep, steps.length, complianceFieldsReady]);
  
  // After qualifying questions, before contact
  const shouldShowLoading = currentStep === qualifyingQuestions.length && !showThankYou;

  // Auto-set TCPA consent when reaching contact step
  useEffect(() => {
    if (currentStep === steps.length - 1) { // Contact step
      setTcpaConsent(true);
      setConsentTimestamp(new Date().toISOString());
    }
  }, [currentStep, steps.length]);

  const checkQualification = async () => {
    // Toggle to skip qualification logic - set to false to always qualify
    const ENABLE_QUALIFICATION_CHECK = false;

    if (!ENABLE_QUALIFICATION_CHECK) {
      return true; // Always qualified when toggle is OFF
    }

    const sessionData = getSessionData();

    try {
      // Send all quiz answers for qualification
      const response = await fetch(config.api.qualification, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionData.session_id,
          answers: sessionData.quiz_answers,
          zip_data: sessionData.validations.zip // Include enrichment
        })
      });

      const result = await response.json();

      // Store qualification result
      storeValidation('qualification', result);

      return result.status === 'qualified';
    } catch (error) {
      console.error('Qualification check error:', error);
      // Default to qualified on error to not block user
      return true;
    }
  };

  // Validation functions from QuestionsFlow
  const validateZip = async (zip: string) => {
    if (zip.length !== 5) {
      setZipValidation({ loading: false, valid: null, error: zip.length > 0 ? 'Please enter a complete ZIP code (5 digits)' : null });
      return;
    }

    if (lastValidatedZip.current && zip === lastValidatedZip.current.value) {
      setZipValidation({ loading: false, valid: lastValidatedZip.current.isValid, error: lastValidatedZip.current.isValid ? null : 'Invalid ZIP code' });
      return;
    }

    setZipValidation({ loading: true, valid: null, error: null });
    const zipStep = { id: 'zip', validation: { apiEndpoint: config.api.zipValidation } };
    const session = getSessionData();
    const result = await validateField(zipStep, zip, session);

    setZipValidation({ loading: false, valid: result.valid, error: result.error });
    lastValidatedZip.current = { value: zip, isValid: result.valid };

    if (result.valid) {
      storeValidation('zip', result);
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  };

  const validateEmail = async (email: string) => {
    if (!email) {
      setEmailValidation({ loading: false, valid: null, error: null });
      return;
    }

    const hasAt = email.includes('@');
    const parts = email.split('@');
    const hasDotAfterAt = parts.length > 1 && parts[1].includes('.') && parts[1].split('.')[1].length > 0;

    if (!hasAt || !hasDotAfterAt) {
      setEmailValidation({ loading: false, valid: null, error: 'Please enter a valid email address' });
      return;
    }

    if (lastValidatedEmail.current && email === lastValidatedEmail.current.value) {
      setEmailValidation({ loading: false, valid: lastValidatedEmail.current.isValid, error: lastValidatedEmail.current.isValid ? null : 'Invalid email address' });
      return;
    }

    setEmailValidation({ loading: true, valid: null, error: null });
    const emailStep = { id: 'email', validation: { apiEndpoint: config.api.emailValidation } };
    const session = getSessionData();
    const result = await validateField(emailStep, email, session);

    setEmailValidation({ loading: false, valid: result.valid, error: result.error });
    lastValidatedEmail.current = { value: email, isValid: result.valid };

    if (result.valid) {
      storeValidation('email', result);
    }
  };

  const validatePhone = async (phone: string) => {
    const cleaned = normalizePhoneNumber(phone);

    if (cleaned.length !== 10) {
      setPhoneValidation({ loading: false, valid: null, error: cleaned.length > 0 ? 'Please enter a complete phone number (10 digits)' : null });
      return;
    }

    if (lastValidatedPhone.current && cleaned === lastValidatedPhone.current.value) {
      setPhoneValidation({ loading: false, valid: lastValidatedPhone.current.isValid, error: lastValidatedPhone.current.isValid ? null : 'Invalid phone number' });
      if (lastValidatedPhone.current.isValid) {
        setPhoneWorkflowStage('otp_verified');
      }
      return;
    }

    setPhoneValidation({ loading: true, valid: null, error: null });
    const phoneStep = { id: 'phone', validation: { apiEndpoint: config.api.phoneValidation } };
    const session = getSessionData();
    const result = await validateField(phoneStep, cleaned, session);

    const responseData = result.data || result;
    const otpMessage = responseData.message || result.message;
    const otpSentSuccessfully = otpMessage === 'Verification code sent successfully';

    if (result.valid && otpSentSuccessfully) {
      setPhoneValidation({ loading: false, valid: null, error: null, message: otpMessage });
      setPhoneWorkflowStage('otp_sent');
      storeValidation('phone', { ...result, otp_sent: true });
    } else if (result.valid && !result.otp_required) {
      lastValidatedPhone.current = { value: cleaned, isValid: true };
      setPhoneValidation({ loading: false, valid: true, error: null });
      setPhoneWorkflowStage('otp_verified');
      storeValidation('phone', result);
    } else {
      lastValidatedPhone.current = { value: cleaned, isValid: false };
      setPhoneValidation({ loading: false, valid: false, error: result.error || 'Invalid phone number' });
      setPhoneWorkflowStage('not_validated');
    }
  };

  const handleSendOTP = async () => {
    const cleaned = normalizePhoneNumber(quizData.phone);

    try {
      const sessionData = getSessionData();
      const response = await fetch(config.api.sendOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sessionData, phone: cleaned })
      });

      const result = await response.json();
      const otpSent = result.success || result.status === 'sent' || result.data?.success || result.data?.status === 'sent';

      if (otpSent) {
        setPhoneWorkflowStage('otp_sent');
        setPhoneValidation(prev => ({ ...prev, error: null, message: 'Verification code sent' }));
      }
    } catch (error) {
      setPhoneValidation(prev => ({ ...prev, error: 'Failed to send verification code. Please try again.' }));
    }
  };

  const handleVerifyOTP = async (code: string): Promise<{ success: boolean; message?: string }> => {
    const cleaned = normalizePhoneNumber(quizData.phone);

    try {
      const sessionData = getSessionData();
      const response = await fetch(config.api.verifyOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sessionData, phone: cleaned, otp: code })
      });

      const result = await response.json();
      const verified = result.success || result.status === 'approved' || result.status === 'valid' || result.data?.success || result.data?.status === 'approved';

      if (verified) {
        lastValidatedPhone.current = { value: cleaned, isValid: true };
        setPhoneValidation({ loading: false, valid: true, error: null });
        setPhoneWorkflowStage('otp_verified');
        storeValidation('phone', { status: 'valid', verified: true, ...result });
        return { success: true };
      }

      return { success: false, message: result.message || 'Invalid code' };
    } catch (error) {
      return { success: false, message: 'Verification failed' };
    }
  };

  const getOptions = (stepIndex: number) => {
    if (stepIndex < qualifyingQuestions.length) {
      const question = qualifyingQuestions[stepIndex];
      return question.options?.map(opt => opt.label) || [];
    }
    return [];
  };

  // Clear question state when navigating back
  const clearQuestionState = (stepIndex: number) => {
    // Determine if we're clearing a qualifying question or contact form
    const isQualifyingQuestion = stepIndex < qualifyingQuestions.length;

    if (isQualifyingQuestion) {
      // Clearing a qualifying question
      const question = qualifyingQuestions[stepIndex];
      if (question) {
        if (question.type === 'button-group') {
          // Clear button-group question
          setQuizData(prev => ({
            ...prev,
            [question.id]: ''
          }));
          clearQuestionData(question.id);
        } else if (question.type === 'form-section') {
          // Clear form-section question (state, zip, accident_date)
          if (question.id === 'state') {
            setQuizData(prev => ({ ...prev, state: '' }));
            clearQuestionData('state', ['state']);
          } else if (question.id === 'zip') {
            setQuizData(prev => ({ ...prev, zip: '' }));
            clearQuestionData('zip', ['zip']);
            // Reset zip validation
            setZipValidation({ loading: false, valid: null, error: null });
            lastValidatedZip.current = null;
            if (zipValidationTimeout.current) {
              clearTimeout(zipValidationTimeout.current);
            }
          }
        }
      }
    } else {
      // Clearing contact form - reset all contact fields and validation states
      setQuizData(prev => ({
        ...prev,
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      }));
      clearQuestionData('contact', ['first_name', 'last_name', 'phone', 'email']);

      // Reset all validation states
      setEmailValidation({ loading: false, valid: null, error: null });
      setPhoneValidation({ loading: false, valid: null, error: null });
      setPhoneWorkflowStage('not_validated');
      setShowPhoneField(false);

      // Clear validation caches and timeouts
      lastValidatedEmail.current = null;
      lastValidatedPhone.current = null;
      if (emailValidationTimeout.current) {
        clearTimeout(emailValidationTimeout.current);
      }
      if (phoneValidationTimeout.current) {
        clearTimeout(phoneValidationTimeout.current);
      }
    }
  };

  const handleOptionSelect = (value: string) => {
    const currentQuestion = qualifyingQuestions[currentStep];
    if (currentQuestion && currentQuestion.type === 'button-group') {
      const selectedOption = currentQuestion.options?.find(opt => opt.label === value);
      const answerValue = selectedOption?.value || value;

      // Update local state
      setQuizData(prev => ({
        ...prev,
        [currentQuestion.id]: answerValue
      }));

      // Store quiz answer
      storeQuizAnswer(currentQuestion.id, answerValue);

      // Auto-advance for qualifying questions (button-group questions)
      setTimeout(() => {
        handleNext();
      }, 300); // Small delay for better UX
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Handle phone number auto-formatting
    if (field === 'phone') {
      const cleaned = normalizePhoneNumber(value);
      if (cleaned.length <= 10) {
        if (cleaned.length > 6) {
          value = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6);
        } else if (cleaned.length > 3) {
          value = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3);
        } else if (cleaned.length > 0) {
          value = '(' + cleaned;
        }
      } else {
        return;
      }
    }

    // Update local state
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));

    // Store data in appropriate location
    // Contact fields go to form_fields (for reaching the lead)
    if (['first_name', 'last_name', 'phone', 'email'].includes(field)) {
      storeFormField(field, value);
    }
    // Qualifying questions go to quiz_answers (for lead qualification and routing)
    else if (['zip', 'state', 'accident_type', 'accident_date', 'at_fault', 'accident_treatment_window', 'attorney_status'].includes(field)) {
      storeQuizAnswer(field, value);
    }

    // Validate name fields
    if (field === 'first_name') {
      const result = validateName(value);
      setFirstNameValidation({ valid: result.valid, error: result.error });
    } else if (field === 'last_name') {
      const result = validateName(value);
      setLastNameValidation({ valid: result.valid, error: result.error });
    }

    // Trigger validation for specific fields with debouncing
    if (field === 'zip') {
      if (zipValidationTimeout.current) {
        clearTimeout(zipValidationTimeout.current);
      }
      lastValidatedZip.current = null;
      setZipValidation({ loading: false, valid: null, error: null });

      if (value.length === 5) {
        zipValidationTimeout.current = setTimeout(() => {
          validateZip(value);
        }, 800);
      }
    } else if (field === 'email') {
      if (emailValidationTimeout.current) {
        clearTimeout(emailValidationTimeout.current);
      }
      lastValidatedEmail.current = null;
      setEmailValidation({ loading: false, valid: null, error: null });

      if (value.length > 0) {
        setEmailValidation({ loading: true, valid: null, error: null });
        emailValidationTimeout.current = setTimeout(() => {
          validateEmail(value);
        }, 1200);
      }
    } else if (field === 'phone') {
      if (phoneValidationTimeout.current) {
        clearTimeout(phoneValidationTimeout.current);
      }
      lastValidatedPhone.current = null;
      setPhoneValidation({ loading: false, valid: null, error: null });
      setPhoneWorkflowStage('not_validated');

      const cleaned = normalizePhoneNumber(value);
      if (cleaned.length > 0) {
        setPhoneValidation({ loading: true, valid: null, error: null });
        phoneValidationTimeout.current = setTimeout(() => {
          if (cleaned.length < 10) {
            setPhoneValidation({ loading: false, valid: null, error: 'We are expecting 10 digits' });
          } else {
            validatePhone(value);
          }
        }, 1200);
      }
    }
  };

  const canProceed = () => {
    const currentQuestion = steps[currentStep];

    // For button-group qualifying questions
    if (currentStep < qualifyingQuestions.length && currentQuestion.type === 'radio') {
      return quizData[currentQuestion.id] !== '';
    }

    // For form-section qualifying questions (state, zip, accident_date)
    if (currentStep < qualifyingQuestions.length && qualifyingQuestions[currentStep].type === 'form-section') {
      const question = qualifyingQuestions[currentStep];

      if (question.id === 'state') {
        return quizData.state !== '';
      } else if (question.id === 'zip') {
        return zipValidation.valid === true;
      }

      // Default for other form sections
      return question.fields?.every(field => {
        const key = field.id;
        return quizData[key] && quizData[key].trim() !== '';
      }) || false;
    }

    // Contact step - All fields on one step with sequential validation
    const hasBasicInfo = quizData.first_name && quizData.last_name && firstNameValidation.valid === true && lastNameValidation.valid === true;

    // If phone field is not shown yet, only require email validation
    if (!showPhoneField) {
      return hasBasicInfo && emailValidation.valid === true;
    }

    // Once phone field is shown, require it to be validated too
    return hasBasicInfo && emailValidation.valid === true && phoneValidation.valid === true && phoneWorkflowStage === 'otp_verified';
  };

  const runLoadingAnimation = async () => {
    setIsLoadingStep(true);

    const loadingStages = [
      { progress: 25, message: 'Reviewing your case details...' },
      { progress: 50, message: 'Analyzing case strength...' },
      { progress: 75, message: 'Matching with attorneys...' },
      { progress: 100, message: 'Attorneys found!' }
    ];

    // Run qualification check during loading
    let isQualified = true;

    for (let stage of loadingStages) {
      setLoadingProgress(stage.progress);
      setLoadingMessage(stage.message);

      // Run qualification check at 50% progress
      if (stage.progress === 50 && config.api.qualification) {
        isQualified = await checkQualification();
      }

      await new Promise(resolve => setTimeout(resolve, 750));
    }

    setIsLoadingStep(false);

    // Only proceed to contact form if qualified
    if (isQualified) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle disqualification - could show different message or redirect
      setShowThankYou(true);
    }
  };

  const handleNext = async () => {
    // Always check if we can proceed before advancing
    if (!canProceed()) {
      return;
    }

    if (currentStep === qualifyingQuestions.length - 1) {
      // After last qualifying question, show loading
      await runLoadingAnimation();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const targetStep = currentStep - 1;
      // Clear the state for the step we're going back to
      clearQuestionState(targetStep);
      setCurrentStep(targetStep);
    }
  };

  // Determine if back button should be shown
  // Hide back button for ZIP step and all form field steps (contact form)
  const shouldShowBackButton = () => {
    // Never show back button for contact form step
    if (steps[currentStep]?.type === 'contact') {
      return false;
    }
    // Never show back button for ZIP step
    if (currentStep < qualifyingQuestions.length && qualifyingQuestions[currentStep]?.id === 'zip') {
      return false;
    }
    // Show back button for all other qualifying questions
    return currentStep > 0;
  };

  const handleSubmit = () => {
    const submitWithErrorHandling = withErrorBoundary(() => {
      handleFinalSubmission();
    });
    
    submitWithErrorHandling();
  };

  const handleFinalSubmission = async () => {
    try {
      // Store TCPA consent before submission
      storeTCPAConsent(complianceContent.consent.text, true);

      // Sync compliance fields from page DOM to modal form before submission
      if (formRef.current) {
        console.log('QuizOverlay: Syncing compliance fields before final submission');
        syncComplianceFieldsBeforeSubmit(formRef.current);
      }

      // Get TrustedForm certificate from the modal form (after sync)
      const trustedFormCertUrl = formRef.current?.querySelector<HTMLInputElement>('[id^="xxTrustedFormCertUrl"]')?.value || '';

      // Get Jornaya LeadID - try session storage first, then DOM fallback
      const leadidToken = getLeadIdToken() || '';

      console.log('QuizOverlay: Compliance data for submission', {
        trustedFormCertUrl,
        trustedFormCertUrlLength: trustedFormCertUrl.length,
        leadidToken,
        leadidTokenLength: leadidToken.length,
        leadidTokenSource: leadidToken ? 'session_or_dom' : 'not_found'
      });

      // Get session data for submission
      const sessionData = getSessionData();

      // Use standardized payload structure with full compliance data
      const formData = getFinalSubmissionPayload();

      // Add PI-specific fields
      if (sessionData.qualification_status) {
        formData.qualification_status = sessionData.qualification_status;
      }
      if (sessionData.disqualification_reasons) {
        formData.disqualification_reasons = sessionData.disqualification_reasons;
      }

      // Override/supplement metadata with page-specific data
      formData.metadata = {
        ...formData.metadata,
        page_url: window.location.href,
      };

      // Ensure compliance fields are included even if not in session
      if (leadidToken && !formData.leadid_token) {
        formData.leadid_token = leadidToken;
      }
      if (trustedFormCertUrl && !formData.xxTrustedFormCertUrl) {
        formData.xxTrustedFormCertUrl = trustedFormCertUrl;
      }

      console.log('Final submission payload:', formData);

      const webhookUrl = config.api.leadSubmit;
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      // Log for debugging only
      if (config.features.debugMode) {
        console.log('Submission result:', result);
      }

      const urlParams = new URLSearchParams();
      urlParams.set('lid', result.leadId || 'unknown');
      const utmSource = new URLSearchParams(window.location.search).get('utm_source');
      if (utmSource) {
        urlParams.set('utm_source', utmSource);
      }

      let queryString = urlParams.toString();
      const cmcParams = buildClickMagickParams();
      Object.entries(cmcParams).forEach(([key, value]) => {
        if (value) {
          queryString += `&${key}=${value}`;
        }
      });

      // Route all submissions to outcome page regardless of qualification status
      window.location.href = `${piQuizConfig.routes.qualified}?${queryString}`;
      
      return result;
    } catch (error) {
      reportError(error as Error, { context: 'final_submission' });
      
      // Log errors only in debug mode
      if (config.features.debugMode) {
        console.error('Submission error:', error);
      }
      
      // Still show thank you - don't block user experience
      setShowThankYou(true);
    }
  };

  const getThankYouMessage = () => {
    return "We're reviewing your case details and will connect you with experienced attorneys who can help. Check your email for next steps.";
  };

  if (!isOpen) return null;

  // Show loading screen
  if (isLoadingStep) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {loadingMessage}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main quiz modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-2 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl" tabIndex={-1}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {!showThankYou && shouldShowBackButton() && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {showThankYou ? 'Thank You!' : `Step ${currentStep + 1} of ${steps.length}`}
            </h2>
          </div>
          {!showThankYou && (
            <button
              onClick={() => {
                if (currentStep > 0 && !showThankYou) {
                  setShowExitModal(true);
                } else {
                  onClose();
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {!showThankYou && (
          <div className="px-4 sm:px-6 py-2">
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-sm overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-600 via-teal to-teal-600 relative overflow-hidden"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: currentStep === steps.length - 1 ? '70vh' : '60vh' }}>
          {showThankYou ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You for Your Submission!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {getThankYouMessage()}
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-gold mb-2">
                {steps[currentStep].title}
              </h3>

              {steps[currentStep].helper && (
                <p className="text-teal-700 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full"></span>
                  {steps[currentStep].helper}
                </p>
              )}

              {/* Form Section Questions (state, accident_date, zip) */}
              {currentStep < qualifyingQuestions.length && qualifyingQuestions[currentStep].type === 'form-section' && (
                <div className="space-y-4">
                  {qualifyingQuestions[currentStep].id === 'state' && (
                    <div className="relative">
                      <select
                        value={quizData.state}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleInputChange('state', selectedValue);

                          if (selectedValue) {
                            setTimeout(() => {
                              handleNext();
                            }, 300);
                          }
                        }}
                        className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-4 pr-10 text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal cursor-pointer"
                      >
                        <option value="">Select a state...</option>
                        {STATES_LIST.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                    </div>
                  )}

                  {qualifyingQuestions[currentStep].id === 'zip' && (
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={quizData.zip}
                        onChange={(e) => {
                          const zipValue = e.target.value;
                          handleInputChange('zip', zipValue);
                        }}
                        placeholder="12345"
                        maxLength={5}
                        className={`
                          w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-colors
                          ${zipValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                           zipValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300 focus:border-teal'}
                        `}
                      />
                      {zipValidation.loading && (
                        <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-teal" />
                      )}
                      {zipValidation.valid === true && (
                        <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-500" />
                      )}
                      {zipValidation.error && <p className="mt-1 text-sm text-red-500">{zipValidation.error}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Button Group Questions */}
              {currentStep < qualifyingQuestions.length && steps[currentStep].type === 'radio' && (
                <div className="space-y-3">
                  {getOptions(currentStep).map((option, index) => {
                    const currentQuestion = qualifyingQuestions[currentStep];
                    const optionConfig = currentQuestion.options?.find(opt => opt.label === option);
                    const isSelected = quizData[currentQuestion.id] === optionConfig?.value;

                    const iconMap: { [key: string]: any } = {
                      'Car': Car,
                      'Truck': Truck,
                      'Bike': Bike,
                      'HelpCircle': HelpCircle
                    };
                    const IconComponent = optionConfig?.icon ? iconMap[optionConfig.icon] : null;

                    return (
                      <label
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all relative overflow-hidden group
                          ${isSelected
                            ? 'border-navy bg-gradient-to-r from-teal-50 to-primary-50 shadow-md'
                            : 'border-primary-200 hover:border-teal hover:bg-teal-50/50 hover:shadow-sm'}`}
                      >
                        <input
                          type="radio"
                          name={`step-${currentStep}-${steps[currentStep].id}`}
                          value={option}
                          checked={isSelected}
                          onChange={(e) => handleOptionSelect(e.target.value)}
                          className="w-4 h-4 text-teal mr-3"
                        />
                        <div className="flex items-center justify-between flex-1">
                          <span className={`font-semibold ${isSelected ? 'text-navy' : 'text-gray-800'}`}>{option}</span>
                          <div className="flex items-center gap-2">
                            {IconComponent && <IconComponent className={`w-6 h-6 ${isSelected ? 'text-teal' : 'text-gray-400'}`} />}
                            {isSelected && (
                              <div className="bg-secondary text-white rounded-full p-1">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Contact Form */}
              {steps[currentStep].type === 'contact' && (
                <form
                  ref={formRef}
                  id="lead-capture-form"
                  onSubmit={(e) => e.preventDefault()}
                  onFocus={() => {
                    // Validate email if filled but not validated
                    if (quizData.email && emailValidationState.valid === null) {
                      handleEmailValidation(quizData.email);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* Jornaya LeadID Hidden Field - Must exist before script loads */}
                  <JornayaField />

                  {/* Compliance Loading Indicator - Static 1.5s animation */}
                  {complianceLoading && (
                    <div className="flex items-center gap-3 p-3 bg-teal-50 border-2 border-teal rounded-lg transition-all duration-300">
                      <Shield className="w-5 h-5 text-teal animate-pulse" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-navy">Securing your information...</p>
                        <p className="text-xs text-teal-700">This ensures your data is protected</p>
                      </div>
                    </div>
                  )}

                  {/* Compliance Success Indicator - Shows after 1.5s */}
                  {complianceSuccess && (
                    <div className="flex items-center gap-3 p-3 bg-secondary-50 border-2 border-secondary rounded-lg transition-all duration-300">
                      <div className="bg-secondary text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-semibold text-navy">Form secured and ready</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={quizData.first_name}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                          className={`
                            w-full p-3 sm:p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-all
                            ${firstNameValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                             firstNameValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-primary-300 focus:border-teal'}
                          `}
                        />
                        {firstNameValidation.valid === true && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {firstNameValidation.valid === false && (
                          <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {firstNameValidation.error && <p className="mt-1 text-sm text-red-500">{firstNameValidation.error}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={quizData.last_name}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                          className={`
                            w-full p-3 sm:p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-all
                            ${lastNameValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                             lastNameValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-primary-300 focus:border-teal'}
                          `}
                        />
                        {lastNameValidation.valid === true && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {lastNameValidation.valid === false && (
                          <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {lastNameValidation.error && <p className="mt-1 text-sm text-red-500">{lastNameValidation.error}</p>}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="relative">
                    <input
                      type="email"
                      value={quizData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      autoFocus
                      className={`
                        w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-colors
                        ${emailValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                         emailValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300 focus:border-teal'}
                      `}
                    />
                    {emailValidation.loading && (
                      <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-teal" />
                    )}
                    {emailValidation.valid === true && (
                      <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-500" />
                    )}
                    {emailValidation.error && <p className="mt-1 text-sm text-red-500">{emailValidation.error}</p>}
                  </div>

                  {/* Phone Number with OTP Verification - Only shown after email is validated */}
                  {showPhoneField && (
                    <div>
                      <div className="relative">
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={quizData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 555-5555"
                          autoFocus
                          className={`
                            w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-colors
                            ${phoneValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                             phoneValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300 focus:border-teal'}
                          `}
                        />
                        {phoneValidation.loading && (
                          <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-teal" />
                        )}
                        {phoneValidation.valid === true && (
                          <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {phoneValidation.error && <p className="mt-1 text-sm text-red-500">{phoneValidation.error}</p>}

                      {phoneWorkflowStage === 'otp_sent' && (
                        <InlineOTPInput
                          phoneNumber={quizData.phone}
                          onVerify={handleVerifyOTP}
                          onResend={handleSendOTP}
                        />
                      )}
                    </div>
                  )}

                  {/* Get My Free Case Review Button - Positioned BEFORE TCPA */}
                  {/* Shown only when phone field is visible (after email validation) */}
                  {showPhoneField && (
                    <button
                      onClick={(e) => {
                        if (!canProceed()) {
                          e.preventDefault();
                          e.stopPropagation();
                          return;
                        }
                        handleNext();
                      }}
                      disabled={!canProceed()}
                      className={`w-full px-6 py-4 rounded-lg font-semibold text-base sm:text-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg ${
                        canProceed()
                          ? 'bg-gradient-to-r from-gold to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 pointer-events-none'
                      }`}
                      title={!canProceed() ? 'Please complete and validate all fields' : ''}
                      style={{ pointerEvents: !canProceed() ? 'none' : 'auto' }}
                    >
                      Get My Free Case Review
                    </button>
                  )}

                  {/* TCPA Consent Text - Shown BELOW button when phone field appears */}
                  {showPhoneField && (
                    <div id="leadid_tcpa_disclosure" className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div
                        className="text-xs text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:underline"
                        dangerouslySetInnerHTML={{
                          __html: complianceContent.consent.text
                        }}
                      />
                    </div>
                  )}

                  {/* Hidden field for Jornaya LeadiD token */}
                  <input
                    id="leadid_token"
                    name="leadid_token"
                    type="hidden"
                    value=""
                  />

                  {/* Compliance fields are cloned from page DOM by the bridge system */}
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer - Show for form-section questions that need Next button (ZIP auto-advances) */}
        {!showThankYou && currentStep < qualifyingQuestions.length && qualifyingQuestions[currentStep].type === 'form-section' && qualifyingQuestions[currentStep].id !== 'zip' && qualifyingQuestions[currentStep].id !== 'state' && (
          <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </div>
            <button
              onClick={(e) => {
                if (!canProceed()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                handleNext();
              }}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg ${
                canProceed()
                  ? 'bg-gradient-to-r from-primary-600 to-teal hover:from-navy hover:to-teal-600 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 pointer-events-none'
              }`}
              title={!canProceed() ? 'Please complete and validate all fields' : ''}
              style={{ pointerEvents: !canProceed() ? 'none' : 'auto' }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2">Wait! You're almost done</h3>
            <p className="text-gray-600 mb-4">
              You're just {steps.length - currentStep} questions away from your free case review.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Continue Quiz
              </button>
              <button 
                onClick={() => {
                  setShowExitModal(false);
                  onClose();
                }}
                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};