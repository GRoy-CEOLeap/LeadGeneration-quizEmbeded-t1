import React, { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storeQuizAnswer, storeQuizMetadata } from '../utils/session';

interface ExitIntentPopupProps {
  quizVersion: string;
  questionsRoute: string;
  brandLogo: string;
  brandName: string;
  headline: string;
  subheadline: string;
  question: string;
  buttonText: string;
  options: string[];
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  quizVersion,
  questionsRoute,
  brandLogo,
  brandName,
  headline,
  subheadline,
  question,
  buttonText,
  options,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    if (!selectedValue) {
      alert('Please select an option to continue.');
      return;
    }

    // Store quiz metadata (version and start time)
    storeQuizMetadata(quizVersion);

    // Store state answer using centralized session management
    storeQuizAnswer('state', selectedValue);

    setIsVisible(false);
    navigate(questionsRoute + '?step=2');
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 sm:p-12 relative animate-slideUp pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-6">
            <img
              src={brandLogo}
              alt={brandName}
              className="h-16 sm:h-20"
            />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-navy text-center mb-4">
            {headline}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 text-center mb-8">
            {subheadline}
          </p>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-navy mb-3 text-center">
              {question}
            </label>
            <div className="relative">
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-4 pr-10 text-navy font-medium focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal cursor-pointer text-base"
              >
                <option value="">Select a state...</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gold hover:bg-gold-600 text-navy font-bold text-lg py-4 px-6 rounded-lg transition-colors shadow-md"
          >
            {buttonText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};
