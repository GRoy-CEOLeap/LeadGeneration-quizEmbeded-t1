import React from 'react';
import { Star } from 'lucide-react';
import { tofuContent } from '../../config/tofuContent.config';

export const SocialProofWall: React.FC = () => {
  const testimonials = tofuContent.socialProof.testimonials.map(t => ({
    quote: t.quote,
    name: t.author,
    location: t.location,
    rating: t.rating,
    verified: t.verified
  }));

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          {tofuContent.socialProof.headline}
        </h2>

        <div className="relative">
          <div className="flex animate-scroll-testimonials md:animate-scroll-testimonials-desktop space-x-6 hover:pause-animation">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] md:w-80 bg-gradient-to-br from-teal-50 to-gold-50 p-6 rounded-lg shadow-md border border-teal-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic font-medium">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold text-navy">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="text-xs bg-green-muted text-white px-2 py-1 rounded">
                    {testimonial.verified}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-testimonials {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(-50%) translateZ(0);
          }
        }

        @keyframes scroll-testimonials-desktop {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(-50%) translateZ(0);
          }
        }

        .animate-scroll-testimonials {
          animation: scroll-testimonials 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll-testimonials-desktop {
          animation: scroll-testimonials-desktop 50s linear infinite;
          will-change: transform;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll-testimonials {
            animation: scroll-testimonials 6s linear infinite;
          }

          .animate-scroll-testimonials-desktop {
            animation: scroll-testimonials 6s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-testimonials,
          .animate-scroll-testimonials-desktop {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};
