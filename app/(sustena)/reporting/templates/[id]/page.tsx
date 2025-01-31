import React from "react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { getTemplates } from "@/lib/templates/data";
import TiptapTemplate from "@/components/reporting/templates/TiptapTemplate";
import { getUsers } from "@/lib/templates/data";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const roleforpage=user.user_metadata.roles || "other"
  

if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
  return redirect("/portal/dashboard")
}
  const t = await getTranslations("reporting.templates");

  const templateContent = await getTemplates();
  const templateMatchedContent = templateContent.find(
    (template) => template.id === id,
  );

  const breadcrumbs = [
    { href: "/reporting/dashboard", text: t("Dashboard") },
    { href: "/reporting/templates", text: t("Templates") },
  ];

  const userNameData = await getUsers(user.id)
  const userName = userNameData?.username || "Unknown User";

  return (
    <>
      <ContentLayout title={t("Templates")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={templateMatchedContent.name}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <TiptapTemplate
          templateId={id}
          templateContent={templateMatchedContent.content}
          userName={userName}
        />
      </ContentLayout>
    </>
  );
}
