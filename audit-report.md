# ReferLabs codebase audit

**Date:** 7 September 2026
**Repo state:** clean tree at `e2cbd54`. Only untracked path is `research/`.
**Method:** all "server-rendered HTML" findings are read from the committed prerendered build at `.next/server/app` (263 `.html` files, built 7 Sep 2026 11:00, matching HEAD). No build, install, migration or deploy was run, because `prebuild` writes `src/lib/page-dates.ts` and that would be a write.
**Files written:** `audit-report.md` and `audit-pages.csv` only.

Sections are ordered as requested in the brief output spec. Section 2 was completed first, as instructed.

---

## SECTION 2 — The code layer

### 2.1 Codes defined

Five code strings exist in the repo. Four are customer-facing discount codes; the fifth carries no customer discount.

| Code | Merchant | Stated value | Defined at |
|---|---|---|---|
| `REFERRAL120` | Moshy | "$120 off your first order" | `src/lib/offers.ts:63`, `src/lib/offers.ts:133`, `src/lib/offers.ts:193` |
| `REFERAL55` | Mosh | "55% off your first order" | `src/lib/offers.ts:134`, `src/lib/offers.ts:201` |
| `referlab2mf` | Knose | "2 months free for new customers" | `src/lib/offers.ts:143`, `src/lib/offers.ts:211` |
| `REFERLABS` | PetsOnMe | "15% off pet care services, up from 12% (not the premium)" | `src/lib/offers.ts:144`, `src/lib/offers.ts:221`, `src/lib/affiliate-links.ts:33` |
| `JARREDKFC` | Juniper | **No customer discount.** Commission-only tracking parameter | `src/lib/affiliate-links.ts:45`, commented at `src/lib/affiliate-links.ts:40` and `src/app/juniper/page.tsx:16` |

`JARREDKFC` appears only inside a URL query string, not as displayed copy. Exact value at `src/lib/affiliate-links.ts:45`:

> `"https://www.myjuniper.com/?utm_source=affiliate&utm_campaign=jarred_k&discountCode=JARREDKFC"`

The comment at `src/lib/affiliate-links.ts:40` reads: `// Commission-only tracking link. The code JARREDKFC gives the customer NO`. The comment at `src/app/juniper/page.tsx:16` reads: `// JARREDKFC is commission-only: NO customer discount is claimed anywhere here.`

### 2.2 The primary output: codes in image form

**Zero codes appear in image form. The list is empty.**

Evidence, all four codes tested against `<img>` markup, `alt` attributes, CSS `background-image`, and `url()` references across `src/` and `public/`:

| Code | Occurrences inside image markup |
|---|---|
| `REFERRAL120` | 0 |
| `REFERAL55` | 0 |
| `REFERLABS` | 0 |
| `referlab2mf` | 0 |

SVG assets were tested separately. Files scanned include `public/logos/knose.svg`, `public/logos/petsonme.svg`, `public/logos/unbounce.svg`. **No SVG in `public/` contains any code string.** The only non-`.tsx` file in `public/` containing a code is `public/llms.txt`, which is plain text.

Every code renders as selectable HTML text.

### 2.3 Presence in the initial server-rendered HTML response

All four codes are present in the prerendered HTML, not injected after hydration.

| Code | Prerendered `.html` files containing it |
|---|---|
| `REFERRAL120` | 13 |
| `REFERAL55` | 7 |
| `referlab2mf` | 7 |
| `REFERLABS` | 8 |

26 distinct pages carry at least one code in server HTML (see `audit-pages.csv`, `code_present` column).

### 2.4 Summary table

| Code | Merchant | Value | Crawlable text | In server HTML | Has verified date | Locations |
|---|---|---|---|---|---|---|
| `REFERRAL120` | Moshy | $120 off first order | **yes** | **yes** (13 files) | **yes**, `verified: "2026-08-17"` at `src/lib/offers.ts:133` | 70 source locations |
| `REFERAL55` | Mosh | 55% off first order | **yes** | **yes** (7 files) | **yes**, `verified: "2026-08-17"` at `src/lib/offers.ts:134` | 50 source locations |
| `referlab2mf` | Knose | 2 months free | **yes** | **yes** (7 files) | **yes**, `verified: "2026-08-27"` at `src/lib/offers.ts:143` | 29 source locations |
| `REFERLABS` | PetsOnMe | 15% off pet care services, not the premium | **yes** | **yes** (8 files) | **yes**, `verified: "2026-08-17"` at `src/lib/offers.ts:144` | 27 source locations |
| `JARREDKFC` | Juniper | none (commission-only) | **no** (URL param only) | URL only | no `verified` field | 3 source locations |

