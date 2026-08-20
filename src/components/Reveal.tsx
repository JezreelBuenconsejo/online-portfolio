"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Stagger children that are themselves motion elements using `revealItem`. */
  stagger?: number;
}

/**
 * Fades content up as it scrolls into view. Respects prefers-reduced-motion,
 * in which case children render in their final state with no movement.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        ease: "easeInOut",
        delay: reduceMotion ? 0 : delay,
        ...(stagger ? { staggerChildren: reduceMotion ? 0 : stagger } : {}),
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

/** Variants for children inside a <Reveal stagger={...}>. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
