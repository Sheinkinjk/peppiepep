# Partner review: what Moshy, Juniper and Mosh staff would see (1 Oct 2026)

Read-only review. Nothing was edited, committed or deployed.

**How the pages were read.** Every page below was fetched live from referlabs.com.au on 1 Oct 2026 with a Chrome user-agent. The review covered the rendered text, `<title>`, meta and OG descriptions, every JSON-LD block, outbound links with their anchor text, and logo files. The pages already include today's TGA group-1 fixes (commit `063c352c`; `/moshy-eligibility` now 301s). The quiz result copy was read from `src/components/consumer/PathwayQuiz.tsx`, the guide email from `src/lib/weight-loss-guide-email.ts`, and the nav blurbs from `src/lib/nav.ts`, `src/lib/home/nav.ts` and `src/lib/home/content.ts`.

**Partner sites read the same day:**
- **Moshy:** getmoshy.com.au home, `/weight-loss`, `/promotions-terms-and-conditions`, `/terms`, and the page our links open (`/start/eligibility-check-moshy`).
- **Mosh:** getmosh.com.au home, `/promotions-terms-and-conditions` and `/start/referlabs`.
- **Juniper:** myjuniper.com home, `/pricing` and `/faq`. Curl got a 403, so these were read with playwright-core driving the system Chrome.

## Pages reviewed

| URL | Who cares | Issues |
|---|---|---|
| /moshy | Moshy | 6 |
| /moshy-review | Moshy | 4 |
| /moshy-vs-juniper | Moshy, Juniper | 9 |
| /moshy-vs-gp | Moshy | 3 |
| /moshy-alternatives | Moshy, Juniper | 6 |
| /juniper | Juniper | 6 |
| /weight-loss | Moshy, Juniper | 5 |
| /best-weight-loss-telehealth-australia | Moshy, Juniper | 5 |
| /cheapest-weight-loss-telehealth-australia | Moshy, Juniper | 4 |
| /weight-loss-telehealth-cost-australia | Moshy, Juniper | 2 |
| /weight-loss-telehealth-women-australia | Moshy, Juniper | 4 |
| /weight-loss-telehealth-men-australia | Moshy, Mosh, Juniper | 3 |
| /weight-loss-quiz (and the /weight-loss matcher) | Moshy, Juniper | 2 |
| /weight-loss-cost-calculator | Moshy | 1 |
| /weight-loss-guide (and the email) | Moshy, Juniper | 2 |
| /deals | all three | 4 |
| Homepage and header nav | Moshy, Juniper | 2 |
| public/llms.txt (lines 34, 35, 37) | all three | 4 |
| /moshhair | Mosh, Moshy | 4 |
| /mosh-review | Mosh | 2 |
| /best-hair-loss-treatment-australia | Mosh, Moshy | 2 |
| /hair-loss | Mosh | 1 |

The counts overlap, because most issues are patterns that appear on several pages.

**The headline.** Three issues would each come up in the first ten minutes of a meeting:
1. **Moshy:** we cite the wrong document for REFERRAL120's terms, about 40 times.
2. **Moshy:** we print Moshy's own public code next to ours, with a sentence steering commitment-averse readers towards it.
3. **Juniper:** our "$89 consultation" claim does not match the sign-up flow Juniper now publishes, which is a $249 holding fee.

---

## Moshy

### MO-1. REFERRAL120's terms are attributed to a page that does not contain them (would raise in the meeting)

- **Quote:** "with a 3-month minimum commitment **under Moshy's promotion terms**", linked to `getmoshy.com.au/promotions-terms-and-conditions`.
  - Offer JSON-LD on every Moshy page: "Full terms: https://www.getmoshy.com.au/promotions-terms-and-conditions".
  - /moshy FAQ: "Under Moshy's promotion terms it applies to the Moshy weight programs those terms list as eligible".
  - The phrase appears on /moshy, /moshy-review, /moshy-vs-juniper, /moshy-vs-gp, /moshy-alternatives, /weight-loss, /best, /cheapest, /cost, /calculator, /women, /men, /deals, /weight-loss-guide and llms.txt lines 35 and 156.
