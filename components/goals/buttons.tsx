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
import CreateGoalForm from "@/components/goals/createGoalForm";
import UpdateGoalForm from "@/components/goals/updateGoalForm";
import { deleteGoal } from "@/lib/goals/action";
import CreateValueForm from "./createValueForm";

export function AddGoal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Goal</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
          <DialogDescription>Add Goal Function Description</DialogDescription>
        </DialogHeader>
        <CreateGoalForm />
      </DialogContent>
    </Dialog>
  );
}

export function AddValue({ goalId: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Value</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Add Value</DialogTitle>
          <DialogDescription>Add Goal Values</DialogDescription>
        </DialogHeader>
        <CreateValueForm goalId={goalId} />
      </DialogContent>
    </Dialog>
  );
}

export function ViewGoalButton({ goalId }: { goalId: string }) {
  return (
    <>
      <Link href={`/materiality/goals/${goalId}`}>
        <Button className="mb-3 bg-green-600">View Goal</Button>
      </Link>
    </>
  );
}

export function ViewGoalActivityButton({ activityId }: { activityId: string }) {
  return (
    <>
      <Link href={`/materiality/goals/changedlogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">View Changes</Button>
      </Link>
    </>
  );
}

export function DeleteGoalButton({ goalId }: { goalId: string }) {
  const deleteGoalWithId = deleteGoal.bind(null, goalId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"
        >
          <Trash2 className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete goal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Are you sure to delete the goal?
            </Label>
          </div>
        </div>
        <DialogFooter>
          <form action={deleteGoalWithId}>
            <DialogClose asChild>
              <Button type="submit">Yes</Button>
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

export function UpdateGoalButton({ goal }: { goal: any }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          className="px-2 mr-3 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          Update Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Update Goal</DialogTitle>
          <DialogDescription>Update the goal details below.</DialogDescription>
        </DialogHeader>
        <UpdateGoalForm goal={goal} className="my-4" />
      </DialogContent>
    </Dialog>
  );
}
