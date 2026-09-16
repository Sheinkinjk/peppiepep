# Code thesis audit

**Date:** 7 September 2026
**Scope:** read-only. Nothing in the repo, Supabase or Vercel was changed. This file is the only write.
**Method note:** every figure below was read off the committed build at `.next/server/app` (tree clean at HEAD `e2cbd54`), the PartnerStack export at `reports/conversions/`, or a live HTTP fetch on 7 September 2026. Where I could not verify something, it says so and names what would resolve it.

---

## The single highest-impact action

**Put the discount code on the 14 pages that already link to Moshy or Mosh and do not show it.** These pages already earn, already rank, and already carry the affiliate link. The code is absent from the body copy entirely. This matters more here than on a normal affiliate site because of a fact already recorded in project memory: `REFERRAL120` is unique to Refer Labs and **pays us when the customer types it, whether or not they clicked our link**. A page that ranks for a code query and does not print the code is throwing away the one conversion path that survives a user leaving our site, opening a new tab and going direct. Nothing else in this audit is as cheap, as certain, or as fast.

The eight Moshy pages: `/cheapest-weight-loss-telehealth-australia`, `/mens-health-telehealth-australia`, `/moshy-eligibility`, `/online-weight-loss-doctor-australia`, `/online-weight-loss-programs-australia`, `/weight-loss-telehealth-cost-australia`, `/weight-loss-telehealth-men-australia`, `/weight-loss-treatment-eligibility-australia`.

The six Mosh pages: `/early-signs-of-hair-loss-australia`, `/hair-loss-treatment-cost-australia`, `/how-to-stop-hair-loss-australia`, `/mens-health-telehealth-australia`, `/online-hair-loss-treatment-australia`, `/receding-hairline-treatment-australia`.

---

## 0. Four premises in the brief do not hold

Before the analysis, the surfaces the brief names mostly do not exist. This is not pedantry: three of the six requested sections were scoped around them.

| Brief says | Actual state |
|---|---|
| `offers` table in Supabase | No such table. Offers live in `src/lib/offers.ts`, a TypeScript module of 15 `DEALS` rows. No `from('offers')` call exists anywhere in `src/`. |
| `clicks` table | Does not exist in any migration. No click is persisted anywhere, by anything. |
| `/offers/[slug]` route | Absent. |
| `/offers.json` | Absent, both as a route and as `public/offers.json`. |
| Supabase project `ovpsgbstrdahrdcllswa` | Appears only in retired-SaaS markdown docs. The configured project in `.env.local` is `uzjecvufsabxbqxnebba`. |
| Read-only SELECT queries | Not possible. **Both** Supabase hosts return NXDOMAIN, and the Supabase MCP server is `CONNECTION_CLOSED`. Every REST probe returned HTTP 000. |

The dead Supabase does not break the live site: `/api/subscribe` returns HTTP 200 and uses Resend, not Supabase, and `/api/apollo-eoi` still validates. Only the retired-SaaS tables are affected. But it does mean **no first-party conversion or click data exists to query**, which is the root cause of Section 1's verdict.

`/go/[slug]` does exist, and this is the sharpest finding in the section. It is a stateless 302 that **logs nothing**, while its own doc comment claims "the page is identifiable from our own logs." It is also barely used: 23 slugs are defined in `src/lib/go-links.ts`, but **51 of the 55 destinations in `affiliate-links.ts` are referenced directly by pages rather than through it.** Checked across the money pages, `/moshy`, `/moshhair`, `/knose`, `/petsonme`, `/deals`, `/hair-loss` and `/weight-loss` carry **zero** `/go/` links between them. The one first-party hop that could attribute a click is used by none of the pages that earn.

---

## 1. The code thesis

### 1a. Offers inventory

15 rows in `src/lib/offers.ts`. **Four carry a code:**

