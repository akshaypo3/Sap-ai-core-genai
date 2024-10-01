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

export default async function CreateValueForm({ goalId: string }) {
  const goal = await getGoalById(goalId);

  return (
    <form action={(formData) => addValue(formData, goalId)} className="p-4">
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="target_value">Target Value</Label>
        <Input
          type="number"
          name="target_value"
          placeholder="Target Value"
          defaultValue={goal.target_value}
          required
        />

        <Label htmlFor="baseline_value">Baseline Value</Label>
        <Input
          type="number"
          name="baseline_value"
          placeholder="Baseline Value"
          defaultValue={goal.baseline_value}
          required
        />

        <Label htmlFor="current_value">Current Value</Label>
        <Input
          type="number"
          name="current_value"
          placeholder="Current Value"
          defaultValue={goal.current_value}
          required
        />

        <div className="w-full">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={goal.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRUE">Completed</SelectItem>
              <SelectItem value="FALSE">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Label htmlFor="unit_of_measure">Unit of Measure</Label>
        <Input
          type="text"
          name="unit_of_measure"
          placeholder="Unit of Measure"
          defaultValue={goal.unit_of_measure}
          required
        />

        <Label htmlFor="comments">Comments</Label>
        <Input
          type="text"
          name="comments"
          placeholder="Comments"
          defaultValue={goal.comments}
          required
        />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Add Values
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