### 2.5 Terms rendered as text near each code

`src/lib/offers.ts:188-224` defines `OFFER_FACTS`, which carries the object and conditions of each code as structured text. Verbatim values:

- `REFERRAL120` (`:192-197`): `object: "a new customer's first order"`, `newCustomer: true`, `oneUse: true`
- `REFERAL55` (`:200-204`): `object: "a new customer's first order"`, `newCustomer: true`. Comment at `:199` states `oneUse omitted: Mosh does not state it anywhere on file.`
- `referlab2mf` (`:210-213`): `object: "a policy taken out through our link"`, `newCustomer: true`
- `REFERLABS` (`:220-223`): `object: "pet care services, up from the usual 12%, not the insurance premium"`. Comment at `:216-218` states this distinction exists to prevent an ACL s29 breach.

Rendered example, `.next/server/app/moshy.html`, page body: "The current Moshy discount code is REFERRAL120... verified against Moshy's own sign-up page on 17 August 2026."

Full terms text at `src/app/moshy/config.ts:129` includes: "one use per customer, and carries a minimum three-month commitment".

### 2.6 A conflict between two stated verification dates

`src/lib/offers.ts:133` records `verified: "2026-08-17"` for Moshy. The sweep comment at `src/lib/offers.ts:14-22` states the 25 Aug 2026 sweep re-read seven offers from vendor pages and that "The rest could not be verified without partner access: Moshy's REFERRAL120, Mosh's REFERAL55, Knose's referlab2mf, PetsOnMe's". Knose nonetheless carries `verified: "2026-08-27"` at `:143`, dated after that sweep, sourced by the comment at `src/lib/offers.ts:206-208` to a manual read by the owner.

`src/lib/offers.ts:27` and `:31` note for PetsOnMe: "Its link, petsonme.com.au/pet-insurance/compare-cover/, carries no tracking parameter of any kind, so attribution depends entirely on the customer remembering to type" the code.

---

## SECTION 3 — Crawler and agent access

Source: `public/robots.txt`, lines 1-66. There is no `middleware.ts`. `src/proxy.ts` exists (7,727 bytes, dated 5 Sep 2026).

### 3.1 Per user agent

Two groups exist: `User-agent: *` (line 12) and a combined AI group (lines 38-50). Both carry `Allow: /` and an identical Disallow list.

| User agent | Status | Exact directive |
|---|---|---|
| GPTBot | **Allowed** | `User-agent: GPTBot` (line 38), `Allow: /` (line 51) |
| OAI-SearchBot | **Allowed** | line 39 |
| ChatGPT-User | **Allowed** | line 40 |
| ClaudeBot | **Allowed** | line 41 |
| anthropic-ai | **Allowed** | line 43 |
| **Claude-User** | **Unmentioned.** Falls under `*` | Not present. Line 42 names `Claude-Web`, a different token |
| PerplexityBot | **Allowed** | line 44 |
| Perplexity-User | **Allowed** | line 45 |
| Google-Extended | **Allowed** | line 46 |
| **Googlebot** | **Unmentioned.** Falls under `*` (line 12), which is `Allow: /` | No named group |
| **Bingbot** | **Unmentioned.** Falls under `*` | No named group |
| Applebot-Extended | **Allowed** | line 47 |
| **CCBot** | **Unmentioned.** Falls under `*` | No named group |
| meta-externalagent | **Allowed** | line 50 |
| Amazonbot | **Allowed** | line 49 |
| **Bytespider** | **Unmentioned.** Falls under `*` | No named group |

Also named but not on the brief's list: `Claude-Web` (line 42), `cohere-ai` (line 48).

### 3.2 Disallowed paths (identical in both groups)

`/dashboard/`, `/dashboard-test/`, `/api/`, `/auth/`, `/go-live`, `/status`, `/analytics`, `/application`, `/calendly`, `/go/`, `/r/`, `/me/`, `/payment/` (lines 15-30 and 52-64).

