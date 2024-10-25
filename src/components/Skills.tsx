"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Skills() {
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
    <section
      ref={ref}
      id="skills"
      className="py-20 bg-theme-background text-theme-text relative"
    >
      <h2 className="text-center relative text-4xl md:text-6xl font-semibold text-main-bluedark mb-8 z-10">
        Skills
      </h2>
      <motion.div
        className="mx-auto relative grid grid-cols-1 md:grid-cols-3 gap-10 z-10"
        variants={fadeIn}
        initial="hidden"
        animate={controls} 
      >
        {/* Backend Section */}
        <motion.div
          className="bg-black p-6 rounded-3xl h-fit shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-4 text-main-bluedark">Backend</h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>Golang</li>
            <li>C#</li>
            <li>Java</li>
            <li>PHP</li>
            <ul className="list-disc ml-6 space-y-1">
              <li>Laravel</li>
              <li>CodeIgniter</li>
            </ul>
            <li>Cloud Infrastructure</li>
            <ul className="list-disc ml-6 space-y-1">
              <li>AWS</li>
              <li>Firebase</li>
            </ul>
          </ul>
        </motion.div>

        {/* Frontend & Web Design Section */}
        <motion.div
          className="bg-black p-6 rounded-3xl h-fit shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-4 text-main-bluedark">
            Frontend & Web Design
          </h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>JavaScript</li>
            <ul className="list-disc ml-6 space-y-1">
              <li>React/Next.JS</li>
              <li>Vue</li>
              <li>Angular</li>
            </ul>
            <li>CSS</li>
            <ul className="list-disc ml-6 space-y-1">
              <li>Tailwind</li>
              <li>Bootstrap</li>
            </ul>
            <li>Web Builders</li>
            <ul className="list-disc ml-6 space-y-1">
              <li>Wordpress</li>
              <li>Wix</li>
              <li>Shopify</li>
            </ul>
          </ul>
        </motion.div>

        {/* Mobile Application Section */}
        <motion.div
          className="bg-black p-6 rounded-3xl h-fit shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-4 text-main-bluedark">
            Mobile Application
          </h3>
          <ul className="list-disc ml-4 space-y-2 mb-8">
            <li>Flutter</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 text-main-bluedark">
            Other Skills
          </h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>Git & GitHub</li>
            <li>REST APIs</li>
            <li>CI/CD Pipelines</li>
            <li>CRM Systems</li>
            <li>Digital Marketing</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
