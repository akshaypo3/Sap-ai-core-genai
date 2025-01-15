import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { AddTemplateButton } from "@/components/reporting/templates/AddTemplateButton";
import { DataTable } from "@/components/table/data-table";
import { TemplatesTable } from "@/components/table/templatesTable";
import { getTemplates } from "@/lib/templates/data";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations("reporting");
  const breadcrumbs = [
    { href: "/dashboard", text: t("templates.Dashboard") },
    { href: "/reporting/dashboard", text: t("templates.Reporting") },
  ];

  const templates = await getTemplates();
  return (
    <>
      <ContentLayout title={t("templates.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={t("templates.Templates")}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800 rounded-t-md">
          <h3 className="text-xl font-semibold">{t("templates.Templates")}</h3>
          <div className="flex justify-end mt-4">
            <AddTemplateButton />
          </div>
        </div>

        <div className="min-w-full pt-2 table-auto border-collapse">
          <DataTable
            columns={TemplatesTable}
            data={templates}
            filter={"name"}
            sort={"Category"}
          />
        </div>
      </ContentLayout>
    </>
  );
}
