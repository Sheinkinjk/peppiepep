import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { GET as healthGET } from "@/app/api/health/attribution/route";
import { GET as verifyGET } from "@/app/api/verify-attribution/route";
import { POST as trackConversionPOST } from "@/app/api/track-conversion/route";

describe("Attribution health endpoints", () => {
  it("returns a structured health response", async () => {
    const hasSupabaseEnv = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (!hasSupabaseEnv) {
      return;
    }

    const response = await healthGET();
    const payload = await response.json();

    expect([200, 500]).toContain(response.status);
    expect(payload).toHaveProperty("healthy");

    if (response.status === 200) {
      expect(payload.healthy).toBe(true);
      expect(payload).toHaveProperty("metrics");
      expect(payload).toHaveProperty("status");
    } else {
      expect(payload.healthy).toBe(false);
      expect(payload).toHaveProperty("error");
    }
  });

  it("returns no attribution when cookie missing", async () => {
    const request = new NextRequest("http://localhost/api/verify-attribution");
    const response = await verifyGET(request);
    const payload = await response.json();

    expect(payload.hasAttribution).toBe(false);
    expect(payload.reason).toBe("no_cookie");
  });

  it("rejects conversion logging when required fields are missing", async () => {
    const request = new Request("http://localhost/api/track-conversion", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "vitest",
      },
      body: JSON.stringify({}),
    });

    const response = await trackConversionPOST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("Missing required fields");
  });
});
