import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

/**
 * The page is a client component, so it cannot export metadata itself. Without
 * this sibling layout it inherited the root layout's canonical and told Google
 * it WAS the homepage, which is the duplicate-canonical fault CLAUDE.md warns
 * about. It was the only live page still in that state.
 *
 * noIndex because the Blueprint is retired: this collects reviews from people
 * who bought a product we no longer sell. It stays crawlable so the noindex can
 * actually be read, and reachable so anyone with the link can still use it.
 */
export const metadata = generateSEOMetadata(seoConfig.leaveAReview);

export default function LeaveAReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
