"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const hide = () => {
      timer = setTimeout(() => setIsLoading(false), 300);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }

    // Fallback: never keep the overlay up on a slow/stalled asset.
    const fallbackTimer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
