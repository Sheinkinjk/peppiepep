import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { parsePaginationParams, createPaginatedResponse, applyPagination } from "@/lib/pagination";
import { applyRateLimit, createAuditLog, getSecurityHeaders } from "@/lib/security";

type PartnerApplicationCustomerLite = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  website: string | null;
  referral_code: string | null;
  discount_code: string | null;
  status: string | null;
  credits: number | null;
};

type PartnerApplicationRecord = {
  id: string;
  customer_id: string | null;
  customer: PartnerApplicationCustomerLite | null;
};

type CommissionAmountRecord = { amount: number | null };

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await applyRateLimit("admin_api");
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
            "X-RateLimit-Reset": String(rateLimitResult.resetAt),
          }
        }
      );
    }

    // Check admin authentication
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const supabase = await createServiceClient();

    // Parse pagination params
    const { searchParams } = new URL(request.url);
    const { page, limit } = parsePaginationParams(searchParams);
    const statusParam = searchParams.get("status");
    const status = statusParam && ["pending", "approved", "rejected"].includes(statusParam)
      ? statusParam as "pending" | "approved" | "rejected"
      : null;

    // Get total count
    let countQuery = supabase
      .from("partner_applications")
      .select("*", { count: "exact", head: true });

    if (status) {
      countQuery = countQuery.eq("status", status);
    }

    const { count: total, error: countError } = await countQuery;

    if (countError) {
      console.error("Error counting applications:", countError);
      return NextResponse.json(
        { error: "Failed to count applications" },
        { status: 500 }
      );
    }

    // Get paginated partner applications with customer details
    let dataQuery = supabase
      .from("partner_applications")
      .select(`
        *,
        customer:customer_id (
          id,
          name,
          email,
          phone,
          company,
          website,
          referral_code,
          discount_code,
          status,
          credits
        )
      `)
      .order("created_at", { ascending: false });

    if (status) {
      dataQuery = dataQuery.eq("status", status);
    }

    // Apply pagination
    dataQuery = applyPagination(dataQuery, page, limit);

    const { data: applications, error } = await dataQuery;

    if (error) {
      console.error("Error fetching partner applications:", error);
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    // Get referral counts for each partner
    const applicationsWithStats = await Promise.all(
      (applications || []).map(async (app) => {
        const appData = app as unknown as PartnerApplicationRecord;
        if (!appData.customer_id) return { ...appData, referralCount: 0, totalEarnings: 0 };

        // Get referral count
        const { count: referralCount } = await supabase
          .from("referrals")
          .select("*", { count: "exact", head: true })
          .eq("ambassador_id", appData.customer_id);

        const { data: referralEvent } = await supabase
          .from("referral_events")
          .select("source, metadata, created_at")
          .eq("event_type", "signup_submitted")
          .or(
            `metadata->>referred_customer_id.eq.${appData.customer_id},metadata->>customer_id.eq.${appData.customer_id}`,
          )
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const referralSource = referralEvent?.source ?? null;
        const metadata = (referralEvent?.metadata ?? null) as Record<string, unknown> | null;
        const metadataUtm =
          metadata && typeof metadata.utm_campaign === "string"
            ? metadata.utm_campaign
            : metadata && typeof metadata.query === "object" && metadata.query
              ? (metadata.query as Record<string, unknown>).utm_campaign
              : null;

        // Get total earnings from commissions
        const { data: commissions } = await supabase
          .from("stripe_commissions")
          .select("amount")
          .eq("ambassador_id", appData.customer_id)
          .eq("status", "approved");

        const totalEarnings = ((commissions ?? []) as CommissionAmountRecord[]).reduce(
          (sum, commission) => sum + (commission.amount || 0),
          0,
        );

        return {
          ...appData,
          referralCount: referralCount || 0,
          totalEarnings: totalEarnings / 100, // Convert cents to dollars
          referralSource,
          referralUtmCampaign: typeof metadataUtm === "string" ? metadataUtm : null,
        };
      })
    );

    // Create audit log for data access
    await createAuditLog({
      action: "admin_action",
      userId: admin.id,
      metadata: {
        action: "view_partner_applications",
        page,
        limit,
        status,
        count: applicationsWithStats.length,
      },
    });

    // Return paginated response with security headers
    return NextResponse.json(
      createPaginatedResponse(
        applicationsWithStats,
        total || 0,
        page,
        limit
      ),
      {
        headers: {
          ...getSecurityHeaders(),
          "X-RateLimit-Limit": "100",
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Error in partner applications API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
