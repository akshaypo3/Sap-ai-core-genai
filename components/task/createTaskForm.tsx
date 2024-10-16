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
import { getTranslations } from "next-intl/server";

export default async function AddTaskForm({ createdId }: { createdId: any }) {
  const users = await getUserProfiles();

  const createdIdObj = createdId;
  const extractedCreatedId = createdIdObj.createdId;

  const createdByUser = users?.find((user) => user.id === extractedCreatedId);
  const t = await getTranslations("tasks-com")
  return (
    <form action={createTask}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="title">{t("Task Title")}</Label>
        <Input type="text" name="title" placeholder= {t("Task Title")} required />

        <Label htmlFor="description">{t("Description")}</Label>
        <Input
          type="text"
          name="description"
          placeholder={t("Task Description")}
          required
        />

        <div className="w-full">
          <Label htmlFor="assigned_to">{t("Assigned To")}</Label>
          <Select name="assigned_to">
            <SelectTrigger>
              <SelectValue placeholder={t("Select user")} />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.username || t("NA")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Label htmlFor="created_by">{t("Created By")}</Label>
        {createdByUser ? (
          <>
          <Input
            type="text"
            name="created_by_display"
            defaultValue={createdByUser.username || t("Unknown")}
            readOnly
          />

          <Input
          type="hidden"
          name="created_by"
          value={createdByUser.id}
        />
        </>
        ) : (
          <p>{t("User not found")}</p>
        )}

        <Input type="hidden" name="status" value="TODO" />

        <Label htmlFor="start_date">{t("Start Date")}</Label>
        <Input
          type="date"
          name="start_date"
          placeholder={t("Start Date")}
          required
        />

        <Label htmlFor="due_date">{t("Due Date")}</Label>
        <Input type="date" name="due_date" placeholder={t("Due Date")} required />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                {t("Add Task")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
