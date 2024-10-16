"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewGoalButton } from "@/components/goals/buttons";
import { UUID } from "crypto";
import { useTranslations } from "next-intl"; // Importing useTranslations

export type Goal = {
    id: UUID;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    progress: number;
    owner: string;
    status: string;
};

export const columns_goal: ColumnDef<Goal>[] = [
    {
        accessorKey: "name",
        header: () => {
            const t = useTranslations("table");
            return t("name"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
        accessorKey: "description",
        header: () => {
            const t = useTranslations("table"); 
            return t("description");
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("description") || "NA"}</span>,
    },
    {
        accessorKey: "start_date",
        header: () => {
            const t = useTranslations("table"); 
            return t("startDate"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("start_date") || "NA"}</span>,
    },
    {
        accessorKey: "end_date",
        header: () => {
            const t = useTranslations("table"); 
            return t("endDate"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("end_date") || "NA"}</span>,
    },
    {
        accessorKey: "progress",
        header: ({ column }) => {
            const t = useTranslations("table"); 
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("progress")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("progress") || 0} %</span>,
    },
    {
        accessorKey: "owner",
        header: () => {
            const t = useTranslations("table"); 
            return t("owner"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("owner") || "NA"}</span>,
    },
    {
        accessorKey: "status",
        header: () => {
            const t = useTranslations("table"); 
            return t("status"); 
        },
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("status") ? "Completed" : "In Progress"}</span>
        ),
    },
    {
      accessorKey: "action",
        header: () => {
            const t = useTranslations("table");
            return t("action"); 
        },
        cell: ({ row }) => {
            const goalId1 = row.original.id;
            return (
                <div className="flex justify-center">
                    <ViewGoalButton goalId={goalId1} />
                </div>
            );
        },
    },
];
