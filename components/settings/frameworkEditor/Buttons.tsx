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
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
         Add Framework
        </div>
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
      <div className="px-2 h-7 bg-white rounded-md cursor-pointer flex items-center justify-center text-black text-sm">
        <Trash2 className="w-4 text-black" />
        </div>
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
      <div className="px-2 h-7 bg-white rounded-md cursor-pointer flex items-center justify-center text-black text-sm">
        <Eye className="w-4"/>
        </div>
      </Link>
    </>
  )
}

export function EditFrameworkEditorButton(frameworkData) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="px-2 h-7 bg-white rounded-md cursor-pointer flex items-center justify-center text-black text-sm">
        <Pencil className="w-4 text-black" />
        </div>
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
      <div className="px-2 h-7 bg-white rounded-md cursor-pointer flex items-center justify-center text-black text-sm">
        <Copy className="w-4 text-black" />
        </div>
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
      <div className="px-4 py-2 bg-black text-white font-semibold rounded-md text-sm cursor-pointer hover:bg-gray-800">
            Add Section
            </div>
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
      <div
  className="px-2 bg-blue-600 h-9 hover:bg-blue-900 rounded-md cursor-pointer flex items-center justify-center"
>
  <CopyIcon className="w-4 text-white" />
</div>
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
      <div
        className="px-2 bg-gray-600 h-9 hover:bg-gray-900 rounded-md cursor-pointer flex items-center justify-center"
      >
        <MoveUp className="w-4 text-white" />
      </div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
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
      <div
        className="px-2 bg-gray-500 h-9 hover:bg-gray-900 rounded-md cursor-pointer flex items-center justify-center"
      >
        <MoveDown className="w-4 text-white" />
      </div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
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
        <div className="mb-3 bg-green-600 text-sm text-white font-medium rounded-md px-4 py-2 cursor-pointer hover:bg-green-700">
        Rearrange Questions
        </div>
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