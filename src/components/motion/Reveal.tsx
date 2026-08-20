"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element. Defaults to div. */
  as?: ElementType;
  /** Delay in ms before this element animates in. */
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  /** Fraction of the element that must be visible to trigger. */
  threshold?: number;
  /** Re-animate every time it enters the viewport. */
  repeat?: boolean;
}

/**
 * Scroll-triggered reveal with no JS animation cost.
 *
 * An IntersectionObserver flips a data attribute; the actual transition is
 * CSS (see [data-reveal] in globals.css) and runs on the compositor thread.
 * This is the default reveal across the site, Framer Motion is reserved
 * for cases that genuinely need layout or exit animation.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y,
  threshold = 0,
  repeat = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Render final state immediately when motion is unwelcome.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.setAttribute("data-visible", "true");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.setAttribute("data-visible", "false");
        }
      },
      // Fire as soon as the top edge crosses ~12% up from the viewport
      // bottom. threshold alone is unreliable for tall sections, which may
      // never reach a fraction-visible target before they fill the screen.
      { threshold, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  const style: React.CSSProperties = {};
  if (delay) style.transitionDelay = `${delay}ms`;
  if (y !== undefined) {
    (style as Record<string, string>)["--reveal-y"] = `${y}px`;
  }

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible="false"
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
