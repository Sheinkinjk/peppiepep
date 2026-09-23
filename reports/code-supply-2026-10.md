# Code supply: controlling codes instead of competing for them

**Prepared 19 September 2026.** Research only. Nothing under src/, public/, scripts/ or config was changed and nothing was committed. Every web source below was read on 19 September 2026 unless a row says otherwise. Figures about Refer Labs' own revenue come from the brief (about 2.3 transactions a day; Moshy A$300 a sale on REFERRAL120, paid on redemption without a click, confirmed by the operator 20 Aug 2026; Mosh A$200 on REFERAL55; Juniper A$200, link-attributed) and from the sibling reports in this folder. The payout mix across Moshy, Mosh and Juniper is not in the repo, so every revenue figure below that depends on it is labelled as an assumption.

## The answer

1. **Running merchants' affiliate programs (OPM) is not compatible with this site.** No Australian agency found publishes its fees, so the market rate is UNVERIFIED locally. More importantly, being paid by a merchant to grow its program while ranking that merchant against its competitors is the arrangement the ACCC's comparator guidance says disclosure may not cure, and it breaks the site's own "Rankings are not for sale" line in spirit even if no ranking is literally sold. It is also a sustained parallel workstream with monthly transaction validation, which the operator has ruled out. Do not pursue it.
2. **Issuing codes for brands with no program is only acceptable in one narrow form:** the merchant installs a self-serve app (or joins Commission Factory), mints a Refer Labs code, and the app pays Refer Labs automatically. Refer Labs is the affiliate, not the operator. If Refer Labs sets up or runs the program for the merchant, that is the retired Pepform model (ambassador programs, dashboards) under another name. The brands that qualify on payout are few, and at current traffic the revenue is small.
3. **The option worth pursuing is a code-parity and listing negotiation with Mosh (and a matching check with Moshy).** Mosh's own terms page, read today, lists PILOTPMG at 58% off the first order (valid to 28 February 2027), HAIR55 at 55% (to 30 September 2026) and a "partnerships promo code" PAT50, but not REFERAL55. Our 55% is now beaten by Mosh's own public code, and `src/app/moshhair/config.ts` tells readers that clicking through is the way to get Mosh "at the best available price", which is not true while PILOTPMG is live. Two emails, no build, and it defends the existing revenue base.
4. **Refer Labs' publisher-side data is a weak sales asset.** It is a strong negotiating asset with partners who already pay us, which is how option 3 should use it.

---

## 1. Outsourced affiliate program management (OPM) in Australia

### Who does it

| Agency | Where | What it says it does | Published price | Source (read 19 Sep 2026) |
|---|---|---|---|---|
| BlueGum | Sydney | "end-to-end affiliate program management", launch, recruitment, "budget management, integrations, account administration" | None. FAQ: fees "are usually a combination of a monthly retainer, and performance-based fees" | bluegum.agency/services, bluegum.agency/affiliate-marketing-faqs |
| The Redman Agency | Sydney | "Premium affiliate program management with capped clients" | None | theredmanagency.com.au |
| Commerce Amplified (CAm.) | Australia | Brand, partner (publisher) and agency services; clients named include Southern Cross Travel Insurance, Sony Australia, Koala | None | commerce-amplified.com |
| Navigate Digital | Melbourne and London | Affiliate program management | None | navigatedigital.com; CF agency directory |
| Neon Black | Sydney | "hybrid strategy that leverages earned with paid content and CPA" | None | neon.black/affiliate-marketing-agency |
| AndMine | Australia | Affiliate and influencer, uses Commission Factory and Shopping Links | None | andmine.com.au |
| KlewdUp, ND Agency, Refinery Room, Silverbean, ADCORE, Advertise Purple, Astronaut, The Thoughtful Agency | Various | Listed in Commission Factory's agency directory | None | commissionfactory.com/agency-directory |
| Commission Factory service plans | Sydney | "Do It With You (Co-managed Lite & Plus)" and "Do It For You (Fully managed Pro)" | None; "Enquire now" | commissionfactory.com/service-plans |

Commission Factory named Pattern International, Navigate Digital, OMD Australia, KlewdUp and Commerce Amplified as agency customers (commissionfactory.com/agencies). Its Agency Partner Program (Silver, Gold, Platinum, launched per B&T, 3 July 2025) gives agencies "platform fee reductions tied to their partner tier"; the amounts are not published.

