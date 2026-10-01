# TGA / Ahpra / ACL audit: hair-loss, men's health, Midoc, quizzes

Audit date: 1 October 2026. Read-only: nothing was edited, committed or deployed.

## Method

- Every in-scope URL was fetched live from referlabs.com.au with a Chrome user-agent (20 pages, all HTTP 200). The audit read the rendered `<main>` text, `<title>`, meta and OG descriptions, every JSON-LD block (FAQPage, Article, WebPage, Offer, ItemList), alt text, outbound link targets and anchor text, `data-cta` values and `/go/` slugs. The sticky "Claim offer" bar outside `<main>` was read separately.
- The two quizzes render their results client-side, so their result copy was read from source (`src/app/hair-loss-quiz/HairLossQuiz.tsx`, `src/components/consumer/MensHealthQuiz.tsx`). Their static text and FAQ JSON-LD were read from the live HTML.
- The Mosh and Midoc destinations our links open were fetched as well, because TGA guidance treats linking to third-party material that promotes a prescription medicine as a risk for the linking page. The audited Mosh destination is `getmosh.com.au/start/referlabs`; for Midoc it is the homepage the `/go/midoc-*` slugs redirect to.
- Each hit was read in context. Negations, our own disclaimers, and factual regulatory statements made without a causal link to a CTA are not reported as findings.
- `public/llms.txt` (live) was checked for the hair and men's-health entries, because it is a published surface that AI engines read.

### Rule texts relied on (fetched 1 Oct 2026)

| Source | Text relied on |
|---|---|
| Therapeutic Goods Act 1989 ss 42DL(10), 42DLB(7) | Advertising Schedule 3, 4 or 8 substances to the public is prohibited. The criminal offence is in 42DL(10) and the civil penalty in 42DLB(7). |
| TGA, *Advertising health services that involve therapeutic goods* (last updated 18 Jun 2026) | Advertising includes content that "refers to specific therapeutic goods, or a class of goods ... [or] represents to potential patients that they could obtain a prescription for the goods ... or be treated with those goods through the health service." Also: "Promoting a telehealth service as a way to obtain particular prescription medicines or a class of prescription medicines is likely to constitute prohibited advertising." And: "Tags, links, discount codes or directions to book services involving therapeutic goods can cause content to be considered advertising of the goods." Also: "Content that implies the effect of the prescription medicines (for example, before and after images or treatment progress) is likely to be prohibited." Also: "Disease education becomes advertising when it ... encourages consumers to obtain a prescription for a particular medicine." The guidance's example of what is permitted: "'Call our clinic for a consultation to discuss treatment options for migraine', does not refer to therapeutic goods." |
| TGA, *Complying with the restrictions on advertising prescription medicines to the public* (23 Jun 2026) | Content is advertising if it "offers consultations for specific medicines, whether directly or indirectly, where the advertising implies that a prescription could or will result from the consultation". It lists "erectile dysfunction medicines" among the common examples, and gives the worked example of a "wellness centre ... 'hair-loss treatment services' ... finasteride". The *Referencing (linking to) third-party information* section says links to third-party material that promotes a prescription medicine "may risk the business's material being considered an advertisement". On catalogues: "listing prices for treatments or services that involve, or reference, prescription medicines ... is likely to amount to advertising". It also says: "Including a disclaimer ... such as advising the consumer to 'speak with a health practitioner' ... does not exempt the material." |
| Therapeutic Goods Advertising Code 2021 | s 8 accuracy; s 11 scientific or clinical representations; s 24 testimonials; s 26 incentives; s 28 restricted representations; Part 9 (ss 30-36) price information. |
| Health Practitioner Regulation National Law s 133(1), and Ahpra *Guidelines for advertising a regulated health service* | s 133(1) opens "A person must not advertise a regulated health service ... in a way that", then: (a) is misleading; (b) "offers a gift, discount or other inducement ... unless the advertisement also states the terms and conditions"; (c) uses testimonials; (d) "creates an unreasonable expectation of beneficial treatment"; (e) "directly or indirectly encourages the indiscriminate or unnecessary use". Guideline 4.5 names "'don't delay', 'act now before it's too late' ... create a sense of urgency". Guideline 3.2: "Anyone ... who advertises a regulated health service, is considered an advertiser." Guideline 4.2: terms and conditions "should be easily found ... The public should not be required to exhaustively search." |
| Competition and Consumer Act 2010 Sch 2 (ACL) | s 18 misleading or deceptive conduct; s 29(1) false or misleading representations. |

## What is already clean (verified on the rendered pages)

