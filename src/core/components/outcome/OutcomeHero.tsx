import React from 'react';
import { ShieldCheck, Clock, DollarSign, CheckCircle, Gift } from 'lucide-react';

interface OutcomeHeroProps {
  config: {
    headline: string;
    subheadline: string;
    confirmationIcon: string;
    matchCard: {
      matchScore: string;
      provider: string;
      installation: string;
      monthlyRate: string;
      promotion?: {
        label: string;
        text: string;
      };
    };
  };
  userData: {
    firstName: string;
    city: string;
    zip: string;
    homeType: string;
  };
}

export const OutcomeHero: React.FC<OutcomeHeroProps> = ({ config, userData }) => {
  const personalizedHeadline = config.headline
    .replace('{firstName}', userData.firstName)
    .replace('{city}', userData.city);

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {personalizedHeadline}
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {config.subheadline}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm">
                {config.matchCard.matchScore}
              </div>
              <h3 className="text-2xl font-bold">{config.matchCard.provider}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Installation Available</div>
                <div className="font-bold text-lg">{config.matchCard.installation}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Starting From</div>
                <div className="font-bold text-lg">{config.matchCard.monthlyRate}</div>
              </div>
            </div>
          </div>

          {config.matchCard.promotion && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <span className="text-orange-600 font-bold text-sm">
                    {config.matchCard.promotion.label}
                  </span>
                  <span className="text-gray-800 font-semibold ml-2">
                    {config.matchCard.promotion.text}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
