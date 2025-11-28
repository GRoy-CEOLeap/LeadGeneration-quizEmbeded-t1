import { storeComplianceData } from './session';

interface LeadIdStatus {
  token: string | null;
  captured: boolean;
  timestamp: string | null;
}

let monitorInterval: number | null = null;
let monitorStartTime: number | null = null;
const MONITOR_INTERVAL_MS = 500;
const MONITOR_TIMEOUT_MS = 30000;

export function startLeadIdMonitor(): void {
  if (monitorInterval) {
    console.log('[LeadID Monitor] Already running');
    return;
  }

  console.log('[LeadID Monitor] Starting real-time monitoring (checking every 500ms)');
  monitorStartTime = Date.now();

  monitorInterval = window.setInterval(() => {
    const elapsed = Date.now() - (monitorStartTime || 0);

    if (elapsed > MONITOR_TIMEOUT_MS) {
      console.warn('[LeadID Monitor] Timeout reached (30s), stopping monitor');
      stopLeadIdMonitor();
      return;
    }

    const leadIdField = document.getElementById('leadid_token') as HTMLInputElement;

    if (!leadIdField) {
      return;
    }

    const token = leadIdField.value?.trim();

    if (token && token.length > 0) {
      console.log('[LeadID Monitor] ✓ Token detected:', token.substring(0, 20) + '...');
      storeLeadId(token);
      stopLeadIdMonitor();
    }
  }, MONITOR_INTERVAL_MS);
}

export function stopLeadIdMonitor(): void {
  if (monitorInterval) {
    clearInterval(monitorInterval);
    monitorInterval = null;
    monitorStartTime = null;
    console.log('[LeadID Monitor] Stopped');
  }
}

export function storeLeadId(token: string): void {
  const timestamp = new Date().toISOString();

  storeComplianceData({
    leadid_token: token,
    leadid_timestamp: timestamp,
    leadid_captured: true
  });

  console.log('[LeadID Monitor] ✓ Token stored in session storage');
  console.log('[LeadID Monitor] Token:', token.substring(0, 30) + '...');
  console.log('[LeadID Monitor] Timestamp:', timestamp);
}

export function getLeadIdStatus(): LeadIdStatus {
  const sessionData = sessionStorage.getItem('compliance_data');

  if (!sessionData) {
    return {
      token: null,
      captured: false,
      timestamp: null
    };
  }

  try {
    const data = JSON.parse(sessionData);
    return {
      token: data.leadid_token || null,
      captured: data.leadid_captured || false,
      timestamp: data.leadid_timestamp || null
    };
  } catch (error) {
    console.error('[LeadID Monitor] Error reading session data:', error);
    return {
      token: null,
      captured: false,
      timestamp: null
    };
  }
}

export function getLeadIdToken(): string | null {
  const status = getLeadIdStatus();

  if (status.token) {
    console.log('[LeadID Monitor] Retrieved token from session:', status.token.substring(0, 30) + '...');
    return status.token;
  }

  const leadIdField = document.getElementById('leadid_token') as HTMLInputElement;
  if (leadIdField?.value?.trim()) {
    const token = leadIdField.value.trim();
    console.log('[LeadID Monitor] Retrieved token from DOM:', token.substring(0, 30) + '...');
    return token;
  }

  console.warn('[LeadID Monitor] No token found in session or DOM');
  return null;
}
