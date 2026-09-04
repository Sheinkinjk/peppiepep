import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.sexualWellnessProducts);

const SLUG = "/mens-health/sexual-wellness-products";

/**
 * The single page in this section where retail links will eventually sit. It is
 * deliberately isolated: no clinical guide links here, and this page links back
 * only to the hub, so the commercial surface never touches the pages discussing
 * conditions.
 *
 * No retailer is named yet. Two partners are intended, but naming a partner
 * before an agreement is live is a claim we cannot support, and it is the same
 * standard applied to every other unlaunched section on the site. Names go in
 * when the links do, with disclosure attached.
 *
 * No imagery, plain register, no explicit content, and no therapeutic claim
 * attached to any product category. Some items in this market are regulated as
 * therapeutic goods, so the page points at the ARTG rather than asserting
 * anything about what a product does.
 */

const faqs = [
  {
    q: "Are sexual wellness products regulated in Australia?",
    a: "It depends on the product and on what is claimed for it. An item making a therapeutic claim can be regulated as a therapeutic good and should be included on the Australian Register of Therapeutic Goods, which you can search yourself. Ordinary retail items carrying no therapeutic claim are not regulated that way, but Australian Consumer Law still applies to how they are described and to your rights if something is faulty.",
  },
  {
    q: "Can these products treat a medical condition?",
    a: "Retail products are not a substitute for a clinical assessment. If you are dealing with a persistent issue, the useful step is a practitioner rather than a purchase, and our clinical guides set out what those routes cost. Treat any retail claim to address a medical condition with scepticism, and check whether the product appears on the ARTG if such a claim is being made.",
  },
  {
    q: "Will Refer Labs earn commission on this page?",
    a: "On this page, eventually yes, and it will be disclosed here when it happens. It is the only page in our men's health section where retail links will appear, which is deliberate: our guides on conditions and costs stay free of commercial links so the advice on them cannot be shaped by what pays. Right now no links are live and nothing here earns us anything.",
  },
  {
    q: "Why is this page separate from the clinical guides?",
    a: "Because mixing them would compromise both. A page discussing what treatment costs should not sit next to something we are paid to sell, and a retail page should not imply clinical benefit. Keeping one commercial page apart from the clinical ones is how we keep that line visible rather than merely claiming it exists.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men's Health", item: `${SITE_URL}/mens-health` },
    { "@type": "ListItem", position: 3, name: "Sexual wellness products", item: `${SITE_URL}${SLUG}` },
  ],
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
  name: seoConfig.sexualWellnessProducts.title,
  description: seoConfig.sexualWellnessProducts.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function SexualWellnessProductsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/mens-health" className="hover:text-[#0a7c42]">Men&apos;s health</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Sexual wellness products</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Sexual wellness products in Australia
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          This page covers the non-prescription retail category, and it is the only page in our men&apos;s health
          section where retailer links will appear. It is written for adults and kept deliberately separate from our
          guides on conditions and treatment costs.
        </p>

        <div className="mt-7 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4">
          <p className="text-[13px] leading-relaxed text-[#3d4b44]">
            <strong className="font-semibold text-[#10251b]">For adults.</strong> General information about a retail
            category. Nothing here is medical advice, and no product described in this market is a substitute for a
            clinical assessment.
          </p>
        </div>

        <div className="mt-4">
          {/* `what` must be a noun phrase: the variants place it as a sentence subject,
              and the old value was a relative clause, which rendered as "The retailers
              themselves, which we will name and link once agreements are in place are not
              on the page yet." The dropped clause said nothing the next sentence does not
              already say. */}
          <ComingSoonNote category="This page" what="the retailers themselves" />
        </div>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#3d4b44]">
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why this page is on its own</h2>
            <p className="mt-3">
              Our guides on erectile dysfunction, premature ejaculation and clinic pricing carry no commercial links and
              are not intended to. This page is where retail links will sit, and it exists separately so that the line
              between advice and commerce is visible in the site&apos;s structure rather than only in a disclosure
              paragraph.
            </p>
            <p className="mt-3">
              If you arrived here looking for what treatment costs, the{" "}
              <Link href="/mens-health" className="font-semibold text-[#0a7c42] hover:underline">clinical guides</Link>{" "}
              are the more useful place to be.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What to check in this market</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-[#10251b]">Therapeutic claims.</strong> An item claiming to treat a condition
                may be a regulated therapeutic good. Search the ARTG for it rather than taking the listing at its word.
              </li>
              <li>
                <strong className="text-[#10251b]">Materials and standards.</strong> Where a product goes on or in the
                body, what it is made from matters, and reputable retailers state it.
              </li>
              <li>
                <strong className="text-[#10251b]">Australian retailer or overseas.</strong> Consumer guarantees,
                returns and who you can reach if something is wrong all differ.
              </li>
              <li>
                <strong className="text-[#10251b]">Discreet delivery and billing.</strong> Retailers vary in how
                packaging and statement descriptors appear, and it is worth checking rather than assuming.
              </li>
              <li>
                <strong className="text-[#10251b]">Return policy on intimate items.</strong> Hygiene rules mean returns
                are often restricted, which is lawful and worth knowing before you order.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When a purchase is not the answer</h2>
            <p className="mt-3">
              If something has persisted, is causing distress, or has changed noticeably, that is a reason to speak to a
              practitioner rather than to buy something. Retail products do not diagnose and are not a treatment
              pathway, and delaying an assessment to try purchases first is the expensive order to do it in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
            <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
              {faqs.map((f) => (
                <div key={f.q} className="px-5 py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="mt-12 border-t border-[#eef1ef] pt-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link href="/mens-health" className="font-semibold text-[#0a7c42] hover:underline">
                Back to men&apos;s health
              </Link>
            </li>
            <li>
              <Link href="/how-we-make-money" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">
                How we make money
              </Link>
            </li>
          </ul>
        </section>
        <PartnerRoute
          className="mt-12"
          heading="If you want the clinical route instead"
          intro="Products are one thing; a consultation is another. Midoc's sexual health line covers STI and related concerns, and what is appropriate is decided by the practitioner."
          providers={[
            {
              name: "Midoc",
              href: "/go/midoc-sexual-wellness",
              what: "Sexual health and STI consultations listed at $49, phone or video with an AHPRA-registered doctor, usually within 5 to 60 minutes.",
              checked: "3 September 2026",
            },
          ]}
        />
      </main>
    </ConsumerShell>
  );
}
