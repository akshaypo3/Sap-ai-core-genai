"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { questionFormSchema } from "@/schemas/questionFormSchema"; // Ensure this is the correct path to your schema
import QuestionStep from "./QuestionStep";
import AnswerTypeStep from "./AnswerTypeStep";
import PreviewPanel from "./PreviewPanel";
import { createQuestion } from "@/lib/settings/frameworkEditor/action";

interface QuestionFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  framework_id: string;
  section_id: string;
  section_code: string;
}

export function QuestionFormDialog({
  open,
  setOpen,
  framework_id,
  section_id,
  section_code,
}: QuestionFormDialogProps) {

  // Initialize the form using react-hook-form
  const methods = useForm({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      questionText: "",
      answerType: "Text",
      answerOptions: [],
      isRequired: false,
      minLength: 0,
      maxLength: 100,
      helpText: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Question", "Answer Type", "Preview"];

  // This will handle question creation logic
  const CreateQuestion = async (data) => {
    try {
      
      
      await createQuestion(data);
      setOpen(false); // Close the dialog after creating the question
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  // On form submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("questionText", data.questionText);
    formData.append("answerType", data.answerType);
    formData.append("answerOptions", JSON.stringify(data.answerOptions)); // If answerOptions is an array, you may need to stringify it
    formData.append("helpText", data.helpText || ""); 
    formData.append("isRequired", data.isRequired.toString()); // Make sure boolean values are converted to strings
    formData.append("minLength", data.minLength.toString()); // Convert number values to strings
    formData.append("maxLength", data.maxLength.toString());
    formData.append("framework_id", framework_id);
    formData.append("section_id", section_id);
    formData.append("section_code", section_code);
    try {
      await CreateQuestion(formData);
    } catch (error) {
      console.error("Error during question creation:", error);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };


  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (open) {
      setCurrentStep(0); 
      methods.reset();
    }
  }, [open, methods, framework_id, section_id, section_code]); 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button>Add Question</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>
            Add a new question with dynamic answer type configuration.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 0 && <QuestionStep />}
            {currentStep === 1 && <AnswerTypeStep />}
            {currentStep === 2 && <PreviewPanel />}

            
            <div className="flex justify-between mt-5">
              <Button type="button" onClick={goToPreviousStep} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button type="button" onClick={goToNextStep} disabled={currentStep === steps.length - 1}>
                Next
              </Button>
            </div>

            
            {currentStep === steps.length - 1 && (
              <Button type="submit" className="mt-5" disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
