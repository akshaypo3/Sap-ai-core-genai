"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {  ArrowUpDown, ZoomIn } from "lucide-react";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";
import EditLocationIROButton from "../materiality/company/EditLocationIRO";
import { DeleteLocationIROButton } from "../materiality/company/DeleteLocationIRO";
import EditProductIROButton from "../materiality/company/EditProductIRO";
import { DeleteProductIROButton } from "../materiality/company/DeleteProductIRO";
import { UUID } from "crypto";

export type ProductIRO = {
    id: string;
    name: string;
    description: string;
    type: string;
    topic: string;
    subtopic: string;
    subsubtopic: string;
    created_at: string;
    company_id: UUID;
    product_id: UUID;
  };

  export const columns_product_IRO: ColumnDef<ProductIRO>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span>{row.getValue("type") || "NA"}</span>,
    },
    {
      accessorKey: "topic",
      header: "Topic",
      cell: ({ row }) => <span>{row.getValue("topic") || "NA"}</span>,
    },
	{
      accessorKey: "subtopic",
      header: "Sub Topic",
      cell: ({ row }) => <span>{row.getValue("subtopic") || "NA"}</span>,
    },
    {
      accessorKey: "subsubtopic",
      header: "Sub Sub Topic",
      cell: ({ row }) => <span>{row.getValue("subsubtopic") || "NA"}</span>,
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
          <div className="flex justify-center gap-2">
          <div>
          <Link href={`/materiality/company/${row.original.company_id}/product/${row.original.product_id}/${row.original.id}`}>
              <Button className="p-2">
                <span className="sr-only">View</span>
                <ZoomIn className="w-4" />
              </Button>
            </Link>
          </div>
          <div>
            <DeleteProductIROButton id={row.original} />
          </div>
        </div>
        );
      },
    }
    ,
  ];