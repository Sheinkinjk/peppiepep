# Legal risk review: referlabs.com.au (live), 3 October 2026

Read-only. Nothing was edited, committed or deployed. This is a risk review, not legal advice; every HIGH item and every question at the end is for a qualified lawyer.

## Method

- **Pages:** all 174 URLs in the live `sitemap.xml` were fetched with a Chrome user-agent (all returned 200). For each page I read the `<title>`, meta description, robots, canonical, every JSON-LD block, the rendered body with scripts stripped, and every outbound and `/go/` link target.
- **Redirects:** all 30 `/go/` slugs were resolved to their final destinations.
- **Partner pages:** every destination our links open was fetched and scanned. That covers Moshy, Mosh, Optislim (home, `/collections/vlcd`, `/pages/glp-1`), Midoc, i-screen, Foreo (UFO and LUNA), Emma, Technogym, Knose, PetsOnMe, Aussie Health Products, Edible Beauty, Doctors for Weight Loss and the Unbounce invitation page.
- **Juniper not read:** Juniper returned a Cloudflare block to curl, headless Chrome and headed Chrome, so its landing page was **not** re-read today.
- **Routes outside the sitemap:** retired SaaS routes, the auth, admin and API routes, and the `/preview` Hims gate were probed live. The API handlers were read from source to see what each one collects. The only write request sent was an empty POST to `/api/lending-lead`, which stores nothing and returns 503.
- **Other surfaces:** live `llms.txt` and `robots.txt` were read.
- **False positives:** every regex hit was read in context, and negations, our own disclaimers, attributed partner figures and "Pepform" were discarded. Of the hits, roughly 1 in 30 is reported below.

## What the 1-2 October fixes got right (verified on the live pages, not re-reported)

- **No medicine named anywhere.** A word-boundary scan of all 174 pages (body, titles, metas, JSON-LD) found zero hits for: GLP-1, semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro, Saxenda, finasteride, minoxidil, dutasteride, sildenafil, tadalafil, Viagra, Cialis, orlistat, phentermine, peptides, injection(s), pens, antibiotics.
- **The weight-loss and hair-loss pages carry no "prescri…" wording at all.** Also gone from those pages: "eligibility check", "delivery", "pharmacy prices", "clinical pathway", "act early", "holding onto hair", "what helps", "move the needle", Mosh's plan-by-stage table, and "the thing you came for". The 1 Oct HIGH copy findings H2-H6 (hair) and H1-H5 (weight) are closed on our own pages.
- **Disclosure comes before the first paid link on all 113 pages that carry a sponsored link** (measured in rendered DOM order).
- **The Juniper handbook wording is present word for word** on all 6 pages that carry the Juniper affiliate URL: `/juniper`, `/moshy-vs-juniper`, `/weight-loss`, `/best-weight-loss-telehealth-australia`, `/cheapest-weight-loss-telehealth-australia` and `/weight-loss-telehealth-women-australia`.
- **Those 6 pages also carry no handbook-banned words** (medicine, medication, prescription, injection, pill, dose, appetite, treatment on its own, diabetes, PCOS and the rest).
- **No page says it earns nothing while carrying a paid link.** The two skincare pages flagged on 1 Oct (M10) are fixed.
- **No testimonials, star ratings or before/after images** on any of our pages. Every logo we render belongs to a partner.
- **Consent and retired routes:**
  - GA4 consent defaults to `denied` before gtag loads.
  - No Meta or LinkedIn pixel fires.
  - The business-loan pages 308 to `/for-business`, and `/api/lending-lead` returns **503** on POST.
  - `/dashboard`, `/api/webhooks/twilio`, `/api/webhooks/stripe` and `/chat` return 404.
  - `/security` and `/referred` return 410.
  - `/blueprint-access` 308s to `/`.
- **The Hims gate holds:**
  - All five preview slugs return 401, with `noindex, nofollow, noarchive` and `no-store`.
  - The RSC header, `?_rsc=`, `.rsc` and `/_next/data` variants also return 401, and no response body names Hims.
  - The real slugs (`/hims`, `/hims-ed`, `/ed` and the rest) return 404.
  - Hims is absent from the sitemap and `llms.txt`.
- **Accessibility basics:** `lang="en"` on every page, one `<h1>` per public page, no `<img>` without `alt`, and no empty links.
- **Privacy, Terms and Disclaimer (1 Oct 2026) match what the code collects.** That covers newsletter, quizzes, Apollo enquiries, the OpenAI assistant, Supabase, Resend, Vercel and consented GA4. No Twilio, dashboard or Blueprint residue remains.
- **The Pepform entity name** (Pepform Pty Ltd trading as Refer Labs, ABN 32 660 008 159) is correct everywhere and was left alone.
- **Energy rebate pages** imply no government endorsement. "Government rebate" always refers to a scheme the installer applies, and the `$272` gross / `$252` net per kWh figures agree across all eight pages.
- **No page presents Refer Labs as a provider.** The Terms say "We are not a doctor, insurer, broker, financial adviser, installer, lender or seller".

