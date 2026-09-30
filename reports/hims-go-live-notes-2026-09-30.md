# Hims page set: go-live notes (30 September 2026)

This file lives only on the `hims-preview` branch. Nothing here is live. Every
step below happens on the day Hims approves the pages in writing and Jarred
decides to launch, not before.

## 1. Redirects to add in `next.config.ts` at go-live

All permanent (301), pointing straight at the final page, so no chains.

| From | To | Why |
|---|---|---|
| `/best-online-ed-treatment-australia` | `/ed` | Folded into `/ed` on 30 Sep 2026. The route and content were deleted from the preview set; the URL was shared with Hims' reviewers on 29 Sep, so it should resolve. |
| `/best-hair-loss-treatment-online-australia` | `/best-hair-loss-treatment-australia` | Main's `/best-hair-loss-treatment-australia` was rebuilt on 30 Sep 2026 and owns the hair comparison query. Two hair comparison pages would compete. Before redirecting, merge anything from the Hims hair comparison worth keeping (the Hims column of the inclusions table) into the main page. |
| `/mosh-vs-pilot` | `/hims-vs-mosh` | Currently 301s to `/best-hair-loss-treatment-australia` (next.config.ts line 64). Pilot is now Hims, so the pair page is the closer match by intent. |
| `/moshy-vs-pilot` | `/hims-vs-mosh` | Currently 301s to `/best-weight-loss-telehealth-australia` (line 63). Same reasoning. |

Jarred confirmed both Pilot redirects on 30 Sep 2026. One refinement to raise at go-live: `/moshy-vs-pilot` was a weight-loss comparison, and `/best-mens-weight-loss-program-australia` is now Hims vs Moshy, the closer match by intent. Pointing it there instead of `/hims-vs-mosh` is the better destination if Jarred agrees.

After adding each redirect: remove the Hims slugs from `HIMS_SLUG_LIST` only if a
page is retired, keep `check-redirect-order` green, and run `npm run verify:deploy`.

## 2. Hims mandated disclosure

The pages currently print the Hims handbook's option-2 statement with "Refer Labs"
in place of "I". Hims has not approved that change. At go-live:

1. Copy the handbook statement **verbatim** from the Hims Partner Dashboard or
   Handbook (or the Refer Labs version, if Hims approves it in writing).
2. Add it to `REQUIRED_DISCLOSURES` in `src/lib/partner-disclosures.ts`, keyed by
   `HIMS_URL`, with the source and the date it was read. `check-required-disclosure`
   then fails any build where a page carries the Hims link without the sentence.
3. Update `DISCLOSURE` in `src/content/hims/config.ts` and `HANDBOOK_DISCLOSURE` in
   `scripts/lint-hims-copy.mjs` to the same string, and remove `DISCLOSURE_REVIEW_NOTE`.

## 3. Placeholders that must be resolved before go-live

- `REFERLABS89` and "no charge for the initial consultation": both flagged amber.
  Hims' reviewers confirm the real code and offer. Attribution is by code, so the
  code must be exactly what Hims issues.
- The `JARREDSTART` tracking link (`HIMS_URL`) is real and stays.
- Mosh ED: no offer and no affiliate link yet. `/ed`'s Mosh card links to Mosh's
  public ED page with plain rel. When Jarred sends the Mosh ED offer: add a
  `MOSH_ED_URL` constant (never reuse `MOSH_HAIR_URL`), set `MOSH.ed` in
  `src/content/hims/config.ts` to it with `sponsored: true` and the code, fill the
  `null` Mosh cells in `src/content/hims/inclusions.ts`, and re-read Mosh's page.
- Weight: Mosh's weight offering is Moshy, its partner brand (Jarred, 30 Sep 2026). The weight
  comparison is Hims vs Moshy through the /moshy link (MOSHY_URL) and REFERRAL120. At go-live,
  `check-partner-scope` needs the Moshy entry allowed on the Hims weight routes if it is not already.
- The Hims weight "Commitment" row carries a verify flag: the weight page's fine
  print describes a twelve-month commitment, the partner handbook says no lock-in.

## 4. `/mens-health/erectile-dysfunction-treatment-cost-australia` should link to `/ed`

Replace `providers={[]}` and its `reservedNote` with the partner rows, and add a
link to `/ed` as the comparison. Then the launch-day sentences from the 24 Sep 2026
readiness audit (memory file `mens-health-launch-readiness.md`), every one of which
goes false the moment an ED partner lands:

| Where | Sentence that goes false | Fix on launch |
|---|---|---|
| `/mens-health` FAQ "Does Refer Labs earn from this section?" | "Yes, from one partner... The mental health and erectile dysfunction pages carry no commercial link." | Rewrite to name the partners and say the ED page now links them. |
| `/mens-health` providers intro | "One Australian telehealth provider so far" (the hub uses `HubProviders`) | Rewrite; list providers alphabetically per the hub-neutrality rule. |
| `/mens-health/erectile-dysfunction-treatment-cost-australia` | `reservedNote` "We do not yet have a partner whose service covers this specific area" | Replace `providers={[]}` with the partner rows and link `/ed`. |
| `public/llms.txt`, Men's health line | "As at 4 September 2026 Refer Labs has one commercial partner in this category, Midoc... There is no monetised route on the mental health or erectile dysfunction pages." | Rewrite. `check-partner-scope` compares llms.txt with the site and fails the build if left. |
| `src/lib/go-links.ts` | Comment "No erectile-dysfunction placement... The slot on that page is reserved and empty until a partner covers it." | Add one placement per page (`hims-ed-cost-page`, `mosh-ed-cost-page`, hub, clinics-compared) and delete the comment. |

`check-earns-claim` catches "earns nothing" beside a link, but not "from one
partner" or "no monetised route"; those two are edited by hand.

## 5. Registries at go-live (not before)

`HIMS_PAGES_LIVE=true` turns on the sitemap entries, canonical OG tags and indexing.
Also add, in one pass: `seoConfig` entries if the pages move off the Hims renderer,
`/guides`, `src/lib/search-index.ts`, the `/mens-health`, `/weight-loss` and
`/hair-loss` hubs, `public/llms.txt` (with the Hims code stated literally once
confirmed), and `src/lib/offers.ts` only if the confirmed offer is a genuine
monetary discount. Reverse `relatedLinks` from `/moshhair`, `/mosh-review` and the
ED cost page.

Hims bars paid ads for its code or link on any channel, and allows comparison and
coupon placement only on an Approved Channel. Both are launch conditions.
