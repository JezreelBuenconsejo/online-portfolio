import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      {/* Experience now lives on /about — it's reference material, and it
          diluted the homepage's momentum between Skills and the work. */}
      <Portfolio />
      <Contact />
    </>
  );
}
