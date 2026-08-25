import { NextRequest, NextResponse } from "next/server";
import { createBlueprintClient } from "@/lib/supabase-blueprint";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || token.length < 10) {
    return NextResponse.json({ valid: false, error: "Invalid token" }, { status: 400 });
  }

  try {
    const supabase = createBlueprintClient();
    const { data, error } = await supabase
      .from("blueprint_purchases")
      .select("id, name, email, industry, primary_goal, experience_level, purchased_at, status")
      .eq("access_token", token)
      .single();

    if (error) {
      // A missing row and an unreachable database both used to answer "Token not
      // found", which tells a paying customer their access is invalid when the
      // truth is that we cannot check. PGRST116 is "no rows"; anything else is
      // ours to fix, so say so and give them a person to contact.
      const noRow = error.code === "PGRST116";
      if (!noRow) {
        console.error("[blueprint-access] lookup failed:", error.message, error.code);
        return NextResponse.json(
          {
            valid: false,
            reason: "unavailable",
            error: "We could not check your access just now. This is our problem, not your link. Email jarred@referlabs.com.au and we will sort it out.",
          },
          { status: 503 },
        );
      }
      return NextResponse.json({ valid: false, reason: "not_found", error: "Token not found" }, { status: 404 });
    }
    if (!data) {
      return NextResponse.json({ valid: false, reason: "not_found", error: "Token not found" }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      name:            data.name,
      email:           data.email,
      industry:        data.industry,
      primaryGoal:     data.primary_goal,
      experienceLevel: data.experience_level,
      purchasedAt:     data.purchased_at,
      status:          data.status ?? "preparing",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error("[blueprint-access] verify threw:", msg);
    return NextResponse.json(
      {
        valid: false,
        reason: "unavailable",
        error: "We could not check your access just now. This is our problem, not your link. Email jarred@referlabs.com.au and we will sort it out.",
      },
      { status: 503 },
    );
  }
}
