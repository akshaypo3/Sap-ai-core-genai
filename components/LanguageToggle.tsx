"use client"

// import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import * as React from "react";
import { Languages } from "lucide-react";
import Link from "next/link";
import { useLocaleContext } from "@/app/contexts/LanContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { US, DE } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export function LanguageToggle() {
  const { locale, setLocale } = useLocaleContext();

  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    Cookies.set("locale", newLocale);
    // revalidatePath("/dashboard");
    redirect(pathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/" locale="en" onClick={() => handleLocaleChange("en")}>
            <div className="flex items-center">
              <US className="w-9 h-3 mr-1" /> English
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/" locale="de" onClick={() => handleLocaleChange("de")}>
            <div className="flex items-center">
              <DE className="w-9 h-3 mr-1" /> Deutsch
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}