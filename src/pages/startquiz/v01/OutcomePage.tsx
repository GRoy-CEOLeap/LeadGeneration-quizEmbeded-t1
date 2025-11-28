import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, FileCheck, Users, Phone, Calendar, Star, Mail } from 'lucide-react';
import { piContent } from '../../../config/pi/content.config';
import { getOutcomeDisplayData } from '../../../core/utils/session';
import { Footer } from '../../../core/components/Footer';

const OutcomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showCalendar, setShowCalendar] = useState(false);
  const leadId = searchParams.get('lid') || 'unknown';
  const utmSource = searchParams.get('utm_source') || '';

  const userData = getOutcomeDisplayData();
  const { firstName, city, accidentType, incidentDate, state, fullName, incidentState } = userData;

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    if (favicon) {
      favicon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }
    if (appleTouchIcon) {
      appleTouchIcon.href = '/Personal Injury Legal Help Brand Logo 1 (40 x 40 px).png';
    }

    document.title = 'Personal Injury Hotline™ - Case Review Submitted';
  }, [leadId]);

  const handleCalendarOpen = () => {
    setShowCalendar(true);
  };

  const title = piContent.outcome.hero.title.replace('{firstName}', firstName);
  const subtitle = piContent.outcome.hero.subtitle.replace('{city}', city);
  const trustTitle = piContent.outcome.trustProof.title.replace('{city}', city);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center items-center py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <img
            src="/pi_300x300 copy.png"
            alt="Personal Injury Hotline Logo"
            className="w-12 h-12"
          />
          <span className="font-heading text-xl sm:text-2xl font-bold text-navy">
            Personal Injury Hotline™
          </span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-large p-6 sm:p-8 lg:p-10 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-muted" />
            </div>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-center">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-4 sm:p-6 mb-4">
            <h3 className="font-heading text-lg font-semibold text-navy mb-3">
              {piContent.outcome.hero.summaryTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 text-navy font-medium">{fullName || firstName}</span>
              </div>
              {incidentState && (
                <div>
                  <span className="text-gray-600">Incident State:</span>
                  <span className="ml-2 text-navy font-medium">{incidentState}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Accident Type:</span>
                <span className="ml-2 text-navy font-medium">{accidentType}</span>
              </div>
              {incidentDate && (
                <div>
                  <span className="text-gray-600">Incident Date:</span>
                  <span className="ml-2 text-navy font-medium">{incidentDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-navy rounded-2xl shadow-large p-6 sm:p-8 lg:p-10 mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            {piContent.outcome.whatHappensNext.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {piContent.outcome.whatHappensNext.steps.map((step, index) => {
              const iconMap: Record<string, any> = { FileCheck, Users, Phone };
              const IconComponent = iconMap[step.icon];
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-200">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

{/* BOOKING SECTION - COMMENTED OUT FOR FUTURE USE
        <div className="bg-teal-50 rounded-2xl shadow-large p-6 sm:p-8 lg:p-10 mb-8">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-teal mx-auto mb-4" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-2">
              {piContent.outcome.calendar.title}
            </h2>
            <p className="text-base text-gray-700 mb-6">{piContent.outcome.calendar.subtitle}</p>
            <button
              onClick={handleCalendarOpen}
              className="px-8 py-4 bg-gold text-navy rounded-xl font-bold text-lg hover:bg-gold-600 transition-all shadow-lg"
            >
              {piContent.outcome.calendar.buttonText}
            </button>
          </div>

          {showCalendar && (
            <div className="mt-6 bg-white rounded-xl p-4">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/booking/${import.meta.env.VITE_PI_CALENDAR_ID}?contactId=${leadId}&firstName=${firstName}&name=${encodeURIComponent(fullName || firstName)}`}
                className="w-full h-96 border-0 rounded-lg"
                title="Book Consultation"
              />
            </div>
          )}
        </div>
        */}

        <div className="bg-white rounded-2xl shadow-large p-6 sm:p-8 lg:p-10 mb-8">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-4 text-center">
            {trustTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {piContent.outcome.trustProof.badges.map((badge, index) => (
              <div key={index} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                {badge}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {piContent.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-2">{testimonial.quote}</p>
                <p className="text-xs text-gray-600 font-medium">
                  {testimonial.author}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 border-t-4 border-teal">
          <h4 className="font-heading text-lg font-semibold text-navy mb-3 text-center">
            {piContent.outcome.support.title}
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a href={`mailto:${piContent.outcome.support.email}`} className="flex items-center gap-2 text-teal hover:text-teal-700 font-medium">
              <Mail className="w-4 h-4" />
              {piContent.outcome.support.email}
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default OutcomePage;
