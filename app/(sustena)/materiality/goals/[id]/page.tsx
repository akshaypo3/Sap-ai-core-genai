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
import { Progress } from "@/components/ui/progress";
import { getGoalById } from "@/lib/goals/data";
import { DeleteGoalButton, UpdateGoalButton } from "@/components/goals/buttons";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function GoalPage({
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations('materiality');
  const { id: goalId } = params;

  const goal = await getGoalById(goalId);

  if (!goal) {
    return notFound();
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;
  const breadcrumbs = [
    { href: "/dashboard/", text: t('goalDetails.dashboard') },
    { href: "/materiality/goals", text: t('goalDetails.goals') }
  ];

  return (
    <>
      <ContentLayout title={t('goalDetails.title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={goal.name} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
            <h2 className="font-semibold text-xl mb-3">{t('goalDetails.goalOverview')}</h2>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('goalDetails.description')}</Label>
                  <p>{goal.description}</p>
                </div>
                <div>
                  <Label>{t('goalDetails.targetValue')}</Label>
                  <p>
                    {goal.target_value} {goal.unit_of_measure}
                  </p>
                </div>
                <div>
                  <Label>{t('goalDetails.startDate')}</Label>
                  <p>
                    {new Date(goal.start_date).toLocaleDateString('en-GB', { timeZone: actualTime })}
                  </p>
                </div>
                <div>
                  <Label>{t('goalDetails.endDate')}</Label>
                  <p>
                    {new Date(goal.end_date).toLocaleDateString('en-GB', { timeZone: actualTime })}
                  </p>
                </div>
                <div>
                  <Label>{t('goalDetails.currentValue')}</Label>
                  <p>
                    {goal.current_value} {goal.unit_of_measure}
                  </p>
                </div>
                <div>
                  <Label>{t('goalDetails.progress')}</Label>
                  <Progress value={goal.progress} />
                </div>
                <div>
                  <Label>{t('goalDetails.owner')}</Label>
                  <p>{goal.owner}</p>
                </div>
                <div>
                  <Label>{t('goalDetails.status')}</Label>
                  <p>{goal.status ? t('goalDetails.completed') : t('goalDetails.inProgress')}</p>
                </div>
                <div>
                  <Label>{t('goalDetails.keyActions')}</Label>
                  <p>{goal.key_actions}</p>
                </div>
                <div>
                  <Label>{t('goalDetails.risks')}</Label>
                  <p>{goal.risks}</p>
                </div>
                <div>
                  <Label>{t('goalDetails.comments')}</Label>
                  <p>{goal.comments}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
            <div className="flex items-center">
              <UpdateGoalButton goal={goal} />
              <DeleteGoalButton goalId={goal} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}