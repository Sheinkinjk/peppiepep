import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";

export const metadata = generateSEOMetadata(seoConfig.apolloEnergyReview);

const faqs = [
  {
    q: "Is Apollo Energy Group legit?",
    a: "Apollo Energy Group publishes an Electrical Licence number (400672) and an ABN (55697998208), installs using SAA-accredited installers, lists a 10-year battery warranty, and operates from a physical address at 5 Martin Place, Sydney. All of that is checkable, which is more than a lot of energy sales operations offer. No review can vouch for the quality of your specific install, so treat the credentials as a reason to get a quote rather than a guarantee.",
  },
  {
    q: "What do Apollo Energy Group reviews say?",
    a: "Apollo's own site cites a 4.9 out of 5 Google rating and says it was voted SBC's number one battery installer. Those are the company's published figures rather than ours. As with any installer, read recent reviews yourself and weight the ones that describe the install and the after-sales service, not just the sales experience.",
  },
  {
    q: "Is there an Apollo Energy Group discount?",
    a: "Yes. Refer Labs readers get an exclusive $500 off their battery quote, applied directly to the system. There is no code to type, the discount is attached to the link. It sits on top of the federal Cheaper Home Batteries rebate rather than replacing it. The form takes under 30 seconds and carries no obligation.",
  },
  {
    q: "How much does Apollo Energy Group cost?",
    a: "Apollo does not publish fixed prices, because systems are engineered per home rather than sold as a set package. The quote depends on the capacity you need, the inverter and the install, with the federal rebate applied at the point of sale. Financing through Australian lenders is available. That is normal for this industry, but it does mean you should compare at least one other quote.",
  },
  {
    q: "What should I check before signing with any battery installer?",
    a: "Ask for the federal rebate to be itemised on the quote so you can see it applied. Confirm the battery brand and what the 10-year warranty actually covers. Confirm they service your address. And understand that the rebate tapers above 14kWh, so a bigger system does not earn a proportionally bigger discount. If a salesperson pushes size without explaining the taper, that is a flag.",
  },
  {
    q: "Does Apollo Energy Group cover my area?",
    a: "Apollo is based in Sydney and installs for homes and businesses across Australia. Coverage for your specific address is confirmed when you request a quote, so put your postcode in and let them come back to you.",
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
    { "@type": "ListItem", position: 2, name: "Apollo Energy Group review", item: seoConfig.apolloEnergyReview.url },
  ],
};
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Apollo Energy Group Review 2026: Is It Legit?",
  description: seoConfig.apolloEnergyReview.description,
  inLanguage: "en-AU",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  mainEntityOfPage: seoConfig.apolloEnergyReview.url,
};

function Offer({ loc }: { loc: string }) {
  return (
    <div className="rounded-2xl border border-[#cfe6da] bg-[#e8f5ee] p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Exclusive Refer Labs offer</p>
      <p className="mt-2 text-lg font-bold leading-snug text-[#10251b]">$500 off your Apollo battery quote</p>
      <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
        Applied directly to the system, on top of the federal rebate. No code to enter. Under 30 seconds, no obligation.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={APOLLO_ENERGY_URL}
          target="_blank"
          rel="nofollow sponsored"
          data-cta={loc}
          className="nw-btn justify-center px-6 py-3 text-[15px]"
        >
          Claim your $500 discount
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link href="/apollo-energy" className="text-sm font-semibold text-[#0a7c42] hover:underline">
          See the full breakdown
        </Link>
      </div>
    </div>
  );
}

