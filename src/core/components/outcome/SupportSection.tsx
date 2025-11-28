import React from 'react';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

interface SupportSectionProps {
  config: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    hours: string;
  };
}

export const SupportSection: React.FC<SupportSectionProps> = ({ config }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-xl text-gray-600">
            {config.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href={`tel:${config.phone}`}
            className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-blue-600 font-semibold">{config.phone}</p>
            </div>
          </a>

          <a
            href={`mailto:${config.email}`}
            className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <Mail className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-green-600 font-semibold text-sm break-all">{config.email}</p>
            </div>
          </a>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-purple-600 font-semibold">{config.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
