# Men's Health + Skin & Beauty partner launch — plan for approval
3 September 2026. **Nothing built, nothing published.** Research and plan only.

---

## 0. Blockers — three things I cannot answer, and where they live

The brief asks for commission rate, cookie window, qualifying conversion, AU
commissionability, currency/shipping and restrictions **per program**. For the
three Commission Factory merchants those terms live in the CF publisher
dashboard behind your login. I have not guessed them.

| needed | Midoc | Foreo | Edible Beauty | Aussie Health |
|---|---|---|---|---|
| commission rate | **FOUND** (below) | CF dashboard | CF dashboard | CF dashboard |
| cookie window | **not stated publicly** | CF dashboard | CF dashboard | CF dashboard |
| qualifying conversion | **not stated publicly** | CF dashboard | CF dashboard | CF dashboard |
| AU traffic commissionable | n/a (AU-only) | **CF dashboard — see Foreo risk** | AU merchant | AU merchant |
| restrictions (comparison / codes / paid) | **not stated publicly** | CF dashboard | CF dashboard | CF dashboard |

Export each program's terms page from CF and I will fold them in. **No page
ships naming a rate or a cookie window until those are in hand.**

---

## 1. Verified program findings

### Midoc — commission is tiered by *our* plan, not by product

From midoc.com.au/affiliate, read 3 Sep 2026:

- **Free plan: 2–5%** per successful purchase
- **Starter plan: 10%**
- **Professional plan: 20%**

**This is a paid-tier affiliate programme.** On the free tier we earn 2–5% of a
$18–$36 medical certificate. That is cents per conversion. Whether to buy a tier
is a commercial decision and it materially changes whether this hub is worth
rebuilding.

**Qualifying services, as listed:** Medical Certificates, Carer's Certificates,
Telehealth, Scripts, Specialist referrals, Antibiotics. "Medications, Consumables
and more" marked coming soon.

**Service lines, from midoc.com.au/telehealth:** general medical, child health,
COVID antivirals, **hair loss**, **sexual health (STI/STD)**, weight management,
smoking cessation, **mental health**, **men's health (performance, prostate,
urinary)**, dementia, wound care, continence.

Two findings that change the page mapping:

1. **Mental health is described as fully bulk billed, no cost.** A free
   consultation has no purchase to take a percentage of. Assume it pays nothing
   until Midoc confirms otherwise.
2. **Erectile dysfunction is not named.** Sexual health is scoped to STI/STD;
   "performance" appears under men's health. Our
   `/mens-health/erectile-dysfunction-treatment-cost-australia` page therefore
   has **no confirmed Midoc route**. Ask Midoc directly before linking it.

### The three Commission Factory links

All four links return **200**. All three CF links land on **merchant homepages**,
confirming the brief.

**Deep linking works, and SubID is already wired.** The repo's existing CF links
use `?Url=<encoded>`; I tested it on the Foreo link and the destination changed
correctly while CF kept its `cfclick` tracking. `AffiliateClickTracker` already
maps `t.cfjump.com` → **`UniqueId`**, so the per-page SubID is appended
automatically at click time. No new tracking code is needed.

Pattern: `https://t.cfjump.com/94361/t/<id>?Url=<url-encoded destination>`

**Foreo carries a real risk.** There is no Australian storefront:
`foreo.com/au`, `foreo.com/en-au` and `foreo.com.au` all fail; only the global
`www.foreo.com` resolves, with AUD present in its currency table. Shipping to an
Australian address and whether AU traffic is commissionable both need
confirming in CF **before** Foreo is placed anywhere.

**Verify every deep-link target returns 200 before building.** I tested seven
candidates and three 404'd — `foreo.com/collections/led-masks`,
`aussiehealthproducts.com.au/collections/skin-care` and `/collections/all`.
Confirmed live: `foreo.com/ufo`, `foreo.com/luna`,
`ediblebeautyaustralia.com/collections/acne-prone-skin`.

---

## 2. The page audit — every page in both hubs is a dead end

Measured from rendered HTML, chrome excluded. **14 of 14 pages carry no money
action.** Not one currently monetises.

### Men's Health

| page | words | plan | partner route |
|---|---|---|---|
| `/mens-health` | 638 | **keep, add provider module** | Midoc, telehealth |
| `/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health` | 865 | **keep, highest priority** | Midoc — the page *is* the decision Midoc wins |
| `/mens-health/online-mens-health-clinics-compared` | 931 | **keep, add to comparison table** | Midoc as first listed provider |
| `/mens-health/premature-ejaculation-treatment-options-australia` | 920 | **keep, add route** | Midoc men's health (performance) |
| `/mens-health/erectile-dysfunction-treatment-cost-australia` | 994 | **keep, route BLOCKED** | no confirmed Midoc line — ask first |
| `/mens-health/sexual-wellness-products` | 678 | **keep** | Midoc for the clinical route; retailer for products |
| `/mens-health/mens-health-quiz` | 296 | **keep, add outcome route** | quiz result → Midoc |