- **No medicine named on any of the 20 pages.** A word-boundary scan for finasteride, minoxidil, dutasteride, sildenafil, tadalafil, vardenafil, dapoxetine, Viagra, Cialis, Propecia, Regaine and DHT found zero hits. The four hits it did return were "Mental Health Treatment Plan" and Medicare "eligible", which are false positives.
- **No testimonials, star ratings or customer counts on our own pages.** No "regrow" or "clinically proven" either. No "Check eligibility" buttons, no "prescribed and delivered", no "treatment plan" sold as a product.
- **No over-the-counter (S2/S3) medicine is named**, so no mandatory statements are triggered.
- **No comparative claim that a partner is better or safer.** The comparisons send readers to the GP for sudden or patchy loss, women, cost and Medicare.
- **The men's health quiz is clean.** It asks four non-health questions, and its results point at cost guides, not at a provider.

## Page-by-page summary

| URL | Risk | Findings | Action |
|---|---|---|---|
| /receding-hairline-treatment-australia | HIGH | 6 (H1, H3, H7, M3, M4, M5) | Rewrite |
| /how-to-stop-hair-loss-australia | HIGH | 6 (H1, H4, H7, M3, M6, M7) | **Retire** (301 to /hair-loss) |
| /online-hair-loss-treatment-australia | HIGH | 6 (H1, H5, H7, M3, M8, M9) | **Retire** (301 to /hair-loss) |
| /early-signs-of-hair-loss-australia | HIGH | 4 (H1, H6, H7, M3) | Rewrite |
| /hair-loss-quiz | HIGH | 3 (H1, H2, L6) | Rewrite (one FAQ answer) |
| /hair-loss | MEDIUM | 5 (H1, H7, M1, M10, L5) | Rewrite |
| /best-hair-loss-treatment-australia | MEDIUM | 5 (H1, H7, M2, M11, M16) | Rewrite |
| /hair-loss-treatment-cost-australia | MEDIUM | 5 (H1, H7, M10, M11, L4) | Rewrite |
| /moshhair | MEDIUM | 4 (H1, H7, M16, L1) | Keep; add T&Cs link, fix H1 at source |
| /mosh-review | MEDIUM | 4 (H1, H7, M16, L1) | Keep; add T&Cs link, fix H1 at source |
| /midoc | MEDIUM | 2 (M12, L7) | Rewrite one paragraph |
| /mens-health/online-prescription-australia | MEDIUM | 1 (M13) | Rewrite and move out of /mens-health |
| /mens-health/premature-ejaculation-treatment-options-australia | MEDIUM | 1 (M14) | Rewrite (one table column) |
| /mens-health/erectile-dysfunction-treatment-cost-australia | MEDIUM | 2 (M15, L2) | Keep unmonetised; lawyer gate before any ED partner link |
| /mens-health | LOW | 2 (L3, L5) | Keep |
| /mens-health/mens-health-quiz | LOW | 1 (M12, the partner blurb only) | Keep; trim the blurb |
| /mens-health/online-mens-health-clinics-compared | LOW | 0 | Keep |
| /mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health | LOW | 0 | Keep |
| /mens-health/online-doctor-medical-certificate-australia | LOW | 0 | Keep |
| /mens-health/sexual-wellness-products | LOW | 0 | Keep |

Severity counts (unique findings): **HIGH 7, MEDIUM 16, LOW 7.**

---

## HIGH findings

### H1. Every Mosh link opens a page co-branded "Mosh and Refer Labs Have Partnered Up" that shows medication timelines and patient before-and-after results
**Where:** every Mosh CTA on /hair-loss, /receding-hairline-treatment-australia, /how-to-stop-hair-loss-australia, /early-signs-of-hair-loss-australia, /online-hair-loss-treatment-australia, /best-hair-loss-treatment-australia, /hair-loss-treatment-cost-australia, /moshhair, /mosh-review and the /hair-loss-quiz Mosh result. All of them link to `https://www.getmosh.com.au/start/referlabs`, and the "Claim offer" sticky bar uses the same link.

**Quotes from the destination (read 1 Oct 2026):**
- "Mosh and Refer Labs Have Partnered Up"
- "Trusted by over 60,000 customers" and "Clinically proven treatments"
- "0 to 3 months, Reset phase: Medication should start working; new growth may not be visible at this stage" … "6 to 9+ months, Regrowth phase: Experience noticeable hair growth and fuller coverage"
- "Meet Ben, he chose Mosh for his hair loss, and he reaped the benefits … (Ben's pictures are at 0, 6 months, and 12 months of treatment)"
- "Real people, real results … Brayden, 31, QLD. Stage: Receding. Treatment type: Daily tablet and spray. Results shown: 4 months"

