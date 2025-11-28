import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface MobileStickyCTAProps {
  config: {
    text: string;
    phone: string;
  };
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ config }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t-2 border-blue-600 shadow-2xl">
        <a
          href={`tel:${config.phone}`}
          className="flex items-center justify-center gap-3 bg-green-600 text-white py-4 px-6 font-bold text-lg hover:bg-green-700 transition-colors"
        >
          <Phone className="w-6 h-6" />
          {config.text}
        </a>
      </div>
    </div>
  );
};
