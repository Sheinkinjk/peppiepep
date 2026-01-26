/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Handshake,
  Linkedin,
  MessageSquare,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { ReferralPartnershipsCTA } from "@/components/marketing/ReferralPartnershipsCTA";

export const metadata = generateSEOMetadata(seoConfig.referralPartnerships);
export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function ReferralPartnershipsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero - Clean and impactful */}
        <section className="text-center space-y-8 mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white max-w-4xl mx-auto">
            Turn <span className="text-cyan-400">Trusted Voices</span> Into{" "}
            <br className="hidden sm:block" />
            Your Most Powerful Growth Channel
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We help professional services firms build referral programs across four channels: customer networks,
            LinkedIn influencers, agency partners, and trusted consultants—with full attribution, compliance, and payouts your finance team can defend.
          </p>
          <div className="pt-4">
            <ReferralPartnershipsCTA
              calendlyUrl={calendlyUrl}
              primaryLabel="Apply for Referral Partnerships"
              showScheduleCall={true}
            />
          </div>
        </section>

        {/* Partner Types - The core explainer section */}
        <section className="mb-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Referral Programs We Support
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              All four referral offerings—from turning happy customers into advocates to activating trusted experts
            </p>
          </div>

          {/* Customer Network */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Target className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">Customer Network</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Turn Your Happiest Clients Into Advocates
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Your satisfied customers are your best marketing channel. They've experienced your service
                firsthand, they trust you, and they know people in similar situations. Give them the
                tools to refer with confidence—and the rewards to make it worth their while.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  How Customer Network Referral Programs Work
                </p>
                <ul className="space-y-3">
                  {[
                    "Each customer gets a branded ambassador portal with their unique tracking link",
                    "They share their link with colleagues, friends, and professional networks",
                    "Every click, signup, and conversion is tracked back to the referring customer",
                    "Rewards calculate automatically—flat fees, percentages, or tiered incentives",
                    "Customers see their performance and earnings in real-time dashboards",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-medium">Example outcome:</span>{" "}
                  A financial advisory firm activated 47 happy clients as ambassadors. Within 6 months,
                  they generated 68 qualified introductions with a 41% close rate—no paid ads required.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Ambassador Dashboard</p>
                    <p className="text-sm text-slate-400">Customer's real-time view</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Referrals sent</span>
                    <span className="font-bold text-white">14</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Meetings booked</span>
                    <span className="font-bold text-white">8</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Clients won</span>
                    <span className="font-bold text-white">3</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Rewards earned</span>
                    <span className="font-bold text-cyan-300">$2,100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn Influencers */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Linkedin className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">LinkedIn Influencers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                B2B Thought Leaders With Engaged Audiences
              </h3>
              <p className="text-slate-300 leading-relaxed">
                LinkedIn influencers have spent years building trust with decision-makers in your
                target market. When they recommend your service, their audience listens—because
                they've earned that credibility through consistent, valuable content.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  How Referral Partnerships Work With Influencers
                </p>
                <ul className="space-y-3">
                  {[
                    "We identify influencers whose audience matches your ideal client profile",
                    "Each influencer gets a unique tracked link tied to their content and CTAs",
                    "Their posts, carousels, and DMs drive traffic to your landing pages",
                    "Every demo, signup, and conversion is attributed back to the specific influencer",
                    "They earn revenue share, per-demo fees, or custom rewards based on results",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-medium">Example outcome:</span>{" "}
                  A finance SaaS worked with 12 LinkedIn creators, generating 340 qualified demos
                  in 90 days—with clear attribution showing exactly which influencer drove each lead.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Influencer Dashboard View</p>
                    <p className="text-sm text-slate-400">Real-time performance tracking</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Link clicks</span>
                    <span className="font-bold text-white">2,847</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Demo bookings</span>
                    <span className="font-bold text-white">127</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Conversions</span>
                    <span className="font-bold text-white">34</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Earnings (MTD)</span>
                    <span className="font-bold text-cyan-300">$8,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agencies & Strategic Partners */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Marketing Agency</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Refers clients needing your complementary service. Earns 15% revenue share.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="h-10 w-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <Handshake className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Tech Partner</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Integrates with your platform. Joint customers tracked for co-marketing credit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Reseller Partner</p>
                      <p className="text-sm text-slate-400 mt-1">
                        White-labels or resells your offering. Tiered commission based on volume.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Building2 className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">Agencies & Strategic Partners</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Complementary Businesses That Serve Your Ideal Clients
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Agencies and strategic partners already have relationships with your target customers.
                They're not competing—they're complementing. When they refer a client to you,
                everyone wins: the client gets a trusted recommendation, the partner earns rewards,
                and you get a warm introduction.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  How Referral Partnerships Work With Agencies
                </p>
                <ul className="space-y-3">
                  {[
                    "We help you identify agencies serving your ideal customers",
                    "Partners get co-branded materials and dedicated referral portals",
                    "Each referral is tracked from introduction through to closed revenue",
                    "Tiered reward structures incentivize higher-value and volume referrals",
                    "Quarterly reviews optimize the partnership for both sides",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-medium">Example outcome:</span>{" "}
                  An HR tech company partnered with 8 recruitment agencies. The agencies referred
                  clients during their existing engagements, driving $420K in new ARR with 35% lower CAC than paid ads.
                </p>
              </div>
            </div>
          </div>

          {/* Consultants & Advisors */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Consultants & Advisors</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Trusted Experts Who Guide Buying Decisions
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Consultants and advisors are hired specifically for their expertise and recommendations.
                When a fractional CFO suggests a financial tool, or a marketing consultant recommends
                a platform, their clients trust that guidance implicitly. That trust is gold—and
                it's trackable.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  How Referral Partnerships Work With Consultants
                </p>
                <ul className="space-y-3">
                  {[
                    "We onboard consultants with briefs explaining your value proposition",
                    "They share unique links when recommending solutions to their clients",
                    "Referrals are tracked discreetly—no awkward commission conversations",
                    "Consultants earn per-deal fees or ongoing revenue share",
                    "Compliance disclosures are built into the workflow automatically",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-medium">Example outcome:</span>{" "}
                  A legal tech startup activated 25 law firm consultants. These advisors made
                  recommendations during existing client engagements, resulting in 89 enterprise
                  trials with a 42% close rate.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Consultant Referral Journey
                </p>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Client asks for recommendation", desc: "During a strategy session or engagement" },
                    { step: "2", title: "Consultant shares tracked link", desc: "Personalized URL with attribution built in" },
                    { step: "3", title: "Client books demo or signs up", desc: "Event captured with full context" },
                    { step: "4", title: "Deal closes, reward triggers", desc: "Automatic payout based on agreed terms" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-emerald-300">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why it works - flowing section, not boxes */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Why Partner-Led Growth Outperforms
              </h2>
              <p className="text-slate-400">
                The math is simple: trusted recommendations convert better and cost less.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  3-5x
                </div>
                <p className="text-white font-medium">Higher Conversion Rate</p>
                <p className="text-sm text-slate-400">
                  Warm referrals close at dramatically higher rates than cold outbound
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  40%
                </div>
                <p className="text-white font-medium">Lower CAC</p>
                <p className="text-sm text-slate-400">
                  Performance-based rewards mean you only pay for results
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  2x
                </div>
                <p className="text-white font-medium">Better Retention</p>
                <p className="text-sm text-slate-400">
                  Referred customers have higher lifetime value and lower churn
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Refer Labs Makes It Work */}
        <section className="mb-24">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How Refer Labs Makes It Work
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We handle the complexity so you can focus on the relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Target,
                title: "Partner Discovery & Activation",
                desc: "We identify, vet, and onboard partners who match your ideal customer profile and can genuinely influence buying decisions.",
              },
              {
                icon: Zap,
                title: "Automated Attribution",
                desc: "Every click, demo, signup, and conversion is tracked with partner, campaign, and link IDs. No spreadsheets, no guessing.",
              },
              {
                icon: BarChart3,
                title: "ROI Reporting",
                desc: "Executive-ready dashboards show exactly which partners drive revenue. Defend your partner spend with real data.",
              },
              {
                icon: TrendingUp,
                title: "Flexible Reward Models",
                desc: "Revenue share, per-demo fees, credits, upgrades—configure the reward structure that motivates your specific partners.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simple process */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Getting Started Is Simple
              </h2>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-cyan-400/50 to-cyan-500/50" />

              <div className="grid md:grid-cols-4 gap-8 relative">
                {[
                  { num: "1", title: "Apply", desc: "Share your goals and ideal partner profile" },
                  { num: "2", title: "Strategy", desc: "We design your partner program and reward structure" },
                  { num: "3", title: "Activate", desc: "Partners are onboarded with tracked links" },
                  { num: "4", title: "Grow", desc: "Watch referrals flow into your pipeline" },
                ].map((step) => (
                  <div key={step.num} className="text-center">
                    <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-900 border-2 border-cyan-500/50 mb-4">
                      <span className="text-2xl font-black text-cyan-300">{step.num}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Cleaner accordion */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Common Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How are referrals tracked end-to-end?",
                  a: "Every partner gets unique links tied to your landing pages and CTAs. All events—clicks, form submissions, demos, conversions, and revenue—carry partner, campaign, and link IDs into our Measure ROI dashboard.",
                },
                {
                  q: "What reward structures can I offer?",
                  a: "We support revenue share (percentage of deal value), per-demo or per-signup fees, credits toward your services, product upgrades, or custom monetary rewards. You configure what makes sense for each partner type.",
                },
                {
                  q: "How do you find the right partners?",
                  a: "We start with your ideal customer profile and work backwards. For LinkedIn influencers, we analyze audience demographics and engagement. For agencies and consultants, we look at client overlap and complementary services.",
                },
                {
                  q: "What about compliance and disclosures?",
                  a: "Compliance guardrails are built into the workflow. Partner disclosures, approval workflows, and audit trails are automatic—so your legal and finance teams can sleep easy.",
                },
                {
                  q: "How long until I see results?",
                  a: "Most programs see initial referrals within 2-4 weeks of partner activation. The exact timeline depends on your sales cycle length and how quickly partners start sharing.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group border-b border-white/10 pb-4"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-4 text-left">
                    <h3 className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {faq.q}
                    </h3>
                    <span className="text-cyan-400 text-2xl font-light group-open:rotate-45 transition-transform duration-200 flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-slate-400 leading-relaxed pb-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Build Your Partner Channel?
              </h2>
              <p className="text-lg text-slate-300">
                Tell us about your goals and ideal partners. We'll show you exactly how
                referral partnerships can become your most efficient growth channel.
              </p>
              <div className="pt-4">
                <ReferralPartnershipsCTA
                  calendlyUrl={calendlyUrl}
                  primaryLabel="Apply for Referral Partnerships"
                  showScheduleCall={true}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
