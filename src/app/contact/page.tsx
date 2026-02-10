import { Mail, Calendar, ArrowRight, MapPin, Clock } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="text-center space-y-6 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white tracking-tight max-w-3xl mx-auto">
            Book a 15-min <span className="text-cyan-400">Australia Expansion Call</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Tell us about your company and your goals in Australia. We will recommend an approach and scope the right engagement.
          </p>
        </header>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {/* Schedule a Call - Primary */}
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-white/[0.04] to-transparent p-8 transition-all hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/25 mb-6">
                <Calendar className="h-7 w-7 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Book a Call</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                15-minute call to discuss your Australia expansion goals, product, and timeline. We will recommend an approach on the call.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  15 minutes
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Video call
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-cyan-300 font-semibold group-hover:text-cyan-200 transition-colors">
                Book Your Call
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Email Us */}
          <a
            href="mailto:jarred@referlabs.com.au"
            className="group relative overflow-hidden rounded-3xl border border-teal-500/25 bg-gradient-to-br from-teal-500/10 via-white/[0.05] to-transparent p-8 transition-all hover:border-teal-400/45 hover:shadow-xl hover:shadow-teal-500/15"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/15 border border-teal-500/25 mb-6">
                <Mail className="h-7 w-7 text-teal-300" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Email Us</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Prefer email? Tell us about your company, what you sell, and your Australia goals. We will respond within 24 hours.
              </p>
              <div className="text-sm text-slate-400 mb-6">
                jarred@referlabs.com.au
              </div>
              <div className="inline-flex items-center gap-2 text-teal-300 font-semibold group-hover:text-teal-200 transition-colors">
                Send Email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* What to Include */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What to Tell Us</h2>
            <p className="text-slate-400">Include these details so we can prepare a relevant recommendation.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Your name and company",
              "Your website",
              "Where you are based",
              "What you sell",
              "Your goal in Australia",
              "Your timeline",
            ].map((item) => (
              <div key={item} className="text-center p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <p className="text-sm text-white font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What Happens Next</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expansion Call</h3>
              <p className="text-sm text-slate-400">We learn about your product, market, and Australia goals</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Market Entry Plan</h3>
              <p className="text-sm text-slate-400">We recommend the right services, target list approach, and pilot scope</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Kick Off</h3>
              <p className="text-sm text-slate-400">If it is a fit, we start your 90-day pilot and begin building pipeline</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
