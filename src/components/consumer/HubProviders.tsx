import Link from "next/link";

import { OFFER_FACTS, checkedOn } from "@/lib/offers";
import { logoScale } from "@/lib/logo-optics";

/**
 * The providers a hub covers, presented on identical terms.
 *
 * Replaces the single-partner offer banner the health hubs used to carry
 * directly under the hero (16 Sep 2026). That banner put one partner's discount
 * above the comparison, so /weight-loss opened with a Moshy promotion and
 * /hair-loss with a Mosh one, while the provider they compete with appeared
 * further down in body copy. For a comparison site that is the wrong order: the
 * offer is one fact about a provider, not the reason the page exists.
 *
 * Every provider gets the same four rows, in the same order, whether or not we
 * earn from them, and the cards are the same size. Where an offer exists it is
 * stated with the date it was checked, read from the same DEALS row /deals uses,
 * so a hub cannot print a stale amount. Where none exists the row says so
 * rather than being dropped, because an absent row reads as a missing fact.
 *
 * Order is alphabetical and stated as such. A hub is not a ranking: the ranked
 * comparisons live on their own pages, where the method can be explained.
 */

export type HubProvider = {
  name: string;
  logo?: string;
  /** Our own page about this provider. */
  href: string;
  hrefLabel: string;
  /** Who the provider suits, in the reader's terms. */
  suits: string;
  /** How the service works. */
  how: string;
  /** What it costs, or that the provider publishes no price. */
  cost: string;
  /** A code in OFFER_FACTS. The amount, object and date are read from it. */
  offerCode?: string;
  /** For a real offer with no code. State its source and date in `offerNote`. */
  offerText?: string;
  offerNote?: string;
  /** The provider's own site, where we link to it. */
  visitHref?: string;
  visitLabel?: string;
  /** Whether that outbound link earns us a commission. */
  earns?: boolean;
};

function OfferLine({ p }: { p: HubProvider }) {
  if (p.offerCode) {
    const facts = OFFER_FACTS[p.offerCode];
    const checked = checkedOn(p.offerCode);
    if (facts) {
      return (
        <>
          {facts.amount} {facts.object}, with the code {facts.code} applied through our link.
          {checked ? ` Checked ${checked}.` : ""}
        </>
      );
    }
  }
  if (p.offerText) {
    return (
      <>
        {p.offerText}
        {p.offerNote ? ` ${p.offerNote}` : ""}
      </>
    );
  }
  return <>No Refer Labs offer.</>;
}

export default function HubProviders({
  heading,
  intro,
  providers,
  ctaPrefix = "hub",
  className = "",
}: {
  heading: string;
  intro: string;
  providers: HubProvider[];
  /** Scopes data-cta so a click is attributed to the page that produced it. */
  ctaPrefix?: string;
  className?: string;
}) {
  const rows = (p: HubProvider) => [
    { k: "Who it suits", v: <>{p.suits}</> },
    { k: "How it works", v: <>{p.how}</> },
    { k: "What it costs", v: <>{p.cost}</> },
    { k: "Current offer", v: <OfferLine p={p} /> },
  ];

  /*
   * Cards line up row by row rather than each flowing to its own height: every
   * card spans the same 7 grid rows and inherits them with `grid-rows-subgrid`,
   * so "What it costs" sits at the same y in every column and the reader can
   * compare across instead of down. Without it the rows drifted apart by a line
   * or two and the section read as two ads side by side (16 Sep 2026).
   *
   * Spacing inside a card is padding, never margin, because the same markup is
   * a plain block below sm, where the subgrid does not apply.
   */
  const ROW_COUNT = 7;
  const columns = providers.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>
      <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">
        {intro} Listed alphabetically, not ranked.
      </p>

      <div
        className={`mt-7 grid gap-4 sm:gap-y-0 ${columns}`}
        style={{ gridTemplateRows: `repeat(${ROW_COUNT}, auto)` }}
      >
        {[...providers]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-[#e5e9e7] bg-white p-6 shadow-[0_1px_2px_rgba(16,37,27,0.05)] sm:grid sm:[grid-template-rows:subgrid]"
              style={{ gridRow: `span ${ROW_COUNT} / span ${ROW_COUNT}` }}
            >
              <div className="flex items-center gap-3 pb-5">
                {p.logo && (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                      style={{ transform: `scale(${logoScale(p.logo)})` }}
                    />
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#10251b]">{p.name}</h3>
              </div>

              {/* One list per card, nested as its own subgrid so the four rows
                  still take their heights from the parent and line up across
                  providers. Each row was briefly a separate <dl> holding a
                  single pair, which rendered the same but described the card as
                  four unrelated lists. */}
              <dl
                className="sm:grid sm:[grid-template-rows:subgrid]"
                style={{ gridRow: `span ${rows(p).length} / span ${rows(p).length}` }}
              >
                {rows(p).map((r) => (
                  <div
                    key={r.k}
                    className="flex flex-col gap-1 border-t border-[#eef1ef] py-3.5 text-[15px] leading-relaxed"
                  >
                    {/* Label above the value, not beside it. A side-by-side label
                        column keyed off the viewport crushed the value into a thin
                        strip wherever a hub renders the cards inside a narrow
                        centre column, as /pet-insurance does. */}
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#5a665f]">
                      {r.k}
                    </dt>
                    <dd className="text-[#3d4b44]">{r.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#eef1ef] pt-5 text-sm font-semibold">
                <Link href={p.href} className="text-[#0a7c42] hover:underline">
                  {p.hrefLabel}
                </Link>
                {p.visitHref && (
                  <a
                    href={p.visitHref}
                    target="_blank"
                    rel="nofollow sponsored"
                    data-cta={`${ctaPrefix}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="font-medium text-[#5a665f] hover:text-[#0a7c42] hover:underline"
                  >
                    {p.visitLabel ?? `Visit ${p.name}`}
                  </a>
                )}
              </div>

              <p className="pt-3 text-[12px] leading-relaxed text-[#5a665f]">
                {p.earns
                  ? `We earn a commission if you sign up with ${p.name} through our link, at no extra cost to you.`
                  : `We earn nothing from ${p.name}.`}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
