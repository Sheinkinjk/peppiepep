# Australian distribution candidates: bariatric and medical nutrition

**Date:** 7 September 2026
**Read-only.** No website files edited, nothing committed, nothing deployed.

---

## The trade mark screen could not be run, and nothing below should be read as if it were

The brief asked me to search TMview and IP Australia, and to say so rather than report a false zero if the register returned a shell. Both happened.

| Source | Result |
|---|---|
| **IP Australia** ([search.ipaustralia.gov.au](https://search.ipaustralia.gov.au/trademarks/search/quick?q=unjury)) | HTTP 200, 21,641 bytes, **`ng-app` Angular shell present, zero result rows**. Returns the application shell to every automated request. `/trademarks/search/result` rejects query strings with HTTP 400. |
| **TMview** ([tmdn.org/tmview/api/search/results](https://www.tmdn.org/tmview/)) | **Worked earlier in this session, then stopped.** Now returns HTTP 302 with an empty body, and following the redirect yields an F5/Shape bot-defence page (`APM_DO_NOT_TOUCH`). Retried three times with a session cookie, Referer and Origin headers. Still blocked. |
| **WIPO Global Brand Database** ([branddb.wipo.int](https://branddb.wipo.int/)) | Returns an Angular shell, not JSON. |
| **trademarkelite.com** | Detail pages resolve by ID, but no working search URL pattern found (all 404). |

**Control evidence that the block is real and not brand-specific:** on the working run earlier today, positive controls returned WOOLWORTHS 216 marks, QANTAS 83, TELSTRA 389, VEGEMITE 47, and nonsense strings returned 0. On the failed runs, **the same positive controls failed identically to the brand queries**, which is how I know the zeros were method failures rather than findings.

**Consequence: trade mark status for every brand below is UNKNOWN.** It is the single highest-value screen and it is missing. No brand in this report can be described as passing all screens, and I am not going to rank as if it did.

The one Australian trade mark fact I hold is carried forward from earlier verified work and is stated in the final section.

---

## Ranked candidates

Ranked on the screens I could actually run: Australian entity check (ABN Lookup, reliable), Australian retail presence, wholesale route with HTTP status, product-name exposure, and format.

| # | Brand | Origin | AU entity (ABN) | AU presence | Wholesale route (HTTP) | Product name exposure | Format | Home price | Contact |
|---|---|---|---|---|---|---|---|---|---|
| **1** | **Unjury** | US | **None. Zero rows for "unjury"** | None found; no AU or AUD token on site | **[/pages/international-wholesale-inquiries](https://www.unjury.com/pages/international-wholesale-inquiries) = HTTP 200**, plus [/pages/practitioners](https://unjury.com/pages/practitioners) and /pages/professional-sample-request | **Clean.** "Chicken Soup Whey Protein Single-Serve Stick Packets", "Bariatric High ADEK Vitamin Capsule with 45mg Iron", "Calcium-Citrate Plus Chewable" | Powder stick packs, soft chews, capsules, meal replacement | US$2.99 to US$21.99 (≈A$4.50 to A$33) | support@unjury.com · +1 (800) 517-5111 |
| **2** | **Liquacel / Global Health Products** | US | **None. Zero rows for "liquacel"** | None found | **[globalhp.com/distributor-list/](https://globalhp.com/distributor-list/) = HTTP 200. Published list; Australia, New Zealand and Pacific all absent** | **Mostly clean, one flag.** "ProCel Whey Protein", "PUSH Collagen Dipeptide", "Protein Basics Protein-Packed Condiments". **"PUSH 20+ Wound Care Supplement"** is a therapeutic claim | Liquid protein shots, powders, condiments | UNKNOWN (no prices parsed) | UNKNOWN |
| **3** | **Bariatric Fusion** | US | No exact match (10 fuzzy rows) | **Present via [Ubuy Australia](https://www.u-buy.com.au/brand/bariatric-fusion) (200), a cross-border forwarder, not a distributor.** iHerb AU listing reported by search but **iHerb blocks automated checks (403), so UNVERIFIED** | **Two routes: [/pages/international-wholesale-inquiry](https://bariatricfusion.com/pages/international-wholesale-inquiry) = HTTP 200 and [/pages/request-a-wholesale-account](https://bariatricfusion.com/pages/request-a-wholesale-account) = HTTP 200** | **Clean.** "Bariatric Multivitamin Soft Chew", "Cappuccino High Protein Meal Replacement", "Cherry-Berry Vitamin B12 Quick Melt" | Capsules, soft chews, quick melts, single-serve packets | US$10.99 to US$181.99 (≈A$16 to A$275) | support@bariatricfusion.com |
| **4** | **Celebrate Vitamins** | US | No exact match (15 fuzzy rows) | None found | **[/pages/cvinternational](https://celebratevitamins.com/pages/cvinternational) = HTTP 200** and **[/pages/professionals-partner-program](https://celebratevitamins.com/pages/professionals-partner-program) = HTTP 200** | **Clean.** "Bariatric Multivitamin Capsules, Iron-Free", "Bariatric Protein Bars", "Chewable Calcium Citrate 500mg" | Capsules, bars, chewables, tablets | Per-serve pricing parsed US$0.12 to US$0.57; pack prices UNKNOWN | Success@CelebrateVitamins.com |
| **5** | **Bari Life** | US | No exact match (40 fuzzy rows) | None found | **None found.** No wholesale, distributor or international link in nav | Clean (bariatric vitamin range) | UNKNOWN | UNKNOWN | hello@barilife.com |
| 6 | **Aymes** | UK | No exact match (40 fuzzy rows) | None found | **None found** in nav | Clean ("ActaGain 1.5 Complete", "ActaGain Protein Compact") | Oral nutritional supplement bottles, powders | UNKNOWN | customercare@aymes.com |
| 7 | **Nualtra** | Ireland | No exact match (2 fuzzy rows) | None found | **None found** | Clean | ONS | UNKNOWN | support@nualtra.com, support@nualtra.ie |
| 8 | **ProSource** | US | **Name collision: PROSOURCE GROUP PTY LTD (ABN 90 675 321 918) and PROSOURCE SOLUTIONS PTY LTD (ABN 68 674 002 254), both active NSW** | None found | None found | Clean | Modular protein | UNKNOWN | prosourceplus@gmail.com |
| 9 | **WonderSlim** | US | No exact match (40 fuzzy rows) | **AUD and Australia tokens present on homepage**, so may already ship here. Operated under dietdirect.com | None found | **"WonderSlim" is a weight-loss name**, though it does not reference a medicine | UNKNOWN | UNKNOWN | hello@dietdirect.com |
| n/a | **Bariatric Advantage** | US | **None. Zero rows** | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | **Site returns 403 to all automated requests** |
| n/a | **BariatricPal** | US | No exact match | Listed as a distributor of Liquacel | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | **Site returns 403** |
| n/a | **SimplyThick** | US | No exact match (9 fuzzy rows) | UNKNOWN | **Cannot test: site soft-404s** (returns 200 for a nonsense path, so path probes are meaningless) | Clean | Texture modifier gel | UNKNOWN | UNKNOWN |
| n/a | **Opurity** | US | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | **opurity.com does not resolve (NXDOMAIN).** Correct domain not identified |

### Why Liquacel ranks second despite unknown pricing

It is the only brand in the set that **publishes its distributor list**, so the territory question is answered by the vendor rather than inferred. The list names Bariatric Pal, Barsand International (Peru), Caring Solutions (Canada), Carmichael's Pharmacy, Cencora, CWI Medical, Diutin, First Choice Medical, Future Med, Geriatric Medical, Kinder Products Ltd (Canada), McKesson Med Surg and others. **Australia, New Zealand and the Pacific do not appear anywhere on it.** Its format is also the closest fit to the reframe: liquid protein shots and modular protein for people eating small volumes.

### Unjury and Bariatric Fusion are probably the same group

[unjury.com/collections/bariatric-fusion](https://unjury.com/collections/bariatric-fusion) returns 200 and is titled "Bariatric Fusion Supplements", so Unjury retails Bariatric Fusion products. The [ASMBS corporate council](https://asmbs.org/corporate-council/corporate-council-members/bariatric-fusion/) lists them as a single member, "Bariatric Fusion/Unjury". Their sites carry separate copyright lines ("Unjury Protein" and "Bariatric Fusion"). **Strongly indicated, not confirmed.** If true, ranks 1 and 3 are one conversation, not two, and their international wholesale pages are likely handled by the same team.

---

## Format and claims screen

Applying the trigger correctly: a **therapeutic claim** makes a product a therapeutic good in Australia, not the dosage form alone. Format only affects how easily it falls in.

| Brand | Likely Australian classification | Reasoning |
|---|---|---|
| **Unjury** | **Powder and stick packs: food, most likely.** Capsules and chewable vitamins: **higher risk** | Whey protein in a stick pack with nutrition-content claims is a food form. But the vitamin range is explicitly framed for post-surgical nutrient repletion, which is a therapeutic claim about a medical condition, and it is in capsule and chewable form |
| **Bariatric Fusion**, **Celebrate Vitamins**, **Bari Life** | **Higher risk across most of the range** | The range is predominantly capsules, soft chews and quick melts positioned for post-bariatric-surgery deficiency. Both dosage form and claim point the same way |
| **Liquacel / GHP** | **Mixed.** Protein shots and ProCel powder lower risk; **"PUSH 20+ Wound Care Supplement" is a therapeutic claim on its face** | Wound healing is a therapeutic indication |
| **Aymes**, **Nualtra** | **Almost certainly Food for Special Medical Purposes** under FSANZ Standard 2.9.5, a distinct category with its own composition and labelling rules | Aymes states "**ACBS approved on FP10/GP10**", i.e. its UK route to market is NHS prescription reimbursement, not retail |

**Both sites for Unjury and Bariatric Fusion carry the US disclaimer** "These products are not intended to diagnose, treat, cure, or prevent any disease". That wording is a US FDA construct and does not by itself resolve Australian classification.

**The Aymes and Nualtra model difference matters more than their screen results.** They are prescribing-channel brands whose demand is created by dietitians and GPs writing scripts against a reimbursement list. Australia has no equivalent FP10 mechanism for these products, so importing them is a different business from importing a retail brand, regardless of how clean their register position turns out to be.

---

## The naming reframe holds

The premise of this brief was that bariatric and medical nutrition avoids the naming gate that blocks the companion-nutrition category. **The product names support that.** Across the four brands whose catalogues I read, not one retail product name references a medicine, a drug class, or an injection:

> "Chicken Soup Whey Protein Single-Serve Stick Packets" · "Bariatric High ADEK Vitamin Capsule with 45mg Iron" · "Cappuccino High Protein Meal Replacement" · "Cherry-Berry Vitamin B12 Quick Melt" · "Bariatric Protein Bars" · "ProCel Whey Protein" · "ActaGain 1.5 Complete"

"Bariatric" describes a **patient population and a surgical procedure**, not a prescription medicine. That is a materially different position from a product named after a drug class.

**One caveat worth stating plainly:** avoiding the medicine-reference problem is not the same as avoiding therapeutic-goods regulation. These products swap an advertising problem for a classification problem. The classification problem is the more tractable of the two, because it has a defined compliance pathway, whereas advertising a prescription medicine class to consumers has none.

---

## Australian entities holding a brand name

**I could not run the trade mark screen, so I cannot report who holds any of these marks in Australia.** What follows is what the ABN register shows, which is a different and weaker thing: it records entities trading under a name, not trade mark ownership.

| Name | Australian entities found | Reading |
|---|---|---|
| **ProSource** | **PROSOURCE GROUP PTY LTD**, ABN 90 675 321 918, active, NSW 2263 · **PROSOURCE SOLUTIONS PTY LTD**, ABN 68 674 002 254, active, NSW 2557 · **PROSOURCED PTY LTD**, ABN 85 692 933 369, active, NSW 2073 | Name collisions in unrelated sectors. A naming risk, **not** evidence anyone holds the mark for nutrition goods |
| **ProCel** (Liquacel's protein SKU) | **PROCEL SUPERANNUATION FUND**, ABN 18 279 756 874 · **PROCEL ELECTRICAL PROTECTION PTY LTD**, ABN 30 109 754 538, NSW 2079 · **HARRY PROCEL**, ABN 20 242 475 634 | Unrelated. A superannuation fund and an electrical contractor. Low risk for class 5 goods, but the SKU name is not distinctive in Australia |
| Unjury, Liquacel, Bariatric Advantage | **Zero rows returned** | No Australian entity trades under these names |

### The one confirmed case, carried forward

From verified earlier work in this engagement, the single confirmed instance of an Australian entity holding an overseas nutrition brand's name:

**SUPERGUT**, Australian trade mark application **2162865**, status **Registered**, class 5, filed 12 March 2021, expiring 2031, held by **NUVOFIBR PTY LTD** and David Robinson. ABN **79 647 989 704**, confirmed on the [official register](https://abr.business.gov.au/ABN/View?abn=79647989704) as an Australian Private Company, active since 16 February 2021, GST registered, VIC 3195. It trades at [supergutaustralia.com.au](https://supergutaustralia.com.au/) selling "Supergut Everyday Fibre", and is unrelated to the US Supergut.

That is either a dead end or a brokerage opportunity, as the brief notes. It is worth knowing that the US brand may not be aware of it.

---

## Gaps, stated rather than filled

- **Trade mark status: UNKNOWN for all 13 brands.** IP Australia serves an Angular shell; TMview blocked partway through this session; WIPO serves a shell; no working mirror found. This screen needs a browser session or a paid clearance search.
- **No cost or timeline figures appear anywhere in this report**, because none is verifiable from public sources.
- Prices are UNKNOWN for Liquacel, Bari Life, Aymes, Nualtra, ProSource, WonderSlim and SimplyThick. Celebrate Vitamins parsed only per-serve unit prices, not pack prices.
- **Bariatric Advantage and BariatricPal return 403** to all automated requests. Both are substantial brands and both are unscreened.
- **SimplyThick soft-404s**, so no path probe against it means anything.
- **Opurity's domain was not identified.** `opurity.com` does not resolve; I did not guess an alternative.
- **iHerb Australia blocks automated checks (403)**, so the reported Bariatric Fusion listing there is unverified. If it is real, it is a material AU presence and would move that brand down the ranking.
- ABN Lookup's search is fuzzy. "No exact match (40 fuzzy rows)" means no entity carries the name, not that the search returned nothing.
