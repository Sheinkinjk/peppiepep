import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";

export const metadata = generateSEOMetadata(seoConfig.about);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

// The author/editor entity (E-E-A-T). Referenced as `author` on guide Article
// schema across the site via this stable @id. Only verified facts here; add a
// LinkedIn/X URL to `sameAs` when available to strengthen the entity.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#jarred-krowitz`,
  name: "Jarred Krowitz",
  jobTitle: "Founder and Editor",
  worksFor: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  url: `${SITE_URL}/about`,
  email: "jarred@referlabs.com.au",
  nationality: "Australian",
  description:
    "Founder and editor of Refer Labs, an independent Australian comparison platform. Researches and edits the site's comparisons across health services, software and business tools.",
  // sameAs: ["https://www.linkedin.com/in/..."]  // add profile URLs when available
};

export default function AboutPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">About</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">About Refer Labs</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          A better way to decide
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Refer Labs is an Australian comparison platform. We help people choose between health services, software and
          tools, and we help good businesses reach those people at the moment they are ready to buy.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
              Why we exist
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#2b362f]">
              Every category worth spending money on has been buried under content designed to rank, not to help. Search
              &ldquo;best weight loss telehealth&rdquo; or &ldquo;which website builder&rdquo; and you get pages that
              recommend whoever pays the most, dressed up as advice. We are building the opposite: a place where the
              research is done honestly, the recommendation would survive the brand reading it, and the funding model is
              disclosed rather than disguised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
              How it works, in one line
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#2b362f]">
              Consumers read our comparisons for free. Some links earn us a commission, disclosed on the page.
              Businesses partner with us to reach qualified buyers. The one thing that is never for sale is the ranking,
              because the moment it is, the audience stops trusting the page and the whole thing collapses. That
              constraint is the business model, not a compromise on it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
              Where we started, where we are going
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#2b362f]">
              We began by researching affiliate and referral programs for businesses, work that still runs through our
              For Business arm. That taught us where the good offers were and how customers actually find them. The
              natural next step was to build the destination those customers arrive at. We are covering categories one
              at a time, going deep before going wide, until Refer Labs is the first place Australians check before a
              purchase decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
              Who runs it
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#2b362f]">
              Refer Labs is founded and run by Jarred Krowitz, based in Australia, who personally researches and edits
              the comparisons published here. Every guide is written and reviewed by a person who read the fine print,
              not generated and left unchecked. If you have found an error, want to partner, or just want to argue with a
              conclusion, the door is open at{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link href="/guides" className="group flex items-center justify-between rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 transition-all hover:border-[#0a7c42]/40">
            <div>
              <p className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">Browse the guides</p>
              <p className="mt-1 text-sm text-[#3d4b44]">Every comparison in one place.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/for-business" className="group flex items-center justify-between rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 transition-all hover:border-[#0a7c42]/40">
            <div>
              <p className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">For business</p>
              <p className="mt-1 text-sm text-[#3d4b44]">Partnerships, growth services, the Blueprint.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
