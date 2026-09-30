# Business software SEO / AEO / GEO audit, 30 September 2026

Read-only audit of every live B2B software page, hub, comparison, quiz, `/for-business` and the affiliate-programs cluster. Nothing in the repo was edited. Everything below was measured against the **live site** (`curl` with a Chrome UA, 30 Sep 2026), not the filesystem. The only source reads were to locate the fixes.

**Method.** Built the inventory from `src/app`, `sitemap.ts`, `catalog.ts`, live `llms.txt` and `/guides`, then curled 79 URLs. Every 200 page was parsed for title, description, canonical, robots, h1s, what renders between the h1 and the first paragraph, h2s, JSON-LD (types, FAQ questions **and answers** checked against the visible text, ItemList `url`s), prices and nearby dates, banned phrases, outbound `rel`, where the disclosure sits relative to the first sponsored link, and em-dashes. All 176 internal links, all 180 `llms.txt` + sitemap URLs and 41 outbound affiliate links were fetched with GET. Every surprising count was checked by hand on at least three pages (details inline).

## Headline counts

| Measure | Result |
|---|---|
| URLs checked | 79: **65 live (200)**, 12 redirects (308, all by design), 2 probe 404s |
| Own title + description + canonical | 65/65 have them. No canonical is inherited, all are `index, follow` |
| Exactly one `<h1>` | 65/65 |
| Em-dashes in rendered copy | 0 |
| Broken internal links | 0 of 176 (every one returns 200 with no redirect) |
| `llms.txt` / sitemap URLs that redirect, 410 or noindex | 0 of 180 |
| Disclosure above the first sponsored link | every page that has a sponsored link |
| Sponsored CTAs missing `rel="nofollow sponsored"` | 0. Only Substack and Kit on `/compare/newsletter-platforms` carry plain `nofollow`, and they are not affiliate links |
| Affiliate links resolving (GET) | 41/41 reach the vendor. Reply.io (403) and PandaDoc (429) block bots on the final vendor hop; the tracking hop itself works |
| FAQPage JSON-LD questions matching visible FAQs | all match. **Answers**: 1 real mismatch (AiSDR price, P1-4), plus wording drift on 7 others |
| Brand pages with FAQPage + BreadcrumbList + WebPage + SoftwareApplication | 35/35 |
| Hubs whose content ItemList has item `url`s | **0 of 9** `/compare/*` hubs (P2-1) |
| Brand leads that do not answer the page's query | **19 of 35** (P2-3) |
| Pages with no h2 phrased as the buyer's question | 20 (P2-4) |
| Hero stamps reading "Checked & verified by Refer Labs, July 2026" | **21 pages** (P2-6) |
| Vendor prices spot-checked | 14 vendors: 7 match, **5 stale or wrong**, 2 unreadable (bot-blocked or JS-rendered) |
| In-scope pages missing from `llms.txt` | 5 |

## Page inventory

"Partner link / earning" = the live page carries at least one `rel="sponsored"` outbound link.

