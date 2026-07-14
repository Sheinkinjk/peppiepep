import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ELEVENLABS_URL } from "@/lib/affiliate-links";

export const elevenlabsConfig: AffiliatePageConfig = {
  brand: "ElevenLabs",
  logo: "elevenlabs",
  badgeText: "AI voice",
  eyebrow: "AI tools",
  affiliateUrl: ELEVENLABS_URL,
  quickAnswer:
    "ElevenLabs is an AI audio platform for realistic text-to-speech, voice cloning, dubbing and voice agents, with thousands of voices across many languages and an API for developers. You can start on a free plan; check the current free-tier limits before you rely on it.",
  offer: "Free plan (10,000 credits/month)",
  atAGlance: [
    { k: "Type", v: "AI voice / text-to-speech" },
    { k: "Best for", v: "Creators, developers & teams" },
    { k: "Pricing", v: "Free plan; paid from US$5/mo" },
    { k: "Languages", v: "70+" },
  ],
  hero: {
    h1Prefix: "ElevenLabs:",
    h1Highlight: "lifelike AI voices for content, apps and agents",
    subheading:
      "Turn text into natural-sounding speech, clone a voice, dub video into other languages, or build voice agents, using a large library of voices across dozens of languages, with an API for developers.",
    trustBullets: ["Realistic text-to-speech", "Voice cloning & dubbing", "Free plan to start"],
  },
  banner: {
    heading: "Try ElevenLabs free",
    body: "Generate your first AI speech and hear the quality. Start on the free plan, then upgrade if you need more.",
    buttonLabel: "Try ElevenLabs",
  },
  sections: [
    {
      heading: "What ElevenLabs does",
      paragraphs: [
        "ElevenLabs is best known for text-to-speech that actually sounds human, used for narration, videos, podcasts, audiobooks, apps and accessibility. Beyond straight TTS it offers voice cloning, speech-to-text, AI dubbing that keeps a speaker's voice across languages, music generation and conversational voice agents.",
        "For developers there's an API and SDKs, so the same voice technology can power in-product features, IVR, or an AI phone agent. For creators, the web app is enough to generate audio without any code.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It suits creators who need voiceover without a studio, teams localising content into other languages, and developers adding voice to products. If you only need occasional TTS, the free tier may be enough; heavier or commercial use moves you onto paid plans.",
        "Pricing is usage-based by the characters or credits you generate. Start on the free plan, then confirm the current tier limits and commercial terms before you build on it.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Sign up free", body: "Open ElevenLabs through the link and create a free account." },
    { num: "2", heading: "Pick a voice", body: "Choose from the voice library or clone one, then set the language." },
    { num: "3", heading: "Generate & export", body: "Paste your text, generate the audio, and download or use the API." },
  ],
  whyUseThis: [
    "Text-to-speech that sounds genuinely natural",
    "Voice cloning, dubbing and speech-to-text in one place",
    "Thousands of voices across dozens of languages",
    "API and SDKs for developers, plus a no-code web app",
  ],
  faqs: [
    {
      q: "Does ElevenLabs have a free plan?",
      a: "Yes, ElevenLabs offers a free tier so you can try text-to-speech and other features with limited monthly usage. Free-tier limits and commercial-use terms change, so check the current details on ElevenLabs before relying on it.",
    },
    {
      q: "Is there an ElevenLabs discount code?",
      a: "ElevenLabs doesn't typically publish a public promo code. The free plan is the standard way to start, and our referral link takes you to the current offer, at no extra cost to you.",
    },
    {
      q: "What can you use ElevenLabs for?",
      a: "Narration and voiceover, audiobooks and podcasts, dubbing video into other languages, in-app voices and IVR, and conversational voice agents, either through the web app or the developer API.",
    },
    {
      q: "Can I use ElevenLabs audio commercially?",
      a: "Commercial use is generally tied to paid plans and their licensing terms, and voice cloning has its own rules around consent. Read the current terms on ElevenLabs before using generated audio commercially.",
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
