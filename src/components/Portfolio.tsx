import { ArrowBigUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RevealGroup from "@/components/motion/RevealGroup";
import { projects } from "@/data/projects";

export default function Portfolio() {
  return (
    <section id="portfolio" className="pt-20">
      <h2 className="text-center text-accent text-4xl md:text-5xl font-display mb-4">
        Portfolio
      </h2>
      <p className="italic text-ink mb-8">
        NOTE: Most of these work are personal projects. I am unable to showcase
        most my client work due to Non-Disclosure Agreements (NDAs) I have
        signed.
      </p>

      <RevealGroup
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6"
        stagger={120}
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            className="relative md:shadow-lg overflow-hidden flex items-center justify-center"
            href={project.links.live ?? "#"}
            target="_blank"
          >
            <div className="space-y-2 flex flex-col justify-end h-full text-center text-ink group text-base tracking-wide">
              <div className="flex h-full flex-col items-center justify-center flex-1">
                <h3 className="group-hover:text-accent transition-colors duration-fast text-lg">
                  {project.title}
                </h3>
                <p className="text-sm">
                  {project.status === "in-development" && (
                    <span className="italic">(In Development)</span>
                  )}
                </p>
              </div>
              <div className="overflow-hidden h-full w-full md:max-h-[190px] md:h-[190px]">
                <div className="md:w-fit h-full overflow-hidden rounded-xl mx-auto relative">
                  <Image
                    width={300}
                    height={190}
                    src={project.cover.src}
                    alt={project.cover.alt}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="group-hover:scale-110 transition-transform duration-300 h-full object-cover overflow-hidden flex rounded-xl md:max-h-[190px] mx-auto"
                  />
                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
                    <ArrowBigUp className="rotate-45 w-20 h-20 text-ink stroke-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </RevealGroup>
    </section>
  );
}
