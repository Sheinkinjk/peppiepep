# Refer Labs — AI Search Trust Implementation Spec

**Companion to** `research/ai-search-trust-strategy-2026-09-15.md`. **Prepared 15 September 2026.** Nothing here has been built.

File paths come from the codebase audit of 15 September 2026, checked against source and live output. Build each item as its own commit. Run `npm run build` (prebuild and postbuild guards), `npm run check-offers` and `npm run check-aeo`, then verify on the live site per CLAUDE.md.

Every item must respect the CLAUDE.md rules:
- no medicine names (TGA);
- no invented ratings, personas or testimonials (ACL s29);
- no hedged prices;
- the AI-slop rule;
- the answer-slot rule;
- partner claims confirmed with Jarred before publishing.

**Legend.** Each item lists: Files · New component · New data field · New page · New content · Schema · Internal links · Metadata. **Decision** marks items that need Jarred's sign-off first.

---

## P0 — Make every trust statement true (days 0-14)

### P0.1 "Active ✓" only when an offer is actually current
- **Files:** `src/components/lending/OffersTable.tsx` (the status cell, around line 63); `src/components/affiliate/PremiumAffiliateLanding.tsx` (stamp around line 151: "Checked & verified by Refer Labs, <Month>"); `src/components/offers/CodeAnswer.tsx`.
- **New data field:** none (uses P1.1 fields once they exist). Interim: derive status from `verified` age.
- **New content:** status values **Current** (checked within the window) · **Re-check due** · **Not recorded**. Replace "Checked & verified by Refer Labs, {Month}" with "Last checked {date}" and the verification level.
- **Guard:** extend `scripts/check-offer-wiring.mjs`, or add `scripts/check-offer-freshness.mjs` to prebuild. Warn when an offer is past its window; fail when it is past its expiry.

### P0.2 Correct the "read off the provider's own page" claims
- **Files:**
  - `src/app/disclaimer/page.tsx` (FAQ around line 43; body around line 126)
  - `public/llms.txt` (the /deals line; the hedged "~US$29" FullEnrich line)
  - `src/components/offers/CodeAnswer.tsx` (prints "read off {brand}'s own page" for all brands)
  - `src/components/lending/OffersTable.tsx` footnote
- **New content:** "Each offer shows how we checked it: read on the provider's own page, confirmed with the provider in writing, or tested at checkout, with the date."
- **Data:** `DEALS[].source.noPublicPage` already marks Apollo, Unbounce, Superfiliate, Knose and PetsOnMe. Render from it.

### P0.3 Schema that matches the page
- **Files:**
  - `src/lib/offers.ts` → `offerSchema()`. The discount amount must stop populating `Offer.price`. Either omit the price or model the discount via `priceSpecification` with a clear description. Never state the discount as the service price.
  - `src/app/layout.tsx` and `src/components/StructuredData.tsx` → Organization `areaServed` becomes AU only.
  - `src/app/moshy/page.tsx` (dates around lines 34-35) → `datePublished` / `dateModified` from `src/lib/page-dates.ts` (git), not literals. Trim the 8 `about` entries to the real subject.
  - `src/app/hair-loss/page.tsx` → stale `dateModified`.
  - `src/lib/seo.ts` lines 29-30 (author and publisher constants) → see P1.4.
- **Guard:** a postbuild check that `dateModified` ≥ `datePublished`, and that `datePublished` is not before the route's first commit date from page-dates.

### P0.4 Footer identity and reader contact
- **Files:** `src/components/consumer/ConsumerShell.tsx` (footer).
- **New content:** "Pepform Pty Ltd (ABN 32 660 008 159) trading as Refer Labs · Melbourne, Victoria · Corrections · Contact". The contact link goes to a reader route (P1.6). Only `jarred@referlabs.com.au` receives mail; do not add new inboxes.

