import React from 'react';
import { Phone, Calendar, CheckCircle, Gift, AlertCircle } from 'lucide-react';

interface PricingActionProps {
  config: {
    title: string;
    startingPrice: string;
    priceLabel: string;
    pricePeriod: string;
    features: string[];
    visaOffer?: {
      title: string;
      disclaimer: string;
      cardImage?: string;
    };
    urgencyMessage: string;
    primaryCta: {
      text: string;
      phone: string;
    };
    secondaryCta: {
      text: string;
    };
  };
  userData: {
    firstName: string;
    city: string;
    zip: string;
    homeType: string;
  };
}

export const PricingAction: React.FC<PricingActionProps> = ({ config, userData }) => {
  const urgencyMessage = config.urgencyMessage.replace('{city}', userData.city);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-xl border-2 border-blue-200">
          <div className="text-center mb-8">
            <div className="text-gray-700 text-lg mb-2">{config.priceLabel}</div>
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {config.startingPrice}
            </div>
            <div className="text-gray-600 text-lg">{config.pricePeriod}</div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8">
            <ul className="space-y-4">
              {config.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {config.visaOffer && (
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  {config.visaOffer.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {config.visaOffer.disclaimer}
              </p>
            </div>
          )}

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-semibold">{urgencyMessage}</p>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href={`tel:${config.primaryCta.phone}`}
              className="block w-full bg-green-600 text-white text-center py-5 px-8 rounded-xl hover:bg-green-700 transition-colors font-bold text-xl shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                {config.primaryCta.text}
              </div>
            </a>

            <button className="block w-full bg-white text-blue-600 text-center py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors font-semibold border-2 border-blue-600">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" />
                {config.secondaryCta.text}
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
