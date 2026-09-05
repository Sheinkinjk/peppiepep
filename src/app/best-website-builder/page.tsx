import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FeatureMatrix from "@/components/consumer/FeatureMatrix";

export const metadata = generateSEOMetadata(seoConfig.bestWebsiteBuilder);

// ─── Affiliate URLs ───────────────────────────────────────────────────────────

import { CARRD_URL, DURABLE_URL, BUTTERNUT_URL, SWIPE_PAGES_URL as SWIPE_URL } from "@/lib/affiliate-links";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
const aff = (url: string, loc = "best-website-builder") => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
  "data-cta": loc,
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Website Builder Comparison 2026", item: `${SITE_URL}/best-website-builder` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Website Builders 2026",
  description: "In-depth comparison of the best website builders including AI-powered options, Carrd, Durable AI, Butternut AI, and Swipe Pages.",
  numberOfItems: 4,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Carrd", description: "Simplest and most affordable one-page website builder. Free plan available. Pro from $9/year.", url: `${SITE_URL}/carrd` },
    { "@type": "ListItem", position: 2, name: "Durable AI", description: "AI website builder for service businesses. Generates a site in 30 seconds with built-in CRM and invoicing.", url: `${SITE_URL}/durableai` },
    { "@type": "ListItem", position: 3, name: "Butternut AI", description: "Fastest AI website generator. Full multi-page site in 20 seconds with SEO tools and blog publishing.", url: `${SITE_URL}/butternut` },
    { "@type": "ListItem", position: 4, name: "Swipe Pages", description: "Dedicated landing page builder with AMP technology for paid ad campaigns. 14-day free trial.", url: `${SITE_URL}/swipepages` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is the best website builder for beginners?", acceptedAnswer: { "@type": "Answer", text: "Carrd is the easiest starting point for beginners, a free plan, a simple editor, and most users are live within an hour. For zero-effort setup, Butternut AI and Durable AI generate a complete website from a text description in under 30 seconds with no design skill required." } },
    { "@type": "Question", name: "What is the best AI website builder in 2026?", acceptedAnswer: { "@type": "Answer", text: "Butternut AI and Durable AI are the strongest AI website builders available in 2026. Butternut generates a full multi-page site in 20 seconds with strong copy quality. Durable generates in 30 seconds and adds a CRM and invoicing for service businesses. Both offer free generation before you subscribe." } },
    { "@type": "Question", name: "What is the cheapest website builder?", acceptedAnswer: { "@type": "Answer", text: "Carrd is the most affordable option with a genuine free plan and Pro plans from $9 per year. Butternut AI and Durable AI both allow free website generation before you commit to a paid publishing plan." } },
    { "@type": "Question", name: "Which website builder is best for Google Ads?", acceptedAnswer: { "@type": "Answer", text: "Swipe Pages is the strongest choice for Google Ads landing pages. Its AMP technology delivers mobile pages in under one second, with built-in A/B testing and dynamic text replacement for campaign personalisation." } },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestWebsiteBuilder.title,
  description: seoConfig.bestWebsiteBuilder.description,
  url: seoConfig.bestWebsiteBuilder.url,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "website builder comparison 2026" },
    { "@type": "Thing", name: "AI website builder 2026" },
    { "@type": "Thing", name: "best website builder 2026" },
    { "@type": "Thing", name: "free website builder" },
    { "@type": "Thing", name: "website builder discount" },
    { "@type": "Thing", name: "AI website generator free" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};


// ─── Design tokens ────────────────────────────────────────────────────────────

const CYAN    = "#0a7c42";
const CYAN_LT = "#0a7c42";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pro({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#2b362f] leading-snug">
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
      {text}
    </li>
  );
}

function Con({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#9aa39c] leading-snug">
      <XCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#9aa39c]" />
      {text}
    </li>
  );
}


// ─── Platform card ────────────────────────────────────────────────────────────

interface PlatformCardProps {
  id: string;
  index: string;
  name: string;
  tagline: string;
  deal: string;
  dealNote: string;
  pricing: string;
  pros: string[];
  cons: string[];
  affUrl: string;
  ctaLabel: string;
  internalUrl: string;
  reviewLabel: string;
}

