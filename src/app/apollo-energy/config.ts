import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";

export { APOLLO_ENERGY_URL };

/** At-a-glance rows for the hero card. Facts only, sourced from Apollo Energy Group. */
export const glance: [string, string][] = [
  ["What it is", "NSW home battery installation specialist"],
  ["For", "NSW homeowners and businesses"],
  ["Systems", "9kWh to 54kWh, engineered to your usage"],
  ["Accredited", "SAA accredited, Electrical Licence 400672"],
  ["Warranty", "10-year battery warranty"],
  ["Offer", "$500 off your quote via Refer Labs, no code"],
];

export const steps = [
  {
    num: "1",
    heading: "Claim the $500 discount",
    body: "Open Apollo through the link on this page and complete the short form: name, email, phone and your NSW postcode. It takes under 30 seconds and commits you to nothing.",
  },
  {
    num: "2",
    heading: "Get a system engineered to your usage",
    body: "Apollo builds a quote around your actual electricity usage rather than a generic package, and sizes the battery accordingly.",
  },
  {
    num: "3",
    heading: "Rebates applied to the quote",
    body: "The federal Cheaper Home Batteries discount is applied at the point of sale, along with any NSW incentive you qualify for.",
  },
  {
    num: "4",
    heading: "Installed by accredited installers",
    body: "Installation is carried out by SAA-accredited installers under Electrical Licence 400672, with a 10-year battery warranty.",
  },
];

export const faqs = [
  {
    q: "Is the $500 Refer Labs discount real, and do I need a code?",
    a: "Yes. Apollo Energy Group runs a dedicated Refer Labs landing page offering $500 off your home battery quote, applied directly to the system. There is no code to type: the discount is attached to the link on this page. The form asks for your name, email, phone and NSW postcode, takes under 30 seconds, and carries no obligation.",
  },
  {
    q: "How much is the federal home battery rebate in 2026?",
    a: "The federal Cheaper Home Batteries Program discounts roughly 30% of the upfront cost of an eligible battery (systems from 5kWh to 100kWh). From 1 May 2026 it is worth about $252 per usable kWh for most standard home batteries, based on 6.8 STCs per usable kWh at roughly $37 per STC after typical costs. As a guide, a 10kWh battery attracts around $3,110. The rebate is applied at the point of sale by the installer, so you do not claim it yourself. Confirm current figures before you commit, as the scheme changes.",
  },
  {
    q: "Does the rebate change depending on battery size?",
    a: "Yes, and this matters when sizing a system. From 1 May 2026 the rebate tapers with capacity: the full rate applies to the first 14kWh, then 60% of the rate from 14kWh up to 28kWh, then 15% from 28kWh up to 50kWh. In practice that means a bigger battery does not attract a proportionally bigger rebate, so oversizing has diminishing returns.",
  },
  {
    q: "Is there a NSW incentive as well as the federal rebate?",
    a: "NSW offers a $1,500 incentive for joining a Virtual Power Plant (VPP), which can sit alongside the federal Cheaper Home Batteries discount. Eligibility depends on your battery, retailer and VPP terms, so confirm what applies to your system when you get the quote.",
  },
  {
    q: "How much will a home battery actually save me?",
    a: "That depends on your usage, your tariff, whether you have solar, and whether you join a VPP, so no honest page can promise a number. For reference, Apollo Energy Group's own site cites an average bill reduction of over 70% and gives an example of about $1,349 in estimated annual savings on a 16kWh system. Treat those as the provider's figures rather than a guarantee, and ask for a projection based on your own bills.",
  },
  {
    q: "Do I need solar panels to get a battery?",
    a: "Not strictly. A battery pairs most naturally with solar, storing what your panels generate during the day for use at night. Without solar, a battery can still charge from the grid during cheaper off-peak periods and discharge at peak, but the economics are different and depend heavily on your tariff. Apollo sizes systems from your actual usage data, so this is a question to put to them directly.",
  },
  {
    q: "What size battery do I need?",
    a: "It depends on your evening and overnight consumption rather than a rule of thumb. Apollo installs systems from 9kWh to 54kWh and engineers the size from your real usage data rather than selling a fixed package. Worth knowing: because the federal rebate tapers above 14kWh, the value per extra kWh drops as the system gets larger.",
  },
  {
    q: "Is Apollo Energy Group accredited, and what is the warranty?",
    a: "Apollo Energy Group installs using SAA-accredited installers and operates under Electrical Licence 400672 (ABN 55697998208). They list a 10-year battery warranty and 12 years of installer experience, and their site cites a 4.9 out of 5 Google rating and being voted SBC's number one NSW battery installer. Those are the company's stated credentials, worth confirming as part of your own due diligence.",
  },
  {
    q: "What areas does Apollo Energy Group cover?",
    a: "Apollo is a NSW specialist, based at 5 Martin Place in Sydney and serving homes and businesses across New South Wales, including Sydney metropolitan areas. The Refer Labs $500 offer asks for a NSW postcode, so it is aimed at NSW households.",
  },
  {
    q: "How much does a home battery cost through Apollo?",
    a: "Apollo does not publish fixed prices, because systems are engineered per home rather than sold as a set package. The quote depends on the capacity you need, the inverter and the install itself, with the federal rebate applied at the point of sale. Financing through Australian lenders is available. The $500 Refer Labs discount comes off the quote on top of any rebate you qualify for.",
  },
];
