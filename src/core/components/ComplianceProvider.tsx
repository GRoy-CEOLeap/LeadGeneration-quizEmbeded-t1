import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ComplianceScripts } from './ComplianceScripts';
import { TrustedFormProvider } from './TrustedFormProvider';
import { JornayaField } from './JornayaField';

interface ComplianceProviderProps {
  children: ReactNode;
}

const ROUTES_WITH_FORMS = [
  '/',
  '/start-quiz',
  '/quiz',
  '/get-quote',
  '/quote',
  '/contact',
  '/startquiz/01'
];

export const ComplianceProvider: React.FC<ComplianceProviderProps> = ({ children }) => {
  const location = useLocation();

  const needsCompliance = ROUTES_WITH_FORMS.some(route =>
    location.pathname === route || location.pathname.startsWith(route)
  );

  console.log('ComplianceProvider: Route check', {
    pathname: location.pathname,
    needsCompliance
  });

  if (!needsCompliance) {
    console.log('ComplianceProvider: No compliance needed for this route');
    return <>{children}</>;
  }

  console.log('ComplianceProvider: Loading compliance for route');

  return (
    <TrustedFormProvider>
      <ComplianceScripts />
      {/*
        CRITICAL: Jornaya hidden field must exist in page-level DOM at all times
        This ensures the field is available when scripts load, regardless of modal state
        Forms will also include their own copy for proper submission
      */}
      <div style={{ display: 'none' }} id="compliance-fields-container">
        <JornayaField />
      </div>
      {children}
    </TrustedFormProvider>
  );
};