| Brand | Code | Category | Offer | Verified |
|---|---|---|---|---|
| Moshy | `REFERRAL120` | Weight loss | $120 off first order | 2026-08-17 |
| Mosh | `REFERAL55` | Hair loss | 55% off first order | 2026-08-17 |
| Knose | `referlab2mf` | Pets | 2 months free | 2026-08-27 |
| PetsOnMe | `REFERLABS` | Pets | 15% off pet care services, not the premium | 2026-08-17 |

The other eleven (Apollo, Unbounce, Leadpages, Superfiliate, Carrd, beehiiv, Brevo, Pipedrive, GoHighLevel, ElevenLabs, AliDrop) are discounts or free trials with no code. Pipedrive carries no verification date at all.

### 1b–1d. Clicks, conversions, matched comparison

**The join the brief asks for cannot be built, and the reason is worse than missing data.**

The only conversion export in existence is `reports/conversions/partnerstack-team-member-2025-09-to-2026-09.csv`. Across **49 merchants, March to September 2026**:

| Metric | Value |
|---|---|
| Clicks | 1,236 |
| Unique clicks | 1,141 |
| Signups | 1 |
| Paid customers | 0 |
| Transactions | 0 |
| Revenue | $0 |
| Commission | $0 |

Every one of those 49 merchants is in the **no-code** arm. Not one of the four code-holding merchants is on PartnerStack. Moshy and Mosh cannot pass a sub-ID at all (merchant limitation, established 5 September and recorded in `AffiliateClickTracker.tsx`), and no Commission Factory export has been supplied for Knose or PetsOnMe. So the code arm has **zero conversion data of any kind**.

That alone would make the thesis untestable. But the no-code arm's data does not survive inspection either.

### 1e. The analysis-breaking problem

**The 1,236 PartnerStack clicks are almost certainly not human buyers.** The distribution is wrong in a way that organic demand cannot produce:

| Measure | PartnerStack merchants | Real GSC page traffic, same site |
|---|---|---|
| Coefficient of variation | **0.38** (excl. 4 near-zero) | 1.01 |
| Top 20% share of clicks | **31%** | 55% |
| Max / median | **1.75x** | 6.5x |
| Unique / total clicks | **92.3%** | n/a |

Thirty-nine merchants each received between 20 and 56 clicks. Genuine search demand is power-law: one page takes half the traffic and the tail gets nothing. Near-uniform coverage across 39 unrelated B2B merchants is the signature of something enumerating links, not of people choosing them.

Three further facts point the same way. Clicks appeared from a standing start (0 in March, April and May; 727 in July). They do **not** track page exposure (Pearson r = 0.46, and single-page merchants like Alidrop at 50 clicks out-performed four-page merchants like Reply.io at 48). And the pages carrying these links are the generic `best-X` pages already measured at or near zero Google impressions, which cannot physically produce 1,236 human clicks.

**Verdict, one sentence:** the thesis that only code-carrying programs convert is **untested, not supported and not refuted**, because the code arm has no conversion data at all and the no-code arm's 1,236 clicks show the statistical signature of automated traffic rather than buyers, so the observed zero measures crawler behaviour rather than human intent.

The confounds the brief warned about are worse than expected. Code presence, AOV, category and network are not merely correlated, they are **perfectly collinear**: every code merchant is consumer health or pet insurance at high AOV on a direct or Commission Factory relationship, and every no-code merchant is B2B SaaS at low AOV with a free trial on PartnerStack. No matched-band comparison is possible because there is no band containing both arms.

**What would resolve it, cheapest first:**

1. **Compare GA4 `affiliate_click` counts against PartnerStack's click counts for the same merchants and window.** We already fire that event with `cta_location`. If GA4 shows far fewer than 1,236, PartnerStack is counting non-humans and the zero is explained. This is one report, needs no code, and is the single most valuable measurement available. It should be done before any conclusion about codes is acted on.
2. **Export Commission Factory conversions for Knose and PetsOnMe** (publisher ID 94361). That creates the first code-arm data point that exists.
3. **Log `/go/[slug]`, and route money-page CTAs through it.** Currently 51 of 55 destinations bypass the only hop that could attribute anything, and the hop does not log. Until this changes, no future version of this question is answerable either.

