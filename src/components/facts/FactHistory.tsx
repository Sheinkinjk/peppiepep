import { assertNotControl } from '@/lib/experiment/guard';
import { historyOf } from '@/lib/facts/registry';
import type { Fact, FactKind } from '@/lib/facts/types';

/**
 * The series of observations of one thing, and how often it has moved.
 *
 * The value is not any single row: it is that a reader can see we checked
 * repeatedly and what changed between checks. Two rows cannot show that, so a
 * short series renders nothing at all rather than implying a track record that
 * does not exist yet. That threshold is the honest part of this component.
 *
 * assertNotControl runs first and before any data is read, because a control
 * page must not receive the citation layer even in the case where the series
 * would have been too short to render anyway.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatObserved(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Rows whose claim differs from the row immediately before it. */
function countChanges(series: Fact[]): number {
  return series.reduce(
    (n, fact, i) => (i > 0 && fact.claim !== series[i - 1].claim ? n + 1 : n),
    0,
  );
}

export default function FactHistory({
  subject,
  kind,
  hub,
  route,
}: {
  subject: string;
  kind: FactKind;
  hub: Fact['hub'];
  route: string;
}) {
  assertNotControl(route);

  const series = historyOf(subject, kind).filter((f) => f.hub === hub);

  if (series.length < 3) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[FactHistory] ${subject} / ${kind} in ${hub} has ${series.length} observation(s). ` +
          `A series needs at least 3 to be worth showing, so nothing was rendered on ${route}.`,
      );
    }
    return null;
  }

  const changes = countChanges(series);
  const earliest = formatObserved(series[0].observedAt);

  return (
    <section data-series-subject={subject} data-series-kind={kind} className="mt-8">
      <p className="text-[15px] leading-relaxed text-[#2b362f]">
        Refer Labs has checked this {series.length} times since {earliest}. It has changed{' '}
        {changes} {changes === 1 ? 'time' : 'times'}.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e9e7] bg-[#f8faf9] text-[#6e7b74]">
              <th className="px-4 py-3 font-semibold">Observed</th>
              <th className="px-4 py-3 font-semibold">Claim</th>
              <th className="px-4 py-3 font-semibold">Changed</th>
            </tr>
          </thead>
          <tbody>
            {series.map((fact, i) => {
              const changed = i > 0 && fact.claim !== series[i - 1].claim;
              return (
                <tr key={fact.id} className="border-b border-[#eef1ef] last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-[#3d4b44]">
                    <time dateTime={fact.observedAt}>{formatObserved(fact.observedAt)}</time>
                  </td>
                  <td className="px-4 py-3 text-[#2b362f]">{fact.claim}</td>
                  <td className="px-4 py-3 text-[#3d4b44]">
                    {i === 0 ? 'First check' : changed ? 'Yes' : 'No'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
