import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.productDistribution);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function ProductDistributionPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,167,181,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.05),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-[#0AA7B5]/60 hover:text-[#0AA7B5] transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Services
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            Co-Found a Business Built to{" "}
            <span className="text-[#22C0CD]">Grow Through Distribution</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We co-found businesses where affiliates and strategic partners are the primary growth channel, designed in from the start, not added after launch. Multiple successful ventures built this way. If you have the idea but need the GTM, we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Co-founding model", "Affiliates & partners as the growth channel", "Multiple successful launches"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Discuss Your Idea
            </a>
            <Link
              href="/partner-with-refer-labs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* The Model */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Distribution Built In From Day One</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most businesses are built first and then the question of how to get customers is addressed after launch. The product is finished. The website is live. And then the founders start thinking about marketing. This sequence is why most products fail, distribution was never part of the design.
              </p>
              <p>
                We co-found businesses where the distribution model is decided before the product is built. The affiliate program, the strategic partner network, and the referral architecture are designed into the business from the beginning, not retrofitted after the fact. The growth channel is a structural feature of the business, not a strategy layered on top of it.
              </p>
              <p>
                We have done this successfully across multiple ventures. The businesses we co-found are built to grow through affiliates and strategic partners as the primary channel, with paid and organic marketing as supplementary. This approach creates compounding distribution, partners who have skin in the game, incentive structures that align with business growth, and a channel that scales without proportional increases in ad spend.
              </p>
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">We Have Done This Before</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                We have co-founded and launched multiple businesses using this model. Each was built with a distribution-first approach, affiliate programs and strategic partner networks as the primary growth channels, with the commercial infrastructure designed from the start to support that growth model.
              </p>
              <p>
                This experience means we know what works and what does not. We understand the mistakes that kill distribution-led businesses before they scale: misaligned incentive structures, partner programs that are launched too late, affiliate offers that do not convert, and GTM strategies that depend on channels the founders have not built relationships in.
              </p>
              <p>
                We bring that knowledge into every co-founding engagement, so the business we build together is structured to grow from day one, not to figure out growth after the product is live.
              </p>
            </div>
          </div>
        </section>

        {/* Have an Idea */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Have an Idea, Need the GTM?</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                If you have a business idea, a product, a service model, or a concept that relies on getting distribution right, but you do not have the GTM execution capability, we want to hear from you.
              </p>
              <p>
                We look for ideas where affiliates and strategic partners are a natural fit for distribution. That means products or services where recommendation carries weight, where there are identifiable partner channels already serving the target customer, and where the economics of affiliate distribution can generate a compelling return for partners.
              </p>
              <p className="text-[#0AA7B5]/70 text-sm font-medium">
                Enquire directly. Tell us the idea, the problem it solves, and where you are stuck on execution. We evaluate every submission and come back with a direct assessment.
              </p>
            </div>
          </div>
        </section>

        {/* How We Co-Found */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How We Co-Found</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Idea Assessment and Fit Evaluation",
                  copy: "We review the concept, the target market, and the natural distribution fit. We assess whether affiliates and strategic partners can be the primary growth channel and whether the idea has the characteristics that make distribution-led growth viable. We provide a direct, honest assessment of fit.",
                },
                {
                  num: "2",
                  title: "Distribution Architecture Before Build",
                  copy: "We design the full distribution model before the product is built, the affiliate program structure, the strategic partner network, the incentive framework, and the channels we will activate. The product build and the distribution infrastructure are developed in parallel.",
                },
                {
                  num: "3",
                  title: "Build and Launch Together",
                  copy: "We build the product, the partner infrastructure, and the commercial assets together. By launch day, the affiliate program is live, the first strategic partners are onboarded, and there is a distribution network ready to generate traffic from day one.",
                },
                {
                  num: "4",
                  title: "Grow the Distribution Channel",
                  copy: "We manage the ongoing growth of the distribution channel, expanding the affiliate network, adding new strategic partners, optimising incentive structures, and tracking performance by channel. The business grows through distribution, and we grow the distribution.",
                },
              ].map((step) => (
                <div key={step.num} className="grid grid-cols-[40px_1fr] gap-5">
                  <span className="text-3xl font-black text-[#0AA7B5]/30 leading-none select-none">{step.num}</span>
                  <div>
                    <h3 className="text-base font-bold text-[#0AA7B5] mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Who It's For</h2>
            </div>
            <div className="max-w-2xl space-y-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0AA7B5] mb-4">This is for you if</p>
                <ul className="space-y-3">
                  {[
                    "You have a business idea where affiliates and strategic partners are the natural growth channel",
                    "You have the idea and domain knowledge but need an operator to design and execute the GTM strategy",
                    "You want a co-founder who brings distribution expertise, not just capital or general advice",
                    "You understand that distribution-first means the partner program is designed before the product is finished",
                    "You are open to a structured commercial partnership with shared upside, not a service engagement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#0AA7B5]/30 pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30 mb-2">Not the right fit</p>
                <p className="text-white/40 text-sm italic">Ideas without a viable distribution-led model, complex software requiring significant technical co-founding, or businesses where affiliate and strategic partner channels are not a natural fit for customer acquisition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Have an Idea?{" "}
            <span className="text-[#22C0CD]">Let&apos;s Build the GTM Together.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Book a call to share the idea or submit an application. We will tell you directly whether it is a fit and what a co-founding engagement would look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Discuss Your Idea
            </a>
            <Link
              href="/partner-with-refer-labs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
