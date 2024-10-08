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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { getGoalById } from "@/lib/goals/data";
import { DeleteGoalButton } from "@/components/goals/buttons";
import { UpdateGoalButton } from "@/components/goals/buttons";
import { getTimeZone } from "@/lib/settings/timezone/data";

export default async function GoalPage({
  params,
}: {
  params: { id: string };
}) {
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

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  return (
    <>
      <ContentLayout title="Goal Details">
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{goal.name}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/materiality/goals">
                    Goals
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
          <h2 className="font-semibold text-xl mb-3">Goal Overview</h2>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Description</Label>
                  <p>{goal.description}</p>
                </div>
                <div>
                  <Label>Target Value</Label>
                  <p>
                    {goal.target_value} {goal.unit_of_measure}
                  </p>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <p>{new Date(goal.start_date).toLocaleDateString(
                      "en-GB",
                      { timeZone: actualTime }
                    )}
                    </p>
                </div>
                <div>
                  <Label>End Date</Label>
                  <p>{new Date(goal.end_date).toLocaleDateString(
                      "en-GB",
                      { timeZone: actualTime }
                    )}
                    </p>
                </div>
                <div>
                  <Label>Current Value</Label>
                  <p>
                    {goal.current_value} {goal.unit_of_measure}
                  </p>
                </div>
                <div>
                  <Label>Progress</Label>
                  <Progress value={goal.progress} />
                </div>
                <div>
                  <Label>Owner</Label>
                  <p>{goal.owner}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>{goal.status ? "Completed" : "In Progress"}</p>
                </div>
                <div>
                  <Label>Key Actions</Label>
                  <p>{goal.key_actions}</p>
                </div>
                <div>
                  <Label>Risks</Label>
                  <p>{goal.risks}</p>
                </div>
                <div>
                  <Label>Comments</Label>
                  <p>{goal.comments}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
                <div className="flex items-center">
                <UpdateGoalButton goal={goal}/>
                <DeleteGoalButton goalId={goal}/>
                </div>
              </div>
        </div>
      </ContentLayout>
    </>
  );
}
