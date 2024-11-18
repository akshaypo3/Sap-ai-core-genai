import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { getUserGroups, otherGroupusers } from "@/lib/settings/users/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignGroup } from "@/lib/settings/users/action";

export default function GroupAssignUserForm({ id, otherGroupusers, getUserGroups }: { id: string, otherGroupusers: any,getUserGroups: any }) {
  const group_id = id;
  // const groups = await getUserGroups();
  // const otherUsers = await otherGroupusers(group_id);
  const groupAssign = assignGroup.bind(null, id);

  return (
    <form action={groupAssign}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <div className="w-full">
          <div>
            <Label htmlFor="userID">Users</Label>
            <Select name="userID">
              <SelectTrigger>
                <SelectValue placeholder="Default User" />
              </SelectTrigger>
              <SelectContent>
                {otherGroupusers?.some(
                  (group) => group.users && group.users.length > 0
                ) ? (
                  otherGroupusers.map((group) =>
                    group.users && group.users.length > 0
                      ? group.users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.username || "NA"}
                          </SelectItem>
                        ))
                      : null
                  )
                ) : (
                  <div>No users available</div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div>
            <Label htmlFor="roleID">Group</Label>
            <Select name="roleID" defaultValue={group_id} disabled>
              <SelectTrigger className="bg-gray-200 border rounded-md p-2">
                <SelectValue
                  value={group_id}
                  className="text-gray-700 font-semibold"
                  placeholder={
                    getUserGroups?.find((group) => group.id === group_id)?.role ||
                    "Select Role"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {getUserGroups?.map((group) => (
                  <SelectItem
                    key={group.id}
                    value={group.id}
                    className="hover:bg-gray-300"
                  >
                    {group.group || "NA"}
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
                Add User to Group
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