| URL | Status | Type | Partner link / earning |
|---|---|---|---|
| /business-software | 200 | hub | no (funnels to reviews) |
| /for-business | 200 | B2B / lead | lead capture |
| /compare/website-builders | 200 | hub | yes (affiliate) |
| /compare/newsletter-platforms | 200 | hub | yes (affiliate) |
| /compare/ai-sales-tools | 200 | hub | yes (affiliate) |
| /compare/hr-payroll | 200 | hub | yes (affiliate) |
| /compare/sales-outreach | 200 | hub | yes (affiliate) |
| /compare/payments | 200 | hub | yes (affiliate) |
| /compare/business-phone | 200 | hub | yes (affiliate) |
| /compare/ai-tools | 200 | hub | yes (affiliate) |
| /compare/lead-generation | 200 | hub | yes (affiliate) |
| /compare/crm | 404 | probe only, never a route, nothing links to it | n/a |
| /compare/email-marketing | 404 | probe only, never a route (no email-marketing hub exists) | n/a |
| /activecampaign | 200 | brand | yes (affiliate) |
| /aisdr | 200 | brand | yes (affiliate) |
| /alidrop | 200 | brand | yes (affiliate) |
| /beautifulai | 200 | brand | yes (affiliate) |
| /beehiiv | 200 | brand | yes (affiliate) |
| /blinq | 200 | brand | yes (affiliate) |
| /brevo | 200 | brand | yes (affiliate) |
| /butternut | 200 | brand | yes (affiliate) |
| /capsule | 200 | brand | yes (affiliate) |
| /carrd | 200 | brand | yes (affiliate) |
| /cloudtalk | 308 → /krispcall | retired | n/a |
| /databox | 200 | brand | yes (affiliate) |
| /dext | 200 | brand | yes (affiliate) |
| /durableai | 200 | brand | yes (affiliate) |
| /elevenlabs | 200 | brand | yes (affiliate) |
| /employmenthero | 200 | brand | yes (affiliate) |
| /flexiquiz | 200 | brand | yes (affiliate) |
| /fullenrich | 200 | brand | yes (affiliate) |
| /gohighlevel | 200 | brand | yes (affiliate) |
| /hellobar | 200 | brand | yes (affiliate) |
| /instapage | 308 → /swipepages | retired | n/a |
| /keap | 200 | brand | yes (affiliate) |
| /krispcall | 200 | brand | yes (affiliate) |
| /landingi | 200 | brand | yes (affiliate) |
| /leadpages | 200 | brand | yes (affiliate) |
| /lindy | 200 | brand | yes (affiliate) |
| /nutshell | 200 | brand | yes (affiliate) |
| /outgrow | 200 | brand | yes (affiliate) |
| /pandadoc | 200 | brand | yes (affiliate) |
| /pipedrive | 200 | brand | yes (affiliate) |
| /replyio | 200 | brand | yes (affiliate) |
| /superfiliate | 200 | brand | yes (affiliate) |
| /survicate | 200 | brand | yes (affiliate) |
| /swipepages | 200 | brand | yes (affiliate) |
| /trainual | 200 | brand | yes (affiliate) |
| /unbounce | 200 | brand | yes (affiliate) |
| /wing-assistant | 200 | brand | yes (affiliate) |
| /best-ai-sales-tools | 200 | best-X / guide | yes (affiliate) |
| /best-crm-small-business-australia | 200 | best-X / guide | yes (affiliate) |
| /best-website-builder | 200 | best-X / guide | yes (affiliate) |
| /best-newsletter-platform | 200 | best-X / guide | yes (affiliate) |
| /affiliate-software-australia | 200 | best-X / guide | yes (affiliate) |
| /carrd-vs-butternut | 200 | vs | yes (affiliate) |
| /carrd-vs-durable | 200 | vs | yes (affiliate) |
| /durable-vs-butternut | 200 | vs | yes (affiliate) |
| /ai-sales-tools-quiz | 200 | quiz | no (funnels to reviews) |
| /website-builder-quiz | 200 | quiz | no (funnels to reviews) |
| /newsletter-platform-quiz | 200 | quiz | no (funnels to reviews) |
| /affiliate-programs-australia | 200 | affiliate cluster | yes (affiliate) |
| /affiliate-earnings-calculator | 200 | affiliate cluster | no (funnels to reviews) |
| /high-paying-affiliate-programs | 200 | affiliate cluster | no (funnels to reviews) |
| /recurring-affiliate-programs | 200 | affiliate cluster | no (funnels to reviews) |
| /how-to-start-affiliate-marketing-australia | 200 | affiliate cluster | no (funnels to reviews) |
| /partner-with-refer-labs | 200 | B2B / lead | lead capture |
| /services | 308 → /for-business | retired | n/a |
| /lead-hacking | 308 → /for-business | retired | n/a |
| /linkedin-growth | 308 → /for-business | retired | n/a |
| /linkedin-influencer | 308 → /for-business | retired | n/a |
| /case-studies | 308 → /for-business | retired | n/a |
| /playbooks | 308 → /guides | retired | n/a |
| /roi-calculator | 308 → /for-business | retired | n/a |
| /who-its-for | 308 → /for-business | retired | n/a |
| /affiliate-partnerships | 308 → /for-business | retired | n/a |
| /deals | 200 | hub | no (funnels to reviews) |
| /guides | 200 | hub | no (funnels to reviews) |
| /compare-business-lenders | 308 → /for-business | retired | n/a |
| /business-loans | 308 → /for-business | retired | n/a |

## Vendor price spot-checks (vendor's own pricing page, Chrome UA, read 30 Sep 2026)

