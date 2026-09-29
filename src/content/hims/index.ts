import type { HimsPageContent } from "./types";
import { weight } from "./pages/weight";
import { hair } from "./pages/hair";
import { ed } from "./pages/ed";
import { vsMosh } from "./pages/vs-mosh";
import { bestWeight } from "./pages/best-weight";
import { bestHair } from "./pages/best-hair";
import { bestEd } from "./pages/best-ed";

/** Every page in the Hims set. Order = order in the approval pack. */
export const HIMS_PAGES: HimsPageContent[] = [weight, hair, ed, vsMosh, bestWeight, bestHair, bestEd];

export const HIMS_SLUGS = HIMS_PAGES.map((p) => p.slug);

export function getHimsPage(slug: string): HimsPageContent | undefined {
  return HIMS_PAGES.find((p) => p.slug === slug);
}
