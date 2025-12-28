import { describe, expect, it, beforeEach, afterEach } from "vitest";

import { POST as twilioWebhook } from "@/app/api/webhooks/twilio/route";
import { POST as resendWebhook } from "@/app/api/webhooks/resend/route";
import { POST as discountRedeem } from "@/app/api/discount-codes/redeem/route";

const envSnapshot = { ...process.env };

beforeEach(() => {
  process.env = { ...envSnapshot };
});

afterEach(() => {
  process.env = { ...envSnapshot };
});

describe("webhook smoke tests", () => {
  describe("Twilio webhook", () => {
    it("returns 500 when TWILIO_WEBHOOK_TOKEN is missing", async () => {
      delete process.env.TWILIO_WEBHOOK_TOKEN;
      const response = await twilioWebhook(new Request("http://localhost/api/webhooks/twilio", { method: "POST" }));
      expect(response.status).toBe(500);
    });

    it("returns 401 when authorization is wrong", async () => {
      process.env.TWILIO_WEBHOOK_TOKEN = "secret";
      const response = await twilioWebhook(
        new Request("http://localhost/api/webhooks/twilio", {
          method: "POST",
          headers: { authorization: "Bearer wrong" },
          body: "MessageSid=SM123&MessageStatus=delivered",
        }),
      );
      expect(response.status).toBe(401);
    });

    it("returns 400 when MessageSid is missing", async () => {
      process.env.TWILIO_WEBHOOK_TOKEN = "secret";
      const response = await twilioWebhook(
        new Request("http://localhost/api/webhooks/twilio", {
          method: "POST",
          headers: { authorization: "Bearer secret" },
          body: "MessageStatus=delivered",
        }),
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Resend webhook", () => {
    it("returns 500 when RESEND_WEBHOOK_TOKEN is missing", async () => {
      delete process.env.RESEND_WEBHOOK_TOKEN;
      const response = await resendWebhook(new Request("http://localhost/api/webhooks/resend", { method: "POST" }));
      expect(response.status).toBe(500);
    });

    it("returns 401 when authorization is wrong", async () => {
      process.env.RESEND_WEBHOOK_TOKEN = "secret";
      const response = await resendWebhook(
        new Request("http://localhost/api/webhooks/resend", {
          method: "POST",
          headers: { authorization: "Bearer wrong", "content-type": "application/json" },
          body: JSON.stringify({ type: "email.delivered", data: { email_id: "abc" } }),
        }),
      );
      expect(response.status).toBe(401);
    });

    it("returns 400 when JSON is invalid", async () => {
      process.env.RESEND_WEBHOOK_TOKEN = "secret";
      const response = await resendWebhook(
        new Request("http://localhost/api/webhooks/resend", {
          method: "POST",
          headers: { authorization: "Bearer secret", "content-type": "application/json" },
          body: "{not-json",
        }),
      );
      expect(response.status).toBe(400);
    });

    it("returns 400 when email_id is missing", async () => {
      process.env.RESEND_WEBHOOK_TOKEN = "secret";
      const response = await resendWebhook(
        new Request("http://localhost/api/webhooks/resend", {
          method: "POST",
          headers: { authorization: "Bearer secret", "content-type": "application/json" },
          body: JSON.stringify({ type: "email.delivered" }),
        }),
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Discount capture endpoint", () => {
    it("returns 401 when capture secret is missing", async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

      const response = await discountRedeem(
        new Request("http://localhost/api/discount-codes/redeem", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ discountCode: "ANY" }),
        }),
      );

      expect(response.status).toBe(401);
      const payload = await response.json();
      expect(payload?.error).toMatch(/Missing discount capture secret/i);
    });
  });
});

