import React from 'react';
import { tofuContent } from '../../config/tofuContent.config';

interface SimpleHowItWorksProps {
  onQuizStart: () => void;
}

export const SimpleHowItWorks: React.FC<SimpleHowItWorksProps> = ({ onQuizStart }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-teal-50 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-navy mb-6">
          {tofuContent.simpleHow.headline}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          {tofuContent.simpleHow.subheadline}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {tofuContent.simpleHow.steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-teal-100 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal to-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-xl ring-4 ring-teal-100">
                      {step.number}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-navy text-xs font-bold">✓</span>
                    </div>
                  </div>
                  <div className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {step.time}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onQuizStart}
            className="bg-gold hover:bg-gold-600 text-navy font-bold text-lg px-8 py-4 rounded-lg transition-all shadow-lg transform hover:scale-105"
          >
            {tofuContent.hero.cta.text}
          </button>
        </div>
      </div>
    </section>
  );
};