**`/go/` is disallowed** (line 26 and line 61). The comment at `src/app/go/[slug]/route.ts:19-21` states this is deliberate: "Disallowed in robots.txt alongside /r/ and /me/, so no crawler follows a monetised hop".

### 3.3 Bot detection, WAF, rate limiting, geo-blocking

**UNKNOWN — not determinable from repo.** No WAF rule, rate limiter, bot-detection library or geo-block appears in `next.config.ts` or `src/proxy.ts`. Vercel Firewall and Cloudflare settings are configured outside the repository. Determining this requires the Vercel project dashboard.

### 3.4 Sitemap

`public/robots.txt:66`: `Sitemap: https://referlabs.com.au/sitemap.xml`

The sitemap is generated by `src/app/sitemap.ts`. **Whether the URL resolves live was not tested**, because that requires a network request against production, which is outside a repo-only audit. UNKNOWN — requires a live fetch.

### 3.5 Non-200 routes to unauthenticated requests

`next.config.ts:33` defines `redirects()`. `next.config.ts:89-100` shows 12+ business-lending routes returning `permanent: true` (308) to `/for-business`. Header rules at `next.config.ts:338-425` set `Cache-Control` only; one entry at `:405` sets `private, no-cache, no-store, must-revalidate`.

Full enumeration of non-200 routes was not performed against a live server. UNKNOWN for live status codes.

---

## SECTION 4 — Self-answer capability in raw HTML

Ten pages carrying partner offers, read from prerendered HTML. All content quoted below is present in the server response before any JavaScript executes.

**Every one of the ten answers yes.** Evidence per page:

| Page | `<h1>` | H2s (first 3) | Code in server HTML | Body words | Self-answers |
|---|---|---|---|---|---|
| `/moshy` | "Moshy discount code Australia: $120 off your first order." | What is the current Moshy discount code? / Is getmoshy.com.au the official Moshy site? / What Moshy actually is | `REFERRAL120` | 1,665 | **yes** |
| `/moshhair` | "Mosh discount code Australia: 55% off your first order" | Mosh offer at a glance / What is the current Mosh discount code? / What Mosh actually is | `REFERAL55` | 2,197 | **yes** |
| `/knose` | "Knose promo code referlab2mf: 2 months free for new customers" | What is the current Knose promo code? / Before you take up the offer / Common questions | `referlab2mf` | 651 | **yes** |
| `/petsonme` | "PetsOnMe pet insurance: the cover, and what the REFERLABS code gives you" | What does the REFERLABS code give you? / The three PetsOnMe plans / What to check before you buy | `REFERLABS` | 1,143 | **yes** |
| `/deals` | "Australian discount codes, each dated" | Current offers at a glance / Best deals right now / More free trials & offers | all four | 1,001 | **yes** |
| `/mosh-review` | "Mosh review: is it legit, and is it worth it?" | The short version / Is Mosh legit? / Is it worth it? | `REFERAL55` | 1,155 | **yes** |
| `/moshy-review` | "Moshy review: is it legit, and what the service is like" | The short version / What you get / What happens when you apply | `REFERRAL120` | 895 | **yes** |
| `/best-pet-insurance-australia` | "Best pet insurance in Australia: how to actually choose" | What is the best pet insurance in Australia? / The providers we cover / The six things that decide what you get back | `REFERLABS`, `referlab2mf` | 1,951 | **yes** |
| `/best-weight-loss-telehealth-australia` | "Best Weight Loss Telehealth Australia 2026" | What is the best weight-loss telehealth in Australia? / Where to start / What telehealth weight loss actually costs | `REFERRAL120` | 1,584 | **yes** |
| `/best-hair-loss-treatment-australia` | "Best Hair Loss Treatment Australia 2026: Mosh vs Dense vs Telehealth" | What is the best hair-loss treatment in Australia? / How the plans compare / The offer at a glance | `REFERAL55` | 1,516 | **yes** |

### Selected first-60-words and metadata evidence

**`/moshy`** — `<title>`: "Moshy Discount Code Australia 2026: $120 Off | Refer Labs". Meta description: "The current Moshy discount code is REFERRAL120. It applies through our link for $120 off a first order, read off Moshy's own..." First 60 words: "Moshy discount code Australia: $120 off your first order. The current Moshy offer is $120 off your first order , applied automatically through our referral link (code REFERRAL120), so there is no code to type. Below is an independent look at how Moshy actually works, what it costs, and how eligibility runs. Information only, and..."

