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
      "If you are in NSW, a home battery in 2026 can attract two separate incentives that stack. The big one is the federal Cheaper Home Batteries rebate, which reduces the cost at the point of sale, indicatively worth around $252 per usable kWh at the current spot price and tapering on larger systems. On top of that, NSW pays a Virtual Power Plant (VPP) incentive of roughly $40 per usable kWh, capped at 28kWh (so up to about $1,100), for connecting an eligible battery to a VPP. The two are designed to work together, so a NSW household can claim the federal discount and the state VPP incentive on the same battery.",
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
          "Separately, NSW pays an incentive of roughly $40 per usable kWh, capped at 28kWh (so up to about $1,100), for connecting an eligible home battery to a Virtual Power Plant. A VPP lets your battery be called on to support the grid at peak times in exchange for the incentive and, often, ongoing value.",
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
      { q: "Can NSW households get both the federal rebate and a state incentive on a battery?", a: "Yes. The federal Cheaper Home Batteries rebate (applied at the point of sale) and the NSW VPP incentive (roughly $40 per usable kWh, capped at 28kWh, so up to about $1,100, for connecting an eligible battery to a Virtual Power Plant) are designed to stack. A NSW home can benefit from both on the same battery. Amounts and eligibility can change, so confirm current terms." },
      { q: "How much is the NSW home battery rebate?", a: "There are two parts. The federal rebate is indicatively worth around $252 per usable kWh at the current spot price, applied at sale and tapering on larger systems. The NSW VPP incentive is roughly $40 per usable kWh, capped at 28kWh, so up to about $1,100 for joining a Virtual Power Plant. Both float with policy and the STC price, so treat figures as a guide." },
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

  {
    slug: "/home-battery-installer-sydney",
    crumb: "Sydney installer",
    priority: 0.78,
    h1: "Home battery installers in Sydney: how to choose",
    meta: {
      title: "Home Battery Installer Sydney 2026: What to Check | Refer Labs",
      description:
        "Choosing a home battery installer in Sydney: SAA accreditation, electrical licensing, warranties, and who applies the federal rebate and connects you to a NSW VPP. Plus $500 off through Refer Labs.",
      keywords: ["home battery installer sydney", "solar battery installer sydney", "battery installation sydney", "home battery sydney"],
    },
    lead:
      "Sydney has more battery installers than almost anywhere in the country, which is good for choice and bad for telling them apart. The ones worth your time share a few traits: SAA accreditation, a valid electrical licence, warranties in writing, and a quote sized from your actual bills rather than a package pulled off a shelf. Because a battery is wired into your switchboard and meant to last a decade or more, who installs it in your Sydney home shapes both safety and how much it saves you.",
    sections: [
      {
        h: "What separates a real Sydney installer from a lead form",
        body: ["The Sydney market is crowded with quote-form sites that pass your details to whoever pays most. A genuine installer stands up to a few checks."],
        bullets: [
          "SAA accreditation and a valid NSW electrical licence, since the battery ties into your switchboard.",
          "Both warranties in writing: the manufacturer's on the battery, and the installer's on the workmanship.",
          "The federal Cheaper Home Batteries rebate applied at the point of sale, so it comes off your Sydney quote.",
          "A path to connect an eligible battery to a Virtual Power Plant for the NSW incentive.",
          "A quote sized from your usage and roof, not a one-size package.",
        ],
      },
      {
        h: "Sydney-specific things worth raising",
        body: [
          "Sydney homes vary enormously, from apartments and terraces with tight switchboard space to larger homes in the outer suburbs with big rooftop solar. That affects which battery fits, whether backup is practical, and how much surplus solar you actually have to store. A quote built around your address and usage will answer these; a flat package price will not.",
          "If keeping the lights on during a storm-season outage matters to you, say so up front, because not every battery provides blackout backup and the ones that do may need extra hardware.",
        ],
      },
      {
        h: "One accredited option that covers Sydney",
        body: [
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672, ABN 55697998208) that services Sydney, offering systems from 9kWh to 54kWh with a 10-year battery warranty. It sizes from your real usage and applies the federal rebate at the point of sale.",
          "Refer Labs readers get $500 off an Apollo quote through our link, on top of the federal rebate and any NSW VPP incentive. As with any Sydney installer, get the sizing, warranty and rebate detail in writing before you commit.",
        ],
      },
    ],
    faqs: [
      { q: "How do I choose a home battery installer in Sydney?", a: "Check SAA accreditation and a valid NSW electrical licence, get both the manufacturer and workmanship warranties in writing, confirm they apply the federal rebate at the point of sale and can connect you to a VPP for the NSW incentive, and make sure the quote is sized from your actual usage rather than a default package." },
      { q: "How much does home battery installation cost in Sydney?", a: "It depends on the battery size, your switchboard, and whether you want blackout backup, and the federal rebate comes off at the point of sale. Rather than a headline figure, get a quote sized to your usage that shows the price after the rebate. Refer Labs readers get $500 off an Apollo quote through our link." },
      { q: "Can I get the NSW rebate on a battery in Sydney?", a: "Yes. Sydney is in NSW, so both the federal Cheaper Home Batteries rebate (applied at sale) and the NSW VPP incentive (roughly $40 per usable kWh, capped at 28kWh) apply. An installer who handles both keeps the federal discount off your upfront price and sets up the VPP connection." },
      { q: "Does Apollo Energy install in Sydney?", a: "Apollo Energy Group is a NSW-based, SAA-accredited installer that services Sydney, with Electrical Licence 400672 and a 10-year battery warranty. Refer Labs readers get $500 off a quote through our link. As with any installer, confirm the sizing, warranty and rebate detail in writing first." },
    ],
    related: [{ href: "/home-battery-installer-nsw", label: "Choosing a NSW installer" }, R.review, R.hub, R.rebate, R.cost],
  },

  {
    slug: "/is-a-home-battery-worth-it-australia",
    crumb: "Is it worth it?",
    priority: 0.8,
    h1: "Is a home battery worth it in Australia?",
    meta: {
      title: "Is a Home Battery Worth It in Australia? (2026) | Refer Labs",
      description:
        "Whether a home battery is worth it in Australia comes down to your usage, your solar, your tariff and the rebates. When it pays off, when it doesn't, and how the federal rebate and $500 change the maths.",
      keywords: ["is a home battery worth it", "are home batteries worth it australia", "home battery worth it 2026", "solar battery worth it australia"],
    },
    lead:
      "Whether a home battery is worth it depends on your own numbers, not a headline. The batteries that pay their way tend to sit under a solar system that generates more than the household uses during the day, on a home with high evening and overnight consumption, in a state with a rebate. Where those line up, a battery stores cheap or free daytime solar and spends it at the expensive evening peak, and the federal rebate plus any state incentive shortens the payback. Where they don't, the sums are weaker, and it is worth being clear-eyed about that before you buy.",
    sections: [
      {
        h: "When a battery is most likely to be worth it",
        body: ["A battery earns its keep when several of these are true at once, not just one."],
        bullets: [
          "You have solar that regularly exports surplus, which is energy you could store instead of selling cheaply.",
          "Your evening and overnight use is high, so there is real peak-price power to offset.",
          "Your tariff has a wide gap between peak and off-peak or feed-in rates.",
          "You qualify for the federal rebate, and ideally a state incentive like the NSW VPP payment.",
          "You value blackout backup, which is a benefit that does not show up in a simple payback figure.",
        ],
      },
      {
        h: "When it is a weaker case",
        body: [
          "If you have little or no solar, a small roof, low daytime generation, or low overnight use, there may be little surplus to store and little peak use to offset, which stretches the payback. A flat tariff with a small peak-to-offpeak gap has the same effect.",
          "None of this means a battery is a bad idea in those cases, only that the financial case is softer and the decision leans more on backup and independence than on payback. The way to know is a projection built from your own bills rather than a brochure average.",
        ],
      },
      {
        h: "How the rebate and the $500 change the maths",
        body: [
          "The federal Cheaper Home Batteries rebate comes off the price at the point of sale, indicatively around $252 per usable kWh at the current spot price and tapering on larger systems, which materially shortens payback. In NSW, connecting to a Virtual Power Plant adds roughly $40 per usable kWh on top (capped at 28kWh). Figures float with certificate prices, so treat them as indicative.",
          "Refer Labs readers also get $500 off an Apollo Energy quote through our link, on top of any rebate. The cleanest way to see whether it stacks up for your home is a quote sized to your usage that shows the price after every discount.",
        ],
      },
    ],
    faqs: [
      { q: "Is a home battery worth it in Australia in 2026?", a: "It depends on your usage, solar, tariff and rebates. A battery is most worth it when you have surplus solar to store, high evening use, a wide peak-to-offpeak price gap, and you qualify for the federal rebate and a state incentive. With little solar or low overnight use, the financial case is weaker and the decision leans more on backup than payback." },
      { q: "How long does a home battery take to pay for itself?", a: "There is no single figure, because it depends on your bills, solar surplus, tariff and the rebates you qualify for. The federal rebate and, in NSW, the VPP incentive shorten it, and the $500 Refer Labs discount helps further. The reliable way to know is a payback projection built from your own usage rather than an average." },
      { q: "Does a home battery save money without solar?", a: "It can, by charging from the grid during cheap off-peak periods and discharging at the expensive peak, but the savings are usually smaller than when a battery stores surplus solar. Without solar the case leans more on backup and time-of-use arbitrage, so a projection from your own tariff and usage matters even more." },
      { q: "What makes a battery not worth it?", a: "Little or no solar, a small roof, low overnight use, or a flat tariff with a small peak-to-offpeak gap all weaken the financial case, because there is less surplus to store and less peak use to offset. In those cases the value is more about blackout backup and independence than payback." },
    ],
    related: [R.calc, R.cost, R.rebate, R.hub, R.review],
  },

  {
    slug: "/home-battery-blackout-backup-australia",
    crumb: "Blackout backup",
    priority: 0.78,
    h1: "Home batteries and blackout backup: what you need to know",
    meta: {
      title: "Home Battery Blackout Backup Australia 2026: How It Works | Refer Labs",
      description:
        "Not every home battery keeps your power on in a blackout. How backup actually works, what hardware it needs, how to size for it, and the rebate plus $500 off through Refer Labs.",
      keywords: ["home battery backup", "home battery blackout backup australia", "battery backup power outage", "does a home battery work in a blackout"],
    },
    lead:
      "One of the main reasons people buy a home battery is to keep the power on during an outage, but this is also the most misunderstood part. Not every battery provides blackout backup, and some that do only keep selected circuits running rather than the whole house. If backup is a priority, especially through storm season, it is worth understanding what backup actually requires before you buy, because it changes the hardware, the sizing and sometimes the price.",
    sections: [
      {
        h: "Why not every battery backs up your home",
        body: [
          "A surprising number of home batteries shut down in a blackout along with the grid, because keeping a battery running safely when the grid is down needs extra hardware that isolates your home from the network, so line workers are not put at risk. Without that hardware, the battery sits idle during the very event you bought it for.",
          "Backup also comes in degrees. Whole-home backup keeps everything running within the battery's limits; partial or essential-circuit backup keeps a chosen set of circuits alive, such as the fridge, lights and internet. Which one you get depends on the battery, the extra hardware and how it is wired.",
        ],
      },
      {
        h: "Sizing for backup is different from sizing for savings",
        body: ["A battery sized to trim your bill is not automatically sized to run your home through an outage."],
        bullets: [
          "Backup capability: confirm the battery supports it, and whether it needs a backup gateway or similar hardware.",
          "Whole-home vs essential circuits: decide what you actually need running, since whole-home backup costs more.",
          "Usable capacity for an outage: enough to cover your essential load for the length of blackout you want to ride through.",
          "Recharge during an outage: whether your solar can recharge the battery while the grid is down, which extends how long backup lasts.",
        ],
      },
      {
        h: "Getting backup specified properly",
        body: [
          "Because backup adds hardware and changes the wiring, it is something to raise with your installer at the quote stage rather than assume. A good installer will tell you honestly whether whole-home backup is practical for your switchboard or whether essential-circuit backup is the sensible option, and what each costs.",
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672) that sizes systems from your real usage and can specify backup as part of the quote. Refer Labs readers get $500 off through our link, on top of the federal rebate. Confirm exactly what backup you are getting, and what it covers, in writing.",
        ],
      },
    ],
    faqs: [
      { q: "Does a home battery work in a blackout?", a: "Only if it is designed for backup and has the extra hardware to run safely while the grid is down. Many batteries shut off in an outage along with the grid, because isolating your home from the network needs a backup gateway or similar. Confirm backup capability and what it covers before you buy." },
      { q: "Does a battery back up my whole house or just some circuits?", a: "It depends on the battery, the hardware and the wiring. Whole-home backup keeps everything running within the battery's limits and costs more; essential-circuit backup keeps a chosen set of circuits alive, such as the fridge, lights and internet. Decide what you actually need and have the installer specify it." },
      { q: "How big a battery do I need for backup?", a: "Enough usable capacity to cover your essential load for the length of outage you want to ride through, which is a different calculation from sizing to cut your bill. If your solar can recharge the battery during the day, backup lasts longer. An installer can size it from your usage and the circuits you want protected." },
      { q: "Can I get a rebate on a battery with backup?", a: "Yes. The federal Cheaper Home Batteries rebate applies at the point of sale regardless of whether you include backup, and in NSW the VPP incentive can apply on top. Refer Labs readers also get $500 off an Apollo quote through our link. Backup adds hardware, so get the full price in writing." },
    ],
    related: [{ href: "/is-a-home-battery-worth-it-australia", label: "Is a battery worth it?" }, R.cost, R.hub, R.review, R.calc],
  },

  {
    slug: "/solar-and-battery-package-australia",
    crumb: "Solar and battery packages",
    priority: 0.8,
    h1: "Solar and battery packages in Australia: buying them together",
    meta: {
      title: "Solar and Battery Package Australia 2026: Costs & Rebates | Refer Labs",
      description:
        "Buying solar and a battery together in Australia: how the two work as one system, what the federal rebate covers, why sizing them together matters, and the $500 Refer Labs discount. Indicative figures only.",
      keywords: ["solar and battery package australia", "solar battery package", "solar and battery bundle", "solar plus storage australia"],
    },
    lead:
      "A solar and battery package means buying the panels and the storage as one system rather than bolting a battery on later. The advantage is that the two are sized to work together from the start: the panels generate enough surplus during the day to fill the battery, and the battery holds it for your evening and overnight use. Done well, this is what turns a solar system that exports cheaply into one that covers most of your own use. The federal Cheaper Home Batteries rebate applies to the battery part at the point of sale, and in NSW a Virtual Power Plant incentive can apply on top.",
    sections: [
      {
        h: "Why sizing them together matters",
        body: [
          "A battery is only as useful as the surplus solar you have to fill it. If the panels are too small for your usage, there is little left over to charge the battery each day, and it sits half-empty. If the panels are large but the battery is small, you export the surplus cheaply instead of storing it. Buying them as a package lets an installer match the two to your actual usage, so neither is wasted.",
          "This is also why adding a battery to an existing undersized solar system sometimes disappoints: the constraint is the solar, not the battery. A package sidesteps that by sizing both to what your home actually uses.",
        ],
      },
      {
        h: "What the rebate covers, and what it doesn't",
        body: ["The incentives apply to the storage, not the whole package, so it helps to know which part is subsidised."],
        bullets: [
          "The federal Cheaper Home Batteries rebate applies to the battery, at the point of sale, indicatively around $252 per usable kWh and tapering above 14kWh.",
          "In NSW, a Virtual Power Plant incentive of roughly $40 per usable kWh (capped at 28kWh) can apply on top when you connect an eligible battery to a VPP.",
          "The solar panels themselves attract the separate small-scale solar (STC) discount, which has applied for years and is handled by the installer.",
          "Figures float with certificate prices, so treat them as indicative and confirm what applies to your address at quote stage.",
        ],
      },
      {
        h: "Getting a package quoted properly",
        body: [
          "A good installer builds the quote from your usage: your daily consumption, how much of it is after dark, your roof, and what you want the system to do. The quote should show the panels, the battery, both sets of incentives applied, and any workmanship warranty, so you see the real out-the-door price.",
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672) that sizes solar and battery together from your real usage and applies the rebates at the point of sale. Refer Labs readers get $500 off the quote through our link, on top of the rebates.",
        ],
      },
    ],
    faqs: [
      { q: "Is it cheaper to buy solar and a battery together?", a: "Buying them together doesn't always cut the sticker price, but it usually gives a better result, because the panels and battery are sized to work as one system rather than a battery being bolted onto an undersized solar setup. It also means one install and one set of incentives applied at the point of sale. Get a quote sized to your usage to compare." },
      { q: "Does the rebate cover both the solar and the battery?", a: "They're separate. The battery attracts the federal Cheaper Home Batteries rebate (indicatively around $252 per usable kWh, tapering above 14kWh), and in NSW a VPP incentive can apply on top. The solar panels attract the long-standing small-scale solar STC discount. An installer applies both at the point of sale." },
      { q: "Can I add a battery to my existing solar instead?", a: "Yes, but if your existing solar is undersized for your usage there may be little surplus to charge a battery, which limits the benefit. In that case the constraint is the solar, not the battery. An installer can tell you whether your current system has enough spare generation to make a battery worthwhile." },
      { q: "How big should a solar and battery system be?", a: "It depends on your daily usage, how much is after dark, and your roof. The panels need to generate enough surplus to fill the battery, and the battery needs to cover your evening and overnight use. This is exactly what sizing them together solves. Note the federal rebate tapers above 14kWh of battery." },
    ],
    related: [R.cost, R.rebate, R.calc, R.hub, R.review],
  },

  {
    slug: "/tesla-powerwall-alternatives-australia",
    crumb: "Powerwall alternatives",
    priority: 0.78,
    h1: "Tesla Powerwall alternatives in Australia: how to weigh them up",
    meta: {
      title: "Tesla Powerwall Alternatives Australia 2026: How to Compare | Refer Labs",
      description:
        "Weighing up alternatives to the Tesla Powerwall in Australia: what to compare on capacity, backup, warranty and VPP-readiness, and why the installer matters as much as the brand. Plus $500 off through Refer Labs.",
      keywords: ["tesla powerwall alternatives australia", "powerwall alternative", "home battery vs powerwall", "best alternative to tesla powerwall"],
    },
    lead:
      "The Tesla Powerwall is the battery most Australians have heard of, which makes it the benchmark people compare everything else against. That is a reasonable starting point, but the Powerwall is one option among many, and the right battery for your home depends on your usage, whether you want whole-home backup, and how the numbers land after the rebate rather than on the brand. The useful move is to compare on the things that actually differ between batteries, then let an accredited installer size the choice to your home.",
    sections: [
      {
        h: "What to compare, brand aside",
        body: ["Batteries differ on a handful of things that matter more than the logo. Compare alternatives on these."],
        bullets: [
          "Usable capacity (kWh): the amount you can actually draw, matched to your evening and overnight use.",
          "Backup: whether it provides blackout backup at all, and whether that is whole-home or essential-circuits only.",
          "Warranty: the years plus the throughput or cycle guarantee, not just the headline figure.",
          "Chemistry and safety: most alternatives now use lithium iron phosphate (LFP), valued for safety and cycle life.",
          "VPP-readiness: whether it can join a Virtual Power Plant, which in NSW unlocks the state incentive.",
          "Total cost after the rebate: the number that decides payback, not the sticker price.",
        ],
      },
      {
        h: "Why the installer matters as much as the battery",
        body: [
          "Whichever battery you choose, its performance and safety depend on how it is installed and sized. A well-installed alternative that is matched to your usage will out-perform a bigger-name battery that is oversized or fitted poorly. The markers to check are SAA accreditation, a valid electrical licence, and a workmanship warranty alongside the manufacturer's.",
          "The other reason the installer matters is the rebate: an installer who applies the federal discount at the point of sale, and who can connect an eligible battery to a VPP for the NSW incentive, changes the after-rebate cost that actually decides the comparison.",
        ],
      },
      {
        h: "Getting alternatives sized to your home",
        body: [
          "Rather than start from a brand, start from your usage. A good installer looks at how much power you use after dark, how much surplus solar you have to charge a battery, and whether backup matters to you, then recommends a battery sized to that. This is where a Powerwall alternative often wins or loses on the numbers.",
          "Apollo Energy Group is a NSW-based, SAA-accredited installer (Electrical Licence 400672) that sizes systems from your real usage and applies the federal rebate at the point of sale. Refer Labs readers get $500 off the quote through our link, on top of the rebate.",
        ],
      },
    ],
    faqs: [
      { q: "What are the alternatives to a Tesla Powerwall in Australia?", a: "There are many home batteries beyond the Powerwall, and the right one depends on your usage, whether you want whole-home backup, warranty terms and the after-rebate cost, rather than the brand. The useful comparison is on usable capacity, backup capability, warranty and VPP-readiness, sized to your home by an accredited installer." },
      { q: "Is the Tesla Powerwall the best home battery?", a: "It's the best known, which is not the same as best for your home. Batteries differ on usable capacity, backup, warranty and cost after the rebate, and the right choice depends on your usage and goals. A well-sized alternative from an accredited installer can be a better fit and better value than a bigger-name battery fitted poorly." },
      { q: "How do I compare home batteries fairly?", a: "Compare usable capacity, whether it provides blackout backup (and whole-home vs essential circuits), the warranty including throughput or cycles, chemistry, VPP-readiness, and the total cost after the federal rebate. The last one decides payback, so a headline sticker price alone can be misleading." },
      { q: "Do alternatives to the Powerwall get the same rebate?", a: "Yes, provided the battery is on the eligible product list, the federal Cheaper Home Batteries rebate applies at the point of sale regardless of brand, and in NSW the VPP incentive can apply on top. An installer confirms eligibility and applies the discount to your quote. Refer Labs readers also get $500 off an Apollo quote through our link." },
    ],
    related: [{ href: "/best-home-battery-australia", label: "Best home battery: how to choose" }, R.cost, R.hub, R.review, R.calc],
  },
];

export const APOLLO_GUIDE_BY_SLUG: Record<string, ApolloGuideEntry> =
  Object.fromEntries(APOLLO_GUIDES.map((g) => [g.slug, g]));
