import { createHash } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting utilities shared across API routes.
 * Uses Upstash Redis when configured and falls back to per-instance memory cache locally.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimiterOptions {
  name: string;
  limit: number;
  windowMs: number;
  maxSize?: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const redisClient =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

class RateLimiter {
  private cache: Map<string, RateLimitEntry>;
  private maxSize: number;
  private remoteLimiter?: Ratelimit;
  public readonly name: string;
  public readonly limit: number;
  public readonly windowMs: number;

  constructor(options: RateLimiterOptions) {
    this.name = options.name;
    this.limit = options.limit;
    this.windowMs = options.windowMs;
    this.maxSize = options.maxSize ?? 1000;
    this.cache = new Map();

    if (redisClient) {
      this.remoteLimiter = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(
          this.limit,
          `${Math.max(1, Math.floor(this.windowMs / 1000))} s`,
        ),
        analytics: true,
        prefix: `pepform:rate:${this.name}`,
      });
    }
  }

  async check(identifier: string): Promise<RateLimitResult> {
    if (this.remoteLimiter) {
      const result = await this.remoteLimiter.limit(identifier);
      return {
        success: result.success,
        limit: this.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    }

    return this.checkInMemory(identifier);
  }

  private checkInMemory(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.cache.get(identifier);

    if (this.cache.size > this.maxSize) {
      this.cleanup(now);
    }

    if (!entry || now > entry.resetTime) {
      this.cache.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });

      return {
        success: true,
        limit: this.limit,
        remaining: this.limit - 1,
        reset: now + this.windowMs,
      };
    }

    if (entry.count < this.limit) {
      entry.count++;
      this.cache.set(identifier, entry);

      return {
        success: true,
        limit: this.limit,
        remaining: this.limit - entry.count,
        reset: entry.resetTime,
      };
    }

    return {
      success: false,
      limit: this.limit,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  private cleanup(now: number) {
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.resetTime) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Get a stable identifier for the client based on request metadata.
 */
export function getClientIdentifier(request: Request): string {
  const headerCandidates = [
    "cf-connecting-ip",
    "x-client-ip",
    "x-forwarded-for",
    "x-real-ip",
    "x-cluster-client-ip",
    "forwarded",
    "true-client-ip",
    "fastly-client-ip",
  ];

  for (const headerName of headerCandidates) {
    const headerValue = request.headers.get(headerName);
    if (!headerValue) continue;

    if (headerName === "forwarded") {
      const match = headerValue.match(/for="?([^;"]+)/i);
      if (match?.[1]) {
        return match[1].split(",")[0].trim();
      }
    } else {
      return headerValue.split(",")[0].trim();
    }
  }

  const remoteAddr = request.headers.get("remote-addr");
  if (remoteAddr) {
    return remoteAddr;
  }

  // Final fallback: hash a subset of headers so individual clients don't all share "unknown".
  const fingerprintSource = [
    request.headers.get("user-agent") ?? "unknown-agent",
    request.headers.get("accept-language") ?? "unknown-language",
    request.headers.get("referer") ?? "unknown-referer",
  ].join("|");

  return createHash("sha256").update(fingerprintSource).digest("hex");
}

const rateLimiters = {
  generateMessage: new RateLimiter({
    name: "generateMessage",
    limit: 10,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  demoReferrals: new RateLimiter({
    name: "demoReferrals",
    limit: 30,
    windowMs: 60 * 1000,
    maxSize: 1000,
  }),
  generateQR: new RateLimiter({
    name: "generateQR",
    limit: 20,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  referralStats: new RateLimiter({
    name: "referralStats",
    limit: 15,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  ambassadorCode: new RateLimiter({
    name: "ambassadorCode",
    limit: 10,
    windowMs: 60 * 1000,
    maxSize: 2000,
  }),
  general: new RateLimiter({
    name: "general",
    limit: 60,
    windowMs: 60 * 1000,
    maxSize: 1000,
  }),
  supportChat: new RateLimiter({
    name: "supportChat",
    limit: 15,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  campaignSend: new RateLimiter({
    name: "campaignSend",
    limit: 5,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  customerUpload: new RateLimiter({
    name: "customerUpload",
    limit: 10,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  ambassadorDelete: new RateLimiter({
    name: "ambassadorDelete",
    limit: 20,
    windowMs: 60 * 1000,
    maxSize: 500,
  }),
  discountRedeem: new RateLimiter({
    name: "discountRedeem",
    limit: 30,
    windowMs: 60 * 1000,
    maxSize: 1000,
  }),
  webhook: new RateLimiter({
    name: "webhook",
    limit: 100,
    windowMs: 60 * 1000,
    maxSize: 2000,
  }),
};

export const rateLimitPresets = rateLimiters;

export async function checkRateLimit(
  request: Request,
  preset: keyof typeof rateLimitPresets,
): Promise<{ success: boolean; response?: Response }> {
  const limiter = rateLimitPresets[preset];
  const identifier = getClientIdentifier(request);
  const result = await limiter.check(identifier);

  if (!result.success) {
    const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));

    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limiter.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.reset.toString(),
            "Retry-After": retryAfter.toString(),
          },
        },
      ),
    };
  }

  return { success: true };
}

export async function checkRateLimitForIdentifier(
  identifier: string,
  preset: keyof typeof rateLimitPresets,
): Promise<{ success: boolean; response?: Response }> {
  const limiter = rateLimitPresets[preset];
  const result = await limiter.check(identifier);

  if (!result.success) {
    const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));

    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limiter.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.reset.toString(),
            "Retry-After": retryAfter.toString(),
          },
        },
      ),
    };
  }

  return { success: true };
}

export function withRateLimit<T extends (request: Request) => Promise<Response>>(
  handler: T,
  preset: keyof typeof rateLimitPresets,
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    const rateLimitCheck = await checkRateLimit(request, preset);

    if (!rateLimitCheck.success && rateLimitCheck.response) {
      return rateLimitCheck.response;
    }

    return handler(request);
  };
}

export default rateLimiters;
