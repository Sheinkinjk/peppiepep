import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import HubProviders from "@/components/consumer/HubProviders";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.healthAndBeauty);

const SLUG = "/health-and-beauty";

const guides = [
  {
    href: "/health-and-beauty/retinol-vs-prescription-strength-australia",
    title: "Retinol vs prescription-strength",
    desc: "What the strength difference means, and how each route is accessed in Australia.",
  },
  {
    href: "/health-and-beauty/led-face-mask-comparison-australia",
    title: "LED face masks, compared",
    desc: "Real Australian prices, why they are higher than the US listing, and how to check the ARTG.",
  },
  {
    href: "/health-and-beauty/foreo-luna-vs-ufo",
    title: "Foreo Luna vs UFO",
    desc: "Two separate device lines rather than two versions of one, with Australian list prices for both.",
  },
  {
    href: "/health-and-beauty/natural-skincare-australia",
    title: "Natural vs certified organic",
    desc: "One of those words is checkable in a public register and the other is not. Which, and how.",
  },
  {
    href: "/health-and-beauty/best-value-skincare-australia-cost-per-use",
    title: "Cost per use, not sticker price",
    desc: "Why a pricier serum can work out cheaper per application than a budget one, and where that maths misleads you.",
  },
  {
    href: "/health-and-beauty/acne-treatment-options-and-costs-australia",
    title: "Acne: the routes and the costs",
    desc: "Over-the-counter, GP and dermatologist pathways, what Medicare covers, and what you pay.",
  },
  {
    href: "/health-and-beauty/anti-ageing-treatments-what-they-cost",
    title: "Anti-ageing treatments and pricing",
    desc: "Why almost no clinic publishes a price, how they quote, and what to ask before booking.",
  },
  {
    href: "/health-and-beauty/skincare-quiz",
    title: "Which routine fits you?",
    desc: "A short matcher across budget, effort and priority. No health questions.",
  },
];

const faqs = [
  {
    q: "Does more expensive skincare work better?",
    a: "Not reliably. Price reflects packaging, brand and formulation research as much as what the product does on your skin. The more useful question is what active ingredient a product contains, at what concentration, and whether you will use it consistently. Our cost-per-use guide sets out how to compare products on what you spend per application rather than what the bottle costs.",
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
    a: "Yes, from four retail partners: OptiSlim, Foreo, Edible Beauty Australia and Aussie Health Products, all through Commission Factory. We earn a commission if you buy through a link to one of them, at no extra cost to you, and each page carrying one says so beside it. We hold no discount code for any of the four, so there is nothing on this page we can claim saves you money. Commissions do not change what we compare or conclude.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Health & Beauty", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Health and beauty guides",
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
  name: seoConfig.healthAndBeauty.title,
  description: seoConfig.healthAndBeauty.description,
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
          <nav className="flex items-center gap-2 text-sm text-[#627068]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Health &amp; beauty</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Health and beauty in Australia: <span className="italic text-[#0a7c42]">what it costs, and which claims you can check</span>
            </h1>
            {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
            <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
              Two words do most of the selling in this category and only one of them means anything you can verify.
              &ldquo;Certified organic&rdquo; is checkable in a public register; &ldquo;natural&rdquo; is not. A
              cosmetic device is not a therapeutic one. And a meal-replacement shake sold as a very low energy diet is,
              by the food regulator&apos;s own rule, meant to be used under medical supervision. These guides cover
              what each thing costs in Australian dollars and which of its claims survive a check.
            </p>
            <AffiliateDisclosure compact className="mt-4" />
          </div>
        </section>


        <HubProviders
          className="pt-4"
          ctaPrefix="health-beauty-hub"
          heading="The partners we cover"
          intro="Four Australian retail partners, answering the same four questions. We earn a commission from all four and hold a discount code for none of them, so there is no code on this page to type."
          providers={[
            {
              name: "Aussie Health Products",
              href: "/aussie-health-products",
              hrefLabel: "Read our Aussie Health guide",
              suits: "Shoppers who already know the brand they want and are choosing where to buy it.",
              how: "A multi-brand marketplace stating it carries over 300 natural and ethical brands.",
              cost: "Priced per product by brand. Free shipping over $99, read 4 September 2026.",
              visitHref: "/go/aussie-health-skin-hub",
              visitLabel: "Browse Aussie Health Products",
              earns: true,
              earnAction: "buy from",
            },
            {
              name: "Edible Beauty",
              href: "/edible-beauty",
              hrefLabel: "Read our Edible Beauty guide",
              suits: "Buyers who want an Australian natural range and understand what that word does not certify.",
              how: "Its own skincare range, sold direct. Products described as approved by certified naturopaths.",
              cost: "$44 to $88 a product, read 16 September 2026. Free shipping over $110, read 4 September 2026.",
              visitHref: "/go/edible-beauty-skin-hub",
              visitLabel: "View Edible Beauty pricing",
              earns: true,
              earnAction: "buy from",
            },
            {
              name: "Foreo",
              href: "/foreo",
              hrefLabel: "Read our Foreo guide",
              suits: "Buyers comparing cleansing and LED devices on Australian prices rather than converted ones.",
              how: "Sells its LUNA and UFO device lines direct, priced in Australian dollars on its own site.",
              cost: "From A$169 for the LUNA 4 go, read 4 September 2026.",
              visitHref: "/go/foreo-skin-hub",
              visitLabel: "View Foreo pricing",
              earns: true,
              earnAction: "buy from",
            },
            {
              name: "OptiSlim",
              href: "/optislim",
              hrefLabel: "Read our OptiSlim guide",
              suits: "People whose doctor has already put a very low energy diet on the table.",
              how: "Meal-replacement shakes, bars and soups. The VLCD range is a food for special medical purposes.",
              cost: "$44.99 for 21 meals, or $2.14 a meal, read 16 September 2026.",
              visitHref: "/go/optislim-health-hub",
              visitLabel: "View OptiSlim pricing",
              earns: true,
              earnAction: "buy from",
            },
          ]}
        />

        {/* Was a flat list of eight headed "Start here", which stopped describing
            the section once it covered nutrition as well as skincare. Grouped by
            the decision each guide serves, so a reader can find their question
            rather than reading all eight titles. No guide was removed. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Every guide in this section</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">
            Grouped by what each one decides. The nutrition side of this section is covered on the{" "}
            <Link href="/optislim" className="font-semibold text-[#0a7c42] hover:underline">OptiSlim page</Link>, which
            sets out what the food regulator requires of a very low energy diet.
          </p>
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
      </main>
    </ConsumerShell>
  );
}
