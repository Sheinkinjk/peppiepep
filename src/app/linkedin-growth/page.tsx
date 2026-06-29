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
  Linkedin,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencer);
export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const partnershipTypes = [
  {
    title: "Thought Leaders",
    description: "Australian industry experts with engaged audiences of decision-makers in your target market",
    examples: "CFOs, CTOs, CMOs, founders sharing insights about the Australian market",
    icon: BookOpen,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-400/30",
  },
  {
    title: "Niche Creators",
    description: "Specialists in specific Australian verticals with loyal, high-intent followings",
    examples: "SaaS reviewers, fintech commentators, B2B marketing coaches in Australia",
    icon: Target,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
  },
  {
    title: "Community Builders",
    description: "Leaders of engaged Australian professional communities and networks",
    examples: "Slack/Discord admins, newsletter operators, podcast hosts with Australian audiences",
    icon: Users,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-400/30",
  },
  {
    title: "Operator-Influencers",
    description: "Active Australian practitioners who share real-world experience and recommend tools",
    examples: "Heads of Growth, RevOps leaders, Sales directors at Australian companies",
    icon: TrendingUp,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-400/30",
  },
];

const businessGoals = [
  {
    title: "Lead Generation",
    description: "Fill your Australian pipeline with in-market buyers who already understand your value proposition through trusted creator endorsements.",
    metric: "Typical: 5-15% conversion rate",
    icon: Target,
  },
  {
    title: "Demo Bookings",
    description: "Drive qualified Australian prospects directly into your sales pipeline with warm introductions from creators they follow.",
    metric: "Typical: 30-100+ demos/quarter",
    icon: Calendar,
  },
  {
    title: "Brand Awareness",
    description: "Build credibility in the Australian market through established voices without starting from scratch.",
    metric: "Typical: 10-50x organic reach",
    icon: TrendingUp,
  },
  {
    title: "Market Credibility",
    description: "Third-party endorsement from respected Australian voices signals quality and local relevance to your target market.",
    metric: "Accelerates trust building",
    icon: Shield,
  },
  {
    title: "Enterprise Introductions",
    description: "Access decision-makers at target Australian accounts through warm introductions from their trusted network.",
    metric: "Typical: 40%+ reply rate",
    icon: Building2,
  },
  {
    title: "Market Education",
    description: "Let Australian creators explain your category and position your solution as the answer for their local market.",
    metric: "Typical: 3-5x engagement",
    icon: Linkedin,
  },
];

