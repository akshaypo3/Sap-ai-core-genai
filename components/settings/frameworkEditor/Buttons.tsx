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
import { Copy, Pencil, Trash2, TrashIcon, Eye, CopyIcon, MoveUp, MoveDown} from "lucide-react";
import { Label } from "@/components/ui/label";
import UpdateFrameworkEditorForm from "./EditFrameworkForm";
import DuplicateFrameworkEditorForm from "./DuplicateFrameworkForm";
import RearrangeQuestionList from "./RearrangeQuestions";
import AddQuestionsForm from "./AddQuestionsForm";

import CreateSectionEditorForm from "./CreateSectionForm";
import { UUID } from "crypto";
import EditSectionEditorForm from "./EditSectionForm";
import { QuestionFormDialog } from "./CreateQuestionForm";
import { QuestionFormSectionDialog } from "./CreateQuestionFormSectionArray";
import DuplicateQuestionForm from "./DuplicateQuestionForm";
import { UpwardDownwardQuestionFormDialog } from "./UpwardDownwardQuestionForm";

interface DuplicateFrameworkEditorButtonProps {
  userId: string;
  frameworkData: any;
}
interface CreateQuestionFormDialogProps {
  framework_id: string;
  section_id: string;
  section_code: string;
}
interface DuplicateQuestionButtonProps {
  questionData: any;
  sections: any;
}

interface AddSectionButtonProps {
  parentSections: UUID;
  frameworkId: string;     
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;   
}

interface EditSectionButtonProps {
  sectionData: {
    section_code: string;
    name: string;
    description: string;
    is_required: boolean;
    metadata: string;
    parent_section_id: UUID | null;
    framework_id: UUID;
    id: UUID; 
  },
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface UpwardDownWardProps {
  framework_id: string;
  section_id: string;
  section_code: string;
  questionData: any;
  key1: string
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
        <Button className="px-2 h-7 bg-gray-200 hover:bg-gray-400 text-black">
          <Eye className="w-4"/>
        </Button>
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

export function AddSectionButton({ parentSections, frameworkId, isOpen, setIsOpen }: AddSectionButtonProps) {
  // const [open, setOpen] = useState(false);
  return (
    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger>
        <Button>Add Section</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Section</DialogTitle>
          <DialogDescription>
            Add Section Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateSectionEditorForm open={isOpen} setOpen={setIsOpen} parentSections={parentSections} frameworkId={frameworkId}/>
      </DialogContent>
    </Dialog>
  );
}

export function EditSectionButton({ sectionData, isOpen, setIsOpen }: EditSectionButtonProps) {
 // const [open, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
   {/* <DialogTrigger>
        <Button>Edit Section</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            Modify the details of the selected section
          </DialogDescription>
        </DialogHeader>
        <EditSectionEditorForm 
         open={isOpen}
         setOpen={setIsOpen}
         sectionData={sectionData}
        />
      </DialogContent>
    </Dialog>
  );
}



export default function CreateQuestionPage({ framework_id,section_id,section_code}: CreateQuestionFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <QuestionFormDialog open={open} setOpen={setOpen} framework_id={framework_id} section_id={section_id} section_code={section_code}/>
    </div>
  );
}

export function CoreAddSectionButton({ parentSections, frameworkId}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add Section</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Section</DialogTitle>
          <DialogDescription>
            Add Section Function Description
          </DialogDescription>
        </DialogHeader>
        <CreateSectionEditorForm open={open} setOpen={setOpen} parentSections={parentSections} frameworkId={frameworkId}/>
      </DialogContent>
    </Dialog>
  );
}

export function DuplicateQuestion({ questionData, sections }: DuplicateQuestionButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
       <Button
        variant="outline"
        color="blue"
        className="px-2 bg-blue-600 h-9 hover:bg-blue-900 rounded-md"
        >
        <CopyIcon className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
          <DialogDescription>
            Add Question Function Description
          </DialogDescription>
        </DialogHeader>
        <DuplicateQuestionForm open={open} setOpen={setOpen} questionData={questionData} sections={sections}/>
      </DialogContent>
    </Dialog>
  );
}

export function AddQuestionUpward({framework_id, section_code, section_id, questionData, key1}:UpwardDownWardProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <Button
        variant="outline"
        color="blue"
        className="px-2 bg-gray-600 h-9 hover:bg-gray-900 rounded-md"
        ><MoveUp className="w-4 text-white"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
          <DialogDescription>
            Add Question Function Description
          </DialogDescription>
        </DialogHeader>
        <UpwardDownwardQuestionFormDialog open={open} setOpen={setOpen} framework_id={framework_id} section_id={section_id} section_code={section_code} questionData={questionData} key1={key1}/>
      </DialogContent>
    </Dialog>
  );
}

export function AddQuestionDownward({framework_id, section_code, section_id, questionData, key1}:UpwardDownWardProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
        variant="outline"
        color="blue"
        className="px-2 bg-gray-500 h-9 hover:bg-gray-900 rounded-md"><MoveDown className="w-4 text-white"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
          <DialogDescription>
            Add Question Function Description
          </DialogDescription>
        </DialogHeader>
        <UpwardDownwardQuestionFormDialog open={open} setOpen={setOpen} framework_id={framework_id} section_id={section_id} section_code={section_code} questionData={questionData} key1={key1}/>
      </DialogContent>
    </Dialog>
  );
}

export function RearrangeQuestions({questionData, framework_id}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-green-600">
          Rearrange Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1100px] w-full">
        <DialogHeader>
          <DialogTitle>Rearrange Questions</DialogTitle>
          <DialogDescription>
           Question Rearrange Function
          </DialogDescription>
        </DialogHeader>
        <RearrangeQuestionList questionData={questionData} framework_id={framework_id} open={open} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  );
}