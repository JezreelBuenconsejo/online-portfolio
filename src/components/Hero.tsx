"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[50vh] md:min-h-screen flex flex-col md:justify-center items-center pt-20 bg-theme-background text-theme-text"
    >
      <div className="flex gap-10 justify-center items-center w-full flex-col-reverse flex-wrap-reverse lg:flex-row">
        <div  className="flex-1 max-w-[500px]">
          <img src="/assets/Hero.png" alt="" className="min-w-40" />
        </div>
        <div className="space-y-2 md:space-y-4">
          <motion.h1
            className="text-3xl md:text-7xl font-bold text-main-blue"
            animate={{ y: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            Jezreel Jose Buenconsejo
          </motion.h1>
          <motion.p
            className="text-xl md:text-5xl font-bold text-main-bluedark"
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Full Stack Developer
          </motion.p>
        </div>
      </div>
    </section>
  );
}