const processSteps = [
  {
    step: "1",
    title: "Discovery & Goal Setting",
    description: "We learn your ICP, Australia goals, and competitive landscape. You tell us what success looks like - demo volume, pipeline value, close rates.",
    activities: [
      "Define ideal Australian customer profile and target accounts",
      "Set conversion goals and budget parameters",
      "Identify messaging angles and proof points for the Australian market",
      "Establish compliance requirements and brand guidelines",
    ],
    timeline: "Days 1-2",
  },
  {
    step: "2",
    title: "Creator Sourcing & Qualification",
    description: "We identify Australian LinkedIn creators whose audiences match your ICP. Each is vetted for authenticity, engagement quality, and brand alignment.",
    activities: [
      "Analyse follower demographics and engagement patterns",
      "Review content history and audience sentiment",
      "Verify influence authenticity (no fake followers)",
      "Assess brand fit and messaging alignment for your product",
    ],
    timeline: "Days 3-5",
  },
  {
    step: "3",
    title: "Offer & Structure Design",
    description: "We build the partnership offer - what creators get, what they commit to, and how results are tracked and rewarded.",
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
    description: "Selected creators receive their partnership kit - tracking links, brand materials, content guidelines, and payout terms.",
    activities: [
      "Provision unique tracked affiliate links",
      "Share brand assets and messaging playbook",
      "Configure dashboard access for creators",
      "Brief creators on product and value proposition",
    ],
    timeline: "Days 7-9",
  },
  {
    step: "5",
    title: "Campaign Launch",
    description: "Creators draft content for your approval. Once approved, posts go live with full tracking enabled across the Australian market.",
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
    title: "Optimisation & Scale",
    description: "We analyse performance weekly. Top creators get more budget. Underperformers are coached or removed. The program compounds.",
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
        q: "How does this help overseas companies enter Australia?",
        a: "Australian LinkedIn creators already have the trust and audience you need. When they recommend your product, it feels like a warm introduction - not advertising. This accelerates your market entry by borrowing their credibility and established reach in the Australian market."
      },
      {
        q: "How does attribution and tracking work?",
        a: "Every creator gets a unique tracking link. When someone clicks that link, we set a 30-day attribution cookie. If they sign up, book a demo, or make a purchase within that window, the conversion is automatically credited to the creator. You see real-time analytics: click-through rates, conversion rates, revenue per creator, and ROI."
      },
      {
        q: "What counts as a conversion?",
        a: "You define your conversion goal when launching a partnership: demo bookings, free trial signups, paid subscriptions, or revenue milestones. Creators are compensated based on the outcome you specify. For example, you might pay $50 per qualified demo booked, or 20% recurring commission on subscription revenue."
      },
      {
        q: "How do payouts work?",
        a: "You set the payout structure upfront (flat fee per conversion, percentage of revenue, tiered commissions, etc.). When a tracked conversion occurs, the creator's earnings are logged in their dashboard. Payouts are processed monthly via Stripe, with a 30-day hold to account for refunds or cancellations."
      }
    ]
  },
  {
    category: "Trust & Compliance",
    icon: Shield,
    questions: [
      {
        q: "Are creator partnerships considered advertising?",
        a: "Yes. When a LinkedIn creator promotes a brand in exchange for compensation, this is marketing. All partnerships must comply with advertising regulations including ACCC guidelines in Australia, FTC endorsement guidelines, and LinkedIn's commercial content policies. Creators are required to clearly disclose partnerships."
      },
      {
        q: "How do you prevent fake engagement or fraud?",
        a: "We vet creators before approval, tracking follower authenticity, engagement patterns, and audience quality. All conversions are tracked through unique links with server-side validation. You see full attribution data so you know exactly what you're paying for. Suspicious activity triggers review and potential removal."
      }
    ]
  },
  {
    category: "Getting Started",
    icon: Handshake,
    questions: [
      {
        q: "What types of businesses work best?",
        a: "SaaS companies with clear product-market fit, B2B tools replacing manual workflows, fintech platforms, and any business with trackable conversion goals entering Australia. You need the ability to measure outcomes (demos, signups, revenue) and allocate budget based on performance."
      },
      {
        q: "How long does it take to launch?",
        a: "Most businesses launch their first creator campaign within 7-10 days. We match you with aligned creators (Days 2-5), you review and approve partnerships (Days 5-7), creators draft content (Days 7-9), and content goes live (Day 10). Faster timelines are possible for urgent launches."
      },
      {
        q: "Can this run alongside other Refer Labs services?",
        a: "Absolutely. LinkedIn creator partnerships complement our direct Sales Representation and Partnership Development services. Many clients use creators for top-of-funnel awareness while we run direct outbound and partner sourcing in parallel."
      }
    ]
  }
];

