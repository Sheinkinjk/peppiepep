# Refer Labs — AI Search Trust & Authority Strategy

**Prepared 15 September 2026.** Research only: nothing on the site was changed to produce this report.

## How to read this report

Every major claim carries one of five labels:

- **VERIFIED** — seen in primary evidence: our own source code and live pages, a company's own documentation, a government register.
- **STRONGLY SUPPORTED** — several credible, independent sources agree.
- **INFERENCE** — a strategic conclusion drawn from the evidence.
- **SPECULATIVE** — worth testing, not established.
- **CONTRADICTED** — the evidence points the other way.

### What was measured, and its limits

Six research passes ran on 15 September 2026:
1. The codebase, and all 174 sitemap URLs crawled live.
2. Refer Labs as an entity on the web.
3. A 65-query search benchmark.
4. Documentation and studies on how answer engines choose sources.
5. Competitor trust architecture.
6. Original-data and PR opportunities.

Full working files sit in the session scratchpad under `geo/01` to `geo/06`.

Three limits matter:

- **Live AI answers were not observed.** ChatGPT, Perplexity, Claude and Gemini need a login and no API key was available. The only observed AI answers come from the Searchable export on this machine: 2,265 answers across AI Overviews, ChatGPT and Perplexity, 31 July to 12 August 2026. Everything else about AI visibility is inferred from search rankings.
- **Australian search engines mostly blocked automated queries.** Brave AU returned 8 benchmark queries before rate-limiting. Bing returned corrupted results through every method tried, and only 2 Bing rows were usable. The remaining 55 benchmark rows come from the WebSearch tool, whose index is US-flagged. AU positions in this report are therefore thin.
- **Backlinks were not measured by any tool.** The "effectively zero" assessment rests on every available proxy coming back empty. Search Console's Links report is the check.

---

## 1. Executive summary

**Where Refer Labs stands (VERIFIED unless marked):**

- **The business:** a young, founder-run Australian comparison publisher. 174 indexable pages. Revenue concentrates in two health partners, Moshy and Mosh, which are the only two offers with exclusive codes.
  - The site holds 4 codes, from the `DEALS` rows in `src/lib/offers.ts`.
  - Business software is the largest content block (55 pages) and the weakest earner. PartnerStack recorded one signup, Superfiliate, across 12 months and 43 programs.
- **AI visibility is real but narrow.** In the August archive, prompts that did not name Refer Labs cited it in **157 of 1,869 answers (8.4%)**. All 23 of those prompts were weight loss or hair loss. No pet insurance, battery or business-software prompt cited Refer Labs.
- **The benchmark shape (INFERENCE from rankings):**
  - Refer Labs appears in some engine's top 10 on 13 of 65 queries.
  - Strongest on brand-pair "X vs Y" queries (42% of engine rows).
  - Absent on "is X legit" and "X review", where review platforms take 71-72% of top-3 slots.
- **Refer Labs is not yet a recognisable entity.** No partner, publisher, forum, press item or Wikidata entry mentions it. Editorial referring domains are effectively zero.
  - "Refer Labs" is not a registered business name.
  - The domain is registered to the founder's sole-trader ABN, not to Pepform Pty Ltd.
  - Brave's cached result for the homepage still shows the old agency copy and a fabricated "4.8, 47 votes" rating. That rating markup was removed from the site on 5-7 July 2026 (commits `dee8f9c`, `bd1d24b`).
- **Several trust statements currently overstate what the site does:**
  - "Active ✓" prints on every offer row, including rows showing "Not recorded".
  - `/disclaimer` and `llms.txt` say every offer was read off the provider's own page. Five offers (Apollo, Unbounce, Superfiliate, Knose, PetsOnMe) are recorded in `offers.ts` as stated on no public page.
  - 83 pages name an author in structured data that no reader can see.
  - `/how-we-make-money` describes affiliate links but not lead fees or paid placements.

**What the documented evidence says about getting cited:**

- **Retrieval runs on each engine's own search index (VERIFIED from the companies' documentation).** Google's AI features use its core ranking plus "query fan-out". ChatGPT names Bing as a search partner. Claude's web search runs on Brave. So Google rank, Bing coverage and Brave coverage are three separate levers.
- **Several popular "GEO" tactics are not levers (VERIFIED, Google):**
  - Google's May 2026 guide calls schema-for-AI and llms.txt myths: "Google Search ignores them".
  - It warns against chunking content for AI and against building pages for every fan-out variant.
- **Third-party coverage is what engines lean on (STRONGLY SUPPORTED).**
  - University of Toronto, 2025: engines cite earned third-party coverage far more than brand-owned content.
  - Ahrefs (vendor study), 75,000 brands: unlinked brand mentions were the strongest correlate of AI Overview visibility.
- **Google gives "non-commodity" content, meaning a unique point of view or data, more weight than any other suggestion in its guide (VERIFIED).**

**Three conclusions:**

1. **Stop the self-inflicted trust damage before building authority.** The overclaims above are the only trust problems Refer Labs fully controls, and each one would undermine an AI system's or journalist's confidence the moment it is noticed.
2. **Earn corroboration from outside the site.** Every trust signal Refer Labs has today is a statement about itself. The fastest outside signals come from partners who already have a relationship with Refer Labs (a mention and link from Mosh and Moshy) and from turning `/data` into a dataset others can cite.
3. **Win narrow, then widen.** Concentrate on three verticals where the big comparison sites are absent or weak and Refer Labs already owns facts:
   - health services via telehealth, where Finder, Canstar and Mozo publish nothing;
   - pet insurance, via underwriters and PDS terms;
   - home batteries, via rebate arithmetic on open Clean Energy Regulator data.

   Hold business software at maintenance.

**Recommended identity:** a hybrid, led by **an Australian consumer buying-intelligence publisher**. That means independent comparisons built on dated, sourced facts, with verified offers as one part of the buying decision rather than the purpose of the site. Section 25 explains why this beats coupon site, affiliate marketplace or pure data publisher.

---

## 2. What Refer Labs is today

**VERIFIED from the codebase audit and the live crawl.**

**Pages by category (174 indexable)**

| Category | Pages | Notes |
|---|---:|---|
| Business software | 55 | incl. 9 `/compare/*` hubs; 1 PartnerStack signup in 12 months |
| Solar & energy | 22 | Apollo Energy Group ($500 off a quote); rebate calculators |
| Weight loss | 17 | Moshy (REFERRAL120, $120 off), Juniper; the top earner |
| Longevity & diagnostics | 15 | Everlab, Prenuvo, i-screen, whole-body MRI; no partner |
| Core / trust | 14 | about, how-we-make-money, disclaimer, data, faq, deals, guides |
| Hair loss | 12 | Mosh (REFERAL55, 55% off), Dense |
| Men's health | 10 | Midoc |
| Skin & beauty | 9 | Foreo, Edible Beauty, Aussie Health Products |
| Pets | 7 | Knose (referlab2mf), PetsOnMe (REFERLABS) |
| Sleep | 7 | no partner |
| Affiliate programs | 6 | |

**How it makes money**
- Affiliate links: direct, Commission Factory and PartnerStack.
- Exclusive partner codes.
- Lead capture: the Apollo interest form, newsletter, weight-loss guide and nine quizzes.
- A `/for-business` door that sells placement, per-lead fees and program building.
- The lending vertical is retired to redirects, but its API is still deployed.

**Trust surface**
- **/about** doubles as the methodology page (`/how-we-research` 308s to it). It says plainly: "desk research: we do not test or personally use most of what we cover". It names Jarred Krowitz and Pepform Pty Ltd, ABN 32 660 008 159.
- **/how-we-make-money** is 531 words and incomplete. It says "two ways" and describes only affiliate links.
- **/data** is an observation log with about 15 entries, all partner brands. The newest is 26 August, although the page promises weekly re-checks. It has no CSV, licence or methodology.
- **/contact** is a B2B sales page. There is no route for readers to get in touch.
- **Footer:** no legal entity name, no ABN.

**Freshness and verification**
- Every offer date is a hand-typed `DEALS[].verified` value. Nothing is checked at checkout. No evidence URL or screenshot is stored. There is no expiry field.
- The 45/90-day freshness guard covers only the three files in `src/lib/partners/`.

**Guardrails that already protect trust (these are an asset)**
- Ten build checks: price provenance, TGA medicine classes, disclosure order, answer slot, AEO invariants, partner scope, partner freshness, redirect order, offer wiring, page dates.
- No self-issued star ratings anywhere.
- A TGA rule against naming prescription medicines.

## 3. What Refer Labs should become

The brief proposed "an independent Australian decision + distribution platform" with the line "Compare. Choose. Save."

**Assessment (INFERENCE):**

- **"Independent Australian comparison" is credible, and it is the claim to defend.** Refer Labs already avoids paid rankings and self-issued ratings, and publishes commercially inconvenient facts, such as two partners sharing one underwriter. That differentiates it from the persona-led sites currently ranking above it.
- **"Decision platform" is credible only once pages help a reader choose, not just find a code.** The brand-pair and cost pages do this. The 27 "<Brand> Discount Code: Is There One?" pages for brands where Refer Labs holds no code do not.
- **"Distribution platform" is a B2B word.** It describes what Refer Labs sells to partners, not what a consumer, a journalist or an AI system is looking for. Keep it for `/for-business` and investor language. Keep it out of the consumer brand.
- **"Compare. Choose. Save."** is honest if "Save" means a verified offer attached to a comparison. As a brand line it tilts readers and engines toward "deal site". Lead with the choosing.

**Proposed consumer positioning:**

> **Refer Labs compares health services, pet insurance and home energy for Australians, using facts read off each provider's own documents and dated when we read them. Where we hold a genuine offer, it sits next to the comparison, never in place of it.**

**Evidence the site needs before that sentence is fully true:**
1. Verification that means what it says (section 12).
2. A named, accountable editor (section 8).
3. A complete earnings disclosure.
4. At least one dataset per focus vertical that someone other than Refer Labs cites (section 13).

## 4. Current authority assessment

