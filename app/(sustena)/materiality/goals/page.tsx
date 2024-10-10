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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>{t("goals.name")}</TableCell>
                    <TableCell>{t("goals.description")}</TableCell>
                    <TableCell>{t("goals.startDate")}</TableCell>
                    <TableCell>{t("goals.endDate")}</TableCell>
                    <TableCell>{t("goals.progress")}</TableCell>
                    <TableCell>{t("goals.owner")}</TableCell>
                    <TableCell>{t("goals.status")}</TableCell>
                    <TableCell>{t("goals.action")}</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goals?.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{goal.name}</TableCell>
                      <TableCell className="font-medium">{goal.description}</TableCell>
                      <TableCell className="font-medium">{goal.start_date}</TableCell>
                      <TableCell className="font-medium">{goal.end_date}</TableCell>
                      <TableCell className="font-medium">{goal.progress} %</TableCell>
                      <TableCell className="font-medium">{goal.owner}</TableCell>
                      <TableCell className="font-medium">
                        {goal.status ? t("goals.completed") : t("goals.inProgress")}
                      </TableCell>
                      <TableCell>
                        <ViewGoalButton goalId={goal.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="activitylog">
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>{t("goals.date")}</TableCell>
                    <TableCell>{t("goals.time")}</TableCell>
                    <TableCell>{t("goals.user")}</TableCell>
                    <TableCell>{t("goals.activity")}</TableCell>
                    <TableCell>{t("goals.action")}</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goalActivityLogs?.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.created_at)
                          .toLocaleDateString("en-GB", { timeZone: actualTime })
                          .replace(/\//g, ".")}
                      </TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleTimeString("en-GB", {
                          timeZone: actualTime,
                          hour12: false,
                        })}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.activity}</TableCell>
                      <TableCell>
                        <ViewGoalActivityButton activityId={log.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </ContentLayout>
  );
}
