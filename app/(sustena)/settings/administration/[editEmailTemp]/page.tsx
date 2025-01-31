
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getSmtpSettings } from "@/lib/settings/smtp/data";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { changeTimezone } from "@/lib/settings/timezone/action";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import UpdateEmailTemp from "@/components/settings/emailTemp/UpdateEmailTemp";
import { fetchEmailTemplates } from '@/lib/settings/emailtemplates/action';
import { getTranslations } from 'next-intl/server';
import { redirect } from "next/navigation";
import { userrolecheck } from "@/lib/settings/users/action";

interface PageProps {
  params: {
    editEmailTemp: string; 
  };
}

export default async function AdminEmailPage({ params }: PageProps) {
  const { editEmailTemp } = await params; 
  
  const t = await getTranslations('settings');
  const templates = await fetchEmailTemplates();
  const emailTemplate = templates.find((template) => template.id === editEmailTemp);

  if (!emailTemplate) {
    return <div>{t("administration.Email Template not found")}.</div>;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>{t("administration.Unauthorized Please log in")}.</div>;
  }
  const roleforpage=user.user_metadata.roles || "other"
  
  
  if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
    return redirect("/portal/dashboard")
  }
  const smtpSettings = await getSmtpSettings();
  const { initialTimezone } = await getTimeZone({ userId: user.id });

  const handleTimezoneChange = async (newTimezone: { value: string }) => {
    "use server";
    await changeTimezone(user.id, newTimezone.value);
  };

  const breadcrumbs = [
    { href: "/dashboard/", text: t("administration.Dashboard") },
    { href: "/settings/administration", text: t("administration.Administration") }
  ];

  return (
    <ContentLayout  title={t("administration.title")}>
      <UpdateEmailTemp id={editEmailTemp} template={emailTemplate} />
    </ContentLayout>
  );
}
