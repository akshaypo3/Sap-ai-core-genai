import React from "react";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Slash } from "lucide-react";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getIROLocation } from "@/lib/company/data";
import EditLocationIROButton from "@/components/materiality/company/EditLocationIRO";
import { DeleteLocationIROButton } from "@/components/materiality/company/DeleteLocationIRO";
import { getTranslations } from 'next-intl/server';

export default async function IroLocationPage({
  params,
}: {
  params: { Iroid: string };
}) {
  const { Iroid: Iroid } = await params;

  const iro = await getIROLocation(Iroid);

  if (!iro) {
    return notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
 
  const t = await getTranslations('materiality');
  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;

  return (
    <>
      <ContentLayout title={""}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{iro.name}</h1>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
            <h2 className="font-semibold text-xl mb-3">{t("company.companyId.Location IRO Details")}</h2>
            <AlertDescription>
              <div className="grid  gap-4">
                <div>
                  <Label>{t("company.companyId.Description")}</Label>
                  <p>{iro.description}</p>
                </div>
                <div>
                  <Label>{t("company.companyId.Type")}</Label>
                  <p>
                    {iro.type}
                  </p>
                </div>
                <div>
                  <Label>{t("company.companyId.Topic")}</Label>
                  <p>
                    {iro.topic}
                  </p>
                </div>
                <div>
                  <Label>{t("company.companyId.Sub Topic")}</Label>
                  <p>
                    {iro.subtopic}
                  </p>
                </div>
                <div>
                  <Label>{t("company.companyId.Sub Sub Topic")}</Label>
                  <p>{iro.subsubtopic}</p>
                </div>
                <div>
                <Label>{t("company.companyId.Created At")}</Label>
                <p>
                {new Date(iro.created_at)
            .toLocaleDateString("en-GB")
            .replace(/\//g, ".")}
             &nbsp;
            {new Date(iro.created_at).toLocaleTimeString("en-GB", {
            hour12: false,
          })}
                </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
            <div className="flex items-center">
              <EditLocationIROButton id={iro} />
              &nbsp;
              <DeleteLocationIROButton id={iro} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}