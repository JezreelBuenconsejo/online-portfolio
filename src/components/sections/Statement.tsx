"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

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
  const teardownRef = useRef<(() => void) | undefined>(undefined);

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
        // Shared so the route-change handler can refresh pin measurements
        // after navigation, without importing GSAP into that bundle.
        window.__ScrollTrigger = ScrollTrigger;

        // Lenis drives scroll itself, so ScrollTrigger must read position
        // from it rather than from the native scroll event. Without this the
        // two disagree during the pin and the section judders.
        const lenis = window.__lenis;
        const onLenisScroll = () => ScrollTrigger.update();
        lenis?.on?.("scroll", onLenisScroll);

        let drawCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
          const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
          const tail = section.querySelector("[data-tail]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=110%",
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

          // The connector must NOT be a tween on the pinned timeline: that
          // holds the pin open until it finishes, gating scrolling.
          //
          // It also cannot use start/end offsets against this section, whose
          // box is frozen while pinned. Instead it listens to raw scroll and
          // maps the stretch *after* the pin ends onto the line's scale, so
          // it draws while the page moves normally.
          const outLine = section.querySelector<HTMLElement>("[data-outline]");
          if (outLine) {
            gsap.set(outLine, { scaleY: 0, transformOrigin: "top center" });

            const draw = () => {
              const pinEnd = tl.scrollTrigger?.end;
              if (pinEnd == null) return;

              // Draw across 1.3 screens of ordinary scrolling once the pin
              // has released, so the line grows over a longer stretch.
              const span = window.innerHeight * 1.0;
              // Start a little before the pin fully releases, so the line is
              // already growing as the page begins to move.
              const lead = window.innerHeight * 0.15;
              // Read from the pin's own scroller so the value matches what
              // ScrollTrigger measured pinEnd against; Lenis drives scrolling
              // here and window.scrollY can lag behind it.
              const y = tl.scrollTrigger?.scroll() ?? window.scrollY;
              const progress = (y - (pinEnd - lead)) / span;
              gsap.set(outLine, {
                scaleY: Math.max(0, Math.min(1, progress)),
              });
            };

            draw();
            ScrollTrigger.addEventListener("refresh", draw);
            window.addEventListener("scroll", draw, { passive: true });
            lenis?.on?.("scroll", draw);

            drawCleanup = () => {
              ScrollTrigger.removeEventListener("refresh", draw);
              window.removeEventListener("scroll", draw);
              lenis?.off?.("scroll", draw);
            };
          }

          // Fonts and images settle after mount and change the pin height.
          ScrollTrigger.refresh();
        }, section);

        cleanup = () => {
          teardownRef.current = undefined;
          window.__ScrollTrigger = undefined;
          drawCleanup?.();
          lenis?.off?.("scroll", onLenisScroll);
          ctx.revert();
        };
        teardownRef.current = cleanup;
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Tear the pin down synchronously, before React begins removing this
  // subtree. A useEffect cleanup runs too late: by then React may already
  // be calling removeChild against a parent GSAP has changed.
  useLayoutEffect(() => {
    return () => {
      teardownRef.current?.();
      teardownRef.current = undefined;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      data-static="false"
      className="group/stmt relative min-h-screen flex items-center py-20 lg:py-0"
    >
      {/* Connector: continues the hero's scroll cue down to the copy below.
          Anchored to the section's top edge rather than sitting in the
          centred content flow, and pulled up by the 32px the hero's cue
          stops short of its own boundary so the two lines meet.
          Decorative, so hidden from assistive tech. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
          block w-px h-[calc(50vh-12rem)] sm:h-[calc(50vh-7.5rem)]
          bg-gradient-to-b from-accent/40 to-accent"
      />

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
        {/* Outgoing connector. origin-top so it draws downward, scrubbed
            against scroll as the closing beat of the pinned timeline. */}
        <span
          aria-hidden="true"
          data-outline=""
          className="pointer-events-none absolute -bottom-[70px] left-1/2 -translate-x-1/2
          block w-px h-[calc(50vh-10rem)] sm:h-[calc(50vh-7.5rem)] origin-top
          bg-gradient-to-b from-accent via-accent/50 to-transparent"
        />
      </div>
    </section>
  );
}