export default function ApolloEnergyReviewPage() {
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
            <span className="text-[#2b362f]">Apollo Energy Group review</span>
          </nav>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Independent review · 2026</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Apollo Energy Group review: is it legit?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
            Apollo publishes an electrical licence, an ABN and accredited installers, which is more than a lot of energy
            outfits manage. Here is what checks out, what to ask about, and how the $500 discount works.
          </p>

          <div className="mt-8">
            <Offer loc="review-hero" />
          </div>

          {/* Verdict box */}
          <section className="mt-12 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">The verdict</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                Apollo Energy Group is a home battery specialist installing systems from 9kWh to 54kWh, sized from your
                actual electricity usage rather than sold as a fixed package. They are based at 5 Martin Place in Sydney
                and install across Australia.
              </p>
              <p>
                The important things are checkable rather than claimed: a real electrical licence, a real ABN, accredited
                installers, and a physical address. That clears a higher bar than a lot of energy lead-generation
                operations.
              </p>
            </div>
          </section>

          {/* Verifiable */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">The credentials</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              Details you can check yourself:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Electrical Licence 400672",
                "ABN 55697998208",
                "SAA-accredited installers",
                "10-year battery warranty",
                "Physical address: 5 Martin Place, Sydney",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Their claims */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Apollo&apos;s own figures</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                Apollo&apos;s site cites a 4.9 out of 5 Google rating, 12 years of installer experience, being voted
                SBC&apos;s number one battery installer, an average bill reduction of over 70%, and a worked example of
                roughly $1,349 in estimated annual savings on a 16kWh system.
              </p>
              <p>
                These are Apollo&apos;s published figures, not independently audited. The savings numbers in particular
                depend on your usage, tariff, solar and whether you join a VPP, so ask for a projection built on your own
                bills.
              </p>
            </div>
          </section>

          {/* What to check */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Four things to check before you sign</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              Worth doing with any installer, not just Apollo:
            </p>
            <ol className="mt-6 space-y-5">
              {[
                ["Get the rebate itemised", "The federal Cheaper Home Batteries discount should appear on the quote, applied at the point of sale. If it is not itemised, ask for it to be."],
                ["Understand the 14kWh taper", "The rebate pays the full rate only on the first 14kWh, then 60% up to 28kWh. A bigger battery does not earn a proportionally bigger discount. If size is pushed without this being explained, that is a flag."],
                ["Pin down the warranty", "Confirm the battery brand and what the 10-year warranty actually covers: the cells, the inverter, labour, and what voids it."],
                ["Confirm they cover your address", "Coverage is confirmed at quote stage. Put your postcode in and get it in writing before you plan around it."],
              ].map(([h, b], i) => (
                <li key={h} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#0a7c42]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#10251b]">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Who it suits */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">Who it suits, and who it does not</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                It fits homeowners with existing solar and real evening or overnight consumption, where a battery has
                something cheap to store and something expensive to displace. It also fits people planning solar and a
                battery together, since the whole system can be engineered at once.
              </p>
              <p>
                It is a weaker fit if your usage is low, if you are renting, or if you are out most evenings. A battery
                that never discharges into peak never pays for itself, and no rebate fixes that.
              </p>
            </div>
          </section>

          {/* Offer + bottom */}
          <section className="mt-10 border-t border-[#e5e9e7] pt-10">
            <h2 className="text-2xl font-bold text-[#10251b]">The $500 discount</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
              <p>
                Apollo runs a dedicated landing page for Refer Labs readers with{" "}
                <strong className="font-semibold text-[#2b362f]">$500 off the battery quote</strong>, applied to the
                system. It is a genuine exclusive rather than a public sale, which is why there is no code to hunt down.
                It stacks on top of the federal rebate rather than replacing it.
              </p>
              <p>
                If you want the full detail on the rebate, the sizing and the process, that is on the{" "}
                <Link href="/apollo-energy" className="font-semibold text-[#0a7c42] hover:underline">
                  Apollo Energy breakdown
                </Link>
                . For the rebate itself, the{" "}
                <Link href="/home-battery-rebate-australia" className="font-semibold text-[#0a7c42] hover:underline">
                  2026 battery rebate guide
                </Link>{" "}
                covers what you actually get.
              </p>
            </div>
            <div className="mt-6">
              <Offer loc="review-body" />
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

          <p className="mt-10 text-xs leading-relaxed text-[#9aa39c]">
            Apollo Energy Group credentials, ratings, warranty and savings figures are as published by Apollo and have
            not been independently audited by Refer Labs. Rebate figures reflect the federal Cheaper Home Batteries
            Program as at July 2026 and can change. This page contains a disclosed affiliate link: if you request a quote
            through it we may earn a commission at no extra cost to you. Rankings and assessments are never sold.
          </p>
        </main>
        <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy · home batteries" label="Get $500 off" />
    </ConsumerShell>
    </>
  );
}
