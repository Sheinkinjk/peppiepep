# New business-software pages: brand-pair candidates (4 Oct 2026)

Read-only research. Nothing in the site code was changed. Every vendor fact below was read on **4 October 2026** from the vendor's own page (curl with a Chrome UA, or headless Chrome via playwright from `node_modules` for JS-rendered pricing). Raw captures are in the session scratchpad under `bizsw/`.

## Method and what the demand data can and cannot say

**Google Trends (Australia, past 12 months, weekly).** I queried the explore and multiline endpoints in 11 batches.
- **Brand terms** were compared against "moshy" as a common anchor. Moshy's real demand is known from Search Console.
- **Pair queries** were compared against "moshy vs juniper + juniper vs moshy". Each pair term combined both word orders with `+`.

**The calibration result that governs everything below.** "moshy vs juniper" drew about 557 Google impressions to our own page in 90 days (230 + 213 + 74 + 40 across its four variants, at position 7 to 9), yet it **never cleared Trends' privacy threshold**: 0 in all 54 weeks. Trends' AU floor therefore sits above roughly 190 searches a month. As a result:
- Nearly every business-software pair is "too small to register" in Trends. That result does **not** separate a dead query from a Moshy-vs-Juniper-sized one.
- Only three pairs registered at all, each in 1 to 3 weeks of 54: Employment Hero vs Xero (2 weeks), Pipedrive vs HubSpot (1), GoHighLevel vs HubSpot (1). Xero vs MYOB, the control, registered in only 3 weeks.
- I added two other signals:
  - **Google autocomplete** (`suggestqueries`, gl=au, hl=en-AU). It shows ordering, not scale. It is AU-weighted only where the brands are Australian-market brands.
  - **Our own Search Console**, 4 Jul to 2 Oct 2026, query dimension.

**Brand interest relative to "moshy" (= 1.0), Trends AU, 12-month average:**

| Brand | Ratio to moshy | 12-month trend (first 13 wks vs last 13 wks) | Note |
|---|---|---|---|
| Employment Hero | **20x** | flat (80.8 to 77.5) | |
| DocuSign | 15x | down 14% | |
| HubSpot | 17x | down 21% | |
| Mailchimp | 8.5x | down 32% | |
| Hubdoc | **2.1x** | flat | |
| Dext | 2.8x | flat | ambiguous term (dextools, Dexter), overstated |
| Xero payroll | 3.4x | **up 52%** (12.0 to 18.2) | the rise lines up with Payday Super, 1 Jul 2026 |
| GoHighLevel | 3.5x | down 15% | |
| Pipedrive | 2x | down 40% | |
| Brevo | 1.5x | flat | |
| Carrd | 1.5x | flat | |
| ActiveCampaign | 1.3x | down 31% | |
| PandaDoc | 0.8x | flat | |
| Durable AI | 0.4x | collapsed to 0 in the last 13 weeks | |
| beehiiv | 0.25x | non-zero in 19 of 54 weeks | |
| Apollo.io | 0.15x | non-zero in 14 of 54 weeks | |
| Unbounce, Leadpages | below threshold beside HubSpot (under about 0.12x moshy) | | |
| Reply.io, Superfiliate, Capsule CRM, ConvertKit/Kit | 0 or near 0 | | |

**Search Console pair or brand queries (4 Jul to 2 Oct 2026):**
- None of the 14 candidate pairs has an impression, except "convertkit vs substack" (58), "kit vs substack" (6), "beehiiv vs convertkit" (4) and "beehiiv vs substack vs convertkit" (3).
- The Employment Hero / HR-payroll cluster is the largest B2B demand pool we touch:
  - "human resources payroll software" 253 impressions
  - "hr and payroll software" 236
  - "employment hero payroll software" 79
  - "employment hero hr software" 56
  - "employment hero pricing" 27
  - "employment hero alternatives" 18 + 10
  - "employment hero free trial" 12
  - "payroll programs" 52 at p5.0
  - "compare payroll software" 10
- "dext discount code" / "promo code" / "australia" add up to 51 impressions. "dext pricing australia" has 5 and "dext quickbooks" 1. "hubdoc" has none.

