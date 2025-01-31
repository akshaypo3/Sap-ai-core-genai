import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home({ params }: { params: { id: string } }) {
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
  const { id } = await params;
  const t = await getTranslations('materiality');
  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t('company.location.Company Location') },
    { href: "/materiality/dashboard/", text: t('company.location.Location ID') }
  ];

  return (
    <>
      <ContentLayout title="Dashboard">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
       <BreadCrumbCom title={t('company.location.Location')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        <div className="flex space-x-4">
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      {/* <IroTable assessmentData={assessmentData} assessmentId={id} /> */}
      </div>
    </ContentLayout>
    </>
  );
}
