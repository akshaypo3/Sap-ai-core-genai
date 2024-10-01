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
import { Slash, Trash2, Pencil } from "lucide-react";
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

  return (
    <>
      <ContentLayout title="Tasks">
        {/* <UploadButton/> */}
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">Tasks</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/internal/">Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            {/* <Button variant="outline">Add new</Button> <*/}
          </div>
        </div>

        <KanbanBoard initialTasks={tasks} updateTaskStatus={updateTaskStatus}/>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <div className="bg-white p-5 border rounded">
            <TabsContent value="tasks">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Assigned to</TableHead>
                      <TableHead>Created by</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start date</TableHead>
                      <TableHead>Due date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks?.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell className="font-medium">
                          {task.description}
                        </TableCell>
                        <TableCell className="font-medium">
                          {task.assigned_to_username}
                        </TableCell>
                        <TableCell className="font-medium">
                          {task.created_by_username}
                        </TableCell>
                        <TableCell className="font-medium">
                          {task.status}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(task.start_date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, ".")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(task.due_date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, ".")}
                        </TableCell>
                        <TableCell className="font-medium">
                          <ViewTaskButton taskId={task.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        {user && (
          <Tabs defaultValue="tasks" className="w-full mt-8">
            <TabsList>
              <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            </TabsList>
            <div className="bg-white p-5 border rounded">
              <TabsContent value="tasks">
                <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-start">
                  <div className="flex items-center">
                    <AddTask createdId={user.id} />
                  </div>
                </div>
                {/* <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 grid grid-cols-4 gap-1">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <h2 className="text-sm font-semibold mb-4">TODO</h2>
                        <div className="space-y-4 text-sm font-medium">
                          {loggedTasks
                            ?.filter((task) => task.status === "TODO")
                            .map((task) => (
                              <Link
                                key={task.id}
                                href={`/task/${task.id}`}
                                passHref
                              >
                                <div
                                  className="bg-white dark:bg-gray-950 rounded-lg p-3 shadow-sm mb-3"
                                  draggable="true"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>{task.title}</div>
                                    <Button variant="ghost" size="icon">
                                      <Ellipsis className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {task.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <h2 className="text-sm font-semibold mb-4">
                          IN_PROGRESS
                        </h2>
                        <div className="space-y-4 text-sm font-medium">
                          {loggedTasks
                            ?.filter((task) => task.status === "IN_PROGRESS")
                            .map((task) => (
                              <Link
                                key={task.id}
                                href={`/task/${task.id}`}
                                passHref
                              >
                                <div
                                  className="bg-white dark:bg-gray-950 rounded-lg p-3 shadow-sm mb-3"
                                  draggable="true"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>{task.title}</div>
                                    <Button variant="ghost" size="icon">
                                      <Ellipsis className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {task.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <h2 className="text-sm font-semibold mb-4">CLARIFICATION</h2>
                        <div className="space-y-4 text-sm font-medium">
                          {loggedTasks
                            ?.filter((task) => task.status === "NEEDS_CLARIFICATION")
                            .map((task) => (
                              <Link
                                key={task.id}
                                href={`/task/${task.id}`}
                                passHref
                              >
                                <div
                                  key={task.id}
                                  className="bg-white dark:bg-gray-950 rounded-lg p-3 shadow-sm mb-3"
                                  draggable="true"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>{task.title}</div>
                                    <Button variant="ghost" size="icon">
                                      <Ellipsis className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {task.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <h2 className="text-sm font-semibold mb-4">DONE</h2>
                        <div className="space-y-4 text-sm font-medium">
                          {loggedTasks
                            ?.filter((task) => task.status === "DONE")
                            .map((task) => (
                              <Link
                                key={task.id}
                                href={`/task/${task.id}`}
                                passHref
                              >
                                <div
                                  key={task.id}
                                  className="bg-white dark:bg-gray-950 rounded-lg p-3 shadow-sm mb-3"
                                  draggable="true"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>{task.title}</div>
                                    <Button variant="ghost" size="icon">
                                      <Ellipsis className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {task.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5">
                  {/* <MyComponent/> */}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </ContentLayout>
    </>
  );
}
