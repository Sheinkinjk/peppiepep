# Part 0: does only a discount code convert?

**Prepared 19 September 2026.** Read-only. Sources: the built site at `.next/server/app` (build of 19 Sep 2026, commit `15b236a` plus the `/deals` retitle), Google Search Console via `scripts/google-data.mjs` (property `sc-domain:referlabs.com.au`, read 19 Sep 2026), the PartnerStack export at `reports/conversions/partnerstack-team-member-2025-09-to-2026-09.csv` (read 5 Sep 2026, summarised in `reports/partnerstack-zero-conversions-2026-09-05.md`), and project notes. GA4 was not read: the property ID has not been supplied, so outbound-click counts per merchant are not in this report.

## Verdict

**UNTESTABLE WITH AVAILABLE DATA.** H0 ("only codes convert; plain links produce zero") is **not supported**: the data cannot distinguish "plain links do not convert" from "plain links were never shown to buyers". Plain-link pages received 68 Google clicks in 90 days, and 57 of those went to one page read by would-be affiliates, not buyers. The instrument could not have seen a plain-link conversion at any meaningful rate. H1 (codes convert materially better at matched position and intent) cannot be tested either: no plain-link page has comparable position, intent and traffic, and no conversion data is joined to pages for any merchant.

What the data does support is narrower and still useful: **every page that earns sits in the two health code clusters, and those clusters are also where almost all the buyer-intent search traffic is.** Codes and exposure are confounded, so the site's own history cannot say which one did the work.

## 1. Every affiliate link, classified

From the rendered HTML of the 177 live sitemap URLs (retired pages that 308 are excluded):

| Class | Definition | Link instances | Pages | Merchants |
|---|---|---|---|---|
| CODE | reader gets a typed code | 88 | 32 | 4: Moshy REFERRAL120, Mosh REFERAL55, Knose referlab2mf, PetsOnMe REFERLABS |
| OFFER | reader gets an automatic incentive, no code | 32 | 7 | 5: Juniper free first consult, Superfiliate 15%, Leadpages 20% annual, Unbounce 20%/35%, AliDrop US$1 trial |
| PLAIN | no consumer-side upside | 348 | 79 | 44 (SaaS on PartnerStack and direct, Commission Factory retail, Midoc, Dense, EcoFlow, Anker SOLIX) |
| **Total** | | **468** | **118** | **53** |

Apollo Energy Group ($500 off) is not in this table: it has no outbound link. Its offer runs through the on-site quote form (`/api/apollo-eoi`), so it is a lead, not a click.

## 2. Exposure by class (Google, 20 Jun to 17 Sep 2026)

Page class is the highest class of any link on the page.

| Class | Pages | Pages with any impressions | Pages averaging top 20 | Impressions | Clicks | Impression-weighted position | Buyer-intent query impressions / clicks |
|---|---|---|---|---|---|---|---|
| CODE | 32 | 31 | 18 | 22,552 | **267** | **15.3** | 4,745 / 47 |
| OFFER | 7 | 7 | 4 | 1,005 | 4 | 12.8 | 196 / 2 |
| PLAIN | 79 | 62 | 30 | 15,961 | **68** | **30.1** | 2,374 / 6 |

"Buyer-intent" means the query contains discount, promo, code, coupon, price, pricing, cost, review, vs, best, cheap, trial, sign up or buy. It is a crude filter and is labelled as such.

**The critical check.** Of the 68 plain-page clicks, **57 are `/affiliate-programs-australia`**, a page about joining affiliate programs whose readers are prospective affiliates, not customers of the merchants linked. Removing it leaves **about 11 Google clicks in 90 days across 78 plain-link commercial pages**, and 6 buyer-intent clicks. The plain pages with the most impressions rank at positions 47 to 64 (`/best-crm-small-business-australia` pos 63.8, `/compare/hr-payroll` pos 47.9). At that exposure, zero conversions is the expected result whatever the link type. **The instrument could not have seen a plain-link conversion.**

The PartnerStack figure often quoted as proof (1,236 clicks, 1 signup, 0 revenue across 49 merchants, Sep 2025 to Sep 2026) does not rescue H0:
- 1,236 outbound clicks is far more than Google delivered to those pages (68 in 90 days). The surplus is unexplained traffic, and at least part of it is our own tooling: link audits on 14 and 19 Sep 2026 fetched every partner link with a browser user-agent, which a network records as a click. The click count is contaminated and cannot be used as a conversion denominator.
- The merchants are B2B SaaS, a different purchase (monthly software, trial first, business buyer) from a consumer telehealth first order. A zero there says nothing about a consumer plain link.

## 3. H1 at matched position and intent

No plain-link page matches a code page on both position and intent with enough traffic to compare. The closest pairs:

| Plain page | Pos | Clicks 90d | Nearest code page | Pos | Clicks 90d |
|---|---|---|---|---|---|
| `/best-newsletter-platform` | 10.6 | 1 | `/mosh-vs-dense` | 10.9 | 5 |
| `/anker-solix` | 8.8 | 0 | `/moshy-vs-juniper` | 6.8 | 62 |
| `/butternut` | 7.4 | 0 | `/best-weight-loss-telehealth-australia` | 7.9 | 69 |

These differ in query volume by one to two orders of magnitude, so even the click comparison is not matched, let alone conversions. **Effect size: not computable. Sample size of matched pairs: 0.** Conversions are not joined to pages for any merchant: Moshy and Mosh pass no SubID (`reports/conversions/README.md`), and Commission Factory, Midoc and Juniper exports are not in the repo.

## 4. What would make this testable

1. **Page-level conversions for the code brands.** Ask Moshy and Mosh for redemptions by date, or for a SubID parameter; Juniper already passes `utm_campaign`. Without this, no conversion rate exists for any page.
2. **GA4 `affiliate_click` by merchant and page** (supply the GA4 property ID; the reader is ready in `scripts/google-data.mjs`). This gives the denominator.
3. **A controlled pair.** One plain consumer brand with real buyer-intent demand, placed with the same prominence as Moshy on a page ranking in the top 10. Commission Factory retail partners (Emma Sleep, Foreo) were added on 16 Sep 2026 and have had three days; they are the natural control once they have 60 days of exposure.
4. **Strip our own tooling from click counts**: run link checks with HEAD against a non-tracking URL, or exclude the audit IPs, before reading any network click total again.

## 5. Stale payout figures

The brief states `/affiliate-programs-australia` "currently states Moshy pays $100/sale and Juniper $80 to $120/sale". **Checked 19 Sep 2026, this is not on the live site.** The rendered page, its source and the full git history (`git log -S` for "$80", "80-120" and "$100 per sale") contain no Moshy, Mosh or Juniper payout figure. No live page of the 177 states a payout rate for Moshy, Mosh or Juniper; the only mentions are "we may earn a commission" disclosures. If the figure was seen elsewhere (an older cached copy, a social post, a PDF), it needs locating before it can be corrected. Nothing to change on the site.
