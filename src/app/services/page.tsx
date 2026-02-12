import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  FileSignature,
  Target,
  Users,
  BarChart3,
  Building2,
  TrendingUp,
  Shield,
  Settings,
  UserPlus,
  Megaphone,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.services);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Your On-the-Ground{" "}
            <span className="text-cyan-400">Commercial Arm</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We do not just run outreach from a spreadsheet. We leverage our local network of industry contacts, LinkedIn creators, agency partners, and advisors to open doors that cold outbound never will.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* The Network — Why We're Different */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Our unfair advantage</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              A Network You Cannot Build Overnight
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every engagement is powered by relationships we have spent years building across APAC. This is the infrastructure behind every introduction, partnership, and deal we close on your behalf.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Megaphone,
                title: "LinkedIn Creators & Industry Voices",
                desc: "A curated network of local LinkedIn creators, industry commentators, and thought leaders who amplify your brand, warm up your ICP, and make introductions that convert.",
                stat: "Credibility from day one",
                color: "from-cyan-500/20 to-teal-500/10",
                border: "border-cyan-500/20",
              },
              {
                icon: Building2,
                title: "Agency & Consultant Partners",
                desc: "Pre-existing relationships with agencies, consultancies, and advisory firms who already serve your target customer. They co-sell, refer, and white-label your product.",
                stat: "Embedded distribution",
                color: "from-purple-500/20 to-pink-500/10",
                border: "border-purple-500/20",
              },
              {
                icon: Users,
                title: "Advisor & Referral Network",
                desc: "Financial advisors, brokers, accountants, and professional service providers who recommend solutions to their clients. We activate these referral channels for you.",
                stat: "Warm introductions at scale",
                color: "from-amber-500/20 to-orange-500/10",
                border: "border-amber-500/20",
              },
              {
                icon: Globe,
                title: "Platform & Enterprise Contacts",
                desc: "Direct relationships with enterprise buyers, platform operators, and procurement teams. We know who makes purchasing decisions in the verticals that matter to you.",
                stat: "Shorter sales cycles",
                color: "from-emerald-500/20 to-teal-500/10",
                border: "border-emerald-500/20",
              },
            ].map((channel) => (
              <div
                key={channel.title}
                className={`group relative rounded-2xl border ${channel.border} bg-white/[0.02] p-7 transition-all duration-300 hover:bg-white/[0.04] overflow-hidden`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${channel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                    <channel.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{channel.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{channel.desc}</p>
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{channel.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Core Services */}
        <section className="mb-28 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Five core services</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Everything You Need to Enter and Win
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each service is built on our local network. We do not outsource — we use the relationships, channels, and market knowledge we have built to deliver real commercial outcomes.
            </p>
          </div>

          {/* Service 1: Sales Representation */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Target className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">01 — Sales Representation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Warm Introductions, Not Cold Spray-and-Pray
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We combine targeted outbound with warm introductions through our network of LinkedIn creators, industry advisors, and local contacts. Your prospects hear about you from people they already trust — before we ever reach out directly.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  How We Create Pipeline
                </p>
                <ul className="space-y-3">
                  {[
                    "Warm introductions through our advisor and consultant network",
                    "LinkedIn creators amplify your brand to your exact ICP",
                    "Targeted outbound to enterprise and mid-market buyers",
                    "Demo booking, pipeline management, and closing support",
                    "You join the calls that matter — we handle the rest",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Pilot outcome</p>
                <p className="text-lg font-bold text-cyan-400">10-20 qualified client conversations</p>
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
                    <p className="font-semibold text-white">Sales Pipeline</p>
                    <p className="text-sm text-slate-400">Typical 90-day pilot outcomes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Prospects contacted", value: "150-300" },
                    { label: "Warm intros made", value: "30-60" },
                    { label: "Meetings booked", value: "10-20" },
                    { label: "Qualified pipeline", value: "5-12" },
                    { label: "Deals supported", value: "2-5" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="text-slate-400">{row.label}</span>
                      <span className="font-bold text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Partnership & Distribution Development */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <p className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-5">
                  Partner Channel Types
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Building2, color: "bg-purple-500/20", iconColor: "text-purple-400", title: "Agency Partners", desc: "Agencies who co-sell, white-label, and bundle your product for their clients" },
                    { icon: Megaphone, color: "bg-pink-500/20", iconColor: "text-pink-400", title: "LinkedIn Creators & Influencers", desc: "Industry voices who introduce your brand to engaged, high-intent audiences" },
                    { icon: Users, color: "bg-amber-500/20", iconColor: "text-amber-400", title: "Advisor & Consultant Referrers", desc: "Professionals who recommend solutions to their client base — accountants, brokers, advisors" },
                    { icon: Handshake, color: "bg-cyan-500/20", iconColor: "text-cyan-400", title: "Platform & Reseller Partners", desc: "Integrate into platforms, marketplaces, and reseller networks for scale distribution" },
                  ].map((partner) => (
                    <div key={partner.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className={`h-10 w-10 rounded-lg ${partner.color} flex items-center justify-center flex-shrink-0`}>
                        <partner.icon className={`h-5 w-5 ${partner.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{partner.title}</p>
                        <p className="text-sm text-slate-400 mt-1">{partner.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Handshake className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">02 — Partnership & Distribution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Activate the Channels That Already Reach Your Customer
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The fastest path to revenue in a new market is through people who already have your customer&apos;s trust. We identify, pitch, and activate the right partners — agencies, LinkedIn creators, advisors, resellers, and platforms — and structure the commercial terms so everyone is aligned.
              </p>
              <ul className="space-y-3">
                {[
                  "Identify partners who already serve your target customer",
                  "LinkedIn creators who build credibility and generate demand",
                  "Agency co-selling and white-label deal structuring",
                  "Advisor and consultant referral program activation",
                  "Revenue-share, licensing, and distribution negotiations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Pilot outcome</p>
                <p className="text-lg font-bold text-purple-400">3-8 active partners or distribution channels</p>
              </div>
            </div>
          </div>

          {/* Service 3: Compliance & Market Setup */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">03 — Compliance & Market Setup</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Sell Legally on Day One, Not Day Ninety
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Most companies lose months navigating entity structures, tax registration, local contracts, and regulatory requirements. We handle it all in parallel with your sales and partnership workstreams — using our network of local legal, tax, and accounting professionals.
              </p>
              <ul className="space-y-3">
                {[
                  "Market entry structure guidance (entity, branch, or partner-led)",
                  "Local contract and commercial term adjustments",
                  "Tax, regulatory, and pricing compliance",
                  "Introductions to vetted legal, tax, and accounting partners",
                  "Compliance checklist specific to your business model",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-lg font-bold text-emerald-400">Fully compliant, market-ready setup</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Compliance Checklist
                </p>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Market entry structure", desc: "Entity, branch, or partner-led entry" },
                    { step: "2", title: "Contract localisation", desc: "Terms, pricing, and SLAs for local market" },
                    { step: "3", title: "Tax & regulatory setup", desc: "Registration, pricing adjustments, compliance" },
                    { step: "4", title: "Professional network", desc: "Vetted legal, tax, and accounting partner intros" },
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

          {/* Service 4: Regional Operations Management */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Operations Dashboard</p>
                    <p className="text-sm text-slate-400">Ongoing commercial management</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Deal coordination", status: "Active" },
                    { label: "Partner management", status: "Active" },
                    { label: "Client onboarding", status: "Active" },
                    { label: "Revenue reporting", status: "Active" },
                    { label: "Strategy reviews", status: "Monthly" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="text-slate-400">{row.label}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Settings className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">04 — Regional Operations Management</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Run a Local Commercial Operation Without the Overhead
              </h3>
              <p className="text-slate-300 leading-relaxed">
                After the pilot, we continue managing your in-region commercial activity. Deal coordination, partner management, customer onboarding, and revenue reporting — like an internal team, without the fixed cost of building one.
              </p>
              <ul className="space-y-3">
                {[
                  "Ongoing deal coordination and execution support",
                  "Partner and channel relationship management",
                  "Customer onboarding and success coordination",
                  "Monthly pipeline, revenue, and partner reporting",
                  "Market expansion planning and strategy reviews",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-lg font-bold text-amber-400">A functioning in-region commercial operation</p>
              </div>
            </div>
          </div>

          {/* Service 5: Team Formation & Recruitment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <UserPlus className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">05 — Team Formation & Recruitment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Transition From Outsourced to Owned — When You Are Ready
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Once you have validated the market and see real traction, we help you build your own in-region team. We scope the roles, source candidates, support onboarding, and hand over all relationships, playbooks, and processes we have built.
              </p>
              <ul className="space-y-3">
                {[
                  "Role scoping based on market traction data",
                  "Local candidate sourcing and interview support",
                  "Onboarding coordination and knowledge transfer",
                  "Handover of partner relationships and playbooks",
                  "Ongoing advisory during the transition period",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-lg font-bold text-blue-400">Smooth transition from outsourced to in-house</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <p className="text-sm font-semibold text-blue-300 uppercase tracking-wide">
                  Team Growth Phases
                </p>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Outsourced execution", desc: "Refer Labs runs all commercial activity in-region" },
                    { step: "2", title: "Role scoping", desc: "Define which roles to hire first based on real traction" },
                    { step: "3", title: "Recruit & onboard", desc: "Source, interview, and onboard local team members" },
                    { step: "4", title: "Handover & advisory", desc: "Transfer playbooks, relationships, and ongoing support" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-300">{item.step}</span>
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

        {/* What You Get — Concrete Outcomes */}
        <section className="mb-28">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(10,167,181,0.1),transparent_50%)]" />
            <div className="relative">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">90-day pilot deliverables</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  What You Walk Away With
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {[
                  { icon: Target, label: "10-20 qualified client conversations", desc: "Warm introductions and outbound pipeline from real market activity" },
                  { icon: Handshake, label: "3-8 active partner channels", desc: "Agencies, advisors, creators, and resellers pitching and referring your product" },
                  { icon: Shield, label: "Fully compliant market setup", desc: "Entity, contracts, tax, and regulatory setup handled" },
                  { icon: BarChart3, label: "Weekly pipeline reports", desc: "Full transparency on outreach, meetings, deals, and partner status" },
                  { icon: FileSignature, label: "Structured deal terms", desc: "White-label, reseller, and partnership agreements ready to sign" },
                  { icon: MessageSquare, label: "Repeatable playbook", desc: "Tested messaging, partner angles, and channel analysis you can scale" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why This Approach Works — Stats */}
        <section className="mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Why This Works
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Cold outbound alone converts at 1-2%. Warm introductions through trusted channels convert at 10-30%. That is the difference between a failed expansion and a profitable one.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                { value: "10-30%", label: "Warm Intro Conversion", desc: "Introductions through our network convert at dramatically higher rates than cold outbound" },
                { value: "90 Days", label: "To Revenue Signals", desc: "Structured pilot delivers pipeline, partners, and distribution deals in 12 weeks" },
                { value: "Zero", label: "Local Hires Required", desc: "Full commercial operation without a single local employee on your payroll" },
              ].map((stat) => (
                <div key={stat.value} className="space-y-3">
                  <div className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-white font-medium">{stat.label}</p>
                  <p className="text-sm text-slate-400">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Add-ons */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Optional Add-ons
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Layer these on top of any core service for deeper market penetration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: "Landing Page & Positioning Localisation", desc: "Website copy, case studies, and pricing adapted for the local market and buyer psychology." },
              { icon: Megaphone, title: "LinkedIn Creator Campaign", desc: "Dedicated content campaigns with local creators to build brand awareness and generate inbound leads." },
              { icon: TrendingUp, title: "Event & Community Entry", desc: "Introductions to relevant local events, industry associations, and communities for in-person credibility." },
              { icon: Handshake, title: "Intro-Only Mode", desc: "Lighter engagement — we make the introductions through our network, you take it from there." },
            ].map((addon) => (
              <div
                key={addon.title}
                className="flex gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <addon.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{addon.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Build In-Region Revenue?
              </h2>
              <p className="text-lg text-slate-300">
                Tell us what you sell, who you sell to, and where you want to go. We will tell you exactly how our network can open the market for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Market Entry Call
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  View Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
