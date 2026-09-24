# Refer Labs: the 12-month plan to a materially bigger business

**Prepared 24 September 2026, for Jarred.** Read-only research; nothing on the site changed. Every figure below is either read from the site's own data this week (Search Console and GA4 via `scripts/google-data.mjs`, production logs, the offers table) or carried over from the September research set in this folder with its source. Where a number is an assumption it says so, and where a partner fact was not found on a public page it is marked **unverified** rather than filled in.

The target is A$10,000 a day. This document says what it would actually take, which levers can plausibly carry it, in what order, and where the plan is honest about the odds.

---

## 1. Where the business stands today, in numbers

| Measure | Value | Source |
|---|---|---|
| Transactions | about 2.3 a day across Moshy, Mosh, Juniper | operator figure, Sep 2026 |
| Gross revenue | roughly A$460 to A$690 a day, call it **A$575** | 2.3 × A$200 to A$300 payouts |
| Google impressions, 90 days | 31,648 | GSC, 25 Jun to 22 Sep |
| Google clicks, 90 days | **130**, about 1.4 a day | GSC |
| GA4 new users | about 3 a day, consented only | GA4, property 518598189 |
| Brand searches for "refer labs" | zero in 90 days | GSC |
| Codes held that pay on redemption | 6: Moshy, Mosh, Juniper, i-screen, Knose, PetsOnMe | `src/lib/offers.ts` |
| Codes that produce nearly all revenue | 3: Moshy, Mosh, Juniper | operator figure |

Two things in that table decide everything that follows.

**Sales exceed Google clicks.** 2.3 sales a day against 1.4 Google clicks a day. This was established in `no-click-mechanism-2026-10.md`: between 57% and 97% of transactions have no referring visit. The revenue comes from the **code being seen**, in a search snippet, an AI answer, a screenshot, a message between friends, and then typed at the merchant's checkout, where Moshy and Mosh credit Refer Labs on the code itself. Clicks are not the business. Code visibility is.

**Demand is concentrated where the money is not.** Search demand by cluster over 90 days:

| Cluster | Impressions | Share | Clicks | Avg position | Pages | Revenue |
|---|---|---|---|---|---|---|
| Affiliate and B2B software | 10,579 | 33% | 18 | 38 | 55 | about zero |
| Weight loss | 5,422 | 17% | 69 | 26 | 21 | most of it |
| Hair loss | 4,431 | 14% | 26 | 16 | 11 | rest of it |
| Longevity, sleep, beauty | 2,897 | 9% | 6 | 45 | 26 | small |
| Pet insurance | 2,485 | 8% | 0 | 51 | 7 | nil |
| Lending (retired, 308s) | 2,442 | 8% | 0 | 63 | 27 | nil |
| Home battery and solar | 1,004 | 3% | 6 | 19 | 21 | small |
| Men's health and sexual health | 963 | 3% | 0 | 46 | 6 | nil |

Weight loss and hair loss are 31% of impressions, 73% of clicks and effectively 100% of revenue. The 55 B2B software pages are a third of all impressions and earn nothing. Brand demand for the partners themselves, from `brand-search-demand`: Mosh 6,500 impressions, Moshy 2,367, Juniper 1,632, Pilot 1,029 and fading, then a cliff: Knose 354, PetsOnMe 96, EcoFlow 26, Hims 1, Emma and Midoc 0.

## 2. The arithmetic of A$10,000 a day

At a blended A$250 a transaction, A$10,000 a day is **40 transactions a day**. Today is 2.3. That is a 17-fold increase in twelve months.

Now the ceiling of the current engine. The mechanism that produces today's revenue is: a reader searching for one of three brands sees Refer Labs' code and redeems it. Total Google impressions across all three brands were about 10,500 in 90 days, roughly **117 a day**. Even if every single impression became a sale, which it will not, the current engine cannot reach 40 a day. It is bounded by two things: the number of brands for which Refer Labs holds a code that pays on redemption, and the search demand for those brands. Neither is under Refer Labs' control today.

