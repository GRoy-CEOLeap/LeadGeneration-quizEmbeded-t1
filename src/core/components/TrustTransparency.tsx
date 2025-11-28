import React from 'react';
import { Lock, CheckCircle, Flag } from 'lucide-react';

export const TrustTransparency: React.FC = () => {
  const trustBadges = [
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "Secure Form"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Trusted Providers"
    },
    {
      icon: <Flag className="w-8 h-8 text-red-500" />,
      title: "U.S.-Based Support"
    }
  ];

  const transparencyPoints = [
    "No credit check to see options",
    "We only connect you if you ask us to",
    "Your privacy matters - we never sell your info without consent",
    "You can opt out anytime"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Trust Badges */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Your Security & Privacy Matter
            </h3>
            <div className="space-y-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    {badge.icon}
                  </div>
                  <span className="text-xl font-semibold text-gray-900">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Points */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Our Promise to You
            </h3>
            <ul className="space-y-4">
              {transparencyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};