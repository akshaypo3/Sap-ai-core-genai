import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
//import { getTranslations } from "next-intl/server";
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Ensure your select components are imported
import { editUserRoleGroup } from '@/lib/settings/users/action';

export default function EditUserButton({ id }: { id: { userId: string; allGroups: any[]; allRoles: any[]; group: { id: string; group: string }; role: { id: string; role: string } } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userGroupID = id.group?.id; // Get user's current group ID
  const userRoleID = id.role?.id; // Get user's current role ID
  const userGroupName = id.group?.group; // Group name
  const userRoleName = id.role?.role; // Role name
  const groups = id.allGroups; // All groups
  const roles = id.allRoles; // All roles
  const id1=id.userId;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      await editUserRoleGroup(id.userId, new FormData(event.currentTarget));
      setIsOpen(false);
      // Optionally, you can trigger a refresh of the user list here
    });
  };

 //const t = await getTranslations("settings-com")
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="px-2 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          <Pencil className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5 mb-2">
            <div className="w-full">
              <div>
                <Label htmlFor="groupID">Group</Label>
                <Select name="groupID" defaultValue={userGroupID}>
                  <SelectTrigger>
                    <SelectValue placeholder={userGroupName || "Default Group"} />
                  </SelectTrigger>
                  <SelectContent>
                    {groups?.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.group || "NA"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full">
              <div>
                <Label htmlFor="roleID">Role</Label>
                <Select name="roleID" defaultValue={userRoleID}>
                  <SelectTrigger>
                    <SelectValue placeholder={userRoleName || "Default Role"} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles?.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.role || "NA"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex mt-5">
              <div className="flex-auto">
                <DialogClose asChild>
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save User'}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}