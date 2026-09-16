# SEO deep dive

**Date:** 7 September 2026
**Read-only.** No website files edited, nothing committed, nothing deployed.

---

## The export your brief describes is not on this machine

Every aggregate in the brief was searched for across `~/Desktop`, `~/Downloads` and `~/Documents`. **None of the figures appears in any file.** The only matches for `13,531` and `10,298` are incidental hits inside minified JavaScript and an unrelated Polymarket JSON.

What does exist is an **archived Search Console pull** at
`/Users/jarredkrowitz/Desktop/GEOMG.AI/archives/searchable-referlabs.com.au-2026-08-13T04-57-49/`, containing `gsc-overview.json`, `gsc-top-pages.json` (193 page rows) and `gsc-top-queries.json` (250 query rows).

**It is a different window and a materially different dataset.** Window: **12 July to 10 August 2026** (29 days). Site: `sc-domain:referlabs.com.au`. Totals: **166 clicks, 16,850 impressions, CTR 0.99%, average position 26.09**.

| Brief says | This archive says |
|---|---|
| 43 pages @ 11-20, **13,531** impressions, 111 clicks | **48** pages @ 11-20, **3,685** impressions, **50** clicks |
| 56 pages @ 41+, **10,298** impressions, 8 clicks | **47** pages @ 41+, **4,099** impressions, **0** clicks |
| 10 pages @ 1-5, **39** impressions | **15** pages @ 1-5, **231** impressions, 16 clicks |
| `/best-crm-small-business-australia`: **1,487** impressions @ **66** | **342** impressions @ **70.5** |

The brief's three bands sum to roughly 23,868 impressions, which exceeds this archive's entire 16,850. Your export covers a longer window, almost certainly 90 days, and is not on disk.

**Everything in Sections 1 to 5 below is computed on the 29-day archive, not on your export.** The shape of the findings should hold; the magnitudes will not. Sections 6 and 7 need no Search Console data and are computed directly from the repository, so they are unaffected.

Also present and unexamined here: `ga4-top-pages.json` and `ga4-traffic-sources.json` in the same archive, which bear on the traffic-attribution question raised in earlier work.

---

## SECTION 1 - Striking distance, position 11-20

**48 pages, 3,685 impressions, 50 clicks, CTR 1.36%.**

Ranked by opportunity, defined as `impressions x (position - 8) / position`: the impressions recoverable if the page reached roughly position 8.

| Path | Impr | Clicks | Pos | CTR | Opportunity |
|---|---|---|---|---|---|
| `/moshhair` | 327 | 3 | 16.6 | 0.92% | **170** |
| `/moshy-review` | 349 | 8 | 13.5 | 2.29% | **142** |
| `/moshy` | 270 | 15 | 16.6 | 5.56% | **140** |
| `/mosh-vs-dense` | 383 | **0** | 11.4 | 0.00% | **115** |
| `/best-peptide-supplier` | 363 | 10 | 11.5 | 2.75% | **112** |
| `/best-newsletter-platform` | 262 | **0** | 13.3 | 0.00% | 104 |
| `/blog/best-affiliate-programs-australia-2026` | 312 | 4 | 11.3 | 1.28% | 90 |
| `/incomelab` | 137 | 0 | 18.9 | 0.00% | 79 |
| `/juniper` | 211 | 1 | 12.6 | 0.47% | 77 |
| `/databox` | 88 | 0 | 16.8 | 0.00% | 46 |
| `/business-loans/shift` | 61 | 1 | 18.7 | 1.64% | 35 |
| `/recurring-affiliate-programs` | 75 | 0 | 14.0 | 0.00% | 32 |
| `/swipepages` | 65 | 0 | 15.1 | 0.00% | 31 |
| `/hair-loss-treatment-cost-australia` | 108 | **0** | 11.1 | 0.00% | 30 |
| `/guides` | 73 | 0 | 13.2 | 0.00% | 29 |
| `/business-loans/lumi/review` | 51 | 0 | 18.2 | 0.00% | 29 |
| `/beehiiv` | 38 | 0 | 18.2 | 0.00% | 21 |
| `/blinq` | 33 | 0 | 17.9 | 0.00% | 18 |
| `/outgrow` | 28 | 0 | 18.3 | 0.00% | 16 |
| `/durable-vs-butternut` | 32 | 0 | 13.9 | 0.00% | 14 |
| `/minoxidil-australia` | 40 | **0** | 11.8 | 0.00% | 13 |
| `/zoominfo` | 27 | 0 | 14.3 | 0.00% | 12 |
| `/apollo-energy-group` | 26 | 2 | 15.3 | 7.69% | 12 |
| `/for-business` | 35 | 2 | 11.7 | 5.71% | 11 |
| `/polymarket/optimising-edge` | 27 | 1 | 12.0 | 3.70% | 9 |

