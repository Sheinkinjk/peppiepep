import SectionHub from "@/components/consumer/SectionHub";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.diagnosticsHub);

const guides = [
  { href: "/longevity/diagnostics/whole-body-mri-australia-cost", title: "Whole-body MRI: cost and criticism", desc: "What it costs here, why no rebate applies, and why clinicians are cautious about screening the well." },
  { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", title: "The services, compared", desc: "What each actually measures, how each is priced, and who reviews the result." },
  { href: "/longevity/diagnostics/biological-age-testing-australia", title: "Biological age testing", desc: "Why two tests can give different ages from one sample, and what that tells you." },
  { href: "/longevity/diagnostics/cgm-for-non-diabetics-australia", title: "Glucose monitors without diabetes", desc: "What they cost unsubsidised, how access works, and what the evidence supports." },
  { href: "/longevity/diagnostics/health-screening-quiz", title: "Is screening worth it for you?", desc: "Four questions on budget and how you would handle an uncertain result." },
];

const faqs = [
  {
    q: "Is preventive health screening worth it in Australia?",
    a: "It depends on the test and on you, and the answer is less flattering to the industry than its marketing implies. Targeted screening with an evidence base, such as the national bowel, breast and cervical programs, is well supported and often free or subsidised. Broad scanning of people with no symptoms is contested, mainly because of what it finds by accident. Our guides set out both sides rather than assuming you have already decided.",
  },
  {
    q: "Does Medicare cover whole-body MRI screening?",
    a: "No. Medicare rebates apply to imaging requested for a clinical indication, not to screening someone without symptoms, so a whole-body scan bought as a preventive service is paid entirely by you. That is a deliberate policy position rather than an oversight, and understanding why is useful before you book.",
  },
  {
    q: "What is an incidental finding, and why does it matter?",
    a: "Something a scan picks up that was not what you were looking for and may never have caused you harm. It matters because it rarely ends with the scan: it typically leads to follow-up imaging, specialist appointments and sometimes biopsy, each with its own cost, wait and worry. That cascade is the main reason Australian clinicians are cautious about scanning people with no symptoms, and it is the part the marketing omits.",
  },
  {
    q: "Are biological age tests accurate?",
    a: "They are consistent enough to sell and not yet validated enough to act on. Different tests use different methods and can return materially different ages from the same sample, which tells you the number is a model output rather than a measurement of you. Treat it as an interesting figure rather than a health finding, and be wary of anything sold on the strength of moving it.",
  },
];

export default function DiagnosticsHub() {
  return (
    <SectionHub
      slug="/longevity/diagnostics"
      crumbs={[{ href: "/longevity", label: "Longevity" }, { label: "Diagnostics" }]}
      h1={<>Screening and diagnostics: <span className="italic text-[#0a7c42]">the cost, and the case against</span></>}
      intro="This is the part of the longevity market where the gap between price and demonstrated benefit is widest. These guides carry what the services cost in Australia and what Australian clinicians say about screening people who feel well."
      note={<><strong className="font-semibold text-[#10251b]">Not a recommendation.</strong> Nothing here suggests you should or should not have a test. Whether screening is appropriate for you depends on your history and risk, which is a conversation for a practitioner who knows both.</>}
      comingSoonFor="Diagnostics"
      guides={guides}
      faqs={faqs}
      otherLinks={[
        { href: "/longevity", label: "Longevity" },
        { href: "/longevity/recovery", label: "Recovery" },
        { href: "/mens-health", label: "Men's health" },
      ]}
      listName="Diagnostics guides"
      title={seoConfig.diagnosticsHub.title}
      description={seoConfig.diagnosticsHub.description}
    />
  );
}
