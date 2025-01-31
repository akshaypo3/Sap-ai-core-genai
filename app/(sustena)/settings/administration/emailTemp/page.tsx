import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmtpSettings from "@/components/settings/smtp/SmtpSettings";
import { getSmtpSettings } from "@/lib/settings/smtp/data";
import AnthropicApiDemo from "@/components/settings/ai/AnthropicWorkbench";
import TimeZone from "@/components/settings/timezone/Timezone";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { changeTimezone } from "@/lib/settings/timezone/action";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import GlossaryDetails from "@/components/settings/glossary/GlossaryDetails";
import Frameworks from "@/components/settings/frameworks/frameworks";
import AnthropicData from "@/components/settings/ai/Anthropic";
import Globallanguage from "@/components/settings/timezone/globallanuage";
import GoogleMapsApi from "@/components/settings/timezone/GoogleMapsApi";
import { GetGoogleMapsApi } from "@/lib/settings/administration/data";
import EmailTemplatesList from "@/components/settings/emailTemp/EmailTemplatesList";
import AddEmailButton from "@/components/settings/emailTemp/AddEmailButton";
import AddEmailTemplate from "@/components/settings/emailTemp/AddEmailTemplate";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home() {
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
  const smtpSettings = await getSmtpSettings();
  const { initialTimezone } = await getTimeZone({ userId: user.id });
  const apiId = await GetGoogleMapsApi();
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
    <ContentLayout title={t("administration.title")}>
     <AddEmailTemplate/>
    </ContentLayout>
  );
}