| Vendor | What we print (live) | Vendor's own page | Verdict |
|---|---|---|---|
| GoHighLevel | `/gohighlevel`: Starter US$97, Unlimited US$297. **`/best-ai-sales-tools`: "Unlimited US$557/mo"** | gohighlevel.com/pricing: Starter $97/mo, Unlimited $297/mo, Agency Pro $497/mo | **Wrong on /best-ai-sales-tools** (P1-2) |
| AiSDR | Solo US$250/mo, Explore US$900/mo. **`/best-ai-sales-tools` visible FAQ: "AiSDR starts from $900/month"** | aisdr.com/pricing: Solo $250/mo, Explore $900/mo, Scale $2,500/mo | Brand page right; best-X FAQ wrong (P1-4) |
| Carrd | "Pro from US$19/yr" **and** "Pro from $9/year", sometimes on the same page | carrd.co/pro: Pro Lite $9/yr (3 sites, no custom domain), Pro Standard $19/yr, Pro Plus $49/yr | Contradictory sitewide (P1-3) |
| Durable AI | title "From $19" | durable.com/pricing: Launch $22/mo billed annually ($25 monthly), Grow $41 ($49) | **Stale** (P1-5) |
| beehiiv | "From $39/mo (Scale plan)" on `/best-newsletter-platform` | beehiiv.com/pricing: Scale $43/mo, $517 billed annually; Launch free to 2,500 | **Stale** (P1-6) |
| Kit (non-partner) | "free up to 1,000 subscribers", "From $29/mo (Creator plan)" | kit.com/pricing: Free up to 10,000 subscribers; Creator $33/mo, $390 billed yearly | **Stale, and it breaks the page's verdict** (P1-6) |
| FullEnrich | page: US$55/mo (14 Sep 2026). **llms.txt: "~US$29/mo"** | fullenrich.com/pricing: $55/mo for 1K credits | Page right, llms.txt wrong (P1-7) |
| Leadpages | "From US$49 first month, then US$99/mo" | leadpages.com/pricing: Grow $99/mo, Optimize $199, Scale $399 (FAQ). Plan cards in AU show Pro A$45 / A$36 annual, Business A$75 / A$60 annual. No "$49 first month" anywhere | Partly unverifiable, undated (P1-8) |
| Brevo | Free (300 emails/day); from US$9/mo | brevo.com/pricing JSON-LD: Starter US$9/mo, Standard US$18/mo | Match |
| Keap | US$299/mo (5 Sep 2026) | keap.com/pricing: $299/mo, billed $2,988/yr | Match |
| Nutshell | from US$13/user/mo | nutshell.com/pricing: $13 per user/month | Match |
| Databox | Analyst US$64, Pro US$159, Growth US$399 (5 Sep) | not re-read (dated 25 days ago, inside the 45-day window) | n/a |
| Pipedrive, Reply.io | AU$19/seat (5 Sep); US$49/user | **403 to curl with full Chrome headers and to WebFetch** (bot wall) | Unverified. Pipedrive is dated 5 Sep, so inside the window |
| Capsule, ActiveCampaign | US$18/user; US$15/mo | Prices rendered client-side; the static HTML carries no figures. Capsule's free plan (250 contacts, 2 users) **is** confirmed | Unverified |

## Findings

### P1: wrong on the live site now, or a legal / consumer-law exposure

**P1-1. `/compare/payments` still sells Melio, which was removed in July 2026 as US-only.**
Live `<title>`: `Payments & Finance Tools: Payoneer, Dext & Melio`. Meta and the CollectionPage JSON-LD: "...and Melio for US business bill pay." The lead is written for three tools ("Three jobs, three different tools... receiving cross-border payments, paying vendors, and the bookkeeping") and only two render. Also stale: "We're building this category out. Payoneer is our first covered provider; more will be added as we review them." Dext is listed right below it.
*Fix:* `src/lib/catalog/catalog.ts:551-563`. Retitle to "Payments & Bookkeeping Tools: Payoneer vs Dext", rewrite the description and lead for two jobs, and delete the `note`.

**P1-2. `/best-ai-sales-tools` prints the wrong GoHighLevel Unlimited price.**
Live: "Price From US$97/mo; Unlimited US$557/mo". GoHighLevel's own page: Unlimited **$297/mo**. $497 is Agency Pro, and $557 does not appear anywhere on it. Our own `/gohighlevel` and `/compare/ai-sales-tools` say US$297, so the site contradicts itself.
*Fix:* `src/app/best-ai-sales-tools/page.tsx:128`, changed to US$297 and dated "read on gohighlevel.com/pricing, 30 September 2026".

