import React from "react";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/lib/settings/users/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Slash } from "lucide-react";
import { getTaskById } from "@/lib/task/data";
import { UpdateTaskButton } from "@/components/task/buttons";
import { Comments } from "@/components/task/comments";
import { ViewTaskActivityButton } from "@/components/task/buttons";
import { getTaskLogs } from "@/lib/task/data";
import { DataTable } from "@/components/table/data-table"; 
import { columns_task_log } from "@/components/table/TaskLogsTableColumns";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function taskPage({
  params,
}: {
  params: { taskid: string };
}) {
  const { taskid: taskId } = params;

  const task = await getTaskById(taskId);

  // if (!task) {
  //   return notFound();
  // }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const Logs = await getTaskLogs();



  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const taskLogs = Logs?.filter((logs) => logs.task_id === taskId && logs.user === userName)

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  const t = await getTranslations('task');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("taskId.Dashboard") },
    { href: "/task", text: t("taskId.Tasks") }
  ];

  return (
    <>
      <ContentLayout title={t("taskId.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={task.title} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
            <h2 className="font-semibold text-xl mb-3">{t("taskId.Task Overview")}</h2>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t("taskId.Title")}</Label>
                  <p>{task.title}</p>
                </div>
                <div>
                  <Label>{t("taskId.Description")}</Label>
                  <p>{task.description}</p>
                </div>
                <div>
                  <Label>{t("taskId.Assigned User")}</Label>
                  <p>{task.assigned_to_username}</p>
                </div>
                <div>
                  <Label>{t("taskId.Created User")}</Label>
                  <p>{task.created_by_username}</p>
                </div>
                <div>
                  <Label>{t("taskId.Status")}</Label>
                  <p>{task.status}</p>
                </div>
                <div>
                  <Label>{t("taskId.Start Date")}</Label>
                  <p>
                    {new Date(task.start_date)
                      .toLocaleDateString("en-GB",{ timeZone:actualTime
                      })
                      .replace(/\//g, ".")}
                  </p>
                </div>
                <div>
                  <Label>{t("taskId.Due Date")}</Label>
                  <p>
                    {new Date(task.due_date)
                      .toLocaleDateString("en-GB",{ timeZone:actualTime
                      })
                      .replace(/\//g, ".")}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {user.id === task.created_by.id && (
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
              <div className="flex items-center">
                <UpdateTaskButton task={task} />
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-start justify-start">
            <Comments taskId={taskId} user={user} />
          </div>

          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5">
            <h2 className="font-semibold text-xl mb-3">{t("taskId.Activity Logs")}</h2>
            <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_task_log} data={taskLogs} filter={'user'} sort={'Created At'}/>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
