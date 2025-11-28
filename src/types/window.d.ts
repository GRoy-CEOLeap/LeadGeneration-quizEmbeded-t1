declare global {
  interface Window {
    TrustedForm?: any;
    LeadID?: any;
    complianceMonitor?: {
      start: (timeoutMs?: number) => NodeJS.Timeout;
      check: () => any;
      checkRoute: () => any;
      diagnose: () => Promise<any>;
    };
  }
}

export {};