export default function LinkedInGrowthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LinkedIn Creator Partnerships for Australia Market Entry",
    "description": "Partner with Australian LinkedIn creators to drive qualified demos and revenue as part of your Australia expansion strategy.",
    "url": "https://referlabs.com.au/linkedin-growth",
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au",
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
        "name": "Australia"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#012e36] via-[#03424d] to-[#02272f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main
        id="main-content"
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16"
      >
        {/* Hero Section */}
        <section className="space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-semibold">
              <Linkedin className="h-4 w-4" />
              LinkedIn Creator Partnerships
            </div>

            <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl text-white">
              Your Australian Buyers Are Already Following
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Someone on LinkedIn
              </span>
            </h1>

            <p className="text-xl text-slate-200/90 leading-relaxed max-w-3xl mx-auto">
              Partner with verified Australian LinkedIn creators to build credibility, generate leads, and accelerate your market entry.
              We handle sourcing, qualification, tracking, and payouts - you focus on closing deals.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/linkedin-growth/business"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0AA7B5]/30 transition hover:bg-[#00838F]"
              >
                Start a Partnership Program
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/linkedin-growth/influencer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white transition"
              >
                Apply as a Creator
              </Link>
            </div>
          </div>
        </section>

        {/* Why This Works for Australia Entry */}
        <section className="mt-24 rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white">
                Why LinkedIn Creator Partnerships Accelerate Australia Entry
              </h2>
              <div className="space-y-4 text-base text-slate-200/90">
                <p>
                  Entering Australia without local credibility is the biggest barrier for overseas companies.
                  Australian buyers follow local creators, operators, and founders who share insights and recommend tools.
                </p>
                <p>
                  When someone they trust mentions your product, it bypasses the usual scepticism about
                  unknown international brands. <span className="text-cyan-300 font-medium">You are not starting from zero - you are borrowing credibility.</span>
                </p>
                <p>
                  Creator-led campaigns consistently outperform cold outbound in the Australian B2B market because
                  trust is already established. This is the fastest path to local awareness and pipeline.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "B2B buyers who research independently before contacting sales", value: "87%", color: "text-cyan-400" },
                { label: "Higher conversion rate from warm introductions vs cold outbound", value: "3-5x", color: "text-emerald-400" },
                { label: "Lower customer acquisition cost with performance-based partnerships", value: "40%", color: "text-purple-400" },
                { label: "Faster market entry timeline vs building local presence from scratch", value: "3-5x", color: "text-amber-400" }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <div className={`text-3xl font-black ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-slate-200/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of LinkedIn Partners */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Types of Australian LinkedIn Partners We Activate
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Different creators bring different strengths. We match you with partners whose
              audiences align with your ideal Australian customer profile.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className={`rounded-2xl border ${type.border} bg-gradient-to-br ${type.gradient} p-6 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="rounded-xl bg-white/10 p-3 w-fit mb-4">
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
              What You Can Achieve in Australia
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              LinkedIn creator partnerships drive measurable business outcomes
              across your entire Australian market entry funnel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businessGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-xl bg-cyan-500/20 p-3">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{goal.description}</p>
                  <div className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {goal.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How We Work */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              How We Manage Partnerships End-to-End
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              We handle the entire partnership lifecycle - from sourcing and vetting Australian creators to
              tracking results and processing payouts. You approve the strategy and watch the pipeline fill.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6 lg:p-8"
              >
                <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-xl font-black text-white shadow-lg">
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
              <div key={item.title} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} p-6`}>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-200/80 leading-relaxed mb-4">{item.detail}</p>
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                    {item.example}
                  </div>
                  <p className="text-xs text-slate-400">{item.best}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Handle vs What You Handle */}
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
                  "Sourcing and vetting Australian LinkedIn creators",
                  "Matching creators to your ICP and Australia goals",
                  "Setting up unique tracking links per creator",
                  "Managing creator onboarding and briefing",
                  "Processing monthly payouts via Stripe",
                  "Providing compliance templates and disclosures",
                  "Real-time attribution dashboard and reporting",
                  "Performance optimisation and scaling recommendations",
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
                  "Define your ideal Australian customer profile and goals",
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
              Track performance, manage creators, and prove ROI - all from one dashboard.
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

        {/* FAQ */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Common Questions</h2>
            <p className="text-lg text-slate-200/90 max-w-3xl mx-auto">
              Everything you need to know about launching LinkedIn creator partnerships in Australia.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {faqData.map((section) => (
              <div key={section.category} className="rounded-2xl border border-white/10 bg-white/5 p-8">
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
        <section className="mt-24 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-12 lg:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Ready to Use LinkedIn Creators for Your Australia Entry?
            </h2>
            <p className="text-lg text-slate-200/90 mb-8">
              Join overseas companies driving measurable ROI through trusted Australian LinkedIn creator partnerships.
              We handle the sourcing, tracking, and payouts - you close the deals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0AA7B5]/30 transition hover:bg-[#00838F]"
              >
                <Calendar className="h-5 w-5" />
                Book a Call
              </a>
              <Link
                href="/linkedin-growth/influencer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition"
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
