import React from "react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

import { getFEFrameworkById, getQuestion, getSections } from "@/lib/settings/frameworkEditor/data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import CreateQuestionPage, { AddSectionButton, EditSectionButton } from "@/components/settings/frameworkEditor/Buttons";
import CreateQuestionSectionPage from "@/components/settings/frameworkEditor/QuestionPage";
import EditQuestionSectionPage from "@/components/settings/frameworkEditor/EditQuestionButton";
import QuestionList from "@/components/settings/frameworkEditor/QuestionList";


export default async function DetailFramework({
  params,
}: {
  params: { id: string };
}) {
  const { id: frameworkId } = params;
  const framework = await getFEFrameworkById(frameworkId);

  
  const sections = await getSections(frameworkId);
  const question = await getQuestion();


  if (!framework) {
    return notFound();
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations("settings");

  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworkEditor.Home") },
    {
      href: "/settings/frameworkEditor",
      text: t("frameworkEditor.Frameworks"),
    },
  ];

  return (
    <>
      <ContentLayout title={t("frameworkEditor.detailsMainTitle")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom
            title={`${t("frameworkEditor.Framework")} : ${framework.name} ${
              framework.reporting_year
            }`}
            breadcrumbs={breadcrumbs}
            backButton={<BackButton />}
          />
        </div>
        <div className="mb-8 p-10 flex flex-col bg-white dark:bg-neutral-950 rounded-md border">
          <Label className="mb-3">{t("frameworkEditor.Actions")}</Label>
          <div className="p-10 mb-10 flex justify-between gap-10 bg-white dark:bg-neutral-950 rounded-md border">
            <div className="flex-1 rounded-md border p-7">
              <Button className="w-full bg-green-600">{t("frameworkEditor.Edit Framework")}</Button>
            </div>
            <div className="flex-1 rounded-md border p-7">
              <Button className="w-full bg-green-600">{t("frameworkEditor.New Section")}</Button>
            </div>
            <div className="flex-1 rounded-md border p-7">
              {/* <Button className="w-full bg-green-600">{t("frameworkEditor.New Question")}</Button> */}
              <CreateQuestionSectionPage framework_id={frameworkId} sections={sections} />
            </div>
            <div className="flex-1 rounded-md border p-7">
              <Button className="w-full bg-green-600">{t("frameworkEditor.Create Assessment")}</Button>
            </div>
          </div>

          <Label className="mb-3">{t("frameworkEditor.Framework Information")}</Label>
          <div className="p-10 mb-10 flex justify-between gap-28 bg-white dark:bg-neutral-950 rounded-md border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("frameworkEditor.Type")}:</Label>
                <p>{framework.framework_type}</p>
              </div>
              <div>
                <Label>{t("frameworkEditor.Status")}:</Label>
                <p>{framework.status}</p>
              </div>
              <div>
                <Label>{t("frameworkEditor.Version")}:</Label>
                <p>{framework.version}</p>
              </div>
              <div>
                <Label>{t("frameworkEditor.Created")}:</Label>
                <p>
                  {new Date(framework.created_at).toISOString().split("T")[0]}
                </p>
              </div>
              <div>
                <Label>{t("frameworkEditor.Modified")}:</Label>
                <p>
                  {new Date(framework.updated_at).toISOString().split("T")[0]}
                </p>
              </div>
              <div>
                <Label>{t("frameworkEditor.Description")}:</Label>
                <p>{framework.description}</p>
              </div>
            </div>
          </div>

          <Label className="mb-3">{t("frameworkEditor.Statistics")}</Label>
          <div className="p-10 mb-10 flex justify-between gap-8 bg-white dark:bg-neutral-950 rounded-md border">
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("frameworkEditor.Sections")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">12</p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("frameworkEditor.Questions")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">145</p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md shadow-md text-center">
                <Label className="font-semibold text-gray-700 dark:text-gray-300">
                  {t("frameworkEditor.Completeness")}
                </Label>
                <p className="text-gray-800 dark:text-gray-100">65%</p>
              </div>
            </div>
          </div>

          <Label className="mb-3">{t("frameworkEditor.Overview")}</Label>
          <div className="p-10 flex justify-between gap-28 bg-white dark:bg-neutral-950 rounded-md border">
            <Tabs defaultValue="sections" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sections">{t("frameworkEditor.Sections")}</TabsTrigger>
                <TabsTrigger value="questions">{t("frameworkEditor.Questions")}</TabsTrigger>
                <TabsTrigger value="dependencies">{t("frameworkEditor.Dependencies")}</TabsTrigger>
                <TabsTrigger value="settings">{t("frameworkEditor.Settings")}</TabsTrigger>
              </TabsList>
              <div className="bg-white p-5 border rounded">
                <TabsContent value="sections"></TabsContent>
                <TabsContent value="questions">
                  <QuestionList frameworkId={frameworkId} sections={sections}/>
                </TabsContent>
                <TabsContent value="questions">
                {/* <CreateQuestionPage framework_id={frameworkId} section_id={"f140217f-8bb4-424e-81dd-3e72a1305543"} section_code={"T.1.1.1"} /> */}
                {/* <EditQuestionSectionPage Questiondata={question}/> */}
                </TabsContent>
                <TabsContent value="dependencies"></TabsContent>
                <TabsContent value="settings"></TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