### Skin & Beauty

| page | words | plan | partner route |
|---|---|---|---|
| `/skin-and-beauty` | 628 | **keep, add provider module** | all three |
| `/skin-and-beauty/acne-treatment-options-and-costs-australia` | 939 | **keep** | Edible Beauty (acne collection, verified live); Foreo device |
| `/skin-and-beauty/led-face-mask-comparison-australia` | 947 | **keep** | Foreo — but see compliance |
| `/skin-and-beauty/best-value-skincare-australia-cost-per-use` | 924 | **keep** | Edible Beauty + Aussie Health, cost-per-use fits both |
| `/skin-and-beauty/anti-ageing-treatments-what-they-cost` | 913 | **keep** | Foreo devices; Edible Beauty |
| `/skin-and-beauty/retinol-vs-prescription-strength-australia` | 914 | **keep, route PARTIAL** | OTC retinol only; prescription side has no partner |
| `/skin-and-beauty/skincare-quiz` | 300 | **keep, add outcome route** | quiz result → matched merchant |

**Nothing is proposed for deletion.** Every page has a partner route available
or creatable, which meets the brief's test. Two carry caveats above.

### Missing pages, mapped to partner range

Gaps where a partner sells something and no page exists:

1. **`/mens-health/online-doctor-medical-certificate-australia`** — Midoc's
   highest-volume product ($18–$36) and its clearest qualifying service. No page.
2. **`/mens-health/online-prescription-australia`** — "Scripts" is a named
   qualifying service. No page.
3. **`/skin-and-beauty/foreo-luna-vs-ufo`** — brand-pair format, which is the one
   format the citation data shows working. Both targets verified live.
4. **`/skin-and-beauty/natural-skincare-australia`** — Edible Beauty's category.

---

## 3. Architecture — built for ten partners, not four

Two shared modules so a new partner is a data row, never a rebuild:

- **`ProviderModule`** — one entry per partner: name, what it covers, the
  decision it suits, deep link, SubID slug, verification date. Renders as a card
  in a list that takes N entries.
- **`ProviderComparisonTable`** — takes an array of providers and an array of
  criteria. Adding a partner is one object, not a table rewrite.

Both mirror the existing `FeatureMatrix` / `OffersTable` patterns so the hubs
inherit conventions already enforced by `check-aeo` and `check-offers`.

Placement rules, matching the working hubs: primary action above the fold;
partner link at the decision point in the body, not only at the end; every page
terminating in a route.

---

## 4. Coming-soon copy — current wording becomes false on launch

Live today on both hubs:

> **/mens-health** — "Provider comparisons and any current offers are not on the
> page yet. We add those once we have checked a provider ourselves, and nothing
> here earns us a commission before then."
>
> **/skin-and-beauty** — "Missing so far: provider comparisons and any current
> offers… nothing on this page pays us until we do."

Both claims go false the moment a partner link lands. Proposed replacement,
keeping the coming-soon label:

> **{Category} is still being built.** The providers below are ones we have
> checked ourselves, and we earn a commission if you sign up through them. More
> are being added, so this is a starting set rather than the full market.

That keeps "coming soon" meaning *the category is incomplete*, states the
commercial relationship plainly, and stops promising nothing pays us.

`ComingSoonNote` currently takes a `variant` per hub. This needs a fifth
variant, `partnered`, applied to these two hubs only. The other 33 pages using
the component keep their existing wording, which remains true for them.

**Every page carrying an affiliate link also needs `AffiliateDisclosure`**,
which none of these 14 pages currently renders.

### The /coming-soon FAQ contradiction — confirmed

`src/app/coming-soon/page.tsx:97` states: *"Longevity is under consideration and
has not started."* **15 longevity URLs are live in the sitemap**, including 11
guides. Proposed replacement: *"Longevity has started: recovery, diagnostics and
supplement evidence are live. It has no partners yet, so nothing in it earns us
a commission."*

---

## 5. Compliance findings

**5.1 Prescription medicines (TGA, Therapeutic Goods Act).** Midoc supplies
hair-loss, sexual-health and weight treatments that are Schedule 4. Today the
men's-health pages carry no affiliate link and I verified in the 3 Sep audit that
**no medicine is named anywhere in shipped copy**. Adding a Midoc CTA removes any
editorial exemption on those pages. The existing site rule holds and gets
stricter: **describe the service, never the medicine.** No page may name or let a
reader identify a specific medicine.

