import SectionHub from "@/components/consumer/SectionHub";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.diagnosticsHub);

const guides = [
  { href: "/longevity/diagnostics/whole-body-mri-australia-cost", title: "Whole-body MRI: what it costs", desc: "Published prices from three providers, what the fee covers, and why no rebate applies." },
  { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", title: "Everlab vs Prenuvo vs i-screen", desc: "What each measures, how each is priced, and who reviews the result." },
  { href: "/longevity/diagnostics/biological-age-testing-australia", title: "Biological age testing", desc: "Why two tests can give different ages from one sample, and what that tells you." },
  { href: "/longevity/diagnostics/cgm-for-non-diabetics-australia", title: "Glucose monitors without diabetes", desc: "What they cost unsubsidised, how access works, and what the evidence supports." },
  { href: "/i-screen", title: "i-screen: what the tests cost", desc: "Private pathology from A$39 to A$1,099, ordered without a referral, and the referlabs code." },
];

const faqs = [
  {
    q: "Does Refer Labs earn from these pages?",
    a: "From one company, i-screen, since 23 September 2026. It gave us the code referlabs, worth $20 off a first test, and that code is the only thing we are paid on: a reader who clicks through and buys without entering it earns us nothing. We earn nothing from Everlab, Prenuvo, or any imaging or pathology provider named in these guides.",
  },
  {
    q: "Is preventive health screening covered in Australia?",
    a: "National programs such as bowel, breast and cervical screening are often free or subsidised. Private tests and scans are paid in full, so compare what each one includes and what it costs.",
  },
  {
    q: "Does Medicare cover whole-body MRI screening?",
    a: "No. Medicare rebates apply to imaging requested for a clinical indication, not to screening someone without symptoms, so a whole-body scan bought as a preventive service is paid entirely by you.",
  },
  {
    q: "Are biological age tests accurate?",
    a: "A biological age is an estimate produced by a statistical model, not a direct measurement. Different tests use different methods and can return different ages from the same sample. It is general information, not a diagnosis."
  },
];

export default function DiagnosticsHub() {
  return (
    <SectionHub
      slug="/longevity/diagnostics"
      crumbs={[{ href: "/longevity", label: "Longevity" }, { label: "Diagnostics" }]}
      h1={<>Screening and diagnostics: <span>what each costs</span></>}
      intro="What screening and diagnostic services cost in Australia, what each one measures, and where Medicare applies."
      note={<><strong className="font-semibold text-[#14120f]">Not a recommendation.</strong> Nothing here suggests you should or should not have a test.</>}
      disclosure={<AffiliateDisclosure compact />}
      partner={
        /* The Coming Soon note came off on 23 Sep 2026: it told readers nothing
           in this section pays us, which stopped being true when i-screen landed.
           Technogym is denied here by check-partner-scope, so this section has
           exactly one partner and the block says so. */
        <PartnerRoute
          className="mt-10"
          heading="The company we have an arrangement with"
          intro="One. i-screen pays us through the referlabs code; nothing else in this section pays us."
          providers={[
            {
              name: "i-screen",
              href: "/go/i-screen-diagnostics-hub",
              what: "Pathology ordered without a GP referral, listed from A$39 to A$1,099, read 23 September 2026. The code referlabs takes A$20 off a first test when you are signed in to an i-screen account, and is the only thing we are paid on.",
              checked: "23 September 2026",
              review: { href: "/i-screen", label: "Read our i-screen review" },
            },
          ]}
        />
      }
      guides={guides}
      faqs={faqs}
      otherLinks={[
        { href: "/longevity", label: "Longevity" },
        { href: "/longevity/recovery", label: "Recovery" },
      ]}
      listName="Diagnostics guides"
      title={seoConfig.diagnosticsHub.title}
      description={seoConfig.diagnosticsHub.description}
    />
  );
}
