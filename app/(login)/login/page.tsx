import Link from "next/link";
import Image from "next/image"; // Add this import
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
      return redirect("/login?message=User could not be authenticated");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
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
        <Label htmlFor="email">E-Mail</Label>
        <Input type="text" name="email" placeholder="max.mustermann@vaspp.com" required/>
        
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="****************" required/>

        <SubmitButton
          formAction={signIn}
          className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-foreground mb-2 text-white"
          pendingText="Signing in..."
        >
          Sign In
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