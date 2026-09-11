import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "../d1.css";
import { D1 } from "@/components/preview/dir/D1";
import { Switch } from "@/components/preview/dir/Switch";

const display = Newsreader({ subsets: ["latin"], display: "swap", weight: ["400", "500"], variable: "--font-d1-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600"], variable: "--font-d1-body" });

export const metadata: Metadata = { title: "D1 The Record", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <D1 />
      <Switch active="d1" />
    </div>
  );
}
