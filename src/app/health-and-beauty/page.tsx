import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

import HubProviders from "@/components/consumer/HubProviders";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid } from "@/components/brand/GuideGrid";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
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
    href: "/health-and-beauty/skincare-quiz",
    title: "Which routine fits you?",
    desc: "A short matcher across budget, effort and priority. No health questions.",
  },
];

const OTHER: { href: string; label: string; object: ObjectKind }[] = [
  { href: "/sleep", label: "Sleep", object: "pillow" },
  { href: "/weight-loss", label: "Weight loss", object: "scale" },
  { href: "/hair-loss", label: "Hair loss", object: "comb" },
  { href: "/pet-insurance", label: "Pets", object: "tag" },
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
    a: "Yes, from five retail partners: OptiSlim, Technogym, Foreo, Edible Beauty Australia and Aussie Health Products, all through Commission Factory. We earn a commission if you buy through a link to one of them, at no extra cost to you, and each page carrying one says so beside it. We hold no discount code for any of the five, so there is nothing on this page we can claim saves you money. Commissions do not change what we compare or conclude.",
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
          <nav className="flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#14120f]">Health &amp; beauty</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-3xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
              Health and beauty in Australia: what it costs, and which claims you can check
            </h1>
            {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
            <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
              Two words do most of the selling in this category and only one of them means anything you can verify.
              &ldquo;Certified organic&rdquo; is checkable in a public register; &ldquo;natural&rdquo; is not. A
              cosmetic device is not a therapeutic one. And a meal-replacement shake sold as a very low energy diet is,
              by the food regulator&apos;s own rule, meant to be used under medical supervision. These guides cover
              what each thing costs in Australian dollars and which of its claims survive a check.
            </p>
            <AffiliateDisclosure compact className="mt-4" />
          </div>
          <EdgeObject kind="bottle" className="lg:mt-14">
            <MatchPrompt
              stacked
              href="/health-and-beauty/skincare-quiz"
              title="Which routine fits you?"
              sub="A short matcher across budget, effort and priority. No health questions."
              cta="Start the routine match"
              dataCta="health-beauty-hero-quiz"
            />
          </EdgeObject>
          </div>
        </section>


        <HubProviders
          className="pt-16"
          ctaPrefix="health-beauty-hub"
          heading="The partners we cover"
          intro="Five Australian retail partners, answering the same four questions. We earn a commission from all five, hold a discount code for none of them, and none of them can pay to be described more favourably."
          providers={[
            {
              name: "Aussie Health Products",
              href: "/aussie-health-products",
              hrefLabel: "Read our Aussie Health guide",
              suits: "Shoppers who already know the brand they want and are choosing where to buy it.",
              how: "A multi-brand marketplace stating it carries over 300 natural and ethical brands.",
              cost: "Priced per product by the brand you choose, not by the retailer.",
              visitHref: "/go/aussie-health-skin-hub",
              highlight: "Free shipping over $99, read 4 September 2026. Over 300 brands in one checkout.",
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
              cost: "$44 to $88 a product, read 16 September 2026.",
              visitHref: "/go/edible-beauty-skin-hub",
              highlight: "Free shipping over $110, read 4 September 2026. A starter set was listed at $58.50.",
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
              highlight: "Sold direct in Australia and priced in A$, so the figure you see is the figure you pay.",
              visitLabel: "View Foreo pricing",
              earns: true,
              earnAction: "buy from",
            },
            {
              name: "Technogym",
              href: "/technogym",
              hrefLabel: "Read our Technogym guide",
              suits: "Buyers at the premium end of home exercise equipment who want the price before the showroom.",
              how: "Sells home equipment direct, with Australian prices published on its own site.",
              cost: "A$4,460 for the Bench to A$20,490 for the Run, read 16 September 2026.",
              visitHref: "/go/technogym-health-hub",
              highlight: "Prices are published, so you can compare without booking a showroom visit.",
              visitLabel: "View Technogym pricing",
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
              highlight: "Nine flavours in the Classic line and three in Platinum, all in 21-meal boxes.",
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
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Every guide in this section</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Grouped by what each one decides. The nutrition side of this section is covered on the{" "}
            <Link href="/optislim" className="font-semibold text-[#007a95] hover:underline">OptiSlim page</Link>, which
            sets out what the food regulator requires of a very low energy diet.
          </p>
          <GuideGrid guides={guides} />
        </section>

        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
              Common questions
            </h2>
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
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
              Other categories
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
              Every one of these has its comparisons in place. Sleep and longevity each gained their first partner in September 2026.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {OTHER.map((o) => (
                <li key={o.href}>
                  <Link href={o.href} className="group flex items-center gap-3 rounded-xl border border-[#ded8cd] bg-white p-3 text-sm font-semibold text-[#14120f] transition-colors hover:border-[#14120f] hover:text-[#007a95]">
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
          <div className="mt-12">
            <NewsletterSignup variant="band" />
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
