# New brand-pair pages outside software: research, 4 October 2026

Read-only. Nothing was edited, committed or deployed. Software is covered by a separate agent and is out of scope here.

## Verdict

**No new page clears every gate today.** No candidate has all four of these together: our own Search Console demand for the pair, a primary-sourced fact that is wrong or missing on the pages that win the query, a monetisation event, and no legal or partner-contract conflict. That matches what the 24 and 29 September research found ([[code-visibility-research-2026-09]], [[eoy-revenue-research-2026-09-29]]). The new data does not change it.

The demand that does exist without an exact page is already landing on a page we have, usually at positions 8 to 25. In each case, improving that page captures it more cheaply than a new URL, and a new page would split the ranking we already hold. The improve-instead list below is where the work is.

One candidate is worth Jarred's call: **Sigenergy vs Tesla Powerwall**. It has strong Australian demand on Google Trends and a clean Apollo monetisation route. It has zero impressions in our own data, and I found no owned fact. My recommendation is to take that demand into the existing `/tesla-powerwall-alternatives-australia` page rather than build a new one (details below).

## Method and sources

- **Search Console:** `node scripts/google-data.mjs gsc 2026-07-04 2026-10-02 query` returned 4,591 queries, and `page,query` was pulled for the same window. Google anonymises low-volume queries, so these totals are floors.
- **Google Trends, Australia, last 12 months:** read through the explore and widgetdata endpoints. Every group included "everlab" as a shared anchor, because Everlab sends us about 200 impressions a quarter and gives a real-world calibration point. Trends rescales each group to its own maximum, so the figure to read is the **ratio to everlab within the same row**, not the raw number. Every pair query tested ("ecoflow vs bluetti", "emma vs koala", "technogym vs peloton", "everlab vs one mri", "instantscripts vs midoc", "mosh vs moshy", and even "moshy vs juniper") scored 0 to 1.5. Trends cannot see pair queries at this volume, so for pairs our own Search Console data is the only usable signal.
- **Who ranks in Google AU: not measured.** Google.com.au and DuckDuckGo both returned bot walls to curl, and the WebSearch tool is US-only. The SERP notes below come from that US-index search and are marked as such.
- **Primary sources:** each was read on 4 October 2026, with the URL given beside the fact.
- **Live site:** all 174 URLs in the live sitemap were read, and candidate slugs were probed for their status.

### Brand demand, our Search Console, 4 Jul to 2 Oct 2026 (queries naming the brand)

| Brand | Queries | Impressions | Clicks |
|---|---|---|---|
| Mosh | 123 | 3,886 | 35 |
| Moshy | 77 | 1,957 | 62 |
| Juniper | 119 | 1,577 | 30 |
| Pilot (retired) | 42 | 1,036 | 12 |
| Knose | 24 | 493 | 0 |
| Apollo (energy and peptides mixed) | 19 | 466 | 6 |
| Everlab | 15 | 202 | 4 |
| PetsOnMe | 8 | 152 | 0 |
| Edible Beauty | 6 | 141 | 0 |
| Anker SOLIX | 25 | 132 | 0 |
| Tesla / Powerwall | 21 | 121 | 0 |
| Prenuvo | 3 | 113 | 1 |
| EcoFlow | 14 | 85 | 0 |
| Omnilux (not a partner) | 26 | 76 | 0 |
| Aussie Health Products | 9 | 61 | 0 |
| Foreo | 3 | 56 | 0 |
| i-screen | 9 | 21 | 4 |
| Midoc | 1 | 2 | 0 |
| Hims | 1 | 1 | 0 |
| BLUETTI, Sigenergy, Emma, Koala, Ecosa, Technogym, Peloton, CurrentBody, InstantScripts, Bow Wow Meow, Bon Charge | 0 | 0 | 0 |

### Google Trends AU, 12 months, ratio to "everlab" in the same row

