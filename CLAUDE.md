# Refer Labs — working notes for Claude

Independent, NerdWallet-style affiliate comparison site for Australians. Next.js 16 App Router, React 19, Tailwind, TS. Deployed on Vercel (`main` → prod). Consumer money pages are health (weight-loss, hair-loss, peptides); everything else is business/marketing software, the affiliate-programs cluster, and growth services under `/for-business`.

**Retired, do not reintroduce (July 2026):** the $799 Referral Blueprint and `/become-an-affiliate` (all 301 → `/affiliate-programs-australia`), and the Pepform referral SaaS platform (dashboards, ambassador programs, Twilio SMS/WhatsApp). **Blueprint fully shut down 26 Aug 2026:** its Supabase project was deleted, so no access token can be verified. **There were never any paid Blueprint users.** `/blueprint-access` was kept alive rather than redirected on the reasoning that buyers held that link in their receipts; with no buyers the premise was false, and on 28 Aug 2026 it was deleted and 308s to `/`, along with `/referral-blueprint/success` and `/referral-business-program/success`, which both rendered "Payment Confirmed" for a product that cannot be delivered. The checkout, lead and access API routes are deleted, the Blueprint branch is out of the Stripe webhook, and `supabase-blueprint.ts`, `abandoned-checkout.ts` and the buyer-confirmation email builder are gone. Do not rebuild any of it. Legal entity is **Pepform Pty Ltd trading as Refer Labs, ABN 32 660 008 159** — that is correct, do not "fix" it. Only `jarred@referlabs.com.au` receives mail (`noreply@` is an outbound Resend sender; never add `hello@`/`support@`/`security@`).

## SEO / AEO / GEO — apply on EVERY edit and new page

**These are requirements, not nice-to-haves. When you touch or create a page, verify all of them.**

### Metadata (SEO) — every public page
- Every public page needs its **own** title + meta description + canonical. Never let a page inherit the homepage title.
- Metadata comes from `generateSEOMetadata(seoConfig.<key>)` in `src/lib/seo.ts` (sets title, description, canonical, OG, Twitter).
- **Client components (`"use client"`) CANNOT export `metadata`.** If the page is a client component, add a sibling **`layout.tsx`** (server component) that does `export const metadata = generateSEOMetadata(...)`. This is the fix for the duplicate-title fault — see `src/app/faq/layout.tsx`.
- One `<h1>` per page.

### AEO (answer engines / featured snippets)
- Pages with Q&A **must** render **FAQPage JSON-LD** (see any brand `page.tsx` or `src/app/faq/layout.tsx`). Concise, factual answers.
- Every brand page config has a `quickAnswer` (a direct, citable answer) — keep it.

### GEO (ChatGPT / Perplexity / Claude citation)
- `public/robots.txt` allows the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.). Don't remove them.
- Keep **`public/llms.txt`** current — when you add a money page or change a category, update it. It's the curated index AI engines read.
- Structured data: brand pages carry `FAQPage` + `BreadcrumbList` + `WebPage` + `SoftwareApplication`; hubs carry `ItemList`. Sitewide `Organization` + `WebSite` are in `src/app/layout.tsx`.

