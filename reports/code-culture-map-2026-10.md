# Code culture map: where a code-led page can earn next

**Date:** 19 September 2026. Every source below was read on this date unless a row says otherwise.
**Scope:** research only. Nothing under src/, public/, scripts/ or config was changed, and nothing was committed.
**Companion data:** `data/code-culture-candidates.json` holds one object per brand: the fields below, `rank`, `score`, and an `unverified` array naming the fields that are not confirmed.

**The test.** A brand qualifies when two things are both true:

- **(a) Demand.** People search for "[brand] discount code / promo code / referral code".
- **(b) Supply.** An affiliate or referral program pays **A$100 or more per acquisition** and allows **publisher-specific codes**.

---

## The answer in five lines

1. **No brand in the named consumer categories publishes an A$100+ payout** except Hims. The categories checked were meal kits, fresh pet food, alcohol, fitness apps, energy, telco and fintech. The best published figures there are Marley Spoon at $30, Kic at $20, Superloop up to $70, Aussie Broadband up to $75 and Exetel at $80, all under the bar.
2. **Hims publishes A$200 per weight-plan referral and A$75 for its other plans, attributed by code.** But its public Partner Terms (August 2026) forbid distributing the code "on any promotional code, coupon, cashback, review-aggregator, comparison, or other third-party promotional website". Check the signed Hims & Hers agreement against that clause before building anything.
3. **The programs that clear A$100 on published figures are high-value physical goods and travel on Commission Factory:** Star RV (A$150), EcoFlow (A$160), Lekker Bikes (A$140), Coolzy (just over A$100) and Springfree (A$99.95). Two car-subscription programs pay A$100 per lead: Carbar and Carly. **EcoFlow is already wired into this repo** (`ECOFLOW_URL`, CF 88567, `/ecoflow`) and has no code.
4. **"Native referral code" brands mostly fail criterion (b).** Their refer-a-friend codes pay the referrer in account credit, not cash. Several sets of terms ban public posting outright. OzBargain's automated referral system already hands out a free rotating code for about 30 of the named brands.
5. **Medicinal cannabis is excluded.** The TGA names it as a priority focus area. The TGA list does **not** name affiliate arrangements, and "AI-generated content" appears only as a principle, not a focus area (quote in the Exclusions section).

---

## Method

### What was searched

| Source | How it was used | Limits |
|---|---|---|
| Commission Factory public directory | Merchant pages at `commissionfactory.com/advertiser-directory/<slug>/<id>`. A subagent pulled all 554 programs through the directory's JSON endpoint, then fetched every program page and parsed rate and published AOV. | A private program (e.g. Powershop 93046) returns 404 and cannot be read. |
| Awin merchant profiles | `ui.awin.com/merchant-profile/<id>` for Marley Spoon, Dinnerly, Centr, eharmony, Bailey Nelson (Canada), Juniper (Germany), Smileie | Per-advertiser terms pages need a login. |
| Impact | Public advertiser pages confirm a program exists. | Impact publishes no rates publicly, so every Impact-only brand's payout is UNVERIFIED. |
| Merchant affiliate / partner / referral pages and T&Cs | Hims, HelloFresh group, EcoFlow, Lyka, Castlery, Breville, Eufy, Wise, and all energy and telco referral terms | 403s were retried with a desktop Chrome user agent. Wayback was used only where the live page was blocked, and is labelled where used. |
| Homepage source scans | Network tags (`t.cfjump.com/tag/<id>`, Impact, Awin, Rewardful, FirstPromoter, UpPromote, Social Snowball, Mention Me). Substring false positives were checked by hand. | An app that loads only at checkout will not show, so "no tag" is weak evidence. |
| TGA | The compliance principles page and its PDF, read directly | |

**Budget note.** Three of the four research passes hit the session's 200-call web-search cap partway through. Later checks relied on direct fetches only. Where a brand is marked "no program found", the row says what was searched.

### Demand proxies (none of these is search volume)

No keyword tool was available, so demand is graded on three proxies. Each is labelled as a proxy wherever it appears.

1. **Refer Labs' own Search Console, 21 Aug to 17 Sep 2026** (`node scripts/google-data.mjs gsc 2026-08-21 2026-09-17 query`, 2,261 query rows). This measures only queries that already reach this site, not the market.
2. **Google autocomplete, `gl=au`.** For each brand, nine prefixes were queried: "<brand> ", "<brand> d / p / c / v / r", and "<brand> discount code / promo code / referral code". Two counts were taken: the code-intent suggestions containing the brand name, and the subset containing "australia" or "aus". Autocomplete reflects demand relative to other completions, not volume. Global brands (Airbnb, Whoop, Hims) inflate the raw count with other countries, which is why the Australia-qualified count is tracked separately.
3. **Presence on aggregators:**
   - ShopBack AU's sitemap (1,768 URLs, read today).
   - OzBargain's Automated Referral System wiki (1,654 stores).
   - OzBargain `/deals/<domain>` pages, where a subagent could read them via WebFetch. curl gets a Cloudflare 403.

