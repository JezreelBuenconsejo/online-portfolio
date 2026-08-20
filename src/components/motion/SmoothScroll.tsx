"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface LenisInstance {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (
    target: number | string,
    opts?: { immediate?: boolean; force?: boolean }
  ) => void;
  resize: () => void;
  on?: (event: string, cb: () => void) => void;
  off?: (event: string, cb: () => void) => void;
}

/**
 * Weighted, momentum-based scrolling via Lenis.
 *
 * Loaded dynamically so ~3kb stays off the critical path, and skipped
 * entirely under prefers-reduced-motion, where native scroll is correct.
 *
 * Lenis is mounted once in the root layout and survives navigation, so it
 * keeps its own scroll position across route changes. Next scrolls the
 * window to the top, but Lenis reasserts the stale offset a frame later and
 * the new page opens mid-way down. The pathname effect below resets it.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Native momentum on touch already feels right; overriding it fights
        // the platform and hurts more than it helps.
        syncTouch: false,
      }) as unknown as LenisInstance;

      // Shared so the navigation effect can reach it.
      window.__lenis = instance;

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.__lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Land at the top of every new route, or at the anchor when one is given.
  useEffect(() => {
    let raf = 0;
    const hash = window.location.hash;

    const settle = () => {
      const lenis = window.__lenis;
      // The incoming page's height is not known yet, and any pinned
      // ScrollTrigger measured its offsets against the *previous* page.
      // Without recalculating, a pin can engage over the wrong scroll range
      // and trap the reader inside its section.
      lenis?.resize();
      window.__ScrollTrigger?.refresh();

      if (hash) {
        // Re-run the anchor jump after the refresh: the target's real
        // position is only known once pin spacing has been recalculated.
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(hash, { immediate: true, force: true });
          } else {
            target.scrollIntoView();
          }
        }
        return;
      }

      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    };

    // Run now, then again after paint. Lenis loads asynchronously and the
    // incoming page's layout settles a frame late, so a single early call
    // can be undone by either.
    settle();
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(settle);
    });

    // A same-page anchor click changes the hash without changing pathname,
    // so the effect would not re-run and the pin would keep stale offsets.
    const onHashChange = () => settle();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: LenisInstance;
    __ScrollTrigger?: { refresh: () => void };
  }
}
