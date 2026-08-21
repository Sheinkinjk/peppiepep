import SectionHub from "@/components/consumer/SectionHub";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.longevityHub);

const guides = [
  { href: "/longevity/recovery", title: "Recovery", desc: "Ice baths and saunas: unit prices, the running costs nobody quotes, and what the evidence supports." },
  { href: "/longevity/diagnostics", title: "Diagnostics & screening", desc: "Whole-body MRI, biological-age tests and glucose monitors, with the medical criticism included." },
  { href: "/longevity/supplements/longevity-supplements-evidence-review", title: "Supplements, reviewed", desc: "What AUST L on a label actually means, and why the headline claims rarely survive scrutiny." },
];

const faqs = [
  {
    q: "Is the longevity industry regulated in Australia?",
    a: "In parts. Devices making therapeutic claims are regulated by the TGA and should appear on the ARTG. Supplements sold as listed medicines carry an AUST L number, which means the ingredients are permitted and the sponsor has certified the claims, not that the product was assessed for efficacy. Recovery hardware sold without therapeutic claims is ordinary consumer goods. The claims made in marketing are frequently ahead of what any of those approvals actually mean.",
  },
  {
    q: "What does longevity spending actually buy you?",
    a: "It varies enormously by category, and the ranking is not the one the industry promotes. Sleep, movement and not smoking are free and have the strongest evidence behind them. Recovery hardware is a comfort and consistency purchase with modest supporting evidence. Screening and supplements are where the gap between price and demonstrated benefit is widest, which is why our guides in those areas carry the criticism as well as the pitch.",
  },
  {
    q: "Why does this section include arguments against buying?",
    a: "Because in this category they are the part that is hardest to find elsewhere. Whole-body MRI screening in people without symptoms is genuinely contested among Australian clinicians, and biological-age tests can return different results from the same sample. Leaving that out would make these pages advertising rather than guidance.",
  },
  {
    q: "Does Refer Labs earn from this section?",
    a: "Not yet. Longevity is being built before any partner is in place, so nothing here currently earns us a commission and no product is recommended. When we add providers we will say so on the page and disclose it, as we do across the site.",
  },
];

export default function LongevityHub() {
  return (
    <SectionHub
      slug="/longevity"
      crumbs={[{ label: "Longevity" }]}
      h1={<>Longevity in Australia: <span className="italic text-[#0a7c42]">what it costs, and what holds up</span></>}
      intro="A category where the marketing is confident and the evidence is uneven. These guides cover what the hardware and testing actually cost in Australia, and are equally clear about where the case for spending is weak."
      note={<><strong className="font-semibold text-[#10251b]">On claims.</strong> We make no health claim for any product or service here. Where something is regulated as a therapeutic good we point you at the ARTG to check it yourself, and where the evidence is thin we say so rather than leaving it out.</>}
      comingSoonFor="Longevity"
      guides={guides}
      faqs={faqs}
      otherLinks={[
        { href: "/sleep", label: "Sleep" },
        { href: "/skin-and-beauty", label: "Skin & beauty" },
        { href: "/mens-health", label: "Men's health" },
      ]}
      listName="Longevity guides"
      title={seoConfig.longevityHub.title}
      description={seoConfig.longevityHub.description}
    />
  );
}
