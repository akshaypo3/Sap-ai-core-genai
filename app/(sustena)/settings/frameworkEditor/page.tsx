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
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import FETable from "@/components/table/table-fe-framework";
import { getFEFramework } from "@/lib/frameworks/data";
import { AddFrameworkEditorButton } from "@/components/settings/frameworkEditor/Buttons";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations("settings");
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworkEditor.Home") },
  ];
  
  const userId = user.id;
  const receivedData = await getFEFramework();

  return (
    <>
      <ContentLayout title={t("frameworkEditor.maintitle")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={t("frameworkEditor.title")}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="mb-8 p-4 items-center bg-white dark:bg-neutral-950 rounded-md border">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
          <h3 className="text-xl font-semibold">Framework</h3>
          <AddFrameworkEditorButton userId={userId}/>
          </div>
          <div className="min-w-full pt-2 table-auto border-collapse">
          <FETable frameworksData={receivedData} userId={userId}/>
        </div>
        <div className="min-w-full table-auto border-collapse p-10">
        <FETable frameworksData={receivedData}/>
        </div>
      </ContentLayout>
    </>
  );
}
