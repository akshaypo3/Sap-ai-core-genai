import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/portal-layout/Menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { PortalSidebarToggle } from "@/components/portal-layout/Sidebar-toggle";

export function PortalSidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <PortalSidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <Image src="/sustena_logo_black_square.png" alt="Sustena Logo" height={50} width={50} className={cn("dark:hidden",
            sidebar?.isOpen === false
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0 hidden")}/>
            <Image src="/sustena_logo_white_square.png" alt="Sustena Logo" height={50} width={50} className={cn("hidden",
            sidebar?.isOpen === false
                  ? "translate-x-0 opacity-100 dark:block"
                  : "-translate-x-96 opacity-0 hidden")}/>
            {/* <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >Sustena
            </h1> */}
            <Image src="/sustena_logo_black_wide.png" alt="Sustena Logo with black text" width={100} height={40} className={cn("dark:hidden",
            sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100")}/>
            <Image src="/sustena_logo_white_wide.png" alt="Sustena Logo with black text" width={100} height={40} className={cn("hidden",
            sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100 dark:block")}/>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