| Term | × everlab | Term | × everlab |
|---|---|---|---|
| Sigenergy | 2.1 | Koala mattress | 2.1 |
| Tesla Powerwall | 0.87 | Ecosa | 3.6 |
| Alpha ESS | 0.56 | Sleeping Duck | 1.3 |
| Apollo energy | 0.01 | Emma mattress | 0.67 |
| BLUETTI | 1.9 | Peloton | 3.3 |
| EcoFlow | 1.3 | Technogym | 0.57 |
| Anker SOLIX | 0.45 | Foreo | 0.31 |
| Jackery | 0.25 | CurrentBody | 0.31 |
| One MRI | 0.20 | Omnilux | 0.82 |
| Prenuvo | 0.03 | Bon Charge | 0.04 |
| i-screen | 0.01 | Edible Beauty | 0.01 |
| InstantScripts | 0.28 | Aussie Health Products | 0.004 |
| Midoc | 0.14 | Knose | 0.30 |
| Moshy | 0.23 | Bow Wow Meow | 0.37 |
| PetsOnMe | 0.01 | | |

The pattern is that Trends demand sits with brands we do not partner with: Sigenergy, Koala, Ecosa, Peloton and BLUETTI (not live). The partners in those verticals (Emma, Technogym, Foreo, i-screen, PetsOnMe) sit near zero.

## Ranked candidates

