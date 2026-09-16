# The business-software cluster

**Date:** 7 September 2026
**Read-only.** No website files edited, nothing committed, nothing deployed.
**Findings and evidence only. No recommendations.**

## On "stale .next"

You asked me to build against current source. **I did not run a build**, because `prebuild` writes `src/lib/page-dates.ts` and that is a write. I checked instead whether `.next` is actually stale, and it is not:

- HEAD is `e2cbd54`, committed **2026-09-07 11:00:34 +1000**
- `.next/server/app/moshy.html` built **2026-09-07 11:00**
- `find src public next.config.ts -newer .next/server/app/moshy.html` returns **nothing**
- `git status` on `src`, `public`, `next.config.ts`, `package.json` is **clean**

No source file is newer than the build. The cluster membership, partner mapping and guard-coverage analysis below are derived from **source** (`src/app`, `src/lib/affiliate-links.ts`, `src/lib/catalog/catalog.ts`, `scripts/`). Rendered word counts, schema and h2 structure are read from the in-sync build.

## On the performance data

The Search Console figures come from the archived pull at `GEOMG.AI/archives/searchable-referlabs.com.au-2026-08-13T04-57-49/`, window **12 July to 10 August 2026**. This is not the 90-day export referenced in earlier briefs, which is not on this machine. **Page-level data (193 rows) appears complete. Query-level data is truncated, and Section 4 documents exactly how.**

---

## The cluster: 57 pages

Defined as every route whose source references one of the 44 B2B SaaS destination constants in `src/lib/affiliate-links.ts`, plus the hub, the nine `/compare/*` verticals and the three quizzes.

**30 brand pages** (all of the ones you named): `/activecampaign` `/aisdr` `/alidrop` `/beautifulai` `/beehiiv` `/blinq` `/brevo` `/capsule` `/carrd` `/cloudtalk` `/databox` `/dext` `/durableai` `/elevenlabs` `/employmenthero` `/flexiquiz` `/fullenrich` `/gohighlevel` `/hellobar` `/instapage` `/keap` `/krispcall` `/landingi` `/leadpages` `/lindy` `/nutshell` `/outgrow` `/pandadoc` `/pipedrive` `/replyio` `/superfiliate` `/survicate` `/swipepages` `/trainual` `/unbounce` `/wing-assistant`

**9 `/compare/*` verticals:** ai-sales-tools, ai-tools, business-phone, hr-payroll, lead-generation, newsletter-platforms, payments, sales-outreach, website-builders

**5 best-of / hub pages:** `/business-software`, `/best-ai-sales-tools`, `/best-crm-small-business-australia`, `/best-newsletter-platform`, `/best-website-builder`, `/affiliate-software-australia`

**4 brand-pair pages:** `/carrd-vs-butternut`, `/carrd-vs-durable`, `/durable-vs-butternut`

**3 quizzes:** `/ai-sales-tools-quiz`, `/newsletter-platform-quiz`, `/website-builder-quiz`

### Eight destinations have no page at all

`ALOHI`, `COMETCHAT`, `FLOCKSY`, `LOGOME`, `MEETGEEK`, `PAYONEER`, `SNOV`, `ZOOMINFO` are exported in `affiliate-links.ts` and referenced by no route.

**`/zoominfo` drew 27 impressions at position 14.3 in the GSC window and does not exist in the current build.** It was removed between 10 August and 7 September.

---

## 1. Commercial status

| Group | Count |
|---|---|
| **Has a discount code** | **0** |
| Has a live tracked link, no code | **53** |
| Has neither | **4** |

The four with neither are `/business-software`, `/ai-sales-tools-quiz`, `/newsletter-platform-quiz`, `/website-builder-quiz`. The three quizzes reference partner constants in source but emit no `rel="...sponsored"` link in the rendered page.

**Not one page in the 57 carries a discount code.** Cross-checked against the four codes that exist sitewide (`REFERRAL120`, `REFERAL55`, `referlab2mf`, `REFERLABS`), all of which belong to health and pet insurance.

---

## 2. Performance

**57 pages. 2,891 impressions. 0 clicks. CTR 0.00%. Impression-weighted position 39.2.**

That zero is hand-verified. I re-ran the join directly against the raw `gsc-top-pages.json` rows rather than through my own table: **49 cluster paths appear in the export, summing to 2,891 impressions and 0 clicks**, with a control confirming the same join correctly picks up `/moshy` (15 clicks) and `/best-weight-loss-telehealth-australia` (23 clicks) as outside the cluster.

