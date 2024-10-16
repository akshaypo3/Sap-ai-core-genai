import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash, Trash2, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Subheader from "@/components/Subheader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStakeholders, getStakeholderGroups } from "@/lib/stakeholders/data";
import {
  AddStakeholderButton,
  AddStakeholderGroupButton,
  DeleteStakeholderButton,
} from "@/components/materiality/stakeholders/buttons";
import StakeholderMatrix from "@/components/materiality/stakeholders/StakeholderMatrix";
import { getTranslations } from "next-intl/server";
import StakeholderStatisticCards from "@/components/materiality/assessments/StakeholderStatisticCards";

export default async function Home() {
  const supabase = createClient();

  const stakeholders = await getStakeholders();
  const stakeholderGroups = await getStakeholderGroups();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("stakeholders./login");
  }

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
      <ContentLayout title={t("stakeholders.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">
              {t("stakeholders.stakeholder_analysis")}
            </h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/dashboard/">
                    {t("stakeholders.dashboard")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/dashboard">
                    {t("stakeholders.materiality")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/stakeholders">
                    {t("stakeholders.stakeholders")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            {/* <AddStakeholderButton/> */}
            {/* <Button>Group Editor</Button> */}
          </div>
        </div>
        <StakeholderStatisticCards/>


        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          <AddStakeholderButton />
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
                    <Badge
                      className={getBadgeProps(item.influence_score).color}
                    >
                      {getBadgeProps(item.influence_score).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        getBadgeProps(item.relevance_score, true).color
                      }
                    >
                      {getBadgeProps(item.relevance_score, true).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getBadgeProps(item.knowledge_score).color}
                    >
                      {getBadgeProps(item.knowledge_score).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DeleteStakeholderButton stakeholder={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          {/* <Button className="bg-green-600 mb-5">Add Group</Button> */}
          <AddStakeholderGroupButton />
          <Table>
            <TableCaption>{t("stakeholders.stakeholder_groups")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("stakeholders.name")}</TableHead>
                <TableHead>{t("stakeholders.description")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stakeholderGroups?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.group}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <StakeholderMatrix />
      </ContentLayout>
    </>
  );
}
