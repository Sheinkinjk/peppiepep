import { NextRequest, NextResponse } from "next/server";
import { createBlueprintClient } from "@/lib/supabase-blueprint";
import { sendAdminNotification } from "@/lib/email-notifications";
import { scheduleNurtureSequence } from "@/lib/email-nurture";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const email   = body.email.toLowerCase().trim();
    const source  = (body.source || "homepage").substring(0, 100);
    const created = new Date().toISOString();

    const supabase = createBlueprintClient();

    // Insert into blueprint_leads — graceful upsert on duplicate email
    const { error } = await supabase
      .from("blueprint_leads")
      .upsert({ email, source, created_at: created }, { onConflict: "email" });

    if (error) {
      // Log but don't fail — still send the notification email so we capture the lead
      console.error("Blueprint lead insert failed:", error);
    }

    // Notify admin (fire-and-forget)
    sendAdminNotification({
      subject: `Lead capture: ${email}`,
      html: `<p>New lead from <strong>${source}</strong></p><p>Email: ${email}</p><p>Timestamp: ${created}</p>`,
    }).catch(() => {});

    // Schedule the 4-email nurture sequence (fire-and-forget — never block the response)
    scheduleNurtureSequence(email).then((r) => {
      if (r.errors.length) console.error("Nurture sequence errors:", r.errors);
      else console.log(`Scheduled ${r.scheduled} nurture emails for ${email}`);
    }).catch((err) => console.error("Nurture sequence failed:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
