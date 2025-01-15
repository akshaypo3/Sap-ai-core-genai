import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

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
        hi
      </ContentLayout>
    </>
  );
}
