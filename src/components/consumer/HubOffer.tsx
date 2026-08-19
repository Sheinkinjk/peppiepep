import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatVerifiedFull, VERIFIED_DATE } from "@/lib/offers";

/**
 * The current offer, stated high on a category hub.
 *
 * Hubs take the category search traffic but were sending it onward without ever
 * naming what the reader gets: /hair-loss and /weight-loss mentioned Mosh and
 * Moshy in body copy while the offer itself appeared only in the global nav, so
 * the hub's own CTA said "the referral applies automatically" and gave no reason
 * to click. /pet-insurance already did this properly; this is that pattern made
 * reusable so the health hubs match it and later hubs get it for free.
 *
 * `appliesTo` is required rather than optional on purpose. Under ACL s29 the
 * object of a discount has to be stated wherever the offer appears, and a hub is
 * where a reader most often meets it first.
 */
export default function HubOffer({
  logo,
  logoAlt,
  badge,
  headline,
  code,
  appliesTo,
  href,
  ctaLabel,
  dataCta,
  moreHref,
  moreLabel,
  verified,
}: {
  logo?: string;
  logoAlt?: string;
  badge: string;
  headline: string;
  code?: string;
  appliesTo: string;
  href: string;
  ctaLabel: string;
  dataCta: string;
  moreHref: string;
  moreLabel: string;
  verified?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-2 sm:px-8">
      <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#e8f5ee] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logo} alt={logoAlt ?? ""} width={160} height={62} className="h-9 w-auto" />
          ) : (
            <span />
          )}
          <span className="rounded-full bg-[#0a7c42] px-4 py-1.5 text-sm font-bold text-white">{badge}</span>
        </div>

        <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.01em] text-[#10251b] sm:text-[1.7rem]">
          {headline}
        </p>

        <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
          {code ? (
            <>
              Use the code <strong className="text-[#10251b]">{code}</strong>, applied automatically through our link.{" "}
            </>
          ) : (
            <>Applied automatically through our link. </>
          )}
          {appliesTo}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={href} target="_blank" rel="nofollow sponsored" data-cta={dataCta} className="nw-btn">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </a>
          <Link href={moreHref} className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
            {moreLabel}
          </Link>
        </div>

        <p className="mt-4 text-[11px] font-medium text-[#6e7b74]">
          Read off the provider&apos;s own page on {formatVerifiedFull(verified ?? VERIFIED_DATE)}. Offers can change,
          so check the current terms before you sign up.
        </p>
      </div>
    </section>
  );
}
