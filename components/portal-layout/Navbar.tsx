import { ModeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PortalUserNav } from "@/components/portal-layout/User-nav";
import { PortalSheetMenu } from "@/components/portal-layout/Sheet-menu";

interface NavbarProps {
  title: string;
}

export function PortalNavbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <PortalSheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <LanguageToggle />
          <ModeToggle />
          <PortalUserNav />
        </div>
      </div>
    </header>
  );
}
