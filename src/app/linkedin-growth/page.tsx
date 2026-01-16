/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Handshake,
  Layers,
  Linkedin,
  MessageSquare,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencer);
export const revalidate = 3600;

const partnershipTypes = [
  {
    title: "Thought Leaders",
    description: "Industry experts with engaged audiences of decision-makers",
    examples: "CFOs, CTOs, CMOs, founders sharing insights daily",
    icon: BookOpen,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-400/30",
  },
  {
    title: "Niche Creators",
    description: "Specialists in specific verticals with loyal followings",
    examples: "HR tech reviewers, SaaS evangelists, B2B marketing coaches",
    icon: Target,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
  },
  {
    title: "Community Builders",
    description: "Leaders of engaged communities and professional networks",
    examples: "Slack/Discord admins, newsletter operators, podcast hosts",
    icon: Users,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-400/30",
  },
  {
    title: "Operator-Influencers",
    description: "Active practitioners who share real-world experience",
    examples: "Heads of Growth, RevOps leaders, Sales directors",
    icon: TrendingUp,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-400/30",
  },
];

const businessGoals = [
  {
    title: "Demo Bookings",
    description: "Drive qualified prospects directly into your sales pipeline with warm introductions from trusted voices.",
    metric: "Typical: 30-100+ demos/month",
    icon: Calendar,
  },
  {
    title: "Lead Generation",
    description: "Fill your funnel with in-market buyers who already understand your value proposition.",
    metric: "Typical: 5-15% conversion rate",
    icon: Target,
  },
  {
    title: "Brand Distribution",
    description: "Amplify your message through established audiences without building from scratch.",
    metric: "Typical: 10-50x organic reach",
    icon: TrendingUp,
  },
  {
    title: "Credibility & Trust",
    description: "Third-party endorsement from respected voices signals quality to your market.",
    metric: "Typical: 2-3x trust score",
    icon: Shield,
  },
  {
    title: "Enterprise Introductions",
    description: "Access decision-makers at target accounts through warm referrals from their trusted network.",
    metric: "Typical: 40%+ reply rate",
    icon: Building2,
  },
  {
    title: "Market Education",
    description: "Let creators explain your category and position your solution as the answer.",
    metric: "Typical: 3-5x engagement",
    icon: MessageSquare,
  },
];

const processSteps = [
  {
    step: "1",
    title: "Discovery & Goal Setting",
    description: "We learn your ICP, revenue goals, and competitive landscape. You tell us what success looks like—demo volume, pipeline value, close rates.",
    activities: [
      "Define ideal customer profile and target accounts",
      "Set conversion goals and budget parameters",
      "Identify messaging angles and proof points",
      "Establish compliance requirements and brand guidelines",
    ],
    timeline: "Days 1-2",
  },
  {
    step: "2",
    title: "Partner Sourcing & Qualification",
    description: "We identify LinkedIn creators whose audiences match your ICP. Each is vetted for authenticity, engagement quality, and brand alignment.",
    activities: [
      "Analyze follower demographics and engagement patterns",
      "Review content history and audience sentiment",
      "Verify influence authenticity (no fake followers)",
      "Assess brand fit and messaging alignment",
    ],
    timeline: "Days 3-5",
  },
  {
    step: "3",
    title: "Offer & Structure Design",
    description: "We build the partnership offer—what creators get, what they commit to, and how results are tracked and rewarded.",
    activities: [
      "Design compensation model (per-demo, revenue share, hybrid)",
      "Create content briefs and brand guidelines",
      "Set up tracking links and attribution parameters",
      "Draft partnership agreements and disclosure templates",
    ],
    timeline: "Days 5-7",
  },
  {
    step: "4",
    title: "Creator Onboarding",
    description: "Selected creators receive their partnership kit—tracking links, brand materials, content guidelines, and payout terms.",
    activities: [
      "Provision unique tracked referral links",
      "Share brand assets and messaging playbook",
      "Configure dashboard access for creators",
      "Brief creators on product and value proposition",
    ],
    timeline: "Days 7-9",
  },
  {
    step: "5",
    title: "Campaign Launch",
    description: "Creators draft content for your approval. Once approved, posts go live with full tracking enabled.",
    activities: [
      "Review and approve creator content drafts",
      "Coordinate posting schedule for maximum impact",
      "Enable real-time attribution tracking",
      "Monitor initial engagement and click-through",
    ],
    timeline: "Day 10+",
  },
  {
    step: "6",
    title: "Optimization & Scale",
    description: "We analyze performance weekly. Top creators get more budget. Underperformers are coached or removed. The program compounds.",
    activities: [
      "Weekly performance reviews and reporting",
      "Identify top performers for scaling",
      "Test new messaging angles and CTAs",
      "Expand to new creators based on learnings",
    ],
    timeline: "Ongoing",
  },
];

