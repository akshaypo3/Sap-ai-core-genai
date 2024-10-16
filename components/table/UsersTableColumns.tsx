"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserButton } from "@/components/settings/users/DeleteUserButton";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import EditUserButton from "../settings/users/editUserButton";

export type User = {
    userId: string;
    name: string;
    email: string;
    allGroups: Array<{ id: string; group: string }>; // All available groups
     allRoles: Array<{ id: string; role: string }>;
    group?: { group: string };
    role?: { role: string };
    createdAt: string;
    lastSignInAt?: string;
  };

  export const columns_user: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    ,
    {
      accessorKey: "group",
      header: "Group",
      cell: ({ row }) => <span>{row.getValue("group")?.group || "No Group"}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("role")?.role || "No Role"}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => <span>{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>,
    },
    {
      accessorKey: "lastSignInAt",
      header: "Last Sign In",
      cell: ({ row }) => (
        <span>
          {row.getValue("lastSignInAt")
            ? new Date(row.getValue("lastSignInAt")).toLocaleDateString()
            : "Never Signed In"}
        </span>
      ),
    },
    {
      accessorKey: "userId",
      header: "UID",
      cell: ({ row }) => <span>{row.getValue("userId")}</span>,
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-2">
            <DeleteUserButton id={row.original} />
          </div>
        );
      },
    },
    {
      header: "Edit",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <EditUserButton id={row.original} />
        </div>
      ),
    },
  ];