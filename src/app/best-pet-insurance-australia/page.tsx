import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { KNOSE_URL, PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";

export const metadata = generateSEOMetadata(seoConfig.bestPetInsurance);

const SLUG = "/best-pet-insurance-australia";
const UPDATED = "2026-08-17";

// Deliberately NOT a ranked list. We publish no star ratings, and we cannot
// rank two providers on cover when only one publishes its limits. The page
// ranks the DECISION CRITERIA instead, which is the part a reader can act on.
const criteria: { h: string; p: string }[] = [
  {
    h: "The benefit percentage",
    p: "This is the share of the eligible vet bill the insurer pays before your excess comes off. 80% is common in Australia, which means a $6,000 surgery leaves you roughly $1,200 plus the excess. A higher percentage generally costs more each month, so it is a trade rather than a straight upgrade.",
  },
  {
    h: "The annual benefit limit",
    p: "The most the policy pays in a year. Test it against a realistic worst case rather than an average year: a single cruciate ligament repair or a snake bite can run into thousands, and an entry limit disappears quickly. The limit matters more than almost any other number on the page.",
  },
  {
    h: "Hereditary and congenital conditions",
    p: "Breed-linked conditions are where policies diverge most. Many entry policies exclude them outright, and those that include them often apply a separate annual sub-limit well below the headline limit. If you have a breed with known predispositions, this single line can decide which policy is worth buying.",
  },
  {
    h: "Waiting periods",
    p: "The time before you can claim. They differ by condition type, and cruciate ligament conditions usually carry a much longer one. If you are switching providers, ask whether waiting periods are waived for continuous cover, because some insurers do waive them.",
  },
  {
    h: "The excess, and how it moves the premium",
    p: "You usually choose from a small set of excess amounts. A higher excess lowers the monthly premium and raises what you pay per claim. Pick the one you could actually absorb on the day your pet needs surgery, not the one that makes the monthly figure look best.",
  },
  {
    h: "Pre-existing conditions",
    p: "Excluded by every Australian pet insurer, and the most common reason a claim is declined. Anything showing signs before cover started, or during a waiting period, is generally out. This is the strongest argument for insuring a pet while young and healthy rather than after a diagnosis.",
  },
];

const providers = [
  {
    name: "PetsOnMe",
    href: "/petsonme",
    published: "Three plans: Accidental ($5,000 annual limit), Classic ($10,000, hereditary to $2,300pa) and Deluxe ($20,000, hereditary to $3,800pa, select dental to $500pa). All pay 80% of the eligible bill, with a $100, $200 or $300 excess. Underwritten by Pacific International Insurance.",
    offer: `Code ${PETSONME_CODE} upgrades the pet care services discount from 12% to 15%, which applies to services such as walking and grooming rather than the premium.`,
    cta: { label: "Compare PetsOnMe cover", href: PETSONME_URL },
  },
  {
    name: "Knose",
    href: "/knose",
    published: "Knose does not publish its cover levels, limits or benefit percentage on its public pages, so we do not restate them here. The detail sits in its Product Disclosure Statement, and the quote flow shows what applies to your pet.",
    offer: "Code referlab2mf gives new customers 2 months free when they take out a policy through our link.",
    cta: { label: "Get a Knose quote", href: KNOSE_URL },
  },
];

const faqs = [
  {
    q: "What is the best pet insurance in Australia?",
    a: "There is no single best policy, and any page that names one without knowing your pet is guessing. The right cover depends on your pet's breed and age, whether hereditary conditions are a realistic risk, the annual limit you would need in a bad year, and the excess you could absorb on the day. What you can do is compare on the same six things every time: benefit percentage, annual limit, hereditary and congenital cover, waiting periods, excess, and what is excluded. We compare PetsOnMe and Knose, and we publish no star ratings of our own.",
  },
  {
    q: "Does Refer Labs rank pet insurers?",
    a: "No, and we will not invent a ranking. We cover two providers, one of which publishes its cover levels and one of which does not, so a like-for-like table would tell you less than it appears to. We rank the decision criteria instead, because that is the part you can actually apply to your own pet. Refer Labs is not an insurer, broker or financial adviser.",
  },
  {
    q: "How much does pet insurance cost in Australia?",
    a: "Neither provider we cover publishes premiums, because the price is calculated from your pet's species, breed and age, your postcode and the excess you choose. Any figure quoted without those inputs is a guess. Get a quote from each provider with the same excess and cover level so you are comparing on equal terms.",
  },
  {
    q: "Is it worth insuring an older pet?",
    a: "It depends on what is already on the record. Pre-existing conditions are excluded, so a policy taken out after a diagnosis will not cover that condition, and premiums rise with age. Some insurers also cap the age at which a pet can first be enrolled. If your pet is older and healthy, cover can still be worthwhile for the unexpected, but read the age limits and exclusions before you assume it applies.",
  },
  {
    q: "What is the single biggest mistake when choosing pet insurance?",
    a: "Comparing monthly premiums first. The premium is the one number that is easy to compare and the least useful on its own, because it says nothing about the annual limit, the benefit percentage or whether your breed's likely conditions are covered. Compare what the policy pays out in a bad year, then compare the price of the ones that would actually help.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "Best Pet Insurance Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pet insurance providers compared by Refer Labs",
  description:
    "The Australian pet insurance providers Refer Labs covers, with what each publishes about cover and the current offer. Not a ranking: Refer Labs publishes no star ratings.",
  numberOfItems: providers.length,
  itemListElement: providers.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: p.published,
    url: `${SITE_URL}${p.href}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestPetInsurance.title,
  description: seoConfig.bestPetInsurance.description,
  url: seoConfig.bestPetInsurance.url,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function BestPetInsuranceAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/pet-insurance" className="transition-colors hover:text-[#10251b]">Pet insurance</Link>
          <span>/</span>
          <span className="text-[#10251b]">Best pet insurance</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Pet insurance · Australia</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
          Best pet insurance in Australia: how to actually choose
        </h1>
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        {/* Answer-first */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">What is the best pet insurance in Australia?</h2>
          <div className="mt-4 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] px-6 py-5">
            <p className="text-[15px] leading-relaxed text-[#2b362f]">
              There is no single best policy, and a page that names one without knowing your pet is guessing. What
              decides it is your pet&apos;s breed and age, whether hereditary conditions are a realistic risk, the
              annual limit you would need in a bad year, and the excess you could absorb on the day. Compare on the same
              six things every time: benefit percentage, annual limit, hereditary and congenital cover, waiting periods,
              excess, and exclusions. Below is how to read each one, and what the two providers we cover publish.
            </p>
          </div>
        </section>

        <p className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">General information only.</span> Refer Labs is not an insurer,
          broker or financial adviser. Nothing here is a recommendation or personal financial advice, and we publish no
          star ratings of our own. Read each Product Disclosure Statement and Target Market Determination before
          deciding. This page contains disclosed affiliate links.
        </p>

        {/* Criteria */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">The six things that decide what you get back</h2>
          <div className="mt-6 space-y-7">
            {criteria.map((c, i) => (
              <div key={c.h}>
                <h3 className="text-[17px] font-bold text-[#10251b]">
                  <span className="mr-2 text-[#0a7c42]">{i + 1}.</span>{c.h}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{c.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Providers */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">The providers we cover</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Two, both Australian. We show what each publishes rather than filling gaps: one sets out its cover levels
            openly, the other keeps the detail in its Product Disclosure Statement, and pretending otherwise would make
            a comparison table look more useful than it is.
          </p>
          <div className="mt-6 grid gap-5">
            {providers.map((p) => (
              <div key={p.name} className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-extrabold text-[#10251b]">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{p.published}</p>
                <p className="mt-3 rounded-lg border border-[#cfe6da] bg-[#e8f5ee] px-4 py-3 text-sm leading-relaxed text-[#2b362f]">
                  <span className="font-semibold text-[#10251b]">Current offer. </span>{p.offer}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a href={p.cta.href} target="_blank" rel="nofollow sponsored" data-cta={`best-pet-${p.name.toLowerCase()}`} className="nw-btn justify-center">
                    {p.cta.label} <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link href={p.href} className="text-sm font-semibold text-[#10251b] underline decoration-[#cdd5cf] underline-offset-4 hover:decoration-[#0a7c42]">
                    Read our {p.name} page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">Common questions</h2>
          <div className="mt-5 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e5e9e7] pt-8 text-sm">
          <Link href="/what-pet-insurance-covers-australia" className="nw-link">What pet insurance covers</Link>
          <Link href="/petsonme" className="nw-link">PetsOnMe: cover &amp; code</Link>
          <Link href="/knose" className="nw-link">Knose: 2 months free</Link>
          <Link href="/pet-insurance" className="nw-link">The pet insurance hub</Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#9aa39c]">
          Published by Refer Labs. This page contains disclosed affiliate links to PetsOnMe and Knose, which pay us a
          commission if you take out a policy through them, at no extra cost to you. Commission never changes what we
          write, and a provider cannot pay to be described more favourably than the facts support. Cover details are
          taken from each provider&apos;s own published pages and were checked on 17 August 2026; terms change, so
          confirm current cover, limits and waiting periods in the Product Disclosure Statement before you buy.
        </p>
      </main>
    </ConsumerShell>
  );
}
