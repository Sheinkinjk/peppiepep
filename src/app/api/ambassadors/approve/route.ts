import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { Resend } from "resend";
import type { Database } from "@/types/supabase";
import { buildPremiumEmail } from "@/lib/premium-email";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];
type AmbassadorCustomer = Pick<
  CustomerRow,
  | "id"
  | "name"
  | "email"
  | "phone"
  | "referral_code"
  | "discount_code"
  | "status"
  | "company"
  | "website"
  | "instagram_handle"
  | "linkedin_handle"
  | "audience_profile"
>;

/**
 * Ambassador Approval API
 *
 * POST /api/ambassadors/approve
 *
 * Approves pending ambassadors and sends welcome emails
 * - Updates customer status from "pending" to "verified"
 * - Sends personalized welcome email with referral link and discount code
 * - Notifies business owner
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { customerIds } = body;

    if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid customerIds array" },
        { status: 400 }
      );
    }

    // Get business_id from user's businesses
    const { data: businesses, error: businessError } = await supabase
      .from("businesses")
      .select("id, name, owner_id")
      .eq("owner_id", user.id)
      .limit(1);

    if (businessError || !businesses || businesses.length === 0) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const business = businesses[0] as { id: string; name: string | null; owner_id: string };
    const businessId = business.id;
    const businessName = business.name || "Your Business";

    // Fetch customers to approve
    const { data: customers, error: fetchError } = await supabase
      .from("customers")
      .select("id, name, email, phone, referral_code, discount_code, status, company, website, instagram_handle, linkedin_handle, audience_profile")
      .eq("business_id", businessId)
      .in("id", customerIds)
      .eq("status", "pending");

    if (fetchError) {
      console.error("Error fetching customers:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch customers" },
        { status: 500 }
      );
    }

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { error: "No pending customers found to approve" },
        { status: 404 }
      );
    }

    const typedCustomers = customers as AmbassadorCustomer[];

    // Update all customers to verified status
    const { error: updateError } = await supabase
      .from("customers")
      .update({ status: "verified" })
      .in("id", customerIds)
      .eq("business_id", businessId);

    if (updateError) {
      console.error("Error updating customer status:", updateError);
      return NextResponse.json(
        { error: "Failed to update customer status" },
        { status: 500 }
      );
    }

    // Send welcome emails to approved ambassadors
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@referlabs.com.au";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";

    let emailsSent = 0;
    let emailsFailed = 0;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      for (const customer of typedCustomers) {
        if (!customer.email) {
          emailsFailed++;
          continue;
        }

        try {
          const referralLink = customer.referral_code
            ? `${siteUrl}/r/${customer.referral_code}`
            : null;

          const ambassadorPortalLink = customer.referral_code
            ? `${siteUrl}/r/referral?code=${customer.referral_code}`
            : null;

          await resend.emails.send({
            from: fromEmail,
            to: customer.email,
            subject: `🎉 Welcome to the ${businessName} Ambassador Program!`,
            html: buildAmbassadorWelcomeEmail({
              ambassadorName: customer.name || "Ambassador",
              businessName,
              referralLink,
              ambassadorPortalLink,
              discountCode: customer.discount_code,
              siteUrl,
            }),
          });

          emailsSent++;
        } catch (emailError) {
          console.error(`Failed to send email to ${customer.email}:`, emailError);
          emailsFailed++;
        }
      }
    }

    // Send notification to business owner
    if (resendApiKey && user.email) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject: `✅ ${customers.length} Ambassador${customers.length === 1 ? "" : "s"} Approved`,
          html: buildOwnerNotificationEmail({
            businessName,
            approvedCount: customers.length,
            ambassadorNames: typedCustomers.map((customer) => customer.name || customer.email || "Ambassador"),
            siteUrl,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send owner notification:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      approvedCount: customers.length,
      emailsSent,
      emailsFailed,
      message: `${customers.length} ambassador${customers.length === 1 ? "" : "s"} approved successfully`,
    });
  } catch (error) {
    console.error("Error approving ambassadors:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildAmbassadorWelcomeEmail({
  ambassadorName,
  businessName,
  referralLink,
  ambassadorPortalLink,
  discountCode,
  siteUrl,
}: {
  ambassadorName: string;
  businessName: string;
  referralLink: string | null;
  ambassadorPortalLink: string | null;
  discountCode: string | null;
  siteUrl: string;
}) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Hi ${ambassadorName},</p>
    <p style="margin:0 0 18px;color:#475569;">
      Great news! Your ambassador application has been approved. You can now start sharing ${businessName} with your network and earn rewards for every successful referral.
    </p>
    ${
      referralLink
        ? `<div style="margin:20px 0;padding:18px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;">
            <p style="margin:0 0 10px;font-weight:700;color:#0f172a;">Your unique referral link</p>
            <div style="padding:12px;border-radius:12px;background:#ffffff;border:1px solid #cbd5e1;margin-bottom:10px;">
              <a href="${referralLink}" style="color:#0abab5;font-weight:600;text-decoration:none;word-break:break-all;font-size:13px;">${referralLink}</a>
            </div>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">
              Share this link with your network. Every time someone signs up, you both benefit.
            </p>
          </div>`
        : ""
    }
    ${
      discountCode
        ? `<div style="margin:18px 0;padding:16px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">
            <p style="margin:0 0 8px;font-weight:700;color:#9a3412;">Your ambassador discount code</p>
            <p style="margin:0 0 8px;font-size:20px;color:#7c2d12;font-weight:800;letter-spacing:1.4px;font-family:monospace;">${discountCode}</p>
            <p style="margin:0;font-size:12px;color:#9a3412;line-height:1.5;">Share this code with your referrals during signup.</p>
          </div>`
        : ""
    }
    ${
      ambassadorPortalLink
        ? `<div style="margin:18px 0;padding:16px;border-radius:12px;background:#ecfeff;border:1px solid #a5f3fc;">
            <p style="margin:0 0 8px;font-weight:700;color:#0e7490;">Track your performance</p>
            <p style="margin:0 0 12px;font-size:13px;color:#0f172a;line-height:1.6;">
              Access your ambassador dashboard to view referrals, track earnings, and download sharing assets.
            </p>
            <a href="${ambassadorPortalLink}" style="display:inline-block;padding:10px 18px;border-radius:10px;background:#0abab5;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;">
              Open dashboard →
            </a>
          </div>`
        : ""
    }
    <div style="margin:18px 0 0;">
      <p style="margin:0 0 10px;font-weight:700;color:#0f172a;">How to get started</p>
      <ol style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.7;">
        <li>Share your link with friends, clients, and partners.</li>
        <li>They sign up using your link or discount code.</li>
        <li>Track rewards and performance in your dashboard.</li>
      </ol>
    </div>
    <div style="margin:18px 0 0;padding:14px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
      <p style="margin:0 0 6px;font-weight:700;color:#0f172a;font-size:13px;">Ambassador tips</p>
      <p style="margin:0;color:#475569;font-size:12px;line-height:1.6;">
        Share why you love ${businessName}, post on social, and keep your dashboard handy to celebrate wins.
      </p>
    </div>
  `;

  return buildPremiumEmail({
    title: `Welcome to ${businessName}!`,
    subtitle: "You're now an official ambassador.",
    preheader: "Your ambassador account is ready.",
    bodyHtml,
    cta: ambassadorPortalLink ? { label: "Open ambassador portal", url: ambassadorPortalLink } : null,
    footerNote: "Questions? Reply to this email and we’ll help you get started.",
    brandName: businessName,
    logoUrl: `${siteUrl}/logo.svg`,
  });
}

function buildOwnerNotificationEmail({
  businessName,
  approvedCount,
  ambassadorNames,
  siteUrl,
}: {
  businessName: string;
  approvedCount: number;
  ambassadorNames: string[];
  siteUrl: string;
}) {
  const bodyHtml = `
    <p style="margin:0 0 12px;">
      You've approved <strong>${approvedCount}</strong> new ambassador${approvedCount === 1 ? "" : "s"}:
    </p>
    <ul style="margin:0 0 16px;padding-left:18px;color:#475569;font-size:13px;line-height:1.6;">
      ${ambassadorNames
        .slice(0, 10)
        .map((name) => `<li style="margin:4px 0;">${name}</li>`)
        .join("")}
      ${
        ambassadorNames.length > 10
          ? `<li style="margin:4px 0;color:#94a3b8;">...and ${ambassadorNames.length - 10} more</li>`
          : ""
      }
    </ul>
    <p style="margin:0;color:#475569;font-size:13px;">
      Welcome emails were sent with unique referral links and discount codes.
    </p>
  `;

  return buildPremiumEmail({
    title: `Ambassador${approvedCount === 1 ? "" : "s"} approved`,
    subtitle: businessName,
    preheader: "New ambassadors have been approved.",
    bodyHtml,
    cta: { label: "View dashboard", url: `${siteUrl}/dashboard` },
    brandName: businessName,
    logoUrl: `${siteUrl}/logo.svg`,
  });
}
