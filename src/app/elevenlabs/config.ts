import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ELEVENLABS_URL } from "@/lib/affiliate-links";

export const elevenlabsConfig: AffiliatePageConfig = {
  brand: "ElevenLabs",
  logo: "elevenlabs",
  badgeText: "AI voice",
  eyebrow: "AI tools",
  affiliateUrl: ELEVENLABS_URL,
  // Plans read on elevenlabs.io/pricing, rendered in a browser, 30 September 2026.
  quickAnswer:
    "ElevenLabs is an AI voice platform for text-to-speech, voice cloning, dubbing and voice agents. Its free plan gives 10,000 credits a month, and the Starter plan, which adds a commercial licence and instant voice cloning, costs US$6 a month (elevenlabs.io/pricing, read 30 September 2026).",
  offer: "Free plan (10,000 credits/month)",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "AI voice / text-to-speech" },
    { k: "Best for", v: "Creators, developers & teams" },
    { k: "Pricing", v: "Free plan; Starter US$6/mo (read 30 Sep 2026)" },
    { k: "Languages", v: "70+" },
  ],
  hero: {
    h1Prefix: "ElevenLabs:",
    h1Highlight: "lifelike AI voices for content, apps and agents",
    subheading:
      "ElevenLabs turns text into natural-sounding speech, clones voices, dubs video and runs voice agents; its free plan gives 10,000 credits a month, and a commercial licence starts on the US$6-a-month Starter plan (elevenlabs.io/pricing, read 30 September 2026).",
    trustBullets: ["Realistic text-to-speech", "Voice cloning & dubbing", "Free plan to start"],
  },
  banner: {
    heading: "Try ElevenLabs free",
    body: "Generate your first AI speech and hear the quality. Start on the free plan, then upgrade if you need more.",
    buttonLabel: "Try ElevenLabs",
  },
  sections: [
    {
      heading: "How much does ElevenLabs cost?",
      paragraphs: [
        "Read on elevenlabs.io/pricing on 30 September 2026, with monthly billing: Free is US$0 with 10,000 credits a month. Starter is US$6 a month for 30,000 credits and adds a commercial licence, instant voice cloning and the dubbing studio. Creator lists at US$22 a month for 121,000 credits and adds professional voice cloning; ElevenLabs was showing 50% off the first month, making it US$11. Pro is US$99 a month for 600,000 credits.",
        "The free plan does not include the commercial licence, so anything you publish for a business belongs on Starter or above. ElevenLabs runs no public discount code, and there is no Refer Labs code either.",
      ],
      hasCta: true,
      ctaText: "Try ElevenLabs free",
    },
    {
      heading: "What ElevenLabs does",
      paragraphs: [
        "ElevenLabs is best known for text-to-speech that sounds human, used for narration, videos, podcasts, audiobooks, apps and accessibility. Beyond straight TTS it offers voice cloning, speech-to-text, AI dubbing that keeps a speaker's voice across languages, music generation and conversational voice agents.",
        "For developers there's an API and SDKs, so the same voice technology can power in-product features, IVR, or an AI phone agent. For creators, the web app is enough to generate audio without any code.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It suits creators who need voiceover without a studio, teams localising content into other languages, and developers adding voice to products. If you only need occasional TTS, the free tier may be enough; heavier or commercial use moves you onto paid plans.",
        "Pricing is by the credits you generate each month, so estimate your volume before choosing a tier.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Sign up free", body: "Open ElevenLabs through the link and create a free account." },
    { num: "2", heading: "Pick a voice", body: "Choose from the voice library or clone one, then set the language." },
    { num: "3", heading: "Generate & export", body: "Paste your text, generate the audio, and download or use the API." },
  ],
  whyUseThis: [
    "Text-to-speech that sounds natural",
    "Voice cloning, dubbing and speech-to-text in one place",
    "Thousands of voices across dozens of languages",
    "API and SDKs for developers, plus a no-code web app",
  ],
  faqs: [
    {
      q: "Does ElevenLabs have a free plan?",
      a: "Yes. ElevenLabs' free plan gives 10,000 credits a month across text-to-speech, speech-to-text, sound effects and voice design (read 30 September 2026). It does not include the commercial licence, which starts on Starter.",
    },
    {
      q: "Is there an ElevenLabs discount code?",
      a: "No. ElevenLabs publishes no discount code and Refer Labs holds none. On 30 September 2026 its own pricing page showed 50% off the first month of the Creator plan, which applies to anyone signing up, not only through our link.",
    },
    {
      q: "What can you use ElevenLabs for?",
      a: "Narration and voiceover, audiobooks and podcasts, dubbing video into other languages, in-app voices and IVR, and conversational voice agents, either through the web app or the developer API.",
    },
    {
      q: "Can I use ElevenLabs audio commercially?",
      a: "ElevenLabs' pricing page lists the commercial licence from the Starter plan up, not on the free plan. Voice cloning has its own consent rules, so read ElevenLabs' terms before publishing a cloned voice.",
    },
  ],
  relatedLinks: [
    { href: "/lindy", label: "Lindy", desc: "AI assistants and automations that can act on voice and text workflows." },
    { href: "/durableai", label: "Durable AI", desc: "Generate a full business website in seconds, a natural companion to AI voice content." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See ElevenLabs",
    secondary: "Continue to ElevenLabs",
    midHeading: "Ready to hear the quality?",
    midBody: "Open ElevenLabs through our referral link and generate your first AI speech on the free plan.",
    midButton: "Try ElevenLabs",
    bottomHeading: "Give your content a voice",
    bottomBody: "Generate speech, clone a voice or dub into other languages, then scale on a paid plan if you need to.",
    bottomButton: "Continue to ElevenLabs",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing, limits and offers change, verify current terms on ElevenLabs before committing.",
};
