"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const SECTIONS = ["Skills", "Experience", "Portfolio", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = isOpen || isScrolled;

  return (
    <nav
      className={`p-4 absolute md:fixed w-full top-0 z-20 flex justify-between items-center transition-[background-color,box-shadow,backdrop-filter] duration-fast ease-in-out ${
        solid
          ? "bg-void/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      {/* Desktop */}
      <div className="hidden md:flex space-x-14 mx-auto px-5 md:px-10 xl:px-24">
        {SECTIONS.map((section) => (
          <a
            key={section}
            href={`#${section.toLowerCase()}`}
            className="text-ink hover:text-accent cursor-pointer transition-colors duration-fast font-display text-xl"
          >
            {section}
          </a>
        ))}
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-ink text-3xl transition-transform duration-fast ease-out"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer — grid-rows trick animates to auto height on the
          compositor, unlike animating height directly. */}
      <div
        className={`absolute bg-void top-16 left-0 w-full shadow-lg md:hidden grid transition-[grid-template-rows,opacity] duration-base ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-start px-5 space-y-6 py-6">
            {SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-ink hover:text-accent cursor-pointer transition-colors duration-fast text-xl font-display"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
