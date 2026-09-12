import type { Metadata } from "next";
import "../../redesign/redesign.css";
import { body, display } from "../../redesign/fonts";
import { Home } from "@/components/preview/redesign/Home";
import { FinalBSwitch } from "@/components/preview/redesign/FinalBSwitch";

export const metadata: Metadata = {
  title: "Final B 3",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Home variant="b" lead="date" />
      <FinalBSwitch active="3" />
    </div>
  );
}
