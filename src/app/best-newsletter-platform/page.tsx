import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

export const metadata = generateSEOMetadata(seoConfig.bestNewsletterPlatform);

// ─── Affiliate URLs ───────────────────────────────────────────────────────────

import { BEEHIIV_URL } from "@/lib/affiliate-links";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
/**
 * rel="sponsored" is a statement that a link is paid. It is only true where we
 * actually hold a tracked affiliate URL.
 *
 * Substack and Kit were both marked sponsored while pointing at bare domains
 * with no tracking of any kind, so the marking asserted a commercial
 * relationship that does not exist and the traffic earned nothing. Checked
 * 5 September 2026: Substack runs no affiliate program; Kit does, at
 * kit.com/affiliate, and we are not in it. Until we are, its link is an
 * ordinary editorial one.
 *
 * A tracked URL is an absolute link on a partner network host, never a bare
 * vendor domain, so the test is whether the URL carries anything to attribute.
 */
const isTracked = (url: string) => /[?&]|partnerlinks|cfjump|\/go\/|utm_|ref=/.test(url);

const aff = (url: string, loc = "best-newsletter") =>
  isTracked(url)
    ? { href: url, target: "_blank" as const, rel: "nofollow sponsored" as const, "data-cta": loc }
    : { href: url, target: "_blank" as const, rel: "nofollow" as const };

// ─── Facts, read on each vendor's own pricing page ───────────────────────────
// Every figure the page prints comes from here. Re-read the source URLs, change
// the values and READ_ON together. Until 30 Sep 2026 the page said Kit was free
// to 1,000 subscribers from $29/mo and beehiiv was "the most generous free plan";
// Kit had moved to 10,000 and US$33, which reversed that answer.
const READ_ON = "30 September 2026";
const BEEHIIV = { free: "2,500", scale: "US$43", scaleYear: "US$517", source: "beehiiv.com/pricing" };
const KIT = { free: "10,000", creator: "US$33", creatorYear: "US$390", pro: "US$66", fee: "3.5% + 30c", source: "kit.com/pricing" };
const SUBSTACK = { cut: "10%", source: "substack.com/going-paid" };

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best Newsletter Platform 2026", item: `${SITE_URL}/best-newsletter-platform` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Newsletter Platforms 2026",
  description: "In-depth comparison of the best newsletter platforms, beehiiv, Substack, and ConvertKit.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "beehiiv", description: `Newsletter platform built for growth. Free up to ${BEEHIIV.free} subscribers; the ad network and paid subscriptions with a 0% cut come on the Scale plan, ${BEEHIIV.scale}/month billed annually (${BEEHIIV.source}, ${READ_ON}).`, url: `${SITE_URL}/beehiiv` },
    { "@type": "ListItem", position: 2, name: "Substack", description: `The simplest way to start a paid newsletter. No monthly fee; Substack keeps ${SUBSTACK.cut} of paid subscription revenue plus card fees (${SUBSTACK.source}, ${READ_ON}). Strong discovery network.`, url: "https://substack.com" },
    { "@type": "ListItem", position: 3, name: "ConvertKit (Kit)", description: `Email marketing platform with advanced automation and segmentation. Free up to ${KIT.free} subscribers; ${KIT.fee} per sale including card fees (${KIT.source}, ${READ_ON}). Better for complex sequences and funnels.`, url: "https://kit.com" },
  ],
};

