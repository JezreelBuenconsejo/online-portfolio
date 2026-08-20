import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import { skillGroups, skillIcons } from "@/data/skills";

/**
 * Act III, Craft.
 *
 * Replaces the old five-tab UI. Everything is visible at once, grouped by
 * domain and assembled on scroll, a tab bar is a form control, and it
 * interrupts a narrative scroll.
 *
 * Server component: no state, no interaction, zero client JS beyond the
 * reveal observers.
 */
export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Reveal className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-4">
          Craft
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink text-balance">
          What I build with
        </h2>
      </Reveal>

      <div className="space-y-14 md:space-y-20">
        {skillGroups.map((group, gi) => (
          <div
            key={group.title}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-5 md:gap-10"
          >
            <Reveal delay={gi * 60} className="md:sticky md:top-28 h-fit">
              <h3 className="font-display text-xl font-semibold text-ink">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">
                {group.note}
              </p>
              <span className="mt-3 block font-mono text-[11px] text-ink-dim tabular-nums">
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </Reveal>

            <RevealGroup
              className="flex flex-wrap gap-2 md:gap-2.5 content-start"
              stagger={40}
              y={14}
            >
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface
                    px-3 py-2 text-sm text-ink-muted
                    hover:border-accent hover:text-ink hover:-translate-y-0.5
                    transition-all duration-fast ease-out"
                >
                  {skillIcons[skill] && (
                    <Image
                      src={skillIcons[skill]}
                      alt=""
                      aria-hidden="true"
                      width={40}
                      height={40}
                      sizes="20px"
                      className="w-5 h-5 object-contain shrink-0"
                    />
                  )}
                  {skill}
                </span>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
