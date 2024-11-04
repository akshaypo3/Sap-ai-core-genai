import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
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
import { getTaskActivityLogById, getCommentsByTaskId } from "@/lib/task/data";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function ActivityPage({
  params,
}: {
  params: { logId: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { logId: activityId } = params;

  const activity = await getTaskActivityLogById(activityId);
  const comments = await getCommentsByTaskId(user.id);

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

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
      timeZone:actualTime
    };

    const formattedDate = date
      .toLocaleString("en-GB", options)
      .replace(",", "");

    return formattedDate.replace(" ", " ");
  };

  const renderField = (field: string) => {
    if (changes && typeof changes === "object" && field in changes) {
      const fieldData = changes[field];

      if (fieldData && typeof fieldData === "object") {
        if (field === "start_date" || field === "due_date") {
          return fieldData.updated ? formatDate(fieldData.updated) : "N/A";
        }
        return "updated" in fieldData ? fieldData.updated : "N/A";
      }
    }
    return "N/A";
  };

  const changeField = (field: string) => {
    if (changes && typeof changes === "object" && field in changes) {
      const changeData = changes[field];

      if (field === "user") {
        return changeData || "N/A";
      }

      if (field === "activity") {
        return changeData || "N/A";
      }

      if (field === "created_at") {
        return changeData ? formatDate(changeData) : "N/A";
      }
    }
    return "N/A";
  };

  const titleUpdate = [
    renderField("title"),
    renderField("description"),
    renderField("assigned_to"),
    renderField("created_by"),
    renderField("status"),
    renderField("start_date"),
    renderField("due_date"),
  ].some((field) => field !== "N/A");

  const userUpdate = [
    changeField("user"),
    changeField("activity"),
    changeField("created_at"),
  ].some((field) => field !== "N/A");

  const commentLogsExist = comments?.filter((comment) =>
    comment.comment.includes("Comment"),
  );

  const t = await getTranslations('task');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("logDetails.Dashboard") },
    { href: "/task", text: t("logDetails.Tasks") }
  ];
  return (
    <>
      <ContentLayout title={t("logDetails.title")}>
        <div className="mb-5 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={activity.user} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>

        {userUpdate && commentLogsExist ? null : (
          <div className="bg-white dark:bg-neutral-950 rounded-md mb-5">
            <Alert>
              <AlertTitle className="mb-5">{t("logDetails.Details")}</AlertTitle>
              <AlertDescription>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t("logDetails.Task Title")}</Label>
                    <p>{renderField("title")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Description")}</Label>
                    <p>{renderField("description")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Assigned To")}</Label>
                    <p>{renderField("assigned_to")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Created By")}</Label>
                    <p>{renderField("created_by")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Status")}</Label>
                    <p>{renderField("status")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Start Date")}</Label>
                    <p>{renderField("start_date")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Due Date")}</Label>
                    <p>{renderField("due_date")}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {titleUpdate && commentLogsExist ? null : (
          <div className="bg-white dark:bg-neutral-950 rounded-md">
            <Alert>
              <AlertTitle className="mb-5">{t("logDetails.Details")}</AlertTitle>
              <AlertDescription>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t("logDetails.User")}</Label>
                    <p>{changeField("user")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Activity")}</Label>
                    <p>{changeField("activity")}</p>
                  </div>
                  <div>
                    <Label>{t("logDetails.Created At")}</Label>
                    <p>{changeField("created_at")}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {!(userUpdate && titleUpdate) && (
          <div className="bg-white dark:bg-neutral-950 rounded-md mt-5">
            {commentLogsExist && comments?.length > 0 ? (
              <Alert>
                <h3>{t("logDetails.Comments")}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("logDetails.Date")}</TableHead>
                      <TableHead>{t("logDetails.Time")}</TableHead>
                      <TableHead>{t("logDetails.User")}</TableHead>
                      <TableHead>{t("logDetails.Comment")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments?.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableCell>
                          {new Date(comment.created_at)
                            .toLocaleDateString("en-GB",{ timeZone:actualTime
                          })
                            .replace(/\//g, ".")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(comment.created_at).toLocaleTimeString(
                            "en-GB",
                            {
                              timeZone:actualTime,
                              hour12: false,
                            },
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment.user}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment.comment}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Alert>
            ) : (
              <Alert>
                <AlertTitle className="mb-5">{t("logDetails.Comments")}</AlertTitle>
                <h3>{t("logDetails.No Comments Available")}</h3>
                <p>{t("logDetails.no comments")}</p>
              </Alert>
            )}
          </div>
        )}
      </ContentLayout>
    </>
  );
}
