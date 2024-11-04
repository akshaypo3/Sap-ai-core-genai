
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import CreateUserForm from "@/components/settings/users/CreateUserForm";
import { deleteUser, editUserRoleGroup } from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label";
import EditProfileForm from "@/components/settings/users/editProfileButton";
import { getUserGroups, getRoles, getProfile } from "@/lib/settings/users/data";
import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';

export async function AddUserButton() {
  let t = await getTranslations("settings-com")
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-black dark:bg-green-600 dark:text-neutral-50">{t("Add User")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Add User Function Description</DialogDescription>
        </DialogHeader>
        <CreateUserForm />
      </DialogContent>
    </Dialog>
  );
}

export async function DeleteUserButton({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, id.userId);
  //console.log("Delete user", id.userId);
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
          <DialogTitle className="text-center">Delete user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Are you sure to delete the user:{" "}
              <b className="font-bold text-lg font-semibold text-red-600">
                {id.name} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteUserWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Delete User
                </Button>
              </DialogClose>
            </form>
          </div>

          {/* <DialogClose asChild>
            <Button
              type="button"
              className="bg-black text-white hover:bg-gray-800 w-full mx-2 py-2"
            >
              Cancel
            </Button>
          </DialogClose>

          <form action={deleteUserWithId} className="w-full mx-2">
            <DialogClose asChild>
              <Button
                type="submit"
                variant="destructive"
                className="bg-red-600 hover:bg-red-900 text-white w-full py-2"
              >
                Yes
              </Button>
            </DialogClose>
          </form> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export async function EditProfileButton(Profile: any) {
  const t = await getTranslations("settings-com")
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit Profile Function Description
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm data2={Profile} />
      </DialogContent>
    </Dialog>
  );
}

//edit the user in profile
export async function EditUserButton({ id }: { id: string }) {
  const editUserWithId = editUserRoleGroup.bind(null, id.userId);
  const groups = await getUserGroups();
  const roles = await getRoles();
  const profile = await getProfile();

  // Assuming `id` contains group and role data from the user profile
  const userGroupID = id.group?.id; // Get user's current group ID
  const userRoleID = id.role?.id; // Get user's current role ID
  const userGroupName = id.group?.group; // Group name
  const userRoleName = id.role?.role; // Role name
  //console.log("fetchData", id);
  // console.log("fetchDataGroup", userGroupName);
  // console.log("fetchDataRole", userRoleName);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          className="px-2 bg-green-600 h-7 hover:bg-green-900 rounded-md"
        >
          <Pencil className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit User</DialogTitle>
        </DialogHeader>
        <form action={editUserWithId}>
          <div className="grid w-full items-center gap-1.5 mb-2">
            <div className="w-full">
              <div>
                <Label htmlFor="groupID">Group</Label>
                {/* Set default value for groupID to user's current group */}
                <Select name="groupID" defaultValue={userGroupID}>
                  <SelectTrigger>
                    {/* Display the default group name */}
                    <SelectValue
                      placeholder={userGroupName || "Default Group"}
                    />
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
                {/* Set default value for roleID to user's current role */}
                <Select name="roleID" defaultValue={userRoleID}>
                  <SelectTrigger>
                    {/* Display the default role name */}
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
                  <Button className="w-full" type="submit">
                    Save User
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


