import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStakeholders } from "@/lib/stakeholders/data";
import { getStakeholderGroups } from "@/lib/stakeholders/data";
import {
  AddStakeholderButton,
  AddUserButton,
  DeleteStakeholderButton,
} from "@/components/materiality/stakeholders/buttons";
import { getTranslations } from "next-intl/server";
import NextStepButton from "@/components/materiality/assessments/NextStepButton";
import { ChevronDown, ChevronUp, Equal, UserIcon } from "lucide-react";

export default async function CompanyStakeholdersAssessment(id: any) {
  const assessmentId = id.id;
  const stakeholders = await getStakeholders();
  const groups = await getStakeholderGroups()

  console.log("ID ON STAKEHOLDERS PAGE: ", assessmentId);

  const getBadgeProps = (score, isRelevance = false) => {
    if (isRelevance) {
      // Logic for relevance score (1-6)
      if (score >= 1 && score <= 2) {
        return {icon:<ChevronDown />, alt: "Low" };
      } else if (score >= 3 && score <= 4) {
        return { icon:<Equal />, alt: "Medium" };
      } else if (score >= 5 && score <= 6) {
        return { icon:<ChevronUp />, alt: "High" };
      }
    } else {
      // Logic for interest, influence, and knowledge scores (1-3)
      switch (score) {
        case 1:
          return { icon:<ChevronDown />, alt: "Low" };
        case 2:
          return { icon:<Equal />, alt: "Medium" };
        case 3:
          return { icon:<ChevronUp />, alt: "High" };
        default:
          return { imgSrc: "/images/unknown.png", alt: "Unknown" };
      }
    }
  };

  const t = await getTranslations("materiality");

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">Stakeholders</h3>
          <div>
            <AddStakeholderButton id={assessmentId} stakeholderGroups={groups}/>
            <NextStepButton id={assessmentId} step={"5"} />
          </div>
        </div>
        <Table>
          <TableCaption>{t("stakeholders.stakeholders_list")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t("stakeholders.name")}</TableHead>
              <TableHead>{t("stakeholders.description")}</TableHead>
              <TableHead>{t("stakeholders.group")}</TableHead>
              <TableHead>{t("stakeholders.interest")}</TableHead>
              <TableHead>{t("stakeholders.influence")}</TableHead>
              <TableHead>{t("stakeholders.relevance")}</TableHead>
              <TableHead>{t("stakeholders.knowledge")}</TableHead>
              <TableHead>{t("stakeholders.actions")}</TableHead>
              <TableHead className="text-center">User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stakeholders?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {Array.isArray(item.stakeholder_groups)
                    ? item.stakeholder_groups[0].group
                    : item.stakeholder_groups.group}
                </TableCell>
                <TableCell>
                  {getBadgeProps(item.interest_score).icon}                 
                </TableCell>
                <TableCell>
                  {getBadgeProps(item.influence_score).icon}
                </TableCell>
                <TableCell>
                  {getBadgeProps(item.relevance_score, true).icon}                  
                </TableCell>
                <TableCell>
                  {getBadgeProps(item.knowledge_score).icon}                  
                </TableCell>
                <TableCell>
                  <DeleteStakeholderButton stakeholder={item} assessmentId={assessmentId}/>
                </TableCell>
                <TableCell className="text-center">
                  {item.email === null ? (
                    <AddUserButton
                      stakeholderName={item.name}
                      assessmentId={assessmentId}
                      stakeHolderId={item.id}
                    />
                  ) : (
                    <UserIcon className="w-6 h-6 mx-auto"/>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
