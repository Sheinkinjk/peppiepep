import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { Resend } from "resend";
import { buildPremiumEmail } from "@/lib/premium-email";
import { createApiLogger } from "@/lib/api-logger";

const logger = createApiLogger("api:admin:partner-applications:request-info");

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
      logger.error("Partner application not found", { applicationId, error: fetchError });
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
      const html = buildPremiumEmail({
        title: "Quick follow-up needed",
        subtitle: "Refer Labs Partner Program",
        preheader: "We need a few more details to complete your review.",
        bodyHtml: `
          <p style="margin:0 0 12px;">Hi ${appData.name || "there"},</p>
          <p style="margin:0;color:#475569;line-height:1.6;">${message}</p>
          <p style="margin:16px 0 0;font-size:13px;color:#475569;">
            Reply to this email with the details and we’ll finalize your review.
          </p>
        `,
        footerNote: "Thanks for partnering with Refer Labs.",
        brandName: "Refer Labs",
        logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/logo.svg`,
      });
      await resend.emails.send({
        from: fromEmail,
        to: appData.email,
        subject: subject || "Follow-up on your partner application",
        html,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Request sent successfully",
    });
  } catch (error) {
    logger.error("Error requesting more info", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
