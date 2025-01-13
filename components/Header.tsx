import Link from 'next/link';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import { ModeToggle } from "@/components/ThemeToggle";
import { getTranslations } from 'next-intl/server';

async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };
  const t = await getTranslations('ui')
  return (
    <>
    <div className="bg-white dark:bg-black h-16 w-full flex justify-center border-b-2 mb-10 border-green-500">
    <header className="flex h-16 max-w-7xl w-full items-center justify-between px-4 md:px-6 bg-white dark:bg-black border-b-2 border-green-500 mb-10">
      <div className="flex items-center gap-2">
        <Link href="/internal/" prefetch={false}>
          <Image 
            src="/vaspp_sustena_logo_black_wide.png"
            height={40}
            width={250}
            alt="Logo of VASPP Reporting Hub"
            className="dark:hidden"/>
            <Image 
            src="/vaspp_sustena_logo_white_wide.png"
            height={40}
            width={250}
            alt="Logo of VASPP Reporting Hub"
            className="hidden dark:block"/>
          <span className="sr-only">{t("VASPP Technologies")}</span>
        </Link>
      </div>
      {user ? (
        <>
        <nav className="flex items-center gap-5">
        <Link href="/dev/reporting/" className="text-sm font-medium hover:underline" prefetch={false}>
           {t("Dashboard")}
         </Link>
         <Link href="/dev/reporting/" className="text-sm font-medium hover:underline" prefetch={false}>
           {t("Materiality Assesments")}
         </Link>
         <Link href="/dev/reporting/" className="text-sm font-medium hover:underline" prefetch={false}>
           {t("Frameworks")}
         </Link>
         <Link href="/dev/reporting/" className="text-sm font-medium hover:underline" prefetch={false}>
           {t("Reports")}
         </Link>
         <Link href="/dev/reporting/" className="text-sm font-medium hover:underline" prefetch={false}>
           {t("Data Management")}
         </Link>
     </nav>
     <ModeToggle/>
     <div className="flex">{t("Hey")} {user.email}!</div>
     <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Avatar className="h-9 w-9">
                 <AvatarImage src="/placeholder.svg" alt="Avatar Image" />
                 <AvatarFallback>{"U"}</AvatarFallback>
               </Avatar>
             </DropdownMenuTrigger>
             <DropdownMenuContent>
               <DropdownMenuItem>
                   <Link href="/internal/admin">{t("Admin")}</Link>
               </DropdownMenuItem>
               <DropdownMenuItem>
               <form action={signOut}>
                 <button>
                   {t("Logout")}
                 </button>
               </form>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
           </>
      ):(
        <div></div>
      )}
      
    </header>
    </div>
    </>
  );
}

function MenuIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

export default Header;
