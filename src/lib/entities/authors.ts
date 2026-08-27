/**
 * People who make observations, so a fact can name one rather than a brand.
 *
 * The bio is empty on purpose. A biography is an editorial claim about a real
 * person, and inventing one would be exactly the fabricated-credential problem
 * this whole layer exists to avoid.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  sameAs: string[];
}

export const AUTHORS: Author[] = [
  {
    id: 'jarred',
    name: 'Jarred',
    role: 'Founder',
    // TODO(editorial): Jarred to write this. Do not generate a biography here.
    bio: '',
    sameAs: [],
  },
];

const BY_ID = new Map(AUTHORS.map((a) => [a.id, a]));

export function authorById(id: string): Author | null {
  return BY_ID.get(id) ?? null;
}
