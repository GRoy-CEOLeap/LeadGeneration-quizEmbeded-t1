import { config } from '../../config/environment.config';

interface ErrorReport {
  error: {
    message: string;
    stack?: string;
    name: string;
  };
  context: {
    url: string;
    userAgent: string;
    timestamp: string;
    sessionId: string;
    userId?: string;
  };
  metadata?: Record<string, any>;
}

export const reportError = async (error: Error, metadata?: Record<string, any>) => {
  if (!config.api.errorReporting || config.api.errorReporting.trim() === '') {
    if (config.features.debugMode) {
      console.error('Error reporting webhook not configured or empty:', error);
    }
    return;
  }

  const errorReport: ErrorReport = {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    context: {
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('session_id') || 'unknown',
    },
    metadata,
  };

  try {
    await fetch(config.api.errorReporting, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    });
  } catch (reportingError) {
    if (config.features.debugMode) {
      console.error('Failed to report error:', reportingError);
    }
  }
};

export const withErrorBoundary = <T extends (...args: any[]) => any>(
  fn: T,
  fallback?: () => void
): T => {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          reportError(error, { function: fn.name, args });
          if (fallback) fallback();
          throw error;
        });
      }
      
      return result;
    } catch (error) {
      reportError(error as Error, { function: fn.name, args });
      if (fallback) fallback();
      throw error;
    }
  }) as T;
};