| route | impr | clk | pos | words | inbound | dated | h2? | partners |
|---|---|---|---|---|---|---|---|---|
| `/compare/hr-payroll` | 614 | 0 | 51.7 | 497 | 7 | no | 0 | |
| `/best-crm-small-business-australia` | 342 | 0 | 70.5 | 1,084 | 6 | **yes** | 0 | Capsule, Keap, Nutshell, Pipedrive |
| `/best-newsletter-platform` | 262 | 0 | 13.3 | 876 | 8 | no | 0 | beehiiv |
| `/best-ai-sales-tools` | 150 | 0 | 46.0 | 1,433 | 15 | no | 1 | AiSDR, FullEnrich, GoHighLevel, Reply.io |
| `/gohighlevel` | 120 | 0 | 44.5 | 1,668 | 8 | no | 1 | GoHighLevel |
| `/replyio` | 119 | 0 | 30.7 | 1,663 | 6 | no | 1 | Reply.io |
| `/dext` | 103 | 0 | 30.7 | 762 | 2 | no | 0 | Dext |
| `/pandadoc` | 95 | 0 | 43.8 | 793 | 1 | no | 0 | PandaDoc |
| `/databox` | 88 | 0 | 16.8 | 1,224 | 2 | no | 1 | Databox |
| `/swipepages` | 65 | 0 | 15.1 | 2,092 | 5 | no | 2 | Swipepages |
| `/pipedrive` | 62 | 0 | 46.0 | 863 | 10 | no | 0 | Pipedrive |
| `/employmenthero` | 61 | 0 | 37.0 | 1,623 | 5 | no | 1 | Employment Hero |
| `/aisdr` | 52 | 0 | 31.2 | 1,559 | 7 | no | 1 | AiSDR |
| `/brevo` | 50 | 0 | 33.8 | 1,311 | 5 | no | 1 | Brevo |
| `/landingi` | 49 | 0 | 24.6 | 813 | 3 | no | 0 | Landingi |
| `/instapage` | 46 | 0 | 36.4 | 739 | **0** | no | 0 | Instapage |
| `/beautifulai` | 45 | 0 | 29.3 | 728 | 4 | no | 0 | Beautiful.ai |
| `/leadpages` | 43 | 0 | 23.2 | 1,119 | 9 | no | 1 | Leadpages |
| `/best-website-builder` | 40 | 0 | 22.6 | 1,152 | 19 | no | 0 | Carrd, Durable, Swipepages |
| `/beehiiv` | 38 | 0 | 18.2 | 1,583 | 5 | no | 1 | beehiiv |
| `/business-software` | 34 | 0 | 40.4 | 1,151 | 4 | **yes** | 1 | |
| `/blinq` | 33 | 0 | 17.9 | 817 | 1 | no | 0 | Blinq |
| `/durable-vs-butternut` | 32 | 0 | 13.9 | 1,625 | 3 | no | 0 | Durable |
| `/compare/lead-generation` | 31 | 0 | 64.9 | 486 | 4 | no | 0 | |
| `/outgrow` | 28 | 0 | 18.3 | 821 | 4 | no | 0 | Outgrow |
| `/compare/ai-sales-tools` | 26 | 0 | 46.2 | 836 | 7 | no | 0 | |
| `/durableai` | 25 | 0 | 9.1 | 1,678 | 12 | no | 2 | Durable |
| `/capsule` | 24 | 0 | 25.5 | 811 | 5 | no | 0 | Capsule |
| `/wing-assistant` | 23 | 0 | 19.8 | 751 | 2 | no | 0 | Wing Assistant |
| `/cloudtalk` | 22 | 0 | 20.6 | 834 | **0** | no | 0 | CloudTalk |
| `/hellobar` | 18 | 0 | 19.8 | 834 | 4 | no | 0 | HelloBar |
| `/website-builder-quiz` | 17 | 0 | 53.1 | 411 | 3 | no | 1 | Carrd, Durable, Swipepages |
| `/flexiquiz` | 16 | 0 | 12.3 | 784 | 4 | no | 0 | FlexiQuiz |
| `/activecampaign` | 13 | 0 | 44.2 | 819 | 4 | no | 0 | ActiveCampaign |
| `/compare/newsletter-platforms` | 13 | 0 | 28.5 | 377 | 5 | no | 0 | |
| `/lindy` | 13 | 0 | 28.5 | 750 | 7 | no | 0 | Lindy |
| `/survicate` | 13 | 0 | 22.7 | 716 | 2 | no | 0 | Survicate |
| `/compare/website-builders` | 11 | 0 | 52.2 | 597 | 10 | no | 0 | |
| `/elevenlabs` | 10 | 0 | 38.6 | 766 | 5 | no | 0 | ElevenLabs |
| `/alidrop` | 9 | 0 | 18.4 | 1,108 | 3 | no | 1 | AliDrop |
| `/krispcall` | 9 | 0 | 40.8 | 647 | 3 | no | 0 | KrispCall |
| `/trainual` | 8 | 0 | 28.6 | 743 | 3 | no | 0 | Trainual |
| `/ai-sales-tools-quiz` | 6 | 0 | 36.0 | 408 | 2 | no | 1 | AiSDR, FullEnrich, GoHighLevel, Nutshell |
| `/compare/ai-tools` | 3 | 0 | **6.0** | 615 | 5 | no | 0 | |
| `/compare/payments` | 3 | 0 | 14.7 | 648 | 8 | no | 0 | |
| `/superfiliate` | 3 | 0 | 10.7 | 1,142 | 6 | no | 1 | Superfiliate |
| `/carrd-vs-durable` | 2 | 0 | **3.0** | 594 | 9 | no | 1 | Carrd, Durable |
| `/compare/sales-outreach` | 1 | 0 | **1.0** | 524 | 4 | no | 0 | |
| `/nutshell` | 1 | 0 | **1.0** | 836 | 10 | no | 0 | Nutshell |
| `/affiliate-software-australia` | **0** | 0 | n/a | 1,017 | 3 | **yes** | 1 | Superfiliate |
| `/carrd` | **0** | 0 | n/a | 1,474 | 15 | no | 1 | Carrd |
| `/carrd-vs-butternut` | **0** | 0 | n/a | 1,665 | 2 | no | 0 | Carrd |
| `/compare/business-phone` | **0** | 0 | n/a | 482 | 2 | no | 0 | |
| `/fullenrich` | **0** | 0 | n/a | 1,693 | 5 | no | 1 | FullEnrich |
| `/keap` | **0** | 0 | n/a | 801 | 5 | **yes** | 0 | Keap |
| `/newsletter-platform-quiz` | **0** | 0 | n/a | 384 | 3 | no | 1 | beehiiv |
| `/unbounce` | **0** | 0 | n/a | 1,103 | 3 | **yes** | 0 | Unbounce |

