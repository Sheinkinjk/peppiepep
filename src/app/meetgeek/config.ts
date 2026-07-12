import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MEETGEEK_URL } from "@/lib/affiliate-links";

export const meetgeekConfig: AffiliatePageConfig = {
  brand: "MeetGeek",
  badgeText: "AI meeting notes",
  eyebrow: "AI tools",
  affiliateUrl: MEETGEEK_URL,
  quickAnswer:
    "MeetGeek is an AI meeting assistant that auto-joins your calls on Zoom, Google Meet and Microsoft Teams, then records, transcribes and summarises them with action items. It has a free plan (a few hours a month) and paid plans from about US$9.99/user/month.",
  offer: "Free plan (3 hours/month)",
  atAGlance: [
    { k: "Type", v: "AI meeting assistant" },
    { k: "Best for", v: "Teams that live in meetings" },
    { k: "Pricing", v: "Free plan; paid from US$9.99/user/mo" },
    { k: "Works with", v: "Zoom, Meet, Teams" },
  ],
  hero: {
    h1Prefix: "MeetGeek:",
    h1Highlight: "AI notes for every meeting",
    subheading:
      "MeetGeek joins your calls, records and transcribes them, and sends a summary with action items afterwards, so you can be present in the meeting instead of scribbling notes, and nothing gets lost.",
    trustBullets: ["Free plan to start","Auto-joins Zoom, Meet & Teams","Summaries with action items"],
  },
  banner: {
    heading: "Get AI notes on your next call",
    body: "Connect your calendar and let MeetGeek record, transcribe and summarise your meetings. Free plan to start.",
    buttonLabel: "Try MeetGeek free",
  },
  sections: [
    {
      heading: "What MeetGeek is for",
      paragraphs: [
        "MeetGeek is an AI notetaker for meetings. It auto-joins your video calls, records and transcribes what is said, then produces a summary with key points and action items, and a searchable archive of every conversation.",
        "Because the notes happen automatically, you stay present in the meeting rather than typing, and follow-ups are captured rather than forgotten. It also spots highlights and can push notes into the tools your team already uses.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits individuals and teams who spend a lot of time in calls, sales, client work, hiring, research, and want reliable notes, action items and a searchable record without extra effort.",
        "It is less relevant if you rarely meet online, or work in settings where recording is restricted. Where it applies, always make sure participants are comfortable being recorded, which is good practice for any meeting-notes tool.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start free", body: "Open MeetGeek through the link and sign up on the free plan, no card required." },
    { num: "2", heading: "Connect your calendar", body: "Link your calendar so MeetGeek can auto-join your Zoom, Meet or Teams calls." },
    { num: "3", heading: "Get your notes", body: "After each meeting, receive a transcript, summary and action items, and search past calls." },
  ],
  whyUseThis: ["Auto-joins and records Zoom, Meet and Teams","Transcripts, summaries and action items after each call","A searchable archive of every meeting","Free plan to try it on real calls"],
  faqs: [
    { q: "Is MeetGeek free, and is there a discount code?", a: "Yes, MeetGeek has a free Basic plan with a few hours of transcription a month, no credit card. Paid plans from about US$9.99/user/month add more hours and features. It does not usually run a public discount code; starting through our referral link takes you to the current plans, at no extra cost to you." },
    { q: "How much does MeetGeek cost?", a: "The free plan covers a few hours of meetings a month. Paid plans start at about US$9.99/user/month (Pro) for more transcription hours, with Business around US$17/user/month for unlimited transcription and team analytics. Check the current tiers for your usage." },
    { q: "Which meeting apps does MeetGeek support?", a: "MeetGeek works with the major video platforms, Zoom, Google Meet and Microsoft Teams, auto-joining calls from your connected calendar to record, transcribe and summarise them." },
    { q: "Is it okay to record meetings with MeetGeek?", a: "MeetGeek makes recording and transcribing easy, but consent matters. Let participants know a notetaker is present and follow the recording rules for your organisation and jurisdiction. Used openly, automated notes save time and keep everyone on the same page." },
  ],
  ctas: {
    primary: "See MeetGeek",
    secondary: "Continue to MeetGeek",
    midHeading: "Still writing up your own meeting notes?",
    midBody: "Start free through our link and let MeetGeek record, transcribe and summarise your next call.",
    midButton: "Get started",
    bottomHeading: "Let your meetings take their own notes",
    bottomBody: "Connect your calendar and get transcripts, summaries and action items after every meeting, automatically.",
    bottomButton: "Continue to MeetGeek",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on MeetGeek before committing.",
};
