import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Handshake,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howItWorks);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f2fdff] via-[#e8f9fb] to-[#f7fcfd] text-slate-900">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,148,170,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,139,149,0.07),transparent_55%)]" />
        <div className="absolute inset-y-0 left-1/2 w-[420px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),transparent_60%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <header className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 shadow-sm ring-1 ring-white/60">
            90-day pilot
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#0b2a34] tracking-tight max-w-4xl mx-auto">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-teal-700 to-slate-900">Refer Labs</span> Works
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A structured 90-day pilot that takes you from market alignment to Australian revenue signals - with weekly reporting every step of the way.
          </p>
        </header>

        {/* ─── Pilot Structure (90 Days) ─── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3">
              90-Day Pilot <span className="text-cyan-700">Structure</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Week 1 */}
            <div className="rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-white via-cyan-50 to-white p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-black text-sm">W1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Market &amp; Messaging Alignment</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We align on your ICP, value proposition, pricing, and Australia-specific positioning. You share what works in your home market - we adapt it for Australia.
                  </p>
                </div>
              </div>
            </div>

            {/* Week 2-3 */}
            <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-r from-white via-teal-50 to-white p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-700 font-black text-sm">W2-3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Build Target Lists + Partner Angles</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We build your customer target list and identify partnership angles - agencies, platforms, communities, and affiliates that could distribute your product in Australia.
                  </p>
                </div>
              </div>
            </div>

            {/* Week 4-12 */}
            <div className="rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-white via-cyan-50 to-white p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-black text-sm">W4-12</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Outreach + Meetings + Closing Support</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Active outreach to customers and partners. We book meetings, make introductions, and provide closing support on key opportunities. You join the calls that matter.
                  </p>
                </div>
              </div>
            </div>

            {/* Ongoing */}
            <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-white via-amber-50 to-white p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Weekly Reporting Cadence</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Every week you receive a report covering: pipeline status, partners contacted, conversion metrics, and next actions. No surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Deliverables ─── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3">
              What You <span className="text-cyan-700">Receive</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Target, label: "Target list", detail: "Customers + partners mapped to your ICP" },
              { icon: MessageSquare, label: "Outreach sequences", detail: "Tested messaging for the Australian market" },
              { icon: Handshake, label: "Partner pitch angles", detail: "Custom pitches for each partner type" },
              { icon: FileText, label: "Meeting notes + pipeline report", detail: "Full record of every conversation" },
              { icon: ClipboardList, label: "Next-step playbook", detail: "What to do after the pilot ends" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200/80 bg-white/85 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-cyan-700" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{item.label}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── What You Must Provide ─── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3">
              What You <span className="text-cyan-700">Provide</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              We handle the heavy lifting, but we need a few things from your side.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Clear ICP and target customer profile",
              "Your offer, pricing, and positioning",
              "Someone to join key calls and meetings",
              "Ability to move fast on partner terms",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/80 bg-white/85 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-700 flex-shrink-0" />
                <p className="text-slate-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── What We Do vs What You Do ─── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3">
              What We Do vs <span className="text-cyan-700">What You Do</span>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/90 max-w-4xl mx-auto shadow-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200/80">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Area</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-cyan-700 font-semibold">Refer Labs</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">You</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { area: "Market research & target lists", us: "Build and maintain", you: "Review and approve" },
                  { area: "Outreach & prospecting", us: "Execute all outreach", you: "Provide messaging input" },
                  { area: "Partner sourcing", us: "Identify and pitch partners", you: "Approve partner fits" },
                  { area: "Meetings & introductions", us: "Book and coordinate", you: "Join key calls" },
                  { area: "Closing support", us: "Support deal progression", you: "Lead final negotiations" },
                  { area: "Reporting", us: "Weekly pipeline reports", you: "Review and act on insights" },
                  { area: "Partner terms", us: "Draft structures", you: "Approve and sign" },
                ].map((row) => (
                  <tr key={row.area}>
                    <td className="px-6 py-3.5 text-slate-900 font-medium">{row.area}</td>
                    <td className="px-6 py-3.5 text-cyan-700">{row.us}</td>
                    <td className="px-6 py-3.5 text-slate-600">{row.you}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-8 sm:p-12 text-center shadow-[0_24px_90px_rgba(6,16,32,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_55%)]" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34]">
              Ready to Enter Australia?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Book a 15-minute call and we will walk you through how we can build your Australian pipeline.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-cyan-500/30"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-min Expansion Call
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-cyan-900/10 bg-white/80 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-white"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
