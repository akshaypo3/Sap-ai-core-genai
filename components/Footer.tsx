import Link from "next/link"
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl";

export default function Footer() {
  return (
    <div className="bg-white dark:bg-black w-full flex justify-center mt-5 border-t">
    <footer className="bg-white dark:bg-black w-full max-w-7xl px-4 py-6 md:px-6 flex justify-between dark:bg-gray-800">
      <div className="flex gap-4">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image src="/vaspp_logo_c_black_wide.png"
            width={100}
            height={12}
            alt="VASPP Logo"
            className="dark:hidden"/>
            <Image src="/vaspp_logo_c_white_wide.png"
            width={100}
            height={12}
            alt="VASPP Logo"
            className="hidden dark:block"/>
          <span className="sr-only">VASPP</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
          <Badge variant="outline" color="success">All systems normal</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("Version 0_1_9")}</p>
        {/* <Link
          href="#"
          className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Changelog
        </Link> */}
      </div>
    </footer>
    </div>
  )
}

function MountainIcon(props:any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}