import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid } from "@/components/brand/GuideGrid";
import { LogoGrid } from "@/components/brand/LogoGrid";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
import SoftwareFinder, { type FinderGoal, type FinderProvider } from "@/components/consumer/SoftwareFinder";
import { CATALOG } from "@/lib/catalog/catalog";
import { DEALS, formatVerifiedFull, checkMethod } from "@/lib/offers";
import { SUPERFILIATE_URL, UNBOUNCE_URL } from "@/lib/affiliate-links";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";

export const metadata = generateSEOMetadata(seoConfig.businessSoftware);

const URL = `${SITE_URL}/business-software`;

// ── Build the recommender data from the real catalog (single source of truth) ──
// Flatten every provider to a slim, client-safe record keyed by name. Links prefer
// our internal review page (keeps people on-site, which carries the affiliate CTA);
// fall back to the tracked affiliate/external URL.
const providerByName: Record<string, FinderProvider> = {};
for (const v of CATALOG) {
  for (const p of v.providers) {
    if (providerByName[p.name]) continue;
    const internal = p.reviewHref;
    const external = p.affiliateUrl || p.externalUrl;
    providerByName[p.name] = {
      name: p.name,
      bestFor: p.bestFor,
      blurb: p.blurb,
      href: internal || external || `/compare/${v.slug}`,
      external: !internal && !!external,
      cta: internal ? `Read our ${p.name} review` : (p.ctaLabel || `See ${p.name}`),
    };
  }
}

// Curated goal -> shortlist mapping. Provider names match the catalog exactly.
// Each priority tier is ranked best-first for that intent.
const GOALS: FinderGoal[] = [
  { id: "website", label: "A website for my business", hub: "/compare/website-builders",
    cheap: ["Carrd"], value: ["Durable AI", "Carrd"], powerful: ["Durable AI", "Butternut AI"] },
  { id: "landing", label: "Landing pages that capture leads", hub: "/compare/website-builders",
    cheap: ["Swipe Pages"], value: ["Leadpages"], powerful: ["Leadpages", "Landingi"] },
  { id: "newsletter", label: "Grow an email list or newsletter", hub: "/compare/newsletter-platforms",
    cheap: ["beehiiv"], value: ["beehiiv"], powerful: ["beehiiv"] },
  { id: "crm", label: "A CRM for my sales pipeline", hub: "/compare/ai-sales-tools",
    cheap: ["Capsule"], value: ["Pipedrive", "Nutshell"], powerful: ["ActiveCampaign", "Keap"] },
  { id: "leads", label: "More leads and outbound prospecting", hub: "/compare/sales-outreach",
    cheap: ["Snov.io"], value: ["Reply.io"], powerful: ["AiSDR", "GoHighLevel"] },
  { id: "hr", label: "HR, payroll and onboarding", hub: "/compare/hr-payroll",
    cheap: ["Trainual"], value: ["Employment Hero"], powerful: ["Employment Hero"] },
  { id: "payments", label: "Get paid / international payments", hub: "/compare/payments",
    cheap: ["Payoneer"], value: ["Payoneer"], powerful: ["Payoneer"] },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: URL },
  ],
};

const hubs = [
  { object: "browser" as ObjectKind, href: "/compare/website-builders", label: "Websites & landing pages", desc: "One-page sites, AI-built business sites, and landing pages that convert." },
  { object: "envelope" as ObjectKind, href: "/compare/newsletter-platforms", label: "Newsletters & email", desc: "Grow and monetise an email list without a revenue cut." },
  { object: "funnel" as ObjectKind, href: "/compare/ai-sales-tools", label: "Sales & CRM", desc: "Contact data, outreach, AI reps and CRMs, sorted by the job you need done." },
  { object: "send" as ObjectKind, href: "/compare/sales-outreach", label: "Sales & outreach", desc: "Find leads and reach them across email, LinkedIn and more." },
  { object: "badge" as ObjectKind, href: "/compare/hr-payroll", label: "HR & payroll", desc: "Run pay, hiring, training and people admin from one place." },
  { object: "card" as ObjectKind, href: "/compare/payments", label: "Payments & bookkeeping", desc: "Get paid across borders, and keep the books straight." },
  { object: "phone" as ObjectKind, href: "/compare/business-phone", label: "Business phone", desc: "Cloud calling and virtual numbers for sales and support teams." },
  { object: "chip" as ObjectKind, href: "/compare/ai-tools", label: "AI tools", desc: "AI assistants, voice and branding, sorted by what they do." },
  { object: "checklist" as ObjectKind, href: "/compare/lead-generation", label: "Popups, quizzes & lead capture", desc: "On-site popups, interactive quizzes and graded assessments that turn visitors into leads." },
];

