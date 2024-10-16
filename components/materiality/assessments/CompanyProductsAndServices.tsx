import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { AddProductButton } from "@/components/materiality/company/buttons";
import { getProductsAndServices, getLocations, getCompanyDetails } from "@/lib/company/data";
import { getTranslations } from 'next-intl/server';
import { DataTable } from "@/components/table/data-table"; 
import { columns_product } from "@/components/table/ProductsTableColumns";

export default async function CompanyProductsAndServices() {

    
  const t = await getTranslations('materiality'); // Fetch translations from the company namespace
  const products = await getProductsAndServices();


  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            {t("company.products.title")}
          </h3>
          <AddProductButton />
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
            columns={columns_product}
            data={products}
            filter={"name"}
          />
        </div>
      </div>
    </>
  );
}
