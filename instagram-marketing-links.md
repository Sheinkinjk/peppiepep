# Instagram deep-links (copy-paste)

The problem this fixes: right now most visitors land on the **homepage** and never reach a money page (Apollo got 1 view). Every Instagram post/bio should link **straight to a money page**, with a tracking tag so GA4 tells you which post worked.

**Rule of thumb:** never link a post to the homepage. Link to the page that matches the post.

---

## Ready links (paste these into posts / Stories link sticker)

| Post is about… | Offer | Paste this link |
|---|---|---|
| Weight loss (Moshy) — **biggest earner** | $120 off first order | `https://referlabs.com.au/moshy?utm_source=instagram&utm_medium=social&utm_campaign=moshy_120off` |
| Weight loss (general/compare) | — | `https://referlabs.com.au/weight-loss?utm_source=instagram&utm_medium=social&utm_campaign=weightloss_hub` |
| Juniper (women's weight loss) | Free first consultation | `https://referlabs.com.au/juniper?utm_source=instagram&utm_medium=social&utm_campaign=juniper_freeconsult` |
| Hair loss (Mosh) | 55% off first order | `https://referlabs.com.au/moshhair?utm_source=instagram&utm_medium=social&utm_campaign=mosh_55off` |
| Hair loss (general/compare) | — | `https://referlabs.com.au/hair-loss?utm_source=instagram&utm_medium=social&utm_campaign=hairloss_hub` |
| Home batteries (Apollo) | $500 off + federal rebate | `https://referlabs.com.au/apollo-energy-group?utm_source=instagram&utm_medium=social&utm_campaign=apollo_500off` |
| Pet insurance (Knose) | First 2 months free | `https://referlabs.com.au/knose?utm_source=instagram&utm_medium=social&utm_campaign=knose_2mf` |
| Business loans | — | `https://referlabs.com.au/business-loans?utm_source=instagram&utm_medium=social&utm_campaign=business_loans` |

---

## Bio link

You only get one bio link, so point it at **whatever you're actively promoting this week**, tagged as bio:

- Promoting batteries this week → `https://referlabs.com.au/apollo-energy-group?utm_source=instagram&utm_medium=social&utm_campaign=bio`
- Promoting weight loss → `https://referlabs.com.au/moshy?utm_source=instagram&utm_medium=social&utm_campaign=bio`

If you use Linktree/Beacons, give **each** button its own link from the table above (change `utm_campaign` to something like `bio_moshy`, `bio_apollo`).

---

## How to see which post worked (GA4)

1. GA4 → **Reports → Acquisition → Traffic acquisition**
2. Change the dimension dropdown from "Session default channel group" to **Session campaign**
3. You'll see rows like `apollo_500off`, `moshy_120off` with sessions + conversions next to each.

For a specific post over time: **Explore → Free form**, drag in **Session campaign** as the row and **Sessions** + **Key events** as values.

> Note: GA4 only counts visitors who accept the cookie banner, so the totals undercount real traffic — but the *relative* comparison between campaigns is still valid (which post beat which).

---

## The one habit that matters

Every time you post: pick the matching row, paste that link. That's it. Within a week or two GA4 will show you which topics and offers actually convert, so you can double down instead of guessing.
