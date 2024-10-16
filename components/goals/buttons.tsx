import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, X } from "lucide-react";
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
import CreateValueForm from "@/components/goals/createValueForm";
import { useTranslations } from "next-intl";

export function AddGoal() {
  const t = useTranslations("goals")
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">{t("Add Goal")}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{t("Add Goal")}</DialogTitle>
          <DialogDescription>{t("Add Goal Function Description")}</DialogDescription>
        </DialogHeader>
        <CreateGoalForm />
      </DialogContent>
    </Dialog>
  );
}

export function AddValue({ goalId }:{ goalId:string}) {
  const t = useTranslations("goals")
  console.log(goalId);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">{t("Add Value")}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{t("Add Value")}</DialogTitle>
          <DialogDescription>{t("Add Goal Values")}</DialogDescription>
        </DialogHeader>
        <CreateValueForm goalId={goalId} />
      </DialogContent>
    </Dialog>
  );
}

export function ViewGoalButton({ goalId }: { goalId: string }) {
  const t = useTranslations("goals")
  return (
    <>
      <Link href={`/materiality/goals/${goalId}`}>
        <Button className="mb-3 bg-green-600">{t("View Goal")}</Button>
      </Link>
    </>
  );
}

export function ViewGoalActivityButton({ activityId }: { activityId: string }) {
  const t = useTranslations("goals")
  return (
    <>
      <Link href={`/materiality/goals/changedlogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">{t("View Changes")}</Button>
      </Link>
    </>
  );
}

export function DeleteGoalButton({ goalId }: { goalId: string }) {
  const t = useTranslations("goals")
  const deleteGoalWithId = deleteGoal.bind(null, goalId.id);
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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">{t("Delete goal")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-35" // Adjust max-h value as needed
            >
              {t("Are you sure to delete the goal:")}
              <b className="font-bold text-lg font-semibold text-red-600">
                {goalId.name} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteGoalWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  {t("Delete Goal")}
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateGoalButton({ goal }: { goal: any }) {
  const t = useTranslations("goals")
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          className="px-2 mr-3 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          {t("Update Goal")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{t("Update Goal")}</DialogTitle>
          <DialogDescription>{t("Update the goal details below")}</DialogDescription>
        </DialogHeader>
        <UpdateGoalForm goal={goal}/>
      </DialogContent>
    </Dialog>
  );
}
