"use client";
import { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dropdown menu variants for motion
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  // Icon variants for animation (transform burger icon to X icon)
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }, 
  };

  return (
    <nav className="bg-theme-background shadow-md p-4 fixed w-full top-0 z-20 flex justify-between items-center">
      {/* Navbar for Desktop */}
      <div className="hidden md:flex space-x-14 mx-auto px-5 md:px-10 xl:px-24">
        {['Skills', 'Experience', 'Portfolio', 'Contact'].map((section) => (
          <Link 
            key={section} 
            to={section.toLowerCase()} 
            smooth={true} 
            offset={-70} 
            className="hover:text-main-bluedark cursor-pointer transition-all duration-300 font-bold text-xl text-theme-text"
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
          animate={isOpen ? 'open' : 'closed'}
          variants={iconVariants}
        >
          {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle between icons */}
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={dropdownVariants}
        className="absolute top-16 left-0 w-full bg-theme-background shadow-lg flex flex-col items-start px-5 space-y-6 py-6 md:hidden overflow-hidden"
      >
        {['Skills', 'Experience', 'Portfolio', 'Contact'].map((section) => (
          <Link 
            key={section} 
            to={section.toLowerCase()} 
            smooth={true} 
            offset={-70} 
            onClick={toggleMenu} 
            className="hover:text-main-bluedark cursor-pointer transition-all duration-300 font-bold text-xl text-theme-text"
          >
            {section}
          </Link>
        ))}
      </motion.div>
    </nav>
  );
}
