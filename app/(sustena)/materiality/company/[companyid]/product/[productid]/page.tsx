import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getProduct, getProductIRO } from "@/lib/company/data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AddProductIROButton } from "@/components/materiality/company/buttons";
import { DataTable } from "@/components/table/data-table";
import { columns_product_IRO } from "@/components/table/ProductsIROTableColumns";

export default async function Home({ params }: { params: { companyid: string; productid: string } }) {
  const { companyid, productid } = params;
  
const product = await getProduct(productid)
const productIRO = await getProductIRO(productid)

  return (
    <ContentLayout title={""}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">Product / Service Details</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
     <div className="bg-white dark:bg-neutral-950 rounded-md">
     <Alert>
       <h2 className="font-semibold text-xl mb-3">Product / Service Details</h2>
       <AlertDescription>
        
         <div className="grid gap-4">
           <div>
             <Label>Name</Label>
             <p>{product.name}</p>
           </div>
           <div>
             <Label>Description</Label>
             <p>{product.description}</p>
           </div>
           <div>
             <Label>Type</Label>
             <p>{product.type}</p>
           </div>
           <div>
             <Label>% of Turnover</Label>
             <p>{product.turnover_percentage}</p>
           </div>
         </div>
       </AlertDescription>
     </Alert>
     </div>
     <div className="bg-white dark:bg-neutral-950 rounded-md text-center">
            Map
         </div>
       </div>
       {/* iros loaction details */}
       <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
            Impact / Risks / Opportunities
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