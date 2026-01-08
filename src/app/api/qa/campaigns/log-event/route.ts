import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { logReferralEvent, type ReferralEventType } from "@/lib/referral-events";

export async function POST(request: Request) {
  const logger = createApiLogger("api:qa:campaigns:log-event");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    const businessId = (business as { id: string } | null)?.id;
    if (!businessId) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const eventType = body?.eventType as ReferralEventType | undefined;
    const label = typeof body?.label === "string" ? body.label : "QA event";
    const campaignId = typeof body?.campaignId === "string" ? body.campaignId : null;

    if (!eventType) {
      return NextResponse.json({ error: "Missing eventType" }, { status: 400 });
    }

    await logReferralEvent({
      supabase,
      businessId,
      ambassadorId: null,
      eventType,
      source: "campaign_qa",
      device: "dashboard",
      metadata: {
        qa_simulated: true,
        qa_label: label,
        qa_step: "3",
        campaign_id: campaignId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to log campaign QA event", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
