"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {  ArrowUpDown } from "lucide-react";
import { DeleteStackholderQuestionButton } from "../materiality/stakeholders/Deletesteakholderquestion";

export type Stakeholderquestions = {
    id: string;
    question: string;
    mandatory: boolean;
	created_at: string;
  };

  export const columns_Stakeholderquestions: ColumnDef<Stakeholderquestions>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => <span className="font-medium">{row.getValue("question") || "NA"}</span>,
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
      header: "Action",
      cell: ({ row }) => {
        console.log(row.original)
        return (
          <div className="flex justify-center">
          <div>
            <DeleteStackholderQuestionButton id={row.original} />
          </div>
        </div>
        );
      },
    }
    ,
  ];