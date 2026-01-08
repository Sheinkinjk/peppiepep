import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";

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

    const { data: qaEvents, error: qaFetchError } = await supabase
      .from("referral_events")
      .select("id")
      .eq("business_id", businessId)
      .eq("source", "integration_qa");

    if (qaFetchError) {
      logger.error("Failed to fetch QA events", { error: qaFetchError });
      return NextResponse.json({ error: "Failed to fetch QA events" }, { status: 500 });
    }

    if (!qaEvents || qaEvents.length === 0) {
      return NextResponse.json({ deleted: 0 });
    }

    const ids = qaEvents.map((event) => event.id);
    const { error: deleteError } = await supabase
      .from("referral_events")
      .delete()
      .in("id", ids);

    if (deleteError) {
      logger.error("Failed to delete QA events", { error: deleteError });
      return NextResponse.json({ error: "Failed to delete QA events" }, { status: 500 });
    }

    return NextResponse.json({ deleted: ids.length });
  } catch (error) {
    logger.error("QA cleanup error", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
