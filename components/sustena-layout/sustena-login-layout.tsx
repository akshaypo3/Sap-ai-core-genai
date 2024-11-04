"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/sustena-layout/footer";
import { Sidebar } from "@/components/sustena-layout/sidebar-login";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <main className="bg-zinc-50 dark:bg-zinc-900">
        <div className="w-full">
          {children}
        </div>
      </main>
    </>
  );
}