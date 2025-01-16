import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getLocation, getLocationIRO } from "@/lib/company/data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AddLocationIROButton } from "@/components/materiality/company/buttons";
import { DataTable } from "@/components/table/data-table";
import { columns_location_IRO } from "@/components/table/LocationsIROTableColumns";
import GoogleMaps from "@/components/materiality/company/GoogleMaps";
import { GetGoogleMapsApi } from "@/lib/settings/administration/data";
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: { companyid: string; locationid: string } }) {
  // const { companyid, locationid } = params;
  const { companyid, locationid } = await params; 
const location = await getLocation(locationid)
const locationIRO = await getLocationIRO(locationid)
const apiKey = await GetGoogleMapsApi()
const t = await getTranslations('materiality');




  return (
    <ContentLayout title={""}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{t("company.companyId.Location Details")}</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
     <div className="bg-white dark:bg-neutral-950 rounded-md">
     <Alert>
       <h2 className="font-semibold text-xl mb-3">{t("company.companyId.Location Details")}</h2>
       <AlertDescription>
        
         <div className="grid gap-4">
           <div>
             <Label>{t("company.companyId.Name")}</Label>
             <p>{location.name}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Description")}</Label>
             <p>{location.description}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Type")}</Label>
             <p>{location.type}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Address")}</Label>
             <p>{location.address}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Postal Code")}</Label>
             <p>{location.postalcode}</p>
           </div>
           <div>
             <Label>{t("company.companyId.City")}</Label>
             <p>{location.city}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Country")}</Label>
             <p>{location.country}</p>
           </div>
           <div>
             <Label>{t("company.companyId.Employee Count")}</Label>
             <p>{location.employee_count}</p>
           </div>
         </div>
       </AlertDescription>
     </Alert>
     </div>
     <div className="bg-white dark:bg-neutral-950 rounded-md border ps-4 pe-4 pb-4">
          <GoogleMaps location={location} apiKey={apiKey}/>
         </div>
       </div>
       {/* iros loaction details */}
       <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          {t("company.companyId.Impact / Risks / Opportunities")}
          </h3>
          <AddLocationIROButton companyId={companyid} locationId={locationid} />
        </div>
        <div className="min-w-full table-auto border-collapse">
          <DataTable
                      columns={columns_location_IRO}
                      data={locationIRO}
                      filter={"name"} sort={"Created At"} />
        </div>
      </div>
    </ContentLayout>
  );
}