| # | Slug | Title | AU demand evidence | Owned fact | Monetisation | Risk | Recommend |
|---|---|---|---|---|---|---|---|
| 1 | `/sigenergy-vs-tesla-powerwall-australia` | Sigenergy vs Tesla Powerwall in Australia | Trends: Sigenergy 2.1× everlab, Powerwall 0.87×. **Our Search Console: 0 Sigenergy queries.** We get about 100 impressions on "powerwall alternatives" queries (pos 10.6 to 37). | **None found.** Apollo installs both (its own page, below), but that is our fact, not one the SERP gets wrong. The US-index SERP is already full of installer blogs, SolarQuotes and Gridly, and Sigenergy's own AU site runs "Better than a Tesla Powerwall?" content. | Apollo, $500 off (`/apollo-energy-group#register`) | Medium. An ACL comparative claim on safety or blackstart would rest on installer blogs. Tesla's AU page returned 403, so its specs are unverified. Must not imply government endorsement of the rebate. | **Hold. Put the demand into `/tesla-powerwall-alternatives-australia` instead** (improve item 3). Build a standalone page only if that section starts drawing Sigenergy impressions. |
| 2 | `/longevity/diagnostics/everlab-vs-onemri-australia` | Everlab vs OneMRI | GSC: "one mri vs everlab" 27 impr / 1 click at pos 10.4; "everlab vs one mri" 16 at 17.4; "everlab alternatives" 35 / 3 clicks at 10.6. Everything lands on the existing 3-way page. | Everlab's whole-body package adds a **chest CT (ionising radiation, "ultra low-dose" in its own words)** to the MRI. OneMRI is MRI-only, radiation-free, $2,990, with a $100 refundable deposit and no referral. Neither is Medicare-rebated. Sources: everlab.com.au/members/full-body-scan; onemri.com.au/pricing. | **None direct**: neither is a partner. i-screen is a different test, not a substitute, and the existing page already says so. | Low legally. A new page would cannibalise the 3-way page that already ranks 10.4 for the pair. `/whole-body-mri-australia-cost` already carries the CT fact and both prices. | **No. Improve the 3-way page** (improve item 1) |
| 3 | `/mosh-vs-moshy` | Mosh vs Moshy: which brand covers what | GSC: "mosh weight loss reviews" 162 at 10.9, "mosh weight loss" 21, "what is mosh weight loss" 5, all landing on `/mosh-review` (a hair page). The pair itself: "mosh and moshy" 2, "mosh vs moshy" 1. | **Mosh runs its own weight-loss program** at getmosh.com.au/weight-loss (title "Weight Loss Programs Online \| Mosh"), and its homepage banner offers "$100 off your 1st month of weight loss with code MOSHINTRO100". Moshy's homepage carries a parallel public code, MOSHYINTRO100 ($100 off the first month). Both read 4 Oct 2026. This **contradicts the 1 Oct memory note** that "Mosh's weight offering is Moshy". | Moshy (REFERRAL120) only. We earn nothing on Mosh weight loss. | **High commercially**: Jarred declined Mosh weight-loss placements on 27 Sep to avoid confusion with Moshy, so a page sending Mosh-weight searchers to Moshy is the partner-steering shape. TGA: the Mosh page itself says "Medical weight loss treatments", which we must not echo. | **Park. Needs Jarred.** Log the Mosh weight-program discrepancy in `PENDING_VERIFICATION` (`src/lib/facts/registry.ts`) and ask him. |
| 4 | `/ecoflow-vs-bluetti` | EcoFlow vs BLUETTI | Trends: BLUETTI 1.9× everlab, EcoFlow 1.3×, so BLUETTI out-searches EcoFlow in AU. GSC: 0 BLUETTI queries. Pair query on Trends 0.5. | Not researched: BLUETTI is not live (no `go-links` entry, no affiliate constant, `/bluetti` returns 404). | BLUETTI (CF 90254, not yet joined) plus EcoFlow | No-prebuilding rule (24 Sep): do not stage anything for a partner that is not live. | **Conditional, and not yet.** When BLUETTI goes live, place it on `/portable-power-station-australia` first (793 impressions in 28 days per the 29 Sep report). Revisit the pair page only if BLUETTI queries appear in our own data. |
| 5 | `/emma-vs-koala` or `/emma-vs-ecosa` | Emma vs Koala / Ecosa | Trends: Koala 2.1×, Ecosa 3.6×, Emma 0.67×. **GSC: 0 for all three brands.** The mattress comparison page draws 102 impressions at pos 27 to 38. | Emma's owned fact (every mattress listed 37 to 51% off a struck-through price) already lives on `/emma-sleep`. Nothing new found on Koala or Ecosa. | Emma (CF) | Partner vs non-partner: a pair page against an unpaid rival is the shape the hub-neutrality rule exists to stop. Zero-impressions rule. | **No** |
| 6 | `/knose-vs-bow-wow-meow` | Knose vs Bow Wow Meow | Trends: Bow Wow Meow 0.37×, Knose 0.30×. GSC: 0 Bow Wow Meow queries. | Underwriter rows already sit on `/who-underwrites-pet-insurance-australia`. | Knose | **AFSL**: no opinion on an insurance product. Fact rows only, which the underwriter page already provides. Zero-impressions rule. | **No** |
| 7 | `/technogym-vs-peloton` | Technogym vs Peloton | Trends: Peloton 3.3×, Technogym 0.57×. GSC: 0 for both. | Technogym's published AUD spread is already on `/technogym`. | Technogym (CF) | Peloton is not a partner. Zero-impressions rule. | **No** |
| 8 | `/foreo-vs-currentbody` | Foreo vs CurrentBody | Trends: both 0.31×. GSC: Foreo 56, CurrentBody 0. | None found | Foreo only; CurrentBody is not live | Partner vs non-partner | **No.** The real pull is Omnilux (improve item 6). |
| 9 | `/midoc-vs-instantscripts` | Midoc vs InstantScripts | GSC: Midoc 2 impressions, InstantScripts 0. Trends: InstantScripts 0.28×, Midoc 0.14×. | None found | Midoc | TGA (prescription-adjacent telehealth). Zero-impressions rule. | **No** |
| 10 | `/i-screen-vs-everlab` | i-screen vs Everlab | GSC: i-screen 21 impressions in total. 0 for the pair. | Already covered by the 3-way page. Everlab publishes its own "Comparing health checks: Everlab vs iscreen" post (everlab.com.au/post/comparing-health-checks-everlab-vs-iscreen), so the query is answered by the competitor itself. | i-screen (`referlabs`) | Low | **No** |
| 11 | `/i-screen-vs-gp-blood-test` | i-screen vs a GP-referred blood test | GSC: about 15 impressions for "blood test cost australia" variants at pos 59 to 69 | i-screen's terms state none of its services are Medicare-rebatable. That fact is already on `/i-screen`. | i-screen | Low | **No.** Rank, not coverage |
| 12 | `/juniper-alternatives` | Juniper alternatives | GSC: "juniper alternatives" 38, "alternatives to juniper" 15 | n/a | n/a | Retired on purpose: it was 301'd 29 Jul and 410 since 2 Sep (`src/proxy.ts`), because it steered readers away from a paying partner. The Juniper handbook also bans comparing Juniper with other providers. | **No.** Do not rebuild |
| 13 | `/apollo-vs-tesla-installers` | Apollo vs Tesla Powerwall installers | n/a | Apollo installs Tesla among other brands (below), so the pair is a category error. | Apollo | n/a | **No** |

