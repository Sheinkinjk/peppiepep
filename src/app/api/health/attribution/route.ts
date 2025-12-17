import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await createServiceClient();
    const ADMIN_CODE = process.env.ADMIN_REFERRAL_CODE?.trim();

    if (!ADMIN_CODE) {
      return NextResponse.json({
        healthy: false,
        error: "ADMIN_REFERRAL_CODE environment variable not set",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Check if admin customer exists
    const { data: admin, error: adminError } = await supabase
      .from('customers')
      .select('id, referral_code, name, email')
      .eq('referral_code', ADMIN_CODE)
      .single();

    if (adminError || !admin) {
      return NextResponse.json({
        healthy: false,
        error: "Admin customer not found in database",
        adminCode: ADMIN_CODE,
        dbError: adminError?.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Check recent attribution success rate (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: recentApps, error: appsError } = await supabase
      .from('partner_applications')
      .select('id, created_at, email')
      .gte('created_at', sevenDaysAgo)
      .limit(100);

    const { data: attributedApps, error: refError } = await supabase
      .from('referrals')
      .select('id, created_at, referred_email')
      .eq('ambassador_id', admin.id)
      .gte('created_at', sevenDaysAgo);

    const recentAppCount = recentApps?.length || 0;
    const attributedAppCount = attributedApps?.length || 0;
    const attributionRate = recentAppCount > 0
      ? ((attributedAppCount / recentAppCount) * 100).toFixed(1)
      : "N/A";

    const status =
      recentAppCount === 0 ? 'no_data' :
      parseFloat(attributionRate as string) > 80 ? 'good' :
      parseFloat(attributionRate as string) > 50 ? 'warning' :
      'critical';

    // Check for recent link visits
    const { data: recentVisits } = await supabase
      .from('referral_events')
      .select('id, created_at')
      .eq('ambassador_id', admin.id)
      .eq('event_type', 'link_visit')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      healthy: true,
      status,
      admin: {
        code: ADMIN_CODE,
        customerId: admin.id,
        name: admin.name,
        email: admin.email
      },
      metrics: {
        last7Days: {
          totalApplications: recentAppCount,
          attributedApplications: attributedAppCount,
          attributionRate: attributionRate === "N/A" ? attributionRate : `${attributionRate}%`,
          linkVisits: recentVisits?.length || 0
        },
        conversionFunnel: {
          visits: recentVisits?.length || 0,
          applications: attributedAppCount,
          conversionRate: (recentVisits?.length || 0) > 0
            ? `${((attributedAppCount / (recentVisits?.length || 1)) * 100).toFixed(1)}%`
            : "N/A"
        }
      },
      recommendation:
        status === 'critical' ? 'Attribution rate is critically low. Check cookie configuration and test the referral flow.' :
        status === 'warning' ? 'Attribution rate is below optimal. Consider adding cookie fallback mechanisms.' :
        status === 'no_data' ? 'No recent applications to analyze. Share the referral link to start tracking.' :
        'Attribution system is working well!',
      timestamp: new Date().toISOString(),
      errors: {
        apps: appsError?.message,
        referrals: refError?.message
      }
    });
  } catch (error) {
    return NextResponse.json({
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