**Eight pages recorded zero impressions in the 29-day window:** `/affiliate-software-australia`, `/carrd`, `/carrd-vs-butternut`, `/compare/business-phone`, `/fullenrich`, `/keap`, `/newsletter-platform-quiz`, `/unbounce`. Whether each has been live 90 days is not determinable from this data; `page-dates.ts` is git-generated and would answer it.

**Four pages rank in the top 6 and draw almost nothing:** `/compare/sales-outreach` (position 1.0, 1 impression), `/nutshell` (1.0, 1), `/carrd-vs-durable` (3.0, 2), `/compare/ai-tools` (6.0, 3). They rank because nobody searches the phrase.

---

## 3. Why it fails: the structural contrast

Measured against a 13-page health set (`/moshy`, `/moshhair`, `/knose`, `/petsonme`, the four brand-pair comparisons, the three best-of pages, the two reviews, `/best-pet-insurance-australia`).

| Signal | Business software (57) | Health (13) |
|---|---|---|
| Median words | 821 | **1,477** |
| **% with a dated claim** | **9%** | **100%** |
| % brand-pair title | 16% | **46%** |
| **% with an h2 that is a question** | **37%** | **100%** |
| Median inbound body links | 5 | 7 |
| Impressions | 2,891 | 6,484 |
| Clicks | **0** | **88** |
| CTR | **0.00%** | **1.36%** |
| Impression-weighted position | **39.2** | **9.3** |

The two signals that separate the sets most sharply are **dated claims (9% vs 100%)** and **h2 questions (37% vs 100%)**. Inbound links are near-identical, so link equity is not the differentiator.

### The dated-claim gap has a mechanical cause

`scripts/check-price-provenance.mjs` requires a read date within 400 characters of every price inside `<main>` on a partner-linked page. Its route selector is at line 49:

