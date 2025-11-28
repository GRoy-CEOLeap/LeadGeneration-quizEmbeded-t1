/**
 * Compliance Configuration
 * Controls third-party compliance services (Jornaya, TrustedForm, etc.)
 * Set enabled to false to completely disable compliance features for a client
 */

export interface ComplianceConfig {
  jornaya: {
    enabled: boolean;
    campaignId: string;
    accountId: string;
    scriptUrl?: string;
    fieldName?: string;
  };
  trustedForm: {
    enabled: boolean;
    scriptUrl: string;
    fieldName: string;
    pingFieldName: string;
    testMode?: boolean;
    captureDelay?: number;
    provideReferrer?: boolean;
    invertFieldSensitivity?: boolean;
    accountId?: string;
    pingUrl?: string;
    certificateUrl?: string;
  };
  developmentMode?: {
    bypassCompliance: boolean;
    mockValues: boolean;
    allowLocalhost: boolean;
    verbose: boolean;
  };
}

const isDevelopment = import.meta.env.MODE === 'development' || window.location.hostname === 'localhost';

export const complianceConfig: ComplianceConfig = {
  jornaya: {
    enabled: true,
    campaignId: '2d4455e3-c82f-a426-8160-d1c8d4c27bc5',
    accountId: '56941368-A54E-6F88-D644-183D3C1808A1',
    fieldName: 'universal_leadid'
  },
  trustedForm: {
    enabled: true,
    scriptUrl: 'https://api.trustedform.com/trustedform.js',
    fieldName: 'xxTrustedFormCertUrl',
    pingFieldName: 'xxTrustedFormPingUrl',
    testMode: false,
    captureDelay: 2000
  },
  developmentMode: {
    bypassCompliance: isDevelopment,
    mockValues: isDevelopment,
    allowLocalhost: true,
    verbose: isDevelopment
  }
};