**P1-3. Carrd's entry price contradicts itself across nine surfaces, sometimes on a single page.**
`/carrd` hero and table: "Pro from US$19/yr". The same page's body: "Pro from $9/year". `/carrd-vs-butternut`: "Pro from $9/year", then "Pro starts at US$19 a year", then "Pro starts at US$9 a year". `/deals`, `offers.ts:88` and `llms.txt` ("Pro from US$19/yr, verified 21 August 2026") say 19. The related-guide cards on `/durableai`, `/butternut` and `/swipepages` say "Pro from $19/year". `/best-website-builder`, `/carrd-vs-durable`, `/website-builder-quiz` and `/guides` say 9. Carrd's page: Pro Lite **$9/yr** (no custom domain), Pro Standard **$19/yr** (custom domain), Pro Plus $49/yr.
*Fix:* declare it once as a constant (the `src/lib/partners/<partner>.ts` pattern, with `readOn` and `source`) and state both tiers: "Pro Lite US$9/yr; a custom domain needs Pro Standard, US$19/yr (carrd.co/pro, 30 Sep 2026)". Update `llms.txt` and `offers.ts` to match.

**P1-4. `/best-ai-sales-tools`: the FAQ answer shown to readers disagrees with its own JSON-LD, and admits the page is undated.**
Visible (`page.tsx:482`): "AiSDR starts from $900/month billed quarterly". FAQPage JSON-LD (`page.tsx:85`): "AiSDR starts from $250/month on its Solo plan". AiSDR's page: Solo $250, Explore $900. The page also prints: "confirm each with the vendor, because none of the figures on this page carries a date we verified."
*Fix:* make the visible answer the same text as the JSON-LD (generate both from one array), then date every figure (30 Sep 2026 values are in the table above) and delete that sentence.

**P1-5. `/durableai` has a price in its `<title>` that the page never states, and the price is stale.**
Title: `Durable AI 2026: A Site in 30 Seconds, From $19 | Refer Labs`. The meta says "from $19 a month". The body prints no Durable price. Durable's page: Launch **$22/mo billed annually, $25 monthly**.
*Fix:* `src/lib/seo.ts:1502`. Given the 27 Sep "no partner prices on money pages" decision, drop the figure: "Durable AI 2026: A Business Site in 30 Seconds, Free to Try". Remove "$19" from the description as well.

**P1-6. `/best-newsletter-platform`: the facts behind its verdict have moved.**
This is our strongest-shaped business page (a brand pair in the title plus an owned fact, "0% vs 10%"). Live claims:
- "ConvertKit is free up to 1,000 subscribers"
- Kit "From $29/mo (Creator plan)"
- beehiiv "From $39/mo (Scale plan)"
- "beehiiv offers the most generous free plan" (in both the visible text and the JSON-LD)
- meta: "Free to 2,500 and 1,000 subscribers"

Kit's page now reads "Free, up to 10,000 subscribers", Creator **$33/mo** billed yearly. beehiiv's reads Scale **$43/mo**, $517 billed annually. On subscriber count, Kit's free plan is now four times beehiiv's, so the "most generous free plan" answer is false. None of these figures carries a date.
*Fix:* correct the figures and date them. Rewrite the free-plan answer as a split: Kit is free to 10,000 but with fewer growth tools; beehiiv is free to 2,500. That is the kind of commercially inconvenient half the citation rule says to publish. Update the meta.

**P1-7. `llms.txt` gives AI engines a wrong, tilde-hedged FullEnrich price.**
Line 190: "Free 50-credit trial; paid from ~US$29/mo." The page says US$55/mo (14 Sep 2026) and FullEnrich's page agrees ($55/mo, 1K credits). The line breaks the "~" ban in the one file AI engines read as our index.
*Fix:* "paid from US$55/mo (fullenrich.com/pricing, 30 September 2026)".

**P1-8. Leadpages sells a public annual-billing saving as a discount you get through our link (ACL s29 exposure). Needs Jarred.**
Title: `Leadpages Discount Code 2026: 20% Off Annual Billing`. h1: "Leadpages discount: 20% off annual billing". Hero: "Current offer via our link 7-day free trial; 20% off annual billing". Leadpages' own pricing page shows that saving to everyone (Pro A$45/mo, or A$36/mo billed annually = 20%). `/deals` already files Leadpages under "More offers and free trials", not with the discounts, so the site disagrees with itself about whether this is a discount. The page also carries "Pricing is indicative and correct to the best of our knowledge", and "US$49 first month" could not be found on Leadpages' page. The offer is dated 25 Aug.
*Fix, if Jarred confirms nothing link-specific exists:* retitle to "Leadpages Review 2026: 7-Day Free Trial" and reword the hero to "Leadpages publishes 20% off for annual billing". Keep the FAQ sentence, which already says "Leadpages publishes 20% off". Re-read the plans and date them. The same framing issue, milder, affects `/alidrop` (`AliDrop Discount Code 2026: US$1 for a 7-Day Trial`: no code exists, and `/deals` lists it as a trial).

