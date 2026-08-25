import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.influencerActivation);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function InfluencerActivationPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,167,181,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.05),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-[#0AA7B5]/60 hover:text-[#0AA7B5] transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Services
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            Distribution Through{" "}
            <span className="text-[#22C0CD]">Trusted Voices</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            One-off sponsored posts do not compound. We identify operators, creators, and consultants who genuinely align with your product, structure commercial partnerships with clear terms, and build a network of active distribution channels, for B2B and B2C brands alike.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Operators, creators & consultants", "Commercial terms, not just mentions", "LinkedIn, newsletters & beyond"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
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
              href="/partner-with-refer-labs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Overview */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Distribution vs. Mentions</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most influencer campaigns optimise for reach and impressions. But reach without commercial structure rarely converts into customers. A post gets published, engagement spikes for 48 hours, and then nothing. No tracking. No follow-up. No compounding.
              </p>
              <p>
                We approach influencer activation differently. We look for operators, consultants, newsletter writers, LinkedIn creators, and niche bloggers whose audiences genuinely overlap with your ideal customer, and we structure partnerships that create ongoing distribution, not one-off exposure.
              </p>
              <p>
                Every partnership has clear commercial terms, defined deliverables, and tracked performance. We manage the outreach, negotiation, content brief, activation, and reporting. You get a distribution channel, not a mention.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How We Activate It</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Research and Shortlist",
                  copy: "We identify aligned creators, operators, consultants, and influencers across LinkedIn, newsletters, podcasts, blogs, and niche communities. We score them by audience alignment, engagement quality, and commercial fit, not follower count.",
                },
                {
                  num: "2",
                  title: "Outreach and Commercial Terms",
                  copy: "We handle outreach, vetting, and negotiation. Every partnership is structured with clear terms: deliverables, timeline, compensation model (flat fee, revenue share, affiliate, or equity-free arrangement), and performance expectations.",
                },
                {
                  num: "3",
                  title: "Activate and Integrate",
                  copy: "We brief each partner, review content before publication, and manage the integration across their platform, whether that is a LinkedIn post series, newsletter feature, podcast mention, blog review, or ambassador program onboarding.",
                },
                {
                  num: "4",
                  title: "Track and Compound",
                  copy: "We track referrals and conversions from each partner with attributed links and reporting. High-performing partners are developed into long-term distribution relationships. We build a portfolio of active channels over time.",
                },
              ].map((step) => (
                <div key={step.num} className="grid grid-cols-[40px_1fr] gap-5">
                  <span className="text-3xl font-black text-[#0AA7B5]/30 leading-none select-none">{step.num}</span>
                  <div>
                    <h3 className="text-base font-bold text-[#0AA7B5] mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What's Included</h2>
            </div>
            <ul className="space-y-3 max-w-2xl">
              {[
                "Creator, operator, and influencer research and scored shortlist",
                "Audience alignment analysis (not just follower metrics)",
                "Outreach, vetting, and partnership negotiation",
                "Commercial term structure for each partnership",
                "Content brief creation and review process",
                "LinkedIn, newsletter, blog, and podcast activations",
                "Ambassador program design and onboarding",
                "Referral and conversion tracking with attributed links",
                "Rollout calendar and activation schedule",
                "Monthly performance reporting and partner optimisation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who It's For */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Who It's For</h2>
            </div>
            <div className="max-w-2xl space-y-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0AA7B5] mb-4">This is for you if</p>
                <ul className="space-y-3">
                  {[
                    "Your product benefits from personal recommendation and trusted endorsement",
                    "You want structured distribution through creators and operators, not one-off sponsored posts",
                    "You serve a clearly defined B2B or B2C audience that follows specific voices online",
                    "You need someone to handle outreach, terms, briefing, and activation end-to-end",
                    "You want to build a portfolio of active influencer partnerships, not run a single campaign",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#0AA7B5]/30 pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30 mb-2">Not the right fit</p>
                <p className="text-white/40 text-sm italic">Brands without a clear identity, or products where personal recommendation does not influence the buying decision. Also not suited to brands seeking purely mass-reach or celebrity endorsements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Build a Network That{" "}
            <span className="text-[#22C0CD]">Distributes.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Book a 15-minute call or submit an application. We will identify the right creators and operators for your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Partner With Us
            </a>
            <Link
              href="/partner-with-refer-labs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
