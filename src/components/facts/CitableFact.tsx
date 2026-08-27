import Link from 'next/link';

import { authorById } from '@/lib/entities/authors';
import type { Fact } from '@/lib/facts/types';

/**
 * One dated observation, rendered so it can be quoted without losing its
 * provenance.
 *
 * A figure/figcaption pair rather than a styled div: the caption is
 * semantically bound to the claim, so anything reading the page, including an
 * answer engine, gets the observation and the date it was made as one unit
 * rather than as two paragraphs that happen to sit together.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** '2026-08-17' -> '17 August 2026'. Returns the input unchanged if malformed. */
function formatObserved(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function CitableFact({ fact }: { fact: Fact }) {
  const author = authorById(fact.observedBy);
  const authorName = author?.name ?? fact.observedBy;

  return (
    <figure
      data-fact-id={fact.id}
      className="rounded-2xl border border-[#e5e9e7] bg-white p-5"
    >
      <p className="text-[15px] leading-relaxed text-[#2b362f]">{fact.claim}</p>
      <figcaption className="mt-2 text-[13px] leading-relaxed text-[#6e7b74]">
        Observed by{' '}
        {author ? (
          <Link href={`/authors/${author.id}`} className="text-[#0a7c42] underline-offset-2 hover:underline">
            {authorName}
          </Link>
        ) : (
          authorName
        )}
        ,{' '}
        <time dateTime={fact.observedAt}>{formatObserved(fact.observedAt)}</time>. Method:{' '}
        {fact.method}
        {fact.sourceUrl ? (
          <>
            {' '}
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="nofollow noopener"
              className="text-[#0a7c42] underline-offset-2 hover:underline"
            >
              Source
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
