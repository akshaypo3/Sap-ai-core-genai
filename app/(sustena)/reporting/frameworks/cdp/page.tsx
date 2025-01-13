import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from 'next-intl/server';
import { getCdpAssessments } from "@/lib/frameworks/data";
import { CdpAssessmentsActionsMenu } from "@/components/reporting/frameworks/cdp/CdpAssessmentsActionsMenu";
import { AddCdpAssessmentButton } from "@/components/reporting/frameworks/cdp/Buttons";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const assessments = await getCdpAssessments();
  
  const t = await getTranslations('reporting');

  // const breadcrumbs = [
  //   { href: "/dashboard/", text: t("frameworks.cdp.Home") }
  // ];

  return (
    <ContentLayout title={t("frameworks.cdp.title")}>
      {/* <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title={t("frameworks.cdp.CDP")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
      </div> */}
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-top">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">{t('frameworks.cdp.Title')}</h3>
          </div>
          <div className="mt-3">
            <AddCdpAssessmentButton/>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead >{t('frameworks.cdp.Fiscal Year')}</TableHead>
              <TableHead>{t('frameworks.cdp.Total Data Points')}</TableHead>
              <TableHead>{t('frameworks.cdp.Completed')}</TableHead>
              <TableHead>{t('frameworks.cdp.Under Review')}</TableHead>
              <TableHead>{t('frameworks.cdp.To Be Assessed')}</TableHead>
              <TableHead className="flex justify-center items-center">{t('frameworks.cdp.Action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.fyear}</TableCell>
                <TableCell className="font-medium">{item.total_data_points}</TableCell>
                <TableCell>{item.completed}</TableCell>
                <TableCell>{item.under_review}</TableCell>
                <TableCell>{item.to_be_assessed}</TableCell>
                <TableCell className="flex justify-center">
                    <CdpAssessmentsActionsMenu id={item.id} step={item.step}/>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}