import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from 'next-intl/server';
import CdpAssessmentStepsOverview from "@/components/reporting/frameworks/cdp/CdpAssessmentSteps";
import CdpIntroductionStep from "@/components/reporting/frameworks/cdp/CdpIntroductionStep";
import CdpIdentificationStep from "@/components/reporting/frameworks/cdp/CdpIdentificationStep";
import { redirect } from "next/navigation";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home({ params }: { params: { step: string; id: string } }) {
  const { step, id } = await params;
  const t = await getTranslations('materiality'); 
  const stepNumber = parseInt(step, 10);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!user) {
    return redirect("/login");
  }
  const roleforpage=user.user_metadata.roles || "other"
  

if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
  return redirect("/portal/dashboard")
}
  const renderStepContent = () => {
    switch (stepNumber) {
      case 1:
        return <CdpIntroductionStep id={id}/>;
      case 2:
        return <CdpIdentificationStep id={id}/>;
      default:
        return <div>{t("assessments.iroid.Invalid Step")}</div>;
    }
  };

  return (
    <ContentLayout title={t('assessments.iroid.Dashboard')}>
      <CdpAssessmentStepsOverview id={id} step={step} />
      {renderStepContent()}
    </ContentLayout>
  );
}