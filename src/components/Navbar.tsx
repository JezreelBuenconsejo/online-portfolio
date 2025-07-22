"use client";
import { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dropdown menu variants for motion
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Icon variants for animation (transform burger icon to X icon)
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  // Navbar background variants - modified to handle isOpen state
  const navVariants = {
    transparent: {
      backgroundColor: "rgba(25, 25, 25, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(25, 25, 25, 0.9)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
    open: {
      backgroundColor: "rgba(25, 25, 25, 1)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
  };

  // Determine animation state: open takes priority over scrolled
  const getNavState = () => {
    if (isOpen) return "open";
    if (isScrolled) return "scrolled";
    return "transparent";
  };

  return (
    <motion.nav
      className="p-4 absolute md:fixed w-full top-0 z-20 flex justify-between items-center transition-all duration-100"
      initial="transparent"
      animate={getNavState()}
      variants={navVariants}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {/* Navbar for Desktop */}
      <div className="hidden md:flex space-x-14 mx-auto px-5 md:px-10 xl:px-24">
        {["Skills", "Experience", "Portfolio", "Contact"].map((section) => (
          <Link
            key={section}
            to={section.toLowerCase()}
            smooth={true}
            offset={-70}
            className="hover:text-main-bluedark cursor-pointer transition-all duration-300 font-montserrat text-xl text-theme-text"
          >
            {section}
          </Link>
        ))}
      </div>

      {/* Burger Icon for Mobile */}
      <div className="md:hidden">
        <motion.button
          onClick={toggleMenu}
          className="text-theme-text text-3xl"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
        >
          {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle between icons */}
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={dropdownVariants}
        className="absolute bg-theme-background top-16 left-0 w-full shadow-lg flex flex-col items-start px-5 space-y-6 py-6 md:hidden overflow-hidden"
      >
        {["Skills", "Experience", "Portfolio", "Contact"].map((section) => (
          <Link
            key={section}
            to={section.toLowerCase()}
            smooth={true}
            offset={-70}
            onClick={toggleMenu}
            className="hover:text-main-bluedark cursor-pointer transition-all duration-300 text-xl font-montserrat text-theme-text"
          >
            {section}
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
}
