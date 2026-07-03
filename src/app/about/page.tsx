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

export default function AboutPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-[#22d3ee]">Refer Labs</Link>
          <span>/</span>
          <span className="text-white/70">About</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">About Refer Labs</p>
        <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.07] tracking-[-0.01em] text-white sm:text-5xl">
          A better way to decide
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/70">
          Refer Labs is an Australian comparison platform. We help people choose between health services, software and
          tools, and we help good businesses reach those people at the moment they are ready to buy.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white">
              Why we exist
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
              Every category worth spending money on has been buried under content designed to rank, not to help. Search
              &ldquo;best weight loss telehealth&rdquo; or &ldquo;which website builder&rdquo; and you get pages that
              recommend whoever pays the most, dressed up as advice. We are building the opposite: a place where the
              research is done honestly, the recommendation would survive the brand reading it, and the funding model is
              disclosed rather than disguised.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white">
              How it works, in one line
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
              Consumers read our comparisons for free. Some links earn us a commission, disclosed on the page.
              Businesses partner with us to reach qualified buyers. The one thing that is never for sale is the ranking,
              because the moment it is, the audience stops trusting the page and the whole thing collapses. That
              constraint is the business model, not a compromise on it.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white">
              Where we started, where we are going
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
              We began by researching affiliate and referral programs for businesses, work that still runs through our
              For Business arm. That taught us where the good offers were and how customers actually find them. The
              natural next step was to build the destination those customers arrive at. We are covering categories one
              at a time, going deep before going wide, until Refer Labs is the first place Australians check before a
              purchase decision.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-white">
              Who runs it
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
              Refer Labs is founded and run by Jarred Krowitz, based in Australia. If you have found an error, want to
              partner, or just want to argue with a conclusion, the door is open at{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#22d3ee] underline decoration-[#22d3ee]/40 underline-offset-4">
                jarred@referlabs.com.au
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link href="/guides" className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all hover:border-[#22d3ee]/40">
            <div>
              <p className="text-[15px] font-bold text-white group-hover:text-[#22d3ee]">Browse the guides</p>
              <p className="mt-1 text-sm text-white/55">Every comparison in one place.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#22d3ee] transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/for-business" className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all hover:border-[#22d3ee]/40">
            <div>
              <p className="text-[15px] font-bold text-white group-hover:text-[#22d3ee]">For business</p>
              <p className="mt-1 text-sm text-white/55">Partnerships, growth services, the Blueprint.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#22d3ee] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
