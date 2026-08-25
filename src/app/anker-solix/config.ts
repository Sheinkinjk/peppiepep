import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ANKER_SOLIX_URL } from "@/lib/affiliate-links";

// Every price here was read off ankersolix.com/au on 24 August 2026 and is recorded
// once in src/lib/portable-power.ts, which the comparison tables render from.
// Anker showed no struck-through prices on these models when read, unlike
// EcoFlow, which is itself worth stating since it changes the comparison.
export const ankerSolixConfig: AffiliatePageConfig = {
  brand: "Anker SOLIX",
  logo: "anker-solix",
  logoWide: true,
  badgeText: "Portable power",
  eyebrow: "Portable power · Australia",
  affiliateUrl: ANKER_SOLIX_URL,
  quickAnswer:
    "Anker SOLIX sells portable power stations in Australia from A$449 for a 288Wh C300 DC to A$5,399 for a 3,840Wh F3800. It costs more per watt-hour than EcoFlow at the 1,000Wh and 2,000Wh tiers, is level with it at the 290Wh entry tier, and answers with output: its C1000 Gen 2 delivers 2,000W where EcoFlow's 1,024Wh units deliver 1,800W. None need an electrician, and none qualify for the federal battery rebate.",
  atAGlance: [
    { k: "Type", v: "Portable power stations and the SOLIX X1 home battery" },
    { k: "AU range", v: "288Wh to 3,840Wh portable" },
    { k: "Price", v: "A$449 to A$5,399, read 24 Aug 2026" },
    { k: "Most output under A$2,000", v: "C1000 Gen 2, 2,000W" },
    { k: "Installation", v: "None needed for portable units" },
    { k: "Federal rebate", v: "Portable units are not eligible" },
  ],
  hero: {
    h1Prefix: "Anker SOLIX in Australia:",
    h1Highlight: "the range priced per watt-hour",
    subheading:
      "Real Australian dollar prices across the portable range, read off Anker's own AU store, sorted by the figure that makes different capacities comparable.",
    trustBullets: [
      "A$449 for 288Wh up to A$5,399 for 3,840Wh",
      "2,000W output at 1,024Wh, above EcoFlow's 1,800W",
      "No electrician, so renters and apartments can use one",
      "Prices read off Anker's own AU store, 24 August 2026",
    ],
  },
  banner: {
    heading: "Continue to Anker SOLIX Australia",
    body: "Opens Anker SOLIX's Australian store. Prices change often in this category, so check the current figure before you buy.",
    buttonLabel: "See Anker SOLIX prices",
  },
  sections: [
    {
      heading: "What Anker SOLIX sells in Australia",
      paragraphs: [
        "The portable range, the C and F series, are appliances: you charge them from a wall socket and plug devices into them. No installer, no switchboard work, and they move house with you. Separately Anker sells the SOLIX X1, an installed whole-home battery fitted through its own installer partners, which is a different product and a different decision.",
        "This page covers the portable range, where Anker publishes prices you can compare directly. If you are weighing an installed system the rebate rules change the arithmetic entirely, and our portable versus installed page sets that out.",
      ],
    },
    {
      heading: "How the range is priced",
      paragraphs: [
        "Entry is the C300 DC at A$449 for 288Wh. The C1000 Gen 2 at A$1,599 gives 1,024Wh with 2,000W output, and the C2000 Gen 2 at A$2,699 doubles capacity to 2,048Wh at 2,400W. The largest single unit is the F3800 at A$5,399 for 3,840Wh and 6,000W, which is the most output in either range short of EcoFlow's top model.",
        "Anker's Australian site was running a dated sale when we read it, 17 August to 7 September 2026, advertising up to 55% off across its range. The power station models above each showed a single price rather than a struck-through one, so we cannot tell you whether those are sale prices or standing prices. Several EcoFlow models did show a struck-through price, and EcoFlow's advantage narrows at its regular figures without disappearing.",
      ],
    },
    {
      heading: "Where Anker wins, and where it does not",
      paragraphs: [
        "It costs more per watt-hour than EcoFlow at the 1,000Wh and 2,000Wh tiers: about $1.42/Wh for the C1000 against $0.98/Wh for EcoFlow's DELTA 3 Classic. At the entry tier they are level, both charging A$449, though EcoFlow's 286Wh unit puts out 600W against the C300 DC's 300W. What it offers instead is output. The C1000 Gen 2 delivers 2,000W where EcoFlow's 1,024Wh units deliver 1,800W, and output is what decides whether a kettle, a microwave or a power tool runs at all rather than how long it runs.",
        "Buy EcoFlow if you are buying stored energy per dollar. Buy Anker if you are buying the ability to run something demanding.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start with the hardest thing you want to run", body: "A kettle or a microwave draws around 1,200W, a portable air conditioner about 1,000W. That number sets the output you need." },
    { num: "2", heading: "Check output first if it is high-draw", body: "This is Anker's advantage. A 2,000W unit runs things a 1,800W one refuses, regardless of capacity." },
    { num: "3", heading: "Compare per watt-hour", body: "Divide price by capacity, then decide whether the extra output is worth the higher rate." },
    { num: "4", heading: "Open Anker SOLIX through the link", body: "Prices move often in this category, so confirm the current figure on Anker's own store before buying." },
  ],
  whyUseThis: [
    "Real Australian dollar prices, read off Anker's own store and dated, not converted from US pricing",
    "Every model priced per watt-hour so different capacities can be compared",
    "States plainly where EcoFlow is cheaper, and what Anker gives you instead",
    "Written for renters and apartments, who cannot install a fixed battery",
  ],
  faqs: [
    {
      q: "How much does an Anker SOLIX cost in Australia?",
      a: "From A$449 for the 288Wh C300 DC to A$5,399 for the 3,840Wh F3800. The middle of the range is the C1000 Gen 2 at A$1,599 for 1,024Wh and the C2000 Gen 2 at A$2,699 for 2,048Wh. Read off Anker's own AU store on 24 August 2026, where no struck-through prices were shown on these models.",
    },
    {
      q: "Is Anker SOLIX better than EcoFlow?",
      a: "Not on price. EcoFlow is cheaper per watt-hour at the 1,000Wh and 2,000Wh tiers: about $0.98/Wh against $1.42/Wh at roughly 1,000Wh. At the 290Wh entry tier both charge A$449. Anker's case is output, 2,000W on the C1000 Gen 2 against 1,800W on EcoFlow's equivalents, which decides whether high-draw appliances run at all. Buy on price and it is EcoFlow; buy to run a kettle or a power tool and Anker earns the premium.",
    },
    {
      q: "Will an Anker SOLIX run my fridge?",
      a: "A 1,024Wh unit such as the C1000 Gen 2 will hold a typical fridge-freezer for roughly six to eight hours once inverter losses are accounted for, since a fridge cycles rather than drawing continuously. Check the surge rating for the compressor start-up, which is much higher than the running draw.",
    },
    {
      q: "Does an Anker SOLIX qualify for the federal battery rebate?",
      a: "No. The Cheaper Home Batteries program applies to systems installed by an accredited installer, not to a plug-in appliance. Anker's installed SOLIX X1 is a separate product sold through installer partners and does qualify, since it is fitted by an installer.",
    },
    {
      q: "Is there an Anker SOLIX discount code?",
      a: "Refer Labs does not hold one, and Anker does not publish a standing public code. It runs dated sales instead: when we read these prices on 24 August 2026 its Australian site was advertising up to 55% off, running 17 August to 7 September. The saving worth chasing is a sale on the model you want rather than a code.",
    },
    {
      q: "Does Refer Labs earn from this page?",
      a: "Yes, we earn a commission if you buy through the link, at no extra cost to you. We earn from EcoFlow too, so the comparison here runs on cost per watt-hour taken from each company's published prices. We also earn from Apollo Energy Group on installed batteries, and Anker's SOLIX X1 competes with them.",
    },
  ],
  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Portable power", href: "/portable-power-station-australia" },
    { label: "Anker SOLIX" },
  ],
  relatedLinks: [
    { href: "/ecoflow-vs-anker-solix", label: "EcoFlow vs Anker SOLIX", desc: "Both ranges priced per watt-hour at matching capacities." },
    { href: "/portable-power-station-australia", label: "What portable power costs and runs", desc: "Prices, runtimes and who each size suits." },
    { href: "/portable-vs-installed-home-battery-australia", label: "Portable vs installed", desc: "Where each wins, and which one the rebate applies to." },
  ],
  ctas: {
    primary: "See Anker SOLIX prices",
    secondary: "Compare with EcoFlow",
    midHeading: "Check the current price before you buy",
    midBody:
      "Anker runs periodic sales, so the figures on this page are a snapshot. Open the store and confirm what the model you want costs today.",
    midButton: "See Anker SOLIX prices",
    bottomHeading: "Output or capacity?",
    bottomBody:
      "If the highest-draw thing you want to run is a kettle or a power tool, Anker's extra output is the reason to pay more. If it is a fridge and devices, compare on price per watt-hour instead.",
    bottomButton: "Open Anker SOLIX Australia",
  },
  disclaimer:
    "Refer Labs is an independent comparison publisher, not a retailer. Prices were read off Anker SOLIX's own Australian store on 24 August 2026 and change often, so confirm the current figure before you buy. This page contains a disclosed affiliate link: we may earn a commission at no extra cost to you, and it never changes a comparison or a conclusion.",
};
