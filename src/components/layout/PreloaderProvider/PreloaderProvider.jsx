// src/components/layout/PreloaderProvider/PreloaderProvider.jsx

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PreloaderContext from "@/contexts/PreloaderContext";
import PreloaderReveal from "@/components/layout/PreloaderReveal/PreloaderReveal";

// Este é nosso provider completo e unificado
export default function PreloaderProvider({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const preloaderShown = sessionStorage.getItem("preloader-shown");
    if (preloaderShown) {
      setIsLoading(false);
      setHasShown(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setHasShown(true);
    sessionStorage.setItem("preloader-shown", "true");
  };

  const resetPreloader = () => {
    sessionStorage.removeItem("preloader-shown");
    setHasShown(false);
    setIsLoading(true);
  };

  // O valor que será compartilhado com todos os componentes filhos
  const contextValue = {
    // O isLoading agora é uma propriedade simples do valor, não o estado inteiro
    isLoading: isLoading && !hasShown,
    handlePreloaderComplete,
    resetPreloader,
  };

  const shouldShowPreloader = pathname === "/" && isLoading && !hasShown;

  return (
    // O Provider do Contexto "envelopa" tudo
    <PreloaderContext.Provider value={contextValue}>
      {shouldShowPreloader && (
        <PreloaderReveal onComplete={handlePreloaderComplete} />
      )}
      <div
        style={{
          opacity: shouldShowPreloader ? 0 : 1,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}
