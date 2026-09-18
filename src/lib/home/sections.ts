/**
 * Content for the homepage sections redesigned in the preview. Every sentence
 * is taken from the live homepage (live-home.ts, or src/app/page.tsx on main
 * where the section changed after 11 September), not written for the design.
 */
import { categories, comparisons, how } from "@/lib/home/content";
import type { ObjectKind } from "@/components/home/Objects";

export type CategoryCard = {
  label: string; href: string; body: string; object: ObjectKind;
  links: { label: string; href: string }[];
  /** The hub's name in the call to action: "Explore weight loss". */
  cta: string;
};

const byHref = (h: string) => categories.items.find((c) => c.href === h)!;
const from = (h: string, object: ObjectKind, cta: string): CategoryCard => ({ ...byHref(h), object, cta });

/** Six, in the order the header runs, with Coming Soon last. Pets is not in
    the header on main and is not in this row; its hub keeps its hero card. */
export const categoryCards: CategoryCard[] = [
  from("/weight-loss", "scale", "Explore weight loss"),
  from("/hair-loss", "comb", "Explore hair loss"),
  {
    label: "Health & Beauty", href: "/health-and-beauty", object: "bottle", cta: "Explore health & beauty",
    // main: src/app/page.tsx, categoryCards
    body: "What the actives do, what devices cost here, and how the prescription route differs.",
    links: [
      { label: "LED masks: real prices", href: "/health-and-beauty/led-face-mask-comparison-australia" },
      { label: "Retinol vs prescription-strength", href: "/health-and-beauty/retinol-vs-prescription-strength-australia" },
    ],
  },
  from("/solar-and-energy", "solar", "Explore solar & energy"),
  from("/business-software", "browser", "Explore business software"),
];

/** Coming Soon as it stands on main: Men's Health is the one section left. */
export const comingSoonCard = {
  label: "Coming soon",
  href: "/coming-soon",
  object: "pulse" as ObjectKind,
  body: "1 more category still being built out. The guides in it are finished and free to read, and the provider comparison is still being assembled.",
  links: [{ label: "Men's Health", href: "/mens-health" }],
  cta: "See what we're building",
};

/** The matchups each comparison page settles, read off its own title. */
export type Matchup = { names: string[]; join: string; object: ObjectKind };
export const comparisonCards = comparisons.items.map((c) => {
  const m: Record<string, Matchup> = {
    "/best-hair-loss-treatment-australia": { names: ["Mosh", "Dense", "Telehealth"], join: "vs", object: "comb" },
    "/solar-and-energy": { names: ["Solar", "Batteries"], join: "+", object: "solar" },
    "/moshy-vs-gp": { names: ["Telehealth", "Your GP"], join: "or", object: "scale" },
    "/best-newsletter-platform": { names: ["beehiiv", "Substack", "Kit"], join: "vs", object: "envelope" },
  };
  return { ...c, ...m[c.href] };
});

/** The method, in the order it is done. Wording from the live section. */
export const howSteps: { n: number; title: string; body: string; object: ObjectKind; chips?: string[] }[] = [
  { n: 1, title: "Research", object: "lens",
    body: "We research the categories where the choice is genuinely hard, from weight-loss and hair-loss telehealth to home batteries, pet insurance and the software that runs a business." },
  { n: 2, title: "Compare", object: "checklist",
    body: "When we compare providers, we look at the same six things.",
    chips: ["Pricing", "Eligibility", "Inclusions", "Trade-offs", "Availability in Australia", "Who each option suits"] },
  { n: 3, title: "Write it up", object: "document",
    body: "Then we write it up in plain language, with prices and offers checked where possible." },
  { n: 4, title: "Disclose", object: "balance",
    body: "Commercial partnerships may exist and are always disclosed, but a brand cannot pay to change its position in a guide." },
];
export const howIntro = how.paras[0];
