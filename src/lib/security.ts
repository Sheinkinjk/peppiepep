/**
 * Security Utilities
 * Provides rate limiting, audit logging, and security enhancements
 */

import { headers } from "next/headers";
import { createServiceClient } from "./supabase";

/**
 * Rate limiting configuration
 */
const RATE_LIMITS = {
  admin_api: { requests: 100, windowMs: 60000 }, // 100 requests per minute
  partner_api: { requests: 50, windowMs: 60000 }, // 50 requests per minute
  auth: { requests: 10, windowMs: 60000 }, // 10 requests per minute
} as const;

/**
 * In-memory rate limit store (for serverless environments)
 * In production, use Redis or similar distributed cache
 */
const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number }
>();

/**
 * Check rate limit for a given key
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    // Create new window
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetAt: record.resetAt,
  };
}

/**
 * Get client IP address from request headers
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Get user agent from request headers
 */
export async function getUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "unknown";
}

/**
 * Apply rate limiting to admin API routes
 */
export async function applyRateLimit(
  type: keyof typeof RATE_LIMITS
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const ip = await getClientIp();
  const key = `${type}:${ip}`;
  const config = RATE_LIMITS[type];

  const result = checkRateLimit(key, config.requests, config.windowMs);

  // Clean up expired entries periodically (every 1000 requests)
  if (rateLimitStore.size > 1000) {
    const now = Date.now();
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetAt) {
        rateLimitStore.delete(k);
      }
    }
  }

  return result;
}

/**
 * Audit log entry types
 */
export type AuditAction =
  | "partner_approved"
  | "partner_rejected"
  | "compliance_verified"
  | "compliance_rejected"
  | "payment_processed"
  | "admin_login"
  | "admin_action"
  | "data_export"
  | "settings_changed"
  | "user_impersonated";

/**
 * Create an audit log entry
 */
export async function createAuditLog(params: {
  action: AuditAction;
  userId?: string;
  targetUserId?: string;
  targetResourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const supabase = await createServiceClient();
    const ipAddress = params.ipAddress || (await getClientIp());
    const userAgent = params.userAgent || (await getUserAgent());

    const { error } = await supabase.from("audit_logs").insert({
      action: params.action,
      user_id: params.userId,
      target_user_id: params.targetUserId,
      target_resource_id: params.targetResourceId,
      metadata: params.metadata,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Failed to create audit log:", error);
      // Fall back to console logging if DB insert fails
      console.log("[AUDIT]", {
        action: params.action,
        user_id: params.userId,
        target_user_id: params.targetUserId,
        target_resource_id: params.targetResourceId,
        metadata: params.metadata,
        ip_address: ipAddress,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error creating audit log:", error);
    // Don't throw - audit logging should not break the main flow
  }
}

/**
 * Input sanitization for preventing XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UUID format
 */
export function isValidUuid(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Generate CSRF token (stored in session)
 */
export function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

/**
 * Security headers for API routes
 */
export function getSecurityHeaders(): HeadersInit {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  };
}

/**
 * Check if request is from a safe origin
 */
export async function verifySafeOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const referer = headersList.get("referer");

  // Allow same-origin requests
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://peppiepep.vercel.app",
    "http://localhost:3000",
  ];

  if (origin && allowedOrigins.includes(origin)) return true;
  if (referer && allowedOrigins.some((o) => referer.startsWith(o as string)))
    return true;

  return false;
}

/**
 * Mask sensitive data in logs
 */
export function maskSensitiveData(data: any): any {
  if (typeof data !== "object" || data === null) return data;

  const masked = { ...data };
  const sensitiveKeys = [
    "password",
    "token",
    "secret",
    "api_key",
    "apiKey",
    "stripe_key",
    "email",
    "phone",
    "ssn",
    "credit_card",
  ];

  for (const key of Object.keys(masked)) {
    if (
      sensitiveKeys.some((sk) => key.toLowerCase().includes(sk.toLowerCase()))
    ) {
      masked[key] = "***REDACTED***";
    } else if (typeof masked[key] === "object") {
      masked[key] = maskSensitiveData(masked[key]);
    }
  }

  return masked;
}
