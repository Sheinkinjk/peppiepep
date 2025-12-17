import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent } from "@/lib/referral-events";
import { createApiLogger } from "@/lib/api-logger";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const logger = createApiLogger("api:webhooks:twilio");

  // Rate limiting
  const rateLimitCheck = await checkRateLimit(request, "webhook");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for Twilio webhook");
    return rateLimitCheck.response;
  }

  const webhookSecret = process.env.TWILIO_WEBHOOK_TOKEN?.trim();
  if (!webhookSecret) {
    logger.error("TWILIO_WEBHOOK_TOKEN missing");
    return NextResponse.json(
      { error: "TWILIO_WEBHOOK_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const header = request.headers.get("authorization");
  if (header !== `Bearer ${webhookSecret}`) {
    logger.warn("Twilio webhook unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();
  const params = new URLSearchParams(body);
  const messageSid = params.get("MessageSid");
  const messageStatus =
    params.get("MessageStatus") || params.get("SmsStatus") || "";

  if (!messageSid) {
    logger.warn("Twilio webhook missing MessageSid");
    return NextResponse.json({ error: "Missing MessageSid" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: message, error } = await (supabase as any)
    .from("campaign_messages")
    .select("id, business_id, customer_id, campaign_id")
    .eq("provider_message_id", messageSid)
    .single();

  if (error || !message) {
    logger.warn("Twilio webhook message not found", { messageSid, error });
    return NextResponse.json({ ok: true });
  }

  const normalizedStatus = messageStatus.toLowerCase();
  const now = new Date().toISOString();

  if (normalizedStatus === "delivered") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("campaign_messages")
      .update({
        status: "delivered",
        delivered_at: now,
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
        provider_message_id: messageSid,
      },
    });
    logger.info("Twilio delivery logged", { messageId: message.id });
  } else if (
    normalizedStatus === "failed" ||
    normalizedStatus === "undelivered"
  ) {
    const errorMessage =
      params.get("ErrorMessage") || params.get("ErrorCode") || "delivery_failed";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("campaign_messages")
      .update({
        status: "failed",
        error: errorMessage,
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
        provider_message_id: messageSid,
        reason: errorMessage,
        channel: "sms",
      },
    });
    logger.info("Twilio failure logged", { messageId: message.id, errorMessage });
  } else {
    logger.info("Twilio webhook ignored status", { normalizedStatus });
  }

  return NextResponse.json({ ok: true });
}
