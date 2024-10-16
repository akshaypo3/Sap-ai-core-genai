import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from 'next-intl/server';
import AssessmentStepsOverview from "@/components/materiality/assessments/AssessmentStepsOverview";
import CompanyDetails from "@/components/materiality/assessments/CompanyDetailsAssessment";
import CompanyLocations from "@/components/materiality/assessments/CompanyLocationsAssessment";
import CompanyProductsAndServices from "@/components/materiality/assessments/CompanyProductsAndServicesAssessment";
import StakeholderStatisticCards from "@/components/materiality/assessments/StakeholderStatisticCards";
import CompanyStakeholdersAssessment from "@/components/materiality/assessments/CompanyStakeholdersAssessment";
import IroTable from "@/components/materiality/assessments/IroTable";
import { getAssessmentData } from "@/lib/assessments/data";
import SignOffComponent from "@/components/materiality/assessments/SignOffComponent";

export default async function Home({ params }: { params: { step: string; id: string } }) {
  const { step, id } = params;
  const t = await getTranslations('materiality'); 
  const stepNumber = parseInt(step, 10);
  const assessmentData = await getAssessmentData(id);


  const renderStepContent = () => {
    switch (stepNumber) {
      case 1:
        return <CompanyDetails id={id}/>;
      case 2:
        return <CompanyLocations id={id}/>;
      case 3:
        return <CompanyProductsAndServices id={id}/>;
      case 4:
        return  <div>
                    <StakeholderStatisticCards/>
                    <CompanyStakeholdersAssessment id={id}/>
                </div>;
      case 5:
        return <div><IroTable assessmentData={assessmentData} assessmentId={id} /></div>;
      case 6:
        return <div><SignOffComponent/></div>;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <ContentLayout title={t('assessments.iroid.Dashboard')}>
      <AssessmentStepsOverview id={id} step={step} />
      {renderStepContent()}
    </ContentLayout>
  );
}