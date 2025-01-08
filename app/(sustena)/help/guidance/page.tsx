import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTranslations } from "next-intl/server"; // Updated import
import { Slash } from "lucide-react";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import CardBRSR from "@/components/guidance/CardBRSR";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Use getTranslations to fetch translations
  const t = await getTranslations("guidance");
  const breadcrumbs = [
    { href: "/dashboard/", text: t("breadcrumb.dashboard") },
    { href: "/help/guidance", text: t("breadcrumb.help") },
    { href: "/help/guidance", text: t("breadcrumb.guidance") },
  ];

  return (
    <>
      <ContentLayout title={t("title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={t("title")}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">Add new</Button>
          </div> */}
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-lg">{t("Frameworks Guidance")}</h1>
        </div>
        <CardBRSR/>
      </ContentLayout>
    </>
  );
}
