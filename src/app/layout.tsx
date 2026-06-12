import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royani Wedding - Wedding Organizer & Planner Profesional",
  description: "Wujudkan hari spesial Anda menjadi sempurna dengan sentuhan elegan dan profesional bersama Royani Wedding. Jasa Wedding Organizer, Rias Busana, Dekorasi, & Dokumentasi Terbaik.",
  keywords: [
    "wedding organizer",
    "wedding organizer cirebon",
    "paket akad cirebon",
    "paket pernikahan murah cirebon",
    "rias pengantin cirebon",
    "royani wedding",
  ],
  authors: [{ name: "Royani Wedding" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
