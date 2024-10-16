"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteProductButton } from "../materiality/company/DeleteProductButton";
import { Button } from "@/components/ui/button"
import {  ArrowUpDown } from "lucide-react";

export type Product = {
    id: string;
    name: string;
    type: string;
    description: string;
    turnover_percentage: number;
  };

  export const columns_product: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span>{row.getValue("type") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "turnover_percentage",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % of Turnover
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="text-center">{row.getValue("turnover_percentage") || "NA"}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DeleteProductButton product={row.original} />
        </div>
      ),
    },
  ];