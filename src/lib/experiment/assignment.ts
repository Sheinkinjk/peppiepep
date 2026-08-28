// ENDED. The ReferLabs citation experiment was ended on 27 August 2026 and
// recorded as Amendment 2 on GEOMG pre-registration
// 599d19b2-ba9d-490c-a54e-ff009ca5d282.
//
// Every route is now 'excluded', so no page receives differential treatment and
// assertNotControl in guard.ts is a no-op: nothing returns 'control' any more.
// Each row that carried an arm keeps its original assignment and pair in a
// trailing comment, so the design remains auditable against the
// pre-registration. Seed 20260826, paired on word count within hub, randomised
// within pair.

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
  { route: '/mosh-vs-dense', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p1', wordsAtAssignment: 1617 }, // was treated, pair hair-loss-p1
  { route: '/mosh-vs-pilot', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p1', wordsAtAssignment: 1412 }, // was control, pair hair-loss-p1
  { route: '/best-hair-loss-treatment-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p2', wordsAtAssignment: 1358 }, // was control, pair hair-loss-p2
  { route: '/hair-loss-treatment-cost-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p2', wordsAtAssignment: 1353 }, // was treated, pair hair-loss-p2
  { route: '/mosh-review', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p3', wordsAtAssignment: 1090 }, // was control, pair hair-loss-p3
  { route: '/online-hair-loss-treatment-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p3', wordsAtAssignment: 1056 }, // was treated, pair hair-loss-p3
  { route: '/how-to-stop-hair-loss-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p4', wordsAtAssignment: 1003 }, // was treated, pair hair-loss-p4
  { route: '/early-signs-of-hair-loss-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p4', wordsAtAssignment: 979 }, // was control, pair hair-loss-p4
  { route: '/receding-hairline-treatment-australia', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p5', wordsAtAssignment: 874 }, // was control, pair hair-loss-p5
  { route: '/dense', hub: 'hair-loss', arm: 'excluded', pairId: 'hair-loss-p5', wordsAtAssignment: 827 }, // was treated, pair hair-loss-p5
  // ── weight-loss ──
  { route: '/juniper', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p1', wordsAtAssignment: 1731 }, // was control, pair weight-loss-p1
  { route: '/weight-loss-telehealth-cost-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p1', wordsAtAssignment: 1635 }, // was treated, pair weight-loss-p1
  { route: '/cheapest-weight-loss-telehealth-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p2', wordsAtAssignment: 1626 }, // was control, pair weight-loss-p2
  { route: '/online-weight-loss-doctor-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p2', wordsAtAssignment: 1486 }, // was treated, pair weight-loss-p2
  { route: '/moshy-vs-pilot', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p3', wordsAtAssignment: 1441 }, // was control, pair weight-loss-p3
  { route: '/weight-loss-telehealth-women-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p3', wordsAtAssignment: 943 }, // was treated, pair weight-loss-p3
  { route: '/moshy-vs-juniper', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p4', wordsAtAssignment: 863 }, // was treated, pair weight-loss-p4
  { route: '/weight-loss-treatment-eligibility-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p4', wordsAtAssignment: 821 }, // was control, pair weight-loss-p4
  { route: '/moshy-review', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p5', wordsAtAssignment: 819 }, // was control, pair weight-loss-p5
  { route: '/moshy-alternatives', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p5', wordsAtAssignment: 674 }, // was treated, pair weight-loss-p5
  { route: '/moshy-vs-gp', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p6', wordsAtAssignment: 663 }, // was control, pair weight-loss-p6
  { route: '/moshy-eligibility', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p6', wordsAtAssignment: 629 }, // was treated, pair weight-loss-p6
  { route: '/weight-loss-telehealth-men-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p7', wordsAtAssignment: 618 }, // was control, pair weight-loss-p7
  { route: '/online-weight-loss-programs-australia', hub: 'weight-loss', arm: 'excluded', pairId: 'weight-loss-p7', wordsAtAssignment: 577 }, // was treated, pair weight-loss-p7
  // Folded into /moshy on 28 Aug 2026 and now 308s there. The row stays: the
  // table is the audit record against the pre-registration, not a route list.
  { route: '/getmoshy', hub: 'weight-loss', arm: 'excluded', pairId: null, wordsAtAssignment: 403 },
  // ── solar-energy ──
  { route: '/home-battery-rebate-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p1', wordsAtAssignment: 1643 }, // was control, pair solar-energy-p1
  { route: '/virtual-power-plant-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p1', wordsAtAssignment: 1473 }, // was treated, pair solar-energy-p1
  { route: '/home-battery-rebate-by-state-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p2', wordsAtAssignment: 1451 }, // was control, pair solar-energy-p2
  { route: '/home-battery-cost-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p2', wordsAtAssignment: 1450 }, // was treated, pair solar-energy-p2
  { route: '/ecoflow-vs-anker-solix', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p3', wordsAtAssignment: 1295 }, // was control, pair solar-energy-p3
  { route: '/portable-power-station-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p3', wordsAtAssignment: 1294 }, // was treated, pair solar-energy-p3
  { route: '/anker-solix', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p4', wordsAtAssignment: 1186 }, // was control, pair solar-energy-p4
  { route: '/ecoflow', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p4', wordsAtAssignment: 1174 }, // was treated, pair solar-energy-p4
  { route: '/apollo-energy-review', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p5', wordsAtAssignment: 1143 }, // was control, pair solar-energy-p5
  { route: '/home-battery-blackout-backup-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p5', wordsAtAssignment: 1035 }, // was treated, pair solar-energy-p5
  { route: '/what-size-home-battery-do-i-need-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p6', wordsAtAssignment: 1022 }, // was control, pair solar-energy-p6
  { route: '/solar-and-battery-package-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p6', wordsAtAssignment: 1021 }, // was treated, pair solar-energy-p6
  { route: '/best-home-battery-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p7', wordsAtAssignment: 1015 }, // was treated, pair solar-energy-p7
  { route: '/nsw-home-battery-rebate-2026', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p7', wordsAtAssignment: 1013 }, // was control, pair solar-energy-p7
  { route: '/is-a-home-battery-worth-it-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p8', wordsAtAssignment: 995 }, // was treated, pair solar-energy-p8
  { route: '/tesla-powerwall-alternatives-australia', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p8', wordsAtAssignment: 967 }, // was control, pair solar-energy-p8
  { route: '/home-battery-installer-nsw', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p9', wordsAtAssignment: 938 }, // was control, pair solar-energy-p9
  { route: '/home-battery-installer-sydney', hub: 'solar-energy', arm: 'excluded', pairId: 'solar-energy-p9', wordsAtAssignment: 935 }, // was treated, pair solar-energy-p9
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
