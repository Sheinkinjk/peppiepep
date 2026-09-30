# Business software: where the pages stand in search (30 Sep 2026)

Read-only research. Source: Search Console via `scripts/google-data.mjs` (auth worked, property `sc-domain:referlabs.com.au`, `dataState: all`), GA4 property 518598189, the Search Console URL Inspection API (same read-only token) and live `curl` of every URL.

- **90-day window:** 2 Jul to 29 Sep 2026. **28-day window:** 2 Sep to 29 Sep 2026.
- **Scope:** 64 live (200) URLs. These are the B2B brand pages, `/business-software`, 9 `/compare/*` hubs, the best-X and vs pages, `/for-business`, `/partner-with-refer-labs`, the affiliate-programs cluster and `/deals`. The list was built from `sitemap.ts`, `catalog.ts` and `seo.ts`. A further 23 URLs that still had impressions now 308 or 410 and are listed separately.
- **GA4 caveat:** `affiliate_click` is consent-gated, so it counts consented traffic only (170 events sitewide in 90 days). It shows which pages send clicks. It is not a volume measure.

## Read these first

1. **The 90-day totals overstate where most brand pages stand today.** Impressions on the 35 B2B brand pages peaked at about 450 a week in mid-July (ISO weeks 29 and 30). Since August they have run at about 60 to 200 a week, while sitewide impressions rose 5x (1,228 in week 27, 6,342 in week 39). Seven brand pages have had no impressions since 16 Jul to 16 Aug: `/durableai`, `/alidrop`, `/pipedrive`, `/lindy`, `/trainual`, `/pandadoc`, and `/nutshell` from 4 Sep. I checked three by hand (`/pipedrive`, `/gohighlevel`, `/dext`). In each, the deep-position queries (p35 to p50) dropped out and nothing replaced them. Both tables below give 90-day and 28-day figures, and classes use the current state where the two disagree.
2. **Most brand pages have not been recrawled since July.** URL Inspection gives these last-crawl dates: `/pipedrive` 11 Jul, `/dext` 9 Jul, `/databox` 12 Jul, `/aisdr` 6 Jul, `/leadpages` 19 Jul, `/pandadoc`, `/blinq` and `/beautifulai` 14 Jul, `/krispcall`, `/trainual`, `/elevenlabs`, `/wing-assistant` and `/survicate` 9 Jul, `/gohighlevel` 6 Aug. The titles were rewritten on 23 Aug, 17 Sep and 19 Sep, and Google has not seen any of those three versions on these pages. **So no reading of a title change on these URLs is possible yet.**
3. **Five in-scope URLs are not in Google's index:**
   - `/carrd`: Discovered, not indexed.
   - `/carrd-vs-butternut`: Discovered, not indexed.
   - `/compare/sales-outreach`: Discovered, not indexed.
   - `/compare/business-phone`: "URL is unknown to Google" (it read Discovered on the first call, so treat it as not indexed).
   - `/durableai`: Crawled, not indexed. Last crawl 22 May, last impression 16 Jul.
   - `/newsletter-platform-quiz` is also Crawled, not indexed.

   All five are in the sitemap and return 200 with `index, follow` and a self-canonical, which I checked live. This is a crawl-priority or quality verdict. It is not a tagging fault.
4. **Anonymised queries are a large share.** Of the 960 impressions on `/best-newsletter-platform`, 815 carry no query row. The figure is 3,487 of 7,098 on `/affiliate-programs-australia`. Long question-shaped queries that look AI-generated, sitting at p1 to p3 with 0 clicks (for example "which affiliate platforms in australia are best for subscription services and recurring commissions?"), pull the average positions upward on the affiliate-cluster pages.

## Site CTR medians by page shape (own data, not a benchmark)

Pages with at least 100 impressions and an average position of 20 or better, across the whole site, 90 days:

| Shape | n | Median CTR | Median position |
|---|---|---|---|
| Brand pair (x-vs-y) | 9 | 1.79% | 7.9 |
| Category ranking (best-X, affiliate lists) | 8 | 1.05% | 10.6 |
| Guide | 6 | 1.05% | 9.0 |
| Cost explainer | 3 | 0.58% | 12.4 |
| Brand page (single vendor, review, alternatives) | 21 | 0.44% | 10.4 |
| Hub | 2 | 6.16% | 8.9 (n=2, includes the homepage; **not usable**) |

Class (d) means CTR below half of the shape median, on at least 100 impressions at position 20 or better. Treat the brand-page flags as weak. At a 0.44% median, a page with 150 to 230 impressions would expect about 1 click, so a 0-click result is not significant. The only statistically meaningful (d) flags are `/best-newsletter-platform` (960 impressions, 1 click, against about 10 expected) and `/recurring-affiliate-programs` (587 impressions, 2 clicks, against about 6 expected).

