import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import DatapointsTableS1 from "@/components/reporting/frameworks/demo/datapointsTableS1";
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
import { getTranslations } from 'next-intl/server'; // Ensure this is used for server-side translations
import { BreadCrumbCom } from '@/components/BredCrumb';
import { BackButton } from '@/components/BredCrumbButtons';
import BRSROverview from '@/components/demo/BRSROverview';
import ESRSOverview from '@/components/demo/ESRSOverview';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { userrolecheck } from '@/lib/settings/users/action';

export default async function Page({ params }) {
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
  const t = await getTranslations('reporting');// Server-side translation

  // Define breadcrumbs
  const breadcrumbs = [
    { href: "/dashboard/", text: "Home" }
  ];
 const contineButton = [
    { href: "/reporting/frameworks/esrs/esrss1/s1-44", text: t("frameworks.esrs.continue") }
  ];
  return (
    <ContentLayout title="ESRS ">
    {/* <div className="bg-white p-5 border rounded"> */}
       <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title="ERSR" breadcrumbs={breadcrumbs} backButton={<BackButton/>} />
   
      </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Link href="/reporting/frameworks/esrs/esrss1/s1-44">
            <Button className="bg-green-500 hover:bg-green-600 text-white hover:text-white">
              {t("frameworks.esrs.continue")}
            </Button>
          </Link> */}
      </div>
      <StandardsOverview />
      {/* <DatapointsTableS1 /> */}
    {/* </div> */}
    </ContentLayout>
  );
}
