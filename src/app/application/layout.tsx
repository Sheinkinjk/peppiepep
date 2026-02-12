import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.application);

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
