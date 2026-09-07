# PartnerStack: 1,236 clicks, one signup, zero revenue
**Read 5 September 2026 from the partner team member report, Sep 2025 to Sep 2026.**

## The numbers

| | |
|---|---|
| Clicks | **1,236** |
| Unique clicks | 1,141 |
| Signups | **1** |
| Paid customers | **0** |
| Transactions | **0** |
| Total revenue | **0** |
| Commissions pending | **0** |
| Commissions paid | **0** |

133 merchant-months across **49 merchants**, March to September 2026.

**One row in 133 records a conversion of any kind:** Superfiliate, August 2026, 18 clicks,
1 signup, 0 paid customers. Everything else is zero in every conversion column.

## Why this is not a reporting artefact

The obvious objection is that the report is scoped wrongly and the conversions sit
somewhere else. Against that: **the Superfiliate signup appears.** The report can record a
conversion and does. There is nothing else to record.

The remaining uncertainty is narrow. This export is aggregated by merchant and month and
carries no sub-ID column, so it cannot be joined to pages. It should be re-pulled as a
**transaction-level or customer-level export** to confirm at row granularity. But the
aggregate columns are unambiguous and the direction is not in doubt.

## Clicks by merchant, top 15

| Merchant | Clicks | Conversions |
|---|---|---|
| Dext | 56 | 0 |
| Superfiliate | 53 | 1 signup |
| Alidrop | 50 | 0 |
| Nutshell | 49 | 0 |
| Reply.io | 48 | 0 |
| AiSDR | 44 | 0 |
| Trainual | 43 | 0 |
| Pipedrive | 43 | 0 |
| Leadpages | 42 | 0 |
| Lindy | 41 | 0 |
| Outgrow | 39 | 0 |
| FlexiQuiz | 38 | 0 |
| Survicate | 38 | 0 |
| Employment Hero | 37 | 0 |
| FullEnrich | 36 | 0 |

## What it means

The B2B software vertical is roughly **48 pages, a quarter of the site**. Search Console
already showed it ranking badly: `/best-crm-small-business-australia` at position 66 with
1,487 impressions and zero clicks, `/compare/hr-payroll` at 49 with 1,294 and one.

This closes the loop. The clicks it *does* generate convert at approximately zero. Not
poorly. Zero, over seven months and 49 merchants.

**It does not say anything about the earners.** Moshy, Mosh, Knose and PetsOnMe are direct
or Commission Factory relationships and appear nowhere in this file. Health and pets remain
unmeasured, not proven-empty.

## What this should change

1. **Stop building or maintaining B2B software pages** until something explains the zero.
   Every hour spent there has a measured return of nothing.
2. **The four partner code emails** (Dext, Brevo, Pipedrive, Leadpages) are now a weaker
   idea than they were. A code might lift a conversion rate of zero, or it might not, and
   those four have 178 clicks between them with no conversions.
3. **Ask PartnerStack directly** whether tracking is functioning for this account. 1,236
   clicks producing one signup is consistent with either a genuinely non-converting audience
   or a broken postback. Both are worth ruling out, and only they can tell you which.
4. **Re-pull as a transaction-level export** so the reconciler can confirm at row level and
   so this is not resting on an aggregate.

The single most valuable question this raises: **is the tracking working at all?** If it is,
the vertical is dead and should be treated that way. If it is not, everything above is
measuring a broken pipe and the vertical has never been tested.