**`/knose`** — `<title>`: "Knose Promo Code 2026: 2 Months Free | Refer Labs". First 60 words: "Refer Labs / Pet insurance / Knose Pet insurance · Current offer Knose promo code referlab2mf : 2 months free for new customers Knose is an Australian pet insurance provider. New customers can get 2 months free when they take out a policy using the code referlab2mf through our link..."

**`/best-pet-insurance-australia`** — the buyer's question appears as an H2 with the answer immediately beneath: "What is the best pet insurance in Australia? There is no single best policy, and a page that names one without knowing your pet is guessing."

### 4.1 Client-component and hydration exposure

**Two pages across the entire 261-page site are client components** (`"use client"` in the first 400 bytes of the source file). Neither is among the ten offer pages. See `render_mode` column in `audit-pages.csv`.

**No offer page has its substantive content inside a client component, behind a tab, in an empty-rendering accordion, or loaded by a client-side Supabase call.** No `from('offers')` or `from('clicks')` call exists anywhere in `src/` (see Section 8).

---

## SECTION 5 — Structured data

263 prerendered HTML files scanned for `application/ld+json`.

- **Malformed JSON-LD blocks: 0.** Every block parsed as well-formed JSON.
- **Pages emitting no structured data: 1**, `/_global-error`, which is a framework error boundary and not a public route.

### Schema types emitted, by page count

| Type | Pages |
|---|---|
| ItemList | 262 |
| Organization | 262 |
| WebSite | 262 |
| BreadcrumbList | 213 |
| FAQPage | 207 |
| WebPage | 162 |
| Article | 69 |
| SoftwareApplication | 37 |
| Offer | 20 |
| CollectionPage | 14 |
| Service | 6 |
| Dataset | 2 |
| Product | 2 |
| AboutPage | 1 |
| Person | 1 |

### `@id` stability and cross-referencing

`src/components/StructuredData.tsx:89-103` documents a deliberate shared `@id`:

> `// Carries the SAME @id as the Person node on /authors/jarred, so the two are` … `"@id": "https://referlabs.com.au/authors/jarred#person"`, `"url": "https://referlabs.com.au/authors/jarred"`

The comment at `:92` states the reason: it avoids "every page, competing with the node that 65 Article authors point at."

### Mismatch between structured data and visible content

**One found.** `src/components/StructuredData.tsx:348` emits a placeholder telephone number inside a `ProfessionalService` node:

> `"telephone": "+61-xxx-xxx-xxx",`

Adjacent lines: `"@type": "ProfessionalService"` (`:344`), `"name": "Refer Labs"` (`:345`), `"email": "jarred@referlabs.com.au"` (`:349`).

**This value appears in 0 built HTML files**, so the node is not currently rendered on any prerendered page. It is a live string in shipped source that would emit a placeholder phone number if that branch were rendered.

`SoftwareApplication` (37 pages) carries no `aggregateRating` or `review`. `CLAUDE.md` records this as intentional.

---

## SECTION 6 — Trust, disclosure and entity signals

| Item | Exists | Evidence |
|---|---|---|
| Affiliate disclosure | **Yes, on 135 of 261 pages** | String "earn a commission" present in 135 prerendered HTML files. Example rendered text, `/mosh-review`: "Refer Labs may earn a commission if you sign up or buy through the links on this page" |
| `/how-we-make-money` | **Yes** | Directory `src/app/how-we-make-money` exists. Body copy is **under 300 words** (see `audit-pages.csv`) |
| `/how-we-research` | **No.** Directory absent | `src/app/how-we-research` does not exist, despite being referenced as the trust layer in `CLAUDE.md` |
| `/editorial-policy` | **No** | Directory absent |
| `/methodology` | **No** | Directory absent |
| `/about` | **Yes** | `src/app/about` exists |
| `/contact` | **Yes**, body copy under 300 words | `src/app/contact` exists |
| ABN | **Yes** | `src/app/terms/page.tsx:528`: `<p className="text-[#2b362f]">ABN: 32 660 008 159</p>`. Also emitted in structured data at `src/components/StructuredData.tsx:24-25`: `"propertyID": "ABN"`, `"value": "32 660 008 159"` |
| Physical/postal address | **Partial.** Country only | `src/components/StructuredData.tsx:` `"@type": "PostalAddress"`, `"addressCountry": "AU"`. No street or suburb found |
| Telephone | **Placeholder only** | `src/components/StructuredData.tsx:348`: `"+61-xxx-xxx-xxx"`. Not rendered on any page |
| Named authorship | **Yes** | `src/components/StructuredData.tsx:99` `"@id": "https://referlabs.com.au/authors/jarred#person"`; default `authorName = "Refer Labs"` at `:226`. An `/authors/jarred` page exists and is **under 300 words** |
| Last-updated dates as text | **Yes, on 82 of 261 pages** | Matched pattern `(Last updated\|Updated\|Verified)... <d> <Month> 20\d\d` in rendered body |
| Dates hardcoded or generated | **Generated** | `src/lib/page-dates.ts` is written by `scripts/generate-page-dates.mjs` from git history, run in `prebuild` |

