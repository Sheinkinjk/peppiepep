import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Handshake,
  FileSignature,
  MessageSquare,
  Target,
  BarChart3,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howItWorks);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            How <span className="text-cyan-400">Refer Labs</span> Works
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A structured 90-day pilot that takes you from market alignment to Australian revenue signals - with sales, partnerships, compliance, and operations running in parallel.
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
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Pilot Timeline - Editorial Flow */}
        <section className="mb-28 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              90 Days. Four Phases. Real Pipeline.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each phase builds on the last. Sales, partnerships, compliance, and operations workstreams run in parallel with weekly updates throughout.
            </p>
          </div>

          {/* Phase 1 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-sm font-bold text-cyan-300">Week 1</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Market &amp; Messaging Alignment
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We align on your ICP, value proposition, pricing, and Australia-specific positioning. You share what works in your home market - we adapt it for the Australian buyer. This sets the foundation for everything that follows.
              </p>
              <ul className="space-y-3">
                {[
                  "ICP and target market definition for Australia",
                  "Value proposition adaptation for local buyers",
                  "Pricing and packaging alignment",
                  "Success metrics and pilot KPIs agreed",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black">01</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Alignment Sprint</p>
                    <p className="text-sm text-slate-400">Foundation for the entire pilot</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {["ICP definition", "Positioning document", "Pricing matrix", "Pilot KPIs"].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-cyan-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#00838F] to-[#036572] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black">02</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Target List Build</p>
                    <p className="text-sm text-slate-400">Multi-channel pipeline foundation</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Customer targets", value: "50-100" },
                    { label: "Partner targets", value: "20-40" },
                    { label: "Distribution targets", value: "5-15" },
                  ].map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-xl font-black text-white">{m.value}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <span className="text-sm font-bold text-purple-300">Week 2-3</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Build Target Lists &amp; Partner Angles
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We build your customer target list, identify partnership opportunities, and map potential distribution deals - agencies, platforms, resellers, and enterprise accounts tailored to your ICP.
              </p>
              <ul className="space-y-3">
                {[
                  "Customer prospect list mapped to your ICP",
                  "Partnership opportunities identified and prioritised",
                  "Distribution deal targets researched",
                  "Outreach sequences and pitch angles prepared",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-sm font-bold text-emerald-300">Week 4-12</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Outreach, Meetings &amp; Deal Structuring
              </h3>
              <p className="text-slate-300 leading-relaxed">
                This is where execution happens. Active outreach to clients and partners, meetings booked and run, partnerships negotiated, distribution deals structured, and closing support provided. You join the calls that matter.
              </p>
              <ul className="space-y-3">
                {[
                  "Active outbound to customer targets",
                  "Partner pitches and onboarding conversations",
                  "Distribution deal negotiation and structuring",
                  "Meeting coordination - you join key calls",
                  "Closing support on priority opportunities",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#036572] to-[#024b56] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black">03</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Execution Phase</p>
                    <p className="text-sm text-slate-400">9 weeks of active pipeline building</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Target, label: "Sales outreach active", color: "text-cyan-400" },
                    { icon: Handshake, label: "Partner conversations running", color: "text-purple-400" },
                    { icon: FileSignature, label: "Distribution deals in progress", color: "text-emerald-400" },
                    { icon: BarChart3, label: "Weekly reports delivered", color: "text-amber-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <item.icon className={`h-4 w-4 ${item.color} flex-shrink-0`} />
                      <span className="text-slate-300 text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 - Reporting */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(10,167,181,0.12),transparent_50%)]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <BarChart3 className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-300">Ongoing - Weekly Reporting</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Full Transparency, Every Week
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Every week you receive a report covering pipeline status, partner conversations, distribution deal progress, conversion metrics, and next actions. No black boxes. Full transparency on everything we are doing.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:w-72">
                {[
                  { label: "Pipeline", icon: Target },
                  { label: "Partners", icon: Handshake },
                  { label: "Deals", icon: FileSignature },
                  { label: "Metrics", icon: BarChart3 },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <item.icon className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              What You Get at the End
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything delivered during and at the end of the 90-day pilot.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Target, label: "Target list", detail: "Customers, partners, and distribution targets mapped to your ICP" },
              { icon: MessageSquare, label: "Outreach sequences", detail: "Tested messaging for the Australian market across all channels" },
              { icon: Handshake, label: "Partner pitch angles", detail: "Custom pitches for each partner and distribution opportunity" },
              { icon: FileSignature, label: "Deal terms", detail: "Structured terms for white-label, reseller, and partnership deals" },
              { icon: ClipboardList, label: "Next-step playbook", detail: "Repeatable playbook for scaling what works after the pilot" },
              { icon: BarChart3, label: "Full pilot report", detail: "Pipeline, conversion, partner status, and distribution deal progress" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do vs What You Do */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              What We Do vs What You Do
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold w-1/3">Area</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-cyan-400 font-semibold w-1/3">Refer Labs</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold w-1/3">You</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { area: "Market research & target lists", us: "Build and maintain", you: "Review and approve" },
                  { area: "Sales outreach & prospecting", us: "Execute all outreach", you: "Provide messaging input" },
                  { area: "Partner sourcing & activation", us: "Identify, pitch, and activate", you: "Approve partner fits" },
                  { area: "Distribution deal structuring", us: "Negotiate and structure deals", you: "Approve and sign" },
                  { area: "Meetings & introductions", us: "Book and coordinate", you: "Join key calls" },
                  { area: "Closing support", us: "Support deal progression", you: "Lead final negotiations" },
                  { area: "Reporting", us: "Weekly pipeline reports", you: "Review and act on insights" },
                ].map((row) => (
                  <tr key={row.area} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 text-white font-medium">{row.area}</td>
                    <td className="px-6 py-3.5 text-cyan-400 font-medium">{row.us}</td>
                    <td className="px-6 py-3.5 text-slate-400">{row.you}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Start Your 90-Day Pilot?
              </h2>
              <p className="text-lg text-slate-300">
                Book a 15-minute call and we will walk you through how we can build your Australian pipeline, partnerships, and distribution.
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
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Explore Services
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
