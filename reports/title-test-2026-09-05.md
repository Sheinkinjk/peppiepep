# Title test: does a figure in the title raise CTR?
**Set 5 September 2026. Read on 5 October 2026.**

## The hypothesis

The two best-converting pages on the site rank *worse* than the seven below and
out-click them several times over. Both carry a specific figure in the title.

| Page | Position | CTR | Title carries a figure |
|---|---|---|---|
| `/moshy` | 16.1 | **2.50%** | yes, `$120 off` |
| `/moshy-review` | 12.7 | **2.03%** | yes, `55% off` |

Against a group ranking better and converting far worse. If the figure is the
cause, these should move at unchanged position.

## Baseline, 92 days to 2 September 2026

| Page | Impr | Clicks | CTR | Position | Old title | New title |
|---|---|---|---|---|---|---|
| `/best-hair-loss-treatment-australia` | 3,710 | 27 | 0.73% | 10.4 | Best Hair Loss Treatment 2026: Mosh vs Dense | Hair Loss Treatment 2026: **Mosh 55% Off** vs Dense |
| `/best-newsletter-platform` | 1,426 | 1 | 0.07% | 10.3 | beehiiv vs Substack vs ConvertKit 2026 | beehiiv vs Substack: **0% vs 10%** of Your Revenue |
| `/mosh-review` | 1,213 | 3 | 0.25% | 10.6 | Mosh Review 2026: Is It Legit, and the Cost | Mosh Review 2026: Is It Legit? Plus **55% Off** |
| `/moshhair` | 980 | 7 | 0.71% | 13.9 | Mosh Discount Code 2026: 55% Off First Order | **unchanged** |
| `/mosh-vs-dense` | 644 | 3 | 0.47% | 11.5 | Mosh vs Dense: Hair Loss Treatment Compared | Mosh vs Dense: Script vs Topical, **55% Off** Mosh |
| `/juniper` | 568 | 1 | 0.18% | 11.5 | Juniper Australia Review 2026: Cost & How It Works | Juniper Review 2026: Free Consult, **30-Day** Refund |
| `/durableai` | 360 | 0 | 0.00% | 11.8 | Durable AI Review 2026: Website Builder | Durable AI 2026: A Site in **30 Seconds**, From **$19** |

**Group total: 8,901 impressions, 42 clicks, 0.47% CTR.**

Meta descriptions were rewritten on the same six to lead with the same figure.
All titles render inside 61 characters including the `| Refer Labs` suffix.

## `/moshhair` is the control, and that it argues against the hypothesis is the reason to trust the test

It already carried `55% Off First Order` and converts at **0.71%**, which is
below `/moshy` and `/moshy-review` despite the figure being present. Left
unchanged deliberately.

If the six move and `/moshhair` does not, the figure is doing something. If the
six do not move either, the figure is not the cause.

**This is what makes the test worth running.** A test whose control agrees with
the hypothesis tells you nothing you did not already believe. `/moshhair` has
carried a figure the whole time and sits at 0.71%, below both benchmark pages, so
the design has a live counter-example built into it rather than only supporting
cases. If the six move anyway, that is a result reached against the evidence
already on the board, which is the only kind worth acting on.

### If the October read comes back null

**Intent is the explanation, and the seven titles revert.** `/moshy` and
`/moshy-review` rank for **branded discount-code searches**, where the searcher
has already decided to buy and is looking for the code. The seven rank for
research and comparison queries, where the searcher is still deciding. On that
reading the 2.50% was never about the title, and no title rewrite reaches it.

Reverting matters. The old titles were not broken, they were differently framed,
and leaving a change in place because it was made is how a site accumulates
alterations nobody can attribute. Revert to the titles recorded in the baseline
table above, and record the null result next to them so the same idea is not
retried in six months as if it were new.

## How to read it on 5 October

1. Pull the same Search Console export, 92 days.
2. **Check position first.** If a page moved more than a point or two, its CTR
   change is confounded and it drops out of the test.
3. Compare CTR at unchanged position, per page, not as a group average. The
   group is dominated by `/best-hair-loss-treatment-australia`, which is 42% of
   the impressions.
4. Titles were changed on 5 September; Google typically re-renders within days
   but the reported average lags. Do not read a partial-window result.

## What this test cannot show

Nothing about AI citation. The Search Console export does not see it, and the
answer-first work was justified on that basis rather than on Google CTR, which
the join showed it does not predict.
