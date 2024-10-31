"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserButton } from "@/components/settings/users/DeleteUserButton";
import EditUserButton from "@/components/settings/users/editUserButton";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteGlossaryButton } from "../settings/glossary/DeleteGlossaryButton";
import EditGlossaryButton from "../settings/glossary/EditGlossaryButton";


export type Glossary = {
    title: string;
    description: string;
    created_at: string;
  };

  export const columns_glossary: ColumnDef<Glossary>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span>{row.getValue("title") || "NA"}</span>,
    },
	{
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
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
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-2">
            <DeleteGlossaryButton id={row.original} />
          </div>
        );
      },
    },
    {
      header: "Edit",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <EditGlossaryButton id={row.original} />
        </div>
      ),
    },
  ];