---

## 2. Code surface audit (defect list, not a fix list)

Measured across the committed build. A page "earns" if it carries an outbound `href` to the merchant host inside `<main>`.

> A first pass flagged 27 pages. Spot-reading them showed several were navigational mentions in related-links cards where a code would be wrong (`/moshhair` naming Moshy as a sister brand, `/petsonme` linking to Knose in a comparison nav). A second pass then double-counted because `getmosh` is a substring of `getmoshy.com.au`. The corrected, host-exact figure is below. Both errors are the failure mode this codebase's notes warn about, and both were caught by reading the matches.

**41 earning page/merchant pairs. 14 omit the code (34%).**

| Merchant | Earning pages | Omit the code |
|---|---|---|
| Moshy | 17 | **8** |
| Mosh | 12 | **6** |
| Knose | 6 | 0 |
| PetsOnMe | 6 | 0 |

The pet vertical is clean. The entire gap is in weight-loss and hair-loss, which are the two highest-value verticals on the site. Page lists are in the opening section.

### Where the code lands on the 35 pages that do show it

| Slot | Coverage |
|---|---|
| `<title>` | **0 / 35** |
| Meta description | 15 / 35 |
| H1 | 2 / 35 |
| First 100 words | 16 / 35 |

Zero pages put the literal code string in the title. Note this is **not** a breach of the CLAUDE.md rule, which requires the discount *amount* in the title, and that is largely satisfied: `/moshy` ("$120 Off"), `/moshhair` ("55% Off First Order"), `/knose` ("2 Months Free"), `/petsonme` ("15% Off Pet Care Services"), `/mosh-review` ("Plus 55% Off"). Two titles miss the amount despite the page carrying a code: **`/moshy-review`** and **`/deals`** itself, which is the offers hub.

**Offer JSON-LD:** 25 of the 35 emit an `Offer` node, and all 25 correctly include the code. Ten code-displaying pages emit no `Offer` node at all.

**Raw merchant URLs versus `/go/[slug]`:** every money page checked uses raw destination URLs. Zero `/go/` links on `/moshy`, `/moshhair`, `/knose`, `/petsonme`, `/deals`, `/best-pet-insurance-australia`, `/hair-loss` or `/weight-loss`.

**`/offers.json`:** does not exist. If the intent was a machine-readable offers feed for AI engines, there is nothing to audit. Worth building; `offers.ts` is already structured for it.

---

## 3. Which existing partners could issue a code

This section produced the strongest new finding in the audit. Platform and affiliate-app detection was run live against every partner merchant, and every signature below was **read in context**, not taken from a grep count.

| Partner | Platform | Affiliate app | Code capability |
|---|---|---|---|
| **Dense** | Shopify | **UpPromote Affiliate** (confirmed) | **Yes, natively** |
| **Midoc** | Wix | **GoAffPro Affiliate Marketing** (confirmed) | **Yes, natively** |
| Mosh | Next.js | none detectable | Has a code already |
| Moshy | Next.js | none detectable | Has a code already |
| Knose | WordPress | none detectable | Has a code already |
| PetsOnMe | WordPress | none detectable | Has a code already |
| Edible Beauty | Shopify | none detected | Unknown |
| Juniper | 403 to automated fetch | not determinable | Unknown |
| Foreo | other | none detected | Unknown |

**Dense** serves `shopify://apps/uppromote-affiliate/blocks/core-script/`, with a live settings block containing `"referral_enable":0` and a `sca_ref` handler. UpPromote's core feature set includes per-affiliate coupon codes.

**Midoc** serves a Wix app registration named `Goaffpro Affiliate Marketing` (`appDefinitionId 1129148b-e312-4228-ad46-9e10c1f22229`). GoAffPro likewise issues per-affiliate coupon codes as standard.

