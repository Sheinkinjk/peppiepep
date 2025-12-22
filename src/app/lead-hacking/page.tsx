import Link from "next/link";
import { ArrowRight, Target, TrendingUp, Zap, Users, BarChart3, Rocket, CheckCircle2, DollarSign, LineChart } from "lucide-react";

const metrics = [
  { value: "3-5x", label: "Average ROI", sublabel: "on lead acquisition campaigns" },
  { value: "40%+", label: "Pipeline Growth", sublabel: "within first 90 days" },
  { value: "<48h", label: "Launch Speed", sublabel: "from strategy to execution" },
];

const coreServices = [
  {
    icon: Target,
    title: "ICP-Matched Lead Generation",
    description: "We don't spray and pray. We engineer lead gen campaigns that target your exact buyer profile using intent signals, lookalike data, and affiliate networks.",
    results: [
      "Qualified lead flow: 50-200+ monthly MQLs",
      "Conversion rates 2-3x higher than cold outreach",
      "Pre-qualified prospects ready for sales conversations",
    ],
    badge: "Revenue Engine",
  },
  {
    icon: Rocket,
    title: "Growth Hacking Sprints",
    description: "Rapid-fire testing of growth channels, viral loops, and conversion tactics. We find what works, double down fast, and hand you a repeatable playbook.",
    results: [
      "Test 5-10 growth channels in 30 days",
      "Identify your 20% that drives 80% of growth",
      "Documented playbooks for internal scale",
    ],
    badge: "Velocity Play",
  },
  {
    icon: Users,
    title: "Affiliate & Partner Acquisition",
    description: "Build a network of affiliates and partners who become an extension of your sales team—driving qualified referrals that close at 3-5x higher rates.",
    results: [
      "20-50 active affiliates within 90 days",
      "Partner-sourced deals with 40-60% higher LTV",
      "Revenue-share structures that scale profitably",
    ],
    badge: "Compounding Growth",
  },
];

const growthTactics = [
  {
    tactic: "Cold Email Automation",
    impact: "300-500 highly-targeted emails/day",
    metric: "15-25% open rate, 3-8% reply rate",
  },
  {
    tactic: "LinkedIn Outbound Engine",
    impact: "Automated connection + nurture sequences",
    metric: "30-40% connection rate, 10-15% qualified convos",
  },
  {
    tactic: "Referral Program Architecture",
    impact: "Turn customers into affiliates",
    metric: "20-30% customer participation, 2-5x LTV multiplier",
  },
  {
    tactic: "Content-to-Lead Funnels",
    impact: "SEO + lead magnets → automated nurture",
    metric: "100-500 organic leads/month at scale",
  },
  {
    tactic: "Paid Acquisition Testing",
    impact: "Multi-channel ad testing (Google, LinkedIn, Meta)",
    metric: "$20-80 CAC, 3-5x ROI within 60 days",
  },
  {
    tactic: "Sales Outreach Sequences",
    impact: "Multi-touch campaigns across email, phone, LinkedIn",
    metric: "25-35% meeting-set rate from qualified list",
  },
];

const processSteps = [
  {
    step: "01",
    title: "ICP Deep-Dive & Channel Mapping",
    description: "We reverse-engineer your best customers to identify where your next 1,000 customers are hiding. Then map the fastest channels to reach them.",
    deliverable: "ICP blueprint + channel prioritization matrix",
  },
  {
    step: "02",
    title: "Campaign Sprint & Launch",
    description: "We build and deploy 3-5 growth experiments simultaneously. Email sequences, LinkedIn automation, content funnels, paid tests—whatever data says will work.",
    deliverable: "Live campaigns + real-time performance dashboard",
  },
  {
    step: "03",
    title: "Optimize & Scale Winners",
    description: "Double down on what's working. Kill what's not. Refine messaging, increase volume, and systematize the winners into repeatable playbooks.",
    deliverable: "Scaled campaigns + documented SOPs",
  },
  {
    step: "04",
    title: "Transition & Ownership Transfer",
    description: "We hand over a proven, scalable lead gen engine with training, templates, and tools so your team can operate independently.",
    deliverable: "Playbooks, templates, training, dashboard access",
  },
];

const socialProof = [
  {
    result: "Generated 437 SQLs in 90 days",
    company: "B2B SaaS Startup",
    context: "Cold outreach + affiliate program → $240K pipeline",
  },
  {
    result: "Reduced CAC by 62%",
    company: "E-commerce Brand",
    context: "Shifted from paid ads to referral engine + content SEO",
  },
  {
    result: "Built 73 active affiliate partners",
    company: "Professional Services",
    context: "Partner-sourced deals now 40% of monthly revenue",
  },
];

const pricing: {
  [key: string]: {
    name: string;
    price: string;
    duration: string;
    ideal: string;
    includes: string[];
    badge?: string;
  };
} = {
  starter: {
    name: "Growth Sprint",
    price: "$5K-8K",
    duration: "30-day intensive",
    ideal: "Validate a channel or tactic fast",
    includes: [
      "ICP analysis + channel prioritization",
      "2-3 growth experiments launched",
      "Performance tracking + optimization",
      "Playbook documentation",
    ],
  },
  scale: {
    name: "Lead Gen Engine Build",
    price: "$12K-20K",
    duration: "90-day engagement",
    ideal: "Build a repeatable, scalable lead machine",
    includes: [
      "Full ICP deep-dive + competitor mapping",
      "5-7 simultaneous growth experiments",
      "Affiliate program setup (if applicable)",
      "Weekly optimization + reporting",
      "Transition playbooks + training",
    ],
    badge: "Most Popular",
  },
  enterprise: {
    name: "Fractional Growth Partner",
    price: "Custom",
    duration: "6-12 month retainer",
    ideal: "Ongoing growth optimization + execution",
    includes: [
      "Embedded growth partner (5-10h/week)",
      "Continuous campaign management",
      "Strategic advisory + channel expansion",
      "Team training + enablement",
      "Full-stack growth operations",
    ],
  },
};

