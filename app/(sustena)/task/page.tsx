import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Slash, Trash2, Pencil,CalendarIcon,SquareKanban,List,SquareGanttChart,TableProperties  } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SustainabilityGoals from "@/components/dashboard/SustainabilityGoals";
import NewsCards from "@/components/dashboard/NewsCards";
import UploadButton from "@/components/UploadButton";
import { getTasks, getUserTasks } from "@/lib/task/data";
import { AddTask } from "@/components/task/buttons";
import { ViewTaskButton } from "@/components/task/buttons";
import KanbanBoard from "@/components/task/KanbanBoard";
import { updateTaskStatus } from "@/lib/task/action";
import { DataTable } from "@/components/table/data-table"; 
import { columns_task } from "@/components/table/TasksTableColumns";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import TaskList from "@/components/task/TaskList";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const tasks = await getTasks();
  const loggedTasks = await getUserTasks(user.id);

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  const t = await getTranslations('task');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("Home") }
  ];
  return (
    <>
      <ContentLayout title={t("title")}>
        <div className="bg-white dark:bg-neutral-950 rounded-md border p-5">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
            <h3 className="text-xl font-semibold">
              Workspace
            </h3>
            <AddTask createdId={user.id} />
          </div>
          <Tabs defaultValue="board" className="mt-2">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="board"><SquareKanban className="mr-2 h-4 w-4"/>Board</TabsTrigger>
              <TabsTrigger value="list"><List className="mr-2 h-4 w-4"/>List</TabsTrigger>
              <TabsTrigger value="gantt"><SquareGanttChart className="mr-2 h-4 w-4"/>Gantt</TabsTrigger>
              <TabsTrigger value="table"><TableProperties className="mr-2 h-4 w-4"/>Table</TabsTrigger>
            </TabsList>
            <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
              <TabsContent value="board">
              <KanbanBoard initialTasks={tasks} updateTaskStatus={updateTaskStatus} userId={user.id} timezone={timezone}/>
              </TabsContent>
              <TabsContent value="list">
                <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                  <div className="min-w-full table-auto border-collapse">
                    <TaskList/>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="gantt"></TabsContent>
              <TabsContent value="table">
                <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                  <div className="min-w-full table-auto border-collapse">
                    <DataTable columns={columns_task} data={tasks} filter={'title'} sort={'Assigned to'}/>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ContentLayout>
    </>
  );
}
