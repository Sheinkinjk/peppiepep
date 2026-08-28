import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.cheapestWeightLossTelehealth);

const GREEN = "#0a7c42";
const PILOT_URL = "https://pilot.com.au/";
const DFWL_URL = "https://www.doctorsforweightloss.com.au/";

const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Cheapest Weight Loss Telehealth Australia", item: `${SITE_URL}/cheapest-weight-loss-telehealth-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Affordable Weight Loss Telehealth Australia 2026: Pricing Models Compared",
  description:
    "A comparison of Australian weight-loss telehealth pricing models, subscription versus pay-as-you-go, covering Moshy, Juniper, Pilot and pay-per-consult alternatives.",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Moshy",
      description:
        "Subscription telehealth, gender-neutral and open to anyone eligible; new customers can currently receive $120 off their first treatment. Pricing is confirmed in the consult and can change.",
      url: `${SITE_URL}/moshy-review`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Juniper",
      description:
        "Women-focused subscription program from Eucalyptus, bundling a medical program with coaching and unlimited consults. Pricing is confirmed in the consult.",
      url: `${SITE_URL}/juniper`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pilot",
      description:
        "Men-focused telehealth from Eucalyptus, a subscription program within a broader men's health service. Pricing is confirmed in the consult.",
      url: PILOT_URL,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Doctors for Weight Loss",
      description:
        "Pay-as-you-go alternative with no subscription, so you pay per appointment rather than monthly. Pricing is confirmed with the provider.",
      url: DFWL_URL,
    },
  ],
};

