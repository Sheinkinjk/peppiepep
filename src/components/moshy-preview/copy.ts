/**
 * Every user-facing string on /preview/moshy-updates (8 Oct 2026).
 *
 * Flow (Jarred, 8 Oct): Moshy's own site collects the email; this page explains
 * the service, shows the Refer Labs member code with its terms, and links to
 * Moshy's sign-up page. Refer Labs collects nothing here.
 *
 * Legal limits (brief + research/mens-hormone-health/legal-research.md): no
 * reference to any medicine, class, format, outcome, novelty or urgency; no
 * testimonials or ratings; the code always shown with its terms in the same view;
 * no "treatment" wording. Do not add copy without legal review.
 */
import { MOSHY_URL } from "@/lib/affiliate-links";

/** Moshy's sign-up page. Placeholder until Jarred supplies it; falls back to our existing Moshy link. */
export const moshySignupUrl = (): string => process.env.MOSHY_SIGNUP_URL?.trim() || MOSHY_URL;

export const BANNER =
  "PREVIEW — not live. Content, offer and partner details are placeholders pending Moshy approval and legal review.";

export const HEADER_RIGHT = "in partnership with Moshy";

export const HERO = {
  eyebrow: "Moshy × Refer Labs",
  h1: "Moshy online consultations for weight management, with a Refer Labs member offer",
  subBefore: "Moshy provides online consultations with ",
  subAfter:
    " about weight management. Sign up on Moshy's site for program updates, and use the Refer Labs member code when you start.",
  button: "Sign up on Moshy's site",
  small: "Sign-up happens on Moshy's site. For adults 18+.",
  imageAlt: "An adult on a video call at home",
};

export const TILES = [
  { icon: "stethoscope", label: "Practitioner-led", lineBefore: "Consultations with ", practitioner: true },
  { icon: "laptop", label: "Online", line: "Complete it from home" },
  { icon: "ticket", label: "Member offer", line: "A Refer Labs code for Moshy (see terms)" },
  { icon: "mailcheck", label: "Moshy updates", line: "Sign up on Moshy's site" },
] as const;

export const STEPS_HEADING = "How Moshy works";
export const STEP_1 = "Complete an online health questionnaire";
export const STEP_2_BEFORE = "Have a consultation with ";
export const STEP_2_AFTER = ", who assesses whether the program is suitable for you";

export const OFFER_SECTION_TITLE = "Refer Labs member offer";
export const OFFER_CTA = "Start with Moshy";
export const OFFER_CONFIRM = "Preview: this would open Moshy's site with Refer Labs attribution.";

export const RIGHT_FOR_ME = {
  h2: "Is it right for me?",
  body:
    "Moshy is for adults who want to talk to a health practitioner about weight management. Only a practitioner can decide whether the program is appropriate for you. If you have concerns about eating or body image, talk to your GP, or contact the Butterfly Foundation on 1800 33 4673.",
};

export const FAQ_HEADING = "Common questions";
export const FAQS = [
  { q: "Is Refer Labs part of Moshy?", a: "No. Refer Labs is an independent comparison site and a Moshy affiliate partner." },
  {
    q: "Who collects my details?",
    a: "Moshy does, on its own site. Refer Labs doesn't collect your details on this page.",
  },
  {
    q: "How do I use the member code?",
    a: "Enter the code shown in the member offer when you sign up with Moshy. The terms beside it apply.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This page is general information. Speak to a health practitioner about your circumstances.",
  },
];

export const CTA_BAND_H2 = "Sign up for Moshy updates";

export const DISCLOSURE_BEFORE_ABN =
  "Refer Labs may receive a commission when you use our code or links. It doesn't change what you pay. A Moshy practitioner decides whether the program is suitable for you. General information only, not medical advice. Pepform Pty Ltd t/a Refer Labs, ABN ";

export const PLACEHOLDERS = {
  practitionerType: "Practitioner type, e.g. Australian-registered doctors",
  programSupport: "Program support line, e.g. Ongoing check-ins with the Moshy care team",
  abn: "ABN",
  offerValue: 'Offer value to be confirmed by Moshy, e.g. "$X off your first order"',
  offerTerms:
    "Final terms to be supplied verbatim by Moshy before go-live: eligibility, new customers only, expiry, non-combinable, subject to practitioner assessment, not redeemable for cash.",
  image: "Lifestyle image to be supplied: an adult on a video call at home",
};
