import { Mail, Calendar, ArrowRight, MapPin, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white tracking-tight max-w-3xl mx-auto">
            Let's Build Your <span className="text-cyan-400">Referral Program</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Whether you're exploring options or ready to launch, we're here to help you turn your network into your most powerful growth channel.
          </p>
        </header>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {/* Schedule a Call - Primary */}
          <a
            href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-white/[0.04] to-transparent p-8 transition-all hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-teal-500/25 border border-cyan-500/30 mb-6">
                <Calendar className="h-7 w-7 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Schedule a Call</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Book a 30-minute call to discuss your goals, explore program options, and get a tailored recommendation.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  30 minutes
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
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 transition-all hover:border-white/20 hover:shadow-xl"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/25 to-violet-500/25 border border-purple-500/30 mb-6">
                <Mail className="h-7 w-7 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Email Us</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Have questions? Send us an email and we'll respond within 24 hours with detailed answers.
              </p>
              <div className="text-sm text-slate-400 mb-6">
                jarred@referlabs.com.au
              </div>
              <div className="inline-flex items-center gap-2 text-purple-300 font-semibold group-hover:text-purple-200 transition-colors">
                Send Email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* What to Expect */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What to Expect</h2>
            <p className="text-slate-400">Our process is designed to get you results quickly</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discovery Call</h3>
              <p className="text-sm text-slate-400">We learn about your business, goals, and ideal partners</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Program Design</h3>
              <p className="text-sm text-slate-400">We recommend the right offering and reward structure</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <span className="text-xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Launch & Grow</h3>
              <p className="text-sm text-slate-400">We help you activate partners and start tracking results</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Explore Before You Reach Out</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/how-it-works"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-slate-300 hover:border-cyan-500/30 hover:text-white transition-all"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-slate-300 hover:border-cyan-500/30 hover:text-white transition-all"
              >
                View Pricing
              </Link>
              <Link
                href="/case-studies"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-slate-300 hover:border-cyan-500/30 hover:text-white transition-all"
              >
                Case Studies
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
