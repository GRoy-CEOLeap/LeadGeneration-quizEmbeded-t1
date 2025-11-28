import React from 'react';

export const MovingBanner: React.FC = () => {
  const bannerItems = [
    "⚖️ $100,000+ average motor vehicle accident settlement",
    "🏥 Medical bills, lost wages, and pain & suffering all covered",
    "📋 72-hour window to preserve critical evidence",
    "🎯 10-minute connection to qualified attorneys",
    "💯 100% free case review - no win, no fee guarantee",
    "👨‍⚖️ Pre-vetted attorneys with proven track records",
    "📞 15,000+ accident victims successfully represented",
    "🔒 Licensed attorneys only - your case, your rights"
  ];

  return (
    <div className="bg-teal-50 py-4 overflow-hidden whitespace-nowrap border-y border-teal-100">
      <div className="animate-scroll inline-block">
        {[...bannerItems, ...bannerItems].map((item, index) => (
          <span
            key={index}
            className="inline-block mx-8 text-navy font-medium text-lg"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
