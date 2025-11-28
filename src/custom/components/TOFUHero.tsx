import React from 'react';
import { tofuContent } from '../../config/tofuContent.config';
import { CheckCircle } from 'lucide-react';

interface TOFUHeroProps {
  onQuizStart: () => void;
}

export const TOFUHero: React.FC<TOFUHeroProps> = ({ onQuizStart }) => {
  return (
    <section className="hero-section relative min-h-screen flex items-center bg-gradient-to-br from-navy via-teal-900 to-teal-700">
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-[2]"></div>

      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">

          <div className="text-white">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <img
                src="/pi_300x300 copy.png"
                alt="Personal Injury Hotline Logo"
                className="w-10 h-10 rounded-lg"
              />
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <span className="text-green-muted">✓</span>
                <span className="text-sm">Trusted by 15,000+ Accident Victims</span>
              </div>
            </div>

            <p className="hidden md:block text-xl md:text-2xl text-teal-100 mb-4 text-center md:text-left">
              {tofuContent.hero.subheadline}
            </p>

            <p className="text-lg text-teal-200 mb-8 text-center md:text-left">
              {tofuContent.hero.subText}
            </p>

            <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
              {tofuContent.hero.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gold">
                    {stat.number}{stat.unit}
                  </div>
                  <div className="text-sm text-teal-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mt-0 md:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-center text-navy">
              {tofuContent.hero.headline}
            </h1>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-navy mb-2">
                Get The Settlement You Deserve
              </h2>
              <p className="text-gray-600 flex flex-col">
                <span>No win, no fee.</span>
                <span>100k+ settlement in average</span>
              </p>
            </div>

            <form className="space-y-4">
              <button
                type="button"
                onClick={onQuizStart}
                className="w-full bg-gold hover:bg-gold-600 text-navy font-bold text-lg py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {tofuContent.hero.cta.text}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-muted rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">No Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-muted rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">No Pressure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-muted rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">100% Free Review</span>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500">
                In less than 60 seconds - Get matched with licensed attorneys online
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-br from-teal-50 to-gold-50 rounded-xl p-5 md:p-6 border border-teal-100 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h3 className="text-base md:text-lg font-bold text-navy text-center">
                    {tofuContent.hero.socialProof.title}
                  </h3>
                </div>
                <div className="space-y-2.5 md:space-y-3">
                  {tofuContent.hero.socialProof.description.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 md:gap-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-muted flex-shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed flex-1">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-4 mt-8 col-span-full">
            {tofuContent.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <div className="text-2xl font-bold text-gold">
                  {stat.number}{stat.unit}
                </div>
                <div className="text-sm text-teal-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
