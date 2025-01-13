"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server'; 
import Cookies from "js-cookie";
import { Globallanguagedata } from "./settings/users/action";

export async function signIn(formData: FormData) {
  const t = await getTranslations('login');
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const errorMessage = t ? t('error_message') : 'An error occurred during sign-in.'; // Fallback message
    return redirect(`/login?message=${encodeURIComponent(errorMessage)}`);
  }
  
  const result = await Globallanguagedata();
  const language = result?.language || "en"; // Default to "en" if no language is found

  // Set the language in cookies
  Cookies.set("locale", language);

  return redirect("/dashboard");
} 