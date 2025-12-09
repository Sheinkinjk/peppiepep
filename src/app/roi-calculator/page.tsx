import { ROICalculator } from "@/components/ROICalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator - Refer Labs Referral Program",
  description: "Calculate your referral program ROI and discover the perfect reward structure. Free AI-powered calculator with 90-day revenue forecasts.",
  openGraph: {
    title: "ROI Calculator - Refer Labs Referral Program",
    description: "Calculate your referral program ROI and discover the perfect reward structure.",
    type: "website",
  },
};

export default function ROICalculatorPage() {
  return <ROICalculator />;
}
