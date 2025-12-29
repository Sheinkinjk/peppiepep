import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, ambassadorId, businessId, referralCode, metadata } = body;

    if (!eventType || !ambassadorId || !businessId) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
