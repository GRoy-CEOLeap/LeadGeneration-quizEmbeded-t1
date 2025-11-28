import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QuizOverlay } from '../components/QuizOverlay';
import { Footer } from '../components/Footer';
import { complianceContent } from '../../config/compliance.content.config';
import { siteConfig } from '../../config/site.config';

export const TCPADisclaimer: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleQuizStart = () => {
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <img 
                  src="/yourhomesecured-330x330-website (1).svg" 
                  alt="YourHomeSecured Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gray-900">{siteConfig.client.name}</span>
              </div>
            </div>
            <button
              onClick={handleQuizStart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Secure My Home Now !
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {complianceContent.tcpa.title}
            </h1>
            
            <p className="text-gray-600 mb-8">
              Last updated: {complianceContent.tcpa.lastUpdated}
            </p>

            <div className="space-y-8">
              {complianceContent.tcpa.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This TCPA Disclaimer is effective as of {complianceContent.tcpa.lastUpdated}. By using our services, you acknowledge that you have read and understood this disclaimer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuizOverlay isOpen={isQuizOpen} onClose={handleQuizClose} />
      <Footer />
    </div>
  );
};