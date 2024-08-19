import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/sustena-layout/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
              <Image src="/sustena_logo_black_wide.png" alt="Sustena Logo with black text" width={100} height={40} className="dark:hidden"/>
            <Image src="/sustena_logo_white_wide.png" alt="Sustena Logo with black text" width={100} height={40} className="hidden dark:block"/>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
