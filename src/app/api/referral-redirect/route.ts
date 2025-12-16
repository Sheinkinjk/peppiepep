import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const ambassadorId = searchParams.get("ambassador_id");
  const businessId = searchParams.get("business_id");

  if (!code || !ambassadorId || !businessId) {
    return NextResponse.redirect(new URL("/our-referral-program", request.url));
  }

  // Log the visit event
  const supabase = await createServiceClient();
  const device = inferDeviceFromUserAgent(request.headers.get("user-agent"));
  const referrer = request.headers.get("referer");

  const sourceParam = searchParams.get("utm_source") ?? searchParams.get("source");
  const campaignParam = searchParams.get("utm_campaign");

  // Build metadata from query params
  const metadataQuery: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    metadataQuery[key] = value;
  });

  await logReferralEvent({
    supabase,
    businessId,
    ambassadorId,
    eventType: "link_visit",
    source: campaignParam ?? sourceParam ?? "direct",
    device,
    metadata: {
      referrer,
      query: metadataQuery,
      redirect_destination: "partner_program",
    },
  });

  // Create response with redirect
  const response = NextResponse.redirect(new URL("/our-referral-program", request.url));

  // Set attribution cookie (30-day window)
  const cookieData = {
    id: ambassadorId,
    code,
    business_id: businessId,
    timestamp: Date.now(),
    source: sourceParam ?? "direct",
  };

  response.cookies.set("ref_ambassador", JSON.stringify(cookieData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    // Set domain for subdomain support (e.g., www.referlabs.com.au)
    // Note: Only set domain in production, not in local development
    ...(process.env.NODE_ENV === "production" && {
      domain: ".referlabs.com.au"
    })
  });

  return response;
}
