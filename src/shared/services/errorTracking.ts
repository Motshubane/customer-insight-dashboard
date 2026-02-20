interface ErrorPayload {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  tags?: Record<string, string>;
}

class ErrorTrackingService {
  private static instance: ErrorTrackingService;
  private errors: ErrorPayload[] = [];
  private readonly maxErrors = 50;

  private constructor() {}

  static getInstance(): ErrorTrackingService {
    if (!ErrorTrackingService.instance) {
      ErrorTrackingService.instance = new ErrorTrackingService();
    }
    return ErrorTrackingService.instance;
  }

  trackError(error: Error, componentStack?: string, tags?: Record<string, string>) {
    const payload: ErrorPayload = {
      message: error.message,
      stack: error.stack,
      componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      tags,
    };

    // Store in memory (in production, send to your error tracking service)
    this.errors.unshift(payload);
    if (this.errors.length > this.maxErrors) {
      this.errors.pop();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorTracking]', payload);
    }

    // Here you would send to Sentry, LogRocket, etc.
    // if (process.env.NODE_ENV === 'production') {
    //   sendToErrorTrackingService(payload);
    // }
  }

  getErrors(): ErrorPayload[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

export const errorTracker = ErrorTrackingService.getInstance();