**Three pages in this band carry a partner code or link and draw zero clicks:** `/mosh-vs-dense` (383 impressions, 0 clicks, position 11.4), `/hair-loss-treatment-cost-australia` (108, 0, 11.1), `/minoxidil-australia` (40, 0, 11.8). `/minoxidil-australia` is a slug the TGA sweep was meant to retire.

**`/moshy` is the CTR outlier in the band:** 5.56% at position 16.6, four times the band average, on a query set where the brand name and the code are both in the title.

### What I could not determine

**The per-page query breakdown, competitor SERP analysis, backlinks and freshness comparison the brief asks for are NOT COMPUTABLE from the available data.**

- **Queries driving each page's impressions:** `gsc-top-queries.json` carries only `query, clicks, impressions, ctr, position`. **It has no page dimension.** A query-to-page join is impossible from this archive. It requires a GSC export with both dimensions, or the API called with `dimensions=['page','query']`.
- **What currently outranks each page:** requires live SERP data for each query, in Australia. Not available.
- **Backlinks:** no backlink data source exists on this machine.
- Word count, internal links received and schema per page **are** available and are in `audit-pages.csv` from the earlier audit.

---

## SECTION 2 - The 41+ band

**47 pages, 4,099 impressions, 0 clicks. CTR is exactly 0.00%, not a rounding artefact.**

| Path | Impr | Pos | Category of problem |
|---|---|---|---|
| `/fast-business-loans-australia` | 676 | 75.7 | **Retired.** 308-redirects to `/for-business` (`next.config.ts:96`) |
| `/compare/hr-payroll` | 614 | 51.7 | Competition |
| `/best-crm-small-business-australia` | 342 | 70.5 | Competition (see below) |
| `/online-weight-loss-programs-australia` | 318 | 75.5 | Competition |
| `/weight-loss` | 231 | 44.8 | Hub page, competition |
| `/weight-loss-injections-australia` | 173 | 47.4 | **Retired for TGA reasons**, still drawing impressions |
| `/best-ai-sales-tools` | 150 | 46.0 | Competition |
| `/secured-vs-unsecured-business-loans` | 148 | 86.5 | **Retired**, 308 |
| `/business-loan-calculator` | 144 | 83.1 | **Retired**, 308 (`next.config.ts:90`) |
| `/glp-1-weight-loss-australia` | 144 | 48.7 | **Retired for TGA reasons** |
| `/gohighlevel` | 120 | 44.5 | Competition |
| `/hair-loss` | 119 | 70.2 | Hub page |
| `/pandadoc` | 95 | 43.8 | Competition |
| `/virtual-power-plant-australia` | 93 | 80.8 | Competition |
| `/low-doc-business-loans-australia` | 72 | 80.2 | **Retired**, 308 |
| `/unsecured-business-loans-australia` | 72 | 72.7 | **Retired**, 308 |
| `/business-line-of-credit-australia` | 65 | 70.3 | **Retired** |
| `/pipedrive` | 62 | 46.0 | Competition |
| `/what-a-business-loan-actually-costs` | 58 | 44.6 | **Retired**, 308 |
| `/pet-insurance` | 57 | 71.9 | Hub page |