**Demand grades used in scoring:**

| Grade | Rule |
|---|---|
| Strong (3) | At least 50 Search Console impressions on a code query, or at least 3 Australia-qualified autocomplete suggestions |
| Medium (2) | At least 8 code suggestions, including at least 1 Australia-qualified |
| Weak (1) | 1 to 7 suggestions |
| None measurable (0.5) | No suggestions |

### Search Console: code queries already reaching the site (21 Aug to 17 Sep 2026)

| Query | Impressions | Clicks | Avg position | Do we hold a code? |
|---|---|---|---|---|
| knose promo code | 201 | 0 | 30.2 | Yes |
| **vush discount code** | **192** | 0 | 38.0 | No |
| mosh discount code | 172 | 2 | 12.1 | Yes |
| moshy discount code | 98 | 4 | 5.6 | Yes |
| **kic discount code** | **90** | 0 | 37.7 | No |
| petsonme discount code | 64 | 0 | 13.6 | Yes |
| **respecthealth discount code** | **63** | 0 | 27.4 | No |
| love your health coupon | 51 | 0 | 45.7 | No |
| unichi discount code | 36 | 0 | 27.6 | No |
| pilot discount code australia | 29 | 0 | 16.1 | No (Pilot is now Hims) |
| 180 nutrition discount code | 15 | 0 | 28.9 | No |

The three largest non-partner code queries all fail criterion (b) on published figures:

- **Vush** (CF 87624) pays 18%. Its dearest item is A$226.49, so one item pays at most A$40.77.
- **Kic** (CF 89048) pays "AU$20.00 per sale".
- **Respect Health** has no current published program.

### Scoring

**Score = payout x code-permitted x demand x regulatory ease.**

| Factor | Values |
|---|---|
| Payout | 3 = verified at or above A$100. 1.5 = verified within a cent of the bar (Springfree). Payouts under A$100 fail (b) and are not ranked. |
| Code-permitted | 1 = a primary source states publisher-specific codes. 0.5 = not stated. 0.3 = code-attributed but the terms exclude comparison or coupon sites. 0.2 = coupon sites excluded or coded orders voided. |
| Demand | The grades above. |
| Regulatory ease | 1 = ordinary consumer goods. 0.8 = alcohol. 0.7 = credit-adjacent (an affordability assessment). 0.5 = telehealth touching a TGA priority focus area. |

**Two tiers.**

- **Tier A:** payout verified at or above A$100.
- **Tier B:** payout UNVERIFIED. Tier B ranks **below every Tier A row regardless of score**, and is ordered on code x demand x regulatory only. **No payout was guessed to rank anything.**

Ties are broken on demand (Australia-qualified count first), then on whether the repo already holds a link.

---

## Ranked table

