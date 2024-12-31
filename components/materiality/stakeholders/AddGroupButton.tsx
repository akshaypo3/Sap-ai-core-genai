import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";


export function AddStakeholderGroupButton(id:any) {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>Add Group</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stakeholder Group</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateStakeholderGroupForm id={id}/>
        </DialogContent>
      </Dialog>
    );
  }