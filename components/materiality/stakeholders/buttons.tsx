

import { Button } from "@/components/ui/button"
import { createStakeholder, createStakeholderGroup } from "@/lib/stakeholders/action"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import CreateStakeholderForm from "@/components/materiality/stakeholders/CreateSteakholderForm";
import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";
import { deleteStakeholder } from "@/lib/stakeholders/action";

export async function AddStakeholderButton(){
    return (
      <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Add Stakeholder</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stakeholder</DialogTitle>
          <DialogDescription>
            Add Stakeholder Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateStakeholderForm/>
      </DialogContent>
    </Dialog>
    )
};

export async function AddStakeholderGroupButton(){
  return (
    <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Add Group</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stakeholder Group</DialogTitle>
          <DialogDescription>
            If certain groups are missing, you can add them here. Just give them a name and a description.
          </DialogDescription>
        </DialogHeader>
        <CreateStakeholderGroupForm/>
      </DialogContent>
    </Dialog>
  )
}

export async function AddLocation(){
  return (
    <Dialog>
      <DialogTrigger><Button className="mb-3 bg-green-600">Add Location</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uncaught error</DialogTitle>
          <DialogDescription>
            Please contact your Sustena administrator for more details.
          </DialogDescription>
        </DialogHeader>
        {/* <CreateStakeholderGroupForm/> */}
      </DialogContent>
    </Dialog>
  )
}

export async function DeleteStakeholderButton({ id }: { id: string }){

  const deleteStakeholderWithId = deleteStakeholder.bind(null, id);

  return(
    <form action={deleteStakeholderWithId}>
      <button type="submit" className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"><Trash2 className="w-4 text-white" /></button>
    </form>
  )
}