import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { parseBusinessMetadata, type BusinessOnboardingMetadata } from "@/types/business";
import { sendTransactionalEmail } from "@/lib/transactional-email";
import { shouldSendOnce } from "@/lib/alert-bucket";

type BusinessNotificationContext = {
  businessId: string;
  businessName: string;
  ownerEmail: string;
  ownerId: string;
  onboardingMetadata: BusinessOnboardingMetadata | null;
};

function adminAlertEmails() {
  const raw = process.env.ADMIN_ALERT_EMAILS?.trim();
  if (raw) {
    const parts = raw.split(",").map((value) => value.trim()).filter(Boolean);
    if (parts.length > 0) return parts;
  }
  return ["jarred@referlabs.com.au"];
}

async function loadBusinessNotificationContext(
  supabase: SupabaseClient<Database>,
  businessId: string,
): Promise<BusinessNotificationContext | null> {
  const { data: business, error } = await supabase
    .from("businesses")
    .select("id, name, owner_id, onboarding_metadata")
    .eq("id", businessId)
    .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id" | "name" | "owner_id" | "onboarding_metadata">>();

  if (error || !business?.owner_id) return null;

  let ownerEmail: string | null = null;

  // Prefer current-session user when available (server component client / RLS context).
  try {
    const current = await supabase.auth.getUser();
    const sessionUser = current?.data?.user ?? null;
    if (sessionUser?.id === business.owner_id && sessionUser.email) {
      ownerEmail = sessionUser.email;
    }
  } catch {
    // ignore
  }

  // Fall back to admin lookup when running with service role.
  if (!ownerEmail) {
    try {
      const owner = await supabase.auth.admin.getUserById(business.owner_id);
      ownerEmail = owner?.data?.user?.email ?? null;
    } catch {
      ownerEmail = null;
    }
  }

  if (!ownerEmail) return null;

  return {
    businessId: business.id,
    businessName: business.name ?? "Your business",
    ownerEmail,
    ownerId: business.owner_id,
    onboardingMetadata: parseBusinessMetadata(business.onboarding_metadata) ?? null,
  };
}

async function persistNotificationStamp(
  supabase: SupabaseClient<Database>,
  businessId: string,
  nextMetadata: BusinessOnboardingMetadata,
) {
  await supabase
    .from("businesses")
    .update({ onboarding_metadata: nextMetadata })
    .eq("id", businessId);
}

function withNotificationStamp(
  existing: BusinessOnboardingMetadata | null,
  patch: Partial<NonNullable<BusinessOnboardingMetadata["notifications"]>>,
): BusinessOnboardingMetadata {
  const current = existing ?? {};
  return {
    ...current,
    notifications: {
      ...(current.notifications ?? {}),
      ...patch,
    },
  };
}

function buildOwnerEmailShell({ title, subtitle, bodyHtml }: { title: string; subtitle: string; bodyHtml: string }) {
  return `<!doctype html>
  <html>
    <body style="font-family:Inter,system-ui,-apple-system,sans-serif;background:#f5f5f5;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:28px;border:1px solid #e2e8f0;">
        <div style="padding:20px;border-radius:18px;background:linear-gradient(135deg,#0abab5,#24d9e2);color:#ffffff;">
          <div style="text-transform:uppercase;letter-spacing:0.28em;font-size:12px;font-weight:700;opacity:0.95;">Refer Labs</div>
          <div style="font-size:24px;font-weight:900;margin-top:10px;line-height:1.2;">${title}</div>
          <div style="margin-top:8px;font-size:14px;opacity:0.95;">${subtitle}</div>
        </div>
        <div style="margin-top:18px;color:#0f172a;font-size:14px;line-height:1.6;">
          ${bodyHtml}
        </div>
      </div>
      <div style="max-width:640px;margin:14px auto 0;color:#94a3b8;font-size:12px;text-align:center;">
        Sent by Refer Labs
      </div>
    </body>
  </html>`;
}

