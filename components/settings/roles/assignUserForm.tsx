import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getRoles, otherRoleusers } from "@/lib/settings/users/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignRole } from "@/lib/settings/users/action";

export default async function RoleAssignUserForm({ id }: { id: string }) {
  const role_id = id;
  const roles = await getRoles();
  const otherUsers = await otherRoleusers(role_id);
  const roleAssign = assignRole.bind(null, id);

  return (
    <form action={roleAssign}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <div className="w-full">
          <div>
            <Label htmlFor="userID">Users</Label>
            <Select name="userID">
              <SelectTrigger>
                <SelectValue placeholder="Default User" />
              </SelectTrigger>
              <SelectContent>
                {otherUsers?.map((role) =>
                  role.users && role.users.length > 0
                    ? role.users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.username || "NA"}
                        </SelectItem>
                      ))
                    : null
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div>
            <Label htmlFor="roleID">Role</Label>
            <Select name="roleID" defaultValue={role_id} disabled>
              <SelectTrigger className="bg-gray-200 border rounded-md p-2">
                <SelectValue
                  value={role_id}
                  className="text-gray-700 font-semibold"
                  placeholder={
                    roles?.find((role) => role.id === role_id)?.role ||
                    "Select Role"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {roles?.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.id}
                    className="hover:bg-gray-300"
                  >
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
              <Button className="w-full" type="submit">
                Add User to Role
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
