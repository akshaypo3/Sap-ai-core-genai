"use client";

import React, { createContext, useContext } from "react";
import { useLocaleState } from "@/components/LocalState";

type LocaleContextType = ReturnType<typeof useLocaleState>;
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localeState = useLocaleState();

  return (
    <LocaleContext.Provider value={localeState}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
};