### Indexing signals — the traps that cost us
- **`Disallow` and `noindex` are mutually exclusive.** Google must CRAWL a page to SEE its noindex. Disallowing a noindexed page means it can never be dropped from the index. To deindex: `noIndex: true` **and leave it crawlable**. `public/robots.txt` documents which paths are deliberately not disallowed for this reason.
- **robots.txt prefix matching is literal.** `Disallow: /referred/` does NOT match `/referred`. `Disallow: /r/` does NOT match `/referral`. Trailing slashes have bitten us twice.
- **Never put a noIndex or redirecting URL in `src/app/sitemap.ts`** — it tells Google to crawl a page we also tell it to drop. The sitemap is a manual list; prune it when you retire something.
- **Retiring a page = permanent (301/308) redirect to the closest live page by intent**, so ranking equity consolidates. `permanent: false` (307) tells Google the original is coming back and keeps the dead URL indexed. **Exception: the `/r/*` affiliate redirects stay temporary on purpose** — those destinations rotate.
- Avoid redirect **chains** (A→B→C leaks equity); point straight at the final destination.
- A page with no `metadata` export inherits the **root layout's canonical**, i.e. it claims to be the homepage. Any new route needs its own metadata (or a sibling `layout.tsx` if it's a client component).
- `seoConfig` entries for retired routes carry defensive `noIndex: true`, so removing a redirect can't silently republish them.
- **Bing Webmaster Tools is set up and verified** for referlabs.com.au, outside `seo.ts` (DNS / XML file / Search Console import). `seo.ts` emits a Google token only; that is not a missing Bing token. Its AI Performance report is the live read on GEO (1,200 citations / 28 days, 201 pages indexed, 34 warnings, 15 excluded, full query breakdown) and Bing is the index ChatGPT retrieves from. Do not report Bing as unverified or as a blind spot.
- Verify against the **live site**, not the filesystem: `next.config.ts` redirects make many routes unreachable, and auth guards 307 before render. A file-level audit will report problems that don't exist.

### Internal linking (no orphans)
- Every page must be reachable from `/guides` (master index) **and** its category hub, **and** have inbound `relatedLinks` from 1–2 sibling pages. New pages with only one inbound link rank poorly — add reverse links.

### Prices & copy — no AI-slop, no guessing
- **Real, researched prices only.** Never "~$X", "around $X", "from about", "at the time of writing". The per-page `disclaimer` carries the single "pricing can change, verify current terms" caveat. If a vendor publishes no price, say "quote-based" / "priced by usage" — don't cite a guess. Verify against the **vendor's own** page, not an aggregator. (Sole exception: the home-battery rebate `~$252/kWh` figures, where the STC spot price genuinely floats and the page says "Indicative only".)
- No invented ratings/read-times, no duplicate boilerplate across pages, no em-dashes (`—`). Health/YMYL copy is information-only, not medical advice; keep affiliate disclosure on every affiliate page.

### The AI-slop rule — the one that keeps regenerating
The tic is **narrating your own even-handedness instead of just being even-handed**. It comes back in new disguises after every sweep, so grep for the *move*, not the phrase. Say the thing; delete the sentence that introduces the thing.
- Banned: "the honest X" (comparison/trade/answer/shortlist/way), "with an honest reason why", "not X but Y", "It's not X, it's Y", "To be clear", "It is important to note", "Short answer:", "Here's the thing", "most people miss", "nobody markets", "the part almost nobody explains", "That said,", "Four things:", "the conclusion writes itself", "That is not hype".
- **Repetition converts a defensible phrase into slop.** One is fine; ten identical instances reads as a fill-in-the-blank template. Same for a shared sentence skeleton with the verb swapped across sibling pages.
- **Check `src/lib/seo.ts` meta descriptions too**, not just page bodies — those are SERP-visible.
- Legitimate and must stay: "honest answers about your health history" (means truthful), advice to the reader about their own conduct, and third-party figures with explicit attribution ("Apollo's own site cites 4.9/5").

### TGA — never name or identify a prescription medicine (Aug 2026 sweep)
Advertising a Schedule 4 medicine to the public is prohibited under the Therapeutic Goods Act, and the TGA has fined Australian weight-loss telehealth operators for exactly this. **Every page on this site carries an affiliate CTA or links into one, so no page can claim the editorial exemption** — the commercial nexus is what turns "information" into advertising.

**The rule: describe the SERVICE, never the medicine.** Banned in all shipped copy, metadata, keywords, JSON-LD, anchor IDs and `llms.txt`: `GLP-1`/`GLP1`, `semaglutide`, `tirzepatide`, `finasteride`, `minoxidil`, brand names (Ozempic, Wegovy, Mounjaro, Saxenda), and indirect identifiers like **"weight-loss injections"** — the TGA treats a description that lets a reader identify the medicine as advertising it.

