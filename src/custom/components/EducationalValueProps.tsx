import React from 'react';
import { Scale, DollarSign, Clock, Shield } from 'lucide-react';
import { tofuContent } from '../../config/tofuContent.config';

export const EducationalValueProps: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    scale: Scale,
    dollar: DollarSign,
    clock: Clock,
    shield: Shield
  };

  return (
    <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-navy mb-8 sm:mb-10 md:mb-12">
          {tofuContent.educationalProps.headline}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {tofuContent.educationalProps.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div key={idx} className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg border-t-4 border-teal hover:shadow-xl transition-shadow">
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-teal mb-2 sm:mb-3 md:mb-4" />
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-navy mb-2 sm:mb-2.5 md:mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
