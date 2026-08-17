import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";

export const metadata = generateSEOMetadata(seoConfig.petsonme);

const SLUG = "/petsonme";
const GREEN = "#0a7c42";
const UPDATED = "2026-08-17";

// Every figure below is read off PetsOnMe's own compare-cover page (checked
// 17 August 2026). Nothing is estimated. Premiums are NOT published, so none
// are quoted here.
const plans: { name: string; limit: string; extra: string }[] = [
  { name: "Accidental", limit: "$5,000 annual benefit limit", extra: "Accidental injury cover only. The entry option." },
  { name: "Classic", limit: "$10,000 annual benefit limit", extra: "Adds hereditary conditions cover, limited to $2,300 a year." },
  { name: "Deluxe", limit: "$20,000 annual benefit limit", extra: "Hereditary conditions to $3,800 a year, plus select dental to $500 a year." },
];

const aff = { href: PETSONME_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "What does the REFERLABS code actually give me?",
    a: "It upgrades the discount on PetsOnMe's pet care services from the usual 12% to 15%, once you hold a policy. Those services are dog walking, dog minding, pet sitting, doggy day care, house sitting and grooming. It is worth being precise about this: the code is not a discount on the insurance premium itself. Enter REFERLABS when you take out the policy, and confirm the current terms with PetsOnMe.",
  },
  {
    q: "What do the PetsOnMe plans cover?",
    a: "PetsOnMe offers three levels. Accidental carries a $5,000 annual benefit limit and covers accidental injury. Classic carries $10,000 and adds hereditary conditions cover limited to $2,300 a year. Deluxe carries $20,000, with hereditary conditions to $3,800 a year and select dental to $500 a year. All three pay 80% of the eligible vet bill less your chosen excess. Figures are from PetsOnMe's own compare-cover page, checked 17 August 2026.",
  },
  {
    q: "How much does PetsOnMe cost?",
    a: "PetsOnMe does not publish premiums, because the price depends on your pet's species, breed, age and your postcode, along with the excess you choose. You can pick a $100, $200 or $300 excess, and a higher excess generally means a lower premium. The only way to get a real figure is a quote for your own pet.",
  },
  {
    q: "Is there a waiting period with PetsOnMe?",
    a: "Standard waiting periods apply to new policies and are set out in the PDS. PetsOnMe states that it waives its waiting periods if you are switching and have held continuous cover elsewhere for a year or more without interruption. Waiting periods are one of the details worth reading closely before you switch anything, so check the PDS for the periods that apply to your pet.",
  },
  {
    q: "Who underwrites PetsOnMe?",
    a: "The product is underwritten by Pacific International Insurance Pty Ltd (ABN 83 169 311 193) and distributed by Pets On Me Insurance Pty Limited (ABN 42 650 975 554). The underwriter is the party that actually carries the risk and pays claims, which is worth knowing for any insurance product.",
  },
  {
    q: "Is Refer Labs recommending PetsOnMe?",
    a: "No. Refer Labs is not an insurer, a broker or a financial adviser. This page is general information and a referral, not a recommendation or personal financial advice. Whether any policy suits you depends on your own circumstances, your pet and what you need covered. Read the Product Disclosure Statement and the Target Market Determination before deciding.",
  },
  {
    q: "How does Refer Labs make money from this?",
    a: "PetsOnMe pays Refer Labs a commission if you take out a policy after coming through this page, at no extra cost to you. That is how the research here is funded. It does not change what we write, and it does not buy a ranking: a provider cannot pay to be described more favourably than the facts support.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "PetsOnMe", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.petsonme.title,
  description: seoConfig.petsonme.description,
  url: seoConfig.petsonme.url,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

function Cta({ label, loc }: { label: string; loc: string }) {
  return (
    <a {...aff} data-cta={loc} className="nw-btn justify-center">
      {label} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function PetsOnMePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/pet-insurance" className="transition-colors hover:text-[#10251b]">Pet insurance</Link>
          <span>/</span>
          <span className="text-[#10251b]">PetsOnMe</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Pet insurance · Australia</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
          PetsOnMe pet insurance: the cover, and what the REFERLABS code gives you
        </h1>
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />
        <p className="mt-5 text-base leading-relaxed text-[#3d4b44] sm:text-lg">
          PetsOnMe is an Australian pet insurance provider offering three levels of cover, all paying 80% of the
          eligible vet bill less your excess. This page sets out what each plan includes, what the code does and does
          not do, and what to check before you buy. It is general information, not financial advice.
        </p>

        {/* Answer-first: what the code gives, stated precisely. */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">What does the REFERLABS code give you?</h2>
          <div className="mt-4 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] px-6 py-5">
            <p className="text-[15px] leading-relaxed text-[#2b362f]">
              It upgrades the discount on PetsOnMe&apos;s pet care services from the usual 12% to 15% once you hold a
              policy, covering dog walking, dog minding, pet sitting, doggy day care, house sitting and grooming. To be
              precise, because it matters: this is a discount on those services, not on the insurance premium. Enter{" "}
              <strong className="font-semibold text-[#10251b]">{PETSONME_CODE}</strong> when you take out the policy.
            </p>
          </div>
        </section>

        <div className="mt-6">
          <Cta label={`Compare PetsOnMe cover (code ${PETSONME_CODE})`} loc="petsonme-hero" />
        </div>

        <p className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">General information only.</span> Refer Labs is not an insurer,
          broker or financial adviser, and nothing here is a recommendation or personal financial advice. Read the
          Product Disclosure Statement and Target Market Determination before deciding. This page contains a disclosed
          affiliate link.
        </p>

        {/* Plans */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">The three PetsOnMe plans</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            All three pay 80% of the eligible vet bill less your chosen excess, with excess options of $100, $200 or
            $300. What changes between them is the annual limit and what sits inside it. Figures are from
            PetsOnMe&apos;s own compare-cover page, checked 17 August 2026.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-[#e5e9e7]">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-[#f5f8f6]">
                  <th className="px-4 py-3 text-left font-semibold text-[#3d4b44]">Plan</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#3d4b44]">Annual benefit limit</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#3d4b44]">What it adds</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.name} className="border-t border-[#e5e9e7] align-top">
                    <td className="px-4 py-3 font-bold text-[#10251b]">{p.name}</td>
                    <td className="px-4 py-3 text-[#2b362f]">{p.limit}</td>
                    <td className="px-4 py-3 text-[#3d4b44]">{p.extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
            PetsOnMe does not publish premiums: the price depends on your pet&apos;s species, breed and age, your
            postcode and the excess you pick, so a quote is the only real figure. Limits and terms can change, so
            confirm current cover in the PDS.
          </p>
        </section>

        {/* What to check */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">What to check before you buy</h2>
          <ul className="mt-4 grid gap-2.5">
            {[
              "The benefit percentage. PetsOnMe pays 80% of the eligible bill, so you carry the remaining 20% plus the excess.",
              "The annual limit against your realistic worst case, not the average year. One cruciate surgery can consume a $5,000 limit.",
              "Hereditary and congenital conditions, which carry their own sub-limits here and are excluded entirely on many entry policies.",
              "Waiting periods in the PDS, and whether yours are waived because you are switching with 12 months of continuous cover.",
              "Pre-existing conditions, which are excluded by every Australian pet insurer and are the most common reason a claim is declined.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                  <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-12">
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

        <div className="mt-10 rounded-2xl border px-6 py-7 text-center" style={{ borderColor: `${GREEN}30`, background: `${GREEN}08` }}>
          <h2 className="text-lg font-bold text-[#10251b] sm:text-xl">Get a PetsOnMe quote</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">
            Premiums depend on your pet and postcode, so a quote is the only real figure. Enter code{" "}
            <strong className="text-[#10251b]">{PETSONME_CODE}</strong> when you take out the policy for the upgraded
            15% pet care services discount.
          </p>
          <div className="mt-5 flex justify-center">
            <Cta label="Compare PetsOnMe cover" loc="petsonme-closing" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e5e9e7] pt-8 text-sm">
          <Link href="/best-pet-insurance-australia" className="nw-link">How to choose pet insurance</Link>
          <Link href="/pet-insurance" className="nw-link">Compare pet insurance</Link>
          <Link href="/what-pet-insurance-covers-australia" className="nw-link">What pet insurance covers</Link>
          <Link href="/knose" className="nw-link">Knose: the offer</Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#9aa39c]">
          This page is published by Refer Labs and contains a disclosed affiliate link. PetsOnMe pays us a commission if
          you take out a policy through it, at no extra cost to you, and it never changes what we write. The product is
          underwritten by Pacific International Insurance Pty Ltd (ABN 83 169 311 193) and distributed by Pets On Me
          Insurance Pty Limited (ABN 42 650 975 554). Cover details are from PetsOnMe&apos;s own compare-cover page,
          checked 17 August 2026, and can change: confirm current terms, limits and waiting periods in the Product
          Disclosure Statement before you buy.
        </p>
      </main>
    </ConsumerShell>
  );
}
