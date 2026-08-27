import { OFFER_FACTS, checkedOn } from "@/lib/offers";

/**
 * The answer to "what is the <brand> discount code", stated so it survives being
 * lifted out of the page.
 *
 * Measured, August 2026: of 35 places a code appeared on this site, exactly one
 * carried a sentence that answered that question on its own. Everywhere else the
 * brand, the amount, the code and what it applies to were spread across separate
 * elements, and an answer engine will not assemble those. /moshy carried the one
 * sentence that did, and it is the site's best earner.
 *
 * The sentence is passed in per page rather than generated, deliberately. One
 * template repeated across two dozen pages is the repetition-as-slop pattern
 * CLAUDE.md bans, and it is visible to any reader who lands on two of our pages.
 * Each caller phrases the same facts to fit its own context: a comparison page
 * frames the code against the other option, a review page frames it as what the
 * reader gets, a hub frames it as what is currently available.
 *
 * What is NOT passed in is the check date. It is read from OFFER_FACTS so a code
 * and its date cannot drift apart, and so a page cannot quietly print the global
 * sweep stamp for an offer nobody checked. Where a code has no reading date on
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
        <p className="mt-2 text-[12px] font-medium text-[#5c6b63]">
          Read off {facts.brand}&apos;s own page on {checked}. Offers can change, so check the current terms before
          you sign up.
        </p>
      ) : (
        /* Says the absence out loud. Without this the nearest date to the code is
           the page's own "Last updated" stamp, which reads to a person and to an
           answer engine as the day we verified the offer. A borrowed date is a
           worse claim than no date, so the gap is named instead of filled. */
        <p className="mt-2 text-[12px] font-medium text-[#5c6b63]">
          We have not recorded a date for reading this offer off {facts.brand}&apos;s own page. Any date shown
          elsewhere on this page is when the page was updated, not when the offer was checked. Confirm the current
          terms before you sign up.
        </p>
      )}
    </div>
  );
}
