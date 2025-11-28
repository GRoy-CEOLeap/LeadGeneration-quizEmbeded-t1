import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface WhyAdtMatchProps {
  config: {
    title: string;
    benefits: Benefit[];
  };
}

export const WhyAdtMatch: React.FC<WhyAdtMatchProps> = ({ config }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {config.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-4xl">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    {benefit.title}
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