## Counts

| Severity | Count |
|---|---|
| HIGH | 4 |
| MEDIUM | 11 |
| LOW | 12 |

The HIGH items are almost entirely **off-site or contractual**: what our links open, and the codes. Our own copy is now in good shape. What remains is mostly ACL accuracy (offer terms, exclusivity, "independent" and "best" claims), one financial-services question on the pet pages, and one Spam Act fault.

---

## HIGH

### H1. Every Mosh link still opens a page co-branded with Refer Labs that shows medication timelines, treatment types and patient results
- **URL (destination):** `https://www.getmosh.com.au/start/referlabs`, read 3 Oct 2026.
- **Linked from:** every Mosh CTA and the sticky bar on `/moshhair`, `/mosh-review`, `/hair-loss`, `/best-hair-loss-treatment-australia`, `/hair-loss-treatment-cost-australia`, `/receding-hairline-treatment-australia`, `/early-signs-of-hair-loss-australia` and the `/hair-loss-quiz` online result.
- **Quotes (destination):**
  - "Mosh and Refer Labs Have Partnered Up"
  - "Clinically proven treatments"
  - "0 to 3 months Reset phase Medication should start working … Mild regrowth may appear"
  - "Real people, real results … Brayden, 31 QLD Stage Receding Treatment type Daily tablet and spray Results shown 4 months"
  - "Trent: … if you want to do this journey, don't wait until it's too late. Start today."
- **Law:**
  - Therapeutic Goods Act 1989 ss 42DL(10) and 42DLB(7).
  - TGA, *Complying with the restrictions on advertising prescription medicines to the public* (23 Jun 2026), section "Referencing (linking to) third-party information".
  - TGA, *Advertising health services that involve therapeutic goods* (18 Jun 2026): links and discount codes, and before/after or treatment-progress content.
  - Health Practitioner Regulation National Law s 133(1)(c) (testimonials), (d) (unreasonable expectation) and (e) (urgency, with Ahpra guideline 4.5); Ahpra guideline 3.2 (anyone who advertises a regulated health service is an advertiser).
- **Why it is a risk:**
  - Our name is on a page that identifies the oral and topical medicines ("Daily tablet and spray", "Daily capsule") and shows treatment results.
  - It is reached through our link with our code, so a regulator can treat that page as our advertising, not merely a page we link to.
  - It also adds a fresh urgency testimonial ("don't wait until it's too late").
  - Unchanged since the 1 Oct audit (H1 there).
- **Fix:**
  - Ask Mosh, in writing, to remove "Refer Labs" from the page and to give us a service-only landing URL: no timeline, no "Real people, real results", no treatment types, no "Clinically proven".
  - Until Mosh does, repoint every Mosh link to a neutral Mosh URL that Mosh confirms still applies REFERAL55, or pause the links.
  - The link target is one constant (`MOSH_HAIR_URL`), so this is one change.

### H2. Every Moshy link still opens Moshy's "eligibility check" page, which names injectable treatment, prices "your treatment" and shows weight-loss testimonials
- **URL (destination):** `https://www.getmoshy.com.au/start/eligibility-check-moshy`, read 3 Oct 2026.
- **Linked from:** every Moshy CTA on `/moshy`, `/moshy-review`, `/moshy-vs-juniper`, `/moshy-vs-gp`, `/moshy-alternatives`, `/weight-loss`, `/best-weight-loss-telehealth-australia`, `/cheapest-weight-loss-telehealth-australia`, `/weight-loss-telehealth-cost-australia`, `/weight-loss-telehealth-men-australia`, `/weight-loss-telehealth-women-australia`, `/weight-loss-cost-calculator` and the quiz.
- **Quotes (destination):**
  - "Check if You're Suitable for Medical Weight Loss"
  - "New customers can now receive $120 off their first treatment. Use code: REFERRAL120 at checkout"
  - "Get your treatment from $229"
  - "Prescription treatments may come in tablet or injectable form"
  - "Paula, 54 Lost 9kgs 3 months Bianca, 34 Lost 13kgs 3 months"
  - "Calculate your BMI"
  - In Moshy's own footer: "This link is an affiliate link to Moshy's online eligibility quiz".
- **Law:**
  - Act ss 42DL(10) and 42DLB(7).
  - TGA prescription guidance: an eligibility questionnaire for a prescription medicine; price information for treatment involving one; the linking rule.
  - National Law s 133(1)(c) and (d).
- **Why it is a risk:**
  - Moshy's own page describes REFERRAL120 as "$120 off their first treatment" and prices "your treatment".
  - Our code and link therefore lead straight to an S4 price-and-eligibility offer.
  - The URL itself says "eligibility-check", the wording our 30 Sep rules banned from our own buttons.
  - Unchanged since 1 Oct (H6 there).
