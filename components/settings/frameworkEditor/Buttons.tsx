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
import Link from "next/link";
import { Copy, Pencil, Trash2, TrashIcon, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import UpdateFrameworkEditorForm from "./EditFrameworkForm";
import DuplicateFrameworkEditorForm from "./DuplicateFrameworkForm";
import AddQuestionsForm from "./AddQuestionsForm";
interface DuplicateFrameworkEditorButtonProps {
  userId: string;
  frameworkData: any; // Define a more specific type if necessary
}

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
export function AddQuestion({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Questions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Questions</DialogTitle>
          <DialogDescription>
            Add Questions Function Description
          </DialogDescription>
        </DialogHeader>
        <AddQuestionsForm userId={userId} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteFrameworkEditorButton({
  frameworkId,
}: {
  frameworkId: any;
}) {
  const deleteFrameworkWithId = deleteFramework.bind(null, frameworkId.id);

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

export function ViewFrameworkButton({ frameworkId }: { frameworkId: string }) {
  return (
    <>
      <Link href={`/settings/frameworkEditor/${frameworkId}`}>
        <Button className="bg-gray-100 hover:bg-gray-400 text-black"><Eye/></Button>
      </Link>
    </>
  )
}

export function EditFrameworkEditorButton(frameworkData) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <Button
          className="px-2 bg-green-600 h-7 hover:bg-green-900 dark:bg-green-500 dark:hover:bg-green-600 rounded-md"
        >
          <Pencil className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Framework</DialogTitle>
          <DialogDescription>
            Edit Framework Function Description
          </DialogDescription>
        </DialogHeader>
        <UpdateFrameworkEditorForm open={open} setOpen={setOpen} frameworkData={frameworkData.frameworkData} />
      </DialogContent>
    </Dialog>
  );
}

export function DuplicateFrameworkEditorButton({ userId, frameworkData }: DuplicateFrameworkEditorButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <DialogTrigger>
      <Button
          className="px-2 bg-blue-600 h-7 hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
        >
          <Copy className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Framework</DialogTitle>
          <DialogDescription>
            Add Framework Function Description
          </DialogDescription>
        </DialogHeader>
        <DuplicateFrameworkEditorForm userId={userId} open={open} setOpen={setOpen} frameworkData={frameworkData}/>
      </DialogContent>
    </Dialog>
  );
}