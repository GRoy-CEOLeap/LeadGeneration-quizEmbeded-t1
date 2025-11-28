import { complianceConfig } from '../../config/compliance.config';
import { getLeadIdToken } from './leadidMonitor';

export interface JornayaHashTrackingOptions {
  stepNumber: number;
  stepHash: string;
  route: string;
}

interface JornayaCredentials {
  accountId: string;
  campaignId: string;
}

function getJornayaCredentials(): JornayaCredentials {
  return {
    accountId: complianceConfig.jornaya.accountId,
    campaignId: complianceConfig.jornaya.campaignId
  };
}

/**
 * Get LeadID token from multiple sources with fallback chain
 * Priority order:
 * 1. Session storage 'compliance_token' (Jornaya's own storage)
 * 2. Session storage 'quiz_session.compliance' (LeadID Monitor storage)
 * 3. DOM field value
 */
function getTokenFromAllSources(route: string): string | null {
  let token: string | null = null;
  let source = '';

  // Try 1: Jornaya's own session storage
  try {
    const complianceTokenData = sessionStorage.getItem('compliance_token');
    if (complianceTokenData) {
      const parsed = JSON.parse(complianceTokenData);
      if (parsed.leadid_token) {
        token = parsed.leadid_token;
        source = 'compliance_token session storage';
      }
    }
  } catch (error) {
    console.warn(`[Jornaya Hash - ${route}] Error reading compliance_token:`, error);
  }

  // Try 2: LeadID Monitor utility (checks quiz_session and DOM)
  if (!token) {
    token = getLeadIdToken();
    if (token) {
      source = 'LeadID Monitor utility';
    }
  }

  // Try 3: Direct DOM field access (final fallback)
  if (!token) {
    const leadidField = document.getElementById('leadid_token') as HTMLInputElement;
    if (leadidField?.value?.trim()) {
      token = leadidField.value.trim();
      source = 'DOM field';
    }
  }

  if (token) {
    console.log(`[Jornaya Hash - ${route}] ✓ Token found from: ${source}`);
  } else {
    console.warn(`[Jornaya Hash - ${route}] ✗ No token found after checking all sources`);
  }

  return token;
}

function dispatchDOMEvents(route: string): void {
  try {
    const leadidField = document.getElementById('leadid_token');
    if (leadidField) {
      leadidField.dispatchEvent(new Event('change', { bubbles: true }));
      leadidField.dispatchEvent(new Event('input', { bubbles: true }));
      console.log(`[Jornaya Hash - ${route}] Dispatched events on leadid_token field`);
    }

    const formElements = document.querySelectorAll('input, select, button');
    formElements.forEach(element => {
      element.dispatchEvent(new Event('focus', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
    });

    console.log(`[Jornaya Hash - ${route}] Dispatched DOM events to wake Jornaya`);
  } catch (error) {
    console.error(`[Jornaya Hash - ${route}] Error dispatching DOM events:`, error);
  }
}

function sendJornayaPixel(
  stepNumber: number,
  stepHash: string,
  route: string
): void {
  try {
    const token = getTokenFromAllSources(route);

    if (!token) {
      console.warn(`[Jornaya Hash - ${route}] No token available, skipping pixel for step ${stepNumber}`);
      return;
    }

    const { accountId, campaignId } = getJornayaCredentials();

    const img = new Image();
    img.src = `//create.leadid.com/capture.gif?` +
              `lac=${accountId}&` +
              `lck=${campaignId}&` +
              `token=${token}&` +
              `event=step_${stepNumber}&` +
              `hash=${encodeURIComponent(stepHash)}&` +
              `route=${route}&` +
              `url=${encodeURIComponent(window.location.href)}&` +
              `t=${Date.now()}`;

    img.style.display = 'none';

    img.onload = () => {
      console.log(`[Jornaya Hash - ${route}] ✓ Pixel sent successfully: step ${stepNumber} (${stepHash})`);
      if (img.parentNode) {
        document.body.removeChild(img);
      }
    };

    img.onerror = () => {
      console.error(`[Jornaya Hash - ${route}] ✗ Pixel failed: step ${stepNumber} (${stepHash})`);
      if (img.parentNode) {
        document.body.removeChild(img);
      }
    };

    document.body.appendChild(img);

    console.log(`[Jornaya Hash - ${route}] Sending pixel for step ${stepNumber} (${stepHash})`);
  } catch (error) {
    console.error(`[Jornaya Hash - ${route}] Error sending pixel:`, error);
  }
}

export function triggerJornayaHashEvent(
  stepNumber: number,
  stepHash: string,
  route: string = 'unknown'
): void {
  if (!complianceConfig.jornaya.enabled) {
    console.log(`[Jornaya Hash - ${route}] Jornaya is disabled in config, skipping tracking`);
    return;
  }

  console.log(`[Jornaya Hash - ${route}] Hash changed to: ${stepHash} (step ${stepNumber})`);

  dispatchDOMEvents(route);

  sendJornayaPixel(stepNumber, stepHash, route);
}
