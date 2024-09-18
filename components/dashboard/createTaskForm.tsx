import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/dashboard/action";
import { getProfile } from "@/lib/settings/users/data";
import { getUserProfiles } from "@/lib/dashboard/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function AddTaskForm() {
  const users = await getUserProfiles();
  return (
    <form action={createTask}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="title">Task Title</Label>
        <Input type="text" name="title" placeholder="Task Title" required />

        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          placeholder="Task Description"
          required
        />

        <div className="w-full">
          <div>
            <Label htmlFor="assigned_to">Assigned To</Label>
            <Select name="assigned_to">
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username || "NA"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div>
            <Label htmlFor="created_by">Created By</Label>
            <Select name="created_by">
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username || "NA"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Label htmlFor="status">Status</Label>
        <Input type="text" name="status" placeholder="Status" required />

        <Label htmlFor="start_date">Start Date</Label>
        <Input
          type="date"
          name="start_date"
          placeholder="Start Date"
          required
        />

        <Label htmlFor="due_date">Due Date</Label>
        <Input type="date" name="due_date" placeholder="Due Date" required />

        <Label htmlFor="updated_at">Updated At</Label>
        <Input
          type="date"
          name="updated_at"
          placeholder="Updated At"
          required
        />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Add Task
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
