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

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
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
    <ContentLayout title="Administration">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <BreadCrumbCom 
          title={t("administration.title")} 
          breadcrumbs={breadcrumbs} 
          backButton={<BackButton />} 
        />
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">{t("administration.General")}</TabsTrigger>
          <TabsTrigger value="frameworks">{t("administration.Frameworks")}</TabsTrigger>
          <TabsTrigger value="adminusers">{t("administration.Administrative Users")}</TabsTrigger>
          <TabsTrigger value="smtp">{t("administration.SMTP")}</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="anthropicai">{t("administration.Anthropic AI")}</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>

        <div className="bg-white p-5 border rounded">
          <TabsContent value="general">
            <TimeZone 
              initialTimezone={initialTimezone} 
              onTimezoneChange={handleTimezoneChange} 
            />
            <Globallanguage />
            <GoogleMapsApi data={apiId} />
          </TabsContent>

          <TabsContent value="frameworks">
            <Frameworks />
          </TabsContent>

          <TabsContent value="adminusers">
            {t("administration.Administrative Users")}
          </TabsContent>

          <TabsContent value="smtp">
            <SmtpSettings settings={smtpSettings} />
          </TabsContent>

          <TabsContent value="glossary">
            <GlossaryDetails />
          </TabsContent>

          <TabsContent value="anthropicai">
            <AnthropicApiDemo />
          </TabsContent>

          <TabsContent value="ai">
            <AnthropicData />
          </TabsContent>
        </div>
      </Tabs>
    </ContentLayout>
  );
}