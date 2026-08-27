/**
 * People who make observations, so a fact can name one rather than a brand.
 *
 * There is no `bio` field, by decision rather than omission. A biography is an
 * editorial claim about a real person; the only honest one would have to be
 * written by that person, and it is not going to be. Carrying an empty string
 * and a TODO implied it was coming, so the field is gone and /authors/<id>
 * stays a plain identity node: name, role, employer, and the observations.
 * See the note in src/app/authors/[id]/page.tsx for why that page is noindex.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  sameAs: string[];
}

export const AUTHORS: Author[] = [
  {
    id: 'jarred',
    name: 'Jarred',
    role: 'Founder',
    sameAs: [],
  },
];

const BY_ID = new Map(AUTHORS.map((a) => [a.id, a]));

export function authorById(id: string): Author | null {
  return BY_ID.get(id) ?? null;
}