Say instead: "practitioner-assessed treatment", "weight-management medicines are prescription-only in Australia", "any treatment is decided by the practitioner and only where clinically appropriate". Stating that medicines in a category require a prescription is a factual regulatory statement and is fine; naming *which* medicine is not.

A page that exists only to rank for a banned term cannot be fixed by stripping the term — retire it (301 to the category hub). Done for `/glp-1-weight-loss-australia` and `/weight-loss-injections-australia` (19 Aug 2026), as previously for the finasteride/minoxidil slugs. Watch for a mechanical find-and-replace leaving lowercase sentence starts, doubled words, or broken `href`s: the sweep corrupted `/glp-1-weight-loss-australia` links into `/weight management-weight-loss-australia`. Also note **BSD `sed` on macOS does not support `\b`** — word-boundary renames silently do nothing; use python.

### Never fabricate social proof (Australian Consumer Law)
Invented testimonials, personas, customer names, statistics, case studies or star ratings breach **ACL s29(1)(e)** and the ACCC enforces it. Real penalties, and it destroys the trust that is the entire moat. A tell: the same quote appearing under different job titles on different pages. Only publish a testimonial from a real, identifiable customer who consented. No star ratings of our own, ever.

**Do not "fix" the SoftwareApplication rich-result errors.** SEO tools (Semrush et al.) flag ~21 `SoftwareApplication` items as errors for missing `aggregateRating`/`review`. That is Google's *software* rich-result recipe wanting a star rating. We have no real ratings for Pipedrive, Brevo, AiSDR etc., and inventing them to clear the error is exactly the s29(1)(e) breach above, at scale, on commission pages. **Leave all of them.** The error count is the correct state for a site that will not invent ratings; the pages are not broken, they simply do not qualify for a rich result that needs something we cannot honestly provide. (The genuinely-real structured-data defects, missing `Offer.price` and `ItemList` `url`, are fine to fix and were.)

### Revenue-first page rule (master brief, Aug 2026)
No new page ships without a one-line answer to: **what search intent does it serve, what decision does it help the reader make, and what is its monetisation event** (affiliate click, lead capture, email capture, or internal funnel to a page that has one)? A keyword having volume is not a reason to build a page. Pages that can't answer this get folded into an existing page instead.

### The citation rule: what to build, and what never to build again (Aug 2026)

