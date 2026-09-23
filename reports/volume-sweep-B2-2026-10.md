# Volume sweep B2: beauty, fashion, eyewear, home, electronics, travel

**Date:** 19 September 2026. Every source was read on this date unless stated.
**Scope:** research only. Nothing under src/, public/, scripts/ or config was changed, nothing was committed.
**Companion data:** `data/volume-sweep-B2.json` (one object per brand, with payout basis, source, screen result, both volume estimates and both revenue estimates).
**Other half of the sweep:** food, pet, supplements, fitness and alcohol are covered by a separate agent.

## Status of this pass, stated first

The critical screen (program open, published payout, publisher code credited without a click, coupon clauses, cookie, application URL) is **complete for travel and for every brand in these categories that has a Commission Factory listing** (Emma, EcoFlow, Anker SOLIX, Foreo, The Beauty Chef, Ecosa, Hello Molly, Star RV, plus Origin and OneBed found along the way). **It is not complete for the large retailers on Impact, Rakuten or direct programs**: The Iconic, Mecca, Adore Beauty, Cotton On, Princess Polly, Showpo, Culture Kings, Temu, SHEIN, Sephora, Dyson, Specsavers, Koala, Sheet Society and the rest listed in section 5. Two research passes on those were still running when this file was written. Those rows carry volume estimates only and are scored **A$0 until screened**, which is what the screen rule requires. No payout was guessed to fill them.

## 1. The ranked table (no-click mechanism, default assumptions)

Formula, identical for every row: monthly volume x capture 10% x redemption 5% x payout x 12. Volumes are estimates (method in section 3). Revenue is A$0 for any row failing the screen.

