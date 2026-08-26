import ConsumerShell from '@/components/consumer/ConsumerShell';
import CitableFact from '@/components/facts/CitableFact';
import { FACTS } from '@/lib/facts/registry';
import type { Fact } from '@/lib/facts/types';
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from '@/lib/seo';

/**
 * The observation log.
 *
 * Every dated first-party observation in one place, so a claim made on a money
 * page can be traced to the day someone read it rather than taken on trust.
 *
 * Indexable, and described as a Dataset rather than an Article: it is a
 * structured series of dated records, and the coverage window is derived from
 * the records themselves rather than hand-maintained, so it cannot drift away
 * from what the page actually shows.
 */

export const metadata = generateSEOMetadata(seoConfig.data);

const HUB_LABEL: Record<Fact['hub'], string> = {
  'hair-loss': 'Hair loss',
  'weight-loss': 'Weight loss',
  'solar-energy': 'Solar & energy',
};

const HUB_ORDER: Fact['hub'][] = ['hair-loss', 'weight-loss', 'solar-energy'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** '2026-07-21' -> '21 July 2026'. Returns the input unchanged if malformed. */
function formatObserved(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Earliest and latest observedAt across the registry, derived not hand-kept. */
function coverage(facts: Fact[]): { earliest: string; latest: string } | null {
  if (facts.length === 0) return null;
  const dates = facts.map((f) => f.observedAt).sort();
  return { earliest: dates[0], latest: dates[dates.length - 1] };
}

function groupBySubject(facts: Fact[]): [string, Fact[]][] {
  const bySubject = new Map<string, Fact[]>();
  for (const fact of facts) {
    const list = bySubject.get(fact.subject);
    if (list) list.push(fact);
    else bySubject.set(fact.subject, [fact]);
  }
  return Array.from(bySubject.entries());
}

export default function DataPage() {
  const span = coverage(FACTS);

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Refer Labs observation log',
    description:
      'Dated first-party observations of Australian provider offers and prices, recorded on a weekly cadence. Each record states the date it was read, the person who read it and the method used.',
    url: `${SITE_URL}/data`,
    inLanguage: 'en-AU',
    isAccessibleForFree: true,
    creator: { '@id': `${SITE_URL}/#organization` },
    ...(span
      ? {
          temporalCoverage: `${span.earliest}/${span.latest}`,
          dateModified: span.latest,
        }
      : {}),
  };

  return (
    <ConsumerShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Observation log
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Every entry below is a first-party observation: something a person at Refer Labs read on a
          provider&apos;s own page, on a stated date, recorded as it appeared. Offers and prices are
          re-checked on a weekly cadence, and each check is logged here rather than overwriting the
          last one, so a figure can be traced to the day it was seen.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
          An observation records what was published at a point in time. It is not a quote, and it is
          not a promise about what a provider charges today: providers change prices and terms
          without notice, which is the reason each record carries its date and method. Where a
          provider publishes no figure, that absence is recorded too.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
          {span ? `This log began on ${formatObserved(span.earliest)}.` : 'This log has just begun.'}{' '}
          We record what we see on a provider&apos;s own site, on the day we see it, and we record it
          again when nothing has changed: an unchanged figure on a new date is evidence that it held.
          The log is short because it is new. It is re-checked weekly and grows from here.
        </p>

        {HUB_ORDER.map((hub) => {
          const inHub = FACTS.filter((f) => f.hub === hub);
          if (inHub.length === 0) return null;

          return (
            <section key={hub} className="mt-12">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
                {HUB_LABEL[hub]}
              </h2>

              {groupBySubject(inHub).map(([subject, facts]) => (
                <div key={subject} className="mt-6">
                  <h3 className="text-[15px] font-bold text-[#10251b]">{subject}</h3>
                  <div className="mt-3 space-y-3">
                    {facts.map((fact) => (
                      <CitableFact key={fact.id} fact={fact} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </main>
    </ConsumerShell>
  );
}
