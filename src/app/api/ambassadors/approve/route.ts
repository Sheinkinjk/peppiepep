import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { Resend } from "resend";

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

      for (const customer of customers) {
        const custData = customer as any;
        if (!custData.email) {
          emailsFailed++;
          continue;
        }

        try {
          const referralLink = custData.referral_code
            ? `${siteUrl}/r/${custData.referral_code}`
            : null;

          const ambassadorPortalLink = custData.referral_code
            ? `${siteUrl}/r/referral?code=${custData.referral_code}`
            : null;

          await resend.emails.send({
            from: fromEmail,
            to: custData.email,
            subject: `🎉 Welcome to the ${businessName} Ambassador Program!`,
            html: buildAmbassadorWelcomeEmail({
              ambassadorName: custData.name || "Ambassador",
              businessName,
              referralLink,
              ambassadorPortalLink,
              discountCode: custData.discount_code,
              siteUrl,
            }),
          });

          emailsSent++;
        } catch (emailError) {
          console.error(`Failed to send email to ${custData.email}:`, emailError);
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
            ambassadorNames: customers.map((c: any) => c.name || c.email || "Ambassador"),
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
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f8fafc;">
        <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#0abab5,#24d9e2);border-radius:24px 24px 0 0;padding:40px 32px;text-align:center;color:#ffffff;">
            <div style="font-size:48px;margin-bottom:16px;">🎉</div>
            <h1 style="margin:0 0 12px;font-size:32px;font-weight:800;line-height:1.2;">Welcome to ${businessName}!</h1>
            <p style="margin:0;font-size:18px;opacity:0.95;">You're now an official ambassador</p>
          </div>

          <!-- Body -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;padding:40px 32px;">
            <p style="margin:0 0 24px;font-size:16px;color:#0f172a;line-height:1.6;">
              Hi ${ambassadorName},
            </p>

            <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:1.6;">
              Great news! Your ambassador application has been approved. You can now start sharing ${businessName} with your network and earn rewards for every successful referral.
            </p>

            ${referralLink ? `
              <!-- Referral Link -->
              <div style="margin:32px 0;padding:24px;border-radius:16px;background:linear-gradient(135deg,#f8fafc,#e7f5fe);border:2px solid #0abab5;">
                <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#0f172a;">🔗 Your Unique Referral Link</p>
                <div style="padding:16px;border-radius:12px;background:#ffffff;border:1px solid #cbd5e1;margin-bottom:16px;">
                  <a href="${referralLink}" style="color:#0abab5;font-weight:600;text-decoration:none;word-break:break-all;font-size:15px;">${referralLink}</a>
                </div>
                <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
                  Share this link with your network. Every time someone signs up using your link, you'll earn rewards and they'll get exclusive benefits.
                </p>
              </div>
            ` : ''}

            ${discountCode ? `
              <!-- Discount Code -->
              <div style="margin:32px 0;padding:20px;border-radius:12px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #fbbf24;">
                <p style="margin:0 0 12px;font-weight:600;color:#92400e;font-size:14px;">🏷️ Your Ambassador Discount Code</p>
                <p style="margin:0 0 12px;font-size:24px;color:#78350f;font-weight:800;letter-spacing:1.5px;font-family:monospace;">${discountCode}</p>
                <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                  Share this code with your referrals. They can use it during signup to identify themselves as your referral.
                </p>
              </div>
            ` : ''}

            ${ambassadorPortalLink ? `
              <!-- Ambassador Portal -->
              <div style="margin:32px 0;padding:24px;border-radius:16px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border:2px solid#a78bfa;">
                <p style="margin:0 0 12px;font-weight:700;color:#5b21b6;font-size:16px;">📊 Track Your Performance</p>
                <p style="margin:0 0 16px;font-size:14px;color:#6b21a8;line-height:1.6;">
                  Access your personal ambassador dashboard to view real-time referrals, track your earnings, and download sharing assets.
                </p>
                <a href="${ambassadorPortalLink}" style="display:inline-block;padding:14px 28px;border-radius:12px;background:#8b5cf6;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;">
                  View Dashboard →
                </a>
              </div>
            ` : ''}

            <!-- How It Works -->
            <div style="margin:40px 0 32px;">
              <h2 style="margin:0 0 20px;font-size:20px;color:#0f172a;font-weight:800;">🚀 How to Get Started</h2>

              <div style="margin-bottom:16px;padding-left:36px;position:relative;">
                <div style="position:absolute;left:0;top:2px;width:24px;height:24px;border-radius:50%;background:#0abab5;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">1</div>
                <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                  <strong style="color:#0f172a;">Share Your Link:</strong> Send your referral link to friends, family, and your social network
                </p>
              </div>

              <div style="margin-bottom:16px;padding-left:36px;position:relative;">
                <div style="position:absolute;left:0;top:2px;width:24px;height:24px;border-radius:50%;background:#10b981;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">2</div>
                <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                  <strong style="color:#0f172a;">They Sign Up:</strong> When they use your link or discount code, they're automatically connected to you
                </p>
              </div>

              <div style="margin-bottom:16px;padding-left:36px;position:relative;">
                <div style="position:absolute;left:0;top:2px;width:24px;height:24px;border-radius:50%;background:#8b5cf6;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">3</div>
                <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                  <strong style="color:#0f172a;">Earn Rewards:</strong> Track your referrals in the dashboard and receive your ambassador benefits
                </p>
              </div>
            </div>

            <!-- Best Practices -->
            <div style="margin:32px 0;padding:20px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
              <p style="margin:0 0 12px;font-weight:700;color:#0f172a;font-size:15px;">💡 Ambassador Tips</p>
              <ul style="margin:0;padding-left:20px;color:#475569;font-size:14px;line-height:1.7;">
                <li>Share why you personally love ${businessName}</li>
                <li>Post your referral link on social media stories and posts</li>
                <li>Email your link to people who would benefit from ${businessName}</li>
                <li>Check your dashboard regularly to see your progress</li>
              </ul>
            </div>

            <!-- Support -->
            <div style="margin:40px 0 0;padding-top:24px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-size:14px;color:#475569;">Questions about the ambassador program?</p>
              <p style="margin:0;font-size:14px;color:#475569;">
                Reply to this email and we'll be happy to help you get started.
              </p>
            </div>

            <!-- Footer -->
            <div style="margin:32px 0 0;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 12px;font-size:18px;font-weight:700;color:#0f172a;">Welcome aboard! 🎊</p>
              <p style="margin:0;font-size:14px;color:#64748b;">The ${businessName} Team</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top:24px;text-align:center;color:#94a3b8;font-size:12px;">
            <p style="margin:0;">Powered by <a href="${siteUrl}" style="color:#0abab5;text-decoration:none;">Refer Labs</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
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
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:system-ui,-apple-system,sans-serif;margin:0;padding:20px;background:#f5f5f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <div style="padding:24px;background:#10b981;color:#ffffff;">
            <h1 style="margin:0;font-size:24px;font-weight:800;">Ambassador${approvedCount === 1 ? "" : "s"} Approved</h1>
            <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">${businessName}</p>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 16px;color:#0f172a;font-size:15px;">
              You've approved <strong>${approvedCount}</strong> new ambassador${approvedCount === 1 ? "" : "s"}:
            </p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#475569;">
              ${ambassadorNames.slice(0, 10).map(name => `<li style="margin:4px 0;">${name}</li>`).join("")}
              ${ambassadorNames.length > 10 ? `<li style="margin:4px 0;color:#94a3b8;">...and ${ambassadorNames.length - 10} more</li>` : ""}
            </ul>
            <p style="margin:0 0 20px;color:#475569;font-size:14px;">
              Welcome emails have been sent to all approved ambassadors with their unique referral links and discount codes.
            </p>
            <p style="margin:20px 0 0;">
              <a href="${siteUrl}/dashboard" style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                View Dashboard
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
