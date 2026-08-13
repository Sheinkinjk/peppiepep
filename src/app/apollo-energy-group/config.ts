import { APOLLO_ENERGY_LEAD_HREF } from "@/lib/affiliate-links";

export { APOLLO_ENERGY_LEAD_HREF };

/** At-a-glance rows for the hero card. Facts only, sourced from Apollo Energy Group. */
export const glance: [string, string][] = [
  ["What it is", "Home battery installation specialist"],
  ["For", "Australian homeowners and businesses"],
  ["Systems", "9kWh to 54kWh, engineered to your usage"],
  ["Accredited", "SAA accredited, Electrical Licence 400672"],
  ["Warranty", "10-year battery warranty"],
  ["Offer", "$500 off your quote via Refer Labs, no code"],
];

export const steps = [
  {
    num: "1",
    heading: "Claim the $500 discount",
    body: "Complete the short form on this page: name, email, phone and your postcode. We pass it to Apollo with your consent. It takes under 30 seconds and commits you to nothing.",
  },
  {
    num: "2",
    heading: "Get a system engineered to your usage",
    body: "Apollo builds a quote around your actual electricity usage rather than a generic package, and sizes the battery accordingly.",
  },
  {
    num: "3",
    heading: "Rebates applied to the quote",
    body: "The federal Cheaper Home Batteries discount is applied at the point of sale, along with any state incentive you qualify for.",
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
    a: "Yes. Apollo Energy Group runs a dedicated Refer Labs landing page offering $500 off your home battery quote, applied directly to the system. There is no code to type: the discount is attached to the link on this page. The form asks for your name, email, phone and postcode, takes under 30 seconds, and carries no obligation.",
  },
  {
    q: "How much is the federal home battery rebate in 2026?",
    a: "The federal Cheaper Home Batteries Program discounts roughly 30% of the upfront cost of an eligible battery (systems from 5kWh to 100kWh). From 1 May 2026 it is worth about $252 per usable kWh for most standard home batteries, based on 6.8 STCs per usable kWh at roughly $37 per STC after typical costs. As a guide, a 10kWh battery attracts around $2,520. The rebate is applied at the point of sale by the installer, so you do not claim it yourself. Confirm current figures before you commit, as the scheme changes.",
  },
  {
    q: "Does the rebate change depending on battery size?",
    a: "Yes, and this matters when sizing a system. From 1 May 2026 the rebate tapers with capacity: the full rate applies to the first 14kWh, then 60% of the rate from 14kWh up to 28kWh, then 15% from 28kWh up to 50kWh. In practice that means a bigger battery does not attract a proportionally bigger rebate, so oversizing has diminishing returns.",
  },
  {
    q: "Are there state incentives as well as the federal rebate?",
    a: "Often, yes. The federal Cheaper Home Batteries discount applies nationally, and some states add their own incentive on top. NSW, for example, pays a Virtual Power Plant (VPP) incentive of roughly $40 per usable kWh (capped at 28kWh, so up to about $1,100, and floating with certificate prices). What you can claim depends on your state, your battery, your retailer and the VPP terms, so confirm what applies to your address when you get the quote.",
  },
  {
    q: "How much will a home battery actually save me?",
    a: "That depends on your usage, your tariff, whether you have solar, and whether you join a VPP, so no page can promise a number. For reference, Apollo Energy Group's own site cites an average bill reduction of over 70% and gives an example of about $1,349 in estimated annual savings on a 16kWh system. Treat those as the provider's figures rather than a guarantee, and ask for a projection based on your own bills.",
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
    a: "Apollo Energy Group installs using SAA-accredited installers and operates under Electrical Licence 400672 (ABN 55697998208). They list a 10-year battery warranty and 12 years of installer experience, and their site cites a 4.9 out of 5 Google rating and being voted SBC's number one battery installer. Those are the company's stated credentials, worth confirming as part of your own due diligence.",
  },
  {
    q: "What areas does Apollo Energy Group cover?",
    a: "Apollo Energy Group is based at 5 Martin Place in Sydney and installs for homes and businesses across Australia. Coverage for your specific address is confirmed when you request a quote, so put your postcode in and they will come back on whether they can service you.",
  },
  {
    q: "How much does a home battery cost through Apollo?",
    a: "Apollo does not publish fixed prices, because systems are engineered per home rather than sold as a set package. The quote depends on the capacity you need, the inverter and the install itself, with the federal rebate applied at the point of sale. Financing through Australian lenders is available. The $500 Refer Labs discount comes off the quote on top of any rebate you qualify for.",
  },
  {
    q: "What is the best solar battery company in Australia?",
    a: "There is no single best solar battery company, because the right one depends on your location, the system you need, and the quality of the workmanship. The markers of a strong one are the same nationwide: SAA accreditation, a valid electrical licence, a written workmanship warranty alongside the manufacturer's, sizing from your real usage, and the rebate applied at the point of sale. Apollo Energy Group meets those markers and Refer Labs readers get $500 off, but compare any company on those criteria before you commit.",
  },
  {
    q: "What is the best solar battery company in Sydney?",
    a: "Sydney has many solar battery installers, so judge them on the same markers rather than the loudest ad: SAA accreditation, a valid electrical licence, warranties in writing, sizing from your usage, and the federal rebate plus the NSW Virtual Power Plant incentive handled for you. Apollo Energy Group is Sydney-based (5 Martin Place), SAA-accredited with Electrical Licence 400672 and a 10-year battery warranty, and Refer Labs readers get $500 off a quote. Confirm the detail in writing and compare on those criteria.",
  },
  {
    q: "What solar battery government rebate can I get in Sydney?",
    a: "Two rebates can stack in Sydney. The federal Cheaper Home Batteries rebate reduces the cost at the point of sale, indicatively around $252 per usable kWh at the current spot price and tapering above 14kWh. On top of that, NSW pays a Virtual Power Plant incentive of roughly $40 per usable kWh (capped at 28kWh, so up to about $1,100) for connecting an eligible battery to a VPP. Both float with certificate prices, so treat the figures as indicative, and Refer Labs readers also get $500 off an Apollo quote on top.",
  },
];
