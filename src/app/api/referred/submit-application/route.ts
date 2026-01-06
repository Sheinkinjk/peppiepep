import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logReferralEvent, inferDeviceFromUserAgent } from "@/lib/referral-events";
import { Resend } from "resend";
import { buildPremiumEmail } from "@/lib/premium-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      // Business Information
      businessName,
      industry,
      website,
      monthlyRevenue,
      teamSize,

      // Contact Information
      fullName,
      email,
      phone,
      role,

      // Additional Context
      referralSource,
      goals,

      // Attribution
      ambassadorId,
      businessId,
      referralCode,
    } = body;

    // SECURITY FIX: Validate required fields with length limits
    if (!businessName || !industry || !fullName || !email || !phone || !role || !goals) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Enforce input length limits to prevent DoS
    if (
      businessName.length > 200 ||
      industry.length > 100 ||
      fullName.length > 200 ||
      email.length > 320 ||
      phone.length > 50 ||
      role.length > 100 ||
      goals.length > 1000 ||
      (website && website.length > 500)
    ) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Check for disposable email domains
    const disposableDomains = [
      "tempmail.com",
      "guerrillamail.com",
      "10minutemail.com",
      "throwaway.email",
      "mailinator.com",
    ];
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Please use a business email address" },
        { status: 400 }
      );
    }

    if (!ambassadorId || !businessId || !referralCode) {
      return NextResponse.json(
        { error: "Missing attribution data" },
        { status: 400 }
      );
    }

    // SECURITY FIX: Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(ambassadorId) || !uuidRegex.test(businessId)) {
      return NextResponse.json(
        { error: "Invalid attribution data format" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();
    const device = inferDeviceFromUserAgent(request.headers.get("user-agent"));

    console.log("📝 Creating referral record with:", {
      business_id: businessId,
      ambassador_id: ambassadorId,
      referred_name: fullName,
      referred_email: email,
    });

    // Create a referral record for this application
    // Note: metadata is NOT a column in referrals table - we store extra data in referral_events
    const { data: referralData, error: referralError } = await supabase
      .from("referrals")
      .insert({
        business_id: businessId,
        ambassador_id: ambassadorId, // Correct column name
        referred_name: fullName,
        referred_email: email,
        referred_phone: phone,
        status: "pending",
        consent_given: true,
        locale: "en",
      })
      .select()
      .single();

    if (referralError) {
      console.error("❌ Failed to create referral record:", referralError);
      console.error("Error details:", JSON.stringify(referralError, null, 2));
      return NextResponse.json(
        {
          error: "Failed to create referral record",
          details: referralError.message || "Database error",
          code: referralError.code
        },
        { status: 500 }
      );
    }

    console.log("✅ Referral record created:", referralData?.id);

    // Log the application submission event with full details in metadata
    await logReferralEvent({
      supabase,
      businessId,
      ambassadorId,
      referralId: referralData?.id || null,
      eventType: "signup_submitted",
      source: "referred_application_form",
      device,
      metadata: {
        referral_code: referralCode,
        business_name: businessName,
        industry,
        website,
        monthly_revenue: monthlyRevenue,
        team_size: teamSize,
        role,
        goals,
        referral_source: referralSource,
        application_type: "business_application",
      },
    });

    // Send notification email to admin
    console.log("📧 Sending admin notification email to jarred@referlabs.com.au...");
    try {
      await resend.emails.send({
        from: "Refer Labs <noreply@referlabs.com.au>",
        to: ["jarred@referlabs.com.au"],
        subject: `🎯 New Referred Application: ${businessName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 900;">
        🎯 New Referred Application
      </h1>
      <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
        A new business wants to join Refer Labs!
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">

      <!-- Attribution Info -->
      <div style="background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); border-left: 4px solid #14b8a6; padding: 16px; margin-bottom: 24px; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f766e;">
          📊 Attribution
        </p>
        <p style="margin: 4px 0 0; font-size: 13px; color: #0e7490;">
          Referral Code: <strong style="font-family: monospace;">${referralCode}</strong>
        </p>
        <p style="margin: 4px 0 0; font-size: 13px; color: #0e7490;">
          Ambassador ID: <code style="background: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${ambassadorId}</code>
        </p>
      </div>

      <!-- Business Information -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #0f172a;">
          🏢 Business Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 40%;">Business Name</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Industry</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${industry}</td>
          </tr>
          ${website ? `
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Website</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="${website}" style="color: #0891b2; text-decoration: none;">${website}</a>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Monthly Revenue</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${monthlyRevenue}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Team Size</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${teamSize}</td>
          </tr>
        </table>
      </div>

      <!-- Contact Information -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #0f172a;">
          👤 Contact Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 40%;">Name</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Email</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Phone</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="tel:${phone}" style="color: #0891b2; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Role</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${role}</td>
          </tr>
        </table>
      </div>

      <!-- Goals -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 700; color: #0f172a;">
          🎯 Their Goals
        </h2>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 14px; color: #475569; white-space: pre-wrap;">${goals}</p>
        </div>
      </div>

      ${referralSource ? `
      <div style="margin-bottom: 24px;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          <strong>Referral Source:</strong> ${referralSource}
        </p>
      </div>
      ` : ''}

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 32px;">
        <a href="https://referlabs.com.au/dashboard/admin-master"
           style="display: inline-block; background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(20, 184, 166, 0.3);">
          View in Admin Dashboard →
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">
        Referral ID: ${referralData?.id || 'N/A'}
      </p>
      <p style="margin: 8px 0 0; font-size: 12px; color: #94a3b8;">
        This notification was sent from Refer Labs
      </p>
    </div>

  </div>
</body>
</html>
        `,
      });
      console.log("✅ Admin notification email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send admin notification email:", emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to applicant
    console.log(`📧 Sending confirmation email to ${email}...`);
    try {
      const applicantHtml = buildPremiumEmail({
        title: "Application received",
        subtitle: "Thanks for your interest in Refer Labs.",
        preheader: "We received your application and will be in touch shortly.",
        bodyHtml: `
          <p style="margin:0 0 12px;">Hi ${fullName},</p>
          <p style="margin:0 0 16px;color:#475569;">
            We've received your application and our team is excited to review it.
          </p>
          <div style="margin:16px 0;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
            <p style="margin:0 0 8px;font-weight:700;color:#0f172a;">What happens next</p>
            <ul style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.7;">
              <li>We review your business details and growth goals.</li>
              <li>A specialist reaches out within 24 hours to schedule a strategy call.</li>
              <li>We prepare a custom referral program plan for ${businessName}.</li>
            </ul>
          </div>
          <p style="margin:16px 0 0;color:#475569;font-size:13px;">
            Prefer to lock in time now? You can schedule a call immediately.
          </p>
        `,
        cta: {
          label: "Book a call",
          url: "https://calendly.com/jarred-referlabs/30min?month=2026-01",
        },
        footerNote: "Questions? Reply to this email and we’ll assist.",
        brandName: "Refer Labs",
        logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/logo.svg`,
      });
      await resend.emails.send({
        from: "Refer Labs <noreply@referlabs.com.au>",
        to: [email],
        subject: "Application Received - Refer Labs",
        html: applicantHtml,
      });
      console.log("✅ Confirmation email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    console.log("🎉 Application submission completed successfully!");
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      referralId: referralData?.id,
    });
  } catch (error) {
    console.error("❌ Critical error submitting application:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
