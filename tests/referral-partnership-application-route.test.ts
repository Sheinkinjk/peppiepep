import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/referral-partnership-application/route";

const envSnapshot = { ...process.env };

beforeEach(() => {
  process.env = { ...envSnapshot };
});

afterEach(() => {
  process.env = { ...envSnapshot };
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("referral partnership application route", () => {
  it("returns 400 for invalid payloads", async () => {
    const request = new Request("http://localhost/api/referral-partnership-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 500 when notification email cannot be sent", async () => {
    delete process.env.RESEND_API_KEY;

    const request = new Request("http://localhost/api/referral-partnership-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Jarred",
        email: "jarred@example.com",
        phone: "0400000000",
        company: "Refer Labs",
        role: "Founder",
        currentPlan: "Growth",
        goals: "Scale partner referrals",
        timeline: "This month",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });

  it("returns 200 when notification email is sent", async () => {
    process.env.RESEND_API_KEY = "test_key";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: "email_123" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost/api/referral-partnership-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Jarred",
        email: "jarred@example.com",
        phone: "0400000000",
        company: "Refer Labs",
        role: "Founder",
        currentPlan: "Growth",
        goals: "Scale partner referrals",
        timeline: "This month",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