- **Theirs:** REFERRAL120 does not appear anywhere on the promotions terms page (read 1 Oct). That page lists MOSHYINTRO100, MOSHYDEAL120, HOP50, EOFYSALE150 and others. REFERRAL120's terms exist only as the footnote on the landing page our links open: "Applies to new Moshy customers who purchase a practitioner-assigned weight loss program, excluding dietitian, over the counter or meal replacement plans. One-time use per customer ... subject to a minimum commitment period of 3 months. Terms and conditions apply visit: https://www.getmoshy.com.au/terms".
  - The same mismatch affects the 30-day money-back guarantee. We say it is "on Moshy's promotions terms page", but it sits in `getmoshy.com.au/terms` (the "Moshy Money Back Guarantee" clause).
- **Why they'd care:** Moshy's legal team checks the link, finds no REFERRAL120, and concludes we invented or misattributed terms on an offer they are liable for.
- **Edit:**
  - Replace "under Moshy's promotion terms" with "under the offer terms on Moshy's REFERRAL120 sign-up page".
  - Link that page, or `getmoshy.com.au/terms`, which the footnote itself cites.
  - Change the Offer JSON-LD `description` to match.
  - For the money-back guarantee, say "on Moshy's terms (getmoshy.com.au/terms)".
  - The single source is `REFERRAL120_TERMS` and `MOSHY_PROMO_TERMS_URL` in `src/lib/offers.ts`. Fix them there.
  - **Better:** ask Moshy to add REFERRAL120 to its promotions page.

### MO-2. We publish Moshy's public code beside ours and steer readers towards it (would raise)

- **Quote:** /moshy FAQ and its JSON-LD: "Moshy also publishes its own public code, MOSHYINTRO100, which its promotions terms describe as $100 off the first billing period (read 30 September 2026). REFERRAL120 is $20 larger and adds the 3-month minimum." The same sentence is in llms.txt line 35.
- **Why they'd care:**
  - The line tells a reader who dislikes commitment to use a code that pays us nothing.
  - Most affiliate terms bar publishing codes the affiliate was not issued. Moshy's partnerships team will read it as coupon-site behaviour.
  - It is also incomplete. The terms page lists MOSHYDEAL120 (also $120 off the first month, with no minimum stated), although its stated end date was 28 Feb 2026.
- **Edit:** delete the MOSHYINTRO100 sentence from the /moshy FAQ, the FAQ JSON-LD and llms.txt line 35.

### MO-3. The 3-month minimum is in the /moshy title and repeated as a reason to choose (would raise)

- **Quotes:**
  - Title: "Moshy Discount Code 2026: $120 Off (3-Month Minimum)".
  - /moshy-vs-juniper, under "Choose Moshy if": "A 3-month minimum on the REFERRAL120 offer suits you."
  - /moshy: "May not suit: ... someone who does not want to commit to 3 months, which REFERRAL120 requires" and "budget for three months of the program fee".
  - /cheapest Moshy card: "The $120 offer comes with a 3-month minimum commitment" directly above "$120 off your first order, 3-month minimum".
- **Theirs:** Moshy's homepage says "No lock-in contracts. Cancel anytime" and "30-day money-back guarantee, with no lock-in contracts". Its Commit & Save copy says "No lock-in if treatment isn't right for you" and "You may opt-out early of a 3-month commitment if your circumstances change".
- **Why they'd care:** their marketing team sees a partner leading with the one restriction their own brand promises away. The disclosure has to stay (ACL, and it was approved today). Using it as a selling point, and repeating it on the same card, is our framing.
- **Edit:**
  - Delete the "Choose Moshy if: A 3-month minimum ... suits you" bullet.
  - Delete the duplicate bullet on the /cheapest card.
  - Ask Moshy whether the Commit & Save early opt-out applies to REFERRAL120 customers. If it does, add one clause: "Moshy's terms allow early opt-out if treatment is not right for you."
  - Keep the minimum in the lead, the meta description and the terms bullets. Whether it must also stay in the `<title>` is for the lawyer, so leave the title until then.
  - The real fix is commercial: see question 1 below.

### MO-4. Men are sent to Moshy, with "it's a women's clinic, but" framing (would raise)

- **Quotes:**
  - /weight-loss-telehealth-men-australia lead: "For men in Australia, the weight-management telehealth service we cover is Moshy. It describes itself as an online women's health clinic, but its services are open to anyone a practitioner assesses as suitable".
  - FAQ: "Why do some weight loss services market to men and others to women? Mostly marketing."
  - The quiz sends every man on the default path to the Moshy affiliate link.
