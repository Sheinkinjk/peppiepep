import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.mensHealthHub);

const SLUG = "/mens-health";

/**
 * Clinical register throughout, no imagery, and no adult-retail link anywhere in
 * this hub or the clinical guides. The retail category is confined to a single
 * page which this hub links to plainly and which carries no products yet.
 */

const guides = [
  {
    href: "/mens-health/erectile-dysfunction-treatment-cost-australia",
    title: "Erectile dysfunction: what treatment costs",
    desc: "How GP, telehealth and subscription pricing differ, and where Medicare applies.",
  },
  {
    href: "/mens-health/premature-ejaculation-treatment-options-australia",
    title: "Premature ejaculation: the routes",
    desc: "What a GP, a psychologist and an online clinic each offer, and how each is priced.",
  },
  {
    href: "/mens-health/online-mens-health-clinics-compared",
    title: "Online clinics, compared",
    desc: "Consult models, subscription structures, and what is billed separately.",
  },
  {
    href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health",
    title: "Telehealth or a GP: which is cheaper?",
    desc: "The same question costed over a year rather than a single appointment.",
  },
  {
    href: "/mens-health/mens-health-quiz",
    title: "Which route fits you?",
    desc: "Four questions on cost, discretion and preference. No health questions.",
  },
];

const faqs = [
  {
    q: "What does men's health treatment cost in Australia?",
    a: "It depends far more on the access route than on the condition. A GP consult may be bulk-billed or carry a gap, with a Medicare rebate on the consultation. Online clinics generally run subscriptions that bundle a consult with ongoing supply and support. The figure worth comparing is what each route costs over twelve months, not what the first appointment costs.",
  },
  {
    q: "Are online men's health clinics legitimate in Australia?",
    a: "The established ones operate as regulated telehealth services: you complete an assessment, an Australian-registered practitioner reviews it, and anything prescription-only is supplied only where that practitioner judges it appropriate and dispensed by a pharmacy. The check to run on any service is whether a practitioner consultation happens before anything is supplied. A service offering to skip that step is the warning sign.",
  },
  {
    q: "Is men's health covered by Medicare?",
    a: "Rebates apply to consultations rather than to products. A GP appointment attracts a rebate and may be bulk-billed. Online clinic subscriptions are often outside Medicare entirely, which is a material difference when comparing them on price. Ask any service directly whether a rebate applies before you subscribe.",
  },
  {
    q: "Do you name specific medicines on these pages?",
    a: "No, and that is deliberate rather than an oversight. Advertising prescription medicines to the public is prohibited in Australia. Our pages compare providers on consult model, price, what is included and whether anything is bulk-billed. What is appropriate for you is a decision for a registered practitioner after an individual assessment, not something a comparison site should be steering.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Not yet. Men's health is being built before any partner is in place, so nothing in this section currently earns us a commission. When we add providers we will say so on the page and disclose it, as we do across the site.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men's Health", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Men's health guides",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.title,
    url: `${SITE_URL}${g.href}`,
  })),
};

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
  name: seoConfig.mensHealthHub.title,
  description: seoConfig.mensHealthHub.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function MensHealthHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Men&apos;s health</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Men&apos;s health in Australia: <span className="italic text-[#0a7c42]">what access costs</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              This is a category where the marketing is loud and the pricing is hard to compare. These guides set out
              how the access routes differ, what each costs over a year rather than at the first appointment, and what
              to ask before committing to a subscription.
            </p>
          </div>
          <div className="mt-8 max-w-3xl rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
            <p className="text-[13px] leading-relaxed text-[#3d4b44]">
              <strong className="font-semibold text-[#10251b]">On medicines.</strong> These pages never name a
              prescription medicine. Advertising one to the public is prohibited in Australia, and what is appropriate
              for you is a decision for a registered practitioner after an individual assessment. We compare providers
              on consult model, price, inclusions and whether anything is bulk-billed.
            </p>
          </div>
          <div className="mt-4 max-w-3xl">
            <ComingSoonNote category="Men's health" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Start here</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-colors hover:border-[#0a7c42]/40"
              >
                <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{g.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                  Read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#6e7b74]">
            We also cover the non-prescription{" "}
            <Link href="/mens-health/sexual-wellness-products" className="font-semibold text-[#0a7c42] hover:underline">
              sexual wellness retail category
            </Link>{" "}
            on a single separate page, kept apart from the clinical guides above. That page is for adults and carries
            no products at present.
          </p>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Common questions</h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Other categories</h2>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <li><Link href="/mens-health-telehealth-australia" className="text-[#0a7c42] hover:underline">Men&apos;s telehealth, generally</Link></li>
              <li><Link href="/hair-loss" className="text-[#0a7c42] hover:underline">Hair loss</Link></li>
              <li><Link href="/weight-loss" className="text-[#0a7c42] hover:underline">Weight loss</Link></li>
              <li><Link href="/sleep" className="text-[#0a7c42] hover:underline">Sleep</Link></li>
              <li><Link href="/guides" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All guides</Link></li>
            </ul>
          </div>
          <div className="mt-10 max-w-2xl">
            <NewsletterSignup />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
