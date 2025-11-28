import React from 'react';
import { Shield } from 'lucide-react';

interface OutcomeFooterProps {
  config: {
    complianceText: string;
    links: Array<{
      text: string;
      href: string;
    }>;
    disclaimer: string;
  };
}

export const OutcomeFooter: React.FC<OutcomeFooterProps> = ({ config }) => {
  return (
    <footer className="bg-navy text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 pb-8 border-b border-gray-700">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">YourHomeSecured</h3>
          </div>

          <p className="text-center text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
            {config.complianceText}
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {config.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-4">
            {config.disclaimer}
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} YourHomeSecured. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
