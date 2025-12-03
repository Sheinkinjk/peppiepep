import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent } from "@/lib/referral-events";

export async function POST(request: Request) {
  const webhookSecret = process.env.TWILIO_WEBHOOK_TOKEN;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "TWILIO_WEBHOOK_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const header = request.headers.get("authorization");
  if (header !== `Bearer ${webhookSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();
  const params = new URLSearchParams(body);
  const messageSid = params.get("MessageSid");
  const messageStatus =
    params.get("MessageStatus") || params.get("SmsStatus") || "";

  if (!messageSid) {
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
  }

  return NextResponse.json({ ok: true });
}
