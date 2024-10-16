"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserButton } from "@/components/settings/users/DeleteUserButton";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl'; // Import the useTranslations hook

export type User = {
    userId: string;
    name: string;
    email: string;
    group?: { group: string };
    role?: { role: string };
    createdAt: string;
    lastSignInAt?: string;
};

export const columns_user: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: () => {
            const t = useTranslations("table");
            return t("name");
        },
        cell: ({ row }) => <span>{row.getValue("name") || "NA"}</span>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
        const t = useTranslations("table");
          return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                {t("email")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "group",
        header: () => {
            const t = useTranslations("table");
            return t("group");
        },
        cell: ({ row }) => <span>{row.getValue("group")?.group || "No Group"}</span>,
    },
    {
        accessorKey: "role",
        header: () => {
            const t = useTranslations("table");
            return t("role");
        },
        cell: ({ row }) => <span>{row.getValue("role")?.role || "No Role"}</span>,
    },
    {
        accessorKey: "createdAt",
        header: () => {
            const t = useTranslations("table");
            return t("Created At");
        },
        cell: ({ row }) => <span>{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>,
    },
    {
        accessorKey: "lastSignInAt",
        header: () => {
            const t = useTranslations("table");
            return t("lastSignIn"); 
        },
        cell: ({ row }) => {
          const t = useTranslations("table");
          return (
            <span>
                {row.getValue("lastSignInAt")
                    ? new Date(row.getValue("lastSignInAt")).toLocaleDateString()
                    : t("Never Signed In")}
            </span>
          )
        },
    },
    {
        accessorKey: "userId",
        header: () => {
            const t = useTranslations("table");
            return t("uid");
        },
        cell: ({ row }) => <span>{row.getValue("userId")}</span>,
    },
    {
      accessorKey: "action",
        header: () => {
            const t = useTranslations("table");
            return t("action"); 
        },
        cell: ({ row }) => (
            <div className="flex justify-center space-x-2">
                <DeleteUserButton id={row.original} />
            </div>
        ),
    },
    {
      accessorKey: "edit",
        header: () => {
            const t = useTranslations("table");
            return t("edit"); 
        },
        cell: ({ row }) => (
            <div className="flex justify-center space-x-2">
                {/* <EditUserButton id={row.original.userId} /> */}
            </div>
        ),
    },
];
