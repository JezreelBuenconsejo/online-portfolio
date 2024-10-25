import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body className={`antialiased lato-regular bg-theme-background`}>
        <Navbar />
        <main className="max-w-[1440px] mx-auto px-5 md:px-10 xl:px-24 bg-theme-background">
          {children}
        </main>
      </body>
    </html>
  );
}
