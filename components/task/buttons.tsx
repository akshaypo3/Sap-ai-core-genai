"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { deleteComment, deleteCommentDialog } from "@/lib/task/action";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import AddTaskForm from "@/components/task/createTaskForm";
import UpdateTaskForm from "./updateTaskForm";
import { createComment } from "@/lib/task/action";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function AddTask(createdId: any) {
  const t = useTranslations("tasks-com");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md cursor-pointer hover:bg-gray-800">
      {t("Add Task")}
      </div>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>{t("Add Task")}</DialogTitle>
          {/* <DialogDescription>Description</DialogDescription> */}
        </DialogHeader>
        <AddTaskForm createdId={createdId} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function ViewTaskButton({ taskId }: { taskId: string }) {
  const t = useTranslations("tasks-com");
  return (
    <>
      <Link href={`/task/${taskId}`}>
        <Button className="mb-3 bg-green-600">{t("View Task")}</Button>
      </Link>
    </>
  );
}

export function UpdateTaskButton({ task }: { task: any }) {
  const t = useTranslations("tasks-com");
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          className="px-2 mr-3 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          {t("Update Task")}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>{t("Update Task")}</DialogTitle>
          <DialogDescription>{t("Update the task details below")}.</DialogDescription>
        </DialogHeader>
        <UpdateTaskForm task={task} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteCommentButton({
  commentId,
  taskId,
}: {
  commentId: string;
  taskId: string;
}) {
  const deleteCommentWithId = deleteComment.bind(null, commentId.id, taskId);
  const t = useTranslations("tasks-com");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrashIcon className="w-4 h-4 mr-1" />
          {t("Delete")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">{t("Delete comment")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-32" // Adjust max-h value as needed
            >
             {t("Are you sure to delete the comment:")}{" "}
              <b className="font-bold text-lg text-red-600">
                {commentId.comment} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>{t("Cancel")}</Button>
            </DialogTrigger>
            <form action={deleteCommentWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  {t("Delete Comment")}
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteCommentButtonDialog({
  commentId,
  taskId,
}: {
  commentId: string;
  taskId: string;
}) {
  const deleteCommentWithId = deleteCommentDialog.bind(null, commentId.id, taskId);
  const t = useTranslations("tasks-com");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrashIcon className="w-4 h-4 mr-1" />
          {t("Delete")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">{t("Delete comment")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-32" // Adjust max-h value as needed
            >
              {t("Are you sure to delete the comment:")}{" "}
              <b className="font-bold text-lg text-red-600">
                {commentId.comment} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>{t("Cancel")}</Button>
            </DialogTrigger>
            <form action={deleteCommentWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  {t("Delete Comment")}
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ViewTaskActivityButton({ activityId }: { activityId: string }) {
  const t = useTranslations("tasks-com");
  return (
    <>
      <Link href={`/task/taskLogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">{t("View Changes")}</Button>
      </Link>
    </>
  );
}
