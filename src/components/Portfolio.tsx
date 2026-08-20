import { ArrowBigUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import PortfolioCard from "./PortfolioCard";

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
    title: "Axl Tees",
    href: "https://www.axltees.com/",
    image: "/assets/portfolio/axl-tees.png",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="pt-20">
      <h2 className="text-center text-main-blue text-4xl md:text-5xl font-montserrat mb-4">
        Portfolio
      </h2>
      <p className="italic text-white mb-8">
        NOTE: Most of these work are personal projects. I am unable to showcase
        most my client work due to Non-Disclosure Agreements (NDAs) I have
        signed.
      </p>

      <Reveal
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6"
        stagger={0.15}
      >
        {projects.map((project) => (
          <PortfolioCard key={project.id}>
            <Link
              className="relative md:shadow-lg overflow-hidden flex items-center justify-center text-gray-700"
              href={project.href}
              target="_blank"
            >
              <div className="space-y-2 flex flex-col justify-end h-full text-center text-white group text-base tracking-wide">
                <div className="flex h-full flex-col items-center justify-center flex-1">
                  <h3 className="group-hover:text-main-blue transition-all duration-300 text-lg">
                    {project.title}
                  </h3>
                  <p className="text-sm">
                    {project.subtitle && (
                      <span className="italic">{project.subtitle}</span>
                    )}
                  </p>
                </div>
                <div className="overflow-hidden h-full w-full md:max-h-[190px] md:h-[190px]">
                  <div className="md:w-fit h-full overflow-hidden rounded-xl mx-auto relative">
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
          </PortfolioCard>
        ))}
      </Reveal>
    </section>
  );
}