```
if (/href:\s*"\/go\/|href="\/go\/|t\.cfjump\.com/.test(src)) {
```

It scans only routes whose source contains a `/go/` link or a Commission Factory `t.cfjump.com` tag.

**The guard scans 18 routes sitewide. Zero of them are in this cluster.** All 57 cluster pages are skipped, because the cluster links out through raw affiliate URLs rather than `/go/` slugs. The 18 guarded routes are the `/mens-health/*`, `/skin-and-beauty/*` and `/midoc` set.

Consequence, measured in the rendered build:

| Page | Prices in `<main>` | Dated provenance phrases |
|---|---|---|
| `/best-ai-sales-tools` | **10** | **0** |
| `/best-website-builder` | **8** | **0** |
| `/best-newsletter-platform` | **2** | **0** |
| `/best-crm-small-business-australia` | 14 | 2 |

`/best-crm-small-business-australia` is dated by hand, not by the guard: "read off the vendors' own pricing pages on 5 September 2026".

### `/best-crm-small-business-australia`

**1,084 words, 342 impressions, 0 clicks, position 70.5.**

- **Title:** "Best CRM for Small Business Australia 2026 | Refer Labs"
- **H1:** "Best CRM for small business in Australia"
- **H2s:** Pipedrive | Capsule | Nutshell | Keap | How to choose | Common questions
- **Lead:** "Pick by the job, not the feature list. Of these four, Pipedrive suits teams whose day is chasing and closing deals, Capsule suits contact management and has a genuinely free tier up to 250 contacts, Nutshell sits at the low end on price, and Keap costs materially more because it is a marketing automation and payments suite with a CRM inside rather than a CRM alone."
- **What it claims:** it explicitly declines to name a winner. The FAQ answer reads "the best CRM for a small business in Australia? There is no single..."
- **Basis:** four vendor prices read off vendor pricing pages on 5 September 2026.
- Its H2s are four brand names, not buyer questions. It carries **zero h2 questions** by my count, with "Common questions" as a section label rather than a question.

**What ranks top 10 for its queries is not determinable from this data.** The only query I can attribute to it is from `GEOMG.AI/scoreboards/referlabs-candidates.txt`, generated from a live Search Console pull 20 July to 17 August 2026: `best crm for small business australia # 76 impressions, 0 clicks, pos 67.8`. Establishing what outranks it requires an Australian SERP pull that I did not perform.

### `/best-ai-sales-tools`

**1,433 words, 150 impressions, 0 clicks, position 46.0.**

- **Title:** "Best AI Sales Tools 2026: GoHighLevel, AiSDR & Reply.io | Refer Labs"
- **H1:** "Best AI Sales Tools in 2026: GoHighLevel, AiSDR, Reply.io & FullEnrich"
- **H2s:** What are the best AI sales tools for an Australian small business? | Our Four Picks | Side-by-Side Comparison | How to Choose | Frequently Asked Questions | Ready to Add AI to Your Sales? Start with GoHighLevel.
- **Lead:** "Each of these four fixes a different bottleneck, so the right one depends on where your outbound actually stalls."
- **What it claims:** it does name a winner. The rendered copy contains "the best starting point: one subscription replaces the CRM, funnels," referring to GoHighLevel, and "Four of the strongest AI sales and..." The final H2 is a directive: "Ready to Add AI to Your Sales? Start with GoHighLevel."
- **Basis:** **10 prices in `<main>` and zero dated provenance phrases.** The recommendation ranks four products, all four of which are affiliate partners, and the page states no basis for preferring GoHighLevel other than category fit.

The earlier measurement you cite (zero citations across ten AI answers) is consistent with the structure: the H1 names four brands rather than a pair, the page carries one h2 question, and none of its figures carries a read date.

---

## 4. Queries

**The query export is truncated, and Section 4 is therefore a floor, not a total.**

Proof of the truncation: `gsc-top-queries.json` holds 250 rows. **28 rows have clicks, sorted by clicks descending. The remaining 222 rows have zero clicks and are sorted alphabetically, terminating at "australia".** Verified: the zero-click subset sorts identically to its own alphabetical sort, and the last row is `australia`.

