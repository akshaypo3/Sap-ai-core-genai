import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getProduct, getProductIRO } from "@/lib/company/data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AddProductIROButton } from "@/components/materiality/company/buttons";
import { DataTable } from "@/components/table/data-table";
import { columns_product_IRO } from "@/components/table/ProductsIROTableColumns";
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: { companyid: string; productid: string } }) {
  const { companyid, productid } = await params;
  
const product = await getProduct(productid)
const productIRO = await getProductIRO(productid)
const t = await getTranslations('materiality');

  return (
    <ContentLayout title={""}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{t("company.companyId.Product / Service Details")}</h1>
          </div>
        </div>
        <div className="">
     <div className="bg-white dark:bg-neutral-950 rounded-md">
     <Alert>
       <h2 className="font-semibold text-xl mb-3">{t("company.companyId.Product / Service Details")}</h2>
       <AlertDescription>
        
         <div className="grid gap-4">
           <div>
             <Label>{t("company.companyId.Name")}</Label>
             <p>{product.name}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Description")}</Label>
             <p>{product.description}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Type")}</Label>
             <p>{product.type}</p>
           </div>
           <div>
             <Label>{t("company.companyId.% of Turnover")}</Label>
             <p>{product.turnover_percentage}</p>
           </div>
         </div>
       </AlertDescription>
     </Alert>
     </div>
     {/* <div className="bg-white dark:bg-neutral-950 rounded-md text-center">
            Map
         </div> */}
       </div>
       {/* iros loaction details */}
       <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            {t("company.companyId.Impact / Risks / Opportunities")}
          </h3>
          <AddProductIROButton companyId={companyid} productId={productid} />
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
                      columns={columns_product_IRO}
                      data={productIRO}
                      filter={"name"} sort={"Created At"} />
        </div>
      </div>
    </ContentLayout>
  );
}