Disclosure position relative to the offer: on all eight comparison pages tested, disclosure text appears twice per page (`disclosure-text=2`). Whether it sits above or below the first affiliate link is enforced by `scripts/check-disclosure-order.mjs`, which runs in `postbuild`.

---

## SECTION 7 — Attribution and link handling

### 7.1 The `/go/[slug]` layer

Exists at `src/app/go/[slug]/route.ts`. Full handler, lines 25-36:

```
export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const destination = GO_DESTINATIONS[slug];
  if (!destination) {
    return NextResponse.redirect(new URL("/mens-health", _req.nextUrl.origin), 302);
  }
  return NextResponse.redirect(destination, 302);
}
```

**The route logs nothing.** There is no logging, database write, analytics call or event emission in the handler. The doc comment at `src/app/go/[slug]/route.ts:11-13` nonetheless states:

> `* the Midoc URL for that placement, so the page is identifiable from our own logs`
> `* even though the merchant only ever sees one referral code.`

This is a contradiction between the stated behaviour and the implemented behaviour. Where those logs would be written is UNKNOWN — not determinable from repo. If Vercel request logs are the intended mechanism, that is outside the repository.

Destination map: `src/lib/go-links.ts`, 23 slugs defined.

Status code is 302, documented at `:16-18` as deliberate: "the destination is a commercial arrangement that will change, and a permanent redirect would be cached".

### 7.2 Outbound links and `rel` attributes

`src/lib/affiliate-links.ts` exports 55 destination constants. **51 of the 55 are referenced directly by pages or components rather than through a `/go/` slug.**

`rel` attribute values across `src/components/`:

| Value | Occurrences |
|---|---|
| `nofollow sponsored` | 15 |
| `noopener noreferrer` | 6 |
| `me noopener` | 3 |
| `me` | 2 |
| `sponsored` | 1 |
| `nofollow noopener` | 1 |
| `... sponsored` (template interpolation) | 1 |

On the eight health comparison pages tested, each carries exactly 1 `rel="nofollow sponsored"` link in its prerendered HTML.

### 7.3 Analytics and click tracking

`src/components/AffiliateClickTracker.tsx` implements click tracking. Its `SUBID_PARAM` map at `:94` includes `REFERRAL120`. The payload captures `destination_url`, `destination_host`, `link_text`, `cta_location`, `subid`, `click_id`, attribution context, `value` (documented as an estimated commission weight, explicitly not revenue) and `currency: "AUD"`.

### 7.4 Code-copy or code-view recording

**No mechanism found.** No handler, event or listener records a code being copied to clipboard or a code page being viewed as a distinct event. Grep for copy handlers returned nothing in the code-bearing components.

---

## SECTION 8 — Data layer

### 8.1 Supabase schema in the repo

Tables defined across `supabase/migrations/*.sql`:

`admin_role_audit_log`, `admin_roles`, `ai_campaign_variations`, `ai_health_alerts`, `ai_predictions`, `ai_revenue_attribution`, `ai_scoring_jobs`, `campaigns`, `public.audit_logs`, `public.external_partner_links`, `public.external_partner_request_datasets`, `public.external_partner_requests`, `public.partner_agreement_acceptances`, `public.partner_agreements`, `public.partner_compliance_status`, `public.partner_tiers`, `public.regulatory_requirements`, `public.service_provider_types`, `service_applications`, `stripe_commissions`, `stripe_connect_accounts`, `stripe_customers`, `stripe_payments`, `stripe_payouts`, `stripe_webhook_events`.