const faqData = [
  {
    category: "How It Works",
    icon: Zap,
    questions: [
      {
        q: "How does attribution and tracking work?",
        a: "Every creator gets a unique referral link. When someone clicks that link, we set a 30-day attribution cookie. If they sign up, book a demo, or make a purchase within that window, the conversion is automatically credited to the creator. You see real-time analytics: click-through rates, conversion rates, revenue per creator, and ROI. All tracking is transparent and auditable in your dashboard."
      },
      {
        q: "What counts as a conversion?",
        a: "You define your conversion goal when launching a partnership: demo bookings, free trial signups, paid subscriptions, or revenue milestones. Creators are compensated based on the outcome you specify. For example, you might pay $50 per qualified demo booked, or 20% recurring commission on subscription revenue. The model is flexible to match your business goals."
      },
      {
        q: "How do payouts work?",
        a: "You set the payout structure upfront (flat fee per conversion, percentage of revenue, tiered commissions, etc.). When a tracked conversion occurs, the creator's earnings are logged in their dashboard. Payouts are processed monthly via Stripe, with a 30-day hold to account for refunds or cancellations. Businesses only pay for verified, completed conversions—not clicks or impressions."
      },
      {
        q: "Can I work with multiple creators at once?",
        a: "Absolutely. Most businesses launch with 3-5 creators to test different audience segments and messaging angles. You can run campaigns with 50+ creators simultaneously. Each creator has their own tracking link, so you can compare performance, identify top performers, and allocate budget accordingly. Scale what works, pause what doesn't."
      }
    ]
  },
  {
    category: "Trust & Compliance",
    icon: Shield,
    questions: [
      {
        q: "Are creator partnerships considered advertising?",
        a: "Yes. When a LinkedIn creator promotes a brand in exchange for compensation, this is marketing. All partnerships facilitated through Refer Labs are performance-based marketing relationships that must comply with advertising regulations including FTC endorsement guidelines, ASA standards, and LinkedIn's commercial content policies. Creators are required to clearly disclose partnerships using #ad, #sponsored, or #partner hashtags."
      },
      {
        q: "What are the disclosure requirements?",
        a: "Creators must clearly and conspicuously disclose their commercial relationship with brands. This means using platform-appropriate disclosure methods (hashtags like #ad or #sponsored on LinkedIn), placing disclosures where they're easily noticed (not buried in long captions), and using clear language that audiences understand. Refer Labs provides disclosure templates, but creators and brands are ultimately responsible for compliance."
      },
      {
        q: "How do you prevent fake engagement or fraud?",
        a: "We vet creators before approval, tracking follower authenticity, engagement patterns, and audience quality. All conversions are tracked through unique referral links with server-side validation. Businesses see full attribution data—click sources, conversion rates, and customer quality—so you know exactly what you're paying for. Suspicious activity triggers review and potential removal from the platform."
      }
    ]
  },
  {
    category: "Brand Control",
    icon: Layers,
    questions: [
      {
        q: "How much control do I have over creator messaging?",
        a: "You provide brand guidelines, key messaging points, and approval workflows. Creators craft content in their own voice (authenticity is why this works), but you review posts before they go live. You can request edits, approve final drafts, or reject content that doesn't align. Think of it as collaborative: you guide the narrative, creators make it resonate with their audience."
      },
      {
        q: "What if a creator posts something off-brand or inaccurate?",
        a: "All content goes through your approval process before publishing. If something slips through, you can request immediate removal or correction. Repeated violations result in creator removal from your program. You also control which creators you work with—vet their past content, audience fit, and brand alignment before approving partnerships."
      },
      {
        q: "Can I see performance before committing to a creator?",
        a: "Yes. Start with a small test campaign (e.g., one post, $500 budget cap). Review click-through rates, engagement quality, and conversion rates. If performance is strong, scale up. If not, move on. You're never locked into long-term contracts or minimum spends. Performance dictates investment."
      }
    ]
  },
  {
    category: "Getting Started",
    icon: Sparkles,
    questions: [
      {
        q: "What types of businesses work best?",
        a: "SaaS companies with clear product-market fit, B2B tools replacing manual workflows, professional services with defined ICPs, and any business with trackable conversion goals. You need the ability to measure outcomes (demos, signups, revenue) and allocate budget based on performance. Early-stage startups and established enterprises both succeed here."
      },
      {
        q: "How long does it take to launch?",
        a: "Most businesses launch their first creator campaign within 7-10 days. Timeline: (1) Submit partnership request and define goals (Day 1), (2) We match you with aligned creators (Days 2-5), (3) You review creator profiles and approve partnerships (Days 5-7), (4) Creators draft content for your approval (Days 7-9), (5) Content goes live and tracking begins (Day 10). Faster timelines are possible for urgent launches."
      },
      {
        q: "What budget should I allocate?",
        a: "Start with $2,000-$5,000/month to test 3-5 creators. This gives you enough data to identify what works without over-committing. High-performing programs scale to $20,000-$50,000+/month as you add more creators and expand to new audience segments. Budget scales with proven ROI—if you're generating 5x returns, increasing spend is straightforward."
      },
      {
        q: "Do you handle creator outreach and management?",
        a: "Yes. We handle creator vetting, onboarding, and matching. You approve partnerships, provide briefs, and review content. We manage logistics (contracts, tracking setup, payout processing). Think of us as your creator partnership infrastructure—you focus on strategy and approvals, we handle operations."
      }
    ]
  }
];

