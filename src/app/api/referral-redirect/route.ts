import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";

function safeResolveRedirectTo(params: {
  requestUrl: URL;
  redirectTo: string;
  allowedOrigin: string | null;
}) {
  const raw = params.redirectTo.trim();
  if (!raw) return null;

  // Allow relative paths on the current origin.
  if (raw.startsWith("/")) {
    return new URL(raw, params.requestUrl.origin);
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }

  // Always allow same-origin redirects.
  if (parsed.origin === params.requestUrl.origin) {
    return parsed;
  }

  // Allow redirecting to the configured website origin (business website).
  if (params.allowedOrigin && parsed.origin === params.allowedOrigin) {
    return parsed;
  }

  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const ambassadorId = searchParams.get("ambassador_id");
  const businessId = searchParams.get("business_id");
  const destination = searchParams.get("destination"); // 'client' or 'partner' (default)
  const redirectTo = searchParams.get("redirect_to");

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
        source: sourceParam ?? "referral_link",
        device,
        metadata: {
          referrer,
          utm_source: sourceParam ?? "direct",
          utm_campaign: campaignParam ?? "direct",
          query: metadataQuery,
          redirect_destination:
            destination === "client" ? "client_acquisition" :
            destination === "linkedin-influencer" ? "linkedin_influencer_creator" :
            destination === "linkedin-business" ? "linkedin_influencer_business" :
            "partner_program",
        },
      });
    } catch (error) {
      console.warn("Referral redirect event logging failed", error);
    }
  }

  // Optional secure redirect_to support (used by External Partners links).
  let allowedOrigin: string | null = null;
  try {
    const supabase = await createServiceClient();
    const { data: biz } = await supabase
      .from("businesses")
      .select("onboarding_metadata")
      .eq("id", businessId)
      .maybeSingle<{ onboarding_metadata: any }>();
    const websiteUrl = biz?.onboarding_metadata?.websiteUrl;
    if (typeof websiteUrl === "string" && websiteUrl.trim()) {
      try {
        allowedOrigin = new URL(websiteUrl.trim()).origin;
      } catch {
        allowedOrigin = null;
      }
    }
  } catch {
    allowedOrigin = null;
  }

  const safeRedirect =
    redirectTo
      ? safeResolveRedirectTo({
          requestUrl: request.nextUrl,
          redirectTo,
          allowedOrigin,
        })
      : null;

  // Create response with redirect based on destination (default) or safe redirect_to.
  let redirectUrl: URL;
  if (safeRedirect) {
    redirectUrl = safeRedirect;

    // Preserve a small set of attribution parameters on the landing URL (useful for analytics + downstream tracking).
    // Never forward redirect_to itself.
    const passthroughKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "external_partner_id",
      "external_partner_link_id",
    ];
    for (const key of passthroughKeys) {
      const value = searchParams.get(key);
      if (!value) continue;
      if (!redirectUrl.searchParams.has(key)) {
        redirectUrl.searchParams.set(key, value);
      }
    }
  } else {
    let redirectPath = "/our-referral-program"; // default: partner program
    if (destination === "client") {
      redirectPath = "/referred";
    } else if (destination === "linkedin-influencer") {
      redirectPath = "/linkedin-growth/influencer";
    } else if (destination === "linkedin-business") {
      redirectPath = "/linkedin-growth/business";
    }
    redirectUrl = new URL(redirectPath, request.url);
  }

  const response = NextResponse.redirect(redirectUrl);

  // Set attribution cookie (30-day window)
  const cookieData = {
    id: ambassadorId,
    code,
    business_id: businessId,
    timestamp: Date.now(),
    source: sourceParam ?? "direct",
    utm_campaign: searchParams.get("utm_campaign") ?? null,
    external_partner_link_id: searchParams.get("external_partner_link_id") ?? null,
    external_partner_id: searchParams.get("external_partner_id") ?? null,
  };

  // SECURITY FIX: Use strict sameSite and always enforce secure in production
  response.cookies.set("ref_ambassador", JSON.stringify(cookieData), {
    httpOnly: true,
    secure: true, // Always enforce secure cookies
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    // Important: avoid hard-coding a domain (multi-tenant). Host-only cookies work as long as
    // the referral click and landing page share the same origin.
  });

  return response;
}
