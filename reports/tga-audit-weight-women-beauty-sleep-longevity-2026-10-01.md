# TGA / Ahpra / ACL audit: weight loss, women's health, health & beauty, sleep, longevity, /deals, homepage

Read-only audit of the **live rendered site**, 1 October 2026. Every in-scope URL (57 pages: 56 in `sitemap.xml` plus the noindexed `/weight-loss-guide`) was fetched with a Chrome user-agent, scripts stripped, and the title, meta description, JSON-LD (FAQ, Offer, ItemList, Organization), alt text, anchor text, outbound `href`s and `/go/` slugs read alongside the body. Client-rendered quiz and calculator copy was read from source (`PathwayQuiz.tsx`, `CostPlanner.tsx`, `SkincareQuiz.tsx`) and the guide email from `src/lib/weight-loss-guide-email.ts`. The linked partner landing pages (Moshy) were also fetched, because the TGA treats linked material as part of the advertisement.

Every hit was read in context. Negations, our own disclaimers and plain regulatory statements were discarded unless their **placement** creates the problem (noted where so).

## Law and guidance relied on (fetched 1 Oct 2026)

| Short cite | Source | Rule text relied on |
|---|---|---|
| **Act s42DL(10) / s42DLB(7)** | Therapeutic Goods Act 1989 | Offence / civil penalty: advertising S3/S4/S8 substances to the public |
| **TGA-HS** | *Advertising health services that involve therapeutic goods*, last updated 18 June 2026 | A health-service ad also advertises goods when it "refers to specific therapeutic goods, or a class of goods ... including terms that can act as substitutes ... 'weight loss injections'" or "represents to potential patients that they could obtain a prescription for the goods, purchase the goods or be treated with those goods through the health service". "Promoting a telehealth service as a way to obtain particular prescription medicines or a class of prescription medicines is likely to constitute prohibited advertising." "Tags, links, discount codes or directions to book services involving therapeutic goods can cause content to be considered advertising of the goods." Safe harbour: "promoting the type of health practitioner consultations offered ... or the medical conditions a service can treat, without directly or indirectly referring to therapeutic goods, is unlikely to constitute advertising". |
| **TGA-Rx** | *Complying with the restrictions on advertising prescription medicines to the public*, 23 June 2026 | Table 1 indirect references ("Weight-loss injections", "GLP-1 receptor agonists", class references). Likely advertising where a service "can supply specific prescription medicines or facilitate the supply", "can provide prescriptions for ... a class", or "offers consultations ... where the advertising implies that a prescription could or will result". "Providing a form or facility that allows consumers ... to check their eligibility for a prescription medicine, for example a survey, questionnaire, checklist". "Listing prices for treatments or services that involve, or reference, prescription medicines (whether as a total cost of treatment or cost per unit) is likely to amount to advertising." "Referencing (linking to) third-party information" can make the linking site an advertiser. "Including a disclaimer or caveat ... does not exempt the material." UTI pharmacy example: "assess and prescribe treatment for urinary tract infections ... get the antibiotics you need" = non-compliant. Direct marketing emails "are unlikely to be exempt". |
| **TGA-Adv** | *Determining if your content is advertising*, 7 Apr 2026 | Intent judged "on its face", not by the publisher's intention; promotional characteristics include calls to action, "price and point of sale information", "offers, discounts". A person "causes the advertising" where they "have control over the content", "regardless of whether there is a payment". Advertisers "are responsible for the material they publish, regardless of whether they have copied that material". |
| **Code** | Therapeutic Goods (Therapeutic Goods Advertising) Code Instrument 2021, Compilation No. 1 (F2023C00019). Note: F2026L01329 (labelling consequential amendments) commenced 30 Sep 2026; section numbers below are from Compilation 1 and the lawyer should confirm none moved | s8(1) accurate, balanced, substantiated; s9(1)(a) not represented as "safe, or without harm"; s9(1)(b) "effective in all cases"; s9(2)(a) "undue alarm, fear"; s9(3)(d) exaggerate efficacy; s9(3)(e) inappropriate or excessive use; s14(e) name/price/point-of-sale-only ads exempt from Part 4 if no therapeutic claim; s20(1) device ads must carry trade name, accepted intended purpose and "ALWAYS FOLLOW THE DIRECTIONS FOR USE"; s23(4) weight-management claims must promote diet and activity and not use "statistics or testimonials of individuals" beyond average results; s24 testimonials; s28 serious forms (diagnosis requires a practitioner, or a screening test needing medical interpretation) are restricted representations. |
| **Ahpra s133** | Health Practitioner Regulation National Law s133(1); Ahpra *Guidelines for advertising a regulated health service* (Dec 2020) | "A person must not advertise a regulated health service ... in a way that (a) is false, misleading or deceptive; (b) offers a gift, discount or other inducement ... unless the advertisement also states the terms and conditions of the offer; (c) uses testimonials ...; (d) creates an unreasonable expectation of beneficial treatment; (e) directly or indirectly encourages the indiscriminate or unnecessary use of regulated health services." Applies to "a person", not only practitioners. |
| **ACL** | Competition and Consumer Act 2010 Sch 2 | s18 misleading conduct; s29(1)(i) false or misleading representation about price. |

Enforcement context: on 12 July 2024 the TGA issued 21 infringement notices totalling $319,260; the largest single recipient was **Advert Digital Pty Ltd** ($93,900), an advertising business rather than a clinic. Publishers are in scope.

## Summary

| Severity | Count |
|---|---|
| HIGH | 7 |
| MEDIUM | 13 |
| LOW | 10 |
| **Total** | **30** (several are cluster-wide patterns; each lists every page it appears on) |

