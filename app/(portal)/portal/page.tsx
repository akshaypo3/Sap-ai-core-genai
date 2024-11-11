import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PortalContentLayout } from "@/components/portal-layout/Content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

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

  const t = await getTranslations("main-page");
  const breadcrumbs = [{ href: "/internal/", text: t("Home") }];
  return (
    <PortalContentLayout title={t("title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom
          title={t("Dashboard")}
          breadcrumbs={breadcrumbs}
          backButton={<BackButton />}
        />
      </div>
    </PortalContentLayout>
  );
}