## Classes (current state)

- **(a) Near page 1, positions 5 to 20 with real impressions:**
  - Affiliate cluster: `/affiliate-programs-australia` (13.7 over 28 days, 11.6 in the last 11), `/recurring-affiliate-programs`, `/high-paying-affiliate-programs`, `/affiliate-software-australia`, `/how-to-start-affiliate-marketing-australia` (17.0).
  - Newsletters: `/best-newsletter-platform`, `/beehiiv`, `/compare/newsletter-platforms`.
  - Brand pages: `/superfiliate`, `/replyio` (19.7, then 11.4 in the last 11 days), `/brevo` (19.1, then 14.5), `/activecampaign`, `/capsule`, `/swipepages`, `/hellobar`.
  - Hubs, comparisons and quizzes: `/best-ai-sales-tools` (16.4 over 28 days), `/compare/ai-tools`, `/durable-vs-butternut`, `/carrd-vs-durable`, `/website-builder-quiz` (7.0 over 28 days), `/business-software` (19.5 over 28 days).
  - Other: `/partner-with-refer-labs`, `/for-business`.
- **(b) Impressions but deep:**
  - `/best-crm-small-business-australia`: 2,772 impressions at p61.9; 48.2 over the last 11 days.
  - `/compare/hr-payroll`: 1,641 at p43.7 over 90 days, 23.5 over 28 days, and 10.3 over the last 11 days. It is climbing.
  - `/compare/ai-sales-tools` (p29), `/employmenthero` (p21.8 over 28 days), `/unbounce` (p25.5), `/compare/payments` (p23), `/pandadoc` (p43, now zero), `/pipedrive` (p43.5, now zero), `/gohighlevel` (p42 over 90 days; 11 impressions at p8 over 28 days).
- **(c) Zero impressions in 90 days:** `/carrd`, `/carrd-vs-butternut`, `/compare/business-phone` (none of them indexed).
- **Effectively zero over the last 28 days while indexed:** `/alidrop`, `/trainual`, `/lindy`, `/pipedrive`, `/pandadoc`, `/ai-sales-tools-quiz`, `/compare/sales-outreach`. Also `/butternut` (2), `/databox` (2), `/dext` (5), `/leadpages` (1), `/krispcall` (1) and `/nutshell` (1).
- **(d) Below shape median:** `/best-newsletter-platform` 0.10% against 1.05%, and `/recurring-affiliate-programs` 0.34% against 1.05% (both meaningful). The weak flags are `/butternut`, `/databox`, `/swipepages` and `/beehiiv` (0 clicks on 127 to 232 impressions).

**Real offers in scope** (from the `DEALS` rows in `offers.ts`, not from a string search):

- `/unbounce`: 20% off 3 months, or 35% off the first year.
- `/leadpages`: 20% off annual billing.
- `/superfiliate`: 15% off the monthly fee.
- `/alidrop`: US$1 for a 7-day trial.

No B2B page holds a code. All six codes are health or pet codes.

## Near page 1, ranked by impressions × gap to position 3

The score is 28-day impressions × (position − 3), with the 90-day score for reference. Pages that have collapsed to near zero over 28 days rank low on purpose.

