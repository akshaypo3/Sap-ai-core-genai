import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";
import { deleteRole } from "@/lib/settings/users/action";
import { Trash2 } from "lucide-react";

interface NewStakeholderGroupFormData {
  role: string;
  description: string;
}

export default async function DeleteRoleForm({ id }: { id }) {
  const deleteRolerWithId = deleteRole.bind(null, id.id);
  return (
    <div className="grid w-full items-center gap-1.5 mb-2">
      <div className="grid gap-1 py-1">
        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="name" className="text-center">
            Are you sure to delete the role:{" "}
            <b className="font-bold text-lg font-semibold text-red-600">
              {id.role} <span className="text-black">?</span>
            </b>
          </Label>
        </div>
      </div>
      <DialogFooter className="flex justify-between mt-4">
        <div className="flex justify-end space-x-2 mt-4">
          <DialogTrigger asChild>
            <Button>Cancel</Button>
          </DialogTrigger>
          <form action={deleteRolerWithId}>
            <DialogClose asChild>
              <Button className="w-full" type="submit" variant="destructive">
                Delete Role
              </Button>
            </DialogClose>
          </form>
        </div>
      </DialogFooter>
    </div>
  );
}
