import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pondok Tanjung Kotabunan | Resto Cafe Kotabunan",
  description: "Cafe sederhana dengan menu lokal terbaik di Kotabunan. Nikmati hidangan lezat dengan cita rasa asli Indonesia.",
  keywords: [
    "Pondok Tanjung",
    "Kotabunan",
    "Resto Cafe",
    "Cafe Kotabunan",
    "Makanan Lokal",
    "Kuliner Sulawesi Utara",
    "Lalapan Ayam",
    "Ikan Bakar",
    "Nasi Goreng"
  ],
  authors: [{ name: "Pondok Tanjung" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Pondok Tanjung Kotabunan | Resto Cafe Sederhana",
    description: "Cafe sederhana dengan menu lokal terbaik di Kotabunan",
    url: "https://pondoktanjung.com",
    siteName: "Pondok Tanjung",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Pondok Tanjung Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Tanjung Kotabunan | Resto Cafe",
    description: "Cafe sederhana dengan menu lokal terbaik di Kotabunan",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=630&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pondok Tanjung Kotabunan",
              "description": "Resto Cafe Sederhana dengan Cita Rasa Lokal Terbaik",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Trans Sulawesi Utara, Link. Selatan",
                "addressLocality": "Kotabunan",
                "addressRegion": "Sulawesi Utara",
                "addressCountry": "ID",
              },
              "telephone": "+6281245737282",
              "priceRange": "Rp",
              "servesCuisine": "Indonesian",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                "opens": "08:00",
                "closes": "22:00",
              },
              "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
              "url": "https://pondoktanjung.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              "name": "Pondok Tanjung Kotabunan",
              "description": "Resto Cafe Sederhana dengan Cita Rasa Lokal Terbaik",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Trans Sulawesi Utara, Link. Selatan",
                "addressLocality": "Kotabunan",
                "addressRegion": "Sulawesi Utara",
                "addressCountry": "ID",
              },
              "telephone": "+6281245737282",
              "servesCuisine": "Indonesian",
              "priceRange": "Rp",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