So the question is not "how do we do more of this". It is: **which levers add either many more such brands, much higher payouts per transaction, or a source of demand Refer Labs controls?** There are five that survive scrutiny, one that could carry double digits, and several that should be stopped or not started.

## 3. What to stop, before what to start

This is the cheapest revenue decision in the document and it comes first.

**The B2B software cluster: 55 pages, 33% of impressions, 18 clicks in 90 days, revenue near zero.** These pages cost maintenance (the boilerplate sweep on 24 September touched 13 of them), dilute the site's topical identity (a health comparison publisher that also reviews CRMs), and rank at position 38, which is page four. `category-focus-2026` already says do not add more. The recommendation is stronger: **consolidate to the handful with any revenue signal and 301 the rest into their hub.** Keep Superfiliate (the one B2B offer that converts, per `offers.ts`), the affiliate-programs cluster (which supports the site's own story and had 553 impressions on one page), and prune the remainder over Q1. This frees the crawl budget and the editorial attention for pages that can earn.

**Do not build**, per the hard gates already in CLAUDE.md and `consultant-master-brief`: molecule or medicine pages, trading, energy retail switching, more B2B SaaS, per-brand deal pages, mortgages or consumer credit (NCCP), a US fork (assessed in `us-market-assessment-2026-10.md`, two years and a new domain). None of these are revisited here.

## 4. The five levers

Each lever has the same shape: what it is, the evidence it rests on, what it could plausibly add, what it costs, the kill gate, and the first action. The contribution estimates are ranges from stated assumptions, not forecasts.

### Lever 1. Widen the telehealth code base (the engine that works)

**What.** Telehealth is the only category where the mechanism has proven itself: payouts of A$200 to A$300, merchants who value the assessed lead, codes that pay on redemption without a click. Every additional brand with those three properties is another copy of the engine. The candidates, in order of certainty:

1. **Hims, sexual health and weight loss.** Already in motion. Payout from Hims' own partner terms, read 19 Sep: A$200 per weight-management referral, A$75 other, with A$500 per 10 weight referrals as a bonus. Gate: **referlabs.com.au must be an Approved Channel in writing** before anything is published, because those terms bar distributing a partner code on comparison and coupon sites otherwise. Also note the TGA lists erectile dysfunction and weight-loss medicines as 2026-27 priority focus areas: the cluster describes the service and never the medicine, and gets legal sign-off before it scales.
2. **Midoc, a code.** Midoc is a live partner with an account-level `?ref=` and no code. A typed code would move Midoc from click-attributed to redemption-attributed, which is the difference between the mechanism working and not. One email.
3. **Mosh parity and listing.** Their public PILOTPMG at 58% beats our 55% until 28 Feb 2027. The parity ask is in `attribution-capture-2026-10.md`; it protects the base rather than growing it, and it is the cheapest item in this document.
4. **Other Australian telehealth brands**, each **unverified** until their program terms are read: women's health, skin, sleep, fertility and men's health telehealth operators exist in Australia beyond the current partners. The screen for each is the same three properties above. Do not build a page for any brand whose search demand is near zero (Hims has 1 impression; that is why "Mosh vs Hims" is not being built), but a code can be held and displayed on existing pages before a brand has demand of its own.

**Evidence.** The whole current revenue base.

**Plausible addition.** If Hims across two lines reaches Mosh-level demand over two to three quarters, and Midoc gains a code: **+2 to +5 transactions a day by Q3**, so roughly +A$500 to +A$1,200 a day. That assumes the mechanism replicates, which is the strongest assumption available on this site.

**Cost.** Emails, page edits, and legal review for the sexual-health cluster. Under A$5,000 including a compliance opinion.

**Kill gate, 31 December.** If Hims will not approve the channel in writing, Hims stays link-only and the sexual-health cluster is built without a code, which halves its value.

**First action.** The Hims email, this week. It is also the item that unblocks the addition you have already planned.

### Lever 2. Rank the pages that already earn

