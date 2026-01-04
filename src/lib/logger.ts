/**
 * Environment-aware logging utility
 * Only logs in development, sends errors to tracking in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
    // TODO: In production, send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(args[0]);
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};
