"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  /** 0 = far, 1 = near. Drives size, brightness, and parallax rate. */
  depth: number;
  vx: number;
  vy: number;
  r: number;
}

/** Depth layers. Near points are fewer, larger, and move most. */
const LAYERS = [
  { count: 34, depth: 0.25, r: 0.9, alpha: 0.22 },
  { count: 22, depth: 0.55, r: 1.4, alpha: 0.34 },
  { count: 12, depth: 1.0, r: 2.1, alpha: 0.5 },
];

const ACCENT = "55, 175, 225"; // --accent

/**
 * Ambient depth field behind the hero.
 *
 * Three parallax layers of drifting points, offset by cursor position so the
 * planes separate as you move. Canvas 2D rather than WebGL: the depth cue is
 * size, brightness, and differential motion, which costs a few kilobytes
 * instead of a renderer.
 *
 * Skipped entirely under reduced motion, and paused whenever the hero is
 * offscreen or the tab is hidden, so it never burns frames unseen.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let running = true;
    let particles: Particle[] = [];

    // Cursor offset, normalised to -1..1 and eased toward the target so the
    // parallax glides rather than snapping.
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const seed = () => {
      particles = [];
      for (const layer of LAYERS) {
        for (let i = 0; i < layer.count; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            depth: layer.depth,
            // Slow, mostly-lateral drift; deeper points move less.
            vx: (Math.random() - 0.5) * 0.12 * layer.depth,
            vy: (Math.random() - 0.5) * 0.08 * layer.depth,
            r: layer.r,
          });
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const alphaFor = (depth: number) =>
      LAYERS.find((l) => l.depth === depth)?.alpha ?? 0.3;

    const frame = () => {
      if (!running) return;

      // Ease the parallax offset toward the pointer.
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap rather than respawn, so density stays constant.
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Nearer layers shift further with the cursor: the depth cue.
        const shift = 26 * p.depth;
        const dx = p.x + curX * shift;
        const dy = p.y + curY * shift;

        ctx.beginPath();
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${alphaFor(p.depth)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      targetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while actually on screen and the tab is focused. Both
    // conditions are tracked explicitly: resuming needs to know the *other*
    // one still holds, or returning to the tab would restart the loop even
    // when the hero is scrolled far out of view.
    let onScreen = true;

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => sync();

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
