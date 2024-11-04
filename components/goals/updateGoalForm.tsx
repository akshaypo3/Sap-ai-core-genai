"use client";

import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateGoal } from "@/lib/goals/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UpdateGoalForm({ goal }: { goal: any }) {
  async function handleSubmit(formData: FormData) {
    const updatedGoal = {
      name: formData.get("name"),
      description: formData.get("description"),
      unit_of_measure: formData.get("unit_of_measure"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      owner: formData.get("owner"),
      status: formData.get("status"),
      key_actions: formData.get("key_actions"),
      frequency_of_measurement: formData.get("frequency_of_measurement"),
      completion_date: formData.get("completion_date"),
      risks: formData.get("risks"),
      comments: formData.get("comments"),
      // targetValue: parseFloat(formData.get("target_value") as string) || 0,
      // baselineValue: parseFloat(formData.get("baseline_value") as string) || 0,
      // currentValue: parseFloat(formData.get("current_value") as string) || 0,
      // progress: 0
    };

    //   const progress = calculateProgress(
    //     updatedGoal.currentValue,
    //     updatedGoal.baselineValue,
    //     updatedGoal.targetValue,
    //   );

    //   updatedGoal.progress = Math.round(progress);

    await updateGoal(goal.id, updatedGoal);
  }

  // const calculateProgress = (
  //   currentValue: number,
  //   baselineValue: number,
  //   targetValue: number,
  // ): number => {
  //   if (currentValue < baselineValue) {
  //     return 0;
  //   } else if (currentValue >= targetValue) {
  //     return 100;
  //   } else {
  //     return Math.min(
  //       ((currentValue - baselineValue) / (targetValue - baselineValue)) *
  //         100,
  //       100,
  //     );
  //   }
  // };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        handleSubmit(formData);
      }}
      className="p-4"
    >
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="name">Goal Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Goal Name"
          defaultValue={goal.name}
          required
        />

        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          defaultValue={goal.description}
          required
        />

        {/* <Label htmlFor="target_value">Target Value</Label>
        <Input
          type="number"
          name="target_value"
          placeholder="Target Value"
          defaultValue={goal.target_value}
          required
        /> */}

        <Label htmlFor="unit_of_measure">Unit of Measure</Label>
        <Input
          type="text"
          name="unit_of_measure"
          placeholder="Unit of Measure"
          defaultValue={goal.unit_of_measure}
          required
        />

        <Label htmlFor="start_date">Start Date</Label>
        <Input
          type="date"
          name="start_date"
          placeholder="Start Date"
          defaultValue={goal.start_date}
          required
        />

        <Label htmlFor="end_date">End Date</Label>
        <Input
          type="date"
          name="end_date"
          placeholder="End Date"
          defaultValue={goal.end_date}
          required
        />

        {/* <Label htmlFor="baseline_value">Baseline Value</Label>
        <Input
          type="number"
          name="baseline_value"
          placeholder="Baseline Value"
          defaultValue={goal.baseline_value}
          required
        /> */}

        {/* <Label htmlFor="current_value">Current Value</Label>
        <Input
          type="number"
          name="current_value"
          placeholder="Current Value"
          defaultValue={goal.current_value}
          required
        /> */}
        {/* 
        <Input
          type="hidden"
          name="progress"
          value={calculateProgress(
            goal.current_value,
            goal.baseline_value,
            goal.target_value,
          )}
        /> */}

        <Label htmlFor="owner">Owner</Label>
        <Input
          type="text"
          name="owner"
          placeholder="Owner"
          defaultValue={goal.owner}
          required
        />

        <div className="w-full">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={goal.status ? "TRUE" : "FALSE"}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRUE">Completed</SelectItem>
              <SelectItem value="FALSE">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Label htmlFor="key_actions">Key Actions</Label>
        <Input
          type="text"
          name="key_actions"
          placeholder="Key Actions"
          defaultValue={goal.key_actions}
          required
        />

        <Label htmlFor="frequency_of_measurement">
          Frequency of Measurement
        </Label>
        <Input
          type="text"
          name="frequency_of_measurement"
          placeholder="Frequency of Measurement"
          defaultValue={goal.frequency_of_measurement}
          required
        />

        <Label htmlFor="completion_date">Completion Date</Label>
        <Input
          type="date"
          name="completion_date"
          placeholder="Completion Date"
          defaultValue={goal.completion_date}
          required
        />

        <Label htmlFor="risks">Risks</Label>
        <Input
          type="text"
          name="risks"
          placeholder="Risks"
          defaultValue={goal.risks}
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
                Update Goal
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