Column-level types and relationships were not transcribed in full. Available in the migration files.

### 8.2 Tables holding offer, merchant or code data

**None.** A search for `CREATE TABLE` statements matching `offer`, `merchant`, `code` or `click` returned zero results.

### 8.3 How offer data is fetched

**Not from Supabase.** A search for `from('offers')`, `from("offers")`, `from('clicks')` and `from("clicks")` across `src/` returned zero matches.

Offer data is a TypeScript module, `src/lib/offers.ts`, imported at build time and prerendered. Its header comment at `src/lib/offers.ts:1-4` states:

> `// DEALS is CURATED, not scraped: every entry is a real, current offer on a brand we`
> `// actually have an affiliate relationship with, linking to that brand's own page.`
> `// Deliberately NOT a mass programmatic coupon dump, which Google's helpful-content`
> `// system now treats as scaled content abuse.`

### 8.4 Hardcoded offer values duplicating or contradicting a database

No database holds offer values, so there is no database to contradict. Offer values are duplicated between `src/lib/offers.ts` and per-page config files. Example: `$120` and `REFERRAL120` appear at `src/app/moshy/config.ts:13`, `:17`, `:39`, `:88`, `:90`, `:129`, `:143`, `:205` as well as at `src/lib/offers.ts:133` and `:193`.

`src/lib/offers.ts:226-236` documents a prior instance of exactly this divergence:

> `* Derived from the DEALS row, never stored a second time. OFFER_FACTS used to`
> `* carry its own copy, which is the same shape as the bug it was written after:`
> `* MOSHY_OFFER held a date that had drifted from its DEALS row and put "July`
> `* 2026" on three pages against "17 August" on /deals.`

**No current value conflict was found** between `offers.ts` and the page configs for the four codes. All state `$120`/`REFERRAL120`, `55%`/`REFERAL55`, `2 months free`/`referlab2mf`, `15%`/`REFERLABS`.

---

## SECTION 9 — Factual and freshness errors

### 9.1 Moshy described as a men's platform

**No page describes Moshy as a men's platform.** Searches in both directions ("Moshy" within 80 characters of men's/mens/for men/male, and the reverse) returned no such description in body copy.

Where "Moshy" and "men" co-occur, the copy states the opposite:

- `src/app/moshy-vs-pilot/page.tsx:119`: `{ label: "Who it is built for", moshy: "Gender-neutral, anyone eligible", pilot: "Men-focused (Eucalyptus men's brand)" }`
- `src/app/weight-loss/page.tsx:22`: `desc: "The gender-neutral option against Eucalyptus's men's service."`
- `src/app/moshy/config.ts:186`: `desc: "Mosh is Moshy's men's health sister brand for hair loss..."` — describes **Mosh**, not Moshy
- `src/app/best-weight-loss-telehealth-australia/page.tsx:565`: comment reading `// previously said Moshy had no women's programme, contradicting the`, recording a prior corrected error

**One exposure exists, in metadata rather than copy.** `src/lib/seo.ts:1805` contains the keyword string:

> `"moshy mens health",`

This is a `keywords` array entry, not rendered body copy.

### 9.2 Hardcoded prices, percentages and figures

472 occurrences of the literal `2026`, 4 of `2025`, and 1 of `2024` appear across `src/app/*/page.tsx`.

Specific price claims carrying an inline read date, example `src/app/moshy/config.ts:147`:

> "Moshy advertises its program from $229 a month* on its own site, checked 14 August 2026... *Indicative only and subject to change: view the latest pricing on Moshy's own site before you sign up."

Full per-line enumeration of every price and percentage is in the source files listed in Section 2.1 plus each brand's `config.ts`. `scripts/check-price-provenance.mjs` runs in `postbuild` and enforces a read date within 400 characters of every price inside `<main>` on a partner-linked page.

### 9.3 Deleted-section remnants: business lending

**18 lending directories still exist on disk:**

