import React from 'react';
import { tofuContent } from '../../config/tofuContent.config';
import { X, CheckCircle } from 'lucide-react';

interface ComparisonSectionProps {
  onQuizStart: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onQuizStart }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-navy mb-6">
          {tofuContent.comparisonSection.headline}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          {tofuContent.comparisonSection.subheadline}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 p-8 rounded-lg border-2 border-red-200 shadow-md">
            <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
              <X className="w-6 h-6" />
              {tofuContent.comparisonSection.oldWay.title}
            </h3>
            <ul className="space-y-3 text-gray-700">
              {tofuContent.comparisonSection.oldWay.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-red-600 font-semibold mt-6 text-lg">
              ⏰ {tofuContent.comparisonSection.oldWay.timeframe}
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-lg border-2 border-teal shadow-lg">
            <h3 className="text-2xl font-bold text-teal mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              {tofuContent.comparisonSection.ourWay.title}
            </h3>
            <ul className="space-y-3 text-gray-700">
              {tofuContent.comparisonSection.ourWay.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-muted flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-teal font-semibold mt-6 text-lg">
              ✓ {tofuContent.comparisonSection.ourWay.timeframe}
            </p>
          </div>
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
