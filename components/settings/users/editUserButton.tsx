import { Label } from "@/components/ui/label";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { editUserRoleGroup} from "@/lib/settings/users/action";
import { getAllUsers,getUserGroups,getRoles,getProfile,getProfileByID } from "@/lib/settings/users/data";

interface clickID {
    id: number;
  }

export default async function EditUserForm(clickID:any){
    //const users = await getAllUsers();
    const groups = await getUserGroups();
    const roles = await getRoles();
    //const profile = await getProfile();
    const profilebyID= await getProfileByID(clickID);
    console.log("SelectedID",clickID);
        return (
        <form action={editUserRoleGroup}>
                <div className="grid w-full items-center gap-1.5 mb-2 ">
                <Label htmlFor="userEmail">userEmail</Label>
                <Input type="text" name="userEmail" />
                    <div className="w-full">
                        <div>
                            <Label htmlFor="groupID">Group</Label>
                            <Select name="groupID">
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Group"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {groups?.map((group) =>(
                                        <SelectItem key={group.id} value={group.id}>{group.group || 'NA'}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full">
                        <div>
                            <Label htmlFor="roleID">Role</Label>
                            <Select name="roleID">
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Role"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {roles?.map((role) =>(
                                        <SelectItem key={role.id} value={role.id}>{role.role || 'NA'}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>                                      
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               Save Profile
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};