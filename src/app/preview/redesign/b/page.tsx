import type { Metadata } from "next";
import "../redesign.css";
import { body, display } from "../fonts";
import { Home } from "@/components/preview/redesign/Home";
import { RedesignSwitch } from "@/components/preview/redesign/RedesignSwitch";

export const metadata: Metadata = {
  title: "Redesign b",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Home variant="b" />
      <RedesignSwitch active="b" />
    </div>
  );
}
