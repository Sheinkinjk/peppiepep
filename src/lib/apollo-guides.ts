import type { ApolloGuideConfig } from "@/components/consumer/ApolloGuide";

// Registry for the home-battery guide cluster (funnels to Apollo Energy Group).
// Each entry is a distinct high-intent query gap, checked against the existing
// Apollo pages (hub, review, federal rebate, cost, payback calculator) to avoid
// cannibalisation. Copy is unique per page. Rebate figures are indicative only.

export interface ApolloGuideEntry extends ApolloGuideConfig {
  meta: { title: string; description: string; keywords: string[] };
  priority: number;
}

const R = {
  hub: { href: "/apollo-energy", label: "Apollo Energy & the $500 offer" },
  review: { href: "/apollo-energy-review", label: "Is Apollo legit? (reviewed)" },
  rebate: { href: "/home-battery-rebate-australia", label: "The federal battery rebate" },
  cost: { href: "/home-battery-cost-australia", label: "What a battery costs" },
  calc: { href: "/home-battery-payback-calculator", label: "Payback calculator" },
};

export const APOLLO_GUIDES: ApolloGuideEntry[] = [
  {
    slug: "/best-home-battery-australia",
    crumb: "Best home battery",
    priority: 0.82,
    h1: "Best home battery in Australia: how to actually choose one",
    meta: {
      title: "Best Home Battery Australia 2026: How to Choose | Refer Labs",
      description:
        "How to choose the best home battery for your home in Australia: capacity, chemistry, warranty, blackout backup and VPP-readiness, plus why the installer matters as much as the battery. Indicative figures only.",
      keywords: ["best home battery australia", "best solar battery australia", "how to choose a home battery", "home battery comparison australia"],
    },
    lead:
      "There is no single best home battery, because the right one depends on how much power you use, whether you have solar, and what you want the battery to do. The battery that suits a family running air-conditioning off a big rooftop solar system is not the one that suits a couple wanting blackout backup. Rather than chase a brand name, the useful question is which capacity, chemistry and warranty fit your home, and, just as importantly, who installs it. A well-sized system from an accredited installer beats a bigger battery fitted badly.",
    sections: [
      {
        h: "The factors that actually decide it",
        body: ["Six things separate a battery that pays its way from one that disappoints, and none of them is the logo on the front."],
        bullets: [
          "Usable capacity (kWh): enough to cover your evening and overnight use, without paying for capacity you never fill.",
          "Chemistry: most home batteries now use lithium iron phosphate (LFP), valued for its safety and cycle life.",
          "Warranty: look at the years and the throughput or cycle guarantee, not just the headline number.",
          "Blackout backup: not every battery keeps your home running in an outage, and the ones that do may need extra hardware.",
          "VPP-readiness: whether it can join a Virtual Power Plant, which can add value and, in some states, an incentive.",
          "The installer: accreditation, licensing and workmanship warranty matter as much as the cell inside.",
        ],
      },
      {
        h: "Match the battery to what you want it to do",
        body: [
          "If the goal is cutting your bill, size the battery to store your surplus solar and cover your evening peak, when power is dearest. Oversizing past that just adds cost you may never recover.",
          "If the goal is keeping the lights on in a blackout, the priority shifts to backup capability and which circuits it protects, not raw storage. Many households want a bit of both, which is exactly the trade a good installer helps you weigh from your actual usage rather than a brochure.",
        ],
      },
      {
        h: "Why the installer matters as much as the battery",
        body: [
          "A battery is a long-lived, high-value piece of electrical equipment wired into your home, so who installs it shapes both safety and how well it performs. The markers worth checking are SAA accreditation, a valid electrical licence, and a real workmanship warranty alongside the manufacturer's.",
          "Apollo Energy Group is one SAA-accredited Australian installer (Electrical Licence 400672, 10-year battery warranty) that sizes systems from your real usage and applies the federal rebate at the point of sale. Refer Labs readers get $500 off their quote through our link, on top of the rebate.",
        ],
      },
    ],
    faqs: [
      { q: "What is the best home battery brand in Australia?", a: "There isn't a single best brand, because the right battery depends on your usage, whether you have solar, and whether you want backup. What matters more is matching usable capacity, chemistry and warranty to your home, and using an accredited installer who sizes it from your real usage rather than a default package." },
      { q: "How many kWh of battery do I need?", a: "Enough to cover your evening and overnight use, usually after your solar has charged it during the day. Oversizing past what you actually use adds cost you may not recover, and the federal rebate also tapers above 14kWh. A good installer sizes it from your usage data." },
      { q: "Does the installer really matter?", a: "Yes, as much as the battery. A battery is high-value electrical equipment wired into your home, so accreditation (SAA), a valid electrical licence, and a workmanship warranty are worth checking. A well-installed, well-sized system outperforms a bigger battery fitted poorly." },
      { q: "Can I get money off a home battery?", a: "Yes. The federal Cheaper Home Batteries rebate reduces the cost at the point of sale, and some states add their own incentives. Refer Labs readers also get $500 off an Apollo Energy quote through our link. Figures are indicative and depend on your system and the current rebate terms." },
    ],
    related: [R.cost, R.rebate, R.calc, R.hub, R.review],
  },

  {
    slug: "/what-size-home-battery-do-i-need-australia",
    crumb: "What size battery",
    priority: 0.8,
    h1: "What size home battery do I need?",
    meta: {
      title: "What Size Home Battery Do I Need? (Australia 2026) | Refer Labs",
      description:
        "How to size a home battery in Australia: work from your evening and overnight usage, your solar, and your goal (bill savings vs backup), and note the rebate tapers above 14kWh. Indicative figures only.",
      keywords: ["what size home battery do i need", "home battery sizing australia", "how many kwh battery", "home battery size calculator australia"],
    },
    lead:
      "The right size home battery is the one that covers the power you use when your solar isn't producing, mainly the evening and overnight, without paying for capacity you never fill. For many Australian homes that lands somewhere in the 10 to 14kWh range, though it depends on your daily usage, how much solar you have to charge it, and whether you mainly want to cut your bill or keep the lights on in a blackout. It is also worth knowing the federal rebate tapers above 14kWh, which shapes the value of going bigger.",
    sections: [
      {
        h: "Start with your usage, not a battery size",
        body: [
          "Look at your electricity bill for your average daily usage in kilowatt-hours, then think about how much of that happens after the sun goes down. A battery's job is mostly to shift your daytime solar into your evening and overnight use, so the number that matters is your off-solar consumption, not your total.",
          "A rough way in: if you use 20kWh a day and roughly half of that is in the evening and overnight, a battery in the 10 to 12kWh usable range covers most of it. Bigger only helps if you actually use more after dark or want deeper backup.",
        ],
      },
      {
        h: "Factor in your solar",
        body: [
          "A battery is only as useful as the surplus solar you have to fill it. If your panels comfortably cover your daytime use and still export a healthy amount, you have surplus to store, and a battery captures it instead of selling it back cheaply. If your solar is small or your daytime use is high, there may be little left to charge a large battery, which caps the sensible size.",
          "This is why sizing is a two-sided sum: your evening demand on one side, your spare solar on the other. The battery that fits sits where those two meet.",
        ],
      },
      {
        h: "Bill savings or blackout backup?",
        body: ["Your goal changes the sizing as much as your usage does."],
        bullets: [
          "Mainly bill savings: size to your evening and overnight use, and stop there. Extra capacity you rarely fill rarely pays back.",
          "Mainly backup: you may size a little larger and prioritise batteries and setups that actually run your home during an outage, which not all do.",
          "A bit of both: the common case, and where sizing from real usage data earns its keep.",
        ],
      },
      {
        h: "The rebate taper: why 14kWh is a marker",
        body: [
          "The federal Cheaper Home Batteries rebate is strongest on the first portion of capacity and tapers as systems get larger, with the step often described around 14kWh of usable capacity. Indicatively it is worth roughly $252 per usable kWh at the current spot price, applied at the point of sale, though the STC price floats so treat any figure as a guide.",
          "The practical upshot is that the first 10 to 14kWh tends to carry the best rebate value, and going much larger is a decision about your actual needs rather than chasing subsidy. An installer can model the sweet spot for your home.",
        ],
      },
    ],
    faqs: [
      { q: "How many kWh battery do I need for my house?", a: "Enough to cover your evening and overnight electricity use, once your solar has charged it during the day. For many Australian homes that is roughly 10 to 14kWh of usable capacity, but it depends on your daily usage, your solar, and whether you want backup. Sizing from your bill and usage data is the accurate way to decide." },
      { q: "Is a bigger home battery always better?", a: "No. Beyond the capacity you actually use after dark, extra size adds cost you may not recover, and the federal rebate tapers above around 14kWh of usable capacity. The best size is matched to your usage and your spare solar, not maximised." },
      { q: "Does my solar system size affect the battery size?", a: "Yes. A battery can only store the surplus solar you generate, so a small solar system or high daytime use limits how much a large battery can usefully charge. Sizing balances your evening demand against your spare solar." },
      { q: "How do I get my home battery sized accurately?", a: "An accredited installer models it from your real usage data and solar, rather than selling a default package. Apollo Energy Group sizes from your usage and applies the federal rebate at the point of sale; Refer Labs readers get $500 off through our link." },
    ],
    related: [R.calc, R.cost, R.rebate, R.hub, R.review],
  },

  {
    slug: "/nsw-home-battery-rebate-2026",
    crumb: "NSW battery rebate",
    priority: 0.8,
    h1: "NSW home battery rebate 2026: what you can stack",
    meta: {
      title: "NSW Home Battery Rebate 2026: Federal + NSW Incentives | Refer Labs",
      description:
        "What NSW households can get on a home battery in 2026: the federal Cheaper Home Batteries rebate applied at sale, plus the NSW VPP incentive on top. How they stack, and what's indicative. Not financial advice.",
      keywords: ["nsw home battery rebate 2026", "nsw battery rebate", "home battery rebate nsw", "nsw vpp incentive battery"],
    },
    lead:
      "If you are in NSW, a home battery in 2026 can attract two separate incentives that stack. The big one is the federal Cheaper Home Batteries rebate, which reduces the cost at the point of sale, indicatively worth around $252 per usable kWh at the current spot price and tapering on larger systems. On top of that, NSW offers a Virtual Power Plant (VPP) incentive, commonly around $1,500, for connecting an eligible battery to a VPP. The two are designed to work together, so a NSW household can claim the federal discount and the state VPP incentive on the same battery.",
    sections: [
      {
        h: "The federal rebate (applied at the point of sale)",
        body: [
          "The federal Cheaper Home Batteries program discounts an eligible battery when you buy it, rather than as a claim you chase later. Your installer applies it, which is why you see it reflected in the quote. Indicatively it is worth around $252 per usable kWh at the current spot price, strongest on the first portion of capacity and tapering as systems grow past roughly 14kWh usable.",
          "Because it is tied to the STC spot price, which floats, treat any dollar figure as a guide rather than a fixed amount. The current terms and your exact discount are confirmed in your quote.",
        ],
      },
      {
        h: "The NSW VPP incentive (on top)",
        body: [
          "Separately, NSW offers an incentive, commonly cited around $1,500, for connecting an eligible home battery to a Virtual Power Plant. A VPP lets your battery be called on to support the grid at peak times in exchange for the incentive and, often, ongoing value.",
          "This is stackable with the federal rebate, so a NSW household can benefit from the point-of-sale federal discount and then the state VPP incentive for joining a VPP. Eligibility, the exact amount and the VPP terms can change, so confirm the current details before you rely on them.",
        ],
      },
      {
        h: "Getting both, without the paperwork headache",
        body: [
          "The cleanest way to capture both is to use an installer who handles the federal rebate at the point of sale and can connect you to an eligible VPP. That keeps the federal discount off your upfront price and sets up the NSW VPP incentive rather than leaving you to navigate it alone.",
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672, 10-year battery warranty) that applies the federal rebate at the point of sale. Refer Labs readers also get $500 off their quote through our link, on top of the rebates above.",
        ],
      },
    ],
    faqs: [
      { q: "Can NSW households get both the federal rebate and a state incentive on a battery?", a: "Yes. The federal Cheaper Home Batteries rebate (applied at the point of sale) and the NSW VPP incentive (commonly around $1,500 for connecting an eligible battery to a Virtual Power Plant) are designed to stack. A NSW home can benefit from both on the same battery. Amounts and eligibility can change, so confirm current terms." },
      { q: "How much is the NSW home battery rebate?", a: "There are two parts. The federal rebate is indicatively worth around $252 per usable kWh at the current spot price, applied at sale and tapering on larger systems. The NSW VPP incentive is commonly cited around $1,500 for joining a Virtual Power Plant. Both float with policy and the STC price, so treat figures as a guide." },
      { q: "What is a VPP and do I have to join one?", a: "A Virtual Power Plant links your battery with others so it can support the grid at peak times in exchange for an incentive and ongoing value. In NSW, joining an eligible VPP is what unlocks the state incentive. It is optional, but it is the path to that extra amount." },
      { q: "Is the rebate a claim I make later?", a: "The federal rebate is applied by your installer at the point of sale, so it comes off your quoted price rather than being claimed back afterwards. The NSW VPP incentive is tied to connecting to a VPP. Your installer can walk you through both; confirm the current terms before committing." },
    ],
    related: [R.rebate, R.cost, R.calc, R.hub, R.review],
  },

  {
    slug: "/home-battery-installer-nsw",
    crumb: "Choosing a NSW installer",
    priority: 0.78,
    h1: "Choosing a home battery installer in NSW",
    meta: {
      title: "Home Battery Installer NSW 2026: What to Check | Refer Labs",
      description:
        "How to choose a home battery installer in NSW: SAA accreditation, electrical licensing, warranties, and handling the federal rebate + NSW VPP. What separates a solid installer from a storefront.",
      keywords: ["home battery installer nsw", "solar battery installer sydney", "battery installer nsw", "home battery installation nsw"],
    },
    lead:
      "Choosing who installs your home battery matters as much as choosing the battery, because it is high-value electrical equipment wired into your home and it needs to be sized, installed and warranted properly. In NSW the markers to look for are SAA accreditation, a valid electrical licence, a genuine workmanship warranty alongside the manufacturer's, and an installer who applies the federal rebate at the point of sale and can connect you to a Virtual Power Plant for the NSW incentive. A well-sized system from an accredited installer will out-perform a bigger battery fitted badly.",
    sections: [
      {
        h: "What to check before you sign",
        body: ["A few checks separate a serious NSW installer from a landing page with a quote form."],
        bullets: [
          "SAA accreditation: the industry accreditation for battery and solar installers.",
          "A valid electrical licence: batteries are wired into your switchboard, so licensed work is non-negotiable.",
          "Warranties in writing: both the manufacturer's battery warranty and the installer's workmanship warranty.",
          "Rebate handling: an installer who applies the federal Cheaper Home Batteries rebate at the point of sale, so it comes off your price.",
          "VPP connection: whether they can connect you to an eligible Virtual Power Plant for the NSW incentive.",
          "Sizing from your usage: a quote built from your actual bills and solar, not a default package.",
        ],
      },
      {
        h: "Sizing and quoting done properly",
        body: [
          "A good NSW installer starts with your usage, not a product. They look at how much power you use in the evening and overnight, how much surplus solar you have to charge a battery, and what you want it to do, then size the system to that. That is the difference between a battery that pays its way and one that is too big or too small for your home.",
          "The quote should show the battery, the install, the federal rebate applied at sale, and any workmanship warranty, so you can see the real out-the-door price rather than a headline before subsidies.",
        ],
      },
      {
        h: "One NSW-based, accredited option",
        body: [
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672, ABN 55697998208), offering systems in the 9kWh to 54kWh range with a 10-year battery warranty. It sizes from your real usage and applies the federal rebate at the point of sale.",
          "Refer Labs readers get $500 off an Apollo quote through our link, on top of the federal rebate. As with any installer, get the sizing, warranty and rebate detail in writing before you commit.",
        ],
      },
    ],
    faqs: [
      { q: "What should I check in a NSW home battery installer?", a: "SAA accreditation, a valid electrical licence, written manufacturer and workmanship warranties, whether they apply the federal rebate at the point of sale, whether they can connect you to a VPP for the NSW incentive, and whether they size the system from your actual usage rather than selling a default package." },
      { q: "Does the installer apply the rebate or do I claim it?", a: "A good installer applies the federal Cheaper Home Batteries rebate at the point of sale, so it comes off your quoted price rather than being claimed back later. In NSW they can also connect you to an eligible Virtual Power Plant, which is what unlocks the state incentive." },
      { q: "Is Apollo Energy a legitimate NSW installer?", a: "Apollo Energy Group is a NSW-based, SAA-accredited installer with Electrical Licence 400672 and ABN 55697998208, offering a 10-year battery warranty. You can read our fuller review, and as with any installer, get the sizing, warranty and rebate detail in writing before committing." },
      { q: "How much does installation cost in NSW?", a: "It depends on the battery size, your switchboard and whether backup is included, and the federal rebate comes off at the point of sale. Rather than a headline figure, get a quote sized to your usage that shows the price after the rebate. Refer Labs readers get $500 off an Apollo quote through our link." },
    ],
    related: [R.review, R.hub, R.rebate, R.cost, R.calc],
  },
];

export const APOLLO_GUIDE_BY_SLUG: Record<string, ApolloGuideEntry> =
  Object.fromEntries(APOLLO_GUIDES.map((g) => [g.slug, g]));
