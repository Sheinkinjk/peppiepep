# Four partner emails: requesting a discount code
**Drafted 5 September 2026. Jarred to send.**

All four are PartnerStack programs we are already accepted into, with a live
tracked link and a published review page. None has a code. The evidence for
asking is the same in each case: Search Console shows people searching for that
merchant's discount code, finding us, and finding nothing to use.

Figures below are from the 92-day Search Console export to 2 September 2026.

Send from `jarred@referlabs.com.au`. Keep them short; a partner manager reads
the first two lines and the ask.

---

## 1. Dext — highest code-query volume of the four

**To:** the Dext partner/affiliate manager (PartnerStack)
**Subject:** Refer Labs: discount code request for Dext

> Hi [name],
>
> I run Refer Labs, an independent Australian comparison site. We have a live
> Dext review page and we are in the PartnerStack program.
>
> Over the last 92 days, Google showed our pages for Dext discount-code searches
> 51 times across three query variants, best position 20.9. Those readers arrive
> looking for a code, find we do not have one, and leave. Our Dext page itself
> drew 122 impressions in the same period.
>
> Could Refer Labs be issued a publisher discount code for Dext? Even a modest
> first-month or annual-plan discount converts that intent instead of wasting it.
> Two things I would need to publish it accurately: the exact code string, and
> what it discounts, since we state the object of every offer explicitly rather
> than saying "X% off" without naming what.
>
> Happy to share the page and our disclosure standards if useful.
>
> Jarred Krowitz
> Refer Labs (Pepform Pty Ltd, ABN 32 660 008 159)
> referlabs.com.au/dext

---

## 2. Brevo

**To:** the Brevo affiliate manager (PartnerStack)
**Subject:** Refer Labs: discount code request for Brevo

> Hi [name],
>
> I run Refer Labs, an independent Australian comparison site, and we are in the
> Brevo affiliate program with a live review page.
>
> In the last 92 days our pages were shown 30 times for Brevo coupon and
> discount-code searches, and the Brevo page drew 148 impressions overall. We
> currently have nothing to offer those readers.
>
> Is a publisher-specific Brevo code available to us? If so I need the exact
> code string and the conditions it carries, so the page can state what it
> discounts and when it expires rather than leaving a reader to find out at
> checkout.
>
> Jarred Krowitz
> Refer Labs (Pepform Pty Ltd, ABN 32 660 008 159)
> referlabs.com.au/brevo

---

## 3. Pipedrive

**To:** the Pipedrive affiliate manager (PartnerStack)
**Subject:** Refer Labs: publisher discount code for Pipedrive?

> Hi [name],
>
> I run Refer Labs, an independent Australian comparison site. We have a
> Pipedrive review page live and are in the affiliate program.
>
> Google showed our pages 23 times in the last 92 days across four Pipedrive
> discount, promo and coupon queries. Our page currently answers those searches
> by explaining that the 14-day trial is what exists, which is honest but
> converts nothing.
>
> Is there a publisher code we could hold? A first-year or annual-plan discount
> would let us answer that query properly. I would need the code string and its
> conditions, and I would date the claim on the page so it is clear when it was
> verified.
>
> Jarred Krowitz
> Refer Labs (Pepform Pty Ltd, ABN 32 660 008 159)
> referlabs.com.au/pipedrive

---

## 4. Leadpages

**To:** the Leadpages affiliate manager (PartnerStack)
**Subject:** Refer Labs: discount code request for Leadpages

> Hi [name],
>
> I run Refer Labs, an independent Australian comparison site, with a live
> Leadpages page and an active affiliate relationship.
>
> Our pages appeared 19 times in the last 92 days for Leadpages discount and
> coupon searches, at a best position of 23.2. The Leadpages page drew 43
> impressions overall.
>
> Could we be issued a publisher discount code? If one exists I need the exact
> string and what it applies to, so the page can state it accurately.
>
> Jarred Krowitz
> Refer Labs (Pepform Pty Ltd, ABN 32 660 008 159)
> referlabs.com.au/leadpages

---

## If a code comes back

Do not publish it from the email alone. The onboarding standard in CLAUDE.md
applies: verify the code and its conditions on the merchant's own page or in the
network dashboard, write down what it actually discounts, add it to `offers.ts`
with a `verified` date, name the literal string in `llms.txt`, and put the amount
in the page `<title>`. Then run `npm run check-offers`.

**Note the correction that prompted these emails.** An earlier audit reported
these four as merchants whose code we already held. We hold four codes in total:
Moshy, Mosh, Knose and PetsOnMe. The other three matched a string search over
`offers.ts` comments rather than the `DEALS` rows.
