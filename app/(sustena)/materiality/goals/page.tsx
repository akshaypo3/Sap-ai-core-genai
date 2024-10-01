import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getActivityGoalLogs, getGoals } from "@/lib/goals/data";
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
  AddGroupButton,
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
import { AddGoal, ViewGoalButton, ViewGoalActivityButton } from "@/components/goals/buttons";

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
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            <Button variant="outline">Add Goal</Button>
          </div>
        </div>

        <ChartCard/>
      </ContentLayout>
    </>
  );
}