**What.** The money pages sit at position 8 to 16. `/moshy-vs-juniper` is at 8.2 with 938 impressions and 18 clicks in 90 days. `/moshhair` is at 10.2. Moving from 8 to 3 typically triples clicks on the same impressions, and impressions themselves rise as Google tests the page on more queries. Because the code is displayed in the snippet, rank also multiplies **no-click** redemptions.

**Evidence.** `seo-rank-constraint`: the bottleneck is rank, not content or crawler access, and the lever is authority and brand search. The site has near-zero external authority and zero brand search. Content rewrites address the wrong step.

**How, concretely.**
- **Data assets built for citation.** The pet-underwriter page (Knose and PetsOnMe share Pacific International, which every other source gets wrong) is the model. Build three more owned-fact pages a quarter in the earning clusters: a dated Australian weight-management telehealth price index, a hair-loss telehealth price index, a home battery installed-price index by state. Each one is a fact set that journalists, forums and AI engines cite because nobody else maintains it. Every figure dated and sourced, as the site already does.
- **Digital PR against those assets.** Pitch the indexes to Australian consumer and health journalists quarterly. A single link from a national masthead or a university health page is worth more than a hundred directory links.
- **Brand search.** Zero brand search means Google has no reason to treat Refer Labs as an entity. A newsletter that people actually receive (see Lever 5) and a founder presence on LinkedIn and in podcasts is how a comparison site earns its name being typed. This is slow and it compounds.
- **Internal link discipline.** Already good; the `PartnerRoute` review-link fix on 23 Sep closed the last gap.

**Plausible addition.** A **1.5x to 2.5x multiplier on the telehealth base** by Q4, so on a base of 5 to 7 a day after Lever 1, another +2 to +6 a day.

**Cost.** Editorial time for the indexes (one to two weeks each), and A$1,500 to A$4,000 a month if PR outreach is outsourced. Zero paid links; buying links on a health site is a Google penalty waiting to happen.

**Kill gate, 30 June 2027.** If no earning page has moved into the top five for its core query after three indexes and two PR rounds, the authority route is not working at this scale and paid becomes the primary lever.

**First action.** Build the weight-management telehealth price index in Q4, because it sits under the cluster that already earns.

### Lever 3. Paid acquisition on code intent (the only lever with a path to double digits inside 12 months)

**What.** Buy the demand rather than wait for it. The mechanism has an unusual property: a visitor does not have to click through to the merchant for Refer Labs to earn. They have to **see the code**. That makes paid traffic to a code page economically different from ordinary affiliate arbitrage, where the click has to survive to a tracked checkout.

**Unit economics, as a hypothesis to test rather than a claim.** Moshy pays A$300. If a paid visitor arriving on "moshy discount code" redeems at 3% to 8% (unknown; that is the test), expected value per visitor is A$9 to A$24. That supports a cost per click of several dollars. Australian CPCs on a partner's brand-plus-code query are typically well under that (**unverified** until a campaign runs).

**The constraint that decides whether this exists at all.** Most affiliate programs prohibit bidding on the merchant's brand terms. **Correction, 24 Sep 2026:** the Hims partner terms, re-read that day, bar sharing the Partner Code or Link "via paid ads on any channel or platform (including on Approved Channels)". Paid acquisition is therefore closed for Hims outright, not merely gated on channel approval, and this lever applies only to partners whose agreements permit it. Whether Mosh and Moshy permit brand-term bidding is **unknown** and must be asked in writing. If the answer is no, this lever is limited to non-brand queries ("weight loss telehealth Australia", "online hair loss treatment"), where CPCs are higher and intent is broader, and the economics have to be re-run.

**Where paid can also work, with no partner permission needed:** home battery leads (Lever 4), where the site is the lead buyer's page and the installer, not a merchant, is the counterparty.

**Plausible addition.** This is the lever that could carry the plan or fall flat, and there is no evidence either way today. If brand bidding is permitted and redemption holds at 5%, **+5 to +15 transactions a day** is reachable by Q3 with a A$3,000 to A$10,000 monthly budget. If bidding is not permitted, plan on +1 to +3.

