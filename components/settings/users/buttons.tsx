import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, DialogFooter,DialogClose,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import CreateUserForm from "@/components/settings/users/CreateUserForm";
import { deleteUser} from "@/lib/settings/users/action";
import { Label } from "@/components/ui/label"


export async function AddUserButton(){
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