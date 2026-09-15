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
      'Dated first-party observations of Australian provider offers and prices. Each record states the date it was read, the person who read it and the method used. Re-checks are intended weekly; the records are the log of what has been checked.',
    url: `${SITE_URL}/data`,
    inLanguage: 'en-AU',
    isAccessibleForFree: true,
    creator: { '@id': `${SITE_URL}/#organization` },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creditText: 'Refer Labs observation log',
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${SITE_URL}/data/observations.csv`,
      },
    ],
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
          provider&apos;s own page, on a stated date, recorded as it appeared. Each check is logged
          here rather than overwriting the last one, so a figure can be traced to the day it was
          seen, and the dates below are the record of what has been checked and when.
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
          The log is short because it is new. Weekly re-checks are what we are aiming for; the dates
          above are what has happened so far.
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

        {/* Added 15 Sep 2026: a download and a stated licence, so the log can be
            reused and credited rather than only read. The CSV is generated from
            the same FACTS records as this page (src/app/data/observations.csv). */}
        <section className="mt-14 border-t border-[#e5e9e7] pt-10">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Using this data</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
            The whole log is available as a spreadsheet:{' '}
            <a href="/data/observations.csv" className="font-semibold text-[#0a7c42] underline-offset-2 hover:underline">
              download the observation log (CSV)
            </a>
            . It is generated from the same records shown above, so the two cannot differ.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
            You may quote, reuse and republish these observations, including commercially, under the{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener"
              className="text-[#0a7c42] underline-offset-2 hover:underline"
            >
              Creative Commons Attribution 4.0 licence
            </a>
            . Credit &ldquo;Refer Labs observation log&rdquo; with a link to referlabs.com.au/data, and keep the
            observation date beside any figure you use: each record describes what a provider published on that day,
            not what it charges today.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
            Each record names the date it was made, who made it and the method. Records are added rather than
            overwritten, so a later check sits beside the earlier one. To report an error, email{' '}
            <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] underline-offset-2 hover:underline">
              jarred@referlabs.com.au
            </a>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
