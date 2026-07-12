import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ALOHI_URL } from "@/lib/affiliate-links";

export const alohiConfig: AffiliatePageConfig = {
  brand: "Alohi",
  badgeText: "E-sign & fax",
  eyebrow: "Documents & e-signature",
  affiliateUrl: ALOHI_URL,
  quickAnswer:
    "Alohi makes two document tools: Sign.Plus for legally-binding electronic signatures and Fax.Plus for secure online faxing. Both have free plans and work worldwide, including Australia. Paid plans start at about US$14.99/month for Sign.Plus and about US$6.99/month for Fax.Plus.",
  offer: "Free plans on Sign.Plus and Fax.Plus",
  atAGlance: [
    { k: "Type", v: "E-signatures (Sign.Plus) & online fax (Fax.Plus)" },
    { k: "Best for", v: "Signing and sending documents online" },
    { k: "Pricing", v: "Free plans; from US$6.99–14.99/mo" },
  ],
  hero: {
    h1Prefix: "Alohi:",
    h1Highlight: "e-signatures and online fax, done properly",
    subheading:
      "Sign.Plus gets contracts signed with legally-binding electronic signatures, and Fax.Plus sends and receives faxes securely from your browser or phone, no machine or landline needed. Both from Alohi, with free plans to start.",
    trustBullets: ["Free plans to start","Legally-binding e-signatures","Works worldwide, including Australia"],
  },
  banner: {
    heading: "Start with Sign.Plus or Fax.Plus",
    body: "Create an account and send your first signature request or fax. Free plans available on both, no credit card required.",
    buttonLabel: "Continue to Alohi",
  },
  sections: [
    {
      heading: "What Alohi is for",
      paragraphs: [
        "Alohi is a Swiss document-workflow company behind two well-known tools. Sign.Plus lets you send documents for legally-binding electronic signature, track their status and store the audit trail. Fax.Plus lets you send and receive faxes from a browser or app, which still matters in healthcare, legal and finance.",
        "Both are built for security and compliance, work across devices, and are used by millions of businesses and teams worldwide. You pick the product you need; they are billed separately.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "Sign.Plus suits anyone who regularly sends contracts or forms for signature and wants a straightforward, compliant e-signature tool with a free tier to start. Fax.Plus suits businesses that still need to fax, without keeping a physical machine and phone line.",
        "If you never sign documents remotely and never fax, you may not need either. But for teams in document-heavy fields, having compliant e-sign and online fax from one provider is convenient, and both start free.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Pick your tool", body: "Open Alohi through the link and choose Sign.Plus for e-signatures or Fax.Plus for online faxing." },
    { num: "2", heading: "Create your account", body: "Sign up on the free plan, no credit card required, and set up your profile or fax number." },
    { num: "3", heading: "Send your first document", body: "Upload a document to send for signature, or send a fax, straight from your browser or phone." },
  ],
  whyUseThis: ["Legally-binding e-signatures with an audit trail","Send and receive faxes with no machine or landline","Free plans on both Sign.Plus and Fax.Plus","Security and compliance focus, used worldwide"],
  faqs: [
    { q: "Are Sign.Plus and Fax.Plus free, and is there a discount code?", a: "Both have free plans to start: Sign.Plus offers a limited number of signature requests, and Fax.Plus a limited number of pages. Paid plans add more volume and features. Alohi does not publish a standard discount code; using our link takes you to the current plans, at no extra cost to you." },
    { q: "How much do Sign.Plus and Fax.Plus cost?", a: "Sign.Plus paid plans start at about US$14.99/month, and Fax.Plus at about US$6.99/month, with higher tiers for more users, requests or pages. They are billed separately. Check the current pricing on each product before committing." },
    { q: "Are Sign.Plus e-signatures legally valid?", a: "Sign.Plus is built to produce legally-binding electronic signatures with an audit trail, and follows major e-signature standards. As always, confirm it meets the specific legal requirements for your document type and jurisdiction." },
    { q: "Does Alohi work in Australia?", a: "Yes, both Sign.Plus and Fax.Plus are available worldwide, including Australia. Pricing is shown in your local currency where supported; confirm any region-specific details on the provider's site." },
  ],
  ctas: {
    primary: "See Alohi",
    secondary: "Continue to Alohi",
    midHeading: "Need documents signed or faxed?",
    midBody: "Start free through our link with Sign.Plus for e-signatures or Fax.Plus for online faxing.",
    midButton: "Get started",
    bottomHeading: "Sign and send, without the paperwork",
    bottomBody: "Send your first document for signature, or send a fax, straight from your browser.",
    bottomButton: "Continue to Alohi",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Alohi before committing.",
};
