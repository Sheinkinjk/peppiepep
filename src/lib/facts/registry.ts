import type { Fact, FactKind } from './types';

/**
 * The observation log.
 *
 * PROVENANCE RULE, and it is the whole point of this file: no record was
 * created because a fact seemed true, and no `observedAt` was inferred from a
 * file date, a git commit or a build timestamp. Every record names where its
 * date came from, in a `// Source:` comment, and there are exactly two ways it
 * can have come:
 *
 *   1. Transcribed from a dated observation already published on this site.
 *      The comment quotes the sentence and names the page. Eight records.
 *   2. Created from a live reading of the provider's own page on the stated
 *      day. The comment names the URL read and says it was a reading rather
 *      than a transcription, because the two are different evidence and a
 *      reader cannot tell them apart from the record alone. Six records, all
 *      from the re-check of 26 August 2026.
 *
 * A record with no `// Source:` comment is a bug. It means nobody can tell
 * whether the observation happened, which makes the whole log worthless.
 *
 * Facts published without an explicit date were skipped rather than
 * back-filled. Several were: the federal rebate figures on the Apollo pages
 * carry a scheme commencement date (1 May 2026) rather than a date we read
 * them, and the SolarQuotes cost bands carry that publisher's update date
 * (12 May 2026) rather than ours. Neither is an observation of ours, so
 * neither is here. The ABS renter share on the portable power page does carry
 * a read date, but its subject is a statistical release rather than a provider
 * offer, so it does not fit any of the four kinds.
 *
 * Fourteen records: eight transcribed, six read live. `sourceUrl` is populated
 * only where the URL belongs on the page as a public link. The three health
 * records read on 26 August were read off referral landing pages, so their URL
 * is named in the comment and left out of the field: it would render on /data
 * as an undisclosed affiliate link. *
 * NOT IN THIS LOG: claims awaiting verification. Those live in
 * PENDING_VERIFICATION at the foot of this file, because they have no day a
 * person read them, and a record without that day is not an observation.
 */