| # | Brand | Category | Payout (source, read 19 Sep 2026) | Publisher codes? | Coupon/cashback policy | Demand (proxy) | Reg. | Score |
|---|---|---|---|---|---|---|---|---|
| 1 | **Star RV** | Motorhome rental | 5% x published AOV A$3,000 = **A$150** ([CF 86430](https://www.commissionfactory.com/advertiser-directory/star-rv-affiliate-program/86430)) | **Yes**, "Unique discount codes" | Except PPC | Medium | 1 | 6.0 |
| 2 | **EcoFlow AU** | Portable power / batteries | 8% x AUD 2,000 = **A$160** ([CF 88567](https://www.commissionfactory.com/advertiser-directory/ecoflow-affiliate-program/88567)) | Not stated | None stated | Medium | 1 | 3.0 |
| 3 | **Lekker Bikes** | E-bikes | 5% x "over $2.800" = **A$140** ([CF 55098](https://www.commissionfactory.com/advertiser-directory/lekker-bikes-affiliate-program/55098)) | **Yes**, "exclusive Coupon codes on request" | Coupon affiliates case by case; bars "Price Comparison" publishers | Weak | 1 | 3.0 |
| 4 | **Carbar** | Car subscription | **"AU$100.00 per lead"**. The same page also says "$500 per conversion" ([CF 92226](https://www.commissionfactory.com/advertiser-directory/carbar-affiliate-program/92226)) | **Yes**, "unique referral link/code" | Not stated | Weak | 0.7 | 2.1 |
| 5 | Springfree Trampoline AU | Trampolines | 5% x "$1999+" = **A$99.95**, borderline ([CF 87128](https://www.commissionfactory.com/advertiser-directory/springfree-trampoline-au-affiliate-program/87128)) | Not stated | Except PPC | Medium | 1 | 1.5 |
| 6 | Coolzy | Portable air-con | 12.5% x "over $800" = **just over A$100** ([CF 90368](https://www.commissionfactory.com/advertiser-directory/coolzy-affiliate-program/90368)) | Not stated | Except PPC | Weak | 1 | 1.5 |
| 7 | **Hims (ex-Pilot)** | Men's telehealth | **A$200** weight plan, **A$75** other plans, plus volume bonuses ([hims.com.au/partner-program](https://hims.com.au/partner-program)) | **Yes**, a unique Partner Code, paid only when the code is applied | **Excludes comparison, coupon and cashback sites** | Strong | 0.5 | 1.35 |
| 8 | Carly Australia | Car subscription | **"AU$100.00 per lead"** ([CF 67365](https://www.commissionfactory.com/advertiser-directory/carly-australia-affiliate-program/67365)) | **Yes**, "unique referral link/code" | Not stated | None measurable | 0.7 | 1.05 |
| 9 | Youfoodz | Prepared meals | **UNVERIFIED** (Impact) | **Yes**, "Strong offers and codes provided" | Customer vouchers void on deal sites | Strong | 1 | (3.0) |
| 10 | HelloFresh AU | Meal kits | **UNVERIFIED** (Impact) | **Yes**, "Exclusive voucher codes for your audience" | UNVERIFIED | Medium | 1 | (2.0) |
| 11 | EveryPlate AU | Meal kits | **UNVERIFIED** (Impact) | **Yes**, "Exclusive voucher codes" | UNVERIFIED | Medium | 1 | (2.0) |
| 12 | Lyka | Fresh dog food | **UNVERIFIED** (Impact plus an Ambassador program) | **Yes** (Ambassador unique code) | UNVERIFIED | Medium | 1 | (2.0) |
| 13 | Koala | Mattresses | **UNVERIFIED** (Impact and Social Snowball tags) | Probable, not confirmed | UNVERIFIED | Strong | 1 | (1.5) |
| 14 | Eufy AU | Robot vacuums | Rate "10%~15%", AOV unpublished: **UNVERIFIED** in A$ | Not stated | Not stated | Medium | 1 | (1.0) |
| 15 | Breville AU | Appliances | Rate "up to 8%", AOV unpublished: **UNVERIFIED** in A$ | Not stated | Not stated | Medium | 1 | (1.0) |
| 16 | eharmony AU | Dating | Rate "35%", price unpublished: **UNVERIFIED** in A$ | Not stated | Not stated | Medium | 1 | (1.0) |
| 17 | Castlery AU | Furniture | **UNVERIFIED** (Impact) | Not stated | Not stated | Medium | 1 | (1.0) |
| 18 | Clearly AU | Glasses / contacts | **UNVERIFIED** (network unknown) | Not stated | UNVERIFIED | Medium | 1 | (1.0) |
| 19 | Vinomofo | Wine | **UNVERIFIED** | Not stated | UNVERIFIED | Medium | 0.8 | (0.8) |
| 20 | Good Pair Days | Wine subscription | **UNVERIFIED** | Not stated | UNVERIFIED | Medium | 0.8 | (0.8) |
| 21 | Respect Health | Men's health | **UNVERIFIED** | Not stated | UNVERIFIED | Strong (Search Console 63) | 0.5 | (0.75) |
| 22 | Lite n' Easy | Prepared meals | **UNVERIFIED**. The A$40 figure is from third-party listings only | Not stated | Third-party listing says coupon sites are excluded | Strong (8 Australia-qualified, the highest tested) | 1 | (0.6) |
| 23 | Naked Wines AU | Wine | **UNVERIFIED** (Impact) | Not stated | UNVERIFIED | Weak | 0.8 | (0.4) |
| 24 | Powershop | Electricity | **UNVERIFIED** (private CF 93046) | Not stated | UNVERIFIED | Weak | 1 | (0.5) |
| 25 | Kin Fertility | Women's telehealth | **UNVERIFIED** (FirstPromoter, open signup) | Not stated | UNVERIFIED | Weak | 0.5 | (0.25) |

Bracketed scores exclude payout and cannot be compared with Tier A scores.

### How to read the ranking

- **Star RV ranks first on the formula.** It is the only program that publishes all three of an A$100+ payout, "Unique discount codes" and an Australia-qualified code query. It also sits **outside every vertical the site has**. Under the revenue-first rule it needs a road-trip or travel home before a code page makes sense. The formula ranks the deal; fit to the site is a separate call.
- **EcoFlow is the most actionable.** The CF relationship, tracked link and `/ecoflow` page already exist. The missing piece is a personalised code, which is one email. The CF listing (30 days) and EcoFlow's own page (7 days) disagree on the cookie window.
- **Hims ranks seventh despite the strongest demand in Tier A.** Its public terms exclude comparison sites, and weight and ED services both sit inside TGA priority focus areas. If the operator's signed agreement overrides the public terms, Hims moves to first.
- **Tier B's best rows are the HelloFresh group (Youfoodz, HelloFresh, EveryPlate) and Lyka.** All four are on Impact and state that codes are issued to affiliates. The prior repo research found that Australian meal programs pay mainly on the first order. On price points like Marley Spoon's published $30 CPA, **a Tier B meal-kit payout clearing A$100 would be unusual.** That is a reason to apply and read the contract, not a figure.

---

## Per-brand evidence

### Tier A

**1. Star RV** (CF 86430)
- **Payout:** "5% commission on full rental / booking value | High average order value of AUD $3,000 | 90-day referral window".
- **Codes:** "Plus, opportunities for: Unique discount codes".
- **Restrictions:** "Open to other promotional methods (except PPC)".
- **Apply:** the CF listing.
- **Demand proxy:** "star rv promo code australia" and "star rv australia discount code" in autocomplete. OzBargain returned 404 for both domains. Not on ShopBack.
- **Unconfirmed:** whether "5% on full rental" applies to the rental before or after insurance add-ons.

**2. EcoFlow AU** (CF 88567)
- **Payout:** "Commission Rate: 8% Average order value: AUD 2,000 30 Cookie period" (re-read by me today).
- **EcoFlow's own page** (au.ecoflow.com/pages/affiliate-program, read by a subagent): "Earn a minimum of 8% commission", "average order value is over $2000", cookie "7 days". It also runs a consumer referral: "Give a 5% off coupon, and earn up to $500 in cash per referral".
- **Other networks:** Awin 59181 (global) states "5%" and "$1,500+", currency not stated.
- **Codes:** not stated on either listing. OzBargain shows EFAUAFF6 ("6% off", valid to 31 Dec 2026). "AFF" in the string suggests an affiliate code, but that is an inference.
- **Already in the repo:** `src/lib/affiliate-links.ts` line 52 (`ECOFLOW_URL` via `t.cfjump.com/94361/t/88567`).

**3. Lekker Bikes** (CF 55098)
- **Payout:** "5% Default Commission on eBike Sales ... High average order value (over $2.800)".
- **Codes and coupon traffic:** "Open to promotional methods such as Cashback, Coupon and offer affiliates and others will be added on a case-by-case basis. Possibility of creating exclusive Coupon codes on request."
- **Restriction:** PPC, retargeting, social, display and **price comparison** publishers are not allowed. Ask whether an editorial comparison page counts before applying.
- **Demand proxy:** weak. One brand-specific suggestion. The other "lekker" completions include an unrelated gambling brand, which was excluded from the count.

**4. Carbar** (CF 92226)
- **Payout:** "AU$100.00 per lead", paid when the subscriber "has passed our affordability assessment" and "Their vehicle has been successfully delivered".
- **Conflict:** the same page says "$500 per conversion is a standout rate". Confirm which figure applies before quoting either.
- **Codes:** "unique referral link/code".
- **Regulatory flag:** an affordability assessment means the product may be credit-adjacent. The site excludes credit, so confirm the contract type first.

**5. Springfree Trampoline AU** (CF 87128)
- **Payout:** "Earn a 5% commission on every sale", "average order of $1999+". A$99.95 at the published floor, so borderline.
- **Codes:** not stated.
- **Demand proxy:** medium (16 suggestions, 2 Australia-qualified). OzBargain history shows 18+ deals, the latest 21 Aug 2026.

**6. Coolzy** (CF 90368)
- **Payout:** "12.5% default commission on every sale (subject to approval)", "AOV of over $800".
- **Codes:** not stated.
- **Demand proxy:** weak. Seasonal product.

**7. Hims Australia, ex-Pilot** (direct partner program)
- **Rebrand, primary source:** Business Wire, 31 Aug 2026, syndicated at nasdaq.com: "begins with the rebrand of Pilot, Eucalyptus' men's health platform, marking the first Eucalyptus brand to transition to the Hims brand". A companion release is titled "Pilot becomes Hims". investors.hims.com and businesswire.com return 403, so the syndicated copies were read.
- **Juniper:** neither 31 Aug release mentions Juniper, Hers, Kin or women's health. "Juniper will remain in place until later this year" appears only in secondary press (AFR / Investing.com summaries). **No Sept or Oct 2026 rebrand of Juniper to Hers was found in any primary source.**
- **Payout** (re-read by me today): "$75 to $200 per referral depending on which plan they sign up to. Referrals to the Weight Treatment Plan earn $200, all others earn $75. Plus a volume bonus when you hit cumulative milestones: $500 every 10 referrals to the Weight Treatment Plan, $250 every 10 referrals to the Hair and/or ED Treatment Plans."
- **Attribution** (Partner Terms, "Last updated August 2026", contracting entity Hims Australia Pty Ltd): "We will only pay Commission if your Partner Code is applied at checkout when the Referred Patient purchases their initial consultation for the Hims Subscription."
- **Exclusion, verbatim:** partners must not promote "via paid ads on any channel or platform (including on Approved Channels); or on any promotional code, coupon, cashback, review-aggregator, comparison, or other third-party promotional website".
- **Eligibility:** ABN, Australian resident, 18+, not a registered health practitioner (subagent read).
- **Competing codes:** Hims publishes START50 ($50 off first weight-loss order) and HAIR50 at hims.com.au/discount-codes. Its customer "Mates Rates" referral pays up to $100 each way and may not be "commercialised ... including for SEO or public advertising purposes".
- **Demand proxy:** Search Console shows "pilot discount code australia" (29 impressions, position 16) and other Pilot code queries. Autocomplete for "pilot" gives 3 Australia-qualified suggestions. "hims" shows no Australia-qualified code suggestions yet.

**8. Carly Australia** (CF 67365)
- Same template and conditions as Carbar, "AU$100.00 per lead", with "unique referral link/code".
- **Demand proxy:** none measurable. "carly discount code" suggestions belong to an unrelated car-diagnostics app.

### Tier B (payout UNVERIFIED)

- **HelloFresh group (HelloFresh AU, Youfoodz, EveryPlate)**
  - **Network and terms:** all on Impact. Merchant pages promise "Exclusive voucher codes for your audience" (HelloFresh, EveryPlate) and "Strong offers and codes provided to promote the brand" (Youfoodz). Each states a 30-day cookie.
  - **Payout:** the only published wording is "Competitive commission on validated new and past customer subscriptions" (HelloFresh).
  - **Refer-a-friend vouchers:** void if "published on deal sites or bargain sites" (terms cl 13.6 to 13.7).
  - **Conflicting figures:** the $10 per 14-day figures in search results came from FlexOffers and Lasso, which do not count as sources.
- **Lyka.** Impact advertiser page (no rate). The in-house Ambassador program says: "we'll give you a unique code to share with your clients ... every time someone uses your code you'll be remunerated" (lyka.com.au/ambassador). Amount unpublished.
- **Koala.** Homepage carries an Impact tag and Social Snowball (a per-affiliate-code platform). No terms readable.
- **Eufy, Breville, eharmony.** A rate is published ("10%~15%", "up to 8%", "35%") but no order value, so the A$100 test cannot be run. **One email each settles it.**
- **Castlery.** Impact, "competitive commission rate". Customer referral: $100 voucher on a first order over $1,000.
- **Clearly.** Current network unknown; Wayback shows CJ, Rakuten, CF and Impact at different times. Customer referral via Mention Me: "$20 off each".
- **Vinomofo, Good Pair Days, Naked Wines AU.** No primary rate. Naked Wines' "$25 per new customer" is the US program.
- **Respect Health.** Impact UTMs appear in Wayback (Jul 2024). No current tag. Customer referral gives the friend 20% off and the referrer 500 loyalty points (Okendo JSON on the homepage). Its 63 Search Console impressions are the third-largest non-partner code query reaching the site.
- **Lite n' Easy.** Still no primary source. It is absent from the CF public directory, and /affiliates and the other paths tried return 404. **This agrees with the 7 Sep repo finding.** It has the strongest Australia-qualified autocomplete of any brand tested (8), so it is worth one direct email.
- **Powershop.** A CF tag (93046) is on the site, but the directory page 404s (private program). Customer referral is $75 each to 31 Dec 2026.
- **Kin Fertility.** Open FirstPromoter signup (kinfertility.firstpromoter.com) and a Rewardful tag. No rate visible before joining.

### Named in the brief, verified, and failing (b) on published figures

| Brand | Network | Published payout (source) | Codes | Note |
|---|---|---|---|---|
| Marley Spoon AU | Awin 104515 | "$30 commission per sale" ([Awin](https://ui.awin.com/merchant-profile/104515), re-read today) | **Yes**, "promo codes available; exclusively for each partner" | The best code fit below the bar. Old CF 38154 is gone. |
| Dinnerly AU | Awin 104513 | "$15 commission per sale", basket "$75" ([Awin](https://ui.awin.com/merchant-profile/104513)) | Vouchers for all affiliates | |
| My Muscle Chef | CF 69088 | 6% new / 3% returning, AOV $160 = A$9.60 | Supplied $20 coupon | **"0% commission ... any order that includes a referral coupon code".** Confirms the 7 Sep finding. |
| Chefgood | CF 71670 | 10% new, 0% return | Not stated | Confirms the 7 Sep finding |
| Petzyo | CF 77509 | 15% new / 2% returning, AOV "over $80" | "Coupons not in the program are non-commissionable" | Re-read today |
| Craft Cartel | CF 36793 | "Up to 5%" | **Yes**, "vanity codes" | |
| Kic | CF 89048 | "AU$20.00 per sale" (re-read today) | Not stated | 90 Search Console impressions |
| Centr | Awin 60093 | "$5 per free trial or 5% on shop.centr.com sales" | **Yes**, "exclusive discount code" | |
| Vush | CF 87624 | 18%; dearest item A$226.49, so at most A$40.77 per item | Not stated | 192 Search Console impressions. The real AU site is au.vushstimulation.com. |
| Emma Sleep | CF 70242 | 8% x A$588 = A$47 | "personalised discount codes" | Agrees with the 7 Sep research |
| Aussie Broadband | CF 90758 | tiered, "$18" up to "$75" | "codes available for affiliate use" in promotions | 14-day cookie |
| Superloop | CF 88747 | "AU$40.00 per sale ... up to $70" | "Promotions available" | |
| Exetel | CF 89766 | "AU$80.00 per sale" | Not stated | |
| E.Tel | CF 93449 | "$30 on approved sales" | **Yes**, "exclusive codes on request" | |
| Energy Locals (now 1st Energy) | CF 54318 | "AU$40.00 per signup" | Not stated | Old URLs "will stop working from 1 December 2026" |
| AGL | CF 88218 | "$50" energy, "up to $90" bundles | Not stated | |
| Econnex | CF 58818 | "$50 - $200 commission per approved switch" | Not stated | The range straddles the bar. Econnex is itself a comparison site. |
| Tangerine, More | CF 71334, 76711 | 15% of sale value | Not stated | Plan prices are monthly |
| CircleDNA | CF 85028 | 8% x US$400 = US$32 | "WA"-prefixed codes ineligible | DTC IVD kits are a TGA focus area |
| Youly (Midnight Health) | in-house, likely closed | "up to $30 per transaction" (Wayback 27 Apr 2025; page 301s since about Nov 2025) | n/a | |
| Juniper Germany (not AU) | Awin 117305 | "ab 40 € pro Neukund:in" | n/a | Not an Australian program |
| Wise | Partnerize | "Our CPA rates start at £10" | n/a | "We don't work with voucher/discount code websites". The affiliate agreement bars voucher platforms. |

### Named in the brief with no program found (and what was searched)

| Brand | Result | What was searched |
|---|---|---|
| **Midnight Health: Stagger, hub.health** | No program found | Homepage source, sitemaps, Wayback |
| **Vidality** | Not assessable | vidality.com.au has no DNS; likely defunct |
| **Midnight Health ownership** | 80% nib | "Midnight Health, which is 80% owned by nib Group (ASX: NHF)" ([midnight.health](https://midnight.health/uncategorized/midnight-health-joins-nib-group/), undated). nib's FY25 half-year release says Honeysuckle Health and Midnight Health "intend to merge operations". |
| **Software (skincare)** | No program found | Real domain is skin.software. Homepage source, sitemap, /partner-program (404) |
| **Compound** | Not assessed | No Eucalyptus "Compound" site could be identified |
| **Mosh / Moshy public programs** | No public program page | /affiliates, /partners and /refer return 404; no network tags. Both promotions T&Cs "reserve the right to refuse limited or exclusive promotions, including but not limited to select ambassador, affiliate offers". The operator's Moshy A$300 and Mosh A$200 payouts, and REFERRAL120 / REFERAL55, **appear on no primary page**; they rest on the operator's direct agreements. |
| **Sweat** | No program found | Homepage source, /pages/affiliates (404), CF, web search |
| **Scratch** | Program status unclear | Affiliate-area pages 404 |
| **Big Dog, Proudi, Frontier Pets** | No open program | Frontier's UpPromote registration returns 410 |
| **Optical and aligners** | No Australian program found | Bailey Nelson (only the Canadian Awin 43511), Oscar Wylee, Specsavers (403), Smileie (Awin says US and Canada only), Straight Teeth Direct (UK), Evenly (no Australian aligner brand of that name located). Commission Factory optical programs exist but are low-value: 1001 Optometry, Quicklens (10% new), SmartBuyGlasses (6%). |
| **EV charging** | No referral or affiliate program found | Chargefox, Evie, NRMA, Ampol AmpCharge |

### Customer refer-a-friend codes: why "native referral culture" fails (b)

OzBargain's Automated Referral System ([wiki](https://www.ozbargain.com.au/wiki/list_of_referral_links), 1,654 stores) hands out a random member's referral code for, among others: **Juniper, Pilot, Mosh, Moshy, InstantScripts, Lyka, Petzyo, Scratch Pet Food, HelloFresh, Marley Spoon, Dinnerly, EveryPlate, Youfoodz, Vinomofo, Naked Wines, Good Pair Days, Amber Electric, Felix Mobile, Superloop, Tangerine, Aussie Broadband, Koala, Sleeping Duck, Tesla, Up Bank, Wise, Revolut, Stake, Raiz, Clearly**.

Three consequences:

1. **These programs pay the referrer in credit or points, not cash.** A publisher cannot live on account credit, so they fail (b) on their structure.
2. **Many prohibit exactly what a publisher does.** Verbatim, all read today:

| Brand | Customer reward | Public-posting clause |
|---|---|---|
| Amber Electric | $10/month for 12 months ($120), both sides | Credit may be removed where "the posting of referral codes to coupon or promotional code websites for use by members of the public" (T&C 4.6) |
| Nectr | $150 each | "You must not publish or advertise your referral link or disclose your link through the use of a public forum" (cl 2.8) |
| GloBird | $50 | "must not promote GloBird ... by publishing ... on web forums, chat rooms, or social media without GloBird written and prior consent" |
| Leaptel | $50 each | "You must not advertise, market or publicly list your referral details in any manner" |
| Launtel | $50 / $25 | Prohibits "Use of the Program for commercial purposes, lead generation, or resale of referrals" |
| Spaceship | $30 each | Must not promote "through paid advertising or to the public at large" |
| Up | $15 to $25 | "Mass-sending your invite link to strangers or posting it publicly may result in the cancellation of your bonus" |
| Tesla AU | In-app | "paid advertising, selling or paying or offering incentives for use of referral links is not appropriate" (Wayback capture, 20 May 2026) |
| Sleeping Duck | $50, max 5 | May refuse payment for "sharing their referral link on the 'OzBargain' website" |
| HelloFresh group | Vouchers | Void if "published on deal sites or bargain sites" |
| Hims "Mates Rates" | Up to $100 | May not be "commercialised ... including for SEO or public advertising purposes" |
| Wise | Set per account | "solely for individual personal usage and not for any commercial usage" |

3. **Even where posting is allowed** (OVO $120 or $180 over 12 months, Superhero, Felix, Aussie Broadband $50/$100), the reward is credit, and OzBargain already distributes a free code for the query.

**Conflict with project memory.** Memory records that REFERRAL120 is unique to Refer Labs and pays on use. That still holds. But OzBargain also distributes **customer** referral codes for Moshy and Mosh, so a searcher for "moshy discount code" can take a free customer code from OzBargain rather than ours. This is a differentiation risk to the existing earners, not a new finding about attribution.

---

## Exclusions, with reasons

### Medicinal cannabis (Montu / Alternaleaf, Polln, Candor): excluded

Source: the TGA's own page, [Compliance Principles 2026 and 2027](https://www.tga.gov.au/safety/compliance-and-enforcement/compliance-management-enforcement/compliance-principles-2026-and-2027) ("Last updated 10 June 2026", covering "the period 1 January 2026 to 31 December 2027"), and its PDF, [tga-compliance-principles-2026-2027.pdf](https://www.tga.gov.au/sites/default/files/2026-01/tga-compliance-principles-2026-2027.pdf), both read 19 Sep 2026.

**The priority focus areas, verbatim:**

> "Priority focus areas
> • Direct to consumer in vitro diagnostic (IVD) Kits
> • Erectile dysfunction medications
> • Foetal dopplers
> • Listed medicine advertising
> • Medicinal cannabis
> • Melatonin
> • Peptides
> • Software as a Medical Device (SaMD)
> • Substandard and falsified therapeutic goods
> • Sunscreens
> • Therapeutic goods used in cosmetic procedures
> • Vaping goods
> • Weight loss medications"

**The principles relevant to the operator's belief, verbatim:**

> "4 Leverage Digital Capability ... 2. Addressing risks from AI-generated misinformation and deceptive endorsements."
> "5 Strengthen Enforcement ... 3. Targeting non-compliance via digital channels, including influencers and online marketplaces."

**Confirm or correct.** The operator believes the scope names medicinal cannabis, weight-loss medicines, AI-generated content and affiliate arrangements.

- **Medicinal cannabis: confirmed.** It is a named focus area.
- **Weight-loss medicines: confirmed**, as "Weight loss medications".
- **"AI-generated content": corrected.** It is not a focus area. It appears only under principle 4, and the wording is "AI-generated misinformation and deceptive endorsements", which is narrower than AI content in general.
- **"Affiliate arrangements": corrected.** They are not named anywhere in the document. The nearest wording is "influencers and online marketplaces" under principle 5.
- **Not in the operator's summary, but in the list:** Erectile dysfunction medications, Direct to consumer IVD kits, Listed medicine advertising and Peptides. These bear on Hims, Mosh, Stagger, CircleDNA, i-screen, Bloody Good and any supplement brand.
- **Count:** law-firm summaries from early 2026 list 12 areas. The current PDF lists 13, because Peptides has been added. The page says focus areas "will be reviewed every quarter", so re-read it before relying on this list after the next quarterly review.

Medicinal cannabis is excluded because it is a named enforcement priority, and because every product in it is prescription-only, which this site's own TGA rule forbids naming. Every Refer Labs page carries an affiliate CTA or links into one, so no page can claim the editorial exemption.

### Other exclusions

- **Fintech customer referral programs** (Up, ubank, ING, Revolut, Stake, Spaceship, Superhero, Raiz, Pearler). They pay credit, not cash, and most bar public posting. Wise's publisher program bars voucher sites. Separately, a subagent cites ASIC RG 36 (June 2016): a statement "intended to influence a person ... in making a decision about a particular financial product" is financial product advice under s766B, and "Receipt of benefits based on sales" can be conflicted remuneration. **That text came from a copy saved in an earlier session; today only the asic.gov.au URL was confirmed to resolve.** Legal review is needed before any financial-product code page.
- **My Muscle Chef.** It voids commission on coded orders.
- **Gambling, crypto and credit** are out of scope under the site's rules. Car subscriptions (Carbar, Carly) are ranked but flagged for a credit check.
- **Smileie, Straight Teeth Direct, Juniper Germany, Bailey Nelson Canada.** Not Australian programs.

---

## Where this conflicts with, or updates, existing repo research

| Existing claim | Finding today |
|---|---|
| `au-high-aov-programs-2026-09-07.md`: "Telehealth / digital clinics: None found on Commission Factory ... direct programs" | Still true. **New:** Hims publishes its direct program terms and rates, the first primary-sourced telehealth payout found. |
| Same file: Lite n' Easy A$40, "weakest row" | Still no primary source. Now UNVERIFIED rather than A$40. |
| Same file: My Muscle Chef and Chefgood terms | Confirmed verbatim today. |
| `program-verification-40-brands-2026-09-07.md`: expected Specsavers, Bailey Nelson and Oscar Wylee to be hidden false negatives | Still not found. Bailey Nelson's only program is Canadian (Awin 43511). |
| `code-thesis-audit-2026-09-07.md`: Juniper terms unverifiable (403) | Still 403. Wayback shows a customer "Give $150. Get $150" refer page (25 Jun 2026), which is not the affiliate program. |
| `coupon-site-models-2026-09-07.md`: CF median coupon-site rate about a third of content rate | Consistent. Tropeaka "6% (1% for coupon sites)" re-confirmed. |
| Project memory: Pilot retired into Hims on 13 Sep 2026 | Consistent with the 31 Aug public rebrand. Search Console still shows Pilot code queries reaching the site. |
| `partner-code-requests-2026-09-05.md` (Dext, Brevo, Pipedrive, Leadpages) | Not re-checked here: B2B SaaS, and outside consumer scope. |

---

## What access would settle the UNVERIFIED items

| Access | Settles |
|---|---|
| **The signed Hims & Hers agreement** (the operator holds it) | Whether the public Partner Terms' comparison-site exclusion applies to Refer Labs. This single document moves Hims from 7th to 1st or off the list. |
| **Impact publisher account** (apply to HelloFresh AU, Youfoodz, EveryPlate, Lyka, Naked Wines AU, Castlery, Koala, Eufy, Breville) | Contract rates, new-versus-repeat rules and coupon policy. Impact shows terms only after acceptance. |
| **Commission Factory logged-in dashboard** (publisher 94361) | Private programs (Powershop 93046), the codes each Tier A advertiser will issue (Star RV, Lekker, EcoFlow, Springfree, Coolzy), Carbar's A$100 versus A$500 conflict, and EcoFlow's 30-day versus 7-day cookie conflict. |
| **One email each** to Eufy, Breville and eharmony | Average order value or price, so their published rate can be tested against A$100. |
| **One email each** to Lite n' Easy, Vinomofo, Good Pair Days, Respect Health, Clearly | Whether a program exists and on what network. |
| **Awin logged-in terms** (Marley Spoon 104515, Dinnerly 104513, Centr 60093, eharmony 18235) | Per-advertiser terms pages that currently 404 without login. |
| **A keyword tool** (Google Keyword Planner or Semrush, Australia) on the Tier A and Tier B brand x "discount code / promo code" pattern | Actual volumes in place of the three proxies used here. |
| **Legal review** | TGA position on Hims weight and ED service pages under the 2026-27 focus areas; ASIC position before any fintech code page. |
