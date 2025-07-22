"use client";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <Skills />
      <Experience />
      <Portfolio />
      <Contact />
    </div>
  );
}
