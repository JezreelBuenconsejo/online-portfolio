import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Portfolio />
      <Contact/>
    </>
  );
}
