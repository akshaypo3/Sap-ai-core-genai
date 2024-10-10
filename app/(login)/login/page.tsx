import { useTranslations } from 'next-intl'; // Import translation hook
import Image from "next/image"; // Add this import
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login({ searchParams }: { searchParams: { message: string }; }) {
  const t = useTranslations('login'); // Define the namespace for translations

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${t('error_message')}`); // Use translation
    }

    return redirect("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md mx-auto my-auto justify-center gap-2 rounded-md p-7">
      <div className="flex justify-center mb-6">
        <Image
          src="/sustena_logo_black_wide.png"
          className="dark:hidden"
          alt="Sustena Logo"
          width={100} 
          height={40} 
        />
        <Image
          src="/sustena_logo_white_wide.png"
          className="hidden dark:block"
          alt="Sustena Logo"
          width={100} 
          height={40} 
        />
      </div>
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        {/* Using translated text for label and placeholders */}
        <Label htmlFor="email">{t('email_label')}</Label>
        <Input type="text" name="email" placeholder={t('email_placeholder')} required/>

        <Label htmlFor="password">{t('password_label')}</Label>
        <Input type="password" name="password" placeholder={t('password_placeholder')} required/>

        <SubmitButton
          formAction={signIn}
          className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-foreground mb-2 text-white"
          pendingText={t('signing_in')} // Pending state text
        >
          {t('sign_in_button')} {/* Sign In button text */}
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
