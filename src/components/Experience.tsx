import Reveal from "@/components/motion/Reveal";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Developer",
    company: "Direct Client",
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

export default function Experience() {
  return (
    <section id="experience" className="text-ink">
      <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-8">
        Experience
      </h2>
      <Reveal className="mx-auto">
        <div className="relative max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`relative ${
                experience.isLast
                  ? "pl-7 pb-8"
                  : "border-l-2 border-line-bright pl-6 pb-8"
              }`}
            >
              <span
                className={`absolute top-0 ${
                  index === 0
                    ? "-left-3 w-5 h-5"
                    : experience.isLast
                    ? "-left-1.5 w-4 h-4"
                    : "-left-2.5 w-4 h-4"
                } bg-accent rounded-full`}
              ></span>
              <h3 className="font-display text-xl font-semibold leading-snug mb-1 text-ink">
                {experience.title}
              </h3>
              <h4 className="text-base text-accent">
                {experience.company}
              </h4>
              <p className="font-mono text-xs text-ink-dim mt-0.5 mb-2">{experience.period}</p>
              <p className="text-ink-muted leading-relaxed">{experience.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
