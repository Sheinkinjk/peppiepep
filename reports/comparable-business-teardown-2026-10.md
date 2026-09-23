# Comparable business teardown, and who owns the Moshy, Mosh and Juniper code queries

**Written:** 19 September 2026. Read-only: this file is the only change. Nothing committed, submitted or sent.

**Revenue context supplied with the brief:** about 2.3 tracked transactions a day, concentrated in Moshy (A$300 a sale, code REFERRAL120, $120 off), Mosh (A$200, code REFERAL55, 55% off) and Juniper (A$200). Every transaction has come from a page carrying a code or offer. About half of REFERRAL120 redemptions show no referring visit.

---

## 0. The findings that matter, in one screen

1. **Only one third-party page was found carrying the string REFERRAL120.** HotDeals AU lists it under "Expired Moshy Discount Codes & Coupons" with a generic description and no credit to Refer Labs. The other public copies are Refer Labs' own site, Facebook page and Instagram post. No coupon site, OzBargain post or Reddit post carrying the string was found on any engine or native search tried (Section B5). REFERAL55 appears nowhere outside Refer Labs' own properties (Section B6).
2. **The strings are ours, but the value is not.** Mosh and Moshy publish codes of equal or greater value on their own sites. Mosh's own Good Things Festival page publishes **GTHAIR55** (55% off the first 3 months of hair-loss treatment, the same value as REFERAL55), and Mosh's own promotions terms list **HAIR55** (55%, ends 30 September 2026) and **PILOTPMG** (58% off the first 3 months, ends 28 February 2027). Moshy's own promotions terms list **MOSHYDEAL120** ($120 off the first month, stated as ending 28 February 2026, "may be extended") and **MOSHYINTRO100** ($100 off, to 28 February 2027). Coupon sites copy these merchant codes, so they rank for "mosh discount code" offering 58% while we offer 55%. This matters more than any listing of our code does.
3. **The merchants' own pages are the strongest competitors on every code query.** getmoshy.com.au/promo-codes-coupons, getmosh.com.au/promo-codes-coupons and myjuniper.com/discount-code rank in the top 3 on every engine observed. For Juniper, Juniper's own page states "Save $50 off your first month with code START50" and ranks #1 on Bing, DuckDuckGo and Brave. Refer Labs holds no Juniper code and does not appear in the top 10 or 20 for any Juniper code query on any engine observed.
4. **Every Australian comparison business that has lasted earns money that does not depend on a click being attributed.** Canstar and Mozo sell award-logo licences and data. Compare Club and Money.com.au close the sale themselves on the phone under their own credit licences. Cashrewards (closed 8 September 2025) and Little Birdie (closed September 2025) depended on click attribution alone and are gone, even with ANZ and CBA money behind them.

---

## 1. Method, and what could not be observed

**Engines used, 19 September 2026:**

| Engine | How | Result |
|---|---|---|
| Google (google.com.au) | curl, and a headed Chrome browser | **Blocked.** curl got a JavaScript-redirect shell; the browser got "Our systems have detected unusual traffic from your computer network". No Google SERP was observed. Our own Google positions come from Search Console only. |
| Bing (cc=AU, en-AU) | curl, then headed Chrome/Chromium via Playwright | curl returned unrelated results (Japanese restaurants for the query "REFERRAL120"), which is Bing degrading results for automated clients, so all curl Bing output was discarded. The headed browser returned coherent results and those are used. |
| DuckDuckGo (kl=au-en) | html.duckduckgo.com via curl (HTTP 202 challenge, discarded), then headed Chrome | Headed results used. DuckDuckGo's order matched Bing's almost exactly for every query, which is consistent with DuckDuckGo drawing on Bing's index. Treat the two as one index, not two. |
| Brave Search (country=au) | curl, parsed HTML | Worked for 11 queries, then rate-limited (a 73,900-byte challenge page) for the site-restricted queries. Brave runs its own index, so it is the only independent second opinion here. |
| Native site search | OzBargain (/search/node/), Reddit (/search), Cuponation (/search) | Rendered in a headed browser. Reddit's JSON API refused requests. |
| Anthropic WebSearch tool | | Unavailable: the session's search budget was spent by the Part A research. |

**Page fetches:** 70 candidate listing pages were requested with curl using the Chrome user agent the brief specifies. 38 returned Cloudflare 403. Those were re-requested in a headed browser, which passed most challenges. Every fetched page, HTML and rendered text, was searched for `REFERRAL120`, `REFERAL55` and `refer labs`/`referlabs`. Pages that could not be fetched are named in Section B5.

**Search Console:** `node scripts/google-data.mjs gsc 2026-08-21 2026-09-17 page,query`, plus the `query` and `page` dimensions for totals. Page-level totals for the window: **244 clicks, 28,812 impressions**. The query-level export carries only 49 clicks and 13,943 impressions, because Google withholds low-volume queries. So every per-query figure below covers only the queries Google chose to show.

**Part A** was researched by a delegated agent reading each company's own disclosure pages on 19 September 2026. I spot-checked two of its sources in a browser the same day: Rabble's homepage (confirmed: "Scanna kvittot eller handla direkt via appen för att få pengar tillbaka", i.e. scan the receipt or shop through the app to get money back) and Finder's disclosure (the /how-we-make-money URL now redirects to /why-trust-us, which states "We make money from referral fees when you choose a product, but you don't pay any extra").

---

## 2. Where I agree and disagree with the existing research

