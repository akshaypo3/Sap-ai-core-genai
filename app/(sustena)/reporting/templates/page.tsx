import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { AddTemplateButton } from "@/components/reporting/templates/AddTemplateButton";

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
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
                  <h3 className="text-xl font-semibold">{t("templates.Templates")}</h3>
                    <AddTemplateButton />
                </div>
      </ContentLayout>
    </>
  );
}
