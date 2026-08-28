import Link from "next/link";

/**
 * States, beside the CTA, which of the providers on a comparison page we
 * actually earn from.
 *
 * Every page here that names Juniper alongside a competitor carries Moshy's
 * affiliate link and none for Juniper, because our Juniper referral link sits
 * on the Juniper review page only. Read cold, that asymmetry looks like we are
 * steering. Read with this line, it is the opposite: the one page that could
 * pay us is the one we deliberately do not put a link on.
 *
 * Deliberately one quiet line rather than a bordered card. The first version
 * was a boxed callout sitting directly under the h1, which stacked a third
 * trust block on top of EditorialMeta's independence statement and the
 * information-only notice before the reader reached a word of content. A
 * disclosure belongs next to the link it describes, where it is read in
 * context, not in front of the article as a toll gate.
 *
 * Deliberately describes what is observable on our own site rather than
 * asserting a partner's terms back at them. We hold the arrangement, not the
 * authority to characterise it.
 *
 * PILOT-NON-PARTNER. Three shapes, because the true sentence differs by who is
 * named, and the component used to have only the first:
 *
 *   1. One name WITH a referral link elsewhere (Juniper). "Our Juniper referral
 *      link sits only on our Juniper review." True, and the strongest version.
 *   2. One name with NO arrangement at all (Pilot). The sentence above would be
 *      false: there is no Pilot referral link and no Pilot review. Says instead
 *      that no commercial arrangement exists.
 *   3. Several names (Juniper and Pilot). Neither pays us on that page, but the
 *      reasons differ, and stating one reason for both would be wrong. Says only
 *      what is true of all of them: we earn nothing from any of them here.
 *
 * Do not pass `noEarnHref` for a provider with no referral link anywhere. The
 * sentence it unlocks is a claim about a page that has to exist.
 */
export default function EarningsBalanceNote({
  earnFrom,
  noEarnFrom,
  noEarnHref,
  className = "",
}: {
  earnFrom: string;
  /** One name, or several where we earn from none of them on this page. */
  noEarnFrom: string | string[];
  /** Only where that provider has a referral link on its own review page. */
  noEarnHref?: string;
  className?: string;
}) {
  const names = Array.isArray(noEarnFrom) ? noEarnFrom : [noEarnFrom];
  const listed =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
  const single = names.length === 1 && noEarnHref;

  return (
    <p className={`text-xs leading-relaxed text-[#6e7b74] ${className}`}>
      We earn a commission if you sign up through the {earnFrom} link above, at no extra cost to you.{" "}
      {single ? (
        <>
          We earn nothing from {listed} here: our {listed} referral link sits only on our{" "}
          <Link href={noEarnHref} className="underline hover:text-[#3d4b44]">
            {listed} review
          </Link>
          .
        </>
      ) : names.length === 1 ? (
        <>We earn nothing from {listed}: we have no commercial arrangement with them.</>
      ) : (
        <>We earn nothing from {listed} here.</>
      )}{" "}
      <Link href="/how-we-make-money" className="underline hover:text-[#3d4b44]">
        How we make money
      </Link>
      .
    </p>
  );
}