- **Fix:**
  - Ask Moshy for a service-only affiliate URL with no BMI tool, no injectable or tablet wording, no kg testimonials and no "eligibility" in the slug.
  - Ask Moshy to change "first treatment" to "first order" in the code banner.
  - Until then, the lawyer decides whether to link to `getmoshy.com.au/` and rely on the code alone. Jarred confirmed REFERRAL120 pays on code use without the link.

### H3. Optislim links land on a homepage that promotes a "GLP-1 Support" range, one click from a page about taking your GLP-1 dose (new)
- **URLs:** `/go/optislim-brand` (from `/optislim`) and `/go/optislim-health-hub` (from `/health-and-beauty`) both resolve to `https://www.optislim.com.au/`. `/optislim` also links `optislim.com.au/collections/vlcd` directly.
- **Quotes (destination, read 3 Oct 2026):**
  - Homepage hero: "Lose Weight GLP-1 Support Eat Healthy"
  - Sitewide nav on both pages we link: "On A GLP-1?"
  - That nav item opens `/pages/glp-1`: "On a GLP-1? Don't waste a single dose. Your appetite is finally under control … GLP-1 medications suppress hunger … to protect your muscle while the medication does its work … 1 Take your dose Keep following your GLP-1 program exactly as prescribed."
  - Also on the homepage: "Achieve Your Weight Loss Goals—Guaranteed!", "Lose 1.5-2.5 kg per week", "Real lives, real before-and-afters".
- **Law:**
  - TGA prescription guidance, Table 1: "GLP-1 receptor agonists" is listed as a reference to a class of prescription medicines; plus the linking rule.
  - Act s 42DL(10).
  - ACL s 18 for the destination's "Guaranteed" weight-loss claim. That is Optislim's liability, but it sits beside our weight-management content.
- **Why it is a risk:**
  - This is the exact class the 19 Aug sweep removed from our own site.
  - It now sits on the page our paid link opens: in the hero, in the nav, and one click from dosing instructions.
  - Our `/optislim` page is careful (FSANZ supervision rule, no weight claims), but the linking rule looks at the destination in the context of our content.
  - Optislim sits in the Health & Beauty hub, beside weight content.
- **Fix:**
  - Pause both Optislim placements and the direct `/collections/vlcd` link until Optislim removes the GLP-1 nav and range, or the lawyer clears it.
  - A deep link does not cure this, because the nav item is sitewide.
  - Raise it with Commission Factory or Optislim. This is the cheapest HIGH to close: two `/go/` entries and one href.

### H4. The three codes still discount the first order of a program that, on the partners' own pages, includes a prescription medicine
- **URLs:**
  - REFERRAL120: `/moshy` and 15 other pages, the homepage, `/deals` and `llms.txt`.
  - REFERAL55: `/moshhair`, `/mosh-review`, `/hair-loss`, the hair guides and `/deals`.
  - JARREDKFC: `/juniper` and the Juniper-linked pages.
- **Quotes:**
  - "The current Moshy discount code is REFERRAL120: $120 off a new customer's first order on eligible Moshy weight programs" (`/moshy`).
  - "REFERAL55 takes 55% off a new customer's first Mosh order" (`/moshhair`).
  - Moshy's own landing page calls the same code "$120 off their first treatment".
- **Law:**
  - TGA health-service guidance: "Tags, links, discount codes … can cause content to be considered advertising of the goods".
  - TGA price-information guidance.
  - Therapeutic Goods Advertising Code s 26 (incentives) and Part 9.
  - National Law s 133(1)(b) and (e).
- **Why it is a risk:** the code is the strongest signal that a page promotes supply and not just information. With H1 and H2 the chain reads "our page → our code → partner page pricing the treatment".
- **Fix:**
  - **Not a recommendation to remove the codes.** Jarred kept them pending advice on 30 Sep, and that decision stands.
  - Get the lawyer's answer first (questions 1-3).
  - Meanwhile, fixing H1 and H2 removes most of the aggravation.

---

## MEDIUM

### M1. REFERRAL120 is advertised without its 3-month minimum on the homepage, `/guides` and in SERP titles and metas
- **URLs:** `/` (card and chip), `/guides`, plus the titles and metas of `/moshy`, `/moshy-review` and `/deals`.
- **Quotes:**
  - Homepage: "Moshy $120 off with code REFERRAL120" and the chip "Weight loss $120 off".
  - `/guides`: "$120 off a first order with code REFERRAL120 at checkout."
  - `/moshy` title: "Moshy Discount Code Australia 2026: $120 Off"; its meta: "$120 off a first order at checkout".
  - `/moshy-review` meta: "$120 off a first order with REFERRAL120".
  - **The minimum appears nowhere on the homepage or `/guides`.**
  - On `/moshy` it first appears 46% of the way down the body, on `/weight-loss` at 69-86%, on `/moshy-vs-juniper` at 65%.
  - Commit `f395e219` moved it "to the fine print".
- **Law:**
  - ACL s 18 and s 29(1)(i) (price).
  - ACCC position that a qualification in fine print cannot correct an overall headline impression.
  - National Law s 133(1)(b): an inducement for a regulated health service must state its terms in the advertisement.
