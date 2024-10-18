import { deleteGroup } from "@/lib/settings/users/action";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CreateGroupForm from "@/components/settings/groups/CreateGroupForm";
import Link from "next/link";
import { Trash2, ZoomIn } from "lucide-react";
import GroupAssignUserForm from "@/components/settings/groups/assignGroupUserForm";
import { useTranslations } from "next-intl";

export function AddGroupButton() {
  const t = useTranslations("settings-com")
  return (
    <Dialog>
      <DialogTrigger>
        <Button>{t("Add Group")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add Group")}</DialogTitle>
          <DialogDescription>{t("Add Group Function Description")}</DialogDescription>
        </DialogHeader>
        <CreateGroupForm />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteGroupButton({ id }: { id: string }) {
  const t = useTranslations("settings-com")
  const deleteGroupWithId = deleteGroup.bind(null, id.id);
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
          <DialogTitle className="text-center">{t("Delete group")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              {t("Are you sure to delete the group:")}
              <b className="font-bold text-lg font-semibold text-red-600">
                {id.group} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>{t("Cancel")}</Button>
            </DialogTrigger>
            <form action={deleteGroupWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  {t("Delete Group")}
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export async function GroupDetailsButton({ groupid }: { groupid: string }) {
  const t = useTranslations("settings-com")
  return (
    <Link href={`/settings/groups/${groupid}`}>
      <Button className="p-2" type="submit">
        <span className="sr-only">{t("View")}</span>
        <ZoomIn className="w-4" />
      </Button>
    </Link>
  );
}

export async function ChangeGroupButton({ id }: { id: string }) {
  const t = useTranslations("settings-com")
  const groupID = id;
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">{t("Add User to Group")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add User to this Group")}</DialogTitle>
          <DialogDescription>{t("Add User Function Description")}</DialogDescription>
        </DialogHeader>
        <GroupAssignUserForm id={groupID} />
      </DialogContent>
    </Dialog>
  );
}
