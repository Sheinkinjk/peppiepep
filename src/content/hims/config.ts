// Hims page set — single source of truth.
// Change codes, links and facts HERE, never inside page copy.
// Anything marked PLACEHOLDER or verify:true renders a visible amber flag while the
// pages are in preview mode, so Hims' reviewers can see exactly what is unconfirmed.

import type { Vertical } from "./types";

export const SITE_URL = "https://referlabs.com.au";

/** Date every fact on these pages was last checked against the provider's public site. */
export const FACTS_CHECKED_ON = "29 September 2026";

export const AUTHOR = "Jarred - Founder";

/**
 * Handbook V3 disclosure, option 2, word for word. Do not edit, shorten or restyle.
 * Option 2 is used because it refers to "this content" and the affiliate code, which fits a
 * web page and matches how Hims attributes (code is the source of truth). Option 1 says "this post".
 */
export const DISCLOSURE =
  "If you're a new patient to Hims and make a purchase with the affiliate code shared in this content, I may earn a small commission at no extra cost to you.";

/** ReferLabs' own disclosure for other partners named on comparison pages (ACCC). */
export const SITE_DISCLOSURE =
  "ReferLabs is paid by some of the providers on this page when a new customer signs up using our code or link. Commission rates differ between providers. They do not decide what we write, and we have not compared every provider in Australia.";

type Offer = {
  code: string;
  codeIsPlaceholder: boolean;
  headline: string;
  headlineIsPlaceholder: boolean;
  /** Offer terms. AHPRA's advertising guidelines require terms for any discount or inducement to be stated. */
  terms: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaIsPlaceholder: boolean;
};

// PLACEHOLDERS: codes, headlines and links are not issued yet.
// Attribution is by code, so the code must be exactly what Hims issues.
export const OFFERS: Record<Vertical, Offer> = {
  weight: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: [
      "New Hims patients living in Australia only. Current and previous Hims or Pilot patients are not eligible.",
      "Our link applies the code automatically at checkout. You can also enter it yourself. One use per patient.",
      "Cannot be combined with any other Hims offer.",
      "Treatment is only supplied if an Australian practitioner decides it is clinically appropriate.",
      "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
    ],
    ctaLabel: "Start the free Hims quiz",
    ctaHref: "#hims-weight-link-pending",
    ctaIsPlaceholder: true,
  },
  hair: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: [
      "New Hims patients living in Australia only. Current and previous Hims or Pilot patients are not eligible.",
      "Our link applies the code automatically at checkout. You can also enter it yourself. One use per patient.",
      "Cannot be combined with any other Hims offer.",
      "Treatment is only supplied if an Australian practitioner decides it is clinically appropriate.",
      "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
    ],
    ctaLabel: "Start the free Hims quiz",
    ctaHref: "#hims-hair-link-pending",
    ctaIsPlaceholder: true,
  },
  ed: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: [
      "New Hims patients living in Australia only. Current and previous Hims or Pilot patients are not eligible.",
      "Our link applies the code automatically at checkout. You can also enter it yourself. One use per patient.",
      "Cannot be combined with any other Hims offer.",
      "Treatment is only supplied if an Australian practitioner decides it is clinically appropriate.",
      "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
    ],
    ctaLabel: "Start the free Hims quiz",
    ctaHref: "#hims-ed-link-pending",
    ctaIsPlaceholder: true,
  },
};

/** Mosh appears on comparison pages. Existing partner; code and link below are placeholders too. */
export const MOSH = {
  name: "Mosh",
  ctaLabel: "Start the free Mosh quiz",
  ctaHref: "#mosh-link-pending",
  ctaIsPlaceholder: true,
};

/**
 * Verified public facts. Each one was read on the provider's own site on FACTS_CHECKED_ON.
 * If a fact changes, change it here and re-send the affected pages to Hims.
 */
export const FACTS = {
  hims: {
    formerly: "Pilot",
    owner: "Hims & Hers Health, which bought Eucalyptus (Pilot's parent) in 2026",
    menOnly: true,
    quiz: "Free online quiz, about 2 minutes",
    consult: "Phone consult with an Australian practitioner",
    consultFee: "$20, refundable if you're not eligible or decide the recommended plan isn't for you",
    practitioners: "AHPRA-registered practitioners working across Australia",
    support: "Unlimited practitioner check-ins and 24/7 access to the Care Team (nurses, pharmacists and clinicians)",
    delivery: "Free Australia-wide, discreet unmarked packaging, Australia Post tracking",
    weight: {
      entry: "$199 first payment with Hims' public new-patient code",
      commitment: "Pay-upfront option with a twelve-month commitment and a minimum total payment of $2,988",
      shipping: "Shipped monthly",
      refund: "Full refund if you contact Hims within 30 days of starting the program (T&Cs apply)",
      cancel: "Hims' weight loss page says you can change or cancel at any time",
    },
    hair: {
      plans: "Keep (early thinning), Regrow (Hair Hybrid plans), 3-in-1, 2-in-1 and single-action options",
      popular: "Hims says most of its hair patients are on the 2-in-1 plan",
      guarantee: "180-day money-back guarantee on hair plans (T&Cs apply)",
      delivery: "Subscription deliveries every 2 or 3 months depending on plan",
      cancel: "Cancel any time before the next order is processed, no cancellation fee",
      price: "Not published on Hims' public hair page; shown after the consult",
    },
    ed: {
      plans: "ED Stamina, ED Performance and a third combined plan",
      popular: "Hims says ED Stamina is preferred by most men on Hims",
      cancel: "Pause or cancel any time, no lock-in contracts",
      price: "Not published on Hims' public ED page; shown after the consult",
      publicCode: "No public ED code shown on Hims' ED page",
    },
  },
  mosh: {
    related: "Lists Moshy and The Healthy Mummy as sister brands",
    consult: "Free practitioner review before you pay for a hair plan",
    hairPrices: "Prevention Plan from $24/month, Prevention & Regrowth from $44/month, advanced Hair Loss plan from $56/month",
    hairGuarantee: "180-day money-back guarantee on hair subscription programs (T&Cs apply)",
    priceMatch: "Price match guarantee across hair and weight programs, subject to an eligibility form",
    weightEntry: "Month one from $249 with Mosh's public intro code, $100 off month one",
    weightCommitment: "Minimum commitment period of 3 months on the intro offer",
    dietitian: "Optional dietitian add-on, $50 per one-hour session",
    edPrice: "ED plan from $1.50 per day",
    support: "Unlimited follow-ups included with treatment plans",
  },
} as const;
