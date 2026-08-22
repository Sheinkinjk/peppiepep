import Link from "next/link";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";

const URL = `${SITE_URL}/how-we-make-money`;

export const metadata = generateSEOMetadata({
  title: "How Refer Labs Makes Money | Refer Labs",
  description:
    "Plainly: Refer Labs earns from affiliate links. What that means for you, and the lines we don't cross. Rankings are never sold.",
  url: URL,
  keywords: ["refer labs how we make money", "affiliate disclosure refer labs", "affiliate commission disclosure"],
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "How we make money", item: URL },
  ],
};

export default function HowWeMakeMoney() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="text-4xl font-extrabold leading-[1.1] text-[#10251b]">How we make money</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#3d4b44]">
          Refer Labs is free to use. We keep the lights on two ways, and we&apos;d rather you know exactly how than wonder.
          Neither one lets a company buy a better ranking or a softer review.
        </p>

        <Section h="Affiliate links">
          <p>
            On most of the site, when you click through to a product we recommend and sign up, the provider may pay us a
            commission. It costs you nothing extra, and sometimes gets you a better deal than going direct. We only earn if
            you act on a recommendation, which is exactly why the recommendation has to be honest to be worth anything.
          </p>
        </Section>

        <Section h="The lines we don't cross">
          <ul className="space-y-2">
            {[
              "Rankings are not for sale. A brand can't pay to rank higher or have a criticism removed.",
              "We don't invent testimonials, ratings or statistics. We never publish our own star ratings.",
              "We disclose commercial relationships on the pages they apply to, not buried in the footer.",
            ].map((x) => (
              <li key={x} className="flex gap-2.5 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{x}
              </li>
            ))}
          </ul>
        </Section>

        <p className="mt-10 text-sm leading-relaxed text-[#6e7b74]">
          Questions about any of this? Email{" "}
          <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] underline">jarred@referlabs.com.au</a>.
          See also our <Link href="/about#how-we-research" className="font-semibold text-[#0a7c42] underline">research standards</Link> and{" "}
          <Link href="/privacy" className="font-semibold text-[#0a7c42] underline">Privacy Policy</Link>.
        </p>
      </main>
    </ConsumerShell>
  );
}

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-[#10251b]">{h}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#3d4b44]">{children}</div>
    </section>
  );
}
