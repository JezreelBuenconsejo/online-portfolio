import Reveal from "@/components/motion/Reveal";

/**
 * Act II — Identity.
 *
 * A short statement that builds line by line as it enters view. Deliberately
 * quiet: large type, generous space, nothing to click. It exists to slow the
 * reader down between the hero and the work.
 */

const LINES = [
  "I build web and mobile applications",
  "for people who have to use them every day —",
  "shop counters, storefronts, real money.",
];

export default function Statement() {
  return (
    <section id="statement" className="py-28 md:py-40">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-8">
          What I do
        </p>

        {LINES.map((line, i) => (
          <Reveal
            key={line}
            as="p"
            delay={i * 120}
            y={28}
            className="font-display text-2xl sm:text-3xl md:text-[2.6rem] font-light leading-[1.35] tracking-tight text-ink text-balance"
          >
            {line}
          </Reveal>
        ))}

        <Reveal delay={420} className="mt-10 max-w-measure">
          <p className="text-lg text-ink-muted leading-relaxed text-pretty">
            From thoughtful interfaces to reliable backend systems, I focus on building software that is practical, maintainable, and built to perform in the real world.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
