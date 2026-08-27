import type { ReactNode } from "react";

/**
 * The affiliate disclosure, in one wording.
 *
 * Before this, the same regulated statement existed in eighteen wordings across
 * the money pages, and the independence claim it carries existed in twenty-four
 * variants across sixty-one files: "never changes our assessment", "what we
 * write", "a conclusion", "a recommendation", "how these are grouped", and on.
 * Disclosure is an ACL surface. Eighteen ways of saying it is eighteen things to
 * get wrong, and a reader landing on two of our pages saw two different promises.
 *
 * Two things the old wordings got wrong that this fixes:
 *
 * The subject is Refer Labs, not "we". First person is unattributable the moment
 * a sentence is lifted out of the page, which is the same defect the offer stamp
 * had: an engine quoting "we may earn a commission" learns nothing about who
 * "we" is. Naming the publisher makes every disclosure a second entity signal.
 *
 * Six pages said "I may earn a small commission on this post", first person
 * singular, pasted from a network's supplied copy. That told an engine an
 * individual blogger runs the site, directly against the publisher entity the
 * rest of the site asserts.
 *
 * WHAT NOT TO DO HERE: do not fold a per-page fact into the shared string, and
 * do not drop one because the string cannot hold it. Every claim a page made
 * before is either in the canonical sentence or in a prop below. A page that
 * needs something none of these express takes `extra` rather than losing it.
 */
export default function AffiliateDisclosure({
  partners,
  earnsFromAll = false,
  noStarRatings = false,
  priceUnaffected = false,
  extra,
  className = "",
}: {
  /** Named where the page's previous wording named them. */
  partners?: string[];
  /** The page compares providers we earn from on both or all sides. */
  earnsFromAll?: boolean;
  /** The page states we publish no star ratings of our own. */
  noStarRatings?: boolean;
  /**
   * The commission does not change the reader's price. A DIFFERENT claim from
   * the independence one in the canonical sentence, and not interchangeable
   * with it: on /deals, whose whole subject is discounts, what the reader pays
   * is the material question. Set it only where the page said it before.
   */
  priceUnaffected?: boolean;
  /** Anything the canonical sentence and these props cannot hold. */
  extra?: ReactNode;
  className?: string;
}) {
  const named =
    partners && partners.length > 0
      ? `, including to ${partners.length === 1 ? partners[0] : `${partners.slice(0, -1).join(", ")} and ${partners[partners.length - 1]}`}`
      : "";

  return (
    <p className={`text-[13px] leading-relaxed text-[#6e7b74] ${className}`} data-affiliate-disclosure>
      Some links on this page are affiliate links{named}. If you sign up or buy through one, Refer Labs may earn a
      commission at no extra cost to you, and it never changes a comparison or a conclusion.
      {priceUnaffected ? " It never changes what you pay." : null}
      {earnsFromAll
        ? " We earn a commission from every provider compared here, which is why the published figures are set out side by side rather than a winner named."
        : null}
      {noStarRatings ? " We publish no star ratings of our own." : null}
      {extra ? <> {extra}</> : null}
    </p>
  );
}
