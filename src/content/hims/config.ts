// Hims page set: single source of truth.
// Change codes, links and facts HERE, never inside page copy.
// Anything marked PLACEHOLDER or verify:true renders a visible amber flag while the
// pages are in preview mode, so Hims' reviewers can see exactly what is unconfirmed.
//
// No partner prices (Jarred, 29 Sep 2026): these pages do not print Hims' or Mosh's
// prices or fees. The reader sees the price on the provider's own site after the click.
// lint:hims fails on any dollar figure in this folder.
//
// TGA service wording (30 Sep 2026): every page describes an online consultation
// with a registered practitioner, who decides whether any treatment is appropriate.
// No plan names that read as efficacy claims, no shipping or supply language, no
// suitability checks, and buttons say "Continue to Hims" or "Continue to Mosh".

import type { Vertical } from "./types";
import { HIMS_ED_URL, HIMS_HAIR_URL, HIMS_WEIGHT_URL, MOSH_HAIR_URL, MOSHY_URL } from "@/lib/affiliate-links";

export const SITE_URL = "https://referlabs.com.au";

/** Date every Hims fact on these pages was last read on Hims' own public site (V2 re-read). */
export const FACTS_CHECKED_ON = "9 October 2026";

/**
 * Facts Hims supplied in writing rather than on a public page (Moiz, Hims, email of
 * 9 Oct 2026, with the V2 feedback doc). Stated as Hims' own statements.
 */
export const HIMS_SUPPLIED_ON = "9 October 2026";

/**
 * V2 (9 Oct 2026). Hims' claims sheet items deliberately NOT used, with the reason,
 * so the list can go back to Hims and nobody adds them later by accident:
 *  - clinical statistics ("over 90% of eligible men", "94% of men", "92% kept or
 *    regrew", "over 19% bodyweight loss", "up to 20%"): each cites a trial of a
 *    specific prescription medicine, so it identifies the medicine (TG Act s42DL)
 *    and creates an expectation of benefit (National Law s133(1)(d));
 *  - "Thousands of 5 star reviews globally": review-based social proof, which
 *    s133(1)(c) prohibits for a regulated health service;
 *  - "helped millions of men ... become the best version of themselves": an
 *    outcome claim (s133(1)(d));
 *  - "one of the world's biggest men's health brands": a superiority claim
 *    (Ahpra guidelines 4.1), against the 9 Oct health wording rule;
 *  - "over 9,000 Aussies already losing weight with Hims": an outcome claim;
 *  - "300,000 Australians have joined Hims": not essential (Jarred, 9 Oct 2026);
 *  - ED and premature ejaculation prevalence stats: not essential, and PE is not
 *    in the program;
 *  - "free, discreet delivery to your door": supply language, which points at a
 *    product (TGA service wording rule, 30 Sep 2026);
 *  - the weight plan prices ($160, $260, $2,899): the TGA says listing prices for
 *    services involving prescription medicines is likely advertising (guidance of
 *    18 June 2026). The page points to Hims' own pricing instead, dated;
 *  - "see if you're eligible": eligibility framing (TGA lists eligibility checks).
 */

export const AUTHOR = "Jarred - Founder";

/**
 * Hims handbook disclosure (option 2), with the publisher named in place of "I".
 * Every disclosure on the site names Refer Labs as the one who may earn (see
 * src/components/consumer/AffiliateDisclosure.tsx for why first person was removed
 * sitewide). Changed at Jarred's instruction, 29 Sep 2026.
 *
 * AWAITING HIMS: the handbook's wording is first person. Hims must approve this
 * third-person version in writing before go-live; if it refuses, the handbook
 * sentence goes in verbatim, and either way it is copied into
 * REQUIRED_DISCLOSURES in src/lib/partner-disclosures.ts at launch.
 */
export const DISCLOSURE =
  "If you're a new patient to Hims and make a purchase with the affiliate code shared in this content, Refer Labs may earn a small commission at no extra cost to you.";

/** Shown to Hims' reviewers inside the one disclosure block, preview only. */
export const DISCLOSURE_REVIEW_NOTE =
  "For Hims to approve: the handbook statement with Refer Labs named in place of \"I\".";

type Offer = {
  code: string;
  codeIsPlaceholder: boolean;
  headline: string;
  headlineIsPlaceholder: boolean;
  /**
   * Offer terms. AHPRA's advertising guidelines require terms for any discount or
   * inducement to be stated. Fine print stays fine print (Jarred, 1-2 Oct 2026):
   * these render only in the offer-terms note at the foot of each page, never in
   * an offer box, card, codes panel, CTA or sticky bar.
   */
  terms: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaIsPlaceholder: boolean;
};

const TERMS = [
  "New Hims patients in Australia only. Current and previous Hims or Pilot patients are excluded.",
  "Our link applies the code automatically; if it isn't shown, enter it yourself. One use per patient.",
  "Cannot be combined with any other Hims offer.",
  "Program fees apply.",
  "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
];

