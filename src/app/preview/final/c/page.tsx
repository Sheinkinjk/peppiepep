import type { Metadata } from "next";
import "../final.css";
import { body, display, displayVar } from "../fonts";
import { Final } from "@/components/preview/final/Final";
import { FinalSwitch } from "@/components/preview/final/FinalSwitch";

export const metadata: Metadata = {
  title: "Final c",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`fc ${body.variable} ${display.variable}`}
      style={{ ["--font-fx-display" as string]: `var(${displayVar})` }}>
      <Final />
      <FinalSwitch active="c" />
    </div>
  );
}
