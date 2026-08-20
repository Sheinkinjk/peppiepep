import SectionHub from "@/components/consumer/SectionHub";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.recoveryHub);

const guides = [
  { href: "/longevity/recovery/ice-bath-running-costs-australia", title: "What an ice bath costs to run", desc: "Chiller electricity worked from your own tariff, plus water, filtration and consumables." },
  { href: "/longevity/recovery/ice-bath-comparison-australia", title: "Comparing ice baths", desc: "Chiller capacity, insulation and filtration, and what separates the price tiers." },
  { href: "/longevity/recovery/home-sauna-cost-australia", title: "Home sauna costs", desc: "Unit price, the electrical work most quotes exclude, and the annual running cost." },
  { href: "/longevity/recovery/infrared-vs-traditional-sauna-australia", title: "Infrared vs traditional", desc: "How they differ on installation, power and what the evidence actually covers." },
  { href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", title: "Contrast therapy: the evidence", desc: "What the research supports, where it is weak, and what that means before spending." },
  { href: "/longevity/recovery/recovery-setup-quiz", title: "What fits your space?", desc: "A short matcher across space, budget, climate and how often you would use it." },
];

const faqs = [
  {
    q: "How much does an ice bath cost to run in Australia?",
    a: "The dominant cost is the chiller running continuously, and it depends on your tariff, your climate and how well insulated the tub is. Rather than quote a national average that will not match your bill, our running-costs guide gives you the formula and shows the working, so you can put your own cents-per-kilowatt-hour figure in. Water, filtration and consumables are on top and are usually left out of comparisons entirely.",
  },
  {
    q: "Is a chiller cheaper than buying ice?",
    a: "Over any meaningful period, yes, and the crossover comes sooner than most people expect. Bagged ice is a per-session cost that never stops; a chiller is a large one-off plus a modest daily electricity draw. Our running-costs guide sets out how to work out your own break-even point rather than asserting one, because it depends on how often you plunge.",
  },
  {
    q: "Do ice baths and saunas have proven health benefits?",
    a: "The evidence is mixed and more limited than the marketing suggests, and it differs by claim: some outcomes have reasonable support, others very little. We set out what the research covers on the contrast-therapy page rather than summarising it as a yes or no. Neither of these is a treatment for a medical condition, and we make no health claim for either.",
  },
  {
    q: "Do I need an electrician for a home sauna?",
    a: "Usually, and it is the cost most often missing from a quote. Many units need a dedicated circuit, and depending on the model and your switchboard that can be a substantial addition. Get an electrician to quote on your specific board before you commit to a unit, not after it arrives.",
  },
];

export default function RecoveryHub() {
  return (
    <SectionHub
      slug="/longevity/recovery"
      crumbs={[{ href: "/longevity", label: "Longevity" }, { label: "Recovery" }]}
      h1={<>Recovery hardware: <span className="italic text-[#0a7c42]">what it costs to buy, and to keep</span></>}
      intro="Ice baths and saunas are sold on a purchase price. The number that decides whether you keep using one is the annual running cost, and it is almost never in the listing. These guides put both together."
      comingSoonFor="Recovery"
      guides={guides}
      faqs={faqs}
      otherLinks={[
        { href: "/longevity", label: "Longevity" },
        { href: "/longevity/diagnostics", label: "Diagnostics" },
        { href: "/sleep", label: "Sleep" },
      ]}
      listName="Recovery guides"
      title={seoConfig.recoveryHub.title}
      description={seoConfig.recoveryHub.description}
    />
  );
}
