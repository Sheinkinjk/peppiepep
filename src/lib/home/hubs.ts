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
