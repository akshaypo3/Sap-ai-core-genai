import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, DialogFooter,DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react"
import { Pencil } from "lucide-react"
import CreateUserForm from "@/components/settings/users/CreateUserForm";
import { deleteUser,editUserRoleGroup} from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label";
import EditProfileForm from "@/components/settings/users/editProfileButton";
//import EditUserForm from "@/components/settings/users/editUserButton";
import { getUserGroups,getRoles,getProfile } from "@/lib/settings/users/data";

export async function AddUserButton(){
  const selectedID =  '';
  

    return (
      <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Add User</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add User Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm/>
      </DialogContent>
    </Dialog>
    )
};


export async function DeleteUserButton({ id }: { id: string }){
    const deleteUserWithId = deleteUser.bind(null, id);
    //console.log("Delete user",id);  
    return(      
      <Dialog>
      <DialogTrigger asChild>
      <Button  type="submit" className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"><Trash2 className="w-4 text-white" /></Button>        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete user</DialogTitle>
          </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-center">
            Are you sure to delete the user?
            </Label>            
          </div>
          </div>
        <DialogFooter>
        <form action={deleteUserWithId}>
         <DialogClose asChild>
        <Button type="submit"> Yes</Button>
        </DialogClose>
        </form>
        </DialogFooter>
         {/* close button */}
        {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}
      </DialogContent>
    </Dialog>      
    )
  }


  export async function EditProfileButton(Profile:string){
    return (
      <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Edit Profile</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit Profile Function Description
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm data2={Profile}/>
      </DialogContent>
    </Dialog>
    )
};

//edit the user in profile
export async function EditUserButton({ id }: { id: string }){
  const editUserWithId = editUserRoleGroup.bind(null, id);
  const groups = await getUserGroups();
  const roles = await getRoles();
  const profile = await getProfile();
  //const fetchData=profile[0];
  //console.log("fetchData",profile);
  return(      
    <Dialog>
    <DialogTrigger asChild>
    <Button  type="submit" className="px-2 bg-green-600 h-7 hover:bg-green-900 rounded-md"><Pencil className="w-4 text-white" /></Button>        
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Edit user</DialogTitle>
        </DialogHeader>      
        <form action={editUserWithId}>
                <div className="grid w-full items-center gap-1.5 mb-2 ">
                     <div className="w-full">
                        <div>
                            <Label htmlFor="groupID">Group</Label>
                            <Select name="groupID" >
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Group" />
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
                            <Select name="roleID" >
                                <SelectTrigger>
                                    <SelectValue placeholder="Default Role" />
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
                               Save User
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    </DialogContent>
  </Dialog>      
  )
}


