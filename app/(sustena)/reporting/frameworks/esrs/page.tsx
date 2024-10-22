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
import { BackButton } from '@/components/BredCrumbButtons';
 
export default async function Page() {
  const t = await getTranslations('reporting');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.esrs.Home") }
  ];
  return (
    <>
    <ContentLayout title={t("esrs.title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title={t("frameworks.esrs.Materiality Dashboard")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          <Link href="/reporting/frameworks/esrs/esrss1/s1-44">
           <Button className="bg-green-500 hover:bg-green-600 text-white hover:text-white">{t("frameworks.esrs.continue")}</Button>
          </Link>
        </div>
        
      </div>
      <StandardsOverview/>
    </ContentLayout>
    
    </>
  );
};