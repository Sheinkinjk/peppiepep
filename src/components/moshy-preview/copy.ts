/**
 * Every user-facing string on /preview/moshy-updates (premium layout, 8 Oct 2026).
 *
 * THIS FILE IS THE ONLY PLACE TO EDIT WORDING. The layout reads every line from
 * here. Jarred is replacing the hero, notice and closing lines with wording
 * modelled on Moshy's own sign-up page; the neutral text below holds the slots
 * until then. Get the lawyer's view before the page is shown outside Moshy.
 *
 * Facts about Moshy's current service come from getmoshy.com.au, as on /moshy
 * (read 30 Sep 2026). The $ amount appears only inside the offer card beside its
 * terms (National Law s 133). No testimonials or ratings.
 * tests/moshy-preview-compliance.test.tsx scans the rendered page against the
 * brief's banned list, so new wording that trips it will fail `npm test`.
 */
import { MOSHY_URL } from "@/lib/affiliate-links";
import { MOSHY_TERMS_URL, REFERRAL120_TERMS, checkedOn } from "@/lib/offers";

/** Moshy's sign-up page. Set MOSHY_SIGNUP_URL in Vercel when Moshy sends the link; until then our tracked Moshy link. */
export const moshySignupUrl = (): string => process.env.MOSHY_SIGNUP_URL?.trim() || MOSHY_URL;
export { MOSHY_TERMS_URL, REFERRAL120_TERMS };
export const REFERRAL120_CHECKED_ON = checkedOn("REFERRAL120") ?? "";

export const BANNER =
  "PREVIEW, not live. Pending Moshy approval and legal review. Final Moshy sign-up link to be added.";

export const HEADER_RIGHT = "Partner page";

export const HERO = {
  h1: "Sign up with Moshy.",
  lede: "Moshy shares the details once you've signed up on its site. Refer Labs readers also get a code for their first order.",
  button: "Sign up with Moshy",
};

/** The prominent notice under the hero. */
export const NOTICE = {
  h2: "Why this page says so little",
  body:
    "Australian advertising rules limit what we can say about health services on this page. Moshy explains everything after you sign up, and a health practitioner decides in a consultation whether anything is suitable for you.",
  disclosure: "Refer Labs earns a commission if you sign up through this page or use our code. General information only, not medical advice.",
};

export const CHIPS = [
  { object: "send", title: "Straight from Moshy", body: "Moshy gets in touch after you sign up." },
  { object: "clinic", title: "Practitioner-led", body: "Independent AHPRA-registered doctors and nurses." },
  { object: "phone", title: "From home", body: "Consultations by phone or video, no GP referral." },
  { object: "offer", title: "Refer Labs code", body: "A code for your first Moshy order, terms below." },
] as const;

export const STEPS_HEADING = "What happens next";
export const STEPS = [
  { title: "Sign up with Moshy", body: "Add your details on Moshy's site. Refer Labs doesn't collect them." },
  { title: "Moshy gets in touch", body: "Moshy explains the details by email or phone." },
  { title: "Talk to a practitioner", body: "If you choose to go ahead, a consultation decides whether anything is suitable for you." },
];

export const OFFER_HEADING = "Your Refer Labs code";
export const OFFER_VALUE = "$120 off your first order";
export const OFFER_CTA = "Sign up with Moshy";
export const OFFER_CONFIRM = "Preview: this would open Moshy's sign-up with Refer Labs attribution.";

export const ABOUT_HEADING = "About Moshy";
export const ABOUT_BODY =
  "Moshy is an Australian online weight-management service and the brother brand of Mosh. Its programs start with an online questionnaire and a consultation by phone or video with an independent AHPRA-registered doctor or nurse.";

export const FAQ_HEADING = "Questions";
export const FAQS = [
  { q: "Is Refer Labs part of Moshy?", a: "No. Refer Labs is an independent comparison site and a Moshy affiliate partner." },
  { q: "Who collects my details?", a: "Moshy does, on its own site. Refer Labs doesn't collect your details on this page." },
  {
    q: "How do I use the Refer Labs code?",
    a: "Enter the code shown above at checkout with Moshy. Moshy's terms, shown beside the code, apply.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This page is general information. Speak to a health practitioner about your circumstances. If you have concerns about eating or body image, talk to your GP, or contact the Butterfly Foundation on 1800 33 4673.",
  },
];

export const CLOSING = { h2: "Hear it from Moshy first.", button: "Sign up with Moshy" };

export const DISCLOSURE =
  "Refer Labs may receive a commission when you use our code or links. It doesn't change what you pay. Moshy's practitioners decide whether a program is suitable for you. General information only, not medical advice. Pepform Pty Ltd t/a Refer Labs, ABN 32 660 008 159.";
