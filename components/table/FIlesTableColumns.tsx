"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DownloadFileButton } from "../datahub/downloadButton";

export type File = {
    id: string;
    name: string;
    created_at: string;
  };

  export const columns_file: ColumnDef<File>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id") || "NA"}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
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
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DownloadFileButton name={row.getValue("name")} />
        </div>
      ),
    },
  ];   