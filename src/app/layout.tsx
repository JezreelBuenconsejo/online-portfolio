import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";
import { Lato } from "next/font/google";
import React from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

// --- Site constants ---
const siteUrl = "https://www.jezreelbuenconsejo.com";
const siteName = "Jezreel Jose Buenconsejo — Software Developer";
const siteDesc =
  "Software Developer & Frontend Engineer (React/Next.js, TypeScript, Golang, Node.js) based in the Philippines. I build fast, accessible, and scalable web apps.";

// Viewport & theme color help CWV and SERP presentation
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

// Global SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s — Jezreel Jose Buenconsejo",
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDesc,
    images: [
      // Prefer a local dynamic OG: create /app/og/route.ts and use "/og"
      { url: "/og.png", width: 1200, height: 630, alt: siteName },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: ["/og.png"],
    // site: "@your_handle",
    // creator: "@your_handle",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: ["Jezreel Jose Buenconsejo", "Software Developer", "Frontend Engineer", "React", "Next.js", "TypeScript", "Golang", "Philippines"],

  verification: {
    // Replace with your real tokens once you add the property in GSC/Bing
    // google: "GOOGLE_SEARCH_CONSOLE_CODE",
    // other: { "msvalidate.01": "BING_WEBMASTER_CODE" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD: Person + WebSite (helps you rank #1 for your name)
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jezreel Jose Buenconsejo",
    alternateName: ["Jez Buenconsejo", "Jezreel Buenconsejo"],
    url: siteUrl,
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
      addressCountry: "PH",
      addressRegion: "Palawan",
      addressLocality: "Puerto Princesa",
    },
    sameAs: [
      "https://github.com/JezreelBuenconsejo",
      "https://jez-buenconsejo.vercel.app",
      "https://jezreelbuenconsejo.netlify.app",
      // Add LinkedIn, X, StackOverflow, dev.to, etc.
    ],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: siteName,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="h-full">
      <body className={`antialiased bg-theme-background relative h-full ${lato.className}`}>
        {/* Analytics: afterInteractive avoids blocking CWV */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c76ba77f-398f-410b-b3d7-7b770d34c4cf"
          strategy="afterInteractive"
        />

        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />


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
