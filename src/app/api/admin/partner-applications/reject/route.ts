import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Missing applicationId" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Get the application details
    const { data: application, error: fetchError } = await supabase
      .from("partner_applications")
      .select("id, status, name, email")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      console.error("Partner application not found:", fetchError);
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const appData = application as any;
    if (appData.status === "rejected") {
      return NextResponse.json(
        { error: "Application already rejected" },
        { status: 400 }
      );
    }

    // Update application status to rejected
    const { error: updateError } = await supabase
      .from("partner_applications")
      .update({
        status: "rejected",
        approved_at: new Date().toISOString(), // Track when rejected
        approved_by: admin.id, // Track who rejected
      })
      .eq("id", applicationId);

    if (updateError) {
      console.error("Failed to reject application:", updateError);
      return NextResponse.json(
        { error: "Failed to update application status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner application rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting partner application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