**Cost.** A$1,000 test budget in Q4, scaling only on measured cost per redemption. Requires the GA4 measurement fixed on 22 Sep and, ideally, redemption data from Moshy and Mosh split by source, which has been requested since August and never supplied.

**Kill gate, 31 January 2027.** If cost per redemption exceeds 60% of payout after A$3,000 of spend, stop. Do not scale on assumptions.

**First action.** Ask Moshy and Mosh, in the same email as the parity request, whether paid search on their brand terms is permitted under the agreement. The answer decides the size of this lever.

### Lever 4. Home batteries: the highest-value category the site does not yet rank in

**What.** A home battery in Australia is a A$10,000 to A$20,000 purchase, the federal Cheaper Home Batteries discount has driven demand since 2025, and installers pay for qualified leads. `non-affiliate-revenue-2026-10.md` sourced a market rate of about A$55 a lead from SolarQuotes; installer commissions on a closed sale are **unverified** and would need three installer conversations to establish. Refer Labs already has Apollo (A$500 off the quote, an EOI form that works, proven on 24 Sep), 21 pages and the rebate content.

**The problem, stated plainly.** The cluster has 1,004 impressions in 90 days, and 60% of them are Apollo's own brand name. Generic battery queries ("best home battery": 23 impressions at position 28) are not ranking. The demand in the market is real; the demand on this site is not. That is the opposite of telehealth, where the site has demand and the market is bounded.

**How, in order.**
1. **Build the owned fact.** A state-by-state installed battery price index, read from installers' own published prices, dated. No such maintained public dataset exists in a citable form (**to verify** before building; if SolarQuotes or Choice already maintain one, the page must own a different fact).
2. **Widen from one installer to a panel.** Apollo covers Sydney. A lead form that routes by postcode to two or three accredited installers per state is a marketplace, and a marketplace can sell the same lead to the best-matched installer rather than one buyer. This needs the consent wording flagged in report C, because disclosing a lead to a panel is not the same consent as disclosing to Apollo.
3. **Paid search on battery intent.** "Home battery rebate NSW", "battery installer Sydney" and similar are commercial queries where a A$50 to A$100 lead value supports a meaningful CPC. No merchant permission is needed: the counterparty is an installer who has agreed to buy leads.

**Plausible addition.** Slow organically, because rank starts from nothing. With paid on top, **A$500 to A$2,000 a day in lead revenue by Q4** is possible at 10 to 30 leads a day; without paid, a fraction of that. Note the unit: this is lead revenue at A$50 to A$100, not A$250 transactions, so 30 leads a day is about A$2,000, not A$7,500.

**Cost.** Installer BD (time), consent and privacy wording (legal, A$1,000 to A$2,000), paid budget scaling from A$2,000 a month.

**Kill gate, 31 March 2027.** If fewer than three installers will pay for leads by then, batteries stay an Apollo-only affiliate page and the lever is closed.

**First action.** Three calls to accredited installers in Melbourne, Brisbane and Perth asking what they pay per qualified lead and whether they would join a panel. That is a week of work and it settles whether the lever exists.

### Lever 5. Owned distribution: the newsletter, and why it is a lever rather than a channel

**What.** Everything above depends on someone else's platform: Google's rank, Bing's index, ChatGPT's retrieval, a merchant's terms. The only distribution Refer Labs can own is a list of people who asked to hear from it. Today that list is small, was not being reported to you until 24 Sep, and lived only in Resend while the database was paused.

**Why it belongs in a revenue plan.** A subscriber who wanted a Moshy code and gets an email the day the offer changes is worth more than a search visitor, and the site can email them a new partner's code on launch day rather than waiting six months to rank. At 10,000 subscribers with a 2% monthly redemption across the codes held, that is 200 redemptions a month, or about **A$1,600 a day** at telehealth payouts. That is the arithmetic of a list, and it is the reason the newsletter deserves a real capture strategy rather than a footer form.

