/**
 * Simple in-memory rate limiter using LRU cache
 * Prevents API abuse and cost overruns
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private cache: Map<string, RateLimitEntry>;
  private maxSize: number;

  constructor(maxSize: number = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @param limit - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with success status and retry information
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  } {
    const now = Date.now();
    const entry = this.cache.get(identifier);

    // Clean up old entries if cache is too large
    if (this.cache.size > this.maxSize) {
      this.cleanup(now);
    }

    // No entry or window expired - allow request
    if (!entry || now > entry.resetTime) {
      this.cache.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });

      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: now + windowMs,
      };
    }

    // Entry exists and window still active
    if (entry.count < limit) {
      // Allow request
      entry.count++;
      this.cache.set(identifier, entry);

      return {
        success: true,
        limit,
        remaining: limit - entry.count,
        reset: entry.resetTime,
      };
    }

    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(now: number) {
    const entriesToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.resetTime) {
        entriesToDelete.push(key);
      }
    }

    entriesToDelete.forEach((key) => this.cache.delete(key));
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier: string) {
    this.cache.delete(identifier);
  }

  /**
   * Get current stats
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }
}

// Create singleton instances for different API endpoints
const rateLimiters = {
  // AI message generation - expensive OpenAI calls
  generateMessage: new RateLimiter(500),

  // Demo referrals - public endpoint
  demoReferrals: new RateLimiter(1000),

  // QR code generation - CPU intensive
  generateQR: new RateLimiter(500),

  // General API rate limiter
  general: new RateLimiter(1000),
};

/**
 * Get client identifier from request (IP address)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to a generic identifier
  return 'unknown';
}

/**
 * Rate limit presets for different API endpoints
 */
export const rateLimitPresets = {
  // AI message generation: 10 requests per minute (expensive)
  generateMessage: {
    limiter: rateLimiters.generateMessage,
    limit: 10,
    windowMs: 60 * 1000, // 1 minute
  },

  // Demo referrals: 30 requests per minute (public facing)
  demoReferrals: {
    limiter: rateLimiters.demoReferrals,
    limit: 30,
    windowMs: 60 * 1000, // 1 minute
  },

  // QR code generation: 20 requests per minute
  generateQR: {
    limiter: rateLimiters.generateQR,
    limit: 20,
    windowMs: 60 * 1000, // 1 minute
  },

  // General API: 60 requests per minute
  general: {
    limiter: rateLimiters.general,
    limit: 60,
    windowMs: 60 * 1000, // 1 minute
  },
};

/**
 * Helper function to apply rate limiting to an API route
 * @param request - Next.js request object
 * @param preset - Rate limit preset to use
 * @returns Rate limit check result or null if successful
 */
export function checkRateLimit(
  request: Request,
  preset: keyof typeof rateLimitPresets
): { success: boolean; response?: Response } {
  const { limiter, limit, windowMs } = rateLimitPresets[preset];
  const identifier = getClientIdentifier(request);

  const result = limiter.check(identifier, limit, windowMs);

  if (!result.success) {
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': retryAfter.toString(),
          },
        }
      ),
    };
  }

  return { success: true };
}

/**
 * Higher-order function to wrap API routes with rate limiting
 */
export function withRateLimit<T extends (request: Request) => Promise<Response>>(
  handler: T,
  preset: keyof typeof rateLimitPresets
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    const rateLimitCheck = checkRateLimit(request, preset);

    if (!rateLimitCheck.success && rateLimitCheck.response) {
      return rateLimitCheck.response;
    }

    return handler(request);
  };
}

export default rateLimiters;
