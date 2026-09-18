/**
 * One drawn object per hub, used wherever that hub appears on the homepage:
 * the hero, the "Popular" links, the picks, the category row, Coming Soon and
 * the comparison labels. Keyed by the hub's href so an object follows the
 * hub, not the wording of a label.
 *
 * TGA: no object may identify a medicine. Weight loss is a bathroom scale,
 * never a syringe or a pill; hair loss is a comb, never a bottle or a tablet.
 */
import type { ObjectKind } from "@/components/home/Objects";

export const HUB_OBJECT: Record<string, ObjectKind> = {
  "/weight-loss": "scale",
  "/hair-loss": "comb",
  "/pet-insurance": "tag",
  "/solar-and-energy": "solar",
  "/home-battery-rebate-australia": "battery",
  "/portable-power-station-australia": "power",
  "/business-software": "browser",
  "/health-and-beauty": "bottle",
  "/skin-and-beauty": "bottle",
  "/sleep": "pillow",
  "/mens-health": "pulse",
  "/longevity": "hourglass",
  "/longevity/recovery": "thermo",
  "/longevity/diagnostics": "lens",
};

/** Kickers are words, not hrefs; they file to the same objects. */
const KICKER: Record<string, ObjectKind> = {
  "weight loss": "scale",
  "hair loss": "comb",
  pets: "tag",
  "solar & energy": "solar",
  "home batteries": "battery",
  "creator tools": "envelope",
  "creator growth": "envelope",
};

export function objectFor(hrefOrKicker: string): ObjectKind | undefined {
  return HUB_OBJECT[hrefOrKicker] ?? KICKER[hrefOrKicker.toLowerCase()];
}

/**
 * Brand pages built on PremiumAffiliateLanding, each drawn with what the
 * product does rather than a generic "business" mark, so a CRM and a phone
 * system do not wear the same picture. Keyed by the config's `brand`.
 */
const BRAND_OBJECT: Record<string, ObjectKind> = {
  // CRM and sales pipeline
  Capsule: "funnel", Pipedrive: "funnel", Keap: "funnel", Nutshell: "funnel", GoHighLevel: "funnel",
  // email and newsletters
  ActiveCampaign: "envelope", Brevo: "envelope", beehiiv: "envelope",
  // outreach and prospecting
  "Reply.io": "send", AiSDR: "send", FullEnrich: "send",
  // websites, landing pages and on-site conversion
  Unbounce: "browser", Leadpages: "browser", Landingi: "browser", "Swipe Pages": "browser", Instapage: "browser",
  Carrd: "browser", "Durable AI": "browser", "Butternut AI": "browser", "Hello Bar": "browser", Databox: "browser",
  // calling
  CloudTalk: "phone", KrispCall: "phone",
  // people and training
  "Employment Hero": "badge", Trainual: "badge",
  // money, cards and commerce
  Dext: "card", Blinq: "card", AliDrop: "card",
  // AI assistants and generators
  ElevenLabs: "chip", Lindy: "chip", "Wing Assistant": "chip", "Beautiful.ai": "chip",
  // forms, quizzes and surveys
  FlexiQuiz: "checklist", Outgrow: "checklist", Survicate: "checklist",
  // documents
  PandaDoc: "document",
  // affiliate and referral
  Superfiliate: "offer",
  // hair
  Mosh: "comb", "Dense Hair Experts": "comb",
  // portable power
  EcoFlow: "power", "Anker SOLIX": "power",
};

export function objectForBrand(brand: string): ObjectKind {
  return BRAND_OBJECT[brand] ?? "lens";
}
