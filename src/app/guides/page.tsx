import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.guides);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides & Comparisons", item: `${SITE_URL}/guides` },
  ],
};

const CYAN    = "#0AA7B5";
const CYAN_LT = "#22C0CD";

const sections = [
  {
    label: "Comparison Roundups",
    description: "Head-to-head comparisons across categories — independent and not pay-to-rank.",
    guides: [
      {
        href: "/best-website-builder",
        label: "Best Website Builder 2026",
        desc: "Carrd vs Durable AI vs Butternut AI vs Swipe Pages. Free plans, AI generation, and pricing compared.",
        tags: ["Website Builders", "AI Tools"],
      },
      {
        href: "/best-newsletter-platform",
        label: "Best Newsletter Platform 2026",
        desc: "beehiiv vs Substack vs ConvertKit. Free plans, revenue share, growth tools, and Reddit verdict.",
        tags: ["Newsletters", "Creator Tools"],
      },
      {
        href: "/best-peptide-supplier",
        label: "Best Peptide Supplier 2026",
        desc: "Apollo Peptide Sciences vs Ascension Peptides vs BioPeptiTech. Purity, catalogue, and current discount codes.",
        tags: ["Research Peptides"],
      },
      {
        href: "/best-weight-loss-telehealth-australia",
        label: "Best Weight Loss Telehealth Australia 2026",
        desc: "Moshy vs Juniper vs Better Being. GLP-1 access, eligibility, pricing, and community verdict.",
        tags: ["Australia", "Health"],
      },
      {
        href: "/best-hair-loss-treatment-australia",
        label: "Best Hair Loss Treatment Australia 2026",
        desc: "Mosh vs Dense Hair Experts vs telehealth options. Clinical vs topical approach explained.",
        tags: ["Australia", "Health"],
      },
    ],
  },
  {
    label: "Health & Wellness",
    description: "Australian health providers, telehealth platforms, and wellness products — assessed independently.",
    guides: [
      {
        href: "/moshhair",
        label: "Mosh Hair Loss — Discount Code & Review",
        desc: "Access the current Mosh Hair referral offer. Covers treatment options, process, and what the community says.",
        tags: ["Australia", "Hair Loss"],
      },
      {
        href: "/moshy",
        label: "Moshy Weight Loss — Discount Code & Review",
        desc: "Current Moshy referral offer. Covers the GLP-1 eligibility process, Moshy vs Juniper, and community reviews.",
        tags: ["Australia", "Weight Loss"],
      },
      {
        href: "/moshy-vs-juniper",
        label: "Moshy vs Juniper — Head to Head",
        desc: "Australia's two most-compared weight-loss telehealth platforms. Men vs women, coaching vs clinical, cost, and the Reddit verdict.",
        tags: ["Australia", "Weight Loss"],
      },
      {
        href: "/dense",
        label: "Dense Hair Experts — Current Offer",
        desc: "Direct access to the Dense Hair Experts affiliate link. No code required.",
        tags: ["Australia", "Hair Care"],
      },
      {
        href: "/apollopeptides",
        label: "Apollo Peptide Sciences — Discount Code",
        desc: "Current Apollo Peptide Sciences offer via affiliate link. Research peptides sale.",
        tags: ["Research Peptides"],
      },
      {
        href: "/ascensionpeptides",
        label: "Ascension Peptides — Discount Code",
        desc: "Current Ascension Peptides offer via affiliate link. High-purity research compounds.",
        tags: ["Research Peptides"],
      },
      {
        href: "/biopeptitech",
        label: "BioPeptiTech — Discount Code",
        desc: "Current BioPeptiTech offer via affiliate link. Lab-grade research peptides.",
        tags: ["Research Peptides"],
      },
    ],
  },
  {
    label: "Website Builders & Tools",
    description: "Reviews and access pages for AI website builders, landing page tools, and digital business software.",
    guides: [
      {
        href: "/carrd",
        label: "Carrd — Free Website Builder Review",
        desc: "Carrd review 2026. Free plan forever, Pro from $9/year. Best for portfolios, link-in-bio, and simple sites.",
        tags: ["Website Builder"],
      },
      {
        href: "/durableai",
        label: "Durable AI — AI Website Builder Review",
        desc: "Durable AI review 2026. Generate a business website in 30 seconds. Covers pricing, free trial, and comparisons.",
        tags: ["AI Website Builder"],
      },
      {
        href: "/butternut",
        label: "Butternut AI — AI Website Generator Review",
        desc: "Butternut AI review 2026. Full website generated from a prompt in 20 seconds. Free to try.",
        tags: ["AI Website Builder"],
      },
      {
        href: "/swipepages",
        label: "Swipe Pages — Landing Page Builder Review",
        desc: "Swipe Pages review 2026. AMP landing pages under 1 second load time. 14-day free trial.",
        tags: ["Landing Pages"],
      },
      {
        href: "/carrd-vs-durable",
        label: "Carrd vs Durable AI — Head to Head",
        desc: "Cheapest one-page builder vs AI-built business site with CRM. Pricing, AI, and which to pick.",
        tags: ["Website Builders"],
      },
    ],
  },
  {
    label: "Creator & Business Tools",
    description: "Newsletter platforms, AI tools, and side hustle resources for online creators and operators.",
    guides: [
      {
        href: "/beehiiv",
        label: "beehiiv — Newsletter Platform Review",
        desc: "beehiiv review 2026. Free up to 2,500 subscribers, 14-day trial of paid features. Compare vs Substack.",
        tags: ["Newsletter", "Creator Tools"],
      },
      {
        href: "/incomelab",
        label: "IncomeLab — AI Side Hustle Platform",
        desc: "AI side hustle ideas and structured frameworks for making money with AI tools in 2026.",
        tags: ["AI Tools", "Side Hustle"],
      },
      {
        href: "/referral-blueprint",
        label: "Referral Growth Blueprint",
        desc: "250+ researched affiliate programs, personalised strategy brief, SEO page concepts, and distribution playbooks. $799 AUD, delivered in 48 hours.",
        tags: ["Blueprint", "Affiliate"],
      },
      {
        href: "/blog/best-affiliate-programs-australia-2026",
        label: "Best Affiliate Programs Australia 2026",
        desc: "High-commission and recurring affiliate programs for Australians — health, SaaS, fintech, and creator niches compared.",
        tags: ["Affiliate", "Australia"],
      },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.10),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <span className="text-white/60">Guides & Comparisons</span>
        </nav>

        {/* Hero */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C0CD]">Independent Comparisons</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.07] text-white mb-5 tracking-tight">
            Guides &{" "}
            <span style={{ color: CYAN_LT }}>Comparisons</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl">
            Honest comparison guides covering health providers, website builders, newsletter platforms, peptide suppliers, and business tools. Not a pay-to-rank directory.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-0">
          {sections.map((section) => (
            <section key={section.label} className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
              <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
                <div className="lg:pt-1">
                  <h2 className="text-base font-black text-white mb-2">{section.label}</h2>
                  <p className="text-white/35 text-xs leading-relaxed">{section.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.guides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-[#0AA7B5]/30 hover:bg-[#0AA7B5]/[0.04]"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {guide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest"
                            style={{ color: CYAN, background: `${CYAN}12`, border: `1px solid ${CYAN}25` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#22C0CD] transition-colors">
                        {guide.label}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed mb-3">{guide.desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors" style={{ color: CYAN }}>
                        Read guide
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom note */}
        <div className="border-t border-[#0AA7B5]/10 pt-12 text-center">
          <p className="text-white/30 text-xs max-w-lg mx-auto leading-relaxed">
            Some pages on this site contain affiliate links. We earn a commission if you purchase through them, at no extra cost to you. Our assessments are independent and not influenced by commercial arrangements with the brands featured.
          </p>
        </div>

      </main>
    </div>
  );
}
