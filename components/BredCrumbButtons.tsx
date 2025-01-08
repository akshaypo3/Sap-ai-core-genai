"use client"
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick = () => {
    router.back();
  };

  if (pathname === "/dashboard") {
    return null;
  }
  const t = useTranslations('ui')
  return (
    <Button className="bg-green-500" onClick={handleBackClick}>
      {t("Back")}
    </Button>
  );
}

export function ContinueButton({contineButton}:{contineButton: { href: string; text: string }[]}) {
  return (
    <>
    {contineButton?.map((con, index) => (
      <div key={index}>
        <Link href={con.href} key={index}>
          <Button className="bg-green-500">{con.text}</Button>
        </Link>
      </div>
    ))}
    </>
  )
}