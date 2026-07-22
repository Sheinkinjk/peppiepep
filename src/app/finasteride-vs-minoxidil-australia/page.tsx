import HairLossGuide from "@/components/consumer/HairLossGuide";
import { HAIR_LOSS_GUIDE_BY_SLUG } from "@/lib/hair-loss-guides";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";

const cfg = HAIR_LOSS_GUIDE_BY_SLUG["/finasteride-vs-minoxidil-australia"];

export const metadata = generateSEOMetadata({ ...cfg.meta, url: `${SITE_URL}${cfg.slug}` });

export default function Page() {
  return <HairLossGuide cfg={cfg} />;
}
