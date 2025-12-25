import { NextResponse } from "next/server";
import { z } from "zod";

import { sendAdminNotification } from "@/lib/email-notifications";

export const runtime = "edge";

const bodySchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  businessName: z.string().min(1),
  website: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  idealClient: z.string().min(10),
  targetAudience: z.string().min(10),
  offer: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function field(label: string, value: string) {
  const safe = escapeHtml(value || "—");
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#0f172a;width:220px;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#0f172a;white-space:pre-wrap;">${safe}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete the required fields and try again." },
      { status: 400 },
    );
  }

  const { fullName, email, businessName, website, location, idealClient, targetAudience, offer, notes } =
    parsed.data;

  const submittedAt = new Date().toISOString();
  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:760px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#059669,#14b8a6);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">🧲 Lead Hacking</p>
        <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;">Automate a Lead Generating Tool</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">${escapeHtml(fullName)} · <a style="color:white;" href="mailto:${escapeHtml(
    email,
  )}">${escapeHtml(email)}</a></p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${field("Business", businessName)}
          ${field("Website", website)}
          ${field("Location served", location)}
          ${field("Current offer", offer)}
          ${field("Ideal client", idealClient)}
          ${field("Exactly who they want to reach", targetAudience)}
          ${field("Notes", notes)}
          ${field("Submitted at", submittedAt)}
        </table>
      </div>
    </div>
  `;

  try {
    const sendResult = await sendAdminNotification({
      subject: `🧲 Lead Hacking automation brief: ${businessName} (${email})`,
      html,
    });
    if (!sendResult.success) {
      console.error("Lead hacking automation brief email failed:", sendResult.error);
    }
  } catch (error) {
    console.error("Lead hacking automation brief notification failed:", error);
  }

  return NextResponse.json({ success: true });
}
