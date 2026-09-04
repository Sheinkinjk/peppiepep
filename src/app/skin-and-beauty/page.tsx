import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.skinAndBeauty);

const SLUG = "/skin-and-beauty";

const guides = [
  {
    href: "/skin-and-beauty/retinol-vs-prescription-strength-australia",
    title: "Retinol vs prescription-strength",
    desc: "What the strength difference actually means, and how each route is accessed in Australia.",
  },
  {
    href: "/skin-and-beauty/led-face-mask-comparison-australia",
    title: "LED face masks, compared",
    desc: "Real Australian prices, why they are higher than the US listing, and how to check the ARTG.",
  },
  {
    href: "/skin-and-beauty/foreo-luna-vs-ufo",
    title: "Foreo Luna vs UFO",
    desc: "Two separate device lines rather than two versions of one, with Australian list prices for both.",
  },
  {
    href: "/skin-and-beauty/natural-skincare-australia",
    title: "Natural vs certified organic",
    desc: "One of those words is checkable in a public register and the other is not. Which, and how.",
  },
  {
    href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use",
    title: "Cost per use, not sticker price",
    desc: "Why a $90 serum can work out cheaper than a $30 one, and where the maths misleads you.",
  },
  {
    href: "/skin-and-beauty/acne-treatment-options-and-costs-australia",
    title: "Acne: the routes and the costs",
    desc: "Over-the-counter, GP and dermatologist pathways, what Medicare covers, and what you pay.",
  },
  {
    href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost",
    title: "Anti-ageing treatments and pricing",
    desc: "Why almost no clinic publishes a price, how they quote, and what to ask before booking.",
  },
  {
    href: "/skin-and-beauty/skincare-quiz",
    title: "Which routine fits you?",
    desc: "A short matcher across budget, effort and priority. No health questions.",
  },
];

const faqs = [
  {
    q: "Does more expensive skincare work better?",
    a: "Not reliably. Price reflects packaging, brand and formulation research as much as what the product does on your skin. The more useful question is what active ingredient a product contains, at what concentration, and whether you will actually use it consistently. Our cost-per-use guide sets out how to compare products on what you spend per application rather than what the bottle costs.",
  },
  {
    q: "What skin treatments need a prescription in Australia?",
    a: "Stronger topical treatments and oral medicines used for skin conditions are prescription-only in Australia, which means they are supplied only after an individual assessment by a registered practitioner who decides whether they are appropriate. Over-the-counter products, including retinol, are available without one. We describe how each route is accessed rather than naming specific medicines, because advertising prescription medicines to the public is prohibited here.",
  },
  {
    q: "Are LED face masks regulated in Australia?",
    a: "Devices making therapeutic claims are regulated by the TGA and should be included on the Australian Register of Therapeutic Goods. You can search the ARTG yourself before buying. Inclusion means the device met the regulatory requirements for supply in Australia; it is not a statement about how well it will work for you.",
  },
  {
    q: "Why do skincare devices cost more in Australia?",
    a: "Australian retail prices routinely sit above the equivalent US listing once GST, freight, local distribution and warranty support are included. The Omnilux Contour Face, for example, lists at USD $395 on the brand's own site and AUD $470 at Australian retailer RY, checked 19 August 2026. Comparing a US price to an Australian one without accounting for that gap will make local pricing look worse than it is.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Not yet. Skin and beauty is being built before any partner is in place, so nothing in this section currently earns us a commission. When we add providers we will say so on the page and disclose it, as we do everywhere else on the site.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Skin & Beauty", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Skin and beauty guides",
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
  name: seoConfig.skinAndBeauty.title,
  description: seoConfig.skinAndBeauty.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function SkinAndBeautyHub() {
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
            <span className="text-[#2b362f]">Skin &amp; beauty</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Skin and beauty in Australia: <span className="italic text-[#0a7c42]">what works, and what it costs</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Skincare is a category where the price on the shelf tells you very little. These guides cover what the
              common actives do, what devices genuinely cost here rather than overseas, and how the prescription route
              differs from what you can buy yourself.
            </p>
          </div>
          <div className="mt-8 max-w-3xl">
            <ComingSoonNote category="Skin and beauty" />
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
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Common questions
            </h2>
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
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Other categories
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
              Sleep is being built alongside this one. The rest already have their comparisons and current offers in place.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <li><Link href="/sleep" className="text-[#0a7c42] hover:underline">Sleep</Link></li>
              <li><Link href="/weight-loss" className="text-[#0a7c42] hover:underline">Weight loss</Link></li>
              <li><Link href="/hair-loss" className="text-[#0a7c42] hover:underline">Hair loss</Link></li>
              <li><Link href="/pet-insurance" className="text-[#0a7c42] hover:underline">Pets</Link></li>
              <li><Link href="/guides" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All guides</Link></li>
            </ul>
          </div>
          <div className="mt-10 max-w-2xl">
            <NewsletterSignup />
          </div>
        </section>
        <PartnerRoute
          className="mt-12"
          heading="Retailers in this section"
          intro="Three retailers we have a commercial arrangement with. More are being added, so this is a starting set rather than the full market."
          providers={[
            {
              name: "Foreo",
              href: "/go/foreo-skin-hub",
              what: "Sells its red light therapy range direct. Check the listed price in Australian dollars and the shipping terms to an Australian address at checkout.",
            },
            {
              name: "Edible Beauty Australia",
              href: "/go/edible-beauty-skin-hub",
              what: "An Australian natural skincare range, priced in Australian dollars and shipped domestically.",
            },
            {
              name: "Aussie Health Products",
              href: "/go/aussie-health-skin-hub",
              what: "An Australian retailer carrying health and skincare ranges, priced in Australian dollars.",
            },
          ]}
        />
      </main>
    </ConsumerShell>
  );
}
