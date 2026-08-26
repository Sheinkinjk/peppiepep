import { armFor } from './assignment';

/**
 * Guards for the citation-layer experiment.
 *
 * The experiment only means anything if control pages stay untouched. A control
 * page that quietly receives citation-layer components is not a smaller effect,
 * it is a broken measurement: the pair it belongs to has to be discarded, and
 * because the pairs are matched on word count within a hub, losing one costs the
 * comparison it was built to make.
 *
 * assertNotControl is deliberately loud and deliberately development-only. The
 * mistake it catches is one someone makes while editing a page, so it should
 * stop them there rather than in production, where throwing would take a live
 * money page down over a measurement concern.
 */

/**
 * Throws in development if `route` is a control page in the experiment.
 *
 * Call it from a citation-layer component with the route it is about to render
 * on. In production this does nothing at all.
 */
export function assertNotControl(route: string): void {
  if (process.env.NODE_ENV === 'production') return;

  if (armFor(route) === 'control') {
    throw new Error(
      `Citation-layer component rendered on ${route}, which is a CONTROL page in the ` +
        `citation experiment (seed 20260826).\n\n` +
        `Control pages must not receive citation-layer components. Adding one here ` +
        `contaminates its matched pair and the pair has to be dropped from the analysis.\n\n` +
        `If you meant to add this, the route needs reassigning first: change it in ` +
        `lib/experiment/assignment.ts via scripts/assign-experiment.ts and record why. ` +
        `Do not silence this check.`,
    );
  }
}

/**
 * Whether `route` is in the treated arm, and so should render the citation
 * layer. Safe to call anywhere, including production: unlike the assertion this
 * is an ordinary predicate.
 *
 * Note that this is not the negation of `assertNotControl`. Excluded routes are
 * neither treated nor control, so they render nothing and trip nothing.
 */
export function isTreated(route: string): boolean {
  return armFor(route) === 'treated';
}
