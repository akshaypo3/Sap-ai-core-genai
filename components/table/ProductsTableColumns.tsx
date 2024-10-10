"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteProductButton } from "../materiality/company/DeleteProductButton";

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
      header: () => <span className="text-center">% of Turnover</span>,
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