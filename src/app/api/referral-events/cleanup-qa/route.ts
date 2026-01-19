import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";

/**
 * QA Cleanup API - ONLY deletes test/simulated events
 *
 * This endpoint is designed to be SAFE and only removes QA test data.
 * It uses multiple safeguards:
 * 1. Only targets events with source = "integration_qa"
 * 2. Only targets events where metadata contains qa_simulated = true
 * 3. Uses explicit ID-based deletion (no bulk delete without ID verification)
 *
 * REAL/LIVE data is NEVER affected because:
 * - Real referral events have source = "referral_link", "form_submit", etc.
 * - Real events don't have qa_simulated metadata
 */
export async function POST() {
  const logger = createApiLogger("api:referral-events:cleanup-qa");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      logger.warn("QA cleanup unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    const businessId = (business as { id: string } | null)?.id;
    if (!businessId) {
      return NextResponse.json({ deleted: 0 });
    }

    // SAFETY: Fetch only QA events with BOTH conditions:
    // 1. source MUST be "integration_qa" (set by our QA system only)
    // 2. metadata MUST contain qa_simulated: true (additional safety flag)
    const { data: qaEvents, error: qaFetchError } = await supabase
      .from("referral_events")
      .select("id, source, metadata")
      .eq("business_id", businessId)
      .eq("source", "integration_qa");

    if (qaFetchError) {
      logger.error("Failed to fetch QA events", { error: qaFetchError });
      return NextResponse.json({ error: "Failed to fetch QA events" }, { status: 500 });
    }

    if (!qaEvents || qaEvents.length === 0) {
      return NextResponse.json({ deleted: 0, message: "No QA test events found to delete" });
    }

    // SAFETY: Double-check each event has qa_simulated flag before deletion
    const safeToDelete = qaEvents.filter((event) => {
      const metadata = event.metadata as Record<string, unknown> | null;
      return (
        event.source === "integration_qa" &&
        metadata &&
        metadata.qa_simulated === true
      );
    });

    if (safeToDelete.length === 0) {
      return NextResponse.json({ deleted: 0, message: "No verified QA test events found" });
    }

    const ids = safeToDelete.map((event) => event.id);

    logger.info("Deleting QA test events", {
      businessId,
      count: ids.length,
      note: "Only deleting events with source=integration_qa AND metadata.qa_simulated=true"
    });

    const { error: deleteError } = await supabase
      .from("referral_events")
      .delete()
      .in("id", ids);

    if (deleteError) {
      logger.error("Failed to delete QA events", { error: deleteError });
      return NextResponse.json({ error: "Failed to delete QA events" }, { status: 500 });
    }

    return NextResponse.json({
      deleted: ids.length,
      message: `Successfully cleared ${ids.length} QA test event${ids.length === 1 ? '' : 's'}. Live data was not affected.`
    });
  } catch (error) {
    logger.error("QA cleanup error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
