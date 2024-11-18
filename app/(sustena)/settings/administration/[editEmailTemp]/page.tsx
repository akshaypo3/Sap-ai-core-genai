
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getSmtpSettings } from "@/lib/settings/smtp/data";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { changeTimezone } from "@/lib/settings/timezone/action";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import UpdateEmailTemp from "@/components/settings/emailTemp/UpdateEmailTemp";
import { fetchEmailTemplates } from '@/lib/settings/emailtemplates/action';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: {
    editEmailTemp: string; 
  };
}

export default async function AdminEmailPage({ params }: PageProps) {
  const { editEmailTemp } = params; 

  const templates = await fetchEmailTemplates();
  const emailTemplate = templates.find((template) => template.id === editEmailTemp);

  if (!emailTemplate) {
    return <div>Email Template not found.</div>;
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unauthorized. Please log in.</div>;
  }

  const smtpSettings = await getSmtpSettings();
  const { initialTimezone } = await getTimeZone({ userId: user.id });
  const t = await getTranslations('settings');

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
