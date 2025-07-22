"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Experience() {
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
      id="experience"
      className="py-20 text-theme-text"
    >
      <h2 className="text-center text-4xl md:text-5xl font-montserrat mb-8 text-main-blue">
        Experience
      </h2>
      <motion.div
        className="mx-auto"
        variants={fadeIn}
        initial="hidden"
        animate={controls}
      >
        <div className="relative max-w-4xl mx-auto">
          {/**
          div className="relative border-l-4 border-main-blue pl-6 pb-8">
            <span className="absolute -left-3 top-0 w-5 h-5 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Software Developer
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              Askrella, German Company
            </h4>
            <p className="text-sm text-theme-text">October 2023 - Present</p>
            <p>
              Developing modern web applications using React, and building
              mobile applications for both iOS and Android using Flutter.
              Integrating APIs, improving app performance, and collaborating
              with remote teams in Germany to ensure smooth deployments and
              feature updates.
            </p>
          </div>
           */}
          <div className="relative border-l-4 border-main-blue/70 pl-6 pb-8">
            <span className="absolute -left-3 top-0 w-5 h-5 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Software Developer
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              Multiple Clients
            </h4>
            <p className="text-sm text-theme-text">March 2023 - Present</p>
            <p>
              Freelance Software Developer with a strong background in building
              modern web-based applications and cross-platform mobile apps.
              Experienced in collaborating with international teams, delivering
              client-driven solutions, and managing end-to-end development —
              from architecture and implementation to deployment and
              maintenance. Known for writing clean, maintainable code and
              continuously improving systems for performance, scalability, and
              user experience.
            </p>
          </div>
          <div className="relative border-l-4 border-main-blue/70 pl-6 pb-8">
            <span className="absolute -left-2.5 top-0 w-4 h-4 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Executive Virtual Assistant (Operations and Database Manager)
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              Direct Client
            </h4>
            <p className="text-sm text-theme-text">
              February 2022 – February 2023
            </p>
            <p>
              Managed client databases, digital ads, and transaction
              coordination for a real estate agent. Lead generation and social
              media management.
            </p>
          </div>
          <div className="relative border-l-4 border-main-blue/70 pl-6 pb-8">
          <span className="absolute -left-2.5 top-0 w-4 h-4 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Virtual Assistant
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              Start Virtual, Remote Company
            </h4>
            <p className="text-sm text-theme-text">July – December 2021</p>
            <p>
              Handled cold calls, lead generation, and administrative tasks for
              a real estate investor.
            </p>
          </div>
          <div className="relative border-l-4 border-main-blue/70 pl-6 pb-8">
          <span className="absolute -left-2.5 top-0 w-4 h-4 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Technical Support Specialist
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              Sitel Philippines, Puerto Princesa City
            </h4>
            <p className="text-sm text-theme-text">April 2019 – July 2021</p>
            <p>
              Provided technical support and customer service, resolving complex
              technical issues.
            </p>
          </div>
          <div className="relative  pl-7 pb-8">
            <span className="absolute -left-1.5 top-0 w-4 h-4 bg-main-bluedark rounded-full"></span>
            <h3 className="text-xl leading-none mb-1 text-main-blue">
              Service Crew
            </h3>
            <h4 className="text-lg italic text-main-bluedark brightness-110">
              McDonalds, Puerto Princesa City
            </h4>
            <p className="text-sm text-theme-text">August 2017 – March 2019</p>
            <p>
              Worked as an all around service crew for McDonalds Philippines -
              Puerto Princesa Branch
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
