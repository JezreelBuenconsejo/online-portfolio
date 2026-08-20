"use client";
import { Children, useEffect, useRef, type ReactNode } from "react";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Per-item delay in ms. */
  stagger?: number;
  /** Ceiling on total cascade time so long lists never feel sluggish. */
  maxTotal?: number;
  y?: number;
  threshold?: number;
}

/**
 * Reveals direct children in sequence on scroll.
 *
 * The stagger is capped (default 600ms total), a per-item delay applied
 * blindly makes a 30-item list take three seconds to finish, which reads
 * as broken rather than choreographed.
 */
export default function RevealGroup({
  children,
  className,
  stagger = 60,
  maxTotal = 600,
  y = 20,
  threshold = 0.1,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = Children.count(children);

  // Compress the per-item delay when the list is long enough to exceed the cap.
  const step = count > 1 ? Math.min(stagger, maxTotal / (count - 1)) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((i) => i.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.transitionDelay = `${i * step}ms`;
          item.setAttribute("data-visible", "true");
        });
        observer.unobserve(el);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [step, threshold]);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child) => (
        <div
          data-reveal=""
          data-visible="false"
          style={{ ["--reveal-y" as string]: `${y}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
