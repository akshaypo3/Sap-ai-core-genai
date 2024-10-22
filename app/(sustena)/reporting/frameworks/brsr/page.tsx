import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import BRSRTable from "@/components/demo/BRSRTable"; // Make sure to create this file
import { getBRSRData } from "@/lib/demo/data"; // You'll need to create this function
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations('reporting');

  const brsrData = await getBRSRData();
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.brsr.Home") }
  ];

  return (
    <ContentLayout title={t("frameworks.brsr.title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title={t("frameworks.brsr.BRSR")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
      </div>
      <BRSRTable brsrData={brsrData} />
    </ContentLayout>
  );
}