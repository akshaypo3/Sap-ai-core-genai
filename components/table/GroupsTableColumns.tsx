"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteGroupButton } from "../settings/groups/DeleteGroupButton";
import { useTranslations } from "next-intl";

export type Group = {
    id: string;
    group: string;
    description: string;
    user_count: number;
};

export const columns_group: ColumnDef<Group>[] = [
    {
        accessorKey: "group",
        header: () => {
            const t = useTranslations("table"); 
            return t("name");
        },
        cell: ({ row }) => <span>{row.getValue("group") || "NA"}</span>,
    },
    {
        accessorKey: "description",
        header: () => {
            const t = useTranslations("table"); 
            return t("description");
        },
        cell: ({ row }) => <span>{row.getValue("description") || "No Description"}</span>,
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
                {t("userCount")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <span className="text-center">{row.getValue("user_count")}</span>,
    },
    {
      accessorKey: "details",
        header: () => {
            const t = useTranslations("table"); 
            return t("details"); 
        },
        cell: ({ row }) => (
            <div className="flex justify-center">
                {/* <GroupDetailsButton groupid={row.getValue("id")} /> */}
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
            <div className="flex justify-center">
                <DeleteGroupButton id={row.original} />
            </div>
        ),
    },
];
