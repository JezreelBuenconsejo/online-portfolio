"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

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

  const experiences: ExperienceItem[] = [
    {
      title: "Software Developer",
      company: "Multiple Clients",
      period: "March 2023 - Present",
      description: "Freelance Software Developer with a strong background in building modern web-based applications and cross-platform mobile apps. Experienced in collaborating with international teams, delivering client-driven solutions, and managing end-to-end development — from architecture and implementation to deployment and maintenance. Known for writing clean, maintainable code and continuously improving systems for performance, scalability, and user experience."
    },
    {
      title: "Executive Virtual Assistant (Operations and Database Manager)",
      company: "Direct Client",
      period: "February 2022 – February 2023",
      description: "Managed client databases, digital ads, and transaction coordination for a real estate agent. Lead generation and social media management."
    },
    {
      title: "Virtual Assistant",
      company: "Start Virtual, Remote Company",
      period: "July – December 2021",
      description: "Handled cold calls, lead generation, and administrative tasks for a real estate investor."
    },
    {
      title: "Technical Support Specialist",
      company: "Sitel Philippines, Puerto Princesa City",
      period: "April 2019 – July 2021",
      description: "Provided technical support and customer service, resolving complex technical issues."
    },
    {
      title: "Service Crew",
      company: "McDonalds, Puerto Princesa City",
      period: "August 2017 – March 2019",
      description: "Worked as an all around service crew for McDonalds Philippines - Puerto Princesa Branch",
      isLast: true
    }
  ];
  return (
    <section
      ref={ref}
      id="experience"
      className="pt-20 text-theme-text"
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
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`relative ${
                experience.isLast
                  ? "pl-7 pb-8"
                  : "border-l-4 border-main-blue/70 pl-6 pb-8"
              }`}
            >
              <span
                className={`absolute top-0 ${
                  index === 0
                    ? "-left-3 w-5 h-5"
                    : experience.isLast
                    ? "-left-1.5 w-4 h-4"
                    : "-left-2.5 w-4 h-4"
                } bg-main-bluedark rounded-full`}
              ></span>
              <h3 className="text-xl leading-none mb-1 text-main-blue">
                {experience.title}
              </h3>
              <h4 className="text-lg italic text-main-bluedark brightness-110">
                {experience.company}
              </h4>
              <p className="text-sm text-theme-text">{experience.period}</p>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
