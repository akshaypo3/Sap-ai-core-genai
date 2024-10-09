import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getActivityGoalLogs, getGoals ,Goalhistory} from "@/lib/goals/data";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import ChartCard from "@/components/materiality/goals/ChartCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  // AddGroupButton,
  DeleteGroupButton,
} from "@/components/settings/groups/buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoalChart}from "@/components/charts/GoalChart";
import { AddGoal, ViewGoalButton, ViewGoalActivityButton, AddValue } from "@/components/goals/buttons";
import { AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/table/data-table"; 
import { columns_goal,columns_activity_goal} from "@/components/table/columns";
import { getTimeZone } from "@/lib/settings/timezone/data";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const goals = await getGoals();
  const goalActivityLogs = await getActivityGoalLogs()
  const goalshistory = await Goalhistory()
  const length=goalshistory.length%3

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  return (
    <>
      <ContentLayout title="Company Goals">
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">Goals</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">Add Goal</Button>
          </div> */}
        </div>
        <div className="flex flex-wrap"> {/* Add flex-wrap to allow wrapping to the next row */}
  {goalshistory.map((goal, index) => {
    return (
      <div key={goal.id} className="w-1/3 p-2 flex"> {/* Each chart takes one-third of the width */}
        <GoalChart goal={goal.goal_history} Chart={goal.visualization} name={goal.name} desc={goal.description} unit={goal.unit_of_measure} goalId={goal.id} />
      </div>
    );
  })}
  
  {/* Render a blank space if there are less than three charts */}
  {goalshistory.length < 3 && (
    <div className="w-1/3 p-2 flex"></div> // This creates the blank space for the third chart
  )}
</div>
        <Tabs defaultValue="goals" className="w-full">
          <TabsList>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="activitylog">Activity Logs</TabsTrigger>
          </TabsList>
          <div className="bg-white p-5 border rounded">
            <TabsContent value="goals">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-start">
                <div className="flex items-center">
                  <AddGoal />
                </div>
                {/* <div className="flex items-center">
                  <AddValue goalId={goalId}/>
                </div> */}
              </div>
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
              <AlertTitle className="mb-5">Details</AlertTitle>
              <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_goal} data={goals} filter={'name'}/>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      {/* <TableHead>Target value</TableHead>
                      <TableHead>Unit of measure</TableHead> */}
                      <TableHead>Start date</TableHead>
                      <TableHead>End date</TableHead>
                      {/* <TableHead>Baseline value</TableHead>*/}
                      <TableHead>Progress</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      {/* <TableHead>Key actions</TableHead>
                      <TableHead>Frequency of measurement</TableHead>
                      <TableHead>Completion date</TableHead>
                      <TableHead>Risks</TableHead>
                      <TableHead>Comments</TableHead> */}
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {goals?.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell className="font-medium">
                          {goal.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.description}
                        </TableCell>
                        {/* <TableCell className="font-medium">
                          {goal.target_value}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.unit_of_measure}
                        </TableCell> */}
                        <TableCell className="font-medium">
                          {goal.start_date}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.end_date}
                        </TableCell>
                        {/* <TableCell className="font-medium">
                          {goal.baseline_value}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.current_value}
                        </TableCell> */}
                        <TableCell className="font-medium">
                          {goal.progress} %
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.owner}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.status ? "Completed" : "In Progress"}
                        </TableCell>
                        {/* <TableCell className="font-medium">
                          {goal.key_actions}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.frequency_of_measurement}
                        </TableCell>
                        <TableCell className="font-medium">
                          {goal.completion_date}
                        </TableCell>
                        <TableCell>{goal.risks}</TableCell>
                        <TableCell>{goal.comments}</TableCell> */}
                        <TableCell>
                          <ViewGoalButton goalId={goal.id}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="activitylog">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
              <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_activity_goal} data={goalActivityLogs} filter={'user'}/>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {goalActivityLogs?.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.created_at)
                          .toLocaleDateString("en-GB",{ timeZone:actualTime })
                          .replace(/\//g, ".")}
                      </TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleTimeString("en-GB", {
                          timeZone:actualTime,
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
    </>
  );
}
