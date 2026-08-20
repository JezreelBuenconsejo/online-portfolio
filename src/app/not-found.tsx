import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="mt-4 text-ink-muted">
        That page doesn&apos;t exist, or it moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line-bright px-4 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors duration-fast"
      >
        <ArrowLeft className="w-4 h-4" />
        Back home
      </Link>
    </div>
  );
}
