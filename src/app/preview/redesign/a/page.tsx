import type { Metadata } from "next";
import "../redesign.css";
import { body, display } from "../fonts";
import { Home } from "@/components/preview/redesign/Home";
import { RedesignSwitch } from "@/components/preview/redesign/RedesignSwitch";

export const metadata: Metadata = {
  title: "Redesign a",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Home variant="a" />
      <RedesignSwitch active="a" />
    </div>
  );
}