| # | URL | 28d impr | 28d pos | 28d score | 90d impr / pos | Monetisation / notes |
|---|---|---|---|---|---|---|
| 1 | /affiliate-programs-australia | 2,695 | 13.7 | 28,819 | 7,098 / 17.7 | Earns nothing. **Jarred decided on 29 Sep to leave it as is, and it must not be re-proposed.** Listed for completeness only. |
| 2 | /recurring-affiliate-programs | 370 | 7.7 | 1,743 | 587 / 9.2 | Same cluster, no partner CTA. (d) CTR. |
| 3 | /replyio | 95 | 19.7 | 1,587 | 305 / 24.9 | Reply.io affiliate. The brand query "replyio" sits at p19.5 and the page is at 11.4 over the last 11 days. |
| 4 | /how-to-start-affiliate-marketing-australia | 102 | 17.0 | 1,433 | 137 / 20.9 | Best CTR in scope at 4.4%, but no money route. |
| 5 | /best-newsletter-platform | 218 | 8.6 | 1,228 | 960 / 10.9 | beehiiv link (3 affiliate_clicks). (d) CTR. The "convertkit vs substack" gap sits here. |
| 6 | /brevo | 71 | 19.1 | 1,143 | 214 / 33.5 | Brevo affiliate, and rising. Its coupon-code queries sit at p43 to p50 and we hold no code. |
| 7 | /business-software | 37 | 19.5 | 611 | 85 / 31.6 | Hub. Its top query "crm comparison australia" is at p53. |
| 8 | /best-ai-sales-tools | 42 | 16.4 | 562 | 332 / 42.3 | 3 affiliate_clicks. "aisdr alternatives" (118 impressions) sits here at p46. |
| 9 | /compare/newsletter-platforms | 44 | 14.6 | 509 | 101 / 21.9 | Competes with #5 for "convertkit vs substack". |
| 10 | /compare/ai-tools | 41 | 14.5 | 470 | 48 / 13.8 | |
| 11 | /activecampaign | 34 | 15.2 | 414 | 47 / 23.2 | "activecampaign review" at p2 (6 impressions). |
| 12 | /capsule | 28 | 16.3 | 372 | 63 / 23.4 | |
| 13 | /durable-vs-butternut | 31 | 13.6 | 329 | 81 / 12.6 | Brand pair. |
| 14 | /high-paying-affiliate-programs | 66 | 7.3 | 281 | 78 / 8.5 | No money route. |
| 15 | /swipepages | 38 | 9.9 | 264 | 140 / 14.3 | |
| 16 | /beehiiv | 72 | 6.2 | 229 | 127 / 10.7 | "beehiiv promo code" at p3.3 with 0 clicks. The live title is "beehiiv Review 2026: vs Substack". |
| 17 | /affiliate-software-australia | 41 | 8.3 | 217 | 48 / 7.9 | Superfiliate is the partner here. |
| 18 | /website-builder-quiz | 41 | 7.0 | 165 | 73 / 31.0 | "best website builder" at p4 (23 impressions). |
| 19 | /superfiliate | 59 | 5.2 | 131 | 68 / 5.6 | **Real 15% offer, 3 affiliate_clicks, and 54 of its 59 impressions came in the last 11 days.** "superfiliate pricing" is at p4.6. |

`/compare/hr-payroll` does not qualify on its 28-day average (23.5), but it has been at 10.3 over the last 11 days (183 impressions), with "payroll programs" at p5.0 and "hr payroll" at p4.1. Watch it as a near-page-1 page.

## Cannibalisation: two or more of our URLs taking impressions for one query

| Query (90d) | URLs (impressions, position) | Real? |
|---|---|---|
| employment hero payroll software (87) | /compare/hr-payroll (63, p21) · /employmenthero (24, p30) | **Yes.** The hub outranks the brand page on the brand's own name. The same split shows on "employment hero hr software" (54 vs 1), "all-in-one hr, payroll & hiring platform" (65 vs 24), "employment hero pricing" (25 across both), "hr platform" (166 vs 17) and "employment hero alternatives" (27, hub only). |
| convertkit vs substack (60) | /best-newsletter-platform (46, p22) · /compare/newsletter-platforms (14, p41) | **Yes, small.** |
| butternut ai (62) / butternut.ai (31) | /butternut (49, p8.6) · /best-website-builder (7+19, p32 to p43) · /durable-vs-butternut (5+9) · /compare/website-builders | **Yes.** The brand page should own these. On "butternut.ai" the hub takes more impressions than the brand page (19 against 1). |
| aisdr review (53) | /aisdr (48, p29) · /best-ai-sales-tools (5, p39) | Mild. The larger issue is that "aisdr alternatives" (118) goes only to /best-ai-sales-tools, at p46. |
| crm comparison australia (37) | /business-software (22, p53) · /best-crm-small-business-australia (15, p45) | Yes, but both are deep. |
| best affiliate programs australia and about 15 variants | /affiliate-programs-australia · /blog/best-affiliate-programs-australia-2026 | **No, this is historical.** The blog URL has 301'd to the hub since 6 Jul, and all 575 of its impressions fall in July. |
| affiliate programs (125) | /affiliate-programs-australia (p34.7) · /recurring-affiliate-programs (12, p3.9) · others | Minor, and inside a cluster Jarred has parked. |

Outside B2B scope, noted for the owner of `/deals`: `/deals` competes with the brand pages on "knose promo code" (158 vs 197), "mosh discount code" (80) and "moshy discount code" (109). The code-visibility work on 29 Sep covers this.

## Edited in the measurement window: before/after readings are void

`git log --since=2026-06-01` shows **every** in-scope page edited several times inside the 90-day window, and all but one inside the 28-day window. The shared sweeps were on 5 Sep (disclosure hoist, answer-first leads), 14 to 15 Sep (price fixes, AI-slop sweep, phone audit), 18 Sep (theme) and 24 Sep (lead rewrites). There were also page-specific edits: `/employmenthero` and `/dext` on 30 Sep, `/superfiliate` on 23 Sep, `/for-business` on 28 Sep, `/databox` on 5 and 14 Sep. **No control group exists, so do not read any change in this data as an effect of an edit.**

**Title churn in `seo.ts`:**

