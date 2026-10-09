/**
 * What Hims and Mosh each say they include, read off each provider's own public
 * pages on 30 September 2026, re-read on 2 October and again for V2 on 9 October 2026. One source of truth for the comparison pages,
 * on the pattern of src/lib/compare/weight-inclusions.ts.
 *
 * Rules for every cell:
 *  - only what the provider states on its own page, read on INCLUSIONS_READ_ON;
 *  - no prices (Jarred, 27 and 29 Sep 2026);
 *  - no treatment, shipping or supply wording, no plan names that are efficacy
 *    words (TGA service wording, 30 Sep 2026);
 *  - no code minimums or terms links: those are fine print and sit only in FAQ
 *    answers and the offer-terms note at the foot of the page (1-2 Oct 2026);
 *  - a fact that could not be read today is dropped. A cell that must exist but
 *    cannot be filled yet is `null`, which renders a muted "To be added".
 *
 * Columns are alphabetical (Hims, Mosh) and there is no winner column.
 */
export const INCLUSIONS_READ_ON = "9 October 2026";

export type InclusionsKey = "overview" | "weight" | "hair" | "ed";

export type InclusionRow = {
  label: string;
  hims: string;
  mosh: string | null;
  /** Preview flag beside the Hims cell (a placeholder Hims has not confirmed). */
  himsFlag?: string;
  /** Preview flag beside the Mosh cell. A null Mosh cell renders a muted "To be added". */
  moshFlag?: string;
};

export type InclusionsTableData = {
  rows: InclusionRow[];
  sources: { hims: { label: string; url: string }[]; mosh: { label: string; url: string }[] };
};

// Shared cells. Declared once so a change moves every table together.
const HIMS_START = "Free online quiz of about two minutes, then a phone consultation with an Australian practitioner";
const HIMS_PRACTITIONERS = "AHPRA-registered practitioners based in Australia";
// V2 (9 Oct 2026): Hims asked for "Free consultation with code REFERLABS" in place of
// the refund wording, since the code removes the consult fee.
const HIMS_CONSULT_FEE = "Free consultation with code REFERLABS";
const HIMS_HOURS = "Consultations from 7am to 11pm AEST, seven days";
const HIMS_MEDICARE = "Not claimable on Medicare (Hims FAQ)";

const MOSH_START = "Free online quiz, then a consultation by call, video or text";
const MOSH_PRACTITIONERS =
  "AHPRA-registered medical practitioners and nurse practitioners based in Australia, paid on a fee-for-service basis";
const MOSH_CONSULT_FEE = "No charge for the initial consultation; program fees apply";

// The Refer Labs offer row, as supplied by Hims (V2, 9 Oct 2026).
const HIMS_OFFER_CELL = "REFERLABS: free consultation for new patients, exclusive to Refer Labs";
const HIMS_OFFER_CELL_WEIGHT = "REFERLABS89: free consultation ($89 value) for new patients, exclusive to Refer Labs";
const HIMS_OFFER_CELL_ED = "REFERLABS: free consultation for new patients, exclusive to Refer Labs";
const MOSH_HAIR_OFFER_CELL = "REFERAL55: a discount on a new customer's first hair order";

const HIMS_SRC = {
  weight: { label: "hims.com.au/weight-loss", url: "https://hims.com.au/weight-loss" },
  hair: { label: "hims.com.au/hair-loss", url: "https://hims.com.au/hair-loss" },
  ed: { label: "hims.com.au/erectile-dysfunction", url: "https://hims.com.au/erectile-dysfunction" },
  faq: { label: "hims.com.au/faq", url: "https://hims.com.au/faq" },
};
const MOSHY_SRC = {
  home: { label: "getmoshy.com.au", url: "https://www.getmoshy.com.au/" },
  weight: { label: "getmoshy.com.au/weight-loss", url: "https://www.getmoshy.com.au/weight-loss" },
};
const MOSH_SRC = {
  home: { label: "getmosh.com.au", url: "https://www.getmosh.com.au/" },
  pricing: { label: "getmosh.com.au/pricing", url: "https://www.getmosh.com.au/pricing" },
  weight: { label: "getmosh.com.au/weight-loss", url: "https://www.getmosh.com.au/weight-loss" },
  hair: { label: "getmosh.com.au/hair-loss", url: "https://www.getmosh.com.au/hair-loss" },
  ed: { label: "getmosh.com.au/erectile-dysfunction", url: "https://www.getmosh.com.au/erectile-dysfunction" },
  referlabs: { label: "getmosh.com.au/start/referlabs", url: "https://www.getmosh.com.au/start/referlabs" },
};

