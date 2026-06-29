import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const engines = [
  {
    num: "01",
    title: "Referral Program Launch",
    who: "SMBs, eCommerce brands, and subscription businesses that want to convert their existing customer base into a growth channel.",
    fits: [
      "You have an existing customer base but no structured referral program",
      "You sell a product where satisfied customers naturally recommend you",
      "You want a repeatable acquisition system that reduces paid ad dependency",
      "You are an eCommerce, SaaS, or service business with referral potential",
      "You need incentive design, tracking infrastructure, and rollout support",
    ],
    notFit: "Pre-revenue businesses with no existing customer base.",
    cta: "Launch a Referral Program",
  },
  {
    num: "02",
    title: "Elite Affiliate Program Distribution",
    who: "B2B and B2C businesses with established affiliate programs that need systematic distribution across high-intent digital communities at scale.",
    fits: [
      "You run an affiliate program that is not generating consistent volume",
      "You sell a consumer product, financial tool, subscription service, or digital product",
      "You want exposure across Reddit, niche forums, and engaged online communities",
      "You need structured content positioning, not just link drops",
      "You want automation and optimisation built in from day one",
    ],
    notFit: "Businesses that do not yet have a live affiliate program or trackable offer.",
    cta: "Scale Affiliate Distribution",
  },
  {
    num: "03",
    title: "Influencer & Network Activation",
    who: "Consumer brands, B2B companies, and eCommerce operators that want authentic representation through aligned creators, consultants, and industry voices.",
    fits: [
      "You want to reach audiences through trusted voices rather than paid ads",
      "Your product suits LinkedIn creators, newsletter operators, or niche bloggers",
      "You are a consumer brand looking for ambassador and creator partnerships",
      "You are a B2B business wanting consultant or advisor-led distribution",
      "You want structured deals with clear commercial terms, not ad hoc arrangements",
    ],
    notFit: "Businesses with no defined target audience or brand positioning.",
    cta: "Activate Influencer Channels",
  },
  {
    num: "04",
    title: "APAC Market Expansion",
    who: "Global businesses that want to enter and grow in the APAC region without committing to local headcount before validating demand.",
    fits: [
      "You have product-market fit in your home market and want to test a new region",
      "You are headquartered in the US, UK, Europe, or another APAC market",
      "You want strategic partnership sourcing and referral-led entry",
      "You need commercial representation without the cost of a local hire",
      "You want to validate demand before committing to a permanent regional team",
    ],
    notFit: "Businesses with no existing revenue or product-market fit in any market.",
    cta: "Expand Into APAC",
  },
  {
    num: "05",
    title: "Product Creation & Distribution",
    who: "Operators, consultants, and entrepreneurs who want to build distribution-first digital products and take them to market through owned and partner channels.",
    fits: [
      "You have knowledge, systems, or IP that can be packaged into a sellable product",
      "You want to build a digital product, template, or guide with a distribution plan built in",
      "You are open to a collaborative model where Refer Labs co-builds and co-distributes",
      "You want multi-channel exposure across communities, affiliates, and partners",
      "You are interested in the Refer Labs internal product portfolio collaboration model",
    ],
    notFit: "Businesses without a clear subject matter or audience in mind.",
    cta: "Discuss Product Collaboration",
    external: false,
    ctaHref: "/contact",
  },
];

export default function WhoItsForPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.10),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] text-white mb-6 tracking-tight">
            Built for Operators, Brands &{" "}
            <span className="text-[#22C0CD]">Growth-Focused Businesses</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            Refer Labs works with businesses across five specific growth scenarios. Below is a breakdown of each engagement type, who it suits, and whether it is the right fit for you.
          </p>
        </div>

        {/* Engine Profiles */}
        <div className="mb-0">
          {engines.map((engine) => (
            <div
              key={engine.num}
              className="border-t border-[#0AA7B5]/10 py-12 sm:py-16 grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16"
            >
              {/* Left */}
              <div className="lg:pt-0.5">
                <span className="block text-5xl font-black text-[#0AA7B5]/20 leading-none mb-3 select-none">
                  {engine.num}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {engine.title}
                </h2>
              </div>

              {/* Right */}
              <div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-7 font-medium">
                  {engine.who}
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0AA7B5] mb-3">
                  This is for you if
                </p>
                <ul className="space-y-2.5 mb-7">
                  {engine.fits.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-l-2 border-[#0AA7B5]/20 pl-4 mb-7">
                  <p className="text-xs text-white/35 italic">
                    Not the right fit: {engine.notFit}
                  </p>
                </div>

                {engine.external === false ? (
                  <Link
                    href={engine.ctaHref!}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C0CD] hover:text-[#57E6FF] transition-colors"
                  >
                    {engine.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C0CD] hover:text-[#57E6FF] transition-colors"
                  >
                    {engine.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Not sure section */}
        <div className="border-t border-[#0AA7B5]/10 pt-14 sm:pt-16 mb-0">
          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">
            <div className="lg:pt-1">
              <h2 className="text-xl font-black text-white">Not sure which fits?</h2>
            </div>
            <div>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-7">
                Most businesses we work with sit across two or more of these growth engines. A referral program pairs naturally with affiliate distribution. APAC expansion often involves influencer activation. Product creation spans all five.
              </p>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8">
                Book a call and we will map the highest-leverage entry point for your business specifically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
                >
                  Partner With Us
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
                >
                  Explore All Growth Engines
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