**research/coupon-site-models-2026-09-07.md**
- Agree: the merchant rate cards (median coupon-site rate about a third of the content-site rate) are the most useful evidence in it, and they still stand.
- Correct: "`www.cashrewards.com.au` does not resolve" is not a fetch failure. Cashrewards stopped operating on 8 September 2025 (Startup Daily; OzBargain node 923179, both read 19 Sep 2026). The domain still did not resolve today.
- Correct: Little Birdie is listed as a live Australian player. It closed in September 2025 (OzBargain node 923179).
- Agree, with an addition: ShopBack does not carry Moshy, Mosh or Juniper today. `shopback.com.au/moshy`, `/mosh` and `/juniper` each return HTTP 307 to `/health-personal-care`, and none is in ShopBack's sitemap (19 Sep 2026). But Brave and DuckDuckGo still index `shopback.com.au/mosh` ("< $39 Cashback") and `shopback.com.au/moshy` ("< $30 Cashback"). ShopBack therefore carried both brands at some point and dropped them. When, and why, is not observable.
- Disagree: "86% of organic clicks to the site were discount-code intent" does not reproduce. In this window, brand-code queries (moshy/mosh discount or promo code and variants) account for 8 of the 49 clicks the query export shows, about 16%, which matches the figure in project memory (`seo-rank-constraint`). The 86% may have come from a different window or a page-level cut. It should not be quoted.

**research/code-thesis-audit-2026-09-07.md**
- Agree: the finding that "our codes are not differentiated" is the most important one in that audit.
- Correct the framing: it named `MOSHYDEAL120` and `GTHAIR55` as "third parties publishing an equivalent". They are not third-party codes. MOSHYDEAL120 is in Moshy's own promotions terms, and GTHAIR55 is printed by Mosh on its own `/good-things` page (both read 19 Sep 2026). The equal-value competition comes from the merchants. That is a partner conversation, not a coupon-site problem.
- Correct: "We rank #1 for 'Moshy discount code australia'" came from a US-flagged tool. Search Console gives `/moshy` an average Google position of **5.1** for "moshy discount code" (90 impressions, 4 clicks). On Bing and DuckDuckGo, `/moshy` sits at #4 to #5; on Brave AU it is #14.

**research/offsite-sweep-2026-09-13.md**
- Agree: "Refer Labs is on none of the pages that outrank us." Of every third-party page fetched today, none mentions Refer Labs.
- Agree: coupon-site distribution stays **gated on Moshy's and Mosh's partner terms**. I found nothing public that settles it. Moshy's own terms reserve the right "to refuse limited or exclusive promotions, including but not limited to select ambassador, affiliate offers", but that sentence sits in the Price Match Guarantee section and does not speak to distribution.
- Update: the weightloss.com.au codes that sweep declined to call wrong (MOSHINTRO100, MOSHYINTRO100, START50) are all **merchant-published codes**: they appear on getmosh.com.au, getmoshy.com.au and myjuniper.com respectively (19 Sep 2026). The sweep was right not to call them wrong.
- Update: OzBargain was UNVERIFIED there. It is now observed. The Moshy store page reads "No deal has been posted from this store". The Moshy and Mosh entries sit in OzBargain's Automated Referral System, which rotates members' customer referral links ("Referee & Referrer: $50 credit", 2 referrers for Moshy). A native search for REFERRAL120 "did not match anything".

**research/outreach-2026-09-13.md**
- Disagree with the priority, not the drafts. The twelve code requests are ordered by impressions and are all B2B or energy partners. None is Moshy, Mosh or Juniper, which carry all the revenue. The request with the largest expected value is missing from the list: **ask Juniper for a partner code.** We hold none, Juniper publishes START50 on its own page, and every Juniper code query is owned by Juniper and coupon sites (Section B2).

---

## Part A. Comparable businesses

All facts were read on 19 September 2026 from the source named, unless marked "snippet", which means search-result text only.

### Comparison publishers

