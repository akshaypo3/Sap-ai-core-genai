"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/login";
import { useEffect, useState, useRef } from "react";
import { Globallanguagedata } from "@/lib/settings/users/action";
import Cookies from "js-cookie";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const t = useTranslations("login");

  const [isLoading, setIsLoading] = useState(false);
  const hasFetchedLanguage = useRef(false); // Use ref to track if language data has been fetched already

  const fetchLanguageData = async () => {
    if (isLoading || hasFetchedLanguage.current) return; // Prevent multiple calls and fetch only once
    setIsLoading(true);

    try {
      const result = await Globallanguagedata();
      const language = result?.language || "en";
      
      if (Cookies.get("locale") !== language) { // Only reload if the language is different
        Cookies.set("locale", language);
        window.location.reload(); // Refresh the page to apply the new locale
      }
      
      // Mark that the language data has been fetched
      hasFetchedLanguage.current = true;
    } catch (error) {
      console.error("Failed to fetch language data:", error);
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  };

  useEffect(() => {
    fetchLanguageData(); // Call language fetch when the component mounts
  }, []); // This ensures the effect runs only once when the component mounts

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md mx-auto my-auto justify-center gap-2 rounded-md p-7">
      <div className="flex justify-center mb-6">
        <Image src="/sustena_logo_black_wide.png" alt="Sustena Logo" width={100} height={40} />
      </div>
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <Label htmlFor="email">{t("email_label")}</Label>
        <Input type="text" name="email" placeholder={t("email_placeholder")} required />
        <Label htmlFor="password">{t("password_label")}</Label>
        <Input type="password" name="password" placeholder={t("password_placeholder")} required />
        <SubmitButton formAction={signIn} className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-foreground mb-2 text-white">
          {t("sign_in_button")}
        </SubmitButton>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}