| Class | What exists | Status |
|---|---|---|
| **Owned** | Site and schema; `llms.txt`; LinkedIn (2 followers, "Software Development", "Founded 2025"); Instagram (12 followers); Facebook (5 followers, "Shopping & retail"); a brand-managed ProductReview listing with 0 reviews; Bing Webmaster data | VERIFIED |
| **Earned** | None found. Partners (Moshy home and `/llm` page, Mosh, Knose, PetsOnMe, Apollo, Superfiliate, Midoc, Commission Factory) mention Refer Labs zero times. Zero mentions across 35 competitor and publisher pages. | VERIFIED for pages that could be fetched. Reddit, OzBargain, Whirlpool and Trustpilot were blocked. |
| **Third-party records** | ABR: Pepform Pty Ltd active since 16 Aug 2022, no business names. auDA WHOIS: domain registrant is Jarred Saul Krowitz, sole trader ABN 57 672 712 409. First TLS certificate 9 Dec 2025. Common Crawl: 7 URLs (May 2026), 155 (Aug 2026). No Tranco rank. | VERIFIED |
| **AI-generated / unverified** | Brave's cached agency description and "4.8, 47 votes" rating. A search-tool summary calling Refer Labs an affiliate agency with a "$799 Blueprint" and "peptide suppliers". | VERIFIED as served; the content is stale |

**Consistency problems that undermine entity recognition (VERIFIED):**

1. **The founding date is the company's, not the brand's.** Schema `foundingDate` and `llms.txt` use 2022, the company registration date. Every public trace of the brand dates from 2025. Anyone cross-checking reads it as inflated.
2. **No public record links the brand to the company.** The domain registrant is a different legal person (the sole-trader ABN), and "Refer Labs" is not registered as a business name.
3. **The category is described four different ways:** comparison publisher on the site, software company on LinkedIn, shopping retailer on Facebook, affiliate agency in cached search results.
4. **Name collisions dilute the entity:**
   - pepform.co.uk sells research peptides, which is TGA-sensitive.
   - "Moshy" collides with the Moozi casino, "Mosh" with a US lifestyle brand and a terminal tool, and "Apollo Energy Group" with a Denver company.

## 5. AI-search visibility assessment

**Observed: the August 2026 answer archive (31 Jul to 12 Aug, AI Overviews, ChatGPT and Perplexity)**

- **Prompts that name Refer Labs:** cited 78% of the time. That measures brand lookup, not discovery.
- **Prompts that don't name Refer Labs:** cited in 157 of 1,869 answers (8.4%). All came from weight-loss and hair-loss prompts. Top citations:

| Prompt | Answers citing Refer Labs |
|---|---|
| "most affordable hair loss telehealth" | 33 of 39 |
| "cheapest hair loss treatment" | 27 of 39 |
| "cheapest weight loss telehealth" | 18 of 39 (Perplexity 11 of 13) |

  The last one was cited even though the page did not rank in the search tool's top 8. This fits Google's description of "fan-out" retrieval and the Ahrefs finding that 62% of 2026 AI Overview citations sit outside the organic top 10 (vendor study).
- **60 of 83 unbranded prompts never cited Refer Labs,** including every pet insurance, battery and software prompt.

**Inferred from rankings (65 queries):**

- **In some engine's top 10:** 13 of 65 queries.

