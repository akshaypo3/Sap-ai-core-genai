"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface AnswerButtonButtonProps {
  QuestionData: any;
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

export function AnswerButton({ QuestionData}:AnswerButtonButtonProps) {
  const [open, setOpen] = useState(false);
  const type=QuestionData.question_type;
const col=QuestionData.qu_columns;
 QuestionData.qu_columns1=col;

  const renderForm = () => {
    switch (type) {
      case "Text":
        return <CreateAnswerTextForm open={open} setOpen={setOpen} QuestionData={QuestionData} />;
      case "MultipleChoice":
        return <CreateAnswerMultipleChoiceForm open={open} setOpen={setOpen} QuestionData={QuestionData} />;
      case "Checkbox":
        return <CreateAnswerCheckboxForm open={open} setOpen={setOpen} QuestionData={QuestionData} />;
        case "Table":
        return <CreateAnswerTableForm open={open} setOpen={setOpen} QuestionData={QuestionData} />;
      case "Numeric":
      return <CreateAnswerNumericForm open={open} setOpen={setOpen} QuestionData={QuestionData} />;
      default:
        return <div>No form available for this question type</div>;
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Answer {type}</Button>
      </DialogTrigger>
      <DialogContent  className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Answer</DialogTitle>
          <DialogDescription>
            {type}
          </DialogDescription>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}