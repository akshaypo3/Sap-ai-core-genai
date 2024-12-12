import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { Button } from "@/components/ui/button";
import { getAssessmentQuestionsById } from "@/lib/frameworks/data";
import AssessmentQuestionsTable from "@/components/table/AssessmentQuestionTable";
import { idText } from "typescript";
import { Label } from "@/components/ui/label";

export default async function Home({ params }: { params: { assessmentId: string, id: string } }) {
  const { assessmentId } = params;
  const { id } = params;

  const t = await getTranslations("reporting");

  const breadcrumbs = [
    { href: "/dashboard", text: t("fe_assessments.home") },
    { href: "/reporting/frameworks", text: t("fe_assessments.frameworks") },
    { href: `/reporting/frameworks/${id}`, text: t("fe_assessments.assessments") },
  ];

  const questions = await getAssessmentQuestionsById(assessmentId)
  const answeredCount = questions.filter(question => question.answered === true).length;
  const unansweredCount = questions.filter(question => question.answered === false).length;
  
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
        <Label className="mb-3">{t("fe_assessments.Statistics")}</Label>
          <div className="p-10 mb-10 flex justify-between gap-8 bg-white dark:bg-neutral-950 rounded-md border">
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("fe_assessments.totalquestion")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">{questions?.length}</p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("fe_assessments.totalquestionans")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">{answeredCount}</p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("fe_assessments.totalquestionunans")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">{unansweredCount}</p>
              </div>
            </div>
          </div>
        <div className="p-5 border rounded">
            <p className="text-xl font-semibold mb-10">Questions</p>
         <AssessmentQuestionsTable questionData={questions} FrameworkID={id} AssessmentID={assessmentId}/>
        </div>
      </ContentLayout>
    </>
  );
}
