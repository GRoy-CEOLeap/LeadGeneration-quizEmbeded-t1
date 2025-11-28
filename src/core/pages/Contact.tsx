import React, { useState } from 'react';
import { Mail, Shield, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { JornayaField } from '../components/JornayaField';
import { getLeadIdToken } from '../utils/leadidMonitor';
import { config } from '../../config/environment.config';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get Jornaya LeadiD token from session or DOM
      const leadidToken = getLeadIdToken();

      // Prepare submission payload with compliance data
      const payload = {
        ...formData,
        leadid_token: leadidToken || '',
        leadid_timestamp: leadidToken ? new Date().toISOString() : undefined,
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      };

      console.log('Submitting contact form to:', config.api.contactSubmit);
      console.log('Payload:', payload);

      // Submit to webhook
      const response = await fetch(config.api.contactSubmit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Form submitted successfully');
      setSubmitSuccess(true);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        'Something went wrong. Please try again or contact us directly at admin@personalinjuryhotline.co'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      consent: false
    });
    setSubmitSuccess(false);
    setSubmitError(null);

    // Scroll to form
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <img
                src="/pi_300x300 copy.png"
                alt="Personal Injury Hotline Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-xl font-bold text-navy">Personal Injury Hotline™</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy-700 to-teal text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-100 text-sm font-medium mb-4 uppercase tracking-wide">
            We're Here to Help
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Let's Connect—We're Listening
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Have questions? Need guidance? Whether you're seeking information about your case or want to learn more about how we can help, we're here for you 24/7.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <p className="text-teal text-sm font-medium mb-2 uppercase tracking-wide">
                  We're Here to Listen
                </p>
                <h2 className="text-3xl font-heading font-bold text-navy mb-4">Connect With Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  Have questions about your injury or legal options? We understand this is a difficult time. Our compassionate team is available 24/7 to listen to your story and guide you toward the right legal partner.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Email</h3>
                    <p className="text-gray-600">admin@personalinjuryhotline.co</p>
                    <p className="text-sm text-gray-500 mt-1">Your privacy is protected</p>
                  </div>
                </div>
              </div>

              {/* Privacy Assurance Section */}
              <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-1">Your Privacy Matters</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      We safeguard your information with strict privacy protocols and encryption technologies. Your data is only shared with qualified attorneys who can help your case, upon your request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form" className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-teal">
              {submitSuccess ? (
                /* Success Message */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-navy mb-4">Thank You!</h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                    Our team is reviewing your response. We'll get back to you within 3 business days.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-navy hover:bg-gold hover:text-navy text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  >
                    Submit Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-heading font-bold text-navy mb-2">How can we help you ?</h3>
                    <p className="text-sm text-gray-600">Please, tell us about your situation. All information is kept confidential.</p>
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{submitError}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                {/* Jornaya LeadID Hidden Field - Must exist before script loads */}
                <JornayaField />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your accident or injury..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                    required
                  />
                </div>

                <div id="leadid_tcpa_disclosure" className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-navy">Your consent helps us serve you better.</strong> By checking this box, I agree to receive communications from Personal Injury Hotline™ to assist with my case. You can opt out anytime by replying STOP to any message. Message & data rates may apply. For details, see our{' '}
                    <a href="/privacy-policy" className="text-teal hover:text-teal-700 underline font-medium">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="/terms-of-service" className="text-teal hover:text-teal-700 underline font-medium">Terms of Service</a>.
                  </label>
                </div>

                {/* Hidden field for Jornaya LeadiD token */}
                <input
                  id="leadid_token"
                  name="leadid_token"
                  type="hidden"
                  value=""
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy hover:bg-gold hover:text-navy text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Secure Message'
                  )}
                </button>
                <p className="text-xs text-center text-gray-500">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Your information is encrypted and secure
                </p>
              </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};