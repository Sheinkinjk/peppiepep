# Part E: capturing the unattributed majority

**Prepared 19 September 2026.** Builds on `attribution-gap-2026-10.md` (Part 4 of v1) and `no-click-mechanism-2026-10.md` (Part A). Where this report and Part 4 differ, this one supersedes. Merchant facts re-read on the merchants' own pages on 19 Sep 2026: getmosh.com.au/promotions-terms-and-conditions, getmoshy.com.au/promotions-terms-and-conditions, getmoshy.com.au/promo-codes-coupons, hims.com.au/partner-program-terms-and-conditions.

## 1. The gap in dollars, per merchant

Part A found that 57% to 97% of transactions have no referring visit. **That share is not the dollar gap.** Whether an unattributed transaction is unpaid depends on how each merchant credits us:

| Merchant | Credit mechanism | Are no-click redemptions paid? | Dollar gap at current volume |
|---|---|---|---|
| Moshy (A$300) | REFERRAL120, paid on redemption (confirmed 20 Aug 2026) | Yes | **A$0 on redemptions of our code.** The leak is readers who redeem a different code instead (below) |
| Mosh (A$200) | REFERAL55 plus path `/start/referlabs`; `llms.txt` says paid on the code | Yes, if Mosh confirms in writing | A$0 on our code; **leak to Mosh's own better public code** (below) |
| Juniper / Hims (A$200 weight, A$75 other) | Link with `utm_campaign`; the new agreement attributes by code | No for a no-click buyer, because our pages publish no code | Unknown count, and **cannot be closed by printing a code** unless Hims approves referlabs.com.au as a channel |
| PetsOnMe | Bare URL, no parameter | No, nothing is tracked | Unknown count; every conversion is unpaid by construction |
| Knose | Code in the URL | Unconfirmed for a typed code | Unknown |

Merchant-level counts are not available, so none of these can be put in dollars without the merchants' data. What can be sized is the mechanism.

## 2. The leak the brief did not name: value competition

The unattributed-majority problem is mostly solved for Moshy and Mosh already, because they pay on our code without a click. The live risk is the reverse: **a reader primed by our pages redeems the merchant's own code instead, and we earn nothing.** Both merchants publish competing codes on their own sites (read 19 Sep 2026):

- **Mosh:** PILOTPMG, 58% off the first order covering three months, ending 28 Feb 2027; HAIR55, 55%, ending 30 Sep 2026; PAT50, 50%, listed as a partnerships promo code. **Our REFERAL55 is 55%, beaten by PILOTPMG.**
- **Moshy:** MOSHYDEAL120, $120 off the first month (stated end 28 Feb 2026, "may be extended"); MOSHYINTRO100, $100 off, on Moshy's own coupon page. **Our REFERRAL120 is matched by MOSHYDEAL120.**

A reader comparing "mosh discount code" results sees 58% from coupon sites copying PILOTPMG against our 55%. Size of the leak, as a formula because the inputs are unmeasured: Mosh sales influenced by our pages x share who switch to a better public code x A$200. If Mosh is a third of the roughly 69 monthly transactions (an assumption) and one in five influenced readers switches (an assumption), that is about 5 sales, **about A$1,000 a month, A$12,000 a year**, with no traffic change. The switching share is the unknown; Mosh's redemption data by code would measure it.

## 3. Mechanisms, feasibility and uplift at current volume

| Mechanism | Merchant cooperation | Feasibility for one operator | Uplift at current volume |
|---|---|---|---|
| **Value parity on our code** (Mosh to 58%, or PILOTPMG retired publicly; Moshy confirms REFERRAL120 stays at least equal to MOSHYDEAL120) | One email each | High | Recovers the switching leak, about A$12k a year on the stated assumptions |
| **Merchant names our code on its own pages** (Mosh terms page as with PAT50; Moshy and Mosh promo and `/llm` pages) | One email each | High | Coupon sites and AI engines copy the merchant's page, so our code replaces theirs in the copies. Not sizable without data; it is the same lever as parity, amplified |
| **Tracked link for PetsOnMe** | One email | High | Every PetsOnMe conversion, currently A$0 |
| **Hims channel approval, then a Hims code** | Written approval | Medium: depends on Hims | Juniper no-click buyers, currently A$0; blocked until approved |
| Code-level attribution confirmed in writing | One email per partner | High | A$0 now; protects the base |
| Per-page code variants | Merchant mints codes | Medium | A$0 directly; tells you which pages earn |
| Post-purchase "how did you hear" survey | Merchant-run | Medium | A$0 directly; evidence for negotiation |
| Receipt scanning (Rabble) | Brand-funded rewards, an app, OCR | Not feasible alone (see `comparable-business-teardown-2026-10.md`) | n/a |
| Browser extension | None | Not feasible; networks penalise last-click overwriting | n/a |
| Server-side postback / SubID | Merchant or network support | Medium; `AffiliateClickTracker` already appends SubIDs where accepted | A$0 directly; page-level proof |

## 4. The cheapest intervention that raises revenue with zero traffic growth

**One email to Mosh asking it to bring REFERAL55 to value parity with its public PILOTPMG (58%), and to list REFERAL55 as a partner code on its promotions terms page, as it already lists PAT50.** It needs no page, no vertical, no traffic and no engineering. It closes the one leak where a reader we have already persuaded is currently paid to someone else, and it puts our code onto the page coupon sites and AI engines copy from. Send the same parity check to Moshy for REFERRAL120 against MOSHYDEAL120.

Runner-up, equally cheap but capped by the partner's volume: the PetsOnMe tracked link.