`src/app/business-loan-calculator`, `business-loan-eligibility-australia`, `business-loans`, `business-loans-bad-credit-australia`, `business-loans-hospitality-australia`, `business-loans-sole-traders-australia`, `compare-business-lenders`, `fast-business-loans-australia`, `how-to-get-a-business-loan-australia`, `low-doc-business-loans-australia`, `secured-vs-unsecured-business-loans`, `small-business-loans-australia`, `startup-business-loans-australia`, `true-cost-of-business-loans-australia`, `unsecured-business-loans-australia`, `what-a-business-loan-actually-costs`, `working-capital-loans-australia`, plus `src/app/calendly`.

**They are still built.** `.next/server/app/` contains `business-loan-calculator.html`, `business-loan-eligibility-australia.html` and siblings.

**They are redirected.** `next.config.ts:89-100` sets `permanent: true` (308) to `/for-business` for at least 12 of them. Comment at `next.config.ts:77`: `// ── Business lending: hidden, not retired (22 August 2026) ────────────`. Comment at `:86`: `// back, and re-enable /api/lending-lead. Nothing else was deleted.`

**Removed from sitemap.** `src/app/sitemap.ts:96`: `// ── Business lending: withdrawn from the sitemap, 22 August 2026 ──────`, with restore instructions at `:104`.

**Still listed in ChromeGate.** `src/components/ChromeGate.tsx:152-163` retains 10+ lending route entries, including `"/business-loans"` (`:153`), `"/business-loan-calculator"` (`:154`), `"/unsecured-business-loans-australia"` (`:160`), `"/small-business-loans-australia"` (`:163`).

### 9.4 Placeholder, TODO and commented-out content

| Location | Content | Ships? |
|---|---|---|
| `src/app/how-to-start-affiliate-marketing-australia/page.tsx:309` | `TODO(editorial): there is no affiliate-network or affiliate-marketing partner in src/lib/affiliate-links.ts...` | **No.** It is a JSX comment `{/* ... */}`. 0 occurrences in built HTML |
| `src/components/StructuredData.tsx:348` | `"telephone": "+61-xxx-xxx-xxx"` | **No.** 0 occurrences in built HTML |
| `src/app/api/admin/compliance/route.ts:227` | `// TODO: Implement once migration is run` | API route, not page copy |

No lorem ipsum found.

### 9.5 Broken internal links

**Not determined.** A full internal link-integrity check requires resolving every `href` against the live route table including redirects, and `next.config.ts` redirects make many routes unreachable at the filesystem level. UNKNOWN — requires a live crawl. `CLAUDE.md` records that filesystem-level link audits on this repo report problems that do not exist in production.

---

## SECTION 10 — Compliance surface

### 10.1 Prescription medicine names and drug-class references in shipped HTML

**None found.** All 263 prerendered HTML files were searched for: `GLP-1`, `GLP1`, `semaglutide`, `tirzepatide`, `finasteride`, `minoxidil`, `Ozempic`, `Wegovy`, `Mounjaro`, `Saxenda`, `weight-loss injection`, `weight loss injection`.

**Zero matches in built HTML for every term.**

### 10.2 Therapeutic outcome claims and statistics

**None found.** A search for numeric outcome claims (patterns of the form `lose/lost/reduced/improved [up to] N %|kg|kilos`) across `src/app/*/page.tsx` and `src/app/*/config.ts` returned zero matches.

### 10.3 Before/after comparisons

**None in health content.** The only two matches for "before and after" are about solar rebate pricing:

- `src/app/solar-and-energy/page.tsx:46`: `desc: "Installed price bands by size, before and after the rebate."`
- `src/app/home-battery-cost-australia/page.tsx:125`: "quotes mix up supply-only and installed, and before and after the"

### 10.4 Partner-mandated disclosure wording

**UNKNOWN — not determinable from repo.** No partner agreement or mandated wording specification is stored in the repository, so the rendered disclosure text cannot be compared against a required form. Determining this requires the partner agreements themselves.

The rendered wording that does exist, from `/mosh-review`: "Refer Labs may earn a commission if you sign up or buy through the links on this page".

`src/app/juniper/page.tsx:16` records a related constraint as a comment: `// JARREDKFC is commission-only: NO customer discount is claimed anywhere here.`

### 10.5 Comparison content on pages that also carry an affiliate link

**Eight pages carry both.** Each has exactly one `rel="nofollow sponsored"` link and two instances of disclosure text in its prerendered HTML:

