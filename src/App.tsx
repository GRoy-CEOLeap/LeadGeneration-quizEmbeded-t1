import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './core/components/ErrorBoundary';
import { ComplianceProvider } from './core/components/ComplianceProvider';
import { getSessionData } from './core/utils/session';
import './core/utils/complianceMonitor';
import { HomeLayout } from './core/layouts/HomeLayout';
import { HeroLayout } from './core/layouts/HeroLayout';
import { PIHeroLayout } from './core/layouts/PIHeroLayout';
import { TOFULayout } from './core/layouts/TOFULayout';
import { PrivacyPolicy } from './core/pages/PrivacyPolicy';
import { TermsOfService } from './core/pages/TermsOfService';
import { TCPADisclaimer } from './core/pages/TCPADisclaimer';
import { Contact } from './core/pages/Contact';
import { PartnersPage } from './core/pages/PartnersPage';
import { QuoteLanding } from './core/pages/QuoteLanding';
import { QuoteQuiz } from './core/pages/QuoteQuiz';
import ADTOutcome from './pages/outcome/adt';
import GenericOutcome from './pages/outcome/GenericOutcome';
import PILandingPage from './pages/startquiz/v01/LandingPage';
import PIQuestionsFlow from './pages/startquiz/v01/QuestionsFlow';
import PIOutcomePage from './pages/startquiz/v01/OutcomePage';
import PIThankYouDisqualified from './pages/startquiz/v01/ThankYouDisqualified';
function App() {
  // Temporary debugging code for environment variables
  console.log('Environment Variables Check:', {
    emailValidator: import.meta.env.VITE_EMAIL_VALIDATOR,
    zipValidator: import.meta.env.VITE_ZIP_VALIDATOR,
    phoneValidator: import.meta.env.VITE_PHONE_VALIDATOR,
    leadWebhook: import.meta.env.VITE_LEAD_WEBHOOK,
    piLeadWebhook: import.meta.env.VITE_PI_LEAD_WEBHOOK,
    env: import.meta.env.VITE_ENV
  });

  useEffect(() => {
    getSessionData();

    // Log helpful console commands on app startup
    console.log('%c🔐 Compliance Monitoring Tools Available', 'color: #00ff00; font-weight: bold; font-size: 16px');
    console.log('%cUse these commands to debug compliance scripts:', 'color: #00aaff; font-weight: bold');
    console.log('  complianceMonitor.start()      - Start real-time monitoring');
    console.log('  complianceMonitor.check()      - Check current status');
    console.log('  complianceMonitor.checkRoute() - Verify route detection');
    console.log('%cSee COMPLIANCE_QUICK_REFERENCE.md for full guide', 'color: #888888');
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ComplianceProvider>
          <Routes>
            {/* Layout-based routes */}
            <Route path="/" element={<HomeLayout />} />
            <Route path="/get-quote" element={<PIHeroLayout />} />
            <Route path="/quiz" element={<HeroLayout />} />
            <Route path="/start-quiz" element={<TOFULayout />} />

            {/* Funnel routes */}
            <Route path="/quote" element={<QuoteLanding />} />
            <Route path="/quote/quiz" element={<QuoteQuiz />} />

            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/tcpa-disclaimer" element={<TCPADisclaimer />} />

            {/* Outcome pages */}
            <Route path="/outcome" element={<PIOutcomePage />} />
            <Route path="/outcome/adt" element={<ADTOutcome />} />

            {/* Contact page */}
            <Route path="/contact" element={<Contact />} />

            {/* Partners page */}
            <Route path="/partners" element={<PartnersPage />} />

            {/* Personal Injury Funnel */}
            <Route path="/startquiz/01" element={<PILandingPage />} />
            <Route path="/startquiz/01/outcome" element={<PIOutcomePage />} />
            <Route path="/startquiz/01/thank-you" element={<PIThankYouDisqualified />} />
          </Routes>
        </ComplianceProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
