import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RevealGroup from "@/components/motion/RevealGroup";
import { projects } from "@/data/projects";

export default function Portfolio() {
  return (
    <section id="portfolio" className="pt-20">
      <h2 className="text-center text-accent text-4xl md:text-5xl font-display mb-4">
        Portfolio
      </h2>
      <p className="italic text-ink-muted mb-10 text-center max-w-2xl mx-auto">
        NOTE: Most of these work are personal projects. I am unable to showcase
        most my client work due to Non-Disclosure Agreements (NDAs) I have
        signed.
      </p>

      <RevealGroup
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
        stagger={120}
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block rounded-xl border border-line bg-surface overflow-hidden hover:border-accent transition-colors duration-fast h-full"
          >
            <div className="overflow-hidden">
              <Image
                width={600}
                height={380}
                src={project.cover.src}
                alt={project.cover.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-[190px] object-cover group-hover:scale-105 transition-transform duration-slow ease-out"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors duration-fast text-balance">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-ink-dim group-hover:text-accent transition-colors duration-fast" />
              </div>

              <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3">
                {project.tagline}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-[11px] text-ink-dim border border-line-bright rounded px-1.5 py-0.5"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </RevealGroup>
    </section>
  );
}
