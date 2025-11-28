import React from 'react';
import { OutcomeHeader } from '../components/outcome/OutcomeHeader';
import { OutcomeHero } from '../components/outcome/OutcomeHero';
import { NextSteps } from '../components/outcome/NextSteps';
import { WhyAdtMatch } from '../components/outcome/WhyAdtMatch';
import { PricingAction } from '../components/outcome/PricingAction';
import { TrustProof } from '../components/outcome/TrustProof';
import { EquipmentPreview } from '../components/outcome/EquipmentPreview';
import { SupportSection } from '../components/outcome/SupportSection';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/outcome/MobileStickyCTA';

interface OutcomeLayoutProps {
  config: any; // Will be typed properly later
  userData: {
    firstName: string;
    city: string;
    zip: string;
    homeType: string;
  };
}

export const OutcomeLayout: React.FC<OutcomeLayoutProps> = ({ config, userData }) => {
  return (
    <div className="min-h-screen bg-white">
      <OutcomeHeader config={config.header} />
      <OutcomeHero config={config.hero} userData={userData} />
      <NextSteps steps={config.nextSteps} />
      <WhyAdtMatch config={config.whyAdtMatch} />
      <PricingAction config={config.pricing} userData={userData} />
      <TrustProof config={config.trustProof} userData={userData} />
      <EquipmentPreview config={config.equipment} />
      <SupportSection config={config.support} />
      <Footer />
      <MobileStickyCTA config={config.mobileStickyCta} />
    </div>
  );
}