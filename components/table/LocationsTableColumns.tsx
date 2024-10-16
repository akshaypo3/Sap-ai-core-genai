"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ZoomIn } from "lucide-react";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";
import { useTranslations } from 'next-intl'; // Import the useTranslations hook

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
        header: () => {
            const t = useTranslations("table"); 
            return t("name");
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
        accessorKey: "description",
        header: () => {
            const t = useTranslations("table");
            return t("description");
        },
        cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
        accessorKey: "address",
        header: () => {
            const t = useTranslations("table");
            return t("address");
        },
        cell: ({ row }) => <span>{row.getValue("address") || "NA"}</span>,
    },
    {
        accessorKey: "postalcode",
        header: () => {
            const t = useTranslations("table");
            return t("postalCode");
        },
        cell: ({ row }) => <span>{row.getValue("postalcode") || "NA"}</span>,
    },
    {
        accessorKey: "city",
        header: () => {
            const t = useTranslations("table");
            return t("city");
        },
        cell: ({ row }) => <span>{row.getValue("city") || "NA"}</span>,
    },
    {
        accessorKey: "country",
        header: () => {
            const t = useTranslations("table");
            return t("country");
        },
        cell: ({ row }) => <span>{row.getValue("country") || "NA"}</span>,
    },
    {
        accessorKey: "employee_count",
        header: () => {
            const t = useTranslations("table");
            return t("employees");
        },
        cell: ({ row }) => <span>{row.getValue("employee_count") || "NA"}</span>,
    },
    {
      accessorKey: "details",
        header: () => {
          const t = useTranslations("table");
          return t("details");
      },
        cell: ({ row }) => {
          const t = useTranslations("table");
            <div className="flex justify-end">
                <Link href={`/materiality/company/location/${row.original.id}`}>
                    <Button className="p-2">
                        <span className="sr-only">{t("View")}</span>
                        <ZoomIn className="w-4" />
                    </Button>
                </Link>
                <DeleteLocationButton location={row.original} />
            </div>
        },
    },
];
