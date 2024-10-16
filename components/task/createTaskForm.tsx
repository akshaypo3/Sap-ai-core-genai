import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/task/action";
import { getUserProfiles } from "@/lib/task/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function AddTaskForm({ createdId }: { createdId: any }) {
  const users = await getUserProfiles();

  const createdIdObj = createdId;
  const extractedCreatedId = createdIdObj.createdId;

  const createdByUser = users?.find((user) => user.id === extractedCreatedId);

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

        <Label htmlFor="created_by">Created By</Label>
        {createdByUser ? (
          <>
          <Input
            type="text"
            name="created_by_display"
            defaultValue={createdByUser.username || "Unknown"}
            readOnly
          />

          <Input
          type="hidden"
          name="created_by"
          value={createdByUser.id}
        />
        </>
        ) : (
          <p>User not found</p>
        )}

        <Input type="hidden" name="status" value="TODO" />

        <Label htmlFor="start_date">Start Date</Label>
        <Input
          type="date"
          name="start_date"
          placeholder="Start Date"
          required
        />

        <Label htmlFor="due_date">Due Date</Label>
        <Input type="date" name="due_date" placeholder="Due Date" required />

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
