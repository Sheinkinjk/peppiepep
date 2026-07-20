import IntentPage from "@/components/lending/IntentPage";
import { INTENT_BY_SLUG } from "@/lib/lending-intent";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

const cfg = INTENT_BY_SLUG["low-doc-business-loans-australia"];

export const metadata = generateSEOMetadata({ ...cfg.meta, url: `${SITE_URL}/${cfg.slug}` });

export default function Page() {
  return <IntentPage cfg={cfg} />;
}