- About 26 B2B brand titles changed three times in the window:
  - 23 Aug: "X Review 2026: …" became "X Discount Code 2026: Is There One?"
  - 17 Sep: that became "X Discount Code 2026: No Code, …"
  - 19 Sep: that became "X Review 2026: …"
- Four more titles changed in the window:
  - `/best-newsletter-platform`: 28 Aug and 5 Sep.
  - `/best-crm-small-business-australia` and `/affiliate-programs-australia`: 28 Aug.
  - `/durableai`: 5 Sep.
- `/databox` changed three times on 5 Sep alone.

GA4 page-title reports will therefore list one URL under up to four titles. **That is not cannibalisation.** For the pages last crawled in July (see above), Google is still serving a title that predates all of these changes.

**Redirect history that distorts the 90-day totals:** `/databox` 301'd from 22 Jul to 5 Sep (commit 7f7ee35d, "Actually remove the /databox redirect"). Its 169 July and August impressions, including "databox discount code" (119 at p10), accrued partly while it redirected, and it has had 2 impressions since.

## Queries with impressions but no page answering the exact intent

These were filtered through the revenue-first and citation rules. **None justifies a new page.** Each is a fold into an existing page.

1. **"aisdr alternatives" (120 impressions, p46) plus "aisdr vs dashly" (22, p23).** The entity is named and the money route is the AiSDR affiliate link plus the Reply.io and GoHighLevel links. `/aisdr` has no alternatives section: its live h2s are what it is, who it's for, how it works, pricing, getting started and FAQ. The move is to add an h2 on `/aisdr` phrased as the buyer's question verbatim. Dashly is not a partner, so there is no pair page.
2. **Employment Hero pricing, alternatives and payroll software (about 140 impressions, p21 to p46), currently landing on `/compare/hr-payroll`.** The money route is the Employment Hero affiliate link. `/employmenthero` should answer the pricing question itself, with a primary-source price read from Employment Hero's own page and dated, or the words "quote-based" if Employment Hero publishes none. It should also take the brand-name queries back from the hub. No new page.
3. **"convertkit vs substack" / "kit vs substack" / "beehiiv vs convertkit" (about 70 impressions).** This is a brand pair. `/best-newsletter-platform` is already "beehiiv vs Substack: 0% vs 10% of Your Revenue", and the money route is its beehiiv link. The move is to add Kit's own fee and pricing, read from kit.com and dated, and a verbatim h2. It should not become a separate Kit vs Substack page, because we earn nothing on either of those two brands.

Rejected: brand discount-code queries for Brevo, Dext, Pipedrive, Leadpages, Wing Assistant and CloudTalk (about 180 impressions at p28 to p51). We hold no code, and pages stating "no code" have no fact that is wrong elsewhere. The one exception is Leadpages, whose real 20% annual offer is already on `/leadpages`. Also rejected: the generic CRM and HR head terms, which would be best-X pages with no brand pair; `<vendor> affiliate program` queries, which the 29 Sep decision covers; and queries on retired URLs such as instapage pricing and logome.

## Full tables