- **Why it is a risk:**
  - The minimum is a material condition: the $120 is earned by committing to three months of fees.
  - The homepage card is the most prominent health placement on the site and carries no term at all.
  - Moshy's own marketing says "No lock-in contracts", which makes an unqualified "$120 off" read as lock-in free.
- **Fix:**
  - Add "(3-month minimum)" or "T&Cs apply" beside every headline REFERRAL120 instance: homepage card and chip, `/guides` card, and the `/moshy` and `/moshy-review` metas.
  - Keep the full terms where they are.
  - Ask the lawyer whether the `<title>` must carry it (question 4).

### M2. JARREDKFC's "$89" value is headlined but sourced only to a private handbook, and Juniper's public flow appears to be a $249 holding fee
- **URLs:** `/juniper` (title, H1, lead, FAQ), `/deals` (row and meta), every Juniper card, `llms.txt` line 37.
- **Quotes:**
  - Title: "Juniper Discount Code 2026: JARREDKFC Waives the $89 Consult".
  - FAQ: "(source: Juniper's affiliate handbook, confirmed 23 September 2026; no public Juniper page states it)".
  - `/deals` meta: "Verified Australian discount codes … Juniper JARREDKFC for no charge on the $89 initial consultation"; row: "Initial consultation waived, valued at $89 … Checked 23 Sept 2026".
  - `/juniper` also says "Juniper offers a full refund if you do not proceed after the consultation", which matches the holding-fee flow the 1 Oct partner review read on `myjuniper.com/pricing`: "Pay $249 holding fee, refunded if ineligible or you choose not to proceed … holding fee credited to first order".
- **Law:** ACL s 29(1)(i) (false or misleading representation about price) and s 18. "Verified" and "Checked" imply a public check that the page itself says cannot be made.
- **Why it is a risk:**
  - If the current flow charges no $89 consult, the headline value of the code is illusory.
  - We print that no public page supports it.
  - JU-1 from 1 Oct is unresolved. Juniper's site could not be re-read today because of the Cloudflare block.
- **Fix:**
  - Get written confirmation from Juniper of what JARREDKFC does under the holding-fee flow.
  - Until then: drop "$89" from the title, H1, meta and `/deals` row ("no charge for the initial consultation; program fees apply").
  - Delete "no public Juniper page states it".
  - Change "Checked" to "Confirmed with Juniper".
  - Remove "Verified" from the `/deals` meta.

### M3. Exclusivity and commission-mechanics claims that are unconfirmed, and in one case contradicted
- **URLs:** `/deals` ("Refer Labs only" against REFERRAL120, REFERAL55, JARREDKFC and referlabs), `/moshhair` ("Code REFERAL55 Refer Labs only"), `llms.txt` lines 25, 34 and 128.
- **Quotes:**
  - `llms.txt` 34: "REFERRAL120 … REFERAL55 … JARREDKFC … and referlabs … are **unique to Refer Labs**. They are not published by the providers or available through other publishers, and the commission is earned on the code itself."
  - `llms.txt` 25 and 128: "Refer Labs readers get an exclusive $500 off" and "the exclusive $500 Refer Labs discount" (Apollo).
- **Law:** ACL s 18 and s 29(1)(i). Possibly also the confidentiality clauses of the partner agreements.
- **Why it is a risk:**
  - REFERRAL120 **is** published by the provider: it is the banner on Moshy's landing page.
  - Exclusivity is recorded as confirmed only for REFERRAL120 (Jarred, 20 Aug 2026). Mosh and Juniper exclusivity is still a meeting question (1 Oct partner review, MO-11).
  - "The commission is earned on the code itself" publishes deal terms. It is true for i-screen and Moshy, and unconfirmed for Mosh and Juniper.
  - Unresolved since 1 Oct.
- **Fix:**
  - Change `llms.txt` 34 to: "REFERRAL120, REFERAL55, JARREDKFC and referlabs are codes issued to Refer Labs."
  - Delete "not published by the providers" and the commission clause.
  - Keep "Refer Labs only" and "exclusive" only for codes and offers confirmed exclusive in writing.

### M4. Paid partner picks labelled "non-sponsored" and "top picks" with no disclosure beside them
- **URLs:** `llms.txt` line 24; `/` ("This month's top picks").
- **Quotes:**
  - `llms.txt`: "## Editorial picks and current offers … Independent, non-sponsored picks and the offers currently available through Refer Labs' links."
  - Homepage: "This month's top picks", listing Moshy, i-screen, Superfiliate and Apollo, all four commission partners, with no disclosure on the homepage beyond the generic footer line.
- **Law:** ACL s 18; ACCC, *Comparator websites: a guide for business* (disclose commercial relationships that affect what is presented); ACCC's position on affiliate and influencer disclosure.
- **Why it is a risk:**
  - Every "pick" pays us, so "non-sponsored" is false in substance.
  - "Top picks" implies editorial selection from a wider field.
