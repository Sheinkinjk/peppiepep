import { NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ healthy: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, name")
      .eq("owner_id", user.id)
      .single();

    if (businessError || !business) {
      return NextResponse.json({
        healthy: false,
        error: "Business not found",
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // Check recent attribution success rate (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: recentEvents, error: eventsError } = await supabase
      .from("referral_events")
      .select("id, event_type, ambassador_id, created_at")
      .eq("business_id", business.id)
      .gte("created_at", sevenDaysAgo);

    const { data: recentReferrals, error: refError } = await supabase
      .from("referrals")
      .select("id, ambassador_id, created_at, status")
      .eq("business_id", business.id)
      .gte("created_at", sevenDaysAgo);

    const events = recentEvents ?? [];
    const referrals = recentReferrals ?? [];

    const linkVisitsTotal = events.filter((e) => e.event_type === "link_visit").length;
    const linkVisitsAttributed = events.filter(
      (e) => e.event_type === "link_visit" && e.ambassador_id,
    ).length;
    const signupsTotal = events.filter((e) => e.event_type === "signup_submitted").length;
    const signupsAttributed = events.filter(
      (e) => e.event_type === "signup_submitted" && e.ambassador_id,
    ).length;
    const conversionsTotal = events.filter((e) => e.event_type === "conversion_completed").length;
    const conversionsAttributed = events.filter(
      (e) => e.event_type === "conversion_completed" && e.ambassador_id,
    ).length;
    const referralTotal = referrals.length;
    const referralAttributed = referrals.filter((r) => r.ambassador_id).length;

    const baseTotal = signupsTotal || linkVisitsTotal || referralTotal;
    const baseAttributed =
      signupsTotal ? signupsAttributed : linkVisitsTotal ? linkVisitsAttributed : referralAttributed;
    const attributionRate = baseTotal > 0
      ? ((baseAttributed / baseTotal) * 100).toFixed(1)
      : "N/A";

    const status =
      baseTotal === 0 ? "no_data" :
      parseFloat(attributionRate as string) > 80 ? "good" :
      parseFloat(attributionRate as string) > 50 ? "warning" :
      "critical";

    const response = NextResponse.json({
      healthy: true,
      status,
      business: {
        id: business.id,
        name: business.name,
      },
      metrics: {
        last7Days: {
          linkVisits: linkVisitsTotal,
          linkVisitsAttributed,
          signups: signupsTotal,
          signupsAttributed,
          conversions: conversionsTotal,
          conversionsAttributed,
          referrals: referralTotal,
          referralsAttributed: referralAttributed,
          attributionRate: attributionRate === "N/A" ? attributionRate : `${attributionRate}%`,
        },
        conversionFunnel: {
          visits: linkVisitsTotal,
          signups: signupsTotal,
          conversions: conversionsTotal,
          conversionRate: linkVisitsTotal > 0
            ? `${((conversionsTotal / linkVisitsTotal) * 100).toFixed(1)}%`
            : "N/A",
        }
      },
      recommendation:
        status === "critical"
          ? "Attribution rate is critically low. Check referral landing setup and ensure attribution cookies are set."
          : status === "warning"
            ? "Attribution rate is below optimal. Validate UTMs and referral link usage."
            : status === "no_data"
              ? "No recent activity detected. Share a referral link to begin tracking."
              : "Attribution system is working well!",
      timestamp: new Date().toISOString(),
      errors: {
        events: eventsError?.message,
        referrals: refError?.message,
      }
    });
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return response;
  } catch (error) {
    return NextResponse.json({
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