| URL | shape | 90d impr | 90d clicks | 90d CTR | 90d pos | 28d impr | 28d clicks | 28d pos | class | GSC index state (last crawl) | affiliate_click 90d | offer | top 90d queries (impr, pos) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /affiliate-programs-australia | category_ranking | 7098 | 68 | 0.96% | 17.7 | 2695 | 34 | 13.7 | a | indexed (2026-09-23) | 0 |  | best affiliate programs australia (200, p10); affiliate programs australia (144, p13); australian affiliate programs (130, p18); affiliate program (112, p41) |
| /best-crm-small-business-australia | category_ranking | 2772 | 0 | 0.00% | 61.9 | 1347 | 0 | 57.1 | b | indexed (2026-08-23) | 0 |  | best crm for small business australia (234, p55); crm small business (110, p68); crm australia (107, p51); best crm for small business (102, p55) |
| /deals | hub | 2119 | 6 | 0.28% | 22.3 | 1490 | 4 | 21.2 | b | indexed (2026-09-23) | 0 |  | vush discount code (216, p38); knose promo code (158, p38); kic discount code (111, p37); moshy discount code (109, p8) |
| /compare/hr-payroll | hub | 1641 | 1 | 0.06% | 43.7 | 368 | 0 | 23.5 | b | indexed (2026-09-23) | 0 |  | human resources payroll software (248, p57); hr and payroll software (228, p45); hr platform (166, p50); hr & payroll software (107, p47) |
| /best-newsletter-platform | category_ranking | 960 | 1 | 0.10% | 10.9 | 218 | 0 | 8.6 | a,d | indexed (2026-09-06) | 3 |  | convertkit vs substack (46, p22); which newsletter platform is best for monetization? (7, p7); compare the top b2c email tools for building a community newslett |
| /recurring-affiliate-programs | category_ranking | 587 | 2 | 0.34% | 9.2 | 370 | 2 | 7.7 | a,d | indexed (2026-09-23) | 0 |  | which affiliate platforms in australia are best for subscription services and recurring commissions? (27, p1); affiliate programs (12, p4); recurring commission |
| /best-ai-sales-tools | category_ranking | 332 | 1 | 0.30% | 42.3 | 42 | 0 | 16.4 | b | indexed (2026-09-02) | 3 |  | aisdr alternatives (118, p46); aisdr vs dashly (22, p23); ai sales tools (9, p62); top rated ai sdr tools (8, p86) |
| /replyio | brand_page | 305 | 2 | 0.66% | 24.9 | 95 | 1 | 19.7 | b | indexed (2026-09-23) | 0 |  | replyio (110, p23); reply io (29, p38); reply.io multichannel outreach (16, p9); reply.io review (9, p48) |
| /butternut | brand_page | 232 | 0 | 0.00% | 7.5 | 2 | 0 | 6 | a,d | indexed (2026-08-11) | 0 |  | butternut ai (49, p9); butternut ai reviews (8, p12); butternut ai website builder (6, p7); butternut ai website builder review (4, p10) |
| /brevo | brand_page | 214 | 0 | 0.00% | 33.5 | 71 | 0 | 19.1 | b | indexed (2026-09-14) | 0 |  | brevo coupon code (24, p50); brevo (15, p28); brevo promo code (8, p49); brevo discount code (7, p43) |
| /databox | brand_page | 171 | 0 | 0.00% | 13.8 | 2 | 0 | 12 | a,d | indexed (2026-07-12) | 0 |  | databox discount code (119, p10); databox discount (30, p10); databox pricing (12, p50); databox affiliate program (3, p22) |
| /gohighlevel | brand_page | 164 | 0 | 0.00% | 42.2 | 11 | 0 | 8.1 | b | indexed (2026-08-06) | 0 |  | gohighlevel australia (85, p50); gohighlevel (29, p35); go high level australia (10, p62); go highlevel (8, p42) |
| /employmenthero | brand_page | 148 | 0 | 0.00% | 30.9 | 49 | 0 | 21.8 | b | indexed (2026-09-23) | 0 |  | all-in-one hr, payroll & hiring platform (24, p46); employment hero payroll software (24, p30); hr platform (17, p69); employment hero pricing (6, p13) |
| /swipepages | brand_page | 140 | 0 | 0.00% | 14.3 | 38 | 0 | 9.9 | a,d | indexed (2026-09-18) | 0 |  | swipe pages (4, p25); swipe code (2, p1); swipe pages lifetime deal (2, p22); swipepages.com (2, p36) |
| /compare/ai-sales-tools | hub | 139 | 0 | 0.00% | 36.9 | 90 | 0 | 29.0 | b | indexed (2026-09-23) | 0 |  | ai for sales (10, p24); ai powered membership sales tool (8, p71); rep ai vs outreach (7, p5); ai sales (5, p31) |
| /how-to-start-affiliate-marketing-australia | guide | 137 | 6 | 4.38% | 20.9 | 102 | 5 | 17.0 | b | indexed (2026-08-20) | 0 |  | affiliate network australia (7, p3); affiliate marketing (6, p58); how does affiliate marketing work (6, p4); how to start affiliate marketing with no money (5, |
| /beehiiv | brand_page | 127 | 0 | 0.00% | 10.7 | 72 | 0 | 6.2 | a,d | indexed (2026-09-22) | 0 |  | beehiiv promo code (9, p3); beehiiv free tier (1, p25); best newsletter platform for creators software (1, p1); recommendations for newsletter platform for crea |
| /dext | brand_page | 127 | 0 | 0.00% | 28.9 | 5 | 0 | 8 | b | indexed (2026-07-09) | 0 |  | dext discount code (21, p28); dext promo code (18, p36); dext discount code australia (12, p21); dext (10, p44) |
| /aisdr | brand_page | 124 | 0 | 0.00% | 23.6 | 11 | 0 | 7.3 | b | indexed (2026-07-06) | 0 |  | aisdr review (48, p29); aisdr (10, p43); ai sdr (3, p85); ai sdr reviews (3, p45) |
| /compare/newsletter-platforms | hub | 101 | 1 | 0.99% | 21.9 | 44 | 1 | 14.6 | b | indexed (2026-09-08) | 0 |  | convertkit vs substack (14, p41); kit vs substack (5, p40); newsletter platforms (3, p25); "beehiiv" -site:reddit.com -site:twitter.com -site:x.com -site:wykop. |
| /pandadoc | brand_page | 96 | 0 | 0.00% | 43.4 | 0 | 0 | - | b | indexed (2026-07-14) | 0 |  | pandadoc (24, p35); pandadoc pricing (13, p56); panda docs (9, p31); pandadoc pricing plans explained (9, p62) |
| /best-website-builder | category_ranking | 94 | 0 | 0.00% | 26.9 | 12 | 0 | 10.8 | b | indexed (2026-09-14) | 0 |  | butternut.ai (19, p43); butternut ai (7, p32); firelabs website builder (2, p6); b2b website builder (1, p86) |
| /durableai | brand_page | 91 | 0 | 0.00% | 9.1 | 0 | 0 | - | a | Crawled - currently not indexed (2026-05-22) | 1 |  | durable ai website builder pricing free plan official (4, p11); durable ai website builder pricing free trial official (4, p8); durable ai website builder free  |
| /business-software | hub | 85 | 0 | 0.00% | 31.6 | 37 | 0 | 19.5 | b | indexed (2026-09-15) | 0 |  | crm comparison australia (22, p53); best crm for lead generation business australia (3, p90); "cloudtalk" (1, p32); "dext" -dextools -capital -dexter (1, p96) |
| /for-business | hub | 84 | 3 | 3.57% | 7.1 | 23 | 0 | 2.5 | a | indexed (2026-09-23) | 0 |  | health affiliate programs australia (2, p96); referlab (1, p45) |
| /durable-vs-butternut | brand_pair | 81 | 0 | 0.00% | 12.6 | 31 | 0 | 13.6 | a | indexed (2026-09-20) | 0 |  | butternut.ai (9, p30); butternut ai (5, p18); butternut ai reviews (2, p15); butternut ai portfolio builder (1, p17) |
| /high-paying-affiliate-programs | category_ranking | 78 | 1 | 1.28% | 8.5 | 66 | 1 | 7.3 | a | indexed (2026-08-22) | 0 |  |  |
| /website-builder-quiz | quiz | 73 | 1 | 1.37% | 31.0 | 41 | 1 | 7.0 | b | indexed (2026-09-22) | 0 |  | best website builder (23, p4); website builder test (10, p46); website builder quiz (4, p72); quiz builder for website (1, p86) |
| /pipedrive | brand_page | 68 | 0 | 0.00% | 43.5 | 0 | 0 | - | b | indexed (2026-07-11) | 0 |  | pipedrive australia (7, p49); pipedrive promo code (7, p51); pipedrive coupon code (6, p50); pipedrive discount code (6, p51) |
| /superfiliate | brand_page | 68 | 0 | 0.00% | 5.6 | 59 | 0 | 5.2 | a | indexed (2026-09-22) | 3 | 15% off monthly fee | superfiliate pricing (19, p5); superfiliate reviews (2, p16); superfiliate logo (1, p16) |
| /capsule | brand_page | 63 | 0 | 0.00% | 23.4 | 28 | 0 | 16.3 | b | indexed (2026-09-24) | 0 |  | capsule crm (5, p42); capsule crm affiliate (2, p22); capsulecrm (2, p54); simple crm australia (2, p18) |
| /beautifulai | brand_page | 52 | 0 | 0.00% | 26.1 | 5 | 0 | 5.2 | b | indexed (2026-07-14) | 0 |  | "beautiful.ai_" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com -site:booking.com -site:fac |
| /landingi | brand_page | 51 | 0 | 0.00% | 24.0 | 2 | 0 | 9 | b | indexed (2026-07-12) | 0 |  | landingi pricing (12, p44); "landingi" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com -sit |
| /blinq | brand_page | 49 | 0 | 0.00% | 14.6 | 7 | 0 | 7.1 | a | indexed (2026-07-14) | 0 |  | blinq (6, p31); blinq pricing (3, p27); blinq business card (1, p28) |
| /compare/ai-tools | hub | 48 | 0 | 0.00% | 13.8 | 41 | 0 | 14.5 | a | indexed (2026-09-22) | 0 |  | best ai sales tools (13, p18); "elevenlabs" (1, p43); best ai tools (1, p66); eleven labs (1, p9) |
| /affiliate-software-australia | category_ranking | 48 | 0 | 0.00% | 7.9 | 41 | 0 | 8.3 | a | indexed (2026-08-21) | 0 |  | which affiliate platforms in australia offer the lowest fees and what are their typical pricing tiers? (6, p1); affiliate platform (5, p4); affiliate programs a |
| /activecampaign | brand_page | 47 | 0 | 0.00% | 23.2 | 34 | 0 | 15.2 | b | indexed (2026-09-24) | 0 |  | activecampaign review (6, p2); active campaign (5, p9); activecampaign perth (5, p48); crm email marketing (5, p16) |
| /affiliate-earnings-calculator | cost_explainer | 46 | 0 | 0.00% | 24.9 | 9 | 0 | 10.9 | b | indexed (2026-07-17) | 0 |  | affiliate commission calculator (2, p59); how much can i earn from affiliate marketing (2, p37); affiliate earnings (1, p21); affiliate income (1, p34) |
| /leadpages | brand_page | 44 | 0 | 0.00% | 22.9 | 1 | 0 | 10 | b | indexed (2026-07-19) | 0 | 20% off annual | "landingi" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com -site:booking.com -site:facebook |
| /partner-with-refer-labs | guide | 43 | 1 | 2.33% | 8.1 | 27 | 1 | 8.7 | a | indexed (2026-09-23) | 0 |  | yes (1, p7); referral lab (1, p33) |
| /compare/lead-generation | hub | 39 | 0 | 0.00% | 54.6 | 5 | 0 | 7.4 | b | indexed (2026-09-23) | 0 |  | compare quiz funnel software for high-intent lead capture (5, p70); survey lead generation (5, p78); lead generation surveys (2, p82); survey to generate leads  |
| /hellobar | brand_page | 38 | 0 | 0.00% | 13.4 | 19 | 0 | 6.3 | a | indexed (2026-09-23) | 1 |  | hello bar (2, p4); hello bar & subscribers (2, p4); hellobar (2, p26); email capture (1, p6) |
| /elevenlabs | brand_page | 32 | 0 | 0.00% | 31.7 | 3 | 0 | 9.7 | b | indexed (2026-07-09) | 0 |  | "elevenlabs" (11, p61); "eleven lab" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com -site: |
| /outgrow | brand_page | 32 | 0 | 0.00% | 16.6 | 1 | 0 | 3 | a | indexed (2026-07-11) | 0 |  | outgrow calculator (2, p22); outgrow affiliate program (1, p41) |
| /wing-assistant | brand_page | 31 | 0 | 0.00% | 17.3 | 2 | 0 | 9.5 | a | indexed (2026-07-09) | 0 |  | wing assistant promo code (3, p31); wing assistants (3, p9); wing assistant coupons (2, p38); wing assistant discount code (2, p28) |
| /compare/website-builders | hub | 30 | 1 | 3.33% | 35.6 | 11 | 0 | 8.6 | b | indexed (2026-09-15) | 2 |  | carrd alternatives (3, p62); butternut.ai (2, p56); the best website builder (1, p165); butternut ai (1, p16) |
| /compare/payments | hub | 26 | 0 | 0.00% | 22.3 | 18 | 0 | 23.3 | b | indexed (2026-09-12) | 0 |  | dext pricing australia (2, p8); payment software (2, p72); payments software (1, p100); payoneer quickbooks (1, p45) |
| /lindy | brand_page | 26 | 0 | 0.00% | 21.6 | 0 | 0 | - | b | indexed (2026-07-18) | 0 |  | lindy (2, p8); lindy ai (2, p36); lindy ai affiliate program (2, p32); lindy labs (2, p24) |
| /unbounce | brand_page | 26 | 0 | 0.00% | 33.9 | 18 | 0 | 25.5 | b | indexed (2026-08-21) | 0 | 20% off 3 mo / 35% off yr | 35 20% off (2, p6); bounce discount code (2, p66); bounce promo code (2, p76); bounce promotion code (1, p72) |
| /flexiquiz | brand_page | 20 | 0 | 0.00% | 11.1 | 3 | 0 | 5.3 | a | indexed (2026-07-11) | 0 |  | flexiquiz (1, p17); flexiquiz review (1, p29); flexiquiz.com (1, p36) |
| /carrd-vs-durable | brand_pair | 19 | 0 | 0.00% | 14.2 | 15 | 0 | 17.4 | a | indexed (2026-09-13) | 0 |  | business.site website (1, p9); which one of these is free? (1, p1) |
| /survicate | brand_page | 18 | 0 | 0.00% | 18.2 | 2 | 0 | 5.5 | a | indexed (2026-07-09) | 0 |  | "survicate" -"crypto" -"loadsurvicatejs" -"survey.survicate.com" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtu |
| /krispcall | brand_page | 16 | 0 | 0.00% | 35.6 | 1 | 0 | 5 | b | indexed (2026-07-09) | 0 |  | "cloudtalk" (7, p64); "krispcall" (1, p5); krispcall sign up (1, p7) |
| /alidrop | brand_page | 9 | 0 | 0.00% | 18.4 | 0 | 0 | - | a | indexed (2026-07-24) | 0 | US$1 7-day trial | "cloudtalk" (3, p32); "krispcall" (2, p8) |
| /trainual | brand_page | 8 | 0 | 0.00% | 28.6 | 0 | 0 | - | b | indexed (2026-07-09) | 0 |  | trainual promo code (2, p36) |
| /ai-sales-tools-quiz | quiz | 6 | 0 | 0.00% | 36 | 0 | 0 | - | b | indexed (2026-07-19) | 0 |  | sales roleplay tool comparison keywords (2, p59); ai refer (1, p76) |
| /fullenrich | brand_page | 3 | 0 | 0.00% | 15.7 | 3 | 0 | 15.7 | a | indexed (2026-08-27) | 1 |  | linkedin data provider (1, p17) |
| /nutshell | brand_page | 3 | 0 | 0.00% | 6.7 | 1 | 0 | 8 | a | indexed (2026-07-21) | 0 |  |  |
| /keap | brand_page | 3 | 0 | 0.00% | 6.7 | 3 | 0 | 6.7 | a | indexed (2026-09-14) | 0 |  |  |
| /compare/sales-outreach | hub | 1 | 0 | 0.00% | 1 | 0 | 0 | - | top | Discovered - currently not indexed  | 0 |  |  |
| /newsletter-platform-quiz | quiz | 1 | 0 | 0.00% | 2 | 1 | 0 | 2 | top | Crawled - currently not indexed (2026-08-25) | 0 |  |  |
| /compare/business-phone | hub | 0 | 0 | 0.00% | None | 0 | 0 | - | c | URL is unknown to Google  | 0 |  |  |
| /carrd | brand_page | 0 | 0 | 0.00% | None | 0 | 0 | - | c | Discovered - currently not indexed  | 0 |  |  |
| /carrd-vs-butternut | brand_pair | 0 | 0 | 0.00% | None | 0 | 0 | - | c | Discovered - currently not indexed  | 0 |  |  |

| Retired URL (live status) | 90d impr | 90d pos | top queries |
|---|---|---|---|
| /blog/best-affiliate-programs-australia-2026 (308 https://referlabs.com.au/affiliate-programs-australia) | 542 | 11.4 | affiliate programs australia (35, p18); australian affiliate programs (35, p23); best affiliate programs austr |
| /incomelab (308 https://referlabs.com.au/affiliate-programs-australia) | 276 | 18.9 | income generating creator australia (17, p10); artificial intelligence side hustle (4, p19); make money online |
| /logome (308 https://referlabs.com.au/compare/ai-tools) | 54 | 15.7 | logome.ai (16, p18); logome coupon (9, p22); logome (8, p13); logome ai (7, p8) |
| /instapage (308 https://referlabs.com.au/swipepages) | 51 | 33.8 | instapage pricing (31, p43); instapages (4, p38); how much is a landing page (3, p4); instapage affiliate prog |
| /cloudtalk (308 https://referlabs.com.au/krispcall) | 45 | 15.3 | "cloudtalk" (4, p12); cloudtalk (4, p28); cloudtalk discount code (4, p14); cloudtalk promo code (3, p30) |
| /zoominfo (308 https://referlabs.com.au/best-ai-sales-tools) | 36 | 12.9 | zoominfo affiliate program (2, p12); how much is zoominfo (1, p52); zoominfo cost per month (1, p55); zoominfo |
| /referral (308 https://referlabs.com.au/) | 33 | 6.7 | calibrate referral (3, p46) |
| /alohi (308 https://referlabs.com.au/business-software) | 27 | 12.9 | alohi sa (2, p26); aloha fax (1, p11); alohi * faxplus (1, p10); alohi * faxplus plan-les-ouates zh (1, p14) |
| /melio (308 https://referlabs.com.au/compare/payments) | 23 | 21.9 | melio pricing (4, p51); melio customer service number (1, p37); melio payments (1, p32); polymarket platform u |
| /mailchimp (410) | 15 | 26.1 |  |
| /squarespace (410) | 9 | 17.4 |  |
| /klaviyo (410) | 8 | 24.4 |  |
| /flocksy (308 https://referlabs.com.au/business-software) | 8 | 15.4 | flocksy pricing (1, p33) |
| /meetgeek (308 https://referlabs.com.au/compare/ai-tools) | 7 | 10.9 |  |
| /services (308 https://referlabs.com.au/for-business) | 7 | 4.9 |  |
| /gtm (410) | 4 | 17.2 |  |
| /square (410) | 4 | 9.8 |  |
| /make (410) | 4 | 39.2 | integromat consulting (2, p52) |
| /meta-ads (410) | 3 | 8 |  |
| /stripe (410) | 2 | 10 |  |
| /calendly (410) | 2 | 22 |  |
| /webflow (410) | 1 | 15 |  |
| /cometchat (308 https://referlabs.com.au/business-software) | 1 | 10 |  |
