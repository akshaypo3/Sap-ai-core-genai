"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UUID } from "crypto";
import { useTranslations } from 'next-intl'; // Import the useTranslations hook
import { ViewTaskButton } from "../task/ViewTaskButton";

export type Task = {
    id: UUID;
    title: string;
    description: string;
    assigned_to_username: string;
    created_by_username: string;
    status: string;
    start_date: string;
    due_date: string;
};

export const columns_task: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: () => {
            const t = useTranslations("table");
            return t("title"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("title") || "NA"}</span>,
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
        accessorKey: "assigned_to_username",
        header: ({ column }) => {
          const t = useTranslations("table");
          return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                {t("assignedTo")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("assigned_to_username") || "NA"}</span>,
    },
    {
        accessorKey: "created_by",
        header: () => {
            const t = useTranslations("table");
            return t("Created By"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("created_by_username") || "NA"}</span>,
    },
    {
        accessorKey: "status",
        header: () => {
            const t = useTranslations("table");
            return t("status");
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("status") || "NA"}</span>,
    },
    {
        accessorKey: "start_date",
        header: () => {
            const t = useTranslations("table");
            return t("startDate"); 
        },
        cell: ({ row }) => (
            <span>
                {new Date(row.getValue("start_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
            </span>
        ),
    },
    {
        accessorKey: "due_date",
        header: () => {
            const t = useTranslations("table");
            return t("dueDate"); 
        },
        cell: ({ row }) => (
            <span>
                {new Date(row.getValue("due_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
            </span>
        ),
    },
    {
      accessorKey: "action",
        header: () => {
            const t = useTranslations("table");
            return t("action"); 
        },
        cell: ({ row }) => {
            const taskid1 = row.original.id;
            return (
                <div className="flex justify-center">
                    <ViewTaskButton taskId={taskid1} />
                </div>
            );
        },
    },
];
