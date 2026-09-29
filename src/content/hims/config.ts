// Hims page set: single source of truth.
// Change codes, links and facts HERE, never inside page copy.
// Anything marked PLACEHOLDER or verify:true renders a visible amber flag while the
// pages are in preview mode, so Hims' reviewers can see exactly what is unconfirmed.
//
// No partner prices (Jarred, 29 Sep 2026): these pages do not print Hims' or Mosh's
// prices or fees. The reader sees the price on the provider's own site after the click.
// lint:hims fails on any dollar figure in this folder.

import type { Vertical } from "./types";
import { HIMS_URL, MOSH_HAIR_URL } from "@/lib/affiliate-links";

export const SITE_URL = "https://referlabs.com.au";

/** Date every fact on these pages was last checked against the provider's public site. */
export const FACTS_CHECKED_ON = "29 September 2026";

export const AUTHOR = "Jarred - Founder";

/**
 * Hims handbook disclosure (option 2), with the publisher named in place of "I".
 * Every disclosure on the site names Refer Labs as the one who may earn (see
 * src/components/consumer/AffiliateDisclosure.tsx for why first person was removed
 * sitewide). Changed at Jarred's instruction, 29 Sep 2026; Hims sees it in review.
 */
export const DISCLOSURE =
  "If you're a new patient to Hims and make a purchase with the affiliate code shared in this content, Refer Labs may earn a small commission at no extra cost to you.";

/** Refer Labs' own disclosure for other partners named on comparison pages (ACCC). */
export const SITE_DISCLOSURE =
  "Refer Labs is paid by some of the providers on this page when a new customer signs up using our code or link. Commission rates differ between providers. They do not decide what we write, and we have not compared every provider in Australia.";

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

const TERMS = [
  "New Hims patients living in Australia only. Current and previous Hims or Pilot patients are not eligible.",
  "Our link applies the code automatically at checkout. You can also enter it yourself. One use per patient.",
  "Cannot be combined with any other Hims offer.",
  "Treatment is only supplied if an Australian practitioner decides it is clinically appropriate.",
  "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
];

// Link: real, supplied by Hims. Code and headline: PLACEHOLDERS until Hims issues them.
// Attribution is by code, so the code must be exactly what Hims issues.
export const OFFERS: Record<Vertical, Offer> = {
  weight: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: TERMS,
    ctaLabel: "Start the free Hims quiz",
    ctaHref: HIMS_URL,
    ctaIsPlaceholder: false,
  },
  hair: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: TERMS,
    ctaLabel: "Start the free Hims quiz",
    ctaHref: HIMS_URL,
    ctaIsPlaceholder: false,
  },
  ed: {
    code: "REFERLABS89",
    codeIsPlaceholder: true,
    headline: "Free initial consult for new Hims patients",
    headlineIsPlaceholder: true,
    terms: TERMS,
    ctaLabel: "Start the free Hims quiz",
    ctaHref: HIMS_URL,
    ctaIsPlaceholder: false,
  },
};

/** Mosh appears on comparison pages. Existing partner; the link is the one every Mosh page uses. */
export const MOSH = {
  name: "Mosh",
  ctaLabel: "Start the free Mosh quiz",
  ctaHref: MOSH_HAIR_URL,
  ctaIsPlaceholder: false,
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
    consultRefund: "Consult fee refunded if you're not eligible or decide not to proceed (Hims FAQ)",
    practitioners: "AHPRA-registered practitioners working across Australia",
    support: "Unlimited practitioner check-ins and 24-hour access to the Care Team (nurses, pharmacists and clinicians)",
    delivery: "Free Australia-wide, discreet unmarked packaging, Australia Post tracking",
    weight: {
      commitment: "Advertised starting offer is a pay-upfront option with a twelve-month commitment",
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
    },
    ed: {
      plans: "ED Stamina, ED Performance and a third combined plan",
      popular: "Hims says ED Stamina is preferred by most men on Hims",
      cancel: "Pause or cancel any time, no lock-in contracts",
      publicCode: "No public ED code shown on Hims' ED page",
    },
  },
  mosh: {
    related: "Lists Moshy among its brands",
    consult: "Free consultation to start (Mosh pricing page)",
    hairPlans: "Prevention, Prevention & Regrowth, and an advanced plan; 85+ plan variations",
    hairGuarantee: "180-day money-back guarantee on hair subscription programs (T&Cs apply)",
    priceMatch: "Price match guarantee on substantially comparable products, subject to an eligibility form",
    weightCommitment: "Minimum commitment period of 3 months on the intro offer",
    dietitian: "Optional dietitian add-on sessions",
    edDelivery: "ED plan with your choice of delivery frequency",
    support: "Unlimited practitioner support included with treatment plans",
  },
} as const;
