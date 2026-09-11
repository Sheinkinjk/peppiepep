import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../d5.css";
import { D5 } from "@/components/preview/dir/D5";
import { Switch } from "@/components/preview/dir/Switch";

const face = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-d5" });

export const metadata: Metadata = { title: "D5 The Signal", robots: { index: false, follow: false } };

export default function Page() {
  return (<div className={face.variable}><D5 /><Switch active="d5" /></div>);
}
