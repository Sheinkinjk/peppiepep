import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.forBusiness);

const CALENDLY = "https://calendly.com/jarred-referlabs/30min";

const offers = [
  {
    tag: "Partnerships",
    title: "Get your product featured",
    body: "Our comparisons reach Australians at the exact moment they are choosing a provider. If your product genuinely belongs in a category we cover, we should talk. Placement is always disclosed and never buys a ranking, which is precisely why the traffic converts.",
    cta: { label: "Enquire about partnership", href: "mailto:jarred@referlabs.com.au?subject=Partnership%20enquiry", external: true },
  },
  {
    tag: "Growth services",
    title: "Referral & affiliate programs, built and run",
    body: "We design, launch and actively distribute referral and affiliate programs for Australian and international businesses. Incentive design, tracking, channel activation and ongoing management, handled end to end.",
    cta: { label: "Enquire about growth services", href: "mailto:jarred@referlabs.com.au?subject=Growth%20services%20enquiry", external: true },
    links: [
      { href: "/comparison-website", label: "Get featured on Refer Labs" },
      { href: "/affiliate-programs-australia", label: "Affiliate programs in Australia" },
    ],
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Business", item: `${SITE_URL}/for-business` },
  ],
};

export default function ForBusinessPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">For business</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">For business</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Customers who have already <span className="italic text-[#0a7c42]">done the research</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Refer Labs helps Australians choose between providers. For businesses, that means two things: a place
              your product can be discovered by people ready to buy, and a team that builds referral and affiliate
              growth for a living.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0a7c42] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0a7c42]"
              >
                Book a call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:jarred@referlabs.com.au"
                className="text-sm font-semibold text-[#10251b] underline decoration-[#cdd5cf] underline-offset-4 hover:decoration-[#0a7c42]"
              >
                jarred@referlabs.com.au
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {offers.map((o) => (
              <div key={o.title} className="flex flex-col rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-7 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.2)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">{o.tag}</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-2xl">
                  {o.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#3d4b44] sm:text-[15px]">{o.body}</p>
                {o.links && (
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {o.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[#2b362f] underline decoration-[#cdd5cf] underline-offset-4 hover:text-[#0a7c42]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  {o.cta.external ? (
                    <a href={o.cta.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                      {o.cta.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link href={o.cta.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                      {o.cta.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm">
            <Link href="/blog" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4">
              Read our business insights →
            </Link>{" "}
            <span className="text-[#9aa39c]">Referral and affiliate strategy for founders and marketers.</span>
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
            One thing we will not sell: a ranking. Editorial conclusions on Refer Labs are never part of a commercial
            deal, and every partnership is disclosed to readers. That separation is what makes the audience worth
            reaching. The full policy is at{" "}
            <Link href="/about" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4">
              how we research
            </Link>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
