# Refer Labs — working notes for Claude

Independent, NerdWallet-style affiliate comparison site for Australians. Next.js 16 App Router, React 19, Tailwind, TS. Deployed on Vercel (`main` → prod). Consumer money pages are health (weight-loss, hair-loss, peptides); everything else is business/marketing software, the affiliate-programs cluster, and growth services under `/for-business`.

**Retired, do not reintroduce (July 2026):** the $799 Referral Blueprint and `/become-an-affiliate` (all 301 → `/affiliate-programs-australia`), and the Pepform referral SaaS platform (dashboards, ambassador programs, Twilio SMS/WhatsApp). `/blueprint-access` and `/referral-blueprint/success` must keep working: people paid for those. Legal entity is **Pepform Pty Ltd trading as Refer Labs, ABN 32 660 008 159** — that is correct, do not "fix" it. Only `jarred@referlabs.com.au` receives mail (`noreply@` is an outbound Resend sender; never add `hello@`/`support@`/`security@`).

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
  that slot in Aug 2026 and it was fixed for exactly this reason.
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

### Adding an offer: run the checker
`npm run check-offers` verifies every brand page reaches all eight places an offer has to land (seoConfig, sitemap, search-index, /guides, offers.ts, llms.txt, plus the discount appearing in the `<title>`). Steps 5-8 are the ones historically skipped: Knose and PetsOnMe were both live for months without ever appearing on `/deals`, which fails silently and costs real revenue. Run it after adding a program and before pushing.

Two rules it encodes, both learned the hard way:
- **Only a genuine monetary discount belongs on `/deals`.** A free trial anyone can start direct from the vendor is not a deal, and listing them all buries the offers that actually differentiate us. Of 39 brand pages, only a handful have a real discount, which is why Superfiliate converts and the rest mostly do not.
- **A real discount must appear in the `<title>`.** `/moshy` and `/moshhair`, the two best-performing pages on the site, both carry the amount there. Pages with a real offer that omitted it were underperforming for that reason alone.

## Deploy & verify (do this after changes)
`git` commit on `main` (branch first if needed) → push → `vercel --prod --yes` → poll `vercel inspect <url>` for "Ready" → **curl-verify the change is live** → `npm run indexnow` (pushes changed URLs to Bing/Yandex). Co-author commits per the global convention.

## Deeper context
Persistent decisions/architecture live in the auto-memory at `~/.claude/projects/.../memory/` (taxonomy, pricing rules, theme split, off-core-program pruning, etc.). Check `MEMORY.md` there.
