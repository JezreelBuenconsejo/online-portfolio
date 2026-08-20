"use client";
import { useEffect, useRef } from "react";

/**
 * Ambient background. Orb motion is pure CSS (compositor thread); only the
 * two parallax layers read scroll, batched into a single rAF-throttled
 * listener rather than a JS animation loop.
 */
export default function AnimatedBackground() {
  const downRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (downRef.current) {
        downRef.current.style.transform = `translate3d(0, ${p * 100}%, 0)`;
      }
      if (upRef.current) {
        upRef.current.style.transform = `translate3d(0, ${p * -50}%, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-void via-slate-900/30 to-void">
      {/* Outer element owns scroll parallax; inner owns the CSS loop, so
          the two transforms never overwrite each other. */}
      <div ref={downRef} className="absolute top-0 right-0 w-[600px] h-[600px] will-change-transform">
        <div className="w-full h-full bg-gradient-radial from-accent/25 via-accent/10 to-transparent rounded-full blur-xl bg-orb-1" />
      </div>

      <div ref={upRef} className="absolute bottom-0 left-0 w-[700px] h-[700px] will-change-transform">
        <div className="w-full h-full bg-gradient-radial from-accent-deep/20 via-accent-deep/[0.08] to-transparent rounded-full blur-2xl bg-orb-2" />
      </div>

      {/* Pure CSS, no JS involvement at all. */}
      <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-accent/15 rounded-full blur-2xl bg-orb-3" />
      <div className="absolute bottom-1/3 right-1/2 w-32 h-32 bg-accent-deep/15 rounded-full blur-2xl bg-orb-4" />
      <div className="absolute top-3/4 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl bg-orb-5" />
      <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-accent-deep/[0.12] rounded-full blur-lg bg-orb-6" />

      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(55,175,225,0.9) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
