import { Trash2 } from "lucide-react";
import { deleteGroup } from "@/lib/settings/users/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, DialogFooter,DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import CreateGroupForm from "@/components/settings/groups/CreateGroupForm";


export async function AddGroupButton(){
  return (
    <Dialog>
    <DialogTrigger><Button className="mb-3 bg-green-600">Add Group</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Group</DialogTitle>
        <DialogDescription>
        Add Group Function Description
        </DialogDescription>
      </DialogHeader>
      <CreateGroupForm/>
    </DialogContent>
  </Dialog>
  )
};

export async function DeleteGroupButton({ id }: { id: string }){
  const deleteGroupWithId = deleteGroup.bind(null, id);  
  return(      
    <Dialog>
    <DialogTrigger asChild>
    <Button  type="submit" className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"><Trash2 className="w-4 text-white" /></Button>        
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Delete group</DialogTitle>
        </DialogHeader>
      <div className="grid gap-1 py-1">
        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="name" className="text-center">
          Are you sure to delete the group?
          </Label>            
        </div>
        </div>
      <DialogFooter>
      <form action={deleteGroupWithId}>
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