**Retire:** `/moshy-eligibility` (301 to `/moshy-review`). It exists only to rank for "Moshy eligibility check", and the TGA names an eligibility questionnaire for a prescription medicine as advertising.

**Biggest structural exposure, not fixable by copy alone:** every Moshy CTA on 13 pages links to `getmoshy.com.au/start/eligibility-check-moshy`, a page that (read 1 Oct 2026) says "Prescription treatments may come in tablet or injectable form", calls them "Clinically proven treatments", shows weight-loss testimonials ("Bianca, 34 Lost 13kgs 3 months") and runs a BMI calculator. Under TGA-Rx's linking rule and TGA-HS's "links, discount codes" rule, that content is attributable to the page that sends readers there with a code.

**What is clean:** the sleep, longevity, recovery, diagnostics, i-screen and Everlab/Prenuvo pages; OptiSlim, Foreo, Edible Beauty, Aussie Health Products, Emma Sleep and Technogym pages. No page names a prescription medicine, brand or class acronym (GLP-1, semaglutide etc.); the 19 Aug sweep holds. No testimonials, star ratings or before/after imagery on any in-scope page. No cancer-detection claims for Prenuvo, Everlab or i-screen; the diagnostics pages carry the RANZCR position against screening asymptomatic people.

**Pattern behind the HIGH findings:** the 30 Sep wording pass reached the pages edited that day. Pages last modified in July and August (`/moshy-vs-gp` 6 Jul, `/moshy-eligibility` 6 Jul, `/weight-loss-telehealth-cost-australia` 14 Aug) and client-rendered tools (calculator, quiz) still describe medicine supply, delivery, pharmacy prices and eligibility.

## 1. Weight loss

### HIGH

**H1. `/moshy-eligibility`: a page that promotes an eligibility check for prescription treatment**
- Title: "Moshy Eligibility Check Explained: What the Quiz Asks"; H1: "The Moshy eligibility check, explained before you start it"
- "In Australia, any pathway that could end in a prescription requires a registered practitioner to assess each person individually"
- "You are approved to continue, asked follow-up questions, or told the service is not the right fit" / "If approved, you see the plan before paying. Treatment options and the subscription price are laid out inside the platform."
- CTA: "Ready to see where you stand? The check is free to complete and the referral applies automatically through this link." Button: "Start the Moshy eligibility check ($120 off first order)"
- FAQ: "Moshy's eligibility check is open to anyone considering the clinical pathway."
- Rule: TGA-Rx ("a form or facility that allows consumers ... to check their eligibility for a prescription medicine, for example a survey, questionnaire"; consultations "where the advertising implies that a prescription could or will result"); Act s42DL(10). It is the same fault for which `/weight-loss-treatment-eligibility-australia` was retired on 30 Sep, and it contradicts the 30 Sep rule banning "Check eligibility" buttons. Last modified 6 Jul 2026.
- Fix: **retire, 301 to `/moshy-review`**. Remove it from `/weight-loss` ("Tool: Moshy's questionnaire, explained"), the `/weight-loss` CollectionPage ItemList, `/moshy-review` ("What the questionnaire asks →"), `/moshy-vs-gp` ("The eligibility check →"), `sitemap.ts`, `search-index.ts`, `/guides`, `public/llms.txt` line 160, and give its `seoConfig` entry `noIndex: true`.

**H2. `/moshy-vs-gp`: medicine supply, delivery, pharmacy prices and "eligibility check"**
- "Moshy is faster and entirely online, with the eligibility check, practitioner review and delivery handled in one flow"
- Table row "Format": Moshy "App, email, delivery to your door" vs GP "Clinic visits, scripts filled at a pharmacy"
- "If the telehealth route suits your situation, Moshy's eligibility check is the starting point. Ten minutes, no commitment, referral applied automatically." Anchor: "The eligibility check →"
- FAQ: "A GP route can involve consultation fees offset by Medicare plus standard pharmacy prices, while Moshy bundles the practitioner oversight, check-ins, and delivery into one subscription"
- "What it offers instead is the removal of every small barrier between deciding to act and acting"
- Rules: TGA-Rx ("can supply ... or facilitate the supply"; scripts vs delivery is a comparison of how the medicine reaches you); TGA-Rx price rule; Ahpra s133(1)(e) (encouraging unnecessary use). **ACL s18 / s29(1)(i):** "no commitment" sits beside a REFERRAL120 CTA whose terms impose a 3-month minimum. "For plenty of men, that difference is the difference between starting" also sends men to a service that describes itself as a women's clinic. Last modified 6 Jul 2026; the 30 Sep pass never reached it.
- Fix (rewrite, keep the URL): drop the Format row; "Moshy runs the consultation online by phone or video and bundles follow-ups, coaching and meal plans into one program fee"; GP column "In-person consultations, partly offset by Medicare"; replace the CTA line with "Continue to Moshy. REFERRAL120 takes $120 off a first order and carries a 3-month minimum commitment"; delete "removal of every small barrier ..." and "For plenty of men"; replace the cheaper-FAQ with "A GP consultation is partly offset by Medicare; Moshy charges one program fee published on its own site."

