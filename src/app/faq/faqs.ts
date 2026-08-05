export type FAQ = { q: string; a: string };

// Consumer FAQ for the comparison site. Grouped into three sections rendered by
// page.tsx: what Refer Labs is, how it stays independent, and how it is paid.
export const aboutFAQs: FAQ[] = [
  {
    q: "What is Refer Labs?",
    a: "Refer Labs is an independent Australian comparison publisher. We research categories where the choice is genuinely hard, across health, home energy, business finance and software, and write them up in plain language so you can choose the right option with confidence.",
  },
  {
    q: "Is Refer Labs free to use?",
    a: "Yes, Refer Labs is free for readers. Some links may earn us a commission when you sign up with a provider, which keeps the site free, and it never changes what we write or how we compare options.",
  },
  {
    q: "Which categories does Refer Labs cover?",
    a: "Consumer money decisions are the focus: weight-loss and hair-loss telehealth, pet insurance and home batteries, alongside guides to business finance and the software that runs a business. We expand one vertical at a time rather than covering everything shallowly.",
  },
  {
    q: "Is Refer Labs Australian?",
    a: "Yes. Refer Labs is an Australian publisher, and our comparisons are written for Australians, using Australian pricing, availability and rules.",
  },
];

export const servicesFAQs: FAQ[] = [
  {
    q: "Are Refer Labs rankings paid?",
    a: "No. A brand cannot pay to change its position in a Refer Labs guide. Commercial relationships are disclosed where relevant, but rankings are never for sale.",
  },
  {
    q: "How do you research a comparison?",
    a: "We look at pricing, eligibility, inclusions, trade-offs and who each option suits, and we check figures against the provider's own site rather than an aggregator. Our editorial standards are set out on our How We Research page.",
  },
  {
    q: "How do you check prices and offers?",
    a: "We use the providers' own published prices and date them where possible. Prices, offers and inclusions change, so always confirm the current cost with the provider before signing up.",
  },
  {
    q: "Do you publish your own star ratings or testimonials?",
    a: "No. We do not invent ratings, testimonials or read-times. Where we cite a third-party figure, we attribute it. Reader trust is the whole point, so we do not fake any part of it.",
  },
];

export const pricingFAQs: FAQ[] = [
  {
    q: "How does Refer Labs make money?",
    a: "We may earn a commission when readers sign up with selected partners through our links, at no extra cost to you. This keeps the site free to use. Commercial relationships are disclosed, and they do not change our comparisons or conclusions.",
  },
  {
    q: "Does earning a commission change what you recommend?",
    a: "No. A commission never changes a ranking or a conclusion. Affiliate links are disclosed on the pages that carry them, and a brand cannot buy a better position in a guide.",
  },
  {
    q: "Is the health content medical advice?",
    a: "No. Our health content is general information only, not medical advice. Prescription medicines in Australia are available only after assessment by a registered practitioner. Always consult a qualified health professional about your own situation.",
  },
  {
    q: "I run a business, can I work with Refer Labs?",
    a: "Yes. We partner with Australian brands on comparisons, distribution and growth, always disclosed and never as a bought ranking. See the For Business page, or email jarred@referlabs.com.au.",
  },
];

export const allFAQs = [...aboutFAQs, ...servicesFAQs, ...pricingFAQs];
