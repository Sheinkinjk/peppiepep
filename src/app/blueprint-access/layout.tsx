import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blueprint Portal — Refer Labs",
  description: "Your Referral Growth Blueprint member portal. Track your order status and access resources.",
  robots: { index: false, follow: false },
};

export default function BlueprintAccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
