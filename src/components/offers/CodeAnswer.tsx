import { OFFER_FACTS, checkedOn } from "@/lib/offers";

/**
 * The answer to "what is the <brand> discount code", stated so it survives being
 * lifted out of the page.
 *
 * Measured on 27 August 2026, before this component existed: of the 35 places a
 * code then appeared on the site, exactly one carried a sentence that answered
 * that question on its own. Everywhere else the brand, the amount, the code and
 * what it applies to were spread across separate elements, and an answer engine
 * will not assemble those. /moshy carried the one sentence that did, and it is
 * the site's best earner.
 *
 * Not every code needs this. Where a page already answers the question, adding a
 * second sentence made the reader read the same fact twice in one screenful, so
 * it was removed again from /knose, /weight-loss, /hair-loss, /petsonme and
 * /pet-insurance: HubOffer and PetOfferPair carry terms this omits, and their
 * blocks won. Check what a page already says before adding this to it.
 *
 * The sentence is passed in per page rather than generated, deliberately. One
 * template repeated across two dozen pages is the repetition-as-slop pattern
 * CLAUDE.md bans, and it is visible to any reader who lands on two of our pages.
 * Each caller phrases the same facts to fit its own context: a comparison page
 * frames the code against the other option, a review page frames it as what the
 * reader gets, a hub frames it as what is currently available.
 *
 * What is NOT passed in is the check date. It is looked up from the code's DEALS
 * row, the single place a reading date is stored, so a code and its date cannot
 * drift apart and a page cannot quietly print the global sweep stamp for an
 * offer nobody checked. Where a code has no reading date on
 * file the line is simply absent: no date is honest, a borrowed one is not.
 */
export default function CodeAnswer({
  code,
  className = "",
  children,
}: {
  code: string;
  className?: string;
  children: React.ReactNode;
}) {
  const facts = OFFER_FACTS[code];
  if (!facts) return null;
  const checked = checkedOn(code);

  return (
    <div className={`rounded-2xl border border-[#cfe6da] bg-[#e8f5ee] px-5 py-4 ${className}`} data-code-answer={code}>
      <p className="text-[15px] leading-relaxed text-[#2b362f]">{children}</p>
      {checked ? (
        /* Date only, no "offers can change" caveat. CLAUDE.md gives that caveat a
           single home per page, the disclaimer, and /deals stacks four of these
           blocks: the caveat rendered four times back to back, which is the
           repetition rule breaking inside the fix for it. The date is the part
           that has to sit beside the code; the caveat already appears once per
           page via the disclaimer, HubOffer, PetOfferPair or the offers table. */
        <p className="mt-2 text-[12px] font-medium text-[#5c6b63]">
          Read off {facts.brand}&apos;s own page on {checked}.
        </p>
      ) : (
        /* Dormant since 27 August 2026: every code in OFFER_FACTS now carries a
           reading date, so nothing renders this branch today.

           It stays as the guard, not as leftovers. Knose reached production with
           no date at all, and the nearest date to its code was the page's own
           "Last updated" stamp, which reads to a person and to an answer engine
           as the day we verified the offer. A borrowed date is a worse claim than
           no date. If a future code arrives undated, this names the gap instead
           of letting the stamp stand in again. Do not delete it to tidy up. */
        <p className="mt-2 text-[12px] font-medium text-[#5c6b63]">
          We have not recorded a date for reading this offer off {facts.brand}&apos;s own page. Any date shown
          elsewhere on this page is when the page was updated, not when the offer was checked.
        </p>
      )}
    </div>
  );
}