- **Theirs:** Mosh's own homepage banner: "$100 off your 1st month of weight loss with code MOSHINTRO100", and "Weight loss" sits in Mosh's "What we treat" menu. Moshy's homepage title ends "for Women".
- **Why they'd care:**
  - The group runs a men's weight program under Mosh, and we route men to its women's brand.
  - We also call both brands' positioning "mostly marketing".
  - This is the open gender mismatch already recorded in memory, and Mosh/Moshy staff will notice it.
- **Edit:**
  - Ask in the meeting where men should go, and whether REFERRAL120 or a Mosh code covers Mosh weight.
  - Until then, change the lead to "Moshy, the women's health brand of the Mosh group, takes anyone a practitioner assesses as suitable".
  - Replace "Mostly marketing." with a plain answer about who each program says it is designed for.

### MO-5. /moshy-vs-gp contradicts itself and calls the GP cheaper (would raise)

- **Quotes:**
  - "Your GP is the cheaper route because Medicare offsets part of the consult". The same page's FAQ says "Neither is cheaper for everyone".
  - "If cost and continuity matter most, start with your GP."
  - "Moshy will never know your history the way a GP you have seen for a decade does."
  - "though it is focused on weight rather than your whole health".
  - "A GP visit has no discount code attached."
  - Table: "Continuity: Focused on one program", although Moshy covers weight, hair and skin.
- **Why they'd care:** a page carrying Moshy's name in the slug argues for the GP in its own answer paragraph, and contradicts itself while doing it.
- **Edit:**
  - Answer paragraph: "A GP consultation is partly offset by Medicare, and Moshy charges one program fee; which costs less depends on how often you are seen."
  - Replace "never know your history ..." with "Your GP holds your full history; Moshy works from your questionnaire and consultation."
  - Delete "A GP visit has no discount code attached."

### MO-6. A "Moshy alternatives" page that leads with the GP (would raise)

- **Quotes:**
  - Title: "Moshy Alternatives in Australia 2026: Who Else Does This?"
  - The first listed alternative is "1. Your GP ... If you would book the appointment, this is a strong option."
  - FAQ: "How is Juniper different from Moshy? **Mostly in the extras.**"
  - "with 1:1 coaching as a paid add-on".
  - "We earn a commission if you sign up through the Moshy or Juniper link s on this page ... We earn from both of them." The page has no Juniper affiliate link (only `/juniper`), and "link s" is a rendering glitch.
- **Why they'd care:** the page ranks on Moshy's brand name and moves readers off Moshy. Their partnerships team may ask for it to be renamed or removed.
- **Edit:**
  - Delete "Mostly in the extras."
  - Make the earnings line Moshy-only, and fix "link s".
  - Put Juniper before the GP, or present the two as unnumbered options.
  - Ask Moshy whether they object to the slug. Retiring it would be a 301 to /moshy-vs-juniper.

### MO-7. A free first consultation is presented as Juniper's advantage, but Moshy's is free too (might notice)

- **Quote:** /moshy-vs-juniper, under "Choose Juniper if": "You would like no charge for the initial consultation before you commit (program fees apply)."
- **Theirs:** Moshy's homepage and weight-loss page buttons say "Start your free consult" and "Take free quiz".
- **Edit:** delete the bullet. If it stays, say that Moshy also advertises a free consult.

### MO-8. Contradictory statements about whether the code is applied automatically (might notice)

- **Quotes:**
  - /moshy lead: "applied through our link".
  - /weight-loss: "applied through our link".
  - /moshy-vs-juniper: "Both links apply the Refer Labs code automatically."
  - Elsewhere: "if it is not already applied at checkout, enter REFERRAL120".
  - /moshy-alternatives: "Enter it at checkout if it isn't shown."
- **Theirs:** the landing page says "Use code: REFERRAL120 at checkout".
- **Why they'd care:** the claims contradict each other, and "if it isn't shown" implies their link is unreliable.
- **Edit:** use one line everywhere: "Our link opens Moshy's REFERRAL120 page; enter REFERRAL120 at checkout, as that page says." Drop "automatically".

