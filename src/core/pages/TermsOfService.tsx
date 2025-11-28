import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

const TermsOfService: React.FC = () => {
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
              Personal Injury Hotline
            </span>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-teal-50 to-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 text-center">
            Terms of Service
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
              <h2 className="text-2xl font-bold text-navy mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Personal Injury Hotline. By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Definitions</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>"Company," "We," "Us," or "Our"</strong> refers to Andiamo Ventures LLC, which operates the Personal Injury Hotline brand and website.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>"User," "You," or "Your"</strong> refers to the individual or entity accessing or using our services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span><strong>"Services"</strong> refer to our case evaluation, legal lead generation, and related marketing and referral services.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the services provided by Personal Injury Hotline, you agree to be bound by these Terms of Service and our <Link to="/privacy-policy" className="text-teal hover:underline font-semibold">Privacy Policy</Link>. If you do not agree, please discontinue use of our website and services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Personal Injury Hotline is a marketing and lead generation platform designed to connect users with licensed law firms, case evaluators, and related service providers that handle personal injury, motor vehicle accident, or similar legal claims.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not provide legal advice, representation, or any legal services directly. Personal Injury Hotline and Andiamo Ventures LLC are not a law firm, and no attorney-client relationship is formed by using our website. All legal services are provided exclusively by independent third-party professionals.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the actions, performance, or outcomes of any third-party providers to whom we may connect you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Use of Services</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>You must be at least 18 years old to use our services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>You agree to provide accurate and complete information when submitting forms or inquiries.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Unauthorized, fraudulent, or deceptive use of our services is prohibited.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">User Obligations</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You agree to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Provide truthful, current, and complete information when using our services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Maintain the confidentiality of your contact and submission data.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Use our services only for lawful purposes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Not disrupt or attempt to interfere with our systems or data.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Not misuse, scrape, or resell leads or data collected through our platform.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of our website and services is governed by our <Link to="/privacy-policy" className="text-teal hover:underline font-semibold">Privacy Policy</Link>, which explains how we collect, use, and protect your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">SMS Communication</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                By providing your phone number and opting in, you consent to receive marketing, claim status, and consultation-related SMS messages from Personal Injury Hotline and our authorized legal, medical, and related service partners.
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Message & data rates may apply.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Message frequency may vary.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Reply STOP to opt out, HELP for assistance, START/YES to re-subscribe.</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Information obtained through SMS consent may be shared with licensed law firms, case evaluation partners, and affiliated marketing partners consistent with our <Link to="/privacy-policy" className="text-teal hover:underline font-semibold">Privacy Policy</Link> and TCPA disclosure.
              </p>
              <h3 className="text-xl font-semibold text-navy mb-3">Sample Messages</h3>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>"Hi, this is Personal Injury Hotline. We received your accident claim inquiry — a case evaluator may contact you shortly. Reply STOP to opt out."</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>"Your claim submission has been received by Personal Injury Hotline. You may be contacted by one of our legal partners. Reply STOP to opt out."</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>"Reminder: Your free consultation is available. Visit personalinjurytort.co or call to confirm. Reply STOP to opt out."</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may receive up to 50 messages per week. Carrier rates may apply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain reliable access to our website and services, but uninterrupted service is not guaranteed. We may suspend or modify services for maintenance, updates, or other reasons without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our primary services are free to consumers. However, certain referral or partner services may involve fees, handled directly between you and the third-party provider. We do not process legal retainers, consultation fees, or payments on behalf of law firms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are a marketing or business partner with a paid agreement, payment terms are governed by your partner contract with Andiamo Ventures LLC.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, trademarks, logos, and designs appearing on this website are owned by Andiamo Ventures LLC and protected under applicable intellectual property laws. You may not copy, modify, or distribute our content without written authorization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may include links to third-party law firms, medical providers, or informational resources. We are not responsible for their content, privacy practices, or representations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Confidentiality</h2>
              <p className="text-gray-700 leading-relaxed">
                Both parties agree to maintain the confidentiality of any proprietary information exchanged. This includes consumer lead data, pricing, campaign details, and performance metrics.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Data Ownership</h2>
              <p className="text-gray-700 leading-relaxed">
                All data, leads, and submissions collected through the Personal Injury Hotline platform are the exclusive property of Andiamo Ventures LLC. Third-party partners may use such data only for purposes disclosed to consumers and in compliance with applicable law and consent records.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Disclaimer of Legal Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Personal Injury Hotline is not a law firm and does not provide legal advice. Any connection made to a licensed attorney, law firm, or case evaluator is for informational and referral purposes only. We make no guarantees as to case outcomes or eligibility. All legal evaluations and representations are solely the responsibility of the law firms and professionals you engage with.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-3">To the maximum extent permitted by law:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Personal Injury Hotline and Andiamo Ventures LLC are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the website or third-party services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>We are not liable for the actions or omissions of any third-party provider to whom you are referred.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Our total liability, if any, shall not exceed the amount (if any) you paid directly to us during the twelve (12) months preceding the claim.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree to indemnify and hold harmless Andiamo Ventures LLC, Personal Injury Hotline, and their officers, directors, employees, and agents from any claims, damages, or losses arising from:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Your use of our services,</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Your violation of these Terms, or</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Any dispute between you and a third-party provider.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Service Modifications and Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We reserve the right to modify, suspend, or terminate any aspect of our services at any time. Upon termination:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Your access will cease immediately.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Data retention obligations survive per our <Link to="/privacy-policy" className="text-teal hover:underline font-semibold">Privacy Policy</Link>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 font-bold">•</span>
                  <span>Confidentiality, indemnification, and limitation of liability provisions remain enforceable.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of Wyoming, without regard to its conflicts of law principles. For enforcement and arbitration purposes, proceedings shall take place in Dallas, Texas.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to first attempt to resolve any dispute through good-faith negotiation. If unresolved, disputes shall be settled through binding arbitration under the American Arbitration Association rules. You waive the right to participate in class actions or representative proceedings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Force Majeure</h2>
              <p className="text-gray-700 leading-relaxed">
                Neither party shall be liable for failure or delay in performance due to causes beyond reasonable control, including natural disasters, war, terrorism, or system outages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions remain in full force and effect.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms constitute the entire agreement between you and Andiamo Ventures LLC, superseding all prior versions or understandings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms periodically. Updates are effective upon posting to our website, and your continued use constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Contact Information</h2>
              <div className="bg-teal-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Company:</strong> Andiamo Ventures LLC (operating the Personal Injury Hotline brand)</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> 1560 E Southlake Blvd, Southlake, TX 76092</p>
                <p className="text-gray-700"><strong>Email:</strong> admin@personalinjuryhotline.co</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will respond to all inquiries within a reasonable timeframe.
              </p>
            </div>

            <div className="bg-gold-50 border-l-4 border-gold p-6 rounded-lg">
              <p className="text-gray-800 font-semibold leading-relaxed">
                By using our website or submitting your information, you acknowledge that you have read, understood, and agreed to these Terms of Service and our <Link to="/privacy-policy" className="text-teal hover:underline font-semibold">Privacy Policy</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export { TermsOfService };
export { TermsOfService as PrivacyPolicy };
