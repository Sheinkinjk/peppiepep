import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.sleep);

const SLUG = "/sleep";

const guides = [
  {
    href: "/sleep/do-i-have-sleep-apnoea",
    title: "Do I have sleep apnoea?",
    desc: "How it is diagnosed here, and how to make the GP appointment count.",
  },
  {
    href: "/sleep/home-sleep-test-australia-cost",
    title: "Home sleep studies and cost",
    desc: "Home versus lab testing, how referral works, and where Medicare applies.",
  },
  {
    href: "/sleep/cpap-machine-costs-australia",
    title: "What CPAP costs",
    desc: "Verified Australian prices, plus the ongoing consumables people forget.",
  },
  {
    href: "/sleep/mattress-comparison-australia",
    title: "Comparing mattresses properly",
    desc: "What the specifications mean, and how trial periods work.",
  },
  {
    href: "/sleep/sleep-tracker-comparison-australia",
    title: "What sleep trackers measure",
    desc: "The gap between a consumer wearable and a clinical study.",
  },
  {
    href: "/sleep/how-much-does-good-sleep-cost",
    title: "What good sleep costs",
    desc: "The free changes worth trying first, and where spending helps.",
  },
];

const faqs = [
  {
    q: "How do I find out if I have sleep apnoea in Australia?",
    a: "Through a GP, who will ask about your symptoms and sleep history and can refer you for a sleep study if it is warranted. A sleep study, done at home or in a lab, is what produces a diagnosis. No website, app or wearable can diagnose sleep apnoea, and any that claims to should be treated with suspicion. Our guide sets out the pathway and how to prepare for that first appointment.",
  },
  {
    q: "Does Medicare cover a sleep study in Australia?",
    a: "Medicare rebates exist for sleep studies where the eligibility criteria are met and the study is properly referred. Whether you have anything to pay depends on the provider, whether they bulk bill, and which item number applies. Rebate amounts are set in the Medicare Benefits Schedule and change over time, so confirm the current figure for your item on MBS Online rather than relying on a number quoted elsewhere.",
  },
  {
    q: "How much does a CPAP machine cost in Australia?",
    a: "More than most people expect, and the manufacturer is not always the cheapest. The ResMed AirSense 11 AutoSet listed at AUD $1,699 on ResMed's own Australian store and AUD $1,425 at retailer CPAP Online Australia, both checked 19 August 2026. Masks, tubing and filters are replaced regularly on top of that, so the first-year cost is higher than the machine price alone.",
  },
  {
    q: "Are sleep trackers accurate?",
    a: "They are reasonable at telling you roughly when you were asleep and are much weaker at the things people read most into, such as sleep stages. A consumer wearable estimates from movement and heart rate; a clinical sleep study measures breathing, oxygen and brain activity directly. A tracker can be a useful prompt to see someone. It is not a substitute for a diagnosis and does not claim to be one.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Yes, from one: Emma Sleep, through Commission Factory, since 16 September 2026. We earn a commission if you buy a mattress after following our link, at no extra cost to you, and the page carrying that link says so beside it. We hold no Emma discount code. Emma is deliberately kept off the clinical pages in this section, covering sleep apnoea, home sleep testing and CPAP costs, because a mattress is not a response to a diagnosis and a commission link there would imply it is. What we earn changes nothing about what these guides say.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sleep", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sleep guides",
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
  name: seoConfig.sleep.title,
  description: seoConfig.sleep.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function SleepHub() {
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
            <span className="text-[#2b362f]">Sleep</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Sleep in Australia: <span className="italic text-[#0a7c42]">the medical route and the retail one</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Sleep splits cleanly into two problems that get treated as one. If something clinical is going on, the
              answer is a diagnosis and no purchase will substitute for it. If it is not, you are in a retail market
              where the prices are high and the claims are loose. These guides separate the two.
            </p>
          </div>
          <AffiliateDisclosure compact className="mt-4 max-w-3xl" />
        </section>

        {/* Emma is the first commercial partner in this section (16 Sep 2026),
            which is why the Coming Soon note is gone: it told readers nothing
            here pays us, and that stopped being true. The placement sits in the
            retail half of the hub on purpose. check-partner-scope denies Emma on
            /sleep/do-i-have-sleep-apnoea, /sleep/home-sleep-test-australia-cost
            and /sleep/cpap-machine-costs-australia, because a mattress link
            beside a clinical page would imply a mattress answers a diagnosis. */}
        <PartnerRoute
          className="mt-10"
          heading="The retailer we have an arrangement with"
          intro="One mattress brand, and the only one in this section we earn from. It sits on the retail side of the split above: if you think something clinical is going on, a mattress is not the answer and no link here changes that."
          providers={[
            {
              name: "Emma Sleep",
              href: "/go/emma-sleep-hub",
              what: "Mattresses and bundles from $569, with a 150-night trial. Every mattress was listed at a discount when we read the site on 16 September 2026, so compare the price you pay rather than the struck-through one.",
              checked: "16 September 2026",
            },
          ]}
        />

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
              <li><Link href="/health-and-beauty" className="text-[#0a7c42] hover:underline">Skin &amp; beauty</Link></li>
              <li><Link href="/weight-loss" className="text-[#0a7c42] hover:underline">Weight loss</Link></li>
              <li><Link href="/hair-loss" className="text-[#0a7c42] hover:underline">Hair loss</Link></li>
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
