import Image from "next/image";

import { ArrowRight } from "lucide-react";

/**
 * Side-by-side provider cards for comparison pages (30 Sep 2026).
 *
 * Built so a two-provider comparison gives each side the same card: same
 * fields, same button, same weight. /moshy-vs-juniper previously sent Moshy
 * straight out and Juniper through our own review page, which read as a
 * preference. Order is the caller's; the component treats every card alike.
 *
 * A card whose `sponsored` is false renders a plain outbound link (a provider
 * we don't earn from), so the page can include one without implying a paid
 * relationship. Partner-mandated disclosure wording is NOT rendered here: the
 * page prints it once, above the first link, via `requiredDisclosureFor`.
 */
export type PairProvider = {
  name: string;
  /** Path under /public, e.g. "/logos/moshy.png". */
  logo?: string;
  /** Width over height of the logo file; wide tiles (Juniper is 16:9) render at the same height, wider. */
  logoAspect?: number;
  /** One line: who this suits. */
  bestIf: string;
  points: string[];
  /** The new-patient offer, stating its object, and its code. */
  offer?: { text: string; code?: string };
  href: string;
  cta: string;
  /** data-cta placement label. */
  loc: string;
  sponsored?: boolean;
};

export default function ProviderPair({ providers, className = "" }: { providers: PairProvider[]; className?: string }) {
  const cols = providers.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid gap-4 ${cols} ${className}`}>
      {providers.map((p) => {
        const sponsored = p.sponsored !== false;
        return (
          <div key={p.name} className="nw-card flex flex-col rounded-2xl p-6">
            <div className="flex items-center gap-3">
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={Math.round(48 * (p.logoAspect ?? 1))}
                  height={48}
                  style={{ width: Math.round(48 * (p.logoAspect ?? 1)) }}
                  className="h-12 rounded-xl object-cover"
                />
              ) : (
                <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14120f] text-lg font-bold text-white">
                  {p.name.charAt(0)}
                </span>
              )}
              <h3 className="text-lg font-bold text-[#14120f]">{p.name}</h3>
            </div>
            <p className="mt-4 text-[15px] font-semibold leading-snug text-[#14120f]">{p.bestIf}</p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[#56504a]">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#56504a]" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              {p.offer ? (
                <p className="mb-4 rounded-xl bg-[#e4f2f5] px-4 py-3 text-sm leading-snug text-[#14120f]">
                  {p.offer.text}
                  {p.offer.code ? (
                    <>
                      {" "}with code <span className="font-mono font-bold tracking-[0.04em]">{p.offer.code}</span>
                      
                    </>
                  ) : null}
                </p>
              ) : (
                <p className="mb-4 rounded-xl bg-[#f7f4ee] px-4 py-3 text-sm leading-snug text-[#56504a]">
                  No Refer Labs code. We don&apos;t earn from this provider.
                </p>
              )}
              <a
                href={p.href}
                target="_blank"
                rel={sponsored ? "nofollow sponsored" : "nofollow noopener"}
                data-cta={p.loc}
                className={`${sponsored ? "nw-btn" : "nw-btn-ghost"} w-full justify-center`}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
