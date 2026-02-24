import { NextResponse } from "next/server";
import { z } from "zod";

import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { createApiLogger } from "@/lib/api-logger";

const logger = createApiLogger("api:application");

const applicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  website: z.string().max(300).optional().default(""),
  industry: z.string().min(1, "Industry is required").max(200),
  hqLocation: z.string().min(1, "Headquarters location is required").max(200),
  yearFounded: z.string().max(4).optional().default(""),
  annualRevenue: z.string().min(1, "Annual revenue is required").max(100),
  teamSize: z.string().min(1, "Team size is required").max(100),
  productDescription: z.string().min(1, "Product description is required").max(1500),
  targetCustomer: z.string().min(1, "Target customer is required").max(1000),
  currentMarkets: z.string().max(500).optional().default(""),
  targetRegions: z.array(z.string().max(100)).max(10).default([]),
  timeline: z.string().min(1, "Timeline is required").max(200),
  servicesInterested: z.array(z.string().max(200)).max(10).default([]),
  expansionGoals: z.string().min(1, "Expansion goals are required").max(1500),
  existingPresence: z.string().max(1000).optional().default(""),
  biggestChallenge: z.string().max(1000).optional().default(""),
  contactName: z.string().min(1, "Contact name is required").max(200),
  contactRole: z.string().min(1, "Contact role is required").max(200),
  contactEmail: z.string().email("Valid email is required").max(300),
  contactPhone: z.string().max(30).optional().default(""),
  howHeard: z.string().max(300).optional().default(""),
  additionalNotes: z.string().max(2000).optional().default(""),
});

function buildApplicationEmail(data: z.infer<typeof applicationSchema>, submittedAt: string): string {
  const s = (val: string | undefined) => escapeHtml(val || "");
  const formattedTime = new Date(submittedAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  const targetRegions = data.targetRegions.length > 0 ? data.targetRegions.map(s).join(", ") : "Not specified";
  const services = data.servicesInterested.length > 0 ? data.servicesInterested.map(s).join(", ") : "Not specified";

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:10px 0;vertical-align:top;"><strong style="color:#0f172a;display:block;margin-bottom:3px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">${label}</strong><span style="font-size:14px;color:#475569;line-height:1.6;">${value}</span></td></tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f7f8;">
  <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">New market entry application from ${s(data.companyName)} (${s(data.contactName)})</span>
  <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">

    <!-- Header -->
    <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#024b56,#0AA7B5);color:white;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">New Application</p>
      </div>
      <h1 style="margin:0 0 8px 0;font-size:28px;font-weight:900;line-height:1.2;">${s(data.companyName)}</h1>
      <p style="margin:0;font-size:15px;opacity:0.9;">${s(data.contactName)} &middot; ${s(data.contactRole)}</p>
      <p style="margin:4px 0 0 0;font-size:14px;opacity:0.8;">${s(data.contactEmail)}${data.contactPhone ? ` &middot; ${s(data.contactPhone)}` : ""}</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">

      <!-- Company Overview -->
      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">Company Overview</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("Industry", s(data.industry))}
          ${row("Headquarters", s(data.hqLocation))}
          ${row("Year Founded", s(data.yearFounded))}
          ${row("Website", data.website ? `<a href="${s(data.website)}" style="color:#0AA7B5;text-decoration:none;">${s(data.website)}</a>` : "Not provided")}
          ${row("Annual Revenue", s(data.annualRevenue))}
          ${row("Team Size", s(data.teamSize))}
        </table>
      </div>

      <!-- Product & Market -->
      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">Product & Market</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("What They Sell", s(data.productDescription))}
          ${row("Target Customer", s(data.targetCustomer))}
          ${row("Current Markets", s(data.currentMarkets) || "Not specified")}
        </table>
      </div>

      <!-- Expansion Goals -->
      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">Expansion Goals</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("Target Regions", targetRegions)}
          ${row("Timeline", s(data.timeline))}
          ${row("Services Interested", services)}
          ${row("Expansion Goals", s(data.expansionGoals))}
          ${row("Existing APAC Presence", s(data.existingPresence) || "None")}
          ${row("Biggest Challenge", s(data.biggestChallenge) || "Not specified")}
        </table>
      </div>

      <!-- Additional Info -->
      ${data.howHeard || data.additionalNotes ? `
      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">Additional Information</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("How They Found Us", s(data.howHeard) || "Not specified")}
          ${row("Additional Notes", s(data.additionalNotes))}
        </table>
      </div>
      ` : ""}

      <!-- Priority Indicator -->
      <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #86efac;">
        <div style="margin-bottom:8px;">
          <strong style="font-size:16px;color:#065f46;">Application Received</strong>
        </div>
        <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">Submitted on ${formattedTime} (AEST). Review the details above and reach out within 1-2 business days.</p>
      </div>

      <!-- Footer -->
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;font-size:12px;color:#64748b;">
          Pepform Pty Ltd (trading as Refer Labs)<br>
          ABN: 32 660 008 159<br>
          <a href="https://referlabs.com.au" style="color:#0AA7B5;text-decoration:none;">referlabs.com.au</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const result = applicationSchema.safeParse(payload);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] || "Invalid application data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;
    const submittedAt = new Date().toISOString();

    // Send email notification to admin
    const html = buildApplicationEmail(data, submittedAt);

    const notification = await sendAdminNotification({
      subject: `Market Entry Application: ${data.companyName} (${data.industry})`,
      html,
      to: "jarred@referlabs.com.au",
    });

    if (!notification.success) {
      logger.error("Failed to send application email", { error: notification.error });
      return NextResponse.json({ error: "Failed to send application. Please try again." }, { status: 500 });
    }

    logger.info("Application submitted successfully", {
      company: data.companyName,
      industry: data.industry,
      revenue: data.annualRevenue,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Application submission error", { error });
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
