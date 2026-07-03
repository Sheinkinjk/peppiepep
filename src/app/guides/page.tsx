import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

export const metadata = generateSEOMetadata(seoConfig.guides);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides & Comparisons", item: `${SITE_URL}/guides` },
  ],
};

const hubs = [
  { href: "/weight-loss", label: "Weight loss", desc: "Telehealth, programs and the GP pathway, compared." },
  { href: "/hair-loss", label: "Hair loss", desc: "Clinical prescription treatment versus topical products." },
  { href: "/compare/website-builders", label: "Website builders", desc: "Free, AI-built and landing-page tools, sorted by job." },
  { href: "/compare/newsletter-platforms", label: "Newsletter platforms", desc: "Where to build an email audience, and what each takes." },
];

const sections = [
  {
    label: "Comparison roundups",
    description: "Head-to-head comparisons across categories. Independent, and never pay-to-rank.",
    guides: [
      { href: "/best-website-builder", label: "Best website builder 2026", desc: "Carrd vs Durable AI vs Butternut AI vs Swipe Pages." },
      { href: "/best-newsletter-platform", label: "Best newsletter platform 2026", desc: "beehiiv vs Substack vs ConvertKit." },
      { href: "/best-weight-loss-telehealth-australia", label: "Best weight loss telehealth", desc: "Moshy vs Juniper vs Better Being." },
      { href: "/best-hair-loss-treatment-australia", label: "Best hair loss treatment", desc: "Clinical telehealth vs topical products." },
      { href: "/best-peptide-supplier", label: "Best peptide supplier 2026", desc: "Apollo vs Ascension vs BioPeptiTech. Research use only." },
    ],
  },
  {
    label: "Weight loss & telehealth",
    description: "How Australia's online weight-loss services work, and which suits whom.",
    guides: [
      { href: "/moshy", label: "Moshy — offer & referral link", desc: "The current referral offer. No code required." },
      { href: "/moshy-review", label: "Moshy review", desc: "How the men's service actually runs, application to subscription." },
      { href: "/moshy-vs-juniper", label: "Moshy vs Juniper", desc: "The men's and women's platforms, split properly." },
      { href: "/moshy-vs-gp", label: "Telehealth vs your GP", desc: "Two doors to the same care. The practical trade." },
      { href: "/moshy-alternatives", label: "Moshy alternatives", desc: "The honest shortlist, including the option nobody markets." },
      { href: "/mens-health-telehealth-australia", label: "Men's health telehealth", desc: "The wider category and its limits." },
    ],
  },
  {
    label: "Hair loss & hair care",
    description: "Prescription telehealth and topical products for hair loss in Australia.",
    guides: [
      { href: "/moshhair", label: "Mosh — review & offer", desc: "Men's hair-loss telehealth. Process, options, current offer." },
      { href: "/dense", label: "Dense Hair Experts", desc: "Topical, non-prescription density and scalp products." },
    ],
  },
  {
    label: "Website builders & tools",
    description: "AI website builders, landing-page tools and digital business software, tested.",
    guides: [
      { href: "/carrd", label: "Carrd review", desc: "Free plan forever, Pro from $9/year. Best for simple sites." },
      { href: "/durableai", label: "Durable AI review", desc: "Generate a business website in 30 seconds, with CRM." },
      { href: "/butternut", label: "Butternut AI review", desc: "Full site from a prompt in 20 seconds. Free to try." },
      { href: "/swipepages", label: "Swipe Pages review", desc: "AMP landing pages under 1 second. 14-day free trial." },
      { href: "/carrd-vs-durable", label: "Carrd vs Durable AI", desc: "Cheap-and-simple vs AI-built business site." },
    ],
  },
  {
    label: "Creator & business tools",
    description: "Newsletter platforms and tools for online creators and operators.",
    guides: [
      { href: "/beehiiv", label: "beehiiv review", desc: "Free up to 2,500 subscribers. Compare vs Substack." },
      { href: "/incomelab", label: "IncomeLab", desc: "AI side-hustle ideas and frameworks for 2026." },
    ],
  },
  {
    label: "Research peptides",
    description: "For laboratory research use only. Purity, catalogue and current offers.",
    guides: [
      { href: "/apollopeptides", label: "Apollo Peptide Sciences", desc: "Broad catalogue. Current offer via referral link." },
      { href: "/ascensionpeptides", label: "Ascension Peptides", desc: "High-purity focus. Current offer via referral link." },
      { href: "/biopeptitech", label: "BioPeptiTech", desc: "Lab-grade compounds. Frequent sale events." },
    ],
  },
];

export default function GuidesPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main id="main-content" className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-7 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-[#22d3ee]">Refer Labs</Link>
          <span>/</span>
          <span className="text-white/70">Guides</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">Independent comparisons</p>
          <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-white sm:text-5xl">
            Every guide, in one place
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Comparisons and reviews across health, software and business tools. Researched by people, disclosed on
            every page, and never sold to the highest bidder.
          </p>
        </div>

        {/* Category hubs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {hubs.map((h) => (
            <Link key={h.href} href={h.href} className="group rounded-2xl border border-[#22d3ee]/25 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-16px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22d3ee]">Category hub</span>
                <ArrowRight className="h-4 w-4 text-[#22d3ee] transition-transform group-hover:translate-x-0.5" />
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white group-hover:text-[#22d3ee]">{h.label}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{h.desc}</p>
            </Link>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-6 space-y-0">
          {sections.map((section) => (
            <section key={section.label} className="border-t border-white/[0.08] py-12">
              <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
                <div className="lg:pt-1">
                  <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">{section.label}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/40">{section.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.guides.map((guide) => (
                    <Link key={guide.href} href={guide.href} className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-[#22d3ee]/40">
                      <h3 className="text-[15px] font-bold text-white group-hover:text-[#22d3ee]">{guide.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{guide.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-white/[0.08] pt-10">
          <NewsletterSignup variant="band" source="guides" />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55">
            Some pages contain affiliate links, disclosed on the page. We may earn a commission if you buy through them,
            at no extra cost to you, and it never changes a conclusion. See{" "}
            <Link href="/how-we-research" className="font-semibold text-[#22d3ee] underline decoration-[#22d3ee]/30 underline-offset-4">how we research</Link>.
          </p>
        </div>
      </main>
    </ConsumerShell>
  );
}
