# Affiliate program verification: 40 brands

**Date:** 7 September 2026
**Scope:** research only. No website files were edited, nothing committed, nothing deployed.
**Rule applied:** no URL appears below unless it returned HTTP 200 on 7 September 2026. Where no program was found, it says "no program found" rather than a guess.

---

## Directory coverage, and where it failed

The brief named six directories. Three were usable, three were not, and saying which matters because an unsearched directory produces false negatives.

| Directory | Usable? | Detail |
|---|---|---|
| `ui.awin.com/merchant-profile` | **Partly** | Profiles are reachable only by known merchant ID. Verified IDs 59167 and 81635 (both 200, real content). A fake ID returns 404, so a 200 is meaningful. No search interface. |
| `commissionfactory.com/advertiser-directory` | **Partly** | `?search=` is ignored: every query returned identical page-1 results. Pagination captured only **24 of roughly 600** advertisers. Individual advertiser URLs verified fine (fake IDs 404). **Absence from my capture is not evidence of absence.** |
| `flexoffers.com/affiliate-programs` | **Yes** | Program pages verified by direct URL. |
| `marketplace.uppromote.com` | **No** | Its search echoes any string back, including `zzqqxnonsense`. Every "hit" was the query in the search box. Excluded entirely. |
| `app.impact.com` marketplace | **No** | Requires an authenticated account. Not reachable. |
| Refersion marketplace | **No** | No public searchable index reachable without login. |

**Consequence:** every "no program found" below means *not found by these methods*, not *does not exist*. The three programs I would most expect to be hiding behind the unsearchable directories are Specsavers, Bailey Nelson and Oscar Wylee, all of which are large enough to run a program through a network I could not query.

### Two false-positive traps cleared

These changed real answers, so they are recorded:

- **Soft-404 sites.** Six domains returned HTTP 200 for all 13 affiliate paths I probed. A nonsense-path control showed **InsideTracker, Blamey Saunders, Eargo and Connect Hearing** return 200 for everything. All their path evidence is void. WonderSmile and Invisible Braces later returned connection failures, so they are untested rather than negative.
- **`awin` is a substring of "drawing" and "cookielawinfo".** My first scan flagged five sites. Reading the matches, three were base64 image noise or the string `cookielawinfo-checkbox`. Only **ALIGNERCO** and **Circle DNA** carry a genuine Awin integration.

---

## Table 1: Sale-based programs (a discount code can apply)

Ordered by estimated dollars per conversion, highest first.