Also out of scope or already decided: `/mosh-vs-pilot` still drew **1,056 impressions** on its 301 in this window. Jarred said do not rebuild it, and the Hims launch (`/hims-vs-mosh`, already built) is the successor. `/mens-health-telehealth-australia` was merged into `/mens-health` on 13 Sep (improve item 7).

## Brief for the one page worth Jarred's decision

### Sigenergy vs Tesla Powerwall (hold; preferred route is a section on the existing page)

- **Intent:** a buyer has two quotes, or has heard both names, and wants to know how the two batteries differ before signing.
- **Decision it helps:** which battery to ask an installer to quote.
- **Monetisation event:** an Apollo quote request ($500 off through our link). Apollo's own "Our Partner Brands" section at apolloenergygroup.com.au/residential-batteries (logos read 4 Oct 2026) lists **Tesla, BYD, Sungrow, GoodWe, Fox ESS, LiB, Midea Hiconics and Sigenergy** (alt text spelled "Signergy"). So one installer quotes both, and the page does not have to steer the reader to either battery.
- **Primary facts available today:** Sigenergy's AU site (sigenergy.com/au) states a 5 kWh module weighing 55 kg and modular stacking. Tesla's AU Powerwall page returned **403 to curl**, so Powerwall 3 capacity and warranty are **unverified**. The US-index search snippets give "13.5 kWh, 10-year warranty, no blackstart on three-phase", none of which may be printed until read off tesla.com/en_au. The STC factor falls from 6.8 to 5.7 on 1 Jan 2027 (DCCEEW, already sourced on our battery pages) and applies to both batteries equally.
- **What is missing:** an owned fact. Until one is found, this is an eleventh "Sigenergy vs Powerwall" page against installers and SolarQuotes, and the citation rule says it loses.
- **Why the section route beats a new page:** `/tesla-powerwall-alternatives-australia` already ranks (pos 10.6 for "powerwall alternatives australia"), yet it **names no alternatives at all**. An h2 "How does Sigenergy compare with the Powerwall?" with dated manufacturer facts tests the demand at no cannibalisation cost. Promote it to its own URL only if Sigenergy queries start showing up in our own data.
- **Risk controls:** cite each spec to the manufacturer's AU page with the date read; make no safety superlatives; add a "not the whole market" line; and keep the M8 fix, which describes Apollo's installers as SAA-accredited, not the company.

## Improve instead (ranked by the demand already landing)

1. **`/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia`** (287 impressions, 6 clicks). It ranks 10.4 for "one mri vs everlab", 10.6 for "everlab alternatives", 24.7 for "prenuvo scan australia" (82 impressions) and 25.8 for "everlab mri" (70), but the page never mentions OneMRI, CT or radiation.
   - Add OneMRI as a row, and an h2 "How do Everlab and OneMRI differ?". Everlab adds a low-dose chest CT; OneMRI is MRI-only at $2,990 (onemri.com.au/pricing, read 4 Oct). Neither is Medicare-rebated: both providers say so on their own pages.
   - Add "Where can I get a Prenuvo scan in Australia?": one partner clinic at 505 Toorak Road, Toorak VIC, with Sydney "coming soon" (prenuvo.com/locations, read 4 Oct 2026). That is a real owned fact for an 82-impression query.
   - **Price discrepancy to resolve before printing an Everlab scan price.** `/whole-body-mri-australia-cost` says $2,999 for members and $3,499 for non-members (read 13 Sep). A search snippet today shows "$3,499 member cost". Everlab's scan page shows only "$299" and "$199" refundable deposits, both on the same page. Re-read Everlab before changing either page.
