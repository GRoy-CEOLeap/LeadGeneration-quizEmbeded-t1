import React from 'react';
import { tofuContent } from '../../config/tofuContent.config';

interface TOFUFinalCTAProps {
  onQuizStart: () => void;
}

export const TOFUFinalCTA: React.FC<TOFUFinalCTAProps> = ({ onQuizStart }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-navy via-teal-900 to-teal-700 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {tofuContent.finalCTA.headline}
        </h2>
        <p className="text-xl mb-8 text-teal-100">
          {tofuContent.finalCTA.subheadline}
        </p>

        <button
          onClick={onQuizStart}
          className="bg-gold hover:bg-gold-600 text-navy font-bold text-xl px-10 py-5 rounded-lg transition-all shadow-xl transform hover:scale-105 mb-6"
        >
          {tofuContent.finalCTA.cta.text}
        </button>

        <p className="text-sm text-gold-200 mb-8">
          {tofuContent.finalCTA.cta.urgency}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          {tofuContent.finalCTA.guarantees.map((guarantee, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2">
              <span className="text-green-muted text-xl">✓</span>
              <span>{guarantee}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
