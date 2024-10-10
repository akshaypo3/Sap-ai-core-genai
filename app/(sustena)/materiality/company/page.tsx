import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddLocationButton, AddProductButton } from "@/components/materiality/company/buttons";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";
import { DeleteProductButton } from "@/components/materiality/company/DeleteProductButton";
import { getProductsAndServices, getLocations, getCompanyDetails } from "@/lib/company/data";
import { saveCompanyDetails } from "@/lib/company/action";
import { getTranslations } from 'next-intl/server';
import { DataTable } from "@/components/table/data-table"; 
import { columns_location} from "@/components/table/LocationsTableColumns";
import { columns_product } from "@/components/table/ProductsTableColumns";





// import Subheader from "@/components/Subheader";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations('materiality'); // Fetch translations from the company namespace

  const companyDetails = await getCompanyDetails();
  const locations = await getLocations();
  const products = await getProductsAndServices();

  return (
    <ContentLayout title={t('title')}>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">{t('company.title')}</h3>
        </div>
        <div className="my-10">
          <form action={saveCompanyDetails}>
            <input type="hidden" name="company_id" value={companyDetails[0].id} />
            <Label htmlFor="companyname">{t('company.companyName')}</Label>
            <Input type="text" name="companyname" value={companyDetails[0].name} />
            <Label htmlFor="company_strategy">{t('company.companyStrategy')}</Label>
            <Textarea id="company_strategy" name="company_strategy" value={companyDetails[0].company_strategy} />
            <Label htmlFor="business_model">{t('company.businessModel')}</Label>
            <Textarea id="business_model" name="business_model" value={companyDetails[0].business_model} />
            <div className="flex">
              <Button className="mt-5 justify-end">{t('company.updateDetails')}</Button>
            </div>
          </form>
        </div>
        
        {/* Locations Section */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">{t('company.locations.title')}</h3>
          <AddLocationButton />
        </div>
      </div>
      <div className="min-w-full table-auto border-collapse">
         <DataTable columns={columns_location} data={locations} filter={'name'}/>
       </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{t('company.details.name')}</TableHead>
              <TableHead>{t('company.details.type')}</TableHead>
              <TableHead>{t('company.details.street')}</TableHead>
              <TableHead>{t('company.details.postalCode')}</TableHead>
              <TableHead>{t('company.details.city')}</TableHead>
              <TableHead>{t('company.details.country')}</TableHead>
              <TableHead>{t('company.details.employees')}</TableHead>
              <TableHead className="text-right">{t('company.details.details')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations && locations.length > 0 ? (
              locations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.postalcode}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.employee_count}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/materiality/company/location/${item.id}`}>
                      <Button className="p-2">
                        <span className="sr-only">View</span>
                        <ZoomIn className="w-4" />
                      </Button>
                    </Link>
                    <DeleteLocationButton location={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">{t('locations.noLocations')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Products/Services Section */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md mt-10">
          <h3 className="text-xl font-semibold">{t('company.products.title')}</h3>
          <AddProductButton />
        </div>
        <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_product} data={products} filter={'name'}/>
                </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{t('company.details.name')}</TableHead>
              <TableHead>{t('company.details.type')}</TableHead>
              <TableHead>{t('company.details.description')}</TableHead>
              <TableHead className="text-center">{t('company.details.turnoverPercentage')}</TableHead>
              <TableHead className="text-right">{t('company.details.details')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">{item.turnover_percentage}</TableCell>
                  <TableCell className="text-right">
                    <DeleteProductButton product={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">{t('company.products.noProducts')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}