**The dominant finding in this band is that it is substantially made of retired content.** Business-lending routes alone account for **at least 1,235 impressions** across seven entries in the top 20, all of which 308-redirect in production. `/weight-loss-injections-australia` and `/glp-1-weight-loss-australia` add a further 317 impressions from pages retired on TGA grounds.

These impressions are recorded against URLs that no longer serve content. Whether Google is still showing the pre-redirect URL, or the redirect is being followed and attributed to the source, is **not determinable from this data**.

### `/best-crm-small-business-australia`

In this archive: **342 impressions, 0 clicks, position 70.5**. Your brief reports 1,487 at 66; both describe the same shape.

The one query I can attribute to it comes from the GEOMG scoreboard file `referlabs-candidates.txt`, which was generated from a live Search Console pull over 20 July to 17 August 2026:

> `discovery|best crm for small business australia|affiliate click to PIPEDRIVE on /best-crm-small-business-australia   # 76 impressions, 0 clicks, pos 67.8`

**What ranks top 10 for that query is NOT DETERMINABLE** from any data on this machine. It requires a live Australian SERP pull, which I did not perform.

What is determinable: the page sits at position ~70 against a query with commercial intent in a category dominated by high-authority review sites. Related evidence from earlier work in this engagement: `/best-ai-sales-tools` was measured at 0 citations across 10 AI answers and no impressions, and generic `best-X` pages carrying no brand pair were the category that consistently failed to rank.

### Salvageable, merge, remove

**Not assessed.** The brief asks which pages should be merged or removed. That is a recommendation, and the brief also states "No recommendations. Findings and evidence only." I have reported the diagnosis per page and stopped there.

---

## SECTION 3 - Position 1-5

**15 pages, 231 impressions, 16 clicks.** Your brief says 10 pages and 39 impressions; the discrepancy is the window.

| Path | Impr | Clicks | Pos | CTR |
|---|---|---|---|---|
| `/` | 125 | 11 | 4.24 | 8.8% |
| `/about` | 46 | 4 | 4.04 | 8.7% |
| `/referral` | 19 | 0 | 2.95 | 0.0% |
| **`https://www.referlabs.com.au/pricing`** | 12 | 0 | 3.75 | 0.0% |
| **`https://www.referlabs.com.au/faq`** | 10 | 0 | 1.80 | 0.0% |
| `/compare-business-lenders/prospa-vs-moula` | 4 | 0 | 4.75 | 0.0% |
| `/services/affiliate-distribution` | 4 | 0 | 2.25 | 0.0% |
| `/services` | 3 | 0 | 2.67 | 0.0% |
| `/carrd-vs-durable` | 2 | 0 | 3.00 | 0.0% |
| `/moshy-eligibility` | 1 | 1 | 2.00 | 100.0% |
| `/compare/sales-outreach` | 1 | 0 | 1.00 | 0.0% |
| `/home-battery-installer-sydney` | 1 | 0 | 5.00 | 0.0% |
| `/nutshell` | 1 | 0 | 1.00 | 0.0% |
| `/polymarket/profitable-trading-bots` | 1 | 0 | 4.00 | 0.0% |
| `/services/partner-activation` | 1 | 0 | 1.00 | 0.0% |

**Two rows in this band are `www.` URLs.** `https://www.referlabs.com.au/pricing` and `https://www.referlabs.com.au/faq` appear as distinct pages from the `sc-domain:` property, ranking at 3.75 and 1.80. Every other row is recorded without the `www.` host. `next.config.ts` contains a `has: host` www-to-non-www canonicaliser, noted in earlier work. **These two URLs are being indexed and ranked on the www host.**

**Whether any of these queries has real volume being missed by wrong phrasing is NOT DETERMINABLE.** It requires the query dimension joined to page, which this archive does not carry, plus a keyword volume tool, which is not available here.

---

## SECTION 4 - Cannibalisation

**NOT COMPUTABLE from the available data.**

