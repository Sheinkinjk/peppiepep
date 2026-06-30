import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.bestNewsletterPlatform);

// ─── Affiliate URLs ───────────────────────────────────────────────────────────

import { BEEHIIV_URL } from "@/lib/affiliate-links";

const aff = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best Newsletter Platform 2026", item: `${SITE_URL}/best-newsletter-platform` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Newsletter Platforms 2026",
  description: "In-depth comparison of the best newsletter platforms — beehiiv, Substack, and ConvertKit.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "beehiiv", description: "Newsletter platform built for growth. Free up to 2,500 subscribers, 14-day trial of paid features. Built-in ad network, referral program, paid subscriptions.", url: `${SITE_URL}/beehiiv` },
    { "@type": "ListItem", position: 2, name: "Substack", description: "The simplest way to start a paid newsletter. No platform fee on free newsletters, 10% cut on paid. Strong discovery network.", url: "https://substack.com" },
    { "@type": "ListItem", position: 3, name: "ConvertKit (Kit)", description: "Email marketing platform with advanced automation and segmentation. Free up to 1,000 subscribers. Better for complex sequences and funnels.", url: "https://kit.com" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best newsletter platform in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "beehiiv is the strongest newsletter platform for creators focused on growth and monetisation in 2026. It offers a free plan up to 2,500 subscribers, a 14-day trial of paid features, and built-in tools including an ad network, referral program, and paid subscription support — all without taking a revenue cut on paid newsletters.",
      },
    },
    {
      "@type": "Question",
      name: "beehiiv vs Substack — which is better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For creators who want to grow fast and monetise without platform fees, beehiiv is the stronger choice. It offers more growth tools, better analytics, and does not take a percentage of paid subscription revenue. Substack is simpler to start on and has a built-in discovery network, making it a reasonable starting point for beginners, but beehiiv is the preferred platform once you are serious about building a newsletter business.",
      },
    },
    {
      "@type": "Question",
      name: "beehiiv vs ConvertKit — what is the difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ConvertKit (now Kit) is a full email marketing platform with advanced automation, tagging, and segmentation built for complex email sequences and sales funnels. beehiiv is focused specifically on newsletter publishing with a strong reader experience and built-in growth tools like referral programs and ad networks. If your primary goal is newsletter publishing and audience growth, beehiiv is better suited. If you need complex automation for a product funnel, ConvertKit is stronger.",
      },
    },
    {
      "@type": "Question",
      name: "What does Reddit say about newsletter platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reddit discussions about newsletter platforms in r/Newsletters, r/Entrepreneur, and r/SideProject consistently recommend beehiiv for creators who are serious about growing and monetising. The most common themes are that beehiiv's growth tools (referral programs, recommendations, ad network) are genuinely useful, that Substack's discovery network helps in the early days, and that ConvertKit is better for product-based businesses than newsletter-first creators. Searching 'beehiiv vs Substack Reddit' surfaces detailed community comparisons.",
      },
    },
    {
      "@type": "Question",
      name: "Which newsletter platform has the best free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "beehiiv offers the most generous free plan for newsletter creators — free up to 2,500 subscribers with access to core publishing features, analytics, and custom domains. Substack is also free with no subscriber cap, but takes a 10% cut of paid subscription revenue. ConvertKit is free up to 1,000 subscribers. For most newsletter creators getting started, beehiiv's free plan is the best starting point.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestNewsletterPlatform.title,
  description: seoConfig.bestNewsletterPlatform.description,
  url: `${SITE_URL}/best-newsletter-platform`,
  breadcrumb: breadcrumbSchema,
  mainEntity: faqSchema,
};

// ─── Comparison data ──────────────────────────────────────────────────────────

const CYAN    = "#0AA7B5";
const CYAN_LT = "#22C0CD";

