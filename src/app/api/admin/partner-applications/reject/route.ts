import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { Resend } from "resend";

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
        await resend.emails.send({
          from: fromEmail,
          to: appData.email,
          subject: subject || "Update on your partner application",
          html: `
            <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
              <div style="padding:28px;border-radius:20px 20px 0 0;background:#0f172a;color:white;">
                <p style="margin:0;text-transform:uppercase;letter-spacing:0.22em;font-size:12px;">Refer Labs Partner Program</p>
                <h1 style="margin:10px 0 0;font-size:22px;font-weight:800;">Application update</h1>
              </div>
              <div style="padding:24px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
                <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">Hi ${appData.name || "there"},</p>
                <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">${message}</p>
              </div>
            </div>
          `,
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
