"use client";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface SkillCategory {
  title: string;
  skills: string[];
}

type TabKey = "all" | "frontend" | "backend" | "mobile" | "other";

const TAB_KEYS: TabKey[] = ["all", "frontend", "backend", "mobile", "other"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const onTabChange = (v: string) => setActiveTab(v as TabKey);

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
      ],
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
      ],
    },
    mobile: {
      title: "Mobile Application",
      skills: ["Flutter", "React Native"],
    },
    other: {
      title: "Other Skills",
      skills: [
        "Git & GitHub",
        "REST APIs",
        "CI/CD Pipelines",
        "CRM Systems",
        "Digital Marketing",
      ],
    },
  };

  // Skill to image mapping
  const skillImages: Record<string, string> = {
    JavaScript: "/assets/skills/JS.png",
    TypeScript: "/assets/skills/TS.png",
    React: "/assets/skills/React.png",
    "Next.js": "/assets/skills/nextjs.png",
    Vue: "/assets/skills/vue.png",
    Angular: "/assets/skills/angular.png",
    Astro: "/assets/skills/Astro.png",
    CSS: "/assets/skills/css.png",
    Tailwind: "/assets/skills/tailwind.png",
    Bootstrap: "/assets/skills/bootstrap.png",
    Wordpress: "/assets/skills/wordpress.png",
    Wix: "/assets/skills/wix.png",
    Shopify: "/assets/skills/shopify.png",
    Golang: "/assets/skills/golang.png",
    "C#": "/assets/skills/CSharp.png",
    "Node.js": "/assets/skills/nodejs.png",
    Python: "/assets/skills/python.png",
    Django: "/assets/skills/django.png",
    PHP: "/assets/skills/php.png",
    Laravel: "/assets/skills/laravel.png",
    CodeIgniter: "/assets/skills/codeigniter.png",
    AWS: "/assets/skills/aws.png",
    Firebase: "/assets/skills/firebase.png",
    Supabase: "/assets/skills/supabase.png",
    Flutter: "/assets/skills/flutter.png",
    "React Native": "/assets/skills/React.png",
    "Git & GitHub": "/assets/skills/git.png",
    "REST APIs": "/assets/skills/rest-api-icon.png",
  };

  // Dynamically merge all skills from skillCategories
  const allSkills = {
    title: "All Skills",
    skills: Object.values(skillCategories).flatMap(
      (category) => category.skills
    ),
  };

  const SkillCard = ({ skills }: { skills: string[] }) => (
    <div className="bg-accent-deep/20 p-3 md:p-6 rounded-3xl h-fit shadow-lg w-full flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-2 md:gap-3 w-fit justify-center">
        {skills.map((skill, index) => (
          <div
            key={skill}
            data-reveal=""
            data-visible="true"
            // Cascade is capped so long lists never feel sluggish.
            style={{ transitionDelay: `${Math.min(index * 30, 600)}ms` }}
            className="backdrop-blur-sm bg-white/10 rounded-2xl px-3 py-2 md:px-4 text-ink text-xs md:text-sm whitespace-nowrap border border-accent/30 hover:bg-accent/30 hover:scale-105 transition-all duration-fast h-24 md:h-28 flex flex-col items-center justify-center w-[100px] md:w-[120px] gap-1 md:gap-2"
          >
            {skillImages[skill] && (
              <Image
                width={100}
                height={100}
                src={skillImages[skill]}
                alt={skill}
                className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0 rounded-md"
              />
            )}
            <span className="text-center">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const SingleCategoryView = ({ category }: { category: SkillCategory }) => (
    <div className="flex justify-center">
      <div className="w-full">
        <SkillCard skills={category.skills} />
      </div>
    </div>
  );

  return (
    <section id="skills" className="pt-20 text-theme-text relative">
      <h2 className="text-center relative text-4xl md:text-5xl font-montserrat text-main-blue mb-8 z-10">
        Skills
      </h2>

      <Reveal className="mx-auto relative z-10 max-w-6xl px-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          {/* Mobile Select Dropdown */}
          <div className="block sm:hidden mb-8">
            <Select value={activeTab} onValueChange={onTabChange}>
              <SelectTrigger className="w-full bg-black/20 backdrop-blur-sm text-white h-auto rounded-2xl p-3 text-lg font-montserrat border border-main-blue/30 focus:border-main-blue hover:bg-black/30 transition-colors duration-300">
                <SelectValue placeholder="Select skills category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-md border border-main-blue/30 rounded-2xl">
                <SelectItem
                  value="all"
                  className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat"
                >
                  All Skills
                </SelectItem>
                <SelectItem
                  value="frontend"
                  className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat"
                >
                  Frontend & Web Design
                </SelectItem>
                <SelectItem
                  value="backend"
                  className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat"
                >
                  Backend
                </SelectItem>
                <SelectItem
                  value="mobile"
                  className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat"
                >
                  Mobile Application
                </SelectItem>
                <SelectItem
                  value="other"
                  className="text-white data-[state=active]:text-white text-base hover:bg-main-blue/20 focus:bg-main-blue/30 rounded-xl font-montserrat"
                >
                  Other Skills
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tablet/Desktop Tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-5 mb-8 bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden p-0 h-auto gap-1">
            <TabsTrigger
              value="all"
              className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="frontend"
              className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300"
            >
              Frontend
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300"
            >
              Backend
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300"
            >
              Mobile
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="py-2 px-3 md:py-4 md:px-4 text-xs md:text-sm text-white data-[state=active]:bg-main-blue data-[state=active]:text-black font-montserrat transition-all duration-300"
            >
              Other
            </TabsTrigger>
          </TabsList>

          <div className="relative min-h-[300px]">
            {TAB_KEYS.map((key) => {
              const category = key === "all" ? allSkills : skillCategories[key];
              return (
                <TabsContent key={key} value={key} className="mt-6">
                  {/* key on the inner node restarts the CSS transition on
                      every tab change, giving the crossfade for free. */}
                  <div
                    key={`${key}-${activeTab}`}
                    data-reveal=""
                    data-visible="true"
                  >
                    <SingleCategoryView category={category} />
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </Reveal>
    </section>
  );
}
