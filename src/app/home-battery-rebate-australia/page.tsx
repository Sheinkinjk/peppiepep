import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { APOLLO_ENERGY_LEAD_HREF } from "@/lib/affiliate-links";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.homeBatteryRebate);

const faqs = [
  {
    q: "How much is the home battery rebate in Australia in 2026?",
    a: "The federal Cheaper Home Batteries Program discounts roughly 30% of the upfront cost of an eligible battery. From 1 May 2026 it works out at about $252 per usable kWh for most standard home batteries, based on 6.8 small-scale technology certificates per usable kWh at roughly $37 per certificate after typical costs. The exact figure moves with the STC market price, so treat it as a close guide rather than a fixed number.",
  },
  {
    q: "Do I claim the battery rebate myself?",
    a: "No. The discount is applied at the point of sale by your accredited installer, who handles the certificates. You should see it come off the quote rather than paying full price and claiming money back later. If a quote does not clearly show the rebate applied, ask for it to be itemised.",
  },
  {
    q: "Does the rebate get bigger if I buy a bigger battery?",
    a: "Not proportionally. From 1 May 2026 the rate tapers with capacity: the full rate applies to the first 14kWh, then 60% of the rate from 14kWh to 28kWh, then only 15% from 28kWh to 50kWh. So each extra kWh past 14kWh earns a smaller discount, and oversizing has real diminishing returns.",
  },
  {
    q: "What size battery is eligible for the rebate?",
    a: "The program covers small-scale battery systems from 5kWh up to 100kWh. Rebate value is calculated on usable capacity, and the taper above 14kWh means the strongest value per kWh sits in the smaller end of that range for a typical home.",
  },
  {
    q: "Are there state rebates as well as the federal one?",
    a: "Often, yes, and they can stack. The federal discount applies nationally, and some states add their own incentive on top. NSW, for example, offers an incentive worth roughly $1,000 to $1,100 for connecting a battery to an approved Virtual Power Plant (VPP), paid through energy certificates so the figure moves. State schemes change often and some, such as Victoria's battery rebate, have closed, so confirm what currently applies at your address when you get a quote.",
  },
  {
    q: "Do I need solar panels to claim the battery rebate?",
    a: "A battery is normally installed alongside solar, and that is where the economics are strongest, since you store what you generate rather than exporting it cheaply. Requirements and the sensible setup vary by installer and state, so confirm eligibility for your specific situation before committing.",
  },
  {
    q: "Is a home battery worth it after the rebate?",
    a: "It depends on your usage, your tariff, whether you have solar and whether you join a VPP, so no page can promise you a payback figure. The rebate materially cuts the upfront cost, which shortens payback, but what matters is whether you actually consume enough power in expensive peak periods for a battery to shift. Ask any installer for a projection built on your real bills.",
  },
  {
    q: "What are the eligibility requirements for the battery rebate?",
    a: "To qualify for the federal Cheaper Home Batteries discount the battery must be between 5kWh and 100kWh, with only the first 50kWh subsidised, and installed with new or existing rooftop solar. Both the battery and inverter must be on the Clean Energy Council approved list, your installer must be Solar Accreditation Australia accredited, and the battery must be capable of joining a Virtual Power Plant, though actually joining one is optional. Confirm the current terms when you get a quote.",
  },
  {
    q: "Where can I get a quote with the rebate applied?",
    a: "Any accredited installer applies the federal discount at the point of sale. Through Refer Labs, Apollo Energy Group also takes an exclusive $500 off your quote on top of the rebate, with no code to enter. The form takes under 30 seconds and carries no obligation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Home battery rebate Australia", item: seoConfig.homeBatteryRebate.url },
  ],
};
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Home Battery Rebate Australia 2026: What You Actually Get",
  description: seoConfig.homeBatteryRebate.description,
  inLanguage: "en-AU",
  datePublished: "2026-07-15",
  dateModified: pageDates("/home-battery-rebate-australia")?.updated ?? "2026-07-15",
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
  mainEntityOfPage: seoConfig.homeBatteryRebate.url,
};

