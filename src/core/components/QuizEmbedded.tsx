import React, { useState, useEffect } from 'react';
import { quizConfig } from '../../config/quiz.config';
import { complianceContent } from '../../config/compliance.content.config';
import { storeQuizAnswer, storeFormField, getFinalSubmissionPayload, getSessionData, storeTCPAConsent, clearQuestionData } from '../utils/session';
import { getLeadIdToken } from '../utils/leadidMonitor';
import { config } from '../../config/environment.config';
import { CheckCircle, Loader2, ChevronRight, XCircle } from 'lucide-react';
import { EmailField, PhoneField } from './fields';
import { validateName } from '../utils/validation';
import { triggerJornayaHashEvent } from '../utils/jornayaHashTracking';

interface Props {
  initialZip: string;
  onComplete: () => void;
}

export const QuizEmbedded: React.FC<Props> = ({ initialZip, onComplete }) => {
  // Start from step 1 since ZIP (step 0) is already done
  const [currentStep, setCurrentStep] = useState(1);

  // DEBUG LOGGING - PRIORITY 2: Log on every render
  console.log('🔄 QuizEmbedded RENDER - currentStep:', currentStep);

  // Track if we're at ZIP step or later (for hiding back button)
  const isZipStepOrLater = currentStep === 0 || (currentStep > quizSteps.length);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Initialize with existing home security quiz data structure
  const [quizData, setQuizData] = useState({
    zip: initialZip,
    home_status: '',
    install_pref: '',
    intent_timing: '',
    existing_system: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  // Store initialZip in quiz_answers when component mounts
  useEffect(() => {
    if (initialZip) {
      storeQuizAnswer('zip', initialZip);
    }
  }, [initialZip]);

  // Add beforeunload event listener to warn users when they try to leave the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if user has started the quiz (past step 1) and hasn't submitted
      if (currentStep > 1 && !isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep, isSubmitting]);

  // Journey Tracking: Listen to hash changes (browser back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove # prefix
      if (!hash) return;

      console.log('QuizEmbedded: Hash changed detected:', hash);

      // Find step number from hash
      let stepNumber = 0;

      // Check quiz steps
      const quizStepIndex = quizSteps.findIndex(step => step.id === hash);
      if (quizStepIndex !== -1) {
        stepNumber = quizStepIndex + 1;
      } else {
        // Check contact steps
        const contactStepIndex = contactSteps.findIndex(step => step.id === hash);
        if (contactStepIndex !== -1) {
          stepNumber = quizSteps.length + contactStepIndex + 1;
        }
      }

      if (stepNumber > 0) {
        console.log(`QuizEmbedded: Hash maps to step ${stepNumber}`);
        // Fire Jornaya pixel
        setTimeout(() => {
          triggerJornayaHashEvent(stepNumber, hash, 'embedded_quiz');
        }, 150);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [quizSteps, contactSteps]);

  // Journey Tracking: Track step changes and update URL hash
  useEffect(() => {
    // DEBUG LOGGING - PRIORITY 1: Log immediately when useEffect fires
    console.log('🔥 STEP TRACKING useEffect TRIGGERED');
    console.log('  📊 currentStep:', currentStep);
    console.log('  📊 totalSteps:', totalSteps);

    if (currentStep < 1 || currentStep > totalSteps) {
      console.log('  ❌ EXITING: step out of range (', currentStep, 'not in 1-', totalSteps, ')');
      return;
    }

    const currentConfig = getCurrentStepConfig();
    console.log('  📋 currentConfig:', currentConfig);
    console.log('  📋 currentConfig.id:', currentConfig?.id);

    if (!currentConfig?.id) {
      console.log('  ❌ EXITING: no config.id');
      return;
    }

    const stepHash = currentConfig.id;
    console.log('  🏷️ stepHash:', stepHash);

    // Exception: Don't add hash for step 1 if no hash currently exists
    const currentHash = window.location.hash.slice(1);
    console.log('  🔗 currentHash:', currentHash || '(empty)');

    if (currentStep === 1 && !currentHash) {
      // Step 1 on initial load - don't add hash, but fire pixel
      console.log('  ✅ Step 1 initial load - firing pixel only (no hash update)');
      setTimeout(() => {
        console.log('  🚀 CALLING triggerJornayaHashEvent - step:', currentStep, 'hash:', stepHash);
        triggerJornayaHashEvent(currentStep, stepHash, 'embedded_quiz');
      }, 150);
      return;
    }

    // For all other cases, update hash and fire pixel
    console.log('  ✅ PROCEEDING with hash update and pixel fire');
    setTimeout(() => {
      console.log('  🔗 Updating URL hash to:', stepHash);
      window.history.replaceState(null, '', `#${stepHash}`);
      console.log('  🚀 CALLING triggerJornayaHashEvent - step:', currentStep, 'hash:', stepHash);
      triggerJornayaHashEvent(currentStep, stepHash, 'embedded_quiz');
    }, 150);
  }, [currentStep, totalSteps]);

  // Journey Tracking: Fire initial pixel on mount
  useEffect(() => {
    const currentConfig = getCurrentStepConfig();
    if (currentConfig?.id) {
      console.log('QuizEmbedded: Initial mount - firing pixel for step', currentStep);
      setTimeout(() => {
        triggerJornayaHashEvent(currentStep, currentConfig.id, 'embedded_quiz');
      }, 500);
    }
  }, []);

  // Track validation completion
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [firstNameValidation, setFirstNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });
  const [lastNameValidation, setLastNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });

  // Get steps from existing quiz config (skip ZIP which is step 0)
  const quizSteps = quizConfig.steps.slice(1);
  
  // Define contact steps - consolidated first/last name/email into one step, phone separate
  const contactSteps = [
    { id: 'contact_info', label: 'Contact Information', type: 'multi', placeholder: '' },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 555-5555' }
  ];
  
  // Total steps = quiz steps + contact steps
  const totalSteps = quizSteps.length + contactSteps.length;
  
  // Determine current step type and config
  const isQuizStep = currentStep <= quizSteps.length;
  const isContactStep = currentStep > quizSteps.length;
  const isFinalContactStep = currentStep === totalSteps;
  
  // Get current step configuration
  const getCurrentStepConfig = () => {
    if (isQuizStep) {
      return quizSteps[currentStep - 1];
    } else {
      const contactIndex = currentStep - quizSteps.length - 1;
      return contactSteps[contactIndex];
    }
  };

  const currentStepConfig = getCurrentStepConfig();

  // Check if current step is the combined contact info step
  const isContactInfoStep = isContactStep && currentStepConfig?.id === 'contact_info';

  // Clear question state when navigating back
  const clearQuestionState = (stepIndex: number) => {
    // Determine if we're clearing a quiz step or contact step
    const isQuizStepToClear = stepIndex <= quizSteps.length;

    if (isQuizStepToClear) {
      // Clearing a quiz step
      const stepConfig = quizSteps[stepIndex - 1];
      if (stepConfig) {
        // Clear the quiz answer from state
        setQuizData(prev => ({
          ...prev,
          [stepConfig.id]: ''
        }));

        // Clear from session storage
        clearQuestionData(stepConfig.id);
      }
    } else {
      // Clearing a contact step
      const contactIndex = stepIndex - quizSteps.length - 1;
      const contactStep = contactSteps[contactIndex];

      if (contactStep) {
        if (contactStep.id === 'contact_info') {
          // Clear first name, last name, and email
          setQuizData(prev => ({
            ...prev,
            first_name: '',
            last_name: '',
            email: ''
          }));
          clearQuestionData('contact_info', ['first_name', 'last_name', 'email']);

          // Reset email validation state
          setEmailValid(false);
        } else if (contactStep.id === 'phone') {
          // Clear phone field
          setQuizData(prev => ({
            ...prev,
            phone: ''
          }));
          clearQuestionData('phone', ['phone']);

          // Reset phone validation states
          setPhoneValid(false);
          setPhoneVerified(false);
        }
      }
    }
  };

  // Handle quiz answer selection
  const handleOptionSelect = (value: string) => {
    console.log('🎯 handleOptionSelect CALLED - value:', value, '| currentStep:', currentStep);

    if (!isQuizStep || !currentStepConfig) {
      console.log('  ❌ EXITING: isQuizStep:', isQuizStep, '| currentStepConfig:', !!currentStepConfig);
      return;
    }

    const selectedOption = currentStepConfig.options?.find(opt => opt.label === value);
    const answerValue = selectedOption?.value || value;
    console.log('  📝 Answer value:', answerValue, '| question:', currentStepConfig.id);

    setQuizData(prev => ({
      ...prev,
      [currentStepConfig.id]: answerValue
    }));

    // Store in session
    storeQuizAnswer(currentStepConfig.id, answerValue);
    console.log('  💾 Stored answer in session');

    // Auto-advance for button-group questions
    if (currentStepConfig.type === 'button-group') {
      console.log('  ⏩ Auto-advancing (button-group type) in 300ms');
      setTimeout(() => {
        handleNext();
      }, 300);
    } else {
      console.log('  ⏸️ NOT auto-advancing (type:', currentStepConfig.type, ')');
    }
  };

  // Handle contact form inputs
  const handleInputChange = (field: string, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
    storeFormField(field, value);

    // Validate name fields
    if (field === 'first_name') {
      const result = validateName(value);
      setFirstNameValidation({ valid: result.valid, error: result.error });
    } else if (field === 'last_name') {
      const result = validateName(value);
      setLastNameValidation({ valid: result.valid, error: result.error });
    }
  };









  // Can proceed check
  const canProceed = () => {
    if (isQuizStep && currentStepConfig) {
      return quizData[currentStepConfig.id as keyof typeof quizData] !== '';
    } else if (isContactStep && currentStepConfig) {
      // For the combined contact info step
      if (currentStepConfig.id === 'contact_info') {
        return quizData.first_name.trim() !== '' &&
               quizData.last_name.trim() !== '' &&
               firstNameValidation.valid === true &&
               lastNameValidation.valid === true &&
               emailValid;
      }
      // For phone step
      else if (currentStepConfig.id === 'phone') {
        return phoneValid && phoneVerified;
      }
    }
    return false;
  };

  // Handle next button
  const handleNext = async () => {
    // DEBUG LOGGING - PRIORITY 3: Log before advancing
    console.log('📈 handleNext CALLED');
    console.log('  📍 currentStep BEFORE:', currentStep);

    // Always check if we can proceed before advancing
    if (!canProceed()) {
      return;
    }

    // If it's the final step, submit
    if (isFinalContactStep && canProceed()) {
      await handleSubmit();
      return;
    }

    // Otherwise, go to next step
    if (currentStep < totalSteps) {
      console.log('  \u2705 Advancing to next step');
      console.log('  \ud83d\udd3a FROM step:', currentStep);
      console.log('  \ud83d\udd3a TO step:', currentStep + 1);
      setCurrentStep(currentStep + 1);
      console.log('  \u2705 setCurrentStep called with:', currentStep + 1);
    } else {
      console.log('  \u23f9\ufe0f NOT advancing - already at final step (', currentStep, '/', totalSteps, ')');
    }
  };

  // Handle back button with exit modal check
  const handleBack = () => {
    // Show exit modal if user is past first step
    if (currentStep > 1) {
      setShowExitModal(true);
    }
  };

  // Handle exit confirmation
  const handleExitConfirm = () => {
    setShowExitModal(false);
    // Navigate back or close based on context
    if (currentStep > 1) {
      const targetStep = currentStep - 1;
      // Clear the state for the step we're going back to
      clearQuestionState(targetStep);
      setCurrentStep(targetStep);
    }
  };

  // Handle exit cancel (continue quiz)
  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  // Handle final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Store TCPA consent before submission
      storeTCPAConsent(complianceContent.consent.text, true);

      const leadidToken = getLeadIdToken();
      console.log('QuizEmbedded: LeadiD token before submission:', {
        token: leadidToken,
        tokenLength: leadidToken?.length || 0,
        source: leadidToken ? 'session_or_dom' : 'not_found'
      });

      const payload = getFinalSubmissionPayload();

      console.log('QuizEmbedded: Submitting payload:', payload);
      console.log('QuizEmbedded: Journey tracking summary:', {
        totalSteps: totalSteps,
        currentStep: currentStep,
        finalHash: window.location.hash,
        completedQuizSteps: quizSteps.length,
        completedContactSteps: contactSteps.length
      });
      
      const response = await fetch(config.api.leadSubmit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      console.log('Webhook response:', result);
      
      // Store webhook response for result page
      sessionStorage.setItem('webhook_response', JSON.stringify(result));
      
      // Navigate to result page
      onComplete();
    } catch (error) {
      console.error('Submission error:', error);
      // Still proceed to result page
      onComplete();
    }
  };

  // Progress percentage
  const progress = ((currentStep) / totalSteps) * 100;

  // Get title for current step
  const getStepTitle = () => {
    if (isQuizStep && currentStepConfig) {
      return currentStepConfig.question;
    } else if (isContactStep && currentStepConfig) {
      if (currentStepConfig.id === 'contact_info') {
        return "Great! Now let's get your personalized quotes";
      } else if (currentStepConfig.id === 'phone') {
        return "Last step: Your phone number";
      }
    }
    return '';
  };

  // Get helper text for current step
  const getHelperText = () => {
    if (isQuizStep && currentStepConfig?.helper) {
      return currentStepConfig.helper;
    } else if (isContactStep) {
      if (currentStepConfig?.id === 'contact_info') {
        return "We'll need a few details to send you personalized security quotes";
      } else if (currentStepConfig?.id === 'phone') {
        return "For fastest service and exclusive phone-only discounts";
      }
    }
    return '';
  };

  return (
    <div className="flex flex-col h-full md:h-auto p-6 md:p-0">
      {/* Logo - Visible only on mobile, moved to top */}
      <div className="md:hidden flex justify-center mb-6 flex-shrink-0">
        <img
          src="/yourhomesecured-330x330-website (1).svg"
          alt="YourHomeSecured"
          className="w-12 h-12 opacity-60"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-navy font-medium">{Math.round(progress)}% Complete</span>
          <span className="px-2 py-0.5 bg-navy text-white text-xs font-semibold rounded-full">
            Step {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-sm overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-600 via-teal to-teal-600 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Container - grows to fill available space on mobile */}
      <div className="flex-1 flex flex-col justify-center md:block md:flex-none">
        {/* Step Title - 20% bigger on all formats */}
        <h3 className="text-3xl md:text-3xl font-bold text-gold mb-2">
          {getStepTitle()}
        </h3>

        {/* Helper Text */}
        {getHelperText() && (
          <p className="text-teal-700 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal rounded-full"></span>
            {getHelperText()}
          </p>
        )}

        {/* Content based on step type */}
      {isQuizStep && currentStepConfig ? (
        // Quiz Question Options with semantic HTML
        <div
          className="space-y-3"
          data-leadid-question-container="true"
          data-question-id={currentStepConfig.id}
          data-question-step={currentStep}
        >
          {currentStepConfig.options?.map((option, idx) => {
            const isSelected = quizData[currentStepConfig.id as keyof typeof quizData] === option.value;
            const isRecommended = option.recommended === true;

            return (
              <label
                key={idx}
                className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all relative overflow-hidden group cursor-pointer block
                  ${isSelected
                    ? 'border-navy bg-gradient-to-r from-teal-50 to-primary-50 shadow-md'
                    : isRecommended
                    ? 'border-accent bg-gradient-to-r from-accent-50/50 to-gold-50/30 hover:border-accent-600 hover:shadow-md border-l-4'
                    : 'border-primary-200 hover:border-teal hover:bg-teal-50/50 hover:shadow-sm'}`}
              >
                {/* Hidden radio input for semantic HTML and Jornaya tracking */}
                <input
                  type="radio"
                  name={`quiz-step-${currentStep}-${currentStepConfig.id}`}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleOptionSelect(option.label)}
                  data-option-value={option.value}
                  data-option-label={option.label}
                  className="sr-only"
                />
                {isRecommended && !isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-gold"></div>
                )}
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${isSelected ? 'text-navy' : 'text-gray-800'}`}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="bg-secondary text-white rounded-full p-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  {isRecommended && !isSelected && (
                    <span className="text-xs font-bold text-accent-600 bg-gold-100 px-2 py-1 rounded-full">RECOMMENDED</span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      ) : isContactStep && currentStepConfig ? (
        // Contact Field(s)
        <div>
          {currentStepConfig.id === 'contact_info' && (
            <div className="space-y-4">
              {/* First Name - Full Width */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First name"
                    value={quizData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className={`
                      w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-all
                      ${firstNameValidation.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                       firstNameValidation.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-primary-300 focus:border-teal'}
                    `}
                    autoFocus
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

              {/* Last Name - Full Width */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last name"
                    value={quizData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className={`
                      w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-all
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

              {/* Email Address - Full Width */}
              <EmailField
                initialValue={quizData.email}
                onValidationComplete={(isValid, value) => {
                  setEmailValid(isValid);
                  handleInputChange('email', value);
                }}
                placeholder="you@example.com"
              />
            </div>
          )}

          {currentStepConfig.id === 'phone' && (
            <PhoneField
              initialValue={quizData.phone}
              onValidationComplete={(isValid, value) => {
                setPhoneValid(isValid);
                handleInputChange('phone', value);
              }}
              onOTPVerified={() => {
                setPhoneVerified(true);
              }}
              placeholder={currentStepConfig.placeholder}
              autoFocus
            />
          )}
        </div>
      ) : null}
      </div>

      {/* Compliance Fields - leadid_token is provided by ComplianceProvider globally */}
      {/* No duplicate field needed to avoid DOM ID conflicts */}

      {/* TCPA Consent - Visible only on final step */}
      <div
        id="leadid_tcpa_disclosure"
        style={{ display: isFinalContactStep ? 'block' : 'none' }}
        className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
      >
        <div
          className="text-xs text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:underline"
          dangerouslySetInnerHTML={{
            __html: complianceContent.consent.text
          }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-auto md:mt-8 flex-shrink-0 pt-6">
        {isFinalContactStep ? (
          // Submit button on final step without back button
          <>
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-secondary to-green-muted hover:from-secondary-600 hover:to-secondary disabled:bg-gray-300
                       text-white font-semibold text-base sm:text-lg rounded-lg transition-all shadow-md hover:shadow-lg
                       disabled:cursor-not-allowed flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Quotes
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          </>
        ) : isQuizStep && currentStepConfig?.type === 'button-group' ? (
          // Button-group questions: only show back button during quiz steps, no continue (auto-advances)
          <div>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-lg"
              >
                ← Back
              </button>
            )}
          </div>
        ) : isContactStep ? (
          // Contact info steps: show continue button only, no back button (forward-only for personal info)
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
            className="w-full px-8 py-3 bg-gradient-to-r from-primary-600 to-teal hover:from-navy hover:to-teal-600 disabled:bg-gray-300
                     text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg
                     disabled:cursor-not-allowed disabled:opacity-50"
            style={{ pointerEvents: !canProceed() ? 'none' : 'auto' }}
          >
            Continue
          </button>
        ) : null}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2">Wait! You're almost done</h3>
            <p className="text-gray-600 mb-4">
              You're just {totalSteps - currentStep} questions away from your personalized quotes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleExitCancel}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Continue Quiz
              </button>
              <button
                onClick={handleExitConfirm}
                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};