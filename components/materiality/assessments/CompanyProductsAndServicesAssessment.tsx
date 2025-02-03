import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import {AddProductButton} from "@/components/materiality/assessments/AddProductButton"
import { getProductsAndServices, getLocations, getCompanyDetails, CompanyID } from "@/lib/company/data";
import { getTranslations } from 'next-intl/server';
import { DataTable } from "@/components/table/data-table"; 
import { columns_product } from "@/components/table/ProductsTableColumns";
import { Button } from "@/components/ui/button";
import { handleNextStep } from "@/lib/assessments/action";
import NextStepButton from "@/components/materiality/assessments/NextStepButton";

export default async function CompanyProductsAndServices(id:any) {
  
  const t = await getTranslations('materiality'); // Fetch translations from the company namespace
  const products = await getProductsAndServices();
  const assessmentId = id.id;
  const company = await CompanyID();
  const companyID=company[0].id

  return (
    <>
      {/* Products/Services Section */}
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            {t("company.products.title")}
          </h3>
          <div>
          <AddProductButton id={assessmentId} companyID={companyID}/>
          <NextStepButton id={id} step={"4"}/>
          </div>
          
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
            columns={columns_product}
            data={products}
            filter={"name"}
            sort={'% of Turnover'}
          />
        </div>
      </div>
    </>
  );
}
