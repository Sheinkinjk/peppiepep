// Builds the "Australian weight-loss options" guide email, sent on lead-magnet signup.
// TGA-safe by design: it describes the SERVICE pathways, names no medicines, makes no
// efficacy promises, states info-only + practitioner-decided suitability, and discloses
// the affiliate links. Static content only (no user input interpolated).

import { MOSHY_TERMS_URL, REFERRAL120_TERMS } from "@/lib/offers";

const GREEN = "#0a7c42";
const INK = "#10251b";
const BODY = "#3d4b44";
const MUTED = "#9aa39c";
const FONT = "Inter,-apple-system,Segoe UI,Arial,sans-serif";
const BASE = "https://referlabs.com.au";
const utm = (path: string, campaign: string) =>
  `${BASE}${path}?utm_source=email&utm_medium=lead_magnet&utm_campaign=${campaign}`;

function optionRow(title: string, who: string, body: string, cta: { label: string; href: string } | null): string {
  return `
    <tr><td style="padding:20px 0;border-bottom:1px solid #e5e9e7;">
      <p style="margin:0 0 4px;font-size:17px;font-weight:800;color:${INK};font-family:${FONT};">${title}</p>
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${GREEN};font-family:${FONT};">${who}</p>
      <p style="margin:0 0 ${cta ? "14px" : "0"};font-size:14px;line-height:1.65;color:${BODY};font-family:${FONT};">${body}</p>
      ${cta ? `<a href="${cta.href}" style="display:inline-block;background:${GREEN};color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:9px;font-family:${FONT};">${cta.label} &rarr;</a>` : ""}
    </td></tr>`;
}

export function buildWeightLossGuideEmail(): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f8f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f6;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e9e7;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 28px 8px;">
          <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${GREEN};font-family:${FONT};">Refer Labs</p>
          <h1 style="margin:10px 0 6px;font-size:24px;line-height:1.25;font-weight:800;color:${INK};font-family:${FONT};">Your Australian weight-loss options</h1>
          <p style="margin:0;font-size:15px;line-height:1.65;color:${BODY};font-family:${FONT};">Here is the map of the main ways Australians approach weight loss, and who each one tends to suit. It is general information to help you narrow the field, not medical advice. Whether any option is right for you is decided by a registered Australian practitioner.</p>
        </td></tr>
        <tr><td style="padding:8px 28px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${optionRow(
              "1. Moshy: an all-inclusive online program",
              "Best if you want one fee with coaching built in",
              `You complete an online questionnaire, then a consult by phone or video with a registered practitioner, who decides whether the program is right for you. The fee is all-inclusive, with in-app coaching, dietitian meal plans and a community. Moshy describes itself as an online women's health clinic and takes anyone a practitioner assesses as suitable. New customers get $120 off their first order with REFERRAL120. Use code REFERRAL120 at checkout; our link opens Moshy's sign-up with the offer. ${REFERRAL120_TERMS} <a href="${MOSHY_TERMS_URL}" style="color:${GREEN};">Read Moshy's terms</a> before you start.`,
              { label: "See how Moshy works", href: utm("/moshy", "wl_guide_moshy") },
            )}
            ${optionRow(
              "2. Juniper: designed for women",
              "Best if you want a program designed around women",
              "Practitioner-led online care designed for women, with unlimited practitioner support from specialist GPs and nurse practitioners, meal plans, a physio-designed exercise program, progress tracking and a private community. With JARREDKFC there is no charge for the initial consultation, which Juniper values at $89; program fees apply.",
              { label: "See how Juniper works", href: utm("/juniper", "wl_guide_juniper") },
            )}
            ${optionRow(
              "3. Your GP",
              "Best if you want face-to-face care",
              "A GP can see you in person, already knows your history, and Medicare offsets part of the consultation. It is slower to book than telehealth, but if you prefer being seen in person or have a complex history, it is a sensible starting point. Refer Labs earns nothing from this route.",
              null,
            )}
            ${optionRow(
              "Not sure which fits?",
              "60 seconds, no sign-up",
              "Our free matcher asks a couple of quick questions and points you to the route that suits your goals, budget and how much support you want, and tells you why.",
              { label: "Take the quiz", href: utm("/weight-loss-quiz", "wl_guide_quiz") },
            )}
          </table>
        </td></tr>
        <tr><td style="padding:18px 28px 26px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};font-family:${FONT};">This guide is published by Refer Labs and is general information, not medical advice. It does not recommend a course of care or imply suitability for any individual. Suitability for any program is decided by a registered Australian practitioner. It contains disclosed affiliate links: we may earn a commission if you sign up through them, at no extra cost to you, and it never changes what we write. You are receiving this because you requested the guide at referlabs.com.au. <a href="${BASE}/contact?subject=Unsubscribe" style="color:${MUTED};">Unsubscribe</a>.</p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:${MUTED};font-family:${FONT};">Refer Labs &middot; Independent Australian comparisons &middot; <a href="${BASE}" style="color:${GREEN};text-decoration:none;">referlabs.com.au</a></p>
    </td></tr>
  </table>
</body></html>`;
}
