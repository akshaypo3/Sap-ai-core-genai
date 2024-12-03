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
import AnswerTypeStep from "./AnswerTypeStep";
import PreviewPanel from "./PreviewPanel";
import { createQuestion } from "@/lib/settings/frameworkEditor/action";
import QuestionStep from "./QuestionStepSectionArray";
import { questionFormSecSchema } from "@/schemas/questionFormSchemaSec";

interface Section {
  section_id: string;
  section_code: string;
  section_name: string;
}

interface QuestionFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  framework_id: string;
  sections: Section[]; // Array of sections
}

export function QuestionFormSectionDialog({
  open,
  setOpen,
  framework_id,
  sections,
}: QuestionFormDialogProps) {
  const methods = useForm({
    resolver: zodResolver(questionFormSecSchema),
    defaultValues: {
      questionText: "",
      answerType: "Text",
      answerOptions: [],
      answerOptionsTable:[],
      isRequired: false,
      minLength: 0,
      maxLength: 100,
      helpText: "",
      section: null, // This will store the selected section
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Question", "Answer Type", "Preview"];
  

  const CreateQuestion = async (data) => {
    try {
      await createQuestion(data);
      setOpen(false); // Close the dialog after creating the question
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("questionText", data.questionText);
    formData.append("answerType", data.answerType);
    formData.append("answerOptions", JSON.stringify(data.answerOptions)); // If answerOptions is an array, you may need to stringify it
    formData.append("answerOptionsTable", JSON.stringify(data.answerOptionsTable)); 
    formData.append("helpText", data.helpText || "");
    formData.append("isRequired", data.isRequired.toString()); // Convert boolean to string
    formData.append("minLength", data.minLength.toString()); // Convert number to string
    formData.append("maxLength", data.maxLength.toString());

    // Pass selected section data (section_id and section_code)
    if (data.section) {
      formData.append("section_id", data.section.section_id);
      formData.append("section_code", data.section.section_code);
    }

    formData.append("framework_id", framework_id);
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
  }, [open, methods, framework_id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600">Add Question</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>
            Add a new question with dynamic answer type configuration.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {currentStep === 0 && <QuestionStep sections={sections} />}
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
