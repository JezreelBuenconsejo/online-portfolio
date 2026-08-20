"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  // Track the window scroll rather than this element: the container is
  // `fixed inset-0`, so it never scrolls relative to the viewport itself.
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundYUp = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-theme-background via-slate-900/30 to-theme-background">
      {/* Large prominent background elements.
          The outer motion.div owns the scroll parallax; the inner div owns the
          looping CSS animation, so the two transforms never fight. */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ y: reduceMotion ? 0 : backgroundY }}
      >
        <div className="w-full h-full bg-gradient-radial from-main-blue/25 via-main-blue/10 to-transparent rounded-full blur-xl bg-orb-1" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px]"
        style={{ y: reduceMotion ? 0 : backgroundYUp }}
      >
        <div className="w-full h-full bg-gradient-radial from-main-bluedark/20 via-main-bluedark/8 to-transparent rounded-full blur-2xl bg-orb-2" />
      </motion.div>

      {/* Dynamic accent elements — pure CSS, no JS animation loop. */}
      <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-main-blue/15 rounded-full blur-2xl bg-orb-3" />
      <div className="absolute bottom-1/3 right-1/2 w-32 h-32 bg-main-bluedark/15 rounded-full blur-2xl bg-orb-4" />
      <div className="absolute top-3/4 left-1/4 w-24 h-24 bg-main-blue/10 rounded-full blur-xl bg-orb-5" />
      <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-main-bluedark/12 rounded-full blur-lg bg-orb-6" />

      {/* Enhanced grid overlay */}
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
