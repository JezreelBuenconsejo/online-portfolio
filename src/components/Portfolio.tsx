"use client";
import { motion, useAnimation } from "framer-motion";
import { ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Portfolio() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section id="portfolio" className="py-20" 
    ref={ref}>
      <h2 className="text-center text-main-blue text-4xl md:text-6xl font-semibold text-primary mb-4">
        Portfolio
      </h2>
      <p className="text-base text-white mb-8">
        NOTE: Most of these work are personal projects. I am unable to showcase
        most my client work due to Non-Disclosure Agreements (NDAs) I have
        signed.
      </p>{" "}
      <motion.div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6"
        variants={fadeIn}
        initial="hidden"
        animate={controls}
      >
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://axl-pastries.netlify.app/"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full  text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300 mt-auto">
              Axl Pastries Online Shop{" "}
              <span className="italic">(Under Development)</span>
            </h3>
            <div className="overflow-hidden rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/axl-pastries/pic1.png"
                alt=""
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://comfy-pithivier-e03b53.netlify.app/"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300">
              Hero Page
            </h3>
            <div className="overflow-hidden rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/hero-page/pic1.png"
                alt=""
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://jocular-lokum-86bc15.netlify.app/#/"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full  text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300">
              To Do App
            </h3>
            <div className="overflow-hidden rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/todo/pic1.png"
                alt=""
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://sensational-piroshki-a37ced.netlify.app/"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full  text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300">
              Facemask Detection
            </h3>
            <div className="overflow-hidden rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/facemask-detection/pic1.png"
                alt=""
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://github.com/JezreelBuenconsejo/Client-Feedback-Form"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full  text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300">
              Client Feedback Form [Code]
            </h3>
            <div className="overflow-hidden rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/client-feedback-form/pic1.jpg"
                alt=""
                className="group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
        <Link
          className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
          href="https://github.com/JezreelBuenconsejo/PalawanDSS"
          target="_blank"
        >
          <div className="space-y-2 flex flex-col justify-end h-full  text-center text-white group text-base tracking-wide">
            <h3 className="group-hover:text-main-blue transition-all duration-300">
              Decision Support System [Code] (Inactive project)
            </h3>
            <div className="overflow-hidden flex h-full rounded-xl md:max-h-[210px]">
              <img
                src="/assets/portfolio/dss/pic1.jpg"
                alt=""
                className="group-hover:scale-110 transition-all duration-300 h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
              <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
