"use client"

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();
    const t = useTranslations();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                router.push('/login'); // Redirect to login page after sign out
            }
        } catch (error) {
            console.error('Unexpected error during sign out:', error);
        }
    };

    return (
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
            {t("Sign out")}
        </DropdownMenuItem>
    )
}