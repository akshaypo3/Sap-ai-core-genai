"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UUID } from "crypto";

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
      header: "Title",
      cell: ({ row }) => <span className="font-medium">{row.getValue("title") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="font-medium">{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "assigned_to_username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assigned to
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("assigned_to_username") || "NA"}</span>,
    },
    {
      accessorKey: "created_by_username",
      header: "Created by",
      cell: ({ row }) => <span className="font-medium">{row.getValue("created_by_username") || "NA"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span className="font-medium">{row.getValue("status") || "NA"}</span>,
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("start_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
        </span>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("due_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const taskid1=row.original.id
        return(
        <div className="flex justify-center">
          {/* <ViewTaskButton taskId={taskid1} /> */}
        </div>
      )},
    },
  ];