**Rules:** TGA prescription-medicines guidance, *Referencing (linking to) third-party information*; health-service guidance on before-and-after and treatment-progress content, and on links and discount codes. Act ss 42DL(10) and 42DLB(7). National Law s 133(1)(c) (testimonials) and (d) (unreasonable expectation). Ahpra guideline 3.2: Refer Labs is named on the page as a partner, so it is arguably an advertiser of the page and not just a linker. "Daily tablet and spray" maps directly onto the oral and topical treatments for male pattern hair loss. Every safeguard on our own pages is undone one click later, on a page that carries our name.

**Severity:** HIGH. This is the largest single exposure in the audit.

**Fix:** Ask Mosh to replace `/start/referlabs` with a page limited to the service: no medication timeline, no "Real people, real results", no treatment type, no "Clinically proven", no customer counts. Alternatively, ask Mosh to remove the "Refer Labs" co-branding. Until that is done, the lawyer should decide whether we repoint the links to a neutral Mosh URL that still applies REFERAL55. Changing the link target does not touch the code.

### H2. The hair-loss quiz FAQ frames the assessment as the way to get a hair-loss medicine
**URL:** /hair-loss-quiz (visible FAQ and FAQPage JSON-LD)
**Quote:** "Hair-loss medicines are prescription-only in Australia, so only an assessment, online or with a GP, can lead to one."
**Rule:** TGA prescription guidance: content that "offers consultations ... where the advertising implies that a prescription could or will result from the consultation". TGA health-service guidance on telehealth: "a way to obtain ... a class of prescription medicines". The quiz's online result is a Mosh link.
**Severity:** HIGH
**Fix:** "Telehealth is an assessment by a registered practitioner, who decides whether any treatment is appropriate; an over-the-counter product is cosmetic and involves no assessment. Neither route guarantees a result."

### H3. Receding-hairline page claims efficacy for the prescription class by comparison
**URL:** /receding-hairline-treatment-australia
**Quote:** "Hair-loss medicines are prescription-only in Australia, so whether any treatment suits a receding hairline is decided by a registered practitioner after an assessment. Refer Labs does not name or compare medicines. Most shampoos, supplements and devices lack comparable evidence for stopping the underlying process, whatever they do for appearance." The FAQ (and its JSON-LD) adds: "Most shampoos and supplements lack evidence for stopping the underlying process."
**Rule:** "Comparable" can only mean comparable to the prescription medicines named in the sentence before. The passage therefore states that the prescription class stops the underlying process. That is an implied efficacy claim for an S4 class beside a Mosh CTA: TGA class reference (Act s 42DL(10)) and s 133(1)(d). This is the pattern the 28 Sep rewrite meant to remove ("act on the underlying cause").
**Severity:** HIGH
**Fix:** "Shampoos, supplements and devices sold for hair loss are mostly cosmetic: they change how hair looks, not why it is falling out." Delete "comparable" and every "stopping the underlying process" construction.

### H4. How-to-stop page says the assessment, unlike other products, halts the process
**URL:** /how-to-stop-hair-loss-australia
**Quotes:**
- "Caffeine shampoos, most supplements, and low-cost devices ... there is little evidence that they stop male pattern loss. That does not make them scams, but it does make them a poor substitute if halting the process is the goal."
- FAQ and JSON-LD: "they are not a substitute for an assessment if halting the underlying process is your goal."
- FAQ and JSON-LD: "A registered practitioner decides whether any treatment suits you, and hair-loss medicines are prescription-only in Australia. Most shampoos, supplements and devices have little evidence for stopping the process itself."
- H2: "What tends not to move the needle", which implies something else does.

**Rule:** "A substitute for an assessment if halting the process is your goal" tells the reader that the assessment, and so the prescription it leads to, halts hair loss. That is an efficacy claim for the S4 class, and it promotes the consultation as the means to obtain it. TGA prescription guidance (consultations implying a prescription); disease-education guidance; s 133(1)(d).
**Severity:** HIGH
**Fix:** Retire the page (see M6). If it is kept, delete every "halting/stopping the process" sentence and the "move the needle" H2.

