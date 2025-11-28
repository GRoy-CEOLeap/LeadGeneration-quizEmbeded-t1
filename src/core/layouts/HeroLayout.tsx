import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { QuizOverlay } from '../components/QuizOverlay';
import { CheckCircle, Star, Shield, Award, Clock, CreditCard, DollarSign } from 'lucide-react';
import { content } from '../../config/content.config';

export const HeroLayout: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Hero Section */}
      <section className="min-h-screen">
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-stretch">
            
          {/* Left Column - Form and Trust Banner */}
          <div className="flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-12 order-1">
            <div className="w-full max-w-full md:max-w-[90%] lg:max-w-[70%]">
            
            {/* Logo - Centered */}
            <div className="flex items-center justify-center gap-4 mb-3 md:mb-4">
              <div className="flex items-center gap-4">
                <img 
                  src="/yourhomesecured-330x330-website (1).svg" 
                  alt="YourHomeSecured Logo" 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                />
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? 'text-yellow-400 fill-current' : i === 4 ? 'text-yellow-400 fill-current opacity-50' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 font-semibold text-xs md:text-sm">
                    4.5 <span className="text-gray-500 font-normal">(2,369 reviews)</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Statistic Alert - More Compact on Mobile */}
            <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 mx-auto md:px-4 md:py-3 md:mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium text-xs md:text-sm">
                <span className="md:hidden">Theft cost $5k+ in avg | security cost $32/mo</span>
                <span className="hidden md:inline">Professional home monitoring averages $32/month - theft costs $5,000+</span>
              </span>
            </div>
            </div>
            
            {/* Main Headline - Compact on Mobile */}
            <div className="space-y-3 mb-6 text-center md:space-y-4 md:mb-8">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-center">
                <span className="md:hidden">Get a free home security quote from <span className="text-blue-600">top providers</span></span>
                <span className="hidden md:inline">Get a free personalized quote from the <span className="text-blue-600">top home security providers</span> in the US</span>
              </h1>
              
              {/* Sub-headline - Shorter on Mobile */}
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed text-center">
                <span className="md:hidden">Compare providers in 60 seconds. Best system for your home — guaranteed lowest price</span>
                <span className="hidden md:inline">Compare vetted security providers in under 60 seconds. Our platform matches you with the best system for your home and budget — guaranteed lowest price with 24/7 professional monitoring.</span>
              </p>
            </div>
            
            {/* CTA Section - More Compact on Mobile */}
            <div className="space-y-3 mb-6 md:space-y-4 md:mb-8">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base md:text-lg lg:text-xl py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3"
              >
                Secure My Home Now !
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              {/* Trust Indicators - More Compact on Mobile */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-gray-700">Best Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">60 Seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">100% Free</span>
                </div>
              </div>
            </div>
            
            {/* Trusted Partners Section */}
            <div className="border-t border-gray-200 pt-5 md:pt-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 md:p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 text-center">
                    {content.hero.socialProof.title}
                  </h3>
                </div>
                <div className="space-y-2.5 md:space-y-3">
                  {content.hero.socialProof.description.map((text, idx) => (
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
            
            {/* Privacy Note - Very Compact on Mobile */}
            <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-tight">
              By clicking above, you agree to receive updates and offers. We respect your 
              <a href="/privacy-policy" className="text-blue-600 hover:underline mx-1">privacy and data</a>.
            </p>
            </div>
            
          {/* Right Column - Value Proposition - Full Height Blue Background */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 px-8 lg:px-12 xl:px-16 py-8 lg:py-12 text-white flex flex-col justify-between min-h-screen order-2">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-3 mb-4 text-base" style={{ backgroundColor: 'rgba(13, 123, 165, 0.6)' }}>
                <span className="text-lg">🔒</span>
                <span className="text-base font-medium">Protect Your Home. Protect Your Family. At the Best Price.</span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-center mb-8">
              
              {/* Mockup */}
              <div className="flex-shrink-0 order-1 w-full lg:w-[85%] max-w-[320px]">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full aspect-[4/5]">
                  {/* Quote Header */}
                  <div className="bg-gradient-to-r from-[#0D7BA5] to-[#0D7BA5] px-5 py-4 relative">
                    {/* Brand Placeholder */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <img src="/ADT.jpg" alt="ADT" className="w-8 h-6 object-contain" />
                    </div>
                    
                    <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      <span className="mr-2">✓</span>
                      Quote Generated
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">Premium Security</h3>
                    <p className="text-white text-opacity-95 text-sm">Your instant personalized quote</p>
                  </div>
                  
                  {/* Quote Body */}
                  <div className="flex-1 p-5 flex flex-col bg-white">
                    {/* Price Section */}
                    <div className="text-center py-4 bg-gray-50 rounded-xl mb-5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Monthly Investment</p>
                      <div className="text-3xl font-bold text-gray-800 mb-1 blur-[6px] select-none">$129.99</div>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                    
                    {/* Benefits Section */}
                    <div className="flex-1 space-y-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">What's Included</p>
                      
                      {/* 24/7 Monitoring */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0D7BA5] to-[#0D7BA5] rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">24/7 Monitoring</p>
                          <p className="text-[10px] text-gray-500">Round-the-clock surveillance</p>
                        </div>
                      </div>
                      
                      {/* Free Installation */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0D7BA5] to-[#0D7BA5] rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>
                            <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">Free Installation</p>
                          <p className="text-[10px] text-gray-500">Professional setup included</p>
                        </div>
                      </div>
                      
                      {/* Smart Home Ready */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0D7BA5] to-[#0D7BA5] rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/>
                            <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">Smart Home Ready</p>
                          <p className="text-[10px] text-gray-500">Seamless integration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits List with Green Checkmarks */}
              <div className="flex-1 space-y-5 flex flex-col justify-center order-2 w-full">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                    <span className="font-bold">Save $420+ per year</span> - Exclusive rates 40% below retail pricing
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                    <span className="font-bold">$0 equipment & installation</span> - Everything included (valued at $850)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                    <span className="font-bold">24/7 emergency response</span> - Police dispatched in under 45 seconds
                  </span>
                </div>
                
                {/* Desktop-only bullet points (4th and 5th) */}
                <div className="hidden lg:flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                    <span className="font-bold">Insurance discount 5-20%</span> - Most homeowners save $15-50 monthly
                  </span>
                </div>
                <div className="hidden lg:flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm leading-relaxed flex-1" style={{ fontSize: 'clamp(0.9625rem, 0.9625rem, 1.056rem)' }}>
                    <span className="font-bold">Same-day protection</span> - Professional installation within 24 hours
                  </span>
                </div>
              </div>
            </div>
            
            {/* Horizontal Divider */}
            <div className="w-full h-px bg-white bg-opacity-20 mb-8"></div>
            
            {/* Testimonial Cards with Real Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Testimonial Card 1 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <h4 className="text-white font-bold text-sm mb-2">Life-changing protection!</h4>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white text-opacity-90 text-xs mb-4 leading-relaxed">
                  "The system stopped a break-in attempt last month. The monitoring team called police immediately. Worth every penny!"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Sarah" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">Sarah M.</p>
                    <p className="text-white text-opacity-70 text-xs">Brooklyn, NY</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 2 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <h4 className="text-white font-bold text-sm mb-2">Finally, peace of mind</h4>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white text-opacity-90 text-xs mb-4 leading-relaxed">
                  "I travel for work constantly. Being able to check my home from anywhere gives me incredible peace of mind."
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://randomuser.me/api/portraits/men/44.jpg" 
                    alt="Michael" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">Michael R.</p>
                    <p className="text-white text-opacity-70 text-xs">Austin, TX</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 3 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <h4 className="text-white font-bold text-sm mb-2">Best investment ever!</h4>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white text-opacity-90 text-xs mb-4 leading-relaxed">
                  "Insurance discount covers half the monthly cost. Installation was free and took less than 2 hours. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Jennifer" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">Jennifer L.</p>
                    <p className="text-white text-opacity-70 text-xs">Phoenix, AZ</p>
                  </div>
                </div>
              </div>
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