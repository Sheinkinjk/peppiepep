import { NextRequest, NextResponse } from "next/server";
import { createBlueprintClient } from "@/lib/supabase-blueprint";

// Jarred visits: /api/blueprint-access/mark-delivered?token=CUSTOMER_TOKEN&key=ADMIN_KEY
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const key   = request.nextUrl.searchParams.get("key");

  const adminKey = process.env.BLUEPRINT_ADMIN_KEY?.trim();
  if (!adminKey || key?.trim() !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const supabase = createBlueprintClient();
    const { data, error } = await supabase
      .from("blueprint_purchases")
      .update({ status: "delivered" })
      .eq("access_token", token)
      .select("email, name")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Marked as delivered for ${data.name} (${data.email})`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
