export const startComplianceMonitoring = (timeoutMs: number = 30000) => {
  console.clear();
  console.log('%c=== COMPLIANCE FIELD MONITORING STARTED ===', 'color: #00ff00; font-weight: bold; font-size: 14px');
  console.log(`Monitoring will run for ${timeoutMs / 1000} seconds or until all fields are ready\n`);

  let jornayaFound = false;
  let trustedFormFound = false;
  let jornayaFieldFound = false;
  let trustedFormFieldFound = false;
  const startTime = Date.now();
  const checkInterval = 200;

  const monitor = setInterval(() => {
    const elapsed = Date.now() - startTime;

    const jField = document.getElementById('leadid_token') as HTMLInputElement;
    const tfField = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;

    // Track when fields are created (even without values)
    if (jField && !jornayaFieldFound) {
      jornayaFieldFound = true;
      console.log(`%c✓ JORNAYA FIELD CREATED at ${elapsed}ms`, 'color: #ffaa00; font-weight: bold', {
        fieldId: jField.id,
        hasValue: !!jField.value
      });
    }

    if (tfField && !trustedFormFieldFound) {
      trustedFormFieldFound = true;
      console.log(`%c✓ TRUSTEDFORM FIELD CREATED at ${elapsed}ms`, 'color: #ffaa00; font-weight: bold', {
        fieldId: tfField.id,
        hasValue: !!tfField.value
      });
    }

    // Track when values are populated
    if (jField && jField.value && !jornayaFound) {
      jornayaFound = true;
      console.log(`%c✓ JORNAYA READY at ${elapsed}ms`, 'color: #00ff00; font-weight: bold', {
        fieldId: jField.id,
        valueLength: jField.value.length,
        valuePreview: jField.value.substring(0, 50) + '...'
      });
    }

    if (tfField && tfField.value && !trustedFormFound) {
      trustedFormFound = true;
      console.log(`%c✓ TRUSTEDFORM READY at ${elapsed}ms`, 'color: #00ff00; font-weight: bold', {
        fieldId: tfField.id,
        valueLength: tfField.value.length,
        certPreview: tfField.value.substring(0, 80) + '...'
      });
    }

    if (jornayaFound && trustedFormFound) {
      console.log(`%c✓ ALL COMPLIANCE FIELDS READY at ${elapsed}ms`, 'color: #00ff00; font-weight: bold; font-size: 14px');
      clearInterval(monitor);
    }

    if (elapsed > timeoutMs) {
      console.error(`%c✗ TIMEOUT at ${elapsed}ms - Fields not ready`, 'color: #ff0000; font-weight: bold', {
        jornayaFieldCreated: jornayaFieldFound,
        jornayaReady: jornayaFound,
        trustedFormFieldCreated: trustedFormFieldFound,
        trustedFormReady: trustedFormFound,
        diagnosis: getDiagnosis(jornayaFieldFound, jornayaFound, trustedFormFieldFound, trustedFormFound)
      });
      clearInterval(monitor);
    }
  }, checkInterval);

  return monitor;
};

const getDiagnosis = (
  jFieldCreated: boolean,
  jReady: boolean,
  tfFieldCreated: boolean,
  tfReady: boolean
): string => {
  const issues: string[] = [];

  if (!jFieldCreated) {
    issues.push('Jornaya script not loading (field never created)');
  } else if (!jReady) {
    issues.push('Jornaya field created but token not populated');
  }

  if (!tfFieldCreated) {
    issues.push('TrustedForm script not loading (field never created)');
  } else if (!tfReady) {
    issues.push('TrustedForm field created but certificate not populated');
  }

  if (issues.length === 0) return 'No issues detected';
  return issues.join('; ');
};

