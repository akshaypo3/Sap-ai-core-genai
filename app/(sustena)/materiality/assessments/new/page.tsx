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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
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

  const t = await getTranslations('materiality'); // Fetch translations

  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t('assessments.new.Dashboard') },
    { href: "/materiality/dashboard/", text: t('assessments.new.Materiality') },
    { href: "/materiality/assessments", text: t('assessments.new.Assessments') },
    { href: "/materiality/assessments/new", text: t('assessments.new.New') }
  ];

  return (
    <>
      <ContentLayout title={t('assessments.new.title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t('assessments.new.New Assessment')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            {/* <Button variant="outline">{t('buttons.addNew')}</Button> */}
          </div>
        </div>
        {t("assessments.new.Home")}
      </ContentLayout>
    </>
  );
}