export default function LeadHackingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_50%)]" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        {/* Hero Section */}
        <section className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              Growth Hacking at Scale
            </div>
            <h1 className="text-balance text-5xl font-black leading-[1.1] sm:text-6xl lg:text-7xl">
              Turn Marketing Spend Into <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Predictable Revenue</span>
            </h1>
            <p className="text-xl leading-relaxed text-slate-300">
              We engineer lead generation systems that deliver <strong className="text-white">50-200+ qualified leads per month</strong>. No fluff. No vanity metrics. Just scalable growth tactics that convert into pipeline and revenue.
            </p>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur">
                  <div className="text-3xl font-black text-emerald-400">{metric.value}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{metric.label}</div>
                  <div className="text-xs text-slate-400">{metric.sublabel}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-500/30 transition hover:shadow-emerald-500/50 hover:scale-105"
              >
                Get a Free Growth Audit
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:border-slate-500 hover:bg-slate-700/50"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">The Outcome</p>
                  <p className="text-2xl font-black text-white">Compounding Growth Engine</p>
                </div>
              </div>
              <p className="mb-6 text-slate-300">
                We build multi-channel lead gen systems that don't just get you leads today—they compound month over month as we optimize, scale, and add new channels.
              </p>
              <div className="space-y-3">
                {[
                  "Pipeline grows 40%+ in first 90 days",
                  "CAC decreases as channels mature",
                  "Affiliate network creates compounding referrals",
                  "Documented playbooks enable internal scaling",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">What We Build</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Growth Engines That Scale</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Not tactics. Not hacks. Complete lead generation systems designed to deliver predictable, measurable results.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-xl backdrop-blur transition hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {service.badge}
                    </span>
                  </div>
                  <Icon className="mb-6 h-12 w-12 text-emerald-400" />
                  <h3 className="mb-3 text-2xl font-black text-white">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-300">{service.description}</p>
                  <div className="space-y-2 border-t border-slate-700/50 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Expected Results:</p>
                    {service.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm text-slate-200">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Growth Tactics Grid */}
        <section className="mb-20">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">Our Arsenal</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Growth Tactics We Deploy</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              We test fast, scale what works, and kill what doesn't. Here are the exact tactics we use to generate qualified leads at scale.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {growthTactics.map((tactic) => (
              <div
                key={tactic.tactic}
                className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur"
              >
                <h3 className="mb-2 text-lg font-bold text-white">{tactic.tactic}</h3>
                <p className="mb-3 text-sm text-slate-300">{tactic.impact}</p>
                <div className="rounded-lg bg-emerald-500/10 px-3 py-2">
                  <p className="text-xs font-semibold text-emerald-400">{tactic.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">Real Results</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Companies We've Scaled</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {socialProof.map((proof, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-xl backdrop-blur"
              >
                <div className="mb-4 text-3xl font-black text-emerald-400">{proof.result}</div>
                <p className="mb-2 text-sm font-semibold text-white">{proof.company}</p>
                <p className="text-sm text-slate-400">{proof.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-20">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">How It Works</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">From Zero to Scalable in 90 Days</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 rounded-3xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-black text-white">
                  {step.step}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mb-4 text-sm text-slate-300">{step.description}</p>
                  <div className="rounded-lg bg-emerald-500/10 px-3 py-2">
                    <p className="text-xs font-semibold text-emerald-400">Deliverable: {step.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-20">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">Investment Options</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Transparent Pricing, Scalable ROI</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Choose the engagement that fits your growth stage. Every package is results-focused with clear deliverables.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {Object.entries(pricing).map(([key, plan]) => (
              <div
                key={key}
                className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur ${
                  plan.badge
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-900/30 to-slate-900/80 shadow-2xl shadow-emerald-500/20'
                    : 'border-slate-700/50 bg-slate-800/50'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-black text-white">{plan.name}</h3>
                <div className="mb-1 text-4xl font-black text-emerald-400">{plan.price}</div>
                <p className="mb-4 text-sm text-slate-400">{plan.duration}</p>
                <p className="mb-6 text-sm font-semibold text-slate-300">Ideal for: {plan.ideal}</p>
                <div className="space-y-3">
                  {plan.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 via-slate-900/80 to-slate-900/80 p-12 text-center shadow-2xl backdrop-blur">
          <DollarSign className="mx-auto mb-6 h-16 w-16 text-emerald-400" />
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            Ready to Build a Lead Gen Engine?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            We'll audit your current lead gen strategy, identify the highest-ROI channels, and show you exactly how we'd generate 50-200+ qualified leads per month for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition hover:shadow-emerald-500/50 hover:scale-105"
          >
            Get Your Free Growth Audit
            <ArrowRight className="h-6 w-6" />
          </Link>
          <p className="mt-6 text-sm text-slate-400">
            No sales pitch. Just a detailed breakdown of growth opportunities in your market.
          </p>
        </section>
      </main>
    </div>
  );
}
