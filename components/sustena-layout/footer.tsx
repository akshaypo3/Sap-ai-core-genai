import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-end">
          <Image src="/vaspp_logo_c_black_wide.png" alt="VASPP logo in black" width={75} height={30} className="dark:hidden"/>
          <Image src="/vaspp_logo_c_white_wide.png" alt="VASPP logo in white" width={75} height={30} className="hidden dark:block"/>
      </div>
    </div>
  );
}
