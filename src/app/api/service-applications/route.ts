import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";

const applicationSchema = z.object({
  company: z.string().min(1, "Company is required").max(200),
  contactName: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  goals: z.string().max(1000).optional().default(""),
  partnerTypes: z.string().max(1000).optional().default(""),
  rewardModel: z.string().max(500).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  sourcePage: z.string().max(200).optional().default(""),
});

function buildServiceApplicationEmail(data: {
  company: string;
  contactName: string;
  email: string;
  goals: string;
  partnerTypes: string;
  rewardModel: string;
  notes: string;
  sourcePage: string;
  submittedAt: string;
}): string {
  const safeCompany = escapeHtml(data.company);
  const safeContactName = escapeHtml(data.contactName);
  const safeEmail = escapeHtml(data.email);
  const safeGoals = escapeHtml(data.goals);
  const safePartnerTypes = escapeHtml(data.partnerTypes);
  const safeRewardModel = escapeHtml(data.rewardModel);
  const safeNotes = escapeHtml(data.notes);
  const safeSourcePage = escapeHtml(data.sourcePage);
  const formattedTime = new Date(data.submittedAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media (prefers-color-scheme: dark) {
          .email-container { background-color: #1a1a1a !important; }
          .email-card { background-color: #2d2d2d !important; border-color: #404040 !important; }
          .text-primary { color: #ffffff !important; }
          .text-secondary { color: #d1d5db !important; }
          .card-highlight { background-color: #374151 !important; border-color: #4b5563 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;" class="email-container">
      <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0;">New referral program application from ${safeCompany} (${safeContactName})</span>
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;box-shadow:0 4px 12px rgba(10,186,181,0.25);">
          <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:8px 16px;border-radius:999px;margin-bottom:16px;">
            <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;">🚀 New Application</p>
          </div>
          <h1 style="margin:0 0 8px 0;font-size:32px;font-weight:900;line-height:1.2;">${safeCompany}</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safeContactName} • ${safeEmail}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="email-card">
          <h2 style="margin-top:0;font-size:20px;font-weight:700;color:#0f172a;" class="text-primary">Application Details</h2>
          <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;border-left:4px solid #0abab5;" class="card-highlight">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Company</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeCompany}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Contact</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeContactName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Email</strong>
                  <a href="mailto:${safeEmail}" style="color:#0abab5;text-decoration:none;font-size:14px;">${safeEmail}</a>
                </td>
              </tr>
              ${safeGoals ? `
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Goals</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeGoals}</span>
                </td>
              </tr>
              ` : ""}
              ${safePartnerTypes ? `
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Ideal Partners</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safePartnerTypes}</span>
                </td>
              </tr>
              ` : ""}
              ${safeRewardModel ? `
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Reward Model</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeRewardModel}</span>
                </td>
              </tr>
              ` : ""}
              ${safeSourcePage ? `
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Source Page</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${safeSourcePage}</span>
                </td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding:8px 0;">
                  <strong style="color:#0f172a;display:block;margin-bottom:4px;font-size:13px;" class="text-primary">Submitted</strong>
                  <span style="font-size:14px;color:#475569;" class="text-secondary">${formattedTime}</span>
                </td>
              </tr>
            </table>
          </div>
          ${safeNotes ? `
          <div style="margin-top:20px;padding:20px;border-radius:16px;background:#fafafa;border:2px dashed #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.04);" class="card-highlight">
            <div style="margin-bottom:12px;">
              <span style="font-size:20px;margin-right:8px;">📝</span>
              <strong style="font-size:14px;color:#64748b;" class="text-muted">Additional Notes</strong>
            </div>
            <p style="margin:0;color:#0f172a;white-space:pre-wrap;line-height:1.6;font-size:14px;" class="text-primary">${safeNotes}</p>
          </div>
          ` : ""}
          <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #86efac;box-shadow:0 2px 8px rgba(134,239,172,0.2);">
            <div style="display:flex;align-items:center;margin-bottom:8px;">
              <span style="font-size:24px;margin-right:12px;">⚡</span>
              <strong style="font-size:16px;color:#065f46;">Hot Lead</strong>
            </div>
            <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">This prospect submitted an application for a referral program. Consider reaching out within 24 hours to maximize conversion.</p>
          </div>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;">
              Pepform Pty Ltd (trading as Refer Labs)<br>
              ABN: 32 660 008 159<br>
              <a href="https://referlabs.com.au" style="color:#0abab5;text-decoration:none;">referlabs.com.au</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
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

    // Store in database
    const supabase = await createServiceClient();
    const { error: dbError } = await supabase.from("service_applications").insert({
      company: data.company,
      contact_name: data.contactName,
      email: data.email,
      goals: data.goals || null,
      partner_types: data.partnerTypes || null,
      reward_model: data.rewardModel || null,
      notes: data.notes || null,
      source_page: data.sourcePage || null,
      status: "new",
    });

    if (dbError) {
      console.error("Failed to store service application:", dbError);
      // Continue to send email even if DB fails
    }

    // Send email notification
    const html = buildServiceApplicationEmail({
      company: data.company,
      contactName: data.contactName,
      email: data.email,
      goals: data.goals,
      partnerTypes: data.partnerTypes,
      rewardModel: data.rewardModel,
      notes: data.notes,
      sourcePage: data.sourcePage,
      submittedAt,
    });

    const notification = await sendAdminNotification({
      subject: `New Referral Program Application: ${data.company}`,
      html,
    });

    if (!notification.success) {
      console.error("Failed to send notification email:", notification.error);
      // Don't fail the request if email fails but DB succeeded
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET() {
  // Admin endpoint to list applications - requires service client
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("service_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch service applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
