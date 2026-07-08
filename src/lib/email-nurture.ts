/**
 * Email nurture sequence for blueprint leads.
 * Triggered when someone fills the homepage lead capture form.
 *
 * Sends 4 scheduled emails via Resend:
 *   Day 0  (instant): Welcome + free affiliate program preview
 *   Day 2  (~48h):    "The biggest mistake new affiliate marketers make"
 *   Day 5  (~120h):   "What's actually inside the $799 blueprint"
 *   Day 10 (~240h):   "Last reminder + personal note from the team"
 *
 * Uses Resend's `scheduled_at` parameter — no cron needed.
 */

const FROM = "Refer Labs <jarred@referlabs.com.au>";
const SITE = "https://referlabs.com.au";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const wrapper = (heading: string, body: string, ctaLabel?: string, ctaHref?: string) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f5;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;padding:24px 0 16px;">
      <p style="margin:0;font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#0AA7B5;">Refer Labs</p>
    </div>
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:4px;overflow:hidden;">
      <div style="height:3px;background:linear-gradient(90deg,#0AA7B5,#22C0CD);"></div>
      <div style="padding:40px 36px;">
        <h1 style="margin:0 0 20px;font-size:24px;font-weight:400;line-height:1.3;color:#0f172a;">${heading}</h1>
        <div style="font-family:Inter,sans-serif;font-size:15px;line-height:1.7;color:#475569;">${body}</div>
        ${ctaLabel && ctaHref ? `
        <div style="margin-top:32px;text-align:center;">
          <a href="${ctaHref}" style="display:inline-block;background:#F59E0B;color:#060f15;text-decoration:none;padding:14px 32px;border-radius:6px;font-family:Inter,sans-serif;font-size:14px;font-weight:700;">${ctaLabel}</a>
        </div>` : ""}
        <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:32px;">
          <p style="margin:0 0 2px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0f172a;">The Refer Labs team</p>
          <p style="margin:0;font-family:Inter,sans-serif;font-size:12px;color:#64748b;">Refer Labs</p>
        </div>
      </div>
    </div>
    <div style="padding:20px 0;text-align:center;font-family:Inter,sans-serif;font-size:11px;color:#94a3b8;">
      Pepform Pty Ltd (Refer Labs) · ABN 32 660 008 159<br>
      <a href="${SITE}" style="color:#94a3b8;">referlabs.com.au</a> · <a href="${SITE}/contact" style="color:#94a3b8;">unsubscribe</a>
    </div>
  </div>
