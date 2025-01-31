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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Slash } from "lucide-react";
import { getActivityLogById } from "@/lib/goals/data";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server'; 
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function ActivityPage({
  params,
}: {
  params: { logid: string };
}) {
  const t = await getTranslations('materiality'); 

  const { logid: activityId } = await params;
  const activity = await getActivityLogById(activityId);

  if (!activity) {
    return notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('logDetails./login');
  }
  const roleforpage=user.user_metadata.roles || "other"
  

if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
  return redirect("/portal/dashboard")
}
  let changes = {};
  try {
    changes = typeof activity.changes === 'string' ? JSON.parse(activity.changes) : activity.changes;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    changes = {};
  }

  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: actualTime,
    };
    const formattedDate = date
      .toLocaleString("en-GB", options)
      .replace(",", "");

    return formattedDate.replace(" ", " ");
  };

  const renderField = (field: string) => {
    const fieldData = changes[field];
    if (field === 'status') {
      return fieldData?.updated ? 'Changed' : 'N/A';
    }
    
    if (field === "start_date" || field === "end_date") {
      return fieldData?.updated ? formatDate(fieldData.updated) : "N/A";
      
    }
    return fieldData ? fieldData.updated ?? 'N/A' : 'N/A';
  };

  const changeField = (field: string) => {
    const changeData = changes[field];
    if (field === 'user') {
      return changeData || 'N/A';
    }
    if (field === 'activity') {
      return changeData || 'N/A';
    }
    if (field === 'created_at' || field === 'deleted_at') {
      return changeData ? formatDate(changeData) : 'N/A';
    }
  };

  const titleUpdate = [
    renderField('name'),
    renderField('target_value'),
    renderField('unit_of_measure'),
    renderField('baseline_value'),
    renderField('current_value'),
    renderField('progress'),
    renderField('frequency_of_measurement'),
    renderField('description'),
    renderField('owner'),
    renderField('start_date'),
    renderField('end_date'),
    renderField('status'),
    renderField('key_actions'),
    renderField('risk'),
    renderField('comments'),
  ].some((field) => field !== 'N/A');

  const userUpdate = [
    changeField('user'),
    changeField('activity'),
    changeField('created_at'),
    changeField('deleted_at'),
  ].some((field) => field !== 'N/A');
  const breadcrumbs = [
    { href: "/dashboard/", text: t('logDetails.dashboard') },
    { href: "/materiality/goals", text: t('logDetails.goals') }
  ];

  return (
    <>
      <ContentLayout title="changes">
        <div className="mb-5 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={activity.user} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>

        {userUpdate ? null : (
          <div className="bg-white dark:bg-neutral-950 rounded-md mb-5">
            <Alert>
              <AlertTitle className="mb-5">{t('logDetails.details')}</AlertTitle>
              <AlertDescription>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('logDetails.name')}</Label>
                    <p>{renderField('name')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.target_value')}</Label>
                    <p>{renderField('target_value')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.unit_of_measure')}</Label>
                    <p>{renderField('unit_of_measure')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.baseline_value')}</Label>
                    <p>{renderField('baseline_value')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.current_value')}</Label>
                    <p>{renderField('current_value')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.progress')}</Label>
                    <p>{renderField('progress')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.frequency_of_measurement')}</Label>
                    <p>{renderField('frequency_of_measurement')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.description')}</Label>
                    <p>{renderField('description')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.owner')}</Label>
                    <p>{renderField('owner')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.start_date')}</Label>
                    <p>{renderField('start_date')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.end_date')}</Label>
                    <p>{renderField('end_date')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.status')}</Label>
                    <p>{renderField('status')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.key_actions')}</Label>
                    <p>{renderField('key_actions')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.risk')}</Label>
                    <p>{renderField('risk')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.comments')}</Label>
                    <p>{renderField('comments')}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {titleUpdate ? null : (
          <div className="bg-white dark:bg-neutral-950 rounded-md">
            <Alert>
              <AlertTitle className="mb-5">{t('logDetails.details')}</AlertTitle>
              <AlertDescription>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('logDetails.user')}</Label>
                    <p>{changeField('user')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.activity')}</Label>
                    <p>{changeField('activity')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.created_at')}</Label>
                    <p>{changeField('created_at')}</p>
                  </div>
                  <div>
                    <Label>{t('logDetails.deleted_at')}</Label>
                    <p>{changeField('deleted_at')}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </ContentLayout>
    </>
  );
}
