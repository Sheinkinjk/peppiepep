import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";
import { checkRateLimit } from "@/lib/rate-limit";

// SECURITY FIX: Add rate limiting and origin validation
export async function POST(request: NextRequest) {
  // SECURITY FIX: Rate limiting - prevent abuse (using general category)
  const rateLimitCheck = await checkRateLimit(request, "general");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    return rateLimitCheck.response;
  }

  // SECURITY FIX: Validate origin to prevent cross-site abuse
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "https://referlabs.com.au",
    "https://peppiepep.vercel.app",
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Unauthorized origin" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { eventType, ambassadorId, businessId, referralCode, metadata } = body;

    if (!eventType || !ambassadorId || !businessId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Validate UUID format to prevent injection
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(ambassadorId) || !uuidRegex.test(businessId)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();
    const device = inferDeviceFromUserAgent(request.headers.get("user-agent"));

    // Log the conversion event
    await logReferralEvent({
      supabase,
      businessId,
      ambassadorId,
      eventType: eventType as "schedule_call_clicked" | "contact_us_clicked",
      source: "website",
      device,
      metadata: {
        referral_code: referralCode,
        url: request.headers.get("referer"),
        ...metadata,
      },
    });

    // Check if we should create a referral record for high-intent events
    if (eventType === "schedule_call_clicked") {
      // Create a pending referral to track this lead
      const { error: referralError } = await supabase
        .from("referrals")
        .insert({
          business_id: businessId,
          ambassador_id: ambassadorId,
          referred_name: "Calendly Lead",
          referred_email: null,
          referred_phone: null,
          status: "pending",
          consent_given: false,
          locale: "en",
          metadata: {
            source: "schedule_call",
            referral_code: referralCode,
            event_type: eventType,
          },
        });

      if (referralError) {
        console.error("Failed to create referral record:", referralError);
      }
    }

    return NextResponse.json({
      success: true,
      eventType,
      tracked: true,
    });
  } catch (error) {
    console.error("Error tracking conversion:", error);
    return NextResponse.json(
      { error: "Failed to track conversion" },
      { status: 500 }
    );
  }
}
