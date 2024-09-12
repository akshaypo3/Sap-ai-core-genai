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
import { getAssessmentDataforchart } from "@/lib/assessments/data";
import { Slash } from "lucide-react";
import IroTable from "@/components/materiality/assessments/IroTable";
import IroScatterchartclient from "@/components/materiality/assessments/IroScatterchartclient";
import IroBarchart from "@/components/materiality/assessments/IroBarchart";
export default function Home({ params }: { params: { id: string } }) {

  const { id } = params;
  console.log("Id: "+id);
  const AssessmentData =  getAssessmentDataforchart(id);

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
                    <BreadcrumbLink href="/materiality/dashboard">2024</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
        </div>
      </div>
      <div className="bg-white p-5 border rounded">
      <h1>Assessment Score Distribution Chart</h1>
      </div>
      <div>
      <IroScatterchartclient data={AssessmentData}/>
      </div>
      <div>
      <IroBarchart data={AssessmentData}/>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <IroTable id={id}/>
      </div>
    </ContentLayout>
    </>
  );
}