- **Fix:**
  - `llms.txt` 24: "Offers available through Refer Labs' links. Refer Labs earns a commission from each provider listed."
  - Homepage: retitle to "Current partner offers", and add one line under the heading: "We earn a commission from these providers."

### M5. "Best" comparisons that list only paying partners do not say they are not the whole market, while the site says listing is never conditional on payment
- **URLs and quotes:**
  - `/best-weight-loss-telehealth-australia`: title "Best Weight Loss Telehealth Australia 2026"; ItemList of Moshy and Juniper, both partners; lead "Moshy and Juniper are two Australian weight-management telehealth services".
  - `/best-pet-insurance-australia`: Knose and PetsOnMe, both partners.
  - `/best-hair-loss-treatment-australia`: Mosh and a GP.
  - `/how-we-make-money`: "Being listed, reviewed or compared here is free, and no client can buy it".
  - `/partner-with-refer-labs`: "there is no fee to be listed".
  - `/terms` s 4: "A provider cannot pay … to be added to a comparison."
- **Law:** ACL s 18; ACCC comparator guide (tell consumers when you do not compare the whole market, and whether commercial arrangements affect which providers appear).
- **Why it is a risk:**
  - In practice every health and pet hub lists only commission partners (plus the GP).
  - A commission is a payment, so "no fee to be listed" and "cannot pay to be added" are literally true but leave the reader with the wrong impression.
  - The AI-sales and website-builder quizzes already carry the right sentence ("a shortlist of our partners, not the whole market"); the money pages do not.
- **Fix:**
  - On every hub and "best" page whose providers are all partners, add one sentence under the disclosure: "We only compare providers we have a commercial relationship with. This is not the whole market; other services exist."
  - In `/how-we-make-money` and the Terms, replace "no fee to be listed" and "cannot pay to be added" with an accurate statement: "Providers are added when we have checked them; most pay us a commission on sign-ups, and that never changes their position."

### M6. Superlatives about paying partners across the business-software pages
- **URLs and quotes:**
  - `/best-website-builder` and `/website-builder-quiz`: "Butternut AI and Durable AI are the strongest AI website builders in 2026."
  - `/best-website-builder`: "Swipe Pages is the strongest choice for paid ad landing pages."
  - `/carrd`: "Carrd is the best value in simple websites"; "one of the best options available at any price point".
  - `/carrd-vs-durable` meta: "Carrd is the cheapest one-page builder".
  - `/best-ai-sales-tools`: "For most Australian small businesses, GoHighLevel is the best starting point".
  - `/durableai`: "Durable AI is the strongest pick for service businesses".
  - The quizzes concede the field is "the four builders we have reviewed … and every one of them pays us a commission".
- **Law:** ACL s 18 and s 29(1)(a) (false or misleading representation that goods or services are of a particular standard, quality or value); the ACCC's substantiation expectation for comparative claims.
- **Why it is a risk:**
  - The claims cover a whole market ("in 2026", "anywhere") but are drawn from a set limited to affiliates.
  - The writer is paid by every product in that set.
- **Fix:** qualify each one to the set actually compared, for example "Of the four builders we reviewed, Butternut AI and Durable AI generate the most complete draft". Delete "at any price point" and "the cheapest one-page builder".

### M7. Pet insurance pages state opinions on which policy suits whom, with no AFSL
- **URLs and quotes:**
  - `/knose-vs-petsonme`, H3 "Knose suits you if": "You want the highest share of the bill covered, you would rather not meet a sub-limit at claim time, or a $0 excess appeals."
  - H3 "PetsOnMe suits you if": "You want clearly separated tiers, or you are starting with accident-only cover and want a defined entry point."
  - `/best-pet-insurance-australia`: "This is the strongest argument for insuring a pet while young and healthy rather than after a diagnosis"; "If you have a breed with known predispositions, this single line can decide which policy is worth buying"; FAQ "Is it worth insuring an older pet? … cover can still be worthwhile for the unexpected".
  - Sitewide `/how-we-make-money`: "when you click through to a product we recommend and sign up, the provider may pay us a commission".
- **Law:**
  - Corporations Act 2001 s 766B(1) (financial product advice includes a statement of opinion intended to influence a decision about a particular product or class of products) and s 911A (licence required).
  - Corporations Regulations reg 7.6.01(1)(e) covers referral, not opinion.
  - ASIC RG 36 and RG 244: a "not advice" disclaimer does not change the character of a statement.
- **Why it is a risk:**
  - "X suits you if" maps a named insurance product to a reader's attributes. That is an opinion intended to influence, which the bare referral exemption does not cover.
  - "Worth insuring" is general advice on a class of products.
  - The site's own money page calls its content "recommendations", which undercuts the "not a recommendation" box on the pet pages.
- **Fix:**
  - Replace the "suits you if" blocks with neutral fact rows ("Benefit percentage", "Excess options", "Sub-limits") and no mapping to the reader.
  - Delete "strongest argument for insuring … young", "worth buying" and "cover can still be worthwhile".
  - On pet pages, word the money-page link so it does not say "recommend".
  - Lawyer question 5.

