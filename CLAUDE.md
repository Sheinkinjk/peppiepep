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

### Never fabricate social proof (Australian Consumer Law)
Invented testimonials, personas, customer names, statistics, case studies or star ratings breach **ACL s29(1)(e)** and the ACCC enforces it. Real penalties, and it destroys the trust that is the entire moat. A tell: the same quote appearing under different job titles on different pages. Only publish a testimonial from a real, identifiable customer who consented. No star ratings of our own, ever.

**Do not "fix" the SoftwareApplication rich-result errors.** SEO tools (Semrush et al.) flag ~21 `SoftwareApplication` items as errors for missing `aggregateRating`/`review`. That is Google's *software* rich-result recipe wanting a star rating. We have no real ratings for Pipedrive, Brevo, AiSDR etc., and inventing them to clear the error is exactly the s29(1)(e) breach above, at scale, on commission pages. **Leave all of them.** The error count is the correct state for a site that will not invent ratings; the pages are not broken, they simply do not qualify for a rich result that needs something we cannot honestly provide. (The genuinely-real structured-data defects, missing `Offer.price` and `ItemList` `url`, are fine to fix and were.)

## Adding a new affiliate/brand page — the full checklist
1. `src/lib/affiliate-links.ts` — export the tracked URL constant.
2. `src/app/<slug>/config.ts` — `AffiliatePageConfig` (quickAnswer, offer, atAGlance w/ REAL price, hero, sections, `faqs`, `relatedLinks`, disclaimer).
3. `src/app/<slug>/page.tsx` — renders `PremiumAffiliateLanding` + the 4 JSON-LD blocks (pattern: copy an existing brand page).
4. `src/lib/seo.ts` — add `seoConfig.<slug>` (title, description, url, keywords). **Required** or the page has no metadata.
5. Wire it in: `src/app/sitemap.ts` (manual list — add it), `/guides`, `src/lib/search-index.ts`, `src/lib/catalog/catalog.ts` (add as a provider if it fits a `/compare` vertical), `/business-software` grid (if a business tool).
6. Inbound links: add `relatedLinks` to it from 1–2 sibling pages.
7. Logo: `public/logos/<slug>.png` (square, transparent, ~256px). Falls back to a monogram until added.
8. Update `public/llms.txt` if it's a notable/money page.

## Deploy & verify (do this after changes)
`git` commit on `main` (branch first if needed) → push → `vercel --prod --yes` → poll `vercel inspect <url>` for "Ready" → **curl-verify the change is live** → `npm run indexnow` (pushes changed URLs to Bing/Yandex). Co-author commits per the global convention.

## Deeper context
Persistent decisions/architecture live in the auto-memory at `~/.claude/projects/.../memory/` (taxonomy, pricing rules, theme split, off-core-program pruning, etc.). Check `MEMORY.md` there.
