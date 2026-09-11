import { Archivo, Archivo_Black } from "next/font/google";

/** Kept from /preview/final: Archivo Black display, Archivo body. */
export const display = Archivo_Black({ subsets: ["latin"], display: "swap", weight: ["400"], variable: "--font-rd-display" });
export const body = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-rd-body" });