| # | Brand | Payout (source, read 19 Sep 2026) | Code credited without click? | Coupon exclusion? | Est. code-query vol / month | Est. annual rev (code basis) | Est. review/vs vol / month | Est. annual rev (review basis) |
|---|---|---|---|---|---|---|---|---|
| 1 | **Emma Sleep** (CF 70242, existing) | 8% x AOV "over $588" = **A$47.04** floor; **A$23.52** if classed Offer ([CF](https://www.commissionfactory.com/advertiser-directory/emma-sleep-affiliate-program/70242)) | **Likely yes**: "personalised discount codes for you" plus CF Clickless tracking badge | Rate cut, not exclusion: "4% commission for Cashback, Loyalty, Offer" | 990 ("emma sleep"); up to 27,375 on bare "emma" (ambiguous) | **A$2,794** (up to A$77,263 on the ambiguous upper bound) | 116 ("emma sleep"); bare "emma" unusable | A$327 |
| 2 | **Moshy** (anchor) | **A$300**, operator's direct agreement, not published | **Yes** (confirmed 20 Aug 2026) | None known | ~100 (GSC, measured) | **A$1,800** | ~333 (GSC, measured) | **A$5,994** |
| 3 | EcoFlow AU (CF 88567, existing) | 8% x "AUD 2,000" = **A$160** ([CF](https://www.commissionfactory.com/advertiser-directory/ecoflow-affiliate-program/88567)) | **Not yet**: platform supports it, no code issued to us; OzBargain's EFAUAFF6 is not ours | None stated | 76 | A$730 if a code is issued | 51,804 (broad, includes model reviews) | A$497,318 (not credible, see 4) |
| 4 | Star RV (CF 86430) | 5% x "AUD $3,000" = **A$150** ([CF](https://www.commissionfactory.com/advertiser-directory/star-rv-affiliate-program/86430)) | **On request**: "opportunities for: Unique discount codes", Clickless badge | None; "except PPC" | under 50 (below Trends threshold; 20 used) | A$180 | 78 | A$702 |
| 5 | Anker SOLIX (CF 91722, existing) | Stat "5.00%", text "Earn 7 %", AOV "Over $500" = **A$25 to A$35** | Not yet: no code stated | None; "except PPC" | UNVERIFIED (below threshold) | UNVERIFIED | 10,150 | A$15,225 at A$25 |
| 6 | The Beauty Chef (CF 57499) | 5% (text "up to 10%"), AOV unpublished: **UNVERIFIED** | Not stated; Clickless badge | None stated | 981 | UNVERIFIED (A$294/yr per A$100 of AOV at 5%) | 1,282 | UNVERIFIED |
| 7 | Foreo (CF 60709, existing) | 10%, AOV unpublished: **UNVERIFIED** | "Exclusive affiliate [offers]"; per-publisher code not stated | None stated | below threshold | UNVERIFIED | 2,909 | UNVERIFIED |
| 8 | Ecosa (CF 58459) | 2% default, AOV unpublished: **UNVERIFIED** | Not stated | None stated | 1,384 | UNVERIFIED | UNVERIFIED ("ecosa vs" inflates) | UNVERIFIED |
| 9 | Airalo (Impact) | "10% on the final sale value (after discounts are applied)"; AOV unpublished | "custom codes" issued; clickless not stated | No exclusion; "Rates may vary depending on promotional method" | not measured | UNVERIFIED | not measured | UNVERIFIED |
| F | Hello Molly (CF 41444) | 7% x "over $100" = A$7 | **No** | **Yes**: "orders generated with exclusive discount codes may not be commissionable" | 7,346 | **A$0** | 5,375 | A$0 |
| F | Booking.com | "starts at 4%" | **No**, session only | **Yes**: "Publishers who list vouchers ... will be removed from the programme" | 57,052 | **A$0** | 195,485 | A$0 |
| F | Expedia AU (Awin 121720), Hotels.com AU (Awin 121724) | "Lodging: 4%" | No, last click, 7-day cookie | **Yes**: "Lodging when a coupon is included: 0%" | 85,327 (Expedia) | **A$0** | 106,428 | A$0 |
| F | Klook | "2% to 20%" (Involve Asia) | Kreator program only, "minimum of 1000 followers on a social media platform" | **Yes**: "unsuitable promo codes earn 0% commission" | 34,117 | **A$0** | 63,736 | A$0 |
| F | Agoda, Trip.com | 4% to 5%; "Hotels 5.5%" | No evidence of codes; link-based | Brand bidding banned | 28,925; 55,540 | **A$0** | 85,684; 93,220 | A$0 |
| F | Wotif, Intrepid | No AU program found | n/a | n/a | 774; 1,358 | **A$0** | | |
| U | Luxury Escapes | UNVERIFIED (affiliate page unreadable to scripts) | UNVERIFIED | third-party only: existing customers 0 to 1.6% | 48,108 | A$0 until screened | 60,021 | |

F = fails the screen. U = unverified. Rows below Moshy on the code basis rank there because their payout or volume is lower, or unpublished.

**Does any candidate outrank Moshy?** On the code basis, **Emma Sleep does, narrowly (A$2,794 vs A$1,800), and only on the conservative "emma sleep" volume**. That lead does not survive realistic capture. Emma's code query is contested by Emma's own site, ShopBack, Cuponation and Finder, where Refer Labs (sitewide ~29k impressions and ~250 clicks per 28 days, most pages at positions 16 to 24) would realistically capture 1% to 3%, not 10%. Moshy's 10% is close to what it actually gets (position ~7 on its own code query, and no incumbent coupon site carries REFERRAL120). At 2% capture Emma is worth about A$560 a year. **On the review basis, Moshy leads every candidate that passes the screen** except EcoFlow and Anker SOLIX, whose review figures are inflated by product-model review queries and would need a code that neither has issued. No big-brand or travel code query outranks Moshy, because every large travel program fails the screen and the large retailers are unscreened.

## 2. Three most important findings

1. **Travel fails the screen almost completely.** Booking.com removes publishers who list vouchers. Expedia and Hotels.com pay "0%" on lodging "when a coupon is included". Klook zero-rates unsuitable codes and gives unique codes only to social creators with 1,000+ followers. Agoda and Trip.com are link-only. These brands carry some of the largest code-query volumes estimated here (Expedia ~85k, Booking ~57k, Trip.com ~56k a month), and all of it is worth A$0 to the no-click mechanism. Star RV (A$150, unique codes on request) is the only travel program with a route to it, and its code demand is below the Trends threshold.

2. **Commission Factory already supports the mechanism on almost every listing, so the question per merchant is whether it will issue us a code.** CF's help centre: clickless tracking "uses exclusive coupon code assigned to individual affiliate to match the transaction to the affiliate, instead of a click" ([help.commissionfactory.com/clickless-tracking](https://help.commissionfactory.com/clickless-tracking)). 536 of 554 CF directory listings carry the "Clickless tracking" badge, so the badge proves capability, not a code. Emma is the only existing relationship whose listing promises "personalised discount codes". EcoFlow, Anker SOLIX and Foreo are existing relationships with the capability and no code. **Asking Emma, EcoFlow, Anker SOLIX and Foreo for a Refer Labs code, set up as a CF clickless code, costs four emails and is the cheapest action in this sweep.** Hello Molly shows the opposite policy ("exclusive discount codes may not be commissionable").

3. **The default formula underprices Moshy by about two orders of magnitude, so it can rank candidates against each other but not size them.** Applied to Moshy it gives A$1,800 (code basis) or A$5,994 (review basis) a year, against actual revenue from roughly 69 Moshy and Mosh sales a month (the Part A finding). The code earns where it is displayed on high-impression comparison and review pages and in AI answers, not where code queries are captured. For this sweep the consequence is that **payout per sale and willingness to issue a clickless code matter more than code-query volume**, and on payout no screened candidate is close: Moshy pays A$300, Star RV A$150, EcoFlow A$160 (no code yet), Emma A$47. A non-telehealth candidate would need about six times Moshy's displayed-code exposure at Emma's payout to match one Moshy sale stream.

## 3. How the volumes were estimated (all estimates)

- **Anchor.** Search Console, 20 Jun to 17 Sep 2026 (`node scripts/google-data.mjs gsc 2026-06-20 2026-09-17 query`): Moshy code queries 255 impressions in 90 days at average position 7.2 (106 in the last 28 days; "moshy discount code" alone 98 at position 5.6). At page-1 positions impressions approximate searches, so **~100 code searches a month** (AU plus some NZ). Moshy review, "vs" and "legit" queries: 1,000 impressions in 90 days, **~333 a month**.
- **Google Trends** (Australia, past 12 months). The explore and widgetdata endpoints returned 429 without a session cookie and 200 with one. Code terms were `<brand> discount code + <brand> promo code + <brand> coupon code`; review terms `<brand> review + <brand> reviews + <brand> vs`. Every batch contained a shared reference (Sheet Society code terms, or Mecca code terms, which measured 21.5, 21.5 and 20.7 times Sheet Society in three separate batches), so all brands sit on one scale.
- **Linking the scale to Moshy.** Moshy's own code terms fall below Trends' reporting threshold, so they cannot be compared directly. Instead, brand-name interest ("moshy" vs eight retail pivot brands) was converted to code volume assuming each pivot's code share of brand searches equals Moshy's, then divided by the pivot's code index. The eight pivots implied 215 to 17,160 searches a month per Sheet Society unit, an 80x spread; the geometric mean, **2,165**, was used. Retail brands that sell mainly through other retailers (Bondi Sands, EcoFlow) sit at the high end, DTC code-heavy brands (Frank Body, The Beauty Chef, Sheet Society) at the low end.
- **Uncertainty.** Treat every absolute volume as order-of-magnitude, roughly x0.3 to x3. The ranking between brands is more reliable than any comparison with Moshy, because the scale error is common to every brand. Ambiguous names (Emma, Koala, Ninja, Quay, Clearly, Intrepid) inflate their review terms in particular and are flagged in the JSON. Brands below the threshold (Star RV, Foreo, Anker SOLIX codes, Lookfantastic, Oscar Wylee, Bailey Nelson, Instasmile, Smileie) are marked UNVERIFIED rather than zero.
- **Autocomplete** (`suggestqueries.google.com`, gl=au) returned code suggestions for 53 of the 54 brands tested, with Australia-qualified suggestions for most, so it confirms demand exists but does not separate brands. Counts are in the JSON.

## 4. Why the review-basis figures for big brands are not credible

The coordinator asked for a second column on review, comparison, "vs" and "is it worth it" demand, because Part A found the code earns when displayed on those pages. The column is computed as asked, and it breaks for big brands. For EcoFlow (51,804) and Anker SOLIX (10,150) the review term matches model-level reviews ("ecoflow delta 3 review"), which YouTube and tech publishers own. Refer Labs already ranks position ~9 for `/anker-solix` with 0 clicks in 90 days (from `reports/h0-code-hypothesis-2026-10.md`). A 10% capture on those queries is not realistic, and neither brand has issued us a code. Moshy's review column is different: it is measured, the pages rank at positions 6 to 10, and the code is in the title and description.

## 5. Brands with volume estimates but no completed screen (A$0 until screened)

Estimated code-query volume per month, highest first: The Iconic 155,603 · SHEIN 135,601 · Cotton On 78,648 · Temu 76,896 · Princess Polly 71,613 · Adore Beauty 65,490 · Dyson 63,101 · Specsavers 52,820 · Mecca 46,544 · Koala 43,721 (ambiguous) · Showpo 35,515 · Sephora 21,273 · Culture Kings 17,241 · Gymshark 12,478 · Ninja 11,774 (ambiguous) · Lorna Jane 9,698 · Adairs 9,436 · Breville 2,635 · Sheet Society 2,165 · Castlery 1,228 · Clearly 1,091 · Go-To 1,044 · Frank Body 997 · mcoBeauty 955 · SmartBuyGlasses 922 · Bondi Sands 439 · Sleeping Duck 309 · Eufy 188 · P.E Nation 176 · Quay 158.

What is known about them from earlier repo research (`reports/code-culture-map-2026-10.md`, 19 Sep 2026): Koala has Impact and Social Snowball (per-affiliate code platform) tags, payout UNVERIFIED; Breville "up to 8%" and Eufy "10%~15%", no AOV; Castlery Impact, rate unpublished; Clearly network unknown; Bailey Nelson's only program is Canadian (Awin 43511); Oscar Wylee and Specsavers no AU program found; Smileie US and Canada only; SmartBuyGlasses' CF 74282 is SEA only. SmileDirectClub is defunct (Dec 2023).

**Realistic capture for these.** The Iconic, SHEIN, Temu, Cotton On, Mecca and Adore Beauty code SERPs are held by the brand itself plus ShopBack, Cuponation, Finder, Groupon and OzBargain, all with far more authority than Refer Labs. A realistic capture within six months is well under 1%, not 10%. They also sell mostly at modest order values on percentage commissions, and large retail programs are the ones that most often cut coupon rates (see `research/coupon-site-models-2026-09-07.md`: median coupon-site rate about a third of the content rate). Even a pass on the screen would leave them small at our authority.

## 6. Conflicts with earlier research

| Earlier claim | Finding today |
|---|---|
| v1 map: Emma Sleep 8% x A$588 = A$47, "personalised discount codes" | Confirmed on the live listing. New: "4% commission for Cashback, Loyalty, Offer", so a code page classed as an Offer site may earn A$23.52. |
| v1 map: EcoFlow codes "not stated" | Still true. The CF Clickless badge shows capability only (536 of 554 listings carry it). |
| v1 map: Anker not assessed | CF 91722 listing conflicts with itself: "5.00% per sale" stat vs "Earn 7 %" in text; AOV "Over $500". |
| v1 map: Star RV contact | Contact now marketing@travviagroup.com. Terms unchanged. |
| `coupon-site-models-2026-09-07.md`: "Australian search volumes: UNKNOWN" | Now estimated, with the method and an x0.3 to x3 band. Still not keyword-tool figures. |
| Brief: "moshy discount code" ~98 impressions / 28 days at position 5.6 | Matches the 21 Aug to 17 Sep window. Over 90 days it is 222 at position 7.1. |

## 7. What would settle the open items

- **Four emails on existing CF relationships** (Emma, EcoFlow, Anker SOLIX, Foreo): ask for a Refer Labs code set up as a CF clickless code, and for Emma, which rate tier a code page falls in.
- **Star RV**: request the unique code the listing offers.
- **The unscreened retailers** (section 5): the two pending research passes, or an Impact publisher login, which shows terms only after acceptance.
- **A keyword tool** (Keyword Planner or Semrush, Australia) would replace the Trends scaling, whose 80x pivot spread is the largest single uncertainty here.
