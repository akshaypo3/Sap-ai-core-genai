"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateActiveAssessmentForm from "./ActiveAssessmentForm";
import { useState } from "react";
import CreateAnswerTextForm from "./AddAnswerTextForm";
import CreateAnswerMultipleChoiceForm from "./AddAnswerMultipleChoiceForm";
import CreateAnswerYesNoForm from "./AddAnswerCheckboxForm";
import CreateAnswerCheckboxForm from "./AddAnswerCheckboxForm";
import CreateAnswerTableForm from "./AddAnswerTableForm";
import CreateAnswerNumericForm from "./AddAnswerNumericForm";
import { deleteQuestionCommentDialog } from "@/lib/frameworks/action";
import { TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AnswerButtonButtonProps {
  QuestionData: any;
  AssessmentID:string;
  FrameworkID:string;
}

export function ActiveFrameworkAssessmentButton({
  framework,
  frameworkId,
}: {
  framework: string;
  frameworkId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Create Assessment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Assessment</DialogTitle>
          <DialogDescription>
            New Assessment function description
          </DialogDescription>
        </DialogHeader>
        <CreateActiveAssessmentForm
          open={open}
          setOpen={setOpen}
          framework={framework}
          frameworkId={frameworkId}
        />
      </DialogContent>
    </Dialog>
  );
}

export function AnswerButton({ QuestionData,FrameworkID,AssessmentID}:AnswerButtonButtonProps) {
  const [open, setOpen] = useState(false);
  const type=QuestionData.question_type;
const col=QuestionData.qu_columns;
 QuestionData.qu_columns1=col;
  const renderForm = () => {
    switch (type) {
      case "Text":
        return <CreateAnswerTextForm open={open} setOpen={setOpen} QuestionData={QuestionData} FrameworkID={FrameworkID} AssessmentID={AssessmentID} />;
      case "MultipleChoice":
        return <CreateAnswerMultipleChoiceForm open={open} setOpen={setOpen} QuestionData={QuestionData} FrameworkID={FrameworkID} AssessmentID={AssessmentID}/>;
      case "Checkbox":
        return <CreateAnswerCheckboxForm open={open} setOpen={setOpen} QuestionData={QuestionData} FrameworkID={FrameworkID} AssessmentID={AssessmentID}/>;
        case "Table":
        return <CreateAnswerTableForm open={open} setOpen={setOpen} QuestionData={QuestionData} FrameworkID={FrameworkID} AssessmentID={AssessmentID}/>;
      case "Numeric":
      return <CreateAnswerNumericForm open={open} setOpen={setOpen} QuestionData={QuestionData} FrameworkID={FrameworkID} AssessmentID={AssessmentID}/>;
      default:
        return <div>No form available for this question type</div>;
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Answer</Button>
      </DialogTrigger>
      <DialogContent  className="sm:max-w-[1000px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Answer</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}

export function DeleteQuestionCommentButtonDialog({
  commentId,
  frameworkId,
  assessmentID,
  fetchtherequireddata
}: {
  commentId: string;
  frameworkId: string;
  assessmentID:string;
  fetchtherequireddata:() => void;
}) {
  //const deleteCommentWithId = deleteQuestionCommentDialog.bind(null, commentId.id, frameworkId,assessmentID);
  
  const deleteCommentWithId = async () => {
    try {
      await deleteQuestionCommentDialog(commentId.id, frameworkId, assessmentID);
      fetchtherequireddata();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

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
          <DialogTitle className="text-center">Delete comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 py-1">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-center overflow-hidden max-h-32" // Adjust max-h value as needed
            >
              Are you sure to delete the comment:{" "}
              <b className="font-bold text-lg font-semibold text-red-600">
                {commentId.comment} <span className="text-black">?</span>
              </b>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="flex justify-end space-x-2 mt-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <form action={deleteCommentWithId}>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Delete Comment
                </Button>
              </DialogClose>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}