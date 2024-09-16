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
import { editProfile} from "@/lib/settings/users/action";
import { getAllUsers,getUserGroups,getRoles,getProfile } from "@/lib/settings/users/data";

interface ProfileData {
    username: string;
  }
   
export default async function EditProfileForm(Data){
    const users = await getAllUsers();
    const groups = await getUserGroups();
    const roles = await getRoles();
    const profile = await getProfile();
    const fetchData=Data.data2.data1[0];

        return (
        <form action={editProfile}>
                <div className="grid w-full items-center gap-1.5 mb-2 ">
                <div className="w-full">
                        <div>
                            <Label htmlFor="userEmail">User Email List</Label>
                            <Select name="userEmail" defaultValue={fetchData?.userEmail || ""}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Email" defaultValue={fetchData?.userEmail || ""}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {users?.map((user) =>(
                                        // <SelectItem key={user.id} value={user.id}>{user.user_metadata?.full_name || user.email.substring(0, user.email.indexOf('@'))}</SelectItem>
                                        <SelectItem key={user.id} value={user.email}>{user.email} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Label htmlFor="name" className="space-y-2 m-2">User Name</Label>
                    <Input type="text" name="username" placeholder="Username" defaultValue={fetchData?.username || ""}/>
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