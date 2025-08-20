"use client";

import { createContext, useContext } from "react";

const PreloaderContext = createContext();

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

export default PreloaderContext;