/**
 * The business tools where we hold a real monetary discount rather than a
 * free trial anyone can start direct from the vendor.
 *
 * Ordered deliberately, not alphabetically: Superfiliate first because it is the
 * only one that discounts a recurring fee rather than a first term.
 *
 * Leadpages left this block on 30 Sep 2026 (Jarred, D-1): its 20% is Leadpages'
 * own public annual-billing saving, not a discount our link grants. It is listed
 * with the other tools below.
 * Terms, dates and hrefs come from the DEALS registry, so this block cannot drift
 * from /deals or from the brand page it links to.
 *
 * Why this block exists at all: measured 3 Sep 2026, the three pages holding a
 * real discount were the least-linked in the cluster (Unbounce 3 inbound,
 * Superfiliate 6, Leadpages 9) and sat last in "Popular tools" beneath eight
 * tools offering nothing but a trial.
 */
const OFFER_BRANDS = ["Superfiliate", "Unbounce"] as const;
const COUNT_WORDS = ["No", "One", "Two", "Three", "Four", "Five"];
// Direct links for the offer buttons. The offers exist through these links, so the
// button goes straight there; the review page is the secondary link.
const OFFER_URLS: Record<(typeof OFFER_BRANDS)[number], string> = { Superfiliate: SUPERFILIATE_URL, Unbounce: UNBOUNCE_URL };
const featuredOffers = OFFER_BRANDS
  .map((brand) => DEALS.find((d) => d.brand === brand))
  .filter((d): d is NonNullable<typeof d> => Boolean(d));

// The cluster's own in-depth guides. None of these was linked from this hub
// before 3 Sep 2026, including /best-newsletter-platform, which is the
// best-ranking page in the cluster.
const guides = [
  { href: "/best-newsletter-platform", label: "beehiiv vs Substack vs ConvertKit", desc: "Free plans, revenue cuts, and where pricing jumps as a list grows." },
  { href: "/best-crm-small-business-australia", label: "Best CRM for small business", desc: "Pipedrive, Capsule, Nutshell and Keap on real monthly pricing." },
  { href: "/best-website-builder", label: "Best website builder", desc: "One-page, AI-generated and full builders, compared on what they cost." },
  { href: "/best-ai-sales-tools", label: "Best AI sales tools", desc: "GoHighLevel, AiSDR, Reply.io and FullEnrich, by the bottleneck each solves." },
];

const tools = [
  { href: "/databox", tag: "Free plan", label: "Databox", desc: "KPI dashboards over the tools you already use." },
  { href: "/pipedrive", tag: "14-day free trial", label: "Pipedrive", desc: "Visual sales CRM with pipeline and automation." },
  { href: "/nutshell", tag: "14-day free trial", label: "Nutshell", desc: "Easy sales CRM with email marketing built in." },
  { href: "/capsule", tag: "Free plan", label: "Capsule", desc: "A simple CRM small teams keep using." },
  { href: "/activecampaign", tag: "14-day free trial", label: "ActiveCampaign", desc: "Email marketing with powerful automation and a CRM." },
  { href: "/keap", tag: "Free demo", label: "Keap", desc: "Small-business CRM with sales and marketing automation." },
  { href: "/gohighlevel", tag: "14-day free trial", label: "GoHighLevel", desc: "All-in-one CRM, marketing automation and funnels." },
  { href: "/employmenthero", tag: "Free demo", label: "Employment Hero", desc: "Australian HR, payroll and employment platform." },
  { href: "/leadpages", tag: "7-day free trial", label: "Leadpages", desc: "Landing pages with A/B testing and lead capture." },
  { href: "/pandadoc", tag: "Free eSign plan", label: "PandaDoc", desc: "Proposals, quotes and contracts with built-in e-signature." },
  { href: "/blinq", tag: "Free plan", label: "Blinq", desc: "Digital business cards shared by QR, link or NFC; the free plan covers two cards." },
  // `tag` is each vendor's own public offer, as on its brand page (1 Oct 2026).
  // Superfiliate and Unbounce are not listed here: they carry a real discount and
  // are featured in the offers block above instead, so the link is not split
  // across two places on one page.
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Business software categories",
  itemListElement: hubs.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.label, url: `${SITE_URL}${h.href}` })),
};

