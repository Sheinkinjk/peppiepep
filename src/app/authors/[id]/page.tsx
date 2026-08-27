import { notFound } from 'next/navigation';

import ConsumerShell from '@/components/consumer/ConsumerShell';
import { AUTHORS, authorById } from '@/lib/entities/authors';
import { generateMetadata as generateSEOMetadata, SITE_URL } from '@/lib/seo';

/**
 * Author page.
 *
 * It exists so the `author` reference every page now carries resolves to a real
 * node rather than dangling. The Person `@id` here is the one those pages point
 * at, so this file is the single definition of that entity.
 *
 * noindex permanently, and that is a decision, not a holding position. There
 * will be no biography, so this page will always be a short identity node, and
 * a thin page is exactly the auto-generated E-E-A-T signal that publishing an
 * author page is meant to counter. Indexing 23 words would work against the
 * thing the page exists to support.
 *
 * None of that costs anything, because indexing was never the job. The job is
 * that the Person @id resolves, and it does: noindex does not block crawling,
 * /authors is not disallowed in robots.txt, and the node is fetchable by
 * anything following the reference from the 65 Article authors that point here.
 *
 * For the same reason the page is deliberately absent from src/app/sitemap.ts:
 * a noIndex URL in the sitemap asks Google to crawl a page we also ask it to
 * drop. Do not "fix" either by adding the row or lifting the noIndex.
 */

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = authorById(id);
  if (!author) return generateSEOMetadata({
    title: 'Author | Refer Labs',
    description: 'Author profile.',
    url: `${SITE_URL}/authors/${id}`,
    noIndex: true,
  });

  return generateSEOMetadata({
    title: `${author.name}, ${author.role} | Refer Labs`,
    description: `${author.name} is ${author.role} at Refer Labs and records the dated first-party observations published in the observation log.`,
    url: `${SITE_URL}/authors/${author.id}`,
    noIndex: true,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = authorById(id);
  if (!author) notFound();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${author.id}#person`,
    name: author.name,
    jobTitle: author.role,
    url: `${SITE_URL}/authors/${author.id}`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
  };

  return (
    <ConsumerShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          {author.name}
        </h1>
        <p className="mt-2 text-[15px] text-[#6e7b74]">{author.role}, Refer Labs</p>

        <p className="mt-5 text-[15px] leading-relaxed text-[#3d4b44]">
          Observations recorded by {author.name} are listed in the{' '}
          <a href="/data" className="font-semibold text-[#0a7c42] hover:underline">
            observation log
          </a>
          , each with the date it was made and the method used.
        </p>
      </main>
    </ConsumerShell>
  );
}