**H3. `/weight-loss-telehealth-cost-australia`: a price page built on what the medicine costs and how it is dispensed**
- Lead: "Some, such as Moshy, list one all-inclusive program fee covering treatment, support and delivery. Others charge a consultation fee and bill anything dispensed separately through a pharmacy."
- Meta description (SERP-visible): "... and why medication is billed separately." (This also contradicts the recorded fact that Moshy's fee is all-inclusive.)
- "One monthly fee covering the practitioner assessment, follow-ups, support and, where appropriate, treatment and delivery."
- FAQs: "Any medicine is usually an additional, separate cost"; "the subscription and any weight-management medicine are typically not fully covered"; "both service fees and medicine prices change over time"; "On an all-inclusive program, treatment decided by the practitioner is part of the fee."
- Rules: TGA-Rx price rule ("listing prices for treatments or services that involve, or reference, prescription medicines ... as a total cost of treatment"); "facilitate the supply"; ACL s18 for the meta description.
- Fix (rewrite): explain fee structures without saying what is dispensed. Lead: "Online weight-management services charge a monthly program fee for consultations, follow-ups and support, and each publishes what its fee covers on its own pricing page. A GP consultation is partly offset by Medicare." Delete "treatment and delivery", "dispensed", "pharmacy" and "medicine prices" throughout, and rewrite the meta: "How weight-loss telehealth is priced in Australia: program fees, minimum terms and Medicare, and where each service publishes its price." See lawyer question 2 on the ACL tension this creates.

**H4. `/cheapest-weight-loss-telehealth-australia`: the reader is told to check whether medicine is in the fee**
- Step 2: "Check whether medicine, delivery and support sit inside the fee or are billed on top."
- FAQ "Is treatment included in the price?": "Some, such as Moshy, list an all-inclusive program fee; others charge for the consultation and bill anything dispensed separately through a pharmacy. Weight-management medicines are prescription-only in Australia and are only supplied where a registered practitioner decides they are clinically appropriate."
- Rule: TGA-Rx price rule and "facilitate the supply"; the FAQ question itself asks whether S4 treatment is in the price.
- Fix: Step 2 becomes "Ask what the fee covers: consultations, follow-ups, coaching, minimum term." Delete the "Is treatment included" FAQ, or retitle it "What does a program fee cover?" and answer with consultations and support only.

**H5. `/weight-loss-cost-calculator`: the first question offers medicine-and-delivery bundles vs pharmacy prices**
- Step 1 option: "One subscription that bundles everything: Practitioner oversight, treatment and delivery in one fee"
- Step 1 option: "Pay per appointment as I go: Consult fees and pharmacy prices, no program fee"
- Lead: "the figure depends on the plan a practitioner approves for you"
- Result copy (`CostPlanner.tsx`): GP route "Pharmacy costs for anything the GP decides on"; question to ask "What would the treatment cost at my pharmacy?"
- Rule: TGA-Rx price rule; "providing a form or facility ..." (a tool that sorts readers by how they will pay for prescribed treatment).
- Fix: options "One program fee covering consultations and support" / "Pay per consultation, no program fee"; remove the pharmacy lines from the GP result; "the figure depends on the program and support level you choose".

**H6. Every Moshy CTA (13 pages) lands on a page advertising prescription weight-loss treatment**
- Our `href` on `/moshy`, `/moshy-review`, `/moshy-vs-juniper`, `/moshy-vs-gp`, `/moshy-alternatives`, `/moshy-eligibility`, `/weight-loss`, `/best-weight-loss-telehealth-australia`, `/cheapest-...`, `/weight-loss-telehealth-cost-australia`, `/weight-loss-telehealth-men-australia`, `/weight-loss-telehealth-women-australia`, `/weight-loss-cost-calculator`: `https://www.getmoshy.com.au/start/eligibility-check-moshy`
- That page, read 1 Oct 2026: "Prescription treatments may come in tablet or injectable form and require an online consult"; "Clinically proven treatments tailored to your individual needs"; "Trusted by over 20K+ Aussies who chose the program that works Paula, 54 Lost 9kgs 3 months Bianca, 34 Lost 13kgs 3 months"; "Calculate your BMI"; "Offer applies to specific eligible weight loss treatment programs only, and is subject to a minimum commitment period of 3 months".
- Rules: TGA-Rx "Referencing (linking to) third-party information" (a link to material promoting a prescription medicine, "viewed in the context of the references to treatment or consultations", makes the linking site's material advertising); TGA-HS ("links, discount codes or directions to book services ... can cause content to be considered advertising"); the destination also breaches Ahpra s133(1)(c) (testimonials) and Code s23(4)(c). The URL path itself reads "eligibility-check".
- Fix: ask Moshy for an affiliate landing URL that carries no medicine forms, outcome testimonials or BMI tool (or link to the Moshy homepage with the code, as Juniper's link does), and record the requirement in `partner-disclosures`. Until then this is a lawyer question (Q4), not something copy can fix.

**H7. REFERRAL120 is, by its stated terms, a discount on the prescription-treatment plan**
- `/moshy` lead and FAQ: "REFERRAL120 takes $120 off a new customer's first order on a practitioner-assigned Moshy weight-loss program." Bullet: "Excludes dietitian, over-the-counter and meal-replacement plans". Same text in `public/llms.txt` line 35.
- Moshy's own term on the landing page: "Offer applies to specific eligible weight loss treatment programs only".
- Pages carrying the code: `/moshy`, `/moshy-review`, `/moshy-vs-juniper`, `/moshy-vs-gp`, `/moshy-alternatives`, `/best-...`, `/cheapest-...`, `/weight-loss`, `/weight-loss-telehealth-cost-australia`, `/weight-loss-telehealth-men-australia`, `/weight-loss-telehealth-women-australia`, `/weight-loss-cost-calculator`, `/deals`, homepage, the guide email.
- Rules: TGA-HS discount-code rule; TGA-Adv ("offers, discounts" as a promotional characteristic). Listing the excluded non-prescription plans tells the reader, by elimination, that the discount applies only where a practitioner assigns treatment. Ahpra s133(1)(b) permits an inducement only with terms stated (the terms are stated on `/moshy`).
- Jarred kept the codes pending his lawyer on 30 Sep 2026. **Not recommending removal.** Interim wording that keeps the object of the discount accurate (ACL) without the elimination list: "applies to the Moshy weight programs its promotion terms list as eligible, one use per new customer, 3-month minimum commitment; read Moshy's promotion terms before you start." Lawyer question 1.

### MEDIUM

**M1. "Weight-management medicines are prescription-only in Australia" placed inside each brand's "how it works"**
- `/moshy` ("How Moshy works ... three stages. Weight-management medicines are prescription-only in Australia."), `/moshy-review` (same, after "Moshy arranges a consultation"), `/juniper` ("How does Juniper work? Three stages, all done remotely. Weight-management medicines are prescription-only in Australia."), `/best-...` (checklist "The practitioner decides. Weight-management medicines are prescription-only in Australia, and neither service promises a specific treatment in advance"), `/weight-loss` FAQ, `/cheapest-...` FAQ, `/weight-loss-telehealth-cost-australia`, `/weight-loss-telehealth-men-australia`, `/weight-loss-telehealth-women-australia` (twice).
- Rule: alone, a regulatory fact. Placed as step zero of a brand's sign-up flow, beside a discount CTA, its take-out is "this service is how you get that class of medicine": TGA-Rx Table 1 ("Reference to a class of prescription medicines, including indirectly") and TGA-HS. A disclaimer does not exempt (TGA-Rx). Accuracy (Code s8(1)(a), ACL s18): not every weight-management medicine is prescription-only; orlistat is Schedule 3 (pharmacist-only).
- Fix: remove it from brand "how it works" blocks, CTA blocks and checklists. Keep one service-only line in the page-foot disclaimer: "Any treatment is decided by a registered practitioner after an individual assessment." Lawyer question 3.

**M2. `/weight-loss-telehealth-women-australia`: "Is it safe to do weight loss treatment online in Australia?"**
- The answer ("Telehealth providers operate under Australian health service regulations ... The online format keeps the practitioner review in place") is a reassurance that the treatment route is safe.
- Rule: Code s9(1)(a); the July 2024 infringement notices included stating "that certain therapeutic goods were safe".
- Fix: retitle "How is online weight-management care regulated in Australia?" and answer about practitioner registration and screening only.

**M3. `/juniper`: Juniper's outcome slogan reproduced**
- "A 30-day money-back guarantee (“Love your weight loss in 30 days or your money back”)"
- Rule: Code s9(3)(d), s23(4); Ahpra s133(1)(d); TGA-Adv (responsible for copied material).
- Fix: "A 30-day money-back guarantee on the first order, on Juniper's own terms."

**M4. "Clinical pathway" and "the same pathway" as a stand-in for prescription treatment**
- `/moshy-alternatives`: "wrapping coaching, an app and a patient community around the clinical care"; "adds a coaching and community layer on top of the clinical pathway"; "A GP can assess you for the same kind of pathway in person"
- `/weight-loss-telehealth-men-australia` FAQ: "Any pathway that could involve prescription medicine requires individual assessment"
- `/weight-loss-quiz` and the `/weight-loss` matcher (`PathwayQuiz.tsx`): option "Clinically-led, practitioner-guided: A structured medical pathway"; results "Moshy runs the clinical pathway and is open to anyone eligible", "You want a clinically-led pathway done online, and Moshy runs that", "Moshy is the natural starting point"
- Guide email: "A GP can manage the same pathway in person"
- Rule: TGA-Rx ("offers consultations ... where the advertising implies that a prescription could or will result"). The contrast drawn is always clinical pathway vs coaching, which leaves prescription treatment as the only thing "clinical" can mean.
- Fix: "an online consultation with a registered practitioner, plus coaching and meal plans"; GP: "A GP can see you in person". Quiz option: "Practitioner-led: Regular consultations with a registered practitioner".

**M5. "Eligible" and "eligibility" surviving the 30 Sep sweep**
- `/best-...` checklist: "Eligibility. Each provider runs an online assessment and a practitioner reviews whether treatment is appropriate for you. Approval is assessed individually and is not guaranteed."
- Quiz results (4 places): "Moshy is open to anyone eligible"
- `/weight-loss-cost-calculator` FAQ: "approval is never guaranteed"
- `/weight-loss` guide list: "Tool: Moshy's questionnaire, explained"
- Rule: TGA-Rx (eligibility for a prescription medicine); the 30 Sep house rule.
- Fix: "Assessment. A registered practitioner reviews each applicant and some are declined."; "open to anyone a practitioner assesses as suitable"; drop the questionnaire tool from the list once H1 is retired.

**M6. Offer-change alerts and the weight-loss guide email are direct marketing of a discount on a prescription-treatment service**
- `/moshy-review`: "Not ready today? Get told when the Moshy offer changes. New customers can currently get $120 off with code REFERRAL120." `/best-...`: "Get told when a weight-loss offer changes".
- `/weight-loss-guide` email (`weight-loss-guide-email.ts`): carries REFERRAL120 and JARREDKFC, "A GP can manage the same pathway in person", "Results vary between people".
- Rule: TGA-Rx "Direct marketing campaigns" (mass emails "are unlikely to be exempt"). The email inherits H7.
- Fix: keep the codes pending advice; remove "the same pathway" and "Results vary between people" (implies results); make sure every email carries the full REFERRAL120 terms, including the 3-month minimum (Ahpra s133(1)(b)). Lawyer question 8.

**M7. `/moshy-alternatives`: "two realistic alternatives"**
- "There are two realistic alternatives"; "Moshy has few like-for-like twins"; FAQ "Why do so few alternatives exist? Because the model is hard to run properly."
- `/cheapest-...` on the same site names a third service (Doctors for Weight Loss), and the market has many more.
- Rule: ACL s18; Ahpra s133(1)(a).
- Fix: "Of the services we compare, Juniper is the closest like-for-like option; other online services exist, and your GP is a route too." Delete the "so few alternatives" FAQ.

**M8. "So you pay nothing to be assessed" (JARREDKFC)**
- `/moshy-vs-juniper`: "Juniper's is JARREDKFC, which waives the initial consultation Juniper values at $89, so you pay nothing to be assessed"
- Rule: Ahpra s133(1)(b) (allowed with terms; terms are partly stated) and s133(1)(e) (an inducement to an assessment whose purpose is deciding on prescription treatment).
- Fix: "JARREDKFC means no charge for the initial consultation, which Juniper values at $89; program fees apply." (the 30 Sep approved wording).

### LOW

- **L1.** `/moshy`, `/moshy-review`, comparison tables: Moshy's care team listed with "pharmacists" and "Unlimited medical support". Pharmacists in a telehealth care team implies dispensing. Fix: "a care team including doctors, nurses, dietitians, psychologists and exercise physiologists". Rule: TGA-Rx "facilitate the supply".
- **L2.** `/weight-loss`: "A service that promises a specific medicine before anyone has looked at your history is the kind to walk away from"; FAQ "Services that promise a specific medicine before anyone has assessed you are the ones to avoid"; `/best-...` "A service offering prescription-only medicines without a practitioner consultation is the red flag." Each implies the recommended services supply medicine after assessment. Fix: "A service that promises a particular treatment before a practitioner has assessed you is one to avoid."
- **L3.** Sitewide footer on 23 in-scope pages: "anything prescription-only is supplied in Australia only after an individual assessment by a registered practitioner". On a page with a telehealth discount CTA it reads as a supply statement, and TGA-Rx says disclaimers do not exempt. Fix: "Any treatment is decided by a registered practitioner after an individual assessment."
- **L4.** Juniper card on 5 pages: "Full refund if the practitioner decides it isn't right for you"; `/juniper`: "The price that applies to you is set in that consultation". Both tie the purchase to the practitioner's treatment decision. Fix: "Full refund if you do not proceed after the consultation (Juniper's terms)"; "Juniper confirms the plan price in the consultation" is acceptable, but drop "set".
- **L5.** `/juniper` FAQ: "trusted by 300,000 members worldwide". Attributed, not a testimonial, but social proof for a regulated health service (Ahpra s133(1)(a) substantiation). Fix: keep attribution or drop.
- **L6.** `/weight-loss-guide` landing: "Results vary between people". Implies results. Fix: delete.

### Weight-loss pages, no TGA findings beyond the cluster patterns
The `/moshy`, `/moshy-vs-juniper`, `/best-...` and `/weight-loss-telehealth-women-australia` leads are service-only and answer-first, and correctly state Moshy's all-inclusive fee without listing what is dispensed. No page names a medicine or uses an injection, pen or appetite reference; the homepage illustration for weight loss is a scale.

## 2. Women's health

No page in this section carries a commercial link today, and each says "nothing on this page earns us a commission". As information pages with no financial interest they read as access and disease education, which TGA-HS treats as non-promotional. The risk is **contingent**: these pages already state the facts that turn into advertising the day a telehealth partner is placed on them, and the launch checklist in memory (`womens-health-section.md`) adds partner links to exactly these pages.

**M9. UTI, contraception and menopause guides describe access to prescription-only classes (MEDIUM, contingent on partner launch)**
- `/womens-health/uti-treatment-without-a-gp-australia` FAQ: "A trained pharmacist assesses you and supplies prescription-only treatment only if it is appropriate"; "Through a telehealth doctor, the four national services whose UTI consult prices we could read charged between $29.99 and $59.90 ... with the treatment extra". This is close to the TGA's own non-compliant example ("Our pharmacists can assess and prescribe treatment for urinary tract infections, so you can get the antibiotics you need without visiting a GP").
- `/womens-health/contraception-without-a-gp-australia`: "Most online script services we read charge a private fee ... from $24.90 for an express script request to $90 for an after-hours consult, with the contraception itself extra"; cost table column "The contraception" with PBS prices. Hormonal contraceptives are a class of prescription medicines.
- `/womens-health/menopause-care-cost-australia`: "A program fee each month, with anything prescribed extra"; "Anything prescribed is paid for separately at the pharmacy on every model".
- Rule: TGA-Rx (class reference; "can provide prescriptions for ... a class"; price rule; UTI example), once a commercial nexus exists (TGA-Adv).
- Fix before any partner is added: describe consultation routes and consultation fees only. UTI: "A trained pharmacist can assess an uncomplicated UTI and refer you to a GP if the service does not cover you"; "telehealth consultation fees ran from $29.99 to $59.90". Contraception: "online consultation services" not "script services", and drop the "The contraception" price column (the PBS co-payment can stay as a general Medicare fact, unlinked to any provider). Menopause: drop "anything prescribed extra". Lawyer question 7.

The hub (`/womens-health`) itself has no finding. Its FAQ "Do you name specific medicines on these pages? No ..." is a regulatory statement.

## 3. Health and beauty

**M10. Two pages tell readers we earn nothing while carrying affiliate links (ACL, not TGA)**
- `/health-and-beauty/best-value-skincare-australia-cost-per-use` FAQ: "We have no skincare partner, so there is no brand we earn from and no list to steer you toward", on a page linking `/go/aussie-health-cost-per-use` and `/go/edible-beauty-cost-per-use`.
- `/health-and-beauty/skincare-quiz` FAQ: "Not currently. We have no skincare partner, so there is no brand we earn from and nothing to steer you toward", on a page linking `/go/edible-beauty-skincare-quiz`.
- Both also show "Health and beauty is still being built" although the section is live with five partners.
- Rule: ACL s18; ACCC affiliate-disclosure position. `check-earns-claim` matches "earns nothing" wording, so this phrasing gets past it.
- Fix: "We earn a commission from Edible Beauty and Aussie Health Products, linked below and disclosed beside each link. The method on this page is the same whichever you use." Add "no skincare partner" and "no brand we earn from" to the guard's patterns.

**L7. `/health-and-beauty/skincare-quiz`: anti-ageing goal routed to devices and "clinic treatments"**
- Option "Signs of ageing: Fine lines and firmness"; high-budget result (`SkincareQuiz.tsx`): "At this budget both at-home devices and clinic treatments are on the table ... clinic treatments are usually maintenance", linking `/foreo` and the LED mask page.
- Rule: "clinic treatments" for fine lines that need "maintenance" is the TGA's own cosmetic-injectables example (TGA-Rx: "smooth your fine lines and wrinkles"). Pairing the goal with a cosmetic device link also implies the device treats fine lines (Code s9(3)(d) if the device were therapeutic).
- Fix: "At this budget an at-home device is one option; compare its one-off price with anything you would pay for repeatedly." Drop "clinic treatments". Also: the breakouts result links `/health-and-beauty/acne-treatment-options-and-costs-australia`, which now 301s to the hub.

**L8. `/health-and-beauty/led-face-mask-comparison-australia`: treatment language for a cosmetic device sold through a Foreo link**
- "LED count and coverage. Both determine how much of your face is treated"; FAQ "a smaller treatment area". The linked Foreo UFO has no current ARTG entry; the page says so for Foreo.
- Rule: describing a device's purpose as treatment moves it toward a therapeutic claim (Code s20; Act s42DL(12) for unregistered devices).
- Fix: "how much of your face it covers"; "a smaller coverage area".

**L9. Prescription "route" for skin on pages with retail affiliate links**
- `/health-and-beauty` FAQ: "Stronger topical treatments and oral medicines used for skin conditions are prescription-only in Australia, which means they are supplied only after an individual assessment"; cost-per-use: "the number to compare against a practitioner consult if you are weighing the prescription route".
- Rule: class reference (TGA-Rx). Low because no prescription-skin partner is linked on these pages, but Moshy and Mosh both sell skin services.
- Fix: "Some skin conditions need a practitioner's assessment, and a practitioner decides whether any treatment is appropriate"; "compare it against the cost of a consultation".

**No finding:**
- `/optislim`: no weight-loss claims; it quotes the FSANZ supervision rule. VLED is a food (Standard 2.9.5), outside the TGA Code. See lawyer question 9 on sale restrictions.
- `/foreo` and `/health-and-beauty/foreo-luna-vs-ufo`: state the cancelled ARTG entry 288695 and make no outcome claims.
- `/edible-beauty`: product names only (e.g. "Exotic Goddess Ageless Serum", "Basking Beauty Natural Sunscreen SPF50") with prices; under s14(e), a name, price and point of sale with no therapeutic claim is outside Part 4.
- `/aussie-health-products` and `/health-and-beauty/natural-skincare-australia`: no claims.

## 4. Sleep

The clinical pages carry no commercial link, and Emma is kept off them by the `denyRoutes` guard. They are disease education: they discourage self-diagnosis, explain the GP-referral-study pathway and say no product treats a sleep disorder.

**L10. CPAP device named with price and a cheaper point of sale, on the hub that carries an affiliate link**
- `/sleep` FAQ and `/sleep/cpap-machine-costs-australia`: "The ResMed AirSense 11 AutoSet listed at AUD $1,699 on ResMed's own Australian store and AUD $1,425 at retailer CPAP Online Australia ... a difference of $274".
- Rule: name, price and point of sale are promotional characteristics (TGA-Adv). If the hub (which links Emma) were read as a device advertisement, Code s20(1) would require the accepted intended purpose and "ALWAYS FOLLOW THE DIRECTIONS FOR USE". s14(e) exempts name/price/point-of-sale-only content that makes no therapeutic claim, and we have no financial interest in ResMed or the retailer, so the risk is low.
- Fix: none needed on the CPAP page. Optionally drop the device and retailer names from the `/sleep` hub FAQ (the hub carries the Emma link) and keep them on the unlinked CPAP page.

**No finding:** `/sleep/do-i-have-sleep-apnoea` ("Reasons not to put it off" is disease education about driving risk with no product attached), `/sleep/home-sleep-test-australia-cost`, `/sleep/sleep-tracker-comparison-australia` (tells readers to check the ARTG for any tracker claiming to detect a condition), `/sleep/mattress-comparison-australia`, `/sleep/how-much-does-good-sleep-cost`, `/emma-sleep` ("A mattress is not a treatment for any sleep disorder").

## 5. Longevity, diagnostics and recovery

**No findings.** Read in full or scanned in context: `/longevity`, `/technogym`, `/i-screen`, `/longevity/diagnostics`, `/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia`, `/longevity/diagnostics/whole-body-mri-australia-cost`, `/longevity/diagnostics/biological-age-testing-australia`, `/longevity/diagnostics/cgm-for-non-diabetics-australia`, `/longevity/diagnostics/health-screening-quiz`, `/longevity/supplements/longevity-supplements-evidence-review`, `/longevity/recovery` and its six pages.
- **Restricted representations (Code s28):** no page claims any service detects cancer or disease. The MRI page quotes RANZCR: "does not recommend performing whole body MRI screening in asymptomatic patients". i-screen: "Nothing here is ... a claim that any test prevents disease, detects illness early or extends life."
- **i-screen inducement:** the code's object is stated ("first test", "not an ongoing saving, not a discount on a consultation"), so the terms limb of Ahpra s133(1)(b) is met. Named markers (HbA1c, full blood count) are catalogue items with prices, not claims.
- **CGM page:** CGMs are named as an ARTG device class with no product, price or link, and with the statement that they are not the diagnostic test for diabetes.
- **Recovery:** no health claims; carries cardiovascular safety warnings; no commercial links.
- **Supplements:** names no product, by design.

## 6. /deals and the homepage

**M11. Homepage Moshy pick: "open to anyone eligible, with the plan set by a practitioner"**
- "This month's top picks": "Moshy · $120 off with code REFERRAL120 · Clinically-led weight-management telehealth, open to anyone eligible, with the plan set by a practitioner."
- Rule: TGA-Rx (eligibility; a consultation that implies a prescription will result); H7 for the code. It is the most prominent health placement on the site.
- Fix: "Weight-management telehealth: an online consultation with a registered practitioner, plus coaching and meal plans. $120 off a first order with REFERRAL120 (3-month minimum)."

**M12. Homepage hair-loss card identifies the two treatment classes**
- Category card: "55% off at Mosh · Clinical telehealth versus topical products, and which suits which stage"; offer chip "Hair loss 55% off".
- Rule: the 28 Sep hair-loss rewrite recorded that contrasting a prescription route with an OTC topical for male pattern loss identifies both medicines without naming them (TGA-Rx indirect reference). The homepage card was not part of that rewrite.
- Fix: "55% off at Mosh · Hair-loss telehealth and your GP compared, on cost and how each works."

**M13. Discount rows and Offer schema omit Moshy's 3-month minimum**
- `/deals` rows: "Moshy · Weight loss · $120 off your first order · REFERRAL120"; "Mosh · Hair loss · 55% off your first order · REFERAL55". Homepage chips: "Weight loss $120 off", "Hair loss 55% off".
- `Offer` JSON-LD for REFERRAL120 on 11 pages (`/moshy`, `/moshy-review`, `/moshy-vs-juniper`, `/moshy-vs-gp`, `/moshy-alternatives`, `/best-...`, `/cheapest-...`, `/weight-loss`, `/weight-loss-telehealth-women-australia`, `/deals`): "$120 off on a new customer's first order ... New customers only. One use per customer." No 3-month minimum. This is the text search and answer engines lift.
- `/moshy-review` and `/moshy` meta descriptions: "$120 off a first order" without the minimum.
- Rules: Ahpra s133(1)(b) (an inducement for a regulated health service must state its terms in the advertisement); ACL s29(1)(i) (the minimum commitment is part of the price); TGA-HS discount-code rule for the row itself (H7).
- Fix (keeping the codes): add "3-month minimum" to the deals row, the homepage chip, every REFERRAL120 Offer `description`, and the meta descriptions. Check whether REFERAL55 has terms that need the same treatment.

## Page-by-page table

Risk is the highest severity on the page. Count is findings that quote that page (cluster findings count once per page).

| URL | Risk | Findings | Action |
|---|---|---|---|
| `/` (homepage health cards) | MEDIUM | 4 (M11, M12, M13, H7) | rewrite cards and chips |
| `/weight-loss` | HIGH | 7 (H6, H7, M1, M4, M5, L2, L3) | rewrite |
| `/weight-loss-guide` (noindex) and its email | MEDIUM | 3 (H7, M6, L6) | rewrite email |
| `/moshy` | HIGH | 6 (H6, H7, M1, M13, L1, L3) | rewrite |
| `/moshy-review` | HIGH | 6 (H6, H7, M1, M6, M13, L1) | rewrite |
| `/juniper` | MEDIUM | 5 (M1, M3, L4, L5, L3) | rewrite |
| `/moshy-vs-juniper` | HIGH | 5 (H6, H7, M8, M13, L4) | rewrite |
| `/moshy-vs-gp` | HIGH | 4 (H2, H6, H7, M13) | rewrite (heavy) |
| `/moshy-alternatives` | HIGH | 5 (H6, H7, M4, M7, M13) | rewrite |
| `/moshy-eligibility` | HIGH | 3 (H1, H6, H7) | **retire, 301 to `/moshy-review`** |
| `/best-weight-loss-telehealth-australia` | HIGH | 7 (H6, H7, M1, M5, M6, L2, L4) | rewrite |
| `/cheapest-weight-loss-telehealth-australia` | HIGH | 5 (H4, H6, H7, M1, M13) | rewrite |
| `/weight-loss-telehealth-cost-australia` | HIGH | 4 (H3, H6, H7, M1) | rewrite (heavy) |
| `/weight-loss-telehealth-men-australia` | HIGH | 4 (H6, H7, M1, M4) | rewrite |
| `/weight-loss-telehealth-women-australia` | HIGH | 5 (H6, H7, M1, M2, L4) | rewrite |
| `/weight-loss-quiz` | MEDIUM | 2 (M4, M5) | rewrite result copy |
| `/weight-loss-cost-calculator` | HIGH | 4 (H5, H6, H7, M5) | rewrite |
| `/womens-health` | none | 0 | keep |
| `/womens-health/uti-treatment-without-a-gp-australia` | MEDIUM (contingent) | 1 (M9) | rewrite before any partner is added |
| `/womens-health/contraception-without-a-gp-australia` | MEDIUM (contingent) | 1 (M9) | rewrite before any partner is added |
| `/womens-health/menopause-care-cost-australia` | MEDIUM (contingent) | 1 (M9) | rewrite before any partner is added |
| `/health-and-beauty` | LOW | 1 (L9) | light edit |
| `/optislim` | none | 0 | keep (lawyer Q9) |
| `/foreo` | none | 0 | keep |
| `/edible-beauty` | none | 0 | keep |
| `/aussie-health-products` | none | 0 | keep |
| `/health-and-beauty/led-face-mask-comparison-australia` | LOW | 1 (L8) | light edit |
| `/health-and-beauty/best-value-skincare-australia-cost-per-use` | MEDIUM | 2 (M10, L9) | rewrite FAQ |
| `/health-and-beauty/foreo-luna-vs-ufo` | none | 0 | keep |
| `/health-and-beauty/natural-skincare-australia` | none | 0 | keep |
| `/health-and-beauty/skincare-quiz` | MEDIUM | 2 (M10, L7) | rewrite FAQ and one result |
| `/sleep` | LOW | 1 (L10) | optional edit |
| `/emma-sleep` | none | 0 | keep |
| `/sleep/do-i-have-sleep-apnoea` | none | 0 | keep |
| `/sleep/home-sleep-test-australia-cost` | none | 0 | keep |
| `/sleep/cpap-machine-costs-australia` | LOW | 1 (L10) | keep |
| `/sleep/mattress-comparison-australia` | none | 0 | keep |
| `/sleep/sleep-tracker-comparison-australia` | none | 0 | keep |
| `/sleep/how-much-does-good-sleep-cost` | none | 0 | keep |
| `/longevity` | none | 0 | keep |
| `/technogym` | none | 0 | keep |
| `/i-screen` | none | 0 | keep |
| `/longevity/diagnostics` | none | 0 | keep |
| `/longevity/diagnostics/whole-body-mri-australia-cost` | none | 0 | keep |
| `/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia` | none | 0 | keep |
| `/longevity/diagnostics/biological-age-testing-australia` | none | 0 | keep |
| `/longevity/diagnostics/cgm-for-non-diabetics-australia` | none | 0 | keep |
| `/longevity/diagnostics/health-screening-quiz` | none | 0 | keep |
| `/longevity/supplements/longevity-supplements-evidence-review` | none | 0 | keep |
| `/longevity/recovery` + 6 recovery pages | none | 0 | keep |
| `/deals` | MEDIUM | 2 (H7, M13) | add terms to rows |

## Questions only a lawyer can answer

1. **Discount codes on a prescription-treatment service.** REFERRAL120 applies, on Moshy's own terms, only to "specific eligible weight loss treatment programs" and excludes dietitian, over-the-counter and meal-replacement plans. REFERAL55 (Mosh hair loss) and JARREDKFC (Juniper consultation) are similar. Is a disclosed affiliate page that names no medicine, but carries a code whose only object is the prescription-treatment plan, advertising that medicine under TGA-HS ("links, discount codes ... can cause content to be considered advertising")? Does it matter that JARREDKFC discounts only the consultation?
2. **Describing an all-inclusive fee.** Moshy says its fee includes "medical treatment and delivery". If we say so, we arguably describe supply of an S4 medicine (TGA price rule). If we leave it out, the fee description could mislead by omission (ACL s18). What wording satisfies both, and can we lawfully compare telehealth program fees at all (`/cheapest`, `/weight-loss-telehealth-cost-australia`, the calculator) when they bundle S4 supply? Code Part 9 price lists are confined to registered goods and particular sellers.
3. **The class statement.** Is "Weight-management medicines are prescription-only in Australia" a permissible factual statement, or a reference to a class of prescription medicines when it sits inside a brand's "how it works" beside a discount CTA? Is it inaccurate given orlistat is Schedule 3?
4. **Liability for the partner's landing page.** Our Moshy link lands on a page showing "tablet or injectable form", "Clinically proven treatments", weight-loss testimonials and a BMI calculator. Under TGA-Rx's linking rule and the "causes the advertising" test, are we exposed for that content? Can we contractually require Moshy, Mosh and Juniper to give us a compliant landing URL, and is it enough to link to their homepage instead?
5. **Who the advertiser is.** Advert Digital Pty Ltd, an advertising business, received the largest of the July 2024 infringement notices. Does the 18 June 2026 guidance change the position of an affiliate publisher with no control over the supplier's content, and does disclosure, information-only framing or a commission-only relationship make any difference?
6. **Ahpra s133.** Do our pages "advertise a regulated health service" within s133? If so, is a code shown on `/deals` or the homepage with its terms one click away "stated in the advertisement" for s133(1)(b)? Is "so you pay nothing to be assessed" an inducement that encourages unnecessary use under s133(1)(e)?
7. **Women's health at partner launch.** Once a telehealth partner is linked, do the UTI, contraception and menopause access guides (pharmacist supply of "prescription-only treatment", PBS prices for "the contraception", "script request" prices, "anything prescribed extra") become advertising of antibiotics, hormonal contraceptives and menopause medicines? The UTI page is close to the TGA's own non-compliant pharmacy example.
8. **Email.** Are the weight-loss guide email and the "tell me when the Moshy offer changes" alerts "direct marketing" under TGA-Rx, and does sending a code by email change the analysis in question 1?
9. **OptiSlim VLED.** FSANZ classes VLEDs as food for special medical purposes under Standard 2.9.5. Does that Standard restrict the retail sale or promotion of FSMP to consumers, and does a commission link to OptiSlim's VLCD collection page create exposure for us?
10. **Devices on the sleep hub.** Does naming a CPAP device with prices and a cheaper retailer, on a page that carries an unrelated (Emma) affiliate link, make that content a device advertisement requiring Code s20 statements?
11. **Code amendment.** F2026L01329 (labelling consequential amendments) commenced 30 September 2026. Confirm that the section numbers cited here (s8, s9, s14, s20, s23, s24, s28) still apply.

## Method notes
- Rendered text was read for all 57 pages; nothing was inferred from page files alone. Juniper's own site returned a WAF block to automated fetching, so Juniper's landing page was **not** checked for the H6 issue. Check it in a browser.
- No `meta keywords` are emitted on these pages, so the `seo.ts` keyword arrays were not a live surface.
- This audit made no edits, commits or deploys.
