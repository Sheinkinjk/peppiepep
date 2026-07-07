import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.affiliateDistribution);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Affiliate Program Distribution Service",
  description:
    "Refer Labs distributes affiliate programs into high-intent communities and niche channels using an in-house team. Sector-exclusive representation, source-level attribution, ongoing channel optimisation.",
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
  serviceType: "Affiliate Marketing Distribution",
  audience: { "@type": "BusinessAudience", audienceType: "B2B and B2C businesses with affiliate programs" },
  url: `${SITE_URL}/services/affiliate-distribution`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    { "@type": "ListItem", position: 3, name: "Affiliate Distribution", item: `${SITE_URL}/services/affiliate-distribution` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does affiliate program distribution mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Affiliate program distribution means actively placing your affiliate offer into the communities, forums, newsletters, and channels where your ideal buyers already research and make decisions, rather than simply listing the program and waiting for affiliates to find it. Refer Labs handles the full execution: channel identification, community-native content, contextual placement, and conversion tracking.",
      },
    },
    {
      "@type": "Question",
      name: "How does Refer Labs distribute affiliate programs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We start by mapping your buyer profile and identifying the highest-intent channels, subreddits, industry forums, newsletters, and niche communities where your buyers research purchases. Our in-house team then places your offer contextually in those channels, builds credibility over time, and tracks conversion at the source level. We cut low-performing channels and scale what converts.",
      },
    },
    {
      "@type": "Question",
      name: "What sectors does Refer Labs work with for affiliate distribution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Refer Labs works across SaaS, health and wellness, fintech, AI tools, professional services, and eCommerce. We work with one business per sector, if we are already distributing a competing offer in your category, we will let you know. Applications are reviewed within two business days.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a typical affiliate marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most affiliate agencies recruit affiliates and manage commissions. Refer Labs does not recruit, we distribute. Our in-house team actively places your offer in communities and channels using community-native content. We are not a marketplace or network. We are a distribution team that treats your affiliate program as an active growth channel, not a passive listing.",
      },
    },
    {
      "@type": "Question",
      name: "Is affiliate program distribution available for Australian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Refer Labs is based in Australia and distributes affiliate programs for Australian businesses domestically and internationally. We have existing presence in Australian online communities including Reddit, Facebook Groups, industry forums, and professional networks. We also work with global businesses targeting Australian buyers.",
      },
    },
    {
      "@type": "Question",
      name: "What does sector-exclusive representation mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sector-exclusive means we work with one business per category. If we are distributing an affiliate program for a SaaS product in your space, we do not take on a competing offer. Our distribution team's credibility in each community depends on not promoting two competing products simultaneously. This exclusivity works in your favour, you get our full focus in your sector without a competitor benefiting from the same team.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Affiliate Program Distribution Service, Managed Affiliate Marketing | Refer Labs",
  description:
    "Refer Labs distributes your affiliate offer into high-intent communities and channels with an in-house team. Sector-exclusive representation, source-level attribution, ongoing optimisation.",
  url: `${SITE_URL}/services/affiliate-distribution`,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "affiliate program distribution" },
    { "@type": "Thing", name: "affiliate marketing agency Australia" },
    { "@type": "Thing", name: "managed affiliate program" },
    { "@type": "Thing", name: "outsource affiliate marketing" },
    { "@type": "Thing", name: "affiliate program management service" },
    { "@type": "Thing", name: "community affiliate distribution" },
    { "@type": "Thing", name: "affiliate distribution agency" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  breadcrumb: breadcrumbSchema,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AffiliateDistributionPage() {
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
          <span className="text-[#0AA7B5]/80">Affiliate Distribution</span>
        </nav>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            Our Team Distributes Your Affiliate Program{" "}
            <span className="text-[#22C0CD]">Into the Right Channels</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We place your affiliate offer into high-intent communities, forums, and channels where your buyers already make decisions, using an in-house team, not outsourced affiliates. Sector-exclusive. One business per category. Application required.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Sector-exclusive representation", "In-house distribution team", "Source-level attribution tracking"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/application"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Apply to Work With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* The Model */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How This Works</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most affiliate distribution services hand you a list of channels and leave the execution to you. We do the opposite. Our team takes your affiliate offer and actively distributes it, into niche communities, high-intent forums, industry groups, and digital channels where your buyers already spend time and make decisions.
              </p>
              <p>
                The distinction matters. Anyone can list a Reddit subreddit or an industry forum. Placing content that resonates there, building credibility over time, and converting passive readers into active buyers requires an in-house team that understands the nuances of each channel. That is what we do.
              </p>
              <p>
                We focus entirely on relevant traffic. We are not interested in volume metrics, we are interested in driving buyers who are already in-market, actively searching for, discussing, or comparing options in your category. Every channel we activate is mapped to buyer intent, not audience size.
              </p>
            </div>
          </div>
        </section>

        {/* Exclusivity */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Selective by Design</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                We work with one business per sector. If we are distributing an affiliate program for a SaaS product in your category, we do not take on a competing offer. Our distribution team&apos;s positioning in each community depends on their credibility, and that credibility is undermined the moment we are seen promoting two competing products in the same space.
              </p>
              <p>
                This means our capacity is limited and our onboarding is selective. Businesses apply to work with us. We review the offer, assess the category fit, confirm there is no sector conflict, and accept or decline. If we accept your application, you get our full distribution focus in your space, without a competitor benefiting from the same team and channels.
              </p>
              <p className="text-[#0AA7B5]/70 text-sm font-medium">
                If you are in a sector we are already working in, we will let you know. Applications are reviewed within two business days.
              </p>
            </div>
          </div>
        </section>

        {/* How We Distribute */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How We Distribute</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Offer and Audience Assessment",
                  copy: "We review your affiliate offer structure, commission model, and conversion data. We map the profile of your ideal buyer, what they read, where they ask questions, and how they make purchase decisions. This assessment tells us exactly where to place your offer and how to frame it for each channel.",
                },
                {
                  num: "2",
                  title: "Channel Identification and Scoring",
                  copy: "Our team maps the relevant communities, forums, subreddits, newsletters, groups, and digital channels where your buyer profile is most concentrated. We score each by buyer intent, engagement quality, and distribution fit, not raw audience size.",
                },
                {
                  num: "3",
                  title: "Active Distribution by Our Team",
                  copy: "We place your offer across the target channels, writing community-native content, contributing to relevant discussions, and positioning your affiliate program contextually. We do not spam or broadcast. We build credibility in each space and let the offer land with authority.",
                },
                {
                  num: "4",
                  title: "Track, Optimise, and Scale",
                  copy: "Every placement is tracked with attributed links. We monitor conversion by channel, cut low-performers, and scale what is working. You receive a monthly report showing exactly where your traffic originates, what is converting, and what we are adjusting.",
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
                "Offer and commission structure review",
                "Buyer profile and intent mapping",
                "Channel identification and scoring (Reddit, forums, newsletters, communities)",
                "In-house execution by our distribution team, not outsourced",
                "Community-native content creation and contextual placement",
                "Conversion tracking with source-level attribution",
                "Channel testing and ongoing optimisation",
                "Scale playbook for high-performing channels",
                "Monthly performance reporting",
                "Sector-exclusive representation, no competing offers in your category",
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
                    "You have an affiliate program with a proven offer and competitive commission",
                    "You are not getting enough distribution, the program exists but traffic is inconsistent",
                    "You want in-house team execution, not a list of channels to work yourself",
                    "Your buyers research purchases in online communities before deciding",
                    "You understand we work with one business per sector and want that exclusivity working for you",
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
                <p className="text-white/40 text-sm italic">Businesses without an existing affiliate program or proven conversion, low-margin offers where distribution cannot generate a return, or categories we are already representing.</p>
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
              {[
                {
                  q: "What does affiliate program distribution mean?",
                  a: "Affiliate program distribution means actively placing your offer into communities and channels where your buyers already research and make decisions, rather than listing the program and waiting for affiliates to find it. Refer Labs handles the full execution: channel identification, community-native content, contextual placement, and conversion tracking.",
                },
                {
                  q: "How is this different from a typical affiliate marketing agency?",
                  a: "Most affiliate agencies recruit affiliates and manage commissions. Refer Labs distributes. Our in-house team places your offer in communities using community-native content. We are not a marketplace or network, we are a distribution team that treats your affiliate program as an active growth channel.",
                },
                {
                  q: "What does sector-exclusive representation mean?",
                  a: "We work with one business per sector. If we are distributing an affiliate program in your category, we do not take on a competing offer. This means you get our full distribution focus without a competitor benefiting from the same team and channels.",
                },
                {
                  q: "Is affiliate program distribution available for Australian businesses?",
                  a: "Yes. Refer Labs is based in Australia and distributes affiliate programs for Australian businesses domestically and internationally. We have existing presence in Australian online communities, Reddit, Facebook groups, and professional networks across multiple sectors.",
                },
              ].map(({ q, a }) => (
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
                { href: "/services/referral-programs", label: "Referral Program Launch", desc: "Design, launch, and distribute a referral program end to end" },
                { href: "/services/apac-expansion",    label: "APAC Expansion",          desc: "Partner with us to run and grow your Australian operations" },
                { href: "/referral-blueprint",         label: "Referral Blueprint",       desc: "250+ affiliate programs database + personalised strategy" },
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
            Spots Are Limited.{" "}
            <span className="text-[#22C0CD]">One Per Sector.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Submit an application to be considered. We review every submission and respond within two business days to confirm sector availability and fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/application"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Apply to Work With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Book a Call First
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
