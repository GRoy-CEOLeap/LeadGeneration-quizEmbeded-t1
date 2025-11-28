import { complianceConfig } from '../../config/compliance.config';
import { ComplianceData } from '../types/quiz.types';

const generateMockLeadId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `mock_leadid_${timestamp}_${random}`;
};

const generateMockTrustedFormCert = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `https://cert.trustedform.com/mock_${timestamp}_${random}`;
};

/**
 * Jornaya Script Loader
 * Implements the official Jornaya LeadID pattern with wrapper script
 *
 * CRITICAL: The hidden input field MUST already exist in the form before this script loads.
 * The field should be: <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
 *
 * This function creates a wrapper script (LeadiDscript) that dynamically injects
 * the campaign script (LeadiDscript_campaign) which will populate the hidden field.
 */
export const loadJornayaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!complianceConfig.jornaya.enabled) {
      console.log('loadJornayaScript: Jornaya disabled, skipping');
      resolve();
      return;
    }

    if (document.getElementById('LeadiDscript_campaign')) {
      console.log('loadJornayaScript: Script already loaded');
      resolve();
      return;
    }

    console.log('loadJornayaScript: Implementing official Jornaya pattern with wrapper script');

    // Create the wrapper script element that will inject the campaign script
    const wrapperScript = document.createElement('script');
    wrapperScript.id = 'LeadiDscript';
    wrapperScript.type = 'text/javascript';

    // Official Jornaya wrapper pattern - creates and injects campaign script
    wrapperScript.text = `
      (function() {
        var s = document.createElement('script');
        s.id = 'LeadiDscript_campaign';
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//create.lidstatic.com/campaign/${complianceConfig.jornaya.campaignId}.js?snippet_version=2';
        var LeadiDscript = document.getElementById('LeadiDscript');
        LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
      })();
    `;

    const timeout = setTimeout(() => {
      console.error('loadJornayaScript: Script load timeout after 10 seconds');
      reject(new Error('Script load timeout'));
    }, 10000);

    // Monitor for the campaign script to be created and loaded
    const checkCampaignScript = setInterval(() => {
      const campaignScript = document.getElementById('LeadiDscript_campaign');
      if (campaignScript) {
        clearInterval(checkCampaignScript);
        clearTimeout(timeout);
        console.log('loadJornayaScript: Campaign script injected successfully');
        resolve();
      }
    }, 100);

    // Append wrapper script to body - this will trigger campaign script injection
    document.body.appendChild(wrapperScript);

    // Add noscript fallback as per Jornaya specification
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img src='//create.leadid.com/noscript.gif?lac=${complianceConfig.jornaya.accountId}&lck=${complianceConfig.jornaya.campaignId}&snippet_version=2' />`;
    document.body.appendChild(noscript);

    console.log('loadJornayaScript: Wrapper script and noscript fallback appended to body');
  });
};




export const captureLeadiD = (): string | null => {
  if (!complianceConfig.jornaya.enabled) return null;

  const leadidField = document.getElementById('leadid_token') as HTMLInputElement;
  const value = leadidField ? leadidField.value : null;

  if (!value && complianceConfig.developmentMode?.mockValues) {
    const mockValue = generateMockLeadId();
    console.warn('captureLeadiD: Using mock value for development', { mockValue });
    return mockValue;
  }

  return value;
};

export const captureTrustedFormCert = (): string | null => {
  if (!complianceConfig.trustedForm.enabled) return null;

  const trustedFormField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;
  const value = trustedFormField ? trustedFormField.value : null;

  if (!value && complianceConfig.developmentMode?.mockValues) {
    const mockValue = generateMockTrustedFormCert();
    console.warn('captureTrustedFormCert: Using mock value for development', { mockValue });
    return mockValue;
  }

  return value;
};

export const getComplianceData = (): ComplianceData => {
  const data: ComplianceData = {};

  if (complianceConfig.jornaya.enabled) {
    const leadId = captureLeadiD();
    if (leadId) {
      data.leadid_token = leadId;
      data.leadid_timestamp = new Date().toISOString();
      data.page_url = window.location.href;
    } else {
      console.warn('getComplianceData: Jornaya enabled but no leadid_token found');
    }
  }

  if (complianceConfig.trustedForm.enabled) {
    const trustedFormCert = captureTrustedFormCert();
    if (trustedFormCert) {
      data.trusted_form_cert = trustedFormCert;
      data.page_url = window.location.href;
    } else {
      console.warn('getComplianceData: TrustedForm enabled but no certificate found');
    }
  }

  return data;
};

export const isComplianceReady = (): boolean => {
  if (complianceConfig.developmentMode?.bypassCompliance) {
    console.warn('isComplianceReady: DEVELOPMENT MODE - Bypassing compliance checks');
    return true;
  }

  if (!complianceConfig.jornaya.enabled && !complianceConfig.trustedForm.enabled) {
    console.log('isComplianceReady: No compliance services enabled, returning true');
    return true;
  }

  let ready = true;

  if (complianceConfig.jornaya.enabled) {
    const leadId = captureLeadiD();
    if (!leadId) {
      console.warn('isComplianceReady: Jornaya enabled but leadid_token not ready');
      ready = false;
    } else {
      console.log('isComplianceReady: Jornaya ready with leadid_token');
    }
  }

  if (complianceConfig.trustedForm.enabled) {
    const trustedFormCert = captureTrustedFormCert();
    if (!trustedFormCert) {
      console.warn('isComplianceReady: TrustedForm enabled but certificate not ready');
      ready = false;
    } else {
      console.log('isComplianceReady: TrustedForm ready with certificate');
    }
  }

  console.log('isComplianceReady: Overall compliance status:', ready);
  return ready;
};

export const cleanupComplianceScripts = (): void => {
  const jornayaScript = document.getElementById('LeadiDscript');
  const jornayaCampaignScript = document.getElementById('LeadiDscript_campaign');

  if (jornayaScript) jornayaScript.remove();
  if (jornayaCampaignScript) jornayaCampaignScript.remove();

  const trustedFormScript = document.getElementById('TrustedFormScript');
  if (trustedFormScript) trustedFormScript.remove();
};

/**
 * Compliance Field Bridge System
 * Copies compliance fields from main page DOM into modal forms
 */

export interface ComplianceFieldsStatus {
  jornayaReady: boolean;
  trustedFormReady: boolean;
  jornayaValue: string | null;
  trustedFormValue: string | null;
  allReady: boolean;
}

/**
 * Finds compliance fields in the main page DOM (outside modal)
 */
export const findComplianceFieldsInPageDOM = (): {
  jornayaField: HTMLInputElement | null;
  trustedFormField: HTMLInputElement | null;
} => {
  console.log('ComplianceBridge: Searching for compliance fields in page DOM');

  const jornayaField = document.getElementById('leadid_token') as HTMLInputElement | null;
  const trustedFormField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement | null;

  console.log('ComplianceBridge: Field search results', {
    jornayaFound: !!jornayaField,
    jornayaHasValue: !!jornayaField?.value,
    jornayaValue: jornayaField?.value || null,
    trustedFormFound: !!trustedFormField,
    trustedFormHasValue: !!trustedFormField?.value,
    trustedFormId: trustedFormField?.id || null,
    trustedFormValueLength: trustedFormField?.value?.length || 0
  });

  return { jornayaField, trustedFormField };
};

/**
 * Clones compliance fields from page DOM into a target form element
 */
export const cloneComplianceFieldsToForm = (targetForm: HTMLElement): void => {
  console.log('ComplianceBridge: Cloning compliance fields to target form');

  const { jornayaField, trustedFormField } = findComplianceFieldsInPageDOM();

  // Clone Jornaya field if it exists
  if (jornayaField && complianceConfig.jornaya.enabled) {
    // Check if field already exists in target form
    const existingJornayaField = targetForm.querySelector('#leadid_token');
    if (existingJornayaField) {
      console.log('ComplianceBridge: Jornaya field already exists in target form, updating value');
      (existingJornayaField as HTMLInputElement).value = jornayaField.value;
    } else {
      const jornayaClone = jornayaField.cloneNode(true) as HTMLInputElement;
      targetForm.appendChild(jornayaClone);
      console.log('ComplianceBridge: Jornaya field cloned to target form', {
        value: jornayaClone.value
      });
    }
  }

  // Clone TrustedForm field if it exists
  if (trustedFormField && complianceConfig.trustedForm.enabled) {
    // Check if field already exists in target form
    const existingTrustedFormField = targetForm.querySelector('[id^="xxTrustedFormCertUrl"]');
    if (existingTrustedFormField) {
      console.log('ComplianceBridge: TrustedForm field already exists in target form, updating value');
      (existingTrustedFormField as HTMLInputElement).value = trustedFormField.value;
    } else {
      const trustedFormClone = trustedFormField.cloneNode(true) as HTMLInputElement;
      targetForm.appendChild(trustedFormClone);
      console.log('ComplianceBridge: TrustedForm field cloned to target form', {
        id: trustedFormClone.id,
        valueLength: trustedFormClone.value.length
      });
    }
  }
};

/**
 * Waits for compliance fields to be ready with values
 */
export const waitForComplianceFields = (timeoutMs: number = 5000): Promise<ComplianceFieldsStatus> => {
  return new Promise((resolve) => {
    console.log('ComplianceBridge: Waiting for compliance fields to be ready');

    const startTime = Date.now();
    const checkInterval = 500;

    const checkFields = () => {
      const elapsed = Date.now() - startTime;
      const { jornayaField, trustedFormField } = findComplianceFieldsInPageDOM();

      const jornayaReady = !complianceConfig.jornaya.enabled || (!!jornayaField && !!jornayaField.value);
      const trustedFormReady = !complianceConfig.trustedForm.enabled || (!!trustedFormField && !!trustedFormField.value);

      const status: ComplianceFieldsStatus = {
        jornayaReady,
        trustedFormReady,
        jornayaValue: jornayaField?.value || null,
        trustedFormValue: trustedFormField?.value || null,
        allReady: jornayaReady && trustedFormReady
      };

      console.log('ComplianceBridge: Field readiness check', {
        elapsed,
        ...status
      });

      // If all required fields are ready, resolve immediately
      if (status.allReady) {
        console.log('ComplianceBridge: All compliance fields ready!');
        resolve(status);
        return;
      }

      // If timeout reached, resolve with current status
      if (elapsed >= timeoutMs) {
        console.warn('ComplianceBridge: Timeout reached, proceeding with current status', status);
        resolve(status);
        return;
      }

      // Continue checking
      setTimeout(checkFields, checkInterval);
    };

    checkFields();
  });
};

/**
 * Syncs compliance field values from page DOM to target form before submission
 */
export const syncComplianceFieldsBeforeSubmit = (targetForm: HTMLElement): void => {
  console.log('ComplianceBridge: Syncing compliance fields before submission');

  const { jornayaField, trustedFormField } = findComplianceFieldsInPageDOM();

  // Sync Jornaya
  if (jornayaField) {
    const targetJornayaField = targetForm.querySelector('#leadid_token') as HTMLInputElement;
    if (targetJornayaField) {
      targetJornayaField.value = jornayaField.value;
      console.log('ComplianceBridge: Synced Jornaya value', { value: jornayaField.value });
    }
  }

  // Sync TrustedForm
  if (trustedFormField) {
    const targetTrustedFormField = targetForm.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;
    if (targetTrustedFormField) {
      targetTrustedFormField.value = trustedFormField.value;
      console.log('ComplianceBridge: Synced TrustedForm value', { valueLength: trustedFormField.value.length });
    }
  }
};