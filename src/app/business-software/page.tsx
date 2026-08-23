import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import SoftwareFinder, { type FinderGoal, type FinderProvider } from "@/components/consumer/SoftwareFinder";
import { CATALOG } from "@/lib/catalog/catalog";

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
  { href: "/compare/website-builders", label: "Websites & landing pages", desc: "One-page sites, AI-built business sites, and landing pages that convert." },
  { href: "/compare/newsletter-platforms", label: "Newsletters & email", desc: "Grow and monetise an email list without a revenue cut." },
  { href: "/compare/ai-sales-tools", label: "Sales & CRM", desc: "Contact data, outreach, AI reps and CRMs, sorted by the job you need done." },
  { href: "/compare/sales-outreach", label: "Sales & outreach", desc: "Find leads and reach them across email, LinkedIn and more." },
  { href: "/compare/hr-payroll", label: "HR & payroll", desc: "Run pay, hiring, training and people admin from one place." },
  { href: "/compare/payments", label: "Payments & bookkeeping", desc: "Get paid across borders, and keep the books straight." },
  { href: "/compare/business-phone", label: "Business phone", desc: "Cloud calling and virtual numbers for sales and support teams." },
  { href: "/compare/ai-tools", label: "AI tools", desc: "AI assistants, voice and branding, sorted by what they do." },
];

const tools = [
  { href: "/pipedrive", label: "Pipedrive", desc: "Visual sales CRM with pipeline and automation." },
  { href: "/nutshell", label: "Nutshell", desc: "Easy sales CRM with email marketing built in." },
  { href: "/capsule", label: "Capsule", desc: "A simple CRM small teams actually keep using." },
  { href: "/activecampaign", label: "ActiveCampaign", desc: "Email marketing with powerful automation and a CRM." },
  { href: "/keap", label: "Keap", desc: "Small-business CRM with sales and marketing automation." },
  { href: "/gohighlevel", label: "GoHighLevel", desc: "All-in-one CRM, marketing automation and funnels." },
  { href: "/employmenthero", label: "Employment Hero", desc: "Australian HR, payroll and employment platform." },
  { href: "/leadpages", label: "Leadpages", desc: "Landing pages and lead capture with A/B testing." },
  // The two business tools with a genuine discount rather than a free trial, and
  // the two that convert. Superfiliate was missing from this hub entirely.
  { href: "/superfiliate", label: "Superfiliate", desc: "Run your own affiliate and creator program. 15% off the monthly SaaS fee." },
  { href: "/unbounce", label: "Unbounce", desc: "Landing pages built to convert. 20% off three months, or 35% off your first year." },
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
  { q: "What should I compare before choosing business software?", a: "Compare the total cost (including per-user pricing and any add-ons), the support model, how easy it is to set up, which tools it integrates with, the free trial or plan, and the cancellation terms. Also check it suits your business size and the way you actually work, rather than picking the longest feature list." },
  { q: "Which business software has the best support?", a: "There is no single answer, because support that suits a solo founder differs from what a 50-person team needs. Compare the support channels offered (email, chat, phone), the hours and whether they cover Australian time zones, and how quickly they respond. A free trial is the best test: send a real question during the trial and see how the reply lands. Onboarding help and a solid help centre matter as much as live support." },
  { q: "Does this software work for Australian businesses?", a: "It depends on the tool. For accounting, payroll and HR, check it handles Australian requirements such as GST, Single Touch Payroll and superannuation. For any tool, check whether pricing is in Australian dollars, whether support covers Australian hours, and where your data is stored. We note Australian fit where it is relevant on each tool's page." },
  { q: "Can I try business software before paying?", a: "Usually yes. Many tools offer a free plan or a free trial, though the length and what is included vary. Use the trial to test the features you actually need and the quality of support, and confirm the cancellation terms before your card is charged." },
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
        <section className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="lg:pt-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Business software</span>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
                Find the right software for your business in a minute
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
                Answer three quick questions and we&apos;ll match you to the tools that fit what you&apos;re actually
                trying to do, with the reasoning, so you skip comparing everything. Independent research, disclosed
                affiliate links, never sold placement.
              </p>
              <ul className="mt-7 grid gap-2.5 text-[15px] font-medium text-[#10251b] sm:grid-cols-2">
                {["Personalised to your goals", "Reasoning on every pick", "Free, no obligation", "Email optional"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                      <ArrowRight className="h-3 w-3 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 hidden lg:block">
                <a href="#browse" className="nw-btn-ghost">Or browse all categories</a>
              </div>
            </div>

            <div id="finder" className="scroll-mt-24">
              <SoftwareFinder goals={GOALS} providers={providerByName} />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          {/* Category directory (SEO + browse) */}
          <section id="browse" className="scroll-mt-24">
            <h2 className="text-2xl font-extrabold text-[#10251b]">Browse every category</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              Prefer to look yourself? Every category we compare, sorted by the job you need done. Researched by people,
              disclosed on every page, never sold to the highest bidder.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hubs.map((h) => (
                <Link key={h.href} href={h.href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">Compare</span>
                    <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[#10251b] group-hover:text-[#0a7c42]">{h.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{h.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular tools */}
          <section className="mt-14 border-t border-[#e5e9e7] pt-12">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
              <div className="lg:pt-1">
                <h2 className="text-xl font-extrabold text-[#10251b]">Popular tools</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#9aa39c]">Independent reviews of the tools people search for most.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tools.map((t) => (
                  <Link key={t.href} href={t.href} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40">
                    <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{t.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14 max-w-3xl border-t border-[#e5e9e7] pt-12">
            <h2 className="text-2xl font-extrabold text-[#10251b]">Common questions</h2>
            <div className="mt-6 divide-y divide-[#eef1ef] border-t border-[#eef1ef]">
              {FAQS.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="font-bold text-[#10251b]">{f.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14 border-t border-[#e5e9e7] pt-10">
            <NewsletterSignup variant="band" source="business-software" />
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              Some pages contain affiliate links, disclosed on the page. We may earn a commission if you buy through them,
              at no extra cost to you, and it never changes a recommendation.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
              Only a handful of these carry a genuine discount rather than a free trial. Those are listed, with the date
              each was checked, on{" "}
              <Link href="/deals" className="font-semibold text-[#0a7c42] hover:underline">the deals page</Link>.
            </p>
          </div>
        </div>
      </main>
    </ConsumerShell>
  );
}
