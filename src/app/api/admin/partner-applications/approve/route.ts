import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { Resend } from "resend";
import { buildPremiumEmail } from "@/lib/premium-email";

type PartnerApplicationCustomer = {
  id: string;
  name: string | null;
  email: string | null;
  referral_code: string | null;
  discount_code: string | null;
  company: string | null;
  website: string | null;
};

type PartnerApplicationRecord = {
  id: string;
  customer_id: string | null;
  email: string | null;
  name?: string | null;
  company?: string | null;
  status: string | null;
  customer: PartnerApplicationCustomer | null;
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
      .select(`
        *,
        customer:customer_id (
          id,
          name,
          email,
          referral_code,
          discount_code,
          company,
          website
        )
      `)
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      console.error("Partner application not found:", fetchError);
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const appData = application as unknown as PartnerApplicationRecord;
    if (appData.status === "approved") {
      return NextResponse.json(
        { error: "Application already approved" },
        { status: 400 }
      );
    }

    if (!appData.customer_id) {
      return NextResponse.json(
        { error: "Application is missing a linked customer record" },
        { status: 500 },
      );
    }

    // Update application status to approved
    const { error: updateAppError } = await supabase
      .from("partner_applications")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: admin.id,
      })
      .eq("id", applicationId);

    if (updateAppError) {
      console.error("Failed to approve application:", updateAppError);
      return NextResponse.json(
        { error: "Failed to update application status" },
        { status: 500 }
      );
    }

    // Update customer status to "verified" (active ambassador)
    // No credits given - partners earn 25% recurring revenue only
    const { error: updateCustomerError } = await supabase
      .from("customers")
      .update({
        status: "verified",
      })
      .eq("id", appData.customer_id);

    if (updateCustomerError) {
      console.error("Failed to update customer status:", updateCustomerError);
    }

    // Generate referral URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";
    const customer = appData.customer;
    const referralLink = customer?.referral_code
      ? `${siteUrl}/r/${customer.referral_code}`
      : null;
    const ambassadorPortalLink = customer?.referral_code
      ? `${siteUrl}/r/referral?code=${customer.referral_code}`
      : null;

    // Send approval email to applicant
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@referlabs.com.au";

    if (appData.email && resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const bodyHtml = `
          <p style="margin:0 0 12px;">Hi ${appData.name || "there"},</p>
          <p style="margin:0 0 16px;color:#475569;line-height:1.6;">
            Congratulations! Your partner application has been approved. You can now start earning <strong>25% recurring revenue</strong> for every business you refer to Refer Labs.
          </p>
          <div style="margin:16px 0;padding:16px;border-radius:14px;background:#ecfdf5;border:1px solid #bbf7d0;color:#065f46;font-size:13px;">
            Earn 25% of every payment from businesses you refer, for the lifetime of their subscription.
          </div>
          ${
            referralLink
              ? `<div style="margin:16px 0;padding:16px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
                  <p style="margin:0 0 8px;font-weight:700;color:#0f172a;">Your unique referral link</p>
                  <div style="padding:10px;border-radius:10px;background:#ffffff;border:1px solid #cbd5e1;margin-bottom:8px;">
                    <a href="${referralLink}" style="color:#0abab5;font-weight:600;text-decoration:none;word-break:break-all;font-size:13px;">${referralLink}</a>
                  </div>
                  <p style="margin:0;font-size:12px;color:#475569;">Share this link with businesses. Every signup is tracked to you.</p>
                </div>`
              : ""
          }
          ${
            customer?.discount_code
              ? `<div style="margin:16px 0;padding:14px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">
                  <p style="margin:0 0 6px;font-weight:700;color:#9a3412;font-size:12px;">Referral discount code</p>
                  <p style="margin:0;font-size:18px;color:#7c2d12;font-weight:800;letter-spacing:1px;">${customer.discount_code}</p>
                  <p style="margin:6px 0 0;font-size:12px;color:#9a3412;">Give this to referrals to identify their account.</p>
                </div>`
              : ""
          }
          <div style="margin:16px 0;">
            <p style="margin:0 0 8px;font-weight:700;color:#0f172a;">How it works</p>
            <ol style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.7;">
              <li>Share your link with businesses in your network.</li>
              <li>They sign up and launch with Refer Labs.</li>
              <li>You receive monthly payouts for each active client.</li>
            </ol>
          </div>
          <div style="margin:16px 0;padding:14px;border-radius:12px;background:#fefce8;border:1px solid #fde047;">
            <p style="margin:0 0 8px;font-weight:700;color:#713f12;font-size:13px;">Commission structure</p>
            <ul style="margin:0;padding-left:18px;color:#854d0e;font-size:12px;line-height:1.6;">
              <li>25% recurring revenue per client</li>
              <li>Monthly payouts</li>
              <li>No cap on earnings</li>
            </ul>
          </div>
        `;
        const html = buildPremiumEmail({
          title: "Welcome to the Partner Program",
          subtitle: "You're officially a Refer Labs partner.",
          preheader: "Your partner application has been approved.",
          bodyHtml,
          cta: ambassadorPortalLink
            ? { label: "View your dashboard", url: ambassadorPortalLink }
            : { label: "Visit Refer Labs", url: siteUrl },
          footerNote: "Questions? Reply to this email and we’ll help you get started.",
          brandName: "Refer Labs",
          logoUrl: `${siteUrl}/logo.svg`,
        });
        await resend.emails.send({
          from: fromEmail,
          to: appData.email,
          subject: "🎉 You're Now a Refer Labs Partner!",
          html,
        });
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
        // Don't fail the approval if email fails
      }
    }

    // Send confirmation to admin
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromEmail,
          to: "jarred@referlabs.com.au",
          subject: `✅ Partner Approved: ${appData.name}`,
          html: `
          <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
            <div style="padding:24px;background:#10b981;color:white;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;font-size:24px;">Partner Application Approved</h1>
            </div>
            <div style="padding:24px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;">
              <p><strong>Partner:</strong> ${appData.name}</p>
              <p><strong>Email:</strong> ${appData.email}</p>
              <p><strong>Company:</strong> ${appData.company || "N/A"}</p>
              <p><strong>Referral Link:</strong> <a href="${referralLink}">${referralLink}</a></p>
              <p><strong>Commission:</strong> 25% recurring revenue on all referrals</p>
              <p><strong>Status:</strong> Now active - can start referring</p>
            </div>
          </div>
        `,
        });
      } catch (adminEmailError) {
        console.error("Failed to send admin confirmation:", adminEmailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Partner application approved successfully",
      referralLink,
      ambassadorPortalLink,
    });
  } catch (error) {
    console.error("Error approving partner application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