`gsc-top-queries.json` row schema is exactly `['query', 'clicks', 'impressions', 'ctr', 'position']`. There is no `page` field. Without a query-and-page joined export, no query can be attributed to more than one URL, and cannibalisation cannot be detected.

Resolving this requires a Search Console export with **both** the Pages and Queries dimensions applied simultaneously, or the API called with `dimensions: ['page','query']`. The tooling to do this already exists at `/Users/jarredkrowitz/Desktop/GEOMG.AI/scripts/gsc-rank.ts`, which calls `fetchQueries` from `src/lib/gsc`, and `.env.local` in that project has `GSC_SERVICE_ACCOUNT_JSON` set.

---

## SECTION 5 - Queries with no matching page

Method: slugified each of the 250 queries and tested for any prerendered route whose path matches or contains it. **197 of 250 queries returned no slug match.**

Top 25 by impressions:

| Query | Impr | Clicks | Pos | Code or money action possible |
|---|---|---|---|---|
| `mosh discount code` | 70 | 3 | 20.5 | **Yes. `REFERAL55`** |
| `pilot vs mosh` | 62 | 1 | 8.7 | **Yes, comparison to `/mosh-vs-pilot`** |
| `ascension peptides` | 43 | 1 | 6.5 | Yes, peptides cluster |
| `affiliate marketing programs` | 32 | 0 | 37.8 | Funnel only |
| `affiliate program australia` | 32 | 0 | 19.0 | Funnel only |
| `affiliate marketing platforms` | 26 | 0 | 60.5 | Funnel only |
| `mosh or pilot` | 23 | 1 | 4.8 | **Yes. Position 4.8** |
| `all-in-one hr, payroll & hiring platform` | 23 | 0 | 47.5 | Yes, `/compare/hr-payroll` |
| `apollo peptide sciences` | 21 | 2 | 7.0 | Yes, Apollo |
| `affiliate australia` | 20 | 0 | 18.9 | Funnel only |
| `affiliate marketing programs australia` | 18 | 1 | 20.7 | Funnel only |
| `affiliate rewards` | 13 | 0 | 44.8 | Funnel only |
| `affiliate rewards program` | 12 | 0 | 53.3 | Funnel only |
| `ascension peptides review` | 11 | 1 | 7.5 | Yes |
| `"reply.io"` | 11 | 0 | 35.0 | Yes, `/reply-io` |
| `affiliate programs in australia` | 9 | 0 | 20.8 | Funnel only |
| `apollo peptides` | 9 | 0 | 9.0 | Yes |
| `affiliate marketing for beginners australia` | 8 | 0 | 30.8 | Funnel only |
| `affiliate networks australia` | 8 | 0 | 29.6 | Funnel only |
| `apollo labs peptides` | 8 | 0 | 8.1 | Yes |
| `affiliate marketing course australia` | 7 | 0 | 48.0 | Funnel only |
| `attorney referral agreement` | 7 | 0 | 70.1 | **No.** Page was 410'd |
| `attorney referral fees` | 7 | 0 | 54.1 | **No.** Page was 410'd |
| `affiliate commission` | 6 | 0 | 22.5 | Funnel only |
| `affiliate links australia` | 6 | 0 | 30.2 | Funnel only |

**Caveat on method:** slug matching is a weak proxy. `mosh discount code` has no route called `/mosh-discount-code`, but `/moshhair` targets exactly that query and its `<title>` is "Mosh Discount Code 2026: 55% Off First Order". **These are candidates to check by hand, not confirmed gaps.** The largest genuine signal in the list is the density of `affiliate marketing` and `affiliate programs` variants, which collectively draw over 160 impressions at positions 19 to 60.

---

## SECTION 6 - Internal link equity

Inbound links counted from `<main>` only, so global navigation and footer are excluded.

### Most-linked pages, against what they earn

