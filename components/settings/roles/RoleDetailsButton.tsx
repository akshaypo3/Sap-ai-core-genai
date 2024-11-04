import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  ZoomIn } from "lucide-react";

export  function RoleDetailsButton({ roleid }: { roleid: string }) {
  return (
    <Link href={`/settings/roles/${roleid}`}>
      <Button className="p-2" type="submit">
        <span className="sr-only">View</span>
        <ZoomIn className="w-4" />
      </Button>
    </Link>
  );
}