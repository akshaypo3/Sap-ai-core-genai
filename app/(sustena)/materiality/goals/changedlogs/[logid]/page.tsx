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
import { getActivityLogById } from "@/lib/goals/data";

export default async function ActivityPage({
  params,
}: {
  params: { logid: string };
}) {
  const { logid: activityId } = params;

  const activity = await getActivityLogById(activityId);

  if (!activity) {
    return notFound();
  }

  let changes = {};
  try {
    changes =
      typeof activity.changes === "string"
        ? JSON.parse(activity.changes)
        : activity.changes;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    changes = {};
  }

  const formatDate = (dateString : any) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };

    const formattedDate = date
      .toLocaleString("en-GB", options)
      .replace(",", "");

    return formattedDate.replace(" ", " ");
  };

  const renderField = (field: string) => {
    const fieldData = changes[field];
    if (field === "status") {
      return fieldData?.updated ? "Changed" : "N/A";
    }
    return fieldData ? fieldData.updated ?? "N/A" : "N/A";
  };

  const changeField = (field: string) => {
    const changeData = changes[field];
    if (field === "user") {
      return changeData || "N/A";
    }

    if (field === "activity") {
      return changeData || "N/A";
    }

    if (field === "created_at" || field === "deleted_at") {
      return changeData ? formatDate(changeData) : "N/A";
    }  
  };

  return (
    <>
      <ContentLayout title="Changes">
        <div className="mb-5 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{activity.user}</h1>
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

        <div className="bg-white dark:bg-neutral-950 rounded-md mb-5">
          <Alert>
            <AlertTitle className="mb-5">Descriptive Changes</AlertTitle>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p>{renderField("name")}</p>
                </div>
                <div>
                  <Label>Target Value</Label>
                  <p>{renderField("target_value")}</p>
                </div>
                <div>
                  <Label>Unit of Measure</Label>
                  <p>{renderField("unit_of_measure")}</p>
                </div>
                <div>
                  <Label>Baseline Value</Label>
                  <p>{renderField("baseline_value")}</p>
                </div>
                <div>
                  <Label>Current Value</Label>
                  <p>{renderField("current_value")}</p>
                </div>
                <div>
                  <Label>Progress</Label>
                  <p>{renderField("progress")}</p>
                </div>
                <div>
                  <Label>Frequency of Measurement</Label>
                  <p>{renderField("frequency_of_measurement")}</p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p>{renderField("description")}</p>
                </div>
                <div>
                  <Label>Owner</Label>
                  <p>{renderField("owner")}</p>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <p>{renderField("start_date")}</p>
                </div>
                <div>
                  <Label>End Date</Label>
                  <p>{renderField("end_date")}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>{renderField("status")}</p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <p>{renderField("priority")}</p>
                </div>
                <div>
                  <Label>Risk</Label>
                  <p>{renderField("risk")}</p>
                </div>
                <div>
                  <Label>Comments</Label>
                  <p>{renderField("comments")}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md">
          <Alert>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <p>{changeField("user")}</p>
                </div>
                <div>
                  <Label>Activity</Label>
                  <p>{changeField("activity")}</p>
                </div>
                <div>
                  <Label>Created At</Label>
                  <p>{changeField("created_at")}</p>
                </div>
                <div>
                  <Label>Deleted At</Label>
                  <p>{changeField("deleted_at")}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </ContentLayout>
    </>
  );
}
