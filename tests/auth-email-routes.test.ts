import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const envSnapshot = { ...process.env };

const emailsSendMock = vi.fn().mockResolvedValue({ data: { id: "resend_email_123" } });
function Resend(this: { emails: { send: typeof emailsSendMock } }, _apiKey: string) {
  this.emails = { send: emailsSendMock };
}
const resendConstructorMock = vi.fn(Resend);

vi.mock("resend", () => ({ Resend: resendConstructorMock }));

const generateLinkMock = vi.fn().mockResolvedValue({
  data: { properties: { action_link: "https://example.com/link" } },
  error: null,
});

vi.mock("@/lib/supabase", () => ({
  createServiceClient: async () => ({
    auth: {
      admin: {
        generateLink: generateLinkMock,
      },
    },
  }),
}));

const sendAdminNotificationMock = vi.fn().mockResolvedValue({ success: true });
vi.mock("@/lib/email-notifications", async () => {
  const actual = await vi.importActual<typeof import("@/lib/email-notifications")>("@/lib/email-notifications");
  return {
    ...actual,
    sendAdminNotification: sendAdminNotificationMock,
  };
});

beforeEach(() => {
  process.env = { ...envSnapshot };
  process.env.RESEND_API_KEY = "test_key";
  process.env.RESEND_FROM_EMAIL = "Refer Labs <no-reply@referlabs.test>";
  process.env.NEXT_PUBLIC_SITE_URL = "https://referlabs.test";
});

afterEach(() => {
  process.env = { ...envSnapshot };
  vi.clearAllMocks();
});

describe("auth email routes (Resend)", () => {
  it("send-confirmation sends a magic link email + admin notification", async () => {
    const { POST } = await import("@/app/api/auth/send-confirmation/route");

    const response = await POST(
      new Request("http://localhost/api/auth/send-confirmation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }),
      }),
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.success).toBe(true);

    expect(generateLinkMock).toHaveBeenCalledWith({
      type: "magiclink",
      email: "user@example.com",
      options: { redirectTo: "https://referlabs.test/auth/callback" },
    });

    expect(sendAdminNotificationMock).toHaveBeenCalledTimes(1);

    expect(resendConstructorMock).toHaveBeenCalledTimes(1);
    expect(emailsSendMock).toHaveBeenCalledTimes(1);
    const call = emailsSendMock.mock.calls[0][0];
    expect(call.from).toBe("Refer Labs <no-reply@referlabs.test>");
    expect(call.to).toBe("user@example.com");
    expect(call.subject).toMatch(/confirm/i);
    expect(call.text).toContain("https://example.com/link");
    expect(call.html).toContain("https://example.com/link");
  });

  it("send-recovery sends a recovery link email", async () => {
    const { POST } = await import("@/app/api/auth/send-recovery/route");

    const response = await POST(
      new Request("http://localhost/api/auth/send-recovery", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }),
      }),
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.success).toBe(true);

    expect(generateLinkMock).toHaveBeenCalledWith({
      type: "recovery",
      email: "user@example.com",
      options: { redirectTo: "https://referlabs.test/auth/reset-password" },
    });

    expect(resendConstructorMock).toHaveBeenCalledTimes(1);
    expect(emailsSendMock).toHaveBeenCalledTimes(1);
    const call = emailsSendMock.mock.calls[0][0];
    expect(call.from).toBe("Refer Labs <no-reply@referlabs.test>");
    expect(call.to).toBe("user@example.com");
    expect(call.subject).toMatch(/reset/i);
    expect(call.text).toContain("https://example.com/link");
    expect(call.html).toContain("https://example.com/link");
  });
});
