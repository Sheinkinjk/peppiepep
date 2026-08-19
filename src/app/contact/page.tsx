import { Mail, Calendar, ArrowRight, MapPin, Clock, FileCheck2 } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

export default function Contact() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="text-center space-y-6 mb-16 rounded-[2rem] px-6 py-12 sm:px-10 sm:py-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-[#10251b] tracking-tight max-w-3xl mx-auto">
            Book a 15-min <span className="text-[#0a7c42]">Discovery Call</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#2b362f] leading-relaxed max-w-2xl mx-auto">
            Tell us about your company and your growth goals. We will recommend an approach and scope the right engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a7c42] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#086b39]"
            >
              <Calendar className="h-4 w-4" />
              Partner With Us
            </a>
            <Link
              href="/application"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e9e7] bg-white px-6 py-3 text-sm font-semibold text-[#10251b] hover:border-[#0a7c42]/40"
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
            className="group relative overflow-hidden rounded-3xl border border-[#0a7c42]/25 bg-white p-8 shadow-sm transition-all hover:border-[#0a7c42]/45"
            data-lift="true"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8f5ee] rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f5ee] border border-[#cfe6da] mb-6">
                <Calendar className="h-7 w-7 text-[#0a7c42]" />
              </div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-3">Book a Call</h2>
              <p className="text-[#2b362f] leading-relaxed mb-6">
                15-minute call to discuss your growth goals, product, and timeline. We will recommend the right engagement on the call.
              </p>
              <div className="flex items-center gap-4 text-sm text-[#2b362f] mb-6">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0a7c42]" />
                  15 minutes
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0a7c42]" />
                  Video call
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-[#0a7c42] font-semibold group-hover:text-[#086b39] transition-colors">
                Book your call
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Apply */}
          <Link
            href="/application"
            className="group relative overflow-hidden rounded-3xl border border-[#0a7c42]/25 bg-white p-8 shadow-sm transition-all hover:border-[#0a7c42]/45"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f5ee] border border-[#cfe6da] mb-6">
                <FileCheck2 className="h-7 w-7 text-[#0a7c42]" />
              </div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-3">Apply</h2>
              <p className="text-[#2b362f] leading-relaxed mb-6">
                Submit your company profile and expansion goals. We review every application and respond in 1-2 business days.
              </p>
              <div className="inline-flex items-center gap-2 text-[#0a7c42] font-semibold group-hover:text-[#086b39] transition-colors">
                Open application
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Email Us */}
          <a
            href="mailto:jarred@referlabs.com.au"
            className="group relative overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white p-8 shadow-sm transition-all hover:border-[#0a7c42]/35"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f8f6] border border-[#e5e9e7] mb-6">
                <Mail className="h-7 w-7 text-[#10251b]" />
              </div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-3">Email Us</h2>
              <p className="text-[#2b362f] leading-relaxed mb-6">
                Prefer email? Tell us about your company, what you sell, and your growth goals. We will respond within 24 hours.
              </p>
              <div className="text-sm text-[#10251b] mb-6 font-semibold">
                jarred@referlabs.com.au
              </div>
              <div className="inline-flex items-center gap-2 text-[#0a7c42] font-semibold group-hover:text-[#086b39] transition-colors">
                Send email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Email Us */}
          <a
            href="mailto:jarred@referlabs.com.au"
            className="group relative overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white p-8 shadow-sm transition-all hover:border-[#0a7c42]/35"
            data-lift="true"
          >
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f8f6] border border-[#e5e9e7] mb-6">
                <Mail className="h-7 w-7 text-[#10251b]" />
              </div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-3">Email Us</h2>
              <p className="text-[#2b362f] leading-relaxed mb-6">
                Email is the fastest way to reach us. Send through your details and we will get back to you, usually within one business day.
              </p>
              <div className="text-sm text-[#10251b] mb-6 font-semibold">
                jarred@referlabs.com.au
              </div>
              <div className="inline-flex items-center gap-2 text-[#0a7c42] font-semibold group-hover:text-[#086b39] transition-colors">
                Send an email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </section>

        {/* What to Include */}
        <section className="max-w-4xl mx-auto mb-16" aria-labelledby="what-to-include">
          <div className="text-center mb-10">
            <h2 id="what-to-include" className="text-2xl sm:text-3xl font-bold text-[#10251b] mb-3">What to Tell Us</h2>
            <p className="text-[#2b362f]">Include these details so we can prepare a relevant recommendation.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Your name and company",
              "Your website",
              "Where you are based",
              "What you sell",
              "Your growth goal",
              "Your timeline",
            ].map((item) => (
              <div key={item} className="text-center p-5 rounded-2xl border border-[#e5e9e7] bg-white shadow-xs">
                <p className="text-sm text-[#10251b] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="max-w-4xl mx-auto" aria-labelledby="what-to-expect">
          <div className="text-center mb-10">
            <h2 id="what-to-expect" className="text-2xl sm:text-3xl font-bold text-[#10251b] mb-3">What Happens Next</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Discovery Call", copy: "We learn about your product, market, and growth goals" },
              { title: "Engagement Plan", copy: "We recommend the right services, channel approach, and engagement scope" },
              { title: "Kick Off", copy: "If it is a fit, we finalise commercial terms and begin building your distribution system" },
            ].map((item, idx) => (
              <div key={item.title} className="text-center p-6 rounded-2xl border border-[#e5e9e7] bg-white shadow-xs">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5ee] border border-[#cfe6da] mb-4">
                  <span className="text-xl font-bold text-[#0a7c42]">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#10251b] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2b362f]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </ConsumerShell>
  );
}
