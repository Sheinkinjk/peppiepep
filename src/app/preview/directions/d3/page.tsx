import type { Metadata } from "next";
import { Instrument_Serif, Archivo, Spline_Sans_Mono } from "next/font/google";
import "../d3.css";
import { D3 } from "@/components/preview/dir/D3";
import { Switch } from "@/components/preview/dir/Switch";

const display = Instrument_Serif({ subsets: ["latin"], display: "swap", weight: ["400"], style: ["normal", "italic"], variable: "--font-d3-display" });
const body = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-d3-body" });
const mono = Spline_Sans_Mono({ subsets: ["latin"], display: "swap", variable: "--font-d3-mono" });

export const metadata: Metadata = { title: "D3 The Editorial", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <D3 />
      <Switch active="d3" />
    </div>
  );
}
