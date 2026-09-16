# Site audit: stale, wrong, slop, 14 September 2026

Report only. Nothing on the site was changed to produce it.

## Scope and method

- **Rendered pages:** all 257 routes in the current build (commit e0c51d8, which is what production serves), including metadata and structured data.
- **Live checks:** status, redirect and indexability, checked with a browser user agent.
- **Outbound links:** 65 unique affiliate, tracked and source URLs, plus all 23 `/go/` routes.
- **Data files:** read dates in `offers.ts`, `src/lib/partners/*`, the facts registry, and every dated claim in `src/`.
- **Internal docs:** `reports/` and `research/` (section E). CLAUDE.md and memory are in section F.

**How findings were confirmed.** Every automated match was read in context before being listed, and false positives were dropped: "clear-eyed" matching "To be clear", "paid plans unlock more pages", and the permitted ~$252/kWh rebate figures. **VERIFIED** means I saw the fault myself on the live page or the source; **UNVERIFIED** means it could not be read.

**Priority**
- **P1:** live, and wrong or risky.
- **P2:** live, and stale or inconsistent.
- **P3:** slop, repetition, or tidy-up.

---

## A. P1: live and wrong

| # | Where | What is wrong | Evidence | Fix |
|---|---|---|---|---|
| 1 | /mens-health, /skin-and-beauty | The FAQ "Does Refer Labs earn from this section?" answers "Not yet… nothing in this section currently earns us a commission", in both the visible answer and FAQPage JSON-LD. Both pages carry partner links: Midoc ×1, and Foreo/Edible Beauty/Aussie Health ×3. It is a false earnings disclosure. The guard in `check-partner-scope.mjs` misses it because its pattern has no "currently". | Live HTML, `/go/` link counts 1 and 3. Source: `src/app/mens-health/page.tsx:84`, `src/app/skin-and-beauty/page.tsx:75`. VERIFIED | Rewrite both answers to name the partner and the commission, and widen the guard's pattern. |
| 2 | /landingi (5 CTAs), /compare hub | The Landingi affiliate link no longer carries a referral. `try.landingi.com/n2az1ocvmgui` 301s to `landingi.com/` with every parameter dropped, and a made-up key does exactly the same. As a control, a bad key on `try.leadpages.com` returns 404. Clicks earn nothing. | curl, twice, with the control. VERIFIED | Get the current link from PartnerStack and replace `LANDINGI_URL`. |
| 3 | /pipedrive, /compare/ai-sales-tools | The price contradicts itself. The at-a-glance card and FAQ say **AU$19** (read 5 Sep). The quick answer, "From US$14/seat/mo" and the Offer schema (`price: "14"`, USD) all say **US$14**, and so does the compare hub. | `pipedrive/page.tsx:41`, `pipedrive/config.ts:12`, `catalog.ts:338`, live HTML. VERIFIED | One AU$19 figure everywhere, declared once. |
| 4 | /compare/ai-sales-tools | Keap is listed "from **US$249**/mo". Keap was corrected to one platform price of **US$299** on 5 Sep, and /keap and /best-crm say so. | `catalog.ts`, live hub HTML. VERIFIED | US$299 with its read date. |
| 5 | /moshy, /weight-loss-telehealth-cost-australia, /cheapest-weight-loss-telehealth-australia | "Moshy advertises its program from **$229 a month**, checked 14 August 2026" (31 days old). Moshy's own weight-loss page on 14 Sep shows "$349 → $249, $100 off" and "Treatment from $249". **You chose to leave this for now**; it is listed because it is still live. The same figure is in the facts registry. | `moshy/config.ts:147`, cost page `:34`, cheapest `:66`. VERIFIED | Your decision on the Moshy price. |
| 6 | /longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia | It says "We quote no prices because we verified none off a live listing", and the FAQ says prices could not be verified. Everlab publishes **$2,999 members / $3,499 non-members** on its own page, read 13 Sep. The same page also uses a banned "not X but Y" (see D2). | Page source lines 6-10, 19, 80; Everlab page. VERIFIED | Correct it, or state Everlab's dated prices. |
| 7 | Homepage "top picks" | "Each offer below was read off the provider's own page, the oldest of them on 17 Aug 2026." Four of the offers shown (Apollo, Unbounce, Superfiliate, Knose) have **no public page**: `offers.ts` records them as `noPublicPage`. It is the same overclaim fixed on /deals today. | `src/app/page.tsx:315`. VERIFIED | Say "confirmed", as /deals now does. |
| 8 | /unbounce, /fullenrich | Structured data publishes prices the page does not stand behind. **/unbounce:** the schema says "paid plans from US$24/month", while its own FAQ says "We do not quote a figure here". **/fullenrich:** the schema price is US$29, while the page says "paid from US$55/mo". Neither is dated. | `unbounce/page.tsx:41`, `fullenrich/page.tsx:61`, `fullenrich/config.ts:26`. VERIFIED | Drop the price from both schemas, or read and date one figure. |
| 9 | /status | The route is public and **indexable** (200, no noindex) and carries the **homepage title and canonical**: it has no metadata of its own, the trap CLAUDE.md describes. It also lists publicly which integrations are "Configured": Supabase, Stripe payments and webhook, Resend, and Twilio SMS and webhook. Stripe checkout and Twilio are retired. It contains the site's only em dash. | Live headers and HTML. VERIFIED | noindex it, or put it behind auth, and remove the retired checks. |