export const FACTS: Fact[] = [
  // ── hair-loss ────────────────────────────────────────────────────────────
  {
    id: 'mosh-policy-2026-08-14',
    kind: 'policy_reading',
    hub: 'hair-loss',
    subject: 'Mosh',
    observedAt: '2026-08-14',
    observedBy: 'jarred',
    method: "Read the published terms on Mosh's own site.",
    claim:
      'Mosh published a 180-day money-back guarantee and a price-match guarantee on substantially comparable programs.',
    // Source: /moshhair "Checked on Mosh's own site, 14 August 2026."
  },
  {
    id: 'mosh-offer-2026-08-17',
    kind: 'offer_observation',
    hub: 'hair-loss',
    subject: 'Mosh',
    observedAt: '2026-08-17',
    observedBy: 'jarred',
    method: "Verified the offer on Mosh's own page.",
    claim: 'Mosh gave Refer Labs readers 55% off a first order through the link on this site.',
    value: 55,
    unit: 'percent off first order',
    // Source: /hair-loss-treatment-cost-australia "(verified on Mosh's own page, 17 August 2026)."
  },

  // ── weight-loss ──────────────────────────────────────────────────────────
  {
    id: 'juniper-availability-2026-07-21',
    kind: 'availability_check',
    hub: 'weight-loss',
    subject: 'Juniper',
    observedAt: '2026-07-21',
    observedBy: 'jarred',
    method: "Checked Juniper's own site for published pricing while sourcing the comparison table.",
    claim: 'Juniper published no pricing publicly at the time of the check.',
    // Source: /best-weight-loss-telehealth-australia sources line, 21 July 2026.
  },
  {
    id: 'moshy-price-2026-08-14',
    kind: 'price_observation',
    hub: 'weight-loss',
    subject: 'Moshy',
    observedAt: '2026-08-14',
    observedBy: 'jarred',
    method: "Read the advertised starting price on Moshy's own site.",
    claim: 'Moshy advertised its program from $229 a month on its own site.',
    value: 229,
    unit: 'AUD per month',
    // Source: /moshy and /weight-loss-telehealth-cost-australia "checked 14 August 2026."
  },
  {
    id: 'moshy-offer-2026-08-17',
    kind: 'offer_observation',
    hub: 'weight-loss',
    subject: 'Moshy',
    observedAt: '2026-08-17',
    observedBy: 'jarred',
    method: "Verified the code and its stated terms against Moshy's own sign-up page.",
    claim:
      "The code REFERRAL120 took $120 off a new customer's first order, one use per customer, on a practitioner-assigned weight-loss program.",
    value: 120,
    unit: 'AUD off first order',
    // Source: /moshy "verified against Moshy's own sign-up page on 17 August 2026."
  },

  // ── solar-energy ─────────────────────────────────────────────────────────
  {
    id: 'ecoflow-price-2026-08-24',
    kind: 'price_observation',
    hub: 'solar-energy',
    subject: 'EcoFlow',
    observedAt: '2026-08-24',
    observedBy: 'jarred',
    method: "Read every listed model price off EcoFlow's own Australian store.",
    sourceUrl: 'https://au.ecoflow.com/',
    claim: 'EcoFlow listed portable power stations from A$299 to A$7,299 on its Australian store.',
    // Source: /ecoflow "Prices were read off EcoFlow's own Australian store on 24 August 2026."
  },
  {
    id: 'anker-solix-price-2026-08-24',
    kind: 'price_observation',
    hub: 'solar-energy',
    subject: 'Anker SOLIX',
    observedAt: '2026-08-24',
    observedBy: 'jarred',
    method: "Read every listed model price off Anker SOLIX's own Australian store.",
    sourceUrl: 'https://www.ankersolix.com/au',
    claim: 'Anker SOLIX listed portable power stations from A$449 to A$5,399 on its Australian store.',
    // Source: /anker-solix "Prices were read off Anker SOLIX's own Australian store on 24 August 2026."
  },
  {
    id: 'anker-solix-availability-2026-08-24',
    kind: 'availability_check',
    hub: 'solar-energy',
    subject: 'Anker SOLIX',
    observedAt: '2026-08-24',
    observedBy: 'jarred',
    method: "Read the promotion banner on Anker SOLIX's Australian site while recording prices.",
    sourceUrl: 'https://www.ankersolix.com/au',
    claim:
      'Anker SOLIX advertised a sale of up to 55% off running 17 August to 7 September 2026, and showed a single price rather than a struck-through one on each power station.',
    // Source: /anker-solix "when we read these prices on 24 August 2026 its Australian site was advertising up to 55% off."
  },

  // ── re-check of 26 August 2026 ───────────────────────────────────────────
  // Second observations, each superseding the prior record for the same subject
  // and kind. Every claim below is identical to the one it supersedes, which is
  // the point: an unchanged claim on a new date is evidence the figure held, and
  // it is only evidence if the re-check actually happened.
  //
  // Unlike the eight above, these were not transcribed from copy published on
  // this site: each was created from opening the provider's own page on
  // 26 August 2026 and reading it. Each comment names the URL that was read.
  {
    id: 'mosh-offer-2026-08-26',
    kind: 'offer_observation',
    hub: 'hair-loss',
    subject: 'Mosh',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Read the offer on Mosh's own hair-loss page.",
    claim: 'Mosh gave Refer Labs readers 55% off a first order through the link on this site.',
    supersedes: 'mosh-offer-2026-08-17',
    // Source: read live from https://www.getmosh.com.au/start/referlabs on
    // 26 August 2026. Created from that reading, not transcribed from copy
    // published on this site. URL kept out of `sourceUrl`: it is a referral
    // landing page and would render on /data as an undisclosed affiliate link.
  },
  {
    id: 'moshy-offer-2026-08-26',
    kind: 'offer_observation',
    hub: 'weight-loss',
    subject: 'Moshy',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Read the offer on Moshy's own sign-up page.",
    claim:
      "The code REFERRAL120 took $120 off a new customer's first order, one use per customer, on a practitioner-assigned weight-loss program.",
    supersedes: 'moshy-offer-2026-08-17',
    // Source: read live from
    // https://www.getmoshy.com.au/start/eligibility-check-moshy on 26 August
    // 2026. Created from that reading, not transcribed from copy published on
    // this site. URL kept out of `sourceUrl` for the same reason as the Mosh
    // record above.
  },
  {
    id: 'juniper-availability-2026-08-26',
    kind: 'availability_check',
    hub: 'weight-loss',
    subject: 'Juniper',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Looked for published pricing on Juniper's own site.",
    claim: 'Juniper published no pricing publicly at the time of the check.',
    supersedes: 'juniper-availability-2026-07-21',
    // Source: read live from https://www.myjuniper.com on 26 August 2026, the
    // live site (myjuniper.com.au is parked). Created from that reading, not
    // transcribed from copy published on this site. A null result: the check
    // is that no price was published, so there is no figure to cite.
  },
  {
    id: 'ecoflow-price-2026-08-26',
    kind: 'price_observation',
    hub: 'solar-energy',
    subject: 'EcoFlow',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Read the portable power station range off EcoFlow's Australian store.",
    sourceUrl: 'https://au.ecoflow.com/',
    claim: 'EcoFlow listed portable power stations from A$299 to A$7,299 on its Australian store.',
    supersedes: 'ecoflow-price-2026-08-24',
    // Source: read live from https://au.ecoflow.com/ on 26 August 2026. Created
    // from that reading, not transcribed from copy published on this site. The
    // range was unchanged from the 24 August reading it supersedes.
  },
  {
    id: 'anker-solix-price-2026-08-26',
    kind: 'price_observation',
    hub: 'solar-energy',
    subject: 'Anker SOLIX',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Read the portable power station range off Anker SOLIX's Australian store.",
    sourceUrl: 'https://www.ankersolix.com/au',
    claim: 'Anker SOLIX listed portable power stations from A$449 to A$5,399 on its Australian store.',
    supersedes: 'anker-solix-price-2026-08-24',
    // Source: read live from https://www.ankersolix.com/au on 26 August 2026.
    // Created from that reading, not transcribed from copy published on this
    // site. The range was unchanged from the 24 August reading it supersedes.
  },
  {
    id: 'anker-solix-availability-2026-08-26',
    kind: 'availability_check',
    hub: 'solar-energy',
    subject: 'Anker SOLIX',
    observedAt: '2026-08-26',
    observedBy: 'jarred',
    method: "Checked the sale banner and price presentation on Anker SOLIX's Australian store.",
    sourceUrl: 'https://www.ankersolix.com/au',
    claim:
      'Anker SOLIX advertised a sale of up to 55% off running 17 August to 7 September 2026, and showed a single price rather than a struck-through one on each power station.',
    supersedes: 'anker-solix-availability-2026-08-24',
    // Source: read live from https://www.ankersolix.com/au on 26 August 2026,
    // the same visit that produced the price record above. Created from that
    // reading, not transcribed from copy published on this site. The banner and
    // the single-price presentation were unchanged from 24 August.
  },
];

