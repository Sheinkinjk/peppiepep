import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.referralPrograms);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Referral Program Design, Launch and Distribution",
  description:
    "Refer Labs designs, launches, and actively distributes referral programs for B2B and B2C businesses. Incentive structure design, tracking setup, channel activation, referrer seeding, and compounding growth, fully managed.",
  provider: {
    "@type": "Organization",
    name: "Refer Labs",
    url: SITE_URL,
    contactPoint: { "@type": "ContactPoint", email: "jarred@referlabs.com.au", contactType: "Business Enquiries" },
  },
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "AdministrativeArea", name: "Global" },
  ],
  serviceType: "Referral Program Management",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "eCommerce, SaaS, subscription, professional services, and B2B businesses",
  },
  url: `${SITE_URL}/services/referral-programs`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    { "@type": "ListItem", position: 3, name: "Referral Programs", item: `${SITE_URL}/services/referral-programs` },
  ],
};

/**
 * One array, rendered below AND used to build the FAQPage JSON-LD.
 *
 * Until 28 Aug 2026 the schema held a separate hand-written list whose questions
 * did not all appear on the page. Google's FAQPage guidance requires the
 * marked-up content to be visible on the source page, and a structured-data
 * manual action is site-wide rather than per-page, so this was worth closing
 * even on routes that are not in the sitemap. Deriving one from the other makes
 * divergence impossible. Do not reintroduce a second list.
 */