// One array feeds both the visible FAQ and the FAQPage JSON-LD, so they cannot drift.
const faqs = [
  {
    q: "What is the best newsletter platform in 2026?",
    a: `For creators focused on growth and monetisation, beehiiv: its paid Scale plan (${BEEHIIV.scale} a month billed annually) takes 0% of paid subscriptions and adds an ad network and referral tools. Kit is stronger if you sell products and need automated sequences, and Substack is the simplest free start with the largest discovery network (each read on the vendor's own page, ${READ_ON}).`,
  },
  {
    q: "beehiiv vs Substack, which is better?",
    a: `For creators who want to grow fast and keep their subscription revenue, beehiiv: it takes 0% of paid subscriptions on Scale, where Substack keeps ${SUBSTACK.cut}. Substack costs nothing monthly at any list size and has a built-in discovery network, so it is the easier start, but on a large paid list the ${SUBSTACK.cut} costs more than beehiiv's plan fee.`,
  },
  {
    q: "Kit vs Substack: which should I use?",
    a: `Substack if you want to publish free today and let its network find readers; Kit if you sell products or need automated email sequences. Substack keeps ${SUBSTACK.cut} of paid subscriptions plus card fees; Kit charges ${KIT.fee} per sale with card processing included, so on a US$10 subscription Substack keeps US$1 before card fees and Kit takes US$0.65 in total. Kit is free to ${KIT.free} subscribers (${KIT.source} and ${SUBSTACK.source}, ${READ_ON}).`,
  },
  {
    q: "beehiiv vs ConvertKit, what is the difference?",
    a: "ConvertKit (now Kit) is a full email marketing platform with advanced automation, tagging and segmentation built for complex sequences and sales funnels. beehiiv is newsletter-first, with growth tools like a referral program and an ad network on its paid plan. For newsletter publishing and audience growth, beehiiv fits better; for automation around a product funnel, Kit is stronger.",
  },
  {
    q: "Which newsletter platform has the best free plan?",
    a: `It depends on what you need free. Kit's free plan goes to ${KIT.free} subscribers, four times beehiiv's, with forms, broadcasts and paid subscriptions, but unlimited automations and sequences need the Creator plan (${KIT.creator} a month billed yearly). beehiiv's free plan stops at ${BEEHIIV.free} subscribers and includes a custom domain and website; its ad network and paid subscriptions need Scale. Substack has no subscriber cap and no monthly fee, and keeps ${SUBSTACK.cut} of paid revenue instead (each read on the vendor's own page, ${READ_ON}).`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-05",
  dateModified: "2026-07-06",
  name: seoConfig.bestNewsletterPlatform.title,
  description: seoConfig.bestNewsletterPlatform.description,
  url: `${SITE_URL}/best-newsletter-platform`,
  breadcrumb: breadcrumbSchema,
  mainEntity: faqSchema,
};

// ─── Comparison data ──────────────────────────────────────────────────────────

const CYAN    = "#007a95";
const CYAN_LT = "#007a95";

const platforms = [
  {
    name: "beehiiv",
    badge: "Best for Growth",
    badgeColor: CYAN_LT,
    href: BEEHIIV_URL,
    internalHref: "/beehiiv",
    tagline: "The newsletter platform built for growth",
    free: `Free up to ${BEEHIIV.free} subs`,
    paid: `Scale ${BEEHIIV.scale}/mo billed annually (${READ_ON})`,
    revenueShare: "0% on paid subscriptions (Scale plan)",
    pros: [
      "Built-in referral program for subscriber growth",
      "Native ad network on the paid Scale plan",
      "No revenue cut on paid subscriptions",
      "14-day trial of all paid features, no credit card",
      "Best-in-class analytics and growth tracking",
      "Newsletter recommendations across the beehiiv network",
      "Custom domains on free plan",
    ],
    cons: [
      "Smaller discovery network than Substack",
      "Paid plans required for advanced features",
    ],
  },
  {
    name: "Substack",
    badge: "Best for Discovery",
    badgeColor: "#007a95",
    href: "https://substack.com",
    internalHref: null,
    tagline: "Simplest path to a paid newsletter",
    free: "Free, no subscriber cap",
    paid: "No monthly fee",
    revenueShare: `${SUBSTACK.cut} of paid subscriptions, plus card fees (${READ_ON})`,
    pros: [
      "Largest built-in discovery and recommendation network",
      "Extremely simple setup, live in minutes",
      "No monthly fee, only pay when you earn",
      "Strong brand trust with readers",
    ],
    cons: [
      "10% revenue cut on paid subscriptions adds up at scale",
      "Limited growth and automation tools compared to beehiiv",
      "No native ad network",
      "Less control over design and branding",
    ],
  },
  {
    name: "ConvertKit (Kit)",
    badge: "Best for Automation",
    badgeColor: "#007a95",
    href: "https://kit.com",
    internalHref: null,
    tagline: "Advanced email marketing for product businesses",
    free: `Free up to ${KIT.free} subscribers`,
    paid: `Creator ${KIT.creator}/mo billed yearly (${READ_ON})`,
    revenueShare: `${KIT.fee} per sale, card fees included`,
    pros: [
      "Powerful automation sequences and tagging",
      "Strong segmentation for complex email funnels",
      "Integrates well with digital product sales",
      "Established platform with large creator community",
    ],
    cons: [
      "Not newsletter-first, reader experience is basic",
      "No ad network; the newsletter referral system needs the Pro plan",
      "More complex than needed for newsletter-only creators",
      "Unlimited automations and sequences need a paid plan",
    ],
  },
];

const features = [
  { label: `Free plan (${READ_ON})`, beehiiv: `Up to ${BEEHIIV.free} subs`, substack: "Unlimited", convertkit: `Up to ${KIT.free} subs` },
  { label: "Cut of paid subscriptions", beehiiv: "0% (Scale plan)", substack: `${SUBSTACK.cut} plus card fees`, convertkit: `${KIT.fee}, card fees included` },
  { label: "Referral program",  beehiiv: "Built in",            substack: "No",                convertkit: "Pro plan" },
  { label: "Ad network",        beehiiv: "Yes, native",        substack: "No",                convertkit: "No" },
  { label: "Paid subscriptions",beehiiv: "Scale plan, 0% cut", substack: "Yes, 10% cut",     convertkit: "Yes, every plan" },
  { label: "Discovery network", beehiiv: "Growing",             substack: "Large",             convertkit: "Limited" },
  { label: "Automation",        beehiiv: "Basic",               substack: "Minimal",           convertkit: "Advanced" },
  { label: "Analytics",         beehiiv: "Best in class",       substack: "Basic",             convertkit: "Good" },
  { label: "Free trial",        beehiiv: "14 days (paid features)", substack: "N/A",           convertkit: "14 days" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestNewsletterPlatformPage() {
  return (
    <ConsumerShell>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#14120f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#14120f]">Best Newsletter Platform 2026</span>
        <SectionMark kind="envelope" size={56} /></nav>


        {/* Hero */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <p className="nw-kicker mb-4">Comparison guide</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.07] text-[#14120f] mb-5 tracking-tight">
            Best Newsletter Platform 2026:{" "}
            <span>beehiiv vs Substack vs ConvertKit</span>
          </h1>
          <p className="text-[#56504a] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            The three differ most on what they take from paid subscriptions: Substack keeps {SUBSTACK.cut}, Kit
            charges {KIT.fee} per sale including card fees, and beehiiv takes 0% on its paid Scale plan
            ({BEEHIIV.scale} a month billed annually). Kit&apos;s free plan goes to {KIT.free} subscribers, four times
            beehiiv&apos;s {BEEHIIV.free}; beehiiv has the stronger growth tools once you pay. Each figure was read
            on the vendor&apos;s own pricing page on {READ_ON}.
          </p>
          {/* Below the lead. The first paragraph after the h1 is the answer;
              a disclosure in that slot is what an engine lifts instead. Still
              above the first affiliate link, which is what it is for. */}
          <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
          <a
            {...aff(BEEHIIV_URL)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Try beehiiv Free, 14-Day Trial
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Our Pick */}
        <section id="comparison" className="border-t border-[#007a95]/10 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-[#14120f] mb-3">Our Pick: beehiiv</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            For newsletter creators focused on growing an audience and monetising without giving up revenue, beehiiv is the strongest platform available in 2026. The built-in referral program, ad network, and 0% revenue share on paid subscriptions put it well ahead of alternatives once you are past the earliest stage.
          </p>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Substack is a legitimate starting point for its discovery network and zero monthly fee, but the 10% revenue cut becomes a real cost at scale. ConvertKit is better for product businesses with complex email sequences than for newsletter-first creators.
          </p>
          <a
            {...aff(BEEHIIV_URL)}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
          >
            Start beehiiv Free
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* Kit vs Substack. "convertkit vs substack" is this page's top query (GSC,
            90 days to 29 Sep 2026) and nothing on the page answered it. We earn on
            neither brand, so this section has no affiliate link. */}
        <section id="kit-vs-substack" className="border-t border-[#007a95]/10 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-[#14120f] mb-3">Kit vs Substack: which should you use?</h2>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
            Substack if you want to publish free today and let its network find readers. Kit if you sell products,
            courses or services and need automated email sequences around them.
          </p>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
            On a paid newsletter the fee structure differs. Substack keeps {SUBSTACK.cut} of paid subscription
            revenue, and card fees come on top ({SUBSTACK.source}). Kit charges {KIT.fee} per sale with card
            processing included ({KIT.source}, {READ_ON}). On a US$10 monthly subscription, Substack keeps US$1 before the card
            fee; Kit takes US$0.65 in total.
          </p>
          <p className="text-[#56504a] text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
            Substack charges no monthly fee at any list size. Kit is free up to {KIT.free} subscribers, and paid
            subscriptions work on the free plan; unlimited automations and sequences start on the Creator plan at {KIT.creator} a
            month billed yearly ({KIT.creatorYear} a year) for 1,000 subscribers, and its newsletter referral system
            needs the Pro plan at {KIT.pro} a month billed yearly. All figures read on each vendor&apos;s own page on{" "}
            {READ_ON}. We have no affiliate arrangement with either.
          </p>
        </section>

        {/* Platform Cards */}
        <section className="border-t border-[#007a95]/10 py-12 sm:py-14 space-y-8">
          {platforms.map((p) => (
            <div
              key={p.name}
              id={p.name.toLowerCase().replace(/[^a-z]/g, "")}
              className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-[#14120f]">{p.name}</h3>
                  </div>
                  <p className="text-[#56504a] text-sm">{p.tagline}</p>
                </div>
                {p.internalHref ? (
                  <Link
                    href={p.internalHref}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#14120f] transition-all hover:opacity-90"
                    style={{ background: CYAN }}
                  >
                    Try {p.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ) : (
                  <a
                    {...aff(p.href)}
                    className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold text-[#14120f] transition-all hover:text-[#14120f]"
                    style={{ borderColor: `${CYAN}30` }}
                  >
                    Visit {p.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="rounded-xl bg-[#f7f4ee] border border-[#ded8cd] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#56504a] mb-1">Free Plan</p>
                  <p className="text-[#14120f] font-medium">{p.free}</p>
                </div>
                <div className="rounded-xl bg-[#f7f4ee] border border-[#ded8cd] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#56504a] mb-1">Paid From</p>
                  <p className="text-[#14120f] font-medium">{p.paid}</p>
                </div>
                <div className="rounded-xl bg-[#f7f4ee] border border-[#ded8cd] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#56504a] mb-1">Revenue Share</p>
                  <p className="text-[#14120f] font-medium">{p.revenueShare}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: CYAN_LT }}>Pros</p>
                  <ul className="space-y-2">
                    {p.pros.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#14120f]">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400/70 mb-3">Cons</p>
                  <ul className="space-y-2">
                    {p.cons.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#14120f]">
                        <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Table */}
        <section id="feature-table" className="border-t border-[#007a95]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-8">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#56504a]">Feature</th>
                  {["beehiiv", "Substack", "ConvertKit"].map((col) => (
                    <th key={col} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: col === "beehiiv" ? CYAN_LT : "#56504a" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[#f7f4ee]" : ""}>
                    <td className="py-3 pr-4 text-[#56504a] font-medium">{row.label}</td>
                    <td className="py-3 pr-4 text-[#14120f] font-medium">{row.beehiiv}</td>
                    <td className="py-3 pr-4 text-[#56504a]">{row.substack}</td>
                    <td className="py-3 pr-4 text-[#56504a]">{row.convertkit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <MatchPrompt
          href="/newsletter-platform-quiz"
          title="Not sure which platform to pick?"
          sub="Answer one quick question and get the newsletter platform that fits your goal, and why."
          cta="Take the 20-second match"
          dataCta="newsletter-match-prompt"
        />

        {/* FAQ */}
        <section id="faq" className="border-t border-[#007a95]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="border-b border-[#ded8cd] pb-6">
                <h3 className="text-sm font-bold text-[#14120f] mb-2">{q}</h3>
                <p className="text-sm text-[#56504a] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#007a95]/10 pt-14 sm:pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#14120f] mb-3">
            Ready to Start Your Newsletter?{" "}
            <span style={{ color: CYAN_LT }}>Try beehiiv Free.</span>
          </h2>
          <p className="text-[#56504a] text-sm max-w-md mx-auto mb-7 leading-relaxed">
            Free up to {BEEHIIV.free} subscribers. 14-day trial of paid features. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              {...aff(BEEHIIV_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Try beehiiv Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/beehiiv"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold text-[#14120f] transition-all hover:text-[#14120f]"
              style={{ borderColor: `${CYAN}30` }}
            >
              Full beehiiv Review
            </Link>
          </div>

          {/* Related guides */}
          <div className="mt-14 text-left max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#56504a] mb-5">Related Guides</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/best-website-builder", label: "Best Website Builder 2026" },
                { href: "/beehiiv", label: "beehiiv Discount & Review" },
                { href: "/best-weight-loss-telehealth-australia", label: "Best Weight Loss Telehealth Australia" },
                { href: "/guides", label: "All Comparison Guides" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm text-[#56504a] hover:text-[#14120f] transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: CYAN }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate disclosure. Legally required (ACL), and this page compares a
            brand we earn on against two we do not, so the asymmetry is stated. */}
        <section className="mx-auto max-w-5xl border-t border-[#ded8cd] px-5 py-8 pb-16 sm:px-8">
          <p className="max-w-2xl text-xs leading-relaxed text-[#56504a]">
            This page is operated by Refer Labs and contains an affiliate referral link to beehiiv. If you sign up
            through it we may earn a commission, at no extra cost to you. We do not have an affiliate arrangement with
            Substack or Kit, so we earn nothing if you choose either of them, and that has not changed what we say
            about any of the three. Rankings are never sold. Comparisons are based on publicly available information at
            time of publication and may change.
          </p>
        </section>

      </main>
      <StickyCta href={BEEHIIV_URL} product="beehiiv · newsletter platform" label="Try free" />
    </ConsumerShell>
  );
}
