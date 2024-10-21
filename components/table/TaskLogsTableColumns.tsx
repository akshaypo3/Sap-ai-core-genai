"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ViewTaskActivityButton } from "../task/ViewTaskActivityButton";

export type TaskLog = {
    id: string;
    created_at: string;
    user: string;
    activity: string;
  };

  export const columns_task_log: ColumnDef<TaskLog>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span>
            {new Date(row.getValue("created_at"))
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
               &nbsp;
              {new Date(row.getValue("created_at")).toLocaleTimeString("en-GB", {
              hour12: false,
            })}
          </span>
        ),
      },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <span>{row.getValue("user") || "NA"}</span>,
    },
    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => <span>{row.getValue("activity") || "NA"}</span>,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ViewTaskActivityButton activityId={row.original.id} />
        </div>
      ),
    },
  ];