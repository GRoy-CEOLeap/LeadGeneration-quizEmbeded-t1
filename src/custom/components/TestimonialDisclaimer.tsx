import React from 'react';

export const TestimonialDisclaimer: React.FC = () => {
  return (
    <section className="pb-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-6">
          <p>
            <span className="font-medium">Disclaimer:</span> Testimonials represent individual experiences and do not guarantee similar results.
            Personal Injury Hotline is not a law firm and does not provide legal advice. Case outcomes depend on specific facts and circumstances.
            Only licensed attorneys can evaluate your claim. Past results do not predict future outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};