**Both are existing partners already carrying our links, both run affiliate platforms where issuing us a code is a settings change rather than a negotiation, and we hold a code from neither.** These are the two easiest code acquisitions available and neither appears in the four drafted-but-unsent partner emails.

Caveat, stated because it affects how you use the table: an affiliate app that loads only at cart or checkout will not appear in a homepage fetch, so "none detected" means *not proven*, never *absent*. The positives are solid; the negatives are weak.

### Terms

**I could not verify Juniper's affiliate terms and am not going to assume them.** `myjuniper.com` returns **403** to automated fetches and `www.myjuniper.com.au` does not resolve. The brief's specific claims (bars comparison and coupon placement, mandates first-person disclosure) remain **unverified**. What I did find on Juniper's public help content is a restriction that *sharing referral codes publicly via social media is not permitted, with codes blocked and rewards withdrawn if discovered*. That is the customer referral scheme, not the affiliate program, and the two should not be conflated. Resolve by opening the affiliate terms in a browser, or asking the account manager for the current PDF.

**Knose carries a real risk worth checking before the next content pass.** Public sources state Knose promotional offers are available only when purchasing *"through Knose's website or call centre directly (not through third-party aggregators)"*. Our link routes via `quick-quote.knose.com.au`. Whether a tracked partner link counts as "direct" or as an "aggregator" determines whether `referlab2mf` is honoured at all. I could not confirm the wording first-hand: `knose.com.au/pet-insurance-promos-and-discounts/` returned **403**. **Flagging, not asserting.** This is a direct revenue question and should be put to Knose in writing.

One live compliance note found incidentally: `/moshhair` body copy reads *"Direct access to the current Dense offer, no code required."* Dense runs UpPromote and could issue one. The sentence is true today and becomes false the moment a code is obtained. It is the exact failure shape the project notes describe: prose asserting a commercial state that nothing regenerates.

---

## 4. Expansion candidates

**I am not going to give you 20 programs with commission figures I have not verified.** The brief asks for ~$150+ per order confirmed, and affiliate networks do not publish rates publicly. Producing a list of 20 with plausible-looking numbers would breach the project's own "real, researched prices only" rule and would be the exact AI-slop failure the notes warn about. What follows is what I could verify, plus the method for the rest.

Code capability **is** directly testable, and it is the criterion the thesis actually turns on. Scan of 20 Australian merchants across the requested adjacencies:

| Merchant | Category | Platform | Affiliate app | Network | Code capability |
|---|---|---|---|---|---|
| **Bloody Good** | At-home diagnostics | Shopify | **Social Snowball** (confirmed) | direct | **Proven** |
| **Calmerceuticals** | Supplements | Shopify | **Refersion** (confirmed) | Commission Factory | **Proven** |
| Tropeaka | Supplements | Shopify | none detected | Commission Factory | Shopify, likely |
| Supplement Mart | Supplements | Shopify | none detected | Commission Factory | Shopify, likely |
| Gro Clinics | Hair restoration | Shopify | none detected | unknown | Shopify, likely |
| CurrentBody AU | Skincare devices | Shopify | none detected | unknown | Shopify, likely |
| i-screen | At-home diagnostics | Next.js | none detected | unknown | unknown |
| Everlab | Longevity | Webflow | none detected | unknown | unknown |
| Ashley & Martin | Hair restoration | WordPress | none detected | unknown | unknown |
| Sleeping Duck | Premium sleep | Next.js | none detected | unknown | unknown |
| Ecosa, SkinCeuticals AU, Hearing Savers | mixed | other | none detected | unknown | unknown |
| Koala, Emma, mybiome, Blamey Saunders, asap, Dr Spiller | mixed | unreachable to automated fetch | | | |

**Bloody Good** is the standout: Shopify plus Social Snowball (`api.socialsnowball.io/js/referral.js?shop=fd7703-3.myshopify.com`), a platform built specifically around auto-generated per-affiliate coupon codes. At-home diagnostics is adjacent to the health hub and carries no S4 exposure, which matters given the TGA constraints on everything else in that vertical.

