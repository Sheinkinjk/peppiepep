import { Mail, Calendar, ArrowRight, MapPin, Clock, Phone, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,167,181,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(12,58,69,0.06),transparent_45%)]" />
      </div>

      <main
        id="main-content"
        className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <header className="premium-section-light text-center space-y-6 mb-16 rounded-[2rem] px-6 py-12 sm:px-10 sm:py-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-[#0b2a34] tracking-tight max-w-3xl mx-auto">
            Book a 15-min <span className="text-[#0AA7B5]">Market Expansion Call</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tell us about your company and your expansion goals. We will recommend an approach and scope the right engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#088c98]"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
            <Link
              href="/application"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#0b2a34] hover:border-[#0AA7B5]/40"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Contact Options */}
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto" aria-label="Contact options">
          {/* Schedule a Call - Primary */}
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-section-light group relative overflow-hidden rounded-3xl border border-[#0AA7B5]/25 bg-white p-8 shadow-sm transition-all hover:border-[#0AA7B5]/45"
            data-lift="true"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3FAFF] rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3FAFF] border border-[#B4EEF7] mb-6">
                <Calendar className="h-7 w-7 text-[#0AA7B5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0b2a34] mb-3">Book a Call</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                15-minute call to discuss your market expansion goals, product, and timeline. We will recommend an approach on the call.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0AA7B5]" />
                  15 minutes
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0AA7B5]" />
                  Video call
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-[#0AA7B5] font-semibold group-hover:text-[#088c98] transition-colors">
                Book your call
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Apply */}
          <Link
            href="/application"
            className="premium-section-light group relative overflow-hidden rounded-3xl border border-[#0AA7B5]/25 bg-white p-8 shadow-sm transition-all hover:border-[#0AA7B5]/45"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3FAFF] border border-[#B4EEF7] mb-6">
                <FileCheck2 className="h-7 w-7 text-[#0AA7B5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0b2a34] mb-3">Apply</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Submit your company profile and expansion goals. We review every application and respond in 1-2 business days.
              </p>
              <div className="inline-flex items-center gap-2 text-[#0AA7B5] font-semibold group-hover:text-[#088c98] transition-colors">
                Open application
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Email Us */}
          <a
            href="mailto:jarred@referlabs.com.au"
            className="premium-section-light group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-[#0AA7B5]/35"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 mb-6">
                <Mail className="h-7 w-7 text-[#0b2a34]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0b2a34] mb-3">Email Us</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Prefer email? Tell us about your company, what you sell, and your expansion goals. We will respond within 24 hours.
              </p>
              <div className="text-sm text-[#0b2a34] mb-6 font-semibold">
                jarred@referlabs.com.au
              </div>
              <div className="inline-flex items-center gap-2 text-[#0AA7B5] font-semibold group-hover:text-[#088c98] transition-colors">
                Send email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Call Us */}
          <a
            href="tel:+61451149569"
            className="premium-section-light group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-[#0AA7B5]/35"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 mb-6">
                <Phone className="h-7 w-7 text-[#0b2a34]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0b2a34] mb-3">Call Us</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Want to talk now? Give us a call directly and we will discuss your expansion goals.
              </p>
              <div className="text-sm text-[#0b2a34] mb-6 font-semibold">
                +61 451 149 569
              </div>
              <div className="inline-flex items-center gap-2 text-[#0AA7B5] font-semibold group-hover:text-[#088c98] transition-colors">
                Call now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </section>

        {/* What to Include */}
        <section className="max-w-4xl mx-auto mb-16" aria-labelledby="what-to-include">
          <div className="text-center mb-10">
            <h2 id="what-to-include" className="text-2xl sm:text-3xl font-bold text-[#0b2a34] mb-3">What to Tell Us</h2>
            <p className="text-slate-600">Include these details so we can prepare a relevant recommendation.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Your name and company",
              "Your website",
              "Where you are based",
              "What you sell",
              "Your expansion goal",
              "Your timeline",
            ].map((item) => (
              <div key={item} className="premium-section-light text-center p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
                <p className="text-sm text-[#0b2a34] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="max-w-4xl mx-auto" aria-labelledby="what-to-expect">
          <div className="text-center mb-10">
            <h2 id="what-to-expect" className="text-2xl sm:text-3xl font-bold text-[#0b2a34] mb-3">What Happens Next</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Expansion Call", copy: "We learn about your product, market, and expansion goals" },
              { title: "Market Entry Plan", copy: "We recommend the right services, target list approach, and pilot scope" },
              { title: "Kick Off", copy: "If it is a fit, we start your 90-day pilot and begin building pipeline" },
            ].map((item, idx) => (
              <div key={item.title} className="premium-section-light text-center p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E3FAFF] border border-[#B4EEF7] mb-4">
                  <span className="text-xl font-bold text-[#0AA7B5]">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#0b2a34] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