</body>
</html>`;

export type NurtureEmail = { subject: string; html: string; delayHours: number };

export function buildNurtureSequence(email: string): NurtureEmail[] {
  const safe = escape(email);

  return [
    // ── Day 0: Welcome + free preview ─────────────────────────────────────
    {
      subject: "Your free affiliate program preview",
      delayHours: 0,
      html: wrapper(
        "Here are 20 affiliate programs to start with.",
        `
        <p>Thanks for grabbing the preview. Here's a sample of what's in the full 250+ program database — the highest-commission programs across each of our 5 categories:</p>
        <ul>
          <li><strong>SaaS:</strong> beehiiv (30% recurring), Notion (50% first year), Webflow (50% recurring)</li>
          <li><strong>AI Tools:</strong> Jasper (25% recurring), Durable AI (20% recurring), Copy.ai</li>
          <li><strong>Health AU:</strong> Moshy ($100/sale), Mosh Hair ($85/sale), Better Being</li>
          <li><strong>Fintech:</strong> Wise ($30 flat), Stake ($50 flat), Pearler, Hatch</li>
          <li><strong>Startup Tools:</strong> Carrd (30% one-time), Gumroad, Lemon Squeezy</li>
        </ul>
        <p>The full database has 250+ programs with direct links, cookie windows, and a marketing angle for every single entry. Plus a personalised strategy brief written for your specific niche.</p>
        <p style="font-size:13px;color:#94a3b8;">More from me on Day 2 — what most people get wrong when starting out.</p>
        `,
        "See the Full Blueprint — $799",
        `${SITE}/referral-blueprint?utm_source=nurture&utm_medium=email&utm_campaign=day0&email=${safe}`
      ),
    },

    // ── Day 2: The biggest mistake ────────────────────────────────────────
    {
      subject: "The mistake that kills most affiliate sites in month 2",
      delayHours: 48,
      html: wrapper(
        "Most people start with the wrong programs.",
        `
        <p>Quick observation from researching 250+ affiliate programs and watching what works (and what doesn't):</p>
        <p><strong>Most beginners pick programs based on what they personally use, not what their audience would pay for.</strong></p>
        <p>That's why so many fitness influencers promote $20 protein shakes (5% commission = $1) instead of $200 telehealth subscriptions (paying $50-$150 per signup). The audience is the same. The earnings are 50-100x different.</p>
        <p>Three simple filters before picking any affiliate program:</p>
        <ol>
          <li><strong>Commission floor:</strong> Will one referral cover 1+ hour of your time? If not, skip it.</li>
          <li><strong>Recurring vs one-time:</strong> Recurring SaaS commissions compound. One-time commissions die after the sale.</li>
          <li><strong>Search demand for the program name:</strong> Is anyone actually searching for it? Free Google Trends check.</li>
        </ol>
        <p>The blueprint's strategy brief filters all 250+ programs through these criteria for your specific niche.</p>
        `,
        "Get the Strategy Brief — $799",
        `${SITE}/referral-blueprint?utm_source=nurture&utm_medium=email&utm_campaign=day2`
      ),
    },

    // ── Day 5: What's inside ──────────────────────────────────────────────
    {
      subject: "What's actually inside the $799 blueprint",
      delayHours: 120,
      html: wrapper(
        "Six files. One $799 payment. 48-hour delivery.",
        `
        <p>I get this question a lot, so here's the honest breakdown of what arrives in your inbox:</p>
        <ol>
          <li><strong>250+ Affiliate Program Database</strong> — Excel file. Company, link, commission rate, cookie window, suggested marketing angle. Sorted by 5 categories.</li>
          <li><strong>Personalised Strategy Brief</strong> — PDF, 8+ pages. Written for YOUR niche after I read your intake form. Not a template.</li>
          <li><strong>Niche Selection Brief</strong> — PDF. 3-5 niches matched to your goals with reasoning + program priorities for each.</li>
          <li><strong>10+ SEO Page Concepts</strong> — PDF. Real keyword data, page structure briefs, monetisation angle per page.</li>
          <li><strong>Distribution Playbooks</strong> — PDF. Step-by-step for the channels YOU selected (SEO, email, communities, etc).</li>
          <li><strong>Recommended Tool Stack</strong> — PDF. Specific software for your budget. Total monthly cost included.</li>
        </ol>
        <p>I read every intake personally. If your answers raise a question, I email before delivering. Nothing auto-generated.</p>
        <p>Delivered within 48 hours of payment. One-time, $799 AUD. No subscription.</p>
        <p style="font-size:13px;color:#94a3b8;">Want proof the method works? The comparison and review pages at <a href="${SITE}/guides" style="color:#0AA7B5;">referlabs.com.au/guides</a> were built using exactly this playbook.</p>
        `,
        "Get the Full Blueprint — $799",
        `${SITE}/referral-blueprint?utm_source=nurture&utm_medium=email&utm_campaign=day5`
      ),
    },

    // ── Day 10: Final reminder ────────────────────────────────────────────
    {
      subject: "A quick note before you go",
      delayHours: 240,
      html: wrapper(
        "If you have any questions, reply to this email.",
        `
        <p>Hey,</p>
        <p>I won't keep emailing about the blueprint — this is the last one in this short sequence.</p>
        <p>Quick note: if you're sitting on the fence because of the $799, here's the genuine math.</p>
        <p>The database has 250+ programs. Average commission across them is ~$50-$200 per referral. A single referral from a single program covers the purchase. Most buyers earn the price back inside 6-8 weeks.</p>
        <p>And the promise that matters: if the strategy brief misses the mark for your situation, reply and I'll revise it until it fits. You're not gambling $799 on a generic template.</p>
        <p>If now isn't the right time, no problem. The link below stays live.</p>
        <p>Cheers,<br>The Refer Labs team</p>
        `,
        "I'm Ready — Get the Blueprint",
        `${SITE}/referral-blueprint?utm_source=nurture&utm_medium=email&utm_campaign=day10`
      ),
    },
  ];
}

/**
 * Schedule the full nurture sequence via Resend.
 * Resend supports `scheduled_at` ISO timestamps for future delivery.
 */
export async function scheduleNurtureSequence(email: string): Promise<{ scheduled: number; errors: string[] }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { scheduled: 0, errors: ["RESEND_API_KEY not configured"] };

  const sequence = buildNurtureSequence(email);
  const errors: string[] = [];
  let scheduled = 0;

  for (const e of sequence) {
    const scheduledAt = new Date(Date.now() + e.delayHours * 60 * 60 * 1000).toISOString();
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from:         FROM,
          to:           [email],
          subject:      e.subject,
          html:         e.html,
          scheduled_at: e.delayHours === 0 ? undefined : scheduledAt,
        }),
      });
      if (res.ok) scheduled++;
      else {
        const data = await res.json().catch(() => ({}));
        errors.push(`Day ${Math.round(e.delayHours / 24)}: ${data.message || res.status}`);
      }
    } catch (err) {
      errors.push(`Day ${Math.round(e.delayHours / 24)}: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  return { scheduled, errors };
}
