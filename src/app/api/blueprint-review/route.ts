import { NextRequest, NextResponse } from "next/server";
import { createBlueprintClient } from "@/lib/supabase-blueprint";
import { sendAdminNotification } from "@/lib/email-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body?.email || !body?.review || !body?.rating) {
      return NextResponse.json({ error: "Email, rating, and review required" }, { status: 400 });
    }

    const email   = String(body.email).toLowerCase().trim();
    const name    = String(body.name || "").trim().substring(0, 100);
    const role    = String(body.role || "").trim().substring(0, 100);
    const rating  = Math.max(1, Math.min(5, parseInt(String(body.rating)) || 5));
    const review  = String(body.review).substring(0, 2000);
    const consent = Boolean(body.consent);

    const supabase = createBlueprintClient();
    const { error } = await supabase.from("blueprint_reviews").insert({
      email, name, role, rating, review, consent_to_publish: consent,
      created_at: new Date().toISOString(),
    });

    if (error) console.error("Review insert failed:", error);

    sendAdminNotification({
      subject: `★ New review from ${name || email} (${rating}/5)`,
      html: `
        <h2>${rating}/5 from ${name || email}</h2>
        ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Consent to publish:</strong> ${consent ? "Yes ✓" : "No"}</p>
        <hr>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:8px;">${review}</p>
      `,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
