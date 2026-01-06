import { NextResponse } from "next/server";

import { createServerComponentClient, createServiceClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { logReferralEvent, type ReferralEventType } from "@/lib/referral-events";

export async function GET() {
  const logger = createApiLogger("api:referral-events");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      logger.warn("Referral events unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    const businessId = (business as { id: string } | null)?.id;

    if (!businessId) {
      logger.warn("Referral events missing business", { userId: user.id });
      return NextResponse.json({ events: [] });
    }

    const { data, error } = await supabase
      .from("referral_events")
      .select(
        `id, event_type, source, device, created_at, metadata, referral_id,
         ambassador:ambassador_id (id, name, referral_code)`
      )
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      logger.error("Failed to fetch referral events", { error });
      return NextResponse.json({ error: "Unable to fetch events" }, { status: 500 });
    }

    logger.info("Referral events fetched", { count: data?.length ?? 0 });
    return NextResponse.json({ events: data ?? [] });
  } catch (error) {
    logger.error("Referral events API error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:referral-events:post");
  try {
    const body = await request.json();
    const { businessId, ambassadorId, referralId, eventType, source, device, metadata } = body;

    if (!businessId || !eventType) {
      logger.warn("Missing required fields", { businessId, eventType });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    await logReferralEvent({
      supabase,
      businessId,
      ambassadorId: ambassadorId || null,
      referralId: referralId || null,
      eventType: eventType as ReferralEventType,
      source: source || "referral_page",
      device: device || "unknown",
      metadata: metadata || null,
    });

    logger.info("Referral event logged", { businessId, eventType });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to log referral event", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
