import React from 'react';
import { Footer } from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <img
              src="/pi_300x300 copy.png"
              alt="Personal Injury Hotline Logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <span className="font-heading text-xl sm:text-2xl font-bold text-navy">
              Personal Injury Hotline™
            </span>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-teal-50 to-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Last Updated: October 2025
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-12 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">We Are Personal Injury Hotline</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Personal Injury Hotline ("Personal Injury Hotline," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This website is operated by <strong>Andiamo Ventures LLC</strong> ("Andiamo Ventures," "we," "our," or "us"). <strong>Personal Injury Hotline</strong> is a brand of Andiamo Ventures LLC.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect information that you provide directly to us, such as when you complete a case evaluation form, request a free consultation, or contact us. We may collect the following categories of information:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Personal Information:</strong> Name, phone number, email address, mailing address, and other contact details you choose to provide.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Claim Information:</strong> Basic details about your potential injury or accident, such as date, type of injury, or related information relevant to claim matching.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Usage Data:</strong> Information about your device and how you interact with our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>SMS Communication Data:</strong> Phone numbers, consent records, and message logs for SMS communication.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">SMS Communications</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Information collected for SMS consent may be shared with trusted partners for marketing and communication purposes related to legal claim evaluation, personal injury assistance, or related services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please review our Terms of Service for complete details about our SMS practices and your rights regarding text message communications.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Opt-in Language</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you provide your phone number and opt in to receive SMS messages, you explicitly consent to receive service-related and informational text messages from Personal Injury Hotline and its authorized partners.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">How to Opt Out</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                You can opt out of receiving SMS messages from us at any time by:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Replying <strong>STOP</strong> to any message you receive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Texting <strong>STOP</strong> to our SMS number</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Replying <strong>HELP</strong> for assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Contacting us directly at <a href="mailto:admin@personalinjuryhotline.co" className="text-teal hover:underline font-semibold">admin@personalinjuryhotline.co</a></span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                Once you opt out, you will receive a confirmation message, and no further SMS communications will be sent. You can opt back in at any time by texting <strong>START</strong> or <strong>YES</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Standard message and data rates may apply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Provide, maintain, and improve our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Connect you with law firms, case evaluators, and related service providers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Process inquiries and send notifications about your consultation or claim evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Send you legal-related updates, claim resources, and support messages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Communicate with you via SMS, phone, or email regarding personal injury, motor vehicle accident, and related legal claim services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Respond to questions or requests and provide customer support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Analyze usage and improve our website performance and lead quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Ensure compliance with legal and regulatory obligations</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We may also communicate with you, directly or through our authorized marketing partners, about related services such as medical treatment, insurance assistance, vehicle repair, rental, or other post-accident support options. You may opt out of marketing communications at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Sharing and Disclosure of Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may <strong>sell or share</strong> your personal information with trusted partners in the following categories, in exchange for compensation, for the purpose of connecting you with services you have expressed interest in:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Law Firms and Legal Service Providers:</strong> Licensed attorneys and case evaluation specialists for personal injury and accident claims</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Medical and Rehabilitation Providers:</strong> Clinics or specialists assisting with injury recovery and treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Insurance and Auto-Related Service Providers:</strong> Companies offering vehicle repair, replacement, or rental services connected to accident claims</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may also share your information with:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Service Providers:</strong> Vendors and third-party partners who provide call center, CRM, data storage, SMS delivery, or marketing services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Legal Compliance:</strong> When disclosure is required by law, subpoena, or legal process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Safety and Rights Protection:</strong> To protect the rights, property, or safety of Andiamo Ventures LLC, our users, or others</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> Personal Injury Hotline is <strong>not a law firm</strong> and does <strong>not provide legal advice</strong>. We connect consumers with independent legal professionals and service providers who can assist with their claims.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We use commercially reasonable measures and industry-standard safeguards to protect your information. However, no electronic transmission or storage system is completely secure. You acknowledge that you provide information at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to collect and track information about your use of our website. You can control cookie settings through your browser, but disabling cookies may affect functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, comply with laws, and enforce agreements. When no longer needed, we securely delete or anonymize it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Access, update, or delete your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Opt out of marketing and SMS communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Request that we restrict processing of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Request a copy of the data we store about you</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, contact <a href="mailto:admin@personalinjuryhotline.co" className="text-teal hover:underline font-semibold">admin@personalinjuryhotline.co</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 13. We do not knowingly collect information from children under 13. If we discover such data, we will delete it immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred and processed in countries outside your residence. We comply with applicable data protection laws and apply appropriate safeguards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may link to third-party sites. We are not responsible for their content, privacy policies, or practices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">California Privacy Rights (CCPA/CPRA)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This section applies to California residents and supplements the policy above.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Personal Information We Collect</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                In the past 12 months, we have collected:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Identifiers:</strong> Name, phone number, email, IP address</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Contact Information:</strong> Physical address and communication details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Claim Information:</strong> Accident or injury details submitted through forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Internet Activity:</strong> Site usage data and interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Geolocation Data:</strong> Derived from your IP address</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Sources of Information</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Directly from you (form submissions, calls, SMS)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Automatically through cookies and analytics tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>From our legal, medical, and service partners</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">How We Use Information</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Connect you with qualified law firms and related service providers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Facilitate claim evaluations and consultations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Send updates and communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Improve our matching and lead generation services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Comply with legal and regulatory obligations</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Sharing of Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may sell or share your personal information with licensed partners, including:
              </p>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Law firms and case evaluators</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Medical or rehabilitation providers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Auto repair and insurance partners</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                This sharing may be considered a "sale" of data under California law. You may <strong>opt out</strong> at any time by emailing <a href="mailto:admin@personalinjuryhotline.co" className="text-teal hover:underline font-semibold">admin@personalinjuryhotline.co</a> with the subject line <strong>"OPT OUT"</strong> or by clicking the <strong>"Do Not Sell or Share My Personal Information"</strong> link on our website.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Your California Rights</h3>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Right to Know:</strong> What personal data we collect, use, and share</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Right to Delete:</strong> Request deletion of your information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Right to Opt Out:</strong> Prevent the sale or sharing of your information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>Right to Non-Discrimination:</strong> You will not be penalized for exercising your rights</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                To make a request, email <a href="mailto:admin@personalinjuryhotline.co" className="text-teal hover:underline font-semibold">admin@personalinjuryhotline.co</a> with the subject line "California Privacy Request."
              </p>
              <p className="text-gray-700 leading-relaxed">
                We will acknowledge your request within <strong>10 business days</strong> and respond within <strong>45 days</strong> (extendable to 90 days if needed).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this policy periodically to reflect operational, legal, or regulatory changes. Updates will be posted here with a revised "Last Updated" date. Continued use of our services constitutes acceptance of any updates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Contact Information</h2>
              <div className="bg-teal-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Company:</strong> Andiamo Ventures LLC (operating the Personal Injury Hotline brand)</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> 1560 E Southlake Blvd, Southlake, TX 76092</p>
                <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:admin@personalinjuryhotline.co" className="text-teal hover:underline font-semibold">admin@personalinjuryhotline.co</a></p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will respond to inquiries within a reasonable timeframe.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export { PrivacyPolicy };
