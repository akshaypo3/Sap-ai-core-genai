import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { GoodsButtonCBAM } from "@/components/reporting/CBAM/Buttons";

export default async function Home({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const roleforpage = user.user_metadata.roles || "other";

  if (roleforpage === "Stakeholder" || typeof roleforpage === "undefined") {
    return redirect("/portal/dashboard");
  }

  const t = await getTranslations("reporting");

  const breadcrumbs = [
    { href: "/reporting/Dashboard", text: t("CBAM.Dashboard") },
    { href: "/reporting/CBAM", text: t("CBAM.Assessments") },
  ];

  return (
    <>
      <ContentLayout title={t("CBAM.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={t("CBAM.Carbon Border Adjustment Mechanism")}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="p-5 border rounded">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">
              {t("CBAM.Imported Goods Details")}
            </p>
            <GoodsButtonCBAM />
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
