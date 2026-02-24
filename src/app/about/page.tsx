import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.about);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.07),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Hero */}
        <div className="mb-20 sm:mb-24 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] text-white mb-7 tracking-tight">
            We Are a Growth & Distribution Engine.
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            Refer Labs builds and activates distribution systems for operators, brands, and businesses that understand growth is not a channel strategy. It is a structural advantage.
          </p>
        </div>

        {/* What We Do */}
        <section className="border-t border-white/[0.07] py-14 sm:py-16 mb-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-5 leading-tight">
                What Refer Labs Does
              </h2>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-5">
                We build and activate scalable distribution systems across five core growth engines: referral program design, affiliate distribution, influencer and network activation, APAC market expansion, and product creation with end-to-end distribution.
              </p>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed">
                Every engagement is structured, commercial, and built to compound. We do not run one-off campaigns. We build systems that continue generating leverage after we have done our work.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "We design systems, not campaigns",
                "We work with operators ready to scale distribution",
                "We operate across referral, affiliate, influencer, APAC, and product channels",
                "We align incentives with client outcomes",
                "We own selected products internally and are open to collaboration",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t border-white/[0.07] py-14 sm:py-16 mb-4">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-white">Our Approach</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most growth problems are distribution problems. Companies with strong products fail to scale because they lack the systems to get those products in front of the right people, through the right channels, at the right time.
              </p>
              <p>
                We built Refer Labs to solve that. We identify where the leverage is, structure the distribution engine, activate the channels, and optimise until the system compounds.
              </p>
              <p>
                Whether that means designing a referral program, distributing an affiliate offer, activating an influencer network, entering APAC, or building and distributing a digital product, the underlying logic is the same: distribution is leverage.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-white/[0.07] py-14 sm:py-16 mb-4">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-white">What We Stand For</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl">
              {[
                { label: "Execution over theory", desc: "We build and activate. Strategy without execution is noise." },
                { label: "Aligned incentives", desc: "We structure engagements so our success is tied to yours." },
                { label: "Clarity over complexity", desc: "Simple systems compound. Complicated ones collapse." },
              ].map((v) => (
                <div key={v.label}>
                  <p className="text-white font-semibold text-sm mb-2">{v.label}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-white/[0.07] pt-14 sm:pt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">
                Ready to talk distribution?
              </h2>
              <p className="text-white/45 text-sm">
                jarred@referlabs.com.au
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
              >
                Partner With Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-white/[0.07] hover:text-white"
              >
                Send a Message
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
