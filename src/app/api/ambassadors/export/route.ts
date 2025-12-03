import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { verifyAmbassadorToken } from "@/lib/ambassador-auth";
import { checkRateLimitForIdentifier } from "@/lib/rate-limit";

async function handleExport(code: string | null, token: string | null) {
  if (!code) {
    return NextResponse.json({ error: "referral code is required" }, { status: 400 });
  }

  const tokenCheck = verifyAmbassadorToken(token, code);
  if (!tokenCheck.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = await checkRateLimitForIdentifier(code, "ambassadorCode");
  if (!rateLimit.success && rateLimit.response) {
    return rateLimit.response;
  }

  const supabase = await createServiceClient();
  const { data: ambassador, error } = await supabase
    .from("customers")
    .select("id, name, email, phone, referral_code, credits, business:business_id (name)")
    .eq("referral_code", code)
    .single();

  if (error || !ambassador) {
    return NextResponse.json({ error: "Ambassador not found" }, { status: 404 });
  }

  const ambassadorRow = ambassador as Database["public"]["Tables"]["customers"]["Row"];

  const { data: referrals, error: referralsError } = await supabase
    .from("referrals")
    .select("id, referred_name, referred_email, referred_phone, status, created_at, rewarded_at, consent_given, locale")
    .eq("ambassador_id", ambassadorRow.id)
    .order("created_at", { ascending: false });

  if (referralsError) {
    return NextResponse.json({ error: "Failed to load referrals" }, { status: 500 });
  }

  return NextResponse.json({ ambassador, referrals: referrals ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code : null;
    const token = typeof body.token === "string" ? body.token : null;
    return handleExport(code, token);
  } catch (error) {
    console.error("Ambassador export error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    return handleExport(searchParams.get("code"), searchParams.get("token"));
  } catch (error) {
    console.error("Ambassador export error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
