"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteGroupButton } from "../settings/groups/DeleteGroupButton";
import { GroupDetailsButton } from "../settings/groups/GroupDetailsButton";


export type Group = {
    id: string;
    group: string;
    description: string;
    user_count: number;
  };

  export const columns_group: ColumnDef<Group>[] = [
    {
      accessorKey: "group",
      header: "Group",
      cell: ({ row }) => <span>{row.getValue("group") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "No Description"}</span>,
    },
    {
      accessorKey: "user_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="text-center">{row.getValue("user_count")}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <GroupDetailsButton groupid={row.original.id} />
          </div>
        );
      },
    }
    ,
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DeleteGroupButton id={row.original} />
        </div>
      ),
    },
  ];

