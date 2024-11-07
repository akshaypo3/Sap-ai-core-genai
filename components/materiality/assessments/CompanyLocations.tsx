import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddLocationButton } from "@/components/materiality/company/buttons";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";
import { DataTable } from "@/components/table/data-table";
import { columns_location } from "@/components/table/LocationsTableColumns";
import { getLocations, getLocationTypes, GoogleApikey } from "@/lib/company/data";
import { getTranslations } from 'next-intl/server';

export default async function CompanyLocations() {
  const t = await getTranslations("materiality");

  const locations = await getLocations();
  const type = await getLocationTypes();
  const api1 = await GoogleApikey();
  const api=api1.key

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            {t("company.locations.title")}
          </h3>
          <AddLocationButton type={type} api={api}/>
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
            columns={columns_location}
            data={locations}
            filter={"name"}
            sort={'City'}
          />
        </div>
      </div>
    </>
  );
}
