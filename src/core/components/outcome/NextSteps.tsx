import React from 'react';
import { Phone, Clipboard, Wrench, Clock } from 'lucide-react';

interface NextStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  icon: string;
}

interface NextStepsProps {
  steps: NextStep[];
}

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone className="w-6 h-6" />,
  clipboard: <Clipboard className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
};

export const NextSteps: React.FC<NextStepsProps> = ({ steps }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Happens Next
          </h2>
          <p className="text-xl text-gray-600">
            Getting your home protected is simple and fast
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
              )}

              <div className="bg-gray-50 rounded-xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>

                  <div className="mb-4 text-blue-600">
                    {iconMap[step.icon] || <Phone className="w-6 h-6" />}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700">
                    <Clock className="w-4 h-4" />
                    {step.timeframe}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
