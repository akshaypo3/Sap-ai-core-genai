import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { ActiveFrameworkAssessmentButton, AnswerButton } from "@/components/reporting/fe_frameworks/Buttons";
import { getFEFramework } from "@/lib/frameworks/data";
import ActiveAssessmentList from "@/components/reporting/fe_frameworks/ActiveAssessmentList";
import { getAssesmentQuestion } from "@/lib/settings/frameworkEditor/data";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;
  const t = await getTranslations("reporting");

  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t("fe_assessments.home") },
    { href: "/reporting/frameworks/", text: t("fe_assessments.frameworks") },
  ];

  const frameworks = await getFEFramework();
  const activeFrameworkData = frameworks?.find(
    (framework) => framework.id === id,
  );
  // const id1="21fcd8ca-d718-41fc-a1eb-c64c340d4a54"
  // const id2="bc7b168c-590f-4fe8-adb2-462c529c0eaf"
  // const id3="ab3f3578-9873-40fe-996f-5f6d5b13cae0"
  // const id4="1c6a9e99-afed-4b85-a995-d4e6855c0998"
  // const id5="3b56c08c-a793-4090-802a-c27d83780ee1"
  const activeFrameworkName = activeFrameworkData.framework_type;
  // const assessemetquestion1 = await getAssesmentQuestion(id1);
  // const assessemetquestion2 = await getAssesmentQuestion(id2);
  // const assessemetquestion3 = await getAssesmentQuestion(id3);
  // const assessemetquestion4 = await getAssesmentQuestion(id4);
  // const assessemetquestion5 = await getAssesmentQuestion(id5);

  return (
    <>
      <ContentLayout title={t("fe_assessments.assessments")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={activeFrameworkName}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="p-5 border rounded">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">{t("fe_assessments.assessments")}</p>
            <ActiveFrameworkAssessmentButton
              framework={activeFrameworkName}
              frameworkId={id}
            />
          </div>
          <ActiveAssessmentList activeFrameworkName={activeFrameworkName} frameworkId={id}/>
        </div>
      </ContentLayout>
    </>
  );
}
