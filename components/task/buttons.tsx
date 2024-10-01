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

export function AddTask(createdId: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add Task Function Description</DialogDescription>
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
  const deleteCommentWithId = deleteComment.bind(null, commentId, taskId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Are you sure to delete the comment?
            </Label>
          </div>
        </div>
        <DialogFooter>
          <form action={deleteCommentWithId}>
            <DialogClose asChild>
              <Button type="submit"> Yes</Button>
            </DialogClose>
          </form>
        </DialogFooter>
        {/* close button */}
        {/* <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}

export function ViewTaskActivityButton({ activityId }: { activityId: string }) {
  return (
    <>
    <Link href={`/task/taskLogs/${activityId}`}>
    <Button className="mb-3 bg-green-600">
      View Changes
    </Button>
    </Link>
    </>
  );
}

