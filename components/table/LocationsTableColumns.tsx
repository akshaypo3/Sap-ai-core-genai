"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {  ZoomIn } from "lucide-react";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";

export type Location = {
    id: string;
    name: string;
    description: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
    employee_count: string;
  };

  export const columns_location: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Type",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "address",
      header: "Street",
      cell: ({ row }) => <span>{row.getValue("address") || "NA"}</span>,
    },
    {
      accessorKey: "postalcode",
      header: "Postal Code",
      cell: ({ row }) => <span>{row.getValue("postalcode") || "NA"}</span>,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => <span>{row.getValue("city") || "NA"}</span>,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <span>{row.getValue("country") || "NA"}</span>,
    },
    {
      accessorKey: "employee_count",
      header: "Employees",
      cell: ({ row }) => <span>{row.getValue("employee_count") || "NA"}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Link href={`/materiality/company/location/${row.original.id}`}>
            <Button className="p-2">
              <span className="sr-only">View</span>
              <ZoomIn className="w-4" />
            </Button>
          </Link>
          <DeleteLocationButton location={row.original} />
        </div>
      ),
    },
  ];