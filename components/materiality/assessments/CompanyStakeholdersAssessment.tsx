import React from "react";
import { Badge } from "@/components/ui/badge";
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
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CompanyStakeholdersAssessment(id: any) {
  const assessmentId = id.id;
  const stakeholders = await getStakeholders();
  const groups = await getStakeholderGroups()

  console.log("ID ON STAKEHOLDERS PAGE: ", assessmentId);

  const getBadgeProps = (score, isRelevance = false) => {
    if (isRelevance) {
      // Logic for relevance score (1-6)
      if (score >= 1 && score <= 2) {
        return { label: "Low", color: "bg-green-300" };
      } else if (score >= 3 && score <= 4) {
        return { label: "Medium", color: "bg-green-500" };
      } else if (score >= 5 && score <= 6) {
        return { label: "High", color: "bg-green-700" };
      }
    } else {
      // Logic for interest, influence, and knowledge scores (1-3)
      switch (score) {
        case 1:
          return { label: "Low", color: "bg-green-300" };
        case 2:
          return { label: "Medium", color: "bg-green-500" };
        case 3:
          return { label: "High", color: "bg-green-700" };
        default:
          return { label: "Unknown", color: "bg-gray-500" };
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
                  <Badge className={getBadgeProps(item.interest_score).color}>
                    {getBadgeProps(item.interest_score).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getBadgeProps(item.influence_score).color}>
                    {getBadgeProps(item.influence_score).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getBadgeProps(item.relevance_score, true).color}
                  >
                    {getBadgeProps(item.relevance_score, true).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getBadgeProps(item.knowledge_score).color}>
                    {getBadgeProps(item.knowledge_score).label}
                  </Badge>
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