**How.** Deal-alert capture on every code page ("tell me if this offer changes"), which the subscribe route already supports via the `interest` field. A monthly "verified offers" email with the dated table from `/deals`. Nothing else: no content newsletter, no weekly cadence, no sponsorship until the list is five figures.

**Plausible addition.** Near zero for two quarters, then compounding. Worth A$300 to A$1,600 a day by month 12 depending entirely on capture rate.

**Cost.** Editorial time and Resend at scale. No new tooling.

**First action.** Deal-alert capture on the six code pages, this quarter.

## 5. Product: three options assessed, one recommended, two not

You asked whether a product is another route. Three were considered against the constraints already recorded for this site.

**A. Sell placement to merchants ("get featured", sponsored slots).** Report C priced a sponsored slot on the affiliate-programs pages at US$114 to US$201 a month at current traffic. `/partner-with-refer-labs` says "no fee to be listed, and no paid placement", `/how-we-make-money` says rankings are never sold, and the consumer-trust position is the entire moat. Selling placement contradicts the promise the site makes on every page. **Not recommended**, and the numbers are too small to justify the trust cost even if it were.

**B. A code-attribution or referral SaaS for merchants.** This is the Pepform platform that was retired in July 2026 for good reasons, and `code-supply-2026-10.md` rejected running merchants' programs. **Not recommended.** Do not rebuild it.

**C. The Refer Labs Verified Code Program: productise what already works, and sell it to merchants as a service.** This is not software. It is a defined, repeatable offer to merchants: Refer Labs holds a code unique to you, displays it on dated comparison pages that rank and get cited by AI engines, names it literally in `llms.txt` and in answer-engine-facing FAQs, and you pay per redemption with no click tracking required. The pitch is the thing Moshy already benefits from, written down: `no-click-mechanism-2026-10.md` shows the code was displayed about 19,200 times in 90 days in search results alone. For a merchant, that is distribution they cannot buy from a coupon aggregator, because aggregators list every code and rank nothing.