| Query group | Top 10 |
|---|---|
| Discount | 4 of 14 |
| Comparison | 5 of 12 |
| Decision | 2 of 12 |
| Trust | 0 of 12 on the US-flagged index (Brave AU had `/moshy-review` at #3 on 13 Sep) |
| Extras | 2 of 15 |

- **Which source type wins the top 3, by query shape:**

| Query shape | Who wins the top 3 |
|---|---|
| Discount codes | coupon sites 46%, the brand's own site 42%, Refer Labs 6% |
| "X vs Y" | the brand's own site 28%, Refer Labs 19%, review platforms 19% |
| "best X" | comparison publishers 47%, vendor and clinic roundups 39% |
| Cost or price | clinics' and retailers' own price pages 74% |
| "is X legit" / "X review" | review platforms 71-72% |
| "who underwrites" | no dominant source; old Mozo posts and vet blogs win by default |

**What this means (INFERENCE):**
1. **Refer Labs gets cited where it states a specific, comparative fact that a provider will not state about itself:** cheapest, most affordable, a vs b. That is the lane.
2. **"Is X legit" is structurally lost.** Review corpora own it, and Refer Labs will not publish ratings. Contribute to that answer through facts (price, terms, underwriter, AHPRA status of the service's practitioners) rather than verdicts.
3. **Discount-code queries are a coin toss between coupon sites and the brand's own page.** Refer Labs wins them only where the code is exclusive and the provider or an independent source corroborates it.

**Stale or wrong things engines are serving (VERIFIED against the live site):**
- **Brave's cached `/moshy` FAQ** still says Moshy "does not always publish a traditional discount code". The live page names REFERRAL120. The live "Does Moshy have a referral code?" answer still doesn't name it.
- **Redirecting URLs still ranked or cited:** the search tool ranks `/mens-health-telehealth-australia` (301) and a blog URL (308). Two URLs cited in August now redirect.
- **An expired code attached to the offer:** search summaries pin "$120 off" on MOSHYDEAL120, which expired 28 February 2026.
- **Conflicting underwriter answers:** summaries give three different underwriters for Knose. `/who-underwrites-pet-insurance-australia` is missing from both underwriter queries.

## 6. ChatGPT / Perplexity / Claude benchmark

Direct observation was not possible (see limits). Two tables follow: what can be said per engine, and the fifteen queries Refer Labs can most realistically win.

**By engine**

| Engine | Retrieval source (documented) | What we know for Refer Labs | Label |
|---|---|---|---|
| ChatGPT search | Bing is a named search partner; queries are rewritten first | Cited 4 of 7 times for "best weight loss telehealth australia" in August. Bing AU: `moshy vs juniper` #3/#7, `knose promo code` #7. Bing Webmaster's AI Performance report showed about 1,200 citations over 28 days (owner-reported). | OBSERVED (Aug) / INFERRED |
| Perplexity | Its own crawler (PerplexityBot) plus its own index | Cited 11 of 13 for cheapest weight-loss telehealth in August | OBSERVED (Aug) |
| Claude | Brave Search (Anthropic subprocessor, March 2025) | Brave AU: 3 of 8 queries in the top 10 (#2 mosh hair discount code australia, #4 moshy referral code, #9 moshy promo code australia). Brave still caches stale agency copy and a removed rating. | INFERRED |
| Google AI Overviews / AI Mode | Core ranking plus query fan-out; must be indexed and snippet-eligible | In the August archive only for health prompts | OBSERVED (Aug) |
| Gemini | Google index (INFERENCE) | Not measured | — |

**The 15 most winnable queries** (full 65-row table in `geo/03-ai-benchmark.md`)

| # | Query | Evidence |
|---|---|---|
| 1 | moshy vs juniper | WebSearch #3/#5; Bing AU #3/#7; August AI 3 of 3 |
| 2 | moshy vs juniper australia | WebSearch #2/#3 |
| 3 | mosh vs dense | WebSearch #1/#2 |
| 4 | mosh hair discount code australia | Brave AU #2; Brave's FAQ panel quotes our REFERAL55 answer |
| 5 | moshy referral code | WebSearch #2; Brave AU #4 |
| 6 | best weight loss telehealth australia | WebSearch #1; Brave AU #3; ChatGPT cited 4 of 7 in August |
| 7 | hair loss treatment cost australia | Cited 27-33 of 39 in August |
| 8 | cheapest weight loss telehealth australia | Perplexity 11 of 13 without ranking |
| 9 | best hair loss treatment australia | WebSearch #3; cited 7 of 21 |
| 10 | moshy promo code australia | WebSearch #3; Brave AU #9 |
| 11 | knose promo code | Bing AU #7 |
| 12 | moshy discount code | Brave AU #15; the highest-intent query |
| 13 | who underwrites knose pet insurance | Weak results, conflicting answers, a fact we hold |
| 14 | who underwrites pet insurance australia | The winning summary gets Knose's insurer wrong |
| 15 | everlab vs prenuvo | Thin results; live page (monetisation route unrecorded) |

**Not winnable within 12 months (INFERENCE):**
- Every "is X legit" and "X review" query.
- Unqualified "mosh" / "juniper" / "hims" code queries.
- Category head terms: best pet insurance, best home battery, home battery rebate, best weight loss treatment, best CRM, best newsletter platform, best affiliate programs, best independent comparison site.
- Any "Apollo" query, lost to the US company.
- Cost queries answered by sellers' own price pages.

## 7. Competitor analysis

**The major finance comparison sites are not in most Refer Labs categories (VERIFIED).**
- Finder, Canstar, Mozo (bought by Finder on 18 June 2026) and Money.com.au publish nothing on weight-loss or hair-loss telehealth, health diagnostics or business software.
- In health, the queries go to providers' own pages, thin independent sites, review platforms and Reddit.
- Refer Labs meets CHOICE, Canstar, Finder and SolarQuotes only in pet insurance and batteries.

**Trust architecture matrix** (● strong, ◐ partial, ○ absent). Evidence URLs are in `geo/05-competitors.md`.

| Site | Licence on page | Named, checkable people | Credentialed expert | Published method | Own data | Paid-placement disclosure | Media citations |
|---|---|---|---|---|---|---|---|
| **Refer Labs** | ◐ ABN only | ◐ first name, schema only | ○ | ◐ inside /about | ◐ /data, ~15 entries | ● | ○ |
| Finder | ● AFSL + ACL | ● | ◐ RG146 | ● | ● sentiment tracker | ● "default order can be influenced by commercial arrangements" | ● ABC |
| Canstar | ● AFSL/ACL 437917 | ● | ● research team | ● Star Ratings | ● ratings database | ● | ● ABC |
| CHOICE | ● nonprofit + AFSL subsidiary | ● fact-checked | ● NATA-accredited lab | ● 70/30 weighting | ● lab tests | ● affiliate commission disclosed | ● |
| SolarQuotes | ◐ | ● | ● chartered engineer | ● rules-based top 10 | ● 101,080 installer reviews | ● "$60 + GST … $65 + GST" per lead | ● ABC |
| Compare the Market | ● AFSL 422926 + "we do not compare all pet insurers" | ● | ◐ own executive | ○ | ◐ surveys | ◐ | ? |
| ProductReview | n/a | user reviewers | ○ | ◐ | ● 386 Juniper reviews | ◐ | ? |
| Healthline | n/a | ● | ● PhD/RD reviewer in schema | ◐ | ◐ | ● | ? |
| Small winners (Gridly, petreviews, weightlossmeds, solarguideaustralia) | ○ | ◐ unverifiable personas or none | ◐ asserted | ◐ | ○ | ◐ | ○ |

**Why engines cite them over Refer Labs (INFERENCE):**
- **The majors are vouched for from outside.** Each has something beyond its own say-so: a licence that resolves on the ASIC register, lab testing, a large user-review corpus, credentialed people who exist elsewhere, or its own data repeated by the ABC.
- **Refer Labs' trust signals all come from Refer Labs.** Engines have no reason to weight self-description highly.
- **The small sites ranking above Refer Labs on Bing AU win on format and scale, not trust.**
  - **petreviews.com.au** leads with the answer and asks the buyer's question as the first H2.
  - **Gridly** has 9,624 URLs, 5,348 of them generated installer pages.
  - **weightlossmeds.com.au** leads with a cheapest-first price table and names medicines, which Refer Labs cannot do.
  - None shows an ABN or a named, checkable reviewer. Several invent credentials, which Australian Consumer Law s29 forbids Refer Labs to copy.

**Copy within 12 months:**
- A full-named, accountable editor with a factual bio and outside profile.
- A standalone methodology page.
- A "we do not compare every provider" line on each hub.
- Dollar-level earnings disclosure where contracts allow (SolarQuotes).
- A public corrections log.
- A recurring data release.
- A real, disclosed, AHPRA-registered reviewer for health service copy.

**Beat them on:**
- Credentials that can be checked, versus asserted ones.
- Per-figure dates and sources.
- Primary-sourced facts that are wrong elsewhere. Pilot is still listed by MediCompare and TreatCompare; generic "PetSure underwrites 80%" claims.
- Exclusive codes with a verification trail (no Australian coupon site shows an ABN on a code page).
- Refusing self-issued ratings while Compare the Market, Compare Club and Money.com.au mark up ratings of themselves.

**Cannot match:**
- AFSL licensing within budget.
- CHOICE's lab and history.
- ProductReview or SolarQuotes review corpora.
- Awards programs (excluded by the no-ratings rule).
- Medicine-name keywords (excluded by TGA rules).
- Invented credentials (excluded by ACL).

## 8. E-E-A-T / trust audit

| Dimension | Current state (VERIFIED) | What would actually move it |
|---|---|---|
| **Experience** | /about says "desk research: we do not test or personally use most of what we cover". Honest, but it concedes the dimension. Some real first-hand evidence exists and is not shown: the founder completed Moshy's eligibility flow, prices were read off live checkouts, and the Knose PDS and ARTG records were read directly. | Show first-hand evidence where it exists. Say what was done ("we started a Moshy application on 26 Aug to read the price at the eligibility step"), not "tested". Store the evidence (section 12). Never claim to have used a product that was not used. |
| **Expertise** | No credentialed reviewer. Health service copy is written without clinical review. | One real, disclosed, AHPRA-registered practitioner reviewing health *service* comparisons (not prescribing content), paid per review and named with their AHPRA registration number. SPECULATIVE as a citation lever (no engine documents bylines as a factor). VERIFIED as a Google rater-guideline signal for health topics (YMYL). |
| **Authoritativeness** | No earned mentions; effectively zero editorial referring domains. | Partner corroboration, citable datasets and trade-press data stories (sections 11, 13, 14). |
| **Trustworthiness** | Strong on some points: no ratings, disclosure before the first link, dated figures, commercially inconvenient facts. Undermined by the overclaims in section 1, an incomplete earnings page, no footer entity or ABN, no reader contact route, and freshness signals that contradict each other (schema dates, a frozen sitemap lastmod, `/data`'s missed weekly promise). | Fix the overclaims first. Then publish a complete earnings disclosure, footer entity details, a reader contact route, a corrections log and consistent dates. |

**On the author question.** The site chose "no personal bylines" on 3 August. Since 26-27 August, though, 83 pages name Jarred as author in structured data, and his author page is noindex, first name only, 23 words. The code comments contradict each other about whether a bio is coming.

**Recommendation:**
- Pick one position and make schema match what readers see. The evidence points to a named, accountable editor.
- The reason is not that engines reward bylines (SPECULATIVE). It is that every competitor engines lean on shows a real, checkable person, and the persona sites that fake one are exactly what Refer Labs should be distinguishable from.
- This reverses an earlier decision, so it needs Jarred's sign-off.

## 9. Entity audit

**What Google and AI systems can currently resolve (VERIFIED):**
- The domain, and an Organization node with `legalName`, the ABN, founding date and `sameAs` (LinkedIn, Instagram, Facebook, the ABR entry).

**What they cannot resolve:**
- That "Refer Labs" the brand is Pepform Pty Ltd. There is no registered business name, and the registrant differs.
- Who runs it. The founder has no public profile beyond WHOIS, the ABR and /about.
- What category it is in (four descriptions across profiles).
- Any independent reference.

**Fixes, in order:**
1. **Register "Refer Labs" as a business name against ABN 32 660 008 159,** and move the domain registrant to Pepform Pty Ltd. auDA allows a company with an Australian presence to hold `.com.au`. The ABR record then links brand to company from a government source. (INFERENCE: the most authoritative identity signal available at no cost beyond the registration fee.)
2. **Separate the two dates everywhere.** "Pepform Pty Ltd, registered 2022; Refer Labs launched 2025." This applies to schema `foundingDate`, `llms.txt`, /about and LinkedIn.
3. **One category description and one slogan** across the site, LinkedIn ("Consumer comparison / online publishing"), Facebook ("Media/news company" or "Website") and ProductReview. Fix the two Facebook links that redirect.
4. **A founder profile.** A public LinkedIn with a real headline, linked from /about and from schema `founder` (a Person with `sameAs`). Only if Jarred agrees.
5. **Always write the full legal form,** "Pepform Pty Ltd (ABN 32 660 008 159) trading as Refer Labs", so engines do not merge it with pepform.co.uk.
6. **Wikidata:** only after at least one independent reference exists. Wikipedia notability and conflict-of-interest rules make a self-created article a liability.
7. **Ask partners to link to their Refer Labs page from their own press or partner pages.** Mosh has already announced the partnership, but only on Refer Labs' own Facebook page.

**Schema (VERIFIED defects, and what to keep):**
- **Keep:** Organization, WebSite, BreadcrumbList, FAQPage (where the Q&A is visible), Article on genuine articles.
- **Fix:**
  - `offerSchema()` puts the discount amount in `Offer.price` ("120" AUD for Moshy). That states the service costs $120.
  - `areaServed` lists the US and UK.
  - /moshy's page schema carries 8 keyword-stuffed `about` entries.
  - /moshy's `datePublished` of 2026-01-01 predates the page's first commit (29 June 2026).
- **Add:** Dataset on `/data` once it has a CSV and licence. Person for a real editor and reviewer, only matching what is visible. `reviewedBy` only where a real review happened.
- **Don't add:** AggregateRating or Review, ever. Schema "for AI". Google says it is not needed (VERIFIED), and Ahrefs' 1,885-page test showed no lift (vendor study).

## 10. Technical SEO / AI crawlability audit

**Healthy (VERIFIED):**
- All 174 sitemap URLs return 200.
- One h1 per page, self-canonical, OG image on every page.
- Money pages are server-rendered with the answer in the HTML.
- robots.txt allows 13 AI crawlers, including OAI-SearchBot, PerplexityBot and Claude-SearchBot/Claude-User. These are documented as the switch for search inclusion (VERIFIED).
- Mobile crawl on 14 September: 0 issues across 174 pages.
- LCP about 2.9s on mobile.

**Problems (VERIFIED unless marked):**

| Issue | Why it matters |
|---|---|
| Old SaaS API routes still deployed (admin, stripe, webhooks, referral, track-conversion and others). `/r/[code]` returns 200, is indexable and carries the homepage canonical. `/login` still pitches the old product. `/terms` keeps account, billing and user-content sections. | Old identity signals and an attack surface. They feed the "affiliate agency" description engines still serve. |
| Sitemap `lastmod` is hand-tiered, with nothing later than 19 August. Schema dates disagree with git. | Google says byline and last-modified dates should reflect real changes (VERIFIED). Engines see contradictory freshness. |
| `llms.txt` (51 KB) still carries the false "every code read off" line and a hedged "~US$29". It misses 13 sitemap URLs, including / and /faq. | Low stakes: Google ignores llms.txt (VERIFIED), and no other engine documents using it. Worth keeping accurate, not worth expanding. |
| More than 40 titles exceed 70 characters (/compare/website-builders is 102). | Truncation. A minor lever. |
| Weak internal links to the pages that win citations: `/moshy-vs-juniper` 5 links from page content, `/knose-vs-petsonme` 5, `/who-underwrites-pet-insurance-australia` 4, `/data` 0. `/how-we-make-money` has 84. | Link equity flows to pages that are never cited instead of the ones that are. |
| Header nav shows Weight Loss, Hair Loss, Solar & Energy, Business, Coming Soon. Pets, Deals and About are absent, but the site-navigation schema lists pets and deals. | Schema and visible navigation disagree. |
| Brave and the search-tool index serve stale agency copy, a removed rating and redirected URLs. | There is no documented recrawl-request tool for Brave (INFERENCE from the research). IndexNow reaches Bing and Yandex. A fresh sitemap and fixed redirects help discovery. |

## 11. Content architecture audit

**What works (VERIFIED from the August citations and the benchmark):**
- **Brand-pair pages** (`/moshy-vs-juniper`; `/mosh-vs-pilot` before retirement).
- **Cost and cheapest pages** (`/cheapest-weight-loss-telehealth-australia`, `/hair-loss-treatment-cost-australia`).
- **Owned-fact pages** (`/who-underwrites-pet-insurance-australia`).

**What does not:**
- Generic best-X pages with no brand pair (`/best-ai-sales-tools` 0 of 10).
- The 27 "Is There One?" code pages for brands where Refer Labs holds no code.
- The 55-page software cluster (one signup a year).

**Structural gaps:**
1. **No topic-level "facts" layer.** Facts live in page prose and a registry. A reader or engine cannot see a provider's facts, dates and sources in one place.
2. **Pages that win citations are leaves, not hubs.** Few links point to them.
3. **Discount-code pages carry the brand's head query** ("Moshy Discount Code Australia 2026") while the comparison lives elsewhere. The decision and the offer are split across URLs, which tilts the site's overall signal toward "coupon site".
4. **Retired partners leave comparison holes.** Pilot's retirement removed one of the two measured citation winners.

**Coupon-site vs decision-platform signals (VERIFIED counts):**

| Pushes toward "coupon site" | Pushes toward "decision platform" |
|---|---|
| 36 titles contain "Discount Code" or "Promo Code" | Homepage h1 "Big decisions, compared properly." |
| 27 of them are "Is There One?" pages with no code | No Deals link in the nav |
| The homepage top picks are offer cards; the newsletter is framed as "good offers first" | No ratings; a published ranking method on /about |
| The best earners are titled as code pages | Dated primary-source facts; earnings-balance notes |
| `/deals` is the footer's "Deals & Discount Codes" | Brand-pair and underwriter pages |

---

## 12. Verified-offer strategy

**Should Refer Labs build a proprietary "Verified by Refer Labs" system?** Yes, but only as a record of what was actually done. The proposed wording "Offer verified against provider checkout" cannot be printed today: no checkout test is performed or stored (VERIFIED).

**Three honest verification levels, stored per offer**

| Level | What was done | Evidence stored | What the page may say |
|---|---|---|---|
| **Published** | Read off a public page of the provider | Source URL plus captured copy or screenshot, date read | "Read on {brand}'s own page, {date}" |
| **Partner-confirmed** | Confirmed in writing by the partner; no public page | Email or contract excerpt kept privately, date | "Confirmed with {brand} in writing, {date}. Not published on {brand}'s site." |
| **Checkout-tested** | Code entered, or referral link followed, to the step where the discount shows | Screenshot of the applied discount, date, what was purchased or quoted | "Tested at {brand}'s checkout, {date}" |

**Rules:**
- **No "Active ✓" unless the offer was checked within a set window** (proposed: 30 days for health codes, 60 for others). After that, show "Last checked {date}; re-check due".
- **An expiry field.** Expired offers leave the page and the table automatically, and a build guard fails if a page still prints one.
- **A public changelog per offer:** "15% → 20%, read 3 Oct". This is the offer history no coupon site keeps.
- **The code sits inside the comparison.** On a brand page, the offer block follows the answer and the comparison facts, not the other way round (section 17).
- **Structured data:** a real `Offer` with `priceSpecification` or `discount` properly expressed, or no Offer at all. Never the discount in `price`.

**Is it a proprietary trust signal? (INFERENCE)**
- Yes, where it is exclusive and evidenced. No Australian coupon site shows an ABN, a per-code date and method, or a code history.
- Its AI-citation value depends on corroboration. Engines resolve "moshy discount code" between Moshy's own page and coupon sites (VERIFIED from the benchmark). The single highest-value step is Moshy and Mosh naming REFERRAL120 / REFERAL55 as a Refer Labs code on their own promo or `/llm` pages. Moshy's `/llm` page, written for AI assistants, currently names no code.

## 13. Original-data strategy

Journalists, other publishers and AI systems cite what they cannot get elsewhere: dated prices, regulator data recalculated, comparative terms. The data-and-PR research found coverage cites regulator numbers, long-running indexes and survey averages. None of it cited a discount code or a star rating (VERIFIED from the coverage read).

**Top assets** (1-5; for Difficulty and Cost, 5 is hardest or most expensive; for the rest, 5 is best)

| # | Asset | Difficulty | Cost | Defensibility | SEO | AI citation | PR | Revenue | Weeks | Label |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Home Battery Rebate Tracker:** Clean Energy Regulator postcode data (CC BY 4.0) plus rebate arithmetic for 10, 13.5 and 20 kWh, updated monthly | 3 | 1 | 3 | 5 | 5 | 5 | 5 | 3 | INFERENCE |
| 2 | **Telehealth price & terms register:** published price yes/no, fees, inclusions, minimum term, cancellation, practitioner AHPRA check. Includes non-partners. Services only, no medicines. | 3 | 1 | 4 | 4 | 5 | 4 | 5 | 4 | INFERENCE |
| 3 | **Pet insurance underwriter & PDS change register:** quarterly re-read, public changelog, including Trupanion's 23 March 2026 move to PetSure | 2 | 1 | 3 | 4 | 5 | 4 | 4 | 2 | INFERENCE |
| 4 | **Whole-body MRI & diagnostics price register:** dated prices; the current top page (MRIQ) was last updated June 2025 | 2 | 1 | 4 | 4 | 5 | 3 | 4 | 2 | INFERENCE |
| 5 | **`/data` as a citable dataset:** CSV, CC BY 4.0 licence, methodology, non-partner rows | 1 | 1 | 3 | 3 | 4 | 3 | 2 | 2 | INFERENCE |
| 6 | **Battery Quote Check:** reader-submitted quote PDFs, net $/kWh, published only once n ≥ 30 | 4 | 2 | 5 | 4 | 4 | 5 | 4 | 10 | SPECULATIVE |
| 7 | **Australia price-gap index, AU vs US:** LED masks, beauty devices, portable power | 2 | 1 | 3 | 4 | 4 | 4 | 4 | 3 | INFERENCE |
| 8 | **"Same policy, different badge":** PDS terms compared across PetSure-issued brands | 3 | 1 | 4 | 3 | 5 | 4 | 3 | 4 | INFERENCE |
| 9 | **Cancellation & auto-renew terms audit** across telehealth subscriptions | 3 | 1 | 4 | 3 | 4 | 5 | 3 | 4 | INFERENCE |
| 10 | **Offer history log:** every change to every partner offer, dated, with evidence level | 2 | 1 | 4 | 3 | 4 | 2 | 5 | 3 | INFERENCE |
| 11 | **Pet insurer complaints joined to underwriters** (AFCA data access and licence not yet checked) | 4 | 1 | 4 | 3 | 4 | 5 | 2 | 6 | SPECULATIVE |
| 12 | **Portable power $/Wh and sale-price tracker** | 2 | 1 | 2 | 4 | 4 | 2 | 4 | 2 | INFERENCE |

**Data constraints (VERIFIED):**
- **Free to reuse commercially with attribution:** Clean Energy Regulator, ABS and AIHW (CC BY 4.0), APRA (CC BY 3.0 AU).
- **Not on commercial pages:** OpenElectricity (non-commercial licence) and TGA/ARTG content (the TGA's copyright bars commercial reproduction).
- **Check first:** AEMO has its own permissions notice.
- **Two things have changed:**
  - **The Knose underwriter fact is no longer only ours.** insu.au names Knose's underwriter as Allied World → Pacific International from 1 March 2023. Outreach must not say "everyone gets this wrong". (Check insu.au is unconnected to Refer Labs.)
  - **Don't build a battery *price* index.** Solar Choice has run one since 2012, and SolarQuotes owns the press voice. The open ground is rebate arithmetic plus reader quotes.

## 14. Digital PR strategy

**12-month plan** (effort 1-5; cash in AUD). Expected result (INFERENCE): 4-10 trade-press mentions and 1-3 national mentions in year one.

| Quarter | Tactic | Effort | Cash | Authority impact | AI citation potential | Time to impact |
|---|---|---|---|---|---|---|
| Q4 2026 | Make `/data` a dataset (CSV, licence, methodology); launch Rebate Tracker v1 | 3 | 0 | Medium | High | 1-3 mo |
| Q4 2026 | Journalist request services: SourceBottle (active, Australian call-outs live), HARO (relaunched free by Featured.com), Qwoted free tier | 2 | 0-300 | Low-Medium | Medium | 1-6 mo |
| Q4 2026 | Corrections to publishers still listing Pilot (weightloss.com.au, MediCompare, TreatCompare), offering the dated source | 1 | 0 | Low | Medium | 1-3 mo |
| Q4 2026 | Partner corroboration: Mosh and Moshy name the codes and link to Refer Labs from promo or `/llm` pages; partners reference the trackers | 2 | 0 | **High** (earned, relevant) | **High** | 1-2 mo |
| Nov 2026 | Underwriter register pitch to Insurance News, Vet Practice and Partners in Practice | 2 | 0 | Medium | Medium | 2-4 mo |
| Nov 2026 | Rebate maths ahead of the next rebate step-down to ABC, pv magazine, RenewEconomy and Guardian Australia (confirm the date with DCCEEW first) | 3 | 0 | High | High | 1-3 mo |
| Q1 2027 | Telehealth transparency data story to health trade press (Medical Republic, newsGP, Pulse+IT, AusDoc); a vet-cost story pegged to the ABS CPI release | 3 | 0 | Medium-High | High | 2-4 mo |
| Q1 2027 | Podcasts: Solar Insiders, Aussie Firebug, Rask's Australian Finance Podcast | 3 | 0 | Medium | Medium | 3-6 mo |
| Q2 2027 | Flagship: "State of Australian consumer pricing transparency" with stated samples and findings that don't suit partners; one Medianet list (from $125 + GST) plus direct pitches | 4 | 125-600 | High | High | 1-3 mo |
| Q2 2027 | End-of-financial-year software pricing audit (Flying Solo, Startup Daily, SmartCompany guest piece) | 3 | 0 | Low-Medium | Low | 2-4 mo |
| Q3 2027 | One-year anniversary of the log; offer the underwriter table to ABC and CHOICE explainers; review and retire the two weakest assets | 3 | 0 | Medium | Medium | 1-3 mo |

**Total cash:** about A$150-1,500 for the year, plus 3-5 hours a week.

**Never:**
- Buy links, sponsored posts or guest-post networks.
- Run surveys with no stated sample size.
- Pitch discount codes to health or energy desks.
- Send AI-written pitches (some outlets refuse them).
- Post links in Whirlpool, OzBargain or r/AusFinance.
- Create a Wikipedia article about Refer Labs.
- Name medicines anywhere, including CSV headers.

## 15. AI citation strategy by engine

| Engine | Documented retrieval | What to do | Label |
|---|---|---|---|
| **Google AI Overviews / AI Mode** | Core ranking plus query fan-out. Must be indexed and snippet-eligible and not opted out through the Search Console control (default included since 31 Aug 2026). | Rank for the fan-out sub-queries: cost, eligibility, "vs", underwriter. Answer-first pages. One topic per URL. No AI-specific markup. Watch Search Console's generative AI performance report (June 2026). | VERIFIED mechanism; INFERENCE tactics |
| **ChatGPT search** | Bing named as a search partner; queries rewritten; OAI-SearchBot allowed | Bing Webmaster AI Performance as the primary KPI; IndexNow on every change; Bing's documented extraction guidance (facts stated directly, consistent entity names, comparison tables, Q&A pairs, essentials near the top); remove redirecting URLs from anything we control | VERIFIED (Bing guidance Oct 2025 / Feb 2026) |
| **Claude** | Brave Search; Claude-SearchBot and Claude-User allowed | Brave has no webmaster tools, so discoverability is through links and crawling. Earned links matter more here. Re-measure Brave AU from a clean IP monthly. | VERIFIED provider; INFERENCE tactics |
| **Perplexity** | PerplexityBot plus its own index | Already cites cost pages without ranking. Keep cost and cheapest pages exact, dated and sourced. | OBSERVED (Aug); INFERENCE |
| **All engines** | Cite third-party coverage more than brand-owned content; weakly correlated with backlinks, more with brand mentions | Partner corroboration, datasets, trade-press stories | STRONGLY SUPPORTED (Toronto paper; Ahrefs vendor study) |

**Content rules for being cited (INFERENCE, grounded in the GEO paper at KDD 2024 and Microsoft's guidance):**
1. The first paragraph after the h1 states the answer, with the figure and its date. The site already enforces this with `check-answer-slot`.
2. The buyer's question appears verbatim as an H2.
3. Every number carries its source and read date.
4. Include the commercially inconvenient fact.
5. A comparison table where a comparison exists.

The GEO paper's +22-41% visibility gain from statistics, quotations and cited sources was measured in a lab on 2023-era engines. Treat it as direction, not magnitude.

## 16. Recommended website architecture

```
Vertical hub (Health services · Pet insurance · Home energy · Tools)
 ├─ Provider page (facts, dated sources, offer if genuine, alternatives)
 │   ├─ "{Provider} vs {Provider}" pages (only real, searched pairs)
 │   ├─ "{Provider} cost / what you pay" (if not answered on the provider page)
 │   └─ Offer history (section on the provider page, not a separate URL)
 ├─ Cost / cheapest guide for the vertical
 ├─ Eligibility / how it works guide
 ├─ Owned-fact page(s) (underwriters, rebate maths, terms register)
 └─ Dataset (CSV + methodology), linked from every page that uses its figures
Trust layer (site-wide): /about (identity), /methodology, /how-we-make-money (complete), /corrections, /data (datasets), /partners (current commercial relationships)
```

**Internal linking rules:**
1. Every provider page links to its "vs" pages, the vertical's cost guide and the owned-fact page.
2. Every "vs" page links to both provider pages and the cost guide.
3. Every page that uses a dataset figure links to the dataset row it came from.
4. Hub pages link to the pages that win citations first (the pair and cost pages), not to the earnings page.
5. `/how-we-make-money` is linked from disclosures, not repeated 84 times in page content.
6. No new page without a named owned fact and a monetisation route (the existing CLAUDE.md rule).

**Do not build:**
- Programmatic pages for every provider pair, suburb or fan-out variant. Google names this as scaled content abuse (VERIFIED).
- More "Is There One?" code pages.

## 17. Exact website changes

### Homepage
- **Keep** the h1 "Big decisions, compared properly." and search.
- **Replace the "This month's top picks" offer cards** with three vertical entry cards (Health services, Pet insurance, Home energy). Each carries one owned, dated fact, e.g. "Two of the pet insurers we cover share one underwriter", and a link to the vertical. Offers appear inside those cards as a secondary line.
- **Add a "How we check" strip** under the hero: dated sources, three verification levels, no paid rankings, no ratings. Each links to /methodology.
- **Reframe the newsletter** from "Know about the good offers first" to price and terms changes ("When a price, underwriter or offer changes, we tell you").
- **Footer:** "Pepform Pty Ltd (ABN 32 660 008 159) trading as Refer Labs", a reader contact route and a corrections link.

### About page
- **Identity:** full legal form; "company registered 2022, Refer Labs launched 2025"; Melbourne (Victoria); a named editor with a factual bio and outside profile (if approved).
- **What we do and do not do:** keep "desk research", and add the first-hand checks that genuinely happen.
- **Move the ranking method out** to /methodology.

### Methodology page (new `/methodology`, currently 404)
- How providers are chosen for coverage, including "we do not compare every provider" per vertical.
- What is compared per vertical: named fields.
- Where facts come from: primary sources only, and how dates are recorded.
- The three offer verification levels, with re-check windows and expiry.
- How commercial relationships interact with coverage and order.
- Corrections policy and link to the log.
- What we will never publish: ratings, medicine names, invented testimonials.
- Point Organization `publishingPrinciples` here.

### Provider pages
Order on the page:
1. Answer paragraph: what the service is, what it costs and the date read.
2. Key facts table: price, what is included, eligibility, cancellation, practitioner registration, underwriter where relevant. Each fact carries its source and date.
3. Who it suits and who it doesn't.
4. Offer block with its verification level and history.
5. Alternatives, linking to "vs" pages.
6. FAQ.
7. Disclosure.

The discount stays in the title only where it is genuine and exclusive (the existing rule). The h1 leads with the decision fact where the page's query is not a code query.

### Comparison pages
- Answer-first verdict, framed as "for whom", not a winner.
- Side-by-side facts table with dates and sources.
- The commercially inconvenient fact, stated explicitly.
- Offers for either side, with verification levels.
- Links to both provider pages and the cost guide.
- A "What changed" changelog.

### Discount pages
- **Retire or retitle the 27 "Is There One?" pages** toward what the searcher can actually do: pricing, free plan and trial ("Pipedrive pricing in AUD: AU$19/seat, read 5 Sep"). Where the page ranks for code queries, keep one plain line: "No public discount code exists; we checked on {date}".
- **Genuine code pages** show the code, what it discounts, eligibility, verification level, date, expiry, history, and the comparison link above the code.

### Author and reviewer system
Needs a decision.
- **Either** schema stops naming an author readers cannot see,
- **or** (recommended) a visible "Researched and checked by Jarred Krowitz, Editor" line with a real bio page (indexable, with `sameAs` LinkedIn). Plus, for health service comparisons, "Reviewed by {name}, AHPRA reg. {no.}, on {date}" only when a real paid review happened.

### Navigation
- **Top-level:** Health services (weight loss, hair loss, men's health, diagnostics), Pet insurance, Home energy, Tools (software, affiliate programs), plus "How we check".
- Move "Coming soon" into the hubs as status notes. The user asked to keep Coming Soon in the primary nav, so this needs a decision.
- Deals stays out of the primary nav; it lives inside hubs and the footer.

### Internal linking
- Add links into `/moshy-vs-juniper`, `/knose-vs-petsonme` and `/who-underwrites-pet-insurance-australia` from their hubs, provider pages and cost guides. Target: at least 15 links from page content each.
- Link `/data` from every page using its figures.

### Structured data
- Fix `Offer.price`, `areaServed`, `about` stuffing and the dates that predate first commits.
- Add Dataset on `/data`; Person for real editor and reviewer; `publishingPrinciples` pointing to /methodology.
- Keep SiteNavigation in step with the visible nav.

### Trust signals
- Remove "Active ✓" unless the offer was checked within its window.
- Correct `/disclaimer` and `llms.txt` to the three verification levels.
- Complete `/how-we-make-money`: affiliate commissions, lead fees, paid placements on `/for-business`, with a named partner list on `/partners`.
- Add a corrections log, a reader contact route, and footer entity and ABN.
- Retire old SaaS residue: API routes, `/r/[code]`, the `/login` pitch copy, and the legacy `/terms` sections.

---

## 18. Top 100 AI queries

**Scoring (INFERENCE):** 1-5 each for commercial intent (I), revenue potential (R), likelihood an AI answer cites a source (A), winnability (W, inverse of competition and authority difficulty) and owned-fact potential (F). **Total = I + R + A + 2×W + F**, maximum 30. Winnability counts double because a query that cannot be won in 12 months earns nothing. Horizon: **Immediate** = page exists and already ranks or is cited, or is one fix away; **Medium** = needs a fact, links or corroboration; **Long** = needs authority, data or coverage.

| # | Query | Vertical | Type | I | R | A | W | F | Total | Horizon |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mosh hair discount code australia | Hair loss | code | 5 | 5 | 4 | 5 | 4 | **28** | Immediate |
| 2 | moshy vs juniper | Weight loss | vs | 4 | 5 | 5 | 5 | 4 | **28** | Immediate |
| 3 | moshy vs juniper australia | Weight loss | vs | 4 | 5 | 5 | 5 | 4 | **28** | Immediate |
| 4 | cheapest weight loss telehealth australia | Weight loss | cost | 4 | 5 | 5 | 4 | 5 | **27** | Immediate |
| 5 | hair loss treatment cost australia | Hair loss | cost | 4 | 5 | 5 | 4 | 5 | **27** | Immediate |
| 6 | juniper vs moshy cost | Weight loss | vs | 4 | 5 | 5 | 4 | 5 | **27** | Immediate |
| 7 | most affordable hair loss telehealth australia | Hair loss | cost | 4 | 5 | 5 | 4 | 5 | **27** | Immediate |
| 8 | weight loss telehealth cost australia | Weight loss | cost | 4 | 5 | 5 | 4 | 5 | **27** | Immediate |
| 9 | mosh referral code | Hair loss | code | 5 | 5 | 4 | 4 | 4 | **26** | Immediate |
| 10 | mosh vs dense | Hair loss | vs | 4 | 4 | 4 | 5 | 4 | **26** | Immediate |
| 11 | moshy promo code australia | Weight loss | code | 5 | 5 | 4 | 4 | 4 | **26** | Immediate |
| 12 | moshy referral code | Weight loss | code | 5 | 5 | 4 | 4 | 4 | **26** | Immediate |
| 13 | apollo energy group $500 off | Energy | code | 5 | 5 | 3 | 4 | 4 | **25** | Immediate |
| 14 | battery rebate after 14kwh | Energy | owned fact | 3 | 4 | 5 | 4 | 5 | **25** | Immediate |
| 15 | cheaper home batteries rebate how much | Energy | rebate | 4 | 5 | 5 | 3 | 5 | **25** | Medium |
| 16 | home battery rebate by state | Energy | rebate | 4 | 5 | 5 | 3 | 5 | **25** | Medium |
| 17 | how much does moshy cost per month | Weight loss | cost | 4 | 5 | 5 | 3 | 5 | **25** | Medium |
| 18 | how much is mosh per month | Hair loss | cost | 4 | 5 | 5 | 3 | 5 | **25** | Medium |
| 19 | knose discount code | Pets | code | 5 | 4 | 4 | 4 | 4 | **25** | Immediate |
| 20 | knose promo code | Pets | code | 5 | 4 | 4 | 4 | 4 | **25** | Immediate |
| 21 | knose vs petsonme | Pets | vs | 4 | 4 | 4 | 4 | 5 | **25** | Immediate |
| 22 | moshy $120 off | Weight loss | code | 5 | 5 | 3 | 4 | 4 | **25** | Immediate |
| 23 | moshy eligibility | Weight loss | eligibility | 4 | 5 | 4 | 4 | 4 | **25** | Immediate |
| 24 | pet insurance underwriters australia 2026 | Pets | register | 3 | 4 | 5 | 4 | 5 | **25** | Medium |
| 25 | petsure pet insurance brands list | Pets | owned fact | 3 | 4 | 5 | 4 | 5 | **25** | Medium |
| 26 | what happened to pilot hair loss australia | Hair loss | owned fact | 3 | 3 | 4 | 5 | 5 | **25** | Immediate |
| 27 | which weight loss telehealth publishes prices | Weight loss | register | 3 | 3 | 4 | 5 | 5 | **25** | Medium |
| 28 | who underwrites knose pet insurance | Pets | owned fact | 3 | 4 | 5 | 4 | 5 | **25** | Immediate |
| 29 | who underwrites pet insurance australia | Pets | owned fact | 3 | 4 | 5 | 4 | 5 | **25** | Immediate |
| 30 | best weight loss telehealth australia | Weight loss | best | 4 | 5 | 5 | 3 | 4 | **24** | Immediate |
| 31 | home battery installs by postcode australia | Energy | register | 2 | 3 | 4 | 5 | 5 | **24** | Medium |
| 32 | home battery payback australia | Energy | cost | 4 | 5 | 5 | 3 | 4 | **24** | Medium |
| 33 | home battery rebate calculator | Energy | rebate | 4 | 5 | 4 | 3 | 5 | **24** | Medium |
| 34 | moshy discount code | Weight loss | code | 5 | 5 | 4 | 3 | 4 | **24** | Immediate |
| 35 | omnilux led mask australia price | Skin | cost | 4 | 3 | 4 | 4 | 5 | **24** | Immediate |
| 36 | petsonme discount code | Pets | code | 5 | 3 | 4 | 4 | 4 | **24** | Immediate |
| 37 | refer labs | Brand | brand | 2 | 3 | 4 | 5 | 5 | **24** | Immediate |
| 38 | who underwrites petsonme | Pets | owned fact | 3 | 3 | 5 | 4 | 5 | **24** | Immediate |
| 39 | best hair loss treatment australia | Hair loss | best | 4 | 5 | 5 | 3 | 3 | **23** | Immediate |
| 40 | home battery rebate australia 2026 | Energy | rebate | 4 | 5 | 5 | 2 | 5 | **23** | Medium |
| 41 | midoc medical certificate price | Men's health | cost | 4 | 3 | 4 | 4 | 4 | **23** | Medium |
| 42 | moshy vs gp | Weight loss | vs | 3 | 4 | 4 | 4 | 4 | **23** | Immediate |
| 43 | portable power station australia price per wh | Energy | register | 3 | 3 | 4 | 4 | 5 | **23** | Medium |
| 44 | telehealth vs gp weight loss cost australia | Weight loss | cost | 3 | 4 | 4 | 4 | 4 | **23** | Medium |
| 45 | weight loss telehealth cancellation terms | Weight loss | terms | 3 | 3 | 4 | 4 | 5 | **23** | Medium |
| 46 | why are led masks more expensive in australia | Skin | owned fact | 3 | 3 | 4 | 4 | 5 | **23** | Medium |
| 47 | australian telehealth price transparency | Data | register | 2 | 3 | 4 | 4 | 5 | **22** | Long |
| 48 | do i qualify for weight loss treatment australia | Weight loss | eligibility | 3 | 4 | 5 | 3 | 4 | **22** | Medium |
| 49 | everlab vs i-screen | Diagnostics | vs | 4 | 2 | 4 | 4 | 4 | **22** | Medium |
| 50 | everlab vs prenuvo | Diagnostics | vs | 4 | 2 | 4 | 4 | 4 | **22** | Medium |
| 51 | foreo luna vs ufo | Skin | vs | 3 | 3 | 4 | 4 | 4 | **22** | Medium |
| 52 | home battery cost australia 2026 | Energy | cost | 4 | 5 | 5 | 2 | 4 | **22** | Medium |
| 53 | is refer labs independent | Brand | trust | 2 | 3 | 4 | 4 | 5 | **22** | Medium |
| 54 | mosh discount code | Hair loss | code | 5 | 5 | 4 | 2 | 4 | **22** | Medium |
| 55 | mosh vs hims australia | Hair loss | vs | 4 | 4 | 4 | 3 | 4 | **22** | Medium |
| 56 | pipedrive price australia | Software | cost | 4 | 3 | 4 | 3 | 5 | **22** | Medium |
| 57 | portable vs installed home battery rebate | Energy | owned fact | 3 | 3 | 4 | 4 | 4 | **22** | Medium |
| 58 | prenuvo australia cost | Diagnostics | cost | 4 | 2 | 5 | 3 | 5 | **22** | Medium |
| 59 | tesla powerwall alternatives australia | Energy | alternatives | 4 | 5 | 4 | 3 | 3 | **22** | Medium |
| 60 | whole body mri australia cost | Diagnostics | cost | 4 | 2 | 5 | 3 | 5 | **22** | Medium |
| 61 | juniper free consultation | Weight loss | offer | 4 | 3 | 4 | 3 | 4 | **21** | Medium |
| 62 | led face mask australia price | Skin | cost | 4 | 3 | 4 | 3 | 4 | **21** | Medium |
| 63 | moshy alternatives | Weight loss | alternatives | 4 | 4 | 4 | 3 | 3 | **21** | Medium |
| 64 | pet insurance exclusions australia | Pets | how | 3 | 3 | 5 | 3 | 4 | **21** | Medium |
| 65 | pet insurance waiting periods australia | Pets | how | 3 | 3 | 5 | 3 | 4 | **21** | Medium |
| 66 | best home battery australia | Energy | best | 5 | 5 | 5 | 1 | 3 | **20** | Long |
| 67 | best pet insurance australia | Pets | best | 5 | 5 | 5 | 1 | 3 | **20** | Long |
| 68 | everlab cost australia | Diagnostics | cost | 4 | 2 | 4 | 3 | 4 | **20** | Medium |
| 69 | is telehealth cheaper than a gp for men's health | Men's health | cost | 3 | 3 | 4 | 3 | 4 | **20** | Medium |
| 70 | online hair loss treatment australia | Hair loss | how | 3 | 4 | 4 | 3 | 3 | **20** | Medium |
| 71 | online weight loss doctor australia | Weight loss | how | 3 | 4 | 4 | 3 | 3 | **20** | Medium |
| 72 | skincare cost per use | Skin | cost | 2 | 2 | 4 | 4 | 4 | **20** | Medium |
| 73 | superfiliate discount code | Software | code | 5 | 4 | 3 | 2 | 4 | **20** | Medium |
| 74 | weight loss telehealth for men australia | Weight loss | best | 3 | 4 | 4 | 3 | 3 | **20** | Medium |
| 75 | weight loss telehealth for women australia | Weight loss | best | 3 | 4 | 4 | 3 | 3 | **20** | Medium |
| 76 | does a home battery work in a blackout | Energy | how | 3 | 4 | 5 | 2 | 3 | **19** | Long |
| 77 | juniper discount code | Weight loss | code | 5 | 3 | 4 | 2 | 3 | **19** | Medium |
| 78 | leadpages discount code | Software | code | 5 | 3 | 3 | 2 | 4 | **19** | Medium |
| 79 | online men's health clinics compared australia | Men's health | vs | 3 | 3 | 4 | 3 | 3 | **19** | Medium |
| 80 | refer labs review | Brand | trust | 2 | 3 | 4 | 3 | 4 | **19** | Medium |
| 81 | unbounce discount code | Software | code | 5 | 3 | 3 | 2 | 4 | **19** | Medium |
| 82 | what size home battery do i need | Energy | how | 3 | 4 | 5 | 2 | 3 | **19** | Long |
| 83 | apollo energy group review | Energy | trust | 4 | 5 | 4 | 1 | 3 | **18** | Long |
| 84 | best online weight loss program australia | Weight loss | best | 4 | 4 | 5 | 1 | 3 | **18** | Long |
| 85 | is mosh legit | Hair loss | trust | 4 | 4 | 5 | 1 | 3 | **18** | Long |
| 86 | is moshy legit | Weight loss | trust | 4 | 4 | 5 | 1 | 3 | **18** | Long |
| 87 | is pet insurance worth it australia | Pets | decision | 3 | 3 | 5 | 2 | 3 | **18** | Long |
| 88 | is whole body mri worth it australia | Diagnostics | decision | 3 | 2 | 5 | 2 | 4 | **18** | Long |
| 89 | online medical certificate australia cost | Men's health | cost | 3 | 3 | 4 | 2 | 4 | **18** | Medium |
| 90 | virtual power plant australia | Energy | how | 3 | 3 | 5 | 2 | 3 | **18** | Long |
| 91 | knose pet insurance review | Pets | trust | 4 | 4 | 4 | 1 | 3 | **17** | Long |
| 92 | affiliate programs australia | Affiliate | best | 3 | 2 | 4 | 2 | 3 | **16** | Long |
| 93 | beehiiv vs substack | Software | vs | 3 | 3 | 4 | 1 | 4 | **16** | Long |
| 94 | best crm for small business australia | Software | best | 4 | 3 | 4 | 1 | 3 | **16** | Long |
| 95 | biological age test australia | Diagnostics | how | 3 | 2 | 4 | 2 | 3 | **16** | Long |
| 96 | receding hairline treatment australia | Hair loss | how | 3 | 3 | 4 | 2 | 2 | **16** | Long |
| 97 | recurring affiliate programs | Affiliate | best | 3 | 2 | 4 | 2 | 3 | **16** | Long |
| 98 | best independent comparison site australia | Brand | best | 2 | 4 | 4 | 1 | 3 | **15** | Long |
| 99 | best newsletter platform | Software | best | 3 | 3 | 4 | 1 | 3 | **15** | Long |
| 100 | hims australia discount code | Hair loss | code | 5 | 2 | 4 | 1 | 2 | **15** | Long |

### Top 20 immediate targets

| # | Query | Total |
|---|---|---|
| 1 | mosh hair discount code australia | 28 |
| 2 | moshy vs juniper | 28 |
| 3 | moshy vs juniper australia | 28 |
| 4 | cheapest weight loss telehealth australia | 27 |
| 5 | hair loss treatment cost australia | 27 |
| 6 | juniper vs moshy cost | 27 |
| 7 | most affordable hair loss telehealth australia | 27 |
| 8 | weight loss telehealth cost australia | 27 |
| 9 | mosh referral code | 26 |
| 10 | mosh vs dense | 26 |
| 11 | moshy promo code australia | 26 |
| 12 | moshy referral code | 26 |
| 13 | apollo energy group $500 off | 25 |
| 14 | battery rebate after 14kwh | 25 |
| 15 | knose discount code | 25 |
| 16 | knose promo code | 25 |
| 17 | knose vs petsonme | 25 |
| 18 | moshy $120 off | 25 |
| 19 | moshy eligibility | 25 |
| 20 | what happened to pilot hair loss australia | 25 |

### Top 20 medium-term targets

| # | Query | Total |
|---|---|---|
| 1 | cheaper home batteries rebate how much | 25 |
| 2 | home battery rebate by state | 25 |
| 3 | how much does moshy cost per month | 25 |
| 4 | how much is mosh per month | 25 |
| 5 | pet insurance underwriters australia 2026 | 25 |
| 6 | petsure pet insurance brands list | 25 |
| 7 | which weight loss telehealth publishes prices | 25 |
| 8 | home battery installs by postcode australia | 24 |
| 9 | home battery payback australia | 24 |
| 10 | home battery rebate calculator | 24 |
| 11 | home battery rebate australia 2026 | 23 |
| 12 | midoc medical certificate price | 23 |
| 13 | portable power station australia price per wh | 23 |
| 14 | telehealth vs gp weight loss cost australia | 23 |
| 15 | weight loss telehealth cancellation terms | 23 |
| 16 | why are led masks more expensive in australia | 23 |
| 17 | do i qualify for weight loss treatment australia | 22 |
| 18 | everlab vs i-screen | 22 |
| 19 | everlab vs prenuvo | 22 |
| 20 | foreo luna vs ufo | 22 |

### Top 20 long-term targets

| # | Query | Total |
|---|---|---|
| 1 | australian telehealth price transparency | 22 |
| 2 | best home battery australia | 20 |
| 3 | best pet insurance australia | 20 |
| 4 | does a home battery work in a blackout | 19 |
| 5 | what size home battery do i need | 19 |
| 6 | apollo energy group review | 18 |
| 7 | best online weight loss program australia | 18 |
| 8 | is mosh legit | 18 |
| 9 | is moshy legit | 18 |
| 10 | is pet insurance worth it australia | 18 |
| 11 | is whole body mri worth it australia | 18 |
| 12 | virtual power plant australia | 18 |
| 13 | knose pet insurance review | 17 |
| 14 | affiliate programs australia | 16 |
| 15 | beehiiv vs substack | 16 |
| 16 | best crm for small business australia | 16 |
| 17 | biological age test australia | 16 |
| 18 | receding hairline treatment australia | 16 |
| 19 | recurring affiliate programs | 16 |
| 20 | best independent comparison site australia | 15 |

Long-term targets are mostly category head terms and trust queries. They are listed so effort is not spent on them early, not because they are close.

## 19. Top 20 priorities

| # | Priority | Label |
|---|---|---|
| 1 | Remove the overclaims: "Active ✓", "read off own page" for 5 offers, the hidden schema author, Offer.price misuse, dates earlier than first commits | VERIFIED defects |
| 2 | Offer verification levels with stored evidence, re-check windows, expiry and a guard | INFERENCE |
| 3 | Partner corroboration: Mosh and Moshy name the codes and link to Refer Labs (promo and `/llm` pages) | STRONGLY SUPPORTED (earned coverage) |
| 4 | Entity basics: register the business name; move the domain registrant; one founding story; consistent profiles | VERIFIED gaps |
| 5 | Named accountable editor with a real bio; visible and in schema (decision) | INFERENCE |
| 6 | `/data` becomes a dataset (CSV, CC BY 4.0, methodology, non-partners) | INFERENCE |
| 7 | Standalone /methodology and a complete /how-we-make-money plus /partners | VERIFIED gaps |
| 8 | Internal links into the pages that win citations (pair, cost, underwriter pages) | VERIFIED gap; INFERENCE impact |
| 9 | Retire old SaaS residue (API routes, `/r/[code]`, legacy `/terms`, `/login` pitch) | VERIFIED |
| 10 | Telehealth price & terms register (services only) | INFERENCE |
| 11 | Home Battery Rebate Tracker on Clean Energy Regulator open data | INFERENCE |
| 12 | Pet insurance underwriter & PDS change register | INFERENCE |
| 13 | Retitle or retire the 27 "Is There One?" pages | INFERENCE |
| 14 | Measurement: Bing AI Performance, Search Console generative AI report, a fixed monthly prompt panel | VERIFIED tools |
| 15 | New brand-pair pages only where searched: knose vs petsonme expansion, everlab vs i-screen, mosh vs hims (only if the monetisation route is clear) | INFERENCE |
| 16 | Journalist request services and corrections outreach (Pilot listings) | INFERENCE |
| 17 | Disclosed AHPRA-registered reviewer for health service comparisons | SPECULATIVE as a citation lever; VERIFIED rater-guideline signal |
| 18 | Homepage and nav reframed around verticals and "How we check" | INFERENCE |
| 19 | Schema fixes and Dataset/Person additions (no schema-for-AI) | VERIFIED defects |
| 20 | Hold software at maintenance; stop new software pages | INFERENCE (1 signup / 12 months) |

## 20. 30 / 60 / 90-day roadmap

**Days 0-30 (P0 and P1)**
- **Trust:** remove "Active ✓" where unchecked; correct `/disclaimer` and `llms.txt`; fix `Offer.price`, `areaServed`, `about` stuffing and bad dates; footer entity, ABN and contact route; complete `/how-we-make-money` and add `/partners`.
- **Verification:** add `verificationLevel`, `evidenceUrl`, `evidenceCapturedAt` and `expiresOn` fields plus a freshness guard over DEALS.
- **Identity:** decide the editor question; register the business name; start the registrant transfer; align founding dates and profile categories.
- **Partners:** send the corroboration request to Mosh and Moshy (named code, link, `/llm` page).
- **Cleanup:** retire the old SaaS routes and `/terms` legacy sections (API deletion is awaiting permission from the last session).
- **Measurement baseline:** Bing AI Performance export, Search Console generative AI report, and the first run of a 100-prompt panel on ChatGPT, Perplexity, Claude and AI Mode, logged by hand.

**Days 31-60 (P1)**
- `/methodology` live; `/data` as a dataset with CSV, licence and methodology.
- Internal links into pair, cost and underwriter pages.
- Retitle the first 10 "Is There One?" pages.
- Pet insurance underwriter & PDS register v1; journalist request services set up; Pilot corrections sent.

**Days 61-90 (P2)**
- Telehealth price & terms register v1; Home Battery Rebate Tracker v1.
- Homepage vertical cards and "How we check" strip; nav restructure (after the Coming Soon decision).
- First trade-press pitches (Insurance News, Vet Practice, pv magazine).
- Second prompt-panel run.

## 21. 12-month authority roadmap

| Months | Milestone | Success signal |
|---|---|---|
| 1-3 | Trust layer corrected; verification levels live; `/data` dataset; editor identity; partner corroboration | Partner pages link to Refer Labs; zero overclaims in a re-audit |
| 4-6 | Three vertical registers live (telehealth, pet underwriters, rebate tracker); first trade-press mentions | 2-4 trade mentions; unbranded AI citation share above 8.4% in health; the first pet or energy citation |
| 7-9 | Flagship transparency report; podcasts; AHPRA reviewer (if approved) | 1 national mention; Brave AU and Bing top 10 for the underwriter and rebate queries |
| 10-12 | Anniversary of the log; retire the weakest assets; decide on software | Refer Labs cited for at least 3 non-health unbranded prompts; referring domains from 0 to at least 10 editorial |

## 22. Authority flywheel

```
Consumer query ──► useful comparison (dated facts) ──► verified offer ──► conversion
      ▲                                                                     │
      │                                                                     ▼
 more traffic ◄── AI citations ◄── entity authority ◄── media & partner citations ◄── original data (registers, trackers)
```

**Where it is broken today (VERIFIED):**
1. **Offer → data:** conversions are not captured by page (`/go/` logs nothing), and offer history is not recorded. The business learns nothing it can publish.
2. **Data → media:** `/data` is not a dataset, so nothing is citable.
3. **Media → entity:** no earned mentions exist, and brand identity is inconsistent across registries and profiles.
4. **Entity → AI citations:** engines serve stale identity (agency copy, the removed rating), so even when retrieved, Refer Labs is described wrongly.
5. **Comparison → verified offer:** verification overstates, which puts the trust the whole loop depends on at risk.

**Repair order:** 5 → 2 → 4 → 3 → 1.

## 23. KPIs and measurement framework

| KPI | Source | Cadence | Year-one target (INFERENCE) |
|---|---|---|---|
| AI citations and cited pages | Bing Webmaster AI Performance | Weekly | Up, with non-health pages appearing |
| Generative AI impressions and clicks | Search Console generative AI report | Monthly | Baseline then up |
| Unbranded citation share (fixed 100-prompt panel × 4 engines) | Manual panel log | Monthly | Health above 15%; pets and energy above 5% |
| Top-10 presence on the 20 immediate queries (Brave AU, Bing AU, Google AU) | Clean-IP rank checks | Monthly | 15 of 20 |
| Editorial referring domains | Search Console Links | Monthly | At least 10 |
| Partner and third-party mentions | Manual search log | Monthly | At least 6 |
| Dataset citations and downloads | Server logs, mention search | Monthly | At least 3 citations |
| Offers past their re-check window | Build guard | Every build | 0 |
| Conversions by page and vertical | Partner dashboards and `/go/` logging | Monthly | Health up; pets and energy first conversions |

**Measurement discipline (from CLAUDE.md, VERIFIED past failures):**
- Check edit dates on both sides of any before/after.
- Read three pages by hand before reporting a surprisingly bad number.
- The title test is read on 5 October. Do not change those titles before then.

## 24. Risks and things NOT to do

- **Don't claim verification that was not performed.** "Verified at checkout" without a stored screenshot is the same ACL s29 exposure as a fake rating.
- **No invented personas, credentials, testimonials or ratings,** even though competitors ranking above Refer Labs use them.
- **No medicine names anywhere,** including datasets and CSV headers. TGA guidance, updated 18 June 2026, treats "weight loss injections" as prohibited, and says promoting telehealth as a way to get a class of prescription medicines is likely to be prohibited advertising.
- **Don't build programmatic fan-out pages** (Google scaled content abuse policy).
- **Don't chase schema, llms.txt or "chunking" for AI.** Google calls these myths (VERIFIED).
- **Don't buy links or run anonymous surveys.** Don't post codes to coupon sites without partner approval.
- **Don't claim exclusive facts that are no longer exclusive** (the Knose underwriter).
- **Don't broaden into new verticals** (finance, energy retail, B2B SaaS) before the three focus verticals have earned citations (existing master-brief hard gates).
- **Don't treat citation counts as precise.** The Tow Center/CJR test (March 2025) found AI search tools wrong on more than 60% of 1,600 queries.
- **Reputational risk from health press:** coverage of Juniper and weight-loss telehealth has been critical (ABC, 29 Dec 2025). Pitch transparency data, never codes, to health desks.

## 25. Final strategic recommendation

**Refer Labs should primarily become an Australian consumer buying-intelligence publisher, a hybrid:**
- independent comparisons built on dated, primary-sourced facts;
- published datasets in three focus verticals;
- verified offers attached to the comparison.

**Why not the alternatives (INFERENCE from the evidence above):**
- **Coupon or discount site:** a crowded, low-trust source type engines treat interchangeably with the brand's own promo page. Refer Labs holds 4 codes, so it cannot win on coverage. Coverage citing consumer data never cited a code.
- **Affiliate marketplace:** no product, weak partner economics outside health (one software signup a year). Marketplaces earn no citations.
- **Pure data or research publisher:** the data only compounds when it drives decisions and revenue on the same site, and a founder-run budget cannot fund research without revenue.
- **Comparison site in the Finder or Canstar mould:** cannot match licensing, history or awards in finance. It *can* win the health-service, pet-underwriter and rebate niches those sites ignore or treat thinly.

The discount is part of the buying decision. The data is what gets Refer Labs cited. The comparison is where the two meet.

### If we did only 10 things over the next 6-12 months, ranked

1. **Make every trust statement true.** Remove "Active ✓" where unchecked, fix the "read off own page" claim for the five partner-confirmed offers, reconcile the hidden schema author, and correct Offer.price and the dates that predate first commits. *An engine or journalist that finds one false claim discounts the rest; this is the only trust problem entirely within our control.* (VERIFIED defects)
2. **Get partners to corroborate Refer Labs on their own sites.** Moshy and Mosh name REFERRAL120 / REFERAL55 as Refer Labs codes on their promo and `/llm` pages and link to our pages. *Engines resolve code and brand queries between the brand's own page and third parties; this puts us on the brand's side of that resolution.* (STRONGLY SUPPORTED)
3. **Ship offer verification levels with stored evidence and expiry.** Published / partner-confirmed / checkout-tested, re-check windows, public offer history, and a build guard. *Turns the "verified" claim into a record no coupon site has.* (INFERENCE)
4. **Fix the entity at the registry level.** Register "Refer Labs" as a business name on Pepform's ABN, move the domain registrant to the company, one founding story (2022 company / 2025 brand), one category across profiles. *Gives every engine a government-sourced link between brand and company.* (VERIFIED gap; INFERENCE impact)
5. **Name an accountable editor, visibly and in schema.** A real bio and outside profile. *Every source engines lean on shows a checkable person; the sites that fake one are what Refer Labs must be distinguishable from.* (INFERENCE; needs sign-off)
6. **Publish `/data` as a licensed dataset, then the telehealth price & terms register.** CSV, CC BY 4.0, methodology, non-partner rows. *Google weights non-commodity content most; datasets are what journalists and engines can cite.* (VERIFIED guidance; INFERENCE)
7. **Launch the Home Battery Rebate Tracker and the pet underwriter & PDS register.** *Extends the citation lane from health into the two verticals where Refer Labs has zero citations but open data or primary documents to own.* (INFERENCE)
8. **Concentrate internal authority on the pages that already win.** At least 15 links from page content each into brand-pair, cost and underwriter pages; a hub → provider → pair → cost structure; retitle the "Is There One?" pages. *Moves equity from never-cited pages to cited ones and removes the strongest coupon-site signal.* (VERIFIED gap; INFERENCE)
9. **Pitch data, not codes, to trade press on a quarterly calendar.** Rebate maths before step-downs, underwriter changes to insurance and vet trade press, transparency data to health trade press; SourceBottle and HARO responses. *Third-party coverage is what engines cite most.* (STRONGLY SUPPORTED)
10. **Measure per engine with a fixed prompt panel.** Bing AI Performance, Search Console's generative AI report, and a monthly 100-prompt panel across ChatGPT, Perplexity, Claude and AI Mode, with edit dates logged. *Each engine retrieves from a different index; without per-engine measurement, effort goes to the wrong lever.* (VERIFIED retrieval differences)

**Deliberately not in the top 10:**
- More schema, a bigger llms.txt, more pages, Reddit seeding, or a Wikipedia article. Documented evidence either contradicts these as levers or makes them liabilities.
- New verticals.

The implementation specification is a separate document: `research/ai-search-implementation-spec-2026-09-15.md`.

---

## Sources

**Company documentation**
- Google Search Central, *AI features and your website* (updated 10 Dec 2025): https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, *Optimizing your website for generative AI features on Google Search* (May 2026): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, *Top ways to ensure your content performs well in Google's AI experiences* (21 May 2025): https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- Google, *Search generative AI control* (rollout 31 Aug 2026): https://support.google.com/webmasters/answer/16908024
- Google Search Central, *Search Generative AI performance reports* (Jun 2026): https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Google, *Spam policies for Google web search* (updated 28 Aug 2026): https://developers.google.com/search/docs/essentials/spam-policies
- Google, *Search Quality Evaluator Guidelines* (11 Sep 2025): https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf
- Google, *Influence your byline dates*: https://developers.google.com/search/docs/appearance/publication-dates
- OpenAI, *Overview of OpenAI crawlers*: https://developers.openai.com/api/docs/bots
- OpenAI Help, *Publishers and Developers FAQ*: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- OpenAI Help, *Searching the web with ChatGPT*: https://help.openai.com/en/articles/9237897-chatgpt-search
- Anthropic, *Does Anthropic crawl data from the web* (7 Apr 2026): https://support.claude.com/en/articles/8896518
- Anthropic, *Web search tool*: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool
- Simon Willison, *Anthropic added Brave Search as a subprocessor* (21 Mar 2025): https://simonwillison.net/2025/Mar/21/anthropic-use-brave/
- Perplexity, *Perplexity Crawlers*: https://docs.perplexity.ai/guides/bots
- Microsoft Advertising, *Optimizing Your Content for Inclusion in AI Search Answers* (8 Oct 2025): https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers
- Search Engine Journal, *Bing Adds GEO To Official Guidelines* (27 Feb 2026): https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/
- Search Engine Journal, *Bing Webmaster Tools Adds AI Citation Performance Data* (Feb 2026): https://www.searchenginejournal.com/bing-webmaster-tools-adds-ai-citation-performance-data/566874/
- TGA, *Advertising health services that involve therapeutic goods* (updated 18 Jun 2026): https://www.tga.gov.au/resources/guidance/advertising-health-service

**Academic and investigative**
- Aggarwal et al., *GEO: Generative Engine Optimization* (KDD 2024): https://arxiv.org/abs/2311.09735
- Chen, Wang, Chen, Koudas (University of Toronto), *Generative Engine Optimization: How to Dominate AI Search* (10 Sep 2025): https://arxiv.org/abs/2509.08919
- Columbia Journalism Review / Tow Center, *AI Search Has a Citation Problem* (6 Mar 2025): https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php

**Industry studies (vendor-run; treat as correlation)**
- Ahrefs, AI Overview citations vs rankings (21 Jul 2025): https://ahrefs.com/blog/search-rankings-ai-citations
- Search Engine Journal reporting Ahrefs, 38% top-10 citations (2 Mar 2026): https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/
- Ahrefs, AI Overview brand visibility factors, 75K brands (26 May 2025): https://ahrefs.com/blog/ai-overview-brand-correlation/
- Ahrefs, freshness and AI citations, 17M citations (28 Jul 2025): https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content
- Ahrefs, schema and AI citations, 1,885 pages (11 May 2026): https://ahrefs.com/blog/schema-ai-citations/
- Semrush, Reddit citations in ChatGPT: https://www.semrush.com/blog/reddits-citations-in-chatgpt-fall/

**Australian data and media**
- Clean Energy Regulator, small-scale installation postcode data: https://cer.gov.au/markets/reports-and-data/small-scale-installation-postcode-data
- Clean Energy Regulator copyright (CC BY 4.0): https://cer.gov.au/about-us/our-policies/copyright
- TGA copyright: https://www.tga.gov.au/about-us/using-our-website/copyright
- Solar Choice battery price index: https://www.solarchoice.net.au/solar-batteries/price/
- insu.au, pet insurance underwriter reshuffle 2023-2026: https://insu.au/articles/au-pet-insurance-underwriter-reshuffle-2023-2026/
- ABC, *The home battery rebate is changing* (1 May 2026): https://www.abc.net.au/news/2026-05-01/the-home-battery-rebate-is-changing-is-it-still-worth-it/106616170
- ABC, *The pros and cons of pet insurance* (11 Aug 2026): https://www.abc.net.au/news/2026-08-11/the-pros-and-cons-of-pet-insurance/106936152
- ABC, Juniper telehealth concerns (29 Dec 2025): https://www.abc.net.au/news/2025-12-29/juniper-telehealth-concerns-weight-loss-treatment-glp1/106114626
- SourceBottle: https://www.sourcebottle.com/
- Medianet pricing: https://www.medianet.com.au/knowledge/how-much-does-it-cost-to-distribute-a-press-release-using-medianet

Competitor evidence (licence numbers, disclosure quotes, review counts) and every benchmark row are in the scratchpad working files `geo/03-ai-benchmark.md` and `geo/05-competitors.md`.
