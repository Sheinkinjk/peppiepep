/**
 * CSRF Protection for API Routes and Server Actions
 *
 * Implements double-submit cookie pattern for CSRF protection.
 * Validates that requests originate from the same site.
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Verify Origin header matches allowed origins
 */
export function verifyOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // Get allowed origins from environment
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au',
    'https://peppiepep.vercel.app',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
  ];

  // Check origin header
  if (origin) {
    return allowedOrigins.some(allowed => origin.startsWith(allowed));
  }

  // Fallback to referer if origin not present
  if (referer) {
    return allowedOrigins.some(allowed => referer.startsWith(allowed));
  }

  // No origin or referer - reject
  return false;
}

/**
 * Verify CSRF token using double-submit cookie pattern
 */
export function verifyCSRFToken(request: NextRequest): boolean {
  // Get token from cookie
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;

  // Get token from header or form data
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Both must exist and match
  if (!cookieToken || !headerToken) {
    return false;
  }

  return cookieToken === headerToken;
}

/**
 * Middleware to protect routes from CSRF attacks
 * Use this wrapper for all state-changing API routes
 */
export function withCSRFProtection(
  handler: (request: NextRequest) => Promise<Response>
) {
  return async (request: NextRequest) => {
    // Only protect state-changing methods
    const method = request.method.toUpperCase();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return handler(request);
    }

    // Verify origin
    if (!verifyOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // Verify CSRF token
    if (!verifyCSRFToken(request)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    return handler(request);
  };
}

/**
 * Set CSRF token cookie in response
 * Call this when rendering pages that will make state-changing requests
 */
export function setCSRFCookie(response: NextResponse, token?: string): NextResponse {
  const csrfToken = token || generateCSRFToken();

  response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: false, // Must be accessible to JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}

/**
 * Get CSRF token from cookies (client-side)
 */
export function getCSRFTokenFromCookies(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp('(^| )' + CSRF_COOKIE_NAME + '=([^;]+)'));
  return match ? match[2] : null;
}

/**
 * Validate origin for Server Actions
 * Next.js Server Actions have built-in origin checking, but this adds extra layer
 */
export function validateServerActionOrigin(headers: Headers): boolean {
  const origin = headers.get('origin');
  const host = headers.get('host');

  if (!origin || !host) {
    return false;
  }

  // Origin must match the host
  return origin.includes(host);
}
