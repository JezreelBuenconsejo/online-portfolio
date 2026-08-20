"use client";
import { useEffect, useRef } from "react";

/**
 * Act II, Identity.
 *
 * The section pins for roughly 1.5 screens while the statement builds line
 * by line, scrubbed against scroll position rather than played on a timer.
 * The reader controls the pace; scrolling back rewinds it.
 *
 * GSAP + ScrollTrigger are dynamically imported and desktop-only, so the
 * ~28kB never reaches phones, where pinning fights native scroll anyway.
 * Under reduced motion nothing pins and every line renders in its final
 * readable state.
 */

const LINES = [
  "I build web and mobile applications",
  "for people who have to use them every day:",
  "shop counters, storefronts, real money.",
];

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinning is desktop-only: on a phone it competes with native scroll
    // and the payoff does not justify the cost.
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    if (!mq.matches) {
      section.setAttribute("data-static", "true");
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        // Lenis drives scroll itself, so ScrollTrigger must read position
        // from it rather than from the native scroll event. Without this the
        // two disagree during the pin and the section judders.
        const lenis = window.__lenis;
        const onLenisScroll = () => ScrollTrigger.update();
        lenis?.on?.("scroll", onLenisScroll);

        const ctx = gsap.context(() => {
          const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
          const tail = section.querySelector("[data-tail]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: 1,
              pin: true,
              // The pinned element is fixed, so the page must not also
              // smooth-scroll underneath it mid-pin.
              anticipatePin: 1,
            },
          });

          lines.forEach((line, i) => {
            tl.fromTo(
              line,
              { opacity: 0, yPercent: 60, filter: "blur(8px)" },
              {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
                ease: "power2.out",
              },
              i * 0.6
            );
          });

          if (tail) {
            tl.fromTo(
              tail,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, ease: "power2.out" },
              lines.length * 0.6
            );
          }

          // Fonts and images settle after mount and change the pin height.
          ScrollTrigger.refresh();
        }, section);

        cleanup = () => {
          lenis?.off?.("scroll", onLenisScroll);
          ctx.revert();
        };
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      data-static="false"
      className="group/stmt min-h-screen flex items-center py-20 lg:py-0"
    >
      <div className="max-w-4xl xl:max-w-5xl mx-auto w-full">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-8">
          What I do
        </p>

        {LINES.map((line) => (
          <p
            key={line}
            data-line=""
            className="font-display text-2xl sm:text-3xl md:text-[2.6rem] xl:text-5xl font-light leading-[1.3] tracking-tight text-ink text-balance
              opacity-0 group-data-[static=true]/stmt:opacity-100"
          >
            {line}
          </p>
        ))}

        <div
          data-tail=""
          className="mt-10 max-w-measure opacity-0 group-data-[static=true]/stmt:opacity-100"
        >
          <p className="text-lg text-ink-muted leading-relaxed text-pretty">
            From thoughtful interfaces to reliable backend systems, I focus on
            building software that is practical, maintainable, and built to
            perform in the real world.
          </p>
        </div>

      </div>
    </section>
  );
}