**Every zero-click query from "b" to "z" is absent from this file.** That removes Pipedrive, Brevo, Beehiiv, Blinq, Beautiful.ai, Capsule, CloudTalk, Carrd, Databox, Dext, Durable, ElevenLabs, Employment Hero, FlexiQuiz, FullEnrich, GoHighLevel, HelloBar, Instapage, Keap, KrispCall, Landingi, Leadpages, Lindy, Nutshell, Outgrow, PandaDoc, Reply.io, Superfiliate, Survicate, Swipepages, Trainual, Unbounce and Wing Assistant queries from view.

What survives the cut, excluding `affiliate*` queries which belong to `/affiliate-programs-australia` rather than this cluster:

**33 queries, 233 impressions, 0 clicks, CTR 0.00%.**

| Query | Impr | Clicks | Pos |
|---|---|---|---|
| `aisdr alternatives` | 78 | 0 | 46.2 |
| `aisdr review` | 34 | 0 | 29.9 |
| `all-in-one hr, payroll & hiring platform` | 23 | 0 | 47.5 |
| `"landingi" -site:reddit.com -site:twitter.com -site:x.com` | 21 | 0 | **1.9** |
| `"reply.io"` | 11 | 0 | 35.0 |
| `aisdr vs dashly` | 11 | 0 | 24.0 |
| `"krispcall"` | 6 | 0 | **6.2** |
| `activecampaign perth` | 5 | 0 | 48.0 |
| `aisdr` | 5 | 0 | 42.8 |
| `"beautiful.ai_" -site:reddit.com ...` | 4 | 0 | **5.2** |
| `"aisdr" -site:reddit.com ...` | 3 | 0 | **7.3** |
| `"beautiful.ai" -site:reddit.com ...` | 3 | 0 | **4.7** |
| `"elevenlabs"` | 3 | 0 | 81.7 |
| `ai crm vs gohighlevel` | 3 | 0 | 39.7 |
| `alohi sa` | 2 | 0 | 26.5 |
| `ai powered membership sales tool` | 2 | 0 | 73.5 |
| `aisdr alternative` | 2 | 0 | 48.0 |
| plus 16 further queries at 1 impression each | 16 | 0 | 10.0 to 94.0 |

**Several of the highest-position rows are operator queries** carrying `-site:reddit.com -site:twitter.com -site:x.com`. Those are scraper or monitoring-tool fingerprints, not human searches. They account for the cluster's best recorded positions (1.9, 4.7, 5.2, 7.3).

**Code intent within the cluster: 1 query, 1 impression, 0 clicks** (`activecampaign deals`, position 49.0). For contrast, the two highest-click queries in the entire export are `moshy discount code` (11 clicks) and `mosh discount code` (3 clicks), both health.

---

## 5. Cannibalisation

Measured as 5-gram Jaccard similarity across rendered `<main>` body text, all 57 pages.

**One pair exceeds 20% similarity: `/nutshell` and `/pipedrive` at 22.7%.**

No generic best-of page overlaps materially with the individual brand pages it covers, and no `/compare/*` page overlaps materially with either. `/best-crm-small-business-australia` covers Pipedrive, Capsule, Nutshell and Keap, and shares under 20% of its 5-grams with each of `/pipedrive`, `/capsule`, `/nutshell` and `/keap`.

Query-level cannibalisation, meaning two cluster URLs appearing for the same query, **is not computable**. `gsc-top-queries.json` has schema `[query, clicks, impressions, ctr, position]` with no page dimension, so no query can be attributed to any URL.

---

## 6. Word count and effort

| Measure | Value |
|---|---|
| Pages | **57** |
| Total words in rendered `<main>` | **55,330** |
| Median words per page | 821 |
| Longest page | `/swipepages`, 2,092 words |
| Impressions returned | 2,891 |
| Clicks returned | **0** |
| Words per click | **undefined; the denominator is zero** |
| Words per impression | 19.1 |

For comparison, the 13-page health set carries an estimated 19,200 words at its 1,477 median and returned 6,484 impressions and 88 clicks in the same window.

---

## What could not be determined

| Item | Blocker |
|---|---|
| What ranks top 10 for the cluster's queries | No live SERP data. Requires an Australian SERP pull per query |
| Backlinks per page | No backlink data source on this machine |
| Full query list for the cluster | Query export truncated alphabetically at "au" |
| Query-level cannibalisation | Export carries no page dimension alongside query |
| Whether each zero-impression page has been live 90 days | Not in the GSC archive. `src/lib/page-dates.ts` is git-generated and would answer it |
| Whether the 90-day figures differ materially | The 90-day export is not on this machine |