### What it costs

**Every Australian agency rate is UNVERIFIED.** None of the fourteen agencies above publishes a figure. The only published numbers found:

| Item | Figure | Source | Note |
|---|---|---|---|
| Commission Factory technology plan (merchant pays, before any agency) | Core A$349 a month plus 2.00% tracking fee; Grow A$999 a month plus 1.75% (Grow adds "coupon code management"); Elevate custom; 12-month minimum on all | commissionfactory.com/technology-plans | Platform cost, not management |
| OPM Team (Cyprus, not Australian) | Prelaunch $1,500 one-time; Grow $2,500 a month (up to 500 active affiliates); Elite from $5,900 a month | opm.team | Currency not stated on the page; the only OPM found with a public rate card |
| Hamster Garage articles | US$2,000 to US$25,000+ a month plus 5% to 15% of affiliate revenue, setup US$1,000 to US$10,000 | hamstergarage.com/article/affiliate-management-services-cost (updated 14 Aug 2026) | Published by an affiliate agency marketing its own services; USD, no AUD figures. Treat as self-interested |

**What a merchant gets** (consistent across BlueGum, Commerce Amplified, Commission Factory): program launch and network setup, publisher recruitment, commission design, promotional calendar and code supply, compliance monitoring, monthly transaction validation, reporting. The IAB Australia Affiliate Program Compliance Guide (27 November 2025, per ppc.land's summary) makes "transaction validation procedures" and "documented breach response" part of the job. That is the ongoing merchant reconciliation the operator will not take on.

**What would settle the rate:** two quote requests (BlueGum, The Redman Agency) and a Commission Factory service-plan enquiry. Ask each for retainer, performance fee and setup for a merchant paying about A$5,000 a month in commissions.

### Is Refer Labs' publisher-side data a credible sales asset?

**No, not to a merchant buying management.** What we hold:

- Search Console code-query demand (21 Aug to 17 Sep 2026, from `reports/code-culture-map-2026-10.md`): "mosh discount code" 172 impressions, 2 clicks; "moshy discount code" 98 impressions, 4 clicks; "knose promo code" 201 impressions, 0 clicks. The largest non-partner queries are Vush (192 impressions, position 38), Kic (90) and Respect Health (63). A merchant's own Search Console, Google Ads keyword tool and network dashboard already show more than this.
- Which codes convert: **we do not hold it.** Moshy and Mosh pass no SubID and send no redemption split (`reports/attribution-gap-2026-10.md`). The merchant has the conversion data and we do not.
- The one genuine insight, that about half of REFERRAL120 redemptions arrive with no referring visit because SERP snippets and AI answers carry the code, belongs to Moshy's own data. It is persuasive to Moshy and Mosh as partners, not as a pitch to strangers.

At about 29,000 impressions and 250 clicks per 28 days sitewide, an agency pitch built on this would compete with agencies claiming "$40M+ in affiliate spend managed" (Commerce Amplified's own page). The data is useful in option 3, where it tells a partner we already earn for what their code is doing.

### Does managing a merchant's program conflict with ranking it? Yes.

Plainly: **it conflicts, and disclosure does not fix it.**

- **ACCC guidance.** *Comparator websites: a guide for comparator website operators and suppliers* (ACCC, August 2015, section 4) says operators should "not allow suppliers to pay them a fee (or receive some other benefit) in exchange for the operator giving preference to those suppliers' products ... There is a risk that disclosure may not be sufficient to overcome any misleading impression created." Section 6 adds that where the operator has a stake in a compared supplier, "operators should not make representations about their independence or impartiality, as such representations are highly likely to be false and misleading." A management retainer is not an equity stake, but it is a direct financial interest in one supplier's growth, and the About page opens "Refer Labs is an independent Australian comparison platform". If Mosh paid a retainer and `/best-hair-loss-treatment-australia` then compared Mosh with Hims, the independence line would be difficult to defend under ACL s18 and s29.
- **The site's own promise.** `/how-we-make-money` says "Neither one lets a company buy a better ranking or a softer review" and "Rankings are not for sale." `/for-business` says "Editorial conclusions on Refer Labs are never part of a commercial deal." A retainer from a ranked merchant is not literally a purchased ranking, but a reader could not be expected to see the difference, and the ACCC test is the impression created, not the contract wording.
- **Duties that pull against each other.** As a merchant's manager the job is to recruit and pay the publishers who compete with Refer Labs for the same code queries, to validate (approve or void) transactions, including our own, and to decide which publisher gets the best code. Approving your own commissions is self-dealing on the merchant's money.
- **Network terms.** Checked: Commission Factory's agencies, agency directory and affiliates pages, its Affiliate Code of Conduct, and Awin's UK publisher standard terms (2020 PDF). **None states a rule on an agency acting as a publisher on a program it manages.** Such rules, if any, would sit in the non-public agency accreditation agreement. UNVERIFIED; settled by asking Commission Factory for its agency terms before any agency work.
- **Where it would not conflict:** a merchant in a category the site does not cover and never will. But the data asset is weakest exactly there, so the pitch has nothing.

**Flag: the site already sells this.** `/for-business` (src/app/for-business/page.tsx) offers "Referral & affiliate programs, built and run: We design, launch and actively distribute referral and affiliate programs ... Incentive design, tracking, channel activation and ongoing management, handled end to end." That is an OPM offer, it closely resembles the retired Pepform referral platform, and it runs into the conflict above for any merchant the site ranks. If it is not a service the operator will deliver, it is also a representation about services that are not offered. Worth a decision; this report changes nothing.

### Option A economics: OPM retainer

| | |
|---|---|
| Revenue model | Monthly retainer per client, possibly plus a performance fee |
| Arithmetic | Assumption A: A$3,000 a month per client (below OPM Team's published $2,500 to $5,900 band, currency unstated, and the bottom of the Hamster Garage US range; no Australian rate is published). Two clients: 2 x A$3,000 x 12 = **A$72,000 a year gross**, before any time cost |
| Effort | Assumption B: 8 to 15 hours a week per client for recruitment, validation and reporting (UNVERIFIED; no source publishes hours). Two clients is a second job running beside the site |
| Conflicts | ACCC comparator guidance s4 and s6; site's "Rankings are not for sale"; self-validation of own commissions; resembles retired Pepform |
| Months to first revenue | 3 to 6 (sales cycle plus network onboarding; Commission Factory plans carry a 12-month minimum on the merchant's side). UNVERIFIED |
| Verdict | **Reject.** Breaks two operator constraints and the independence claim at the same time |

---

## 2. Issuing codes for brands with no affiliate program

### What the arrangement looks like

The merchant, usually on Shopify, needs three things: a discount code, a way to credit orders using that code to Refer Labs, and a way to pay. The standard tools, prices as shown on each vendor's page (currency not stated on the pages):

| Tool | Price | Code attribution | Source |
|---|---|---|---|
| UpPromote (Shopify) | Free: $0, 1 coupon per affiliate. Growth $29.99 a month plus 2% of sales. Professional $89.99 plus 1.5% (auto-generated affiliate coupons). Enterprise $199.99 plus 1% | "Coupon code commissioning" listed on **Enterprise only** | uppromote.com/pricing |
| GoAffPro | Hobby free (under 100 daily orders); Premium $49 a month; Business from $99 | Coupon tracking per affiliate not stated on the pricing page | goaffpro.com/pricing |
| Refersion | Launch $29 a month (annual) plus 3% of affiliate sales; Growth $159 plus 2%; Scale custom | Not stated on pricing page | refersion.com/pricing |
| Rewardful | Starter $49 a month (up to $7,500 affiliate revenue); Growth $99; Enterprise $149+; 0% transaction fee | Stripe and Paddle billing, so it suits subscription software, not Shopify retail; per-affiliate coupons not stated on pricing page | rewardful.com/pricing |
| Shopify Collabs | Merchant pays commission through its Shopify bill with a 2.9% fee on the commission | Creators get links and discount codes. Omnisend reports Shopify closed new creator sign-ups to the Collabs Network as of August 2026 (secondary, not re-checked on Shopify) | omnisend.com/blog/shopify-collabs; help.shopify.com Collabs pages |
| Commission Factory | Core A$349 a month plus 2.00%, 12-month minimum | "Clickless codes": a code "assigned to one specific affiliate" pays that affiliate whenever it is entered at checkout; "not all shopping carts are compatible" | commissionfactory.com/technology-plans; help.commissionfactory.com/clickless-codes |

**Two variants, and only one is acceptable.**

- **B1, Refer Labs as the affiliate.** The merchant installs one of the tools above (or joins Commission Factory), mints a Refer Labs code, and the tool records and pays commissions. Refer Labs signs the merchant's affiliate terms like any other publisher. No dashboards to run, no reconciliation beyond reading a statement. This is ordinary affiliate work and is what Knose and PetsOnMe already are.
- **B2, Refer Labs as the operator.** Refer Labs installs the app on the merchant's store, designs the commission plan, recruits other affiliates or ambassadors and reconciles redemptions from merchant exports. **This is the retired Pepform referral platform (ambassador programs, dashboards) rebuilt by hand, and it is also option A without the retainer.** Flagged; do not do it. A cheaper-looking sub-variant, a bare code with the merchant emailing a redemption count each month and Refer Labs invoicing, is ongoing merchant reconciliation and fails the constraint the same way.

### Who does this in Australia

The launch side is done by the same agencies listed in section 1 (BlueGum's "Program Launch & Development", Commerce Amplified's brand services, Refinery Room's "Commission structure design"). App vendors also pay agencies to install them: UpPromote advertises a "20% lifetime commission" to agencies for every merchant referred (uppromote.com/affiliate-programs/australia/). An agency that recommends a tool and earns on it has the same undisclosed-interest problem as above.

### What the legal and commercial terms normally include

From Sprintlaw's Australian referral-agreement guide (published 24 November 2025) and BrandVerity's coupon-compliance guide, which lists topics rather than clauses:

- **Commission model and trigger:** fixed fee, percentage of first invoice or of net revenue, payable when cash is received.
- **Attribution:** "unique link, form, email intro", or code; rules against duplicate referrals.
- **Clawback:** "Address clawbacks if a sale is refunded or cancelled within a certain period."
- **Exclusivity and territory:** "non-exclusive or exclusive", Australia-wide or narrower.
- **Code distribution limits:** which codes an affiliate may post, where (BrandVerity: "preventing distribution of codes to third party sites"), responsibility for expired and fake codes, penalties.
- **Payment timing, GST and invoicing;** independent-contractor status.
- **Compliance:** ACL, Privacy Act, Spam Act.
- **Termination:** what happens to unpaid commissions and pending referrals.

For a health merchant, add TGA: the merchant is the advertiser of its service, and the prescription-medicine rules in `CLAUDE.md` apply to anything the code's page says.

### Option B1 economics

| | |
|---|---|
| Revenue model | Commission per coded sale, paid by the merchant's app or network |
| Arithmetic | Brands without a program are mostly small Shopify retailers. Assumption C: A$150 order at a 15% commission = **A$22.50 a sale**. Assumption D: 5 coded sales a month, which would already beat what the site's plain-link pages produce (`reports/h0-code-hypothesis-2026-10.md`: about 11 Google clicks in 90 days across 78 plain commercial pages). 5 x A$22.50 x 12 = **A$1,350 a year per brand.** To reach the A$100-a-sale bar used in the code-culture map, a 15% commission needs an order of about A$667 |
| Effort | One outreach email per brand and one page update, then passive. Every brand is another code to date and re-verify (`check-partner-freshness`) |
| Conflicts | None beyond normal affiliate disclosure, provided Refer Labs does not run the program (B2) |
| Months to first revenue | 1 to 3 after the merchant says yes |
| Verdict | Acceptable but small. Worth doing only for a brand whose code query already reaches the site, and even there Vush (18%, at most A$40.77 an item) and Kic (A$20 a sale) sit on Commission Factory already, and Respect Health has no program (`code-culture-map-2026-10.md`) |

---

## 3. Exclusive codes: what merchants require, and where Refer Labs stands

### What the networks say

No network found publishes a numeric volume threshold for granting an exclusive code. What they publish:

- **Commission Factory** ("How to Run a Successful Coupon Marketing Strategy for Advertisers", 23 June 2023): affiliates can offer "newsletter placements and/or more visible exposure across their website if an exclusive code is offered"; advertisers should "work with a few select coupon sites for a three-month period and then analys[e] the results"; and "a vanity code will suffice (a deal running in all channels, which features the name of the affiliate)". That last line describes REFERAL55 against HAIR55 exactly: the same discount under a Refer Labs name.
- **Commission Factory, Code of Conduct for Coupon and Offer Affiliates:** promote "only ... the approved coupon codes available in the dashboard"; expired codes must be removed; breaches can mean suspension and voided transactions.
- **Awin** ("Understanding voucher codes", help.awin.com; read via search summary): an exclusive code attributes a sale to its partner even when another publisher's click preceded it, which "prevents code leakage".
- **impact.com** (brand help centre): a promo code "can only be assigned to a single partner"; Promo Code Monitoring scans "30+ browser extensions, 15+ code sites" and issues violations to partners posting codes not issued to them.
- **AvantLink** (exclusive coupon code guide): returned 403 to both WebFetch and a browser user agent; only the search snippet was read ("An ECC can only be applied to one affiliate"). UNVERIFIED beyond that line.

In practice, what a merchant asks in return is **placement and exposure for a fixed trial term (about three months), then a performance review**. Volume is judged against the merchant's own other partners, which we cannot see.

### What Refer Labs can and cannot offer in return

It can offer: the code in the page title and meta description where the offer is real (already done for Moshy and Mosh), the `/deals` row, the literal code in `llms.txt`, dated verification, and redemption-driving query data. It **cannot** offer a better ranking, removal of a competitor, or keeping a competitor's code off a comparison page. Those would be a supplier paying for preference, which the ACCC guide (s4) says disclosure may not cure, and they break "Rankings are not for sale".

### Does current volume meet the bar with anyone other than Moshy and Mosh?

- **Getting a code is not the constraint.** Knose (referlab2mf) and PetsOnMe (REFERLABS) issued codes at current volume, and Star RV and Lekker Bikes advertise unique or on-request codes on Commission Factory (`code-culture-map-2026-10.md`). Small merchants hand out vanity codes readily.
- **Earning from one is the constraint.** Outside Moshy and Mosh, no brand combines an A$100+ payout, permitted codes and measurable demand reaching the site. Hims pays A$200 but its public Partner Terms (August 2026) bar distributing the code "on any promotional code, coupon, cashback, review-aggregator, comparison, or other third-party promotional website" except on Approved Channels. So an *exclusive* arrangement, one where the merchant forgoes other partners on a code, is not something current volume could buy from anyone new. Settled by redemption counts from Knose and PetsOnMe, which would show what a non-telehealth code actually does here.

### Mosh: value parity and listing REFERAL55

**Facts read on getmosh.com.au/promotions-terms-and-conditions, 19 Sep 2026 (no "last updated" date on the page):**

| Code | Offer on Mosh's page | Ends |
|---|---|---|
| PILOTPMG | "Save 58% off the first order (covering the first 3 months) of hair loss treatment", new hair-loss customers | 28 February 2027, "may be extended" |
| HAIR55 | "Save 55% off your first order (covering the first 3 months of hair loss treatment)" | 30 September 2026 |
| PAT50 | "the partnerships promo code PAT50", 50% off the first order | 30 June 2026 (still listed after expiry) |
| REFERAL55 | **Not listed** | |

Inference, labelled as such: "PILOTPMG" pairs "Pilot" with "PMG", and Mosh publishes a price-match guarantee, so it may be a price-match code aimed at people comparing Pilot (now Hims). If so it is targeted, but it is public, and anyone searching "mosh discount code" can find 58%.

Two consequences on our side, not changed here:

1. `src/app/moshhair/config.ts` (lines 130 to 132) presents clicking through as the way to get Mosh "at the best available price". While PILOTPMG is live, that is not accurate and is an ACL s29(1)(i) exposure (a false representation about price).
2. `public/llms.txt` line 34 says REFERAL55 is "not published by the providers or available through other publishers". True of the string. But when HAIR55 lapses on 30 September our 55% will still sit below the public 58%.

**How to approach Mosh.** Send it from `jarred@referlabs.com.au` to the partner contact who issued REFERAL55. Three asks, in this order:

1. **Parity:** lift REFERAL55's value to at least the best public hair-loss code (58% today), or confirm in writing that PILOTPMG is a price-match code not intended for general use. Reason given: "mosh discount code" showed our page 172 times in 28 days at position 12, and a reader who then finds 58% on your own terms page uses that code, so we lose a sale you would otherwise have credited to us. This costs Mosh nothing on sales it would make anyway at 58%.
2. **Listing:** add REFERAL55 to the terms page as a partnerships code, as PAT50 was. That makes our offer verifiable on Mosh's own page, which the site's onboarding rule and AI engines both need.
3. **Attribution and data, in writing:** confirm commission is earned on typed use of REFERAL55 without our link (`attribution-gap-2026-10.md` notes this is only asserted in `llms.txt`), and ask for monthly redemptions split by link and typed code.

Offer in return only what the site already does: the code in the title, `/deals`, `llms.txt`, dated verification, and the query data. Nothing about rank.

**How an exclusivity negotiation is usually framed.** Following the Commission Factory pattern above, it is a time-boxed trade: an exclusive or vanity code at parity-or-better value, for a fixed term (three months is the network's own suggestion), in exchange for defined exposure, reviewed on redemptions at the end. Terms to put in writing:

- the exact string and object of the discount;
- that it is at least equal to the best public code for the term, or the merchant tells us before a better public code launches;
- attribution on typed use regardless of click;
- the payout per sale;
- the term and notice period;
- a monthly redemption count.

The merchant will ask for the reverse: no posting of its other codes, and removal on expiry, which the Commission Factory code of conduct already requires.

### Option C economics: parity and listing (Mosh first, then Moshy)

| | |
|---|---|
| Revenue model | Defensive: keeps redemptions on our code rather than on Mosh's public one. Paid per redemption, as now |
| Arithmetic | Assumption E: Mosh is 30% of the 69 transactions a month, about 21 sales, or 21 x A$200 = A$4,200 a month (the true split is not in the repo). Assumption F: 10% of those buyers would otherwise find and use PILOTPMG. Loss avoided: about 2 sales x A$200 = **A$400 a month, about A$5,000 a year**. Every further 10% leakage is another A$5,000. For Moshy, the brief notes public MOSHYDEAL120 ($120) matches REFERRAL120 and MOSHYINTRO100 ($100) is below it. So Moshy is at parity today, and the ask there is written confirmation and advance notice before any bigger public code |
| Effort | Two emails, one follow-up, then page updates once Mosh replies. No new workstream |
| Conflicts | None if nothing about ranking is offered |
| Months to first revenue | 0. It protects existing revenue. Confirmation within about 1 month if Mosh replies |
| Verdict | **Pursue** |

---

## Summary table

| Option | Revenue model and arithmetic | Effort | Conflicts | Months to first revenue | Call |
|---|---|---|---|---|---|
| A. OPM for merchants | Retainer; assumed A$3,000 a month x 2 clients = A$72k a year gross, rates UNVERIFIED in Australia | Sustained, weekly, plus transaction validation | ACCC comparator guide s4 and s6; "Rankings are not for sale"; self-validation; resembles Pepform | 3 to 6 | Reject |
| B1. Code on merchant's own self-serve program | A$22.50 a sale x 5 a month = A$1,350 a year per brand (assumptions C, D) | One email and one page per brand | Normal disclosure only | 1 to 3 | Only for a brand already sending code queries |
| B2. Refer Labs runs the program | As A, without the retainer | Sustained | **Retired Pepform model** | n/a | Reject |
| C. Parity and listing with Mosh, confirmation with Moshy | Defends about A$5k a year per 10% leakage on Mosh (assumptions E, F) | Two emails | None | 0 | **Pursue** |

## Unknowns and the access that settles them

| Unknown | Settled by |
|---|---|
| Australian OPM fees | Quotes from BlueGum and The Redman Agency; Commission Factory service-plan enquiry |
| Network rules on publisher-as-manager | Commission Factory's agency accreditation terms (not public) |
| The Moshy, Mosh and Juniper payout mix | Monthly statements from each merchant |
| Whether PILOTPMG is general or a targeted price-match code | Mosh, in writing |
| Whether REFERAL55 is paid on typed use without our link | Mosh, in writing |
| Leakage to public codes | Mosh and Moshy redemption counts by code (ours and theirs) by month |
| Hims Approved Channels | The Hims Partner Dashboard or written confirmation, before any Hims code is published |
