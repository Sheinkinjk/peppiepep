import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { PIPEDRIVE_URL, CAPSULE_URL, NUTSHELL_URL, KEAP_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";

export const metadata = generateSEOMetadata(seoConfig.bestCrmSmallBusiness);

const GREEN = "#0a7c42";

// Real "from" pricing taken from each vendor's own pricing page (per user / month,
// billed annually), verified via the individual brand pages. Prices in USD as the
// vendors quote them. Caveated in-copy: always confirm current pricing with the vendor.
const CRMS = [
  {
    name: "Pipedrive",
    href: PIPEDRIVE_URL,
    cta: "pipedrive",
    page: "/pipedrive",
    from: "US$14",
    trial: "14-day free trial, no card",
    suits: "Sales teams that live in the pipeline",
    body: "Pipedrive is built around a visual sales pipeline you drag deals through, which makes it the natural pick for a small team whose main job is chasing and closing deals. It is quick to set up and hard to lose track of a deal in. If you want a CRM that is really a marketing-and-everything suite, it is narrower than that by design.",
    good: ["Visual, drag-and-drop pipeline", "Fast to set up and learn", "Strong for outbound sales follow-up"],
  },
  {
    name: "Capsule",
    href: CAPSULE_URL,
    cta: "capsule",
    page: "/capsule",
    from: "US$18",
    trial: "Free plan for up to 250 contacts",
    suits: "Small teams wanting simple contact management",
    body: "Capsule keeps things deliberately simple: contacts, a light pipeline, and tasks, without the sprawl of a bigger platform. The free plan makes it an easy starting point for a very small business, and you step up to paid as your contact list grows. If you need deep automation or marketing, you may outgrow it.",
    good: ["Genuinely free tier to start", "Clean and uncluttered", "Good for relationship tracking over heavy sales ops"],
  },
  {
    name: "Nutshell",
    href: NUTSHELL_URL,
    cta: "nutshell",
    page: "/nutshell",
    from: "US$13",
    trial: "14-day free trial",
    suits: "Teams wanting sales plus built-in email marketing",
    body: "Nutshell bundles a straightforward CRM with email marketing in one subscription, which appeals to small businesses that would otherwise pay for two tools. It is priced keenly at the entry level. The trade-off is that each individual piece is less deep than a specialist tool, which is usually fine for a small team.",
    good: ["Low entry price", "Sales and email marketing in one", "Simple reporting"],
  },
  {
    name: "Keap",
    href: KEAP_URL,
    cta: "keap",
    page: "/keap",
    from: "US$249",
    trial: "14-day free trial",
    suits: "Established small businesses wanting all-in-one automation",
    body: "Keap is the heaviest option here: CRM, marketing automation, and payments in one platform, aimed at small businesses that want to run a lot from a single tool. That power comes at a much higher price and a steeper setup, so it suits an established business with processes to automate rather than a team just getting organised.",
    good: ["CRM plus marketing automation plus payments", "Powerful automation flows", "Best for businesses ready to systemise"],
  },
];

const faqs = [
  {
    q: "What is the best CRM for a small business in Australia?",
    a: "There is no single best CRM, because the right one depends on what you need it to do. For a visual sales pipeline, Pipedrive is the natural pick; for simple contact management with a free tier, Capsule; for sales plus built-in email marketing on a budget, Nutshell; and for all-in-one automation in an established business, Keap. Match the tool to your workflow rather than chasing a brand.",
  },
  {
    q: "What is the cheapest CRM for small business?",
    a: "Among these, Nutshell (from US$13 per user a month) and Pipedrive (from US$14) sit at the low end, and Capsule offers a genuinely free plan for up to 250 contacts, which is the cheapest way to start. Keap is materially more expensive because it bundles marketing automation and payments. Always confirm current pricing and the AUD conversion with the vendor.",
  },
  {
    q: "Do these CRMs work for Australian businesses?",
    a: "Yes. All four are used by Australian small businesses and run in the cloud, so there is nothing to install. They quote prices in US dollars, which is worth factoring into your budget, and each offers a free trial so you can test fit before committing. Check data residency and support hours with the vendor if those matter to you.",
  },
  {
    q: "How do I choose between them?",
    a: "Start from your main job. If it is closing deals, prioritise the pipeline (Pipedrive). If it is keeping track of relationships simply, Capsule. If you want sales and email marketing together cheaply, Nutshell. If you want to automate a lot of an established business, Keap. Use the free trials, since the right feel matters as much as the feature list.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best CRM for Small Business Australia", item: seoConfig.bestCrmSmallBusiness.url },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best CRM for small business in Australia",
  itemListElement: CRMS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-24",
  dateModified: "2026-07-24",
  name: seoConfig.bestCrmSmallBusiness.title,
  description: seoConfig.bestCrmSmallBusiness.description,
  url: seoConfig.bestCrmSmallBusiness.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function BestCrmSmallBusinessPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 sm:px-8 pb-20 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f]">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f]">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Best CRM for small business</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black leading-[1.08] tracking-tight text-[#10251b] mb-5">
          Best CRM for small business in Australia
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          The best CRM for your small business is the one that matches your main job, whether that is closing deals,
          tracking relationships, or automating a lot from one place. Below are four that suit Australian small
          businesses, split by what each is actually good at, with real starting prices and free trials so you can test
          fit before you pay.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">How this is ranked:</span> it is not. These are grouped by who
          each suits, not scored, and no vendor can pay for placement. Some links are affiliate links, so we may earn a
          commission if you sign up, at no extra cost to you. Prices are the vendor&apos;s own published starting rates in
          USD and can change, so confirm current pricing before you commit.
        </p>

        {/* Quick comparison */}
        <div className="mb-12 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e5e9e7] text-left text-[#6e7b74]">
                <th className="py-3 pr-4 font-semibold">CRM</th>
                <th className="py-3 pr-4 font-semibold">From</th>
                <th className="py-3 pr-4 font-semibold">Free trial</th>
                <th className="py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody>
              {CRMS.map((c, i) => (
                <tr key={c.name} className={i % 2 ? "bg-[#f8faf9]" : "bg-white"}>
                  <td className="py-3 pr-4 font-bold text-[#10251b]">{c.name}</td>
                  <td className="py-3 pr-4 text-[#3d4b44]">{c.from}/user/mo</td>
                  <td className="py-3 pr-4 text-[#3d4b44]">{c.trial}</td>
                  <td className="py-3 text-[#3d4b44]">{c.suits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Per-CRM detail */}
        <div className="space-y-8">
          {CRMS.map((c) => (
            <section key={c.name} className="rounded-2xl border border-[#e5e9e7] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-xl font-black text-[#10251b]">{c.name}</h2>
                <span className="text-sm font-semibold text-[#6e7b74]">From {c.from}/user/mo &middot; {c.trial}</span>
              </div>
              <p className="mt-1 text-sm font-semibold" style={{ color: GREEN }}>{c.suits}</p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#3d4b44]">{c.body}</p>
              <ul className="mt-4 space-y-2">
                {c.good.map((g) => (
                  <li key={g} className="flex items-start gap-2.5 text-sm text-[#2b362f] leading-relaxed">
                    <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: GREEN }} /> {g}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={c.href}
                  target="_blank"
                  rel="nofollow sponsored"
                  data-cta={`crm-${c.cta}`}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}
                >
                  Try {c.name} free <ArrowRight className="h-4 w-4" />
                </a>
                <Link href={c.page} className="text-sm font-semibold hover:opacity-80" style={{ color: GREEN }}>
                  Read the {c.name} guide &rarr;
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-black text-[#10251b] mb-5">How to choose</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl">
            Start from your main job rather than the feature list. If it is closing deals, prioritise the pipeline and
            look at Pipedrive. If it is keeping track of relationships simply and cheaply, Capsule. If you want sales and
            email marketing in one low-cost tool, Nutshell. If you are ready to automate a lot of an established business,
            Keap. Every one offers a free trial, so shortlist two and test the feel, since that matters as much as the
            spec sheet.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black text-[#10251b] mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-[#9aa39c] text-xs mt-10 leading-relaxed">
          This page is operated by Refer Labs and contains affiliate links. We may earn a commission if you sign up
          through one, at no extra cost to you, and it never changes how these are grouped or described. Prices are the
          vendors&apos; own published starting rates and can change; confirm current pricing before you commit.
        </p>
      </main>
    </ConsumerShell>
  );
}