const byObservedAt = (a: Fact, b: Fact) => a.observedAt.localeCompare(b.observedAt);

/** Every fact for a hub, optionally narrowed to one subject. */
export function factsFor(hub: Fact['hub'], subject?: string): Fact[] {
  return FACTS.filter((f) => f.hub === hub && (subject === undefined || f.subject === subject));
}

/** Every observation of one subject and kind, oldest first. */
export function historyOf(subject: string, kind: FactKind): Fact[] {
  return FACTS.filter((f) => f.subject === subject && f.kind === kind).sort(byObservedAt);
}

/** The most recent observation of one subject and kind, or null. */
export function latest(subject: string, kind: FactKind): Fact | null {
  const series = historyOf(subject, kind);
  return series.length > 0 ? series[series.length - 1] : null;
}

/** Distinct subjects observed within a hub, in first-seen order. */
export function subjectsIn(hub: Fact['hub']): string[] {
  return Array.from(new Set(FACTS.filter((f) => f.hub === hub).map((f) => f.subject)));
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * NOT OBSERVATIONS. Claims the site makes that nobody at Refer Labs has read off
 * a public page, logged so they are tracked rather than trusted.
 *
 * Kept out of FACTS on purpose. A Fact's `observedAt` is the day a person read
 * the thing, and /data publishes FACTS as dated checks. These have no such day,
 * so putting them in FACTS would publish an unverified claim as something we
 * checked. Nothing imports this list: it is a register, not a source for any
 * page, and it must stay that way.
 *
 * A claim leaves this list in one of three ways: verified against a public page
 * (it becomes a Fact with a real `observedAt` and a `// Source:` comment),
 * confirmed with the partner directly, or corrected on the pages making it.
 *
 * A missing public source is a sourcing gap, not proof an offer does not exist.
 * The partner relationship is Jarred's to confirm; nothing on a page listed here
 * changes until it is resolved.
 */
export interface PendingClaim {
  id: string;
  subject: string;
  /** The claim as the site states it. */
  claim: string;
  /** Where the claim came from, and what it has not been verified against. */
  source: string;
  /** ISO date the claim was logged as pending. Not an observation date. */
  loggedAt: string;
  /** Pages making the claim at the time it was logged. */
  pages: string[];
  /** Places outside a page body that also make the claim: shared nav, metadata,
   *  email templates. Found on rendered output and by search, not by page file. */
  otherSurfaces?: string[];
  /** Who is resolving it, and how. */
  owner: string;
}

/*
 * RESOLVED, 14 Sep 2026: 'juniper-free-first-consultation-pending-2026-09-13'.
 * "Free first consultation when you start via our link" was logged on 13 Sep
 * (source: Juniper affiliate handbook, 6 Aug, with no public page stating it).
 * Jarred confirmed it with Juniper directly and it is true. It left this list by
 * the second route above (confirmed with the partner), so it is NOT a Fact: no
 * person read it off a public page, and /data must not publish it as a check.
 * The pages and surfaces making the claim are unchanged.
 */
export const PENDING_VERIFICATION: PendingClaim[] = [
  {
    id: 'juniper-jarredkfc-value-2026-09-23',
    subject: 'Juniper',
    claim:
      'The code JARREDKFC waives the initial Juniper consultation, valued at $89, so a new patient pays $0 to be assessed. Juniper promotes $50 off the first month via START50 on its own site.',
    source:
      "Jarred, 23 Sep 2026. The SUBSTANCE is already confirmed and published: 'Juniper gives new patients a free first consultation' was confirmed by Jarred with Juniper on 14 Sep 2026 (see the resolved note above). Two things are not: the $89 valuation, and whether the waiver is conditional on the code JARREDKFC or is a general Juniper offer. Checked on Juniper's own surfaces 23 Sep 2026 and neither is public: myjuniper.com rendered with the code in the query string shows only 'Save $50 with code START50'; the Bundle & Save terms give START50 as $50 off the first month against a $249 initial payment; the Discount Terms article names no code values and says codes cannot be combined with other offers; a help-centre search for '89' returns nothing. The note beside JUNIPER_URL saying the code gives 'NO discount' is consistent with this: a waived consultation fee is not money off the treatment. It is not a contradiction, and this entry previously described it as one.",
    loggedAt: '2026-09-23',
    pages: [],
    otherSurfaces: [],
    owner:
      "Jarred, from the Juniper affiliate handbook, which is NOT in this repo (the same gap was raised as open question 1 in reports/audit-2026-09-03.md). Needed from it: whether publishing the code is permitted at all, whether the $89 consultation value may be stated, and whether the waiver is tied to the code. THE COST OF LEAVING THIS: four surfaces currently tell readers and AI engines that Juniper offers a free consultation *instead of a code*, including /moshy-vs-juniper, the site's best live comparison page. If the code exists, those sentences are wrong on the page most likely to be cited, and no engine can quote a Juniper code because we publish none. Word it as a waived consultation, never as '$89 off': per the PetsOnMe precedent the object of the discount must be stated exactly.",
  },
];
