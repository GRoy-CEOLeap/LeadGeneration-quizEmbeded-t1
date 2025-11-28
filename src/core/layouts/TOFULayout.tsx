import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TOFUHero } from '../../custom/components/TOFUHero';
import { PainAgitation } from '../../custom/components/PainAgitation';
import { ComparisonSection } from '../../custom/components/ComparisonSection';
import { SocialProofWall } from '../../custom/components/SocialProofWall';
import { TestimonialDisclaimer } from '../../custom/components/TestimonialDisclaimer';
import { EducationalValueProps } from '../../custom/components/EducationalValueProps';
import { SimpleHowItWorks } from '../../custom/components/SimpleHowItWorks';
import { TOFUFinalCTA } from '../../custom/components/TOFUFinalCTA';
import { Footer } from '../components/Footer';
import { QuizOverlay } from '../components/QuizOverlay';
import { MovingBanner } from '../components/MovingBanner';
import { piContent } from '../../config/pi/content.config';

export const TOFULayout: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100;
      setShowStickyBar(scrollPercentage > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizStart = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_start_pi_tofu', {
        event_category: 'engagement',
        event_label: 'PI TOFU Page'
      });
    }
    setIsQuizOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <TOFUHero onQuizStart={handleQuizStart} />

      <MovingBanner />

      <PainAgitation />

      <ComparisonSection onQuizStart={handleQuizStart} />

      <SocialProofWall />

      <TestimonialDisclaimer />

      <EducationalValueProps />

      <SimpleHowItWorks onQuizStart={handleQuizStart} />

      <TOFUFinalCTA onQuizStart={handleQuizStart} />

      <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-8 sm:mb-10 text-center">
            Frequently Asked Questions <span className="text-gold">FAQ</span>
          </h2>

          <div className="space-y-4">
            {piContent.faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-navy hover:bg-gray-100 transition-colors list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-4 sm:p-5 pt-0 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <QuizOverlay isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy p-3 shadow-lg">
          <button
            onClick={handleQuizStart}
            className="w-full bg-gold hover:bg-gold-600 text-navy font-bold py-3 rounded-lg transition-colors"
          >
            Get My Free Case Review →
          </button>
        </div>
      )}
    </div>
  );
};
