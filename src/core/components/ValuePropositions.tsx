import React from 'react';
import { Handshake, Shield, Home } from 'lucide-react';

export const ValuePropositions: React.FC = () => {
  const values = [
    {
      icon: <Handshake className="w-12 h-12 text-blue-600" />,
      headline: "We Connect You With Top Providers",
      copy: "No guesswork, no hassle — just the right fit for your home and budget."
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      headline: "Peace of Mind Around the Clock",
      copy: "Professional monitoring that never sleeps, plus smart alerts sent directly to your phone."
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      headline: "All-in-One Protection",
      copy: "Burglar alarms, fire detection, carbon monoxide sensors, cameras, and smart locks."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="mb-6 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {value.headline}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};