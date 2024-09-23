import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleHelp, ZoomIn } from "lucide-react";
import { AddLocation } from "@/components/materiality/stakeholders/buttons";
import { getProductsAndServices, getLocations, getCompanyDetails } from "@/lib/company/data";
import { AddLocationButton, AddProductButton } from "@/components/materiality/company/buttons";
import { saveCompanyDetails } from "@/lib/company/action";




// import Subheader from "@/components/Subheader";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const companyDetails = await getCompanyDetails();
  const locations = await getLocations();
  const products = await getProductsAndServices();
  

  return (
    <>
      <ContentLayout title="Company Details">
      
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-top">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">Company Details</h3>
          </div>
          <div className="mt-3">
            {/* <Button></Button> */}
        </div>
      </div>
      <div className="my-10">
        <form action={saveCompanyDetails}>
          <input type="hidden" name="company_id" value={companyDetails[0].id}/>
          <Label htmlFor="companyname">Company Name</Label>
          <Input type="text" name="companyname" placeholder={companyDetails[0].name} />
          {/* <Separator className="my-4"/> */}
          <Label htmlFor="company_strategy">Company Strategy</Label>
          <Textarea id="company_strategy" name="company_strategy" placeholder={companyDetails[0].company_strategy}/>
          {/* <Separator className="my-4"/> */}
          <Label htmlFor="business_model">Business Model</Label>
          <Textarea id="business_model" name="business_model" placeholder={companyDetails[0].business_model}/>
          <div className="flex">
          <Button className="mt-5 justify-end">Save Details</Button>
          </div>
        </form>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-top">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">Locations</h3>
          </div>
          <div className="mt-3">
            <AddLocationButton/>
        </div>
      </div>
        <Table>
          <TableCaption>A list of company locations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Details</TableHead>
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
            <TableCell className="text-right">
              <Button className="p-2 ">
                <span className="sr-only">View</span>
                <ZoomIn className="w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center">No locations found</TableCell>
        </TableRow>
      )}
    </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-top mt-10">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">Products / Services</h3>
          </div>
          <div className="mt-3">
            <AddProductButton/>
          </div>
        </div>
        <Table>
          <TableCaption>A list of the most important products and services</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">% of turnover</TableHead>
              <TableHead className="text-right">Details</TableHead>
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
                    <Button className="p-2 ">
                      <span className="sr-only">View</span>
                      <ZoomIn className="w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No products or services found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
    </>
  );
}
