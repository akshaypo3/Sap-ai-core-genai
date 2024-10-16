"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteRoleButton } from "../settings/roles/DeleteRoleButton";
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
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("role")}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description")}</span>,
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
      cell: ({ row }) => <span>{row.getValue("user_count")}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
        <RoleDetailsButton roleid={row.original.id} />
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <DeleteRoleButton id={row.original} />
        </div>
      ),
    },
  ];