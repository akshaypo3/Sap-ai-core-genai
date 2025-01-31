import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import FrameworkCardsMateriality from "@/components/materiality/dashboard/FrameworkCardsMateriality";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const roleforpage=user.user_metadata.roles || "other"
  
  
  if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
    return redirect("/portal/dashboard")
  }

  const t = await getTranslations('materiality'); // Fetch translations
  const breadcrumbs = [
    { href: "/dashboard/", text: t('dashboard.breadcrumbs.home') }
  ];

  return (
    <>
      <ContentLayout title={t('dashboard.title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t('dashboard.dashboard.title')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">addNew</Button>
          </div> */}
        </div>
        <FrameworkCardsMateriality />
      </ContentLayout>
    </>
  );
}