// Codes, links and offer lines supplied by Hims (V2 feedback, 9 Oct 2026).
// Weight: Hims' recommended line, verbatim. Hair and ED: Hims asked for "Get started
// with a free consultation to see if you're eligible"; "see if you're eligible" is
// eligibility framing the TGA lists as advertising, so it is reworded (Jarred, 9 Oct).
export const OFFERS: Record<Vertical, Offer> = {
  weight: {
    code: "REFERLABS89",
    codeIsPlaceholder: false,
    headline: "Free consultation ($89 value) with code REFERLABS89",
    headlineIsPlaceholder: false,
    terms: TERMS,
    ctaLabel: "Continue to Hims",
    ctaHref: HIMS_WEIGHT_URL,
    ctaIsPlaceholder: false,
  },
  hair: {
    code: "REFERLABS",
    codeIsPlaceholder: false,
    headline: "Free consultation with an Australian practitioner for new patients, with code REFERLABS",
    headlineIsPlaceholder: false,
    terms: TERMS,
    ctaLabel: "Continue to Hims",
    ctaHref: HIMS_HAIR_URL,
    ctaIsPlaceholder: false,
  },
  ed: {
    code: "REFERLABS",
    codeIsPlaceholder: false,
    headline: "Free consultation with an Australian practitioner for new patients, with code REFERLABS",
    headlineIsPlaceholder: false,
    terms: TERMS,
    ctaLabel: "Continue to Hims",
    ctaHref: HIMS_ED_URL,
    ctaIsPlaceholder: false,
  },
};

/**
 * One line shown inside the offer box beside the code, per vertical (V2). Hair:
 * Hims asked for the 180-day guarantee next to the code box. Hims' terms (clause
 * c, read 9 Oct 2026) apply it to "a particular" hair plan, so it says "select".
 * ED: REFERLABS is exclusive to Refer Labs; Hims confirmed in writing (9 Oct 2026)
 * that it has no public ED code.
 */
/**
 * WEIGHT PRICING (V2.1, Jarred 9 Oct 2026: "add it, flagged for legal sign-off").
 *
 * Hims' own wording, supplied in writing (Moiz, 9 Oct 2026). Never name or compare
 * against Hims' public codes or offers (Jarred, 9 Oct 2026: Hims would not approve it).
 *
 * LEGAL GATE. The TGA's guidance of 18 June 2026 says listing prices for services
 * that involve prescription medicines is likely to be advertising those medicines.
 * These lines render in the /preview review copy only. On the public slugs they
 * render only once PRICING_LEGAL_CLEARED is true, and that flips only when BOTH
 * Hims' legal team and Refer Labs' lawyer have cleared them in writing.
 * lint:hims allows dollar figures only between the PRICING markers below.
 */
export const PRICING_LEGAL_CLEARED = false;
// PRICING:START
export const WEIGHT_PRICING = {
  annual: "Free consultation and first month from $160 with code REFERLABS89, if you select a 12-month plan. $2,899 paid upfront.",
  monthly: "Free consultation and first month from $260 with code REFERLABS89.",
  source: "Pricing supplied by Hims, 9 October 2026. View the latest pricing on Hims' own site.",
};
// PRICING:END

/** What each code is called on the page. Only ED's is confirmed exclusive in writing (Hims, 9 Oct 2026). */
export const CODE_LABEL: Record<Vertical, string> = {
  weight: "Your Refer Labs code for new Hims patients",
  hair: "Your Refer Labs code for new Hims patients",
  ed: "Exclusive Refer Labs code for new Hims patients",
};

export const OFFER_NOTES: Partial<Record<Vertical, string>> = {
  hair: "180-day money-back guarantee on select hair plans, under Hims' terms.",
  ed: "Exclusive to Refer Labs: Hims has no public ED code.",
  weight: "30-day money-back guarantee on the weight program, under Hims' terms.",
};

/**
 * Mosh, per vertical. Only hair has a Refer Labs link and code (REFERAL55, the
 * hair offer on /moshhair). Weight is Moshy (the /moshy link and REFERRAL120).
 * ED is a placeholder until Mosh supplies its ED details and offer (Jarred,
 * 1 Oct 2026): every Mosh ED card, table cell and code row renders as a muted
 * dashed placeholder with no link. Never send an ED or weight reader through the
 * hair link.
 */
export type MoshSide = {
  /** Brand shown on this vertical. Weight is Moshy, Mosh's partner brand (Jarred, 30 Sep 2026). */
  name: "Mosh" | "Moshy";
  logo: { src: string; w: number; h: number };
  ctaLabel: string;
  /** Where a comparison's ItemList points for this side. */
  pageUrl: string;
  /** Code terms. Rendered only in the offer-terms note at the foot of the page (fine print, 1-2 Oct 2026). */
  terms?: string[];
  href: string;
  sponsored: boolean;
  code?: string;
  /** What the code applies to, stated in full wherever the code appears. */
  offerText?: string;
  /**
   * Set while the provider has not supplied its details for this vertical. Every
   * card, codes panel and table column for the side then renders as a placeholder
   * showing this line, with no button and no link.
   */
  placeholder?: string;
};