### M8. Apollo described as an "SAA-accredited" company when the body says its installers are accredited
- **URLs and quotes:**
  - `/apollo-energy-group` meta and WebPage JSON-LD: "Apollo Energy Group: a Sydney-based, SAA-accredited solar battery installer".
  - Lead: "Apollo Energy Group is a Sydney-based, SAA-accredited solar battery (home battery) company".
  - `llms.txt` 25: "Apollo Energy Group is an SAA-accredited Australian battery installer".
  - The FAQ on the same page: "Apollo Energy Group installs using SAA-accredited installers".
- **Law:** ACL s 29(1)(h) (false or misleading representation that a person has a sponsorship, approval or affiliation) and s 18.
- **Why it is a risk:**
  - Solar Accreditation Australia accredits individual installers and separately approves retailers.
  - Saying the company is "SAA-accredited" asserts the company-level status. Unless Apollo is on SAA's approved-retailer list, that overstates an approval.
  - Our own FAQ says something narrower.
- **Fix:**
  - Use "uses SAA-accredited installers" everywhere (meta, lead, at-a-glance, `llms.txt`), unless Apollo appears on SAA's approved solar retailer list, in which case cite it and date it.
  - Also check licence 400672C on the NSW Fair Trading register and date that check.

### M9. Weight-loss guide sign-up promises "one email", then signs people up for updates, and the guide's unsubscribe link is a contact page
- **URL:** `/weight-loss-guide` (noindex) and the email it sends (`src/lib/weight-loss-guide-email.ts`).
- **Quotes:**
  - Form: "Free, one email. No spam. Unsubscribe anytime. By requesting the guide you agree to receive it and the occasional Refer Labs update."
  - The email's footer: `<a href="https://referlabs.com.au/contact?subject=Unsubscribe">Unsubscribe</a>`.
  - The route calls `recordSubscriber`, adding the address to the list.
- **Law:**
  - Spam Act 2003 s 16 (consent) and s 18 (functional unsubscribe facility).
  - ACMA guidance: consent must not be hidden in terms or bundled with something else.
  - ACL s 18 ("one email").
  - TGA prescription guidance, "Direct marketing campaigns": the email carries REFERRAL120 and JARREDKFC.
- **Why it is a risk:**
  - "One email" tells the reader the opposite of what the next sentence takes consent for, so consent to later marketing is doubtful.
  - The email's unsubscribe link opens a general contact form rather than unsubscribing. The other routes (`subscribe`, `skincare-quiz`) use a signed one-click link.
- **Fix:**
  - Either send one email and do not add the address to the list, or change the copy to "Free guide by email, plus occasional offer updates; unsubscribe in one click", with a separate, unticked opt-in checkbox for the updates.
  - Use `unsubscribeUrl()` in the guide email, as the other routes do.

### M10. Juniper handbook: the approved-channel and no-comparison rules are still breached in substance (contract, not statute)
- **URLs:** all 6 Juniper-linked pages; `/juniper` is titled "Juniper Discount Code"; `/moshy-vs-juniper`, `/best-…`, `/cheapest-…` and `/weight-loss-telehealth-women-australia` compare Juniper with Moshy and with a GP.
- **Quote (handbook, 6 Aug paste, re-read 2 Oct):** "You cannot post affiliate content anywhere other than these approved channels, including on … promo code, coupon, cashback, review aggregator, comparison or other third party websites", and "Avoid comparing Juniper to other service providers".
- **Rule:** the Juniper affiliate agreement. The enforcement ladder is takedown plus held commission, then removal and forfeiture.
- **Why it is a risk:** a third breach costs the program and the held commission. Jarred has chosen to raise it at the Juniper meeting (2 Oct), so this is recorded, not re-argued.
- **Fix:** get written confirmation that referlabs.com.au is an approved channel, and that the comparison pages and "Discount Code" titles are accepted. If Juniper says no, the pages need restructuring before the next review.

### M11. Knose's public "2 months free" is presented as what our code gives
- **URLs and quotes:**
  - `/knose` meta and WebPage JSON-LD: "new customers get 2 months free with code referlab2mf through our link".
  - `/best-pet-insurance-australia`: "Code referlab2mf gives new customers 2 months free when they take out a policy through our link."
  - `/deals` row: "Knose Pets 2 months free for new customers referlab2mf".
  - The `/knose` body says the opposite: "Knose runs 2 months free for new customers as its own public offer, and the code, used through our link, credits the policy to Refer Labs." `llms.txt` 151 agrees.
- **Law:** ACL s 29(1)(i) and s 18; CLAUDE.md's own rule that a public offer anyone can get direct is not a deal.
- **Why it is a risk:** the meta and `/best` wording tell readers the code earns them two months, when anyone gets them.
- **Fix:**
  - Reword the `/knose` meta and JSON-LD and the `/best-pet` line to the `/knose` body wording ("Knose's public offer is 2 months free; referlab2mf credits the policy to Refer Labs").
  - Move Knose off the `/deals` code table into the "vendors' own public offers" list.

