import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

/**
 * Act IV — Proof.
 *
 * Alternating full-width project rows rather than a uniform card grid: at
 * three projects a grid reads as thin, while giving each one a full row
 * makes the set feel considered.
 */
export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <Reveal className="mb-14">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-4">
          Selected work
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink text-balance">
          Things I&apos;ve shipped
        </h2>
        <p className="mt-5 max-w-measure text-ink-muted leading-relaxed text-pretty">
          Most of these are personal or direct-client projects. I can&apos;t show
          most of my client work due to NDAs I&apos;ve signed.
        </p>
      </Reveal>

      <div className="space-y-16 md:space-y-24">
        {projects.map((project, i) => (
          <Reveal key={project.slug} y={32}>
            <Link
              href={`/work/${project.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
            >
              <div
                className={`overflow-hidden rounded-xl border border-line bg-surface ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto aspect-[16/10] object-cover
                    group-hover:scale-[1.03] transition-transform duration-slow ease-out"
                />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
                  <span className="tabular-nums">{project.year}</span>
                  <span className="w-px h-3 bg-line-bright" />
                  <span>
                    {project.status === "live" ? "Live" : "In development"}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors duration-fast text-balance">
                  {project.title}
                </h3>

                <p className="mt-3 text-ink-muted leading-relaxed text-pretty">
                  {project.tagline}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[11px] text-ink-dim border border-line-bright rounded px-2 py-0.5"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read the case study
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-fast" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
