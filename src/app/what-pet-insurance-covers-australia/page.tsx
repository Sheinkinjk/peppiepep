import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import InsuranceDisclosure from "@/components/consumer/InsuranceDisclosure";

export const metadata = generateSEOMetadata(seoConfig.whatPetInsuranceCovers);

const SLUG = "/what-pet-insurance-covers-australia";
const UPDATED = "2026-08-04";

const SECTIONS: { h: string; p: string }[] = [
  { h: "Accident-only cover", p: "The most basic level. It helps with vet costs from accidental injuries, such as a broken bone or a snake bite, but not illness. It is usually the cheapest option and the narrowest." },
  { h: "Accident and illness cover", p: "The most common level. It adds cover for illnesses such as infections, cancer or skin conditions, on top of accidents. What counts as an eligible illness, and any conditions treated differently, are defined in the PDS." },
  { h: "Comprehensive and routine-care add-ons", p: "Some insurers offer higher tiers or optional extras that may contribute to routine or preventative costs like vaccinations or dental. These add-ons increase the premium and have their own limits." },
  { h: "Waiting periods", p: "The time after your policy starts before you can claim. Accidents often have a short waiting period, while illnesses and certain conditions (such as cruciate ligament issues) can have longer ones. The exact periods are in the PDS." },
  { h: "Exclusions", p: "What a policy will not pay for. Pre-existing conditions, meaning issues that existed before the policy or during a waiting period, are commonly excluded, as are pregnancy, breeding and elective procedures. Other exclusions vary by insurer and are listed in the PDS." },
  { h: "Excess", p: "The amount you contribute to a claim before the insurer pays. Many policies let you choose your excess; a higher excess usually means a lower premium, and vice versa." },
  { h: "Benefit percentage", p: "The share of the eligible vet bill the insurer reimburses, often something like 70% to 90% after any excess. A higher percentage generally costs more." },
  { h: "Annual and sub-limits", p: "The most a policy pays in a year (the annual limit), and sometimes caps for specific conditions (sub-limits). These determine the ceiling on what you can claim back." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "What Pet Insurance Covers", item: `${SITE_URL}${SLUG}` },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What pet insurance covers in Australia",
  description: seoConfig.whatPetInsuranceCovers.description,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  dateModified: UPDATED,
  publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "How does a pet insurance claim work?",
    a: "Most cover in Australia works by reimbursement: you pay the vet, then submit the invoice as a claim, and the insurer pays back the eligible share (the benefit percentage) after any excess, up to your annual and any sub-limits. Some vets can lodge on-the-spot claims so you pay only the gap. Waiting periods and exclusions still apply.",
  },
  {
    q: "Does pet insurance cover dental?",
    a: "Routine dental cleaning is generally treated as preventative and excluded from standard cover. Some comprehensive policies contribute to dental illness or accidental dental injury, often with their own sub-limit, and some insurers sell a routine-care add-on toward preventative dental. Which applies is set out in each insurer's PDS.",
  },
  {
    q: "Does pet insurance cover desexing, vaccinations and routine care?",
    a: "Standard accident and illness policies usually exclude preventative and elective items such as desexing, vaccinations and microchipping. Some insurers offer an optional routine-care add-on that contributes a set amount toward these each year for an extra premium. The included items and limits differ from insurer to insurer.",
  },
  {
    q: "Does pet insurance cover cruciate ligament surgery?",
    a: "It is commonly covered under accident and illness policies, but often carries a longer waiting period than other illnesses, and is excluded if signs appeared before cover started or during the waiting period. Some insurers can shorten that waiting period after a vet examination. Terms differ, so confirm them before you buy.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WhatPetInsuranceCoversPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
            <span>/</span>
            <Link href="/pet-insurance" className="transition-colors hover:text-[#10251b]">Pet insurance</Link>
            <span>/</span>
            <span className="text-[#10251b]">What it covers</span>
          </nav>

          <header className="pt-9 pb-6">
            <p className="nw-kicker">Australia · General information</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
              What pet insurance covers in Australia
            </h1>
            <EditorialMeta lastUpdated={UPDATED} className="mt-4" />
            <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
              Pet insurance is not one product. Cover levels, waiting periods, exclusions, excess and limits all vary by
              insurer, and the specifics that matter are always in the Product Disclosure Statement (PDS). Here is what
              each of those terms means, so you can read a policy for yourself. This is general information, not advice.
            </p>
          </header>

          <InsuranceDisclosure className="mb-10" />

          <section className="mb-12 space-y-6">
            {SECTIONS.map((s) => (
              <div key={s.h} className="border-t border-[#e5e9e7] pt-6">
                <h2 className="text-xl font-bold tracking-[-0.01em] text-[#10251b]">{s.h}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{s.p}</p>
              </div>
            ))}
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
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

          <section className="mb-14 rounded-2xl border border-[#cfe6da] bg-[#e8f5ee] p-6">
            <h2 className="text-lg font-extrabold text-[#10251b]">The one thing to do before buying</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              Get a quote for your specific pet and read the insurer&apos;s PDS and Target Market Determination. That is
              the only way to see the cover, waiting periods, exclusions, excess and limits that would actually apply.
            </p>
            <Link href="/pet-insurance" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
              See current pet insurance offers <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>

          <InsuranceDisclosure className="mb-16" />
        </div>
      </main>
    </ConsumerShell>
  );
}
