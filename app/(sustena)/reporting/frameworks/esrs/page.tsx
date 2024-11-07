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
import BRSROverview from '@/components/demo/BRSROverview';
import ESRSOverview from '@/components/demo/ESRSOverview';
 
export default async function Page() {
  const t = await getTranslations('reporting');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.esrs.Home") }
  ];
  return (
    <>
    <ContentLayout title={t("frameworks.esrs.title")}>
      <ESRSOverview/>
    </ContentLayout>
    
    </>
  );
};