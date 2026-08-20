"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects for content
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="md:min-h-screen flex flex-col md:justify-center items-center px-4 pt-20 md:px-0 text-theme-text relative"
    >
      <motion.div
        className="flex gap-6 justify-center items-center w-full flex-col-reverse flex-wrap-reverse lg:flex-row relative z-10 max-w-sm sm:max-w-md md:max-w-none"
        style={{ y: reduceMotion ? 0 : textY }}
      >
        <div className="flex-1 max-w-[280px] sm:max-w-[320px] lg:max-w-[500px] flex justify-center">
          <motion.img
            src="/assets/Hero.png"
            alt="Jezreel Jose Buenconsejo"
            className="w-40 sm:w-full md:min-w-40 drop-shadow-2xl"
            initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          />
        </div>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center lg:text-left">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-7xl font-extralight font-montserrat text-main-blue drop-shadow-lg leading-tight"
            initial={reduceMotion ? false : { y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1 }}
          >
            Jezreel Jose Buenconsejo
          </motion.h1>
          <motion.p
            className="text-xl md:text-3xl lg:text-5xl font-montserrat font-extralight italic text-main-bluedark leading-relaxed"
            initial={reduceMotion ? false : { y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.5 }}
          >
            Full Stack Developer
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
