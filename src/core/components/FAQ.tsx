import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What happens after I take the quiz?",
      answer: "You'll instantly see your personalized security recommendations. If you want to connect with a provider, we'll arrange that. Otherwise, you can save your results and decide later."
    },
    {
      question: "Will someone call me right away?",
      answer: "Only if you request it. We respect your preferences and timeline. You control when and how providers can contact you."
    },
    {
      question: "Is my information safe?",
      answer: "Absolutely. We use bank-level encryption and never sell your information without explicit consent. Your privacy is our priority."
    },
    {
      question: "How fast can I get protected?",
      answer: "Many of our partners can install systems within 48-72 hours, depending on your location and selected system. DIY options can be set up the same day."
    },
    {
      question: "Do I have to commit to a long contract?",
      answer: "Not necessarily. We work with providers that offer flexible terms, including month-to-month options. You'll see all contract details upfront."
    },
    {
      question: "I rent - can I still use this service?",
      answer: "Yes! We specialize in renter-friendly solutions that don't require drilling or permanent installation. Many systems are completely portable."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};