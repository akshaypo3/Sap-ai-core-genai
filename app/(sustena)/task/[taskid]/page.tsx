import React from "react";
import { notFound } from "next/navigation";
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
import { getTaskById } from "@/lib/task/data";
import { UpdateTaskButton } from "@/components/task/buttons";

export default async function taskPage({ params }: { params: { taskid: string } }) {
  const { taskid: taskId } = params;

  const task = await getTaskById(taskId);

  if (!task) {
    return notFound();
  }

  return (
    <>
      <ContentLayout title="Task Details">
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{task.title}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/task">
                    Tasks
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
            <AlertTitle className="mb-5">Task Overview</AlertTitle>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <p>{task.title}</p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p>{task.description}</p>
                </div>
                <div>
                  <Label>Assigned User</Label>
                  <p>{task.assigned_to_username}</p>
                </div>
                <div>
                  <Label>Created User</Label>
                  <p>{task.created_by_username}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>{task.status}</p>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <p>
                    {new Date(task.start_date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </p>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <p>
                    {new Date(task.due_date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
                <div className="flex items-center">
                <UpdateTaskButton task={task}/>
                </div>
              </div>
        </div>
      </ContentLayout>
    </>
  );
}