**What makes it a product rather than BD:** a one-page merchant brief, a standard agreement (code unique to Refer Labs, credited on redemption, monthly redemption report split by link and typed code, no exclusivity on the merchant's side), an onboarding checklist that already exists in CLAUDE.md, and a monthly report to the merchant showing where the code was displayed. The report is the deliverable merchants cannot get elsewhere and the reason they renew.

**Who it is for:** Australian direct-to-consumer services with a practitioner or assessment step (telehealth, diagnostics, insurance, installers), where the customer researches before buying and the merchant values the lead enough to pay A$100 or more on redemption. That is exactly where the mechanism has worked and exactly where it has not (retail codes in the B1 and B2 sweeps produced A$0 to A$4k estimates).

**Recommended**, as the frame for Levers 1 and 4 rather than a separate workstream: it turns "email Hims" into "onboard the fourth merchant onto a defined program" and gives every subsequent partner conversation a document instead of a negotiation from scratch.

## 6. The concentration risk that sits under all of it

Today's revenue rests on three brands owned by **two companies**: Mosh and Moshy are one group, and Hims owns Juniper (and Pilot, now closed). A single decision at either parent to end its partner program, change its code policy or tighten its channel terms, as the Hims partner terms already do, removes a third to two-thirds of revenue overnight. Pilot's closure in September already removed 42% of comparison-page impressions.

The mitigation is the plan itself: more merchants (Lever 1 and the Verified Code Program), a second category with independent economics (Lever 4), and distribution the site owns (Lever 5). But it should be named as a reason for urgency, not only as a risk. Twelve months from now the business should not be able to lose more than a quarter of revenue to one email from one partner.

## 7. The twelve months, by quarter

Revenue bands are gross, per day, from the lever estimates above, and assume the kill gates are respected.

**Q4 2026 (October to December): protect and unblock.**
- Hims Approved Channel in writing; Mosh parity and listing; the brand-bidding question to Mosh and Moshy; a Midoc code request.
- Sexual-health cluster built, service-only wording, compliance opinion obtained.
- Weight-management telehealth price index published and pitched.
- B2B software cluster pruned: keep Superfiliate and the affiliate-programs pages, 301 the rest.
- Deal-alert capture on the six code pages. Newsletter list moved to a real capture strategy.
- A$1,000 paid search test on whichever queries partners permit.
- Installer calls in three cities.
- **Band at end of quarter: A$700 to A$1,000 a day.**

**Q1 2027 (January to March): the first new engines.**
- Hims code live if approved; Midoc code live if issued.
- Hair-loss price index published.
- Paid search scaled or stopped on the 31 January gate.
- Battery installer panel signed or the lever closed on the 31 March gate; consent wording done either way.
- Verified Code Program brief and agreement written; used for every new merchant conversation from here.
- **Band: A$1,200 to A$2,500 a day.**

**Q2 2027 (April to June): scale what measured.**
- Battery price index and paid battery campaigns if the panel exists.
- Two more merchants onboarded through the program, screened on the three properties.
- Second PR round; the 30 June rank gate.
- Newsletter to the first dated "offers changed" send once the list justifies it.
- **Band: A$2,000 to A$4,500 a day.**

**Q3 2027 (July to September): compound or concentrate.**
- If paid holds its cost per redemption, this is where budget scales into the tens of thousands a month and the daily figure moves fastest.
- If it did not, the plan concentrates on organic rank and merchant count, and the ceiling at month 12 is lower.
- **Band: A$3,000 to A$8,000 a day.**

**On the A$10,000 target.** Reaching it inside twelve months requires paid acquisition to work at scale, the battery panel to exist, and two or more new telehealth codes to land. All three are testable within the first quarter, and none is proven today. The organic-only version of this plan, with every gate passed, lands at roughly A$2,000 to A$4,000 a day at month 12. That is a four to seven-fold increase and a materially different business, and it is the number to plan cash around. A$10,000 a day is the upside case, and the first quarter tells you which case you are in.

## 8. What to measure, and the gates in one place

| Gate | Date | Pass | Fail |
|---|---|---|---|
| Hims Approved Channel | 31 Dec 2026 | code published across the cluster | link-only, half the value |
| Paid search cost per redemption | 31 Jan 2027 | under 60% of payout after A$3,000 | stop, organic only |
| Battery installer panel | 31 Mar 2027 | three installers paying for leads | Apollo-only, lever closed |
| Rank on earning pages | 30 Jun 2027 | one page top five for its core query | paid becomes primary |
| Verified Code Program | 30 Jun 2027 | two merchants onboarded via the document | stays as ad hoc BD |
| Newsletter list | 30 Sep 2027 | 5,000 subscribers with measured redemptions | keep as footer form |

Metrics that matter, read monthly: transactions a day by merchant (from the merchants, split by link and typed code, which is the data request that has been open since August); Google clicks and average position on the ten earning pages; cost per redemption on any paid spend; list size and redemptions per send. Metrics that do not matter and should stop being reported: total impressions (a third are dead B2B pages), GA4 pageviews (consent-gated and only just fixed), and any before-and-after comparison that crosses an edit date without saying so.

## 9. The first thirty days

1. Send the Hims email. Ask for Approved Channel status in writing for referlabs.com.au including `/deals`.
2. Send the Mosh and Moshy email: parity on REFERAL55, listing on the terms page, confirmation that typed codes are paid, monthly redemptions split by source, and whether brand-term bidding is permitted.
3. Send the Midoc email asking for a redemption-credited code.
4. Call three accredited battery installers outside Sydney and ask what a qualified lead is worth to them.
5. Get a compliance opinion on the sexual-health cluster wording before it is built, given the TGA's stated priorities.
6. Prune the B2B software cluster to the pages with a revenue signal.
7. Put deal-alert capture on the six code pages.
8. Start the weight-management telehealth price index.

Every one of those is either an email, a call, or work already inside the site's existing standards. None requires a new hire, a new domain or a new product build. The expensive decisions, paid budget and installer panel, wait for the answers the first four items produce.
