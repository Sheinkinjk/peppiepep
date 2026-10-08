/**
 * Every user-facing string on /preview/moshy-updates (rewritten 8 Oct 2026).
 *
 * A Moshy member-offer page modelled on /moshy. Facts come from the same
 * sources as /moshy (getmoshy.com.au, read 30 Sep 2026; REFERRAL120 checked on
 * Moshy's sign-up page, date from src/lib/offers.ts). Buttons go to Moshy's
 * normal sign-up (our tracked MOSHY_URL), NOT the Moshy waitlist: that page
 * advertises an unnamed new medicine, and linking would make this page part of it.
 *
 * Legal limits: no medicine, class, format, outcome, novelty or urgency; no
 * testimonials or ratings; no "treatment"; the $ amount appears only inside the
 * offer card with its terms (National Law s 133). Do not add copy without review.
 */
import { MOSHY_URL } from "@/lib/affiliate-links";
import { MOSHY_TERMS_URL, REFERRAL120_TERMS, checkedOn } from "@/lib/offers";

export const moshySignupUrl = (): string => MOSHY_URL;
export { MOSHY_TERMS_URL, REFERRAL120_TERMS };
export const REFERRAL120_CHECKED_ON = checkedOn("REFERRAL120") ?? "";
export const MOSHY_FACTS_READ_ON = "30 September 2026";

export const BANNER =
  "PREVIEW — not live. Content, offer and partner details are pending Moshy approval and legal review.";

export const HEADER_RIGHT = "in partnership with Moshy";

export const HERO = {
  eyebrow: "Moshy × Refer Labs",
  h1: "Moshy online weight management, with a Refer Labs member offer",
  lead:
    "Moshy is an Australian online weight-management service and the brother brand of Mosh. You answer an online questionnaire, then talk to an independent AHPRA-registered doctor or nurse by phone or video, who decides whether the program is suitable for you.",
  button: "Continue to Moshy",
  small: "No GP referral needed. For adults 18+.",
};

export const GLANCE: [string, string][] = [
  ["What it is", "Australian weight-management telehealth, brother brand of Mosh"],
  ["How it works", "Online questionnaire, then a consultation by phone or video"],
  ["Practitioners", "Independent AHPRA-registered doctors and nurses"],
  ["Pricing", "One monthly program fee, shown on Moshy's site before you pay"],
  ["Member offer", "A Refer Labs code for Moshy, with its terms below"],
];

export const TILES = [
  { icon: "stethoscope", label: "Practitioner-led", line: "Independent AHPRA-registered doctors and nurses" },
  { icon: "laptop", label: "Online", line: "Phone or video consultation, no GP referral" },
  { icon: "users", label: "Ongoing support", line: "Coaching, meal plans and a member community in Moshy's app" },
  { icon: "ticket", label: "Member offer", line: "A Refer Labs code for Moshy (see terms)" },
] as const;

export const STEPS_HEADING = "How Moshy works";
export const STEPS = [
  {
    title: "Answer Moshy's online questionnaire",
    body: "It covers your health history, your goals and your current situation, and takes a few minutes.",
  },
  {
    title: "Talk to a practitioner",
    body: "Moshy arranges a consultation by phone or video. The practitioner goes through your answers with you and decides whether the program is suitable for you.",
  },
  {
    title: "Ongoing support",
    body: "If you go ahead, Moshy says the program fee includes unlimited practitioner support, coaching, meal plans and a member community in its app.",
  },
];

export const INCLUDED_HEADING = "What's included";
export const INCLUDED_INTRO = `As listed on Moshy's own site, read ${MOSHY_FACTS_READ_ON}:`;
export const INCLUDED = [
  "Unlimited practitioner support",
  "In-app health tracking and health coaching",
  "Meal plans, recipes and nutrition support from dietitians",
  "A supportive member community",
  "A care team including doctors, nurses, dietitians, psychologists and exercise physiologists",
  "A 30-day money back guarantee and a price match guarantee, each on Moshy's own terms",
];

export const OFFER_SECTION_TITLE = "Refer Labs member offer";
export const OFFER_VALUE = "$120 off your first order";
export const OFFER_CTA = "Continue to Moshy";
export const OFFER_CONFIRM = "Preview: this would open Moshy's sign-up with Refer Labs attribution.";

export const RIGHT_FOR_ME = {
  h2: "Is it right for me?",
  body:
    "Moshy is for adults who want to talk to a health practitioner about weight management. Only a practitioner can decide whether the program is appropriate for you. If you have concerns about eating or body image, talk to your GP, or contact the Butterfly Foundation on 1800 33 4673.",
};

export const FAQ_HEADING = "Common questions";
export const FAQS = [
  { q: "Is Refer Labs part of Moshy?", a: "No. Refer Labs is an independent comparison site and a Moshy affiliate partner." },
  {
    q: "Do I need a GP referral?",
    a: "No. You start with Moshy's online questionnaire, and Moshy arranges the consultation by phone or video.",
  },
  {
    q: "How do I use the member code?",
    a: "Enter the code shown in the member offer at checkout on Moshy's site. Moshy's terms, shown beside the code, apply.",
  },
  {
    q: "Can I get a refund?",
    a: "Moshy advertises a 30-day money back guarantee and a price match guarantee, each with its own conditions in Moshy's terms at getmoshy.com.au/terms.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This page is general information. Speak to a health practitioner about your circumstances.",
  },
];

export const CTA_BAND_H2 = "Start with Moshy";

export const DISCLOSURE =
  "Refer Labs may receive a commission when you use our code or links. It doesn't change what you pay. A Moshy practitioner decides whether the program is suitable for you. General information only, not medical advice. Pepform Pty Ltd t/a Refer Labs, ABN 32 660 008 159.";
