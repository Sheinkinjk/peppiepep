# Refer Labs — working notes for Claude

Independent, NerdWallet-style affiliate comparison site for Australians. Next.js 16 App Router, React 19, Tailwind, TS. Deployed on Vercel (`main` → prod). Consumer money pages are health (weight-loss, hair-loss, peptides); everything else is business/marketing software + the $799 Referral Blueprint under `/for-business`.

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

### Internal linking (no orphans)
- Every page must be reachable from `/guides` (master index) **and** its category hub, **and** have inbound `relatedLinks` from 1–2 sibling pages. New pages with only one inbound link rank poorly — add reverse links.

### Prices & copy — no AI-slop, no guessing
- **Real, researched prices only.** Never "~$X", "around $X", "from about", "at the time of writing". The per-page `disclaimer` carries the single "pricing can change, verify current terms" caveat. If a vendor publishes no price, say "quote-based" / "priced by usage" — don't cite a guess.
- No invented ratings/read-times, no duplicate boilerplate across pages, no em-dashes (`—`). Health/YMYL copy is information-only, not medical advice; keep affiliate disclosure on every affiliate page.

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
