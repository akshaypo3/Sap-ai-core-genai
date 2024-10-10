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
import { getAssessmentData, getAssessmentDataforchart ,getEsrsIrosStatscount} from "@/lib/assessments/data";
import { Slash } from "lucide-react";
import IroTable from "@/components/materiality/assessments/IroTable";
import IroScatterchartclient from "@/components/materiality/assessments/IroScatterchartclient";
import IroBarchart from "@/components/materiality/assessments/IroBarchart";
import ReusableBarChart, { ReusableBarChartProps } from "@/components/charts/ReusableBarChart";
import ReusableScatteredChart, { ReusableScatteredChartProps } from "@/components/charts/ReusableScatterChart";
import ReusablePieChart, { ReusablePieChartProps } from "@/components/charts/ReusablePieChart";
import ReusablewithlabelPieChart, { ReusablePieChartwithlabelProps } from "@/components/charts/ReusablePieChartwithlabel";
import ReusablePieChartdonut, { ReusablePieChartdonutProps } from "@/components/charts/ReusablePieChartdonut";
import ReusableLineChart, { ReusableLineChartProps } from "@/components/charts/ReusableLineChart";
import ReusableLineChartInteractive, { ReusableLineChartInteractiveProps } from "@/components/charts/ReusableLineChartInteractive";
import ReusableBarChartInteractive, { ReusableBarChartInteractiveProps } from "@/components/charts/ReusableBarChartInteractive";
import { 
  assessmentData, 
  assessmentChartConfig,
  ScattaredassessmentChartConfig,
  PieassessmentChartConfig,
  InteactiveChartConfig
} from '@/components/charts/ChartData';
import { Chart } from "chart.js";
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: { id: string } }) {

  const { id } = params;
  const AssessmentData = await getAssessmentDataforchart(id);
  const assessmentData = await getAssessmentData(id);

  const AssessmentData1 =  await getAssessmentDataforchart(id);
  const AssessmentData2 = await getEsrsIrosStatscount(id);

  const t = await getTranslations('materiality');
  //  const AssesmentbarChartProps: ReusableBarChartProps = {
  //    data: AssessmentData1,
  //   config: assessmentChartConfig,
  //   title: "Bar Assessment Data",
  //   description: "Assessment is the systematic basis for making inferences about the learning and development",
  //   dataKey: "impact_score",
  //  xAxisKey: "code"
  // };
  
  const AssesmentScatteredChart: ReusableScatteredChartProps = {
    data: AssessmentData1,
    config: ScattaredassessmentChartConfig,
    title: t('assessments.id.title2'), 
    description: t('assessments.id.description2'), 
    x_dataKey: t('assessments.id.xDataKey2'), 
    y_dataKey: t('assessments.id.yDataKey2') 
  };

  // const AssesmentScatteredChart: ReusableScatteredChartProps = {
  //   data: AssessmentData1,
  //   config: ScattaredassessmentChartConfig,
  //    title: "Materiality Matrix",
  //    description: "Chart to see which topics are more material then others",
  //   x_dataKey: "impact_score",
  //   y_dataKey: "financial_score"
  // };

  // const AssesmentPieChart: ReusablePieChartProps = {
  //   data: AssessmentData1,
  //   config: PieassessmentChartConfig,
  //   title: "Pie Assessment Data",
  //   description: "Assessment is the systematic basis for making inferences about the learning and development",
  //   dataKey: "impact_score"
  // };

  //  const AssesmentPieChartwithlabel: ReusablePieChartwithlabelProps = {
  //    data: AssessmentData1,
  //    config: PieassessmentChartConfig,
  //    title: "Pie Assessment Data with label",
  //    description: "Assessment is the systematic basis for making inferences about the learning and development",
  //    dataKey: "impact_score"
  //  };

  // const AssesmentPieChartdonut: ReusablePieChartdonutProps = {
  //    data: AssessmentData2,
  //    config: PieassessmentChartConfig,
  //    title: "Pie Assessment Data",
  //    description: "Assessment is the systematic basis for making inferences about the learning and development",
  //    dataKey: "impact_score"
  //  };

   const AssesmentPieChartdonut1: ReusablePieChartdonutProps = {
    data: AssessmentData2,
    config: PieassessmentChartConfig,
    title: t('assessments.id.title1'),
    description: t('assessments.id.description1'),
    dataKey: t('assessments.id.xDataKey1'),
    xAxisKey: t('assessments.id.yDataKey2')
  };

  // const AssesmentLineChart: ReusableLineChartProps = {
  //   data: AssessmentData1,
  //   config: assessmentChartConfig,
  //   title: "Line Assessment Data",
  //   description: "Assessment is the systematic basis for making inferences about the learning and development",
  //   dataKey: "impact_score",
  //   xAxisKey: "code"
  // };

  // const AssesmentLineChartInteractive: ReusableLineChartInteractiveProps = {
  //   data: AssessmentData1,
  //   config: InteactiveChartConfig,
  //   title: "Line Assessment Data",
  //   description: "Assessment is the systematic basis for making inferences about the learning and development",
  //   fy_dataKey: "impact_score",
  //   sy_dataKey: "financial_score",
  //   xAxisKey: "code"
  // };

  // const AssesmentBarChartInteractive: ReusableBarChartInteractiveProps = {
  //   data: AssessmentData1,
  //   config: InteactiveChartConfig,
  //   title: "Bar Assessment Data",
  //   description: "Assessment is the systematic basis for making inferences about the learning and development",
  //   fy_dataKey: "impact_score",
  //   sy_dataKey: "financial_score",
  //   xAxisKey: "code"
  // };


  return (
    <>
      <ContentLayout title={t('assessments.id.dashboard')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{t('assessments.id.title')}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/dashboard/">{t('assessments.id.name')}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/dashboard">{t('assessments.id.date')}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

      {/* <div className="bg-white p-5 border rounded">
      <h1>Assessment Score Distribution Chart</h1>

      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusableBarChart {...AssesmentbarChartProps} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusableScatteredChart {...AssesmentScatteredChart} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusablePieChart {...AssesmentPieChart} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusablewithlabelPieChart {...AssesmentPieChartwithlabel} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusablePieChartdonut {...AssesmentPieChartdonut} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusableLineChart {...AssesmentLineChart} />

      </div>
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusableLineChartInteractive {...AssesmentLineChartInteractive} />
      </div>

      <div>
      <IroBarchart data={AssessmentData}/>
      </div> */}

        {/*
      <div className="bg-white dark:bg-neutral-950 mt-8 p-1">
      <ReusableBarChartInteractive {...AssesmentBarChartInteractive} />
      </div> */}
  <div className="flex flex-wrap justify-between">
<div className="flex flex-col w-full md:w-2/5 p-2">
<div className="flex-1 flex items-center justify-center bg-white dark:bg-neutral-950" style={{ height: '350px' }}>
<ReusablePieChartdonut {...AssesmentPieChartdonut1}/>
</div>
{/* <div className="mt-2 bg-white dark:bg-neutral-950 rounded-md border flex items-center justify-center" style={{ height: '250px' }}>
"PlaceHolder"
</div> */}
</div>
<div className="flex-1 w-full md:w-3/5 p-2">
<div className="flex-1 flex items-center justify-center bg-white dark:bg-neutral-950" style={{ height: '650px' }}>
<ReusableScatteredChart {...AssesmentScatteredChart} />
</div>
</div>
</div>
 
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <IroTable assessmentData={assessmentData} assessmentId={id} />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <IroTable assessmentData={assessmentData} assessmentId={id} />
      </div>
    </ContentLayout>
    </>
  );
}