### P0.5 Retire the remaining old-SaaS residue
- **Files:**
  - API routes under `src/app/api/{admin,ai,commissions,referral-stats,stripe,webhooks,health,verify-attribution,qr,referred,track-conversion,newsletter,auth/send-confirmation}`
  - `src/app/api/referral-redirect` together with `src/app/r/[code]` (next.config `/r/*` affiliate redirects are unaffected)
  - `src/app/login/page.tsx` pitch copy (keep the sign-in form; `/admin/leads` depends on it)
  - `src/app/terms/page.tsx` legacy account, billing and user-content sections
  - orphans `src/components/status`, `src/components/referred`, `src/lib/stripe-checkout.ts`, `src/lib/campaign-*.ts`
- **Dependency:** the permission to delete was blocked in the previous session; the user must allow it. **Decision:** confirm the Stripe and Resend dashboards have no webhook endpoints pointing at the deleted routes.

### P0.6 Freshness signals that agree
- **Files:** `src/app/sitemap.ts` (hand-tiered lastmod → read `src/lib/page-dates.ts`); `src/app/data/page.tsx` ("weekly" promise → state the real cadence, or keep to it).

---

## P1 — Next 30 days

### P1.1 Offer verification levels (the verified-offer system)
- **Files:** `src/lib/offers.ts` (`Deal` type, `DEALS`, `OfferFacts`, `OFFER_FACTS`); `src/components/lending/OffersTable.tsx`; `src/components/offers/CodeAnswer.tsx`; `src/components/offers/OfferSchema.tsx`; `src/app/deals/page.tsx`; `PremiumAffiliateLanding.tsx`; `src/app/knose/page.tsx`; `src/app/petsonme/page.tsx`; `src/app/moshy/MoshyLanding.tsx`.
- **New data fields on `Deal`:**
  ```ts
  verificationLevel: "published" | "partner-confirmed" | "checkout-tested";
  evidence: {
    url?: string;              // public source (published)
    capturedAt: string;        // ISO date the evidence was captured
    artifact?: string;         // repo-private path to screenshot or PDF (e.g. evidence/offers/moshy-2026-09-20.png, not deployed)
    note?: string;             // e.g. "Email from partner manager, 17 Aug 2026"
  };
  recheckDays: number;         // 30 health codes, 60 others
  expiresOn?: string;          // ISO; absent = no stated expiry
  history: { date: string; change: string; level: Deal["verificationLevel"] }[];
  ```
- **New component:** `src/components/offers/OfferVerification.tsx`. A small block with the level label, date, a "How we check" link to `/methodology#offers`, and a collapsible history. Reuse it in `OffersTable`, `CodeAnswer` and brand pages.
- **Guard:** `scripts/check-offer-freshness.mjs` (prebuild). Fails if `expiresOn` has passed and the offer still renders; warns past `recheckDays`; fails if `checkout-tested` has no `artifact`.
- **Schema:** `Offer.validThrough` from `expiresOn`; `Offer.priceValidUntil` only where a real price exists.
- **Content:** a methodology anchor explaining the three levels (P1.2).

### P1.2 `/methodology` (new page; currently 404)
- **New page:** `src/app/methodology/page.tsx`, server component, ConsumerShell.
- **Content sections:** coverage selection ("we do not compare every provider", per vertical) · fields compared per vertical · primary sources and dating · offer verification levels (`#offers`) · commercial relationships and order · corrections policy (`#corrections`) · what we never publish.
- **Metadata:** `seoConfig.methodology` in `src/lib/seo.ts`; add to `src/app/sitemap.ts`, `/guides`, `src/lib/search-index.ts`.
- **Schema:** WebPage + BreadcrumbList. Organization `publishingPrinciples` → `/methodology` (in `StructuredData.tsx`).
- **Internal links:** from footer, `/about`, every AffiliateDisclosure "How we check" link, and every OfferVerification block.
- **Redirect:** `next.config.ts` line 149 currently sends `/how-we-research` → `/about`. Repoint it to `/methodology` (statusCode 301, no chain).

