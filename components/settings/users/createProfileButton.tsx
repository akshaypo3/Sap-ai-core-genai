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
import { createUser} from "@/lib/settings/users/action";
import { getAllUsers } from "@/lib/settings/users/data";


export default async function CreateProfileForm(){
    const users = await getAllUsers();
        return (
        <form action={createUser}>
                <div className="grid w-full items-center gap-1.5 mb-2 ">
                <div className="w-full">
                        <div>
                            <Label htmlFor="userID">User List</Label>
                            <Select name="userID">
                                <SelectTrigger>
                                    <SelectValue placeholder="Default User"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {users?.map((user) =>(
                                        <SelectItem key={user.id} value={user.id}>{user.email}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Label htmlFor="name">Email</Label>
                    <Input type="text" name="email" placeholder="Email"/>
                    <Label htmlFor="description" className="space-y-2 m-2">Password</Label>
                    <Input type="text" name="password" placeholder="Password"/>
                    <Label htmlFor="description" className="space-y-2 m-2">Group</Label>
                    <Input type="text" name="group" placeholder="Group"/>
                    <Label htmlFor="description" className="space-y-2 m-2">Role</Label>
                    <Input type="text" name="role" placeholder="Role"/>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                               Create Profile
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};