const faqs = [
  {
    q: "What is the cheapest weight loss telehealth in Australia?",
    a: "It depends on how you count cost, which is exactly the trap with the word cheapest. The subscription services, like Moshy, Juniper and Pilot, bundle consults and support into a monthly fee. A pay-as-you-go service like Doctors for Weight Loss charges per appointment instead, so it can look lower up front. Of the subscription services, Moshy publishes a starting figure: it advertises its program from $229 a month* on its own site, checked 14 August 2026. Juniper and Pilot confirm pricing inside their own flows rather than publishing a start price. The true total also depends on how often you need reviews, so treat any start price as a floor rather than a quote. One concrete note: Moshy currently advertises $120 off your first order for new customers. *Indicative only and subject to change: view the latest pricing on each provider's own site before you sign up.",
  },
  {
    q: "Is subscription or pay-as-you-go cheaper for weight loss telehealth?",
    a: "Neither is automatically cheaper, they bill differently. A subscription bundles consults and support into one monthly fee, which suits people who want ongoing contact and predictable billing. Pay-as-you-go charges per consult, so if you only need occasional appointments the running cost can be lower, but there is no bundled support between visits. The cheapest model for you depends on how much ongoing contact you actually want and whether medication, billed separately in many cases, is involved.",
  },
  {
    q: "Does cheapest mean best for weight loss telehealth?",
    a: "No. Cheapest is a useful filter, not a verdict. The lowest monthly figure can still be the wrong fit if the model does not match how you want to be supported, if the coaching you need is not included, or if medication is billed separately on top. Compare the pricing model, what is included, and whether a registered practitioner assesses you individually, then weigh price against fit. Suitability for any program is decided by a practitioner, not by price.",
  },
  {
    q: "How does Moshy's pricing compare to Juniper and Pilot?",
    a: "All three run on a subscription model, so the useful comparison is how each subscription is structured rather than a headline figure. We do not quote specific prices here because they are confirmed inside the consult and can change. Juniper, the women-focused Eucalyptus program, bundles coaching and unlimited consults; Pilot is the men-focused Eucalyptus service within a broader men's health offering; Moshy is gender-neutral and open to anyone eligible, and new customers can currently receive $120 off their first treatment. Confirm the current pricing directly on each provider before you decide.",
  },
  {
    q: "Is medication included in the subscription price?",
    a: "Not always. On many weight-loss telehealth plans the subscription covers the consult and support, and any prescribed medication is billed separately on top, though some plans bundle it. Weight-management medicines are prescription-only in Australia and are only supplied where a registered practitioner assesses them as clinically appropriate. Because medication cost varies, the headline monthly subscription figure is not always the full cost. Always read the pricing breakdown in full on each provider.",
  },
  {
    q: "What is a pay-as-you-go weight loss telehealth option?",
    a: "A pay-as-you-go service charges per appointment instead of a monthly subscription. Doctors for Weight Loss is one example, where you pay for the initial consult and each review separately rather than a monthly fee. This model can suit people who want clinical input without a recurring subscription, though it typically comes without the bundled ongoing support that subscription programs include. Pricing is confirmed with the provider and can change, so check the current figures directly.",
  },
  {
    q: "Are cheaper weight loss telehealth services still legitimate?",
    a: "A lower price does not make a service less legitimate. The markers of a serious provider are the same at any price point: a registered Australian practitioner reviews your case individually, some applicants are declined, the pricing is transparent, and no specific medicine is promised before an assessment. Judge a cheaper service on those markers, not on price alone.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.cheapestWeightLossTelehealth.title,
  description: seoConfig.cheapestWeightLossTelehealth.description,
  url: seoConfig.cheapestWeightLossTelehealth.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-08-14",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

// ── Price table ──────────────────────────────────────────────────────────────
const priceRows: { name: string; model: string; price: string; who: string; highlight?: boolean }[] = [
  { name: "Moshy", model: "Subscription", price: "Confirmed in the consult ($120 off first treatment for new customers)", who: "Anyone eligible" },
  { name: "Juniper", model: "Subscription", price: "Confirmed in the consult; bundles a clinical program, coaching, unlimited consults", who: "Women" },
  { name: "Pilot", model: "Subscription", price: "Confirmed in the consult", who: "Men" },
  { name: "Doctors for Weight Loss", model: "Pay-as-you-go", price: "Per appointment, confirmed with the provider", who: "Anyone eligible" },
];

export default function CheapestWeightLossTelehealthPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/weight-loss" className="hover:text-[#0a7c42] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Cheapest weight loss telehealth</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Cheapest weight loss telehealth in Australia: affordable options compared
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              &ldquo;Cheapest&rdquo; is a slippery word in weight-loss telehealth, because services bill in different
              ways. Subscription programs charge a flat monthly fee. Pay-as-you-go services charge per consult. And
              medication, when it is prescribed, is often billed separately on top. This page compares the pricing models
              side by side, from subscription programs to pay-per-appointment alternatives, and explains what cheapest
              really means once you factor in the whole cost.
            </p>
            <EditorialMeta lastUpdated="2026-08-14" className="mb-5" />
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only, not medical advice. Prices are approximate and change, so check current pricing on each
              provider. This page contains a disclosed affiliate link to Moshy.
            </p>

            <a
              {...aff}
              data-cta="cheapest-hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
            >
              Check eligibility on Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
            <EarningsBalanceNote earnFrom="Moshy" noEarnFrom={["Juniper", "Pilot"]} /* PILOT-NON-PARTNER */ className="mt-4 max-w-2xl" />
          </section>

          {/* Answer-first: the buyer's question verbatim as an H2, then the liftable verdict. */}
          <section className="pb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What is the cheapest weight-loss telehealth in Australia?
            </h2>
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                The verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                There is no single cheapest service, because they bill differently. Subscription programs like Moshy,
                Juniper and Pilot fold consults and support into a monthly fee, while a pay-as-you-go service like
                Doctors for Weight Loss charges per consult and can look lower up front. The genuinely cheapest option for
                you depends on how much ongoing support you want and whether medication is prescribed, since that is often
                billed separately. Pricing is confirmed in the consult and can change, so check each provider directly.
                Cheapest is not the same as best fit, and suitability is always practitioner-decided.
              </p>
            </div>
          </section>

          {/* Price table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Weight loss telehealth pricing compared
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-44">Service</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Model</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Pricing</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Who</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((r) => (
                    <tr key={r.name} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 font-bold text-sm" style={{ color: r.highlight ? GREEN : "#10251b" }}>{r.name}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{r.model}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.price}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{r.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Prices are approximate, based on publicly available information, and change often.
              Check current pricing on each provider. Medication, where prescribed, may be billed separately. Treatment
              access is subject to individual clinical assessment.
            </p>
          </section>

          {/* Prose: what cheapest really means */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What &ldquo;cheapest&rdquo; actually means here
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The trap with cheapest is that a weight-loss telehealth bill has moving parts. There is the consult or
                subscription fee, and then, separately in many cases, the cost of any medication that a practitioner
                prescribes. A low monthly subscription with expensive medication billed on top can end up dearer than a
                higher subscription that bundles more in. The advertised headline number is a starting point, not the
                total.
              </p>
              <p>
                The two pricing models split the cost differently. A subscription, like Moshy, Juniper or Pilot, folds
                consults and ongoing support into one predictable monthly fee. Pay-as-you-go, like Doctors for Weight
                Loss, charges per appointment with no monthly commitment. If you want frequent contact and structure, the
                subscription model can suit you better. If you want occasional clinical input without a recurring charge,
                pay-as-you-go can cost less to run. Neither model wins on price alone, and the actual figures are confirmed
                in the consult and can change.
              </p>
            </div>
          </section>

          {/* Prose: Moshy as low-cost subscription */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Moshy: a gender-neutral subscription option
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                If you want the subscription model, Moshy is one to look at. It is gender-neutral and open to anyone
                eligible, rather than aimed at one audience, and it keeps the experience focused on the weight-management
                pathway with a fast, fully-online eligibility check. On price, we do not quote a figure here because it is
                confirmed inside the consult and can change; one concrete, current note is that new customers can receive
                $120 off their first treatment. Check the current pricing directly on Moshy before you commit.
              </p>
              <p>
                An introductory offer is a factual note on cost, not a
                claim that Moshy is cheaper overall, medically better, or that it will produce any particular result.
                Whether any program suits you, and whether medication is appropriate, is decided by a registered
                Australian practitioner after an individual assessment. Price is one input into that decision, not the
                decision itself.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Want to see if the subscription route is open to you? Moshy&apos;s eligibility check takes
                about ten minutes, with no commitment, and the referral applies automatically through our link.
              </p>
              <a
                {...aff}
                data-cta="cheapest-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Prose: cheapest is not always best fit */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Why cheapest is not always the best fit
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Chasing the lowest number can backfire. If you specifically want coaching and unlimited consults, a
                program that bundles them, like Juniper, may suit you better even at a higher monthly price than a leaner
                service you end up supplementing elsewhere. If you want weight support inside a broader men&apos;s health
                service, Pilot&apos;s ecosystem may matter more to you than price. And if you only want occasional
                clinical input, a pay-as-you-go consult may work out better than any subscription.
              </p>
              <p>
                Shortlist on price, then decide on fit: the pricing model, what is included,
                and whether a registered practitioner assesses you individually before anything starts. That last point
                is the non-negotiable one. A serious provider declines some applicants and never promises a specific
                medicine before an assessment, regardless of how little it charges.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Cheapest weight loss telehealth: frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                    {f.q}
                  </h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep comparing</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/moshy" className="nw-link text-sm">Moshy: current offer</Link>
          <Link href="/moshy-review" className="nw-link text-sm">Moshy review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/moshy-vs-pilot" className="nw-link text-sm">Moshy vs Pilot</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/moshy-vs-juniper" className="nw-link text-sm">Moshy vs Juniper</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-weight-loss-telehealth-australia" className="nw-link text-sm">Best weight loss telehealth</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/weight-loss" className="nw-link text-sm">Weight loss hub</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Moshy. Juniper,
              Pilot and Doctors for Weight Loss are linked without affiliate arrangements. We compare on price, model and
              what is included, and we never sell rankings. All content is for informational purposes only and does not
              constitute medical advice. Prescription medicines in Australia, prescribed for weight management, are available
              only after an individual assessment by a registered Australian practitioner, and suitability is
              practitioner-decided and never guaranteed. Consult a qualified health professional before starting any
              weight management program.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
