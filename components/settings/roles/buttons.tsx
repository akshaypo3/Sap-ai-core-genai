"use client"

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
import { useState } from "react";

export function AddRoleButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("settings-com")
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{t("Add Role")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Role</DialogTitle>
          <DialogDescription>Add Role Function Description</DialogDescription>
        </DialogHeader>
        <CreateRoleForm open={open} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteRoleButton({ id }: { id:string }) {
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
          <DialogTitle className="text-center">Delete Role</DialogTitle>
        </DialogHeader>
        <DeleteRoleForm id={id} />
      </DialogContent>
    </Dialog>
  );
}

export function RoleDetailsButton({ roleid }: { roleid: string }) {
  return (
    <Link href={`/settings/roles/${roleid}`}>
      <Button className="p-2" type="submit">
        <span className="sr-only">View</span>
        <ZoomIn className="w-4" />
      </Button>
    </Link>
  );
}

export function ChangeRoleButton({ id, otherRoleusers, getRoles }: { id: string, otherRoleusers: any, getRoles: any }) {
  const roleID = id;
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add User to Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User to this Role</DialogTitle>
          <DialogDescription>Add User Function Description</DialogDescription>
        </DialogHeader>
        <RoleAssignUserForm id={roleID} otherRoleusers={otherRoleusers} getRoles={getRoles}/>
      </DialogContent>
    </Dialog>
  );
}
