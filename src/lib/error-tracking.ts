/**
 * Error tracking and monitoring utilities
 *
 * This module provides a centralized error tracking system that can be integrated
 * with services like Sentry, LogRocket, or custom logging solutions.
 *
 * To enable Sentry:
 * 1. npm install @sentry/nextjs
 * 2. Set NEXT_PUBLIC_SENTRY_DSN in your environment
 * 3. Run `npx @sentry/wizard@latest -i nextjs`
 */

type ErrorSeverity = "fatal" | "error" | "warning" | "info" | "debug";

interface ErrorContext {
  userId?: string;
  businessId?: string;
  sessionId?: string;
  route?: string;
  action?: string;
  component?: string;
  metadata?: Record<string, unknown>;
}

interface ErrorTrackingConfig {
  dsn?: string;
  environment?: string;
  release?: string;
  enabled?: boolean;
}

// Configuration
const config: ErrorTrackingConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  enabled: process.env.NODE_ENV === "production",
};

// Session ID for tracking errors within a session
let sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  if (!sessionId) {
    sessionId =
      sessionStorage.getItem("error-tracking-session") ||
      `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("error-tracking-session", sessionId);
  }

  return sessionId;
}

/**
 * Initialize error tracking (call this in your app's entry point)
 */
export function initErrorTracking(): void {
  if (typeof window === "undefined") return;

  // Set up global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    captureError(error || new Error(String(message)), {
      metadata: {
        source,
        lineno,
        colno,
        type: "unhandled_error",
      },
    });
    return false; // Let the error propagate
  };

  // Set up unhandled promise rejection handler
  window.onunhandledrejection = (event) => {
    captureError(
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason)),
      {
        metadata: {
          type: "unhandled_rejection",
        },
      }
    );
  };

  console.log("[ErrorTracking] Initialized", {
    environment: config.environment,
    enabled: config.enabled,
  });
}

/**
 * Capture and report an error
 */
export function captureError(
  error: Error | string,
  context: ErrorContext = {}
): void {
  const errorObj = typeof error === "string" ? new Error(error) : error;

  const errorData = {
    name: errorObj.name,
    message: errorObj.message,
    stack: errorObj.stack,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    url: typeof window !== "undefined" ? window.location.href : "server",
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "server",
    ...context,
  };

  // Always log to console in development
  if (config.environment !== "production") {
    console.error("[ErrorTracking]", errorData);
  }

  // Send to external service if configured
  if (config.enabled && config.dsn) {
    sendToExternalService(errorData);
  }

  // Store in local error log (useful for debugging)
  storeLocalError(errorData);
}

/**
 * Capture a message (non-error event)
 */
export function captureMessage(
  message: string,
  severity: ErrorSeverity = "info",
  context: ErrorContext = {}
): void {
  const messageData = {
    message,
    severity,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    url: typeof window !== "undefined" ? window.location.href : "server",
    ...context,
  };

  if (config.environment !== "production") {
    console.log(`[ErrorTracking:${severity}]`, messageData);
  }

  if (config.enabled && config.dsn) {
    sendToExternalService(messageData);
  }
}

/**
 * Set user context for error tracking
 */
export function setUser(user: {
  id: string;
  email?: string;
  name?: string;
}): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("error-tracking-user", JSON.stringify(user));
  }
}

/**
 * Clear user context
 */
export function clearUser(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("error-tracking-user");
  }
}

/**
 * Create a breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>
): void {
  const breadcrumb = {
    category,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const breadcrumbs = JSON.parse(
      sessionStorage.getItem("error-tracking-breadcrumbs") || "[]"
    );
    breadcrumbs.push(breadcrumb);

    // Keep only last 50 breadcrumbs
    if (breadcrumbs.length > 50) {
      breadcrumbs.shift();
    }

    sessionStorage.setItem(
      "error-tracking-breadcrumbs",
      JSON.stringify(breadcrumbs)
    );
  }
}

/**
 * Wrap a function with error tracking
 */
export function withErrorTracking<T extends (...args: unknown[]) => unknown>(
  fn: T,
  context: ErrorContext = {}
): T {
  return ((...args: unknown[]) => {
    try {
      const result = fn(...args);

      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          captureError(error, context);
          throw error;
        });
      }

      return result;
    } catch (error) {
      captureError(error as Error, context);
      throw error;
    }
  }) as T;
}

/**
 * React Error Boundary helper
 */
export function handleComponentError(
  error: Error,
  errorInfo: React.ErrorInfo,
  componentName: string
): void {
  captureError(error, {
    component: componentName,
    metadata: {
      componentStack: errorInfo.componentStack,
    },
  });
}

// Private helper functions

function sendToExternalService(data: unknown): void {
  // Placeholder for external service integration
  // When Sentry is installed, this would call Sentry.captureException or Sentry.captureMessage

  // For now, send to a hypothetical logging endpoint
  if (process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {
      // Silently fail - we don't want error logging to cause more errors
    });
  }
}

function storeLocalError(errorData: unknown): void {
  if (typeof window === "undefined") return;

  try {
    const errors = JSON.parse(
      localStorage.getItem("error-tracking-log") || "[]"
    );
    errors.push(errorData);

    // Keep only last 20 errors
    while (errors.length > 20) {
      errors.shift();
    }

    localStorage.setItem("error-tracking-log", JSON.stringify(errors));
  } catch {
    // Storage might be full or unavailable
  }
}

/**
 * Get stored errors (useful for debugging)
 */
export function getStoredErrors(): unknown[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("error-tracking-log") || "[]");
  } catch {
    return [];
  }
}

/**
 * Clear stored errors
 */
export function clearStoredErrors(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("error-tracking-log");
  }
}

/**
 * Performance monitoring - track slow operations
 */
export function trackPerformance(
  operationName: string,
  durationMs: number,
  context: ErrorContext = {}
): void {
  // Log slow operations (> 3 seconds)
  if (durationMs > 3000) {
    captureMessage(
      `Slow operation: ${operationName} took ${durationMs}ms`,
      "warning",
      {
        ...context,
        metadata: {
          ...context.metadata,
          operationName,
          durationMs,
        },
      }
    );
  }
}

/**
 * Create a performance timer
 */
export function startTimer(operationName: string): () => void {
  const start = performance.now();

  return () => {
    const duration = performance.now() - start;
    trackPerformance(operationName, duration);
  };
}