export default function LinkedInGrowthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LinkedIn Creator Partnerships for B2B Growth",
    "description": "Partner with LinkedIn influencers to drive qualified demos and revenue. Full-service partnership management from sourcing to payouts.",
    "url": "https://referlabs.com.au/linkedin-growth",
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au",
      "logo": "https://referlabs.com.au/logo.png"
    },
    "mainEntity": {
      "@type": "Service",
      "serviceType": "LinkedIn Creator Partnership Management",
      "provider": {
        "@type": "Organization",
        "name": "Refer Labs"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Global"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b12] via-[#0b121b] to-[#05070b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.1),transparent_50%)]" />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        {/* Hero Section */}
        <section className="space-y-10 animate-in fade-in duration-700">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-semibold">
              <Linkedin className="h-4 w-4" />
              LinkedIn Creator Partnerships
            </div>

            <h1 className="text-balance text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl text-white">
              Your Buyers Are Already Following
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Someone on LinkedIn
              </span>
            </h1>

            <p className="text-xl text-slate-200/90 leading-relaxed max-w-3xl mx-auto">
              Partner with verified LinkedIn creators to drive qualified demos and revenue.
              We handle sourcing, qualification, tracking, and payouts—you focus on closing deals.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/linkedin-growth/business"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 px-8 py-4 text-base font-bold text-slate-900 shadow-2xl shadow-blue-500/30 transition hover:scale-[1.02]"
              >
                Start a Partnership Program
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/linkedin-growth/influencer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white transition"
              >
                Apply as a Creator
              </Link>
            </div>
          </div>
        </section>

        {/* The Value Proposition */}
        <section className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white">
                Why LinkedIn Creator Partnerships Work
              </h2>
              <div className="space-y-4 text-base text-slate-200/90">
                <p>
                  Your buyers are on LinkedIn every day. They follow creators, operators, and founders
                  who share insights, solve problems, and recommend tools.
                </p>
                <p>
                  When someone they trust mentions your product, it doesn't feel like advertising—it
                  feels like a referral from a colleague. <span className="text-cyan-300 font-medium">That's the difference between interrupting and being introduced.</span>
                </p>
                <p>
                  Creator-led campaigns consistently outperform cold outbound in B2B because trust
                  is already established. You're not starting from zero—you're borrowing credibility.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "B2B buyers who research independently before sales contact", value: "87%", color: "text-cyan-400", source: "Gartner" },
                { label: "Higher conversion rate from referrals vs. cold outbound", value: "3-5x", color: "text-emerald-400", source: "Industry data" },
                { label: "B2B marketers reporting ROI from influencer partnerships", value: "89%", color: "text-purple-400", source: "TopRank Marketing 2024" },
                { label: "Lower CAC with performance-based partnerships", value: "40%", color: "text-amber-400", source: "Refer Labs clients" }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <div className={`text-3xl font-black ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-slate-200/80 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-400">Source: {stat.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of LinkedIn Partners */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Types of LinkedIn Partners We Activate
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Different creators bring different strengths. We match you with partners whose
              audiences align with your ideal customer profile.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className={`rounded-2xl border ${type.border} bg-gradient-to-br ${type.gradient} backdrop-blur-sm p-6 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="rounded-xl bg-white/10 p-3 backdrop-blur w-fit mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-sm text-slate-200/80 leading-relaxed mb-3">{type.description}</p>
                  <p className="text-xs text-slate-400 italic">{type.examples}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Business Goals Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              What You Can Achieve
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              LinkedIn creator partnerships aren't just about awareness—they drive measurable
              business outcomes across your entire funnel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businessGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-xl bg-cyan-500/20 p-3">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{goal.description}</p>
                  <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {goal.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How We Work - End-to-End Process */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              How We Create & Manage Partnerships End-to-End
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              We handle the entire partnership lifecycle—from sourcing and vetting creators to
              tracking results and processing payouts. You approve the strategy and watch the pipeline fill.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6 lg:p-8"
              >
                <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-xl font-black text-white shadow-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-sm text-cyan-300 font-medium">{step.timeline}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.activities.map((activity, actIdx) => (
                      <div key={actIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200/80">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payout Models */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Flexible Payout Models
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Pay for results, not impressions. Choose the compensation model that aligns with your funnel and revenue goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Per-Demo Fee",
                detail: "Pay a fixed amount for each qualified demo booked through a creator's link.",
                example: "$50-150 per demo",
                best: "Best for: SaaS with sales-led motion",
                accent: "from-cyan-500/20 to-blue-500/20",
              },
              {
                title: "Revenue Share",
                detail: "Creators earn a percentage of revenue they generate, paid monthly.",
                example: "15-25% recurring",
                best: "Best for: Subscription businesses",
                accent: "from-emerald-500/20 to-teal-500/20",
              },
              {
                title: "Hybrid Model",
                detail: "Combine a base per-lead fee with a bonus for closed deals.",
                example: "$30/demo + 5% close",
                best: "Best for: High-value enterprise deals",
                accent: "from-purple-500/20 to-pink-500/20",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} p-6 backdrop-blur`}>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-200/80 leading-relaxed mb-4">{item.detail}</p>
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                    {item.example}
                  </div>
                  <p className="text-xs text-slate-400">{item.best}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Refer Labs Handles vs What You Handle */}
        <section className="mt-24">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-cyan-500/20 p-3">
                  <Handshake className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">What Refer Labs Handles</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Sourcing and vetting LinkedIn creators",
                  "Matching creators to your ICP and goals",
                  "Setting up unique tracking links per creator",
                  "Managing creator onboarding and briefing",
                  "Processing monthly payouts via Stripe",
                  "Providing compliance templates and disclosures",
                  "Real-time attribution dashboard and reporting",
                  "Performance optimization and scaling recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-white/10 p-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">What You Handle</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Define your ideal customer profile and goals",
                  "Approve which creators you want to work with",
                  "Provide brand guidelines and key messaging",
                  "Review and approve content before it goes live",
                  "Handle demos and sales conversations",
                  "Set budget and payout parameters",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Full Visibility Into Every Partnership
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Track performance, manage creators, and prove ROI—all from one dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 lg:p-10">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="font-semibold text-white">Creator Performance</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Active creators</span>
                    <span className="font-bold text-white">12</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Total link clicks</span>
                    <span className="font-bold text-white">8,420</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Avg. CTR</span>
                    <span className="font-bold text-emerald-400">4.2%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="font-semibold text-white">Conversions</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Demos booked</span>
                    <span className="font-bold text-white">127</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Deals closed</span>
                    <span className="font-bold text-white">34</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Close rate</span>
                    <span className="font-bold text-emerald-400">26.7%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="font-semibold text-white">ROI</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Revenue generated</span>
                    <span className="font-bold text-white">$142,000</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Creator payouts</span>
                    <span className="font-bold text-white">$28,400</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">ROI</span>
                    <span className="font-bold text-cyan-300">5.0x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Common Questions</h2>
            <p className="text-lg text-slate-200/90 max-w-3xl mx-auto">
              Everything you need to know about launching LinkedIn creator partnerships.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((section) => (
              <div key={section.category} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-3 mb-8">
                  <div className="rounded-xl bg-cyan-500/20 p-3">
                    <section.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-black text-white">{section.category}</h3>
                </div>

                <div className="space-y-4">
                  {section.questions.map((faq, idx) => (
                    <details key={idx} className="group border-b border-white/10 pb-4">
                      <summary className="flex items-start justify-between cursor-pointer list-none py-2">
                        <div className="flex-1 pr-4">
                          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{faq.q}</h4>
                        </div>
                        <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 mt-0.5" />
                      </summary>
                      <div className="mt-3 pr-8">
                        <p className="text-sm text-slate-200/80 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-24 rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-12 lg:p-16 text-center backdrop-blur">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Ready to Turn LinkedIn Into Your Best Growth Channel?
            </h2>
            <p className="text-lg text-slate-200/90 mb-8">
              Join B2B companies driving measurable ROI through trusted LinkedIn creator partnerships.
              We handle the sourcing, tracking, and payouts—you close the deals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/linkedin-growth/business"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
              >
                Start a Partnership Program
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/linkedin-growth/influencer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur hover:border-white/50 hover:bg-white/10 transition"
              >
                Apply as a Creator
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
