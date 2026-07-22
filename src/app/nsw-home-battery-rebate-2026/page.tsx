import ApolloGuide from "@/components/consumer/ApolloGuide";
import { APOLLO_GUIDE_BY_SLUG } from "@/lib/apollo-guides";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

const cfg = APOLLO_GUIDE_BY_SLUG["/nsw-home-battery-rebate-2026"];

export const metadata = generateSEOMetadata({ ...cfg.meta, url: `${SITE_URL}${cfg.slug}` });

export default function Page() {
  return <ApolloGuide cfg={cfg} />;
}
