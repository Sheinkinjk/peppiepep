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

    if (error || !data) {
      return NextResponse.json({ valid: false, error: "Token not found" }, { status: 404 });
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
    return NextResponse.json({ valid: false, error: msg }, { status: 500 });
  }
}
