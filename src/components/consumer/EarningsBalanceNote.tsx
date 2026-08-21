import Link from "next/link";

/**
 * States, beside the CTA, which of the two providers on a comparison page we
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
 */
export default function EarningsBalanceNote({
  earnFrom,
  noEarnFrom,
  noEarnHref = "/juniper",
  className = "",
}: {
  earnFrom: string;
  noEarnFrom: string;
  noEarnHref?: string;
  className?: string;
}) {
  return (
    <p className={`text-xs leading-relaxed text-[#6e7b74] ${className}`}>
      We earn a commission if you sign up through the {earnFrom} link above, at no extra cost to you. We earn nothing
      from {noEarnFrom} here: our {noEarnFrom} referral link sits only on our{" "}
      <Link href={noEarnHref} className="underline hover:text-[#3d4b44]">
        {noEarnFrom} review
      </Link>
      .{" "}
      <Link href="/how-we-make-money" className="underline hover:text-[#3d4b44]">
        How we make money
      </Link>
      .
    </p>
  );
}
