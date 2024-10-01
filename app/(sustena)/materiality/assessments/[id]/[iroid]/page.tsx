import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
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
import { Bar, Line, Pie, Scatter } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import IroFormWrapper from "@/components/materiality/assessments/IroFormWrapper";
//import { Progresstotal } from "@/components/ui/progress-total"
import { Progress } from "@/components/ui/progress"

// import Subheader from "@/components/Subheader";


export default async function Home({ params }: { params: { iroid: string, id:string} }) {
  // const searchParams = useSearchParams();
  // const assessmentid = searchParams.get('id');
  const { id } = params;
  const assessmentData = await getEsrsIrosStats(id);
  const { iroid } = params;
  const percentage=(((assessmentData.material+assessmentData.not_material+assessmentData.under_review)/assessmentData.total_count)*100)

  return (
    <>
      <ContentLayout title="Dashboard">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Materiality</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard/">Assessment</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/materiality/assessments/${iroid}'>$(FY)</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-6">
        <h2 className="text-lg font-semibold">Assessment Progress Overview</h2>
        <div className="flex-1">
            <Progress value={percentage} style={{height: '15px'}}/>
        </div>
    </div>
    <div className="flex space-x-4">
        <Badge variant="outline" className="bg-purple-50">Total IROs: {assessmentData.total_count}</Badge>
        <Badge variant="outline" className="bg-yellow-50">Material: {assessmentData.material}</Badge>
        <Badge variant="outline" className="bg-green-50">Not Material: {assessmentData.not_material}</Badge>
        <Badge variant="outline" className="bg-blue-50">To Be Assessed: {assessmentData.to_be_assessed}</Badge>
        <Badge variant="outline" className="bg-red-50">Under Review: {assessmentData.under_review}</Badge>
    </div>
</div>
      </div>
      {/* <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5"> */}
      <IroFormWrapper id={iroid}/>
      {/* </div> */}
    </ContentLayout>
    </>
  );
}