Measured over 115 AI answers across ChatGPT, Claude and Perplexity: the only Refer Labs
pages both ranking in Google and getting cited were the **brand-pair comparisons**
(`/moshy-vs-juniper` 7/15 citations at Google #6, `/mosh-vs-pilot` 7/12 at #6). Generic
`best-X` pages carrying no brand pair were invisible (`/best-ai-sales-tools` 0/10, no
impressions). Two conclusions, both load-bearing:

**1. A page earns its place by owning a fact, not by covering a topic.** Before building,
name the single fact the page will state that is (a) verifiable from a **primary source**
(the company's own site or disclosure, never an aggregator), (b) **not already correct** on
the pages that currently win the query, and (c) **load-bearing for a decision** that leads to
a money page. If you cannot name that fact, the page is another ranked list and will lose to
Canstar, Finder or Forbes, who outrank us on authority for every generic comparison.

Worked example, and the template: every published source names Knose's underwriter as
Hollard, Allied World or PetSure. Knose's own disclosure names Pacific International. That
one verifiable, wrong-everywhere fact justified `/who-underwrites-pet-insurance-australia`;
a tenth "best pet insurance" list would not have.

**2. Publish the commercially inconvenient half.** The reason that page is citable is that it
states our two partners share an insurer, which argues against treating them as alternatives.
A page that only says what suits us reads as marketing and gets cited like marketing.

**Format, in priority order** (measured, not stylistic):
- Title carries a **brand pair or a named entity**, not a category ("Moshy vs Juniper", "Who
  underwrites pet insurance"), because that is what both Google and the engines matched.
- **The answer is the first paragraph after the `<h1>`.** Nothing goes above it: not the
  last-updated line, not a disclaimer box, not a CTA. Twelve pages had metadata sitting in
  that slot in Aug 2026 and it was fixed for exactly this reason. **It came back twice**, in
  `HairLossGuide` and `ApolloGuide` (an `EditorialMeta` strip) and then on 34 pages when the
  affiliate disclosure was hoisted to fix a different fault, so `scripts/check-answer-slot.mjs`
  now runs in `postbuild` and watches it. A heading between the `<h1>` and the lead is
  allowed and is often the better pattern: `/best-pet-insurance-australia` asks the buyer's
  question as an `<h2>` and answers it underneath. Furniture is what may not sit there.
- At least one `<h2>` is the buyer's question **verbatim**, with a liftable answer beneath.
- Every figure carries the source it was read from and the **date it was read**.

**Do not build:** another `best-<category>` page with no brand pair and no owned fact; a page
for a query with **zero Google impressions** (a page must be indexed and snippet-eligible
before any engine quotes it, so ranking comes first and content rewrites address the wrong
step); a page for a query with **no recorded monetisation route**; a duplicate of a page we
already have (check first: `/weight-loss-telehealth-cost-australia` and `/business-software`
both exist and have been proposed as "missing").

**Do not cargo-cult a competitor's schema.** Adding `BlogPosting` because a quoted page has it
is worthless when we already emit `Article`, its parent type.

## Adding a new affiliate/brand page — the full checklist
1. `src/lib/affiliate-links.ts` — export the tracked URL constant.
2. `src/app/<slug>/config.ts` — `AffiliatePageConfig` (quickAnswer, offer, atAGlance w/ REAL price, hero, sections, `faqs`, `relatedLinks`, disclaimer).
3. `src/app/<slug>/page.tsx` — renders `PremiumAffiliateLanding` + the 4 JSON-LD blocks (pattern: copy an existing brand page).
4. `src/lib/seo.ts` — add `seoConfig.<slug>` (title, description, url, keywords). **Required** or the page has no metadata.
5. Wire it in: `src/app/sitemap.ts` (manual list — add it), `/guides`, `src/lib/search-index.ts`, `src/lib/catalog/catalog.ts` (add as a provider if it fits a `/compare` vertical), `/business-software` grid (if a business tool).
6. Inbound links: add `relatedLinks` to it from 1–2 sibling pages.
7. Logo: `public/logos/<slug>.png` (square, transparent, ~256px). Falls back to a monogram until added.
8. Update `public/llms.txt` if it's a notable/money page.

## Onboarding a new affiliate/referral program — the standard
Run this in order. Steps 1-3 are the ones that were repeatedly missed and cost real revenue.

**1. Verify the facts from the vendor's own page, never from the partner's email or memory.**
`WebFetch` the actual landing page and read off: plan names, what each includes, limits, the exact code string, and the offer's conditions. If WebFetch gets a 403, the site is blocking its user-agent, not hiding the data: retry with `curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`, which is how Knose's cover page was recovered. If a vendor publishes no price, say so; never fill the gap.

**2. Write down what the offer actually discounts.** A partner saying "15% off" does not mean 15% off the product. PetsOnMe's REFERLABS discounts *pet care services*, not the premium; describing it as an insurance discount would breach ACL s29. State the object of the discount in every place the offer appears.

**3. Name the code in `public/llms.txt`.** This is the single highest-value AEO step and the one most often skipped. "$120 off, no code to type" is true but gives an engine nothing to match when someone asks for "<brand> discount code". Write the literal string: **"the current X discount code is CODE"**, plus the conditions and the date you verified it. Every code in `offers.ts` must appear in `llms.txt`.

**4. Date every offer and price claim** inline ("verified on <brand>'s own page, 17 August 2026"), and asterisk prices with a "view the latest pricing on <brand>'s own site" note. Do NOT bump the global `VERIFIED_DATE` in `offers.ts` unless you re-checked every offer in the table.

**5. Then the page checklist below** (affiliate-links.ts → config → page.tsx → seo.ts → sitemap/guides/search-index/catalog → inbound links → logo → llms.txt).

**6. Add it to `src/lib/offers.ts`** so it appears in `/deals`. Knose and PetsOnMe were both live for months without ever reaching the offers hub.

**7. Logo:** pull it from the vendor's own site rather than asking for a file. Many ship a white-on-brand SVG that is invisible on our light background: recolour the fills to the brand's own hex (PetsOnMe → `#1faae1`), never to an invented colour.

**8. Link the money page from the nav and the hub**, not just the review page. `/moshy` sat at 6 inbound files against the review's 16, and was absent from the nav entirely.

**9. Keep `llms.txt` clean.** Retiring or redirecting a page means removing its `llms.txt` entry: pointing AI engines at a 308 wastes the citation. Re-run the URL check after any retirement.

### Measuring the site: two rules, both learned by getting them wrong

**A surprisingly bad number gets checked against three pages by hand before it is
reported.** Four measurement bugs have now produced numbers that were acted on:

| The number | What was actually wrong |
|---|---|
| "4 pages have undated claims" | the date regex matched only full month names, so `17 Aug 2026` was invisible |
| "only 31% of pages are answer-first" | the window read h1-to-first-h2, so a page leading with the buyer's question as a heading scored zero. The real figure was 57% |
| "31 dead affiliate links" | PartnerStack 404s on HEAD and 200s on a browser GET. Two were dead |
| "68 pages fail answer-first" | the metric scored "pay nothing" and "no single price" as failures because they contain no digit, measuring punctuation rather than answers |

The tell is the same every time: the number is worse than the site feels. Three
pages read by hand costs a few minutes and has caught every one of these.

**Before any before-and-after comparison, check whether the treatment group was
touched inside the measurement window.** The Search Console join initially showed
answer-first pages out-clicking the rest in three of four position bands. Then:
**88 of the 152 pages counted as answer-first had been edited on 4 and 5
September, after the window closed on 2 September**, carrying 23,065 of 44,705
impressions and 236 of 361 clicks. The comparison was measuring recent edits
against pages Google saw months ago. Excluding everything touched left a control
group with **one click in total**, so the test was not available at all.

That result would have been believed. Structural work had just shipped, the
number pointed the way everyone expected, and nothing in the output flagged it.
Any join between a content change and a traffic metric needs the edit dates of
both sides checked before the numbers are read, not after.

**Counting a name is not counting a fact.** An audit reported Brevo, Pipedrive
and Leadpages as merchants whose discount code we hold. We hold four codes:
Moshy, Mosh, Knose, PetsOnMe. The other three matched because their names appear
in `offers.ts` **comments**. Partner counts, code counts and offer counts come
from the `DEALS` rows themselves, never from a string search over the file that
contains them.

**A regex matching a string is not evidence of a problem.** `/terms` was reported
as "the most exposed thing in this audit", escalated to the top of a lawyer list,
and the finding was 35 hits on **Pepform**, our own legal entity name, which this
file explicitly says not to "fix". Acting on it would have deleted correct legal
identity from the terms of service.

Before reporting a match as a fault, read one. Ask what the string *is* in
context: a negation ("suitability is never guaranteed"), a question the page then
answers ("what is the best CRM?" / "there is no single best"), an attributed
quote, our own disclaimer, or our own company name. A scan for ACL superlatives
flagged 103 pages; reading them, three carried a real claim.

**The corollary for guards.** A new check gets its false positives read before it
ships, and gets tested by reintroducing the real fault. `check-answer-slot` was
wrong three times before it was right: it flagged an h2 question as furniture
(that is the pattern we want), read a window that ran past the paragraph it was
judging, and failed a lead that answered the question and then closed with a
disclosure. And an unwired guard passes silently: wire it into `prebuild` or
`postbuild`, then break something on purpose and watch it fail.

### Adding a partner to a coming-soon hub: the five artefacts

Partners one through four were each added from memory and each one missed something
different. A partner addition is exactly these five things, in this order. If you are not
touching all five, you have not finished.

1. **Destination** — one entry per *placement* in `src/lib/go-links.ts`, keyed
   `<partner>-<page-slug>`, so a conversion can be attributed to the page that produced it.
   Never one entry per partner: most networks cannot tell our pages apart, and the slug is
   the only signal we get. Deep-link only if a server response proves the referral survives
   the hop; Midoc's does not, so every Midoc placement points at the homepage on purpose.
2. **Data file** — `src/lib/partners/<partner>.ts`, holding every price and access fact,
   with a **`readOn`** date and a **`source`** URL. Both are mandatory and
   `check-partner-freshness` enforces them. Declare each price once as a constant and
   reference it from every field, including any table: the first version of `midoc.ts`
   duplicated its prices and a test edit moved 30 mentions while leaving 2 behind. Derive
   anything computed (a spread, a count, a cheapest model) rather than typing it.
3. **Allowlist** — a `PARTNERS` entry in `scripts/check-partner-scope.mjs` naming the
   tokens and the *only* route prefixes the partner may appear under. Without it the
   partner can leak onto a page monetised by a competitor.
4. **Registries** — `seoConfig`, `sitemap.ts`, `search-index.ts`, `/guides`, the hub's own
   `guides` array, `/coming-soon`, and `offers.ts` **if and only if there is a genuine
   monetary discount**. Reverse `relatedLinks` from 1-2 siblings so the page is not an
   orphan.
5. **`llms.txt`** — the partner named in prose, the code stated literally if there is one,
   and **every stale "we earn nothing here" sentence removed**. On 4 Sep 2026 this file
   was still telling AI engines both partnered hubs had no commercial partner.
   `check-partner-scope` now fails the build on that, but it only checks the sentences it
   knows about: read the hub's entry, do not just grep.

Then `npm run build` (which runs both guards), `npm run check-offers`, and `npm run
check-aeo`. Verify against the live site after deploying, never the filesystem.

**Re-verification.** `check-partner-freshness` is silent under 45 days, warns from 45 with
the list of pages that print the figures, and fails the build at 90. To clear it, open the
`source` URL, correct anything that moved, then set `readOn` to today. Bumping `readOn`
without re-reading makes the date a lie, and the date is the claim the pages print.

**The failure shape to watch for.** Every one of these rules exists because a sentence that
was true when written went stale when something else changed. Any text asserting the
commercial state of a hub, a page or a price is a generated artefact stored as prose: it
must be derived from the thing it describes, or guarded by a check that compares the two.
Never hand-maintained, never duplicated. See the addendum in
`reports/partner-launch-plan-2026-09-03.md`.

### Adding an offer: run the checker
`npm run check-offers` verifies every brand page reaches all eight places an offer has to land (seoConfig, sitemap, search-index, /guides, offers.ts, llms.txt, plus the discount appearing in the `<title>`). Steps 5-8 are the ones historically skipped: Knose and PetsOnMe were both live for months without ever appearing on `/deals`, which fails silently and costs real revenue. Run it after adding a program and before pushing.

Two rules it encodes, both learned the hard way:
- **Only a genuine monetary discount belongs on `/deals`.** A free trial anyone can start direct from the vendor is not a deal, and listing them all buries the offers that actually differentiate us. Of 39 brand pages, only a handful have a real discount, which is why Superfiliate converts and the rest mostly do not.
- **A real discount must appear in the `<title>`.** `/moshy` and `/moshhair`, the two best-performing pages on the site, both carry the amount there. Pages with a real offer that omitted it were underperforming for that reason alone.

## Deploy & verify (do this after changes)
`git` commit on `main` (branch first if needed) → push → `vercel --prod --yes` → poll `vercel inspect <url>` for "Ready" → **curl-verify the change is live** → `npm run indexnow` (pushes changed URLs to Bing/Yandex). Co-author commits per the global convention.

## Deeper context
Persistent decisions/architecture live in the auto-memory at `~/.claude/projects/.../memory/` (taxonomy, pricing rules, theme split, off-core-program pruning, etc.). Check `MEMORY.md` there.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
