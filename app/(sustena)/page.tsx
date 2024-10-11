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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SustainabilityGoals from "@/components/dashboard/SustainabilityGoals";
import NewsCards from "@/components/dashboard/NewsCards";
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const supabase = createClient();

  let user;
try {
  const {
    data: { user: fetchedUser },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return redirect("/login");
  }
  user = fetchedUser;
} catch (err) {
  console.error("Unexpected error fetching user:", err);
  return redirect("/login");
}

if (!user) {
  return redirect("/login");
}

  const t = await getTranslations('main-page');

  return (
    <>
      <ContentLayout title={t("title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">{t("Dashboard")}</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/internal/">{t("Home")}</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> <*/}
        </div>
        
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Current Reporting Year")}
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t("2024")}</div>
              {/* <p className="text-xs text-muted-foreground">
                -4 from last year
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Material Topics identified")}
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17{t("title")}</div>
              <p className="text-xs text-muted-foreground">
                {t("Show assessment")}
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("Open Datapoints")}</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t("34")}</div>
              <p className="text-xs text-muted-foreground">
                {t("See open datapoints")}
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("Report finished")}</CardTitle>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t("71%")}</div>
              <p className="text-xs text-muted-foreground">
                {t("Continue work")}
              </p>
            </CardContent>
          </Card>
        </div>
        <NewsCards/>
    </ContentLayout>
    </>
  );
}


