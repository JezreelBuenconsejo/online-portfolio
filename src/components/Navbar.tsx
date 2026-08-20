"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const LINKS = [
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  // Close the drawer on navigation, otherwise it stays open over the new page.
  useEffect(() => setIsOpen(false), [pathname]);

  const solid = isOpen || isScrolled;

  return (
    <nav
      className={`p-4 fixed w-full top-0 z-20 flex justify-between items-center transition-[background-color,box-shadow,backdrop-filter] duration-fast ease-in-out ${
        solid
          ? "bg-void/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="hidden md:flex space-x-14 mx-auto px-5 md:px-10 xl:px-24">
        {LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-ink hover:text-accent cursor-pointer transition-colors duration-fast font-display text-xl"
          >
            {label}
          </Link>
        ))}
      </div>

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

      {/* grid-rows animates to auto height on the compositor. */}
      <div
        className={`absolute bg-void top-16 left-0 w-full shadow-lg md:hidden grid transition-[grid-template-rows,opacity] duration-base ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-start px-5 space-y-6 py-6">
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-ink hover:text-accent cursor-pointer transition-colors duration-fast text-xl font-display"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
