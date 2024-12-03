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
import FrameworkCards from "@/components/reporting/frameworks/FrameworkCards";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import ActiveFramewrokCards from "@/components/reporting/fe_frameworks/ActiveFrameCards";
import { getFEFramework } from "@/lib/frameworks/data";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations('reporting');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.Home") }
  ];

  const frameworks = await getFEFramework()
  const activeFrameworks = frameworks?.filter((framework) => framework.status === "active")
  
  return (
    <>
      <ContentLayout title={t("frameworks.title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom title={t("frameworks.title")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        {/* <div className="flex space-x-4">
          Button Section for Subheader
          <Button variant="outline">Add new</Button> 
        </div> */}
      </div>
        <FrameworkCards/>
        <ActiveFramewrokCards activeFrameworks={activeFrameworks}/>
    </ContentLayout>
    </>
  );
}


