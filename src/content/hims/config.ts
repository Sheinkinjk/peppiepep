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
import { HIMS_URL, MOSH_HAIR_URL, MOSHY_URL } from "@/lib/affiliate-links";

export const SITE_URL = "https://referlabs.com.au";

/** Date every fact on these pages was last read on the provider's own public site. */
export const FACTS_CHECKED_ON = "1 October 2026";

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

/** Shown to Hims' reviewers beside the disclosure, preview only. */
export const DISCLOSURE_REVIEW_NOTE =
  "For Hims to approve: the handbook statement with Refer Labs named in place of \"I\".";

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
  "New Hims patients in Australia only. Current and previous Hims or Pilot patients are excluded.",
  "Our link carries the code into Hims' checkout; if it isn't shown, enter it yourself. One use per patient.",
  "Cannot be combined with any other Hims offer.",
  "A registered practitioner decides whether any treatment is appropriate for you. Program fees apply.",
  "Hims may change or withdraw this offer. Full terms at hims.com.au/terms-and-conditions.",
];

const HIMS_OFFER: Offer = {
  code: "REFERLABS89",
  codeIsPlaceholder: true,
  headline: "No charge for the initial consultation for new Hims patients; program fees apply",
  headlineIsPlaceholder: true,
  terms: TERMS,
  ctaLabel: "Continue to Hims",
  ctaHref: HIMS_URL,
  ctaIsPlaceholder: false,
};

// Link: real, supplied by Hims (it carries JARREDSTART, which is what Hims
// attributes on). Code and headline: PLACEHOLDERS until Hims' reviewers confirm them.
export const OFFERS: Record<Vertical, Offer> = {
  weight: HIMS_OFFER,
  hair: HIMS_OFFER,
  ed: HIMS_OFFER,
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
  /** Code terms, listed under the code on versus pages. */
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
      "New Mosh customers only. The discount applies to the first billing period only.",
      "Mosh\u2019s promotion terms apply, at getmosh.com.au/promotions-terms-and-conditions.",
      "A registered practitioner decides whether any treatment is appropriate for you. Program fees apply.",
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
      "A minimum commitment of three months applies, and the code cannot be combined with other promotions (Moshy's sign-up page, read 30 September 2026).",
      "A registered practitioner decides whether any treatment is appropriate for you. Program fees apply.",
    ],
    href: MOSHY_URL,
    sponsored: true,
    code: "REFERRAL120",
    offerText:
      "REFERRAL120 is a discount on a new customer's first Moshy order, with a three-month minimum commitment. Our link carries REFERRAL120; enter it at checkout if it isn't shown.",
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
