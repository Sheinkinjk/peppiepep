import { describe, expect, it, vi } from "vitest";

import { checkRateLimitForIdentifier, withRateLimit } from "@/lib/rate-limit";

const buildRequest = (identifier: string) =>
  new Request("https://example.com/api/test", {
    headers: {
      "cf-connecting-ip": identifier,
    },
  });

describe("rate limit guards", () => {
  it("enforces identifier-based limits", async () => {
    const identifier = `test-${Date.now()}`;

    for (let i = 0; i < 10; i++) {
      const result = await checkRateLimitForIdentifier(identifier, "generateMessage");
      expect(result.success).toBe(true);
    }

    const blocked = await checkRateLimitForIdentifier(identifier, "generateMessage");
    expect(blocked.success).toBe(false);
    expect(blocked.response?.status).toBe(429);
  });

  it("prevents wrapped handlers from executing after the limit is exceeded", async () => {
    const handler = vi.fn(async () => new Response("ok", { status: 200 }));
    const limitedHandler = withRateLimit(handler, "generateMessage");
    const identifier = `wrap-${Date.now()}`;

    for (let i = 0; i < 10; i++) {
      const response = await limitedHandler(buildRequest(identifier));
      expect(response.status).toBe(200);
    }

    const throttledResponse = await limitedHandler(buildRequest(identifier));
    expect(throttledResponse.status).toBe(429);
    expect(handler).toHaveBeenCalledTimes(10);
  });
});