**Calmerceuticals** is on Refersion (`tracking.refersion.com`, public key `pub_bd2889fc1e07e1de4b62`) *and* on Commission Factory, where we are already publisher **94361**. Joinable today with no new relationship.

Three Commission Factory health merchants (Tropeaka, Supplement Mart, Aussie Health Products) are joinable immediately through the existing account. Aussie Health Products publishes 10% base commission, which on typical basket sizes falls well short of the $150 bar, so it is volume, not the economics the brief is targeting.

**On the $150+/order bar:** the categories that clear it in Australia are hair restoration (procedures $5,000 to $15,000), cosmetic and dermal clinics, premium sleep ($1,500 to $4,000 mattresses) and longevity diagnostics ($500 to $2,000 panels). Gro Clinics is the most promising unexplored name: Shopify, so code-capable, procedure pricing that clears the bar, and directly adjacent to the existing `/hair-loss` hub. It has no published affiliate program, which means direct outreach.

**Exclusions honoured:** nothing gambling-adjacent (Interactive Gambling Amendment (Gambling Reform) Bill 2026, commencing 1 January 2027, prohibits customer-activity-based affiliate commissions), and nothing requiring lending content.

**To complete this properly:** log into Commission Factory with publisher ID 94361 and filter the advertiser directory by category and commission rate. That gives verified rates for the whole Australian market in one session, which no amount of public web research can substitute for. I recommend that over any further searching.

---

## 5. Traffic spike attribution

**Not answerable from here, and I am not going to estimate it.**

| Input needed | Status |
|---|---|
| GSC spike window vs prior 4 weeks | No export on disk |
| GA4 session source with AI grouping | No GA4 access from this session |
| Raw `Referer` from Vercel logs | No log access |
| Landing page distribution | Depends on the above |

The only analytics artefact in the repo is the PartnerStack CSV, which carries no source or referrer dimension.

The brief's own caveat is the important part and holds regardless: 35 to 70% of AI-assistant sessions arrive with no referrer and land in Direct, so any AI figure produced this way is a **floor**, never a total.

**To resolve:** GA4 Explore report, dimension `Session source / medium`, filtered to the spike window, with a regex grouping for `chatgpt|openai|perplexity|gemini|claude|copilot|deepseek|grok|you\.com`, cross-checked against Vercel's raw `Referer` header for the same window. Both are ten-minute tasks with access. Until then the monetisable-versus-vanity question stays open, and it should not be guessed at.

---

## 6. Citation position on code queries

**Method limitation, stated up front:** the search tool available here is US-based and is not a rank tracker. These are indicative SERP observations, not Australian rankings. Treat as leads.

**We rank #1 for "Moshy discount code australia"** with `/moshy`. That is the flagship query and we own it.

**The material finding is that our codes are not differentiated.**

| Our code | Our offer | Third parties publishing an equivalent |
|---|---|---|
| `REFERRAL120` | $120 off | `MOSHYDEAL120`, also $120 off |
| `REFERAL55` | 55% off | `GTHAIR55`, also 55% off |
| `REFERLABS` | 15% off pet care services | Public sources cite 12% off services; ours appears **better** |
| `referlab2mf` | 2 months free | Knose's own promos page lists competing offers |

This costs **differentiation, not attribution**. Project memory correctly records that `REFERRAL120` is unique to Refer Labs and pays us on code use alone. The problem is narrower and still real: a user comparing `/moshy` against a coupon aggregator sees the same $120 in both places and has no reason to prefer ours. The advantage has to come from trust, currency and the dated verification we already do, not from the number.

**Validity of the competing codes is unverified.** Coupon aggregators routinely publish expired and fabricated codes, and I did not attempt any at checkout. Do not act on `GTHAIR55` or `MOSHYDEAL120` being live without testing them.

