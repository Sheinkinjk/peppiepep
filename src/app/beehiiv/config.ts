import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BEEHIIV_URL } from "@/lib/affiliate-links";

export { BEEHIIV_URL };

// Every plan fact below was read on beehiiv.com/pricing and beehiiv's help
// article "What's included in the beehiiv Max trial" on 30 September 2026.
// Neither page states how many days the trial of paid features lasts, so this
// page does not give a length. The trial comes with every new account; it is
// not something our link adds.

export const beehiivConfig: AffiliatePageConfig = {
  brand: "beehiiv",
  logo: "beehiiv",
  badgeText: "Newsletter Platform",
  affiliateUrl: BEEHIIV_URL,

  quickAnswer:
    "beehiiv publishes no promo code and Refer Labs holds none. What beehiiv does publish is a free Launch plan for up to 2,500 subscribers with unlimited sends and no card, plus a free trial of paid-plan features on every new account (beehiiv.com/pricing, read 30 September 2026). The ad network, paid subscriptions and the referral program are paid-plan features, and the ad network and paid subscriptions are excluded from the trial.",

  banner: {
    heading: "beehiiv: Start Free, Up to 2,500 Subscribers",
    body: "Click below to go directly to beehiiv via our referral link. The Launch plan is free up to 2,500 subscribers, with no card.",
    buttonLabel: "Continue to beehiiv",
  },

  eyebrow: "Newsletter platform",
  atAGlance: [
    { k: "What it is", v: "Newsletter platform" },
    { k: "Best for", v: "Growing & monetising an audience" },
    { k: "Free", v: "Launch plan, up to 2,500 subscribers" },
    { k: "Paid plans add", v: "Ad network, referral program, paid subscriptions" },
  ],
  trustStrip: [
    "Free up to 2,500 subscribers",
    "Unlimited sends on every plan",
    "0% take on paid subscriptions (Scale and up)",
    "Ad network on paid plans only",
  ],
  verdict:
    "beehiiv suits a writer who intends to earn from a newsletter: on its paid plans the ad network, referral program and paid subscriptions are built in, and beehiiv takes 0% of subscription revenue where Substack takes 10%. The free Launch plan is for building the list: none of those three earning tools is on it. If you never plan to monetise, a free plan elsewhere may do the same job.",

  hero: {
    h1Prefix: "beehiiv:",
    h1Highlight: "The Newsletter Platform Built for Growth",
    subheading:
      "There is no beehiiv promo code to find: beehiiv does not publish one and Refer Labs does not have one; the offer it does publish is a Launch plan that is free up to 2,500 subscribers, with unlimited sends and no card (beehiiv.com/pricing, read 30 September 2026). The ad network, referral program and paid subscriptions come with the paid Scale plan, not the free one.",
    trustBullets: [
      "Covers beehiiv's free plan and what the paid plans add",
      "What the free trial of paid features includes and excludes",
      "beehiiv vs Substack and beehiiv vs Kit",
      "Covers beehiiv monetisation, ad network, and referral tools",
      "Click through instantly, no details required on this page",
    ],
  },

  sections: [
    {
      heading: "Is there a beehiiv promo code?",
      paragraphs: [
        "No. beehiiv lists no promo code on its own site, and Refer Labs has none to pass on. The two things beehiiv does give away, both read on its own pricing and help pages on 30 September 2026, are the free Launch plan (up to 2,500 subscribers, unlimited sends, no card) and a free trial of paid-plan features that every new account receives. Our link does not change either one.",
        "The trial has limits worth knowing before you sign up. beehiiv's help centre lists the ad network, paid subscriptions, paid recommendations, multiple users and removing beehiiv branding as not available during the trial. It does not state how long the trial lasts. If you do not upgrade when it ends, the account stays on the free Launch plan.",
      ],
      hasCta: true,
      ctaText: "Start beehiiv free",
    },
    {
      heading: "What Is beehiiv?",
      paragraphs: [
        "beehiiv is a newsletter platform built specifically for growth. It was founded by members of the team behind Morning Brew, and the product reflects that background: publishing, subscriber management and analytics, with monetisation tools built in on the paid plans.",
        "On Scale and above, those tools are a native ad network where advertisers pay newsletters across beehiiv, a referral program that rewards readers for sharing, paid subscriptions for premium content, and paid recommendations, where you earn for recommending other newsletters to your readers.",
        "beehiiv is used by independent newsletter creators, media companies, content businesses, and brands running editorial newsletters.",
      ],
    },
    {
      heading: "beehiiv Pricing and Free Plan",
      paragraphs: [
        "beehiiv's Launch plan is free up to 2,500 subscribers with unlimited sends. It is a permanent free tier with no expiry, and it includes the website builder, custom domains, campaign analytics and API access (excluding the Send API), according to beehiiv's feature table read on 30 September 2026.",
        "The paid plans, Scale and Max, add the monetisation suite: the ad network, the referral program, paid subscriptions with a 0% beehiiv take, email automations and advanced analytics. Max adds removing beehiiv branding and up to 10 publications. The ad network is marked on beehiiv's page as not available in all regions, so check it covers Australia before you count on it. Current plan prices are on beehiiv's own pricing page.",
      ],
    },
    {
      heading: "beehiiv vs Substack",
      paragraphs: [
        "Both are built for newsletters, with different business models.",
        "Substack is a publishing-first platform with a large built-in reader network, so readers can discover newsletters on Substack itself, which is a distribution advantage for new creators. It charges no monthly fee and takes 10% of paid-subscription revenue. Its trade-off is limited customisation, no ad network and no referral program.",
        "beehiiv charges a monthly fee for its paid plans and takes 0% of paid subscriptions, per its own pricing FAQ. It gives you ownership of your audience, more growth tools and more ways to earn. Substack is better if discovery inside the Substack network is your main growth channel; beehiiv is better if you intend to run the newsletter as a business with several revenue streams.",
      ],
    },
    {
      heading: "beehiiv vs Kit and Mailchimp",
      paragraphs: [
        "beehiiv vs Kit (formerly ConvertKit): Kit is a broader email marketing and creator tool covering automation, landing pages, and digital product sales. It suits creators who want to sell products or courses alongside their newsletter. beehiiv is more focused on newsletter growth and monetisation. If your business is primarily a newsletter, beehiiv's purpose-built tools fit better. If you need complex automation flows or digital product infrastructure, Kit is more flexible.",
        "beehiiv vs Mailchimp: Mailchimp is a general email marketing platform aimed at businesses doing promotional email, not newsletter publishing. beehiiv is designed for editorial newsletters, recurring publishing, and audience monetisation. They serve different use cases and are rarely in direct competition.",
      ],
    },
    {
      heading: "beehiiv Monetization",
      paragraphs: [
        "All of these are paid-plan features. The ad network places advertisers' ads in newsletters across beehiiv; you review placements before they go out. Paid subscriptions let you charge readers a recurring fee for premium content, and beehiiv takes 0% of that revenue, leaving only Stripe's processing fee. Paid recommendations pay you for recommending other newsletters. You can also sell sponsorships directly.",
        "A newsletter on a paid beehiiv plan can earn from advertising, reader subscriptions and cross-promotion at the same time. On the free Launch plan it can do none of the three, which is the main reason to upgrade.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Create a free account",
      body: "Click any button on this page to go to beehiiv via our referral link and sign up on the free Launch plan. New accounts also get a free trial of paid features.",
    },
    {
      num: "02",
      heading: "Set up your newsletter",
      body: "Configure your publication name, custom domain and publishing settings. Import existing subscribers if you are migrating from another platform.",
    },
    {
      num: "03",
      heading: "Publish your first issue",
      body: "Use beehiiv's editor to write and send your first newsletter. Explore the analytics dashboard to see open rates, click rates, and subscriber growth.",
    },
    {
      num: "04",
      heading: "Upgrade when you are ready to earn",
      body: "The ad network, paid subscriptions and the referral program need a paid plan. Upgrade to Scale when you are ready to switch them on.",
    },
  ],

  whyUseThis: [
    "Says plainly that beehiiv has no promo code, and what it offers instead",
    "Separates what is free from what needs a paid plan",
    "beehiiv vs Substack and beehiiv vs Kit",
    "Covers beehiiv monetisation including the ad network",
  ],

  faqs: [
    {
      q: "Does beehiiv have a free trial?",
      a: "Yes. Every new beehiiv account gets a free trial of paid-plan features, and afterwards stays on the free Launch plan unless you upgrade. The trial excludes the ad network, paid subscriptions, paid recommendations and multiple users, per beehiiv's help centre (read 30 September 2026). beehiiv does not state the trial's length on its pricing or help pages.",
    },
    {
      q: "Is beehiiv free?",
      a: "Yes. beehiiv's Launch plan is free up to 2,500 subscribers with unlimited sends and no card. It covers publishing, the website builder and custom domains. The ad network, referral program and paid subscriptions need a paid plan, Scale or Max.",
    },
    {
      q: "Is beehiiv better than Substack?",
      a: "It depends on your priorities. Substack has a built-in reader network that helps with discovery, charges no monthly fee and takes 10% of paid subscriptions. beehiiv charges a monthly fee for its paid plans, takes 0% of paid subscriptions, and adds a native ad network and a referral program. For a newsletter run as a business, beehiiv's paid plans offer more ways to earn; for discovery within the Substack ecosystem, Substack has the advantage.",
    },
    {
      q: "How does the beehiiv ad network work?",
      a: "The beehiiv ad network connects advertisers with newsletters on beehiiv's paid plans. Advertisers' placements are offered to your newsletter, and you review and approve them before they go out. It is not on the free Launch plan and not in the free trial, and beehiiv marks it as not available in all regions.",
    },
    {
      q: "How does beehiiv compare to Kit (ConvertKit)?",
      a: "Kit is a broader creator marketing platform covering automation, landing pages, and digital product sales. beehiiv is focused on newsletter publishing, growth, and monetisation. If your primary business is a newsletter, beehiiv's purpose-built tools fit better. If you need complex email automation or want to sell digital products alongside a newsletter, Kit is more flexible.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Best Newsletter Platform", href: "/best-newsletter-platform" },
    { label: "beehiiv" },
  ],

  relatedLinks: [
    {
      href: "/best-newsletter-platform",
      label: "Best Newsletter Platform 2026",
      desc: "beehiiv vs Substack vs Kit, free plans, monetisation, and growth tools compared.",
    },
    {
      href: "/compare/newsletter-platforms",
      label: "Newsletter Platforms Compared",
      desc: "beehiiv, Substack and Kit lined up by what each is built for.",
    },
    {
      href: "/brevo",
      label: "Brevo",
      desc: "Email, SMS and automation priced by emails sent, with a free plan.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across creator tools, health, and business categories.",
    },
  ],

  ctas: {
    primary: "Start beehiiv free",
    secondary: "Continue to beehiiv",
    midHeading: "Ready to Launch or Grow Your Newsletter?",
    midBody:
      "Click below to go to beehiiv via our referral link and start on the free Launch plan, up to 2,500 subscribers.",
    midButton: "Start beehiiv free",
    bottomHeading: "Start Your Newsletter on beehiiv",
    bottomBody:
      "Click below to be taken to beehiiv. Start free up to 2,500 subscribers, and upgrade when you want the ad network, referral program and paid subscriptions.",
    bottomButton: "Continue to beehiiv",
  },

  disclaimer:
    "You will be taken to beehiiv.com. This page is operated by Refer Labs and contains a personalised affiliate referral link. Plan features were read on beehiiv's own pricing and help pages on 30 September 2026; pricing and trial terms can change and are set by beehiiv.",
};
