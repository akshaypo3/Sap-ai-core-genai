import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { deleteComment } from "@/lib/task/action";

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

export function AddTask(createdId: any) {
  const t = useTranslations();
  return (
    <Dialog>
      <DialogTrigger>
        <Button>{t("Add Task")}</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>{t("Add Task")}</DialogTitle>
          {/* <DialogDescription>Description</DialogDescription> */}
        </DialogHeader>
        <AddTaskForm createdId={createdId} />
      </DialogContent>
    </Dialog>
  );
}

export function ViewTaskButton({ taskId }: { taskId: string }) {
  return (
    <>
      <Link href={`/task/${taskId}`}>
        <Button className="mb-3 bg-green-600">View Task</Button>
      </Link>
    </>
  );
}

export function UpdateTaskButton({ task }: { task: any }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          className="px-2 mr-3 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          Update Task
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>Update the task details below.</DialogDescription>
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-32" // Adjust max-h value as needed
            >
              Are you sure to delete the comment:{" "}
              <b className="font-bold text-lg font-semibold text-red-600">
                {commentId.comment} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteCommentWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Delete Comment
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
  return (
    <>
      <Link href={`/task/taskLogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">View Changes</Button>
      </Link>
    </>
  );
}
