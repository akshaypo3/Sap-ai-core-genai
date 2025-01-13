import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash, Trash2,Pencil } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { getStakeholders, getStakeholderGroups } from "@/lib/stakeholders/data"
import { StakeholderSurveyEditButton } from "@/components/materiality/stakeholdersurvey/buttons";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";


export default async function Home() {
  const supabase = await createClient();
  const stakeholders = await getStakeholders();
  const stakeholderGroups = await getStakeholderGroups();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("stakeholderssurvey./login");
  }

  const t = await getTranslations('materiality');
  const breadcrumbs = [
    { href: "/materiality/dashboard/", text: t("stakeholderssurvey.dashboard") },
    { href: "/materiality/dashboard/", text: t("stakeholderssurvey.materiality") },
    { href: "/materiality/stakeholders", text: t("stakeholderssurvey.stakeholderSurvey") }
  ];

  return (
    <>
      <ContentLayout title={t("stakeholderssurvey.pageTitle")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
      <BreadCrumbCom title={t("stakeholderssurvey.stakeholderSurvey")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        {/* <div className="flex space-x-4">
          Button Section for Subheader
          <Button variant="outline">Add new</Button>
        </div> */}
      </div>


      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              {t("stakeholderssurvey.identifiedStakeholders")}
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
              {t("stakeholderssurvey.-4 from last year")}
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              {t("stakeholderssurvey.stakeholderGroupsEngaged")}
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
              {t("stakeholderssurvey.-1 from last year")}
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("stakeholderssurvey.surveyCompletionRate")}</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">
                {t("stakeholderssurvey.-100% from last year")}
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"> {t("stakeholderssurvey.openAnswers")}</CardTitle>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <h1 className="font-bold p-3">{t("stakeholderssurvey.identifiedStakeholders")}</h1>
      <Table>
      <TableCaption>{t("stakeholderssurvey.stakeholdersList")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("stakeholderssurvey.name")}</TableHead>
                <TableHead>{t("stakeholderssurvey.description")}</TableHead>
                <TableHead>{t("stakeholderssurvey.group")}</TableHead>
                <TableHead>{t("stakeholderssurvey.questions")}</TableHead>
                <TableHead>{t("stakeholderssurvey.answers")}</TableHead>
                <TableHead>{t("stakeholderssurvey.completed")}</TableHead>
                <TableHead>{t("stakeholderssurvey.actions")}</TableHead>
              </TableRow>
            </TableHeader>
        <TableBody>
          {stakeholders?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {Array.isArray(item.stakeholder_groups) ? item.stakeholder_groups[0].group : item.stakeholder_groups.group}
              </TableCell>
              <TableCell className="font-medium">3</TableCell>
              <TableCell className="font-medium">0</TableCell>
              <TableCell><Badge className="bg-red-200 text-red-700 hover:bg-red-200">0%</Badge></TableCell>
              <TableCell>
                <StakeholderSurveyEditButton/>
              </TableCell>
              {/* <TableCell><Badge variant="secondary">Started</Badge></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </ContentLayout>
    </>
  );
}
