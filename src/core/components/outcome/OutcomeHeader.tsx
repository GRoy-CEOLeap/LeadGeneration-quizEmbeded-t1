import React from 'react';
import { Phone } from 'lucide-react';

interface OutcomeHeaderProps {
  config: {
    partnerLogo: string;
    providerLogo: string;
    phone: string;
  };
}

export const OutcomeHeader: React.FC<OutcomeHeaderProps> = ({ config }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={config.partnerLogo}
              alt="YourHomeSecured"
              className="h-10 w-auto"
            />
            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <span>×</span>
            </div>
            <img
              src={config.providerLogo}
              alt="Security Provider"
              className="h-10 w-auto"
            />
          </div>

          <a
            href={`tel:${config.phone}`}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">{config.phone}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  );
};
