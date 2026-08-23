import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { KNOSE_URL, PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import InsuranceDisclosure from "@/components/consumer/InsuranceDisclosure";

export const metadata = generateSEOMetadata(seoConfig.petInsurance);

const SLUG = "/pet-insurance";
const UPDATED = "2026-08-04";

// Dimensions pet policies differ on. Purely descriptive (what the terms mean),
// not a recommendation or a "how to choose the best" ranking.
const DIMENSIONS: { h: string; p: string }[] = [
  { h: "Cover type", p: "Policies range from accident-only, to accident and illness, to more comprehensive cover that may include optional routine-care add-ons. What is and isn't included is set out in each insurer's Product Disclosure Statement (PDS)." },
  { h: "Waiting periods", p: "Most policies apply a waiting period before you can claim, which can differ for accidents, illnesses and specific conditions. The exact periods are in the PDS." },
  { h: "Exclusions", p: "Pre-existing conditions are commonly excluded, and other exclusions vary by insurer. Read the PDS to see what a policy will not pay for." },
  { h: "Excess and benefit percentage", p: "Many policies let you choose an excess, and reimburse a percentage of the eligible vet bill. Both affect your premium and what you get back." },
  { h: "Annual and sub-limits", p: "Cover is usually capped by an annual limit, and sometimes by sub-limits for particular conditions. These caps determine the most a policy can pay in a year." },
];

const faqs = [
  {
    q: "Is Refer Labs recommending a pet insurance policy?",
    a: "No. Refer Labs is not an insurer, broker or financial adviser. We provide general information and refer you to the provider. Nothing on this page is a recommendation or personal financial advice, and whether a policy suits you depends on your own circumstances.",
  },
  {
    q: "What does pet insurance generally cover?",
    a: "It depends entirely on the policy. Cover can range from accidents only, to accidents and illness, to more comprehensive options with optional routine-care add-ons. Waiting periods, exclusions (such as pre-existing conditions), excess, benefit percentages and annual limits all vary. The insurer's Product Disclosure Statement sets out exactly what is and isn't covered.",
  },
  {
    q: "How does Refer Labs make money from this page?",
    a: "We may receive a commission or referral fee if you take up an offer through our links, at no extra cost to you. This does not change what we publish, and we do not provide advice or recommend any policy.",
  },
  {
    q: "What should I read before buying pet insurance?",
    a: "Read the insurer's Product Disclosure Statement (PDS) and Target Market Determination (TMD), and get a quote for your specific pet, so you can see the cover, waiting periods, exclusions, excess and limits that would apply. Consider your own circumstances before deciding.",
  },
  {
    q: "How much does pet insurance cost per month in Australia?",
    a: "Premiums vary widely by species, breed, age, location and the level of cover, so there is no single figure. Cats generally cost less than dogs, accident-only cover is the cheapest tier, and premiums usually rise as a pet gets older. The only accurate number is a quote for your specific pet.",
  },
  {
    q: "What age should I insure my pet, and is there an age limit?",
    a: "Insurers set their own minimum age, often around eight weeks, and many apply an upper age limit for taking out a new policy, particularly for illness cover. Insuring a pet while it is young and healthy means fewer conditions are later treated as pre-existing. Once a pet is insured, policies are generally renewable as it ages.",
  },
  {
    q: "Is pet insurance worth it?",
    a: "That depends on your finances and how you would handle a large, unexpected vet bill, which can run into thousands for surgery or serious illness. Insurance trades a known premium for help with those costs, after any excess and exclusions. Some owners self-fund by saving instead. Your own situation decides it; this is general information, not advice.",
  },
  {
    q: "Is pet insurance tax deductible in Australia?",
    a: "For a family pet, generally no. Pet insurance and vet bills are treated as a private expense. Costs may be deductible only where an animal genuinely helps earn income, such as a working farm dog, and the ATO applies its own tests. This is general information, not tax advice.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}${SLUG}` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Pet Insurance in Australia",
  description: seoConfig.petInsurance.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function PetInsurancePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#10251b]">Pet insurance</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <p className="nw-kicker">Australia · General information</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
              Pet insurance in Australia
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
              Pet insurance helps with the cost of vet care for accidents and illness. Policies differ a lot on what
              they cover, waiting periods, exclusions, excess and annual limits, so the detail that matters is in each
              insurer&apos;s Product Disclosure Statement. This page is general information to help you understand the
              terms, plus current offers we can refer you to. It is not advice and not a recommendation.
            </p>
            <EditorialMeta lastUpdated={UPDATED} className="mt-4" />
          </header>

          {/* Prominent current offer: Knose */}
          <section className="mb-10">
            <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#e8f5ee] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/knose.svg" alt="Knose logo" width={160} height={62} className="h-9 w-auto" />
                <span className="rounded-full bg-[#0a7c42] px-4 py-1.5 text-sm font-bold text-white">2 months free</span>
              </div>
              <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.01em] text-[#10251b] sm:text-[1.7rem]">
                New customers: 2 months free on Knose pet insurance
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
                Use the code <strong className="text-[#10251b]">referlab2mf</strong> through our link. Cover, waiting
                periods, exclusions and limits are in Knose&apos;s PDS, so get a quote to see what would apply to your pet.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={KNOSE_URL}
                  target="_blank"
                  rel="nofollow sponsored"
                  data-cta="pet-insurance-knose-offer"
                  className="nw-btn"
                >
                  Get a Knose quote (2 months free) <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/knose" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                  More about the Knose offer
                </Link>
              </div>
            </div>
          </section>

          {/* Second provider: PetsOnMe. Kept factual and even-handed, and the code is
              stated precisely because it discounts pet care services, not the premium. */}
          <section className="mb-10">
            <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/petsonme.svg" alt="PetsOnMe logo" width={161} height={45} className="h-9 w-auto" />
                <span className="rounded-full border border-[#cfe6da] bg-[#e8f5ee] px-4 py-1.5 text-sm font-bold text-[#0a7c42]">
                  Three cover levels
                </span>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-[#3d4b44]">
                PetsOnMe publishes its cover levels openly: Accidental ($5,000 annual limit), Classic ($10,000, with
                hereditary conditions to $2,300 a year) and Deluxe ($20,000, hereditary to $3,800 and select dental to
                $500). All three pay 80% of the eligible vet bill less a $100, $200 or $300 excess. Underwritten by
                Pacific International Insurance.
              </p>
              <p className="mt-3 rounded-lg border border-[#cfe6da] bg-[#e8f5ee] px-4 py-3 text-sm leading-relaxed text-[#2b362f]">
                <span className="font-semibold text-[#10251b]">The code. </span>
                <strong className="text-[#10251b]">{PETSONME_CODE}</strong> upgrades the discount on PetsOnMe&apos;s pet
                care services, such as walking, minding and grooming, from 12% to 15%. It is a discount on those
                services, not on the insurance premium.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={PETSONME_URL}
                  target="_blank"
                  rel="nofollow sponsored"
                  data-cta="pet-insurance-petsonme-offer"
                  className="nw-btn"
                >
                  Compare PetsOnMe cover <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/petsonme" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                  More about PetsOnMe
                </Link>
              </div>
            </div>
            <p className="mt-4 text-[13px] text-[#6e7b74]">
              Weighing them up? See{" "}
              <Link href="/knose-vs-petsonme" className="nw-link">Knose vs PetsOnMe side by side</Link>, or our{" "}
              <Link href="/best-pet-insurance-australia" className="nw-link">guide to choosing pet insurance</Link>,
              which sets out the six things that decide what you actually get back. Both are underwritten by the same
              insurer, which is worth knowing first:{" "}
              <Link href="/who-underwrites-pet-insurance-australia" className="nw-link">who underwrites which brand</Link>.
            </p>
          </section>

          <InsuranceDisclosure className="mb-12" />

          {/* What policies differ on (factual) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What pet policies differ on</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
              These are the things to read and compare in any insurer&apos;s PDS. They are explained here so the terms
              are clear, not to steer you toward any particular policy.
            </p>
            <div className="mt-6 space-y-5">
              {DIMENSIONS.map((d) => (
                <div key={d.h} className="border-t border-[#e5e9e7] pt-5">
                  <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#10251b]">
                    <Check className="h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" /> {d.h}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#3d4b44]">{d.p}</p>
                </div>
              ))}
            </div>
            <Link href="/what-pet-insurance-covers-australia" className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
              Read the full explainer on what pet insurance covers <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
            <div className="mt-6 divide-y divide-[#e5e9e7] border-t border-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="font-bold text-[#10251b]">{f.q}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <InsuranceDisclosure className="mb-16" />
        </div>
      </main>
    </ConsumerShell>
  );
}
