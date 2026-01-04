import { logger } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public isOperational = true
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400, true);
    this.name = 'ValidationError';
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401, true);
    this.name = 'AuthError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404, true);
    this.name = 'NotFoundError';
  }
}

/**
 * Extract user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Handle API errors with logging and user-friendly messages
 */
export function handleApiError(error: unknown, context?: string): {
  error: string;
  statusCode: number;
} {
  const message = getErrorMessage(error);
  const statusCode = error instanceof AppError ? error.statusCode || 500 : 500;

  // Log error details in development
  logger.error(`API Error ${context ? `(${context})` : ''}:`, {
    message,
    error,
    statusCode,
  });

  return {
    error: message,
    statusCode,
  };
}

/**
 * Async error wrapper for try-catch blocks
 */
export async function handleAsync<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Validate required environment variables
 */
export function validateEnvVar(key: string, value: string | undefined): string {
  if (!value) {
    throw new AppError(
      `Missing required environment variable: ${key}`,
      'ENV_VAR_MISSING',
      500,
      false
    );
  }
  return value;
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    logger.error('JSON parse error:', error);
    return fallback;
  }
}
