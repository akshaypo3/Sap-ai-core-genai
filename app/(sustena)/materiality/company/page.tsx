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
import CompanyDetails from "@/components/materiality/assessments/CompanyDetails";
import CompanyLocations from "@/components/materiality/assessments/CompanyLocations";
import CompanyProductsAndServices from "@/components/materiality/assessments/CompanyProductsAndServices";




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
    <ContentLayout title={t('company.title')}>
      <CompanyDetails/>
      <CompanyLocations/>
      <CompanyProductsAndServices/>
    </ContentLayout>
  );
}
