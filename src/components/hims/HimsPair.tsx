import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PairSide, Vertical } from "@/content/hims/types";
import { MOSH, OFFERS } from "@/content/hims/config";
import { Flag } from "./ui";

/**
 * Hims and Mosh side by side, on the pattern of
 * src/components/consumer/ProviderPair.tsx (30 Sep 2026): same card, same fields,
 * same button for both, alphabetical order. It is a separate component only
 * because the preview needs amber flags inside the offer box, and a Mosh side whose
 * details have not been supplied (MOSH.ed, 1 Oct 2026) renders as a placeholder.
 */

/**
 * A provider side that has not been supplied yet: a dashed, muted panel the same
 * size as its neighbour, with the provider's name and one line. No button, no link.
 * Used for the Mosh ED card, codes panel and codes row until Mosh supplies them.
 */
export function PendingPanel({
  name,
  logo,
  text,
  compact = false,
  showLogo = true,
}: {
  name: string;
  logo?: { src: string };
  text: string;
  compact?: boolean;
  showLogo?: boolean;
}) {
  return (
    <div
      data-placeholder="mosh-ed"
      className={`flex h-full flex-col rounded-2xl border-2 border-dashed border-[#d3ccbf] bg-[#f7f4ee] ${compact ? "p-5" : "p-6"}`}
    >
      <div className="flex items-center gap-3">
        {showLogo && logo ? (
          <Image src={logo.src} alt={`${name} logo`} width={48} height={48} className="h-12 w-12 rounded-xl object-cover opacity-50 grayscale" />
        ) : null}
        <h3 className="text-lg font-bold text-[#8a8379]">{name}</h3>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#56504a]">{text}</p>
      <div className={compact ? "mt-auto pt-4" : "mt-auto pt-5"}>
        <span
          aria-disabled="true"
          className="flex w-full items-center justify-center rounded-full border border-dashed border-[#d3ccbf] px-6 py-3 text-[15px] font-semibold text-[#a39b8f]"
        >
          Details to come
        </span>
      </div>
    </div>
  );
}
export function HimsPair({
  hims,
  mosh,
  vertical,
  moshLink,
  preview,
  locPrefix,
}: {
  /** Omit both for a compact pair (logo, offer, button), as on the /hims-vs-mosh panels. */
  hims?: PairSide;
  mosh?: PairSide;
  vertical: Vertical;
  moshLink: Vertical;
  preview: boolean;
  locPrefix: string;
}) {
  const offer = OFFERS[vertical];
  const m = MOSH[moshLink];
  const cards = [
    {
      name: "Hims",
      logo: { src: "/logos/hims.png", w: 816, h: 280, className: "h-12 w-auto rounded-xl border border-[#ded8cd] bg-white px-2.5 py-3" },
      side: hims,
      offerBox: (
        <p className="mb-4 rounded-xl bg-[#e4f2f5] px-4 py-3 text-sm leading-snug text-[#14120f]">
          {offer.headline}. Code <span className="font-mono font-bold tracking-[0.04em]">{offer.code}</span>
          <Flag show={preview && (offer.codeIsPlaceholder || offer.headlineIsPlaceholder)}>Offer and code to confirm</Flag>
        </p>
      ),
      href: offer.ctaHref,
      cta: offer.ctaLabel,
      sponsored: true,
    },
    {
      name: m.name,
      logo: { src: m.logo.src, w: 48, h: 48, className: "h-12 w-12 rounded-xl object-cover" },
      side: mosh,
      offerBox: m.code ? (
        <p className="mb-4 rounded-xl bg-[#e4f2f5] px-4 py-3 text-sm leading-snug text-[#14120f]">{m.offerText}</p>
      ) : null,
      href: m.href,
      cta: m.ctaLabel,
      sponsored: m.sponsored,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c, i) =>
        i === 1 && m.placeholder ? (
          <PendingPanel key={c.name} name={m.name} logo={m.logo} text={m.placeholder} compact={!c.side} />
        ) : (
        <div key={c.name} className={`nw-card flex flex-col rounded-2xl ${c.side ? "p-6" : "p-5"}`}>
          <div className="flex items-center gap-3">
            <Image src={c.logo.src} alt={`${c.name} logo`} width={c.logo.w} height={c.logo.h} className={c.logo.className} />
            <h3 className="text-lg font-bold text-[#14120f]">{c.name}</h3>
          </div>
          {c.side ? (
            <>
              <p className="mt-4 text-[15px] font-semibold leading-snug text-[#14120f]">{c.side.bestIf}</p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[#56504a]">
                {c.side.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#56504a]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <div className={c.side ? "mt-auto pt-5" : "mt-auto pt-4"}>
            {c.offerBox}
            <a
              href={c.href}
              target="_blank"
              rel={c.sponsored ? "nofollow sponsored noopener" : "noopener"}
              data-cta={`${locPrefix}-${c.name.toLowerCase()}`}
              className="nw-btn w-full justify-center"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
        ),
      )}
    </div>
  );
}
