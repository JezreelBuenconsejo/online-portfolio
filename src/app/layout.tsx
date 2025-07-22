import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Jezreel Buenconsejo",
  description: "Online Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased lato-regular bg-theme-background relative`}>
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
