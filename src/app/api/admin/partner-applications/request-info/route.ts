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

    if (!applicationId || !message) {
      return NextResponse.json(
        { error: "Missing applicationId or message" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();
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

    const appData = application as PartnerApplicationLite;
    if (!appData.email) {
      return NextResponse.json(
        { error: "Application is missing an email address" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@referlabs.com.au";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: fromEmail,
        to: appData.email,
        subject: subject || "Follow-up on your partner application",
        html: `
          <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
            <div style="padding:28px;border-radius:20px 20px 0 0;background:#0f172a;color:white;">
              <p style="margin:0;text-transform:uppercase;letter-spacing:0.22em;font-size:12px;">Refer Labs Partner Program</p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:800;">Quick follow-up needed</h1>
            </div>
            <div style="padding:24px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
              <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">Hi ${appData.name || "there"},</p>
              <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">${message}</p>
              <p style="margin:16px 0 0;font-size:13px;color:#475569;">
                Reply to this email with the details and we'll finalize your review.
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("Error requesting more info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
