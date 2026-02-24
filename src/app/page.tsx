import { ArrowRight } from "lucide-react";
import Link from "next/link";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const offers = [
  {
    num: "01",
    title: "Launch & Optimise Referral Programs",
    copy: "We design, structure, and deploy referral programs for SMBs, eCommerce brands, and growing businesses. From incentive modelling to partner onboarding and tracking systems, we build referral ecosystems that convert customers and networks into revenue channels — for both consumer and business-facing products.",
    bullets: [
      "Incentive and commission structure design",
      "Tracking system setup",
      "Partner onboarding frameworks",
      "Launch strategy and distribution rollout",
      "Ongoing optimisation",
    ],
    cta: "Launch a Referral Program",
    ctaHref: calendlyUrl,
    external: true,
  },
  {
    num: "02",
    title: "Elite Affiliate Program Distribution",
    copy: "We partner with B2B and B2C affiliate programs and systematically distribute them across high-intent digital communities. This is not limited to business audiences — we drive exposure for consumer products, subscription services, financial tools, and more across Reddit, niche forums, and engaged online groups.",
    bullets: [
      "Community-based exposure across Reddit, forums, and groups",
      "Channel testing and optimisation",
      "Structured content positioning",
      "Automation systems for scale",
      "Conversion refinement",
    ],
    cta: "Scale Affiliate Distribution",
    ctaHref: calendlyUrl,
    external: true,
  },
  {
    num: "03",
    title: "Influencer & Network Activation",
    copy: "We identify aligned operators, creators, consultants, and influencers who can represent your brand authentically — whether your audience is businesses or consumers. We structure partnerships that turn audiences into distribution channels with clear commercial terms.",
    bullets: [
      "LinkedIn and newsletter collaborations",
      "Blog and content integrations",
      "Network distribution via consultants and advisors",
      "Ambassador partnerships",
      "Structured amplification systems",
    ],
    cta: "Activate Influencer Channels",
    ctaHref: calendlyUrl,
    external: true,
  },
  {
    num: "04",
    title: "APAC Market Expansion",
    copy: "We help global businesses enter and grow in the APAC region through structured partnerships, referral ecosystems, and commercial representation.",
    bullets: [
      "Market validation and positioning",
      "Strategic partnership sourcing",
      "Referral-led growth models",
      "Commercial representation",
      "Local expansion advisory",
    ],
    cta: "Expand Into APAC",
    ctaHref: calendlyUrl,
    external: true,
  },
  {
    num: "05",
    title: "Product Creation & End-to-End Distribution",
    copy: "We build digital products, templates, and guides and distribute them through owned and partner channels. From concept to distribution, we control the growth engine.",
    bullets: [
      "Product concept validation",
      "Website and asset build",
      "Distribution system activation",
      "Multi-channel exposure",
      "Owned internal product portfolio",
    ],
    note: "We own selected products internally. Inquire for collaboration opportunities.",
    cta: "Discuss Product Collaboration",
    ctaHref: "/contact",
    external: false,
  },
];

const audience = [
  "SMBs and consumer brands launching referral programs",
  "B2B and B2C affiliate programs seeking distribution scale",
  "Influencers and creators seeking structured brand partnerships",
  "Global businesses entering APAC markets",
  "eCommerce and subscription businesses scaling acquisition",
  "Operators looking to collaborate on distribution-led products",
];

