"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Skills() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [activeTab, setActiveTab] = useState("all");

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

  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.95,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  const skillCategories = {

    frontend: {
      title: "Frontend & Web Design",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "Astro",
        "CSS",
        "Tailwind",
        "Bootstrap",
        "Wordpress",
        "Wix",
        "Shopify",
      ]
    },
    backend: {
      title: "Backend",
      skills: [
        "Golang",
        "C#",
        "Node.js",
        "Python",
        "Django",
        "PHP",
        "Laravel",
        "CodeIgniter",
        "AWS",
        "Firebase",
        "Supabase",
      ]
    },
    mobile: {
      title: "Mobile Application",
      skills: [
        "Flutter",
        "React Native",
      ]
    },
    other: {
      title: "Other Skills",
      skills: [
        "Git & GitHub",
        "REST APIs",
        "CI/CD Pipelines",
        "CRM Systems",
        "Digital Marketing",
      ]
    }
  };

  // Skill to image mapping
  const skillImages: Record<string, string> = {
    "JavaScript": "/assets/skills/JS.png",
    "TypeScript": "/assets/skills/TS.png",
    "React": "/assets/skills/React.png",
    "Next.js": "/assets/skills/nextjs.png",
    "Vue": "/assets/skills/vue.png",
    "Angular": "/assets/skills/angular.png",
    "Astro": "/assets/skills/Astro.png",
    "CSS": "/assets/skills/css.png",
    "Tailwind": "/assets/skills/tailwind.png",
    "Bootstrap": "/assets/skills/bootstrap.png",
    "Wordpress": "/assets/skills/wordpress.png",
    "Wix": "/assets/skills/wix.png",
    "Shopify": "/assets/skills/shopify.png",
    "Golang": "/assets/skills/golang.png",
    "C#": "/assets/skills/CSharp.png",
    "Node.js": "/assets/skills/nodejs.png",
    "Python": "/assets/skills/python.png",
    "Django": "/assets/skills/django.png",
    "PHP": "/assets/skills/php.png",
    "Laravel": "/assets/skills/laravel.png",
    "CodeIgniter": "/assets/skills/codeigniter.png",
    "AWS": "/assets/skills/aws.png",
    "Firebase": "/assets/skills/firebase.png",
    "Supabase": "/assets/skills/supabase.png",
    "Flutter": "/assets/skills/flutter.png",
    "React Native": "/assets/skills/react.png",
    "Git & GitHub": "/assets/skills/git.png",
    "REST APIs": "/assets/skills/rest-api-icon.png",
  };

  // Dynamically merge all skills from skillCategories
  const allSkills = {
    title: "All Skills",
    skills: Object.values(skillCategories).flatMap(category => category.skills)
  };

  const SkillCard = ({ category, skills }: { category: string; skills: string[] }) => (
    <motion.div
      className="bg-main-bluedark/20 p-3 md:p-6 rounded-3xl h-fit shadow-lg w-full flex flex-col items-center justify-center"
      variants={fadeIn}
      animate={controls}
    >
      <div className="flex flex-wrap gap-2 md:gap-3 w-fit justify-center">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="backdrop-blur-sm bg-white/10 rounded-2xl px-3 py-2 md:px-4 text-white text-xs md:text-sm whitespace-nowrap border border-main-blue/30 hover:bg-main-blue/30 transition-all duration-300 h-24 md:h-28 flex flex-col items-center justify-center w-[100px] md:w-[120px] gap-1 md:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05 }}
          >
                          {skillImages[skill] && (
                <img 
                  src={skillImages[skill]} 
                  alt={skill}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0 rounded-md"
                />
                            )}
              <span className="text-center">{skill}</span>
            </motion.div>
          ))}
        </div>
    </motion.div>
  );

  const AnimatedTabContent = ({ children, tabKey }: { children: React.ReactNode; tabKey: string }) => (
    <motion.div
      key={tabKey}
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );

  const SingleCategoryView = ({ category }: { category: any }) => (
    <div className="flex justify-center">
      <div className="w-full">
        <SkillCard category={category.title} skills={category.skills} />
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      id="skills"
      className="pt-20 text-theme-text relative"
    >
      <h2 className="text-center relative text-4xl md:text-5xl font-montserrat text-main-blue mb-8 z-10">
        Skills
      </h2>
      
      <motion.div
        className="mx-auto relative z-10 max-w-6xl px-4"
        variants={fadeIn}
        initial="hidden"
        animate={controls}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile Select Dropdown */}
          <div className="block sm:hidden mb-8">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full bg-black/20 backdrop-blur-sm text-white h-auto rounded-2xl p-3 text-lg font-montserrat border border-main-blue/30 focus:border-main-blue hover:bg-black/30 transition-colors duration-300">
                <SelectValue placeholder="Select skills category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-md border border-main-blue/30 rounded-2xl">
                <SelectItem value="all" className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat">
                  All Skills
                </SelectItem>
                <SelectItem value="frontend" className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat">
                  Frontend & Web Design
                </SelectItem>
                <SelectItem value="backend" className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat">
                  Backend
                </SelectItem>
                <SelectItem value="mobile" className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat">
                  Mobile Application
                </SelectItem>
                <SelectItem value="other" className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat">
                  Other Skills
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tablet/Desktop Tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-5 mb-8 bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden p-0 h-auto gap-1">
            <TabsTrigger value="all" className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300">
              All
            </TabsTrigger>
            <TabsTrigger value="frontend" className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300">
              Backend
            </TabsTrigger>
            <TabsTrigger value="mobile" className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300">
              Mobile
            </TabsTrigger>
            <TabsTrigger value="other" className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300">
              Other
            </TabsTrigger>
          </TabsList>
          
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === "all" && (
                <TabsContent value="all" className="mt-6">
                  <AnimatedTabContent tabKey="all">
                    <SingleCategoryView category={allSkills} />
                  </AnimatedTabContent>
                </TabsContent>
              )}
              
              {activeTab === "frontend" && (
                <TabsContent value="frontend" className="mt-6">
                  <AnimatedTabContent tabKey="frontend">
                    <SingleCategoryView category={skillCategories.frontend} />
                  </AnimatedTabContent>
                </TabsContent>
              )}
              
              {activeTab === "backend" && (
                <TabsContent value="backend" className="mt-6">
                  <AnimatedTabContent tabKey="backend">
                    <SingleCategoryView category={skillCategories.backend} />
                  </AnimatedTabContent>
                </TabsContent>
              )}
              
              {activeTab === "mobile" && (
                <TabsContent value="mobile" className="mt-6">
                  <AnimatedTabContent tabKey="mobile">
                    <SingleCategoryView category={skillCategories.mobile} />
                  </AnimatedTabContent>
                </TabsContent>
              )}
              
              {activeTab === "other" && (
                <TabsContent value="other" className="mt-6">
                  <AnimatedTabContent tabKey="other">
                    <SingleCategoryView category={skillCategories.other} />
                  </AnimatedTabContent>
                </TabsContent>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>
    </section>
  );
}
