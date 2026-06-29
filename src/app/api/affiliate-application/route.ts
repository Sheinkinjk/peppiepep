import { NextRequest, NextResponse } from "next/server";
import { createBlueprintClient } from "@/lib/supabase-blueprint";
import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body?.email || !body?.name || !body?.channel || !body?.why) {
      return NextResponse.json({ error: "Name, email, channel and reason are required" }, { status: 400 });
    }

    const data = {
      name:     String(body.name).substring(0, 100),
      email:    String(body.email).toLowerCase().trim(),
      channel:  String(body.channel).substring(0, 200),
      audience: String(body.audience || "").substring(0, 500),
      url:      String(body.url || "").substring(0, 300),
      why:      String(body.why).substring(0, 2000),
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Try to save to Supabase (table: affiliate_applications)
    try {
      const supabase = createBlueprintClient();
      await supabase.from("affiliate_applications").insert({
        ...data,
        status: "pending",
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Affiliate application DB insert failed:", err);
    }

    // Always send admin notification (so applications are never lost)
    sendAdminNotification({
      subject: `★ Affiliate application: ${data.name} (${data.channel})`,
      html: `
        <h2>New affiliate application</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p><strong>Channel:</strong> ${escapeHtml(data.channel)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(data.audience) || "Not provided"}</p>
        <p><strong>URL:</strong> ${data.url ? `<a href="${escapeHtml(data.url)}">${escapeHtml(data.url)}</a>` : "Not provided"}</p>
        <hr>
        <p><strong>Why they're a fit:</strong></p>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:8px;">${escapeHtml(data.why)}</p>
        <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Reply within 3 business days. If approved, set up tracking link via Rewardful (or send manual UTM link).</p>
      `,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
