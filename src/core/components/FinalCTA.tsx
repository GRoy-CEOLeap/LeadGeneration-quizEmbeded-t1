import React from 'react';

interface FinalCTAProps {
  onQuizStart: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onQuizStart }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Secure Your Peace of Mind?
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of homeowners who've found their perfect security solution. 
          It takes just 60 seconds to get started.
        </p>
        
        <button
          onClick={onQuizStart}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xl px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Start My Free 1-Minute Quiz
        </button>
        
        <div className="mt-6 text-sm text-blue-200">
          No spam, no pressure, just personalized recommendations
        </div>
      </div>
    </section>
  );
};