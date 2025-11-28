import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, ArrowLeft, Loader2, CheckCircle, XCircle, Car, Truck, Bike, HelpCircle } from 'lucide-react';
import { piQuizConfig, QuizQuestion } from '../../config/pi/quiz.config';
import { piContent } from '../../config/pi/content.config';
import { complianceContent } from '../../config/compliance.content.config';
import { JornayaField } from '../components/JornayaField';
import { Footer } from '../components/Footer';
import { MovingBanner } from '../components/MovingBanner';
import { storeQuizAnswer, storeQuizMetadata, storeFormField, getSessionData, getFinalSubmissionPayload, storeValidation, storeTCPAConsent, clearQuestionData, buildClickMagickParams } from '../utils/session';
import { STATES_LIST } from '../utils/stateMapping';
import { validateField, normalizePhoneNumber, validateName } from '../utils/validation';
import { config } from '../../config/environment.config';
import { InlineOTPInput } from '../components/InlineOTPInput';

interface QuizState {
  [key: string]: string;
}

export const HomeLayout: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  const totalSteps = piQuizConfig.totalSteps;
  const [currentStep, setCurrentStep] = useState(1);
  const [quizState, setQuizState] = useState<QuizState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clickedOption, setClickedOption] = useState<string | null>(null);
  const [formFieldsReady, setFormFieldsReady] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');

  const [zipValidation, setZipValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null }>({ loading: false, valid: null, error: null });
  const [emailValidation, setEmailValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null }>({ loading: false, valid: null, error: null });
  const [phoneValidation, setPhoneValidation] = useState<{ loading: boolean; valid: boolean | null; error: string | null; message?: string }>({ loading: false, valid: null, error: null });
  const [phoneWorkflowStage, setPhoneWorkflowStage] = useState<'not_validated' | 'validated_needs_otp' | 'otp_sent' | 'otp_verified'>('not_validated');
  const [firstNameValidation, setFirstNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });
  const [lastNameValidation, setLastNameValidation] = useState<{ valid: boolean | null; error: string | null }>({ valid: null, error: null });

  const zipValidationTimeout = useRef<NodeJS.Timeout | null>(null);
  const emailValidationTimeout = useRef<NodeJS.Timeout | null>(null);
  const phoneValidationTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastValidatedZip = useRef<{ value: string; isValid: boolean } | null>(null);
  const lastValidatedEmail = useRef<{ value: string; isValid: boolean } | null>(null);
  const lastValidatedPhone = useRef<{ value: string; isValid: boolean } | null>(null);

  const questions = piQuizConfig.questions;
  const currentQuestion = questions[currentStep - 1];

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    if (favicon) {
      favicon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }
    if (appleTouchIcon) {
      appleTouchIcon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }

    document.title = 'Personal Injury Hotline™ - Free Case Review | Get Legal Help Now';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get connected with experienced personal injury attorneys. Free case review, no obligation. Available 24/7 to help you get the compensation you deserve.');
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100;
      setShowStickyBar(scrollPercentage > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    storeQuizMetadata(piQuizConfig.version);

    const session = getSessionData();
    const savedState: QuizState = {};

    questions.forEach((q) => {
      if (q.type === 'button-group') {
        const saved = session.quiz_answers[q.id];
        if (saved) {
          savedState[q.id] = saved;
        }
      } else if (q.type === 'form-section') {
        q.fields?.forEach((field) => {
          const savedFromSession = session.quiz_answers[field.id];
          const savedFormField = session.form_fields[field.id];
          const saved = savedFromSession || savedFormField;
          if (saved) {
            savedState[`${q.id}.${field.id}`] = saved;
          }
        });
      }
    });
    setQuizState(savedState);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (!hash || hash === 'start') {
        setShowHero(true);
        setCurrentStep(1);
      } else {
        // Hash exists but we no longer use quizStepMapping for HomeLayout
        // Inline quiz handles its own navigation
        setShowHero(true);
        setCurrentStep(1);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [totalSteps]);


  const goToStep = (step: number) => {
    setClickedOption(null);
    setFormFieldsReady(false);
    setCurrentStep(step);
    setShowHero(false);

    setTimeout(() => {
      setFormFieldsReady(true);
    }, 10);
  };

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    setSelectedState(value);
    storeQuizMetadata(piQuizConfig.version);
    storeQuizAnswer('state', value);
    storeFormField('state', value);

    setTimeout(() => {
      goToStep(2);
    }, 300);
  };

  const handleApplyClick = () => {
    if (!selectedState) {
      alert('Please select a state to continue.');
      return;
    }

    storeQuizMetadata(piQuizConfig.version);
    storeQuizAnswer('state', selectedState);
    storeFormField('state', selectedState);
    goToStep(2);
  };


  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleButtonGroupSelect = (questionId: string, value: string) => {
    // Set visual feedback immediately
    setClickedOption(value);

    const question = questions.find((q) => q.id === questionId);
    const selectedOption = question?.options?.find((opt) => opt.value === value);

    // Store in session immediately (for persistence)
    storeQuizAnswer(questionId, value);

    // Determine next step
    let nextStep = currentStep + 1;
    if (selectedOption?.skipTo) {
      const skipToQuestionIndex = questions.findIndex((q) => q.id === selectedOption.skipTo);
      if (skipToQuestionIndex !== -1) {
        nextStep = skipToQuestionIndex + 1;
      }
    }

    // Update state AND move to next step in ONE operation (single re-render)
    // This prevents the "checked" state from being visible to Jornaya
    setTimeout(() => {
      setQuizState((prev) => ({ ...prev, [questionId]: value }));
      if (currentStep < totalSteps) {
        goToStep(nextStep);
      }
    }, 50);
  };

  const handleQuizFieldChange = (questionId: string, fieldId: string, value: string) => {
    const key = `${questionId}.${fieldId}`;

    // Update state immediately for typing feedback
    setQuizState((prev) => ({ ...prev, [key]: value }));
    storeQuizAnswer(fieldId, value);

    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleFormFieldChange = (questionId: string, fieldId: string, value: string) => {
    const key = `${questionId}.${fieldId}`;

    if (fieldId === 'phone') {
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

    // Update state immediately for typing feedback
    setQuizState((prev) => ({ ...prev, [key]: value }));
    storeFormField(fieldId, value);

    if (fieldId === 'first_name') {
      const result = validateName(value);
      setFirstNameValidation({ valid: result.valid, error: result.error });
    } else if (fieldId === 'last_name') {
      const result = validateName(value);
      setLastNameValidation({ valid: result.valid, error: result.error });
    }

    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const clearQuestionState = (stepIndex: number) => {
    if (stepIndex < 1 || stepIndex > questions.length) return;

    const question = questions[stepIndex - 1];
    if (!question) return;

    if (question.type === 'button-group') {
      setQuizState(prev => {
        const newState = { ...prev };
        delete newState[question.id];
        return newState;
      });
      clearQuestionData(question.id);
    } else if (question.type === 'form-section') {
      const fieldsToClear: string[] = [];

      question.fields?.forEach(field => {
        const key = `${question.id}.${field.id}`;
        setQuizState(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
        fieldsToClear.push(field.id);

        if (field.id === 'zip') {
          setZipValidation({ loading: false, valid: null, error: null });
          lastValidatedZip.current = null;
          if (zipValidationTimeout.current) {
            clearTimeout(zipValidationTimeout.current);
          }
        } else if (field.id === 'email') {
          setEmailValidation({ loading: false, valid: null, error: null });
          lastValidatedEmail.current = null;
          if (emailValidationTimeout.current) {
            clearTimeout(emailValidationTimeout.current);
          }
        } else if (field.id === 'phone') {
          setPhoneValidation({ loading: false, valid: null, error: null });
          setPhoneWorkflowStage('not_validated');
          lastValidatedPhone.current = null;
          if (phoneValidationTimeout.current) {
            clearTimeout(phoneValidationTimeout.current);
          }
        } else if (field.id === 'first_name') {
          setFirstNameValidation({ valid: null, error: null });
        } else if (field.id === 'last_name') {
          setLastNameValidation({ valid: null, error: null });
        }
      });

      clearQuestionData(question.id, fieldsToClear);

      setErrors(prev => {
        const newErrors = { ...prev };
        question.fields?.forEach(field => {
          const key = `${question.id}.${field.id}`;
          delete newErrors[key];
        });
        return newErrors;
      });
    }
  };

  const validateZip = async (zip: string) => {
    if (zip.length !== 5) {
      setZipValidation({ loading: false, valid: null, error: zip.length > 0 ? 'Please enter a complete ZIP code (5 digits)' : null });
      return;
    }

    if (lastValidatedZip.current && zip === lastValidatedZip.current.value) {
      setZipValidation({ loading: false, valid: lastValidatedZip.current.isValid, error: lastValidatedZip.current.isValid ? null : 'Invalid ZIP code' });
      return;
    }

    storeQuizAnswer('zip', zip);

    setZipValidation({ loading: true, valid: null, error: null });
    const zipStep = { id: 'zip', validation: { apiEndpoint: config.api.zipValidation } };
    const session = getSessionData();
    const result = await validateField(zipStep, zip, session);

    setZipValidation({ loading: false, valid: result.valid, error: result.error });
    lastValidatedZip.current = { value: zip, isValid: result.valid };

    if (result.valid) {
      storeValidation('zip', result);
      // Delay transition to prevent Jornaya duplicate
      setTimeout(() => {
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        }
      }, 50);
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
      // Delay transition to prevent Jornaya duplicate
      setTimeout(() => {
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        }
      }, 50);
    }
  };

  const validatePhone = async (phone: string) => {
    const cleaned = normalizePhoneNumber(phone);

    if (cleaned.length !== 10) {
      setPhoneValidation({ loading: false, valid: null, error: cleaned.length > 0 ? 'Please enter a complete mobile phone number (10 digits)' : null });
      return;
    }

    if (lastValidatedPhone.current && cleaned === lastValidatedPhone.current.value) {
      setPhoneValidation({ loading: false, valid: lastValidatedPhone.current.isValid, error: lastValidatedPhone.current.isValid ? null : 'Invalid mobile phone number' });
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
      setPhoneValidation({ loading: false, valid: false, error: result.error || 'Invalid mobile phone number' });
      setPhoneWorkflowStage('not_validated');
    }
  };

  const handleSendOTP = async () => {
    const phoneKey = `${currentQuestion.id}.phone`;
    const cleaned = normalizePhoneNumber(quizState[phoneKey]);

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
    const phoneKey = `${currentQuestion.id}.phone`;
    const cleaned = normalizePhoneNumber(quizState[phoneKey]);

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

  const canProceed = () => {
    if (currentQuestion.type === 'button-group') {
      return quizState[currentQuestion.id] !== undefined && quizState[currentQuestion.id] !== '';
    } else if (currentQuestion.type === 'form-section') {
      const allFieldsFilled = currentQuestion.fields?.every((field) => {
        const key = `${currentQuestion.id}.${field.id}`;
        return !field.required || (quizState[key] && quizState[key].trim() !== '');
      }) || false;

      if (currentQuestion.id === 'zip') {
        return zipValidation.valid === true;
      } else if (currentQuestion.id === 'email') {
        return emailValidation.valid === true;
      } else if (currentQuestion.id === 'phone') {
        return phoneValidation.valid === true && phoneWorkflowStage === 'otp_verified';
      } else if (currentQuestion.id === 'first_name') {
        return firstNameValidation.valid === true;
      } else if (currentQuestion.id === 'last_name') {
        return lastNameValidation.valid === true;
      }

      return allFieldsFilled;
    }
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) {
      return;
    }

    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const targetStep = currentStep - 1;
      clearQuestionState(targetStep);
      goToStep(targetStep);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) {
      return;
    }

    setIsSubmitting(true);
    setLoadingStage('Submitting your information...');
    setLoadingProgress(20);

    setTimeout(() => {
      setLoadingStage('Analyzing your case...');
      setLoadingProgress(40);
    }, 1000);

    setTimeout(() => {
      setLoadingStage('Matching with attorneys...');
      setLoadingProgress(60);
    }, 2000);

    setTimeout(() => {
      setLoadingStage('Finalizing your review...');
      setLoadingProgress(80);
    }, 3000);

    setTimeout(async () => {
      setLoadingProgress(100);

      try {
        storeTCPAConsent(complianceContent.consent.text, true);

        const sessionData = getSessionData();
        const leadidToken = (document.querySelector('input[name="universal_leadid"]') as HTMLInputElement)?.value;
        const trustedFormCert = (document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value;

        const formData: any = getFinalSubmissionPayload();

        if (sessionData.qualification_status) {
          formData.qualification_status = sessionData.qualification_status;
        }
        if (sessionData.disqualification_reasons) {
          formData.disqualification_reasons = sessionData.disqualification_reasons;
        }

        formData.metadata = {
          ...formData.metadata,
          page_url: window.location.href,
        };

        if (leadidToken && !formData.leadid_token) {
          formData.leadid_token = leadidToken;
        }
        if (trustedFormCert && !formData.xxTrustedFormCertUrl) {
          formData.xxTrustedFormCertUrl = trustedFormCert;
        }

        const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK;
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        const searchParams = new URLSearchParams(window.location.search);
        const utmParams = new URLSearchParams();
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
          const value = searchParams.get(key);
          if (value) utmParams.set(key, value);
        });

        utmParams.set('lid', result.leadId || 'unknown');

        let queryString = utmParams.toString();
        const cmcParams = buildClickMagickParams();
        Object.entries(cmcParams).forEach(([key, value]) => {
          if (value) {
            queryString += `&${key}=${value}`;
          }
        });

        window.location.href = `/outcome?${queryString}`;

      } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your information. Please try again.');
        setIsSubmitting(false);
        setLoadingProgress(0);
      }
    }, 5000);
  };

  const progress = ((currentStep) / totalSteps) * 100;

  if (showHero) {
    return (
      <div className="min-h-screen bg-white">
        <JornayaField />

        <header className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <img
                src="/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png"
                alt="Personal Injury Legal Help Logo"
                className="w-9 h-9 sm:w-12 sm:h-12"
              />
              <span className="font-heading text-xl sm:text-2xl font-bold text-navy">
                Personal Injury Hotline™
              </span>
            </div>
          </div>
        </header>

        <section ref={heroRef} className="relative min-h-screen py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: "url('/Mobile (750 x 1334 px).png')" }}></div>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: "url('/_Desktop (1600 x 500 px) (1920 x 1080 px).png')" }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 sm:p-8 lg:p-10 mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-6 text-center leading-tight">
                {piContent.hero.headline}
                <span className="text-navy">{piContent.hero.headlineAccent}</span>
              </h1>

              <h2 className="font-heading text-2xl sm:text-2xl md:text-3xl font-bold text-gold mb-2 text-center">
                What state did the incident occur in?
              </h2>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Select the state where your accident or injury occurred.
              </p>

              <div className="relative mb-4">
                <select
                  name="step-1-accident_state"
                  value={selectedState}
                  onChange={handleStateSelect}
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

              <button
                onClick={handleApplyClick}
                className="w-full bg-gold hover:bg-gold-600 text-navy font-bold text-lg py-4 px-6 rounded-lg transition-colors shadow-md mb-5"
              >
                Get My Free Case Review
              </button>

              <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                {piContent.hero.trustElements.map((element, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{element}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white text-center mt-4 px-4 leading-relaxed">
              <span className="font-medium">Disclaimer:</span> Personal Injury Hotline is not a law firm and does not provide legal advice. Case outcomes depend on specific facts and circumstances. Only licensed attorneys can evaluate your claim. Past results do not predict future outcomes.
            </p>
          </div>
        </section>

        <MovingBanner />

        <Footer />

        {showStickyBar && (
          <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy p-3 shadow-lg">
            <button
              onClick={scrollToHero}
              className="w-full bg-gold hover:bg-gold-600 text-navy font-bold py-3 rounded-lg transition-colors"
            >
              Get My Free Case Review →
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!currentQuestion) {
    console.error('currentQuestion is undefined for step', currentStep);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JornayaField />

      <div className="md:sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
              <img
                src="/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png"
                alt="Personal Injury Hotline Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="font-semibold text-navy text-base sm:text-lg">Personal Injury Hotline™</span>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm font-medium text-green-muted">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-muted h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <form id="quiz-form" onSubmit={(e) => e.preventDefault()}>
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 mb-[50vh]">
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-600 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'button-group' && (
            <div key={`radio-group-${currentStep}-${currentQuestion.id}`} className="space-y-3">
              {(currentQuestion.options || []).map((option) => {
                const isSelected = quizState[currentQuestion.id] === option.value;
                const isClicked = clickedOption === option.value;
                const iconMap: { [key: string]: any } = {
                  'Car': Car,
                  'Truck': Truck,
                  'Bike': Bike,
                  'HelpCircle': HelpCircle
                };
                const IconComponent = option.icon ? iconMap[option.icon] : null;

                return (
                  <label
                    key={option.value}
                    className={`
                      w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer block
                      hover:border-teal hover:bg-teal-50
                      focus-within:outline-none focus-within:ring-4 focus-within:ring-teal-200
                      ${isSelected || isClicked ? 'border-teal bg-teal-50 ring-2 ring-teal-200' : 'border-gray-200 bg-white'}
                    `}
                  >
                    <input
                      type="radio"
                      name={`step-${currentStep}-${currentQuestion.id}`}
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleButtonGroupSelect(currentQuestion.id, option.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg text-navy">{option.label}</span>
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className={`w-6 h-6 ${isSelected || isClicked ? 'text-teal' : 'text-gray-400'}`} />}
                        {(isSelected || isClicked) && <Check className="w-6 h-6 text-teal flex-shrink-0" />}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'form-section' && formFieldsReady && (
            <div key={`form-section-${currentStep}-${currentQuestion.id}`} className="space-y-4">
              {currentQuestion.fields?.map((field) => {
                const key = `${currentQuestion.id}.${field.id}`;
                const value = quizState[key] || '';
                const error = errors[key];

                if (field.type === 'select' && field.id === 'state') {
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <select
                        id={field.id}
                        name="step-1-accident_state"
                        value={value}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleQuizFieldChange(currentQuestion.id, field.id, selectedValue);

                          if (selectedValue) {
                            // Delay transition to prevent Jornaya duplicate
                            setTimeout(() => {
                              if (currentStep < totalSteps) {
                                goToStep(currentStep + 1);
                              }
                            }, 50);
                          }
                        }}
                        className={`
                          w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-colors
                          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-teal'}
                        `}
                      >
                        <option value="">Select a state...</option>
                        {STATES_LIST.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                  );
                }

                if (field.id === 'zip') {
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          id={field.id}
                          name={`step-${currentStep}-${field.id}`}
                          value={value}
                          onChange={(e) => {
                            handleQuizFieldChange(currentQuestion.id, field.id, e.target.value);
                            if (zipValidationTimeout.current) {
                              clearTimeout(zipValidationTimeout.current);
                            }
                            lastValidatedZip.current = null;
                            setZipValidation({ loading: false, valid: null, error: null });

                            const newValue = e.target.value;
                            if (newValue.length === 5) {
                              zipValidationTimeout.current = setTimeout(() => {
                                validateZip(newValue);
                              }, 800);
                            }
                          }}
                          placeholder={field.placeholder}
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
                      </div>
                      {zipValidation.error && <p className="mt-1 text-sm text-red-500">{zipValidation.error}</p>}
                    </div>
                  );
                }

                if (field.id === 'email') {
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          id={field.id}
                          name={`step-${currentStep}-${field.id}`}
                          value={value}
                          onChange={(e) => {
                            handleFormFieldChange(currentQuestion.id, field.id, e.target.value);
                            if (emailValidationTimeout.current) {
                              clearTimeout(emailValidationTimeout.current);
                            }
                            lastValidatedEmail.current = null;
                            setEmailValidation({ loading: false, valid: null, error: null });

                            const newValue = e.target.value;
                            if (newValue.length > 0) {
                              setEmailValidation({ loading: true, valid: null, error: null });
                              emailValidationTimeout.current = setTimeout(() => {
                                validateEmail(newValue);
                              }, 1200);
                            }
                          }}
                          placeholder={field.placeholder}
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
                      </div>
                      {emailValidation.error && <p className="mt-1 text-sm text-red-500">{emailValidation.error}</p>}
                    </div>
                  );
                }

                if (field.id === 'phone') {
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          id={field.id}
                          name={`step-${currentStep}-${field.id}`}
                          value={value}
                          onChange={(e) => {
                            handleFormFieldChange(currentQuestion.id, field.id, e.target.value);
                            if (phoneValidationTimeout.current) {
                              clearTimeout(phoneValidationTimeout.current);
                            }
                            lastValidatedPhone.current = null;
                            setPhoneValidation({ loading: false, valid: null, error: null });
                            setPhoneWorkflowStage('not_validated');

                            const newValue = e.target.value;
                            const cleaned = normalizePhoneNumber(newValue);
                            if (cleaned.length > 0) {
                              setPhoneValidation({ loading: true, valid: null, error: null });
                              phoneValidationTimeout.current = setTimeout(() => {
                                if (cleaned.length < 10) {
                                  setPhoneValidation({ loading: false, valid: null, error: 'We are expecting 10 digits' });
                                } else {
                                  validatePhone(newValue);
                                }
                              }, 1200);
                            }
                          }}
                          placeholder={field.placeholder}
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
                          phoneNumber={value}
                          onVerify={handleVerifyOTP}
                          onResend={handleSendOTP}
                        />
                      )}
                    </div>
                  );
                }

                const getValidationState = () => {
                  if (field.id === 'first_name') return firstNameValidation;
                  if (field.id === 'last_name') return lastNameValidation;
                  return { valid: null, error: null };
                };

                const validationState = getValidationState();

                return (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type}
                        id={field.id}
                        name={`step-${currentStep}-${field.id}`}
                        value={value}
                        onChange={(e) => handleFormFieldChange(currentQuestion.id, field.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && value.trim().length > 0) {
                            e.preventDefault();
                            if (canProceed() && currentStep < totalSteps) {
                              // Batch transition for form fields to prevent Jornaya duplicate
                              setTimeout(() => {
                                goToStep(currentStep + 1);
                              }, 50);
                            }
                          }
                        }}
                        placeholder={field.placeholder}
                        className={`
                          w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition-colors
                          ${validationState.valid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
                           validationState.valid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' :
                           error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-teal'}
                        `}
                      />
                      {validationState.valid === true && (
                        <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {validationState.valid === false && (
                        <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {validationState.error && <p className="mt-1 text-sm text-red-500">{validationState.error}</p>}
                    {error && !validationState.error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                  </div>
                );
              })}

              {currentQuestion.type === 'form-section' && currentStep === totalSteps && (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="w-full mt-4 px-6 py-4 bg-gold text-navy rounded-xl font-bold text-lg hover:bg-gold-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{loadingStage}</span>
                      </div>
                      <div className="w-full bg-navy/20 rounded-full h-2 mt-2">
                        <div
                          className="bg-navy h-2 rounded-full transition-all duration-300"
                          style={{ width: `${loadingProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    'Get My Free Case Review'
                  )}
                </button>
              )}

              {currentQuestion.id === 'phone' && (
                <label id="leadid_tcpa_disclosure" className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 block">
                  <input type="hidden" />
                  <div
                    className="text-xs text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: complianceContent.consent.text }}
                  />
                </label>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4">
          {currentStep >= 2 && currentStep < 9 && currentQuestion.id !== 'zip' && (
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy rounded-xl font-semibold hover:bg-navy hover:text-white transition-all disabled:opacity-50 opacity-60"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {currentQuestion.type === 'form-section' && currentStep < totalSteps && currentQuestion.id !== 'zip' && currentQuestion.id !== 'accident_date' && (
            <button
              onClick={() => {
                if (canProceed() && currentStep < totalSteps) {
                  // Batch transition for form fields to prevent Jornaya duplicate
                  setTimeout(() => {
                    goToStep(currentStep + 1);
                  }, 50);
                }
              }}
              disabled={!canProceed()}
              className="flex-1 px-6 py-4 bg-teal text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>

        <input
          id="leadid_token"
          name="universal_leadid"
          type="hidden"
          value=""
        />
      </div>
      </form>

      <Footer />
    </div>
  );
};
