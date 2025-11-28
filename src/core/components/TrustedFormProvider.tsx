import { useEffect, useRef, useState } from 'react';
import { complianceConfig } from '../../config/compliance.config';

interface TrustedFormProviderProps {
  children: React.ReactNode;
  onReady?: (isReady: boolean) => void;
}

export const TrustedFormProvider: React.FC<TrustedFormProviderProps> = ({ children, onReady }) => {
  const [isReady, setIsReady] = useState(false);
  const scriptLoadedRef = useRef(false);
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!complianceConfig.trustedForm.enabled) {
      console.log('TrustedFormProvider: TrustedForm is disabled in config');
      setIsReady(true);
      onReady?.(true);
      return;
    }

    if (scriptLoadedRef.current) {
      console.log('TrustedFormProvider: TrustedForm script already loaded');
      return;
    }

    console.log('TrustedFormProvider: Initializing TrustedForm');

    const initTrustedForm = () => {
      if (!hiddenFormRef.current) {
        console.error('TrustedFormProvider: Hidden form ref not available');
        return;
      }

      console.log('TrustedFormProvider: Hidden form is ready, loading script');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.id = 'TrustedFormScript';
      script.src = `${complianceConfig.trustedForm.scriptUrl}?field=${complianceConfig.trustedForm.fieldName}&ping_field=${complianceConfig.trustedForm.pingFieldName}&use_tagged_consent=true&l=${new Date().getTime()}${Math.random()}`;

      script.onload = () => {
        console.log('TrustedFormProvider: Script loaded, waiting for field creation');
        scriptLoadedRef.current = true;

        const checkInterval = setInterval(() => {
          const trustedFormField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;
          if (trustedFormField && trustedFormField.value) {
            console.log('TrustedFormProvider: TrustedForm field ready', {
              fieldId: trustedFormField.id,
              valueLength: trustedFormField.value.length
            });
            setIsReady(true);
            onReady?.(true);
            clearInterval(checkInterval);
          }
        }, 500);

        setTimeout(() => {
          clearInterval(checkInterval);
          if (!isReady) {
            console.warn('TrustedFormProvider: Timeout waiting for TrustedForm field, proceeding anyway');
            setIsReady(true);
            onReady?.(false);
          }
        }, 10000);
      };

      script.onerror = () => {
        console.error('TrustedFormProvider: Failed to load TrustedForm script');
        setIsReady(true);
        onReady?.(false);
      };

      document.body.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img src='https://api.trustedform.com/ns.gif' />`;
      document.body.appendChild(noscript);
    };

    const timeout = setTimeout(initTrustedForm, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [onReady, isReady]);

  return (
    <>
      <div style={{ display: 'none' }}>
        <form ref={hiddenFormRef} id="trustedform-init">
        </form>
      </div>
      {children}
    </>
  );
};
