"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpDown, ZoomIn } from "lucide-react";
import { DeleteTemplateButton } from "../reporting/templates/DeleteTemplateButton";

export type TemplatesData = {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
};

export const TemplatesTable: ColumnDef<TemplatesData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name") || "NA"}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("category") || "NA"}</span>
    ),
  },
  //   {
  //     accessorKey: "category",
  //     header: ({ column }) => (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Category
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     ),
  //     cell: ({ row }) => (
  //       <div className="lowercase">{row.getValue("category")}</div>
  //     ),
  //   },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //     cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
  //   },
  //   {
  //     accessorKey: "ontent",
  //     header: "Content",
  //     cell: ({ row }) => <span>{row.getValue("content") || "NA"}</span>,
  //   },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <div>
            <Link href={`/reporting/templates/${row.original.id}`}>
              <Button className="p-2">
                <span className="sr-only">View</span>
                <ZoomIn className="w-4" />
              </Button>
            </Link>
          </div>
          <div>
            <DeleteTemplateButton
              templateId={row.original.id}
              templateName={row.original.name}
            />
          </div>
        </div>
      );
    },
  },
];
