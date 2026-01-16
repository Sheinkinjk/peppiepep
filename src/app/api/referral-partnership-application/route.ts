import { NextResponse } from "next/server";
import { z } from "zod";

import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";

const applicationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  currentPlan: z.string().min(1),
  goals: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = applicationSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid application data" }, { status: 400 });
  }

  const data = result.data;
  const submittedAt = new Date().toISOString();
  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;color:#0f172a;">
      <h2>New Referral Partnerships Application</h2>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Role:</strong> ${escapeHtml(data.role)}</p>
      <p><strong>Current plan:</strong> ${escapeHtml(data.currentPlan)}</p>
      <p><strong>Goals:</strong> ${escapeHtml(data.goals)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
      ${data.message ? `<p><strong>Message:</strong> ${escapeHtml(data.message)}</p>` : ""}
    </div>
  `;

  const notification = await sendAdminNotification({
    subject: "New Referral Partnerships Application",
    html,
  });

  if (!notification.success) {
    return NextResponse.json({ error: notification.error ?? "Failed to send notification email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
