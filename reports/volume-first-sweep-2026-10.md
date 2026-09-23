# Part B: volume-first code sweep (combined)

**Prepared 19 September 2026.** This file combines two sweeps run in parallel, each with full sources and methods:
- `volume-sweep-B1-2026-10.md` and `data/volume-sweep-B1.json`: food and meal kits, pet, supplements, fitness, alcohol (45 brands).
- `volume-sweep-B2-2026-10.md` and `data/volume-sweep-B2.json`: beauty, fashion, eyewear and dental, home and sleep, electronics, travel, plus a follow-up screen of retail programs (Emma, Koala, EcoFlow, Anker SOLIX, Ecosa, Breville, Eufy, Castlery, Bailey Nelson, Dyson, Adairs).

Merged rows: `data/volume-first-candidates.json` (99 rows). Where the two sweeps and v1 (`code-culture-map-2026-10.md`) disagree, this sweep supersedes v1.

## Method, and the correction from Part A

Every row uses the brief's formula: estimated monthly code-query searches x 10% capture x 5% redemption x payout x 12. Both rates are assumptions applied identically to every brand, including Moshy. Search volume was estimated by calibrating Google Trends (Australia, 12 months) against Moshy's measured Search Console figure (about 100 code searches a month at position 5.7). Bands run from x0.5 to x2 where a brand's code share could be measured, and x0.33 to x3 otherwise.

**The formula does not describe how the business earns.** Applied to Moshy and Mosh it predicts about 7.7 sales a month; about 69 are observed. Part A (`no-click-mechanism-2026-10.md`) explains why: the code earns where it is **displayed** on comparison and review pages and in AI answers, not through capture of code searches. Both sweeps therefore also report a review and comparison demand column. The gap scales every row, so the ranking between candidates holds. But a crowded code search (HelloFresh, The Iconic) is unlikely to convert displayed codes as well as an uncontested one, so it probably flatters the big brands.

## The screen that decides everything

A candidate earns without a click only if it passes all of these (read 19 Sep 2026):
1. A program exists and is open to publishers.
2. A code is **unique to Refer Labs and credited on redemption without a click**. Commission Factory supports this network-wide ("Clickless tracking ... Uses exclusive coupon code assigned to individual affiliate to match the transaction to the affiliate, instead of a click", help.commissionfactory.com/clickless-tracking). B1 counted 536 of 554 public CF programs showing the feature; each merchant must still assign us a code.
3. The terms do not exclude, zero-rate or void coded or coupon traffic.

## Combined ranking, by estimated annual revenue (code basis, formula as briefed)

| # | Brand | Payout (source, read 19 Sep 2026) | Code credited without click? | Coupon or publishing restriction | Est. annual, code basis | Est. annual, review basis |
|---|---|---|---|---|---|---|
| 1 | HelloFresh AU (ambassador) | A$80 per first box with the code (Upfluence program config) | Yes, by the program's wording | **T&Cs 13.2: no publishing a voucher "without our prior written approval"; 13.8 voids referral vouchers on deal or bargain sites** (hellofresh.com.au/about/termsandconditions) | A$12,624 | A$28,142 |
| 2 | EveryPlate AU (ambassador) | A$80 (Upfluence) | Yes, by wording | Same group terms | A$5,314 | A$6,374 |
| 3 | Emma Sleep (CF 70242, existing partner) | 8% x AOV "over $588" = A$47.04; 4% tier for "Cashback, Loyalty, Offer" | Likely: "personalised discount codes for you", clickless on | Rate cut to 4% if classed as an offer site | A$2,794 (about A$560 at a realistic 2% capture) | A$327 |
| 4 | **Moshy (anchor, existing)** | A$300 (direct agreement) | Yes (confirmed 20 Aug 2026) | None known | A$1,800 formula; **actual run-rate far higher** | A$6,300 |
| 5 | EcoFlow (CF 88567, existing) | 8% x AUD 2,000 = A$160 | Network supports it; no code issued to us | EcoFlow's own FAQ says 7-day, UTM-attributed | A$730 if a code is issued | not credible |
| 6 | Marley Spoon (Awin 104515) | A$30 | UNVERIFIED | Codes outside the program may be rejected | A$407 if confirmed | A$2,806 |
| 7 | Star RV (CF 86430) | 5% x AUD 3,000 = A$150 | On request ("Unique discount codes") | None; PPC excluded | about A$180 | A$702 |
| 8 | Kic (CF 89048) | A$20 per paid subscriber | Network supports it | None | A$118 | A$52 |
| 9 | Anker SOLIX (CF 91722, existing) | 5% on the header vs "7%" in the body; AOV "Over $500" | Clickless on; no code offered | Coupon sites welcome | UNVERIFIED | not credible |
| 10 | Pet Circle (CF 50288) | 5% new customers, AOV unpublished | Network supports it | None | UNVERIFIED | UNVERIFIED |
| n/a | Koala (Social Snowball) | Rate unpublished | Yes: paid on code or link | **"Posting on coupon websites ... is strictly prohibited"** | Disqualified for a deals page | |
| A$0 | Booking.com, Expedia and Hotels.com, Klook, Agoda, Trip.com, Hello Molly, My Muscle Chef, iHerb, AG1, Vinomofo, Beer Cartel, Whisky Club, and the credit-only referral schemes (Vitable, Bulk Nutrients, Sweat, F45, Fitstop, Naked Wines) | various | No, or voucher-banned | Voucher bans, 0% on coupon orders, or store credit only | **A$0** by the no-click route | |

About 30 large retail brands (The Iconic, Mecca, Adore Beauty, Cotton On, Sephora, Dyson, Specsavers and others) have volume estimates but unscreened programs; they are scored A$0 until screened rather than given a guessed payout.

## What the ranking says

- **Travel fails almost entirely.** Some of the largest code-search volumes in the sweep (30,000 to 85,000 a month) are worth A$0: Booking.com removes voucher publishers, Expedia pays 0% on coupon orders, Klook gives codes only to social creators.
- **Only HelloFresh and EveryPlate outrank Moshy on the formula**, and both need HelloFresh's written approval to publish a code (clause 13.2). Meal kits are also outside the site's current categories.
- **The cheapest route to new no-click revenue is four emails, not a new vertical.** Emma, EcoFlow, Anker SOLIX and Foreo are existing Commission Factory partners with clickless tracking switched on. Each can be asked to assign a Refer Labs code.
- **PetsOnMe is one of the 18 Commission Factory programs without clickless tracking**, so a typed REFERLABS may not be credited. That adds to the untracked-link problem in `attribution-capture-2026-10.md`.
