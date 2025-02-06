"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";

export type Stakeholderquestions = {
  id: string;
  question: string;
  mandatory: boolean;
  created_at: string;
};

export const columns_PortalStakeholderquestions: ColumnDef<Stakeholderquestions>[] =
  [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("question") || "NA"}</span>
      ),
    },
    {
      accessorKey: "mandatory",
      header: "Mandatory",
      cell: ({ row }) => {
        const isMandatory = row.getValue("mandatory");
        return (
          <span
            className={`inline-block px-2 py-1 text-white font-semibold rounded-md ${
              isMandatory ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isMandatory ? "Mandatory   " : "Not Mandatory"}
          </span>
        );
      },
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
      header: "Answer",
      cell: ({ row }) => {
        return (
          <div className="">
            <div>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