export async function maybeSendFirstReferralReceivedOwnerEmail({
  supabase,
  businessId,
}: {
  supabase: SupabaseClient<Database>;
  businessId: string;
}) {
  const ctx = await loadBusinessNotificationContext(supabase, businessId);
  if (!ctx) return;

  const alreadySentAt = ctx.onboardingMetadata?.notifications?.firstReferralReceivedAt ?? null;
  if (alreadySentAt) return;

  const { count } = await supabase
    .from("referrals")
    .select("id", { head: true, count: "exact" })
    .eq("business_id", businessId);

  if (typeof count !== "number" || count !== 1) return;

  const html = buildOwnerEmailShell({
    title: "First referral received",
    subtitle: `${ctx.businessName} just got its first referral submission.`,
    bodyHtml: `
      <p style="margin:0 0 12px;">This is the first signal that attribution + capture are working end-to-end.</p>
      <p style="margin:0;">Open your dashboard to confirm it’s attributed correctly and move it through to completion when the service is delivered.</p>
      <p style="margin:16px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/dashboard"
           style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700;">
          View dashboard
        </a>
      </p>
    `,
  });

  const sendResult = await sendTransactionalEmail({
    to: ctx.ownerEmail,
    subject: `First referral received — ${ctx.businessName}`,
    html,
  });

  if (sendResult.success) {
    const next = withNotificationStamp(ctx.onboardingMetadata, {
      firstReferralReceivedAt: new Date().toISOString(),
    });
    await persistNotificationStamp(supabase, businessId, next);
  }
}

export async function maybeSendFirstConversionCapturedOwnerEmail({
  supabase,
  businessId,
  sourceLabel,
}: {
  supabase: SupabaseClient<Database>;
  businessId: string;
  sourceLabel: string;
}) {
  const ctx = await loadBusinessNotificationContext(supabase, businessId);
  if (!ctx) return;

  const alreadySentAt = ctx.onboardingMetadata?.notifications?.firstConversionCapturedAt ?? null;
  if (alreadySentAt) return;

  const { count } = await supabase
    .from("referrals")
    .select("id", { head: true, count: "exact" })
    .eq("business_id", businessId)
    .eq("status", "completed");

  if (typeof count !== "number" || count !== 1) return;

  const html = buildOwnerEmailShell({
    title: "First conversion captured",
    subtitle: `${ctx.businessName} just logged its first completed referral.`,
    bodyHtml: `
      <p style="margin:0 0 12px;">Capture source: <strong>${sourceLabel}</strong></p>
      <p style="margin:0;">Your dashboards should now show revenue/ROI movement and the ambassador reward impact.</p>
      <p style="margin:16px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/dashboard"
           style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700;">
          View ROI
        </a>
      </p>
    `,
  });

  const sendResult = await sendTransactionalEmail({
    to: ctx.ownerEmail,
    subject: `First conversion captured — ${ctx.businessName}`,
    html,
  });

  if (sendResult.success) {
    const next = withNotificationStamp(ctx.onboardingMetadata, {
      firstConversionCapturedAt: new Date().toISOString(),
    });
    await persistNotificationStamp(supabase, businessId, next);
  }
}

export async function maybeSendGoLiveOwnerEmail({
  supabase,
  businessId,
}: {
  supabase: SupabaseClient<Database>;
  businessId: string;
}) {
  const ctx = await loadBusinessNotificationContext(supabase, businessId);
  if (!ctx) return;

  const alreadySentAt = ctx.onboardingMetadata?.notifications?.goLiveConfirmedAt ?? null;
  if (alreadySentAt) return;

  const qaStatus = ctx.onboardingMetadata?.integrationStatus?.qa ?? null;
  if (qaStatus !== "complete") return;

  const { count } = await supabase
    .from("referrals")
    .select("id", { head: true, count: "exact" })
    .eq("business_id", businessId)
    .eq("status", "completed");

  if (typeof count !== "number" || count < 1) return;

  const html = buildOwnerEmailShell({
    title: "You’re live",
    subtitle: "Go-live is confirmed — tracking + attribution are active.",
    bodyHtml: `
      <p style="margin:0 0 12px;">You marked Step 1C as complete and we’ve captured a successful conversion.</p>
      <ul style="margin:0;padding-left:18px;color:#334155;">
        <li>Link clicks & signups are being recorded</li>
        <li>Conversions are flowing into your dashboards in real time</li>
        <li>Ambassador rewards can be credited automatically</li>
      </ul>
      <p style="margin:16px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/go-live"
           style="display:inline-block;background:#0abab5;color:#0b1220;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:900;">
          Open go-live checklist
        </a>
      </p>
    `,
  });

  const sendResult = await sendTransactionalEmail({
    to: ctx.ownerEmail,
    subject: `You’re live — ${ctx.businessName}`,
    html,
  });

  if (sendResult.success) {
    const next = withNotificationStamp(ctx.onboardingMetadata, {
      goLiveConfirmedAt: new Date().toISOString(),
    });
    await persistNotificationStamp(supabase, businessId, next);
  }
}

