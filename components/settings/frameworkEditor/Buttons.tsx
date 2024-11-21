"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CreateFrameworkEditorForm from "./CreateFrameworkForm";
import { deleteFramework } from "@/lib/settings/frameworkEditor/action";
import { TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

export function AddFrameworkEditorButton({userId}:{userId:string}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add Framework</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Framework</DialogTitle>
          <DialogDescription>
            Add Framework Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateFrameworkEditorForm userId={userId} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteFrameworkEditorButton({
  frameworkId,
}: {
  frameworkId: any;
}) {
  const deleteFrameworkWithId = deleteFramework.bind(null, frameworkId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete framework</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-32" 
            >
              Are you sure to delete the framework:{" "}
              <b className="text-lg font-semibold text-red-600">
                {frameworkId.name} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteFrameworkWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Delete Framework
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}