### H5. Online-treatment page promotes telehealth as the way to get prescription hair-loss treatment
**URL:** /online-hair-loss-treatment-australia (FAQ and JSON-LD)
**Quote:** "Can I get prescription hair-loss treatment online without seeing anyone? No. Prescription treatment requires a registered practitioner to assess you first, even through telehealth. The review can happen online, but it has to be a real assessment. No compliant service can supply it before that."
**Rule:** The question names the class ("prescription hair-loss treatment"), and the answer tells the reader that it can be obtained online after a review, two clicks from "Continue to Mosh". TGA health-service guidance on telehealth ("a way to obtain ... a class of prescription medicines"); TGA prescription guidance, *Promoting prescribing services*.
**Severity:** HIGH
**Fix:** Retire the page (301 to /hair-loss). The page exists to rank for "online hair loss treatment", which in substance is a query about getting the prescription class online. The telehealth explanation it carries already appears on /hair-loss and /best-hair-loss-treatment-australia.

### H6. Early-signs page uses urgency linked to a service CTA
**URL:** /early-signs-of-hair-loss-australia (llms.txt repeats "when to act")
**Quotes:**
- "The sooner you recognise the pattern the more options you have, since holding onto hair is easier than recovering it." (lead paragraph)
- H2 "When to act, and where to start": "Because male pattern hair loss is progressive, acting earlier generally leaves more to work with."
- FAQ: "it is worth getting assessed rather than waiting."
- FAQ title: "Can early hair loss be slowed if I catch it?"

