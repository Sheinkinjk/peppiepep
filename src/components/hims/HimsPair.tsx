import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PairSide, Vertical } from "@/content/hims/types";
import { MOSH, OFFERS } from "@/content/hims/config";
import { Flag } from "./ui";

/**
 * Hims and Mosh side by side, on the pattern of
 * src/components/consumer/ProviderPair.tsx (30 Sep 2026): same card, same fields,
 * same button for both, alphabetical order. It is a separate component only
 * because the preview needs amber flags inside the offer box, and a Mosh card can
 * carry a plain (non-affiliate) link where no Mosh link exists for the vertical.
 */
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
        <p className="mb-4 rounded-xl bg-[#e4f2f5] px-4 py-3 text-sm leading-snug text-[#14120f]">
          {m.offerText}
          <Flag show={preview && !!m.pendingFlag}>{m.pendingFlag}</Flag>
        </p>
      ) : (
        <p className="mb-4 rounded-xl bg-[#f7f4ee] px-4 py-3 text-sm leading-snug text-[#56504a]">
          {m.noOfferText}
          <Flag show={preview && !!m.pendingFlag}>{m.pendingFlag}</Flag>
        </p>
      ),
      href: m.href,
      cta: m.ctaLabel,
      sponsored: m.sponsored,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
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
      ))}
    </div>
  );
}
