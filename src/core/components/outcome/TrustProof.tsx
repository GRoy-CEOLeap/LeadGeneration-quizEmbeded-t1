import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TrustProofProps {
  config: {
    stats: Array<{
      number: string;
      label: string;
    }>;
    testimonial: {
      quote: string;
      author: string;
    };
  };
  userData: {
    firstName: string;
    city: string;
    zip: string;
    homeType: string;
  };
}

export const TrustProof: React.FC<TrustProofProps> = ({ config, userData }) => {
  const testimonialAuthor = config.testimonial.author.replace('{city}', userData.city);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {config.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-blue-600" />
          </div>

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>

          <blockquote className="text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
            "{config.testimonial.quote}"
          </blockquote>

          <div className="text-center">
            <div className="font-bold text-gray-900 text-lg">
              {testimonialAuthor}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
