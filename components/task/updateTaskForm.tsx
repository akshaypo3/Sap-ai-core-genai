import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserProfiles } from "@/lib/task/data";
import { updateTask } from "@/lib/task/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTranslations } from "next-intl/server";

export default async function UpdateTaskForm({ task }: any) {
  const users = await getUserProfiles();
  const t = await getTranslations("tasks-com")

  const assignedUser = users.find((user) => user.id === task.assigned_to.id);

  return (
    <form action={updateTask}>
      <input type="hidden" name="id" value={task.id} />
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="title">{t("Task Title")}</Label>
        <Input
          type="text"
          name="title"
          defaultValue={task.title}
          placeholder={t("Task Title")}
          required
        />

        <Label htmlFor="description">{t("Description")}</Label>
        <Input
          type="text"
          name="description"
          defaultValue={task.description}
          placeholder={t("Task Description")}
          required
        />

        <div className="w-full">
          <Label htmlFor="assigned_to">{t("Assigned To")}</Label>
          <Select
            name="assigned_to"
            defaultValue={assignedUser ? assignedUser.id : "Select User"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.username || t("NA")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Label htmlFor="status">{t("Status")}</Label>
        <Select name="status" defaultValue={task.status}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">{t("TODO")}</SelectItem>
            <SelectItem value="IN_PROGRESS">{t("IN PROGRESS")}</SelectItem>
            <SelectItem value="NEEDS_CLARIFICATION">
              {t("NEEDS CLARIFICATION")}
            </SelectItem>
            <SelectItem value="DONE">{t("DONE")}</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="start_date">{t("Start Date")}</Label>
        <Input
          type="date"
          name="start_date"
          defaultValue={task.start_date}
          required
        />

        <Label htmlFor="due_date">{t("Due Date")}</Label>
        <Input
          type="date"
          name="due_date"
          defaultValue={task.due_date}
          required
        />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                {t("Update Task")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