### P1.3 Complete earnings disclosure and `/partners`
- **Files:** `src/app/how-we-make-money/page.tsx`.
- **New page:** `src/app/partners/page.tsx`. Current commercial relationships by vertical, generated from `DEALS` plus `src/lib/partners/*` plus a `COMMERCIAL` list for non-offer relationships (Apollo lead fees, `/for-business` placements, Commission Factory, PartnerStack). Never hand-maintained prose (CLAUDE.md "generated artefact" rule).
- **New data:** `src/lib/partners/registry.ts` → `{ name, vertical, relationship: "affiliate" | "lead-fee" | "placement", since, pagesAffected[] }`.
- **Content:** replace "two ways" with every revenue type, including "a product we recommend" wording removed (it contradicts "we do not recommend"). Where contracts allow, state the per-lead or per-sale fee in dollars.
- **Guard:** extend `scripts/check-partner-scope.mjs` so every partner rendered on a money page appears in the registry.

### P1.4 Accountable editor (decision)
- **Option A (recommended):** a visible editor.
  - **Files:** `src/lib/entities/authors.ts` (add `bio`, `role`, `sameAs[]`, `jobTitle`, `image?`); `src/app/authors/[id]/page.tsx` (indexable, real bio, remove noindex); `src/app/sitemap.ts` (add author page); `src/components/consumer/EditorialMeta.tsx` ("Researched and checked by Jarred Krowitz, Editor · Last updated …"); `src/lib/seo.ts` author constant.
  - **Content needed from Jarred:** full name, factual bio (what he does and doesn't do; no invented credentials), LinkedIn URL, photo optional.
  - **Schema:** `Person` with `sameAs`; `author` on Article/WebPage only where the line is visible; Organization `founder` → the Person.
- **Option B:** remove `author` from the 83 pages' schema so it matches the no-byline pages.
- **Health reviewer (later, P2):** add a `reviewers` list in `authors.ts` (`ahpraNumber`, `profession`, `reviewedOn`); `reviewedBy` only on pages with a stored review record.

### P1.5 Entity consistency (mostly off-site)
- **Off-site tasks (Jarred):**
  - Register the business name "Refer Labs" on ABN 32 660 008 159 (ASIC Connect).
  - Transfer the auDA registrant of referlabs.com.au to Pepform Pty Ltd.
  - LinkedIn: industry "Online Media" or similar; founded "2025"; description aligned.
  - Facebook: category and slogan aligned; fix the links to `/business-loans` and `/apollo-energy-group-eoi`.
  - ProductReview listing description aligned.
- **Files:** `src/components/StructuredData.tsx` (Organization: keep `foundingDate` 2022 for the legal entity, add `description` "Refer Labs, launched 2025, …", `alternateName` "Refer Labs"; add the business-name ABR link to `sameAs` once registered); `public/llms.txt` identity lines; `src/app/about/page.tsx` identity section.

### P1.6 Reader contact and corrections log
- **New page:** `src/app/corrections/page.tsx`, generated from a `CORRECTIONS` list in `src/lib/facts/registry.ts` (`{ date, page, was, now, source }`). Seed it with real past corrections from git history: Keap price, Pipedrive AU$19, the Pilot retirement, the underwriter update.
- **Files:** `src/app/contact/page.tsx` (add a reader section above the B2B call booking: "Spotted something wrong or out of date? Email jarred@referlabs.com.au"; the same inbox).
- **Metadata / sitemap / search-index:** add `/corrections`.

### P1.7 Internal links into the pages that win citations
- **Pages to strengthen:** `/moshy-vs-juniper`, `/knose-vs-petsonme`, `/who-underwrites-pet-insurance-australia`, `/cheapest-weight-loss-telehealth-australia`, `/hair-loss-treatment-cost-australia`, `/mosh-vs-dense`, `/data`.
- **Files:** hub pages `src/app/{weight-loss,hair-loss,pet-insurance,solar-and-energy}/page.tsx`; brand `config.ts` `relatedLinks`; `src/app/knose/page.tsx`, `src/app/petsonme/page.tsx`, `src/app/moshy/MoshyLanding.tsx`, `src/app/moshhair/config.ts`, `src/app/juniper/page.tsx`.
- **Target:** at least 15 in-content inbound links each. Reduce repeated in-body links to `/how-we-make-money` (84 today) to disclosure components only.
- **Guard (optional):** a `scripts/check-inbound-links.mjs` report (not a failure) listing inbound counts for a named "citation winners" list.

### P1.8 `/data` as a citable dataset
- **Files:** `src/app/data/page.tsx`; `src/lib/facts/registry.ts` and `types.ts`; `src/components/facts/FactHistory.tsx` and `CitableFact.tsx`.
- **New route:** `src/app/data/observations.csv/route.ts` (GET, `text/csv`, generated from `FACTS`); columns `id, provider, vertical, field, value, unit, source_url, read_on, method, verification_level`. No medicine names in any column.
- **New content:** methodology and licence section (CC BY 4.0 for our observations; third-party data keeps its own licence), "How to cite", and non-partner providers added (Juniper, Hims, Everlab, Prenuvo, i-screen, other pet insurers).
- **Schema:** `Dataset` (`name`, `description`, `license` https://creativecommons.org/licenses/by/4.0/, `creator` Organization, `distribution` → DataDownload CSV, `temporalCoverage`, `dateModified`).
- **Internal links:** every page printing a FACTS figure links to its row anchor (`/data#fact-id`).
- **Metadata:** update `seoConfig.data`; llms.txt entry naming the CSV.

---

## P2 — Days 30-90

### P2.1 Telehealth price & terms register
- **New page:** `src/app/data/telehealth-price-register/page.tsx` (or `/health-services/price-register`; check CLAUDE.md "do not build" rules and pick one).
- **New data:** `src/lib/registers/telehealth.ts`: `{ provider, service ("weight management consult" etc., never a medicine), pricePublished: boolean, consultFee, subscriptionFee, inclusions[], minimumTerm, cancellation, practitionerRegistrationChecked: boolean, source, readOn }`. Include non-partners.
- **Guards:** `check-tga-classes` must scan the register; extend `check-price-provenance` to require `readOn` per row.
- **Schema:** Dataset + Table-backed WebPage. **CSV:** `/data/telehealth-register.csv`.
- **Links:** from `/weight-loss`, `/hair-loss`, `/mens-health` hubs and every telehealth provider page.

### P2.2 Home Battery Rebate Tracker
- **New page:** `src/app/home-battery-rebate-tracker/page.tsx`. Or extend `/home-battery-rebate-australia`, which already ranks; prefer extending it to avoid a duplicate.
- **New data:** `src/lib/registers/cer-batteries.ts`, generated by `scripts/fetch-cer-postcode-data.mjs` (monthly, manual run; commit the CSV snapshot with `readOn`). Source: Clean Energy Regulator small-scale installation postcode data, CC BY 4.0 with attribution.
- **Content:** rebate arithmetic for 10, 13.5 and 20 kWh; installs by state and month; the "Indicative only" STC note (the one permitted hedge per CLAUDE.md).
- **Schema:** Dataset. **Links:** Apollo pages, solar hub, `/home-battery-payback-calculator`.

### P2.3 Pet insurance underwriter & PDS change register
- **Files:** extend `src/app/who-underwrites-pet-insurance-australia/page.tsx`.
- **New data:** `src/lib/registers/pet-underwriters.ts`: `{ brand, underwriter, distributor, pdsUrl, pdsVersionDate, readOn, changes: [{date, from, to, source}] }`, including Trupanion → PetSure (23 Mar 2026).
- **Content:** a changelog; do not claim other sources are wrong (insu.au now has it right).
- **Schema:** Dataset. **Links:** `/knose`, `/petsonme`, `/knose-vs-petsonme`, `/best-pet-insurance-australia`, `/pet-insurance`.

### P2.4 Retitle or retire the "Is There One?" pages
- **Files:** `src/lib/seo.ts` titles and descriptions for the 27 no-code brands; each `src/app/<brand>/config.ts` quickAnswer and h1.
- **Rules:**
  - Title leads with what exists ("Pipedrive Pricing in AUD 2026: AU$19/Seat, Free Trial").
  - Keep one explicit sentence for code-seekers.
  - Do not touch title-test pages before the 5 Oct read.
  - Redirect or retire pages with zero impressions and no monetisation route (CLAUDE.md revenue-first rule) as 301s to the closest hub, removed from sitemap and llms.txt.
- **Guard:** `check-aeo` title and h1 agreement.

### P2.5 Homepage and navigation (decision on Coming Soon)
- **Files:** `src/app/page.tsx` (top picks around line 291 → vertical cards with one owned fact each; `categoryCards` line 78; the newsletter heading prop); `src/components/consumer/NewsletterSignup.tsx` (heading default); `src/lib/nav.ts`, `HeaderNav.tsx`, `MobileNav.tsx`; `src/components/StructuredData.tsx` SiteNavigation (must mirror the visible nav).
- **New component:** none. Use the existing card markup; "How we check" is a static strip in `page.tsx`.
- **Content:** vertical facts must be read-dated and sourced (price-provenance guard).

### P2.6 Structured-data additions
- **Files:** `StructuredData.tsx` (Organization `publishingPrinciples`, `founder` Person when P1.4A approved); `/data` Dataset (P1.8); register pages Dataset; `reviewedBy` only with review records (P1.4).
- **Do not add:** AggregateRating, Review, or schema for AI.

---

## P3 — 3-12 months

| Item | Files / new artefacts | Dependency |
|---|---|---|
| Disclosed AHPRA-registered health reviewer | `src/lib/entities/authors.ts` reviewers; `EditorialMeta.tsx` "Reviewed by"; review records in `src/lib/facts/reviews.ts`; contract (off-site) | Decision and budget |
| Battery Quote Check (reader-submitted quotes) | New form route `src/app/api/battery-quote/route.ts` (Supabase table `battery_quotes` with consent, no personal data published); page under `/home-battery-rebate-australia`; publish only n ≥ 30 | P2.2; privacy policy update |
| Offer history pages | `DEALS[].history` rendered on provider pages and `/deals#history` | P1.1 |
| Per-page conversion attribution | `/go/*` logging (`src/lib/go-links.ts` plus a lightweight log route or Vercel Analytics custom events) | Consent rules in memory `consent-and-tracking` |
| Monthly prompt panel log | `research/prompt-panel/YYYY-MM.csv` (query, engine, cited y/n, URL cited, competitor URLs) | none |
| Flagship transparency report | New page under `/data/reports/`; Dataset + Article schema | P2.1-P2.3 live for at least 3 months |

---

## Internal link map (target state)

| From | Must link to |
|---|---|
| Vertical hub | Provider pages; every "vs" page; cost/cheapest guide; owned-fact page; dataset |
| Provider page | Its "vs" pages; vertical cost guide; owned-fact page; `/methodology#offers` via OfferVerification |
| "vs" page | Both provider pages; cost guide; dataset rows used |
| Cost guide | Provider pages; telehealth register or rebate tracker; `/data` rows |
| Owned-fact page | Providers named; dataset CSV; `/corrections` for changes |
| Footer (site-wide) | `/about`, `/methodology`, `/how-we-make-money`, `/partners`, `/corrections`, `/data`, contact |

## Metadata checklist per new page
- `seoConfig.<key>` in `src/lib/seo.ts` (title, description, canonical); sitemap entry; `/guides`; `src/lib/search-index.ts`; category hub link; llms.txt line if it is a data or trust page.
- Answer-first lead (the `check-answer-slot` guard), buyer's question as H2, every figure with source and date.
- `ChromeGate.tsx` list if the page uses ConsumerShell.

## Verification after each deploy
`npm run verify:deploy` → curl the live page for the changed strings → IndexNow for changed URLs → re-run the relevant row of the prompt panel after 2-4 weeks.
