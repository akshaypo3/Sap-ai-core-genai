import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SmtpSettings from "@/components/settings/smtp/SmtpSettings"; 
// import Subheader from "@/components/Subheader";
import { getSmtpSettings } from "@/lib/settings/smtp/data";
import AnthropicApiDemo from "@/components/settings/ai/AnthropicWorkbench";
import TimeZone from "@/components/settings/timezone/Timezone";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { changeTimezone } from "@/lib/settings/timezone/action";
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const supabase = createClient();

  const smtpSettings = await getSmtpSettings();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { initialTimezone } = await getTimeZone({ userId: user.id });

  const handleTimezoneChange = async (newTimezone: { value: string }) => {
    "use server"
    await changeTimezone(user.id, newTimezone.value);
  };

  const t = await getTranslations('settings');

  return (
    <>
      <ContentLayout title="Administration">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">{t("administration.General")}</TabsTrigger>
          <TabsTrigger value="adminusers">{t("administration. Administrative Users")}</TabsTrigger>
          <TabsTrigger value="smtp">{t("administration.SMTP")}</TabsTrigger>
          <TabsTrigger value="anthropicai">{t("administration.Anthropic AI")}</TabsTrigger>
        </TabsList>
        <div className="bg-white p-5 border rounded">
        <TabsContent value="general">
        <TimeZone initialTimezone={initialTimezone} onTimezoneChange={handleTimezoneChange}  />
          </TabsContent>
          <TabsContent value="adminusers">
          {t("administration. Administrative Users")}
            {/* <UserManagement/> */}
          </TabsContent>
          <TabsContent value="smtp">
          <SmtpSettings settings={smtpSettings}/>
            {/* <SMTPSettingsSection settings={smtpsettings}/> */}
          </TabsContent>
          <TabsContent value="anthropicai">
            <AnthropicApiDemo/>
          </TabsContent>
        </div>
        </Tabs>
    </ContentLayout>
    </>
  );
}
