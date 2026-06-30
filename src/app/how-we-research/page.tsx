import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateSEOMetadata({
  title: "How We Research — Editorial Standards & Affiliate Disclosure | Refer Labs",
  description:
    "How Refer Labs researches and writes its comparison guides and reviews — our sources, our independence, our affiliate disclosure, and how we handle health content. Email corrections welcome.",
  url: `${SITE_URL}/how-we-research`,
  keywords: [
    "refer labs editorial standards",
    "how refer labs reviews products",
    "affiliate disclosure refer labs",
    "independent comparison methodology",
  ],
});

const CYAN = "#0AA7B5";
const CYAN_LT = "#22C0CD";

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
  name: "How We Research — Editorial Standards",
  url: `${SITE_URL}/how-we-research`,
  publisher: {
    "@type": "Organization",
    name: "Refer Labs",
    url: SITE_URL,
    founder: { "@type": "Person", name: "Jarred Krowitz" },
  },
};

const principles = [
  {
    h: "We test, read, and use before we recommend",
    p: "Every tool we cover is either used first-hand or assessed against its live product, current pricing, and documentation — not a press release. For services we cannot legally use ourselves (prescription telehealth, research-only compounds), we describe the process, eligibility, and what the published terms actually say, and we point readers to primary sources.",
  },
  {
    h: "Rankings are not for sale",
    p: "A brand cannot pay to rank higher, be added to a comparison, or have a negative point removed. Commercial relationships never change the order of a list or the substance of an assessment. Where two options are close, we say so rather than manufacturing a winner.",
  },
  {
    h: "We disclose affiliate relationships plainly",
    p: "Many pages contain affiliate links. If you buy or sign up through them, we may earn a commission at no extra cost to you. This is how the research is funded. The disclosure appears on every page that contains such links — not buried in a policy you have to hunt for.",
  },
  {
    h: "We date and revisit our work",
    p: "Pricing, free trials, and eligibility change. Guides carry a 'last reviewed' date and are revisited when a product materially changes. If something is out of date, that is a defect we want to fix — see corrections below.",
  },
];

export default function HowWeResearchPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.10),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">
        <nav className="mb-10 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <span className="text-white/60">How We Research</span>
        </nav>

        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN_LT }} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CYAN_LT }}>
              Editorial Standards
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.07] tracking-tight mb-5">
            How we research
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            Refer Labs publishes comparison guides and reviews across health, software, and creator tools. This page explains how that work is done, who does it, how it is funded, and how to tell us when we get something wrong.
          </p>
        </div>

        <div className="space-y-0">
          {principles.map((item, i) => (
            <section key={item.h} className="border-t border-[#0AA7B5]/10 py-8">
              <div className="grid sm:grid-cols-[2.5rem_1fr] gap-4">
                <div className="text-xl font-black" style={{ color: `${CYAN}80` }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">{item.h}</h2>
                  <p className="text-white/55 text-sm sm:text-base leading-relaxed">{item.p}</p>
                </div>
              </div>
            </section>
          ))}

          <section className="border-t border-[#0AA7B5]/10 py-8">
            <h2 className="text-lg font-bold text-white mb-2">Health content is informational, not medical advice</h2>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-3">
              Some of our guides cover telehealth platforms and health products. These pages describe how a service works and what its published process involves. They are not medical advice and do not establish that any treatment is suitable for you. Prescription medicines — including GLP-1 medications and hair-loss treatments such as finasteride — are only available in Australia after assessment by a registered practitioner, and suitability is decided individually.
            </p>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Always consult a qualified health professional before starting, stopping, or changing any treatment.
            </p>
          </section>

          <section className="border-t border-[#0AA7B5]/10 py-8">
            <h2 className="text-lg font-bold text-white mb-2">Who writes this</h2>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Refer Labs is an Australian growth and distribution company founded by Jarred Krowitz. Guides are produced and maintained by the Refer Labs editorial team. We are not the manufacturer or provider of the products we review.
            </p>
          </section>

          <section className="border-t border-[#0AA7B5]/10 py-8">
            <h2 className="text-lg font-bold text-white mb-2">Corrections</h2>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Found a price that has changed, an offer that has expired, or a claim you think is wrong? Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="underline decoration-[#0AA7B5]/50 underline-offset-4 hover:text-white">
                jarred@referlabs.com.au
              </a>{" "}
              and we will review and update the page. Accuracy is the product.
            </p>
          </section>
        </div>

        <div className="border-t border-[#0AA7B5]/10 pt-10 mt-2">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: CYAN }}>
            Browse all guides &amp; comparisons →
          </Link>
        </div>
      </main>
    </div>
  );
}
