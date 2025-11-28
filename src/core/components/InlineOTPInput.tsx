import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface InlineOTPInputProps {
  phoneNumber: string;
  onVerify: (code: string) => Promise<{ success: boolean; message?: string }>;
  onResend: () => Promise<void>;
}

export const InlineOTPInput: React.FC<InlineOTPInputProps> = ({
  phoneNumber,
  onVerify,
  onResend
}) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [webOtpSupported, setWebOtpSupported] = useState(false);
  const [isListeningForOtp, setIsListeningForOtp] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(() => {
    setIsFirstClick(true);
  }, [phoneNumber]);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, []);

  useEffect(() => {
    if ('OTPCredential' in window) {
      setWebOtpSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!webOtpSupported) return;

    const startWebOtpListener = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const ac = new AbortController();
      abortControllerRef.current = ac;
      setIsListeningForOtp(true);

      try {
        const credential = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: ac.signal
        } as any);

        if (credential && 'code' in credential) {
          const code = (credential as any).code;
          const digits = code.replace(/\D/g, '').slice(0, 6);

          if (digits.length === 6) {
            const newCode = digits.split('');
            setOtpCode(newCode);
            setError('');
            setIsListeningForOtp(false);
            handleVerify(digits);
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log('WebOTP not available or user cancelled');
        }
      } finally {
        setIsListeningForOtp(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setIsListeningForOtp(false);
      }
    }, 60000);

    startWebOtpListener();

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setIsListeningForOtp(false);
    };
  }, [webOtpSupported, phoneNumber]);

  const handleOtpInput = (index: number, value: string) => {
    if (abortControllerRef.current && isListeningForOtp) {
      abortControllerRef.current.abort();
      setIsListeningForOtp(false);
    }

    // Handle full code input (from autofill or paste)
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      const newCode = digits.split('').concat(['', '', '', '', '', '']).slice(0, 6);
      setOtpCode(newCode);
      setError('');

      if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
        handleVerify(newCode.join(''));
      }
      return;
    }

    // Handle single digit input
    if (!/^\d*$/.test(value)) return;

    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    setError('');

    try {
      const result = await onVerify(code);

      if (!result.success) {
        setError(result.message || 'Invalid code. Please try again.');
        setOtpCode(['', '', '', '', '', '']);
        setShowResend(true);
        setResendCountdown(3);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
      setOtpCode(['', '', '', '', '', '']);
      setShowResend(true);
      setResendCountdown(3);
    } finally {
      setLoading(false);
    }
  };

  const handleResendClick = async () => {
    if (resendCountdown > 0) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setLoading(true);
    setError('');
    setOtpCode(['', '', '', '', '', '']);
    setShowResend(false);
    setResendCountdown(0);
    setIsFirstClick(true);
    setIsListeningForOtp(false);

    try {
      await onResend();
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
      setShowResend(true);
      setResendCountdown(3);
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = (index: number) => {
    // On first click, always focus the first input box regardless of which box was clicked
    if (isFirstClick) {
      setIsFirstClick(false);
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
        firstInput.setSelectionRange(0, firstInput.value.length);
      }
      return;
    }

    // Normal behavior: focus the clicked input
    const clickedInput = inputRefs.current[index];
    if (!clickedInput) return;

    clickedInput.focus();
    clickedInput.setSelectionRange(0, clickedInput.value.length);
  };

  return (
    <div className="mt-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-xs sm:text-sm text-gray-700 mb-3">
        Please, enter the code sent at <strong className="break-all">{phoneNumber}</strong>
      </p>

      {isListeningForOtp && (
        <div className="flex items-center justify-center gap-2 text-xs text-blue-600 mb-2">
          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <span>Waiting for SMS code...</span>
        </div>
      )}

      <div className="flex gap-1.5 sm:gap-2 mb-3 justify-center">
        {otpCode.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={i === 0 ? 6 : 1}
            value={digit}
            onChange={(e) => handleOtpInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onClick={() => handleInputClick(i)}
            onPaste={(e) => {
              e.preventDefault();
              const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
              if (pastedData.length === 6) {
                const newCode = pastedData.split('');
                setOtpCode(newCode);
                setError('');
                handleVerify(pastedData);
              }
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded text-center text-base sm:text-lg font-semibold focus:border-blue-600 focus:outline-none transition-colors"
            disabled={loading}
          />
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-blue-600 mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying code...</span>
        </div>
      )}

      {error && (
        <p className="text-xs sm:text-sm text-red-600 mb-2 text-center">{error}</p>
      )}

      {showResend && (
        <div className="text-center">
          {resendCountdown > 0 ? (
            <p className="text-xs sm:text-sm text-gray-500">
              Resend code in {resendCountdown}s
            </p>
          ) : (
            <button
              onClick={handleResendClick}
              disabled={loading}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 underline disabled:text-gray-400"
            >
              Resend code
            </button>
          )}
        </div>
      )}
    </div>
  );
};
