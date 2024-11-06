import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
// } from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsCards from "@/components/dashboard/NewsCards";
import {getTranslations} from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";

export default async function Home() {
  const supabase = createClient();

  let user;
try {
  const {
    data: { user: fetchedUser },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return redirect("/login");
  }
  user = fetchedUser;
} catch (err) {
  return redirect("/login");
}

if (!user) {
  return redirect("/login");
}

  const t = await getTranslations('dashboard');
  // Initialize translations for the dashboard

  const breadcrumbs = [
    { href: "/dashboard", text: t("home") },
  ];
  
  return (
    <ContentLayout title={t("title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title={t("title")} breadcrumbs={breadcrumbs}/>
      </div> 

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("currentReportingYear")} {/* Translated title */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2024</div>
            {/* <p className="text-xs text-muted-foreground">-4 from last year</p> */}
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("materialTopicsIdentified")} {/* Translated title */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">{t("showAssessment")}</p> {/* Translated description */}
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("openDatapoints")} {/* Translated title */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">{t("seeOpenDatapoints")}</p> {/* Translated description */}
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("reportFinished")} {/* Translated title */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71%</div>
            <p className="text-xs text-muted-foreground">{t("continueWork")}</p> {/* Translated description */}
          </CardContent>
        </Card>
      </div>

      <NewsCards userId={user.id} />
    </ContentLayout>
  );
}
