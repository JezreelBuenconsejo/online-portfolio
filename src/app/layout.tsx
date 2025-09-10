import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Jezreel Buenconsejo | Full Stack Developer",
  description: "Portfolio of Jezreel Buenconsejo – Full Stack Developer skilled in TypeScript, React, Go, and more.",
  openGraph: {
    title: "Jezreel Buenconsejo | Full Stack Developer",
    description: "Explore my portfolio, projects, and tech stack.",
    url: "https://jezreelbuenconsejo.com/",
    type: "website",
    images: [
      {
        url: "https://example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jezreel Buenconsejo Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jezreel Buenconsejo | Full Stack Developer",
    description: "Explore my portfolio, projects, and tech stack.",
    images: ["https://example.com/og-image.png"],
  },
  metadataBase: new URL("https://jezreelbuenconsejo.netlify.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased lato-regular bg-theme-background relative`}>
         <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c76ba77f-398f-410b-b3d7-7b770d34c4cf"
          strategy="beforeInteractive" // Injects in <head> before JS loads
        />
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
