"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {   ViewGoalButton} from "@/components/goals/buttons";
import { UUID } from "crypto";


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
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="font-medium">{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => <span className="font-medium">{row.getValue("start_date") || "NA"}</span>,
    },
    {
      accessorKey: "end_date",
      header: "End Date",
      cell: ({ row }) => <span className="font-medium">{row.getValue("end_date") || "NA"}</span>,
    },
    {
      accessorKey: "progress",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("progress") || 0} %</span>,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => <span className="font-medium">{row.getValue("owner") || "NA"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("status") ? "Completed" : "In Progress"}</span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const goalId1 = row.original.id;
        return(
        <div className="flex justify-center">
          <ViewGoalButton goalId={goalId1} />
        </div>
      )
    }
    },
  ];