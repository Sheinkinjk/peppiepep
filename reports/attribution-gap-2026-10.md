# Part 4: the attribution gap

**Prepared 19 September 2026.** Read-only. Sources: Search Console via `scripts/google-data.mjs` (read 19 Sep 2026), the rendered site, `public/llms.txt`, `src/lib/affiliate-links.ts`, `reports/conversions/README.md`, and Jarred's confirmation of 20 Aug 2026 recorded in project notes. No merchant redemption data was available.

## The finding that changes the question

The brief frames the unattributed half of REFERRAL120 redemptions as "transactions we cause and are not paid for, or are paid for and cannot prove". **For Moshy and Mosh it is the second, not the first.** Jarred confirmed on 20 Aug 2026 that REFERRAL120 is unique to Refer Labs and is paid whenever the code is used, whether or not the customer came through the link, and `public/llms.txt` states the same for Mosh's REFERAL55. So those redemptions are already paid. What is missing is proof of *which page* caused them, which matters for deciding what to build, not for revenue.

**The gap that does cost money is in the brands that do not pay on a typed code:**

| Merchant | How it attributes (from the tracked URL, `affiliate-links.ts`) | Revenue at risk from untracked conversions |
|---|---|---|
| Moshy | the code REFERRAL120, and/or the landing path | **None**: paid on code use (confirmed 20 Aug 2026) |
| Mosh | path `/start/referlabs` plus REFERAL55 | **None stated**: `llms.txt` says the commission is earned on the code; get written confirmation from Mosh |
| Juniper / Hims & Hers | link with `utm_campaign=jarred_k` and `discountCode=JARREDKFC` in the URL; the new Hims agreement **attributes by code** | **High.** Every Juniper page tells readers there is "no discount code", so a reader who does not click our link and does not type a code earns nothing under a code-attributed agreement. See action 1. |
| Knose | code `referlab2mf` carried in the URL | Unknown: whether a typed code alone is credited is unconfirmed |
| PetsOnMe | **bare URL, no code, no referral parameter** | **All of it.** Nothing is tracked (project notes, still open) |

## 1. Size of the gap

**Cannot be quantified from available data.** Redemption counts by date, split by "arrived via our link" and "typed the code", exist only in the merchants' systems. The "approximately half" figure is the operator's, from partner reporting not in the repo.

What the data does show is a mechanism large enough to explain it. Over 20 Jun to 17 Sep 2026, ten pages whose Google title or meta description contains REFERRAL120 or REFERAL55 received **19,446 impressions and 244 clicks**. That is about **19,200 search results showing the code to someone who did not visit**. Uncertainty: Google rewrites some meta descriptions, so not every impression displayed the code; the true figure is lower by an unknown fraction. AI engines add to this: Bing's AI Performance report counted 1,200 citations in 28 days, and `llms.txt` names both codes, so an answer engine can hand a reader the code with no visit at all. A redemption without a referring visit is the expected outcome of this design, not a leak.

## 2. Mechanisms to close it, for a single operator with no engineering team

| Mechanism | What it closes | Feasibility | Revenue uplift at zero traffic growth |
|---|---|---|---|
| **Merchant-issued unique code per publisher** | Credit for typed codes | Already in place for Moshy, Mosh, Knose, PetsOnMe. **Missing for Juniper/Hims.** | Moshy/Mosh: 0 (already paid). **Juniper: every non-link conversion**, currently unpaid |
| **Code-level attribution in writing** | Removes the risk of a merchant later crediting only link clicks | One email per partner | 0 now; protects the existing base |
| **Tracked link where there is none** (PetsOnMe) | Link conversions | One email to the partner | Every PetsOnMe conversion, currently 0 by construction |
| **Per-page codes** (e.g. REFERRAL120-W for weight-loss pages, -D for /deals) | Which page caused a typed redemption | Requires the merchant to mint codes; zero engineering | 0 directly; tells you which pages to build |
| **SubID / server-side postback** | Link conversions by page | Merchant or network must support it; `AffiliateClickTracker` already appends SubIDs for networks that accept them | 0 directly; page-level proof |
| **Post-purchase "how did you hear about us" survey** | Both, self-reported | Merchant-run; ask partners to add "Refer Labs" as an option | 0 directly; strong evidence in commercial negotiations |
| **Receipt scanning (Rabble model)** | Purchases the reader self-reports | Needs an app, OCR, consumer incentive and merchant contracts | Not feasible for one operator; see Part 3 |
| **Browser extension (Honey model)** | Last-click capture at checkout | Engineering-heavy, and networks increasingly penalise extension last-click overwriting | Not feasible; reputational risk |
| **Single-use code generation** | Precise, fraud-proof attribution | Merchant-side system | Not available to us unilaterally |

## 3. Recommended actions, in order

1. **Before printing any Hims code, check the signed agreement against Hims's public Partner Terms.** Read 19 Sep 2026 at hims.com.au/partner-program-terms-and-conditions ("Last updated · August 2026"): a partner "must not distribute your Partner Code or Partner Link ... on any promotional code, coupon, cashback, review-aggregator, comparison, or other third-party promotional website", and may share it only on the "Approved Channels" listed in the Partner Dashboard. Refer Labs is a comparison site with a deals page. If the signed agreement does not expressly approve referlabs.com.au as a channel, publishing the code on the Juniper pages or `/deals` risks the commission and the agreement. **Action: check the Approved Channels list in the Hims Partner Dashboard, and get written confirmation from Hims that referlabs.com.au (including `/deals`) is approved, before any code goes on the site.** If it is approved: confirm the exact string and conditions, log it in `PENDING_VERIFICATION` until confirmed, then update the Juniper pages, `offers.ts`, `/deals` and `llms.txt` per the onboarding standard, because under a code-attributed agreement the pages' current "no discount code" wording is the largest leak on the site. `JARREDKFC` appears in today's Juniper tracked URL; whether it is a consumer-facing code is unverified.
2. **Get a tracked link from PetsOnMe.** Every conversion there is currently unattributable.
3. **Ask Moshy and Mosh for monthly redemption counts split by link versus typed code**, and for per-page code variants. No revenue change, but it turns this report's "cannot be quantified" into a number, and it is the data Part 0 needs.
4. **Confirm Knose credits a typed `referlab2mf`.**

Items 1 and 2 are revenue. Items 3 and 4 are evidence. None needs engineering.
