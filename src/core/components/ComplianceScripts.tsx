import { useEffect, useRef } from 'react';
import { complianceConfig } from '../../config/compliance.config';
import { loadJornayaScript } from '../utils/compliance';
import { startLeadIdMonitor, stopLeadIdMonitor } from '../utils/leadidMonitor';

/**
 * ComplianceScripts Component
 * Loads compliance tracking scripts (Jornaya, TrustedForm) on page mount
 * This ensures fields are created in the main DOM before any modals open
 * Captures the full user journey from initial page load
 */
export const ComplianceScripts: React.FC = () => {
  const initStartTime = useRef<number>(Date.now());

  useEffect(() => {
    console.log('=== COMPLIANCE INITIALIZATION STARTED ===', {
      timestamp: new Date().toISOString(),
      jornayaEnabled: complianceConfig.jornaya.enabled,
      trustedFormEnabled: complianceConfig.trustedForm.enabled,
      developmentMode: complianceConfig.developmentMode
    });

    if (complianceConfig.developmentMode?.bypassCompliance) {
      console.warn('%c⚠ DEVELOPMENT MODE ACTIVE', 'color: #ffaa00; font-weight: bold; font-size: 14px; background: #000; padding: 4px;');
      console.log('%cCompliance checks will be bypassed. Mock values will be used if scripts fail to load.', 'color: #ffaa00');
      console.log('%cTo test compliance properly, deploy to a staging environment.', 'color: #ffaa00');
    }

    console.log('%c💡 COMPLIANCE DEBUGGING TOOLS', 'color: #00aaff; font-weight: bold; font-size: 12px');
    console.log('%cUse these commands in the console:', 'color: #00aaff');
    console.log('  complianceMonitor.start()     - Start 30s monitoring');
    console.log('  complianceMonitor.check()     - Check current status');
    console.log('  complianceMonitor.checkRoute()- Verify route config');
    console.log('  complianceMonitor.diagnose()  - Run network diagnostics');

    // Load Jornaya script if enabled
    if (complianceConfig.jornaya.enabled) {
      const jornayaStartTime = Date.now();
      console.log('📡 JORNAYA: Starting script load...', {
        campaignId: complianceConfig.jornaya.campaignId,
        accountId: complianceConfig.jornaya.accountId,
        developmentMode: complianceConfig.developmentMode?.bypassCompliance
      });

      // CRITICAL: Verify the hidden field exists in DOM before loading script
      const leadidField = document.getElementById('leadid_token') as HTMLInputElement;
      if (!leadidField) {
        console.error('✗ JORNAYA: CRITICAL ERROR - leadid_token field not found in DOM!', {
          message: 'The hidden input field must exist in the form BEFORE the script loads',
          requiredField: '<input id="leadid_token" name="universal_leadid" type="hidden" value=""/>',
          solution: 'Add <JornayaField /> component to your form',
          developmentBypass: complianceConfig.developmentMode?.bypassCompliance
        });
      } else {
        console.log('✓ JORNAYA: Field exists in DOM, ready for script to populate', {
          fieldId: leadidField.id,
          fieldName: leadidField.name,
          currentValue: leadidField.value || '(empty - awaiting population)'
        });
      }

      const attemptJornayaLoad = (attempt: number = 1, maxAttempts: number = 3) => {
        loadJornayaScript()
          .then(() => {
            const loadTime = Date.now() - jornayaStartTime;
            console.log(`✓ JORNAYA: Script loaded in ${loadTime}ms (attempt ${attempt})`);

            // Start the LeadiD monitor immediately after script loads
            startLeadIdMonitor();

            let valueDetected = false;

            // Poll for leadid_token field value population (field should already exist)
            const checkInterval = setInterval(() => {
              const field = document.getElementById('leadid_token') as HTMLInputElement;

              if (!field) {
                console.error('✗ JORNAYA: Field disappeared from DOM during monitoring!');
                clearInterval(checkInterval);
                return;
              }

              if (field.value && !valueDetected) {
                valueDetected = true;
                const valueTime = Date.now() - jornayaStartTime;
                console.log(`✓ JORNAYA: Token populated at ${valueTime}ms`, {
                  valueLength: field.value.length,
                  valuePreview: field.value.substring(0, 50) + '...',
                  totalTime: `${valueTime}ms from start`
                });
                clearInterval(checkInterval);
              }
            }, 200);

            // Stop checking after 30 seconds
            setTimeout(() => {
              clearInterval(checkInterval);
              if (!valueDetected) {
                const field = document.getElementById('leadid_token') as HTMLInputElement;
                console.error('✗ JORNAYA: Token not populated after 30 seconds - TIMEOUT', {
                  fieldExists: !!field,
                  fieldHasValue: !!field?.value,
                  wrapperScript: !!document.getElementById('LeadiDscript'),
                  campaignScript: !!document.getElementById('LeadiDscript_campaign'),
                  developmentBypass: complianceConfig.developmentMode?.bypassCompliance,
                  possibleCauses: [
                    'Ad blocker or privacy extension blocking tracking script',
                    'Network blocking create.lidstatic.com domain',
                    'Browser privacy settings preventing third-party scripts',
                    'Jornaya campaign ID or account ID invalid',
                    'Form not visible or hidden when script attempted to populate'
                  ]
                });
              }
            }, 30000);
          })
          .catch((error) => {
            console.error(`✗ JORNAYA: Script load failed (attempt ${attempt}/${maxAttempts})`, error);
            if (attempt < maxAttempts) {
              const retryDelay = attempt * 2000;
              console.log(`🔄 JORNAYA: Retrying in ${retryDelay}ms...`);
              setTimeout(() => attemptJornayaLoad(attempt + 1, maxAttempts), retryDelay);
            } else {
              console.error('✗ JORNAYA: All retry attempts exhausted', {
                totalAttempts: maxAttempts,
                developmentBypass: complianceConfig.developmentMode?.bypassCompliance
              });
            }
          });
      };

      attemptJornayaLoad();
    } else {
      console.log('⊘ JORNAYA: Disabled in config');
    }

    // TrustedForm is loaded via index.html script tag or TrustedFormProvider
    // Poll to verify TrustedForm field creation and population
    if (complianceConfig.trustedForm.enabled) {
      const tfStartTime = Date.now();
      console.log('📡 TRUSTEDFORM: Monitoring field creation...');

      let fieldDetected = false;
      let valueDetected = false;

      const checkInterval = setInterval(() => {
        const trustedFormField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;

        if (trustedFormField && !fieldDetected) {
          fieldDetected = true;
          const fieldTime = Date.now() - tfStartTime;
          console.log(`✓ TRUSTEDFORM: Field created in DOM at ${fieldTime}ms`, {
            fieldId: trustedFormField.id,
            hasValue: !!trustedFormField.value
          });
        }

        if (trustedFormField && trustedFormField.value && !valueDetected) {
          valueDetected = true;
          const valueTime = Date.now() - tfStartTime;
          console.log(`✓ TRUSTEDFORM: Certificate populated at ${valueTime}ms`, {
            fieldId: trustedFormField.id,
            valueLength: trustedFormField.value.length,
            certPreview: trustedFormField.value.substring(0, 80) + '...',
            totalTime: `${valueTime}ms from start`
          });
          clearInterval(checkInterval);
        }
      }, 200);

      // Stop checking after 30 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!valueDetected) {
          const field = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;
          const tfScript = Array.from(document.querySelectorAll('script')).find((s: any) => s.src?.includes('trustedform.com'));
          console.error('✗ TRUSTEDFORM: Certificate not populated after 30 seconds - TIMEOUT', {
            fieldExists: !!field,
            fieldHasValue: !!field?.value,
            scriptElement: !!tfScript,
            scriptSrc: (tfScript as any)?.src || 'NOT FOUND',
            possibleCauses: [
              'Ad blocker or privacy extension blocking tracking script',
              'Network blocking api.trustedform.com domain',
              'Browser privacy settings preventing third-party scripts',
              'TrustedForm not configured or domain not verified'
            ]
          });
        }
      }, 30000);
    } else {
      console.log('⊘ TRUSTEDFORM: Disabled in config');
    }

    // Summary log after initialization completes
    const summaryTimeout = setTimeout(() => {
      const totalTime = Date.now() - initStartTime.current;
      const jField = document.getElementById('leadid_token') as HTMLInputElement;
      const tfField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;

      console.log('=== COMPLIANCE INITIALIZATION SUMMARY ===', {
        totalTime: `${totalTime}ms`,
        jornaya: complianceConfig.jornaya.enabled ? {
          ready: !!(jField && jField.value),
          fieldExists: !!jField,
          hasValue: !!(jField?.value),
          valueLength: jField?.value?.length || 0
        } : 'disabled',
        trustedForm: complianceConfig.trustedForm.enabled ? {
          ready: !!(tfField && tfField.value),
          fieldExists: !!tfField,
          hasValue: !!(tfField?.value),
          valueLength: tfField?.value?.length || 0
        } : 'disabled'
      });
    }, 8000);

    return () => {
      clearTimeout(summaryTimeout);
      stopLeadIdMonitor();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};