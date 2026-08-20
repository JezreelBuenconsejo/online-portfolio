"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      fadeTimer = setTimeout(() => {
        setIsFading(true);
        // Unmount only after the CSS fade finishes.
        removeTimer = setTimeout(() => setIsLoading(false), 400);
      }, 300);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }

    const fallback = setTimeout(() => {
      setIsFading(true);
      removeTimer = setTimeout(() => setIsLoading(false), 400);
    }, 3000);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 transition-opacity ease-in-out"
          style={{ opacity: isFading ? 0 : 1, transitionDuration: "400ms" }}
        >
          <LoadingScreen />
        </div>
      )}
      {children}
    </>
  );
}
