import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import FrameworkCardsMateriality from "@/components/materiality/dashboard/FrameworkCardsMateriality";
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations('materiality'); // Fetch translations

  return (
    <>
      <ContentLayout title={t('dashboard.title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{t('dashboard.dashboard.title')}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/">{t('dashboard.breadcrumbs.home')}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            {/* <Button variant="outline">addNew</Button> */}
          </div>
        </div>
        <FrameworkCardsMateriality />
      </ContentLayout>
    </>
  );
}
