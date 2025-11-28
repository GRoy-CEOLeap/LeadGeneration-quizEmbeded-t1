import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/pi_300x300 copy.png"
                alt="Personal Injury Hotline Logo"
                className="w-12 h-12"
              />
              <span className="font-heading text-xl font-bold text-white">
                Personal Injury Hotline™
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              We connect injured individuals with trusted, experienced attorneys. Free case reviews, no obligation. Our service is available 24/7 to help you get the representation you deserve.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-gray-400 text-sm mb-2">Need help with your case?</p>
            <p className="text-white text-xl font-bold leading-tight">Available 24/7 for Free</p>
            <p className="text-white text-xl font-bold">Consultation</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap justify-start gap-8 text-sm mb-6">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            © {new Date().getFullYear()} Personal Injury Hotline™. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            No attorney-client relationship is formed by using this service. All case evaluations are performed by independent attorneys. By submitting your information, you agree to be contacted regarding your personal injury case via phone, text, or email.
          </p>

          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            This website is not part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>

          <p className="text-xs text-gray-500 leading-relaxed">
            We are a marketing company. This Site is part of our marketing efforts for third-parties. The offers that are discussed or appear on our website are from third party advertisers who compensate us. This compensation may impact how and where products appear on our website and the order in which they appear. The compensation that we get may also influence the topic, posts, and content on our Site this website. We do not represent all services or products available on the market. Editorial opinions expressed on the Site are strictly our own, and are not provided, endorsed, or approved by advertisers. We are not affiliated with any third party advertiser other than as stated above. As such, we do not recommend or endorse any product or service on this website. If you are redirected to a third party advertiser's site, you should review their terms and conditions and privacy policy as they may differ significantly from those posted on this site.
          </p>
        </div>
      </div>
    </footer>
  );
};