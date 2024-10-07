import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createGoal } from "@/lib/goals/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateGoalForm() {
  return (

    <form
      action={createGoal}
      className={`p-4`}
      //style={{ maxHeight: "90vh" }}
    >

      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="name">Goal Name</Label>
        <Input type="text" name="name" placeholder="Goal Name" required />

        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          required
        />

        <Label htmlFor="target_value">Target Value</Label>
        <Input
          type="number"
          name="target_value"
          placeholder="Target Value"
          required
        />

        <Label htmlFor="unit_of_measure">Unit of Measure</Label>
        <Input
          type="text"
          name="unit_of_measure"
          placeholder="Unit of Measure"
          required
        />

        <Label htmlFor="start_date">Start Date</Label>
        <Input
          type="date"
          name="start_date"
          placeholder="Start Date"
          required
        />

        <Label htmlFor="end_date">End Date</Label>
        <Input type="date" name="end_date" placeholder="End Date" required />

        <Label htmlFor="baseline_value">Baseline Value</Label>
        <Input
          type="number"
          name="baseline_value"
          placeholder="Baseline Value"
          required
        />

        <Label htmlFor="current_value">Current Value</Label>
        <Input
          type="number"
          name="current_value"
          placeholder="Current Value"
          required
        />

        {/* <Label htmlFor="progress">Progress (%)</Label>
        <Input
          type="number"
          name="progress"
          placeholder="Progress (%)"
          required
        /> */}

        <Label htmlFor="owner">Owner</Label>
        <Input type="text" name="owner" placeholder="Owner" required />


        <div className="w-full">
          <Label htmlFor="status">Status</Label>
          <Input type="hidden" name="status" defaultValue="FALSE"/>
          <Input defaultValue="In Progress" readOnly />
        </div>

        <Label htmlFor="key_actions">Key Actions</Label>
        <Input
          type="text"
          name="key_actions"
          placeholder="Key Actions"
          required
        />

        <Label htmlFor="frequency_of_measurement">
          Frequency of Measurement
        </Label>
        <Input
          type="text"
          name="frequency_of_measurement"
          placeholder="Frequency of Measurement"
          required
        />

        <Label htmlFor="completion_date">Completion Date</Label>
        <Input
          type="date"
          name="completion_date"
          placeholder="Completion Date"
          required
        />

        <Label htmlFor="risks">Risks</Label>
        <Input type="text" name="risks" placeholder="Risks" required />

        <Label htmlFor="comments">Comments</Label>
        <Input type="text" name="comments" placeholder="Comments" required />

        <div className="w-full">
          <Label htmlFor="visualization">Status</Label>
          <Select
            name="visualization"
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select Chart"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bar Graph">Bar Graph</SelectItem>
              <SelectItem value="Line Graph">Line Graph</SelectItem>
              <SelectItem value="Pie Graph">Pie Graph</SelectItem>
              <SelectItem value="Donut Graph">Donut Graph</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Create Goal
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