## B. P2: live, stale or inconsistent

| # | Where | What is stale | Evidence | Fix |
|---|---|---|---|---|
| 10 | /compare/business-phone | The title reads "Business Phone Systems Compared 2026: **CloudTalk** vs KrispCall", and CloudTalk appears 8 times across title, description and CollectionPage schema. CloudTalk was retired on 24 Aug: /cloudtalk 308s to /krispcall and its affiliate link now 404s. `llms.txt:94` and the search-index keywords still describe the hub that way. | Live HTML; link-health check. VERIFIED | Re-scope the hub to what it actually lists. |
| 11 | llms.txt, /deals entry | "Every code is read off the provider's own page." That is false for five offers with no public page. | `offers.ts` `noPublicPage` rows. VERIFIED | "each confirmed and dated". |
| 12 | Offer read dates | **Moshy, Mosh, PetsOnMe:** 17 Aug (28 days). **Unbounce, Superfiliate:** 20 Aug. **Leadpages, Carrd, beehiiv, Brevo, GoHighLevel, ElevenLabs, AliDrop:** 25 Aug. **Knose:** 27 Aug. **Apollo:** 28 Aug. **Pipedrive has no date at all.** The **Mosh** 180-day money-back and price-match guarantees are "checked 14 August 2026" (31 days) on /moshhair and /hair-loss-treatment-cost-australia. `VERIFIED_DATE` (global fallback) is 28 Jul (48 days). | `offers.ts`, grep of dated claims. VERIFIED | Re-read the codes and guarantees before they pass 45 days (17 Aug + 45 = 1 Oct). |
| 13 | 23 brand pages | Their offer table shows **"Not recorded"** under Last checked: free trials that were never dated. The pages are /activecampaign, /beautifulai, /blinq, /capsule, /databox, /dext, /employmenthero, /flexiquiz, /fullenrich, /hellobar, /keap, /landingi, /lindy, /nutshell, /outgrow, /pandadoc, /pipedrive, /replyio, /survicate, /trainual, /wing-assistant, plus /cloudtalk and /instapage, which redirect. It reads as unmaintained. The long explanatory footnote under the table appears on 44 pages. | Built HTML table cells. VERIFIED | Date the trials or hide the column when there is no reading. |
| 14 | /databox | The Offer cell says "No discount code exists" while the Code cell says "No code needed". Side by side they read as a contradiction. | Built HTML. VERIFIED | Keep one. |
| 15 | Homepage | The heading "This month's top picks" names no month, and the offers under it were last read in August. | `page.tsx:302`. VERIFIED | Drop "This month's", or date the picks. |
| 16 | Title tests (read 5 Oct) | **Body changes mid-test:**<br>- /best-hair-loss-treatment-australia lost Pilot on 13 Sep; noted in `seo.ts`.<br>- /mosh-vs-dense lost its Pilot link on 13 Sep; **not noted**.<br><br>**A premise in the test report is wrong:** `reports/title-test-2026-09-05.md` says /moshy-review's title carries "55% off". It never did (55% is Mosh's offer), so only /moshy supports the "figure in title" hypothesis. | git log, live titles. VERIFIED | Read the 5 Oct result with these in hand. |
| 17 | Juniper, Reply.io, PandaDoc outbound links | They could not be verified: Cloudflare or Vercel bot walls. The Reply.io and PandaDoc PartnerStack hops are fine up to the wall. | Link-health check. UNVERIFIED | One click each in a real browser. |
| 18 | `seo.ts` retired entries | **Missing defensive `noIndex: true`:**<br>- `incomeLab` (/incomelab 308s)<br>- `polymarketHub` (/polymarket 410s; its description still reads "Where edge on Polymarket really comes from")<br><br>The CLAUDE.md rule is that retired routes carry noIndex. | `seo.ts` against `next.config.ts` and `proxy.ts`. VERIFIED | Add noIndex, or delete the entries. |
| 19 | Legacy chatbot | "Speak with us" renders on /status and /referral-partnerships (noindex). Its scripted answers sell a "90-Day Pilot" engagement and retainers (`src/app/api/chatbot/route.ts`), and those B2B services are retired: /services 308s. | Live HTML. VERIFIED | Remove it, or re-script it for /for-business. |
| 20 | Dead constants for retired pages | **Dead links:**<br>- `CLOUDTALK_URL` returns 404.<br>- `INSTAPAGE_URL`'s domain no longer resolves.<br>- `LOGOME_URL` returns 404.<br><br>**Unused:**<br>- `ALOHI_URL`, `COMETCHAT_URL`, `FLOCKSY_URL`<br>- go-key `midoc-hair-loss`<br><br>No live page uses any of them. | Link-health check. VERIFIED | Delete. |