### MO-9. Repeating "open to anyone" as the contrast with Juniper (might notice)

- **Quotes:** "Moshy ... takes anyone a practitioner assesses as suitable" in the leads of /moshy-vs-juniper and /best, on /moshy-alternatives, in the /weight-loss FAQ and in the quiz. The quiz also says: "Want a program designed for women, with 1:1 coaching as an option? Juniper is built for women."
- **Why they'd care:** Moshy markets itself as the women's brand. Our copy makes Juniper the "for women" option and Moshy the catch-all.
- **Edit:**
  - Keep "open to anyone a practitioner assesses as suitable" once, in the comparison table.
  - Drop it from leads and FAQ answers.
  - Change the quiz line to "Juniper is another women-focused program, with 1:1 coaching as an option."

### MO-10. Women with hair loss are sent to a GP (might notice)

- **Quote:** /best-hair-loss-treatment-australia: "Sudden or patchy loss, or hair loss in a woman, is a reason to start with a GP" and "you are a woman: the online service compared here is for men".
- **Theirs:** "Hair regrowth" is in Moshy's own homepage navigation.
- **Edit:** "Mosh's hair service is for men; Moshy, its women's brand, runs a hair service for women." This needs no link and no claim.

### MO-11. Exclusivity and commission mechanics stated publicly (might notice)

- **Quote:** llms.txt line 34: "REFERRAL120 ... REFERAL55 ... JARREDKFC ... are **unique to Refer Labs**. They are not published by the providers or available through other publishers, and the commission is earned on the code itself." /deals labels each code "Refer Labs only".
- **Theirs:** REFERRAL120 is published on Moshy's own landing page.
- **Why they'd care:** "the commission is earned on the code itself" discloses the deal terms. "Not published by the providers" is untrue for Moshy.
- **Edit:**
  - Cut the line to: "REFERRAL120, REFERAL55, JARREDKFC and referlabs are codes issued to Refer Labs."
  - Delete "not published by the providers" and the commission clause.
  - Get exclusivity confirmed in writing in the meetings.

### MO-12. The landing page is the TGA exposure (would raise, compliance)

- **What we link to:** every Moshy CTA opens `/start/eligibility-check-moshy`. That page (read 1 Oct) has:
  - "Prescription treatments may come in tablet or injectable form";
  - weight-loss testimonials ("Bianca, 34 Lost 13kgs 3 months");
  - a BMI calculator;
  - "Weight loss treatment programs typically take 2 to 4 weeks of daily use before visible changes appear".
- **Why they'd care:** this is still open (audit H6). It is Moshy's page, but our links and code carry readers there. Their compliance team will want to know we raised it.
- **Edit:** ask Moshy for a clean affiliate URL (see the questions below).
- The "Get told when the Moshy offer changes" email capture on /moshy-review (audit M6) is also still live.

### MO-13. Minor and sloppy items (minor)

- /moshhair calls Moshy "Mosh's sister brand". Every other page says "brother brand", as Moshy's own FAQ does.
- /deals renders "Moshy 's promotion terms" and "Mosh 's" with a stray space.
- /moshy-vs-gp says "Online questionnaire, about 10 minutes"; /moshy says "takes a few minutes". Moshy gives no figure.
- /moshy-review: "its weight-management program is the part most people come looking for" is unsourced. Delete it.
- /moshy-review, /moshy-vs-gp and /moshy-alternatives breadcrumb to "Guides", while the other Moshy pages breadcrumb to "Weight loss".
- `public/logos/moshy.png` is a 128px favicon-grade "m" that looks soft at card size. Ask Moshy for a brand-kit logo.

---

## Juniper

### JU-1. "$89 consultation" against Juniper's published $249 holding fee (would raise in the meeting)

- **Quotes:**
  - /juniper title: "Juniper Discount Code 2026: JARREDKFC Waives the $89 Consult".
  - /juniper H1: "JARREDKFC waives the $89 consultation".
  - /juniper FAQ: "(source: Juniper's affiliate handbook, confirmed 23 September 2026; **no public Juniper page states it**)".
  - /deals: "Initial consultation waived, valued at $89", with the row dated "Checked 23 Sept 2026".
  - The same figure is on every Juniper card and in llms.txt line 37.
