import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";

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
        <UpdateTaskForm task={task}/>
      </DialogContent>
    </Dialog>
  );
}