### P2: rule breaches that cost ranking or citation

**P2-1. No `/compare/*` hub ItemList has item URLs, and neither does `/best-crm-small-business-australia`.**
Every hub's CollectionPage `mainEntity` ItemList is `{"@type":"ListItem","position":1,"name":"Payoneer"}`, with no `url` (checked on all nine, e.g. ai-sales-tools with 11 items and 0 urls). Same on `/best-crm-small-business-australia` (4/0). CLAUDE.md records the ItemList-url defect as fixed; it is fixed on `/best-ai-sales-tools`, `/best-website-builder`, `/deals` and the vs pages, not on the hubs.
*Fix:* `src/app/compare/[slug]/page.tsx:95`, adding `url: p.reviewHref ? SITE_URL + p.reviewHref : (p.affiliateUrl || p.externalUrl)`. And `src/app/best-crm-small-business-australia/page.tsx:107`. (The affiliate-cluster lists, 27/12/12/6 items with no url, are parked: see D-9.)

**P2-2. Meta descriptions: 15 live pages share the skeleton "Looking for a X discount code, promo code or referral link?", and 5 say nothing else.**
`src/lib/seo.ts` lines 464-569 and 2640. Five are only the question, shown in the SERP as-is:
- `/brevo`: "Looking for a Brevo discount code, promo code or referral link?"
- `/activecampaign`, `/dext`, `/landingi`, `/wing-assistant`: the same

None of these brands has a code, so the snippet raises a question the page never answers. That is slop by repetition, a pogo-stick trigger, and a mild misleading-impression risk. The fix pattern already exists on `/databox` ("No Databox coupon exists... The free plan is permanent (3 data sources, 1 user) and annual billing takes 20% off").
*Fix:* rewrite each as a statement answering the code query with that brand's actual offer. For example, Brevo: "There is no Brevo discount code. The free plan is permanent: 300 emails a day, no card." Do not reuse one sentence shape across all 15. The retired `cloudtalk` and `dense` configs carry the same string; they are harmless while they redirect.

**P2-3. Answer-first: 19 of 35 brand leads describe the product and never answer the query the title and meta target.**
Checked by hand on `/pipedrive`, `/activecampaign` and `/dext`. Nothing sits between the h1 and the lead (that part passes everywhere); the lead itself is the problem.
- `/pipedrive`: "A deal-first CRM that shows your whole pipeline at a glance, automates the busywork, and reminds you who to chase..." It does not say there is no code, what the free trial is, or that it starts at AU$19 (a figure the page prints further down, dated 5 Sep).
- The same holds for `/activecampaign`, `/dext`, `/elevenlabs`, `/flexiquiz`, `/hellobar`, `/krispcall`, `/landingi`, `/lindy`, `/nutshell`, `/outgrow`, `/survicate`, `/trainual` and `/wing-assistant`.
- Five share one sentence skeleton, "If [pain]... [Brand] [solves it]. Here is what it does, who it suits, and how [pricing] works": `/beautifulai`, `/blinq`, `/capsule`, `/keap`, `/pandadoc`. Delete the "Here is what it does" sentence (it narrates the page).
- Hubs: all nine `/compare/*` leads narrate the page instead of answering it: "This hub sorts them by what they are for, so you pick the right tool", "...so you buy the right layer, not...", "...built for your team, not the loudest". `/best-newsletter-platform`: "We compared the three leading newsletter platforms... Our verdict is below." (The verdict should be the lead.)

*Fix:* the pattern already used on `/superfiliate`, `/unbounce`, `/aisdr` and `/fullenrich`: sentence one names what the thing is and the offer or answer; sentence two says who it suits. Per the 27 Sep decision, answer with the offer, not a newly added price.

