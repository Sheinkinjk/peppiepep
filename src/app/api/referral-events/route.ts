import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";

export async function GET() {
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
      console.error("Failed to fetch referral events:", error);
      return NextResponse.json({ error: "Unable to fetch events" }, { status: 500 });
    }

    return NextResponse.json({ events: data ?? [] });
  } catch (error) {
    console.error("Referral events API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