- **Theirs:** myjuniper.com/pricing (read 1 Oct), under "How it works": "1. Pay $249 holding fee, refunded if ineligible or you choose not to proceed. 2. Phone consultation with an Australian practitioner. 3. If program and pricing are confirmed, holding fee credited to first order." No public page mentions an $89 consultation fee.
- **Why they'd care:**
  - We headline a value Juniper does not publish, for a fee its current flow does not appear to charge.
  - We print that it is not on any public page.
  - "Checked" on /deals implies we read it on Juniper's site.
  - Under ACL s29 the offer value is the claim. If the holding-fee flow replaced the $89 consult, every page is now wrong.
- **Edit:**
  - **Confirm before or in the meeting** what JARREDKFC does under the holding-fee flow.
  - Delete "no public Juniper page states it" now.
  - Change the /deals label from "Checked" to "Confirmed with Juniper".
  - Fix the garbled Offer JSON-LD ("Initial consultation waived, valued at $89 on the initial consultation for a new patient") to "No charge for the initial consultation (valued by Juniper at $89); program fees apply."

### JU-2. The comparison is built so that Moshy reads fuller (would raise)

**Quotes (/moshy-vs-juniper, /best, /women, /weight-loss and /cheapest cards):**
- Juniper's card tagline: "A weight program designed for women, **with 1:1 coaching as an add-on**." Moshy's: "**An all-inclusive** weight program".
- Table, "Practitioner support":
  - Juniper: "Unlimited follow-up consultations with an Australian practitioner".
  - Moshy: "Unlimited practitioner support from a care team including doctors, nurses, dietitians, psychologists and exercise physiologists".
- /cheapest card bullet: "1:1 coaching is a paid add-on".
- /women checklist: "Pricing shown in full before you commit, including add-ons such as 1:1 coaching".
- /best: "Juniper sells 1:1 coaching as an add-on".

**What Juniper's own pages say:**
- /pricing lists under "Everything in your program":
  - "Unlimited practitioner support";
  - a "Guided exercise program, Designed with physiotherapists";
  - "Meal plans and recipes";
  - "AI Health Companion, ... 24/7 support";
  - "Health Coaching, Chat with dietitians in the Juniper app";
  - a private community and progress tracking.
- Home: "Unlimited practitioner support: Nurses, pharmacists, and clinicians when you need them".
- FAQ: practitioners are "qualified, specialist GPs and nurse practitioners. They include Fellows of the Royal Australian College of General Practitioners (FRACGP)".

**Why they'd care:**
- We list Moshy's care team and accreditations (on /moshy and /moshy-review) but not Juniper's FRACGP practitioners, exercise program or AI companion.
- The one thing we repeat about Juniper is that something costs extra.

**Edit:**
- Card tagline: "A weight program designed for women, with dietitian chat, meal plans and a physio-designed exercise program."
- Move the 1:1 coaching add-on into the table only, once.
- "Practitioner support", Juniper column: "Unlimited practitioner support from specialist GPs (including FRACGP Fellows) and nurse practitioners, with nurses and pharmacists on the medical support team".
- Delete the /cheapest "paid add-on" bullet and "such as 1:1 coaching" from the /women checklist.
- Add the practitioner line to /juniper's At a glance, to match /moshy.
- The single source is `src/lib/compare/weight-inclusions.ts`.

### JU-3. Bluetooth scales listed as included (might notice)

- **Quote:** table row "Community and tracking": "Private community; app tracking with Bluetooth scales".
- **Theirs:** the /pricing program cards say "Bluetooth scales, delivered (optional add-on)". The homepage lists them under "Free tracking tools", so Juniper's own pages disagree with each other.
- **Edit:** "Private community; app tracking, with Bluetooth scales available". Ask which version is current.

### JU-4. START50 printed next to JARREDKFC (would raise)

- **Quote:** /juniper FAQ and its JSON-LD: "Separately, Juniper's own homepage advertises START50: 'Save $50 with code START50. T&Cs apply.' ... Check Juniper's terms for which one applies to your first order." The same text is in llms.txt line 37.
- **Theirs:** "START50 can't be used in conjunction with any other offer" (/pricing FAQ).
- **Why they'd care:** we invite readers to pick between the two codes. A reader who types START50 may lose the affiliate attribution, and the handbook may restrict promoting codes not issued to us.
- **Edit:** delete the START50 sentences from /juniper, its FAQ JSON-LD and llms.txt line 37, unless Juniper says it wants them.

