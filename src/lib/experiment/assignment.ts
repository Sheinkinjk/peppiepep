// GENERATED — experiment assignment for the ReferLabs citation layer.
// Seed: 20260826. Paired on word count within hub, randomised within pair.
// DO NOT EDIT BY HAND. Regenerate with scripts/assign-experiment.ts if needed.

export type Arm = 'treated' | 'control' | 'excluded';

export interface Assignment {
  route: string;
  hub: 'hair-loss' | 'weight-loss' | 'solar-energy';
  arm: Arm;
  pairId: string | null;
  wordsAtAssignment: number;
  reason?: string;
}

export const EXPERIMENT_SEED = 20260826;
export const ASSIGNED_AT = '2026-08-26';

export const ASSIGNMENTS: Assignment[] = [
  // ── hair-loss ──
  { route: '/mosh-vs-dense', hub: 'hair-loss', arm: 'treated', pairId: 'hair-loss-p1', wordsAtAssignment: 1617 },
  { route: '/mosh-vs-pilot', hub: 'hair-loss', arm: 'control', pairId: 'hair-loss-p1', wordsAtAssignment: 1412 },
  { route: '/best-hair-loss-treatment-australia', hub: 'hair-loss', arm: 'control', pairId: 'hair-loss-p2', wordsAtAssignment: 1358 },
  { route: '/hair-loss-treatment-cost-australia', hub: 'hair-loss', arm: 'treated', pairId: 'hair-loss-p2', wordsAtAssignment: 1353 },
  { route: '/mosh-review', hub: 'hair-loss', arm: 'control', pairId: 'hair-loss-p3', wordsAtAssignment: 1090 },
  { route: '/online-hair-loss-treatment-australia', hub: 'hair-loss', arm: 'treated', pairId: 'hair-loss-p3', wordsAtAssignment: 1056 },
  { route: '/how-to-stop-hair-loss-australia', hub: 'hair-loss', arm: 'treated', pairId: 'hair-loss-p4', wordsAtAssignment: 1003 },
  { route: '/early-signs-of-hair-loss-australia', hub: 'hair-loss', arm: 'control', pairId: 'hair-loss-p4', wordsAtAssignment: 979 },
  { route: '/receding-hairline-treatment-australia', hub: 'hair-loss', arm: 'control', pairId: 'hair-loss-p5', wordsAtAssignment: 874 },
  { route: '/dense', hub: 'hair-loss', arm: 'treated', pairId: 'hair-loss-p5', wordsAtAssignment: 827 },
  // ── weight-loss ──
  { route: '/juniper', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p1', wordsAtAssignment: 1731 },
  { route: '/weight-loss-telehealth-cost-australia', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p1', wordsAtAssignment: 1635 },
  { route: '/cheapest-weight-loss-telehealth-australia', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p2', wordsAtAssignment: 1626 },
  { route: '/online-weight-loss-doctor-australia', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p2', wordsAtAssignment: 1486 },
  { route: '/moshy-vs-pilot', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p3', wordsAtAssignment: 1441 },
  { route: '/weight-loss-telehealth-women-australia', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p3', wordsAtAssignment: 943 },
  { route: '/moshy-vs-juniper', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p4', wordsAtAssignment: 863 },
  { route: '/weight-loss-treatment-eligibility-australia', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p4', wordsAtAssignment: 821 },
  { route: '/moshy-review', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p5', wordsAtAssignment: 819 },
  { route: '/moshy-alternatives', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p5', wordsAtAssignment: 674 },
  { route: '/moshy-vs-gp', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p6', wordsAtAssignment: 663 },
  { route: '/moshy-eligibility', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p6', wordsAtAssignment: 629 },
  { route: '/weight-loss-telehealth-men-australia', hub: 'weight-loss', arm: 'control', pairId: 'weight-loss-p7', wordsAtAssignment: 618 },
  { route: '/online-weight-loss-programs-australia', hub: 'weight-loss', arm: 'treated', pairId: 'weight-loss-p7', wordsAtAssignment: 577 },
  { route: '/getmoshy', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 403 },
  // ── solar-energy ──
  { route: '/home-battery-rebate-australia', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p1', wordsAtAssignment: 1643 },
  { route: '/virtual-power-plant-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p1', wordsAtAssignment: 1473 },
  { route: '/home-battery-rebate-by-state-australia', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p2', wordsAtAssignment: 1451 },
  { route: '/home-battery-cost-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p2', wordsAtAssignment: 1450 },
  { route: '/ecoflow-vs-anker-solix', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p3', wordsAtAssignment: 1295 },
  { route: '/portable-power-station-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p3', wordsAtAssignment: 1294 },
  { route: '/anker-solix', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p4', wordsAtAssignment: 1186 },
  { route: '/ecoflow', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p4', wordsAtAssignment: 1174 },
  { route: '/apollo-energy-review', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p5', wordsAtAssignment: 1143 },
  { route: '/home-battery-blackout-backup-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p5', wordsAtAssignment: 1035 },
  { route: '/what-size-home-battery-do-i-need-australia', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p6', wordsAtAssignment: 1022 },
  { route: '/solar-and-battery-package-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p6', wordsAtAssignment: 1021 },
  { route: '/best-home-battery-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p7', wordsAtAssignment: 1015 },
  { route: '/nsw-home-battery-rebate-2026', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p7', wordsAtAssignment: 1013 },
  { route: '/is-a-home-battery-worth-it-australia', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p8', wordsAtAssignment: 995 },
  { route: '/tesla-powerwall-alternatives-australia', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p8', wordsAtAssignment: 967 },
  { route: '/home-battery-installer-nsw', hub: 'solar-energy', arm: 'control', pairId: 'solar-energy-p9', wordsAtAssignment: 938 },
  { route: '/home-battery-installer-sydney', hub: 'solar-energy', arm: 'treated', pairId: 'solar-energy-p9', wordsAtAssignment: 935 },
  { route: '/portable-vs-installed-home-battery-australia', hub: 'solar-energy', arm: 'excluded', pairId: null, wordsAtAssignment: 919 },
  // ── excluded by hand (not analysed; treated where appropriate) ──
  { route: '/moshhair', hub: 'hair-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'top revenue' },
  { route: '/moshy', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'top revenue' },
  { route: '/best-weight-loss-telehealth-australia', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'top revenue' },
  { route: '/apollo-energy-group', hub: 'solar-energy', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'top revenue / lead gen' },
  { route: '/hair-loss', hub: 'hair-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'hub landing' },
  { route: '/weight-loss', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'hub landing' },
  { route: '/solar-and-energy', hub: 'solar-energy', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'hub landing' },
  { route: '/hair-loss-quiz', hub: 'hair-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'tool' },
  { route: '/weight-loss-quiz', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'tool' },
  { route: '/weight-loss-cost-calculator', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'tool' },
  { route: '/home-battery-payback-calculator', hub: 'solar-energy', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'tool' },
  { route: '/apollo-energy-group-eoi', hub: 'solar-energy', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'stub, 1 word server-rendered' },
  { route: '/weight-loss-guide', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'lead magnet, not in sitemap' },
  { route: '/mens-health-telehealth-australia', hub: 'hair-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 0, reason: 'shared across two hubs' },
];

const BY_ROUTE = new Map(ASSIGNMENTS.map((a) => [a.route, a]));

export function armFor(route: string): Arm {
  return BY_ROUTE.get(route)?.arm ?? 'excluded';
}

export function assignmentFor(route: string): Assignment | null {
  return BY_ROUTE.get(route) ?? null;
}