---

## LOW

| ID | URL | Quote | Law / rule | Why | Fix |
|---|---|---|---|---|---|
| L1 | `/midoc`, `llms.txt` 81 | "Repeat script, $18 … New script, $39 … Issued where a practitioner assesses it as appropriate"; "A Medicare card is required for a prescription" | TGA prescription guidance (price lists for services involving prescription medicines), which also has a "general dispensing services" carve-out | Generic script fees with no condition or medicine are probably within the carve-out, but the page sits in Men's Health beside ED and PE guides | Lawyer question 9; if in doubt, drop the two script rows and keep consultations and certificates |
| L2 | `/apollo-energy-group` form; footer newsletter form on every page | Consent box "I agree to Refer Labs sharing my details with Apollo Energy Group, and to both contacting me by phone, email or SMS", with no privacy link near it; footer "No spam. Unsubscribe anytime." with no privacy link | Privacy Act APP 5 (notice at or before collection) | The notice exists (Privacy s 3) but is not linked at the point of collection | Add "See our Privacy Policy" beside both forms |
| L3 | `/privacy` s 1 | "If you sign up from a health page, we record that page, which may show a health topic you are interested in." | Privacy Act s 6 ("health information", "sensitive information"); APP 3.3 (consent to collect sensitive information) | An interest in a weight-loss or hair-loss service may be health information; the policy discloses it but does not obtain express consent for it | Lawyer question 10; the simplest fix is to stop storing `source_path` for health pages and record only "health" |
| L4 | live JS chunk `_next/static/immutable/chunks/1dhu7xe1l_xlf.js`; `/logos/hims.png`; `/preview/<slug>` | Route list contains `"/hims","/hims-hair-loss","/hims-ed","/hims-vs-mosh","/ed","/preview"`; `/logos/hims.png` returns 200; valid preview slugs return 401 and invalid ones 404 | Possible confidentiality term in the Hims partner agreement | Content does not leak (verified), but a pre-launch Hims relationship can be inferred | Remove the Hims slugs from the ChromeGate list until go-live (or move them behind the env flag); move `hims.png` out of `public/` until launch; return 404 for valid slugs without the cookie |
| L5 | `/api/auth/send-recovery` (source) | No rate limit; an unknown address returns 500 "Unable to generate a recovery link", a known one returns `{success:true}` | APP 11 (reasonable security steps) | Allows staff-account enumeration and repeated recovery emails | Add the same IP rate limit `signin` has, and return the same 200 response whether or not the account exists |
| L6 | `/ecoflow`, `/anker-solix`, `/ecoflow-vs-anker-solix` | `/ecoflow`: "Is EcoFlow cheaper than Anker SOLIX? Yes … A$999 against A$1,499 for Anker's C1000"; `/anker-solix`: "the C1000 Gen 2 at A$1,599"; `/ecoflow`: "several models were on sale at the time" (24 Aug) | ACL s 18 (comparative price claims) | Two different Anker prices on our own pages; a "Yes, cheaper" verdict built on 40-day-old sale prices | Re-read both stores, use one figure, date it; phrase it as "on 24 Aug prices" or refresh |
| L7 | `/best-pet-insurance-australia`, `/knose-vs-petsonme`, `/petsonme` | "Last updated 17 August 2026 … checked on 17 August 2026" (footer) beside "Verified by Refer Labs on 30 September 2026" (lead) | ACL s 18; CLAUDE.md dating rule | Insurance cover figures now 47 days old, with two different check dates on one page | Re-read the PetsOnMe compare-cover page and the PDSs; make the footer date match |
| L8 | `llms.txt` line 3 | "an independent Australian comparison publisher, operating since 2022" | ACL s 18 (business history) | The entity dates from 2022, but the comparison publisher launched in July 2026 (before that it was the Pepform SaaS) | "Published by Pepform Pty Ltd (ABN active since 2022)" without "operating since 2022" attached to the comparison business |
| L9 | `/weight-loss-quiz`, `/newsletter-platform-quiz` | "Is the recommendation independent? Yes." | ACL s 18 | Both telehealth outcomes of the weight-loss quiz pay us; "Yes" overstates it | Answer with the facts, as `/hair-loss-quiz` does: "The result is based only on your answers. The Moshy and Juniper results link to partners that pay us; the GP result earns nothing." |
| L10 | `/weight-loss` lead | "you complete an assessment, a registered practitioner reviews it, and a plan follows if you're suitable" | TGA prescription guidance (consultation implying an outcome) | Mild residue of eligibility framing on the main hub | "…a registered practitioner reviews it and decides whether the program is right for you" |
| L11 | Midoc, i-screen and Foreo destinations | Midoc: "See our Google Reviews 4.9 ★ from over 1,900 reviews"; i-screen homepage customer quote ("What I really valued was getting insights…"); Foreo LUNA: "clinically proven results", "Before After" | National Law s 133(1)(c) (on partners' pages); Therapeutic Goods Advertising Code for Foreo | Weak linking exposure: no co-branding, no prescription medicine | No change to links; never repeat these claims on our pages (we do not) |
| L12 | `/partner-with-refer-labs` (4 inputs), `/apollo-energy-group` consent checkbox, `/home-battery-payback-calculator` (1) | Inputs with a placeholder but no `<label for>` or `aria-label` | Disability Discrimination Act 1992; WCAG 2.2 SC 1.3.1 and 3.3.2 | Screen-reader users get no field name once they start typing | Add labels (visually hidden is fine) |

Two further notes that are not findings:
- `/og?title=…` renders any text as a Refer Labs-branded card. That could be used to fake a "verdict" image. Consider restricting it to known page titles.
- `/admin/leads` returns HTTP 200 and then redirects through the streamed `NEXT_REDIRECT`. No lead data is in the response, but a server-side 307 or 401 would be cleaner.

---

## Questions for the lawyer

1. **Partner landing pages.**
   - Mosh's `/start/referlabs` names Refer Labs as a partner and shows "Daily tablet and spray", medication timelines and patient results. Moshy's page prices "your treatment", says "tablet or injectable form" and shows kg testimonials.
   - Does linking to these pages with our code make Refer Labs an advertiser of a prescription medicine (Act ss 42DL(10) and 42DLB(7)) and of testimonials (National Law s 133(1)(c))?
   - Is repointing to a neutral URL enough, or must the co-branding come down?
   - Can we contractually require a compliant landing URL from each partner?
2. **Optislim's GLP-1 range.** Optislim is a food (VLED, FSANZ Standard 2.9.5), but its homepage runs a "GLP-1 Support" range and a page telling readers to "take your dose" while "the medication does its work". Does a commission link from our health pages to that homepage expose us under the TGA linking rule? Separately, does Standard 2.9.5 restrict retail promotion or sale of VLED food for special medical purposes to consumers, and does that affect our link?
3. **Discount codes on programs that include an S4 medicine.**
   - REFERRAL120 (which Moshy itself calls "$120 off their first treatment"), REFERAL55 and JARREDKFC each discount the first order or consultation of a practitioner-decided program.
   - On a disclosed page that names no medicine, is the code itself a prohibited incentive or price representation for the medicine (TGA health-service guidance; Advertising Code s 26 and Part 9)?
   - Does it matter that JARREDKFC discounts only the consultation?
4. **Where inducement terms must appear.**
   - If National Law s 133 applies to a publisher, is "T&Cs" plus the full terms lower down the page enough for s 133(1)(b)?
   - Must the 3-month minimum sit beside every headline "$120 off", including the homepage card, the `<title>` and the meta description?
   - The same question under ACL s 29(1)(i).
5. **Pet insurance without an AFSL.**
   - Are "Knose suits you if…" and "PetsOnMe suits you if…", "the strongest argument for insuring a pet while young", and "cover can still be worthwhile" financial product advice under Corporations Act s 766B?
   - Does reg 7.6.01(1)(e) cover a side-by-side of published benefit percentages ("Knose, on the published figures: up to 90% … against PetsOnMe's 80%")?
   - If any of it is general advice, is becoming an authorised representative of one of the insurers or distributors the practical route, and what general advice warning would then be required?
6. **Comparator-site obligations.** Where every provider on a hub or "best" page pays us a commission, does the ACCC comparator guidance require a statement that the comparison is not the whole market and that inclusion depends on a commercial relationship? Can the site still call itself "independent"?
7. **Exclusivity and deal terms in public.**
   - Can we label codes "Refer Labs only" or "unique to Refer Labs" without the partner's written confirmation?
   - Does stating "the commission is earned on the code itself" in `llms.txt` breach a confidentiality clause in any of the affiliate agreements?
8. **Spam Act.** Is consent valid for a form reading "Free, one email" followed by "you agree to receive it and the occasional Refer Labs update"? Does an "Unsubscribe" link to a contact form meet s 18?
9. **Generic script-fee lists.** Does publishing Midoc's $18 repeat and $39 new script fees fall within the TGA's "general dispensing services" carve-out? Does placing that page in a Men's Health section change the answer?
10. **Health-topic sign-up data.** Is recording that someone subscribed from a weight-loss or hair-loss page "health information" (Privacy Act s 6)? If so, does APP 3.3 require express consent at sign-up?
11. **The ED launch** (Mosh and Hims, planned early October; pages gated at `/preview`). Given the TGA lists "erectile dysfunction medicines" as a common example and names ED as a 2026-27 priority, can any page that links an ED-specific telehealth service comply? If so, which wording and placement would you accept?
12. **Publisher status under s 133.** Does National Law s 133 reach Refer Labs as "a person" advertising a regulated health service when we do not control the service? Does disclosure or a commission-only relationship change the answer, in light of the July 2024 infringement notice issued to Advert Digital Pty Ltd?
13. **Hims confidentiality.** Does the Hims partner agreement treat the relationship as confidential before go-live? Public JS and `/logos/hims.png` currently disclose it (L4).
