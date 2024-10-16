"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DownloadFileButton } from "../datahub/downloadButton";
import { useTranslations } from "next-intl";

export type File = {
    id: string;
    name: string;
    created_at: string;
  };

  export const columns_file: ColumnDef<File>[] = [
    {
      accessorKey: "id",
      header: () => {
        const t = useTranslations("table");
        return t("id") || t("NA"); 
      },
      // header: "ID",
      cell: ({ row }) => <span>{row.getValue("id") || "NA"}</span>,
    },
    {
      accessorKey: "name",
      header: () => {
        const t = useTranslations("table");
        return t("name") || t("NA");
      },
      // header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
          const t = useTranslations("table");
          return(
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Created At")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          );
        },
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
      // header: "Details",
      accessorKey: "details",
      header: () => {
        const t = useTranslations("table");
        return t("details");
      },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DownloadFileButton name={row.getValue("name")} />
        </div>
      ),
    },
  ];   