import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.referralBlueprint);

export default function ReferralBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
