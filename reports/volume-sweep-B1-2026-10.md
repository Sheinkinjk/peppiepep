# Volume sweep B1: food, pet, supplements, fitness, alcohol

**Date:** 19 September 2026. Every commercial term below was read on this date unless a row says otherwise.
**Scope:** research only. No file under src/, public/, scripts/ or config was changed, and nothing was committed. Beauty, fashion, eyewear, home, electronics and travel are covered by a separate sweep.
**Companion data:** `data/volume-sweep-B1.json` holds one object per brand. It carries the screen result, the payout quote with its source and read date, the volume estimate with method and band, both revenue estimates, and a census of Commission Factory's "Clickless tracking" feature.

---

## The answer in five lines

1. **HelloFresh AU and EveryPlate AU are the only candidates in these categories that beat Moshy on the formula**, and only conditionally.
   - Both run an ambassador program on Upfluence that pays **$80 "for every follower who uses your code to purchase their first box"**. That is code-triggered cash, the mechanism that earns without a click.
   - HelloFresh: A$12,600/yr on code queries and A$28,100/yr on review queries, against Moshy's A$1,800 and A$6,300 on the same formula.
   - EveryPlate: A$5,300 and A$6,400.
   - The condition: HelloFresh's own T&Cs bar publishing any Voucher "without our prior written approval" and void referral vouchers "published on deal sites or bargain sites". The program is also written for social creators. **Both points need a written answer from HelloFresh before any build.**
2. **Everything else that passes the screen pays too little, or publishes too little, to matter.**
   - Kic: A$20 per paid subscriber on Commission Factory, with clickless capability. About A$120/yr on the formula.
   - Petzyo, The Healthy Mummy and Optislim publish payouts that work out to single or low double figures per sale.
   - Pet Circle has the largest code demand of any brand that passes. It publishes a 5% new-customer rate but no order value, so its payout in dollars is UNVERIFIED.
3. **Commission Factory's "Clickless tracking" is the network feature that makes the no-click mechanism work, and 536 of its 554 public programs display it.**
   - CF's help centre defines it as "exclusive coupon code assigned to individual affiliate to match the transaction to the affiliate, instead of a click".
   - Displaying the feature means the advertiser's cart can do it. The advertiser still has to assign a code to us.
   - **PetsOnMe is one of the 18 programs that do not display it.** Knose does.
4. **Most of the "code culture" brands fail the screen.** Their only code is a customer refer-a-friend code paid in store credit (Vitable, Bulk Nutrients, Sweat, F45, Fitstop, Naked Wines), or their terms exclude coupon traffic outright:
   - My Muscle Chef, Beer Cartel, The Whisky Club, iHerb, AG1.
   - Vinomofo's referral terms invalidate codes shared "on a website".
5. **The formula understates the real business by about 9x on the anchor**, because Moshy's sales come from the code shown on comparison pages and in AI answers, not from brand queries. That multiplier would lift every row equally, so the ranking stands. It would not transfer evenly, though: HelloFresh's code SERP is saturated with public codes, and Moshy's is not.

---

## Ranked table

Formula: **monthly searches x 10% capture x 5% redemption x payout x 12** = searches x payout x 0.06. Both rates are assumptions and are applied identically to every row, including Moshy.

- "Code basis" uses "[brand] discount/promo code" demand.
- "Review basis" uses "[brand] review / vs / legit" demand, added at the coordinator's request.
- A brand that fails the screen earns A$0 via the no-click mechanism.

