import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { sendAdminNotification } from "@/lib/email-notifications";

const envSnapshot = { ...process.env };

beforeEach(() => {
  process.env = { ...envSnapshot };
});

afterEach(() => {
  process.env = { ...envSnapshot };
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Resend admin notifications", () => {
  it("returns error when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await sendAdminNotification({
      subject: "Test subject",
      html: "<p>Hello</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured|configured/i);
  });

  it("posts to Resend API with expected payload", async () => {
    process.env.RESEND_API_KEY = "test_key";
    process.env.RESEND_FROM_EMAIL = "Refer Labs <no-reply@referlabs.test>";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: "email_123" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendAdminNotification({
      subject: "Hello",
      html: "<p>World</p>",
      to: "ops@referlabs.test",
    });

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init?.method).toBe("POST");
    expect(init?.headers?.Authorization).toBe("Bearer test_key");
    expect(init?.headers?.["Content-Type"]).toBe("application/json");

    const parsedBody = JSON.parse(init.body);
    expect(parsedBody).toMatchObject({
      from: "Refer Labs <no-reply@referlabs.test>",
      to: ["ops@referlabs.test"],
      subject: "Hello",
      html: "<p>World</p>",
    });
  });
});

