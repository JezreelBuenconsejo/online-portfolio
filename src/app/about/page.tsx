import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Experience from "@/components/Experience";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.role} based in ${site.location.city}, ${site.location.region}. Background, experience, and how I work.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function About() {
  return (
    <div className="pt-28 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-dim hover:text-accent transition-colors duration-fast"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Home
      </Link>

      <header className="mt-8 max-w-measure">
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink text-balance">
          About
        </h1>
        <div className="mt-6 space-y-5 text-lg text-ink-muted leading-relaxed">
          <p>
            I&apos;m {site.name}, a software developer based in{" "}
            {site.location.city}, {site.location.region}. I build web and mobile
            applications, mostly React and Next.js on the front, Go, Node, and
            Postgres behind them.
          </p>
          <p>
            Most of what I work on has a real user waiting on the other end: a
            shop counter that has to take payment correctly, a storefront that
            has to accept the payment methods people here actually use. That
            tends to shape my decisions more than any preference for a
            particular stack.
          </p>
        </div>
      </header>

      <Reveal className="mt-16">
        <Experience />
      </Reveal>
    </div>
  );
}
