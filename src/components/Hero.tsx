"use client";
import { useEffect, useRef } from "react";

/**
 * Intro sequence runs on CSS transitions triggered one frame after mount,
 * with the parallax on a shared rAF-throttled scroll listener.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance: flip to the final state on the next frame so the browser
    // has a chance to paint the initial one first.
    const raf = requestAnimationFrame(() => {
      [imgRef, h1Ref, pRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
    });

    if (reduce) return () => cancelAnimationFrame(raf);

    let ticking = false;
    const update = () => {
      const el = sectionRef.current;
      const target = parallaxRef.current;
      if (el && target) {
        const h = el.offsetHeight || 1;
        const p = Math.min(Math.max(window.scrollY / h, 0), 1);
        target.style.transform = `translate3d(0, ${p * 10}%, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="md:min-h-screen flex flex-col md:justify-center items-center px-4 pt-20 md:px-0 text-ink relative"
    >
      <div
        ref={parallaxRef}
        className="flex gap-6 justify-center items-center w-full flex-col-reverse flex-wrap-reverse lg:flex-row relative z-10 max-w-sm sm:max-w-md md:max-w-none will-change-transform"
      >
        <div className="flex-1 max-w-[280px] sm:max-w-[320px] lg:max-w-[500px] flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/assets/Hero.png"
            alt="Jezreel Jose Buenconsejo"
            className="w-40 sm:w-full md:min-w-40 drop-shadow-2xl transition-all ease-out hover:scale-105"
            style={{
              opacity: 0,
              transform: "scale(0.8)",
              transitionDuration: "1200ms",
            }}
          />
        </div>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center lg:text-left">
          <h1
            ref={h1Ref}
            className="text-3xl md:text-5xl lg:text-7xl font-extralight font-display text-accent drop-shadow-lg leading-tight transition-all ease-out"
            style={{
              opacity: 0,
              transform: "translate3d(0,-50px,0)",
              transitionDuration: "1000ms",
            }}
          >
            Jezreel Jose Buenconsejo
          </h1>
          <p
            ref={pRef}
            className="text-xl md:text-3xl lg:text-5xl font-display font-extralight italic text-accent-deep leading-relaxed transition-all ease-out delay-500"
            style={{
              opacity: 0,
              transform: "translate3d(0,50px,0)",
              transitionDuration: "1000ms",
            }}
          >
            Full Stack Developer
          </p>
        </div>
      </div>
    </section>
  );
}
