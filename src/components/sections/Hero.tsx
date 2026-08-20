"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { site } from "@/data/site";

/**
 * Act I — Arrival.
 *
 * Name resolves word by word, a soft accent glow tracks the cursor, and the
 * whole group drifts on scroll. Everything is transform/opacity on a single
 * rAF-throttled listener; no JS animation loop.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance: flip to final state next frame so the initial one paints first.
    const raf = requestAnimationFrame(() => {
      sectionRef.current?.setAttribute("data-entered", "true");
    });

    if (reduce) return () => cancelAnimationFrame(raf);

    let ticking = false;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      const el = sectionRef.current;
      const h = el?.offsetHeight || 1;
      // 0 at the top of the hero, 1 once it has scrolled fully past.
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);

      const glow = glowRef.current;
      if (glow) {
        glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        // Fade the glow out gradually rather than clipping it at the
        // section boundary.
        glow.style.opacity = `${Math.max(0, 1 - p * 1.4)}`;
      }

      const target = parallaxRef.current;
      if (el && target) {
        target.style.transform = `translate3d(0, ${p * 12}%, 0)`;
        target.style.opacity = `${1 - p * 0.6}`;
      }
      ticking = false;
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointerX = e.clientX - r.left - r.width / 2;
      pointerY = e.clientY - r.top - r.height / 2;
      schedule();
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    // Pointer-driven only: no glow chase on touch, where there is no cursor.
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const name = site.name.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-entered="false"
      className="group/hero relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center pt-24 pb-16"
    >
      {/* Cursor-tracking glow. Decorative, hidden from assistive tech.
          Fixed rather than absolute so it escapes the 1440px <main> clamp
          and spans the full viewport; opacity is driven by scroll in the
          effect above, so it fades out instead of clipping at the section
          edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[1] flex items-center justify-center overflow-hidden
          opacity-0 group-data-[entered=true]/hero:opacity-100
          transition-opacity duration-entrance-lg ease-out"
      >
        <div
          ref={glowRef}
          className="w-[min(120vw,60rem)] h-[min(120vw,60rem)] rounded-full bg-gradient-radial from-accent/20 via-accent/[0.06] to-transparent blur-3xl will-change-transform"
        />
      </div>

      <div
        ref={parallaxRef}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14 will-change-transform"
      >
        <div className="flex-1 flex justify-center lg:justify-start">
          <Image
            src="/assets/Hero.png"
            alt={site.name}
            width={480}
            height={480}
            priority
            sizes="(max-width: 1024px) 60vw, 420px"
            className="w-44 sm:w-64 lg:w-full lg:max-w-[420px] h-auto drop-shadow-2xl
              opacity-0 scale-90 blur-sm
              group-data-[entered=true]/hero:opacity-100
              group-data-[entered=true]/hero:scale-100
              group-data-[entered=true]/hero:blur-0
              transition-all duration-entrance-xl ease-out"
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <p
            className="font-mono text-xs uppercase tracking-[0.2em] text-accent
              opacity-0 translate-y-2
              group-data-[entered=true]/hero:opacity-100
              group-data-[entered=true]/hero:translate-y-0
              transition-all duration-slow ease-out"
          >
            {site.location.city}, {site.location.region}
          </p>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-ink text-balance">
            {name.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block translate-y-full
                    group-data-[entered=true]/hero:translate-y-0
                    transition-transform duration-entrance ease-out"
                  style={{ transitionDelay: `${120 + i * 90}ms` }}
                >
                  {word}
                  {i < name.length - 1 && " "}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-5 text-xl sm:text-2xl lg:text-3xl font-light text-ink-muted
              opacity-0 translate-y-3
              group-data-[entered=true]/hero:opacity-100
              group-data-[entered=true]/hero:translate-y-0
              transition-all duration-slow ease-out delay-500"
          >
            {site.role}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#statement"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
          opacity-0 group-data-[entered=true]/hero:opacity-100
          transition-opacity duration-slow ease-out delay-1000"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
          Scroll
        </span>
        <span className="block w-px h-10 bg-gradient-to-b from-accent to-transparent" />
      </a>
    </section>
  );
}
