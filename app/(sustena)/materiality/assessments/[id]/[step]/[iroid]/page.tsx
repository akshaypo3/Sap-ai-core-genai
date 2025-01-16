import React from "react";
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
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEsrsIrosStats } from "@/lib/assessments/data";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IroFormWrapper from "@/components/materiality/assessments/IroFormWrapper";
import { Progress } from "@/components/ui/progress";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Home({ params }: { params: { iroid: string, id: string } }) {
  // const { id } = params;
  const { id, iroid } = await params;
  const assessmentData = await getEsrsIrosStats(id);
  // const { iroid } = params;
 
  const percentage = (((assessmentData.material + assessmentData.not_material + assessmentData.under_review) / assessmentData.total_count) * 100);

  const t = await getTranslations('materiality'); // Fetch translations
  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t('assessments.iroid.Assessment') },
    // { href: `/materiality/assessments/${iroid}`, text: t('assessments.iroid.$(FY)') }
  ];

  return (
    <>
      <ContentLayout title={t('assessments.iroid.Dashboard')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          {/* <BreadCrumbCom title={t('assessments.iroid.Materiality')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/> */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-6">
              <h2 className="text-lg font-semibold">{t('assessments.iroid.Assessment Progress Overview')}</h2>
              <div className="flex-1">
                <Progress value={percentage} style={{ height: '15px' }} />
              </div>
            </div>
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-purple-50">{t('assessments.iroid.Total IROs:')}: {assessmentData.total_count}</Badge>
              <Badge variant="outline" className="bg-yellow-50">{t('assessments.iroid.Material:')}: {assessmentData.material}</Badge>
              <Badge variant="outline" className="bg-green-50">{t('assessments.iroid.Not Material:')}: {assessmentData.not_material}</Badge>
              <Badge variant="outline" className="bg-blue-50">{t('assessments.iroid.To Be Assessed:')}: {assessmentData.to_be_assessed}</Badge>
              <Badge variant="outline" className="bg-red-50">{t('assessments.iroid.Under Review:')}: {assessmentData.under_review}</Badge>
            </div>
          </div>
        </div>
        <IroFormWrapper id={iroid} />
      </ContentLayout>
    </>
  );
}