export const INCLUSIONS: Record<InclusionsKey, InclusionsTableData> = {
  overview: {
    rows: [
      {
        label: "Ownership",
        hims: "Formerly Pilot. Part of Hims & Hers Health, which completed its purchase of Eucalyptus on 2 June 2026",
        mosh: "Australian owned. Lists Moshy and Healthy Mummy as its brands",
      },
      { label: "Programs", hims: "Weight loss, hair loss and sexual health", mosh: "Hair loss, sexual health, mental health and skin; weight loss through Moshy, its partner brand" },
      { label: "How you start", hims: HIMS_START, mosh: MOSH_START },
      { label: "Consult fee", hims: "Free consultation with a Refer Labs code: REFERLABS89 for weight, REFERLABS for hair and sexual health", mosh: MOSH_CONSULT_FEE },
      { label: "Practitioners", hims: HIMS_PRACTITIONERS, mosh: MOSH_PRACTITIONERS },
      {
        label: "Support after you start",
        hims: "Unlimited practitioner check-ins and 24-hour Care Team access from your phone",
        mosh: "Unlimited medical follow-ups",
      },
      {
        label: "Stopping",
        hims: "Pause, delay or cancel from your profile",
        mosh: "Cancel anytime",
      },
      {
        label: "Money-back",
        hims: "Weight: 30 days. Hair: 180 days on select hair plans. T&Cs apply: hims.com.au/terms-and-conditions",
        mosh: "Weight (through Moshy): 30 days. Hair: 180 days on quarterly programs. Under each brand's terms",
      },
      { label: "Prices", hims: "Weight pricing on Hims' weight page; hair and sexual health after the consult", mosh: "Published on Mosh's pricing page" },
      { label: "Refer Labs code", hims: "REFERLABS89 for weight; REFERLABS for hair and sexual health. Each a free consultation for new patients", mosh: MOSH_HAIR_OFFER_CELL },
    ],
    sources: { hims: [HIMS_SRC.weight, HIMS_SRC.hair, HIMS_SRC.ed, HIMS_SRC.faq], mosh: [MOSH_SRC.home, MOSH_SRC.pricing, MOSH_SRC.weight, MOSH_SRC.hair, MOSH_SRC.referlabs] },
  },

  // Weight compares Hims with Moshy, Mosh's partner brand for weight (Jarred, 30 Sep
  // 2026). Moshy cells are the facts in src/lib/compare/weight-inclusions.ts, read off
  // getmoshy.com.au/weight-loss the same day. The `mosh` field holds the Moshy cell.
  weight: {
    rows: [
      {
        label: "Who it is for",
        hims: "Hims weight plans are designed for men",
        mosh: "An online women's health clinic by its own description; open to anyone a practitioner assesses as suitable",
      },
      { label: "How you start", hims: HIMS_START, mosh: "Free online quiz, then a consult by phone or video" },
      {
        label: "Commitment",
        hims: "Choose a monthly plan you can change or cancel at any time, or a 12-month plan paid upfront for the lowest first-month price",
        mosh: "No lock-in contracts, by Moshy's own description; a code can carry its own minimum term, set out in the offer terms at the foot of this page",
      },
      {
        label: "Money-back",
        hims: "30-day money-back guarantee. T&Cs apply: hims.com.au/terms-and-conditions",
        mosh: "30-day money-back guarantee. Terms apply",
      },
      {
        label: "Practitioner and care team",
        hims: "Unlimited practitioner check-ins and a 24/7 Care Team of practitioners, health coaches and pharmacists",
        mosh: "Unlimited medical support from a care team of medical practitioners, nurses, pharmacists, psychologists, dietitians and exercise physiologists",
      },
      {
        label: "Coaching and nutrition",
        hims: "Unlimited practitioner check-ins, nutrition guidance from the Care Team, and an optional online community",
        mosh: "In-app health coaching, dietitian-approved meal plans and recipes, and a community",
      },
      { label: "How it is priced", hims: "Weight pricing on Hims' weight page", mosh: "An all-inclusive program fee published on Moshy's site" },
      {
        label: "Refer Labs code",
        hims: HIMS_OFFER_CELL_WEIGHT,
        mosh: "REFERRAL120: a discount on a new customer's first Moshy order",
      },
    ],
    sources: { hims: [HIMS_SRC.weight, HIMS_SRC.faq], mosh: [MOSHY_SRC.weight, MOSHY_SRC.home] },
  },

  hair: {
    rows: [
      { label: "How you start", hims: HIMS_START, mosh: MOSH_START },
      { label: "Consult fee", hims: HIMS_CONSULT_FEE, mosh: MOSH_CONSULT_FEE },
      {
        label: "Money-back",
        hims: "180-day money-back guarantee on select hair plans. T&Cs apply: hims.com.au/terms-and-conditions",
        mosh: "180-day money-back guarantee on quarterly hair programs. Terms apply",
      },
      {
        label: "Support",
        hims: "Unlimited practitioner check-ins, a 24-hour Care Team of nurses, pharmacists and practitioners, and plan changes on request",
        mosh: "Unlimited access to your practitioner by text, call or video",
      },
      {
        label: "Stopping",
        hims: "Cancel before your next order is processed, with no cancellation fee",
        mosh: "Cancel anytime",
      },
      { label: "Price match", hims: "Not advertised", mosh: "On substantially comparable hair programs, by application form. Terms apply" },
      { label: "Prices", hims: "Shown after the consultation, before you pay", mosh: "Published on Mosh's pricing page" },
      { label: "Refer Labs code", hims: HIMS_OFFER_CELL, mosh: MOSH_HAIR_OFFER_CELL },
    ],
    sources: { hims: [HIMS_SRC.hair, HIMS_SRC.faq], mosh: [MOSH_SRC.hair, MOSH_SRC.referlabs, MOSH_SRC.pricing, MOSH_SRC.home] },
  },

  // PLACEHOLDER (Jarred, 1 Oct 2026): Mosh has not supplied its ED details, so every
  // Mosh cell is null and renders "To be added". Fill the `mosh` cells and
  // `sources.mosh` when Mosh supplies them (see the note on MOSH.ed in config.ts).
  ed: {
    rows: [
      { label: "How you start", hims: HIMS_START, mosh: null },
      { label: "Consultation format", hims: `Phone. ${HIMS_HOURS}`, mosh: null },
      { label: "Practitioners", hims: HIMS_PRACTITIONERS, mosh: null },
      { label: "Consult fee", hims: HIMS_CONSULT_FEE, mosh: null },
      { label: "Contract", hims: "No lock-in contracts; pause or cancel at any time", mosh: null },
      { label: "Support", hims: "Unlimited practitioner check-ins and a 24-hour Care Team of nurses, pharmacists and practitioners", mosh: null },
      { label: "Medicare", hims: HIMS_MEDICARE, mosh: null },
      { label: "Refer Labs code", hims: HIMS_OFFER_CELL_ED, mosh: null },
    ],
    sources: { hims: [HIMS_SRC.ed, HIMS_SRC.faq], mosh: [] },
  },
};
