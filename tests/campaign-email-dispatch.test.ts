import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const envSnapshot = { ...process.env };

const buildCampaignEmailMock = vi.fn().mockResolvedValue({ html: "<p>email</p>", text: "email" });
vi.mock("@/lib/campaign-email", () => ({
  buildCampaignEmail: buildCampaignEmailMock,
}));

const resendSendMock = vi.fn().mockResolvedValue({ data: { id: "provider_123" } });
function Resend(this: { emails: { send: typeof resendSendMock } }, _apiKey: string) {
  this.emails = { send: resendSendMock };
}
const resendConstructorMock = vi.fn(Resend);
vi.mock("resend", () => ({ Resend: resendConstructorMock }));

function createSupabaseStub() {
  const updates: Array<{ table: string; values: unknown; where: Record<string, unknown> }> = [];
  const rpcs: Array<{ fn: string; args: unknown }> = [];

  const from = (table: string) => ({
    select: () => ({
      eq: () => ({
        in: () => ({
          limit: async () => ({ data: null, error: null, count: 0 }),
        }),
      }),
    }),
    update: (values: unknown) => ({
      eq: async (column: string, value: unknown) => {
        updates.push({ table, values, where: { [column]: value } });
        return { data: null, error: null };
      },
    }),
    insert: async () => ({ data: null, error: null }),
  });

  const rpc = async (fn: string, args: unknown) => {
    rpcs.push({ fn, args });
    return { data: null, error: null };
  };

  return { from, rpc, updates, rpcs };
}

beforeEach(() => {
  process.env = { ...envSnapshot };
});

afterEach(() => {
  process.env = { ...envSnapshot };
  vi.clearAllMocks();
});

describe("Resend campaign email dispatch (inline)", () => {
  it("fails queued email when Resend env is missing", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;

    const supabase = createSupabaseStub();
    const { dispatchCampaignMessagesInline } = await import("@/lib/campaign-inline-dispatch");

    const result = await dispatchCampaignMessagesInline({
      supabase: supabase as any,
      messages: [
        {
          id: "msg_1",
          channel: "email",
          to_address: "user@example.com",
          referral_link: "https://referlabs.test/r/abc",
          message_body: "Hello",
          business_id: "biz_1",
          customer_id: "cust_1",
          campaign_id: "camp_1",
          metadata: {},
        } as any,
      ],
      campaign: { id: "camp_1", name: "Test Campaign" },
      business: { name: "Refer Labs", logo_url: null, brand_highlight_color: null, brand_tone: null },
      siteUrl: "https://referlabs.test",
    });

    expect(result.failed).toBe(1);
    expect(resendConstructorMock).not.toHaveBeenCalled();
    expect(resendSendMock).not.toHaveBeenCalled();

    expect(supabase.updates.some((u) => u.table === "campaign_messages" && (u.values as any)?.status === "failed")).toBe(
      true,
    );
  });

  it("sends email via Resend and marks message sent with provider id", async () => {
    process.env.RESEND_API_KEY = "test_key";
    process.env.RESEND_FROM_EMAIL = "no-reply@referlabs.test";
    process.env.RESEND_REPLY_TO = "support@referlabs.test";

    const supabase = createSupabaseStub();
    const { dispatchCampaignMessagesInline } = await import("@/lib/campaign-inline-dispatch");

    const result = await dispatchCampaignMessagesInline({
      supabase: supabase as any,
      messages: [
        {
          id: "msg_1",
          channel: "email",
          to_address: "user@example.com",
          referral_link: "https://referlabs.test/r/abc",
          message_body: "Hello",
          business_id: "biz_1",
          customer_id: "cust_1",
          campaign_id: "camp_1",
          metadata: { ambassador_portal_url: "https://referlabs.test/r/referral" },
        } as any,
      ],
      campaign: { id: "camp_1", name: "Test Campaign" },
      business: { name: "Refer Labs", logo_url: null, brand_highlight_color: null, brand_tone: null },
      siteUrl: "https://referlabs.test",
    });

    expect(result.sent).toBe(1);
    expect(result.failed).toBe(0);

    expect(resendConstructorMock).toHaveBeenCalledTimes(1);
    expect(resendSendMock).toHaveBeenCalledTimes(1);
    const call = resendSendMock.mock.calls[0][0];
    expect(call.to).toBe("user@example.com");
    expect(call.subject).toBe("Test Campaign");
    expect(call.html).toContain("email");
    expect(call.text).toContain("email");
    expect(call.reply_to).toBe("support@referlabs.test");

    const sentUpdate = supabase.updates.find(
      (u) => u.table === "campaign_messages" && (u.values as any)?.status === "sent",
    );
    expect(sentUpdate).toBeTruthy();
    expect((sentUpdate?.values as any)?.provider_message_id).toBe("provider_123");

    expect(buildCampaignEmailMock).toHaveBeenCalledTimes(1);
  });
});
