# Page layout, slop and claims audit: 25 money pages (30 Sep 2026)

Read-only. Live HTML, screenshots at 1280 and 375, and every partner claim checked against the partner's own site on 30 Sep 2026. Evidence (reading orders, screenshots, provider page text) is in the session scratchpad under `layout-audit/{wl,hair,other}`. Nothing was changed on the site.

## Decisions only Jarred can make (they block rewrites)

1. **Dense.** densehairexperts.com footer, read 30 Sep 2026: "Dense (Family Pharmaceuticals Ltd) is a UK pharmacy regulated by the GPhC. Personalised treatment plans are prescribed following an online consultation reviewed by a qualified healthcare professional." Store is London, GBP. Our pages call Dense a non-prescription topical brand with "no consultation, no practitioner and no prescription" (/dense, /mosh-vs-dense, /best-hair-loss-treatment-australia, /hair-loss "the main Australian name", llms.txt lines 36, 177, 184). ACL s29 accuracy problem and a TGA question (sending Australians to an overseas prescribing pharmacy). Keep Dense (and reframe every page), or retire it from the hair cluster?
2. **Knose offer is public.** knose.com.au homepage, read 30 Sep 2026: "First 2 Months Free!". /deals says every code is "unique to Refer Labs"; /knose presents referlab2mf as what gets you the offer. What does referlab2mf add beyond attribution? (Log in PENDING_VERIFICATION until answered.)
3. **Moshy vs Juniper difference.** getmoshy.com.au/weight-loss, read 30 Sep 2026: "In-app health tracking and health coaching", "Dietitian-approved meal plans, recipes and nutrition support", "Active and supportive community", "multidisciplinary care team of doctors, nurses, pharmacists, psychologists, dietitians, and exercise physiologists". Our "Moshy = lean clinical pathway, no coaching; Juniper = coaching and community" framing is false on /moshy-vs-juniper, /best-weight-loss-telehealth-australia, /weight-loss, /cheapest. The honest differences we can source: Juniper sells 1:1 coaching as an add-on and is marketed to women; Moshy is Mosh's brother brand and also covers hair and skin; REFERRAL120 has a 3-month minimum, JARREDKFC waives a consult. Approve rewriting the comparison around a dated "what each includes" table?
4. **Cost pages that print no figure** (/cheapest, /hair-loss-treatment-cost-australia). Non-partner, primary-sourced figures would make them answer their query (Doctors for Weight Loss $89.99/$59.99, MBS GP rebate). Allowed, or keep figure-free?
5. **Partner price lists on hubs**: /i-screen full test price list, /mens-health Midoc $49/$69/$18, /health-and-beauty Foreo/Technogym/OptiSlim/Edible Beauty prices. Keep, or apply the 27 Sep no-partner-prices rule to them too?
6. **Homepage "This month's top picks" and the full-width Apollo feature** push paying partners beside "No paid rankings, ever". Remove, or turn into an alphabetical offers strip?
7. **Pilot section on /best-hair-loss-treatment-australia** ("Mosh vs Pilot: what changed"). Default: cut, consistent with retiring /mosh-vs-pilot.

## P1: misleading, legal, or visibly broken (fix first)

**Legal / accuracy**
- Apollo and battery pages disclose payment only after the lead form and CTAs (Apollo: CTA at char 175, first disclosure at 6,216; battery: 518 vs 3,159). `check-disclosure-order` misses internal `#register` / lead-href CTAs. Add the disclosure above the form and extend the guard.
- Apollo copy describes the retired flow: "dedicated landing page for Refer Labs readers", "discount is attached to the link", "No code to enter" (x2), "The form asks for four things" (form has nine fields). Homepage figcaption "$500 is the figure read off Apollo's own page": no $500 on Apollo's site. Unattributed blockquote in quotation marks on /apollo-energy-group. "voted SBC's number one battery installer" (Apollo says "Voted #1 NSW retrofit battery team"); "Electrical Licence 400672" (footer: "400672C"); "installs across Australia" (Apollo is NSW-focused).
- NSW VPP "roughly $1,000 to $1,100" / "$40 per usable kWh" has no primary source (energy.nsw.gov.au publishes no dollar figure) and is a banned approximation.
- Battery FAQ "Do I need solar panels?" dodges; DCCEEW: discount "available for batteries connected to new or existing solar PV systems". "You do not claim it back yourself" is contradicted: DCCEEW says upfront reduction OR rebate after installation.
- /juniper "20,000-member patient community" x8: unsourced; Juniper says "300,000 members worldwide" / "thousands of members".
- /best-pet-insurance-australia "On the published numbers Knose pays a higher share of the bill" is a comparative product judgement (AFSL) and only true at Knose's 90% option. FAQ says one provider does not publish cover levels while the page prints both.
- Everlab page: "We quote no prices for Everlab" / "could not verify" contradicted by everlab.com.au/plans ($299 / $1,199 / $2,999 yearly); "imaging vs pathology" framing wrong (Everlab sells Full Body MRI and DEXA).
- /deals: header "9 offers · 5 codes" vs FAQ "Six"; PetsOnMe outside the table; Leadpages row is public pricing ("Save 20% with annual billing"), remove.
- Mosh "nothing to type / applied automatically" x11 on /moshhair (22 across cluster): Mosh's own /start/referlabs banner says "Use at checkout". Say "Our link carries REFERAL55; if it isn't shown at checkout, enter REFERAL55."
- /mosh-review "monthly subscription": Mosh hair first order covers 3 months; 180-day guarantee applies to quarterly hair programs (qualify the unqualified "money-back guarantee").
- Hair-loss cost page contradicts itself on Medicare (lead/answer say no rebate; later says a telehealth consult may attract one).
- /best-hair-loss-treatment-australia: truncated sentence live in FAQ + JSON-LD ("A GP consult may be bulk-billed or carry a gap fee,"); /mosh-vs-dense truncated ("the practitioner can decline or redirect you,"); "Mosh's middle plan" placeholder; FAQPage/Breadcrumb/WebPage JSON-LD emitted twice.

