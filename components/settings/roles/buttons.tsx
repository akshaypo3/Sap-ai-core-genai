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

export async function AddRoleButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Role</DialogTitle>
          <DialogDescription>Add Role Function Description</DialogDescription>
        </DialogHeader>
        <CreateRoleForm />
      </DialogContent>
    </Dialog>
  );
}

export async function DeleteRoleButton({ id }: { id: string }) {
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
        <DeleteRoleForm id={id} />
      </DialogContent>
    </Dialog>
  );
}

export async function RoleDetailsButton({ roleid }: { roleid: string }) {
  return (
    <Link href={`/settings/roles/${roleid}`}>
      <Button className="p-2" type="submit">
        <span className="sr-only">View</span>
        <ZoomIn className="w-4" />
      </Button>
    </Link>
  );
}

export async function ChangeRoleButton({ id }: { id: string }) {
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
        <RoleAssignUserForm id={roleID} />
      </DialogContent>
    </Dialog>
  );
}