**P2-4. Twenty pages have no h2 phrased as the buyer's question.**
All nine `/compare/*` hubs (their h2s are "Know about the good offers first", "Common questions", "Related guides"), plus `/best-crm-small-business-australia`, `/best-website-builder`, `/carrd-vs-butternut`, `/durable-vs-butternut`, `/high-paying-affiliate-programs`, `/recurring-affiliate-programs`, `/affiliate-earnings-calculator`, `/deals`, `/for-business`, `/business-software` and `/guides`. On brand pages the only question h2 is the templated "Should you use X?", rendered identically on 35 pages. The verbatim buyer query "Is there a X discount code?" lives inside the FAQ accordion; `/databox` is the only page that makes it an h2.
*Fix:* promote the code question to an h2 near the top on brand pages. For hubs, ask the category question verbatim ("What is the best CRM for a small Australian business?") with a two-sentence answer beneath.

**P2-5. Undated prices on hubs and roundups.**
Counted as prices with no date within about 600 characters. Checked by hand on `/best-website-builder`, `/carrd-vs-butternut` and `/aisdr`, whose only caveats are "Pricing can change, so verify..." or no date at all.

| Page | Prices | Dates |
|---|---|---|
| `/best-ai-sales-tools` | 10 | 0 |
| `/best-website-builder` | 8 | 0 |
| `/carrd-vs-butternut` | 7 | 0 |
| `/aisdr` | 7 | 0 |
| `/carrd-vs-durable` | 4 | 0 |
| `/butternut` | 3 | 0 |
| `/compare/ai-sales-tools` | 12 | 6 undated |
| `/compare/website-builders` | 5 | 0 |
| `/compare/ai-tools` | 4 | 0 |
| `/compare/lead-generation` | 3 | 0 |
| `/compare/sales-outreach` | 2 | 0 |
| `/compare/payments` (Dext "from US$25/mo") | 1 | 0 |
| `/compare/business-phone` | 1 | 0 |

Brand pages whose dated offer box sits far from undated plan prices: `/lindy`, `/flexiquiz`, `/outgrow`, `/hellobar`, `/landingi`, `/nutshell`, `/gohighlevel`. There is also a second caveat layered on top of the per-page disclaimer, "Pricing is indicative and correct to the best of our knowledge", on 8 pages: leadpages, fullenrich, alidrop, aisdr, employmenthero, brevo, gohighlevel, replyio.
*Fix:* date each existing figure from a single constant per vendor, or remove the figure. Do not add new ones (27 Sep decision). The hub price strings live in `catalog.ts` `pricing` fields: give each a `readOn`. Remove the "indicative / best of our knowledge" boilerplate.

**P2-6. 21 hero offer boxes say "Checked & verified by Refer Labs, July 2026", 62 to 92 days ago.**
activecampaign, beautifulai, blinq, capsule, databox, dext, employmenthero, flexiquiz, fullenrich, hellobar, keap, landingi, lindy, nutshell, outgrow, pandadoc, pipedrive, replyio, survicate, trainual, wing-assistant. Several contradict dates lower on the same page: `/pipedrive`, `/databox` and `/keap` were read on 5 Sep, `/employmenthero` on 30 Sep, `/fullenrich` on 14 Sep.
*Fix:* derive the stamp from the page's latest `readOn` or the DEALS `verified` field, never a typed month. Where nothing was re-read since July, re-read it or drop "verified".