## C. Hedged or unsourced figures (P2/P3)

CLAUDE.md bans "~$X / around / roughly / about" and unsourced prices. The ~$252/kWh rebate figures, and the tables derived from them on 9 solar pages, are the permitted exception and are **excluded**.

| # | Page | Text | Issue |
|---|---|---|---|
| 21 | /home-battery-cost-australia | "A popular 13.5kWh system… is often quoted around $10,000 installed", and "Industry sources put a typical 10kWh system in the several-thousand-dollar range" | No source, no date |
| 22 | /portable-vs-installed-home-battery-australia | "About $7,000 to $14,000 before the federal rebate for a 10-13kWh system, roughly $4,000 to $13,000 after it" | No source, no date |
| 23 | /virtual-power-plant-australia | "Industry estimates put typical residential VPP returns at roughly $200 to $1,500 a year" (3 places) | No source, no date |
| 24 | /home-battery-rebate-by-state-australia | ACT Sustainable Household Scheme "loan (up to around $15,000)" | No source, no date |
| 25 | /ecoflow, /anker-solix | "about $0.98/Wh", "about $1.42/Wh" | Computed from dated prices, so the hedge is unnecessary: state "$0.98/Wh" |
| 26 | /best-pet-insurance-australia, /knose-vs-petsonme | "roughly $1,200", "roughly $600" in worked examples | Exact arithmetic; drop "roughly" |
| 27 | /recurring-affiliate-programs | "about $15 a month", "roughly $360", "roughly $180", plus the "commonly cited around X%" rates you are confirming with the networks | Worked examples; rates already pending with you |

## D. AI slop and repetition (P3), each read in context

| # | Where | Text | Rule |
|---|---|---|---|
| D1 | /databox | "**The honest answer** is that the discount is structural rather than promotional. **Two things** actually re…" | Banned "the honest X" and "N things:" |
| D2 | /longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia | "the meaningful comparison is **not** price per service **but** which is looking at the thing you are actually worried about" | Banned "not X but Y" |
| D3 | /skin-and-beauty/led-face-mask-comparison-australia | "The part worth weighing is **not** the gap itself **but** what the local price buys you" | Banned "not X but Y" |
| D4 | /for-business | "that means **two things**:" | "N things:" move |
| D5 | /mosh-review, /moshy-review | Section heading "**The short version**" | Variant of banned "Short answer:" |
| D6 | Newsletter signup block, **52 pages** | "sent only when something's **genuinely** worth it" | Repetition turns a phrase into slop |
| D7 | Homepage Knose card, /weight-loss-guide, the /pet-insurance and /knose meta descriptions | "in **plain English**" | Narrating our own clarity |
| D8 | About 25 more "genuinely", concentrated on a few pages: /how-to-start-affiliate-marketing-australia ×4, /carrd-vs-butternut ×3, /moshy-alternatives ×2, /best-crm-small-business-australia ×2 | e.g. "has a genuinely free tier", "genuinely useful" | Tic; cut most of them |
| D9 | "actually" on **149 pages**, and a shared title/description skeleton in `seo.ts` | e.g. "What the Evidence **Actually** Says", "What Does Good Sleep **Actually** Cost", "What Australians **Actually** Pay", "What They **Actually** Cost", "What You **Actually** Get", plus ~15 descriptions "what X actually costs/measures/means" | Same skeleton with the noun swapped across longevity, sleep, skin and solar pages (the repetition rule) |
| D10 | 43 brand pages | Template heading "The bottom line" | Low: a section label, but identical everywhere |
| D11 | 22 longevity and sleep pages | The same "still being built… nothing here earns us a commission" notice, word for word | Accurate (no partner links there); only the repetition is worth trimming |