### JU-5. Routing, ordering and prominence favour Moshy (would raise)

- **The quiz** (`PathwayQuiz.tsx`):
  - Juniper only wins when the reader is a woman AND chooses coaching-led.
  - The default, "unsure" and every male path go to Moshy.
  - The Moshy result's button goes straight to the affiliate link. The Juniper result's button goes to `/juniper` (`sponsored: false`), adding a click.
- **Ordering:**
  - /best's ItemList JSON-LD puts Moshy at position 1 on a "Best ..." list.
  - /moshy-vs-juniper shows the Moshy card first but the Juniper column first in the table.
  - The nav dropdown and the guide list Moshy first.
- **Prominence:**
  - The homepage gives Moshy a brand card ("$120 off with code REFERRAL120"). Juniper appears only as a link name.
  - /weight-loss-telehealth-cost-australia has a Moshy CTA and no Juniper card.
- **Why they'd care:** Juniper's partnerships team will try the quiz and read the hub. Our own hub-neutrality rule says to list alphabetically with identical rows.
- **Edit:**
  - Point the Juniper quiz result button at Juniper directly. HubProviders already renders the required disclosure; the quiz result would need it too.
  - List the providers alphabetically in the ItemList, cards, table and nav.
  - Add a Juniper row to the cost page's "two ways services charge" section.

### JU-6. The gender contrast implies Juniper turns men away (might notice)

- **Quotes:**
  - /weight-loss-telehealth-men-australia: "Juniper, the other service we compare, is designed for women" (twice).
  - /moshy-alternatives: "2. Juniper, designed for women".
  - Repeatedly paired with "Moshy ... takes anyone".
- **Theirs:** Juniper's FAQ lists the people the program is generally not appropriate for: pregnant or breastfeeding, not meeting the overweight definition, over 75. Sex is not on the list. Its homepage tagline is "Modern Healthcare Treatments For All Women".
- **Edit:** quote their own words once ("dedicated to helping women") and drop the "takes anyone" contrast (see MO-9).

### JU-7. The handbook disclosure is correct, but the placement around it is untidy (minor)

- **Pass:** the mandated sentence appears verbatim on all 6 pages that carry the Juniper affiliate URL: /juniper, /moshy-vs-juniper, /weight-loss, /best, /cheapest and /women. It sits next to the first Juniper link or straight after the lead.
- **Untidy:**
  - It is stacked with our own line in a different voice ("Refer Labs may earn a commission ..." then "... I may earn a small commission"). The pair reads as a duplicate.
  - "This post" sits on a web page. That wording is contractual, so leave it.
  - /moshy-alternatives claims Juniper links it does not have (MO-6).
- **Edit:** on /juniper, drop our generic line, since Juniper's covers it. Leave the wording alone.
- **Ownership:** we describe Juniper only as "a digital health clinic by Eucalyptus", which matches Juniper's own footer. No page or llms.txt line mentions Hims. Leave it unless they ask.

### JU-8. Minor items (minor)

- The /juniper `<title>` lacks "| Refer Labs", which every sibling page has.
- `/weight-loss` and the nav label the page "Juniper review" while its title is "Juniper Discount Code".
- `/weight-loss-guide`: "no charge for its initial consultation (program fees apply)" omits that this comes through JARREDKFC. It reads as if Juniper's consult is always free.
- `public/logos/juniper.png` is a 3840x2160 wordmark on a lime background. It looks like a logo-aggregator file, rendered into square slots. Ask for the brand-kit mark.
- The title pattern "Juniper Discount Code" uses their trademark as a coupon term. Check the handbook's brand-use clause (question below).

---

## Mosh (brief)

### MH-1. REFERAL55 is not on Mosh's promotions page either (might notice)

- **Quote:** "full terms at getmosh.com.au/promotions-terms-and-conditions" (/moshhair, /mosh-review, /hair-loss, /best-hair-loss, Offer JSON-LD).
- **Theirs:** that page lists HAIR55 ("55% off your first order (covering the first 3 months of hair loss treatment)") but not REFERAL55. Our code is shown only on `/start/referlabs` ("Get 55% off with REFERAL55 Use at checkout. T&Cs apply").
- **Edit:** the same fix as MO-1. Ask Mosh to list REFERAL55.

