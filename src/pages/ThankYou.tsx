import React, { useEffect } from 'react';
import { XCircle, Phone } from 'lucide-react';
import { piContent } from '../config/pi/content.config';
import { Footer } from '../core/components/Footer';

const ThankYou: React.FC = () => {
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    if (favicon) {
      favicon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }
    if (appleTouchIcon) {
      appleTouchIcon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }

    document.title = 'Personal Injury Hotline™ - Thank You';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex justify-center items-center py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <img
            src="/pi_300x300 copy.png"
            alt="Personal Injury Hotline Logo"
            className="w-12 h-12"
          />
          <span className="font-heading text-xl sm:text-2xl font-bold text-navy">
            Personal Injury Hotline™
          </span>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-large p-6 sm:p-8 lg:p-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
              </div>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-center">
              {piContent.disqualified.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-700 mb-6 text-center">
              {piContent.disqualified.message}
            </p>

            <ul className="space-y-3 mb-8">
              {piContent.disqualified.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="border-2 border-teal rounded-xl p-6 bg-teal-50">
              <h3 className="font-heading text-xl font-semibold text-navy mb-3 text-center">
                {piContent.disqualified.supportBox.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-6 text-center">
                {piContent.disqualified.supportBox.message}
              </p>
              <div className="flex justify-center">
                <a
                  href={`tel:${piContent.disqualified.supportBox.phone}`}
                  className="flex items-center gap-2 px-8 py-4 bg-teal text-white rounded-xl font-bold text-lg hover:bg-teal-600 transition-all shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  {piContent.disqualified.supportBox.buttonText}
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-8 text-center leading-relaxed">
              {piContent.disqualified.footer}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;
