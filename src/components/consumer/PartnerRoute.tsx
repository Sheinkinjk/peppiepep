import Link from "next/link";

/**
 * A single partner's route out of a guide page, and the disclosure that must
 * travel with it.
 *
 * Built to take a second, third and tenth partner without a rewrite: the hubs
 * this serves are explicitly a starting set. Pass `providers` and it renders a
 * list; the surrounding copy never names a partner, so adding one is a data
 * change.
 *
 * `href` is expected to be an internal /go/<slug> hop for partners whose
 * tracking is a plain query-string code, or a direct network link for partners
 * whose click URL already identifies the placement. Both are marked
 * rel="nofollow sponsored" so AffiliateClickTracker records them either way.
 *
 * RESERVED SLOTS: pass an empty `providers` array with `reservedNote` to render
 * the heading and the reason no partner is listed. That is deliberate on pages
 * where a route exists commercially but not yet contractually, so the gap is
 * visible in the page rather than only in a plan.
 */
export type PartnerRouteProvider = {
  name: string;
  href: string;
  what: string;
  /** Set only where we have read the terms ourselves, with the date. */
  checked?: string;
  /**
   * Our own page about this partner, shown beside the outbound button.
   *
   * Added 23 Sep 2026 because every hub carrying this block sent readers straight
   * out to the partner with no route to what we had written about it. /longevity
   * linked /go/technogym-longevity-hub and /go/i-screen-longevity-hub and neither
   * /technogym nor /i-screen, so the money pages were unreachable from the hub
   * they belong to. That is the inbound-link step of the partner checklist, and it
   * had been missed on every partner, not just the new one.
   */
  review?: { href: string; label: string };
};

export default function PartnerRoute({
  heading,
  intro,
  providers,
  reservedNote,
  className = "",
}: {
  heading: string;
  intro: string;
  providers: PartnerRouteProvider[];
  reservedNote?: string;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6 ${className}`}>
      <h2 className="text-xl font-bold tracking-[-0.01em] text-[#14120f]">{heading}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">{intro}</p>

      {providers.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-[#56504a]">{reservedNote}</p>
      ) : (
        <>
          <ul className="mt-5 space-y-4">
            {providers.map((p) => (
              <li key={p.name} className="rounded-xl border border-[#ded8cd] bg-white p-5">
                <p className="text-[15px] font-bold text-[#14120f]">{p.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#56504a]">{p.what}</p>
                {p.checked && (
                  <p className="mt-2 text-[12px] font-medium text-[#56504a]">
                    Read off {p.name}
                    {p.name.endsWith("s") ? <>&apos;</> : <>&apos;s</>} own site on {p.checked}.
                  </p>
                )}
                <a
                  href={p.href}
                  target="_blank"
                  rel="nofollow sponsored"
                  data-cta={`partner-route-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#007a95] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                >
                  Visit {p.name}
                </a>
                {p.review && (
                  <Link
                    href={p.review.href}
                    className="ml-3 inline-flex items-center text-sm font-semibold text-[#007a95] underline underline-offset-2"
                  >
                    {p.review.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-[#56504a]">
            Refer Labs is an independent Australian comparison publisher. The links above are
            affiliate links: if you sign up through one we may earn a commission at no extra cost to
            you, and it never changes what we publish.{" "}
            <Link href="/how-we-make-money" className="underline hover:text-[#56504a]">
              How we make money
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
