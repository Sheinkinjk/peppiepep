import { Archivo, Archivo_Black, Bricolage_Grotesque, Darker_Grotesque } from "next/font/google";

/**
 * Faces live here so the display choice is ONE edit, and so /a, /b and /c are
 * guaranteed identical in everything except the accent token.
 *
 * Body is Archivo: neutral, wide language coverage, real tabular figures, and
 * none of the banned defaults (Inter, Roboto, Open Sans, Lato, Montserrat,
 * Poppins). It pairs with Archivo Black as a true family rather than a guess.
 */

export const body = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-fx-body" });

/* candidates, all three loaded only on the specimen page */
export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-spec-bricolage" });
export const archivoBlack = Archivo_Black({ subsets: ["latin"], display: "swap", weight: ["400"], variable: "--font-spec-archivo" });
export const darker = Darker_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-spec-darker" });

/* THE CHOICE. Change this one line to change the display face everywhere. */
export const display = archivoBlack;
export const displayVar = "--font-spec-archivo";
