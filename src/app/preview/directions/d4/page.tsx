import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../d4.css";
import { D4 } from "@/components/preview/dir/D4";
import { Switch } from "@/components/preview/dir/Switch";

const face = Jost({ subsets: ["latin"], display: "swap", variable: "--font-d4" });

export const metadata: Metadata = { title: "D4 The Specimen", robots: { index: false, follow: false } };

export default function Page() {
  return (<div className={face.variable}><D4 /><Switch active="d4" /></div>);
}
