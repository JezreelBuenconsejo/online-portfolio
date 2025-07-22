"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAllAssetsLoaded = () => {
      // Check if document is ready
      const isDocumentReady = document.readyState === 'complete';
      
      // Check if all images are loaded
      const images = Array.from(document.images);
      const allImagesLoaded = images.every(img => img.complete);
      
      // Check if fonts are loaded (if supported)
      const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();
      
      return fontsLoaded.then(() => {
        if (isDocumentReady && allImagesLoaded) {
          // Small delay to ensure smooth transition
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      });
    };

    // Initial check
    checkAllAssetsLoaded();

    // Listen for load events
    const handleLoad = () => {
      checkAllAssetsLoaded();
    };

    const handleDOMContentLoaded = () => {
      checkAllAssetsLoaded();
    };

    // Listen for image loads
    const handleImageLoad = () => {
      checkAllAssetsLoaded();
    };

    // Add event listeners
    window.addEventListener('load', handleLoad);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    
    // Listen for all image loads
    const images = Array.from(document.images);
    images.forEach(img => {
      if (img.complete) {
        checkAllAssetsLoaded();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad); // Even on error, continue
      }
    });

    // Fallback: if loading takes too long (network issues), hide after 10 seconds
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && children}
    </>
  );
} 