| Path | Inbound body links | Impr | Clicks | Pos |
|---|---|---|---|---|
| `/` | 137 | 125 | 11 | 4.2 |
| **`/how-we-make-money`** | **113** | **2** | **0** | 8.0 |
| `/guides` | 68 | 73 | 0 | 13.2 |
| `/about` | 48 | 46 | 4 | 4.0 |
| `/business-loans` | 30 | 51 | 0 | 23.8 |
| `/apollo-energy-group` | 24 | 26 | 2 | 15.3 |
| `/moshy` | 20 | 270 | 15 | 16.6 |
| `/best-website-builder` | 19 | 40 | 0 | 22.6 |
| `/what-a-business-loan-actually-costs` | 19 | 58 | 0 | 44.6 |
| `/home-battery-rebate-australia` | 18 | 0 | 0 | not in export |
| `/weight-loss` | 16 | 231 | 0 | 44.8 |
| `/moshhair` | 16 | 327 | 3 | 16.6 |
| `/best-ai-sales-tools` | 15 | 150 | 0 | 46.0 |
| `/best-hair-loss-treatment-australia` | 15 | 1,007 | 7 | 10.6 |

### Highest-earning pages, against their inbound links

| Path | Impr | Clicks | Pos | Inbound |
|---|---|---|---|---|
| `/affiliate-programs-australia` | 1,963 | 11 | 23.0 | 10 |
| `/best-weight-loss-telehealth-australia` | 1,546 | 23 | 7.9 | 13 |
| `/moshy-vs-juniper` | 1,224 | 11 | 6.3 | 6 |
| `/best-hair-loss-treatment-australia` | 1,007 | 7 | 10.6 | 15 |
| **`/mosh-vs-pilot`** | **878** | **10** | **6.5** | **2** |
| `/fast-business-loans-australia` | 676 | 0 | 75.7 | 1 |
| `/compare/hr-payroll` | 614 | 0 | 51.7 | 7 |
| `/mosh-vs-dense` | 383 | 0 | 11.4 | 3 |
| **`/blog/attorney-referral-fee-rules-state-guide`** | **379** | **5** | 20.8 | **not in build** |
| **`/best-peptide-supplier`** | **363** | **10** | **11.5** | **0** |
| `/moshy-review` | 349 | 8 | 13.5 | 15 |
| `/best-crm-small-business-australia` | 342 | 0 | 70.5 | 6 |
| `/moshy-vs-pilot` | 337 | 11 | 7.9 | 3 |
| `/moshhair` | 327 | 3 | 16.6 | 16 |

### The mismatch

**`/how-we-make-money` receives 113 inbound body links, the second-highest on the site, and draws 2 impressions and 0 clicks.**

**11 of the 34 pages that earned any clicks have 2 or fewer inbound body links:**

| Path | Clicks | Impr | Inbound |
|---|---|---|---|
| `/best-peptide-supplier` | 10 | 363 | **0** |
| `/mosh-vs-pilot` | 10 | 878 | **2** |
| `/blog/attorney-referral-fee-rules-state-guide` | 5 | 379 | **0** |
| `/juniper-alternatives` | 5 | 209 | **0** |
| `/blog/best-affiliate-programs-australia-2026` | 4 | 312 | **0** |
| `/apollo-energy` | 2 | 33 | **0** |
| `/apollo-vs-ascension` | 2 | 119 | **0** |
| `/finasteride-australia` | 2 | 67 | **0** |
| `/apollo-vs-biopeptitech` | 1 | 212 | **0** |
| `/apollo-energy-group-eoi` | 1 | 7 | **0** |
| `/polymarket/optimising-edge` | 1 | 27 | **0** |

Two of these no longer exist in the current build: `/blog/attorney-referral-fee-rules-state-guide` (410'd in earlier work) and `/juniper-alternatives` (410'd). Their impressions and clicks are historic within the window.

---

## SECTION 7 - Reconciling the two audits

Both audits are internally consistent. They used different definitions, and **one of my own figures was wrong.**

### Orphans: three different definitions, three different answers