export async function sendCampaignDeliveredSummaryOwnerEmail({
  supabase,
  campaignId,
  businessId,
}: {
  supabase: SupabaseClient<Database>;
  campaignId: string;
  businessId: string;
}) {
  const shouldSend = await shouldSendOnce({ key: `campaign_summary:${campaignId}`, ttlSeconds: 7 * 24 * 60 * 60 });
  if (!shouldSend) return;

  const ctx = await loadBusinessNotificationContext(supabase, businessId);
  if (!ctx) return;

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("name")
    .eq("id", campaignId)
    .single<{ name: string | null }>();

  const campaignName = campaign?.name ?? "Campaign";

  const countByStatus = async (status: string) => {
    const { count } = await supabase
      .from("campaign_messages")
      .select("id", { head: true, count: "exact" })
      .eq("campaign_id", campaignId)
      .eq("status", status);
    return typeof count === "number" ? count : 0;
  };

  const sentCount = await countByStatus("sent");
  const failedCount = await countByStatus("failed");
  const deliveredCount = await countByStatus("delivered");

  const { count: clickCount } = await supabase
    .from("referral_events")
    .select("id", { head: true, count: "exact" })
    .eq("business_id", businessId)
    .eq("event_type", "link_visit")
    .eq("source", campaignId);

  const clicks = typeof clickCount === "number" ? clickCount : 0;

  const { data: clickRows } = await supabase
    .from("referral_events")
    .select(
      `ambassador_id,
       ambassador:ambassador_id (id, name)`,
    )
    .eq("business_id", businessId)
    .eq("event_type", "link_visit")
    .eq("source", campaignId)
    .limit(2000);

  const topAmbassadors = new Map<string, { name: string; clicks: number }>();
  (clickRows ?? []).forEach((row) => {
    const typed = row as unknown as { ambassador_id: string | null; ambassador: { name: string | null } | null };
    if (!typed.ambassador_id) return;
    const name = typed.ambassador?.name ?? "Ambassador";
    const entry = topAmbassadors.get(typed.ambassador_id) ?? { name, clicks: 0 };
    entry.clicks += 1;
    topAmbassadors.set(typed.ambassador_id, entry);
  });

  const top = Array.from(topAmbassadors.values())
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 3);

  const topHtml = top.length
    ? `<p style="margin:14px 0 6px;font-weight:800;">Top click drivers</p>
       <ol style="margin:0;padding-left:18px;color:#334155;">
         ${top.map((t) => `<li>${t.name} — <strong>${t.clicks}</strong> clicks</li>`).join("")}
       </ol>`
    : "";

  const html = buildOwnerEmailShell({
    title: "Campaign delivery summary",
    subtitle: `${campaignName} — delivery results so far`,
    bodyHtml: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:0 0 12px;">
        <div style="padding:10px 12px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;"><strong>Sent</strong><div style="font-size:18px;font-weight:900;">${sentCount}</div></div>
        <div style="padding:10px 12px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;"><strong>Failed</strong><div style="font-size:18px;font-weight:900;">${failedCount}</div></div>
        <div style="padding:10px 12px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;"><strong>Delivered</strong><div style="font-size:18px;font-weight:900;">${deliveredCount}</div></div>
        <div style="padding:10px 12px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;"><strong>Clicks</strong><div style="font-size:18px;font-weight:900;">${clicks}</div></div>
      </div>
      <p style="margin:0;color:#475569;">Note: delivery updates continue streaming via webhooks (delivered counts may increase).</p>
      ${topHtml}
      <p style="margin:16px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/dashboard"
           style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700;">
          View campaign analytics
        </a>
      </p>
    `,
  });

  await sendTransactionalEmail({
    to: ctx.ownerEmail,
    subject: `Campaign summary — ${campaignName}`,
    html,
  });
}

export async function sendIntegrationHealthAlert({
  supabase,
  businessId,
  title,
  detail,
  includeAdmin,
}: {
  supabase: SupabaseClient<Database>;
  businessId: string;
  title: string;
  detail: string;
  includeAdmin: boolean;
}) {
  const ctx = await loadBusinessNotificationContext(supabase, businessId);
  if (!ctx) return;

  const html = buildOwnerEmailShell({
    title,
    subtitle: `${ctx.businessName} needs attention to keep attribution accurate.`,
    bodyHtml: `
      <p style="margin:0 0 12px;">${detail}</p>
      <p style="margin:0;">If this is unexpected, it usually means the capture secret, discount field name, or webhook auth token is mismatched.</p>
      <p style="margin:16px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au"}/dashboard"
           style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700;">
          Open integrations
        </a>
      </p>
    `,
  });

  await sendTransactionalEmail({
    to: includeAdmin ? [ctx.ownerEmail, ...adminAlertEmails()] : ctx.ownerEmail,
    subject: `${title} — ${ctx.businessName}`,
    html,
  });
}
