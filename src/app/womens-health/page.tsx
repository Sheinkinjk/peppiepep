import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid, type GuideLink } from "@/components/brand/GuideGrid";
import { HubObject, type ObjectKind } from "@/components/home/Objects";

export const metadata = generateSEOMetadata(seoConfig.womensHealthHub);

const SLUG = "/womens-health";

/*
 * Built 28 Sep 2026 on the /mens-health layout, as a coming-soon section.
 *
 * Coming soon here means: the guides are finished and published, and no provider
 * has been added. That is stated directly under the answer (ComingSoonNote,
 * "Women's health" -> variant "a", which says nothing here earns us anything) and
 * again in the panel beside it, because Jarred asked for it to be prominent.
 *
 * Partners are expected within weeks. None is named, and nothing is staged for
 * them (no-prebuilding rule, 24 Sep 2026). When the first one lands, in ONE pass:
 * add a HubProviders block here, switch ComingSoonNote's "Women's health" entry to
 * "partnered", replace the reserved PartnerRoute on each guide, move this section
 * off /coming-soon, and rewrite the "Does Refer Labs earn" FAQ and llms.txt line.
 * check-earns-claim fails the build if a link lands beside "earns nothing".
 *
 * TGA: no medicine is named or described. Menopause and UTIs are
 * conditions and services and may be named; the pages compare how care is
 * accessed and billed.
 */

const guides: GuideLink[] = [
  {
    href: "/womens-health/menopause-care-cost-australia",
    title: "Menopause care: what the routes cost",
    desc: "The Medicare menopause health assessment, what private telehealth services charge, and why telehealth is rebated less.",
    kind: "cost",
  },
  {
    href: "/womens-health/uti-treatment-without-a-gp-australia",
    title: "UTI treatment without a GP",
    desc: "Pharmacist UTI services state by state, and the one state we found where the consultation is free.",
    kind: "compare",
  },
  {
    href: "/weight-loss-telehealth-women-australia",
    title: "Weight-loss telehealth for women",
    desc: "How the women-focused programs differ from the general ones, in the weight-loss section.",
    kind: "compare",
  },
];

const OTHER: { href: string; label: string; object: ObjectKind }[] = [
  { href: "/weight-loss", label: "Weight loss", object: "scale" },
  { href: "/health-and-beauty", label: "Health & beauty", object: "bottle" },
  { href: "/longevity", label: "Longevity", object: "hourglass" },
  { href: "/sleep", label: "Sleep", object: "pillow" },
];

const faqs = [
  {
    q: "Where can I get women's health care without seeing a GP in Australia?",
    a: "More than most people expect. In every state whose rules we could read, a trained pharmacist can assess an uncomplicated urinary tract infection in women aged 18 to 65. Online doctors can consult by video or phone. A GP is still the route for anything new, complex or recurring, and since 1 November 2025 the bulk billing incentive applies to every Medicare-eligible patient.",
  },
  {
    q: "Is women's health telehealth covered by Medicare?",
    a: "Sometimes. Ordinary GP telehealth needs a face-to-face visit with that practice in the last 12 months, but Medicare's sexual and reproductive health telehealth items pay a rebate without one. Many online services charge a private fee instead. The Medicare menopause health assessment is in-person only. Ask any service which item it bills before you book.",
  },
  {
    q: "Do you name specific medicines on these pages?",
    a: "No. Advertising prescription medicines to the public is prohibited in Australia, and what is appropriate for you is a decision for a registered practitioner after an individual assessment. These pages compare how care is accessed, what it costs and what Medicare covers.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "The UTI and menopause guides earn us nothing: no provider has been added to them. The weight-loss telehealth guide listed here belongs to the weight-loss section, and its Juniper and Moshy links are affiliate links, disclosed on that page. When a women's health provider is added, every page linking to it will say so beside the link.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Women's Health", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Women's health guides",
  itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${SITE_URL}${g.href}` })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.womensHealthHub.title,
  description: seoConfig.womensHealthHub.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function WomensHealthHub() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <Link href="/coming-soon" className="hover:text-[#007a95]">Coming soon</Link>
            <span>/</span>
            <span className="text-[#14120f]">Women&apos;s health</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
                Women&apos;s health in Australia: <span>how access works and what it costs</span>
              </h1>
              {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
              <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
                A lot of routine women&apos;s health care no longer has to start with a GP. A trained pharmacist can assess
                an uncomplicated UTI in every state whose rules we could read. Online doctors consult by video or phone, sometimes with a Medicare rebate and often without. For
                menopause, Medicare now pays for a dedicated assessment with your own GP. These guides set out what
                each route covers, what it costs, and where Medicare applies.
              </p>
              <div className="mt-5">
                <ComingSoonNote category="Women's health" />
              </div>
            </div>
            <EdgeObject kind="phone" className="lg:mt-14">
              <div className="rounded-2xl border border-[#ded8cd] bg-white p-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#007a95]">Coming soon</p>
                <p className="mt-2 text-lg font-bold text-[#14120f]">Provider comparisons are being added</p>
                <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
                  The guides below are published and free to read. The comparison of women&apos;s telehealth providers
                  is next, and we add a provider only after checking it ourselves.
                </p>
                <div className="mt-4">
                  <NewsletterSignup
                    variant="alert"
                    source="womens-health-hub"
                    heading="Hear when providers are added"
                    sub="One email when the comparison goes up. Your email only; no answers or health details."
                  />
                </div>
                <p className="mt-3 text-sm">
                  <Link href="/coming-soon" className="font-semibold text-[#007a95] hover:underline">
                    Everything we&apos;re building
                  </Link>
                </p>
              </div>
            </EdgeObject>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Every guide in this section</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Each one compares routes rather than providers, with every figure read from a government or provider page
            and dated.
          </p>
          <GuideGrid guides={guides} />
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Common questions</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
              <strong className="font-semibold text-[#14120f]">On medicines.</strong> These pages never name a
              prescription medicine, because advertising one to the public is prohibited in Australia and what is
              appropriate for you is a practitioner&apos;s decision after an individual assessment.
            </p>
            <dl className="mt-7 max-w-3xl divide-y divide-[#ded8cd]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Other categories</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {OTHER.map((o) => (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    className="group flex items-center gap-3 rounded-xl border border-[#ded8cd] bg-white p-3 text-sm font-semibold text-[#14120f] transition-colors hover:border-[#14120f] hover:text-[#007a95]"
                  >
                    <HubObject kind={o.object} size={36} className="hy-obj" />
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/guides" className="font-semibold text-[#56504a] hover:text-[#007a95] hover:underline">All guides</Link>
            </p>
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