## E. Internal documents overtaken by recent work (P3)

From two sub-audits of `reports/` and `research/`. They affect decisions, not the live site.

- **`reports/title-test-2026-09-05.md`:** the wrong /moshy-review "55% off" premise, and no confounds section (see #16).
- **`reports/partner-launch-plan-2026-09-03.md`:**
  - The addendum says the partner-scope guard "catches #1". It does not: it misses "currently", which is live fault #1.
  - Many items are done or decided but still read as open: Midoc service exclusions, four pages built, disclosure placement, ARTG resolved, the coming-soon variant.
  - Foreo was placed without its shipping and commission confirmation being recorded.
- **`reports/audit-2026-09-03.md`:** lists /mosh-vs-pilot and /moshy-vs-pilot as live, and its counts ("four undated routes", "six noPublicPage codes") have since been corrected.
- **`reports/partner-code-requests-2026-09-05.md`:** still framed as "send". The 7 Sep PartnerStack report found 178 clicks and zero conversions.
- **`reports/conversions/README.md`:** says Moshy/Mosh sub-IDs are "pending". This is closed: the merchant cannot pass them.
- **`research/seo-deep-dive-2026-09-07.md`:**
  - Treats retired pages as live: the peptides cluster (410), /minoxidil-australia, /mosh-vs-pilot, /moshy-vs-pilot, /online-weight-loss-programs-australia.
  - Uses a wrong path, /reply-io; the real route is /replyio.
  - Its orphan list is mostly redirected routes.
- **`research/code-thesis-audit-2026-09-07.md`:** says "14 pages omit the code". It is now 11, because two of the pages 301. The recommendation itself is still open.
- **`research/business-software-cluster-2026-09-07.md`:** counts /cloudtalk and /instapage, both retired before it was written; the cluster is 55 pages, not 57.
- **`research/coupon-site-models-2026-09-07.md`:** still lists Pilot.
- **`research/outreach-2026-09-13.md`:**
  - Quotes the old /databox title; the live title is "Databox Discount Code 2026: Is There One?".
  - Lists the retired /apollo-energy as one of our pages.
- **`research/offsite-sweep-2026-09-13.md`:** the Pilot flags are resolved (f8a355a), and the Juniper consult is confirmed.

## F. CLAUDE.md and memory

(Added when that audit completes.)

---

## Checked and clean

- **No prescription medicine names** on any of 257 rendered routes, including JSON-LD and metadata.
- **No star ratings,** `aggregateRating` or `ratingValue` anywhere.
- **Sitemap:** 174 URLs, all 200, none noindexed or redirecting.
- **llms.txt:** every referlabs.com.au URL resolves 200, and there is no Pilot reference left.
- **Internal links:** no link goes to a 404. The only links to redirects sit on legacy pages that themselves redirect.
- **"Last updated" stamps:** none is older than its page's last content change.
- **/go/ routes:** all 23 return 302 to the right partner, with Commission Factory tracking intact. 58 of 65 outbound URLs load correctly.
- **Longevity and sleep:** the "no commercial partner" statements are still true (zero partner links).
- **Redirects:** the 81 other routes missing from the sitemap are all legitimately redirected (308), gone (410) or noindexed. /status is the only exception.
- **Em dashes:** one in total, on /status.
