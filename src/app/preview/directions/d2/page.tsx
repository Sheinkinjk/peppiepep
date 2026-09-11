import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "../d2.css";
import { D2 } from "@/components/preview/dir/D2";
import { Switch } from "@/components/preview/dir/Switch";

const face = Familjen_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-d2" });

export const metadata: Metadata = { title: "D2 The Instrument", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className={face.variable}>
      <D2 />
      <Switch active="d2" />
    </div>
  );
}