function Offer({ loc }: { loc: string }) {
  return (
    <div className="rounded-2xl border border-[#cfe6da] bg-[#e8f5ee] p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">The offer</p>
      <p className="mt-2 text-lg font-bold leading-snug text-[#10251b]">
        $500 off your battery quote, on top of the rebate
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
        Apollo Energy Group takes an extra $500 off for Refer Labs readers. No code to enter, the discount is attached to
        the link. Under 30 seconds, no obligation.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={APOLLO_ENERGY_LEAD_HREF}
          data-cta={loc}
          className="nw-btn justify-center px-6 py-3 text-[15px]"
        >
          Claim your $500 discount
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link href="/apollo-energy-group" className="text-sm font-semibold text-[#0a7c42] hover:underline">
          Read the full Apollo breakdown
        </Link>
      </div>
    </div>
  );
}

export default function HomeBatteryRebatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ConsumerShell>
        <main id="main-content" className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Home battery rebate</span>
          </nav>

          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Home battery rebate Australia: what you actually get
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
            The federal rebate takes roughly 30% off a home battery, and your installer applies it at the point of sale.
            Above 14kWh the rate tapers, which changes what size actually makes sense. Here it is in plain terms, with
            worked numbers.
          </p>

          <div className="mt-8">
            <Offer loc="rebate-hero" />
          </div>

          {/* Answer-first: the exact buyer question as an H2, then a liftable answer for engines. */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Which home battery systems qualify for the Australian government rebate?</h2>
            <div className="mt-4 rounded-2xl border border-[#cfe6da] bg-[#f4f9f6] px-6 py-5">
              <p className="text-[15.5px] leading-relaxed text-[#2b362f]">
                Under the federal Cheaper Home Batteries Program, small-scale battery systems from 5kWh up to 100kWh of
                usable capacity qualify when installed by an accredited installer. The rebate takes roughly 30% off the
                upfront cost, applied at the point of sale, and is calculated on usable capacity, with the full rate on
                the first 14kWh before it tapers above that. Some states add their own incentive on top, such as a NSW
                Virtual Power Plant payment. Eligibility for your address is confirmed in the quote.
              </p>
            </div>
          </section>

          {/* What it is */}
          <section className="mt-12 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">What the rebate actually is</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                It is called the <strong className="font-semibold text-[#2b362f]">Cheaper Home Batteries Program</strong>,
                and it is federal, so it applies across Australia. It discounts roughly 30% of the upfront cost of an
                eligible battery, for systems between 5kWh and 100kWh.
              </p>
              <p>
                You do not claim it back yourself. The discount runs through small-scale technology certificates (STCs), which
                your accredited installer handles and applies straight to the quote. If a quote does not show it
                itemised, that is a fair thing to push back on.
              </p>
            </div>
          </section>

          {/* How much */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">How much it is worth</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                From 1 May 2026 it works out at roughly{" "}
                <strong className="font-semibold text-[#2b362f]">$252 per usable kWh</strong> for most standard home
                batteries. That comes from 6.8 STCs per usable kWh at about $37 per certificate after typical
                transaction and admin costs.
              </p>
              <p>
                Because the STC price moves with the market, treat $252 as a close guide rather than a fixed number. Your
                installer quotes the real figure on the day.
              </p>
            </div>
          </section>

          {/* The taper */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">The 14kWh taper</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                From 1 May 2026 the rate no longer applies flat across the whole battery. It steps down as capacity
                grows, which means the rebate does not scale with the size of the system.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[440px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Capacity band</th>
                    <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Rate applied</th>
                    <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Roughly per kWh</th>
                  </tr>
                </thead>
                <tbody className="text-[#3d4b44]">
                  {[
                    ["First 14kWh", "100% of the rate", "~$252"],
                    ["14kWh to 28kWh", "60% of the rate", "~$151"],
                    ["28kWh to 50kWh", "15% of the rate", "~$38"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="border-b border-[#eef1ef]">
                      <td className="py-3 pr-4 font-medium text-[#2b362f]">{a}</td>
                      <td className="py-3 pr-4">{b}</td>
                      <td className="py-3 tabular-nums">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[#9aa39c]">
              Per-kWh figures are derived from the ~$252 base rate and rounded. Indicative only.
            </p>
          </section>

          {/* Worked examples */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Worked examples</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              Using the ~$252 base rate and the taper, here is roughly what different sizes attract. These are
              indicative, not quotes.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[440px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Battery size</th>
                    <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Approx. rebate</th>
                    <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">How it stacks up</th>
                  </tr>
                </thead>
                <tbody className="text-[#3d4b44]">
                  {[
                    ["10kWh", "~$2,520", "Full rate on every kWh"],
                    ["14kWh", "~$3,528", "The last size at the full rate"],
                    ["20kWh", "~$4,435", "First 14kWh full, next 6kWh at 60%"],
                    ["28kWh", "~$5,645", "Everything above 14kWh at 60%"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="border-b border-[#eef1ef]">
                      <td className="py-3 pr-4 font-medium text-[#2b362f]">{a}</td>
                      <td className="py-3 pr-4 tabular-nums">{b}</td>
                      <td className="py-3">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              Going from 14kWh to 20kWh adds 6kWh of battery but only about $900 of rebate, because those kWh earn the
              reduced rate. Size for your evening usage rather than the subsidy.
            </p>
          </section>

          {/* State */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">State incentives on top</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                The federal discount is national, and some states add their own on top. NSW, for example, offers an
                incentive worth roughly $1,000 to $1,100 for connecting your battery to an approved Virtual Power Plant,
                where your battery helps support the grid at peak times in exchange for a payment. It is paid through
                energy certificates, so the exact figure moves, and it depends on joining a VPP. State schemes change
                often and some have closed, so confirm what applies at your address when you get a quote.
              </p>
              <p>
                What you can actually claim depends on your state, your battery, your retailer and the VPP terms, so
                treat this as a question for your installer rather than something to assume. For the full picture, see the{" "}
                <Link href="/home-battery-rebate-by-state-australia" className="nw-link">home battery rebate by state</Link>,
                which sets out which states add their own incentive on top in 2026 and which no longer do.
              </p>
            </div>
          </section>

          {/* Worth it */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Is it worth it after the rebate?</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                It depends on your setup, and any payback figure quoted from a web page is guesswork. The rebate cuts the
                upfront cost, which shortens payback, but it cannot create savings your usage pattern does not support.
              </p>
              <p>
                What matters is whether you use a meaningful amount of power in expensive peak periods, and whether you
                have solar generating cheap energy to store. If both are true the numbers tend to work. If your usage is
                low, or you are out all evening, a battery has less to do.
              </p>
              <p>
                Ask any installer for a projection built on your real bills, and sanity check it yourself.
              </p>
            </div>
          </section>

          {/* Where to get it */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Getting a quote with the rebate applied</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                Any accredited installer applies the federal discount for you. Through Refer Labs,{" "}
                <Link href="/apollo-energy-group" className="font-semibold text-[#0a7c42] hover:underline">
                  Apollo Energy Group
                </Link>{" "}
                takes an exclusive $500 off the quote on top of it. They are SAA-accredited, operate under Electrical
                Licence 400672, list a 10-year battery warranty, and size systems from your real usage rather than
                selling a fixed package.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "$500 off your quote, exclusive to Refer Labs, no code",
                  "Federal rebate applied at the point of sale, not claimed back",
                  "System sized from your actual usage data",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Offer loc="rebate-body" />
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Frequently asked questions</h2>
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

          <section className="mt-12 border-t border-[#e5e9e7] pt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">More on home batteries</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li><Link href="/solar-and-battery-package-australia" className="font-semibold text-[#0a7c42] hover:underline">Buying solar and a battery together</Link></li>
              <li><Link href="/tesla-powerwall-alternatives-australia" className="font-semibold text-[#0a7c42] hover:underline">Powerwall alternatives</Link></li>
              <li><Link href="/home-battery-blackout-backup-australia" className="font-semibold text-[#0a7c42] hover:underline">Will it run the house in a blackout?</Link></li>
              <li><Link href="/home-battery-installer-sydney" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Installers in Sydney</Link></li>
              <li><Link href="/deals" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All current offers</Link></li>
            </ul>
          </section>

          <p className="mt-10 text-xs leading-relaxed text-[#9aa39c]">
            Rebate figures reflect the federal Cheaper Home Batteries Program and state incentives as at July 2026 and
            are indicative only. STC prices move, and scheme rules change, so confirm current terms and your own
            eligibility before committing. This page contains a disclosed affiliate link: if you request a quote through
            it we may earn a commission at no extra cost to you, and it never changes our assessment.
          </p>
        </main>
        <StickyCta href={APOLLO_ENERGY_LEAD_HREF} sponsored={false} product="Apollo Energy · home batteries" label="Get $500 off" />
    </ConsumerShell>
    </>
  );
}