const platforms = [
  {
    name: "beehiiv",
    badge: "Best for Growth",
    badgeColor: CYAN_LT,
    href: BEEHIIV_URL,
    internalHref: "/beehiiv",
    tagline: "The newsletter platform built for growth",
    free: "Free up to 2,500 subs",
    paid: "From ~$39/mo (Scale plan)",
    revenueShare: "0% — you keep all revenue",
    pros: [
      "Built-in referral program for subscriber growth",
      "Native ad network to monetise from day one",
      "No revenue cut on paid subscriptions",
      "14-day trial of all paid features, no credit card",
      "Best-in-class analytics and growth tracking",
      "Newsletter recommendations across the beehiiv network",
      "Custom domains on free plan",
    ],
    cons: [
      "Smaller discovery network than Substack",
      "Paid plans required for advanced features",
    ],
  },
  {
    name: "Substack",
    badge: "Best for Discovery",
    badgeColor: "#F59E0B",
    href: "https://substack.com",
    internalHref: null,
    tagline: "Simplest path to a paid newsletter",
    free: "Free — no subscriber cap",
    paid: "0% platform fee on free newsletters",
    revenueShare: "10% of paid subscription revenue",
    pros: [
      "Largest built-in discovery and recommendation network",
      "Extremely simple setup — live in minutes",
      "No monthly fee — only pay when you earn",
      "Strong brand trust with readers",
    ],
    cons: [
      "10% revenue cut on paid subscriptions adds up at scale",
      "Limited growth and automation tools compared to beehiiv",
      "No native ad network",
      "Less control over design and branding",
    ],
  },
  {
    name: "ConvertKit (Kit)",
    badge: "Best for Automation",
    badgeColor: "#8B5CF6",
    href: "https://kit.com",
    internalHref: null,
    tagline: "Advanced email marketing for product businesses",
    free: "Free up to 1,000 subscribers",
    paid: "From $29/mo (Creator plan)",
    revenueShare: "0% — commerce tools available",
    pros: [
      "Powerful automation sequences and tagging",
      "Strong segmentation for complex email funnels",
      "Integrates well with digital product sales",
      "Established platform with large creator community",
    ],
    cons: [
      "Not newsletter-first — reader experience is basic",
      "No built-in ad network or referral growth tools",
      "More complex than needed for newsletter-only creators",
      "Free plan is limited at 1,000 subscribers",
    ],
  },
];