const howWeWork = [
  { step: "01", label: "Identify growth leverage" },
  { step: "02", label: "Structure the distribution engine" },
  { step: "03", label: "Activate channels" },
  { step: "04", label: "Optimise and scale" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,167,181,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(10,167,181,0.06),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-24 sm:pb-32 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-6">
            Growth & Distribution
          </p>
          <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] mb-7 text-white text-balance">
            Refer Labs Is a Growth<br className="hidden sm:block" /> &{" "}
            <span className="text-[#22C0CD]">Distribution Engine</span>
          </h1>
          <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed mb-10">
            We design referral systems, activate affiliates, secure influencers, expand businesses into APAC, and build distribution-driven products.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/25"
            >
              Partner With Us
            </a>
            <a
              href="#growth-engines"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.06] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white hover:border-[#0AA7B5]/40"
            >
              Explore Our Growth Systems
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section id="growth-engines" className="border-t border-[#0AA7B5]/10">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="mb-16 sm:mb-20 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-4">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
              Five Growth Engines.<br />One Commercial Partner.
            </h2>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed">
              Refer Labs builds and activates scalable distribution systems. Whether you are launching a referral program, expanding into APAC, or scaling affiliate exposure for a consumer or business product, we structure the entire growth engine end-to-end.
            </p>
          </div>

          <div className="space-y-0">
            {offers.map((offer) => (
              <div
                key={offer.num}
                className="border-t border-[#0AA7B5]/10 py-12 sm:py-14 grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16"
              >
                {/* Left: Number + Title */}
                <div className="lg:pt-0.5">
                  <span className="block text-5xl font-black text-[#0AA7B5]/20 leading-none mb-3 select-none">
                    {offer.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {offer.title}
                  </h3>
                </div>

                {/* Right: Copy + Bullets + CTA */}
                <div>
                  <p className="text-white/55 leading-relaxed mb-7 text-sm sm:text-base">
                    {offer.copy}
                  </p>
                  <ul className="space-y-2.5 mb-7">
                    {offer.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-white/65">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {offer.note && (
                    <p className="text-[#0AA7B5]/60 text-xs mb-5 italic">{offer.note}</p>
                  )}
                  {offer.external ? (
                    <a
                      href={offer.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C0CD] hover:text-[#57E6FF] transition-colors"
                    >
                      {offer.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={offer.ctaHref}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C0CD] hover:text-[#57E6FF] transition-colors"
                    >
                      {offer.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="border-t border-[#0AA7B5]/10">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-4">
                Who We Work With
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                Built for Operators, Brands &<br className="hidden sm:block" /> Growth-Focused Businesses
              </h2>
              <ul className="space-y-4 mb-10">
                {audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm sm:text-base">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
              >
                Start a Conversation
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="border border-[#0AA7B5]/20 rounded-2xl p-8 bg-[#0AA7B5]/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-5">
                  We work with
                </p>
                <div className="space-y-3">
                  {[
                    "B2B SaaS",
                    "eCommerce & DTC Brands",
                    "Fintech & Payments",
                    "Consumer Apps & Subscriptions",
                    "Affiliate Programs (B2B & B2C)",
                    "Digital Product Operators",
                  ].map((label) => (
                    <div key={label} className="text-sm text-white/55 border-b border-[#0AA7B5]/10 pb-3 last:border-0 last:pb-0">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="border-t border-[#0AA7B5]/10">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="mb-12 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-4">
              Our Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Simple. Structured. Commercial.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {howWeWork.map((item, index) => (
              <div
                key={item.step}
                className={`py-8 pr-8 ${index !== 0 ? "sm:border-l sm:border-[#0AA7B5]/10 sm:pl-8 sm:pr-0 lg:pr-8" : ""}`}
              >
                <span className="block text-4xl font-black text-[#0AA7B5]/30 leading-none mb-4 select-none">
                  {item.step}
                </span>
                <p className="text-white/70 text-sm sm:text-base font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Close ── */}
      <section className="border-t border-[#0AA7B5]/10">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(10,167,181,0.14),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,167,181,0.05),transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-24 sm:py-32 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0AA7B5] mb-6">
              The Principle
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.05] tracking-tight">
              Distribution Is{" "}
              <span className="text-[#22C0CD]">Leverage.</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              If you control distribution, you control growth. Refer Labs builds and activates distribution systems that compound.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/25"
            >
              Partner With Refer Labs
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
