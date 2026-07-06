import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.services);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const services = [
  {
    num: "01",
    title: "Launch & Optimise Referral Programs",
    copy: "We design, structure, and deploy referral programs for SMBs, eCommerce brands, and growing businesses. From incentive modelling to partner onboarding and tracking systems, we build referral ecosystems that convert customers and networks into revenue channels, for both consumer and business-facing products.",
    bullets: [
      "Incentive and commission structure design",
      "Tracking system setup and integration",
      "Partner onboarding frameworks",
      "Launch strategy and distribution rollout",
      "Ongoing performance optimisation",
    ],
  },
  {
    num: "02",
    title: "Elite Affiliate Program Distribution",
    copy: "We partner with B2B and B2C affiliate programs and systematically distribute them across high-intent digital communities. This is not limited to business audiences, we drive exposure for consumer products, subscription services, financial tools, and more. Community placement is targeted, structured, and built to convert.",
    bullets: [
      "Community-based exposure across online communities, niche forums, and groups",
      "Channel testing and performance optimisation",
      "Structured content positioning",
      "Automation systems for scale",
      "Conversion tracking and refinement",
    ],
  },
  {
    num: "03",
    title: "Influencer & Network Activation",
    copy: "We identify aligned operators, creators, consultants, and influencers who can represent your brand authentically, whether your audience is businesses or consumers. We structure partnerships that turn audiences into distribution channels with clear commercial terms.",
    bullets: [
      "LinkedIn and newsletter collaborations",
      "Blog and content integrations",
      "Network distribution via consultants and advisors",
      "Ambassador partnerships",
      "Structured amplification systems",
    ],
  },
  {
    num: "04",
    title: "APAC Market Expansion",
    copy: "We help global businesses enter and grow in the APAC region through structured partnerships, referral ecosystems, and commercial representation. We operate as your on-the-ground partner without the overhead of local headcount.",
    bullets: [
      "Market validation and positioning",
      "Strategic partnership sourcing",
      "Referral-led growth models",
      "Commercial representation",
      "Local expansion advisory",
    ],
  },
  {
    num: "05",
    title: "Product Creation & End-to-End Distribution",
    copy: "We build digital products, templates, and guides and distribute them through owned and partner channels. From concept to distribution, we control the entire growth engine. We also own selected products internally.",
    bullets: [
      "Product concept validation",
      "Website and asset build",
      "Distribution system activation",
      "Multi-channel exposure",
      "Owned internal product portfolio",
    ],
    note: "We own selected products internally. Inquire for collaboration opportunities.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.10),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] text-white mb-6 tracking-tight">
            Five Growth Engines.<br />
            <span className="text-[#22C0CD]">One Commercial Partner.</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Refer Labs builds and activates scalable distribution systems for B2B and B2C businesses. We structure the entire growth engine end-to-end, from launch through to scale.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
          >
            Partner With Us
          </a>
        </div>

        {/* Services List */}
        <div>
          {services.map((service) => (
            <div
              key={service.num}
              className="border-t border-[#0AA7B5]/10 py-12 sm:py-14 grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16"
            >
              <div className="lg:pt-0.5">
                <span className="block text-5xl font-black text-[#0AA7B5]/20 leading-none mb-3 select-none">
                  {service.num}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {service.title}
                </h2>
              </div>

              <div>
                <p className="text-white/55 leading-relaxed mb-7 text-sm sm:text-base">
                  {service.copy}
                </p>
                <ul className="space-y-2.5 mb-7">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/65">
                      <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                {service.note && (
                  <p className="text-[#0AA7B5]/60 text-xs italic mb-5">{service.note}</p>
                )}
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C0CD] hover:text-[#57E6FF] transition-colors"
                >
                  Discuss this service
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Distribution Is{" "}
            <span className="text-[#22C0CD]">Leverage.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed mt-4">
            If you control distribution, you control growth. Let us build the engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Partner With Refer Labs
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Send Us a Message
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
