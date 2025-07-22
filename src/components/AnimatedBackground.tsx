"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Parallax effects based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-theme-background via-slate-900/30 to-theme-background">
      {/* Large prominent background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-main-blue/25 via-main-blue/10 to-transparent rounded-full blur-xl"
        style={{ y: backgroundY }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-main-bluedark/20 via-main-bluedark/8 to-transparent rounded-full blur-2xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Dynamic accent elements */}
      <motion.div 
        className="absolute top-1/4 left-1/2 w-40 h-40 bg-main-blue/15 rounded-full blur-2xl"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.4, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-1/3 right-1/2 w-32 h-32 bg-main-bluedark/15 rounded-full blur-2xl"
        animate={{ 
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Additional floating elements for variety */}
      <motion.div 
        className="absolute top-3/4 left-1/4 w-24 h-24 bg-main-blue/10 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />

      <motion.div 
        className="absolute top-1/2 right-1/4 w-36 h-36 bg-main-bluedark/12 rounded-full blur-lg"
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 7
        }}
      />

      {/* Enhanced grid overlay with animation */}
      <motion.div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(55,175,225,0.9) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
        }}
      />
    </div>
  );
} 