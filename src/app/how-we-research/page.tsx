import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = {
  ...generateSEOMetadata({
    title: "How We Research, Editorial Standards & Affiliate Disclosure | Refer Labs",
    description:
      "How Refer Labs researches its comparisons: our sources, our independence, our affiliate disclosure, and how we handle health content. Rankings are never sold. Corrections welcome.",
    url: `${SITE_URL}/how-we-research`,
    keywords: [
      "refer labs editorial standards",
      "how refer labs reviews products",
      "affiliate disclosure refer labs",
      "independent comparison methodology",
    ],
  }),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "How We Research", item: `${SITE_URL}/how-we-research` },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "How We Research, Editorial Standards",
  url: `${SITE_URL}/how-we-research`,
  publisher: {
    "@type": "Organization",
    name: "Refer Labs",
    url: SITE_URL,
  },
};

// Every claim on this page has to be one we can stand behind if asked to prove it.
// A page about editorial standards that overstates its own method is worse than no
// page at all. Do not add a claim here without checking it is literally true first.
const principles = [
  {
    h: "We work from the vendor's own published sources",
    p: "Prices, plan tiers, fees and eligibility come from the provider's own live pages and published terms, checked at the time of writing. We do not take figures from aggregators, comparison directories or press releases. This is desk research: we do not test or personally use most of the products we cover, and we do not claim to. For services we cannot use ourselves, such as prescription telehealth, we describe the published process and link to the source so you can check it yourself.",
  },
  {
    h: "Rankings are not for sale",
    p: "A brand cannot pay to rank higher, be added to a comparison, or have a criticism removed. Commercial relationships never change the order of a list or the substance of a conclusion. Where two options are close, we say so rather than inventing a winner.",
  },
  {
    h: "We disclose affiliate relationships plainly",
    p: "Many pages contain affiliate links. If you buy or sign up through them, we may earn a commission at no extra cost to you. This is how the research is funded, and the disclosure appears on every page that carries such a link, not buried in a policy you have to hunt for.",
  },
  {
    h: "We publish no ratings or testimonials of our own",
    p: "We do not score products out of five, award badges, or publish customer testimonials, case studies or invented statistics. Where a rating or figure appears it belongs to a third party and is attributed to them so you can weigh the source.",
  },
  {
    h: "Prices change, and we fix what is wrong",
    p: "Every page that quotes a price carries a caveat that terms change and asks you to confirm current pricing with the provider before you commit. We do not run a fixed review cycle. When a price moves or a claim turns out to be wrong, we correct the page, and we would rather hear about it from you than leave it standing.",
  },
];

export default function HowWeResearchPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">How we research</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Editorial standards</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          How we research
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Refer Labs publishes comparisons across health, software and business tools. This page explains how that work
          is done, who does it, how it is funded, and how to tell us when we get something wrong.
        </p>

        <div className="mt-12 space-y-0">
          {principles.map((item, i) => (
            <section key={item.h} className="border-t border-[#e5e9e7] py-8">
              <div className="grid gap-4 sm:grid-cols-[2.5rem_1fr]">
                <div className="text-xl font-bold text-[#0a7c42] tabular-nums">
                  {i + 1}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#10251b]">{item.h}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">{item.p}</p>
                </div>
              </div>
            </section>
          ))}

          <section className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-lg font-bold text-[#10251b]">Health content is information, not medical advice</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Some guides cover telehealth services and health products. These pages describe how a service works and
              what its published process involves. They are not medical advice and do not establish that any treatment
              is suitable for you. Prescription medicines in Australia are available only after assessment by a
              registered practitioner, and suitability is decided individually. Always consult a qualified health
              professional before starting, stopping or changing any treatment.
            </p>
          </section>

          <section className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-lg font-bold text-[#10251b]">Who writes this</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Refer Labs is a small independent Australian publisher, operated by Pepform Pty Ltd trading as Refer Labs,
              ABN 32 660 008 159. Comparisons are researched and written in-house. We are not the manufacturer,
              prescriber or provider of anything we cover, and we hold no stock and dispense nothing.
            </p>
          </section>

          <section className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-lg font-bold text-[#10251b]">Corrections</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2b362f]">
              Found a price that has changed, an offer that has expired, or a claim you think is wrong? Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>{" "}
              and we will review and update the page. Accuracy is the product.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#e5e9e7] pt-8">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
            Browse all guides &amp; comparisons →
          </Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