export const MOSH: Record<Vertical, MoshSide> = {
  hair: {
    name: "Mosh",
    logo: { src: "/logos/mosh-tile.png", w: 64, h: 64 },
    ctaLabel: "Continue to Mosh",
    pageUrl: "/moshhair",
    terms: [
      "New Mosh customers only; applies to the first order of a Mosh hair program (Mosh's Refer Labs page, read 9 October 2026).",
      "Unless a promotion says otherwise, Mosh's terms allow one use per customer and one promotion per order. Full terms at getmosh.com.au/terms.",
      "Program fees apply.",
    ],
    href: MOSH_HAIR_URL,
    sponsored: true,
    code: "REFERAL55",
    offerText:
      "REFERAL55 is a discount on a new customer's first Mosh hair order. Our link carries REFERAL55; enter it at checkout if it isn't shown.",
  },
  // Mosh's weight offering is Moshy, its partner brand (Jarred, 30 Sep 2026), so the
  // weight comparison is Hims vs Moshy through the /moshy link and REFERRAL120. No
  // amount is printed: lint:hims blocks dollar figures on these pages.
  weight: {
    name: "Moshy",
    logo: { src: "/logos/moshy.png", w: 64, h: 64 },
    ctaLabel: "Continue to Moshy",
    pageUrl: "/moshy",
    terms: [
      "New Moshy customers on a practitioner-assigned weight program, one use per customer.",
      "A minimum commitment of three months applies, and the code cannot be combined with other promotions (Moshy's sign-up page, read 2 October 2026). Full terms at getmoshy.com.au/terms.",
      "Program fees apply.",
    ],
    href: MOSHY_URL,
    sponsored: true,
    code: "REFERRAL120",
    offerText:
      "REFERRAL120 is a discount on a new customer's first Moshy order. Our link carries REFERRAL120; enter it at checkout if it isn't shown.",
  },
  // PLACEHOLDER (Jarred, 1 Oct 2026): Mosh has not supplied its ED details or offer.
  // When it does, this is a data change, not a redesign:
  //  1. here: delete `placeholder`, set `href` (the Mosh ED tracking link from
  //     src/lib/affiliate-links.ts), `sponsored: true`, `code`, `offerText`, `terms`
  //     and `pageUrl`;
  //  2. src/content/hims/inclusions.ts: fill the `mosh` cells of the `ed` table and
  //     its `sources.mosh`;
  //  3. src/content/hims/pages/ed-compare.ts: fill `pair.mosh`, and add the Mosh side
  //     back to the lead, the answer and the FAQ.
  ed: {
    name: "Mosh",
    logo: { src: "/logos/mosh-tile.png", w: 64, h: 64 },
    ctaLabel: "Continue to Mosh",
    pageUrl: "/mosh-review",
    href: "",
    sponsored: false,
    placeholder: "Mosh's ED details and offer will be added here once Mosh supplies them.",
  },
};

export const MOSH_CTA_LABEL = "Continue to Mosh";

/** Sources used on more than one page. */
export const SRC = {
  himsHome: { label: "Hims: Home page", url: "https://hims.com.au/" },
  himsWeight: { label: "Hims: Weight loss", url: "https://hims.com.au/weight-loss" },
  himsHair: { label: "Hims: Hair loss", url: "https://hims.com.au/hair-loss" },
  himsEd: { label: "Hims: Erectile dysfunction", url: "https://hims.com.au/erectile-dysfunction" },
  himsFaq: { label: "Hims: Frequently asked questions", url: "https://hims.com.au/faq" },
  himsTerms: { label: "Hims: Terms and conditions", url: "https://hims.com.au/terms-and-conditions" },
  pilot: { label: "Pilot: notice that Pilot has joined the Hims & Hers group", url: "https://pilot.com.au/" },
  eucalyptus: {
    label: "Business Wire, 2 June 2026: Hims & Hers completes acquisition of Eucalyptus",
    url: "https://www.businesswire.com/news/home/20260602264452/en/Hims-Hers-Completes-Acquisition-of-Eucalyptus-Advancing-Position-as-the-Worlds-Largest-Consumer-Health-Platform",
  },
  moshHome: { label: "Mosh: Home page", url: "https://www.getmosh.com.au/" },
  moshPricing: { label: "Mosh: Pricing", url: "https://www.getmosh.com.au/pricing" },
  moshWeight: { label: "Mosh: Weight loss", url: "https://www.getmosh.com.au/weight-loss" },
  moshyWeight: { label: "Moshy: Weight loss", url: "https://www.getmoshy.com.au/weight-loss" },
  moshyHome: { label: "Moshy: Home page", url: "https://www.getmoshy.com.au/" },
  moshHair: { label: "Mosh: Hair loss", url: "https://www.getmosh.com.au/hair-loss" },
  moshEd: { label: "Mosh: Erectile dysfunction", url: "https://www.getmosh.com.au/erectile-dysfunction" },
  moshReferLabs: { label: "Mosh: Refer Labs partner page", url: "https://www.getmosh.com.au/start/referlabs" },
} as const;
