import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { ActiveFrameworkAssessmentButton } from "@/components/reporting/fe_frameworks/Buttons";
import { getFEFramework } from "@/lib/frameworks/data";
import ActiveAssessmentList from "@/components/reporting/fe_frameworks/ActiveAssessmentList";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  const t = await getTranslations("reporting");

  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t("fe_assessments.home") },
    { href: "/reporting/frameworks/", text: t("fe_assessments.frameworks") },
  ];

  const frameworks = await getFEFramework();
  const activeFrameworkData = frameworks?.find(
    (framework) => framework.id === id,
  );
  const activeFrameworkName = activeFrameworkData.framework_type;

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
            <p className="text-xl font-semibold">Assessments</p>
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
