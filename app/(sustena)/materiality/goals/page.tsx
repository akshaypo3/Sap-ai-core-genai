import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getActivityGoalLogs, getGoals, Goalhistory } from "@/lib/goals/data";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import ChartCard from "@/components/materiality/goals/ChartCards";
import { GoalChart } from "@/components/charts/GoalChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddGoal, ViewGoalButton, ViewGoalActivityButton } from "@/components/goals/buttons";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/table/data-table"; 
import { columns_goal } from "@/components/table/GoalsTableColumns";
import { columns_activity_goal } from "@/components/table/GoalActivityLogsTableColumns";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations("materiality");
  
  const goals = await getGoals();
  const goalActivityLogs = await getActivityGoalLogs();
  const goalshistory = await Goalhistory();
  
  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;

  return (
    <ContentLayout title={t("goals.companyGoals")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">{t("goals.goalsTitle")}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">{t("goals.dashboard")}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-wrap">
        {goalshistory.map((goal) => (
          <div key={goal.id} className="w-1/3 p-2 flex">
            <GoalChart
              goal={goal.goal_history}
              Chart={goal.visualization}
              name={goal.name}
              desc={goal.description}
              unit={goal.unit_of_measure}
              goalId={goal.id}
            />
          </div>
        ))}
        {goalshistory.length < 3 && <div className="w-1/3 p-2 flex"></div>}
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList>
          <TabsTrigger value="goals">{t("goals.goalsTab")}</TabsTrigger>
          <TabsTrigger value="activitylog">{t("goals.activityLogTab")}</TabsTrigger>
        </TabsList>

        <div className="bg-white p-5 border rounded">
          <TabsContent value="goals">
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-start">
              <div className="flex items-center">
                <AddGoal />
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
            <div className="min-w-full table-auto border-collapse">
            <DataTable columns={columns_goal} data={goals} filter={'name'} sort={'Progress'}/>
            </div>
            </div>
          </TabsContent>

          <TabsContent value="activitylog">
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
            <div className="min-w-full table-auto border-collapse">
              <DataTable columns={columns_activity_goal} data={goalActivityLogs} filter={'user'} sort={'Created At'}/> 
            </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </ContentLayout>
  );
}