2. **`/knose`**: "knose promo code" drew **415 impressions with 0 clicks**, split between `/knose` (230 at 22.5) and `/deals` (185 at 38.7). The 24 Sep fix removed the code question from `/deals` FAQ JSON-LD, but Google is still showing `/deals`. Check that the rendered `/deals` no longer leads with the Knose code; it may only need time.
3. **`/tesla-powerwall-alternatives-australia`** (123 impressions, pos 10.6 to 37): a "Powerwall alternatives" page that names no alternative. Add the brands Apollo installs, with manufacturer-sourced, dated rows, and the Sigenergy section above. This is the route for the strongest external demand found in this research.
4. **`/moshy-review`**: "is moshy legit" 202 impressions at 6.4, 4 clicks (2%). It is already the h1 question, so the lever is the first paragraph and the meta description. Check the lead answers "is it legit" in one liftable sentence.
5. **`/juniper`**: "is juniper only for women", "juniper for men", "is juniper for men" and "can men use juniper" total **about 110 impressions** across `/juniper` (pos 8.4 to 9.9), `/moshy-vs-juniper` and `/best-weight-loss-telehealth-australia`. The question sits only in the FAQ; promote it to a verbatim h2 on `/juniper`. Juniper's site blocks curl, so the answer is **unverified today**: re-read it in a browser. Keep it to Juniper and do not point men to another provider (handbook no-comparison rule).
6. **`/health-and-beauty/led-face-mask-comparison-australia`**: Omnilux price queries ("omnilux contour face australia price ... 2026" variants) plus **"omnilux contour artg"** variants draw about 90 impressions at pos 3 to 12, with 0 clicks. An ARTG-status row read off the TGA's own ARTG search would be an owned fact. **Not checked today.** The CurrentBody or Bon Charge placement from the 29 Sep report still fits this page better than Foreo.
7. **`/mens-health`**: the queries `/mens-health-telehealth-australia` held at pos 18 to 27 before its 13 Sep merge ("telehealth mens health australia" 166, "mens health telehealth consultations australia" 162, "online gp mens health australia" 118 impressions) now show `/mens-health` at pos 67 to 82. Most of the equity did not transfer. Midoc earns on this hub, and Hims lands here this week. Check that the hub answers "telehealth men's health Australia" as its lead, service-only (TGA).
8. **`/mosh-review`**: "mosh weight loss reviews" 152 at 10.7 lands on a page about hair loss. What it should say depends on Jarred's answer to candidate 3.
9. **`/apollo-energy-review`**: "apollo energy reviews and listings" 314 impressions at 8.9, 0 clicks. The query string reads like an automated or aggregator query, so treat it with caution. The page is already shaped right; check the title and meta.
10. **`/knose-vs-petsonme`**: its `<title>` still reads "Which Pet Insurance?", an evaluative framing in the SERP-visible field, which the no-AFSL rule and the 1-2 Oct "How do X and Y differ?" convention both cut against. The body was fixed. Only 1 impression, so it is low stakes but a one-line fix.

## Facts to log or raise (not page work)

- **Mosh runs a public weight-loss program** (getmosh.com.au/weight-loss; MOSHINTRO100, $100 off the first month), read 4 Oct 2026. This contradicts the 1 Oct note that Mosh's weight offering is Moshy. Log it in `PENDING_VERIFICATION` and ask Jarred, per the CLAUDE.md rule on partner real-world claims.
- **Moshy's homepage carries a public MOSHYINTRO100** ($100 off the first month of weight loss), read 4 Oct 2026. REFERRAL120 ($120) is still higher, so nothing on our pages is false. It is relevant context for the "exclusive" label and the lawyer's code questions.
- **Apollo's installed brands** (Tesla, BYD, Sungrow, GoodWe, Fox ESS, LiB, Midea Hiconics, Sigenergy) are published on apolloenergygroup.com.au/residential-batteries. The fact is usable on the battery pages today.

## What was not verified

- **Google AU rankings:** blocked to curl, and the search tool is US-only. Every "who ranks" note above is from the US index.
- **Tesla Powerwall AU specs:** 403.
- **Juniper's page:** Cloudflare block; its eligibility-by-gender answer is not re-read.
- **Omnilux ARTG status:** not checked.
- **Everlab's current whole-body scan price:** conflicting figures, listed above.