const FAQS: { q: string; a: string }[] = [
                {
                  q: "What is the difference between a referral program and an affiliate program?",
                  a: "A referral program incentivises existing customers to refer new customers, typically word-of-mouth driven with bilateral rewards. An affiliate program recruits external promoters who earn commissions for driving new customers. Both are distribution channels. Refer Labs designs, launches, and distributes both, with the approach tailored to your business model.",
                },
                {
                  q: "Can you help if we already have a referral program that is not working?",
                  a: "Yes. We work with businesses that have existing but underperforming referral programs. We diagnose the specific failure point, incentive design, distribution gaps, funnel drop-off, or wrong referrer targeting, and rebuild from there. We do not always need to start from scratch.",
                },
                {
                  q: "What platforms do you integrate referral tracking with?",
                  a: "We work with the major referral tracking platforms including ReferralHero, Rewardful, PartnerStack, Tapfiliate, and Impact. We can also configure custom tracking via your CRM, eCommerce platform, or SaaS stack with full attribution from first click to closed revenue.",
                },
                {
                  q: "How long does it take to launch a referral program?",
                  a: "A standard referral program launch from incentive design to go-live takes 3-6 weeks, depending on the complexity of the tracking setup and integration requirements. Distribution activation begins at or shortly after launch.",
                },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Referral Program Design, Launch & Distribution Service | Refer Labs Australia",
  description:
    "Refer Labs designs, launches, and actively distributes referral programs for B2B and B2C businesses in Australia. Incentive design, tracking, channel activation, and compounding growth, end to end.",
  url: `${SITE_URL}/services/referral-programs`,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "referral program launch" },
    { "@type": "Thing", name: "referral program design" },
    { "@type": "Thing", name: "referral marketing agency Australia" },
    { "@type": "Thing", name: "how to launch a referral program" },
    { "@type": "Thing", name: "word of mouth marketing strategy" },
    { "@type": "Thing", name: "referral program consultant" },
    { "@type": "Thing", name: "customer referral program management" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: breadcrumbSchema,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReferralProgramsPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,167,181,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.05),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 text-sm text-[#0AA7B5]/50">
          <Link href="/" className="hover:text-[#0AA7B5] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#0AA7B5] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#0AA7B5]/80">Referral Programs</span>
        </nav>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            Launch, Distribute, and Scale Your{" "}
            <span className="text-[#22C0CD]">Referral Program</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We design the incentive structure, build the infrastructure, activate the distribution channels, and manage ongoing growth until referrals compound on their own. From incentive design to first 100 referrals, we own the execution.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Full program launch and distribution", "Active referrer seeding", "Compounding growth strategy"].map((tag) => (
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
              Partner With Us
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

        {/* Why Most Programs Fail */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Why Most Referral Programs Fail to Scale</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most businesses that launch referral programs see an initial spike and then stagnation. The incentive gets set, a landing page goes live, and then nothing, because launching the structure is not the same as distributing it. The program exists but nobody knows it is there.
              </p>
              <p>
                Scaling a referral program requires active distribution: identifying your highest-value referrers and getting the program in front of them directly, integrating referral prompts at the right points in the customer journey, and building the program into your outreach, follow-up, and partner conversations.
              </p>
              <p>
                We handle the full cycle: incentive design, program launch, distribution strategy, and the ongoing optimisation that turns early traction into a compounding channel. We track what is working, cut what is not, and build toward a state where referrals arrive consistently without constant campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Launch and Scale Plan */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">The Launch and Scale Plan</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Diagnose and Design the Incentive Model",
                  copy: "We audit your existing word-of-mouth, identify your highest-value referral sources, and map the natural sharing moments in your customer journey. We design the incentive structure, what triggers a reward, how it pays out, and what mechanics drive repeat referrals, modelled against your unit economics so the program is profitable from day one.",
                },
                {
                  num: "2",
                  title: "Build and Launch the Infrastructure",
                  copy: "We set up the tracking system, integrate with your CRM, eCommerce platform, or SaaS stack, and configure the partner portal and onboarding flow. Every referral is attributed from first click to closed revenue. We write the launch emails, in-app prompts, and partner communication. We coordinate the go-live so day one is a full activation, not a quiet soft launch.",
                },
                {
                  num: "3",
                  title: "Distribute the Program Actively",
                  copy: "Distribution is where most programs stop and where we start. We build a distribution plan that maps every channel where your referral program should be visible, existing customers, high-value accounts, strategic partners, community channels, and your outbound sequences. We execute the outreach, make the introductions, and seed the program into the right hands.",
                },
                {
                  num: "4",
                  title: "Optimise and Scale to Compound",
                  copy: "Once the program is live and distributed, we monitor conversion at every stage of the referral funnel. We run tests on incentive structures, timing, and messaging. We identify the highest-performing referrer segments and build tiered structures to reward and scale them. The goal is a program that generates referrals consistently, a growth channel that compounds on its own.",
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

        {/* What's Included */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What&apos;s Included</h2>
            </div>
            <ul className="space-y-3 max-w-2xl">
              {[
                "Incentive and commission structure design with unit economics modelling",
                "Tracking system setup and platform integration (CRM, eCommerce, SaaS)",
                "Partner portal configuration and referrer onboarding flow",
                "Program launch communications, emails, in-app prompts, partner outreach",
                "Full launch coordination and go-live execution",
                "Distribution strategy: existing customers, strategic partners, outbound sequences",
                "Active referrer seeding and outreach across target segments",
                "A/B testing on incentive structures, timing, and messaging",
                "Referrer tiering and high-performer segmentation",
                "Monthly performance reporting with funnel attribution",
                "Ongoing optimisation toward channel compounding",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who It's For */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Who It&apos;s For</h2>
            </div>
            <div className="max-w-2xl space-y-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0AA7B5] mb-4">This is for you if</p>
                <ul className="space-y-3">
                  {[
                    "You have an existing customer base but no structured, actively distributed referral program",
                    "You launched a referral program but it stagnated, referrals are not consistently coming in",
                    "You want someone to own the launch, distribution, and ongoing scaling, not just hand you a template",
                    "You run an eCommerce, SaaS, subscription, professional service, or B2B business",
                    "You understand referrals are a channel, not a feature, and want it treated that way",
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
                <p className="text-white/40 text-sm italic">Pre-revenue businesses with no existing customer base, or products where personal recommendation does not influence the buying decision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Common Questions</h2>
            </div>
            <div className="space-y-8 max-w-2xl">
              {FAQS.map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="border-t border-[#0AA7B5]/10 py-12">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">Related</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
              {[
                { href: "/services/affiliate-distribution", label: "Affiliate Distribution",   desc: "Distribute your affiliate program into high-intent communities" },
                { href: "/services/apac-expansion",         label: "APAC Expansion",           desc: "Partner to run and grow your Australian operations" },
                { href: "/affiliate-programs-australia", label: "Affiliate Programs AU", desc: "The programs worth promoting, what they pay, and who each suits" },
              ].map((r) => (
                <Link key={r.href} href={r.href} className="rounded-xl border border-[#0AA7B5]/15 bg-[#0AA7B5]/[0.03] p-4 hover:border-[#0AA7B5]/35 hover:bg-[#0AA7B5]/[0.07] transition-all group">
                  <p className="text-sm font-bold text-white mb-1 group-hover:text-[#22C0CD] transition-colors">{r.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Launch the Program.{" "}
            <span className="text-[#22C0CD]">Distribute It. Scale It.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Book a 15-minute call or submit an application. We will review your current setup and scope an engagement covering launch, distribution, and the path to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Partner With Us
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