const FAQS = [
  { q: "How does the software finder work?", a: "You tell us what you're trying to sort out, your business size, and what matters most (cost, value or capability). We match that to the software categories we cover and surface the tools that fit, with the reasoning, so you can go straight to the right shortlist instead of comparing everything." },
  { q: "Is this pay-to-rank?", a: "No. Recommendations are based on your answers and our independent research, not on who pays. Some links are disclosed affiliate links: we may earn a commission if you sign up, at no extra cost to you, and it never changes what we recommend or the order tools appear in." },
  { q: "Do I have to give my email?", a: "No. The recommendations show on the page immediately. Entering your email is optional, it just sends you the shortlist and lets us give you a hand narrowing it down if you want." },
  { q: "Which software do you cover?", a: `We compare tools across websites and landing pages, newsletters, sales and CRM, outreach, HR and payroll, and payments. Browse the categories below, or use the finder to get matched. We add categories and tools as we review them.` },
  { q: "What should I compare before choosing business software?", a: "Compare the total cost (including per-user pricing and any add-ons), the support model, how easy it is to set up, which tools it integrates with, the free trial or plan, and the cancellation terms. Also check it suits your business size and the way you work, rather than picking the longest feature list." },
  { q: "Which business software has the best support?", a: "There is no single answer, because support that suits a solo founder differs from what a 50-person team needs. Compare the support channels offered (email, chat, phone), the hours and whether they cover Australian time zones, and how quickly they respond. A free trial is the best test: send a real question during the trial and see how the reply lands. Onboarding help and a solid help centre matter as much as live support." },
  { q: "Does this software work for Australian businesses?", a: "It depends on the tool. For accounting, payroll and HR, check it handles Australian requirements such as GST, Single Touch Payroll and superannuation. For any tool, check whether pricing is in Australian dollars, whether support covers Australian hours, and where your data is stored. We note Australian fit where it is relevant on each tool's page." },
  { q: "Can I try business software before paying?", a: "Usually yes. Many tools offer a free plan or a free trial, though the length and what is included vary. Use the trial to test the features you need and the quality of support, and confirm the cancellation terms before your card is charged." },
  { q: "How much does business software cost?", a: "Most tools charge a monthly or annual subscription, often per user, with higher tiers adding more features; some are priced by usage. Watch for the jump between plans, paid add-ons, and annual-only discounts. We list real, checked prices on each tool's page where the vendor publishes them." },
  { q: "How do I pick the right tool for my business?", a: "No single tool is best for everyone. The right fit depends on your size, your use case and the software you already run. Use the finder above to get matched to a shortlist, then compare those few on cost, support, integrations and trial before deciding." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function BusinessSoftwarePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* Hero + finder */}
        <section className="border-b border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="lg:pt-4">
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#14120f] sm:text-5xl">
                Find the right software for your business in a minute
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#56504a]">
                Answer three quick questions and we&apos;ll match you to the tools that fit what you&apos;re
                trying to do, with the reasoning, so you skip comparing everything. Independent research, disclosed
                affiliate links, never sold placement.
              </p>
              <ul className="mt-7 grid gap-2.5 text-[15px] font-medium text-[#14120f] sm:grid-cols-2">
                {["Personalised to your goals", "Reasoning on every pick", "Free, no obligation", "Email optional"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
                      <circle cx="11" cy="11" r="11" fill="#e4f2f5" />
                      <path d="M6.5 11.4 L9.6 14.3 L15.6 7.9" fill="none" stroke="#007a95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 hidden lg:block">
                <a href="#browse" className="nw-btn-ghost">Or browse all categories</a>
              </div>
            </div>

            <div id="finder" className="scroll-mt-24">
              <EdgeObject kind="browser" className="br-edge--left"><SoftwareFinder goals={GOALS} providers={providerByName} /></EdgeObject>
            </div>
          </div>
        </section>

        {/* Current offers, directly under the hero (1 Oct 2026). They sat third, below
            the category grid, in small cards linking to our own review pages, so a
            reader had to scroll and click twice to reach the discount. Both offers get
            identical cards, alphabetical, per the hub-neutrality rule. */}
        <section aria-labelledby="offers-h" className="border-b border-[#ded8cd] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="nw-kicker">Through Refer Labs</p>
                <h2 id="offers-h" className="mt-2 text-2xl font-extrabold text-[#14120f] sm:text-3xl">Current software offers</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
                  {COUNT_WORDS[featuredOffers.length] ?? featuredOffers.length} of the tools we cover carry a real discount through our links, not just a
                  free trial anyone can start direct. Each shows when we last checked it.
                </p>
              </div>
              <Link href="/deals" className="nw-link text-sm">Every offer we track</Link>
            </div>
            <AffiliateDisclosure compact className="mt-5 max-w-2xl" />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {featuredOffers.map((d) => (
                <div key={d.brand} className="flex flex-col rounded-2xl border-2 border-[#007a95] bg-white p-6 shadow-[0_14px_36px_-22px_rgba(0,54,71,0.45)]">
                  <div className="flex items-center gap-3">
                    {d.logo && (
                      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#ded8cd] bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={d.logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold text-[#14120f]">{d.brand}</h3>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.01em] text-[#14120f]">{d.offer}</p>
                  {d.verified && (
                    <p className="mt-2 text-[12px] font-medium text-[#56504a]">
                      {checkMethod(d.brand, true)} on {formatVerifiedFull(d.verified)}.
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                    <a
                      href={OFFER_URLS[d.brand as (typeof OFFER_BRANDS)[number]]}
                      target="_blank"
                      rel="nofollow sponsored"
                      data-cta={`business-software-offer-${d.brand.toLowerCase()}`}
                      className="nw-btn justify-center px-6 py-3.5 text-[15px] max-sm:w-full"
                    >
                      Continue to {d.brand} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <Link href={d.href} className="nw-link text-sm">Read our {d.brand} review</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          {/* Category directory (SEO + browse) */}
          <section id="browse" className="scroll-mt-24">
            <h2 className="text-2xl font-extrabold text-[#14120f]">Browse every category</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#56504a]">
              Prefer to look yourself? Every category we compare, sorted by the job you need done. Researched by people,
              disclosed on every page, never sold to the highest bidder.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hubs.map((h) => (
                <Link key={h.href} href={h.href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <HubObject kind={h.object} size={56} className="hy-obj transition-transform duration-300 group-hover:-rotate-6" />
                    <ArrowRight className="h-4 w-4 text-[#007a95] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[#14120f] group-hover:text-[#007a95]">{h.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#56504a]">{h.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* In-depth guides. None of these was reachable from this hub before. */}
          <section className="mt-14 border-t border-[#ded8cd] pt-12">
            <h2 className="text-2xl font-extrabold text-[#14120f]">In-depth comparisons</h2>
            <GuideGrid guides={guides.map((g) => ({ href: g.href, title: g.label, desc: g.desc, kind: "compare" as const }))} />
          </section>

          {/* Popular tools */}
          <section className="mt-14 border-t border-[#ded8cd] pt-12">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
              <div className="lg:pt-1">
                <h2 className="text-xl font-extrabold text-[#14120f]">Popular tools</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#56504a]">Independent reviews of the tools people search for most.</p>
              </div>
              <LogoGrid items={tools.map((t) => ({ ...t, logo: `/logos${t.href}.png` }))} />
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14 max-w-3xl border-t border-[#ded8cd] pt-12">
            <h2 className="text-2xl font-extrabold text-[#14120f]">Common questions</h2>
            <div className="mt-6 divide-y divide-[#f1ede4] border-t border-[#f1ede4]">
              {FAQS.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="font-bold text-[#14120f]">{f.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#56504a]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14 border-t border-[#ded8cd] pt-10">
            <NewsletterSignup variant="band" source="business-software" />
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#56504a]">
              Some pages contain affiliate links, disclosed on the page. We may earn a commission if you buy through them,
              at no extra cost to you, and it never changes a recommendation.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#56504a]">
              Only a handful of these carry a genuine discount rather than a free trial. Those are listed, with the date
              each was checked, on{" "}
              <Link href="/deals" className="font-semibold text-[#007a95] hover:underline">the deals page</Link>.
            </p>
          </div>
        </div>
      </main>
    </ConsumerShell>
  );
}
