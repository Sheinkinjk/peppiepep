import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ECOFLOW_URL } from "@/lib/affiliate-links";

// Every price here was read off au.ecoflow.com on 24 August 2026 and is recorded
// once in src/lib/portable-power.ts, which the comparison tables render from.
// Several models were on sale when read; where that is stated the regular price
// is named too, so a sale is never presented as the standing price.
export const ecoflowConfig: AffiliatePageConfig = {
  brand: "EcoFlow",
  logo: "ecoflow",
  badgeText: "Portable power",
  eyebrow: "Portable power · Australia",
  affiliateUrl: ECOFLOW_URL,
  quickAnswer:
    "EcoFlow sells portable power stations in Australia from A$299 for a 245Wh RIVER 3 to A$7,299 for a 6,144Wh DELTA Pro Ultra. At the 1,000Wh and 2,000Wh tiers, where most buyers land, EcoFlow costs less per watt-hour than Anker SOLIX: about $0.98/Wh for the 1,024Wh DELTA 3 Classic at A$999. At the 290Wh entry tier the two are level on price. None of them need an electrician, so they suit renters and apartments, and none of them qualify for the federal battery rebate.",
  atAGlance: [
    { k: "Type", v: "Portable power stations and home batteries" },
    { k: "AU range", v: "245Wh to 6,144Wh portable" },
    { k: "Price", v: "A$299 to A$7,299, read 24 Aug 2026" },
    { k: "Cheapest 1,000Wh", v: "DELTA 3 Classic, A$999" },
    { k: "Installation", v: "None needed for portable units" },
    { k: "Federal rebate", v: "Portable units are not eligible" },
  ],
  hero: {
    h1Prefix: "EcoFlow in Australia:",
    h1Highlight: "the range priced per watt-hour",
    subheading:
      "Real Australian dollar prices across the whole portable range, read off EcoFlow's own AU store, sorted by the only figure that makes different capacities comparable.",
    trustBullets: [
      "A$299 for 245Wh up to A$7,299 for 6,144Wh",
      "Cheaper per watt-hour than Anker SOLIX at every shared capacity",
      "No electrician, so renters and apartments can use one",
      "Prices read off EcoFlow's own AU store, 24 August 2026",
    ],
  },
  banner: {
    heading: "Continue to EcoFlow Australia",
    body: "Opens EcoFlow's Australian store. Prices change often in this category, so check the current figure before you buy.",
    buttonLabel: "See EcoFlow prices",
  },
  sections: [
    {
      heading: "What EcoFlow sells in Australia",
      paragraphs: [
        "Two things that are easy to confuse. The portable range, DELTA and RIVER, are appliances you plug into a wall socket to charge and plug devices into to run. They need no installer and move with you. The OCEAN 2 and PowerOcean systems are installed whole-home batteries, wired into your switchboard by an accredited installer, which is a different purchase entirely.",
        "This page covers the portable range, because that is where EcoFlow publishes prices you can compare directly and where the buying decision is one you can make yourself. If you are weighing an installed system, the rebate rules and the arithmetic are different and our portable versus installed page sets them out.",
      ],
    },
    {
      heading: "How the range is priced",
      paragraphs: [
        "The entry point is the RIVER 3 at A$299 for 245Wh, enough to keep a router and phones going. The DELTA 3 Classic at A$999 is the first unit with enough capacity, 1,024Wh, to hold a fridge up for most of a day, and at about $0.98/Wh it is the cheapest rate of anything under A$2,000 in either brand's range. Only the 3,600Wh DELTA Pro at A$2,999 beats it outright, at about $0.83/Wh. Above that, capacity climbs to the DELTA Pro Ultra at A$7,299 for 6,144Wh and 6,900W of output.",
        "Several models were discounted when we read them, the DELTA 3 Classic down from A$1,199 and the DELTA Pro from A$3,999. The comparison still favours EcoFlow at regular prices, but by a narrower margin, so it is worth checking whether a sale is running when you buy.",
      ],
    },
    {
      heading: "Output matters more than most buyers expect",
      paragraphs: [
        "Capacity in watt-hours decides how long something runs. Output in watts decides whether it runs at all. EcoFlow's 1,024Wh units deliver 1,800W continuous, which is below the 2,000W that Anker's C1000 Gen 2 delivers at the same capacity. For electronics and a fridge that difference is academic; for a kettle, a microwave or a power tool it is the whole decision.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Work out your load", body: "Add up what you actually need running: a fridge averages about 100W, a laptop 60W, a router and phones about 20W." },
    { num: "2", heading: "Then check output, not just capacity", body: "Anything with a heating element or a compressor needs high continuous output and a surge headroom above that." },
    { num: "3", heading: "Compare per watt-hour", body: "Divide price by capacity. It is the only way two units of different sizes can be compared fairly." },
    { num: "4", heading: "Open EcoFlow through the link", body: "Prices move often in this category, so confirm the current figure on EcoFlow's own store before buying." },
  ],
  whyUseThis: [
    "Real Australian dollar prices, read off EcoFlow's own store and dated, not converted from US pricing",
    "Every model priced per watt-hour so different capacities can be compared",
    "Sale prices shown next to the regular price, so a discount is not mistaken for the standing price",
    "Written for renters and apartments, who cannot install a fixed battery",
  ],
  faqs: [
    {
      q: "How much does an EcoFlow cost in Australia?",
      a: "From A$299 for the 245Wh RIVER 3 to A$7,299 for the 6,144Wh DELTA Pro Ultra. The most useful middle is the 1,024Wh DELTA 3 Classic at A$999, which works out at about $0.98 per watt-hour, the cheapest rate under A$2,000 in either Australian range. The 3,600Wh DELTA Pro at A$2,999 is cheaper still per watt-hour, at about $0.83/Wh, if you need that much capacity. Read off EcoFlow's own AU store on 24 August 2026; several models were on sale at the time.",
    },
    {
      q: "Is EcoFlow cheaper than Anker SOLIX?",
      a: "Yes, at the two tiers most people buy in. At roughly 1,000Wh the DELTA 3 Classic is A$999 against A$1,499 for Anker's C1000. At roughly 2,000Wh the DELTA 2 Max is A$2,099 against A$2,699 for the C2000 Gen 2. Anker's answer is output rather than price: its C1000 Gen 2 delivers 2,000W where EcoFlow's equivalents deliver 1,800W.",
    },
    {
      q: "Will an EcoFlow run my fridge?",
      a: "A 1,024Wh unit will hold a typical fridge-freezer for roughly six to eight hours once inverter losses are accounted for, because a fridge cycles rather than drawing continuously. The thing to check is the start-up surge when the compressor kicks in, which is much higher than the running figure and is a function of the unit's output rating rather than its capacity.",
    },
    {
      q: "Does an EcoFlow qualify for the federal battery rebate?",
      a: "No. The Cheaper Home Batteries program applies to systems installed by an accredited installer, not to an appliance you plug in. EcoFlow's installed OCEAN 2 range is a different product and a different conversation. If the rebate is central to your decision you are looking at an installed battery.",
    },
    {
      q: "Is there an EcoFlow discount code?",
      a: "Refer Labs does not hold a discount code for EcoFlow, and EcoFlow does not publish a standing public one. What it does run is frequent sales on individual models, several of which were live when we read the prices on this page. The saving worth chasing is the sale rather than a code, so check the current price on the model you want.",
    },
    {
      q: "Does Refer Labs earn from this page?",
      a: "Yes, we earn a commission if you buy through the link, at no extra cost to you. We also earn from Anker SOLIX, which is why our comparison of the two runs on cost per watt-hour taken from each company's own published prices rather than on a preference. We earn from Apollo Energy Group on installed batteries as well, and EcoFlow's installed range competes with them.",
    },
  ],
  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Portable power", href: "/portable-power-station-australia" },
    { label: "EcoFlow" },
  ],
  relatedLinks: [
    { href: "/ecoflow-vs-anker-solix", label: "EcoFlow vs Anker SOLIX", desc: "Both ranges priced per watt-hour at matching capacities." },
    { href: "/portable-power-station-australia", label: "What portable power costs and runs", desc: "Prices, runtimes and who each size suits." },
    { href: "/portable-vs-installed-home-battery-australia", label: "Portable vs installed", desc: "Where each wins, and which one the rebate applies to." },
  ],
  ctas: {
    primary: "See EcoFlow prices",
    secondary: "Compare with Anker SOLIX",
    midHeading: "Check the current price before you buy",
    midBody:
      "EcoFlow discounts individual models often, so the figure on this page is a snapshot rather than a standing price. Open the store and confirm what the model you want costs today.",
    midButton: "See EcoFlow prices",
    bottomHeading: "Ready to compare properly?",
    bottomBody:
      "Divide price by capacity and compare per watt-hour, then check the output rating against the highest-draw thing you intend to run.",
    bottomButton: "Open EcoFlow Australia",
  },
  disclaimer:
    "Refer Labs is an independent comparison publisher, not a retailer. Prices were read off EcoFlow's own Australian store on 24 August 2026 and change often, so confirm the current figure before you buy. This page contains a disclosed affiliate link: we may earn a commission at no extra cost to you, and it never changes a comparison or a conclusion.",
};
