import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import UploadButton from "@/components/datahub/UploadButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getallFiles } from "@/lib/datahub/data";
import { DownloadFileButton} from "@/components/datahub/downloadButton";
import {columns_file } from "@/components/table/FIlesTableColumns";
import { DataTable } from "@/components/table/data-table";
import { getTimeZone } from "@/lib/settings/timezone/data";
import {getTranslations} from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
 
export default async function Home() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const files = await getallFiles();
  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;

  // Use translations from the library namespace
  const t = await getTranslations('library');

  const breadcrumbs = [
    { href: "/reporting/dashboard", text: t('breadcrumb.dashboard') },
    { href: "/datahub/library", text: t('breadcrumb.library') }
  ];

  return (
    <>
      <ContentLayout title={t('title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t('fileUpload')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>

        <p className="font-bold">{t('fileUpload')}</p>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-5 p-5">
        <div className="min-w-full table-auto border-collapse">
          <DataTable columns={columns_file} data={files} filter={'name'} sort={'Created At'}/>
        </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
          <UploadButton />
        </div>
      </ContentLayout>
    </>
  );
}