const features = [
  { label: "Free plan",         beehiiv: "Up to 2,500 subs",   substack: "Unlimited",         convertkit: "Up to 1,000 subs" },
  { label: "Revenue cut",       beehiiv: "0%",                  substack: "10% on paid",       convertkit: "0%" },
  { label: "Referral program",  beehiiv: "Built in",            substack: "No",                convertkit: "No" },
  { label: "Ad network",        beehiiv: "Yes — native",        substack: "No",                convertkit: "No" },
  { label: "Paid subscriptions",beehiiv: "Yes — no rev share",  substack: "Yes — 10% cut",     convertkit: "Yes (via commerce)" },
  { label: "Discovery network", beehiiv: "Growing",             substack: "Large",             convertkit: "Limited" },
  { label: "Automation",        beehiiv: "Basic",               substack: "Minimal",           convertkit: "Advanced" },
  { label: "Analytics",         beehiiv: "Best in class",       substack: "Basic",             convertkit: "Good" },
  { label: "Free trial",        beehiiv: "14 days (paid features)", substack: "N/A",           convertkit: "14 days" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestNewsletterPlatformPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.04),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-white/60">Best Newsletter Platform 2026</span>
        </nav>

        {/* Jump Nav */}
        <div className="mb-10 flex flex-wrap gap-2">
          {["#comparison", "#feature-table", "#beehiiv", "#substack", "#convertkit", "#faq"].map((href) => {
            const label = href.slice(1).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            return (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:opacity-80"
                style={{ color: CYAN_LT, border: `1px solid ${CYAN}40`, background: `${CYAN}08` }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Hero */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C0CD]">Comparison Guide 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.07] text-white mb-5 tracking-tight">
            Best Newsletter Platform 2026:{" "}
            <span style={{ color: CYAN_LT }}>beehiiv vs Substack vs ConvertKit</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We compared the three leading newsletter platforms on free plans, monetisation, growth tools, and what the community actually recommends. Our verdict is below.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
            {["3 platforms compared", "Free plan breakdown", "No sponsored rankings"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <a
            {...aff(BEEHIIV_URL)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Try beehiiv Free — 14-Day Trial
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Our Pick */}
        <section id="comparison" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Our Pick: beehiiv</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            For newsletter creators focused on growing an audience and monetising without giving up revenue, beehiiv is the strongest platform available in 2026. The built-in referral program, ad network, and 0% revenue share on paid subscriptions put it well ahead of alternatives once you are past the earliest stage.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Substack is a legitimate starting point for its discovery network and zero monthly fee, but the 10% revenue cut becomes a real cost at scale. ConvertKit is better for product businesses with complex email sequences than for newsletter-first creators.
          </p>
          <a
            {...aff(BEEHIIV_URL)}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Start beehiiv Free
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* Platform Cards */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14 space-y-8">
          {platforms.map((p) => (
            <div
              key={p.name}
              id={p.name.toLowerCase().replace(/[^a-z]/g, "")}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: p.badgeColor, background: `${p.badgeColor}15`, border: `1px solid ${p.badgeColor}30` }}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-white/45 text-sm">{p.tagline}</p>
                </div>
                {p.internalHref ? (
                  <Link
                    href={p.internalHref}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: CYAN }}
                  >
                    Try {p.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ) : (
                  <a
                    {...aff(p.href)}
                    className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold text-white/70 transition-all hover:text-white"
                    style={{ borderColor: `${CYAN}30` }}
                  >
                    Visit {p.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Free Plan</p>
                  <p className="text-white/75 font-medium">{p.free}</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Paid From</p>
                  <p className="text-white/75 font-medium">{p.paid}</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Revenue Share</p>
                  <p className="text-white/75 font-medium">{p.revenueShare}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: CYAN_LT }}>Pros</p>
                  <ul className="space-y-2">
                    {p.pros.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400/70 mb-3">Cons</p>
                  <ul className="space-y-2">
                    {p.cons.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                        <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Table */}
        <section id="feature-table" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-white/30">Feature</th>
                  {["beehiiv", "Substack", "ConvertKit"].map((col) => (
                    <th key={col} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: col === "beehiiv" ? CYAN_LT : "rgba(255,255,255,0.3)" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                    <td className="py-3 pr-4 text-white/40 font-medium">{row.label}</td>
                    <td className="py-3 pr-4 text-white/70 font-medium">{row.beehiiv}</td>
                    <td className="py-3 pr-4 text-white/55">{row.substack}</td>
                    <td className="py-3 pr-4 text-white/55">{row.convertkit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reddit Verdict */}
        <section className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-5">What Reddit Says</h2>
          <div className="space-y-4 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Reddit discussions about newsletter platforms — primarily in r/Newsletters, r/Entrepreneur, r/SideProject, and r/blogging — consistently point to beehiiv as the preferred platform for creators who are serious about growing and monetising.
            </p>
            <p>
              The most common community feedback: beehiiv's referral program and ad network are genuinely useful tools that most platforms don't offer. Substack's discovery network is acknowledged as a real advantage in the early days, and the zero monthly fee makes it a low-risk start. ConvertKit gets recommended for product businesses with complex sequences but rarely for newsletter-first creators.
            </p>
            <p>
              The 10% revenue cut on Substack paid subscriptions comes up regularly as a reason creators migrate to beehiiv once their subscriber count grows. Searching "beehiiv vs Substack Reddit" surfaces multiple detailed community threads with firsthand comparisons.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-[#0AA7B5]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl">
            {[
              {
                q: "What is the best newsletter platform in 2026?",
                a: "beehiiv is the strongest newsletter platform for creators focused on growth and monetisation in 2026. It offers a free plan up to 2,500 subscribers, a 14-day trial of paid features, and built-in tools including an ad network, referral program, and paid subscription support — all without taking a revenue cut on paid newsletters.",
              },
              {
                q: "beehiiv vs Substack — which is better?",
                a: "For creators who want to grow fast and monetise without platform fees, beehiiv is the stronger choice. Substack is simpler to start on and has a built-in discovery network, making it a reasonable starting point, but beehiiv is the preferred platform once you are serious about building a newsletter business.",
              },
              {
                q: "beehiiv vs ConvertKit — what is the difference?",
                a: "ConvertKit (now Kit) is a full email marketing platform with advanced automation and segmentation built for complex funnels. beehiiv is newsletter-first with strong growth tools like referral programs and ad networks. For newsletter publishing and audience growth, beehiiv is better suited.",
              },
              {
                q: "What does Reddit say about newsletter platforms?",
                a: "Reddit communities consistently recommend beehiiv for serious newsletter creators. Common themes: beehiiv's growth tools are genuinely useful, Substack's discovery helps early on, and ConvertKit is better for product businesses than newsletter-first creators. Searching 'beehiiv vs Substack Reddit' surfaces detailed community comparisons.",
              },
              {
                q: "Which newsletter platform has the best free plan?",
                a: "beehiiv offers the most generous free plan for newsletter creators — free up to 2,500 subscribers with access to core publishing features, analytics, and custom domains. Substack is free with no subscriber cap but takes 10% of paid revenue. ConvertKit is free up to 1,000 subscribers.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="border-b border-white/[0.05] pb-6">
                <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-14 sm:pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to Start Your Newsletter?{" "}
            <span style={{ color: CYAN_LT }}>Try beehiiv Free.</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-7 leading-relaxed">
            Free up to 2,500 subscribers. 14-day trial of paid features. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              {...aff(BEEHIIV_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Try beehiiv Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/beehiiv"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold text-white/70 transition-all hover:text-white"
              style={{ borderColor: `${CYAN}30` }}
            >
              Full beehiiv Review
            </Link>
          </div>

          {/* Related guides */}
          <div className="mt-14 text-left max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-5">Related Guides</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/best-website-builder", label: "Best Website Builder 2026" },
                { href: "/beehiiv", label: "beehiiv Discount & Review" },
                { href: "/best-weight-loss-telehealth-australia", label: "Best Weight Loss Telehealth Australia" },
                { href: "/guides", label: "All Comparison Guides" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: CYAN }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