**TGA residue (30 Sep rules) still live**
- Buttons: /moshy "Start the Moshy eligibility check"; /moshy-review "Start your free eligibility check" x2 and "Start the Moshy eligibility check"; /juniper "Start the Juniper eligibility check"; /best-hair "Check your options with Mosh".
- Delivery/prescribe: /moshy-review "anything prescribed delivered to your door", "Anything prescribed is sent to your door"; /juniper "everything delivered discreetly to your door" x2; /moshy FAQ "treatments are delivered directly to your home address"; /moshhair "treatment posted to your door", "home delivery" chip, "fee bundles any treatment"; /best-weight "final cost depending on the treatment prescribed" x2, "Medication pathway."; /hair-loss "prescription telehealth" x3; /mosh-vs-dense title "Prescription vs Topical", "driven by hormones", "Suitability for any prescription medicine"; /moshhair FAQ "How long does hair-loss treatment take to work?" (results timeline, cut).

**Hub neutrality**
- /best-weight-loss-telehealth-australia: "Listed alphabetically, not ranked" then legacy "01 Moshy / 02 Juniper" cards; Moshy-only affiliate buttons in the legacy table and card; Moshy-only sticky bar; Moshy-only "Notify me" copy. /best-hair: Mosh-only sticky labelled "hair-loss treatment".

**Layout the owner flagged**
- /moshy: the body h2 "Is getmoshy.com.au the official Moshy site?" belongs in the FAQ, merged with "Is getmoshy legit?" and strengthened with Moshy's own accreditation facts (NSQPCH, AHPRA-registered independent doctors and nurses, read 30 Sep 2026). Remove its TOC entry.
- /best-weight-loss-telehealth-australia "The two providers, on the same terms": 5 columns crammed into ~740px; Juniper's offer cell runs 16 lines; CTA column has no header; Juniper's mandated disclosure jammed under its button; tiny cropped Juniper logo; meta-commentary intro. Rebuild as an attribute table (rows: how it works / what's included / how it's priced / Refer Labs code + date / CTA; columns: Juniper, Moshy) or the equal two-card pattern from /moshy-vs-juniper; disclosures once above; intro "Listed alphabetically." The page also has four separate side-by-sides (this table, a legacy 5-column table, legacy 01/02 cards, a 10-row tick matrix): keep one.

## P2: slop, wrong placement, weak structure

**Placement (move to FAQ / merge / cut)**
- /moshy: 6 CTAs; one-row offer table + boilerplate footnote; merge "What Moshy is" + "How treatment and eligibility work" + 4 steps; cut "Should you use Moshy?" box and eligibility CTA box; no breadcrumb or related links (dead-end money page). Mobile sticky bar covers the hero button on first load.
- /moshhair: 7 CTAs, "55%" x11; cut the one-row table and the body h2 "What is the current Mosh discount code?" (duplicates lead + FAQ 1); FAQ 1, 3 and 12 are the same question; lead opens with throat-clearing.
- /juniper: legit/worth-it argued three times (body h2, "Why Juniper", three FAQs); mandated sentence sits after the first Juniper CTA; pill + disclosure between h1 and lead.
- /moshy-review, /mosh-review: leads list topics instead of answering "is it legit"; titles promise cost the pages don't give.
- Brand pages /knose, /petsonme, /i-screen, /apollo: identical one-row offer table with a footnote that is false on three of them; cut from brand pages (keep on /deals). /i-screen shows the offer four times before the first h2.
- /best-pet-insurance-australia: offer callouts inside the answer box; replace with one side-by-side (benefit %, limit, excess, sub-limits, hereditary cover, waiting-period waiver, underwriter, offer). Underwriter FAQs compete with /who-underwrites-pet-insurance-australia.
- /weight-loss: "three pathways" vs "two routes" contradiction; providers block duplicates /best word for word.
- /cheapest and /hair-loss-cost FAQs about "the Moshy/Mosh discount code" compete with the brand pages for the code query: remove, link instead.

