import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addValue } from "@/lib/goals/action";
import { getGoalById } from "@/lib/goals/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export default function CreateValueForm({ goalId }: { goalId: string }) {
  const t = useTranslations("goals");

  //const goal = await getGoalById(goalId);
  const goal = goalId;
  const goalId1 = goal.goal_id;

  return (
    <form action={addValue} className="p-4">
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Input type="hidden" name="goalId" value={goalId1} />

        <Label htmlFor="target_value">{t("Target Value")}</Label>
        <Input
          type="number"
          name="target_value"
          placeholder={t("Target Value")}
          defaultValue={goal.target_value}
          required
        />

        <Label htmlFor="baseline_value">{t("Baseline Value")}</Label>
        <Input
          type="number"
          name="baseline_value"
          placeholder={t("Baseline Value")}
          defaultValue={goal.baseline_value}
          required
        />

        <Label htmlFor="current_value">{t("Current Value")}</Label>
        <Input
          type="number"
          name="current_value"
          placeholder={t("Current Value")}
          defaultValue={goal.current_value}
          required
        />

        <div className="w-full">
          <Label htmlFor="status">{t("Status")}</Label>
          <Select name="status" defaultValue={goal.status ? "TRUE" : "FALSE"}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select Status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRUE">{t("Completed")}</SelectItem>
              <SelectItem value="FALSE">{t("In Progress")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Label htmlFor="unit_of_measure">{t("Unit of Measure")}</Label>
        <Input
          type="text"
          name="unit_of_measure"
          placeholder={t("Unit of Measure")}
          defaultValue={goal.unit_of_measure}
          required
        />

        <Label htmlFor="comments">{t("Comments")}</Label>
        <Input
          type="text"
          name="comments"
          placeholder={t("Comments")}
          defaultValue={goal.comments}
          required
        />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                {t("Add Values")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
