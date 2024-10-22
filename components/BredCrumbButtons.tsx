"use client"
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick = () => {
    router.back();
  };

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <Button className="mb-3 bg-green-600" onClick={handleBackClick}>
      Back
    </Button>
  );
}
