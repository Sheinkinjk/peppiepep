# Part A: is the no-click mechanism real?

**Prepared 19 September 2026.** Read-only. Sources: Google Search Console via `scripts/google-data.mjs` (property `sc-domain:referlabs.com.au`, page, query and date dimensions, 1 Jun to 17 Sep 2026, read 19 Sep 2026); the rendered site (26 live pages link Moshy, Mosh or Juniper); the operator's figure of about 2.3 tracked transactions a day across Moshy, Mosh and Juniper; Jarred's confirmation of 20 Aug 2026 that REFERRAL120 is paid on redemption without a click. **Not available:** merchant transactions by merchant or by day, GA4 (property ID not supplied), and any stored AI-answer corpus (the prompt panel's first run is October 2026).

## Verdict: PARTIALLY CONFIRMED, with a correction that changes Part B

**Confirmed:** most transactions cannot have come through a visit to the site. **Not supported:** that code-query search volume is what drives them. The brief's premise, "the scarce resource is search volume on the code query", does not survive the numbers below.

## 1. Transactions against clicks

Merchant transactions by month and by merchant are not in the repo, so a per-merchant table cannot be built. The operator's aggregate is about 2.3 a day, about 69 a month. Clicks to those merchants are not recorded anywhere either (GA4 not supplied; Moshy and Mosh pass no SubID). The nearest available denominator is Google clicks to the 26 pages that link the three brands:

| Month | Google clicks to pages linking Moshy, Mosh or Juniper | Sitewide Google clicks | Transactions (operator aggregate) | Transactions as a share of those Google visits |
|---|---|---|---|---|
| Jul 2026 | 75 | 158 | about 69 | 92% |
| Aug 2026 | 100 | 201 | about 69 | 69% |
| Sep 2026, 1 to 17 | 79 (pace about 140) | 153 | about 39 | 49% |

A page-visit to sale rate of 49% to 92% is not credible for affiliate traffic. Even the generous 10% ceiling in the brief would need about 690 visits a month to these pages, **about 7 times** what Google delivers. Bing, direct, email, social and AI referrals add visits, but AU Bing share and the site's size make a sevenfold multiple implausible. This is flagged as the brief asks: **the implied rate is above 10% in every month.**

## 2. Share of transactions with no referring visit

Bounded rather than measured. Attributable sales = Google clicks x non-Google multiplier (1x to 3x, an assumption) x visit-to-sale rate (2% to 10%, an assumption). At August's 100 clicks that is 2 to 30 attributable sales against about 69, so **between 57% and 97% of transactions had no referring visit.** Per-merchant shares cannot be computed without merchant data. Juniper is link-attributed (`utm_campaign`), so its sales must have had a click; the no-click share among Moshy and Mosh is therefore higher than the blended range.

## 3. Code impressions in search against transactions

A daily correlation cannot be run: transactions by day do not exist in the repo. What the query data does show is decisive in a different direction.

| Code queries (contain code, coupon, promo, discount or voucher) | Jun | Jul | Aug | Sep 1 to 17 |
|---|---|---|---|---|
| Moshy code queries, impressions / clicks | 75 / 0 | 82 / 8 | 58 / 7 | 82 / 3 |
| Mosh code queries | 76 / 0 | 95 / 3 | 182 / 2 | 138 / 2 |
| Juniper code queries | 0 | 0 | 4 / 0 | 1 / 0 |

Query-level rows exclude Google's anonymised queries, so true code-query volume is somewhat higher. Even doubled, **Moshy and Mosh code searches that surface the site run to a few hundred a month.** A few hundred searches cannot produce about 69 sales a month at any realistic redemption rate.

The 19,200 "code impressions" in the Part 0 and Part 4 reports were impressions of pages **whose snippet displays the code**, and almost all were for non-code queries ("best weight loss telehealth", "moshy vs juniper", "mosh review"). That exposure is real, but it is exposure of the code on comparison and review searches, not code-query demand. **Correction to Part 0:** the sentence "code impressions in search ran to roughly 19,200 in 90 days" should be read as "the code was displayed in about 19,200 search results for mostly non-code queries".

## 4. AI answers

**Cannot be tested.** No stored answer corpus exists: `research/prompt-panel/` holds only the template, and the first monthly run is October 2026. Bing's AI Performance report counts 1,200 citations in 28 days but does not say which cited a code. The October prompt panel's `answer_mentions_code` column will be the first measurement.

## 5. What else could explain the unattributed redemptions

Three sources fit the data, and the evidence does not distinguish them:
1. **Code display on non-code searches and AI answers** (the mechanism the brief assumes, but driven by comparison and review queries, not code queries).
2. **Readers who visit once, leave, and return later direct to the merchant** with the code (a real visit, just not an attributable one).
3. **Redemptions Refer Labs did not cause.** The Part 3 teardown found a cached third-party page pairing REFERRAL120 with a "June 2025" title, before the code first appears in this repo (7 Jul 2026). If REFERRAL120 circulated before Refer Labs held it, some redemptions may come from elsewhere. This does not reduce what Moshy pays, but it would mean the mechanism is weaker than the aggregate suggests.

**What would settle it:** Moshy's redemption timestamps for REFERRAL120 split by link and typed code, a confirmation of when the code was first issued and to whom, and GA4 sessions per page.

## Consequence for Parts B to E

Proceed, with two constraints the brief did not state:
- **Only a code unique to Refer Labs, credited on redemption, earns without a click.** A merchant's public code earns nothing when typed. Every candidate in Part B has to pass this screen, or its no-click revenue is zero.
- **Rank on where the code will be displayed, not on code-query volume.** The evidence says the code earns when it is shown on high-impression comparison and review pages and in AI answers. Code-query volume is a weak proxy for that.