**Rule:** National Law s 133(1)(e) and Ahpra guideline 4.5 (a sense of urgency linked to a person's health suffering if they do not use the service). "Holding onto hair is easier than recovering it" and "slowed if I catch it" also imply efficacy for the treatment the assessment leads to (s 133(1)(d)). The 30 Sep rules ban "act early" urgency.
**Severity:** HIGH
**Fix:**
- Lead: "Two places show it first: the temples and the crown ... shedding roughly 50 to 100 hairs a day is normal. If the signs add up, a GP or a registered practitioner online can confirm the cause."
- Rename the H2 to "Where to get it checked" and delete "acting earlier generally leaves more to work with".
- Rename the FAQ to "What should I do if I notice early signs?", answered with the assessment routes only.
- In llms.txt, change "and when to act" to "and where to get it checked".

### H7. REFERAL55 (55% off) is a discount on a first order that includes a prescription medicine
**Where:** /moshhair (title "Mosh Discount Code 2026: 55% Off First Order", H1, offer table), /mosh-review, /hair-loss (including an `Offer` JSON-LD "Mosh discount code REFERAL55"), /best, /cost, the four guides, and the "Claim offer" sticky bar on the hair pages.
**Quote:** "55% off your first order with the code REFERAL55 through our link; you see the plan and price before you commit."
**Rule:**
- TGA health-service guidance: "links, discount codes ... can cause content to be considered advertising of the goods".
- TGA prescription guidance on price information for treatments involving prescription medicines.
- Code s 26 (incentives) and Part 9 (price information), if the content is an advertisement for the goods.
- National Law s 133(1)(b) (inducement) and s 133(1)(e) (incentives encouraging use regardless of clinical need).
- The "first order" is the first shipment of a program that, per Mosh's own landing page, is a "Daily tablet and spray". Nowhere do our pages state what the 55% applies to. CLAUDE.md requires that the object of a discount be stated.

**Severity:** HIGH (legal risk). **Not a recommendation to remove the code**: Jarred has kept the codes pending his lawyer (30 Sep 2026).
**Risk, described:** the code is the strongest signal that a page promotes supply and not just information. Combined with H1, a regulator could read the page as "55% off a prescription hair-loss product". The mitigating facts: the discount is on the first order of a practitioner-decided program, the page never names the product, and a practitioner can decline. The lawyer has to decide whether that is enough.

---

## MEDIUM findings

### M1. Hub links the medicine class to the paid route with "so"
**URL:** /hair-loss (lead paragraph and FAQ JSON-LD)
**Quote:** "Hair-loss medicines are prescription-only in Australia, so the first two are the ways to be assessed."
**Rule:** TGA health-service guidance. On its own the regulatory statement is fine. Joined by "so" to the Mosh route, it reads as "this is how you get the medicine".
**Fix:** "Your GP and an online consultation are the two ways to be assessed; over-the-counter products need no consult." Move "Hair-loss medicines are prescription-only in Australia" to the footer disclaimer, away from the CTA.

### M2. Best-treatment page uses the same causal framing twice
**URL:** /best-hair-loss-treatment-australia (lead paragraph, H2 answer, FAQ JSON-LD)
**Quotes:**
- "Hair-loss medicines are prescription-only in Australia, so the real choice is who assesses you: an online service such as Mosh, or your GP."
- "Because hair-loss medicines are prescription-only in Australia, an online service arranges a consultation with a registered practitioner"

**Rule:** as M1.
**Fix:** "The practical choice is who assesses you: an online service such as Mosh, or your GP. A registered practitioner decides whether any treatment is appropriate." and "An online service arranges a consultation with a registered practitioner: a questionnaire and photos, sometimes followed by a call."

### M3. The disclaimer box names the class directly above the Mosh CTA
**URLs:** /receding-hairline-treatment-australia, /how-to-stop-hair-loss-australia, /early-signs-of-hair-loss-australia, /online-hair-loss-treatment-australia
**Quote:** "Prescription hair-loss treatment in Australia is supplied only after an individual assessment by a registered practitioner who decides suitability. This page contains a disclosed affiliate link to Mosh." The box is followed immediately by: "Want a practitioner to assess your options? Mosh runs a men's hair-loss assessment online ... 55% off your first order".
**Rule:** "Prescription hair-loss treatment" is a class reference of the same kind as "weight-loss injections" (TGA Table 1, "Reference to a class of prescription medicines ... using substitute terms"). Followed by "Mosh runs a ... assessment" and a discount, it reads as how to get that class. TGA says disclaimers do not exempt the material.
**Fix:** "Information only. Nothing here is medical advice. Any treatment is decided by a registered practitioner after an individual assessment. This page contains a disclosed affiliate link to Mosh."

### M4. "Slow further loss and protect what you have" is an outcome claim
**URL:** /receding-hairline-treatment-australia (FAQ and JSON-LD). The same idea appears on /how-to-stop: "for many men the realistic aim is slowing further loss rather than reversing it".
**Quote:** "It is more realistic to slow further loss and protect what you have than to fully reverse a receded hairline."
**Rule:** s 133(1)(d), and an implied effect of the prescription class (TGA guidance on content implying the effect of prescription medicines).
**Fix:** "A practitioner can explain what is realistic for you after an assessment; no treatment guarantees an outcome."

### M5. Receding page title promises "What Helps" and adds a fear line
**URL:** /receding-hairline-treatment-australia
**Quotes:** title and OG "Receding Hairline Treatment Australia 2026: What Helps"; H1 "Receding hairline treatment in Australia: what helps"; body "why it tends to progress if left alone".
**Rule:** s 133(1)(d), and (e) for the "if left alone" fear appeal. "What helps", on a page whose only CTA is a prescribing service, points at the medicine.
**Fix:** Title "Receding Hairline in Australia 2026: Causes and Getting Assessed". H1 "Receding hairline in Australia: causes and how to get it assessed". Delete "and why it tends to progress if left alone". Keep the slug: the TGA migraine example permits naming the condition and that the service discusses treatment options.

### M6. How-to-stop page exists to answer an efficacy query
**URL:** /how-to-stop-hair-loss-australia
**Quotes:** title "How to Stop Hair Loss (Australia 2026): What Helps"; H1 "How to stop hair loss: what helps"; FAQ "What is the most effective way to stop male pattern baldness?"; "for many men the realistic aim is slowing further loss" (twice).
**Rule:** TGA disease-education guidance (content "becomes advertising when it ... encourages consumers to obtain a prescription"), and s 133(1)(d). The honest answer to "how to stop hair loss" in Australia is a prescription medicine, so the page cannot answer its own title without identifying the medicine. Stripping the efficacy language leaves a duplicate of /early-signs and /hair-loss.
**Fix:** **Retire: 301 to /hair-loss.** Remove it from sitemap.ts, /guides, search-index, the hub's guide grid and llms.txt ("the evidence-backed routes").

### M7. "Active ingredient and strength" points at a medicated over-the-counter product beside the prescription class
**URL:** /how-to-stop-hair-loss-australia
**Quote:** under the H2 "What a practitioner decides": "Over-the-counter products: pharmacy products sold without a prescription state their active ingredient and strength on the pack, so you can check what you are buying."
**Rule:** Everywhere else the site calls OTC products "cosmetic shampoos and serums". Only a medicated topical has an "active ingredient and strength". Placed in the practitioner section, it recreates the prescription-plus-OTC-topical pairing that the 28 Sep memory notes identifies both medicines. TGA Table 1 (indirect reference); Code s 8.
**Fix:** Covered by retiring the page. Otherwise delete the bullet.

### M8. "The medicine's rules" implies a single known medicine
**URL:** /online-hair-loss-treatment-australia
**Quote:** "What you gain is convenience and speed to start; what you do not gain is a shortcut past the medicine's rules."
**Rule:** TGA Table 1 (indirect reference). The definite article presumes a specific medicine.
**Fix:** Covered by retiring the page. Otherwise: "what you do not gain is a way around the clinical assessment."

### M9. Side-effects FAQ pairs "prescription treatments" with "over-the-counter topical products" and implies benefit
**URL:** /online-hair-loss-treatment-australia (FAQ and JSON-LD)
**Quote:** "Prescription hair-loss treatments carry potential side effects ... A registered practitioner weighs the likely benefit against the risks for your health history ... Over-the-counter topical products carry their own considerations."
**Rule:** The pairing identifies the two medicines (see M7); "likely benefit" implies efficacy of the class (s 133(1)(d)). It is adjacent to a Mosh CTA.
**Fix:** Covered by retiring the page. If kept: "Any treatment has risks as well as possible benefits, and a registered practitioner discusses both with you during the consultation."

### M10. "What the evidence supports" as anchor text and in llms.txt
**URLs:**
- /hair-loss guide card: "How to slow hair loss: The causes, what the evidence supports, and how to get assessed."
- /hair-loss-treatment-cost-australia link: "How to slow hair loss, and what the evidence supports"
- llms.txt: "the evidence-backed routes" (how-to-stop) and "which routes have real evidence" (receding)

**Rule:** These assert that a route, in substance the prescription class, has evidence for slowing hair loss (s 133(1)(d), TGA class reference). llms.txt is a published advertising surface for AI engines.
**Fix:** Once how-to-stop is retired, remove its card, link and llms.txt line. Change the llms.txt receding line to "What causes a receding hairline, and the routes to having it assessed."

### M11. Mosh's plan tiers listed by hair-loss stage
**URLs:** /best-hair-loss-treatment-australia (table "How Mosh groups its hair plans": Receding hairline / Thinning and receding, "Mosh labels it most popular" / Advanced); /hair-loss-treatment-cost-australia ("Mosh sells three hair plans by stage ...", FAQ "Mosh prices its plans for a receding hairline and for advanced hair loss differently").
**Rule:** TGA prescription guidance, *Client booking systems and product catalogues*: "a form, catalogue ... to browse ... available medicines to treat a particular health condition". On Mosh's own page each stage is a medicine combination ("Daily tablet and spray", "Daily capsule"). A stage-by-stage plan list, linked to that page, works as a catalogue of prescription treatment bundles. "Most popular" adds a popularity endorsement.
**Fix:** Delete the table and the stage list. Say: "Mosh prices its hair plans by stage; the practitioner decides which, if any, applies, and Mosh shows the price before you pay."

### M12. Midoc page and quiz blurb put "hair loss" and "can issue a prescription" together
**URLs:** /midoc; /mens-health/mens-health-quiz (PartnerRoute blurb)
**Quotes:**
- /midoc: "where it is appropriate they can issue a prescription, a medical certificate or a specialist referral."
- /midoc: "Standard consultation, $49: General health, child health, COVID-19, hair loss, sexual health and STI, smoking cessation, continence."
- Quiz: "Consultations from $49 across general, sexual health, hair loss and men's health lines".

**Rule:** TGA prescription guidance (a consultation for a condition whose treatments are prescription-only, presented with "can issue a prescription"). The 30 Sep rules ban "can prescribe". A generic prescription service is lower risk: TGA says general dispensing-service ads are not advertising unless they promote specific medicines or classes. The risk comes from the combination with a named condition.
**Fix:** /midoc lead: "a doctor registered with AHPRA calls you ... and decides what, if anything, is appropriate, which may include a certificate or a referral." Drop "hair loss" from the standard-consultation list on this page; Midoc's own site lists its lines. Quiz blurb: "Consultations from $49, plus certificates from $18."

### M13. "Online prescription" page sits in the men's health section
**URL:** /mens-health/online-prescription-australia
**Quotes:**
- Title "Online Prescription Australia: Cost, Medicare"
- H2 "Where to get one ... One Australian provider we have a commercial arrangement with issues these."
- "without it the consultation can finish without the thing you came for"
- Breadcrumb "Men's health / Online prescription", with siblings on erectile dysfunction and premature ejaculation.

**Rule:** On its own, a generic prescription-fee page is probably within TGA's "general dispensing services" carve-out. Filed under men's health, beside ED and PE pages, "online prescription" reads as "a men's health prescription online", which is a class whose leading example (ED medicines) TGA names. "The thing you came for" frames the prescription as the purchase (s 133(1)(d)).
**Fix:**
- Move the page out of /mens-health. A 301 to a neutral telehealth path would need a new route, which is Jarred's call. Alternatively, drop the men's-health breadcrumb and hub card.
- Change "Where to get one" to "Where to book a consultation".
- Delete "the thing you came for" (it appears twice; the /midoc FAQ has "the thing you came for" as well).

### M14. Premature ejaculation table includes a "Prescription" column for the online clinic route
**URL:** /mens-health/premature-ejaculation-treatment-options-australia
**Quote:** table row "Online men's health clinic | Sign up, complete an assessment | Usually none | [Prescription] Only if considered appropriate", with a "Visit Midoc" CTA further down the page.
**Rule:** TGA prescription guidance ("implies that a prescription could ... result from the consultation"), here for a condition with a prescription class.
**Fix:** Delete the "Prescription" column, or replace it with "Who decides the approach: you / a psychologist / a practitioner / a practitioner".

### M15. Erectile dysfunction cost page is about the cost of a TGA-named priority class
**URL:** /mens-health/erectile-dysfunction-treatment-cost-australia
**Quotes:**
- Table row: "Online clinic, subscription | Monthly, bundling consult, supply and support"
- FAQ: "Anything prescribed is a separate cost again."
- "A bulk-billed GP appointment twice a year plus dispensed cost"

**Rule:** TGA lists "erectile dysfunction medicines" as a common example of prohibited service promotion, and ED is a 2026-27 TGA priority area. Today the page carries no partner link and avoids the names, so it is defensible. It links to the hub, which does carry Midoc. The day a Mosh or Hims ED link is added, it becomes a page about the cost of supplying ED medicines with a buy button.
**Fix:** Keep it unmonetised. **Do not add the planned Mosh or Hims ED placement to this page without the lawyer's sign-off.** Replace "supply" with "ongoing support" and "anything prescribed / dispensed cost" with "any pharmacy cost".

### M16. Ahpra s 133(1)(b): the REFERAL55 terms and conditions are not linked
**URLs:** /moshhair, /mosh-review, /best, /cost, /hair-loss, and the four guides (anywhere REFERAL55 appears)
**Quote:** "55% off your first order (code REFERAL55)" and "180-day money-back guarantee on quarterly hair programs (T&Cs)". The "(T&Cs)" text is not a link. The only terms link on these pages is our own /terms.
**Rule:** s 133(1)(b), and Ahpra guideline 4.2: terms "should be easily found ... The public should not be required to exhaustively search." The pages state some conditions (new customers, first order, three months), but Mosh's promotion terms are cited and not linked.
**Fix:** Link `getmosh.com.au/promotions-terms-and-conditions` beside every REFERAL55 mention and every "180-day" mention, and state: "New customers only; applies to the first order of a hair program; full terms on Mosh's site." This keeps the code and lowers its risk.

---

## LOW findings

| ID | URL | Quote | Rule | Fix |
|---|---|---|---|---|
| L1 | /moshhair, /mosh-review | "the 180-day guarantee on quarterly hair programs limits the downside" | s 133(1)(d): "guarantee" beside a treatment program can read as outcome confidence | "Mosh offers a 180-day money-back guarantee on quarterly hair programs, under its terms (linked)." Drop "limits the downside". |
| L2 | /mens-health/erectile-dysfunction-treatment-cost-australia | "The providers below are ones we have checked ourselves, and we earn a commission if you sign up through them." The page has no providers or links. | ACL s 18 (generated by ComingSoonNote) | Give the ComingSoonNote an "unmonetised" variant for this page |
| L3 | /mens-health | "Online clinics generally run subscriptions that bundle a consult with ongoing supply and support." | Indirect reference to supply of the class | "... bundle a consult with ongoing support" |
| L4 | /hair-loss-treatment-cost-australia | "Hair-loss treatment is not PBS-subsidised" | Refers to the PBS status of the prescription class; factual, but beside a price comparison | "The PBS does not subsidise hair-loss care" or delete |
| L5 | sitewide nav JSON-LD and the hub title | "Hair loss treatment" (nav name), "Hair Loss Treatment Options Australia" | Condition plus "treatment" is within the TGA migraine example; listed for completeness | None required |
| L6 | /hair-loss-quiz | "Want verified hair-loss offers emailed to you?" | TGA *Direct marketing campaigns*: an email of hair-loss service offers is a mass communication | Keep the emails service-only and never name or depict treatment |
| L7 | /midoc and every Midoc /go/ link | Midoc homepage: "See our Google Reviews 4.9 ★ from over 1,900 reviews" | s 133(1)(c), on the partner's page, not ours; same linking theory as H1 but much weaker (no co-branding, no medicine) | Do not repeat it on our pages (we do not) |

Checked and not a finding: the ED page's "Erectile dysfunction can be an early indicator of other health issues, including cardiovascular ones". It sends the reader to a GP and makes no claim that any goods treat a serious disease, so Code s 28 is not engaged.

---

## Pages to retire

1. **/how-to-stop-hair-loss-australia: 301 to /hair-loss.** Its title query is an efficacy question whose answer is an S4 medicine (H4, M6, M7).
2. **/online-hair-loss-treatment-australia: 301 to /hair-loss.** Its query is "get the prescription class online" (H5, M8, M9), and its useful content is duplicated on /hair-loss and /best.

For both: add a 301 in next.config.ts, and remove each page from sitemap.ts, /guides, search-index.ts, the /hair-loss guide grid and ItemList, the ChromeGate list, the relatedLinks on sibling guides, and llms.txt. Set `noIndex: true` on the seoConfig entry. Do not disallow either URL in robots.txt.

Not retired, but gated: **/mens-health/erectile-dysfunction-treatment-cost-australia** stays only while it carries no partner link.

---

## Questions only a lawyer can answer

1. **Liability for the co-branded Mosh landing page (H1).** Refer Labs is named on `getmosh.com.au/start/referlabs` ("Mosh and Refer Labs Have Partnered Up"), which shows medication timelines, "Daily tablet and spray" and patient results. Does that make Refer Labs an advertiser of a prescription medicine under ss 42DL(10) and 42DLB(7), and of testimonials under s 133(1)(c)? Is repointing the link enough, or does the co-branding have to come down? The same question applies to any Moshy or Juniper landing page with our name on it (out of scope here, not checked).
2. **Discount codes (H7).** Is a percentage discount on the first order of a practitioner-decided program, where that order in practice includes an S4 medicine, a prohibited incentive or price representation for that medicine (TGA price guidance; Code s 26 and Part 9)? Does stating "applies to the program; the practitioner decides any treatment" change the answer?
3. **The class sentence.** Does "Hair-loss medicines are prescription-only in Australia", placed near a single-condition telehealth CTA, convert a lawful condition-consultation ad (TGA's migraine example) into an advertisement for a class of prescription medicines? Is it safer to remove it from the pages altogether?
4. **Conditions whose only real treatments are S4.** For male pattern hair loss and ED, can a commission-paid publisher lawfully promote a single-condition telehealth service at all, given that the reader can infer the medicine from the condition alone? Or does the TGA's migraine example cover it, provided no goods are referenced?
5. **The ED launch.** Before the Mosh and Hims ED placements go live (planned for early October): can any page that links an ED-specific service comply, given TGA's express listing of "erectile dysfunction medicines" and the 2026-27 priority? If it can, which wording?
6. **s 133 and publishers.** Does s 133 apply to Refer Labs as "a person" advertising a regulated health service, given that we do not control the service? Are the REFERAL55 and 180-day guarantee statements compliant once Mosh's terms are linked beside them?
7. **Generic prescription-fee pages.** Does a page publishing Midoc's $18 repeat and $39 new script fees fall within TGA's "general dispensing services" carve-out? Does placing it under a men's health section change that?
8. **The disease-education boundary.** Can symptom pages such as /early-signs carry a link to a prescribing service and still be disease education? If not, what separation between the education page and the CTA (a different page, no discount, no "Claim offer" bar) would the lawyer accept?
9. **Plan lists.** Is naming a provider's stage-based plans (Receding / Thinning / Advanced) a "catalogue" of prescription treatments when each plan is a medicine bundle on the provider's own site?
10. **Restating partner claims.** We repeat Mosh's own claims ("AHPRA-registered practitioners paid fee-for-service", "certified by LegitScript") with attribution and a date. Does attribution protect us under ACL ss 18 and 29 if a claim is wrong?
11. **Email.** Is a newsletter of "verified hair-loss offers" a direct-marketing advertisement under TGA's mass-communication guidance, even when it names no medicine?

Sources: [TGA, Advertising health services that involve therapeutic goods](https://www.tga.gov.au/resources/guidance/advertising-health-service) · [TGA, Complying with the restrictions on advertising prescription medicines to the public](https://www.tga.gov.au/resources/guidance/complying-restrictions-advertising-prescription-medicines-public) · [Therapeutic Goods Advertising Code 2021](https://www.legislation.gov.au/F2021L01661/latest/text) · [Ahpra, Guidelines for advertising a regulated health service](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-guidelines.aspx)
