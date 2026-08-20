import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { projects, getProject, getProjectNeighbours } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `${site.url}/work/${project.slug}`;
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} | ${site.name}`,
      description: project.tagline,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${site.name}`,
      description: project.tagline,
      images: [project.cover.src],
    },
  };
}

/** Section heading + prose, omitted entirely when the field is empty. */
function Chapter({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <Reveal as="section" className="mt-14">
      <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-4">
        {label}
      </h2>
      <div className="text-ink-muted text-lg leading-relaxed">{children}</div>
    </Reveal>
  );
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    url: `${site.url}/work/${project.slug}`,
    dateCreated: project.year,
    creator: { "@type": "Person", name: site.name },
    keywords: project.stack.join(", "),
  };

  return (
    <article className="pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-dim hover:text-accent transition-colors duration-fast"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All work
      </Link>

      {/* --- Hero --- */}
      <header className="mt-8 max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink text-balance">
          {project.title}
        </h1>
        <p className="mt-5 text-xl md:text-2xl text-ink-muted leading-snug text-pretty">
          {project.tagline}
        </p>

        <dl className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 font-mono text-xs">
          <div>
            <dt className="uppercase tracking-[0.14em] text-ink-dim mb-1.5">Year</dt>
            <dd className="text-ink text-sm">{project.year}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.14em] text-ink-dim mb-1.5">Role</dt>
            <dd className="text-ink text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.14em] text-ink-dim mb-1.5">Status</dt>
            <dd className="text-ink text-sm">
              {project.status === "live" ? "Live" : "In development"}
            </dd>
          </div>
        </dl>

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-xs text-ink-muted border border-line-bright rounded px-2.5 py-1"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-void hover:bg-accent-deep transition-colors duration-fast"
            >
              Visit site
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-bright px-4 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors duration-fast"
            >
              Source
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </header>

      {/* --- Cover --- */}
      <Reveal className="mt-14">
        <div className="rounded-xl overflow-hidden border border-line bg-surface">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            className="w-full h-auto"
          />
        </div>
      </Reveal>

      {/* --- Narrative --- */}
      <div className="max-w-measure">
        <Chapter label="Overview">
          <p>{project.overview}</p>
        </Chapter>

        <Chapter label="The challenge">
          {project.challenge && <p>{project.challenge}</p>}
        </Chapter>

        <Chapter label="The approach">
          {project.solution && <p>{project.solution}</p>}
        </Chapter>
      </div>

      {/* --- Features --- */}
      {project.features && project.features.length > 0 && (
        <Reveal as="section" className="mt-14 max-w-measure">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-6">
            Features &amp; details
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {project.features.map((f) => (
              <div key={f.title} className="py-6">
                <h3 className="font-display text-lg font-semibold text-ink mb-2 text-balance">
                  {f.title}
                </h3>
                <p className="text-ink-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <div className="max-w-measure">
        <Chapter label="Outcome">
          {project.outcome && <p>{project.outcome}</p>}
        </Chapter>
      </div>

      {/* --- Prev / next --- */}
      {(prev || next) && (
        <nav className="mt-20 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev && (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-lg border border-line p-5 hover:border-accent transition-colors duration-fast"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </span>
              <span className="mt-2 block font-display text-lg text-ink group-hover:text-accent transition-colors duration-fast">
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-lg border border-line p-5 hover:border-accent transition-colors duration-fast sm:text-right"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim flex items-center gap-2 sm:justify-end">
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="mt-2 block font-display text-lg text-ink group-hover:text-accent transition-colors duration-fast">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
