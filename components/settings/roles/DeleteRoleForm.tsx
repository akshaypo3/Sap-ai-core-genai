import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"  
import { CircleHelp } from "lucide-react";
import { deleteRole } from "@/lib/settings/users/action";
import { Trash2 } from "lucide-react"

interface NewStakeholderGroupFormData {
    role: string;
    description: string;
}



export default async function DeleteRoleForm({ id }: { id: string }){
    const deleteRolerWithId = deleteRole.bind(null, id);
    return (
        <form action={deleteRolerWithId}>
      <div className="grid w-full items-center gap-1.5 mb-2">
         <h1>Delete Role</h1>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <div className="grid w-full items-center gap-1.5 mb-2">Are you sure want to delete?</div>
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Delete
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
    </form>
    )
};