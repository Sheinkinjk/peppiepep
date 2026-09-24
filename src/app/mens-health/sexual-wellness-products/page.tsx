import Link from "next/link";
import { SectionMark } from "@/components/brand/SectionMark";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
import { MIDOC } from "@/lib/partners/midoc";
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
    a: "Yes, on one link. The Midoc consultation link on this page pays us a commission if you use the service, and it is disclosed beside it. No retail product is linked yet; this is the only page in the men's health section where retail links will appear when they do, kept apart from the clinical guides. Where any guide in this section links a company that pays us, it says so beside that link.",
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
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <Link href="/mens-health" className="hover:text-[#007a95]">Men&apos;s health</Link>
          <span>/</span>
          <span className="text-[#14120f]">Sexual wellness products</span>
        <SectionMark kind="pulse" size={56} /></nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#14120f] sm:text-4xl">
          Sexual wellness products in Australia
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
          This page covers the non-prescription retail category, and it is the only page in our men&apos;s health
          section where retailer links will appear. It is written for adults and kept deliberately separate from our
          guides on conditions and treatment costs.
        </p>

        <div className="mt-7 rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4">
          <p className="text-[13px] leading-relaxed text-[#56504a]">
            <strong className="font-semibold text-[#14120f]">For adults.</strong> General information about a retail
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
          {/* variant="partnered" explicitly, not via BY_CATEGORY: this page passes
              category="This page", which maps to the unpartnered wording. It now
              carries a Midoc link, so the old copy ("nothing here earns us a
              commission before then") became false the moment that landed. The
              partnered body ignores `what`, so the retailer prop goes with it. */}
          <ComingSoonNote category="This page" variant="partnered" />
        </div>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#56504a]">
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Why this page is on its own</h2>
            <p className="mt-3">
              Our guides on erectile dysfunction, premature ejaculation and clinic pricing carry no commercial links and
              are not intended to. This page is where retail links will sit, and it exists separately so that the line
              between advice and commerce is visible in the site&apos;s structure rather than only in a disclosure
              paragraph.
            </p>
            <p className="mt-3">
              If you arrived here looking for what treatment costs, the{" "}
              <Link href="/mens-health" className="font-semibold text-[#007a95] hover:underline">clinical guides</Link>{" "}
              are the more useful place to be.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What to check in this market</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-[#14120f]">Therapeutic claims.</strong> An item claiming to treat a condition
                may be a regulated therapeutic good. Search the ARTG for it rather than taking the listing at its word.
              </li>
              <li>
                <strong className="text-[#14120f]">Materials and standards.</strong> Where a product goes on or in the
                body, what it is made from matters, and reputable retailers state it.
              </li>
              <li>
                <strong className="text-[#14120f]">Australian retailer or overseas.</strong> Consumer guarantees,
                returns and who you can reach if something is wrong all differ.
              </li>
              <li>
                <strong className="text-[#14120f]">Discreet delivery and billing.</strong> Retailers vary in how
                packaging and statement descriptors appear, and it is worth checking rather than assuming.
              </li>
              <li>
                <strong className="text-[#14120f]">Return policy on intimate items.</strong> Hygiene rules mean returns
                are often restricted, which is lawful and worth knowing before you order.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">When a purchase is not the answer</h2>
            <p className="mt-3">
              If something has persisted, is causing distress, or has changed noticeably, that is a reason to speak to a
              practitioner rather than to buy something. Retail products do not diagnose and are not a treatment
              pathway, and delaying an assessment to try purchases first is the expensive order to do it in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Common questions</h2>
            <dl className="mt-5 divide-y divide-[#f1ede4] rounded-2xl border border-[#ded8cd] bg-white">
              {faqs.map((f) => (
                <div key={f.q} className="px-5 py-5">
                  <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="mt-12 border-t border-[#f1ede4] pt-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link href="/mens-health" className="font-semibold text-[#007a95] hover:underline">
                Back to men&apos;s health
              </Link>
            </li>
            <li>
              <Link href="/how-we-make-money" className="text-[#56504a] hover:text-[#007a95] hover:underline">
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
              what: `Sexual health and STI consultations listed at ${MIDOC.consultStandard}, ${MIDOC.format}, ${MIDOC.waitTime}.`,
              checked: MIDOC.readOnLabel,
            },
          ]}
        />
      </main>
    </ConsumerShell>
  );
}
