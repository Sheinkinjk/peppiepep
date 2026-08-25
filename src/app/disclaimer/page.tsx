import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.disclaimer);

const UPDATED = "25 August 2026";

/**
 * Standing disclaimer.
 *
 * Terms of Service already carried a warranty disclaimer, but it sat at clause
 * 14 of a long contract, which is not where a reader looks and not what an
 * answer engine can quote. The substance that actually matters to a comparison
 * publisher, that health pages are information rather than medical advice, that
 * prices are dated and move, that we are not the provider of anything we
 * compare, is set out here in the reader's language and linked from the footer.
 *
 * It does not replace the Terms and it does not limit anything the Australian
 * Consumer Law gives you, which the page says in the words the ACL uses.
 */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Disclaimer", item: `${SITE_URL}/disclaimer` },
  ],
};

const faqs = [
  {
    q: "Is Refer Labs medical advice?",
    a: "No. Our health pages describe how services work, what they cost and how to compare them. They are general information, they are not tailored to you, and they are not a substitute for advice from a registered health practitioner. We do not name prescription medicines, and whether any treatment is appropriate is a decision for a practitioner who has assessed you.",
  },
  {
    q: "Is Refer Labs financial or credit advice?",
    a: "No. Nothing on this site is financial product advice, credit assistance or a recommendation to enter any financial product. Refer Labs is not a lender, credit provider, broker or insurer, and does not hold an Australian Financial Services Licence or an Australian Credit Licence. Where a page describes insurance or finance, read the provider's own disclosure documents and consider getting licensed advice.",
  },
  {
    q: "Are the prices on Refer Labs guaranteed?",
    a: "No. Every price and offer is read off the provider's own page and carries the date it was read. Providers change prices, terms and eligibility without telling us, so the figure on our page is a record of what was published on that date, not a quote. Confirm the current price with the provider before you buy.",
  },
  {
    q: "Does Refer Labs earn from the links on its pages?",
    a: "Yes, on many of them, and it is disclosed on the page it applies to. We earn a commission when a reader signs up or buys through a link, or when a provider takes up an enquiry we introduce. It costs you nothing extra, we do not sell rankings, and we compare brands we earn from against each other.",
  },
];
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold text-[#10251b]">
        {n}. {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-[#2b362f]">{children}</div>
    </div>
  );
}

export default function Disclaimer() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Disclaimer</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Legal</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          Disclaimer
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Refer Labs publishes general information to help Australians compare providers. It is not medical, financial,
          legal or tax advice, it is not tailored to your circumstances, and we are not the provider of anything we
          compare. Prices and offers are recorded on the date shown on the page and change without notice.
        </p>

        <p className="mt-4 text-sm text-[#9aa39c]">Last updated: {UPDATED}</p>

        <div className="mt-10 space-y-8">
          <Section n="1" title="General information only">
            <p>
              Everything we publish is general in nature. We do not know your circumstances, your health history, your
              finances or your property, and nothing on this site takes them into account. Before acting on anything you
              read here, consider whether it fits your situation and, where the decision matters, get advice from
              someone qualified to give it.
            </p>
          </Section>

          <Section n="2" title="Health content">
            <p>
              Our health pages describe how a service works, what it costs and how providers differ. They are not
              medical advice and are not a substitute for consulting a registered health practitioner. We do not
              diagnose, we do not recommend treatments, and we do not name prescription medicines. Whether any treatment
              is appropriate for you is a decision for a practitioner who has assessed you.
            </p>
            <p>
              If you are experiencing a medical emergency, call 000. For health advice, speak to your GP or call
              healthdirect on 1800 022 222.
            </p>
          </Section>

          <Section n="3" title="Money, insurance and credit">
            <p>
              Refer Labs is not a lender, credit provider, finance broker, insurer or insurance broker, and holds no
              Australian Financial Services Licence or Australian Credit Licence. Nothing on this site is financial
              product advice or credit assistance. Where we describe an insurance product, read the provider&apos;s
              Product Disclosure Statement and Target Market Determination, which govern what you are actually covered
              for.
            </p>
          </Section>

          <Section n="4" title="Prices, offers and availability">
            <p>
              Every price, discount code and offer on this site was read off the provider&apos;s own published page and
              carries the date it was read. Providers change prices, terms, eligibility and availability without telling
              us, and a code may expire or be withdrawn at any time. Treat what we publish as a dated record rather than
              a quote, and confirm the current terms with the provider before you commit.
            </p>
            <p>
              Where a figure is an estimate rather than a published price, such as a rebate that floats with certificate
              prices, we say so on the page and label it as indicative.
            </p>
          </Section>

          <Section n="5" title="We are not the provider">
            <p>
              Refer Labs compares providers. It does not manufacture, prescribe, dispense, install, underwrite, lend or
              supply anything. Your contract is with the provider you choose, on their terms, and any goods, services,
              treatment, cover or advice you receive is theirs to deliver and theirs to stand behind. Complaints about a
              provider are best raised with the provider, and then with the relevant regulator or ombudsman.
            </p>
          </Section>

          <Section n="6" title="Commercial relationships">
            <p>
              Many pages carry disclosed affiliate links, and some let you submit an enquiry we introduce to a provider.
              Where a reader signs up, buys or has an enquiry taken up, the provider may pay us a commission or referral
              fee, at no extra cost to you. We do not sell rankings, we do not accept payment for placement, and we
              publish no star ratings or testimonials of our own.{" "}
              <Link href="/how-we-make-money" className="font-semibold text-[#0a7c42] hover:underline">
                How we make money
              </Link>{" "}
              sets out the arrangements in full.
            </p>
          </Section>

          <Section n="7" title="Third-party sites and figures">
            <p>
              We link to providers, regulators and industry sources. We do not control those sites and are not
              responsible for their content, their accuracy or their handling of your data. Figures we attribute to a
              third party are reproduced as that source published them, with the date we read them.
            </p>
          </Section>

          <Section n="8" title="Your rights under Australian Consumer Law">
            <p>
              Nothing on this page excludes, restricts or modifies any guarantee, right or remedy you have under the
              Australian Consumer Law or any other law that cannot lawfully be excluded. Where a law implies a guarantee
              that cannot be excluded, our liability is limited to the extent the law permits. This disclaimer sits
              alongside our{" "}
              <Link href="/terms" className="font-semibold text-[#0a7c42] hover:underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="font-semibold text-[#0a7c42] hover:underline">Privacy Policy</Link>, and
              does not replace them.
            </p>
          </Section>

          <Section n="9" title="Corrections">
            <p>
              If something here is wrong, tell us and we will fix it. Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="font-semibold text-[#0a7c42] hover:underline">
                jarred@referlabs.com.au
              </a>{" "}
              with the page and what is inaccurate. We correct errors of fact on the page itself rather than quietly,
              and we update the date when we do.
            </p>
          </Section>
        </div>

        <section className="mt-12 border-t border-[#e5e9e7] pt-8">
          <h2 className="text-2xl font-bold text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-sm text-[#6e7b74]">
          Pepform Pty Ltd trading as Refer Labs, ABN 32 660 008 159.
        </p>
      </main>
    </ConsumerShell>
  );
}
