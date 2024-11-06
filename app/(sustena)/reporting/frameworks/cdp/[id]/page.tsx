import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import CdpAssessmentStepsOverview from "@/components/reporting/frameworks/cdp/CdpAssessmentSteps";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  const t = await getTranslations("materiality");

  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t("assessments.id.name") },
    { href: "/materiality/dashboard/", text: t("assessments.id.date") },
  ];

  return (
    <>
      <ContentLayout title={t("assessments.id.dashboard")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={t("assessments.id.title")}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>

        <CdpAssessmentStepsOverview />
      </ContentLayout>
    </>
  );
}
