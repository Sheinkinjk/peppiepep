# Hims page set: go-live notes (30 September 2026)

This file lives only on the `hims-preview` branch. Nothing here is live. Every
step below happens on the day Hims approves the pages in writing and Jarred
decides to launch, not before.

## 1. Redirects to add in `next.config.ts` at go-live

All permanent (301), pointing straight at the final page, so no chains.

| From | To | Why |
|---|---|---|
| `/best-online-ed-treatment-australia` | `/ed` | Folded into `/ed` on 30 Sep 2026. The route and content were deleted from the preview set; the URL was shared with Hims' reviewers on 29 Sep, so it should resolve. |
| `/mosh-vs-pilot` | `/hims-vs-mosh` | Currently 301s to `/best-hair-loss-treatment-australia` (next.config.ts line 64). Pilot is now Hims, so the pair page is the closer match by intent. |
| `/moshy-vs-pilot` | `/hims-vs-mosh` | Currently 301s to `/best-weight-loss-telehealth-australia` (line 63). Same reasoning. |

Jarred confirmed both Pilot redirects on 30 Sep 2026. `/moshy-vs-pilot` was a weight comparison, so point it at `/hims-vs-mosh#weight-loss` (the fragment is ignored by the redirect but the weight panel is on that page).

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

## 6. `public/llms.txt` entries for go-live (drafted 1 October 2026)

Not added to `public/llms.txt`: that file is live. Paste these on launch day, after
Hims confirms its code and offer, replacing every `REFERLABS89` with the code Hims
issues. **`REFERLABS89` and "no charge for the initial consultation" are PLACEHOLDERS**
until Hims' reviewers confirm them; do not publish either as written. Re-read each
provider page and change the dates to the launch-day read. Each line names no
medicine (TGA) and no price (Jarred, 27 and 29 Sep 2026).

Key-facts line, beside the Moshy and Mosh code lines:

- Men's telehealth (Australia): **the current Hims discount code through Refer Labs is REFERLABS89** [PLACEHOLDER: confirm with Hims], which gives new Hims patients no charge for the initial consultation [PLACEHOLDER]; program fees apply, one use per patient, not combined with other Hims offers, and current or previous Hims or Pilot patients are excluded. The Refer Labs link carries the code into Hims' checkout; if it is not shown, enter it. Hims is the Australian service of Hims & Hers Health, which completed its purchase of Eucalyptus, Pilot's owner, on 2 June 2026; Pilot is rebranding as Hims (pilot.com.au, read 1 October 2026). Information only, not medical advice.

Page lines, under Men's health:

- [Hims weight loss](https://referlabs.com.au/hims): Hims' online weight program for men, formerly Pilot: a free two-minute quiz, a phone consultation with an AHPRA-registered practitioner, an advertised starting offer paid upfront over twelve months, and a full refund if you contact Hims within 30 days of starting (hims.com.au/weight-loss, read 1 October 2026). Refer Labs code REFERLABS89 [PLACEHOLDER].
- [Hims hair loss](https://referlabs.com.au/hims-hair-loss): Hims' hair loss service, formerly Pilot's: a 180-day money-back guarantee on every hair plan, cancelling before any order with no fee, and prices shown after the phone consultation (hims.com.au/hair-loss, read 1 October 2026).
- [Hims ED](https://referlabs.com.au/hims-ed): Hims' private ED consultation, formerly Pilot's: an online quiz, then a phone call with an Australian practitioner from 7am to 11pm AEST, seven days, with no lock-in contract; Hims' FAQ says its plans are not claimable on Medicare (read 1 October 2026).
- [Hims vs Mosh](https://referlabs.com.au/hims-vs-mosh): Who owns each (Hims & Hers Health; Mosh says it is Australian owned and lists Moshy and Healthy Mummy as its brands), what each covers and how each consults, then hair loss, weight loss and ED compared, with the Refer Labs codes for each: REFERLABS89 [PLACEHOLDER] for Hims, REFERAL55 for Mosh hair loss and REFERRAL120 for Moshy weight loss; Mosh's ED offer is not yet supplied. Read 1 October 2026. Also the answer to "Mosh vs Pilot", since Pilot is now Hims.
- [Online ED consultations: Hims vs Mosh](https://referlabs.com.au/ed): Hims consults by phone from 7am to 11pm AEST; Mosh lets you message a practitioner by text, with phone and video available; neither has a lock-in contract (read 1 October 2026). Mosh's ED offer for Refer Labs readers has not been supplied.

Also rewrite the Men's health line ("one commercial partner... no monetised route on the
... erectile dysfunction pages"), per section 4, or `check-partner-scope` fails.

## 7. Sitemap entries at go-live

`src/lib/hims/sitemap.ts` emits these once `HIMS_PAGES_LIVE=true`; `lastmod` is each
page's own `modified` date, the same date its WebPage and Article schema carry.

| URL | lastmod | priority |
|---|---|---|
| https://referlabs.com.au/hims | 2026-10-01 | 0.9 |
| https://referlabs.com.au/hims-hair-loss | 2026-10-01 | 0.9 |
| https://referlabs.com.au/hims-ed | 2026-10-01 | 0.9 |
| https://referlabs.com.au/hims-vs-mosh | 2026-10-01 | 0.9 |
| https://referlabs.com.au/ed | 2026-10-01 | 0.8 |

If a page is edited again before launch, bump its `modified` field; the sitemap follows.

## 8. Reverse links from main-site pages at go-live

Every Hims page now links to all six siblings (built from `src/content/hims/siblings.ts`,
so the links are reciprocal by construction). The comparison pages also link out to
main-site pages that cannot link back while the set is in preview. Add these reverse
links at launch:

- `/mosh-review` and `/moshy-review` -> `/hims-vs-mosh` (linked from it).
- `/moshhair` -> `/hims-vs-mosh` (hair loss panel).
- `/moshy` -> `/hims-vs-mosh` (weight loss panel).
- `/mens-health/erectile-dysfunction-treatment-cost-australia` and `/mens-health` -> `/ed` (section 4).

## 9. Facts re-read on 1 October 2026

Every provider page cited on the seven pages was re-read with a browser user agent on
1 October 2026 (hims.com.au home, weight-loss, hair-loss, erectile-dysfunction, faq,
terms-and-conditions; getmosh.com.au home, hair-loss, erectile-dysfunction, pricing,
start/referlabs; getmoshy.com.au home and weight-loss; pilot.com.au), and every cell of
`src/content/hims/inclusions.ts` still matched, so `FACTS_CHECKED_ON` and
`INCLUSIONS_READ_ON` are now 1 October 2026. The Business Wire release returned 403 and
is cited by its own date, 2 June 2026. One correction: hims.com.au lists weight loss,
ED, premature ejaculation and hair loss, not skin, so "skin" was removed from the three
Hims review leads. The REFERRAL120 three-month minimum is still cited to Moshy's sign-up
page as read on 30 September 2026.


## Pages removed from the set (Jarred, 1 Oct 2026)

`/best-mens-weight-loss-program-australia` and `/best-hair-loss-treatment-online-australia` were deleted before launch: `/hims-vs-mosh` now carries hair loss, weight loss and ED in one page with a program selector. Neither URL was ever public, so neither needs a redirect. `/best-online-ed-treatment-australia` was earlier replaced by `/ed`, which stays.