`/moshy-vs-juniper`, `/moshy-vs-pilot`, `/mosh-vs-pilot`, `/mosh-vs-dense`, `/moshy-vs-gp`, `/best-weight-loss-telehealth-australia`, `/best-hair-loss-treatment-australia`, `/knose-vs-petsonme`.

---

## SECTION 1 — Page inventory

Full per-page data is in `audit-pages.csv` (261 rows). Summary findings below.

### 1.1 Totals

| Measure | Value |
|---|---|
| Prerendered public pages | 261 (excluding `/_*` framework routes) |
| Present in `src/app/sitemap.ts` | 155 |
| **Not in sitemap** | **106** |
| Client components (`"use client"`) | **2** |
| Pages with a partner code | 26 |
| Pages with disclosure text | 135 |
| Pages with a visible date | 82 |

### 1.2 Pages under 300 words of body copy (35)

`/analytics`, `/api-guide`, `/authors/jarred`, `/calendly`, `/case-studies`, `/contact`, `/for-business`, `/go-live`, `/gtm`, `/how-we-make-money`, `/hubspot`, `/klaviyo`, `/longevity/diagnostics/health-screening-quiz`, `/longevity/recovery/recovery-setup-quiz`, `/mailchimp`, `/make`, `/meta-ads`, `/referral-partnerships`, `/roi-calculator`, `/servicem8`, `/shopify`, `/shopify/checkout-extensibility`, `/square`, `/squarespace`, `/status`, `/stripe`, `/webflow`, `/weight-loss-guide`, `/who-its-for/access-to-capital`, `/who-its-for/financial-tools`, `/who-its-for/global-investments`, `/who-its-for/niche-opportunities`, `/wix`, `/wordpress`, `/zapier`

Two of these are trust pages: `/how-we-make-money` and `/contact`. One is the author page: `/authors/jarred`.

### 1.3 Orphans: zero inbound links from any page's `<main>` (47)

Counted by scanning `<main>` only, so navigation and footer links are excluded by design.

`/affiliate-partnerships`, `/analytics`, `/api-guide`, `/apollo-energy-group-eoi`, `/calendly`, `/cloudtalk`, `/faq`, `/go-live`, `/gtm`, `/hubspot`, `/instapage`, `/klaviyo`, `/lead-hacking`, `/linkedin-growth`, `/linkedin-influencer`, `/mailchimp`, `/make`, `/meta-ads`, `/playbooks`, `/referral-partnerships`, `/roi-calculator`, `/security`, `/servicem8`, `/services/accountants`, `/services/consultants-coaches`, `/services/financial-advisors`, `/services/influencer-activation`, `/services/insurance-brokers`, `/services/partner-activation`, `/services/product-distribution`, `/services/recruiters-staffing`, `/shopify`, `/shopify/checkout-extensibility`, `/square`, `/squarespace`, `/status`, `/stripe`, `/webflow`, `/weight-loss-guide`, `/who-its-for`, `/who-its-for/access-to-capital`, `/who-its-for/financial-tools`, `/who-its-for/global-investments`, `/who-its-for/niche-opportunities`, `/wix`, `/wordpress`, `/zapier`

Note: `/faq` and `/weight-loss-guide` are orphaned by this measure. `/analytics`, `/status`, `/go-live` and `/calendly` are disallowed in `robots.txt`.

### 1.4 Duplication analysis

Method: 5-gram Jaccard similarity across rendered `<main>` body text, pages of 120+ words.

**Zero clusters exceeded 60% similarity.** No page pair in the site shares more than 60% of its 5-gram body content. The `duplicate_cluster_id` column in `audit-pages.csv` is therefore empty for all rows.

---

## Sections not completed, and fields marked UNKNOWN

Every section was attempted. The following specific fields could not be determined from the repository:

- **3.3** Bot detection, WAF, rate limiting, geo-blocking, Cloudflare config. Configured outside the repo, in the Vercel dashboard.
- **3.4** Whether the sitemap URL resolves. Requires a live fetch.
- **3.5** Live status codes per route. Requires a live fetch.
- **8.1** Column-level types and foreign-key relationships per Supabase table. Present in the migration files but not transcribed here.
- **9.5** Broken internal links. Requires a live crawl, because `next.config.ts` redirects make filesystem-level route resolution unreliable.
- **10.4** Whether disclosure wording matches partner-mandated form. Requires the partner agreements, which are not in the repo.