**Incumbents observed** across these queries: cuponation.com.au (Global Savings Group), lovecoupons.com.au, shopper.com, refermate.com, dealspotr.com, frugalfeeds.com.au, dontpayfull.com, coupert.com, tenereteam.com, valuecom.com, and the vertical specialist petinsurancedeals.com.au. This confirms the brief's note: the Australian coupon SERP is dominated by white-label operators, and competing with them on breadth is not winnable. The dated-verification angle already in `offers.ts` is the correct wedge because it is the one thing they structurally cannot do.

**Stale verification:** Pipedrive has no `verified` date at all. The other 14 rows were verified between 17 and 28 August 2026, so all are inside the 45-day soft window and none is yet failing `check-partner-freshness`. The earliest (17 August: Moshy, Mosh, PetsOnMe) reach the 45-day warning on **1 October 2026**.

---

## Recommendations, ranked by expected revenue impact

| # | Action | Why it ranks here | Effort |
|---|---|---|---|
| **1** | **Add the code to the 14 earning pages that omit it** (8 Moshy, 6 Mosh) | Existing traffic, existing links, highest-AOV verticals, and `REFERRAL120` pays on code use without a click. Direct revenue, near-zero risk. | Low |
| **2** | **Run the GA4 vs PartnerStack click comparison** | Determines whether the 1,236 clicks are real. Every strategic conclusion about codes depends on the answer, and acting on the thesis before knowing it risks rebuilding the site around a crawler artefact. | Very low |
| **3** | **Ask Dense (UpPromote) and Midoc (GoAffPro) for a code** | Two existing partners on platforms where this is a settings toggle. Also removes the "no code required" claim on `/moshhair` before it goes stale. | Low |
| **4** | **Confirm with Knose in writing that partner-link purchases qualify for `referlab2mf`** | If "not through third-party aggregators" covers our link, the code is already not being honoured and six earning pages are advertising an offer that does not apply. Compliance and revenue at once. | Low |
| **5** | **Export Commission Factory conversions for Knose and PetsOnMe** (publisher 94361) | Creates the first code-arm conversion data that has ever existed. Without it the thesis stays untestable indefinitely. | Low |
| **6** | **Add the discount amount to `/moshy-review` and `/deals` titles** | Both carry a real offer and omit the amount from the title, against the site's own rule. `/deals` is the offers hub. | Low |
| **7** | **Log `/go/[slug]` and route money-page CTAs through it** | 51 of 55 destinations bypass it and it logs nothing. This is the prerequisite for ever answering Section 1 properly. | Medium |
| **8** | **Pull verified commission rates from the Commission Factory directory** | Replaces Section 4's unverified market view with real numbers in one session. | Low |
| **9** | **Approach Bloody Good, then Gro Clinics** | Bloody Good has proven code capability (Social Snowball) and no S4 exposure. Gro Clinics has the AOV and hub adjacency but needs direct outreach. | Medium |
| **10** | **Emit `Offer` JSON-LD on the 10 code pages lacking it** | Small AEO gain, cheap. | Low |
| **11** | **Verify Juniper's affiliate terms in a browser** | 403 to automated fetch. The brief's assumptions about coupon and comparison restrictions are unconfirmed either way. | Low |
| **12** | **Build `/offers.json`** | Machine-readable offers feed for AI engines. `offers.ts` is already shaped for it. Speculative payoff, so it ranks last. | Medium |

---

## Things I could not do, stated plainly

- **No Supabase queries.** Both projects NXDOMAIN, MCP server connection closed.
- **No GA4 or Vercel log access,** so Section 5 is unanswered rather than estimated.
- **No verified commission rates,** so Section 4 reports proven code capability instead of invented dollar figures.
- **No AI-assistant citation testing.** Not runnable from this session. Bing Webmaster Tools' AI Performance report is the live read and already set up.
- **Juniper and Knose terms return 403** to automated fetching. Both are flagged as unverified rather than assumed.
