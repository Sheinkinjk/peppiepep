import Link from "next/link";

import { OFFER_FACTS, checkedOn } from "@/lib/offers";
import { logoScale } from "@/lib/logo-optics";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import { partnerLogo } from "@/lib/partner-logos";

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
  /**
   * Shown in the fourth row when this provider has no offer. The row used to
   * print "No Refer Labs offer." which, on a hub where nobody has one, is four
   * identical lines of nothing (Jarred, 16 Sep 2026). A reader gets a fact they
   * can act on instead; the absence of a code is still stated, once, in the
   * section intro rather than five times in the grid.
   */
  highlight?: string;
  /** The provider's own site, where we link to it. */
  visitHref?: string;
  visitLabel?: string;
  /** Whether that outbound link earns us a commission. */
  earns?: boolean;
  /**
   * How a reader converts, so the earnings line uses the right verb. Telehealth
   * providers are signed up with; retailers are bought from. Default suits a
   * service.
   */
  earnAction?: string;
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
  const hasOffer = (p: HubProvider) => Boolean(p.offerCode || p.offerText);

  /*
   * Alphabetical, computed once and reused by both the table and the guide
   * list below it, so the two can never fall into different orders.
   */
  const ordered = [...providers].sort((a, b) => a.name.localeCompare(b.name));

  /*
   * The fourth column is headed for what it actually holds. Where nobody has an
   * offer, heading it "Current offer" and printing "No Refer Labs offer" five
   * times was a column of nothing.
   */
  const offerHeading = ordered.some(hasOffer) ? "Current offer" : "Good to know";

  return (
    <section className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>
      <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">
        {intro} Listed alphabetically, not ranked.
      </p>

      {/* A comparison table, not a wall of cards. Five providers as five cards
          three-across read as five adverts side by side; as rows answering the
          same columns they read as a comparison, which is what the page is for
          (Jarred, 16 Sep 2026).

          One DOM, two layouts: below lg each provider is a stacked card, and at
          lg `lg:contents` dissolves the card so its cells become grid items in a
          shared five-column grid. That keeps columns aligned across every row
          without duplicating the markup into a separate mobile block. */}
      <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_1fr_1fr_1.05fr_auto] lg:gap-0">
        <div className="hidden lg:contents">
          {["Provider", "Who it suits", "What it costs", offerHeading, ""].map((h, i) => (
            <div
              key={i}
              className="hidden border-b border-[#dfe5e1] px-4 pb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f] lg:block"
            >
              {h}
            </div>
          ))}
        </div>

        {ordered.map((p) => {
          const logo = partnerLogo(p.href);
          const required = p.earns ? requiredDisclosureFor(p.visitHref) : undefined;
          const fourth = hasOffer(p) ? <OfferLine p={p} /> : <>{p.highlight ?? p.cost}</>;
          return (
            <div
              key={p.name}
              className="rounded-2xl border border-[#e5e9e7] bg-white p-6 shadow-[0_1px_2px_rgba(16,37,27,0.05)] lg:contents"
            >
              <div className="lg:border-b lg:border-[#eef1ef] lg:px-4 lg:py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#eef1ef] bg-white">
                    {logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={logo}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                        style={{ transform: `scale(${logoScale(logo)})` }}
                      />
                    ) : (
                      <span className="text-[13px] font-bold tracking-tight text-[#0a7c42]">
                        {p.name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("")}
                      </span>
                    )}
                  </span>
                  <h3 className="text-[17px] font-bold leading-tight text-[#10251b]">{p.name}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5a665f]">{p.how}</p>
              </div>

              <div className="mt-4 border-t border-[#eef1ef] pt-4 lg:mt-0 lg:border-b lg:border-t-0 lg:px-4 lg:py-5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f] lg:hidden">
                  Who it suits
                </span>
                <p className="mt-1 text-[15px] leading-relaxed text-[#3d4b44] lg:mt-0">{p.suits}</p>
              </div>

              <div className="mt-4 border-t border-[#eef1ef] pt-4 lg:mt-0 lg:border-b lg:border-t-0 lg:px-4 lg:py-5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f] lg:hidden">
                  What it costs
                </span>
                <p className="mt-1 text-[15px] leading-relaxed text-[#3d4b44] [font-variant-numeric:tabular-nums] lg:mt-0">
                  {p.cost}
                </p>
              </div>

              <div className="mt-4 border-t border-[#eef1ef] pt-4 lg:mt-0 lg:border-b lg:border-t-0 lg:px-4 lg:py-5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f] lg:hidden">
                  {hasOffer(p) ? "Current offer" : "Good to know"}
                </span>
                <p className="mt-1 text-[15px] leading-relaxed text-[#3d4b44] lg:mt-0">{fourth}</p>
              </div>

              {/* One action per row, and it goes to the provider. Our own guide
                  is linked from its own section below: two links side by side,
                  one outbound and one internal, read as a choice between two
                  destinations rather than one clear action. */}
              <div className="mt-5 lg:mt-0 lg:border-b lg:border-[#eef1ef] lg:px-4 lg:py-5">
                {p.visitHref && (
                  <a
                    href={p.visitHref}
                    target="_blank"
                    rel="nofollow sponsored"
                    data-cta={`${ctaPrefix}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="flex w-full items-center justify-center rounded-full bg-[#0a7c42] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#086536] lg:w-auto lg:whitespace-nowrap"
                  >
                    {p.visitLabel ?? `Visit ${p.name}`}
                  </a>
                )}
                {required ? (
                  <p className="mt-3 rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-3 py-2 text-[12px] leading-relaxed text-[#3d4b44] lg:max-w-[16rem]">
                    {required.text}
                  </p>
                ) : (
                  <p className="mt-3 text-[12px] leading-relaxed text-[#5a665f] lg:max-w-[14rem]">
                    {p.earns
                      ? `We earn a commission if you ${p.earnAction ?? "sign up with"} ${p.name} through this link, at no extra cost to you.`
                      : `We earn nothing from ${p.name}.`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Our own coverage, kept away from the action column above. */}
      <div className="mt-8 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6 sm:p-7">
        <h3 className="text-[17px] font-bold text-[#10251b]">Our guide to each of them</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">
          What each one costs, and what we could not verify about it.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {ordered.map((p) => (
            <li key={p.name}>
              <Link href={p.href} className="text-sm font-semibold text-[#0a7c42] hover:underline">
                {p.hrefLabel} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
