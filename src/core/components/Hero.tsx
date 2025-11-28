import React from 'react';

interface HeroProps {
  onQuizStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuizStart }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-[1]"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center">
            <img 
              src="/yourhomesecured-330x330-website (1).svg" 
              alt="YourHomeSecured Logo" 
              className="w-24 h-24"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Protect Your Home.<br />
          Protect Your Family.
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          In just 1 minute, discover the best security solution for your home — 
          backed by trusted providers, monitored 24/7.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onQuizStart}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl mb-6 inline-flex items-center gap-2"
        >
          👉 Take the 1-Minute Home Security Quiz
        </button>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>No cost, no obligation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Private & secure form</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>U.S. homeowners only</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-4">
        <button
          onClick={onQuizStart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-3 rounded-lg transition-colors duration-300"
        >
          Start Free Quiz
        </button>
      </div>
    </section>
  );
};