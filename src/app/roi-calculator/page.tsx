import { ROICalculator } from "@/components/ROICalculator";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.roiCalculator);

export default function ROICalculatorPage() {
  return <ROICalculator />;
}
