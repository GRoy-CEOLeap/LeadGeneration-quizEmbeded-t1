import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeQuizAnswer, storeValidation, getSessionData } from '../utils/session';
import { validateField } from '../utils/validation';
import { Loader2, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Footer } from '../components/Footer';
import { FAQ } from '../components/FAQ';
import { config } from '../../config/environment.config';

export const QuoteLanding: React.FC = () => {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState('');
  const [validationState, setValidationState] = useState<{
    loading: boolean;
    valid: boolean | null;
    error: string | null;
  }>({ loading: false, valid: null, error: null });

  // Strict debounce: track validation in progress and last validated value
  const zipValidationInProgress = useRef(false);
  const lastValidatedZip = useRef<string>('');

  const handleInputChange = async (value: string) => {
    // Only allow digits
    const cleaned = value.replace(/\D/g, '').slice(0, 5);
    setZipCode(cleaned);

    // Clear cache when user types - cache should only work within same typing session
    lastValidatedZip.current = '';

    // Reset validation state when typing (but not if we're currently validating)
    if (cleaned.length < 5 && !validationState.loading) {
      setValidationState({ loading: false, valid: null, error: null });
    }

    // Auto-validate when 5 digits entered
    if (cleaned.length === 5) {
      await validateAndProceed(cleaned);
    }
  };

  const validateAndProceed = async (zip: string) => {
    // STRICT DEBOUNCE: Check if validation already in progress
    if (zipValidationInProgress.current) {
      console.log('ZIP validation already in progress, skipping duplicate call');
      return;
    }

    // STRICT DEBOUNCE: Check if we already validated this exact value in this typing session
    if (zip === lastValidatedZip.current) {
      console.log('ZIP already validated in this session, skipping duplicate call');
      return;
    }

    console.log('Validating ZIP via API:', zip);

    // Store the ZIP answer first
    storeQuizAnswer('zip', zip);

    // STRICT DEBOUNCE: Mark validation as in progress
    zipValidationInProgress.current = true;

    // Set loading state
    setValidationState({ loading: true, valid: null, error: null });

    try {
      // Create a step config object like QuizOverlay uses
      const zipStep = {
        id: 'zip',
        validation: {
          apiEndpoint: config.api.zipValidation,
          message: 'Service not available in this area'
        }
      };
      
      const sessionData = getSessionData();
      
      // Use the same validateField function
      const result = await validateField(zipStep, zip, sessionData);

      // STRICT DEBOUNCE: Clear in-progress flag
      zipValidationInProgress.current = false;

      console.log('ZIP Validation result:', result);

      if (result.valid) {
        // STRICT DEBOUNCE: Store the validated value
        lastValidatedZip.current = zip;

        // Store the full validation result (includes city, state, etc.)
        storeValidation('zip', result);

        // Show success briefly
        setValidationState({
          loading: false,
          valid: true,
          error: null
        });

        // Auto-navigate after brief success indication (750ms)
        setTimeout(() => {
          navigate('/quote/quiz');
        }, 750);
      } else {
        // Show error - user needs to try different ZIP
        setValidationState({
          loading: false,
          valid: false,
          error: result.error || 'Service not available in this area. Please try another ZIP code.'
        });
      }
    } catch (error) {
      // STRICT DEBOUNCE: Clear in-progress flag on error
      zipValidationInProgress.current = false;

      console.error('ZIP validation error:', error);
      // On API error, show generic error
      setValidationState({
        loading: false,
        valid: false,
        error: 'Unable to validate ZIP code. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-900">
      {/* Simple Header */}
      <header className="bg-white/10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/yourhomesecured-330x330-website (1).svg" 
              alt="YourHomeSecured" 
              className="w-8 h-8 brightness-0 invert"
            />
            <span className="text-xl font-bold text-white">YourHomeSecured</span>
          </div>
        </div>
      </header>

      {/* Hero with Embedded Question */}
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Protect Your Home in 60 Seconds
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Get matched with trusted security providers in your area
          </p>

          {/* ZIP Code Form Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-3 text-left">
                Enter Your ZIP Code to Check Availability
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="ZIP Code"
                  className={`w-full px-4 py-4 border-2 rounded-lg text-xl font-semibold text-center
                    ${validationState.valid === false ? 'border-red-500 shake-animation' : 
                      validationState.valid === true ? 'border-green-500' : 
                      zipCode.length === 5 ? 'border-blue-400' :
                      'border-gray-300'} 
                    focus:outline-none focus:border-blue-500 transition-colors`}
                  maxLength={5}
                  autoFocus
                  disabled={validationState.loading || validationState.valid === true}
                />
                
                {/* Status Icons */}
                {validationState.loading && (
                  <Loader2 className="absolute right-4 top-5 w-6 h-6 animate-spin text-blue-500" />
                )}
                {validationState.valid === true && (
                  <CheckCircle className="absolute right-4 top-5 w-6 h-6 text-green-500 animate-scale-in" />
                )}
                {validationState.valid === false && (
                  <XCircle className="absolute right-4 top-5 w-6 h-6 text-red-500 animate-scale-in" />
                )}
              </div>
              
              {/* Progress indicator */}
              {zipCode.length > 0 && zipCode.length < 5 && !validationState.error && (
                <p className="mt-2 text-xs text-gray-500 text-left">
                  {5 - zipCode.length} more digit{5 - zipCode.length !== 1 ? 's' : ''} needed
                </p>
              )}
              
              {/* Error message */}
              {validationState.error && (
                <p className="mt-2 text-sm text-red-600 text-left animate-fade-in">
                  {validationState.error}
                </p>
              )}
              
              {/* Success message */}
              {validationState.valid === true && (
                <p className="mt-2 text-sm text-green-600 text-left animate-fade-in">
                  ✓ Great! Service is available in your area. Redirecting...
                </p>
              )}
            </div>

            {/* Helper text */}
            <p className="text-xs text-gray-500 mt-4">
              {validationState.loading ? 'Checking availability...' :
               validationState.valid === true ? 'Please wait...' :
               'Enter your 5-digit ZIP code above'}
            </p>

            {/* Trust badges */}
            <div className="border-t mt-6 pt-4">
              <div className="flex justify-center gap-4 text-xs text-gray-600">
                <span>✓ Free Quotes</span>
                <span>✓ No Obligations</span>
                <span>✓ Secure Form</span>
              </div>
            </div>
          </div>

          {/* Trust indicators below card */}
          <div className="flex justify-center gap-6 mt-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Licensed providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>24/7 monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free installation</span>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <FAQ />
      </div>

      <Footer />
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .shake-animation {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};