**Slop (repeated skeletons to reduce to one plain fact per page)**
- Screening-as-legitimacy: "not a vending machine", "not a storefront", "the clinical screening working as it should", "a feature of a clinical service rather than a flaw", "not an automatic checkout" (~8 instances).
- Neutrality narration: "neither can pay to be described more favourably", "never changes a comparison or a conclusion" (5 pages), "Both answer the same four questions", "which is why we state it rather than leave it out", "We never sell rankings".
- "[X] is the draw, but the practitioner review is the part that matters" (/moshy, /juniper pull quotes); "not three prices for one" (Everlab x2, /i-screen); "access and speed, not a better test" (i-screen x2); "They are not alternatives / do different jobs" (x9 in hair); "commits you to nothing / no obligation" (up to 7 per page); "Under 30 seconds" (Apollo x5, battery x3); "frequently bulk billed" (i-screen x6, unsourced); "worth knowing" (x8).
- "Our guide to each of them: What each one costs, and what we could not verify about it" (/best-weight, /best-hair, /hair-loss): untrue.

**Contradictions between pages**
- Moshy questionnaire time: "~5 min", "5-10 min", "about ten minutes", "a few minutes" (Moshy publishes none).
- Offer check dates: 23 Sep, 17 Aug, 21 Jul, "September 2026"; Mosh guarantees 14 Aug vs 30 Sep; many JSON-LD dateModified values stale (2026-03-16, 07-16, 08-14). Re-read once, one date per offer.
- Moshy pricing "confirmed in the consult" vs "lists its program price on its own site" (Moshy publishes "Treatment from $249").
- Juniper pricing: "no public pricing" (/best, 21 Jul, stale: Juniper says "starts from $349*") vs "two program options" vs "three, six and twelve-month bundles".
- Juniper audience: "Women only, not available for men" vs "designed and marketed for women".
- Homepage "Men's Health: Coming soon" vs live Midoc provider on /mens-health.

## P3: polish
- Sticky bars truncate at 375; varied CTA labels per page (pick one); floating icon overlaps the /moshy at-a-glance card; duplicate scale icon on /best; h2 rendered at h3 size on /moshy-review; mobile tables clip on /best-hair and /mosh-vs-dense (no scroll cue); Apollo uses a generic sun icon; stale footers ("as at July 2026").

## Proposed shared skeletons

Brand/offer page (/moshy, /moshhair, /juniper, /knose, /petsonme, /i-screen): h1 = title keyword + offer -> lead (code, what it takes off, one-line service description; nothing above it) -> disclosure + partner-mandated wording above the first link -> primary CTA + at-a-glance card (what it is, how it works, price model without figure, code + conditions, checked date) -> "What does [brand] include?" (quoted from the brand's own page, dated) -> "How does [brand] work?" (steps; prescription-only line once) -> "Who is it for / not for?" -> "How is it priced?" (model, code conditions) -> alternatives row -> FAQ, 5-7 items (code mechanics incl. typing it at checkout, other public codes dated, "is [domain] official / is it legit" with accreditation facts, cancel/refund, who is not suitable) -> one closing CTA -> related -> disclaimer. Max 4 CTAs including sticky; sticky only after the hero CTA leaves view.

Comparison/best/hub page: h1 -> answer lead -> disclosures once above anything clickable -> ONE side-by-side (attribute rows x provider columns, alphabetical, CTA row last, no numbering) -> buyer-question h2s -> FAQ (no brand-code FAQ that competes with the brand page) -> related. No single-provider sticky bar, no legacy cards.

## Suggested order of work
1. Jarred's decisions 1-3 (Dense, Knose, Moshy/Juniper framing).
2. P1 legal/accuracy + TGA residue + disclosure-order guard gap (Apollo, battery).
3. The owner's two examples (/moshy official-site h2 -> FAQ; /best side-by-side rebuild) as part of applying the brand and comparison skeletons to /moshy, /moshhair, /juniper, /best-weight, /best-hair.
4. P2 slop and date consolidation (one re-read pass of every offer on 1 date).
5. P3 polish.
