import SectionHub from "@/components/consumer/SectionHub";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.longevityHub);

const guides = [
  { href: "/longevity/recovery", title: "Recovery", desc: "Ice baths and saunas: unit prices, running costs, and what the evidence supports." },
  { href: "/longevity/diagnostics", title: "Diagnostics & screening", desc: "Whole-body MRI, biological-age tests, glucose monitors and private pathology: what each costs." },
  { href: "/longevity/supplements/longevity-supplements-evidence-review", title: "Supplements, reviewed", desc: "What AUST L on a label means, and how listed supplements are regulated." },
];

const faqs = [
  {
    q: "Is the longevity industry regulated in Australia?",
    a: "In parts. Devices making therapeutic claims are regulated by the TGA and should appear on the ARTG. Supplements sold as listed medicines carry an AUST L number, which means the ingredients are permitted and the sponsor has certified the claims, not that the product was assessed for efficacy. Recovery hardware sold without therapeutic claims is ordinary consumer goods.",
  },
  {
    q: "What does longevity spending buy you?",
    a: "It varies by category. Recovery hardware such as saunas and ice baths is a one-off purchase with ongoing running costs. Screening and testing is usually paid per test or per year. Supplements are an ongoing cost. Our guides set out what each costs in Australia, with the date each price was read.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Yes, from two. Technogym, through Commission Factory since 16 September 2026: we earn a commission if you buy through our link, at no extra cost to you, and we hold no Technogym discount code. Technogym is kept off the diagnostics pages, where equipment beside a test result would read as a prescription for one. And i-screen, directly, since 23 September 2026: it gave us the coupon referlabs for $20 off a first test, and that coupon is the only thing that pays us, so a reader who clicks without typing it earns us nothing.",
  },
];

export default function LongevityHub() {
  return (
    <SectionHub
      slug="/longevity"
      crumbs={[{ label: "Longevity" }]}
      h1={<>Longevity in Australia: <span>what it costs, and what holds up</span></>}
      intro="What recovery hardware, screening and testing cost in Australia, with every price dated to the day it was read."
      note={<><strong className="font-semibold text-[#14120f]">On claims.</strong> We make no health claim for any product or service here. Where something is regulated as a therapeutic good we point you at the ARTG to check it yourself.</>}
      disclosure={<AffiliateDisclosure compact />}
      partner={
        /* Two partners since 23 Sep 2026, listed alphabetically and given
           identical rows, per the hub neutrality rule: a hub opens with the
           comparison, never with one partner's offer.

           Technogym came first (16 Sep 2026), which is why the Coming Soon note
           is gone: it told readers nothing here pays us. check-partner-scope
           denies Technogym on /longevity/diagnostics, where equipment beside a
           test result would read as a prescription for one. i-screen is the
           opposite case: diagnostics is exactly where it belongs, and it is
           denied on the hubs where a telehealth partner we earn more from would
           make the pairing our choice rather than the reader's. */
        <PartnerRoute
          className="mt-10"
          heading="The two companies we have an arrangement with"
          intro="The two companies in this section that pay us a commission."
          providers={[
            {
              name: "i-screen",
              href: "/go/i-screen-longevity-hub",
              what: "Private pathology tests ordered without a GP referral, listed from A$39 to A$1,099, read 23 September 2026. The code referlabs takes A$20 off a first test when you are signed in to an i-screen account, and is the only thing that pays us.",
              checked: "23 September 2026",
              review: { href: "/i-screen", label: "Read our i-screen review" },
            },
            {
              name: "Technogym",
              href: "/go/technogym-longevity-hub",
              what: "Home exercise equipment with published Australian prices, from A$4,460 for the Bench to A$20,490 for the Run, read 16 September 2026. We make no claim that any of it extends life or prevents disease.",
              checked: "16 September 2026",
              review: { href: "/technogym", label: "Read our Technogym page" },
            },
          ]}
        />
      }
      guides={guides}
      faqs={faqs}
      otherLinks={[
        { href: "/sleep", label: "Sleep" },
        { href: "/health-and-beauty", label: "Health & beauty" },
      ]}
      listName="Longevity guides"
      title={seoConfig.longevityHub.title}
      description={seoConfig.longevityHub.description}
    />
  );
}