**Who ranks.** Google AU blocked both curl and headless Chrome with its bot challenge, and Bing returned junk. I therefore used the search tool, which is US-located, with "Australia" appended, and then fetched the pages that ranked to check them for AUD, dates and the owned fact. **These are not true Google AU positions. Treat the "who ranks" column as indicative.**

## Ranked table

| Rank | Proposed slug | Proposed title | AU demand evidence | Owned fact (sourced, read 4 Oct 2026) | Monetisation | Risk | Recommend |
|---|---|---|---|---|---|---|---|
| 1 | `/employment-hero-vs-xero-payroll` | Employment Hero vs Xero Payroll: Who Pays for 10 Users | One of only 3 pairs to register in Trends AU (2 of 54 weeks; moshy vs juniper never did). Autocomplete for "employment hero vs" puts Xero 2nd; "xero payroll vs" returns Employment Hero. Brand 20x moshy; "xero payroll" up 52% year on year. GSC: about 140 EH-named impressions/90d with no page answering the comparison | **Employment Hero's standalone Payroll plan is "$10, Conditions apply", and the condition is "a minimum of 10 Users", billed on the higher of contracted or active users** ([employmenthero.com/pricing](https://employmenthero.com/pricing/), Payroll tab rendered). **Xero bundles payroll into each AU plan by headcount:** Ignite $37 (1 person), Grow $78 (2), Comprehensive $107 (5), Ultimate 10 $143 (10), Ultimate 20 $180, 50 $250, 100 $300, then $2 per person (max 200). AUD including GST ([xero.com/au/pricing-plans](https://www.xero.com/au/pricing-plans/)). The AU page ranking for the pair ([ScaleSuite](https://www.scalesuite.com.au/resources/employment-hero-vs-xero-payroll)) prices both from guessed ranges ("might land around $5 to $10 per employee"). It never states Xero's included headcounts or the 10-user floor. Also: KeyPay's own site now says "KeyPay is now Employment Hero" ([keypay.com.au](https://www.keypay.com.au/)), so "Employment Hero vs KeyPay" is one product, not a pair | Employment Hero affiliate (`EMPLOYMENT_HERO_URL`, try.employmenthero.com). No code or offer; the free demo is the entry. Commission rate not recorded in the repo (UNVERIFIED). Intent is strong: a buyer choosing a payroll system | **Neutrality:** partner vs non-partner, and the owned fact argues *against* the partner for teams under 10 who already use Xero. That is the commercially inconvenient half and must stay in. **ACL:** cost comparisons must be like-for-like. Xero prints GST-inclusive figures; Employment Hero prints no billing period and no GST basis beside "$10", so no "cheaper" total should be computed. **No-partner-prices rule (27 Sep):** the fact is the *minimum*, which can be stated without the $10 figure if Jarred prefers. Trademark use is nominative only; no Xero logo | **Yes** |
| 2 | `/dext-vs-hubdoc` | Dext vs Hubdoc: Xero Now Has Its Own Capture | Autocomplete for "dext vs" puts Hubdoc 1st, and "hubdoc vs" puts Dext 1st. Both are Xero-ecosystem brands strongest in AU/NZ/UK. Hubdoc 2.1x moshy, flat. Pair below Trends threshold. GSC: 51 Dext-code impressions, no pair rows | **Xero's own Australian Hubdoc URL now 301s to its Smart Document Capture page**: `/au/accounting-software/hubdoc/` → `/capture-data-with-hubdoc/` → [`/store-files/`](https://www.xero.com/au/accounting-software/store-files/). That page says it costs nothing extra "on all Xero small business pricing plans". Xero's [2 Jul 2026 post](https://blog.xero.com/product-updates/smart-document-capture/) says it is "rolling out in beta for Australia and New Zealand", with GST extraction listed under "What's coming next". [hubdoc.com/pricing](https://www.hubdoc.com/pricing) still sells Hubdoc standalone at **US$12/month**. Dext AU starts at **$33.58/month AUD excluding GST** for 250 documents and 5 users ([dext.com/au/business/pricing](https://dext.com/au/business/pricing)). The ranking [eightX page](https://eightx.co/blog/dext-vs-hubdoc-receipt-capture) is wrong on three counts: it names the old Starter/Standard/Premium plans, says "no standalone Hubdoc subscription is sold today", and never mentions Xero's native capture. [Dext's own compare page](https://dext.com/au/resources/compare/dext-vs-hubdoc) also omits it | Dext affiliate (PartnerStack, `DEXT_URL`). No code; free trial with no payment details and up to 20% off annual (already on `/dext`). Intent is strong: a Xero user deciding whether to pay for capture | **Neutrality:** the owned fact tells a low-volume Xero user they may need neither product. Publish it. **ACL:** don't call Xero's capture inferior. State what is documented: beta in AU, and GST extraction not yet shipped per Xero. Prices carry different currency and GST bases (USD, AUD excl GST); say so in the table. Beta status will change, so set a `readOn` and re-check date | **Yes** |
| 3 | `/employment-hero-vs-deputy` | Employment Hero vs Deputy: Payroll Plan or Roster Add-on | Autocomplete for "employment hero vs" puts Deputy **1st**; "deputy vs" returns Employment Hero 1st; "keypay vs" returns only Employment Hero. Deputy is an Australian shift-work brand, so these signals are AU-weighted. Pair below Trends threshold (no registration). No GSC rows | **Deputy now sells its own payroll in Australia**: a Payroll add-on at **$5 per user per month, AUD excluding taxes, "Available on all plans in Australia"**. It sits on top of a base plan (Lite $6.75, Core $8.75, Pro $13), with a **minimum monthly spend of AUD $30** and every admin and manager counted as a user ([deputy.com/au/pricing](https://www.deputy.com/au/pricing)). Employment Hero publishes a standalone **Payroll plan at $10 with a 10-user minimum**, plus Rostering & Time and Attendance at $4 per employee a month ([employmenthero.com/pricing](https://employmenthero.com/pricing/)). The ranking [RosterElf page](https://rosterelf.com/compare/deputy-vs-employment-hero) (updated 2 Sep 2026) says Employment Hero publishes "no per-seat rate" and that "payroll sits in Employment Unlimited", which is wrong today. Other ranking snippets quote "Deputy from $9.75" and "Employment Hero from $20/user", which are stale | Employment Hero affiliate. Deputy is not a partner. Intent is strong (shift-based employers choosing a roster plus payroll stack) | **Neutrality:** partner vs non-partner, and for small shift teams Deputy's published per-user figures will look lower. Say so. **ACL:** GST bases differ (Deputy excl taxes, Employment Hero unstated) and Employment Hero's billing period is unprinted, so no computed totals. RosterElf is a competitor of both, so do not cite it as a source, only as the page that is wrong | **Yes, second wave** (demand is weaker than #1 and #2: autocomplete only, no Trends registration) |
| 4 | `/pandadoc-vs-docusign` | PandaDoc vs DocuSign in Australia: AUD vs USD | Autocomplete for "pandadoc vs" puts DocuSign 1st, plus "pandadoc vs docusign pricing". DocuSign 15x moshy, PandaDoc 0.8x. Pair below threshold. GSC: "pandadoc" 24 impressions; `/pandadoc` has had zero impressions since mid-July | DocuSign quotes AU visitors in AUD: Personal AU$15/month (5 envelopes/month), Standard AU$37/user/month, Business Pro AU$59/user/month, with **100 envelopes per user per year** on Standard and Business Pro ([DocuSign AU plans](https://ecom.docusign.com/en-AU/plans-and-pricing/esignature)). PandaDoc quotes **USD only** to the same visitor: Free (5 documents/month), Starter $19, Business $49, with "Unlimited document uploads and e-Signatures" ([pandadoc.com/pricing](https://www.pandadoc.com/pricing/)). Ranking pages quote DocuSign in USD ("Business Pro $40"). UNVERIFIED: whether PandaDoc's $19/$49 is the monthly or annual-billing figure (the page also prints "$49 per seat per month, billed annually") | PandaDoc affiliate (partnerlinks.io; final hop bot-blocks with 429 but works). No offer | Medium. The AUD-vs-USD fact is real but thin. PandaDoc's billing-period ambiguity has to be resolved first. Brand page has no traction | **No (for now)**. Revisit if `/pandadoc` regains impressions |
| 5 | `/brevo-vs-mailchimp` | Brevo vs Mailchimp: Both Now Bill in AUD | Autocomplete for "brevo vs" puts Mailchimp 1st. Brevo 1.5x moshy, Mailchimp 8.5x and down 32%. Pair 0 in Trends. No GSC rows. Autocomplete here is global, not AU-weighted | Both price in AUD to an AU visitor: Brevo Starter A$12/month (A$10.83 yearly), Standard A$25 ([brevo.com/pricing](https://www.brevo.com/pricing/)); Mailchimp Standard "starts at A$29.12/month" after a 14-day trial that needs payment details, and Free is "Under 250 contacts" ([mailchimp.com pricing, AUD](https://mailchimp.com/pricing/marketing/?currency=AUD)). Ranking snippets still say "Mailchimp free: 500 contacts" and quote USD | Brevo affiliate (PartnerStack). No code | AU demand unproven, and global incumbents (Brevo's own page, Capterra, Software Advice) own the SERP. Brevo is a partner; Mailchimp is not | **No**. See the side finding on `/brevo` below |
| 6 | `/gohighlevel-vs-hubspot` | | Registered in Trends 1 of 54 weeks. GSC "gohighlevel australia" 85 impressions at p50 | GHL prints $97/$297/$497 with **no currency and no mention of Australia** ([gohighlevel.com/pricing](https://www.gohighlevel.com/pricing)). HubSpot quotes AUD (free for up to 2 users; Starter from A$11/seat/month). That GHL bills in USD is **UNVERIFIED**: its billing FAQ does not say | GoHighLevel affiliate | The owned fact cannot be sourced yet | **No** |
| 7 | `/unbounce-vs-leadpages` | | Both brands fall below Trends' threshold even beside a mid-size anchor (under about 0.12x moshy). Autocomplete is reciprocal but global. GSC: "leadpages discount/coupon" about 21 impressions, Unbounce about 3 | Both are partners with real offers (Unbounce 20% off 3 months or 35% off year one; Leadpages 20% annual) | Both sides earn | No AU demand to speak of | **No** |
| 8 | `/pipedrive-vs-hubspot` | | Registered 1 of 54 weeks. Pipedrive down 40% year on year; `/pipedrive` has zero impressions since mid-July | Pipedrive's pricing page bot-blocks; HubSpot is AUD. No primary-sourced fact the ranking pages lack | Pipedrive affiliate | Thin fact, falling brand | **No** |
| 9 | `/activecampaign-vs-mailchimp` | | Autocomplete top. Pair 0 in Trends. ActiveCampaign down 31% | Not established | ActiveCampaign affiliate | Same weakness as #5 | **No** |
| 10 | `/reply-io-vs-apollo` or `/reply-io-vs-lemlist` | | Reply.io 0 in Trends AU; lemlist and Apollo.io near 0 | | Reply.io affiliate | No AU demand | **No** |
| 11 | `/carrd-vs-wix` | | Carrd 1.5x moshy; pair empty | `/carrd` and `/carrd-vs-butternut` are still "Discovered, not indexed". A third Carrd page will not fix that | Carrd affiliate | | **No** |
| 12 | `/beehiiv-vs-kit` | | beehiiv 0.25x, Kit about 0. GSC 4 impressions | Fold into `/best-newsletter-platform` (as the 30 Sep report already proposed) | beehiiv affiliate | Would split `/best-newsletter-platform` | **No** (fold) |
| 13 | `/durable-vs-wix` | | Durable AI fell to 0 in the last 13 weeks; "durable vs" autocompletes to power of attorney | | | | **No** |
| 14 | `/superfiliate-vs-social-snowball` | | All 0 in Trends; no autocomplete at all | | | | **No** |
| 15 | `/capsule-vs-pipedrive` | | "capsule crm" 0 in Trends; GSC "capsule crm" 5 | | | | **No** |

## Briefs for the recommended pages

### 1. `/employment-hero-vs-xero-payroll`

**Revenue-first line.** Intent: an Australian employer choosing a payroll system ("employment hero vs xero payroll"). Decision: a dedicated HR-payroll platform, or the payroll already inside the accounting plan. Monetisation: Employment Hero affiliate click (demo request).

**Answer-first lead (first paragraph after the h1):**
> Xero includes payroll inside each Australian plan, priced by headcount: one person on Ignite ($37 a month), two on Grow ($78), five on Comprehensive ($107) and ten on Ultimate 10 ($143), all GST-inclusive (xero.com/au/pricing-plans, read 4 October 2026). Employment Hero sells payroll as its own plan, listed at $10 with a minimum of 10 users, billed on the higher of contracted or active users (employmenthero.com/pricing, read 4 October 2026). A business with fewer than ten staff that already uses Xero is paying for payroll today. Employment Hero earns its place where award interpretation, rostering and HR records need to sit in one system.

**Buyer-question h2:** "Is Employment Hero better than Xero Payroll?" Per the 1 to 2 Oct rule, use "How do Employment Hero and Xero Payroll differ?" only when *both* sides are partners. Xero is not, so the verbatim buyer question is allowed here. Jarred should confirm.

**Facts table rows (each dated 4 Oct 2026, with its source):**

| Row | Employment Hero | Xero Payroll |
|---|---|---|
| How payroll is sold | Standalone Payroll plan, or bundled in quoted Employment Unlimited | Included in every AU accounting plan |
| Published price | $10, "Conditions apply"; no billing period or GST basis printed | Ignite $37 / Grow $78 / Comprehensive $107 / Ultimate 10 $143 a month, AUD incl GST |
| Headcount rule | Minimum 10 users | 1 / 2 / 5 / 10 / 20 / 50 / 100 people by plan; $2 per person after 100, max 200 |
| Rostering | Add-on, $4 per employee a month | Not in the pricing table |
| Accounting included | No (integrates with Xero and MYOB) | Yes |
| KeyPay | KeyPay's site: "KeyPay is now Employment Hero" | n/a |
| Payday Super | Both must support it; per-payday super applies from 1 Jul 2026 ([ATO](https://www.ato.gov.au/businesses-and-organisations/super-for-employers)) | same |

**Internal links:**
- Hub: `/compare/hr-payroll`. It is climbing (p10.3 over the last 11 days on 30 Sep) and currently out-ranks `/employmenthero` on EH queries, so the vs page gives that hub a deeper target.
- Siblings: reverse `relatedLinks` from `/employmenthero` and `/trainual`. Also link from `/business-software` and `/guides`.
- Add "Is KeyPay the same as Employment Hero?" as an FAQ here. It should not be its own page.

### 2. `/dext-vs-hubdoc`

**Revenue-first line.** Intent: a Xero or QuickBooks user choosing receipt capture ("dext vs hubdoc"). Decision: pay for Dext, use Hubdoc, or use what Xero now ships. Monetisation: Dext affiliate click (free trial).

**Answer-first lead:**
> Xero now ships its own receipt and bill capture, and its Australian Hubdoc page redirects to it: xero.com/au/accounting-software/hubdoc/ forwards to Xero's Smart Document Capture page, which says the feature costs nothing extra on all Xero small business plans (read 4 October 2026). Xero says it is in beta in Australia, with GST extraction still listed as coming next (blog.xero.com, 2 July 2026). Hubdoc is still sold on its own at US$12 a month (hubdoc.com/pricing), and Dext's Australian plans start at $33.58 a month excluding GST for 250 documents and 5 users (dext.com/au/business/pricing). Dext is the one built for high volume, line-item extraction and QuickBooks or Sage users.

**Buyer-question h2:** "Is Hubdoc still free with Xero?" This exact question appears as an FAQ on the ranking eightX page, which gets it wrong.

**Facts table rows (4 Oct 2026):**

| Row | Dext | Hubdoc | Xero Smart Document Capture |
|---|---|---|---|
| Price | From $33.58/month AUD excl GST (250 docs, 5 users); up to 20% off annual | US$12/month standalone | No extra cost on Xero small business plans |
| Status in AU | Generally available | Sold; Xero's AU Hubdoc URL now redirects to Smart Document Capture | Beta in AU and NZ (since 2 Jul 2026) |
| GST extraction | Yes (Dext reads tax) | | "Coming next" per Xero |
| Accounting software | Xero, QuickBooks, Sage | Xero, QuickBooks Online | Xero only |

UNVERIFIED and worth one more read before building: whether Hubdoc remains bundled free for AU Xero subscribers. Hubdoc's own pricing page shows only the US$12 standalone price.

**Internal links:**
- Hub: `/compare/payments` (retitled "Payoneer vs Dext" in the 30 Sep audit).
- Siblings: reverse links from `/dext` (which the 30 Sep audit flagged as having no sibling `relatedLinks`) and from `/employmenthero`, which would also close the audit's Dext ↔ Employment Hero gap.
- Also `/business-software` and `/guides`.

### 3. `/employment-hero-vs-deputy` (second wave)

**Revenue-first line.** Intent: a shift-based employer choosing roster plus payroll. Decision: an HR-first platform with a roster add-on, or a roster-first platform with a payroll add-on. Monetisation: Employment Hero affiliate click.

**Answer-first lead:**
> Both now run Australian payroll, from opposite starting points. Deputy is a rostering platform whose Payroll add-on is $5 per user a month on top of a base plan from $6.75, AUD excluding taxes, with a $30 minimum monthly spend and every manager counted as a user (deputy.com/au/pricing, read 4 October 2026). Employment Hero is an HR and payroll platform whose Payroll plan is listed at $10 with a 10-user minimum, and rostering is a $4 per employee add-on (employmenthero.com/pricing, read 4 October 2026).

**Buyer-question h2:** "Does Deputy do payroll in Australia?"

**Facts table rows:**
- Base plan
- Payroll (add-on vs plan)
- Rostering (included vs add-on)
- Minimums ($30 a month vs 10 users)
- Who counts as a user
- GST basis as printed

**Internal links:** hub `/compare/hr-payroll`; siblings `/employmenthero` and `/employment-hero-vs-xero-payroll`, linked both ways.

## Risks that apply to all three

- **Monetisation reality (memory, 4 Oct 2026).** Business-software pages drew 49 GA4 pageviews and **zero** `affiliate_click` events in the last 30 days. There have been only 2 B2B orders ever. These pages are the best-evidenced pairs in the cluster, but expect them to need rank before they earn. `category-focus-2026` also says not to grow B2B SaaS. These pages deepen existing partners rather than adding programs, but Jarred should weigh that.
- **PartnerStack terms.** PartnerStack's own [Partner Agreement](https://partnerstack.com/legal/partner-agreement) and [Code of Conduct](https://partnerstack.com/legal/code-of-conduct) contain nothing on comparison content or brand bidding. Each vendor's "Channel Program Agreement" governs those, and it sits inside the PartnerStack dashboard, not on a public page. **UNVERIFIED for Employment Hero and Dext.** Jarred should open each program's terms in the dashboard before any paid or brand-bid use. Organic comparison content is not restricted by anything public.
- **Trademark.** Use the names nominatively, in plain text. Use no Xero, Deputy or Hubdoc logos, which would imply partnership or endorsement.
- **Mixed GST and currency bases** are the main way any of these pages could mislead. Xero prints prices including GST. Deputy and Dext print them excluding GST. Hubdoc prints USD. Employment Hero prints neither a period nor a GST basis. Print each figure exactly as the vendor prints it, label its basis, and never sum or rank totals.

## Side findings (not new pages)

- **`/brevo` and `offers.ts` may be stale on the free plan.** We print "Free (300 emails/day)". Brevo's pricing table today shows Free at "5,000 emails/month", while its own FAQ on the same page still says "up to 300 emails per day". Brevo's page contradicts itself, so check which is current before changing ours.
- **Xero's pricing page still shows a promo that has expired:** "90% off ... until 11:59pm AEST on 30 September 2026", next to a banner reading "80% off". Do not cite either.
- **Employment Hero's billing period.** The plan cards print "$10 * Conditions apply" with no "per month" or "per employee". The live `/employmenthero` page already handles this correctly.