export const checkComplianceFieldsNow = () => {
  console.log('%c=== COMPLIANCE FIELDS STATUS ===', 'color: #00aaff; font-weight: bold; font-size: 14px');

  const pageJornaya = document.getElementById('leadid_token') as HTMLInputElement;
  const pageTF = document.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;

  console.log('%cPage DOM Fields:', 'color: #00aaff; font-weight: bold', {
    jornaya: {
      exists: !!pageJornaya,
      hasValue: !!(pageJornaya?.value),
      valueLength: pageJornaya?.value?.length || 0,
      valuePreview: pageJornaya?.value?.substring(0, 50) || 'NO VALUE'
    },
    trustedForm: {
      exists: !!pageTF,
      hasValue: !!(pageTF?.value),
      valueLength: pageTF?.value?.length || 0,
      certPreview: pageTF?.value?.substring(0, 80) || 'NO VALUE'
    }
  });

  const modalForm = document.getElementById('lead-capture-form');
  if (modalForm) {
    const modalJornaya = modalForm.querySelector('#leadid_token') as HTMLInputElement;
    const modalTF = modalForm.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement;

    console.log('%cModal Form Fields:', 'color: #00aaff; font-weight: bold', {
      formExists: !!modalForm,
      jornaya: {
        cloned: !!modalJornaya,
        hasValue: !!(modalJornaya?.value),
        valueLength: modalJornaya?.value?.length || 0,
        valuePreview: modalJornaya?.value?.substring(0, 50) || 'NO VALUE'
      },
      trustedForm: {
        cloned: !!modalTF,
        hasValue: !!(modalTF?.value),
        valueLength: modalTF?.value?.length || 0,
        certPreview: modalTF?.value?.substring(0, 80) || 'NO VALUE'
      }
    });
  } else {
    console.log('%cModal Form: NOT FOUND', 'color: #ffaa00');
  }

  const jornayaScript = document.getElementById('LeadiDscript_campaign');
  const allScripts = Array.from(document.querySelectorAll('script'));
  const trustedFormScript = allScripts.find((s: any) => s.src.includes('trustedform.com'));

  console.log('%cScript Tags:', 'color: #00aaff; font-weight: bold', {
    jornaya: {
      scriptExists: !!jornayaScript,
      scriptSrc: jornayaScript?.getAttribute('src') || 'NOT FOUND'
    },
    trustedForm: {
      scriptExists: !!trustedFormScript,
      scriptSrc: (trustedFormScript as any)?.src || 'NOT FOUND'
    }
  });

  return {
    pageFields: {
      jornayaReady: !!(pageJornaya?.value),
      trustedFormReady: !!(pageTF?.value)
    },
    modalFields: modalForm ? {
      jornayaReady: !!(modalForm.querySelector('#leadid_token') as HTMLInputElement)?.value,
      trustedFormReady: !!(modalForm.querySelector('[id^="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value
    } : null,
    allReady: !!(pageJornaya?.value && pageTF?.value)
  };
};

export const checkRouteCompliance = () => {
  const currentPath = window.location.pathname;
  const ROUTES_WITH_FORMS = [
    '/start-quiz',
    '/quiz',
    '/get-quote',
    '/quote',
    '/contact'
  ];

  const needsCompliance = ROUTES_WITH_FORMS.some(route =>
    currentPath === route || currentPath.startsWith(route)
  );

  console.log('%c=== ROUTE COMPLIANCE CHECK ===', 'color: #ff00ff; font-weight: bold', {
    currentPath,
    needsCompliance,
    explanation: needsCompliance ?
      'Scripts SHOULD be loading on this route' :
      'Scripts SHOULD NOT load on this route'
  });

  return { currentPath, needsCompliance };
};

export const diagnoseNetworkIssues = async () => {
  console.log('%c=== COMPLIANCE NETWORK DIAGNOSTICS ===', 'color: #ff00ff; font-weight: bold; font-size: 14px');

  const results = {
    jornaya: {
      reachable: false,
      error: null as any
    },
    trustedForm: {
      reachable: false,
      error: null as any
    },
    browserInfo: {
      userAgent: navigator.userAgent,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hostname: window.location.hostname,
      protocol: window.location.protocol
    }
  };

  console.log('%cBrowser Environment:', 'color: #00aaff; font-weight: bold', results.browserInfo);

  try {
    const jornayaResponse = await fetch('https://create.lidstatic.com/ping', { mode: 'no-cors' });
    results.jornaya.reachable = true;
    console.log('%c✓ Jornaya domain reachable', 'color: #00ff00; font-weight: bold');
  } catch (error) {
    results.jornaya.error = error;
    console.error('%c✗ Jornaya domain NOT reachable', 'color: #ff0000; font-weight: bold', error);
  }

  try {
    const tfResponse = await fetch('https://api.trustedform.com/ping', { mode: 'no-cors' });
    results.trustedForm.reachable = true;
    console.log('%c✓ TrustedForm domain reachable', 'color: #00ff00; font-weight: bold');
  } catch (error) {
    results.trustedForm.error = error;
    console.error('%c✗ TrustedForm domain NOT reachable', 'color: #ff0000; font-weight: bold', error);
  }

  console.log('%cDiagnostic Results:', 'color: #ff00ff; font-weight: bold', results);

  if (!results.jornaya.reachable || !results.trustedForm.reachable) {
    console.log('%c⚠ RECOMMENDATIONS:', 'color: #ffaa00; font-weight: bold', [
      'Disable browser extensions (uBlock, AdBlock, Privacy Badger, etc.)',
      'Try incognito/private mode',
      'Check browser privacy settings',
      'Disable VPN or proxy if active',
      'Test in a different browser',
      'Check network firewall settings'
    ]);
  }

  return results;
};

if (typeof window !== 'undefined') {
  (window as any).complianceMonitor = {
    start: startComplianceMonitoring,
    check: checkComplianceFieldsNow,
    checkRoute: checkRouteCompliance,
    diagnose: diagnoseNetworkIssues
  };
}
