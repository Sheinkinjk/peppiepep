import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Layers,
  LineChart,
  Megaphone,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencer);

const businessOutcomes = [
  {
    title: "Drive Qualified Demos",
    detail: "Creator endorsements bring warm, educated prospects who already trust the recommendation. Your sales team talks to buyers who understand the value.",
    icon: Target,
    gradient: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-400/30",
  },
  {
    title: "Build Brand Authority",
    detail: "When respected voices in your industry mention your product, it signals credibility. You're not interrupting—you're being introduced.",
    icon: TrendingUp,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
  },
  {
    title: "Scale Predictably",
    detail: "Pay for outcomes, not impressions. Track every click, signup, and conversion. Double down on what works, cut what doesn't.",
    icon: LineChart,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-400/30",
  },
];

const faqData = [
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
        q: "Who is responsible for compliance?",
        a: "Both parties share responsibility. Brands must ensure product claims are truthful and substantiated. Creators must disclose partnerships and avoid deceptive practices. Refer Labs provides tools, guidance, and templates to help maintain compliance, but we are not legal counsel. Both businesses and creators should consult with legal advisors regarding their specific obligations under FTC, ASA, and local advertising laws."
      },
      {
        q: "How do you prevent fake engagement or fraud?",
        a: "We vet creators before approval, tracking follower authenticity, engagement patterns, and audience quality. All conversions are tracked through unique referral links with server-side validation. Businesses see full attribution data—click sources, conversion rates, and customer quality—so you know exactly what you're paying for. Suspicious activity triggers review and potential removal from the platform."
      }
    ]
  },
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
      },
      {
        q: "Do I need to provide creatives or templates?",
        a: "Optional. Some brands provide templates, graphics, or talking points. Others give creators full creative freedom with just a brief. We recommend a hybrid: share key product benefits and proof points, but let creators frame the narrative for their audience. Authenticity converts better than scripted ads."
      }
    ]
  },
  {
    category: "Getting Started",
    icon: Sparkles,
    questions: [
      {
        q: "What types of businesses work best?",
        a: "SaaS companies with clear product-market fit, e-commerce brands with differentiated products, B2B tools replacing manual workflows, and any business with a defined ICP and trackable conversion goals. You need the ability to measure outcomes (demos, signups, revenue) and allocate budget based on performance. Early-stage startups and established enterprises both succeed here."
      },
      {
        q: "How long does it take to launch?",
        a: "Most businesses launch their first creator campaign within 7-10 days. Timeline: (1) Submit partnership request and define goals (Day 1), (2) We match you with aligned creators (Days 2-4), (3) You review creator profiles and approve partnerships (Days 5-6), (4) Creators draft content for your approval (Days 7-9), (5) Content goes live and tracking begins (Day 10). Faster timelines are possible for urgent launches."
      },
      {
        q: "What budget should I allocate?",
        a: "Start with $2,000-$5,000/month to test 3-5 creators. This gives you enough data to identify what works without over-committing. High-performing programs scale to $20,000-$50,000+/month as you add more creators and expand to new audience segments. Budget scales with proven ROI—if you're generating 5x returns, increasing spend is a no-brainer."
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
    "description": "Replace outbound sales with trusted creator distribution. Performance-based LinkedIn partnerships that drive qualified demos, signups, and revenue.",
    "url": "https://referlabs.com.au/linkedin-growth",
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au",
      "logo": "https://referlabs.com.au/logo.png"
    },
    "mainEntity": {
      "@type": "Service",
      "serviceType": "Performance Marketing Platform",
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.12),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.1),transparent_50%)]" />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16">

        {/* Hero Section - Business First */}
        <section className="space-y-10 animate-in fade-in duration-700">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-balance text-5xl font-black leading-[1.08] sm:text-6xl lg:text-7xl text-white">
              Your Next Customer Is Already Following Someone on LinkedIn
            </h1>

            <p className="text-xl text-slate-200/90 leading-relaxed max-w-3xl mx-auto">
              Partner with verified LinkedIn creators to drive qualified demos and revenue.
              No ads. No cold outreach. Just trusted voices introducing your product to engaged, in-market buyers.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/linkedin-growth/business"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-base font-bold text-slate-900 shadow-2xl shadow-cyan-500/40 transition hover:scale-[1.02]"
              >
                Partner With Creators
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Premium PDF Downloads - New Section */}
        <section className="mt-24 animate-in fade-in duration-700 delay-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Download our comprehensive guides to understand creator partnerships and build your go-to-market strategy.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Guide 1: The Creator Partnership Playbook */}
            <div className="group rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-blue-500/10 p-8 backdrop-blur hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-4 text-white shadow-lg">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-2">The Creator Partnership Playbook</h3>
                  <p className="text-sm text-cyan-200 font-semibold uppercase tracking-wide">For B2B Marketing & Growth Teams</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm text-slate-200/90 leading-relaxed">
                  A 24-page strategic guide covering how to identify, vet, and activate LinkedIn creators who can drive measurable business outcomes. Includes real campaign examples, payout models, and ROI frameworks.
                </p>

                <div className="space-y-2 text-sm text-slate-200/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                    <span>How to build creator partnerships that outperform paid ads</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                    <span>Step-by-step vetting criteria for selecting the right creators</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                    <span>Performance benchmarks and ROI calculation templates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                    <span>Compliance checklist for FTC and LinkedIn guidelines</span>
                  </div>
                </div>
              </div>

              <a
                href="/pdfs/creator-partnership-playbook.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 hover:bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition group-hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Download Free Guide (PDF)
              </a>
            </div>

            {/* Guide 2: LinkedIn Creator Economics */}
            <div className="group rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-pink-500/10 p-8 backdrop-blur hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white shadow-lg">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-2">LinkedIn Creator Economics</h3>
                  <p className="text-sm text-purple-200 font-semibold uppercase tracking-wide">Benchmarks & Market Data (2025)</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm text-slate-200/90 leading-relaxed">
                  Industry benchmarks, payout structures, and performance data from 200+ creator partnerships. Understand market rates, conversion metrics, and how to structure competitive offers that attract top creators.
                </p>

                <div className="space-y-2 text-sm text-slate-200/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
                    <span>2025 payout benchmarks by industry and creator tier</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
                    <span>Conversion rate data: CTR, demo show rates, close rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
                    <span>How to structure competitive commission models</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
                    <span>Case studies from SaaS, fintech, and e-commerce brands</span>
                  </div>
                </div>
              </div>

              <a
                href="/pdfs/linkedin-creator-economics-2025.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-purple-400 hover:bg-purple-300 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-purple-500/30 transition group-hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Download Market Report (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* What You Can Achieve - Business Outcomes */}
        <section id="how-it-works" className="mt-28 animate-in fade-in duration-700 delay-150">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">What Creator Partnerships Can Do for Your Business</h2>
            <p className="mt-4 text-lg text-slate-200/90 max-w-3xl mx-auto">
              Move beyond cold outreach and paid ads. Leverage trusted voices to reach buyers who are already engaged and looking for solutions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {businessOutcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <div
                  key={outcome.title}
                  className={`rounded-3xl border ${outcome.border} bg-gradient-to-br ${outcome.gradient} backdrop-blur-sm p-8 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur w-fit mb-6">
                    <Icon className="h-8 w-8 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{outcome.title}</h3>
                  <p className="text-sm text-slate-200/90 leading-relaxed">{outcome.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Proof - The Market Reality with Real Stats */}
        <section className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-10 lg:p-12 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Trust Lives in the Feed, Not the Inbox</h2>

              <div className="space-y-4 text-base text-slate-200/90">
                <p>
                  Your buyers are on LinkedIn every day. They follow creators, operators, and founders who share insights, solve problems, and recommend tools.
                </p>
                <p>
                  When someone they trust mentions your product, it doesn't feel like advertising—it feels like a referral from a colleague.
                </p>
                <p>
                  That's why creator-led campaigns consistently outperform traditional outbound methods in B2B conversion rates.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Average email open rates in B2B cold outreach (2024)", value: "21.5%", color: "text-amber-400", source: "HubSpot 2024" },
                { label: "B2B buyers who research independently before contacting sales", value: "87%", color: "text-emerald-400", source: "Gartner" },
                { label: "Professionals active on LinkedIn globally", value: "1B+", color: "text-cyan-400", source: "LinkedIn 2024" },
                { label: "B2B marketers reporting ROI from influencer partnerships", value: "89%", color: "text-purple-400", source: "TopRank Marketing 2024" }
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

        {/* How It Works - Process Flow */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">From Strategy to Scale in 10 Days</h2>
            <p className="mt-4 text-lg text-slate-200/90 max-w-3xl mx-auto">
              We handle creator vetting, matching, and operations. You approve partnerships, provide direction, and track results.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Define Your Goals",
                detail: "Tell us your ICP, conversion goals (demos, signups, revenue), and budget. We craft your partnership brief.",
                icon: Target
              },
              {
                step: "2",
                title: "Creator Matching",
                detail: "We present 5-10 vetted creators whose audiences align with your ICP. You review and approve partnerships.",
                icon: Users
              },
              {
                step: "3",
                title: "Content & Launch",
                detail: "Creators draft posts in their voice. You review, request edits, and approve. Content goes live with tracking enabled.",
                icon: Megaphone
              },
              {
                step: "4",
                title: "Track & Optimize",
                detail: "Watch conversions roll in. See which creators drive results. Scale top performers, pause underperformers.",
                icon: BarChart3
              }
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur p-6 h-full hover:border-cyan-400/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-lg font-black text-white shadow-lg">
                      {item.step}
                    </div>
                    <item.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed">{item.detail}</p>
                </div>
                {item.step !== "4" && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight className="h-6 w-6 text-cyan-400/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Split - Business Primary, Creators Secondary */}
        <section className="mt-24 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Business CTA - Larger, More Prominent */}
          <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/15 via-slate-900/70 to-blue-500/15 p-10 lg:p-12 backdrop-blur shadow-2xl shadow-cyan-500/20">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 mb-6">
              <Zap className="h-4 w-4" />
              For Businesses
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Ready to Replace Cold Outreach?</h2>
            <p className="text-base text-slate-200/90 leading-relaxed mb-8">
              Tell us about your business, ICP, and growth goals. We'll match you with creators whose audiences are already looking for solutions like yours.
            </p>

            <div className="space-y-3 mb-8 text-sm text-slate-200/90">
              {[
                "Pay only for verified conversions (demos, signups, revenue)",
                "Launch your first creator campaign in 7-10 days",
                "Scale with proven ROI—no long-term contracts",
                "Full attribution tracking and performance dashboards"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/linkedin-growth/business"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
            >
              Start a Partnership
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Creator CTA - Smaller, Supportive */}
          <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/70 to-teal-500/10 p-8 backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 mb-6">
              <Users className="h-4 w-4" />
              For Creators
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Monetize Your Audience</h3>
            <p className="text-sm text-slate-200/90 leading-relaxed mb-6">
              Join a curated pool of LinkedIn creators earning recurring revenue by promoting products they actually believe in.
            </p>

            <div className="space-y-2 mb-6 text-sm text-slate-200/90">
              {[
                "Performance-based payouts (no follower minimums)",
                "Only promote products you'd use yourself",
                "Transparent tracking and monthly payments"
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/linkedin-growth/influencer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/30 px-6 py-3 text-sm font-bold text-white backdrop-blur transition"
            >
              Apply as a Creator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="mt-28">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Everything You Need to Know</h2>
            <p className="text-lg text-slate-200/90 max-w-3xl mx-auto">
              Transparency builds trust. Here's how creator partnerships work, how we ensure compliance, and how you maintain full control.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((section) => (
              <div key={section.category} className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-10 backdrop-blur">
                <div className="flex items-center gap-3 mb-8">
                  <div className="rounded-xl bg-cyan-500/20 p-3">
                    <section.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-black text-white">{section.category}</h3>
                </div>

                <div className="space-y-6">
                  {section.questions.map((faq, idx) => (
                    <details key={idx} className="group">
                      <summary className="flex items-start justify-between cursor-pointer list-none">
                        <div className="flex-1 pr-4">
                          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{faq.q}</h4>
                        </div>
                        <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 mt-0.5" />
                      </summary>
                      <div className="mt-4 pl-0 pr-8">
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
        <section className="mt-20 rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 p-12 lg:p-16 text-center backdrop-blur">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Replace Ads With Advocacy
            </h2>
            <p className="text-lg text-slate-200/90 mb-8">
              Join B2B companies driving measurable ROI through trusted LinkedIn creator partnerships.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/linkedin-growth/business"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
              >
                Launch a Partnership
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
