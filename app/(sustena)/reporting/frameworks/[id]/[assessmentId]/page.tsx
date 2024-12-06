import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { Button } from "@/components/ui/button";
import { getAssessmentQuestionsById } from "@/lib/frameworks/data";
import AssessmentQuestionsTable from "@/components/table/AssessmentQuestionTable";
import { idText } from "typescript";

export default async function Home({ params }: { params: { assessmentId: string, id: string } }) {
  const { assessmentId } = params;
  const { id } = params;

  const t = await getTranslations("reporting");

  const breadcrumbs = [
    { href: "/materiality/dashboard", text: t("fe_assessments.home") },
    { href: "/reporting/frameworks", text: t("fe_assessments.frameworks") },
    { href: `/reporting/frameworks/${id}`, text: t("fe_assessments.assessments") },
  ];

  const questions = await getAssessmentQuestionsById(assessmentId)
  
  return (
    <>
      <ContentLayout title="Questions">
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={questions?.[0]?.fe_assessments?.name || "Assessment"}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="p-5 border rounded">
            <p className="text-xl font-semibold mb-10">Questions</p>
         <AssessmentQuestionsTable questionData={questions} FrameworkID={id} AssessmentID={assessmentId}/>
        </div>
      </ContentLayout>
    </>
  );
}
