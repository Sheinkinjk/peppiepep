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
/**
 * Four bodies, one per hub, so 35 pages do not carry the same two sentences of
 * editorial voice verbatim (measured 28 Aug 2026: they did). Each hub is
 * internally consistent, so a reader moving within a cluster sees one wording;
 * a reader crossing clusters does not meet a template. Same two facts every
 * time: what is missing, and that nothing here pays us until it lands.
 *
 * Variant C was proposed as "Everything on this page is researched and usable
 * now." That was rejected before it shipped: it is the same self-narrating move
 * as the sentence removed above, in new clothes. Say what is missing; do not
 * tell the reader the rest is good.
 */
type Variant = "a" | "b" | "c" | "d";

const BY_CATEGORY: Record<string, Variant> = {
  Longevity: "a",
  Diagnostics: "a",
  Recovery: "a",
  Sleep: "b",
  "Skin and beauty": "c",
  "Men's health": "d",
  // Sits under men's health, so it takes that hub's wording.
  "This page": "d",
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ComingSoonNote({
  category,
  what = "provider comparisons and any current offers",
  variant,
}: {
  category: string;
  what?: string;
  /** Override the per-hub default. Rarely needed. */
  variant?: Variant;
}) {
  const v = variant ?? BY_CATEGORY[category] ?? "a";

  const body =
    v === "b" ? (
      <>
        {cap(what)} arrive here only after we have checked a provider ourselves, so they are not on
        the page yet, and nothing here earns us a commission until they are.
      </>
    ) : v === "c" ? (
      <>
        Missing so far: {what}. We add those only after checking a provider ourselves, and nothing on
        this page pays us until we do.
      </>
    ) : v === "d" ? (
      <>
        {/* Not "No {what} yet": the default `what` contains "and any current
            offers", which under a negative needs "or", and the fix reads worse
            than avoiding the negative altogether. */}
        {cap(what)} are not on the page yet. We add those once we have checked a provider ourselves,
        and nothing here earns us a commission before then.
      </>
    ) : (
      <>
        What is not here yet is {what}, which we add only once we have checked a provider ourselves.
        Until then nothing on this page earns us a commission.
      </>
    );

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#6e7b74]" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-[#3d4b44]">
        <strong className="font-semibold text-[#10251b]">{category} is still being built.</strong>{" "}
        {body}{" "}
        <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">
          How we make money
        </Link>
        .
      </p>
    </div>
  );
}
