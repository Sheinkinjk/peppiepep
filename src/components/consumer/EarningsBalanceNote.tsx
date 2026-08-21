import Link from "next/link";
import { Scale } from "lucide-react";

/**
 * States, on a page comparing two providers, which of them we actually earn
 * from.
 *
 * Every page here that names Juniper alongside a competitor carries Moshy's
 * affiliate link and none for Juniper, because our Juniper referral link sits
 * on the Juniper review page only. Read cold by a reviewer, that asymmetry looks
 * like we are steering. Read with this note, it is the opposite: the one page
 * that could pay us is the one we deliberately do not put a link on.
 *
 * Deliberately describes what is observable on our own site rather than
 * asserting a partner's terms back at them. We hold the arrangement, not the
 * authority to characterise it.
 */
export default function EarningsBalanceNote({
  earnFrom,
  noEarnFrom,
  noEarnHref = "/juniper",
}: {
  earnFrom: string;
  noEarnFrom: string;
  noEarnHref?: string;
}) {
  return (
    <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
      <Scale className="mt-0.5 h-4 w-4 shrink-0 text-[#6e7b74]" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-[#3d4b44]">
        <strong className="font-semibold text-[#10251b]">What we earn on this page.</strong> Links to {earnFrom} are
        affiliate links, so we may earn a commission if you sign up, at no extra cost to you. There is no{" "}
        {noEarnFrom} link on this page and we earn nothing from {noEarnFrom} here: our {noEarnFrom} referral link sits
        only on our{" "}
        <Link href={noEarnHref} className="underline hover:text-[#10251b]">
          {noEarnFrom} review
        </Link>
        . That imbalance is in the arrangement, not in the comparison, and rankings are never sold.{" "}
        <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">
          How we make money
        </Link>
        .
      </p>
    </div>
  );
}
