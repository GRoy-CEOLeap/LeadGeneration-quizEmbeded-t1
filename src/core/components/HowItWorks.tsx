import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HowItWorksProps {
  onQuizStart: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onQuizStart }) => {
  const steps = [
    {
      number: "01",
      title: "Answer Quick Questions",
      description: "Tell us about your home, security preferences, and timeline."
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Receive 1-3 customized recommendations based on your specific needs."
    },
    {
      number: "03",
      title: "Choose Your Path",
      description: "Schedule installation, request consultation, or save results for later."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 text-center max-w-xs">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white font-bold text-xl rounded-full mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <ChevronRight className="hidden md:block w-8 h-8 text-blue-400 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onQuizStart}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-300"
          >
            Get My Free Security Match
          </button>
        </div>
      </div>
    </section>
  );
};