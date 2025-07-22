"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects for content
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-[50vh] md:min-h-screen flex flex-col md:justify-center items-center pt-20 text-theme-text relative"
    >
      <motion.div 
        className="flex gap-10 justify-center items-center w-full flex-col-reverse flex-wrap-reverse lg:flex-row relative z-10"
        style={{ y: textY }}
      >
        <div className="flex-1 max-w-[500px]">
          <motion.img 
            src="/assets/Hero.png" 
            alt="" 
            className="min-w-40 drop-shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="space-y-2 md:space-y-4">
          <motion.h1
            className="text-3xl md:text-7xl font-extralight font-montserrat text-main-blue drop-shadow-lg"
            animate={{ y: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            Jezreel Jose Buenconsejo
          </motion.h1>
          <motion.p
            className="text-xl md:text-5xl font-montserrat font-extralight italic text-main-bluedark"
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Full Stack Developer
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
