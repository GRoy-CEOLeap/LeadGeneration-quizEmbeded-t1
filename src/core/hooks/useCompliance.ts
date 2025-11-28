import { useState, useEffect, useCallback } from 'react';
import { 
  loadJornayaScript, 
  captureLeadiD, 
  getComplianceData,
  isComplianceReady,
  cleanupComplianceScripts 
} from '../utils/compliance';
import { complianceConfig } from '../../config/compliance.config';
import { ComplianceState, ComplianceData } from '../types/quiz.types';

export const useCompliance = () => {
  const [state, setState] = useState<ComplianceState>({
    jornayaLoaded: false,
    jornayaReady: false,
    leadIdCaptured: false,
    leadId: null,
  });

  // Initialize compliance scripts
  useEffect(() => {
    if (!complianceConfig.jornaya.enabled && !complianceConfig.trustedForm.enabled) {
      return;
    }

    const initializeCompliance = async () => {
      try {
        if (complianceConfig.jornaya.enabled) {
          await loadJornayaScript();
          setState(prev => ({ ...prev, jornayaLoaded: true }));
          
          // Start polling for LeadiD
          const pollInterval = setInterval(() => {
            const leadId = captureLeadiD();
            if (leadId) {
              setState(prev => ({
                ...prev,
                jornayaReady: true,
                leadIdCaptured: true,
                leadId
              }));
              clearInterval(pollInterval);
            }
          }, 500);
          
          // Clear interval after 10 seconds to prevent memory leaks
          setTimeout(() => clearInterval(pollInterval), 10000);
        }
        
      } catch (error) {
        console.error('Failed to initialize compliance:', error);
      }
    };

    initializeCompliance();

    // Cleanup on unmount
    return () => {
      if (complianceConfig.jornaya.enabled || complianceConfig.trustedForm.enabled) {
        cleanupComplianceScripts();
      }
    };
  }, []);

  const getCompliancePayload = useCallback((): ComplianceData => {
    return getComplianceData();
  }, []);

  const isReady = useCallback((): boolean => {
    return isComplianceReady();
  }, []);

  return {
    complianceEnabled: complianceConfig.jornaya.enabled || complianceConfig.trustedForm.enabled,
    jornayaEnabled: complianceConfig.jornaya.enabled,
    state,
    getCompliancePayload,
    isReady
  };
};