| # | Brand | Program | Signup URL (verified 200) | Network | Commission | Cookie | AOV | AU? | Publisher code? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Eargo** | Yes | `https://www.flexoffers.com/affiliate-programs/eargo-affiliate-program/` | FlexOffers | 12% per sale (also cited as $35 CPA, sources conflict) | 30 days | ~US$2,000 device | **No, US** | Not stated |
| 2 | **SelfDecode** | Yes | `https://selfdecode.com/en/affiliate-program/` | Post Affiliate Pro (`selfdecode.postaffiliatepro.com`) | Up to 25%, tiered | **90 days** | Not verified | Ships intl. | Not stated |
| 3 | **CircleDNA** | Yes | `https://www.commissionfactory.com/advertiser-directory/circledna-affiliate-program/85028` | **Commission Factory** | Page states both "10.00% per sale" and "8% commission on the sale value" | 30 days | "over US$400" (Awin) | **Yes** | Not stated |
| 4 | **ALIGNERCO** | Yes | `https://ui.awin.com/merchant-profile/59167` | Awin (ID 59167) | Flat 5% | 30 days | Not stated | **No, US & Canada** | Not stated |
| 5 | **Quay Australia** | Yes | `https://www.quayaustralia.com.au/pages/affiliate` | Not disclosed on page | 8% CPS (third-party sources only, **not** on Quay's page) | 30 days (same caveat) | ~A$80 | **Yes** | Ambassador program, likely |
| 6 | **i-screen** | Yes | `https://www.i-screen.com.au/work-with-us` | Own platform | Not published | Not published | Not published | **Yes** | **Yes, at Reseller tier** |
| 7 | **Vively** | Yes | No public signup page (control 404) | **Rewardful** (`data-rewardful='ec2540'`) | Not published | Not published | Not published | **Yes** | Rewardful supports codes |
| n/a | **InsideTracker** | Yes, but | **No working URL found.** Awin profile 91617 returns **404** | Impact (reported) | 3% or 8%, sources conflict | Undisclosed | Not verified | Unclear | Not stated |

**Notes on the two best AU-relevant rows.**

**CircleDNA** is the strongest verified find. Its Commission Factory tag was found independently on its own site (`t.cfjump.com/tag/85028`) and matches the directory URL ID exactly, which is two independent confirmations. We are already Commission Factory publisher **94361**, so this is joinable today with no new relationship. Note that Awin 81635 is a separate listing titled "Circle DNA (US)"; Commission Factory is the Australian route. At 8% on a ~A$480 order that is roughly **A$38 per conversion**, or ~A$48 if the 10% headline is the live rate. The two figures on one page should be confirmed with the advertiser before publishing either.

**i-screen** is the only brand in the 40 with a program that explicitly offers a client-facing discount. Its own page states partners "Choose your commercial structure, commission on sales, or a discount passed to your clients", and its Affiliate tier is described as "For content creators, podcasters, newsletter writers, bloggers, and businesses with an audience... in exchange for commission. A simple referral partnership... Unique tracking link". It publishes no rate, so dollars per conversion is unknown and has to come from an email.

---

## Table 2: Lead-gen, referral or partnership models (a coded discount does not apply)

Flagged separately as requested. None of these pays per sale, so a publisher discount code has nothing to attach to.

| Brand | What it actually is | Evidence |
|---|---|---|
| **Dresden Vision** | Customer refer-a-friend, not a publisher program | `/referral-program` gives referrer a 50% off code after a friend spends $50. Consumer scheme. |
| **Clearsight** | Clinical partnership for ophthalmologists and optometrists | `/partners` offers associate and co-ownership pathways plus a Partner Optometrist Program. No commission published. |
| **Ultrahuman** | B2B institutional partnerships | `/partners` targets research institutions, healthcare providers, sports teams, gyms. A separate "For Creators" Typeform exists but was not reachable as a public program page. |
| **Dental Departures** | Merchant-side clinic listing | `/affiliates` resolves to a 404 page. The live path is `partner-signup.dentaldepartures.com`, which is "Add Your Clinic", the opposite side of the marketplace. |
| **Bloom Hearing** | Clinical referral partnership | `/about-us/partnership/` invites referral partners; no commission terms published. |
| **Soundfair** | Not-for-profit advocacy, `/partners` is organisational | No commercial program. |

---

## Table 3: No program found

Searched by domain path probe, homepage platform and affiliate-app signature scan, and directory search. **No program found** by these methods. Given the three unsearchable directories, treat the large retailers here as "unconfirmed" rather than "confirmed absent".

**Vision (7):** Personal Eyes · Vision Eye Institute · Laser Sight Australia (real domain is `lasik.com.au`, not the `.com.au` form I first guessed) · Bailey Nelson · Oscar Wylee · Specsavers · Contact Lens Australia

**Aligners (8):** Straight Teeth Direct · Instasmile (AU site is `au.instasmile.com`) · WonderSmile *(blocked, untested)* · EZ Smile · SmileStyler · Invisible Braces AU *(blocked, untested)* · Smile Concepts · ClearCorrect

**Testing (4):** myDNA · Everlab · Nutripath · Function Health

**Hearing (7):** Audeara · Blamey Saunders *(now owned by Connect Hearing / Sonova)* · Attune *(real domain `attune.com.au`)* · Hearing Choices · National Hearing Care *(merged into Amplifon; `nationalhearingcare.com.au` does not resolve)* · Connect Hearing · Soundfair

### Domain corrections found along the way

Four of my initial domain guesses did not resolve. The real ones: Laser Sight Australia is **lasik.com.au**; Instasmile AU is **au.instasmile.com**; National Hearing Care is now **Amplifon** (`amplifon.com.au`, `nhc.com.au`); Attune is **attune.com.au**. Blamey Saunders was acquired by Connect Hearing (Sonova), so it is no longer an independent counterparty.

---

## What I would actually do with this

1. **Join CircleDNA on Commission Factory today.** Publisher 94361 already exists, the listing is verified, and it is the only high-AOV, AU-eligible, sale-based program in the 40 that needs no new relationship. Confirm whether the live rate is 8% or 10% before publishing a figure.
2. **Email i-screen.** It is the only one of the 40 that explicitly offers a client-facing discount, which is the mechanic the code thesis turns on, and it is Australian, sale-based, and adjacent to the health hub. It publishes no rate, so the email is the only way to get one.
3. **Ask Vively for affiliate access.** Rewardful is installed and confirmed, but signup is invite-only. Rewardful supports coupon codes natively.
4. **Do not pursue Eargo or ALIGNERCO for Australian traffic.** Both have real, verified programs; both are geo-restricted away from Australia.
5. **Re-check Specsavers, Bailey Nelson and Oscar Wylee through a logged-in Impact and Commission Factory account.** They are the most likely false negatives here, and both directories were unsearchable from outside.

## Limits of this pass, stated plainly

- Three of the six named directories could not be searched (UpPromote echoes queries, Impact needs login, Refersion has no public index), and Commission Factory's own search parameter is ignored.
- Commission, cookie and AOV figures for Quay, Eargo and InsideTracker come from third-party aggregators, not the merchants' own pages. Aggregators are frequently stale. Treat as leads to confirm.
- Dollars per conversion is an estimate wherever AOV was not published by the merchant. Only CircleDNA and Eargo have a published or network-stated AOV basis.
- WonderSmile and Invisible Braces AU blocked automated requests partway through and are untested, not negative.
