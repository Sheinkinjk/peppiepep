import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const ambassadorId = searchParams.get("ambassador_id");
  const businessId = searchParams.get("business_id");
  const destination = searchParams.get("destination"); // 'client' or 'partner' (default)

  if (!code || !ambassadorId || !businessId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const sourceParam = searchParams.get("utm_source") ?? searchParams.get("source");

  // Log the visit event (best-effort; cookie attribution should still work even if logging is disabled)
  const loggingDisabled = process.env.DISABLE_REFERRAL_EVENT_LOGGING === "1";
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (!loggingDisabled && hasSupabaseConfig) {
    try {
      const supabase = await createServiceClient();
      const device = inferDeviceFromUserAgent(request.headers.get("user-agent"));
      const referrer = request.headers.get("referer");
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
          redirect_destination: destination === "client" ? "client_acquisition" : "partner_program",
        },
      });
    } catch (error) {
      console.warn("Referral redirect event logging failed", error);
    }
  }

  // Create response with redirect based on destination
  const redirectPath = destination === "client" ? "/" : "/our-referral-program";
  const response = NextResponse.redirect(new URL(redirectPath, request.url));

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
    // Important: avoid hard-coding a domain (multi-tenant). Host-only cookies work as long as
    // the referral click and landing page share the same origin.
  });

  return response;
}
