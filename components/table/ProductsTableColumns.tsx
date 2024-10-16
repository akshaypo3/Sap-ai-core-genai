"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteProductButton } from "../materiality/company/DeleteProductButton";
import { useTranslations } from 'next-intl';

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
        header: () => {
            const t = useTranslations("table"); 
            return t("name"); 
        },
        cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
        accessorKey: "type",
        header: () => {
            const t = useTranslations("table");
            return t("type");
        },
        cell: ({ row }) => <span>{row.getValue("type") || "NA"}</span>,
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
        accessorKey: "turnover_percentage",
        header: () => {
            const t = useTranslations("table");
            return t("turnoverPercentage"); 
        },
        cell: ({ row }) => <span className="text-center">{row.getValue("turnover_percentage") || "NA"}</span>,
    },
    {
      accessorKey: "details",
        header: () => {
          const t = useTranslations("table");
          return t("details"); 
      },
        cell: ({ row }) => (
            <div className="flex justify-center">
                <DeleteProductButton product={row.original} />
            </div>
        ),
    },
];
