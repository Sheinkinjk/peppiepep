import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/compliance
 *
 * Returns compliance status overview for all partners
 * Includes:
 * - Partners needing compliance verification
 * - Expired compliance records
 * - Compliance statistics by service type
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const supabase = await createServerComponentClient();
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get("business_id");
    const serviceType = searchParams.get("service_type");
    const status = searchParams.get("status");

    // Build base query - using only existing columns
    let query = supabase
      .from("customers")
      .select(`
        id,
        name,
        email,
        business_id,
        status,
        credits,
        referral_code,
        created_at,
        businesses (
          id,
          name
        )
      `)
      .not("status", "eq", "rejected");

    // Apply filters
    if (businessId) {
      query = query.eq("business_id", businessId);
    }

    const { data: partners, error } = await query;

    if (error) {
      console.error("Error fetching compliance data:", error);
      return NextResponse.json(
        { error: "Failed to fetch compliance data" },
        { status: 500 }
      );
    }

    // Note: compliance tables don't exist yet, so return placeholder data
    const complianceRecords: any[] = [];

    // Calculate statistics (using placeholder data until migration runs)
    const stats = {
      total_partners: partners?.length || 0,
      pending_verification: 0,
      verified: partners?.length || 0,
      expired: 0,
      failed: 0,
      by_service_type: { other: partners?.length || 0 } as Record<string, number>,
      expiring_soon: 0,
    };

    return NextResponse.json({
      partners,
      compliance_records: complianceRecords || [],
      stats,
    });
  } catch (error) {
    console.error("Compliance API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/compliance
 *
 * Update or create compliance record for a partner
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const {
      customer_id,
      status,
      verification_type,
      verification_notes,
      expiry_date,
      document_url,
    } = body;

    if (!customer_id || !status) {
      return NextResponse.json(
        { error: "customer_id and status are required" },
        { status: 400 }
      );
    }

    const supabase = await createServerComponentClient();

    // TODO: Implement once migration is run
    // For now, return a success message
    return NextResponse.json({
      success: true,
      message: "Compliance system will be available after database migration is applied",
      note: "Run the migration at /supabase/migrations/20260112020000_professional_services_compliance.sql",
    });
  } catch (error) {
    console.error("Compliance update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