### MH-2. Two different statements about how long the discount lasts (minor)

- **Quotes:** "REFERAL55 takes 55% off the first order only" and, on the same page, "Mosh's promotion terms describe its first-order hair discounts as covering the first three months".
- **Edit:** "55% off a new customer's first order, which on Mosh's hair programs covers the first three months; later orders are at the standard rate." Confirm with Mosh that REFERAL55 works like HAIR55.

### MH-3. GP framing and women (might notice)

- **Quotes:**
  - "A GP may cost less after Medicare" (/moshhair FAQ "Is Mosh worth it?").
  - "Women, and anyone with sudden or patchy loss, are better served by a GP" (/best-hair-loss).
- **Edit:** the women's line as in MO-10. "A GP consult may be bulk-billed" is factual and enough; drop "may cost less".

### MH-4. Sloppy items (minor)

- "Should you use Mosh ?" and "Mosh 's promotion terms" render with stray spaces.
- /moshhair's offer box reads "Checked & verified by Refer Labs, September 2026". Its table on the same page says "30 Sept 2026".
- "sister brand" (see MO-13).

### MH-5. The co-branded landing page carries Refer Labs' name (would raise, compliance)

- **What is on it:** `getmosh.com.au/start/referlabs` is headed "Mosh and Refer Labs Have Partnered Up". It shows:
  - a timeline ("Medication should start working", "6 to 9+ months Regrowth phase");
  - "Clinically proven treatments";
  - a before-and-after testimonial ("Meet Ben ... pictures are at 0, 6 months, and 12 months").
- **Why it matters:** this puts our name on efficacy and testimonial content. It is already a lawyer item, but it belongs on Mosh's agenda.

---

## Questions for the meetings

### Moshy (and Mosh)
1. REFERRAL120 carries a 3-month minimum, but MOSHYINTRO100 does not, and MOSHYDEAL120 did not. Can REFERRAL120 drop the minimum, or match MOSHYDEAL120? It is the one thing our pages now lead with that contradicts your "no lock-in" message.
2. Does the Commit & Save early opt-out ("if treatment isn't right for you") apply to REFERRAL120 customers? Does the 30-day money-back guarantee apply alongside it?
3. Can REFERRAL120 be added to your promotions terms page, so we have a public page to cite?
4. Can you give us a clean affiliate landing URL without the BMI calculator, injectable or treatment-form references, kg testimonials, or "eligibility-check" in the slug? Mosh: the same for `/start/referlabs` (the regrowth timeline and Ben's photos). Our name is on that page.
5. Is REFERRAL120 issued only to Refer Labs, and is REFERAL55? Can you confirm that in writing?
6. Your landing page carries a referrer disclosure ("The referrer is not providing medical advice ... receives a fee per sale"). Do you require specific disclosure wording on our side, as Juniper does?
7. Where should men looking for weight management go: Moshy or Mosh's weight program? Is there a Mosh weight code for us?
8. Do you object to us publishing your public codes (MOSHYINTRO100), to pages titled "Moshy alternatives" and "Moshy vs your GP", or to "Moshy discount code" in titles?
9. Should our pages mention Moshy's women's hair service?
10. Can you send brand-kit logos?

### Juniper
1. What does JARREDKFC do now that sign-up starts with a $249 holding fee? Is "no charge for the initial consultation, valued at $89" still accurate, and may we print the $89?
2. Do you mind us showing START50 next to JARREDKFC? If a reader uses START50, does the attribution survive through our link?
3. Does the handbook restrict trademark use in titles ("Juniper Discount Code") or coupon-style pages?
4. Are Bluetooth scales included or an add-on? How do you want 1:1 coaching and dietitian chat described, so we do not frame the add-on as a cost?
5. Is the disclosure sentence we use still the current mandated wording post-acquisition? Does it need to sit in a set position relative to the link?
6. Do you want Juniper described as "a digital health clinic by Eucalyptus", or with reference to Hims & Hers?
7. Are there approved claims about your practitioners (FRACGP GPs, nurse practitioners) or your program that you would like us to use?
8. Can you send brand-kit logos?
