import { useState, useEffect } from "react";

export const useLocaleState = () => {
  const [locale, setLocale] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("locale") || "en";
    }
    return "en"; 
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return { locale, setLocale };
};
