import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

/**
 * The homepage as five acts: arrival, identity, craft, proof, invitation.
 * Experience lives on /about, it's reference material, and it diluted the
 * momentum between craft and the work itself.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Skills />
      <Work />
      <Contact />
    </>
  );
}
