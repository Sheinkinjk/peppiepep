import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata = generateSEOMetadata(seoConfig.dashboard);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
