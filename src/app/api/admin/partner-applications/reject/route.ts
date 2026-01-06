import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { Resend } from "resend";
import { buildPremiumEmail } from "@/lib/premium-email";

type PartnerApplicationLite = {
  id: string;
  status: string | null;
  name: string | null;
  email: string | null;
};

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
    const { applicationId, message, subject } = body as {
      applicationId?: string;
      message?: string;
      subject?: string;
    };

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

    const appData = application as unknown as PartnerApplicationLite;
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

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@referlabs.com.au";

    if (appData.email && resendApiKey && message) {
      try {
        const resend = new Resend(resendApiKey);
        const html = buildPremiumEmail({
          title: "Application update",
          subtitle: "Refer Labs Partner Program",
          preheader: "Update on your partner application.",
          bodyHtml: `
            <p style="margin:0 0 12px;">Hi ${appData.name || "there"},</p>
            <p style="margin:0;color:#475569;line-height:1.6;">${message}</p>
          `,
          footerNote: "Questions? Reply to this email and we’ll help.",
          brandName: "Refer Labs",
          logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/logo.svg`,
        });
        await resend.emails.send({
          from: fromEmail,
          to: appData.email,
          subject: subject || "Update on your partner application",
          html,
        });
      } catch (emailError) {
        console.error("Failed to send rejection email:", emailError);
      }
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
