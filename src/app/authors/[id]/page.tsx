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
 * noindex for now, deliberately: the bio is empty until a human writes one, and
 * an author page with no biography is exactly the thin, auto-generated E-E-A-T
 * signal that publishing it is supposed to counter. It stays crawlable so the
 * noindex can be read, and so the Person node is still fetchable by anything
 * resolving the @id.
 *
 * TODO: remove `noIndex` once `bio` in src/lib/entities/authors.ts is populated.
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
    ...(author.bio ? { description: author.bio } : {}),
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

        {/* TODO(editorial): the biography goes here, once written. */}
        {author.bio ? (
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">{author.bio}</p>
        ) : null}

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
