# Revenue telemetry (E1): EPC per page

The goal: one number per page — **earnings per click (EPC)** — so internal links,
content siblings and CTA tests go to the pages that actually earn.

## How attribution works here

| Layer | Source | Covers |
|---|---|---|
| Clicks per page × program | GA4 `affiliate_click` event (`page_path` × `destination_host`, plus `subid`, `cta_location`) | Every program, every page |
| Revenue per page (exact) | PartnerStack dashboards: `sid1` appears against referred customers | Reply.io, FullEnrich, Employment Hero |
| Revenue per page (allocated) | Program dashboard total revenue ÷ split by GA4 click share per page | Everything else (Moshy, GHL, beehiiv, peptides, ...) |

The `AffiliateClickTracker` appends `sid1=<page-slug>` to PartnerStack links at
click time and logs the same `subid` into GA4, so both sides join on one key.
Moshy is deliberately NOT decorated until the tracked link is verified.

## The weekly ritual (~15 min, same day each week)

1. **GA4 → Explore → "EPC source" table**: rows `page_path`, columns `destination_host`,
   value = event count for `affiliate_click`. Export CSV.
2. **Each program dashboard**: note the week's commission total (and for
   PartnerStack programs, revenue per `sid1` if shown).
3. **Paste both into the EPC sheet** (`docs/epc-tracker-template.csv` is the
   starter — import it into Google Sheets once).
4. Sheet computes: `EPC = revenue ÷ clicks` per page, and
   `revenue per 1,000 sessions` per page (pull sessions from GA4 pages report).

## Acting on it (the whole point)

- **High EPC + low traffic** → more internal links, more sibling pages, request-index.
- **High traffic + low/zero EPC** → swap the offer, rework CTAs, or noindex.
- **High clicks + zero revenue** → attribution problem; check that program's dashboard first.

## Program → network map (for the dashboards)

| Program | Network / dashboard | Per-page revenue? |
|---|---|---|
| Moshy | Commission Factory (VERIFY — tracked link unconfirmed) | Allocated |
| Mosh hair | Partner path /start/referlabs | Allocated |
| Reply.io, FullEnrich, Employment Hero | PartnerStack (`sid1`) | Exact |
| GoHighLevel, Swipe Pages | FirstPromoter | Allocated |
| beehiiv, Butternut | Rewardful-style (`via`/`ref`) | Allocated |
| Apollo | Refersion (`rfsn`) | Allocated |
| Ascension | AffiliateWP (`/ref/`) | Allocated |
| BioPeptiTech | UpPromote (`sca_ref`) | Allocated |
| Polymarket | Referral dashboard (r=JKRJ; UTMs carry page) | Allocated |
| Carrd, Durable, AiSDR, IncomeLab | Own dashboards | Allocated |
