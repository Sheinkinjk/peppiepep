import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.apacExpansion);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Australia Market Entry and APAC Expansion Partnership",
  description:
    "Refer Labs partners with businesses to run and grow Australian operations, bringing local distribution networks, partner relationships, and embedded commercial capability. Synergy-based partnerships only.",
  provider: {
    "@type": "Organization",
    name: "Refer Labs",
    url: SITE_URL,
    contactPoint: { "@type": "ContactPoint", email: "jarred@referlabs.com.au", contactType: "Business Enquiries" },
  },
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "AdministrativeArea", name: "Asia Pacific" },
  ],
  serviceType: "Market Entry and Business Expansion",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "International businesses entering the Australian market",
  },
  url: `${SITE_URL}/services/apac-expansion`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    { "@type": "ListItem", position: 3, name: "APAC Expansion", item: `${SITE_URL}/services/apac-expansion` },
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
                  q: "Why is a local partner important for entering the Australian market?",
                  a: "Australian markets are built on trust and existing relationships. Buyers make decisions based on who introduces them, not who sends the cold email. A local partner with established relationships in your target industry accelerates market entry, reduces the cost of building trust from scratch, and opens distribution channels that would otherwise take years to develop independently.",
                },
                {
                  q: "What is the commercial structure for an APAC expansion partnership?",
                  a: "The structure depends on how deeply embedded we are in the Australian operation. Arrangements include retainer, revenue share, equity, or a hybrid. We define the structure clearly upfront, what we contribute, how we are compensated, and what success looks like for both parties.",
                },
                {
                  q: "What types of businesses do you partner with for Australian market entry?",
                  a: "We partner with SaaS, fintech, health tech, professional services, and distribution-led businesses where genuine synergy exists with our network and capabilities. We assess every partnership individually, if the synergy is not real, we will say so directly.",
                },
                {
                  q: "How quickly can you activate the Australian operation after a partnership is agreed?",
                  a: "Commercial activation, introductions, outreach, and first partner conversations, typically begins within 2-4 weeks of completing the synergy assessment and formalising the partnership structure. The pace depends on the complexity of the go-to-market and the existing relationship density in your specific sector.",
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
  name: "Australia Market Entry Partner, Expand to APAC with Refer Labs",
  description:
    "Refer Labs partners with businesses to run and grow Australian operations, bringing local distribution networks, partner relationships, and embedded commercial capability. Synergy-based partnerships only.",
  url: `${SITE_URL}/services/apac-expansion`,
  inLanguage: "en-AU",
  datePublished: "2026-01-01",
  dateModified: "2026-07-07",
  about: [
    { "@type": "Thing", name: "Australia market entry" },
    { "@type": "Thing", name: "APAC expansion partner" },
    { "@type": "Thing", name: "expand business to Australia" },
    { "@type": "Thing", name: "Australian operations partner" },
    { "@type": "Thing", name: "distribution partner Australia" },
    { "@type": "Thing", name: "enter Australian market" },
    { "@type": "Thing", name: "Australia go to market partner" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: breadcrumbSchema,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApacExpansionPage() {
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
          <span className="text-[#0AA7B5]/80">APAC Expansion</span>
        </nav>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            Your Australia Market Entry Partner:{" "}
            <span className="text-[#22C0CD]">Embedded in the Operation</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We partner with businesses where there is genuine commercial synergy, then embed in the Australian operation, bringing local relationships, distribution networks, and commercial capability to grow it from the inside. Not an advisor. A partner in-market.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["Synergy-based partnerships only", "Embedded in your Australian operation", "Distribution-first market growth"].map((tag) => (
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

        {/* A Partnership, Not a Service */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">A Partnership, Not a Service</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most market entry services give you a contractor who makes calls on your behalf. We do not operate that way. We partner with businesses where our capabilities and their product create genuine commercial synergy, and then embed in the Australian operation, contributing relationships, distribution channels, and strategic input as a genuine partner.
              </p>
              <p>
                Australian markets are built on trust and long-standing relationships. Buyers make decisions based on who introduces them, not who sends the cold email. We bring those relationships, existing connections across distribution channels, partner networks, and industry communities that take years to develop independently. When we partner with a business, those relationships become part of their Australian growth infrastructure.
              </p>
              <p>
                This is a selective model. We evaluate every business for synergy, with our existing network, our team&apos;s domain knowledge, and the businesses we already work with. We take on a small number of Australian expansion partners at any time so we can contribute meaningfully to each one.
              </p>
            </div>
          </div>
        </section>

        {/* What Synergy Looks Like */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What Synergy Looks Like</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>We partner with businesses where at least one of the following is true:</p>
              <ul className="space-y-4">
                {[
                  "Your product or service can be distributed through our existing Australian partner and referral network",
                  "Our team&apos;s domain expertise in distribution, referral growth, or affiliate channels is directly applicable to your Australian go-to-market",
                  "Your business serves a customer base that overlaps with our existing APAC network, creating natural cross-referral opportunities",
                  "Your Australian growth strategy is distribution-led and requires a local partner who can activate those channels rather than just advise on them",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                    <span className="text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
              <p>We do not take on businesses where we cannot genuinely contribute beyond warm introductions. If the fit is not there, we will tell you clearly.</p>
            </div>
          </div>
        </section>

        {/* How the Partnership Works */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">How the Partnership Works</h2>
            </div>
            <div className="space-y-10 max-w-2xl">
              {[
                {
                  num: "1",
                  title: "Synergy Assessment",
                  copy: "We assess the fit between your business and our capabilities, existing network, and Australian presence. We look at your product, target customer, go-to-market approach, and where genuine synergy exists. If the fit is real, we move forward. If it is not, we will explain why and suggest alternatives.",
                },
                {
                  num: "2",
                  title: "Partnership Structure and Terms",
                  copy: "We agree on how we contribute and how we are compensated, retainer, revenue share, equity arrangement, or a hybrid. The structure depends on how deeply embedded we are in the Australian operation and the scale of contribution. We define our role clearly so both parties know what success looks like.",
                },
                {
                  num: "3",
                  title: "Activate the Australian Operation",
                  copy: "We bring our local network to bear, existing partners, distribution channels, referral relationships, and industry contacts in Australia. We handle commercial outreach, partnership sourcing, deal structuring, and the day-to-day commercial activity required to build a functioning Australian presence.",
                },
                {
                  num: "4",
                  title: "Grow and Optimise Together",
                  copy: "We continue contributing as the operation grows, expanding the partner network, refining the distribution approach, and adapting the local strategy as traction builds. We report on pipeline, partner performance, and commercial outcomes, and adjust the engagement as the Australian operation matures.",
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

        {/* What We Bring */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What We Bring</h2>
            </div>
            <ul className="space-y-3 max-w-2xl">
              {[
                "Existing Australian partner and referral network across distribution channels",
                "Operational capability to run commercial activity in-market on your behalf",
                "Local industry relationships and introductions that take years to develop independently",
                "Distribution expertise, referral programs, affiliate networks, and partner activation",
                "Commercial deal structuring and partnership agreement frameworks",
                "Compliance and contract localisation (GST, local entity considerations)",
                "Ongoing pipeline management, partner coordination, and performance reporting",
                "Strategic input on Australian market positioning and go-to-market adaptation",
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
                    "You have proven product-market fit and are ready to build an Australian presence",
                    "You want a genuine operational partner embedded in your Australian growth, not a contractor on a task list",
                    "Your product can be distributed through existing APAC networks with natural synergy with our capabilities",
                    "You are building a distribution-first Australian go-to-market and need local relationships to activate it",
                    "You are open to a structured commercial partnership, not just a retainer-for-hours arrangement",
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
                <p className="text-white/40 text-sm italic">Pre-revenue businesses without product-market fit, businesses where genuine synergy with our network does not exist, or companies seeking a hands-off advisory arrangement without a real commercial partnership structure.</p>
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
                { href: "/services/referral-programs",     label: "Referral Programs",      desc: "Design, launch, and distribute a referral program end to end" },
                { href: "/services/affiliate-distribution", label: "Affiliate Distribution", desc: "In-house team distribution of your affiliate program" },
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
            Grow Australia{" "}
            <span className="text-[#22C0CD]">With a Partner Inside the Operation.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Book a 15-minute call or apply directly. We will assess the synergy, explain our model, and be direct about whether it is the right fit.
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
