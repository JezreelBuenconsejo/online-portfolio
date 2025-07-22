"use client";
import { motion, useAnimation } from "framer-motion";
import { ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// Projects data array
const projects = [
  {
    id: 1,
    title: "Sales Tracker & POS System",
    subtitle: "(In Development)",
    href: "https://sales-tracker-jez.vercel.app/",
    image: "/assets/portfolio/sales-tracker.png",
  },
  {
    id: 2,
    title: "Axl Pastries Online Shop",
    subtitle: "(In Development)",
    href: "https://axl-pastries.netlify.app/",
    image: "/assets/portfolio/axl-pastries/pic1.png",
  },
  {
    id: 3,
    title: "Fire Safety Store",
    subtitle: "(Static UI)",
    href: "https://fire-safety-store.vercel.app/",
    image: "/assets/portfolio/fire-safety-store.png",
  },
  {
    id: 4,
    title: "Hotel Booking",
    subtitle: "(Static UI)",
    href: "https://hotel-booking-jez.netlify.app/booking",
    image: "/assets/portfolio/hotel-booking.png",
  },
  {
    id: 5,
    title: "Hero Page",
    subtitle: "",
    href: "https://comfy-pithivier-e03b53.netlify.app/",
    image: "/assets/portfolio/hero-page/pic1.png",
  },
  {
    id: 6,
    title: "To Do App",
    subtitle: "",
    href: "https://jocular-lokum-86bc15.netlify.app/#/",
    image: "/assets/portfolio/todo/pic1.png",
  },
  {
    id: 7,
    title: "Facemask Detection",
    subtitle: "",
    href: "https://sensational-piroshki-a37ced.netlify.app/",
    image: "/assets/portfolio/facemask-detection/pic1.png",
  },
  {
    id: 8,
    title: "Client Feedback Form",
    subtitle: "[Code]",
    href: "https://github.com/JezreelBuenconsejo/Client-Feedback-Form",
    image: "/assets/portfolio/client-feedback-form/pic1.jpg",
  },
  {
    id: 9,
    title: "Decision Support System",
    subtitle: "[Code] (Inactive project)",
    href: "https://github.com/JezreelBuenconsejo/PalawanDSS",
    image: "/assets/portfolio/dss/pic1.jpg",
  },
];

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
    <section id="portfolio" className="pt-20" ref={ref}>
      <h2 className="text-center text-main-blue text-4xl md:text-5xl font-montserrat mb-4">
        Portfolio
      </h2>
      <p className="italic text-white mb-8">
        NOTE: Most of these work are personal projects. I am unable to showcase
        most my client work due to Non-Disclosure Agreements (NDAs) I have
        signed.
      </p>
      
      <motion.div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6"
        variants={fadeIn}
        initial="hidden"
        animate={controls}
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            className="relative shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
            href={project.href}
            target="_blank"
          >
            <div className="space-y-2 flex flex-col justify-end h-full text-center text-white group text-base tracking-wide">
              <h3 className="group-hover:text-main-blue transition-all duration-300">
                {project.title} {project.subtitle && <span className="italic">{project.subtitle}</span>}
              </h3>
              <div className="overflow-hidden h-full md:max-h-[190px]">
                <div className="w-fit h-full overflow-hidden rounded-xl mx-auto relative">
                  <Image
                    width={300}
                    height={190}
                    src={project.image}
                    alt={project.title}
                    className="group-hover:scale-110 transition-all duration-300 h-full object-cover overflow-hidden flex rounded-xl md:max-h-[190px] mx-auto"
                  />
                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-[#0000008e] group-hover:opacity-100 transition-opacity duration-300 opacity-0 flex items-center justify-center">
                    <ArrowBigUp className="rotate-45 w-20 h-20 text-white stroke-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