**P2-7. Orphans and thin internal linking.**
Siblings were counted among the 65 in-scope pages only. Every brand page is reachable from `/guides`.
- **No hub at all:** `/blinq`, `/pandadoc` (no hub and no sibling link: `/guides` only). `/databox` (only `/guides` and `/business-software`'s featured strip). `/unbounce` (only `/deals` and `/business-software`; it is a landing-page builder yet absent from `/compare/website-builders`, which lists Leadpages and Landingi). `/alidrop` (`/deals` and `/affiliate-programs-australia`). `/wing-assistant` and `/survicate` (no hub, one sibling each).
- **Hub but no sibling `relatedLinks` in:** `/dext`, `/krispcall`, `/elevenlabs`, `/beautifulai`, `/carrd-vs-butternut`, `/ai-sales-tools-quiz`, `/newsletter-platform-quiz`.
- **`/compare/lead-generation` is missing from `/business-software`'s hub grid**, which lists 8 of the 9 hubs (`src/app/business-software/page.tsx`, `hubs` array).

*Fix:* add Unbounce to the `website-builders` catalog vertical. Add Databox to `ai-tools` or a reporting row. Add the lead-generation hub to the `hubs` array. Add reverse `relatedLinks` (Unbounce ↔ Leadpages/Swipe Pages, Dext ↔ Employment Hero, KrispCall ↔ Pipedrive, ElevenLabs ↔ Lindy, Survicate ↔ Hello Bar). Blinq and PandaDoc: see D-4.

**P2-8. `llms.txt` gaps and inaccuracies (besides P1-3 and P1-7).**
- Missing entries: `/beautifulai`, `/blinq`, `/capsule`, `/keap`, `/pandadoc` (all live, all in the sitemap).
- Undated prices: Leadpages ("from US$49 the first month, then US$99/mo"), AliDrop, Lindy, ActiveCampaign, Nutshell, Hello Bar, Reply.io, GoHighLevel and Brevo lines.
- Line 13 tells AI engines the Unbounce and Superfiliate offers are ones "the provider publishes nowhere... confirmed directly with the provider". Both are on the vendor's public landing page, which our link resolves to. unbounce.com/your-invitation/: "You've just scored 20% off your first three months (or 35% off your first full year)". superfiliate.com/partners: "Enjoy 15% off your monthly Superfiliate SaaS fee!" `offers.ts:79,81` carry the same wrong `noPublicPage` source, while the pages themselves say "Verified on Unbounce's own invitation page, 27 September 2026".
- *Fix:* switch both sources to `readOff` with those URLs and correct line 13. Codes: none of the business partners has a code string, and the entries correctly say "no code".

**P2-9. `/beehiiv` implies the free plan includes the ad network.**
Lead: "beehiiv is free up to 2,500 subscribers and includes an ad network, a referral programme, a website and paid subscriptions." The meta says the same. beehiiv's page lists Ad Network, Recommendations and 0% take rate under Scale ("Everything on Launch +").
*Fix:* "free up to 2,500 subscribers; the ad network and paid subscriptions come with the paid Scale plan."

**P2-10. Title and h1 disagree, or the title undersells the page.**
- `/databox`: title `Databox Review 2026: Free Plan Available`, h1 "Databox discount code: there isn't one, and the free plan is why". The page owns the code query, and the title should too: "Databox Discount Code 2026: None Exists (Free Plan + 20% Annual)". Separately, the meta's "nobody holds one" is a universal claim we cannot verify. Say "Databox publishes no coupon and Refer Labs holds none".
- `/for-business`: title "For Business: Partner With Refer Labs", h1 "Customers who have already done the research".
- `/best-website-builder`: h1 "Best Website Builder 2026: Four Platforms. One Clear Answer." (see P3-1).

### P3: polish

**P3-1. Slop.**
- `/best-website-builder`: "Four Platforms. One Clear Answer.", "Nothing else comes close on price-to-quality", "The verdict".
- `/carrd-vs-durable`: "Both are excellent, for different jobs.", "dramatically cheaper".
- `/alidrop`: h2 "Who AliDrop is best for, honestly", and the related card "with honest, illustrative-only numbers".
- Hubs: "not the loudest" (`/compare/hr-payroll`, `/compare/ai-sales-tools`).
- `/recurring-affiliate-programs`: "genuine passive income" and "closest thing affiliate marketing has to passive income" (twice).
- `seo.ts` meta for `/durable-vs-butternut`: "builds a site in ~30 seconds" (a tilde).

Not slop, checked in context: "honest" on `/how-to-start-affiliate-marketing-australia` is advice to the reader about their own conduct, and "not fitness, but home strength training" is a worked example.

**P3-2. "Top pick" badge on the first provider in 7 `/compare/*` hubs** (e.g. "Payoneer Top pick"). See D-5.

**P3-3.** `/compare/payments`: all 6 FAQs are about Payoneer and none about Dext. `/employmenthero` and `/leadpages` use a "Claim offer" CTA when the offer is a demo or a public trial.

**P3-4. Seven FAQ JSON-LD answers drift in wording from the visible answer** ("available in 2026" vs "in 2026") on `/best-ai-sales-tools`, `/best-newsletter-platform` and `/best-website-builder`. Harmless, but it shows those pages keep two copies. Generate both from one array.

## GEO: does each page own a primary-sourced fact? (citation rule)

| Owns a dated, primary-sourced fact | Brand pair, but no owned fact | Generic best-X / topic page, no brand pair |
|---|---|---|
| `/databox` (no code exists; the Analyst→Pro user jump, read 5 Sep) · `/pipedrive` (AU$ seat pricing, 5 Sep) · `/keap` (one US$299 platform price, 5 Sep) · `/employmenthero` (which plan covers payroll, 30 Sep) · `/unbounce`, `/superfiliate` (dated offers, 27 Sep) · `/affiliate-software-australia` (no platform publishes a price) · `/best-newsletter-platform` (Substack 10% vs 0%, **but its Kit facts are stale**, P1-6) | `/carrd-vs-durable`, `/carrd-vs-butternut`, `/durable-vs-butternut` (all prices undated or contradictory, P1-3 and P2-5) | `/best-ai-sales-tools` (CLAUDE.md measured 0/10 citations), `/best-crm-small-business-australia`, `/best-website-builder`, `/high-paying-affiliate-programs`, `/recurring-affiliate-programs`, and all nine `/compare/*` hubs |

The 26 other brand pages are product descriptions with a free-trial box. None states a fact that is wrong elsewhere.

## Decisions that need Jarred

- **D-1. Leadpages "discount" (P1-8).** Is the 20% off annual billing specific to our link, or Leadpages' public annual price? Their pricing page shows it to everyone. If public, the "Discount Code" title and "via our link" copy should go. The same question applies to AliDrop's "Discount Code" title for a US$1 trial.
- **D-2. Correct or remove stale prices on partner pages.** This covers Durable (title), Carrd (9 vs 19), beehiiv and GHL. Under the 27 Sep rule the default is to remove partner prices rather than refresh them. The exceptions to decide: `/best-newsletter-platform` and the three builder vs pages, where the price is the owned fact and removing it removes the reason the page exists.
- **D-3. Keep, fold or retire the generic roundups:** `/best-ai-sales-tools`, `/best-website-builder`, `/best-crm-small-business-australia`, and the overlap between `/compare/ai-sales-tools` and `/compare/sales-outreach` (Reply.io and Snov.io are on both). The citation rule says do not build these. Retirement needs GSC impressions first; not pulled in this audit (`scripts/google-data.mjs`). Also check how the three Carrd/Durable/Butternut vs pages perform, given brand demand exists only for Mosh, Moshy and Juniper.
- **D-4. Blinq and PandaDoc have no hub.** Link them from the nearest hub (`/compare/ai-sales-tools`, "sales docs & contact sharing"), or leave them as `/guides`-only pages. Memory says no new B2B SaaS, so building a new hub is not recommended.
- **D-5. "Top pick" badges on B2B hubs.** Does the hub-neutrality rule (identical rows, alphabetical) apply outside health? Payoneer is labelled "Top pick" on a two-item hub.
- **D-6. Offer sourcing for Unbounce and Superfiliate.** Both offers are publicly visible on the vendor pages our links land on. Confirm with the partners whether anything about them is Refer Labs-specific before the `llms.txt` method line and `offers.ts` sources are changed (P2-8).
- **D-7. Prices this audit could not read:** Pipedrive and Reply.io (bot wall: 403 to curl with full Chrome headers and to WebFetch), and Capsule US$18/user and ActiveCampaign US$15/mo (rendered client-side). These need a manual read in a browser. Pipedrive's 5 Sep date is still inside the 45-day window.
- **D-8. Earning hub placements with no review page:** Payoneer, Snov.io, ZoomInfo (kept by your July call) and MeetGeek (`/meetgeek` 308s to `/compare/ai-tools`). Fine as is, or should any get a page or be dropped?
- **D-9. Affiliate-programs cluster: parked per your 29 Sep decision ("leave it as is").** Recorded for completeness only; no edits proposed. Its program tables carry undated, unsourced figures ("commonly cited around 30% for up to a year", repeated as a template across `/affiliate-programs-australia`, `/high-paying-affiliate-programs` and `/recurring-affiliate-programs`) and ItemLists with no urls.

## What passed and needs no work

- Canonicals, robots and one h1 on all 65 pages.
- Zero em-dashes and zero broken internal links.
- The disclosure sits above the first sponsored link on every page that has one, and every affiliate CTA carries `nofollow sponsored`.
- Every affiliate link resolves.
- The sitemap and `llms.txt` contain no redirecting, 410 or noindex URLs.
- The FAQ JSON-LD questions match the visible FAQs everywhere.
- Every brand page carries all four JSON-LD blocks.
- The real business discounts (Unbounce, Superfiliate) are in their titles, on `/deals`, and stated literally with dates in `llms.txt`.
- The retired B2B routes (`/services`, `/lead-hacking`, `/linkedin-*`, `/case-studies`, `/roi-calculator`, `/who-its-for`, business loans) all 308 in one hop to `/for-business` or `/guides`.
