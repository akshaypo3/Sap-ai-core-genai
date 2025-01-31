import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import StandardsOverview from "@/components/reporting/frameworks/demo/standardsOverview";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from '@/components/BredCrumb';

import BRSROverview from '@/components/demo/BRSROverview';
import ESRSOverview from '@/components/demo/ESRSOverview';

import { BackButton, ContinueButton } from '@/components/BredCrumbButtons';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { userrolecheck } from '@/lib/settings/users/action';
 
export default async function Page() {
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
  const t = await getTranslations('reporting');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.esrs.Home") }
  ];

  const contineButton = [
    { href: "/reporting/frameworks/esrs/esrss1/s1-44", text: t("frameworks.esrs.continue") }
  ];
  return (
    <>
    <ContentLayout title="Materiality Assessments">

      <ESRSOverview/>


      {/* <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">

      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">

        <BreadCrumbCom title={t("frameworks.esrs.Materiality Dashboard")} breadcrumbs={breadcrumbs} backButton={<BackButton/>} contineButton={<ContinueButton contineButton={contineButton}/>}/>
   
      </div> */}
      {/* <StandardsOverview/> */}

    </ContentLayout>
    
    </>
  );
};