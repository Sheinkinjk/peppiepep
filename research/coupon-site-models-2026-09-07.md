# Coupon and discount code site business models

**Date:** 7 September 2026
**Read-only.** No website files edited, nothing committed, nothing deployed.
**Scope note:** this reports what exists. It contains no strategy recommendation, per the brief.

**Access limitation, stated up front:** six of the eight named sites block automated requests. wethrift.com, coupert.com and honey.com return Cloudflare "Just a moment..." interstitials (HTTP 403); dealspotr.com and simplycodes.com return "Attention Required! | Cloudflare" (403); `www.cashrewards.com.au` does not resolve. Only **dontpayfull.com** (HTTP 200) and **shopback.com.au** (HTTP 200) served content directly. Where a finding below comes from search-engine snippets of those sites rather than a direct read, it says so.

---

## Part 1: Competitive teardown

### 1a. Page architecture and scale

| Site | Sitemap | Measured scale | URL structure | Notes |
|---|---|---|---|---|
| **ShopBack AU** | [sitemap.xml](https://www.shopback.com.au/sitemap.xml) | **1,744 URLs, 1,481 unique merchant slugs** after removing `/blog/` | Flat `shopback.com.au/<merchant-slug>` | Only site whose scale I measured directly |
| **Dealspotr** | [sitemap/index.xml](https://dealspotr.com/sitemap/index.xml) | UNKNOWN (403). Claims **"over 10 million verified coupons and codes"** ([ZipfWorks blog](https://blog.zipfworks.com/most-accurate-coupon-site/)) | UNKNOWN | Claim is self-reported |
| **SimplyCodes** | [sitemap/index.xml](https://simplycodes.com/sitemap/index.xml) plus separate blog and "live-data" sitemaps | UNKNOWN (403). Claims **"more than 500,000 retailers"** ([SimplyCodes](https://simplycodes.com/how-it-works)) | `/store/<domain>` observed, e.g. `/store/dealspotr.com` | A dedicated `sitemap-live-data.xml` implies programmatically generated pages |
| **Wethrift** | [sitemap.xml](https://www.wethrift.com/sitemap.xml) | UNKNOWN (403) | UNKNOWN | |
| **Coupert, DontPayFull, Honey, Cashrewards** | see robots below | UNKNOWN | UNKNOWN | |

**The consistent architectural signature is the disallowed outbound redirect path.** Every site cloaks its affiliate hop and blocks crawlers from it:

| Site | Disallowed redirect path |
|---|---|
| Wethrift | `Disallow: /*/link` |
| Dealspotr | `Disallow: /coupon-out/`, `/ext/`, `/open-link/`, `/redir/` |
| SimplyCodes | `Disallow: /out/`, `/do/`, `/redir/`, `/ajax/` |
| DontPayFull | `Disallow: /hop/`, `/*?c=*`, `/blog/out.php` |
| Coupert | `Disallow: /extension`, `/shop/`, `/user/`, `/api/` |

Source: each site's `/robots.txt`, read 7 September 2026.

### 1b. Differentiation mechanism, quoted

| Site | Claim | Source |
|---|---|---|
| **SimplyCodes** | A **"three-layer verification engine"**: headless browsers that "simulate real checkout flows across the merchant network every day, adding items to cart, navigating to checkout, entering codes, and observing the result"; human verifiers who "catch edge cases machines miss"; and "real-time community signals". Each code carries a **"Health Score"**. | [simplycodes.com/how-it-works](https://simplycodes.com/how-it-works), [blog](https://simplycodes.com/blog/how-simplycodes-verifies-codes) (via search snippet) |
| **Wethrift** | **"tests over 10,000 coupons every day"** using "human-powered reviewers and systems built and maintained by their engineers". Positions against recycling: they "don't recycle old codes from other coupon sites that don't work", and "almost all codes published found directly in the marketing and advertising of the stores themselves or their partners". | [wethrift.com/how-we-find-coupons](https://www.wethrift.com/how-we-find-coupons) (via search snippet) |
| **Dealspotr** | Crowdsourcing as accuracy mechanism: **"over 200,000 dedicated deal editors who make thousands of edits each day"**. | [blog.zipfworks.com](https://blog.zipfworks.com/most-accurate-coupon-site/) |

### 1c. How codes are sourced

| Site | Sourcing | Source |
|---|---|---|
| **Wethrift** | **"regularly collects coupon codes from more than 20 sources, including codes shared on social media and emails, codes received directly from stores or through affiliate networks, and codes submitted by shoppers"** | [wethrift.com/how-we-find-coupons](https://www.wethrift.com/how-we-find-coupons) |
| **SimplyCodes** | Extension telemetry: "when someone uses the extension and a code succeeds or fails at checkout, that outcome feeds back into the verification engine". Claims **"9M+ real shoppers"**. | [simplycodes.com/how-it-works](https://simplycodes.com/how-it-works) |
| **Dealspotr** | User submission with proof: "You will need to upload a screenshot of the deal, either of the deal working at checkout or of the promotion, ad, or email about the deal itself." Points and reputation awarded for adding valid codes and for flagging dead ones. | [MoneyPantry review](https://moneypantry.com/dealspotr-review/), [PRNewswire](https://www.prnewswire.com/news-releases/meet-dealspotr-the-coupon-site-that-pays-you-to-make-it-better-300142670.html) |
| Coupert, DontPayFull, Honey | UNKNOWN | not verifiable |

### 1d. Verification: automated, crowdsourced, or claimed but unevidenced

Only **SimplyCodes publishes a falsifiable number**: **"78.8 million live checkout tests across more than 500,000 retailers in 2024-2025, with a 26.2% failure rate"** ([SimplyCodes](https://simplycodes.com/how-it-works), via search snippet). That is the only quantified verification claim found across all eight sites, and it is self-reported and not independently audited.

Wethrift's "10,000 coupons every day" is a volume claim without a published success rate. Dealspotr's model is crowdsourced validation with screenshot evidence, not systematic testing. For Coupert, DontPayFull, Honey and Cashrewards, verification methodology is **UNKNOWN**.

### 1e. Monetisation

**Direct detection failed and I am not reporting it as a negative.** My scan for affiliate-network verification tags returned "none detected" for all eight sites, but six of those responses were Cloudflare challenge pages, so the scan measured nothing. Treat network affiliation as **UNKNOWN** except where stated below.

What is documented: PayPal's Honey earns affiliate commission on the last click, and PayPal has stated the extension **"follows standard last-click attribution rules used across the affiliate industry"** ([TechNet New England summary](https://www.technetnewengland.com/blog/honey-browser-extension-scam-what-you-need-to-know)). Non-affiliate revenue is documented for Honey only: its "access to cross-merchant browsing behaviour across millions of users representing significant data intelligence for PayPal's advertising business, which launched new products in 2025 leveraging transaction insights" (same source).

ShopBack and Cashrewards are cashback models, which share affiliate commission with the shopper rather than retaining it. Exact split: **UNKNOWN**.

### 1f. Browser extensions and what they collect

| Site | Extension | Data |
|---|---|---|
| **Honey** | Yes | Subject of ~20 class actions. The alleged mechanism: "When a consumer clicks on the 'Apply Coupon' button on the Honey pop-up, Honey manipulates the cookie, deletes the Influencer's unique information and injects source code with its own information" ([Gibbs Mura LLP](https://www.classlawgroup.com/honey-browser-extension-scam-lawsuit)) |
| **SimplyCodes** | Yes ([Chrome](https://chromewebstore.google.com/detail/simplycodes-verified-coup/gfkpklgmocbcbdabfellcnikamdaeajd), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/simplycodes/), [Android app](https://play.google.com/store/apps/details?id=com.simplycodes.mobile)) | Collects checkout success/failure outcomes and feeds them back into verification, per its own description |
| **Dealspotr** | Yes (implied by `Disallow: /ext/`) | UNKNOWN |
| **Coupert** | Yes (implied by `Disallow: /extension`) | UNKNOWN |
| **DontPayFull** | Yes (extension-store link present in page source) | UNKNOWN |

**Regulatory consequence:** Google "updated Chrome Web Store policies in March 2025. Extensions can now only include affiliate links if they provide clear, direct user benefits and fully disclose affiliate relationships before installation" ([TechNet New England](https://www.technetnewengland.com/blog/honey-browser-extension-scam-what-you-need-to-know)).

### 1g. Transparency pages

Published methodology pages exist for **Wethrift** ([/how-we-find-coupons](https://www.wethrift.com/how-we-find-coupons)) and **SimplyCodes** ([/how-it-works](https://simplycodes.com/how-it-works), plus [a blog post on verification](https://simplycodes.com/blog/how-simplycodes-verifies-codes)). For Coupert, DontPayFull, Honey, Cashrewards and ShopBack, **UNKNOWN**.

---

## Part 2: The merchant side

This is the strongest evidence in the report, because it comes from a systematic read rather than a search. I fetched **all 558 Commission Factory advertiser directory pages** and parsed **555 program descriptions**. Frequencies: 141 of 555 (25%) restrict PPC, 55 (10%) mention cashback or loyalty rate splits, 21 (4%) mention coupon or voucher sites, 9 (2%) void commission on coded orders.

### 2a. Programs that EXCLUDE coupon and voucher sites, verbatim

| Advertiser | Exact wording | Source |
|---|---|---|
| **Lite n' Easy** | "Open to all promotional methods **except PPC and coupon sites**" | [wealthyaffiliate listing](https://my.wealthyaffiliate.com/affiliate-programs/lite-n-easy) (no CF directory page exists) |
| **Spacetalk** | "Open to all promotional methods (**except PPC and Coupon Websites**)" | [CF](https://www.commissionfactory.com/advertiser-directory/spacetalk-affiliate-program/86622) |
| **Price Rite Mart** | "Most promotion methods accepted, **coupon sites are excluded from the program**." | CF advertiser directory |
| **Verve Portraits** | "**Coupon and voucher sites are not permitted to promote the Verve Portraits affiliate program.**" | CF advertiser directory |
| **Spicers Retreats** | "Open to various publisher types **except coupon sites** and no brand bidding, or using brand or retreat names in subdomains/sub folders is allowed" | CF advertiser directory |
| **isubscribe** | "- 7.5% commission/5% for coupon sites ... **No PPC or Coupon/Voucher sites.**" **Note the internal contradiction: the same paragraph sets a coupon-site rate and then bans coupon sites.** | CF advertiser directory |

### 2b. Programs that void commission when a code is used

| Advertiser | Exact wording |
|---|---|
| **My Muscle Chef** | "**0% commission will be issued to any order that includes a referral coupon code** / 0% commission will be issued on any order that includes a corporate code / 0% commission will be issued on repeat subscription orders" |
| **EMU Australia** | "**Coupon codes not uploaded to the Commission Factory platform are non-commissionable**" |
| **Mobileciti** | "**0% commission rule will be applied when a code not listed in the program is used**" |
| **Bessemer** | "**0% commission on sales with Welcome codes**" |
| **Gourmet Basket** | "**Coupon codes starting with "gbr" are not commissionable**" |
| **Platypus Shoes** | "Coupon Codes: "ACC", "UNI", "SE" **non commissionable unless authorised by Platypus**. Friends and Family discounts are not commissionable" |
| **Calvin Klein** (and Tommy Hilfiger, both AU and NZ) | "Sales and coupon codes **must be valid attributed to the affiliate channel** to be tracked and paid." |

### 2c. The reduced-rate differential

**My automated ratio pass produced parse errors** (it read "Save up to 81% sitewide" and "Save up to 6%" as commission rates). The table below is hand-corrected from the verbatim quotes.

| Advertiser | Content/base rate | Coupon-site rate | Differential |
|---|---|---|---|
| **The Body Shop** | 8% content | **0.50%** | **16x** |
| **Aussie Health Products** | 10% blogs & content | **1.5%** | **6.7x** |
| **Tropeaka** | 6% | **1%** | **6x** |
| **BCF** | 2% content | **0.5%** | **4x** |
| **Wild Secrets AU** | 20% | **5%** | **4x** |
| **Pagnian Imports** | 6% publisher/content | **2%** | **3x** |
| **Club X** | 15% | **5%** | **3x** |
| **Roxy / DC Shoes / Quiksilver** | 8% cashback no voucher | **3%** daily deals/coupon | **2.7x** |
| **YesStyle** | 10% blog and content | **4%** cashback and coupon | **2.5x** |
| **EMU Australia** | 10% full price | **5%** | **2x** |
| **HealthPost** | 5% base | **4%** | **1.25x** |
| **CIRCA / CIRCA NZ** | 8% | **7%** | **1.14x** |

**Median differential across the 12 advertisers publishing both figures: about 2.7x.** A coupon site typically earns roughly a third of what a content site earns on the same sale. The full The Body Shop ladder shows how granular this gets: "6% Default rate / 5% Comparison sites / 6% Loyalty sites / **8% Content sites** / 4% Cashback sites / **0.50% Coupon sites**".

Three advertisers also cut the rate when a code is used at all, independent of publisher type: **Roxy, DC Shoes and Quiksilver** all run "Cashback = No Voucher Used - 8% / Voucher Used - 5%", and **Adulttoymegastore** pays "20% commission / 10% commission on orders processed with a voucher code".

### 2d. Last-click attribution disputes

The documented dispute is **Honey**. In December 2024 the YouTuber MegaLag alleged the extension overwrites affiliate cookies at the point of coupon application ([Affiverse](https://www.affiversemedia.com/honey-investigation-deepens-what-part-two-of-megalag-reveals-about-browser-extension-risks-for-affiliate-programs/)). Litigation followed: **Oganesyn, et al. v. PayPal, Inc.**, filed 15 January 2025 in the **US District Court for the Northern District of California**, with over 20 class actions alleging "wiretapping, computer hacking, unfair competition, consumer fraud, tortious interference, and unjust enrichment" ([Cohen Milstein](https://www.cohenmilstein.com/case-study/in-re-paypal-honey-browser-extension-litigation/), [Gibbs Mura](https://www.classlawgroup.com/honey-browser-extension-scam-lawsuit)). PayPal's defence is that this is standard last-click behaviour.

**Network rules found:**
- **Awin does not allow toolbar affiliates onto their programs** ([Awin FAQs](https://www.awin.com/us/faqs), via search snippet).
- **Awin Voucher Attribution** inverts the usual model: it "allows an advertiser program to give an exclusive coupon code to a publisher and track all transactions made using that code **even if no affiliate cookie is present, and even if it's been allocated to another channel by the advertiser**" ([Awin](https://www.awin.com/gb/affiliate-marketing/voucher-attribution), [Awin success centre](https://success.awin.com/s/article/Voucher-Attribution?language=en_US)).
- Awin advertiser terms commonly require affiliates to "negatively match against search terms for brand names plus 'voucher', 'code', and 'promotional code'", and note that codes which are neither "restricted codes" nor "authorised-to-display codes" **may not be advertised at all**.

### 2e. Is coupon traffic incremental or margin leakage?

The published evidence is genuinely mixed, and both sides have an interest in the answer.

**Argues incremental:** "Google shared that **94% of transactions driven by coupon affiliate paid search ads were incremental**, meaning the customers were not already on the retailer's site before they searched for a coupon. Just 6% of purchasers were already on the retailer site before clicking on a coupon ad" ([PartnerCentric](https://partnercentric.com/blog/affiliate-marketing-and-coupon-sites-myths-surrounding-incremental-growth/)).

**Argues leakage:** holdout testing. "When a brand pauses coupon partners for three weeks in one region and keeps another region active as a comparison, affiliate-reported sales fall but **total regional orders barely move**, and gross margin improves because fewer commissions and fewer discounts are paid" ([IREV](https://irev.com/blog/how-to-measure-incrementality-in-affiliate-marketing-holdout-tests-geo-tests-and-mmm-for-real-growth/)).

**The stated mechanism of concern:** "users frequently search for a discount code after deciding to buy, and the final affiliate click receives full credit. In many cases, the brand gives away margin on a conversion that was already likely to occur" (IREV). Or: "Attribution answers 'who touched the conversion.' Incrementality answers 'who caused the conversion.'"

**The rate cards in 2c are the merchants' own revealed answer to this question**, and they are not ambiguous: paying a coupon site 0.5% where a content site gets 8% is a priced judgement about incrementality.

---

## Part 3: Australian gap analysis

### 3a. Category coverage, measured

I tested ShopBack AU's full merchant list (1,481 unique slugs) against the high-AOV Australian merchants identified in earlier work. **An initial pass reported 23 of 23 not covered; a positive control showed that result was a parsing failure and it was wrong.** Corrected, with positive and negative controls passing:

| Covered on ShopBack AU | Not covered |
|---|---|
| Knose, My Muscle Chef, Chefgood, Yes Chef Meals, Gym Plus Australia, Emma Sleep, CircleDNA, Aussie Health Products, Supplement Mart, ResMed | **Moshy, Mosh, Juniper, Pilot** (telehealth) · **Vively** (CGM) · **i-screen, Everlab** (pathology) · Lite n' Easy, Dineamic, Soulara, Eimele, PetsOnMe, Bulk Nutrients, Technogym |

**10 of 24 covered.** The pattern: merchants with a listing on Commission Factory are largely covered; **telehealth and direct-relationship health services are entirely absent**, as are merchants who run direct or in-house programs (Lite n' Easy, Eimele, Vively, i-screen). Technogym is the exception that breaks a clean rule: it is on Commission Factory and still not carried.

This is one cashback site, not the whole Australian market. Coverage on Cashrewards, Little Birdie, Frugal Feeds and OzBargain is **UNKNOWN** and would need the same test run against their merchant lists.

### 3b. Australian sites, and whether any are single-vertical

Named Australian players found: **OzBargain** (community deal forum), **ShopBack AU** (cashback, 3.59M visits), **Frugal Feeds** (1.21M visits, ranked #8 in Coupons and Rebates, #59,878 globally, July 2026), **Groupon AU** (1.01M visits), **Little Birdie**, **Cashrewards**, plus the white-label operators seen in earlier SERP work: cuponation.com.au (Global Savings Group), lovecoupons.com.au, australiancoupons.com.au. Traffic figures from [Similarweb](https://www.similarweb.com/website/frugalfeeds.com.au/) and Semrush competitor data via search snippet.

**Little Birdie** is the closest thing to a differentiated positioning: it "aggregates more than 70 million products from different online brands and stores, allowing users to track and compare products, and look for price drops, sales and offers", and raised **A$30M pre-launch from CBA** ([TechCrunch](https://techcrunch.com/?p=2156275)). That is product-comparison-led rather than code-led.

**One genuine single-vertical Australian example was found in earlier SERP work:** [petinsurancedeals.com.au](https://petinsurancedeals.com.au/), which runs both brand reviews and per-brand promo-code pages within pet insurance only. I did not find single-vertical Australian coupon sites for telehealth, meal delivery, supplements, home energy or health devices. That is a **not-found**, not a proven absence.

### 3c. Search volume for "[brand] discount code" queries

**UNKNOWN.** No keyword volume tool is available in this environment, and I am not going to estimate figures for a field the brief asks to be sourced.

The only directly relevant measured datapoint is internal: Refer Labs' own Search Console data, previously analysed, showed **86% of organic clicks to the site were discount-code intent**. That is one site's click distribution, not market search volume, and it should not be read as the latter.

To obtain the real figures: Google Keyword Planner or Semrush, filtered to Australia, on the pattern `<brand> discount code`, `<brand> promo code`, `<brand> coupon` for the merchant lists in Part 3a.

---

## Unverifiable fields, listed

- Page counts for Wethrift, Coupert, Dealspotr, SimplyCodes, DontPayFull, Honey, Cashrewards: **UNKNOWN** (Cloudflare 403 on both sitemaps and homepages).
- Affiliate networks used by any of the eight sites: **UNKNOWN**. My detection scan ran against challenge pages and its "none detected" output is void.
- Extension data collection for Dealspotr, Coupert, DontPayFull: **UNKNOWN**.
- Verification methodology for Coupert, DontPayFull, Honey, Cashrewards: **UNKNOWN**.
- Cashback split retained by ShopBack and Cashrewards: **UNKNOWN**.
- Australian search volumes: **UNKNOWN**.
- Impact and Awin advertiser terms were reachable only as marketing and help-centre pages, not as per-advertiser program terms, which sit behind publisher login. The per-advertiser terms quoted in Part 2 are all Commission Factory, where the directory is public.
