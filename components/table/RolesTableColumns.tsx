"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteRoleButton } from "../settings/roles/DeleteRoleButton";
import { useTranslations } from 'next-intl'; // Import the useTranslations hook
import { RoleDetailsButton } from "../settings/roles/RoleDetailsButton";

export type Role = {
    id: string;          
    role: string;       
    description: string; 
    user_count: number;  
};

export const columns_role: ColumnDef<Role>[] = [
    {
        accessorKey: "role",
        header: () => {
            const t = useTranslations("table"); 
            return t("role"); 
        },
        cell: ({ row }) => <span>{row.getValue("role")}</span>,
    },
    {
        accessorKey: "description",
        header: () => {
            const t = useTranslations("table");
            return t("description");
        },
        cell: ({ row }) => <span>{row.getValue("description")}</span>,
    },
    {
        accessorKey: "user_count",
        header: ({ column }) => {
        const t = useTranslations("table");
          return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                {/* Translated header for Users Count */}
                {t("userCount")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            );
          },
        cell: ({ row }) => <span>{row.getValue("user_count")}</span>,
    },
    {
      accessorKey: "details",
        header: () => {
            const t = useTranslations("table");
            return t("details"); 
        },
        cell: ({ row }) => (
            <div className="flex justify-center space-x-2">
                 <RoleDetailsButton roleid={row.original.id} />
            </div>
        ),
    },
    {
      accessorKey: "action",
        header: () => {
            const t = useTranslations("table");
            return t("action"); 
        },
        cell: ({ row }) => (
            <div className="flex justify-center space-x-2">
                <DeleteRoleButton id={row.original} />
            </div>
        ),
    },
];