**5.2 The ED page is the sharpest case.** A page about the cost of ED treatment,
carrying a commission link to a provider that supplies S4 medicines, is
advertising a prescription-medicine service to the public. It is defensible only
if the page describes access and cost, never product. It also has **no confirmed
Midoc service line**. Recommend it stays unlinked until Midoc confirms coverage
in writing.

**5.3 Cosmetic vs therapeutic claims (Foreo, LED masks).** A device claiming to
treat acne makes a **therapeutic** claim and must be included in the ARTG. A
device described as cleansing or improving skin appearance is cosmetic. Our LED
page must not claim acne treatment while linking a device, unless that device's
ARTG status is confirmed. **This is the single highest compliance risk in the
Skin & Beauty plan.**

**5.4 Affiliate disclosure (ACL s18/s29).** Required on all 14 pages once links
land. Non-negotiable, and currently absent from every one.

**5.5 Discount codes and incentives.** None of the four programs has supplied a
code. If one does, it lands in `offers.ts` with a reading date and appears in
`llms.txt`, per the existing onboarding standard. Do not publish a code from an
email without reading it on the merchant's own page.

**5.6 Quizzes — permitted as they stand.** Both `MensHealthQuiz` and
`SkincareQuiz` show the result client-side and send **only** an email and a
source string to `/api/skincare-quiz`. The code carries an explicit comment that
the result is deliberately withheld because sending it *"would attach an
inference about a sensitive category to an email address in our inbox and DB."*
That is the correct Privacy Act position for sensitive health information and
**must be preserved** when quiz outcomes start routing to a partner. Routing on
the client is fine. Sending the answer to the server is not.

---

## 6. What I need to proceed

1. **CF program terms** for Foreo, Edible Beauty, Aussie Health — rate, cookie
   window, qualifying conversion, AU eligibility, restrictions.
2. **A decision on the Midoc tier.** At 2–5% of an $18 certificate the free tier
   may not justify the rebuild.
3. **Midoc written confirmation** on: ED coverage, whether bulk-billed mental
   health pays, and the cookie window.
4. **Foreo AU shipping and commissionability** — no AU storefront exists.
5. **ARTG status** for any Foreo device we link from the LED page.

---

## Addendum, 4 September 2026: the failure shape, and what now catches it

Four instances of one fault have now been found by hand rather than by a check:

| # | The stale claim | What changed underneath it |
|---|---|---|
| 1 | `/mens-health/sexual-wellness-products` rendered "nothing here earns us a commission" | it gained a Midoc link |
| 2 | `midoc.ts` duplicated `$49` between the scalar fields and the `bands` table | one copy was edited |
| 3 | `llms.txt` told AI engines "Refer Labs has NO commercial partner in this category" for both hubs, and `/midoc` had no entry at all | four partners went live |
| 4 | Seven files carried `checked: "3 September 2026"` as a literal | the source was re-read on the 4th |

None of these was a mistake at the time of writing. Each was **true when written and
went stale when something elsewhere changed**, which is why proofreading does not find
them: the sentence still reads correctly, it is just no longer describing the site.

**The rule that follows.** Any sentence asserting the commercial state of a hub, a page
or a price is a **generated artefact that happens to be stored as prose**. It is output,
not writing. It may not be hand-maintained, it may not be duplicated, and it must either
be derived from the thing it describes or be guarded by a check that compares the two.
`llms.txt` is the clearest case: nobody opens it when they add a link, so left to prose
it drifts into asserting the opposite of the site to the engines we most want to cite us.

### What now enforces it

`scripts/check-partner-scope.mjs`, run in `prebuild`:

1. A page carrying a partner link may not render coming-soon wording that says it earns
   nothing. *(catches #1)*
2. A partner token may not appear outside its allowlisted route prefixes. Internal links
   into allowlisted territory are stripped first, so an index page can name a partner
   page without tripping it, while a `/go/` slug or a `cfjump` URL outside its hub still
   fires.
3. **New.** `llms.txt` may not tell engines a hub earns nothing when a page in it carries
   a partner link, and every live partner must be named in `llms.txt` **prose**. URLs and
   bare domains are stripped before that test, because `midoc.com.au` appeared inside
   other entries the whole time `/midoc` was missing, and a naive substring test passes on
   exactly the fault it exists to catch. *(catches #3)*

`scripts/check-partner-freshness.mjs`, also in `prebuild`: every file in
`src/lib/partners/` must carry a `readOn` date and a `source` URL. Silent under 45 days,
warns from 45 with the list of pages that print its figures, fails the build at 90.
*(the thing #2 and #4 were symptoms of: a date nobody re-reads)*

All three guards were verified by reintroducing the real fault and confirming the check
fires, then reverting.

### Still only catchable by hand

A price that changed on the vendor's site. No check can see that. The freshness escalation
is the substitute: it does not detect a wrong number, it makes it progressively harder to
ship without going to look.
