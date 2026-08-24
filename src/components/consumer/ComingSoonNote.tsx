import Link from "next/link";
import { Clock } from "lucide-react";

/**
 * Marks a category whose comparison and partner offers are still being built.
 *
 * The pages themselves carry real, researched content and are indexed from day
 * one, because ranking takes months and a young domain cannot afford to sit on
 * an empty URL. This note is the honest caveat on top of that content, not a
 * substitute for it: it says what is missing and when, rather than dressing up a
 * placeholder as a page.
 *
 * Deliberately says nothing about which brands are coming. Naming a partner
 * before an agreement exists would be a claim we cannot support.
 */
// Dropped "The guidance on this page is complete and researched." It shipped on
// 36 pages, and telling a reader the work is thorough is the self-narrating move
// this repo greps for everywhere else: say the thing, delete the sentence that
// introduces the thing. Repeated 36 times it also reads as a template rather
// than a fact, which is the second half of the same rule.
export default function ComingSoonNote({
  category,
  what = "provider comparisons and any current offers",
}: {
  category: string;
  what?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#6e7b74]" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-[#3d4b44]">
        <strong className="font-semibold text-[#10251b]">{category} is still being built.</strong>{" "}
        What is not here yet is {what}, which we add only once
        we have checked a provider ourselves. Until then nothing on this page earns us a commission.{" "}
        <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">
          How we make money
        </Link>
        .
      </p>
    </div>
  );
}
