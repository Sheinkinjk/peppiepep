import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { Resend } from "resend";

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

    const appData = application as any;
    if (appData.status === "approved") {
      return NextResponse.json(
        { error: "Application already approved" },
        { status: 400 }
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
    const customer = appData.customer as any;
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
        await resend.emails.send({
          from: fromEmail,
          to: appData.email,
          subject: "🎉 You're Now a Refer Labs Partner!",
          html: `
            <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
              <!-- Header -->
              <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;text-align:center;">
                <h1 style="margin:0 0 8px;font-size:32px;font-weight:800;">Welcome to the Partner Program! 🎉</h1>
                <p style="margin:0;font-size:18px;opacity:0.95;">You're officially a Refer Labs ambassador</p>
              </div>

              <!-- Body -->
              <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
                <p style="margin:0 0 16px;font-size:16px;color:#0f172a;">Hi ${appData.name || "there"},</p>

                <p style="margin:0 0 16px;font-size:16px;color:#475569;line-height:1.6;">
                  Congratulations! Your partner application has been approved. You can now start earning <strong>25% recurring revenue</strong> for every business you refer to Refer Labs.
                </p>

                <!-- Revenue Share Highlight -->
                <div style="margin:24px 0;padding:24px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #10b981;">
                  <div style="text-align:center;margin-bottom:16px;">
                    <div style="font-size:48px;font-weight:900;color:#047857;line-height:1;">25%</div>
                    <p style="margin:4px 0 0;font-size:16px;color:#065f46;font-weight:600;">Recurring Revenue</p>
                  </div>
                  <p style="margin:0;font-size:14px;color:#065f46;text-align:center;line-height:1.6;">
                    Earn 25% of every payment from businesses you refer, for the lifetime of their subscription. The more successful your referrals, the more you earn—month after month.
                  </p>
                </div>

                <!-- Referral Link -->
                ${referralLink ? `
                  <div style="margin:24px 0;padding:20px;border-radius:16px;background:#f8fafc;border:2px solid #cbd5e1;">
                    <p style="margin:0 0 12px;font-weight:700;color:#0f172a;font-size:16px;">🔗 Your Unique Referral Link</p>
                    <div style="padding:12px;border-radius:12px;background:white;border:1px solid #e2e8f0;margin-bottom:12px;">
                      <a href="${referralLink}" style="color:#0abab5;font-weight:600;text-decoration:none;word-break:break-all;">${referralLink}</a>
                    </div>
                    <p style="margin:0;font-size:14px;color:#64748b;">
                      Share this link with businesses. Every signup is automatically tracked to your account.
                    </p>
                  </div>
                ` : ''}

                <!-- Discount Code -->
                ${customer?.discount_code ? `
                  <div style="margin:24px 0;padding:16px;border-radius:12px;background:#fef3c7;border:1px solid #fbbf24;">
                    <p style="margin:0 0 8px;font-weight:600;color:#92400e;font-size:14px;">🏷️ Your Referral Discount Code</p>
                    <p style="margin:0;font-size:20px;color:#78350f;font-weight:800;letter-spacing:1px;">${customer.discount_code}</p>
                    <p style="margin:8px 0 0;font-size:12px;color:#92400e;">Give this to referrals to identify their account with you.</p>
                  </div>
                ` : ''}

                <!-- Ambassador Portal -->
                ${ambassadorPortalLink ? `
                  <div style="margin:24px 0;padding:20px;border-radius:16px;background:#ede9fe;border:2px solid #a78bfa;">
                    <p style="margin:0 0 12px;font-weight:700;color:#5b21b6;font-size:16px;">📊 Track Your Earnings</p>
                    <p style="margin:0 0 12px;font-size:14px;color:#6b21a8;">
                      Access your personal ambassador portal to see real-time referrals, earnings, and share tools.
                    </p>
                    <a href="${ambassadorPortalLink}" style="display:inline-block;padding:12px 24px;border-radius:12px;background:#8b5cf6;color:white;text-decoration:none;font-weight:600;font-size:14px;">
                      View Your Dashboard →
                    </a>
                  </div>
                ` : ''}

                <!-- How to Get Started -->
                <div style="margin:32px 0;">
                  <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;font-weight:800;">🚀 How to Get Started</h2>
                  <div style="margin-bottom:12px;padding-left:28px;position:relative;">
                    <div style="position:absolute;left:0;top:2px;width:20px;height:20px;border-radius:50%;background:#0abab5;color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">1</div>
                    <p style="margin:0;color:#475569;"><strong style="color:#0f172a;">Share Your Link:</strong> Send your referral link to businesses in your network</p>
                  </div>
                  <div style="margin-bottom:12px;padding-left:28px;position:relative;">
                    <div style="position:absolute;left:0;top:2px;width:20px;height:20px;border-radius:50%;background:#10b981;color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">2</div>
                    <p style="margin:0;color:#475569;"><strong style="color:#0f172a;">They Sign Up:</strong> When they subscribe, you start earning 25% monthly</p>
                  </div>
                  <div style="margin-bottom:12px;padding-left:28px;position:relative;">
                    <div style="position:absolute;left:0;top:2px;width:20px;height:20px;border-radius:50%;background:#8b5cf6;color:white;display:flex;align-items:center;justify-center;font-size:12px;font-weight:bold;">3</div>
                    <p style="margin:0;color:#475569;"><strong style="color:#0f172a;">Get Paid:</strong> Automatic monthly payouts for the lifetime of each client</p>
                  </div>
                </div>

                <!-- Commission Structure -->
                <div style="margin:24px 0;padding:20px;border-radius:16px;background:#fefce8;border:1px solid #fde047;">
                  <p style="margin:0 0 12px;font-weight:700;color:#713f12;font-size:16px;">💰 Your Commission Structure</p>
                  <ul style="margin:0;padding-left:20px;color:#854d0e;">
                    <li style="margin:8px 0;"><strong>25% recurring revenue</strong> - Lifetime of each client</li>
                    <li style="margin:8px 0;"><strong>$100-150/month per client</strong> - Based on their plan</li>
                    <li style="margin:8px 0;"><strong>No cap on earnings</strong> - Refer unlimited businesses</li>
                    <li style="margin:8px 0;"><strong>Monthly payouts</strong> - Direct deposit or account credit</li>
                  </ul>
                </div>

                <!-- Support -->
                <div style="margin:32px 0 0;padding-top:24px;border-top:1px solid #e2e8f0;">
                  <p style="margin:0 0 8px;font-size:14px;color:#475569;">Questions about the partner program?</p>
                  <p style="margin:0;font-size:14px;color:#475569;">
                    Reply to this email or reach out at <a href="mailto:jarred@referlabs.com.au" style="color:#0abab5;text-decoration:none;font-weight:600;">jarred@referlabs.com.au</a>
                  </p>
                </div>

                <!-- Footer -->
                <div style="margin:32px 0 0;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
                  <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#0f172a;">Let's grow together! 🚀</p>
                  <p style="margin:0;font-size:14px;color:#64748b;">The Refer Labs Team</p>
                </div>
              </div>
            </div>
          `,
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
