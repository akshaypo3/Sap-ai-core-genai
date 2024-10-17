"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/login";
export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const t = useTranslations("login");
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md mx-auto my-auto justify-center gap-2 rounded-md p-7">
      {" "}
      <div className="flex justify-center mb-6">
        {" "}
        <Image
          src="/sustena_logo_black_wide.png"
          className="dark:hidden"
          alt="Sustena Logo"
          width={100}
          height={40}
        />{" "}
        <Image
          src="/sustena_logo_white_wide.png"
          className="hidden dark:block"
          alt="Sustena Logo"
          width={100}
          height={40}
        />{" "}
      </div>{" "}
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        {" "}
        <Label htmlFor="email">{t("email_label")}</Label>{" "}
        <Input
          type="text"
          name="email"
          placeholder={t("email_placeholder")}
          required
        />{" "}
        <Label htmlFor="password">{t("password_label")}</Label>{" "}
        <Input
          type="password"
          name="password"
          placeholder={t("password_placeholder")}
          required
        />{" "}
        <SubmitButton
          formAction={signIn}
          className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-foreground mb-2 text-white"
          pendingText={t("signing_in")}
        >
          {" "}
          {t("sign_in_button")}{" "}
        </SubmitButton>{" "}
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {" "}
            {searchParams.message}{" "}
          </p>
        )}{" "}
      </form>{" "}
    </div>
  );
}