| Definition | Orphan count |
|---|---|
| **A.** Inbound links counted from `<main>` only, excluding global nav and footer (**my audit's definition**) | **47** |
| **B.** Inbound links counted from the whole page, including nav and footer | **37** |
| **C.** Crawl depth from `/` following all links | **0 pages at depth 0-2 are unreachable; 82 pages are unreachable within 5 clicks** |

**10 pages are orphaned under A but linked under B.** Those are reachable only through global navigation, never from body content.

**37 pages are orphaned under both A and B**, including `/affiliate-partnerships`, `/apollo-energy-group-eoi`, `/cloudtalk`, `/hubspot`, `/instapage`, `/klaviyo`, `/lead-hacking`, `/linkedin-growth`, `/mailchimp`, `/playbooks`, `/roi-calculator`, `/security`, `/servicem8`, and the `/services/*` cluster.

### The "two clicks from home" claim

Measured by breadth-first crawl from `/` following every link including nav and footer:

| Depth | Pages |
|---|---|
| 0 | 1 |
| 1 | 47 |
| 2 | 131 |
| **Unreachable within 5 clicks** | **82** |

**179 of 261 pages are within two clicks of home. 82 are not reachable at all.** The claim "every page within two clicks of home" is **false as stated**, though the majority of the 82 unreachable pages are the business-lending routes that 308-redirect in production and the `/services/*` cluster.

**Verdict on orphans:** neither audit is wrong. The earlier audit's "zero orphans" is consistent with a crawl-depth definition that counts navigation links, under which every page Google can reach from home is reachable. My "47 orphans" is consistent with a body-content definition. **The two measure different things and the earlier audit's headline is the one that needs qualifying**, because "reachable from the footer" and "receives editorial internal links" are different properties and only the second passes equity.

### The sitemap figure: my audit was wrong

**My audit reported "106 of 261 pages absent from the sitemap". That figure is incorrect.**

Cause: I parsed `src/app/sitemap.ts` with a regex for template literals. The file builds much of the sitemap with spreads:

```
...CATALOG.map((v) => ({
...HAIR_LOSS_GUIDES.filter((g) => !g.meta?.noIndex).map((g) => ({
...APOLLO_GUIDES.map((g) => ({
```

A static parse of the source cannot see routes produced by `.map()` over an imported array, so it undercounted the sitemap by 21 routes and overcounted the absentees.

**Corrected against the generated output** at `.next/server/app/sitemap.xml.body`:

| Measure | Source-parse (wrong) | Generated sitemap (correct) |
|---|---|---|
| URLs in sitemap | 157 | **178** |
| Prerendered pages | 261 | 261 |
| Pages absent from sitemap | **106** | **83** |
| Sitemap URLs with no page behind them | not measured | **0** |

**Of the 83 absent pages, 30 are business-lending routes that 308-redirect**, which `src/app/sitemap.ts:96` documents as a deliberate withdrawal: `// -- Business lending: withdrawn from the sitemap, 22 August 2026 --`.

There are **zero dead sitemap entries**: every one of the 178 URLs has a prerendered page behind it.

The `audit-pages.csv` written in the previous task carries the incorrect `in_sitemap` values derived from the source parse. It has not been modified.

---

## What could not be determined, and what would resolve it

| Item | Blocker | Resolution |
|---|---|---|
| Your quoted figures (43/13,531/111 etc.) | Export not on this machine | Supply the 90-day export file |
| Per-page query breakdown (Section 1) | Archive has no page-and-query joined dimension | GSC export with both dimensions, or `dimensions: ['page','query']` via the API. Tooling exists at `GEOMG.AI/scripts/gsc-rank.ts` |
| Cannibalisation (Section 4, entirely) | Same | Same |
| What outranks us (Sections 1, 2) | No live SERP data | Australian SERP pull per query |
| Backlinks | No backlink data source on this machine | Ahrefs, Majestic or Search Console links report |
| Search volume for phrasing gaps (Section 3) | No keyword tool available | Keyword Planner or Semrush, AU-filtered |
