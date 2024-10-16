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
import { getLocations } from "@/lib/company/data";
import { getTranslations } from 'next-intl/server';

export default async function CompanyLocations() {
  const t = await getTranslations("materiality");

  const locations = await getLocations();

  return (
    <>
      {/* Locations Section */}
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            {t("company.locations.title")}
          </h3>
          <AddLocationButton />
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
            columns={columns_location}
            data={locations}
            filter={"name"}
          />
        </div>
      </div>
    </>
  );
}