**Finder** (Hive Empire Pty Ltd)
- *Model:* comparison publisher across 100+ categories, claiming "2 million+ Australians" a month ([finder.com.au/partner-with-us](https://www.finder.com.au/partner-with-us)).
- *Monetisation:* "referral fee, commission or other payment" when a user clicks, enquires or applies; sponsored placements labelled Sponsored/Promoted/Featured; display ads; sponsored content ([finder.com.au/how-we-make-money](https://www.finder.com.au/how-we-make-money), which now redirects to /why-trust-us).
- *Attribution:* tracked click-outs and enquiry forms. Finder Rewards pays a gift card only if a logged-in user completes the purchase "within 3 hours of clicking through, in the same session" ([Finder Rewards help](https://www.finder.com.au/finder-rewards/finder-rewards-help-centre/what-is-finder-rewards)).
- *Merchant acquisition:* direct sales team selling CPA/CPL, sponsorship, display and Rewards placements (partner-with-us).
- *Hardest to copy:* its own AFSL 547310 and ACL 385509, which let it earn on regulated financial products, plus scale. It bought Mozo in June 2026 ([mozo.com.au/about-us](https://www.mozo.com.au/about-us): "Mozo is part of Finder").

**Canstar**
- *Model:* ratings and research company that also runs consumer comparison sites. The brief's "ASX: CNS" could not be verified; sources describe a privately owned company founded 1992 ([IBISWorld](https://www.ibisworld.com/australia/company/canstar-pty-limited/558744/), snippet). Treat the listing premise as unverified.
- *Monetisation:* lead referrals; paid Sponsored/Featured/Promoted placements; **award licences** ("Award winners choose to pay to show Award logos"); database subscriptions sold to financial institutions ([canstar.com.au/how-we-get-paid](https://www.canstar.com.au/how-we-get-paid/)).
- *Attribution:* referral click-outs and leads. Energy switching runs on CIMET's white-label platform, where "Canstar and CIMET may each receive a referral fee" (Canstar Blue disclosure, snippet).
- *Merchant acquisition:* rates providers whether or not they pay, then sells them award licences, ads and data.
- *Hardest to copy:* a 30-year ratings brand that providers pay to license. That income needs no attribution at all.

**Mozo** (owned by Finder since June 2026)
- *Model:* financial comparison site since 2008 (about-us).
- *Monetisation:* "advertising and sponsorship, the use of their MarketView tools, award licences, lead generation and customer referrals" (provider-services page, snippet; the page returned 404 when fetched).
- *Attribution:* paid click-outs and leads (snippet).
- *Merchant acquisition:* account management selling ads, MarketView data and award licences (about-us).
- *Hardest to copy:* now inside Finder's group; otherwise the same data-plus-awards pattern as Canstar.

**Money.com.au**
- *Model:* comparison site with in-house brokers and advisers (1300 4 MONEY).
- *Monetisation:* "commission from a lender if one of our in-house brokers refers" a customer; partner referral commissions; health insurance paid through The ItsMy Group, which "receive a payment from that fund which they pass on to us" ([money.com.au/about/how-we-make-money-and-avoid-conflicts](https://www.money.com.au/about/how-we-make-money-and-avoid-conflicts)).
- *Attribution:* the brokers close the sale themselves, so the lender records it against them. Tracked click-outs run alongside.
- *Merchant acquisition:* lender panels, plus the ItsMy Group health panel.
- *Hardest to copy:* its own ACL 528698, plus CAR status under AFSL 548573, so it brokers the loan itself instead of referring it.

**Compare Club**
- *Model:* comparison brokerage built on a call centre: "300+ real humans" ([compareclub.com.au](https://compareclub.com.au/)).
- *Monetisation:* "We do collect a fee from your chosen health fund", sometimes "on an annual or recurring basis" ([health-insurance/how-we-make-money](https://compareclub.com.au/health-insurance/how-we-make-money/)). 2025 revenue about $86.2m (IBISWorld/PitchBook, snippet).
- *Attribution:* forms and calls, with the policy written by its own agents, so no cookie is involved. Also runs an impact.com affiliate program (snippet).
- *Merchant acquisition:* insurer and lender panel agreements. It is a CAR of Alternative Media Pty Ltd (AFSL 486326).
- *Hardest to copy:* a licensed sales floor that closes the sale and earns recurring trail.

**Savvy** (Quantum Savvy Pty Ltd)
- *Model:* comparison plus credit brokerage, mainly asset finance.
- *Monetisation:* per-click and per-conversion partner fees; broker commission "between 0.00% and 15.00% of the amount financed"; referrers are paid "$1 – $500 or up to 30%" of Savvy's commission ([savvy.com.au/how-we-make-money](https://savvy.com.au/how-we-make-money/)).
- *Attribution:* forms and click-outs. On finance, Savvy provides the credit assistance itself.
- *Merchant acquisition:* lender panels, as an Authorised Credit Representative (541339) under ACL 414426.
- *Hardest to copy:* commission as a percentage of the loan, earned as broker.

**WhistleOut**
- *Model:* comparison of phone and broadband plans.
- *Monetisation:* "cost per click, cost per sale, cost per call or cost per call back". It "may limit the plans shown" to paying providers and labels where it does ([whistleout.com.au/How-We-Work](https://www.whistleout.com.au/How-We-Work)).
- *Attribution:* click-outs plus tracked calls and call-backs.
- *Merchant acquisition:* telco agreements, plus a Partner Program that gives other publishers a white-label site and widgets paying "for every commercial transaction click" ([Partner-Program](https://www.whistleout.com.au/Partner-Program)).
- *Hardest to copy:* a maintained plan database, syndicated to other publishers. Sold for A$44m in 2018 to Clear Link (snippet). Current parent: unverified.

### Code and cashback platforms

**Cashrewards** (closed 8 September 2025)
- *Model:* cashback site, app and extension, with card-linked in-store offers until 15 January 2024 (OzBargain node 820320, snippet).
- *Monetisation:* merchant affiliate commission, most of it passed to members.
- *Attribution:* tracked click-through and extension; card-linking while it ran.
- *Merchant acquisition:* affiliate networks and direct deals.
- *Lesson:* ANZ's 1835i took it over, not Latitude as the brief assumed, then wrote off about $100m when it closed ([Startup Daily](https://www.startupdaily.net/topic/fintech/fintech-cashrewards-is-kaput-leaving-anzs-vc-arm-to-write-off-100-million/)). It had delisted from the ASX (CRW) on 21 January 2022 (delisted.com.au, snippet).

**ShopBack** (Australia)
- *Model:* cashback site, app and extension, plus in-store offers.
- *Monetisation:* "Merchants pay commission to anyone who refers a paying customer… ShopBack registers as one of those referrers and shares the bulk of the commission back" ([how-shopback-works](https://www.shopback.com.au/guide/basics/how-shopback-works)).
- *Attribution:* online, cookie last-click in the same session ("only the most recent referrer gets credited"). In store, card-linking with CBA, ANZ, Westpac and NAB cards, where "the payment network notifies the offer programme"; no receipt scanning ([earn-cashback-in-store](https://www.shopback.com.au/guide/how-to/earn-cashback-in-store)).
- *Merchant acquisition:* affiliate networks, plus a business arm selling retail media (business.shopback.com, which renders only with JavaScript; contents not observed).
- *Hardest to copy:* bank card-linking and payment-network agreements for in-store attribution.

**Little Birdie** (closed)
- Price comparison and deals over about 70m products, launched 2021 with about $30m from CBA (snippet). Paused May 2024, bought by Cashrewards August 2024, closed September 2025 (OzBargain node 923179). Monetised by affiliate click-outs (snippet).

**OzBargain** (Delvu Media Pty Ltd)
- *Model:* community deal forum ranked by member votes.
- *Monetisation:* display ads plus affiliate links. Submitted links are "automatically converted to an affiliate link if OzBargain is an affiliate", but only for users who are not logged in ([help:affiliate_links](https://www.ozbargain.com.au/wiki/help:affiliate_links)).
- *Attribution:* automatic link rewriting across about six networks. Members' customer referral links go through its Automated Referral System, which covers Mosh and Moshy ([list_of_referral_links](https://www.ozbargain.com.au/wiki/list_of_referral_links), observed).
- *Merchant acquisition:* merchants post their own deals free: "There is no charge for anyone to post". Store reps must declare the association, are limited to 1 deal per 24 hours and 2 per 7 days, and cannot buy placement ([help:faq_merchants](https://www.ozbargain.com.au/wiki/help:faq_merchants)).
- *Hardest to copy:* the community's trust, which rests on not monetising logged-in members.

**Honey** (PayPal)
- *Model:* browser extension that finds and applies codes.
- *Monetisation:* "Honey makes commissions from our merchant partners… when a member uses Honey to find available savings" ([Honey help](https://help.joinhoney.com/article/30-how-does-honey-make-money)).
- *Attribution:* sets the affiliate cookie at checkout (last click). Subject of the creator "commission hijacking" litigation; a motion to dismiss the amended complaint was denied on 22 June 2026 (snippet).
- *Merchant acquisition:* networks (Awin, CJ, Rakuten). Merchant FAQ: "Merchants have control over the content hosted on the Honey platform. Simply reach out to your Honey Partnerships Team to add deals/codes" ([get.joinhoney.com/business/faq](https://get.joinhoney.com/business/faq/)).
- *Hardest to copy:* an installed extension at the checkout, owned by a payments company.

**Rabble** (Rabble Communications AB, Sweden): receipt-scanning attribution, verified from its own site
- *Model:* started 2010 as a discount-code site, launched the cashback app in 2022, and now runs "cashback-erbjudanden i appen och rabattkoder på hemsidan" (cashback offers in the app, discount codes on the website) in SE, NO, DK and FI ([rabble.se/om-oss](https://www.rabble.se/om-oss)).
- *Monetisation:* "Varumärkena betalar för samarbetet med Rabble och en del av summan betalar vi ut till dig i form av cashback" (the brands pay Rabble and part is paid to you as cashback) ([help article 21244](https://help.rabble.com/sv/articles/21244-vad-ar-haken-varfor-betalar-rabble-mig-for-att-handla)). The B2B page sells FMCG brands "first-party purchase validation", shopper data and retail media ([b2b.rabble.com](https://b2b.rabble.com/)). No pricing model is published.
- *Attribution, verified:* **receipt scanning, not card-linking.** The flow is "Köp, scanna, casha in" (buy, scan, cash in):
  - The user selects offers in the app and shops "i valfri butik" (in any store).
  - The user then photographs the paper receipt or uploads a digital one ([rabble.se](https://www.rabble.se/); I confirmed the homepage wording in a browser, 19 Sep 2026).
  - Receipts must be at most 14 days old and from the Swedish market. An automatic scanner checks them, with manual review within about 72 hours when it cannot, and editable order confirmations are rejected (help articles 146413, 101969, 101878, 820618).
  - Receipt offers work "i vilken butik som helst som säljer produkten, inklusive onlinebutiker" (in any store that sells the product, including online stores) (help 142351).
  - Rabble's separate online cashback for 100+ retailers uses ordinary affiliate click tracking, and "Om du går direkt till butikens webbplats… kommer köpet inte att registreras" (if you go direct to the store's site, the purchase is not registered) (help 455608).
- *Merchant acquisition:* direct B2B sales to FMCG brands in each Nordic country, plus affiliate networks for online retailers.
- *Hardest to copy:* brand-funded, retailer-agnostic attribution. Because the brand pays, the store does not need to be party to anything, and the receipt is the proof of purchase.

**What Part A means for Refer Labs.** Two mechanisms here survive a customer leaving the site, and Refer Labs already holds one of them. A code unique to the publisher, which Moshy honours on redemption alone, is the telehealth equivalent of Awin's Voucher Attribution and of Rabble's receipt: proof of influence that needs no cookie. Finder Rewards and ShopBack both require the purchase in the same session or within 3 hours, which suits neither a telehealth sign-up that takes days nor a practitioner consult.

---

## Part B. Who owns the code queries

### B1. Refer Labs' own Google positions (Search Console, 21 Aug to 17 Sep 2026)

| Query | Page | Clicks | Impressions | Avg position |
|---|---|---:|---:|---:|
| mosh discount code | /moshhair | 2 | 162 | 11.3 |
| mosh discount code | /deals | 0 | 70 | 26.4 |
| mosh discount code | /moshy | 0 | 56 | 68.5 |
| moshy discount code | /moshy | 4 | 90 | 5.1 |
| moshy discount code | /deals | 0 | 66 | 8.4 |
| get mosh discount code | /moshhair | 1 | 12 | 9.3 |
| mosh discount codes | /deals, /moshhair | 0 | 15 | 7.5 to 9.2 |
| mosh promo code | /moshhair | 0 | 7 | 9.0 |
| moshy promo code | /moshy, /deals | 0 | 12 | 6.3 to 7.7 |
| juniper discount code australia | /deals | 0 | 5 | 23.6 |
| juniper promo code, juniper discount code | none | 0 | 0 | not shown |

Two structural points. "mosh discount code" is split across three of our URLs, with the Moshy page taking 56 impressions at position 68, which is Google testing the wrong page. And Juniper has no page that Google treats as relevant for code intent. The only Juniper code impressions go to `/deals`.

### B2. Observed rankings on other engines (19 September 2026)

Positions are among organic results. "RL" is Refer Labs. Google could not be observed (Section 1).

**"moshy discount code"**
| # | Bing / DuckDuckGo (same order) | Brave AU |
|---|---|---|
| 1 | au.hotdeals.com (Moshy) | getmoshy.com.au/promo-codes-coupons |
| 2 | getmoshy.com.au/promo-codes-coupons | au.hotdeals.com |
| 3 | getmosh.com.au/promo-codes-coupons | getmosh.com.au/promo-codes-coupons |
| 4 | **RL /moshy** | dealspotr.com (Moshy; now returns 410 Gone) |
| 5 | wethrift.com (Moshy) | reddit r/WegovyWeightLoss "Moshy discount code Aus" (Oct 2024) |
| 6 | frugalfeeds.com.au (Mosh) | getmoshy.com.au/promotions-terms-and-conditions |
| 7+ | dontpayfull (wrong brand, Moshi), dealdrop (wrong brand, MOSH Life) | ... **RL /moshy at #14** |

**"moshy promo code":** Bing #5 RL /moshy, behind hotdeals, getmoshy, wethrift and getmosh. DuckDuckGo #5 RL. Brave #19 RL.
**"moshy coupon code":** DuckDuckGo #5 RL /moshy.

**"mosh discount code"**
| # | Bing | DuckDuckGo | Brave AU |
|---|---|---|---|
| 1 | getmosh.com.au/promo-codes-coupons | getmosh.com.au/promo-codes-coupons | getmosh.com.au/promo-codes-coupons |
| 2 | workingcoupons.com.au | workingcoupons.com.au | wethrift.com/mosh |
| 3 | bestcoupons.com.au | bestcoupons.com.au | getmosh.com.au/good-things |
| 4 | dealdrop.com (MOSH Life, wrong brand) | dealdrop.com | discountreactor (MOSH Life) |
| 5 | au.codes.discount | au.codes.discount | reddit r/povertyaus (referral code, Oct 2024) |
| 6 | getmosh.ozsavingspro.com | getmosh.ozsavingspro.com | coupert (Code With Mosh, wrong brand) |
| 7 | dontpayfull.com | dontpayfull.com | frugalfeeds.com.au |
| 8 | frugalfeeds.com.au | frugalfeeds.com.au | getmoshy promo page |
| 9 | promocodes.com (MOSH Life) | promocodes.com | reddit r/ausreferralcodes |
| 10 | **RL /moshhair** | **RL /moshhair** | Refer Labs absent from top 20 |

**"mosh promo code":** Bing has getmosh, dealdrop, promocodes, frugalfeeds, dontpayfull, wethrift, bestcoupons, wethrift (MOSH Life), Mosh's terms page, coupert. Refer Labs is absent from Bing's top 10, DuckDuckGo's top 10 and Brave's top 20.

**"juniper discount code" / "juniper promo code"**: myjuniper.com/discount-code is #1 on Bing and DuckDuckGo for both, and #1 and #3 on Brave. The rest of the top 10 is hotdeals.com (US), dealdrop (a boutique also called Juniper), worthepenny, au.coupert.com (pointing at juniper.org.au, a different organisation), couponannie (juniper.net, the networking company), OzBargain's store page, Reddit threads, and Juniper UK. Refer Labs is absent from all of them.

A large share of the coupon results are **wrong-entity pages** (MOSH Life, Moshi, Code With Mosh, Moshtix, juniper.net, Juniper Books). They rank on the brand token, not on relevance. A page that is clearly about the right merchant, with a verified code, should be able to outrank them on relevance alone. The authority gap is with the merchant pages and HotDeals, not with these.

### B3. The merchant-published codes (these are the real competition)

| Merchant page (own site) | Codes published, 19 Sep 2026 | Value and term as the merchant states it |
|---|---|---|
| getmoshy.com.au/promo-codes-coupons | SNEAKY50AU, MOSHYINTRO100 | $50 off first treatment; $100 off first month of weight-loss program |
| getmoshy.com.au/promotions-terms-and-conditions | MOSHYDEAL120, MOSHYINTRO100, MOSHY50FIRST, MOSHY50MONTHLY, SPRING50, INTRO50, EOFYSALE150, HOP50 | MOSHYDEAL120: "Save $120 on your first month", "Offer ends February 28th, 2026 and may be extended". MOSHYINTRO100: to 28 February 2027. MOSHY50FIRST: "50% off their first eligible billing period", no end date found. SPRING50: ended 1 September 2026. |
| getmoshy.com.au homepage | MOSHYINTRO100 | "$100 off your 1st month of weight loss" (Brave snippet) |
| getmosh.com.au/promo-codes-coupons | SNEAKY50AU, MOSHINTRO100 | $50 off first order; $100 off first month weight loss |
| getmosh.com.au/promotions-terms-and-conditions | HAIR55, PILOTPMG, PAT50, MOSHDEAL120, EOFYSALE150 and others | HAIR55: 55% off the first order covering 3 months, ends 30 September 2026. **PILOTPMG: 58% off the first 3 months, ends 28 February 2027.** PAT50: described as a "partnerships promo code", 50%, ended 30 June 2026. |
| getmosh.com.au/good-things | **GTHAIR55**, GTMOSHINTRO100, GTS3X20 | "Get 55% off your first 3 months of Hair Loss Treatment" |
| myjuniper.com/discount-code | START50 | "Save $50 off your first month with code START50"; "Refer and earn": a customer's referral code gives the friend $75 off the first two months |

Neither REFERRAL120 nor REFERAL55 appears on any of these pages. `public/llms.txt` line 34 states the two codes "are not published by the providers", and as a statement about the strings that is true. But a reader choosing between us and a coupon site sees the same or better value elsewhere. For Mosh the merchant itself publishes a bigger number (58%) until February 2027. PAT50 shows Mosh already runs named partner codes in its public terms, which is precedent for asking Mosh to list REFERAL55 the same way.

### B4. Competing sites: what they list, whether it is official, and how the merchant would credit it

"Official" means the code appears on the merchant's own page (B3). "How credited" is my reading of the mechanism, not a fact supplied by the merchant. Only Moshy has confirmed, through Jarred on 20 Aug 2026, that code use alone pays the code holder.

| Site (URL) | Codes listed, 19 Sep 2026 | Official or scraped | How the merchant would credit a sale |
|---|---|---|---|
| au.hotdeals.com/brands/moshy-discount-code | Active: THMINTRO100, THMSPRING, MOSHY50FIRST, MOSHYDEAL120, INTRO50, MOSHY50MONTHLY, MOSHINTRO100, SPRING50, MOSHYINTRO100, SNEAKY50AU. **Expired: 110BACK, CRYOCURVE120, REFERRAL120, FLASH20, 20OFF.** "Last Updated 19 September 2026". Claims "Official-site verified 14". | Mostly scraped from Moshy's own terms. THM* codes look like The Healthy Mummy (a Moshy sibling brand) codes applied to the wrong store. REFERRAL120 scraped. | Merchant codes: credited as a Moshy promotion, with no affiliate unless HotDeals holds a Moshy affiliate cookie (not observed). **REFERRAL120: credited to Refer Labs, by the code.** |
| wethrift.com/codes/getmoshy.com.au | THMINTRO100 only ("No shopper has reported back on it yet") | Scraped, and a Healthy Mummy code | No credit, or HealthyMummy's promotion |
| getmosh.ozsavingspro.com | PILOTPMG, S3X20, GTHAIR55, GTMOSHINTRO100, GTS3X20, HAIR55, MOSHDEAL120, INTRO50, COLIN54843 (a customer referral code) | Official merchant codes, plus one customer referral code | Merchant promotion; the referral code credits the customer "Colin" |
| mosh.valuecom.com | PILOTPMG (58%, which it says "Ends 09/20/2026"; Mosh's own terms say 28 Feb 2027), HAIR55, GTHAIR55, MOSHINTRO100, SNEAKY50AU, VALUECOM10 and others, each labelled "Found on official website" | Scraped from Mosh's own pages | Merchant promotion |
| dontpayfull.com/at/getmosh.com.au | Masked codes including ***AIR55 (55%, "Ends Sep 30, 2026") and the 58% code; "Verified 12h ago by our staff" | Scraped | Merchant promotion |
| frugalfeeds.com.au/mosh-discount-code | AMANDA20480, GTS3X20, MOSHINTRO100, SNEAKY50AU; "Verified 17 September 2026" | Official, plus AMANDA20480, which looks like a customer referral code | Merchant promotion; the referral code credits that customer |
| bestcoupons.com.au and workingcoupons.com.au (Mosh) | Same four codes as Frugal Feeds; "Last verified: September 18, 2026" and "September 14, 2026" | Same template as Frugal Feeds; probably a common operator (inference) | Same |
| au.codes.discount/getmosh.com.au | MOSHINTRO100, SNEAKY50AU, GTS3X20, AMANDA20480, plus generic strings (NY2026, SUMMER10, THANKYOU25, CF*) | Mix of official and generic | Mostly no credit; the generic strings probably fail |
| mosh.tenereteam.com | MOSHINTRO100, SNEAKY50AU, PAY20, TRO75 | Mix | Merchant promotion |
| weightloss.com.au/telehealth | MOSHINTRO100, MOSHYINTRO100, START50 | Official | Merchant promotion; the page may earn by link (not observed) |
| my-juniper.tenereteam.com | START50, START150, REF-8FUR-HDCK, REF-HTKA-DW8T | START50 official; REF-* are Juniper customer referral codes | START50: Juniper promotion. REF-*: credited to the referring customer. |
| hotdeals.com/coupons/juniper-promo-codes (US) | REF-EVVV-YA3Q and other REF-* codes, KATEDJUNIPER, CANDICE, STEVI20, HERBST (a euro-denominated code) | Customer referral codes and influencer-style codes, some from Juniper's European markets | Referring customer or influencer. The 7 Sep audit found public help content saying Juniper blocks referral codes shared publicly. |
| au.coupert.com/promo-code/juniper-org-au | TIGERS50, for juniper.org.au | Wrong entity | None |
| couponannie.com/stores/juniper-sales | REF-JCHL-MN3H, "Save $50 off your first month with Juniper", Friend25, plus juniper.net hardware offers | Mixed entity | Referring customer |
| OzBargain /deals/getmoshy.com.au | No deals; referral system, "$50 credit" | Customer referral rotation | Referring OzBargain member |
| greenpromocode.com/coupons/moshy | WELCOME20 | Generic | Probably fails |
| referralcodes.com, rewardcircle.com, referralcode.tv | Customer referral codes (e.g. LUCAS90693 for Mosh) | Customer referral | Referring customer |

**No page in this table mentions Refer Labs.** Every coupon site's ranking asset is the merchant's own codes. None of them has a code the merchant does not already publish, except customer referral codes, and the only publisher-exclusive code found anywhere in these SERPs is REFERRAL120, sitting in HotDeals' expired list.

### B5. Every place REFERRAL120 was found

Searches for the exact string, 19 September 2026: Bing ("REFERRAL120", REFERRAL120 moshy, moshy REFERRAL120 code, "REFERRAL120" moshy coupon, REFERRAL120 code); DuckDuckGo (the first three); Brave AU ("REFERRAL120", REFERRAL120 moshy; the site-restricted queries were rate-limited and returned nothing usable); OzBargain native search; Reddit native search; Cuponation native search. Direct page fetches of 70 candidate coupon, cashback and referral pages were scanned for the string.

| # | Where | URL | Seen | What it says | Credits Refer Labs? | Helps or hurts |
|---|---|---|---|---|---|---|
| 1 | HotDeals AU | au.hotdeals.com/brands/moshy-discount-code | 19 Sep 2026 (Bing #4 for "REFERRAL120"; Brave #2) | Under "Expired Moshy Discount Codes & Coupons": "Sale / CODE / Exclusive Offers: Use a Promo Code at the Time of Payment to Get Huge Discounts / Get Code / REFERRAL120". No value, no terms. Brave's cached snippet of the same URL shows REFERRAL120 listed first as "30% Off", under an older title reading "June 2025". The crawl date of that snippet is unknown. | No | **Mildly hurts as it stands.** If the code is live, labelling it expired steers users away, and any engine that reads the page learns "REFERRAL120 expired". The earlier "30% Off" description was also wrong, since the value is $120 off. It helps only if it is corrected to active, because Moshy pays Refer Labs on the code. |
| 2 | Refer Labs' own site | referlabs.com.au /moshy, /deals, /moshy-review, /data, /best-weight-loss-telehealth-australia, /moshy-vs-juniper, /moshy-vs-gp, /moshy-alternatives | 19 Sep 2026 (top results on every engine for the exact string) | "The current Moshy discount code is REFERRAL120…" | n/a | Helps |
| 3 | Refer Labs Facebook page | facebook.com/profile.php?id=61592445156591 | 19 Sep 2026 (Bing #3 for "REFERRAL120") | Page listing; the REFERAL55 post is quoted in B6 | n/a (own) | Helps |

**Searched and not found:** OzBargain (native search: "Your search [for] REFERRAL120 did not match anything" (dashes removed from the quote); the Moshy store page has no deals); Reddit (native search auto-corrected to "REFERRAL 120" and showed no post containing the exact string); Cuponation (no Moshy or Mosh store page: /moshy and /mosh return 404, and search returns generic offers); Picodi AU (/moshy and /mosh 404); Knoji (getmoshy and getmosh subdomains return 410 Gone); Dealspotr (getmoshy.com.au and getmosh.com.au pages return 410 Gone, although Brave still indexes the Moshy one as "$150 Off"); Groupon AU (/coupons/moshy redirects to the coupons index); Wethrift, greenpromocode, moshy.tenereteam.com, au.hotsbuy.com, Promocodes.com, DealDrop, Frugal Feeds, bestcoupons, workingcoupons, au.codes.discount, ozsavingspro and valuecom (all fetched, none contains the string); australiancoupons.com.au (/mosh redirects to the homepage, /moshy 404); lovecoupons.com.au (/mosh redirects to the homepage, /moshy 404); ShopBack (307 to a category page); Cashrewards (domain does not resolve).

**Could not be observed:** Google (captcha); Brave site-restricted queries (rate-limited); au.coupert.com for Moshy (404 in the browser: no page, rather than a block); referralcode.tv (Cloudflare held); 1688.com.au (403); juniper.worthepenny.com (Cloudflare held); Facebook groups and Instagram beyond what the search snippets showed; TikTok. "Not found" above means not found on the engines and native searches named. It does not prove the string appears nowhere.

**Can each listing be corrected, removed or outcompeted?**
- *HotDeals AU:* correctable, via [au.hotdeals.com/contact](https://au.hotdeals.com/contact/). The ask is to move REFERRAL120 to active with the true description: $120 off a new customer's first month on a practitioner-assigned weight-loss program, one use. **Gate:** do this only after Moshy confirms it has no objection to a coupon site listing the code. The offsite sweep's gating stands. A merchant takedown is not needed: the listing is not harmful enough to spend partner goodwill removing it. Outranking it is realistic. HotDeals ranks #1 on Bing for "moshy discount code" with codes copied from Moshy's own terms, and our page sits at #4 to #5 on that engine and 5.1 on Google.
- *Own pages and socials:* nothing to correct.

**Why so few copies, and what that says about the unattributed half.** A scraped listing would pay Refer Labs, so the near-absence of copies is a missed free channel rather than a threat. It also means coupon sites cannot explain the roughly 50% of REFERRAL120 redemptions with no referring visit: the one copy found says "expired". The remaining explanations can each be checked, and none was measured here:
- people who read the code on a Refer Labs page and type it later in a fresh tab or on another device;
- AI answers, since `llms.txt` states the code literally and Bing's AI Performance report records about 1,200 citations over 28 days;
- the Facebook and Instagram posts;
- word of mouth.

The cheapest test is to ask Moshy for the redemption timestamps. A lag of days after a Refer Labs session points to people typing it later. Redemptions with no Refer Labs session within the window point to AI answers or sharing.

### B6. Every place REFERAL55 was found

Searches: Bing ("REFERAL55"), DuckDuckGo ("REFERAL55", REFERAL55 mosh), Brave AU ("REFERAL55"), Reddit native search (auto-corrected to "REFERRAL55"; no exact match shown). Fetched pages scanned as above.

| Where | URL | What it says | Credits RL | Helps or hurts |
|---|---|---|---|---|
| Refer Labs site | /moshhair, /mosh-review, /deals, /hair-loss, /best-hair-loss-treatment-australia, /mosh-vs-dense | "55% off your first order with code REFERAL55 via our link" | own | Helps |
| Refer Labs Facebook | facebook.com/profile.php/?id=61592445156591 | "we're also delighted to offer 55% off your first order (code REFERAL55) 👉 https://referlabs.com.au/moshhair" | own | Helps |
| Refer Labs Instagram | instagram.com/p/Db7tC5sIKRM/ | "referlabs on August 12, 2026: Refer Labs are excited to partner with Mosh. Through our link, new customers receive 55% off their first order using code REFERAL55 at checkout" | own | Helps |

**No third-party listing of REFERAL55 was found.** The practical problem is that coupon sites rank for "mosh discount code" with PILOTPMG (58%), HAIR55 and GTHAIR55 (55%), all published by Mosh itself. A reader who compares will pick 58%. Whether a PILOTPMG sale pays Refer Labs anything is not known, and it probably does not. The spelling, one R in "REFERAL", invites typos ("REFERRAL55"; Reddit's search auto-corrected it exactly that way). It is worth asking Mosh whether REFERRAL55 can be aliased to the same attribution.

### B7. Juniper code strings seen

START50 (official, myjuniper.com, $50 off first month). START150 (tenereteam, unverified). Customer referral codes REF-8FUR-HDCK, REF-HTKA-DW8T, REF-EVVV-YA3Q, REF-QY4L-4YQT, REF-JJX7-B73E, REF-YCW7-8X95, REF-JCHL-MN3H, REF-EVAN-B858 (hotdeals.com, tenereteam, couponannie, worthepenny snippet). Influencer or third-country strings KATEDJUNIPER, CANDICE, STEVI20, KIRSTENCFC, HERBST, JULI2026 (hotdeals.com). UK: SNOWMAN (myjuniper.co.uk), AUTUMN (uk.hotdeals.com), REF-NEC3-HB89 (Mumsnet, £50). Wrong entity: WELCOMENEWUSERS and SIX21 (DealDrop, a boutique), TIGERS50 (Coupert, juniper.org.au), WETHRIFT (Wethrift, Juniper Boutique). **Refer Labs holds no Juniper code**, so no Juniper sale can be attributed by code, and our Juniper link attribution is UTM-based (`utm_campaign=jarred_k`, per project memory).

---

## 3. What Refer Labs has not done that these businesses did

Ranked by feasibility for one operator with no engineering team. The first four are a message or a form, not a build.

1. **Ask Juniper for a partner code** (Finder, OzBargain store reps and Honey's merchant FAQ all run on merchants supplying codes). Juniper already publishes START50 and a refer-a-friend scheme, so code machinery exists. Without a code, Refer Labs cannot rank for or be credited on "juniper discount code", which Juniper's own page owns on every engine. One email to the account manager.
2. **Ask Moshy and Mosh to list REFERRAL120 and REFERAL55 on their own promotions terms pages, the way Mosh lists the "partnerships promo code" PAT50.** Those pages rank top 3 for every Mosh and Moshy code query and are what the coupon sites scrape. A listing there would be copied onto the ranking coupon pages for free, and each copy pays Refer Labs on redemption. Same email: ask for REFERAL55 to match PILOTPMG's 58%, or for an explanation of why a public code beats the partner one, and whether REFERRAL55 can be aliased. **This is the highest-value item and costs one message.**
3. **Get written permission on coupon-site distribution, then correct HotDeals.** HotDeals ranks #1 on Bing for "moshy discount code" and already carries REFERRAL120, marked expired. A contact-form message moving it to active turns an existing listing on the top-ranked page into free distribution. Gated on Moshy's answer to item 2.
4. **Post the merchant-sanctioned offer on OzBargain the way merchants do**, if Moshy agrees. OzBargain lets store reps post free, capped at 1 deal a day and 2 a week, and affiliate links are banned for members. Refer Labs is not the merchant, so Moshy's rep would have to post it. Ask Moshy whether it will post the REFERRAL120 offer as an OzBargain deal. OzBargain showed "No deal has been posted from this store" for Moshy on 19 Sep 2026.
5. **Consolidate "mosh discount code" onto one URL.** Google currently splits it across /moshhair (11.3), /deals (26.4) and /moshy (68.5). Every surviving competitor in B2 runs one page per merchant. This is a content and internal-linking change, within reach of one person.
6. **State the merchant's own public codes on our pages, dated, beside ours.** Every coupon site that outranks us does this, and it is the commercially inconvenient half the citation rule asks for: "Mosh itself publishes PILOTPMG for 58% until 28 Feb 2027; our REFERAL55 is 55%". A reader who sees both on our page has less reason to leave for a coupon site, and the page becomes the complete answer an engine can cite. Check first that neither partner's terms forbid naming their other codes, and route it through `PENDING_VERIFICATION` until checked.
7. **Measure the no-referrer half before building for it.** Ask Moshy for redemption timestamps (B5). Compare Club, Money.com.au and Rabble each built their business on owning the proof of the sale. For Refer Labs, the code is that proof, and the question is only where the typing happens.
8. **Get paid for something other than the attributed click** (Canstar and Mozo award licences, Canstar's data subscriptions, WhistleOut's syndicated widgets). Refer Labs has dated primary-source checks at /data, which is the raw material for a licensable dataset or a "verified offer" badge. Selling it needs a sales motion and pricing, so it is feasible but slow, and it only makes sense once a partner asks for it.
9. **Hold a licence and close the sale** (Money.com.au, Savvy, Compare Club). This is structurally the strongest moat in Part A and the least feasible for one operator: it needs an ACL or AFSL, compliance staff and, for health, a sales floor. It is listed so that it is ruled out deliberately rather than forgotten.
10. **Build receipt or card-linked attribution** (Rabble, ShopBack). This needs an app, OCR or bank partnerships, and fraud review. It is not feasible, and it is unnecessary while Moshy honours the code alone.

---

## Unverified, stated plainly

- Google rankings for every query: not observable (captcha). Our Google positions come from Search Console only.
- Whether REFERRAL120 is currently live at checkout: not tested; Refer Labs last verified it 17 August 2026. HotDeals labels it expired. This should be checked in a browser before asking HotDeals to change anything.
- Whether a PILOTPMG, GTHAIR55 or HAIR55 sale pays Refer Labs anything: unknown. Probably not.
- Moshy's and Mosh's partner terms on coupon-site listing: not public.
- The date of Brave's "June 2025 / 30% Off" HotDeals snippet: unknown. REFERRAL120 first appears in this repo on 7 July 2026 (commit c64efec). If that snippet really dates from June 2025, the code predates Refer Labs' use of it. That would contradict the "unique to Refer Labs" premise, and it is worth one question to Moshy.
- Canstar's ownership and any ASX history; WhistleOut's current parent; the contents of ShopBack's business pages; Rabble's B2B pricing: unverified (Part A).
