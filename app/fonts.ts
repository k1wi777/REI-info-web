import { Archivo, Geist, Geist_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Clases de las variables de fuente, compartidas por el layout y el 404 global. */
export const FONT_CLASS_NAMES = `${archivo.variable} ${geistSans.variable} ${geistMono.variable}`;