function PlatformCard({
  id, index, name, tagline, deal, dealNote, pricing,
  pros, cons, affUrl, ctaLabel, internalUrl, reviewLabel,
}: PlatformCardProps) {
  return (
    <section
      id={id}
      className="border-t border-[#e5e9e7] py-10 sm:py-12 scroll-mt-24"
    >
      <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">

        {/* Left, identity + content */}
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-black text-[#2b362f] flex-shrink-0"
              style={{ background: `${CYAN}1A`, border: `1px solid ${CYAN}30` }}
            >
              {index}
            </div>
            <h2 className="text-xl font-black text-[#10251b] leading-none">{name}</h2>
          </div>

          {/* Tagline */}
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed mb-5 max-w-lg">
            {tagline}
          </p>

          {/* Pros / Cons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Strengths</p>
              <ul className="space-y-2">
                {pros.map((p) => <Pro key={p} text={p} />)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Limitations</p>
              <ul className="space-y-2">
                {cons.map((c) => <Con key={c} text={c} />)}
              </ul>
            </div>
          </div>
        </div>

        {/* Right, deal + CTA */}
        <div className="flex flex-col gap-4">
          {/* Deal highlight */}
          <div
            className="rounded-xl p-5"
            style={{ background: `${CYAN}0D`, border: `1px solid ${CYAN}30` }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: CYAN_LT }}>
              Current offer
            </p>
            <p className="text-[#10251b] font-black text-base leading-snug mb-1">{deal}</p>
            <p className="text-[#3d4b44] text-xs leading-snug">{dealNote}</p>
            <div className="mt-3 pt-3 border-t border-[#e5e9e7]">
              <p className="text-[11px] text-[#9aa39c]">
                <span className="text-[#3d4b44] font-medium">Pricing: </span>{pricing}
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            {...aff(affUrl)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: CYAN, boxShadow: `0 6px 24px ${CYAN}30` }}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            href={internalUrl}
            className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors hover:opacity-80"
            style={{ color: `${CYAN_LT}60` }}
          >
            {reviewLabel} <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const platforms: PlatformCardProps[] = [
  {
    id: "carrd",
    index: "01",
    name: "Carrd",
    tagline: "The fastest, cheapest way to get a clean professional site live. Free plan available permanently, no credit card, no trial expiry.",
    deal: "Free plan forever",
    dealNote: "Publish up to 3 sites at no cost. Pro plans start at $9/year, the lowest annual price in the category.",
    pricing: "Free / Pro from $9/year",
    pros: [
      "Permanent free plan, no expiry",
      "Pro plans from $9/year",
      "Zero learning curve, live within the hour",
      "Trusted by a large indie and creator community",
    ],
    cons: [
      "Single-page only, no multi-page support",
      "No AI generation or blog tools",
    ],
    affUrl: CARRD_URL,
    ctaLabel: "Start free on Carrd",
    internalUrl: "/carrd",
    reviewLabel: "Full Carrd review",
  },
  {
    id: "durable",
    index: "02",
    name: "Durable AI",
    tagline: "AI generates a complete business website in 30 seconds, plus a built-in CRM and invoicing. No account needed to try it.",
    deal: "Generate free, no account needed",
    dealNote: "Preview your full AI-generated website before signing up. Subscribe only when you're ready to publish.",
    pricing: "Free to generate / paid to publish",
    pros: [
      "Website generated in 30 seconds",
      "CRM and invoicing included",
      "Google Business Profile integration",
      "Purpose-built for service businesses",
    ],
    cons: [
      "Limited design flexibility",
      "No e-commerce or blog support",
    ],
    affUrl: DURABLE_URL,
    ctaLabel: "Generate free with Durable",
    internalUrl: "/durableai",
    reviewLabel: "Full Durable AI review",
  },
  {
    id: "butternut",
    index: "03",
    name: "Butternut AI",
    tagline: "Describe your business and get a full multi-page website in 20 seconds, the fastest AI generation available, with built-in SEO and blog tools.",
    deal: "Generate free, no account needed",
    dealNote: "See your complete AI-generated site before committing. Custom domain publishing on paid plans.",
    pricing: "Free to generate / paid to publish",
    pros: [
      "Full multi-page site in 20 seconds",
      "High-quality copy out of the box",
      "SEO tools and blog publishing included",
      "No account required to generate",
    ],
    cons: [
      "No built-in CRM or invoicing",
      "No e-commerce functionality",
    ],
    affUrl: BUTTERNUT_URL,
    ctaLabel: "Generate free with Butternut",
    internalUrl: "/butternut",
    reviewLabel: "Full Butternut AI review",
  },
  {
    id: "swipepages",
    index: "04",
    name: "Swipe Pages",
    tagline: "Landing pages that load in under one second via AMP technology. Built for paid ad campaigns, with A/B testing and dynamic text replacement included.",
    deal: "14-day free trial",
    dealNote: "No credit card required. Full access to all features including AMP pages, A/B testing, and agency workspaces.",
    pricing: "Startup to Agency plans",
    pros: [
      "AMP pages, sub-second mobile load",
      "A/B testing built in",
      "Dynamic text replacement for ad campaigns",
      "No credit card for trial",
    ],
    cons: [
      "Landing pages only, not a full website solution",
      "Higher entry price than general builders",
    ],
    affUrl: SWIPE_URL,
    ctaLabel: "Start 14-day free trial",
    internalUrl: "/swipepages",
    reviewLabel: "Full Swipe Pages review",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BestWebsiteBuilderPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Best Website Builder</span>
          </nav>

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="pt-10 pb-8 sm:pt-12">

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Best Website Builder 2026:{" "}
              <span style={{ color: CYAN_LT }}>Four Platforms. One Clear Answer.</span>
            </h1>

            {/* Above the first affiliate link, not below it. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Most people need Carrd (free, permanent, live in an hour) or one of the AI builders. Swipe Pages sits in a different category entirely, it is a conversion tool for paid ad campaigns, not a general website solution.
            </p>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
              Below: what each platform is actually built for, current pricing, current offers, and a direct link to get started. No affiliate fluff, each verdict is based on what the product does well and who it will fail.
            </p>
            <p className="mb-7 text-sm">
              <Link href="/website-builder-quiz" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4 hover:text-[#086536]">
                Not sure which fits? Take the 60-second quiz →
              </Link>
            </p>

            {/* Jump nav */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { href: "#carrd",      label: "Carrd" },
                { href: "#durable",    label: "Durable AI" },
                { href: "#butternut",  label: "Butternut AI" },
                { href: "#swipepages", label: "Swipe Pages" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold transition-all hover:opacity-80"
                  style={{ color: CYAN_LT, border: `1px solid ${CYAN}40`, background: `${CYAN}08` }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </section>

          {/* ── Quick Verdict (answer-first, GEO) ─────────────────────────────── */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>
                Quick Verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                For a fast, permanent site at the lowest cost, Carrd is the pick, free forever and live within an hour. For an AI-built business website, Durable AI (with built-in CRM and invoicing) or Butternut AI (a full multi-page site in about 20 seconds) lead. Swipe Pages is a different category: AMP landing pages built for paid-ad campaigns, not a general website builder.
              </p>
            </div>
          </section>

          {/* ── Quick picks table ─────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8">
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[540px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-36">Platform</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Best for</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Offer / Trial</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Pricing</th>
                    <th className="pb-3 pl-3 text-right text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Carrd",        bestFor: "Portfolios, link-in-bio",      offer: "Free plan forever",            price: "Free / $9/yr",        href: "#carrd",      affUrl: CARRD_URL,     cta: "Start free" },
                    { name: "Durable AI",   bestFor: "Local service businesses",     offer: "Generate free, no account",    price: "Free gen / paid pub", href: "#durable",    affUrl: DURABLE_URL,   cta: "Try free" },
                    { name: "Butternut AI", bestFor: "Startups, SMBs, personal brand", offer: "Generate free, no account",  price: "Free gen / paid pub", href: "#butternut",  affUrl: BUTTERNUT_URL, cta: "Try free" },
                    { name: "Swipe Pages",  bestFor: "Paid ad campaigns",            offer: "14-day trial, no credit card", price: "From $29/mo",         href: "#swipepages", affUrl: SWIPE_URL,     cta: "Start trial" },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors">
                      <td className="py-3 pr-4">
                        <a href={row.href} className="text-[#10251b] font-bold text-sm hover:opacity-80 transition-opacity">{row.name}</a>
                      </td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{row.bestFor}</td>
                      <td className="py-3 px-3 text-xs font-semibold" style={{ color: CYAN_LT }}>{row.offer}</td>
                      <td className="py-3 px-3 text-[#9aa39c] text-xs">{row.price}</td>
                      <td className="py-3 pl-3 text-right">
                        <a
                          {...aff(row.affUrl)}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0a7c42] px-3 py-1.5 text-[11px] font-bold text-white whitespace-nowrap transition-all hover:-translate-y-0.5 hover:bg-[#086536]"
                        >
                          {row.cta} <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Platform cards ────────────────────────────────────────────────── */}
          {platforms.map((p) => (
            <PlatformCard key={p.id} {...p} />
          ))}

          {/* ── Verdict ──────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              The Verdict
            </h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { label: "Use Carrd if:", body: "You need a clean one-page site, portfolio, landing page, link-in-bio, or personal brand, and want the lowest cost option on the market. Free forever. Pro from $9/year. Nothing else comes close on price-to-quality for single-page use cases." },
                { label: "Use Durable AI if:", body: "You are a local service business, trades, consultants, coaches, therapists, and want a website, a CRM to track leads, and invoicing in one platform, generated in 30 seconds from your business name and location. Not for e-commerce or content sites." },
                { label: "Use Butternut AI if:", body: "You want the fastest AI-generated multi-page website with the strongest copy quality out of the box. No account required to generate and preview. Better than Durable for content-heavy sites; lacks the CRM and invoicing Durable includes." },
                { label: "Use Swipe Pages if:", body: "You spend money on Google Ads or Meta Ads and your landing pages are costing you conversions due to slow mobile load times. AMP pages load in under one second. A/B testing and dynamic text replacement built in. Not a website solution, a dedicated conversion tool for paid traffic." },
              ].map(({ label, body }) => (
                <div key={label} className="border-b border-[#e5e9e7] pb-4">
                  <p className="text-sm font-bold text-[#10251b] mb-1">{label}</p>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Full feature breakdown ────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              Full Feature Breakdown
            </h2>

            <FeatureMatrix
              firstColLabel="Feature"
              columns={[
                { name: "Carrd" },
                { name: "Durable AI" },
                { name: "Butternut AI" },
                { name: "Swipe Pages" },
              ]}
              rows={[
                { label: "Free plan / trial", vals: [true,  true,  true,  false], note: "Swipe Pages: 14-day trial" },
                { label: "AI generation",     vals: [false, true,  true,  false] },
                { label: "Multi-page sites",  vals: [false, true,  true,  true]  },
                { label: "Custom domain",     vals: [true,  true,  true,  true]  },
                { label: "AMP mobile pages",  vals: [false, false, false, true]  },
                { label: "A/B testing",       vals: [false, false, false, true]  },
                { label: "Built-in CRM",      vals: [false, true,  false, false] },
                { label: "Blog / SEO tools",  vals: [false, false, true,  false] },
                { label: "No-code editor",    vals: [true,  true,  true,  true]  },
                { label: "Agency workspaces", vals: [false, false, false, true]  },
                { label: "Starting price",    vals: ["Free / $9/yr", "Free gen", "Free gen", "14-day trial"] },
              ]}
            />
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is the best website builder for beginners?",
                  a: "Carrd is the easiest starting point for beginners, a free plan, a simple editor, and most users are live within an hour. For zero-effort setup, Butternut AI and Durable AI generate a complete website from a text description in under 30 seconds with no design skill required.",
                },
                {
                  q: "What is the best AI website builder in 2026?",
                  a: "Butternut AI and Durable AI are the strongest AI website builders in 2026. Butternut generates a full multi-page site in 20 seconds with strong copy quality. Durable generates in 30 seconds and adds a CRM and invoicing for service businesses. Both offer free generation before you subscribe.",
                },
                {
                  q: "What is the cheapest website builder?",
                  a: "Carrd is the most affordable option with a genuine free plan and Pro plans from $9 per year. Butternut AI and Durable AI both allow free website generation before you commit to a paid publishing plan.",
                },
                {
                  q: "Which website builder is best for Google Ads?",
                  a: "Swipe Pages is the strongest choice for paid ad landing pages. Its AMP technology delivers mobile pages in under one second, with built-in A/B testing and dynamic text replacement for campaign personalisation. It is a dedicated conversion tool for paid traffic, narrower in scope than a general website builder.",
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2">{q}</h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Disclaimer + internal links ───────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains affiliate referral links to Carrd, Durable AI, Butternut AI, and Swipe Pages. Comparisons are based on publicly available information at time of publication and may change.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/carrd" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Full Carrd review
              </Link>
              <Link href="/durableai" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Full Durable AI review
              </Link>
              <Link href="/butternut" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Full Butternut AI review
              </Link>
              <Link href="/swipepages" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Full Swipe Pages review
              </Link>
              <Link href="/durable-vs-butternut" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Durable AI vs Butternut AI
              </Link>
              <Link href="/carrd-vs-butternut" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Carrd vs Butternut AI
              </Link>
            </div>
          </section>

        </div>
      </main>
      <StickyCta href={CARRD_URL} product="Carrd · website builder" label="Try free" />
    </ConsumerShell>
  );
}
