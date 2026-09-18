import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.terms);

/*
 * Rewritten 15 Sep 2026 for what Refer Labs is now: a free comparison publisher
 * with disclosed affiliate links, enquiry forms and a newsletter. The previous
 * version still carried the retired referral SaaS (accounts, user content,
 * billing, uptime service levels, US export controls). Governing law Victoria,
 * courts in Melbourne (Jarred, 14 Sep 2026). Not reviewed by a lawyer; get
 * professional sign-off before relying on it.
 */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Terms", item: `${SITE_URL}/terms` },
  ],
};

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`s${n}`} className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-[#14120f]">
        {n}. {title}
      </h2>
      <div className="space-y-3 text-[#14120f]">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#14120f]">Terms</span>
        <SectionMark kind="document" size={56} /></nav>

        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-[#56504a]">Last updated: 15 September 2026</p>

        <p className="mt-8 text-lg leading-relaxed text-[#14120f]">
          These terms apply when you use referlabs.com.au. Reading the site is free and needs no account. The site is
          published by Pepform Pty Ltd (ABN 32 660 008 159) trading as Refer Labs (&ldquo;Refer Labs&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to these terms. If you do not agree, please do
          not use it.
        </p>

        <div className="mt-12 space-y-10">
          <Section n="1" title="What Refer Labs is">
            <p>
              Refer Labs publishes independent comparisons, guides, calculators and quizzes for Australians, covering
              health services, pet insurance, home energy, software and other products. We are a publisher and referrer.
              We are not a doctor, insurer, broker, financial adviser, installer, lender or seller of anything we compare,
              and we hold no stock and dispense nothing.
            </p>
            <p>
              We also offer services to businesses, described on our{" "}
              <Link href="/for-business" className="text-[#007a95] hover:underline">for-business</Link> pages, and an
              optional email newsletter.
            </p>
          </Section>

          <Section n="2" title="General information, not advice">
            <p>
              Everything on the site is general information. It does not take your personal circumstances into account
              and is not a recommendation that any product or service suits you.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Health.</strong> Health content is not medical advice. Whether any treatment is appropriate is a
                decision for a registered health practitioner who has assessed you.
              </li>
              <li>
                <strong>Insurance.</strong> Insurance content is not financial product advice. Read the insurer&apos;s
                Product Disclosure Statement (PDS) and Target Market Determination (TMD) before deciding.
              </li>
              <li>
                <strong>Energy and rebates.</strong> Rebate and savings figures are estimates that depend on your
                household, your installer and rules that change. Get a quote before relying on them.
              </li>
            </ul>
            <p>
              Our <Link href="/disclaimer" className="text-[#007a95] hover:underline">Disclaimer</Link> explains this in
              more detail and forms part of these terms.
            </p>
          </Section>

          <Section n="3" title="Prices, offers and accuracy">
            <p>
              Prices are read off each provider&apos;s own page and dated. Offers are either read off the provider&apos;s
              page or, where an offer is specific to Refer Labs and published nowhere, confirmed directly with the
              provider, and each carries the date it was checked. Providers can change prices, terms, eligibility and
              offers without telling us, so treat what we publish as a dated record, not a quote, and confirm the current
              terms with the provider before you commit.
            </p>
            <p>
              We work to keep the site accurate and we correct errors when we find them or when you tell us. Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>{" "}
              if something looks wrong.
            </p>
          </Section>

          <Section n="4" title="Affiliate links and commercial relationships">
            <p>
              Some pages contain affiliate links, and some forms let you ask us to introduce you to a provider. If you
              sign up, buy, or have an enquiry taken up through one of these, the provider may pay Refer Labs a commission
              or referral fee.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Any commission is paid by the provider, at no extra cost to you.</li>
              <li>
                A provider cannot pay to change its position, to be added to a comparison, or to have a criticism removed.
              </li>
              <li>
                We disclose commercial relationships on the pages that carry them. How we earn is set out on{" "}
                <Link href="/how-we-make-money" className="text-[#007a95] hover:underline">How we make money</Link>.
              </li>
              <li>
                When you follow a link to a provider, you leave our site. The provider&apos;s own terms and privacy policy
                apply to anything you do there, including any purchase, policy, quote or treatment.
              </li>
            </ul>
          </Section>

          <Section n="5" title="Enquiries, quizzes and the newsletter">
            <p>
              When you submit a form, take a quiz that asks for your email, or subscribe to the newsletter, please give
              accurate details and only your own. We handle what you send under our{" "}
              <Link href="/privacy" className="text-[#007a95] hover:underline">Privacy Policy</Link>. Where a form offers
              to pass your enquiry to a provider, we only do so with your consent, and the provider then deals with you
              under its own terms.
            </p>
            <p>
              Quiz results are general information matched to your answers. They are not a diagnosis, a recommendation or
              advice.
            </p>
            <p>
              You can unsubscribe from the newsletter at any time using the link in any email, or by emailing us.
            </p>
          </Section>

          <Section n="6" title="Services for businesses and partner applications">
            <p>
              Services we provide to businesses are priced and agreed separately, in writing, and those agreed terms apply
              in addition to these terms. Businesses may also apply to be compared on the site.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Placement is not for sale.</strong> We do not accept payment for a ranking, a position in a table,
                or a favourable conclusion.
              </li>
              <li>
                <strong>Content is editorial.</strong> We decide what a page says, including anything unfavourable. We
                correct factual errors on request, but partners do not approve conclusions.
              </li>
              <li>
                <strong>Information you supply must be accurate</strong> and verifiable, and you must tell us when it
                changes.
              </li>
              <li>
                <strong>We may decline an application or remove a listing</strong> at any time, including where an offer
                ends or a claim cannot be substantiated.
              </li>
              <li>
                <strong>Regulated categories.</strong> If you operate in a regulated area, including therapeutic goods,
                health services, insurance or credit, you are responsible for your own compliance, and we will not publish
                material that would breach the relevant law.
              </li>
            </ul>
          </Section>

          <Section n="7" title="Using the site fairly">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>use the site for anything unlawful, misleading or harmful;</li>
              <li>interfere with the site, its security or other people&apos;s use of it;</li>
              <li>
                copy the site in bulk, or republish our pages as your own, except as allowed in section 8;
              </li>
              <li>submit false information, or someone else&apos;s details without their permission.</li>
            </ul>
            <p>
              Search engines and AI crawlers may access the site as set out in our robots.txt file.
            </p>
          </Section>

          <Section n="8" title="Our content and how you can use it">
            <p>
              The site&apos;s text, design, calculators and logos are owned by Refer Labs or used with permission.
              Provider names and logos belong to their owners and appear to identify them.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>You may quote short extracts, with credit to Refer Labs and a link to the page.</li>
              <li>
                The observation log at <Link href="/data" className="text-[#007a95] hover:underline">/data</Link> is
                licensed more openly, under Creative Commons Attribution 4.0. The terms are stated on that page.
              </li>
              <li>Anything else needs our written permission.</li>
            </ul>
          </Section>

          <Section n="9" title="Availability of the site">
            <p>
              We may change, update or remove pages, tools and offers at any time, and the site may occasionally be
              unavailable. We aim to keep it running and accurate, but we do not promise it will always be available or
              free of errors.
            </p>
          </Section>

          <Section n="10" title="Your rights under Australian Consumer Law">
            <p>
              Nothing in these terms excludes, restricts or modifies any right or remedy you have under the Australian
              Consumer Law or any other law that cannot lawfully be excluded. Where a paid service we supply fails to
              meet a consumer guarantee, you may be entitled to a remedy.
            </p>
          </Section>

          <Section n="11" title="Limitation of liability">
            <p>
              Subject to section 10, and to the extent the law allows, Refer Labs is not liable for any loss arising from
              your use of, or reliance on, the site, including decisions you make about a product, policy, treatment or
              purchase, or anything a provider does or fails to do. Where our liability for a service cannot be excluded
              but can be limited, it is limited to supplying the service again or paying the cost of having it supplied
              again.
            </p>
            <p>
              This section does not limit liability for our fraud, or for anything else that cannot lawfully be limited.
            </p>
          </Section>

          <Section n="12" title="Privacy">
            <p>
              Our <Link href="/privacy" className="text-[#007a95] hover:underline">Privacy Policy</Link> explains what
              personal information we collect, how we use it, and your rights.
            </p>
          </Section>

          <Section n="13" title="Changes to these terms">
            <p>
              We may update these terms from time to time. The current version is always on this page, with the date it
              was last updated. Changes apply from that date.
            </p>
          </Section>

          <Section n="14" title="Governing law and disputes">
            <p>
              These terms are governed by the laws of Victoria, Australia. If you have a complaint, please email us first
              at <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>{" "}
              and we will try to resolve it within 30 days. If it cannot be resolved, it may be taken to the courts of
              Victoria, sitting in Melbourne, or to any court or tribunal that has jurisdiction under law that cannot be
              excluded.
            </p>
          </Section>

          <Section n="15" title="General">
            <p>
              If any part of these terms is found to be unenforceable, the rest continues to apply. If we do not enforce a
              term straight away, we have not given up the right to enforce it later.
            </p>
          </Section>

          <Section n="16" title="Contact">
            <div className="rounded-lg bg-[#e4f2f5] p-4">
              <p className="font-semibold">Pepform Pty Ltd trading as Refer Labs</p>
              <p>ABN 32 660 008 159</p>
              <p>Melbourne, Victoria</p>
              <p>
                Email:{" "}
                <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
    </ConsumerShell>
  );
}
