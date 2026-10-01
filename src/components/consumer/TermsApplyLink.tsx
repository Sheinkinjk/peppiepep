import { MOSH_TERMS_URL, MOSHY_TERMS_URL, REFERAL55_TERMS, REFERRAL120_TERMS } from "@/lib/offers";

/**
 * Where an offer's terms sit on a page (1 Oct 2026).
 *
 * Beside a code, an offer box, a CTA or a sticky bar: only `TermsApplyLink`, a
 * small muted "T&Cs apply" link to the partner's own terms page. The full terms
 * sentence in that slot competed with the button and read as a reason not to
 * click, so it moved lower on each page, into `OfferTermsNote` (or the brand
 * template's "offer at a glance" footnote).
 *
 * Both halves stay on every page that prints a code: Ahpra s133(1)(b) and the ACL
 * need the terms stated and easy to find, so the "T&Cs apply" link stays beside
 * every printed code and the full sentence with its link is still on the page.
 * The material condition (REFERRAL120's 3-month minimum) is NOT a term to move:
 * it stays in the offer text itself.
 */

export type TermsBrand = "Moshy" | "Mosh";

const TERMS: Record<TermsBrand, { code: string; sentence: string; url: string }> = {
  Moshy: { code: "REFERRAL120", sentence: REFERRAL120_TERMS, url: MOSHY_TERMS_URL },
  Mosh: { code: "REFERAL55", sentence: REFERAL55_TERMS, url: MOSH_TERMS_URL },
};

export function termsUrlFor(brand: TermsBrand) {
  return TERMS[brand].url;
}

/** The terms URL for a printed code, or undefined for a code with no linked terms. */
export function termsUrlForCode(code?: string) {
  return Object.values(TERMS).find((t) => t.code === code)?.url;
}

export default function TermsApplyLink({
  href,
  tone = "light",
  className = "",
}: {
  href: string;
  /** "dark" for links on the dark closing bands, where #56504a would not be legible. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const colour =
    tone === "dark"
      ? "text-white/60 decoration-white/30 hover:text-white/80"
      : "text-[#56504a] decoration-[#56504a]/40 hover:text-[#14120f]";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener"
      className={`text-[12px] font-normal underline underline-offset-2 ${colour} ${className}`}
    >
      T&amp;Cs apply
    </a>
  );
}

/**
 * A terms sentence with "<Brand>'s terms" inside it turned into the link, so the
 * sentence names the terms and links them once ("...and in Moshy's terms."). If
 * the phrase is absent, the link is appended instead.
 */
export function TermsSentence({ sentence, brand, href }: { sentence: string; brand: string; href: string }) {
  const phrase = `${brand}'s terms`;
  const at = sentence.lastIndexOf(phrase);
  const link = (
    <a href={href} target="_blank" rel="nofollow noopener" className="text-[#007a95] underline underline-offset-2">
      {phrase}
    </a>
  );
  if (at === -1) {
    return (
      <>
        {sentence} Read {link}.
      </>
    );
  }
  return (
    <>
      {sentence.slice(0, at)}
      {link}
      {sentence.slice(at + phrase.length)}
    </>
  );
}

/**
 * The full terms sentence plus the link to the partner's terms page, for a lower
 * place on the page (near the foot, after the FAQ, or under an offers table).
 */
export function OfferTermsNote({ brand, className = "" }: { brand: TermsBrand; className?: string }) {
  const t = TERMS[brand];
  return (
    <p className={`text-[13px] leading-relaxed text-[#56504a] ${className}`}>
      <span className="font-semibold text-[#14120f]">{t.code} offer terms.</span>{" "}
      <TermsSentence sentence={t.sentence} brand={brand} href={t.url} />
    </p>
  );
}
