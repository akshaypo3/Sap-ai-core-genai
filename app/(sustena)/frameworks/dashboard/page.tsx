import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { getTranslations } from 'next-intl/server'; // Updated import
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Home() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Use getTranslations to fetch translations
  const t = await getTranslations('frameworks');

  const breadcrumbs = [
    { href: "/dashboard/", text: t('breadcrumb.dashboard') },
    { href: "/frameworks/dashboard", text: t('breadcrumb.frameworks') }
  ];

  return (
    <>
      <ContentLayout title={t('title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t('title')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          <div className="flex space-x-4">
            {/* Button Section for Subheader 
            <Button variant="outline">Add new</Button> */}
          </div>
        </div>
        Home
      </ContentLayout>
    </>
  );
}