| # | Brand | Payout (source, read) | Code credited without click? | Coupon exclusion? | Est. code searches /mo (band) | Est. review searches /mo | Annual, code basis (band) | Annual, review basis (band) |
|---|---|---|---|---|---|---|---|---|
| 1 | **HelloFresh AU**, ambassador | **A$80** per first box by code ([Upfluence config](https://capture.upfluence.co/au-hellofresh-ambassador-program), 19 Sep 2026) | **Yes by wording**; contract UNVERIFIED | **Possibly.** T&Cs 13.2 and 13.8 (see below) | 2,630 (1,315 to 5,260) | 5,860 | **A$12,624** (6,312 to 25,248) | **A$28,142** (9,379 to 84,427) |
| 2 | **EveryPlate AU**, ambassador | **A$80** per first box by code ([Upfluence config](https://capture.upfluence.co/cpa-program-ao-everyplate-ambassador-program), 19 Sep 2026) | **Yes by wording**; contract UNVERIFIED | **Possibly.** Terms 13.2 and 13.7 | 1,107 (554 to 2,214) | 1,330 | **A$5,314** (2,659 to 10,627) | **A$6,374** (2,126 to 19,128) |
| 3 | **Moshy (anchor)** | A$300 (operator's direct agreement, confirmed 20 Aug 2026; no public page) | **Yes** (REFERRAL120, paid on use) | None known | **100** (85 to 115), Search Console | **350**, Search Console | **A$1,800** (1,530 to 2,070) | **A$6,300** (5,940 to 6,840) |
| 4 | Marley Spoon AU | A$30 per sale ([Awin 104515](https://ui.awin.com/merchant-profile/104515), 19 Sep) | **UNVERIFIED**: per-partner codes, but "30 days post-click" | Non-program vouchers "may be rejected" | 226 (115 to 445) | 1,560 | *if confirmed* A$407 (207 to 801) | *if confirmed* A$2,806 |
| 5 | Dinnerly AU | A$15 per sale ([Awin 104513](https://ui.awin.com/merchant-profile/104513), 19 Sep) | **UNVERIFIED** | Same as Marley Spoon | 198 (66 to 593) | 690 | *if confirmed* A$178 | *if confirmed* A$623 |
| 6 | Kic | A$20 per paid subscriber ([CF 89048](https://www.commissionfactory.com/advertiser-directory/kic-affiliate-program/89048), 19 Sep) | **Capability yes** (Clickless tracking); issuance UNVERIFIED | None | 98 floor (98 to 300), Search Console | 43 (Trends term weak) | A$118 (118 to 360) | A$52 |
| 7 | Petzyo | 15% new x AOV "over $80" = **at least A$12** ([CF 77509](https://www.commissionfactory.com/advertiser-directory/petzyo-affiliate-program/77509), 19 Sep) | Capability yes | Only non-program coupons | 29 (10 to 86) | 100 | A$21 | A$73 |
| 8 | The Healthy Mummy | 7.5% x AOV "circa $90" = A$6.75 ([CF 45613](https://www.commissionfactory.com/advertiser-directory/the-healthy-mummy-affiliate-program/45613), 19 Sep) | Capability yes | None on coupons | 8 (0 to 60) | 210 | A$3 | A$85 |
| 9 | Pet Circle | 5% new / 2% existing; AOV unpublished, so **UNVERIFIED** in A$ ([CF 50288](https://www.commissionfactory.com/advertiser-directory/pet-circle-affiliate-program/50288), 19 Sep) | Capability yes | None ("except PPC") | **1,986** (993 to 3,972) | 6,960 | UNVERIFIED: A$119/yr per A$1 of payout | UNVERIFIED: A$417/yr per A$1 |
| 10 | Optislim | 10% x AOV "$150" = A$15 ([CF 77632](https://www.commissionfactory.com/advertiser-directory/optislim-affiliate-program/77632), 19 Sep) | Capability yes | None | UNVERIFIED (not measured) | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 11 | Chefgood, Craft Cartel, Musashi, True Protein, Wine Selectors, Yes Chef Meals | % only, AOV unpublished: **UNVERIFIED** in A$ (CF 71670, 36793, 86391, 60474, 32549, 93555) | Capability yes (Craft Cartel also offers "vanity codes") | None stated | 21 / 1 / 134 / 296 / 3 / 3 | see JSON | UNVERIFIED | UNVERIFIED |
| 12 | Youfoodz | UNVERIFIED (Impact, "competitive commissions") | UNVERIFIED; no Upfluence program found | Referral vouchers void on deal sites (13.7) | 1,594 (797 to 3,188) | 4,130 | UNVERIFIED | UNVERIFIED |
| 13 | Lyka | UNVERIFIED (ambassador amount unpublished) | **Yes by wording** ("every time someone uses your code") | No deal-site ban; no "misleading, spam" use | 936 (312 to 2,807) | 3,280 | UNVERIFIED | UNVERIFIED |
| 14 | Centr | "$5 per free trial" (currency not stated, [Awin 60093](https://ui.awin.com/merchant-profile/60093)) | UNVERIFIED | UNVERIFIED | 27 (2 to 428) | 1,500 | UNVERIFIED | UNVERIFIED |
| 15 | Lite n' Easy, Swisse, JSHealth, Eimele, Myprotein, Petstock, Naked Wines, Good Pair Days | UNVERIFIED (no public terms, or no program found) | UNVERIFIED | Various, see below | 557 / 220 / 133 / 1 / 2,468 / 390 / 15 / 51 | see JSON | UNVERIFIED | UNVERIFIED |
| n/a | **Fail the screen** (A$0 no-click): My Muscle Chef, Beer Cartel, The Whisky Club, Tropeaka (1% coupon rate), iHerb Rewards, AG1, Vitable, Bulk Nutrients, Huel, Sweat, F45, Fitstop, Vinomofo, Scratch, Budget Pet Products, Petbarn, Jimmy Brings, Brew Cartel | see per-brand notes | n/a | Yes, or no program | see JSON | see JSON | **A$0** | **A$0** |

### Does any candidate outrank Moshy?

**Yes, two do, both conditionally: HelloFresh on both bases, and EveryPlate on the code basis.**

- **Why they win the formula:**
  - Demand. "hellofresh" draws 16.75x the Google Trends interest of "moshy". Its code family is also measurably code-heavy.
  - The payout. A$80 is 27% of Moshy's A$300, but HelloFresh's estimated code-query demand is about 26 times Moshy's (2,630 against 100).
- **Why the conditions matter.** The formula's 10% capture rate is the weakest assumption here:
  - HelloFresh's code SERP is crowded with coupon sites, HelloFresh's own public offers, and OzBargain's free rotating customer codes.
  - Moshy's REFERRAL120 is effectively the only strong code for its query.
  - A HelloFresh ambassador code is useful only if it is at least as good as the offers already on the page.
  - The deal-site clauses may void it outright.
- **On the review basis, EveryPlate roughly ties Moshy** (A$6,374 against A$6,300). No other row comes within a tenth of Moshy.

---

## Method

### 1. Screen (decides everything)

A brand earns via the no-click mechanism only if all of these hold:

- A publisher program exists.
- It issues a code unique to us.
- A sale made with that code is credited to us without a click.
- The terms do not exclude or zero-rate coupon or code traffic.

Customer refer-a-friend codes fail on structure: they pay in store credit, and most ban public posting.

**The network mechanics, read from primary sources:**
- **Commission Factory.** [help.commissionfactory.com/clickless-codes](https://help.commissionfactory.com/clickless-codes): "if a blogger is assigned a code: CF10, this code can be used at checkout without having to click through affiliate links and the blogger will be remunerated for this sale", provided the advertiser is "passing through coupon data from the conversion pixel". The separate "Exclusive Coupon Codes" feature "must be used alongside a tracking link", so the one we need is specifically the **Clickless** variant ([help article](https://help.commissionfactory.com/what-is-the-difference-between-exclusive-coupon-codes-and-exclusive-clickless-coupon-codes)).
- **The CF census.** I pulled all 554 programs in CF's public directory through its own JSON endpoint and fetched every program page. 536 show the "Clickless tracking" feature. The 18 that do not are: Spicers Retreats, BYOjet, Ruggable, Autobarn, Superloop, AGL, Pure Milford, Priceline Pharmacy, Mater Lotteries, Thrill Experiences, XHunter, CoolThings, **PetsOnMe Pet Insurance**, JUCY, Fantastic Furniture, Aunt Betty, yourtown Prize Homes and Tyroola.
- **Awin.** Voucher Attribution tracks an exclusive code "even if no affiliate cookie is present" (quoted in `research/coupon-site-models-2026-09-07.md`). It is an advertiser opt-in, and neither Marley Spoon nor Dinnerly states it. Both say "30 days post-click", so their no-click credit is UNVERIFIED.
- **Impact.** No Impact brand page publishes terms (HelloFresh AU, Youfoodz, EveryPlate, Lyka, Naked Wines, Good Pair Days and JSHealth were all checked). Everything on Impact is UNVERIFIED until we are accepted.

### 2. Search volume (no keyword tool; every figure is an estimate)

**Anchor.** Refer Labs' Search Console (`node scripts/google-data.mjs gsc`), read 19 Sep 2026:

| Family | 28 days to 17 Sep | 90 days from 20 Jun | Avg position | Monthly anchor |
|---|---|---|---|---|
| Moshy code queries (discount/promo code and variants) | 106 impressions | 255 | 5.7 (28d), 7.2 (90d) | **100** (85 to 115) |
| Moshy review queries (vs, legit, reviews, "or juniper", "worth it") | 347 | 978 | 8.2 to 9.1 | **350** (a floor: page-1 positions 8 to 10 undercount) |

At positions 5 to 9 nearly every searcher loads page 1, so impressions approximate searches. Anonymised queries are excluded, so both anchors are somewhat low.

**Scaling to other brands.** I used Google Trends, Australia, past 12 months, weekly, read through the `trends.google.com/trends/api` explore and multiline endpoints.

- **Brand interest.** Fourteen batches compared each brand name with "moshy". Every batch also carried "marley spoon" as a stability check, and the Marley Spoon/Moshy ratio held at 4.15 to 4.53 across all 14. Brand ratios are in the JSON (e.g. HelloFresh 16.75, Pet Circle 19.9, Youfoodz 11.8, Lyka 9.4, EveryPlate 3.8, Kic 0.12, Petzyo 0.29).
- **Code intensity.**
  - The Moshy code family itself never clears Trends' privacy threshold. It reads 0 in every comparison, including against the "moshy" brand term.
  - I therefore compared each brand's code family ("[brand] code + [brand] discount") against Youfoodz's in a chain.
  - Intensity = code share / brand share. It is treated as reliable only where the code family was non-zero in at least 26 of 53 weeks: EveryPlate, Pet Circle, Petbarn, Myprotein and iHerb. HelloFresh was measured from a separate 12-month comparison.
  - I then normalised against the median of those brands (0.74) and assumed Moshy sits at that median.
  - For brands below the threshold, the range runs from the sparse reading up to Moshy-like intensity, and the central figure is their geometric mean.
- **Review demand** was not measured in Trends. After about 30 requests Google returned HTTP 429 on every call, including after a 10-minute cool-down. Review volume is therefore **350 x brand ratio**, with a x0.33 to x3 band. It overstates navigational retail brands (Petbarn, Petstock), whose searches are mostly store lookups.
- **Cross-check with autocomplete** (`suggestqueries.google.com`, gl=au), counting code-intent suggestions per brand:
  - HelloFresh 39, iHerb 42, Myprotein 39, Bulk Nutrients 33, Lite n' Easy 31 (8 naming Australia, the highest), Youfoodz 26, Kic 25, Pet Circle 24, Moshy 11.
  - This supports the ordering, not the scale.
- **Kic exception.** The Trends brand term for Kic is ambiguous ("kic app + kic workout" underreads it). Search Console shows "kic discount code" at 90 impressions in 28 days **at average position 37.7**, so real demand is at least roughly Moshy's. Kic uses 98/month as a floor.

**Uncertainty.** Measured code intensity: x0.5 to x2. Unmeasured: x0.33 to x3. These are estimates, not keyword-tool figures. One Keyword Planner session on the top ten rows would replace them.

### 3. Calibration against the real business (sensitivity, not applied)

On the anchor itself, the formula predicts about 7.7 sales a month for Moshy plus Mosh:

- Moshy: 100 code + 350 review searches.
- Mosh: about 246 code + 850 review searches, from Search Console at average positions 11.4 and 9.7.
- Total: about 1,550 searches x 0.5%.

The operator reports about 69 transactions a month across Moshy, Mosh and Juniper. `reports/no-click-mechanism-2026-10.md` explains the gap: the code earns when it is **displayed** on comparison and review pages (about 19,200 code-bearing impressions in 90 days, mostly non-brand queries) and in AI answers. So:

- The observed business runs about 9x the formula.
- Applying 9x to every row would not change the order.
- It would not apply evenly in practice. Moshy's advantages are a unique code with little competition for the query, a high-consideration purchase, and a page set that already ranks. HelloFresh's code query is a mature coupon market.

---

## Per-brand evidence

### Conditional passes

**HelloFresh AU**
- **Two programs:**
  - **Impact affiliate program** ([hellofresh.com.au/about/affiliates](https://www.hellofresh.com.au/about/affiliates)): "Competitive commission on validated new and past customer subscriptions", "30 day cookie window", "Exclusive voucher codes for your audience", "Offline-to-online promotion with voucher codes". Payout UNVERIFIED. FlexOffers and Lasso quote A$15.20 per sale; those are aggregators, not sources.
  - **Ambassador program** ([influencer page](https://www.hellofresh.com.au/about/influencer-program); apply at [ambassador.upfluence.co/au-hellofresh-ambassador-program](https://ambassador.upfluence.co/au-hellofresh-ambassador-program)). The Upfluence capture config, read directly on 19 Sep 2026, says:
    - "You'll receive a personalised discount code, a sharing link, and a creative brief"
    - "**For every follower who uses your code to purchase their first box, you'll earn a commission of $80.**"
    - Its FAQ also says "Every time someone purchases a HelloFresh box using your link".
    - The form is creator-oriented, but its social handle field is optional.
- **Clauses to clear first** ([T&Cs](https://www.hellofresh.com.au/about/termsandconditions)):
  - 13.2: a Voucher "may not be copied, reproduced, distributed, resold or published either directly or indirectly in any form ... without our prior written approval".
  - 13.8: referral vouchers and credits are "not valid if used inappropriately, such as being published on deal sites or bargain sites".
  - The customer refer-a-friend reward is vouchers (13.7), not cash.
- **Ask HelloFresh:**
  - Does an ambassador code published on an editorial comparison page count as approved?
  - Is the $80 paid on code use alone?
  - Is there a cap?
- **Fit.** Meal kits sit outside the site's current consumer tabs. Under the revenue-first rule, the page needs a stated intent, decision and monetisation event. The owned-fact test (the citation rule) also needs a fact that is wrong elsewhere. A candidate: HelloFresh, EveryPlate and Youfoodz are one company under one set of voucher terms, which matters to a reader choosing between them.

**EveryPlate AU.** The same structure and the same $80 wording ([config](https://capture.upfluence.co/cpa-program-ao-everyplate-ambassador-program)). The affiliate page on Impact promises "Exclusive voucher codes for your audience". Terms 13.2 and 13.7 carry the same no-publishing and deal-site wording.

### Passes on capability, small payout

- **Kic.** CF 89048, "AU$20.00 per sale". A new subscriber must be "billed for their first subscription period" after any free trial. The listing shows Clickless tracking and states no coupon exclusion. No in-house referral program exists (the /pages/affiliates and /pages/refer-a-friend paths fall back to the homepage). Contact: partnerships@kicwellness.com.
- **Petzyo.** CF 77509. "15% Commission for new customers, and 2% for returning customers", "Coupons not in the program are non-commissionable", "High $AOV (over $80)".
- **The Healthy Mummy.** CF 45613. "7.5% commission on the sale value", "High AOV (circa $90)". It bans post-view tracking and Facebook ads, not coupons. Weight-loss positioning touches a TGA focus area.
- **Optislim.** CF 77632. "10% commission on the sale value", "High AOV - $150". Project memory records it as already a CF partner on the Health & Beauty hub. Asking for a clickless code is one email. TGA: "Weight loss medications" and "Listed medicine advertising" are both 2026-27 priority focus areas, so check which SKUs are ARTG-listed before any code page.
- **Pet Circle.** CF 50288. The headline reads "6.50% per sale", the body "New customers will receive 5% CPA & Existing customers will receive 2% CPA" and "After 2 week intro, a custom commission rate will be assigned". It has the strongest code demand of any passing brand (Trends code family non-zero in 52 of 53 weeks). With no published AOV, the A$ figure is UNVERIFIED: each A$1 of payout per sale is worth about A$119/yr on the code basis.
- **Chefgood, Craft Cartel, Musashi, True Protein, Wine Selectors, Yes Chef Meals.** All on CF with Clickless tracking and no coupon exclusion. None publishes an AOV, so their payouts are UNVERIFIED in A$.

### Code-based but payout unpublished

- **Lyka** ([lyka.com.au/ambassador](https://lyka.com.au/ambassador)): "we'll give you a unique code to share with your clients ... every time someone uses your code you'll be remunerated". The sign-up form offers Vet, Dog Walker, Dog Groomer, Breeder, Behaviourist and Other. The amount is unpublished. Customer referral is credit capped at 5 referrals.
- **Marley Spoon and Dinnerly** (Awin): "Variety of promo codes available; exclusively for each partner", but "Cookie lifetime: 30 days post-click". Ask whether Awin Voucher Attribution is enabled.

### Failing the screen (A$0 no-click), with the clause

| Brand | Reason (verbatim where a clause exists) | Click-based alternative |
|---|---|---|
| My Muscle Chef (CF 69088) | "0% commission will be issued to any order that includes a referral coupon code" | 6% new x A$160 AOV = A$9.60 on a tracked click |
| Beer Cartel (CF 60466) | "5% commission (0% coupons)" | 5% on clicks |
| The Whisky Club (CF 75983) | "Open to all promotional methods (except for PPC and coupon)" | A$15 per sign-up on clicks, non-coupon content only |
| Tropeaka (CF 67104) | "6% commission rate (1% commission for coupon sites)" | 6% as a content site |
| iHerb Rewards | "You cannot promote your link or code through paid advertising, coupon/deal websites" (help article updated 17 Sep 2026) | none suitable |
| AG1 (Superfiliate) | "prohibition on posting affiliate links or codes to discount-aggregation or coupon sites"; AU eligibility UNVERIFIED | none |
| Vinomofo | No current program; referral terms: "Obtaining credits through sharing your referral code on a website does not comply" | none |
| Vitable, Bulk Nutrients | No publisher program; referral pays store credit ("cannot be redeemed for cash"; Bulk Nutrients pays 1% credit) | none |
| Sweat, F45, Fitstop | No publisher program; member referrals pay in subscription credit, a discount or a free week | none |
| Huel | Awin 23972: "closed and available to UK publishers by invitation only" | none |
| Scratch | Affiliate terms page now 404; the archived terms allowed termination for "Continual promotion of coupon code on coupon websites" | none |
| Budget Pet Products | CF listing 57967 now 404 (delisted) | none |
| Petbarn | No program found on primary sources | none |
| Jimmy Brings | Defunct: the domain 301s to Woolworths MilkRun | none |
| Brew Cartel | Does not exist as an AU retailer (brewcartel.com.au NXDOMAIN); the brief likely meant Beer Cartel | see Beer Cartel |

### UNVERIFIED programs (exist or may exist; terms not public)

- **Youfoodz.** Impact, "Strong offers and codes provided". No ambassador program found (/about/influencer-program 404). Terms 13.7 void referral vouchers on deal sites.
- **Lite n' Easy.** No primary program found (affiliate paths 404, absent from CF and Impact). wealthyaffiliate quotes A$40 per order with "except PPC and coupon sites"; that is an aggregator, not a source.
- **Swisse.** A Partnerize pixel (campaign 1011l1288) is on the site.
- **JSHealth Vitamins.** Impact, per impact.com's own 2022 case study.
- **Myprotein.** Awin 19155, "Exclusive Affiliate Promotions".
- **Eimele.** GoAffPro (eimele.goaffpro.com, 90-day last-touch cookie); CF 79475 now 404.
- **Petstock.** Partnerize, per Partnerize's blog of 14 Aug 2023; the site returned 429.
- **Naked Wines AU.** Impact. The $25 figure belongs to the US program.
- **Good Pair Days.** Impact.
- **Centr.** Awin 60093 plus a Superfiliate portal; code-only credit is UNVERIFIED.

### TGA constraints (supplements and health)

The TGA's [Compliance Principles 2026 and 2027](https://www.tga.gov.au/safety/compliance-and-enforcement/compliance-management-enforcement/compliance-principles-2026-and-2027) (read in the v1 sweep, 19 Sep 2026) name **"Listed medicine advertising"** and **"Weight loss medications"** as priority focus areas.

- **ARTG-listed product ranges:** Swisse (935 entries on its sponsor page), JSHealth (139), Eimele (32 keyword hits, e.g. "Eimele Calibrate Metabolism (531173)") and Bulk Nutrients (6, e.g. "Bulk Nutrients Ashwagandha (422080)").
- **What this means for code pages:** unlike S4 medicines, listed medicines may be advertised to the public. A code page for them must still comply with the Therapeutic Goods Advertising Code, and it would sit inside a named enforcement priority.
- **Not in scope of that rule:** meal kits, pet food, fitness apps and alcohol. Alcohol pages fall under ABAC and state liquor-promotion rules instead.

---

## Conflicts with the v1 sweep and earlier research

| Earlier claim | Finding here |
|---|---|
| v1 (`code-culture-map`): HelloFresh group payout UNVERIFIED; the only published wording was "Competitive commission" | **Updated.** HelloFresh AU and EveryPlate AU publish **$80 per coded first box** in their Upfluence ambassador programs. v1 read only the Impact affiliate pages. |
| v1: Kic fails at A$20 under the A$100 gate | The gate is removed. Kic passes the screen on CF's Clickless capability, but is worth about A$120/yr on the formula. |
| v1 treated "publisher codes: not stated" as neutral for CF programs | 536 of 554 CF programs expose Clickless tracking. For CF brands, the open question is whether the advertiser will assign a code, not whether the network can credit it. |
| v1: Petzyo "Coupons not in the program are non-commissionable" read as a restriction | It restricts only codes outside the program. An assigned clickless code is inside it. |
| v1 listed Scratch as "status unclear" | The terms page is now 404 (live until at least 30 Mar 2025 per Wayback). Treated as retired. |
| v1 listed Budget Pet Products as a candidate category | CF listing 57967 now returns 404. |
| v1 counted Eimele as present on ShopBack but absent from CF | CF 79475 now 404s; the live program is GoAffPro. |
| v1: "Brew Cartel" named in the brief | Does not exist. Beer Cartel zero-rates coupons, and Craft Cartel offers vanity codes. |
| `coupon-site-models` noted My Muscle Chef voids coded orders | Confirmed verbatim, 19 Sep 2026. |
| Project memory: PetsOnMe's REFERLABS code is live | PetsOnMe's CF listing is one of the 18 **without** Clickless tracking. If REFERLABS is tracked on CF rather than by PetsOnMe directly, a typed code may not be credited without a click. Worth checking with PetsOnMe; this sweep does not settle it. |

---

## What would settle the UNVERIFIED items

| Access | Settles |
|---|---|
| Written reply from HelloFresh ANZ (affiliateteamanz@hellofresh.com.au) | Whether an ambassador code may appear on a comparison page under T&Cs 13.2 and 13.8, whether $80 pays on code use alone, and any cap. This decides rows 1 and 2. |
| CF dashboard (publisher 94361): request clickless codes | Kic, Pet Circle, Petzyo, Optislim, Chefgood, Craft Cartel, Musashi, True Protein and Wine Selectors, plus the AOVs that turn their % rates into A$. |
| Awin logged-in terms | Whether Voucher Attribution is on for Marley Spoon 104515 and Dinnerly 104513. |
| Impact publisher account | Youfoodz, Lyka, JSHealth, Naked Wines and Good Pair Days rates and code policy. |
| Google Keyword Planner (AU) on the top ten rows | Replaces the Trends-scaled estimates. Trends rate-limited this session after about 30 requests. |
