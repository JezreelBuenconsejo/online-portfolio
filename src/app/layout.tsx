import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClientWrapper from "@/components/ClientWrapper";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import React from "react";
import { site, contact } from "@/data/site";

/* Self-hosted by next/font: no external request, no layout shift.
   Exposed as CSS variables that tailwind.config.ts binds to. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0C10",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  keywords: [
    "Jezreel Jose Buenconsejo",
    "Software Developer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Golang",
    "Philippines",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: ["Jez Buenconsejo", "Jezreel Buenconsejo"],
    url: site.url,
    jobTitle: "Software Developer / Frontend Engineer",
    worksFor: { "@type": "Organization", name: "Askrella" },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Golang",
      "Node.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: site.location.country,
      addressRegion: site.location.region,
      addressLocality: site.location.city,
    },
    sameAs: [contact.github, "https://jez-buenconsejo.vercel.app"],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.title,
    inLanguage: "en",
  };

  return (
    <html
      lang="en"
      className={`h-full ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-void relative h-full font-sans">
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c76ba77f-398f-410b-b3d7-7b770d34c4cf"
          strategy="afterInteractive"
        />

        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />

        <SmoothScroll />

        <ClientWrapper>
          <AnimatedBackground />
          <Navbar />
          <main className="max-w-[1440px] mx-auto px-5 md:px-10 xl:px-24 relative">
            {children}
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}
