import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent } from "@/lib/referral-events";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";

type ResendEvent = {
  type: string;
  data?: {
    email_id?: string;
    to?: string;
    subject?: string;
    reason?: string;
  };
};

const resendEventSchema = z.object({
  type: z.string(),
  data: z
    .object({
      email_id: z.string().optional(),
      to: z.string().optional(),
      subject: z.string().optional(),
      reason: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  const logger = createApiLogger("api:webhooks:resend");

  // Rate limiting
  const rateLimitCheck = await checkRateLimit(request, "webhook");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for Resend webhook");
    return rateLimitCheck.response;
  }

  const secret = process.env.RESEND_WEBHOOK_TOKEN?.trim();
  if (!secret) {
    logger.error("RESEND_WEBHOOK_TOKEN missing");
    return NextResponse.json(
      { error: "RESEND_WEBHOOK_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const header = request.headers.get("authorization");
  if (header !== `Bearer ${secret}`) {
    logger.warn("Resend webhook unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsedPayload = await parseJsonBody(request, resendEventSchema, logger, {
    errorMessage: "Invalid JSON",
  });

  if (!parsedPayload.success) {
    return parsedPayload.response;
  }

  const payload = parsedPayload.data as ResendEvent;
  const providerMessageId = payload.data?.email_id;
  if (!providerMessageId) {
    logger.warn("Resend webhook missing email_id");
    return NextResponse.json({ error: "Missing email_id" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: message, error } = await (supabase as any)
    .from("campaign_messages")
    .select("id, business_id, customer_id, campaign_id")
    .eq("provider_message_id", providerMessageId)
    .single();

  if (error || !message) {
    logger.warn("Resend webhook message not found", { providerMessageId, error });
    return NextResponse.json({ ok: true });
  }

  const eventType = payload.type;

  if (eventType === "email.delivered") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("campaign_messages")
      .update({
        status: "delivered",
        delivered_at: new Date().toISOString(),
      })
      .eq("id", message.id);

    await logReferralEvent({
      supabase,
      businessId: message.business_id,
      ambassadorId: message.customer_id,
      eventType: "campaign_message_delivered",
      metadata: {
        campaign_id: message.campaign_id,
        campaign_message_id: message.id,
        provider_message_id: providerMessageId,
        channel: "email",
      },
    });
    logger.info("Resend delivery logged", { messageId: message.id });
  } else if (
    eventType === "email.bounced" ||
    eventType === "email.complained"
  ) {
    const reason = payload.data?.reason || eventType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("campaign_messages")
      .update({
        status: "failed",
        error: reason,
      })
      .eq("id", message.id);

    await logReferralEvent({
      supabase,
      businessId: message.business_id,
      ambassadorId: message.customer_id,
      eventType: "campaign_message_failed",
      metadata: {
        campaign_id: message.campaign_id,
        campaign_message_id: message.id,
        provider_message_id: providerMessageId,
        reason,
        channel: "email",
      },
    });
    logger.info("Resend failure logged", { messageId: message.id, reason });
  } else {
    logger.info("Resend event ignored", { eventType });
  }

  return NextResponse.json({ ok: true });
}
