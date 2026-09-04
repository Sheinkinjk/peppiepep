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
    <section className={`rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6 ${className}`}>
      <h2 className="text-xl font-bold tracking-[-0.01em] text-[#10251b]">{heading}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{intro}</p>

      {providers.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-[#6e7b74]">{reservedNote}</p>
      ) : (
        <>
          <ul className="mt-5 space-y-4">
            {providers.map((p) => (
              <li key={p.name} className="rounded-xl border border-[#e5e9e7] bg-white p-5">
                <p className="text-[15px] font-bold text-[#10251b]">{p.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{p.what}</p>
                {p.checked && (
                  <p className="mt-2 text-[11px] font-medium text-[#6e7b74]">
                    Read off {p.name}
                    {p.name.endsWith("s") ? <>&apos;</> : <>&apos;s</>} own site on {p.checked}.
                  </p>
                )}
                <a
                  href={p.href}
                  target="_blank"
                  rel="nofollow sponsored"
                  data-cta={`partner-route-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0a7c42] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                >
                  Visit {p.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-[#6e7b74]">
            Refer Labs is an independent Australian comparison publisher. The links above are
            affiliate links: if you sign up through one we may earn a commission at no extra cost to
            you, and it never changes what we publish.{" "}
            <Link href="/how-we-make-money" className="underline hover:text-[#3d4b44]">
              How we make money
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
