import Link from "next/link";
import { APOLLO_ENERGY_URL, glance, steps, faqs } from "./config";
import { ArrowRight, Check, ShieldCheck, BatteryCharging, BadgeCheck, Wrench } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

// ── Money CTA (tracked: rel=sponsored is picked up by AffiliateClickTracker) ──
function ApolloCTA({
  label = "Claim your $500 discount",
  size = "md",
  block = false,
  loc,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  loc?: string;
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3.5 text-[15px]",
    lg: "px-8 py-4 text-base",
  } as const;
  return (
    <a
      href={APOLLO_ENERGY_URL}
      target="_blank"
      rel="nofollow sponsored"
      data-cta={loc}
      className={`nw-btn justify-center ${sizes[size]} ${block ? "w-full" : ""}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function ApolloLanding() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* ── Hero ── */}
        <section className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e5e9e7] bg-white text-2xl font-black text-[#0a7c42] shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]">
              A
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.3rem]">
              Apollo Energy Group: home batteries for Australian homes,{" "}
              <span className="text-[#0a7c42]">with $500 off through Refer Labs.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              An independent look at how Apollo actually works: what they install, how the $500 Refer Labs discount is
              applied, and how the federal battery rebate changes what you really pay in 2026. No hype, no invented
              savings figures.
            </p>

            <div className="mt-8">
              <ApolloCTA label="Claim your $500 discount" size="lg" loc="hero" />
            </div>

            <p className="mt-4 text-xs text-[#9aa39c]">
              $500 off applied through our link, no code needed
            </p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {glance.map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#9aa39c]">{k}</dt>
                    <dd className="text-[#2b362f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <ApolloCTA block loc="glance-card" />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#9aa39c]">Opens apolloenergygroup.com.au · Australia</p>
            </div>
          </aside>
        </section>

        {/* ── Trust strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-4">
          {[
            { icon: BadgeCheck, label: "SAA-accredited installers" },
            { icon: ShieldCheck, label: "10-year battery warranty" },
            { icon: BatteryCharging, label: "Federal rebate applied at sale" },
            { icon: Wrench, label: "Sized from your real usage" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </section>

        {/* ── Honesty notice ── */}
        <p className="mt-8 rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-xs leading-relaxed text-[#6e7b74]">
          <span className="font-semibold text-[#3d4b44]">On savings figures.</span> What a battery saves depends on your
          usage, your tariff, whether you have solar and whether you join a VPP. Any percentages or dollar figures on
          this page are attributed to their source and are not a promise of what you will save. Rebate amounts and rules
          change, so confirm current terms before you commit.
        </p>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  ["what", "What Apollo actually is"],
                  ["offer", "The $500 discount"],
                  ["rebate", "The 2026 battery rebate"],
                  ["savings", "What a battery saves"],
                  ["suits", "Who it suits"],
                  ["start", "How to start"],
                  ["bottom-line", "The bottom line"],
                  ["faq", "FAQ"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            {/* What */}
            <section id="what" className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Apollo actually is</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Apollo Energy Group is a specialist in home battery storage. They install residential
                  and commercial battery systems from 9kWh up to 54kWh, engineered around your actual electricity usage
                  rather than sold as a fixed package. They are based at 5 Martin Place in Sydney and install across Australia.
                </p>
                <p>
                  The credentials they publish are the ones worth checking on any installer: SAA-accredited installers,
                  Electrical Licence 400672, ABN 55697998208, and a 10-year battery warranty. Their site also cites 12
                  years of installer experience, a 4.9 out of 5 Google rating, and being voted SBC&apos;s number one
                  battery installer.
                </p>
                <p>
                  The positioning they lead with is &quot;no high-pressure sales, just great advice&quot;, and the
                  practical version of that is the quoting process: the system is sized from your usage data, and the
                  rebate is applied at the point of sale rather than claimed back later.
                </p>
              </div>

              <figure className="my-7 border-l-2 border-[#0a7c42] pl-5">
                <blockquote className="text-xl font-semibold italic leading-snug text-[#2b362f]">
                  &ldquo;The install is the easy part. The money question is what size you actually need, and what the
                  rebate does to the price.&rdquo;
                </blockquote>
              </figure>
            </section>

            {/* Offer */}
            <section id="offer" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                The $500 discount, and how it works
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Apollo runs a dedicated landing page for Refer Labs readers offering{" "}
                  <strong className="font-semibold text-[#2b362f]">$500 off your home battery quote</strong>, applied
                  directly to the system. This is a genuine exclusive rather than a public sale, which is why there is no
                  code to hunt for: the discount is attached to the link on this page.
                </p>
                <p>
                  The form asks for four things, your name, email, phone and postcode. It takes under 30 seconds and
                  carries no obligation. From there Apollo comes back with a quote for a system sized to your usage, with
                  the $500 already off and any rebate you qualify for applied on top.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] p-5">
                <p className="text-sm leading-relaxed text-[#2b362f]">
                  The $500 comes off the quote on top of the federal rebate. It is not instead of it.
                </p>
                <div className="mt-4">
                  <ApolloCTA label="Claim your $500 discount" loc="offer" />
                </div>
              </div>
            </section>

            {/* Rebate */}
            <section id="rebate" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                The 2026 battery rebate, in plain terms
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  This is the part that moves the price most, and it changed on 1 May 2026. The federal{" "}
                  <strong className="font-semibold text-[#2b362f]">Cheaper Home Batteries Program</strong> discounts
                  roughly 30% of the upfront cost of an eligible battery, for systems between 5kWh and 100kWh. You do not
                  claim it yourself: the installer applies it at the point of sale.
                </p>
                <p>
                  From 1 May 2026 it is worth about $252 per usable kWh for most standard home batteries, based on 6.8
                  small-scale technology certificates per usable kWh at roughly $37 each after typical costs. As a guide,
                  a 10kWh battery attracts around $2,520.
                </p>
                <p>
                  The rate also tapers. The full rate only applies to the first 14kWh. From 14kWh to
                  28kWh you get 60% of the rate, and from 28kWh to 50kWh only 15%. So a bigger battery does not earn a
                  proportionally bigger rebate, and oversizing has real diminishing returns.
                </p>
                <p>
                  On top of the federal discount, some states add their own incentive. NSW, for example, pays a Virtual Power Plant (VPP) incentive worth roughly $40 per usable kWh, capped at 28kWh, so up to about $1,100. It floats with certificate prices, so treat it as indicative.
                  Eligibility depends on your battery, retailer and VPP terms, so it is worth asking what applies to your
                  system when the quote comes back.
                </p>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e9e7]">
                      <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">
                        Capacity band
                      </th>
                      <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">
                        Rebate rate applied (from 1 May 2026)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#3d4b44]">
                    {[
                      ["First 14kWh", "100% of the rate"],
                      ["14kWh to 28kWh", "60% of the rate"],
                      ["28kWh to 50kWh", "15% of the rate"],
                    ].map(([band, rate]) => (
                      <tr key={band} className="border-b border-[#eef1ef]">
                        <td className="py-3 pr-4 font-medium text-[#2b362f]">{band}</td>
                        <td className="py-3">{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#9aa39c]">
                Rebate rules and STC values change. Confirm current terms before committing.
              </p>
            </section>

            {/* Savings */}
            <section id="savings" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                What a battery actually saves
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  No one can quote you a savings number from a web page, because it turns entirely on your
                  usage, your tariff, whether you already have solar, and whether you join a VPP. What a battery does is
                  shift cheap or self-generated energy into your expensive peak hours.
                </p>
                <p>
                  For reference, Apollo&apos;s own site cites an average bill reduction of over 70%, and gives a worked
                  example of roughly $1,349 in estimated annual savings on a 16kWh system. Those are the provider&apos;s
                  figures, not ours, and they should be treated as illustrative rather than a guarantee.
                </p>
                <p>
                  Ask for a projection built on your actual bills during the quote, and sanity check it against your own
                  peak usage. A battery that never discharges into peak is a battery that never
                  pays for itself.
                </p>
              </div>
            </section>

            {/* Who it suits */}
            <section id="suits" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Who it suits</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  It fits homeowners with existing solar and meaningful evening or overnight consumption, where a
                  battery has something to store and somewhere expensive to discharge into. It also fits households
                  planning solar and a battery together, since the system can be engineered as one.
                </p>
                <p>
                  It is a weaker fit if your usage is very low, if you are renting, or if your roof or switchboard rules
                  out a sensible install. And if you are chasing the largest battery you can buy, the rebate taper above
                  14kWh is worth understanding before you sign.
                </p>
              </div>
            </section>

            {/* Steps */}
            <section id="start" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">How to start</h2>
              <ol className="mt-6 space-y-5">
                {steps.map((s) => (
                  <li key={s.num} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#0a7c42]">
                      {s.num}
                    </span>
                    <div>
                      <p className="font-bold text-[#10251b]">{s.heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Bottom line */}
            <section id="bottom-line" className="mt-14 scroll-mt-24">
              <div className="nw-card rounded-2xl p-7 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">The bottom line</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  If you are already paying for peak power you could be storing, a battery is worth quoting
                  properly, and Apollo is a credible place to get that quote: accredited installers, a real licence, a
                  10-year battery warranty, and systems sized from your usage rather than a package off a shelf. The
                  $500 through our link sits on top of the federal rebate, which is the part that actually moves the
                  price.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "$500 off your quote, exclusive to Refer Labs, no code needed",
                    "Federal rebate applied at the point of sale, not claimed back later",
                    "Sized from your real usage, and the rebate taper above 14kWh explained in full",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <ApolloCTA label="Claim your $500 discount" size="lg" loc="bottom-line" />
                  <span className="text-xs text-[#9aa39c]">Under 30 seconds · no obligation</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related reading (cluster) */}
            <section className="mt-14">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Related reading</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/apollo-energy-review"
                  className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                >
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">
                    Apollo Energy Group review: is it legit?
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">
                    Their accreditation, warranty and credentials, and the things worth checking before you sign.
                  </p>
                </Link>
                <Link
                  href="/home-battery-rebate-australia"
                  className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                >
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">
                    Home battery rebate Australia 2026
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">
                    What the federal rebate actually pays, the 14kWh taper, and worked examples by size.
                  </p>
                </Link>
                <Link
                  href="/home-battery-cost-australia"
                  className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                >
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">
                    How much a home battery costs
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">
                    Installed price ranges by size, what the rebate takes off, and realistic payback periods.
                  </p>
                </Link>
                {[
                  { href: "/best-home-battery-australia", title: "Best home battery: how to choose", desc: "Capacity, chemistry, warranty and blackout backup, and why the installer matters as much as the battery." },
                  { href: "/what-size-home-battery-do-i-need-australia", title: "What size home battery do I need?", desc: "Size from your evening usage and spare solar, and why the rebate tapers above 14kWh." },
                  { href: "/nsw-home-battery-rebate-2026", title: "NSW home battery rebate 2026", desc: "The federal rebate plus the NSW VPP incentive, and how the two stack on one battery." },
                  { href: "/home-battery-installer-nsw", title: "Choosing a NSW battery installer", desc: "SAA accreditation, licensing, warranties, and who applies the rebate at the point of sale." },
                  { href: "/home-battery-payback-calculator", title: "Home battery payback calculator", desc: "Estimate net cost, annual saving and payback from your own usage and tariff." },
                ].map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                  >
                    <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* ── Final CTA band ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#10251b] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Get $500 off your home battery quote
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            Under 30 seconds, no obligation, and no code to enter. The discount is applied through the link, on top of
            any rebate you qualify for.
          </p>
          <div className="mt-8 flex justify-center">
            <ApolloCTA label="Claim your $500 discount" size="lg" loc="final-band" />
          </div>
          <p className="mt-5 text-xs text-white/50">Australia-wide · disclosed affiliate link</p>
        </section>

        {/* Disclosure */}
        <p className="mt-10 text-xs leading-relaxed text-[#9aa39c]">
          This page is operated by Refer Labs and contains a disclosed affiliate link. If you request a quote through it
          we may earn a commission at no extra cost to you, and it never changes our assessment. Apollo Energy Group
          credentials, warranty and savings figures are as published by Apollo. Rebate figures reflect the federal
          Cheaper Home Batteries Program and state incentives as at July 2026 and can change, so confirm current terms
          before committing.
        </p>
      </main>

      <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy · home batteries" label="Get $500 off" />
    </ConsumerShell>
  );
}
