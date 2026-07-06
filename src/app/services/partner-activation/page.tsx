import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.partnerActivation);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function PartnerActivationPage() {
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
            Find and Activate the{" "}
            <span className="text-[#22C0CD]">Right Partners</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            A consultant with 500 relevant clients outperforms an influencer with 500,000 followers. We find the people who already serve your ideal customer, structure commercial terms, and activate them as ongoing distribution channels.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Consultants & strategic partners first", "Influencers & creators where relevant", "Commercial terms, not vanity metrics"].map((tag) => (
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
              href="/application"
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
              <h2 className="text-xl font-black text-[#22C0CD]">Strategic Partners Over Audiences</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most businesses default to influencer marketing when they think about partner-driven distribution. But for most B2B and professional services companies, a consultant with 500 relevant clients is worth more than a creator with 500,000 followers. The consultant has trust, context, and buying authority embedded in their relationships. A mention from them is a warm introduction. A post from a creator is an ad.
              </p>
              <p>
                We focus first on strategic partners, consultants, accountants, advisors, operators, and industry specialists who already serve your ideal customer professionally. These are the people whose recommendation carries weight because they have a real relationship and are trusted as subject matter experts, not paid promoters.
              </p>
              <p>
                Where influencers and creators are genuinely relevant, LinkedIn voices, newsletter writers, niche content producers with engaged, aligned audiences, we activate them as well. But always with the same standard: commercial terms, defined deliverables, tracked performance, and ongoing distribution rather than one-off placements.
              </p>
            </div>
          </div>
        </section>

        {/* How We Activate */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How We Find and Activate Them</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Partner Profile and Target Mapping",
                  copy: "We define the profile of your ideal strategic partner, who already serves your customer, which professional communities they operate in, and what commercial arrangement would make sense for them. We then build a target list of consultants, advisors, operators, and relevant content creators across your category.",
                },
                {
                  num: "2",
                  title: "Outreach, Vetting, and Qualification",
                  copy: "We handle outreach and qualify partners against your target profile. We assess audience alignment, professional credibility, and genuine fit with your product, not follower counts or reach metrics. A partner who sends you five ideal clients per month is worth more than one who sends 500 unqualified leads.",
                },
                {
                  num: "3",
                  title: "Commercial Structure and Agreement",
                  copy: "We negotiate commercial terms for every partner relationship, revenue share, referral fee, flat commission, or hybrid arrangements. Every partnership is structured with defined deliverables, clear timelines, and performance expectations. Nothing is left informal or dependent on good intentions.",
                },
                {
                  num: "4",
                  title: "Activation, Tracking, and Compounding",
                  copy: "We brief each partner, manage the integration across their channels, LinkedIn, newsletters, client conversations, workshops, or community content, and track referrals with attributed links. High-performing partners are developed into long-term relationships. We build the portfolio over time so distribution compounds.",
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

        {/* Partner Types */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Partner Types We Activate</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              {[
                {
                  title: "Consultants and Advisors",
                  desc: "Industry consultants, business advisors, and specialist coaches who serve your ideal customer professionally. Their recommendation carries authority.",
                },
                {
                  title: "Strategic Operators",
                  desc: "Business owners and operators with adjacent audiences, agencies, service firms, and complementary businesses who touch your buyer regularly.",
                },
                {
                  title: "LinkedIn Creators",
                  desc: "B2B content producers with highly engaged, professional audiences in your specific industry. Activated on structured terms, not one-off posts.",
                },
                {
                  title: "Newsletter Writers",
                  desc: "Niche newsletter authors with loyal, topic-specific readerships. Positioned for ongoing features and commercial placements, not just ad slots.",
                },
                {
                  title: "Industry Specialists",
                  desc: "Accountants, lawyers, recruiters, and financial advisors who serve your customer base and regularly make referrals in adjacent categories.",
                },
                {
                  title: "Podcast Hosts and Bloggers",
                  desc: "Content creators with established credibility in your category. Engaged audiences, contextual placements, and tracked affiliate arrangements.",
                },
              ].map((type) => (
                <div key={type.title} className="border border-[#0AA7B5]/10 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#0AA7B5] mb-2">{type.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{type.desc}</p>
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
                "Strategic partner profile definition and target mapping",
                "Consultant, advisor, and operator research and shortlisting",
                "Creator and influencer research where relevant (LinkedIn, newsletters, podcasts, blogs)",
                "Outreach, vetting, and partner qualification",
                "Commercial term negotiation (revenue share, referral fee, flat commission)",
                "Partnership agreement and structure",
                "Content brief and activation coordination across partner channels",
                "Referral and conversion tracking with attributed links",
                "Rollout calendar and activation schedule",
                "Ongoing partner management and relationship development",
                "Monthly performance reporting and partner portfolio optimisation",
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
                    "Your product is recommended and trusted, personal endorsement influences the buying decision",
                    "You want structured distribution through strategic partners and consultants, not one-off campaigns",
                    "You have a clearly defined B2B or professional audience with identifiable partner channels",
                    "You need someone to handle outreach, commercial terms, activation, and ongoing management end-to-end",
                    "You want to build a portfolio of active partnerships that compound distribution over time",
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
                <p className="text-white/40 text-sm italic">Products without a clear professional identity, or brands seeking purely mass-reach celebrity or mega-influencer placements without commercial structure or attribution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Build a Partner Network That{" "}
            <span className="text-[#22C0CD]">Actually Distributes.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Book a 15-minute call or submit an application. We will identify the right strategic partners and creators for your audience and scope the activation.
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
              href="/application"
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
