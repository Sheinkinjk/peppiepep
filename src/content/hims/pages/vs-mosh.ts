import type { HimsPageContent } from "../types";
import { FACTS_CHECKED_ON, HIMS_SUPPLIED_ON, SRC } from "../config";

// /hims-vs-mosh, rebuilt 1 Oct 2026 (Jarred: "near top users are selecting hair
// loss, weight loss, ed - then it would show summarised version ... must look
// unbiased ... at top more generalised information about the businesses").
// Layout: lead about the two businesses, two equal profiles, a program selector
// whose three panels are all server-rendered, the codes, a short FAQ, sources.
// Every profile fact was read off the business's own site on FACTS_CHECKED_ON,
// plus the 2 June 2026 acquisition release. No pick, no "Choose X if", no verdict.
export const vsMosh: HimsPageContent = {
  slug: "hims-vs-mosh",
  vertical: "hair",
  // The codes block and the default panel are hair, the program the old
  // "mosh vs pilot" searches were about. Each panel sets its own Mosh side.
  moshLink: "hair",
  kind: "overview",
  modified: "2026-10-09",
  seoTitle: "Hims vs Mosh (formerly Pilot vs Mosh): Hair, Weight and ED",
  metaDescription:
    "Who owns Hims (formerly Pilot) and Mosh, what each covers and how you consult, then hair loss, weight loss and ED side by side, with each Refer Labs code.",
  eyebrow: "Men's telehealth · Australia",
  h1: "Hims vs Mosh (formerly Pilot vs Mosh)",
  standfirst:
    "Hims is the Australian men's health service of Hims & Hers Health, the US telehealth company that bought Pilot's owner Eucalyptus on 2 June 2026, and Pilot is now Hims: Hims says Pilot rebranded as Hims on 1 September 2026. Mosh describes itself as an Australian-owned men's health clinic covering hair loss, sexual health, mental health and skin, with weight loss run through its partner brand Moshy. Both begin with an online quiz and a consultation with an AHPRA-registered practitioner, who decides whether the program is right for you: Hims by phone, Mosh by call, with text messaging and video also available.",
  hub: { label: "Men's health", href: "/mens-health" },
  overview: {
    profiles: [
      {
        label: "Ownership",
        hims: "Hims & Hers Health, Inc., which completed its purchase of Eucalyptus, Pilot's owner, on 2 June 2026. Pilot's site says it has joined the Hims & Hers group.",
        mosh: "Australian owned, by its own description. Lists Moshy and Healthy Mummy as its brands.",
      },
      {
        label: "What it covers",
        hims: "Weight loss, hair loss and sexual health for men, handled in one place.",
        mosh: "Hair loss, sexual health, mental health and skin. Weight loss through Moshy, its partner brand.",
      },
      {
        label: "How you consult",
        hims: "Free two-minute online quiz, then a phone consultation.",
        mosh: "Free online quiz, then a private call; text messaging, phone and video are available.",
      },
      {
        label: "Practitioners",
        hims: "AHPRA-registered practitioners who work remotely from within Australia.",
        mosh: "AHPRA-registered medical practitioners and nurse practitioners in Australia, paid on a fee-for-service basis.",
      },
      {
        label: "Hours and support",
        hims: "Consultations 7am to 11pm AEST, seven days. Unlimited practitioner check-ins and a 24/7 Care Team after you start.",
        mosh: "All online. Unlimited medical follow-ups and messaging with the medical team after you start.",
      },
      {
        label: "Money-back scope",
        hims: "180 days on select hair plans; 30 days on the weight program. Under Hims' terms.",
        mosh: "180 days on quarterly hair programs. Moshy: 30 days on weight programs. Under each brand's terms.",
      },
    ],
    profilesNote: `Read off each business's own site on ${FACTS_CHECKED_ON}; ownership also from the 2 June 2026 acquisition release.`,
    selectorHeading: "Compare by program",
    programs: [
      {
        vertical: "hair",
        anchor: "hair-loss",
        tab: "Hair loss",
        question: "How do Hims and Mosh differ on hair loss?",
        summary:
          "Mosh lists hair prices on its pricing page; Hims shows its price after the phone consultation, before you pay. Each backs hair with a 180-day money-back guarantee, which Hims applies to select hair plans and Mosh to quarterly programs, under each brand's terms (T&Cs apply). Mosh's practitioners can be reached by text, call or video; Hims includes unlimited practitioner check-ins and a 24-hour Care Team. Each has a Refer Labs code for new patients.",
        rows: ["How you start", "Consult fee", "Money-back", "Support", "Stopping", "Prices", "Refer Labs code"],
        links: [
          { label: "Hims hair loss", href: "/hims-hair-loss" },
          { label: "Mosh hair loss and the REFERAL55 code", href: "/moshhair" },
        ],
      },
      {
        vertical: "weight",
        anchor: "weight-loss",
        tab: "Weight loss",
        question: "How do Hims and Moshy differ on weight loss?",
        summary:
          "Hims plans include unlimited practitioner check-ins and a 24/7 Care Team, with a monthly plan you can change or cancel at any time or a 12-month plan paid upfront. Moshy's all-inclusive fee covers in-app coaching and dietitian meal plans. Each gives 30 days to ask for your money back under its own terms, and each has a Refer Labs code.",
        rows: ["Who it is for", "How you start", "Commitment", "Money-back", "Coaching and nutrition", "Refer Labs code"],
        links: [
          { label: "Hims weight loss", href: "/hims" },
          { label: "Moshy weight loss and the REFERRAL120 code", href: "/moshy" },
        ],
      },
      {
        vertical: "ed",
        anchor: "ed",
        tab: "Erectile dysfunction",
        question: "How do Hims and Mosh compare for erectile dysfunction?",
        summary:
          "Hims books a phone call with an AHPRA-registered practitioner in Australia, any day from 7am to 11pm AEST, includes unlimited practitioner check-ins and has no lock-in contract. Refer Labs' REFERLABS code gives new Hims patients a free consultation. Mosh's ED details are still to be added.",
        rows: ["How you start", "Consultation format", "Practitioners", "Contract", "Support", "Refer Labs code"],
        links: [{ label: "Online ED consultations: Hims vs Mosh", href: "/ed" }],
      },
    ],
  },
  blocks: [
    { type: "offer", id: "codes", vertical: "hair" },
    {
      type: "faq",
      id: "faq",
      heading: "Hims vs Mosh: common questions",
      items: [
        {
          q: "How do Mosh and Pilot differ now that Pilot is Hims?",
          a: `Pilot is now Hims: Pilot rebranded as Hims on 1 September 2026 (confirmed by Hims in writing, ${HIMS_SUPPLIED_ON}), after Hims & Hers Health completed its purchase of Eucalyptus, Pilot's owner, on 2 June 2026. So the live comparison is Hims and Mosh. Hims consults by phone, with unlimited practitioner check-ins and a 24/7 Care Team; Mosh consults by call, text or video and publishes its prices first.`,
        },
        {
          q: "Who owns Hims and who owns Mosh?",
          a: "Hims in Australia belongs to Hims & Hers Health, Inc., the US telehealth company, following its 2 June 2026 purchase of Eucalyptus, the company behind Pilot and Juniper. Mosh describes itself as Australian owned and lists Moshy and Healthy Mummy as its brands.",
        },
        {
          q: "Is Mosh the same as Moshy?",
          a: "No, they are partner brands. Moshy has its own site, getmoshy.com.au, runs Mosh's weight loss service and describes itself as an online women's health clinic, open to anyone a practitioner assesses as suitable. Mosh's hair loss and sexual health services are on getmosh.com.au.",
        },
        {
          q: "Do Hims and Mosh offer a money-back guarantee?",
          a: "Yes, with different scopes. For hair, Hims covers select hair plans for 180 days and Mosh covers quarterly hair programs for 180 days. For weight, Hims allows 30 days from starting and Moshy has a 30-day money-back guarantee. Each applies under that business's own terms.",
        },
        {
          q: "Does Hims or Mosh publish its prices?",
          a: "Mosh lists its prices on its pricing page before you start. Hims shows weight pricing on its weight loss page and gives hair and ED prices after the consultation. Hims' FAQ says its plans are not claimable on Medicare.",
        },
        {
          q: "Can I move from Mosh to Hims, or from Hims to Mosh?",
          a: "Yes. You join the other service as a new patient, starting with its quiz and consultation. Hims' new-patient offer excludes current and previous Hims or Pilot patients.",
        },
      ],
    },
  ],
  sources: [
    SRC.himsHome,
    SRC.himsWeight,
    SRC.himsHair,
    SRC.himsEd,
    SRC.himsFaq,
    SRC.pilot,
    SRC.eucalyptus,
    SRC.moshHome,
    SRC.moshPricing,
    SRC.moshHair,
    SRC.moshReferLabs,
    SRC.moshyHome,
    SRC.moshyWeight,
  ],
  related: [
    { label: "Mosh review", href: "/mosh-review", desc: "Mosh's services, how its consultations work and its terms." },
    { label: "Moshy review", href: "/moshy-review", desc: "Moshy's weight program, what the fee includes and its terms." },
  ],
};
