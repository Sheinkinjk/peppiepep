import { NextResponse } from "next/server";
import { z } from "zod";

import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { createApiLogger } from "@/lib/api-logger";

const logger = createApiLogger("api:comparison-listing");

const listingSchema = z.object({
  contactName: z.string().min(1, "Name is required").max(200),
  businessName: z.string().min(1, "Business name is required").max(200),
  website: z.string().min(1, "Website is required").max(300),
  contactEmail: z.string().email("Valid email is required").max(300),
  category: z.enum(["Erectile Dysfunction", "Weight Loss", "Hair Loss", "Testosterone & Hormone Optimisation", "Supplements & Longevity"]),
  description: z.string().min(10, "Please provide a brief description").max(1500),
});

function buildListingEmail(data: z.infer<typeof listingSchema>, submittedAt: string): string {
  const s = (val: string) => escapeHtml(val);
  const formattedTime = new Date(submittedAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f7f8;">
  <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">New comparison platform listing enquiry from ${s(data.businessName)}</span>
  <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">

    <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#024b56,#0AA7B5);color:white;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">Comparison Platform</p>
      </div>
      <h1 style="margin:0 0 8px 0;font-size:28px;font-weight:900;line-height:1.2;">Listing Enquiry</h1>
      <p style="margin:0;font-size:15px;opacity:0.9;">${s(data.businessName)}</p>
      <p style="margin:4px 0 0 0;font-size:14px;opacity:0.8;">${s(data.contactName)} &middot; ${s(data.contactEmail)}</p>
    </div>

    <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">

      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">Business Details</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:10px 0;vertical-align:top;"><strong style="color:#0f172a;display:block;margin-bottom:3px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Business</strong><span style="font-size:14px;color:#475569;line-height:1.6;">${s(data.businessName)}</span></td></tr>
          <tr><td style="padding:10px 0;vertical-align:top;"><strong style="color:#0f172a;display:block;margin-bottom:3px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Category</strong><span style="font-size:14px;color:#475569;line-height:1.6;">${s(data.category)}</span></td></tr>
          <tr><td style="padding:10px 0;vertical-align:top;"><strong style="color:#0f172a;display:block;margin-bottom:3px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Website</strong><span style="font-size:14px;color:#475569;line-height:1.6;"><a href="${s(data.website)}" style="color:#0AA7B5;text-decoration:none;">${s(data.website)}</a></span></td></tr>
          <tr><td style="padding:10px 0;vertical-align:top;"><strong style="color:#0f172a;display:block;margin-bottom:3px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Contact</strong><span style="font-size:14px;color:#475569;line-height:1.6;">${s(data.contactName)} &middot; ${s(data.contactEmail)}</span></td></tr>
        </table>
      </div>

      <h2 style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#0f172a;border-bottom:2px solid #E3FAFF;padding-bottom:8px;">About the Business</h2>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px 0;border-left:4px solid #0AA7B5;">
        <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">${s(data.description)}</p>
      </div>

      <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #86efac;">
        <strong style="font-size:16px;color:#065f46;">Enquiry Received</strong>
        <p style="margin:8px 0 0 0;font-size:14px;color:#047857;line-height:1.6;">Submitted on ${formattedTime} (AEST). Follow up to assess for the platform shortlist.</p>
      </div>

      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;font-size:12px;color:#64748b;">
          Pepform Pty Ltd (trading as Refer Labs)<br>
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
    const result = listingSchema.safeParse(payload);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] || "Invalid submission";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;
    const submittedAt = new Date().toISOString();

    const html = buildListingEmail(data, submittedAt);

    const notification = await sendAdminNotification({
      subject: `Comparison Platform Enquiry: ${data.businessName} (${data.category})`,
      html,
      to: "jarred@referlabs.com.au",
    });

    if (!notification.success) {
      logger.error("Failed to send listing enquiry email", { error: notification.error });
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
    }

    logger.info("Comparison listing enquiry submitted", {
      business: data.businessName,
      category: data.category,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Comparison listing submission error", { error });
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
