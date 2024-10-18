import { Button } from "@/components/ui/button";
import {
  createStakeholder,
  createStakeholderGroup,
} from "@/lib/stakeholders/action";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, ZoomIn } from "lucide-react";
import { deleteRole } from "@/lib/settings/users/action";
import CreateRoleForm from "@/components/settings/roles/CreateRoleForm";
import DeleteRoleForm from "@/components/settings/roles/DeleteRoleForm";
import { idText } from "typescript";
import RoleAssignUserForm from "@/components/settings/roles/assignUserForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function AddRoleButton() {
  const t = await getTranslations("settings-com")
  return (
    <Dialog>
      <DialogTrigger>
        <Button>{t("Add Role")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add Role")}</DialogTitle>
          <DialogDescription>{t("Add Role Function Description")}</DialogDescription>
        </DialogHeader>
        <CreateRoleForm />
      </DialogContent>
    </Dialog>
  );
}

export async function DeleteRoleButton({ id }: { id:string }) {
  const t = useTranslations("settings-com")
  return (
    <Dialog>
      <DialogTrigger>
        <button
          type="submit"
          className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"
        >
          <Trash2 className="w-4 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{t("Delete Role")}</DialogTitle>
        </DialogHeader>
        <DeleteRoleForm id={id} />
      </DialogContent>
    </Dialog>
  );
}

export async function RoleDetailsButton({ roleid }: { roleid: string }) {
  const t = useTranslations("settings-com")
  return (
    <Link href={`/settings/roles/${roleid}`}>
      <Button className="p-2" type="submit">
        <span className="sr-only">{t("View")}</span>
        <ZoomIn className="w-4" />
      </Button>
    </Link>
  );
}

export async function ChangeRoleButton({ id }: { id: string }) {
  const t = useTranslations("settings-com")
  const roleID = id;
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">{t("Add User to Role")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add User to this Role")}</DialogTitle>
          <DialogDescription>{t("Add User Function Description")}</DialogDescription>
        </DialogHeader>
        <RoleAssignUserForm id={roleID} />
      </DialogContent>
    </Dialog>
  );
}
