import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent } from "@/lib/referral-events";

type ResendEvent = {
  type: string;
  data?: {
    email_id?: string;
    to?: string;
    subject?: string;
    reason?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { error: "RESEND_WEBHOOK_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const header = request.headers.get("authorization");
  if (header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: ResendEvent;
  try {
    payload = (await request.json()) as ResendEvent;
  } catch (error) {
    console.error("Failed to parse Resend webhook payload:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const providerMessageId = payload.data?.email_id;
  if (!providerMessageId) {
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
  }

  return NextResponse.json({ ok: true });
}
