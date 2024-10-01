import { Button } from "@/components/ui/button";
import {
  createStakeholder,
  createStakeholderGroup,
} from "@/lib/stakeholders/action";
import { Label } from "@/components/ui/label";
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

import { Trash2 } from "lucide-react";

import { Brain } from "lucide-react";

import CreateStakeholderForm from "@/components/materiality/stakeholders/CreateSteakholderForm";
import CreateStakeholderGroupForm from "@/components/materiality/stakeholders/CreateSteakholderGroup";
import { deleteStakeholder } from "@/lib/stakeholders/action";

export async function AddStakeholderButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Stakeholder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stakeholder</DialogTitle>
          <DialogDescription>
            Add Stakeholder Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateStakeholderForm />
      </DialogContent>
    </Dialog>
  );
}

export async function AddStakeholderGroupButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stakeholder Group</DialogTitle>
          <DialogDescription>
            If certain groups are missing, you can add them here. Just give them
            a name and a description.
          </DialogDescription>
        </DialogHeader>
        <CreateStakeholderGroupForm />
      </DialogContent>
    </Dialog>
  );
}

export async function AddLocation() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-3 bg-green-600">Add Location</Button>
      </DialogTrigger>
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
  );
}

export async function DeleteStakeholderButton({
  stakeholder,
}: {
  stakeholder: string;
}) {
  const deleteStakeholderWithId = deleteStakeholder.bind(null, stakeholder.id);

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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Stakeholder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-34" // Adjust max-h value as needed
            >
              Are you sure to delete the Stakeholder:{" "}
              <b className="font-bold text-lg font-semibold text-red-600">
                {stakeholder.name} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteStakeholderWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Delete Stakeholder
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    // <form action={deleteStakeholderWithId}>
    //   <button type="submit" className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"><Trash2 className="w-4 text-white" /></button>
    // </form>
  );
}
