import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Navbar, Footer, Preloader } from "@/components/SharedUI";
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
  metadataBase: new URL('https://royaniwedding.com'),
  title: "Royani Wedding - Wedding Organizer & Planner Profesional",
  description: "Wujudkan hari spesial Anda menjadi sempurna dengan sentuhan elegan dan profesional bersama Royani Wedding. Jasa Wedding Organizer, Rias Busana, Dekorasi, & Dokumentasi Terbaik di Cirebon dan Sekitarnya.",
  keywords: [
    "wedding organizer",
    "wedding organizer cirebon",
    "paket akad cirebon",
    "paket pernikahan murah cirebon",
    "rias pengantin cirebon",
    "royani wedding",
    "wo cirebon",
    "dekorasi pernikahan"
  ],
  authors: [{ name: "Royani Wedding" }],
  openGraph: {
    title: "Royani Wedding - Wedding Organizer & Planner Profesional",
    description: "Jasa Wedding Organizer, Rias Busana, Dekorasi, & Dokumentasi Terbaik di Cirebon & Sekitarnya.",
    url: "https://royaniwedding.com",
    siteName: "Royani Wedding",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Royani Wedding Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royani Wedding - Wedding Organizer Profesional",
    description: "Jasa Wedding Organizer, Rias Busana, Dekorasi, & Dokumentasi Terbaik di Cirebon & Sekitarnya.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Royani Wedding",
  "image": "https://royaniwedding.com/images/logo.png",
  "description": "Jasa Wedding Organizer, Rias Busana, Dekorasi, & Dokumentasi Terbaik di Cirebon, Majalengka, dan Sekitarnya.",
  "url": "https://royaniwedding.com",
  "telephone": "+6287847222209",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Blok Rabu RT.03/RW.02 No.81, Beusi",
    "addressLocality": "Ligung, Majalengka",
    "addressRegion": "Jawa Barat",
    "addressCountry": "ID"
  },
  "priceRange": "$$"
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
