import React, { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { QuizOverlay } from '../components/QuizOverlay';
import { CheckCircle, Shield, Award, Clock, CreditCard, DollarSign } from 'lucide-react';
import { piGetQuoteContent } from '../../config/pi/getquote.content.config';

export const PIHeroLayout: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    if (favicon) {
      favicon.href = piGetQuoteContent.logo.src;
    }
    if (appleTouchIcon) {
      appleTouchIcon.href = '/Personal Injury Legal Help Brand Logo 1 (500 x 500 px).png';
    }

    document.title = piGetQuoteContent.meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', piGetQuoteContent.meta.description);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="min-h-screen">
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-stretch">

          <div className="flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-12 order-1">
            <div className="w-full max-w-full md:max-w-[90%] lg:max-w-[70%]">

            <div className="flex items-center justify-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 mb-4 mx-auto md:px-4 md:py-3 md:mb-6">
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium text-xs md:text-sm">
                <span className="md:hidden">{piGetQuoteContent.alertBanner.mobile}</span>
                <span className="hidden md:inline">{piGetQuoteContent.alertBanner.desktop}</span>
              </span>
            </div>
            </div>

            <div className="space-y-3 mb-6 text-center md:space-y-4 md:mb-8">
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed text-center">
                <span className="md:hidden">{piGetQuoteContent.hero.subheadline.mobile}</span>
                <span className="hidden md:inline">{piGetQuoteContent.hero.subheadline.desktop}</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-100 p-6 mb-6 md:p-8 md:mb-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center mb-6">
                <span className="md:hidden">
                  {piGetQuoteContent.hero.headline.mobile.split(piGetQuoteContent.hero.headline.mobileHighlight)[0]}
                  <span className="text-teal-600">{piGetQuoteContent.hero.headline.mobileHighlight}</span>
                  {piGetQuoteContent.hero.headline.mobile.split(piGetQuoteContent.hero.headline.mobileHighlight)[1]}
                </span>
                <span className="hidden md:inline">
                  {piGetQuoteContent.hero.headline.desktop.split(piGetQuoteContent.hero.headline.desktopHighlight)[0]}
                  <span className="text-teal-600">{piGetQuoteContent.hero.headline.desktopHighlight}</span>
                  {piGetQuoteContent.hero.headline.desktop.split(piGetQuoteContent.hero.headline.desktopHighlight)[1]}
                </span>
              </h1>

            <div className="space-y-3 md:space-y-4">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full bg-gradient-to-r from-gold to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy font-bold text-base md:text-lg lg:text-xl py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3"
              >
                {piGetQuoteContent.hero.cta.text}
                {piGetQuoteContent.hero.cta.icon && (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                {piGetQuoteContent.hero.trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {indicator.icon === 'Award' && <Award className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />}
                    {indicator.icon === 'CreditCard' && <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />}
                    {indicator.icon === 'Clock' && <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />}
                    {indicator.icon === 'DollarSign' && <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />}
                    <span className={`text-xs md:text-sm ${indicator.emphasized ? 'font-medium text-gray-700' : 'text-gray-600'}`}>
                      {indicator.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div className="border-t border-gray-200 pt-5 md:pt-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-gray-900 font-bold text-sm md:text-base">
                  We are
                </span>
                <img
                  src={piGetQuoteContent.logo.src}
                  alt={piGetQuoteContent.logo.alt}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <h2 className="text-gray-900 font-bold text-sm md:text-base">
                  {piGetQuoteContent.logo.brandName}
                </h2>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-5 md:p-6 border border-teal-200 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 text-center">
                    {piGetQuoteContent.socialProof.title}
                  </h3>
                </div>
                <div className="space-y-2.5 md:space-y-3">
                  {piGetQuoteContent.socialProof.description.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 md:gap-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed flex-1">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-relaxed">
              {piGetQuoteContent.privacyNote.text}
            </p>
            </div>

          <div className="bg-gradient-to-br from-teal to-teal-700 px-8 lg:px-12 xl:px-16 py-8 lg:py-12 text-white flex flex-col justify-between min-h-screen order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-[1]"></div>

            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-3 mb-4 text-base bg-teal-900 bg-opacity-40">
                <span className="text-lg">{piGetQuoteContent.rightColumn.badge.icon}</span>
                <span className="text-base font-medium">{piGetQuoteContent.rightColumn.badge.text}</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-center mb-8 relative z-10">

              <div className="flex-shrink-0 order-1 w-full lg:w-[85%] max-w-[320px]">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full aspect-[4/5]">
                  <div className="bg-gradient-to-r from-teal to-teal-700 px-5 py-4 relative">
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{piGetQuoteContent.rightColumn.badge.icon}</span>
                    </div>

                    <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      <span className="mr-2">✓</span>
                      {piGetQuoteContent.rightColumn.mockup.status}
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">{piGetQuoteContent.rightColumn.mockup.title}</h3>
                    <p className="text-white text-opacity-95 text-sm">{piGetQuoteContent.rightColumn.mockup.subtitle}</p>
                  </div>

                  <div className="flex-1 p-5 flex flex-col bg-white">
                    <div className="text-center py-4 bg-gray-50 rounded-xl mb-5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">{piGetQuoteContent.rightColumn.mockup.estimateLabel}</p>
                      <div className="text-3xl font-bold text-gray-800 mb-1 blur-[6px] select-none">{piGetQuoteContent.rightColumn.mockup.estimateValue}</div>
                      <p className="text-xs text-gray-500">{piGetQuoteContent.rightColumn.mockup.note}</p>
                    </div>

                    <div className="flex-1 space-y-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">What You Get</p>

                      {piGetQuoteContent.rightColumn.mockup.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-teal to-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            {benefit.icon === 'clock' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            )}
                            {benefit.icon === 'check' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>
                                <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {benefit.icon === 'home' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/>
                                <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-800">{benefit.title}</p>
                            <p className="text-[10px] text-gray-500">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-5 flex flex-col justify-center order-2 w-full">
                {piGetQuoteContent.rightColumn.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                      <span className="font-bold">{benefit.bold}</span> - {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-white bg-opacity-20 mb-8 relative z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {piGetQuoteContent.rightColumn.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <h4 className="text-white font-bold text-sm mb-2">{testimonial.title}</h4>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white text-opacity-90 text-xs mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-white text-opacity-70 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <QuizOverlay
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};
