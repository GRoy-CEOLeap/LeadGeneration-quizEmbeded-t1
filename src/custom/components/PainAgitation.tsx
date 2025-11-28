import React from 'react';
import { tofuContent } from '../../config/tofuContent.config';

export const PainAgitation: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-navy mb-6">
          {tofuContent.painAgitation.headline}
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          {tofuContent.painAgitation.subheadline}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {tofuContent.painAgitation.painPoints.map((point, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal">
              <div className="text-3xl font-bold text-teal mb-2">{point.stat}</div>
              <p className="text-gray-700 font-medium">{point.description}</p>
              <p className="text-sm text-red-600 mt-2 font-semibold">{point.impact}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <p className="text-2xl font-semibold text-navy mb-4">
            {tofuContent.painAgitation.bridge.text}
          </p>
          <p className="text-xl text-teal font-bold">
            {tofuContent.painAgitation.bridge.cta}
          </p>
        </div>
      </div>
    </section>
  );
};
