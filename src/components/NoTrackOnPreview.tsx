"use client";

import { usePathname } from "next/navigation";

/**
 * Renders nothing on /preview/* (8 Oct 2026): review copies sent to partners load
 * no analytics, pixels or click trackers, so the cookie banner is not shown there either. Everywhere else it renders its children.
 */
export function NoTrackOnPreview({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  if (pathname === "/preview" || pathname.startsWith("/preview/")) return null;
  return <>{children}</>;
}
