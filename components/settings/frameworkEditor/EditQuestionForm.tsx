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
import { updateQuestion } from "@/lib/settings/frameworkEditor/action";
import { Pencil } from "lucide-react";

interface QuestionFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  existingData: any; // Accept the existing data (question data to edit)
}

export function EditQuestionFormDialog({
  open,
  setOpen,
  existingData, // Accept the existing data
}: QuestionFormDialogProps) {
  const methods = useForm({
    resolver: zodResolver(questionFormSchema),
    defaultValues: { 
      questionText: existingData?.question_text || '',
      answerType: existingData?.question_type || "Text", // Default value for answer type
      answerOptions: existingData?.answer_config || [], // Use existing options if available
      isRequired: existingData?.is_required || false, // Use existing value if available
      minLength: existingData?.validation_rules[0]?.min || 0,
      maxLength: existingData?.validation_rules[1]?.max || 100,
      helpText: existingData?.help_text || "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Question", "Answer Type", "Preview"];

  const onSubmit = async (data) => {
  
    try {
      const updateData = {
        ...data,
        framework_id: existingData.framework_id,
        section_id: existingData.section_id,
        section_code: existingData.section_code,
        id: existingData.id,
      };

      const formData = new FormData();
      formData.append("questionText", updateData.questionText);
      formData.append("answerType", updateData.answerType);

      // Ensure answerOptions is serialized as a string if it is an array
      if (Array.isArray(updateData.answerOptions)) {
        formData.append("answerOptions", JSON.stringify(updateData.answerOptions));
      } else {
        formData.append("answerOptions", JSON.stringify([])); // Empty array if not provided
      }

      formData.append("helpText", updateData.helpText || "");
      formData.append("isRequired", updateData.isRequired.toString()); // Convert boolean to string
      formData.append("minLength", updateData.minLength.toString()); // Convert number to string
      formData.append("maxLength", updateData.maxLength.toString());
      formData.append("id", updateData.id);
      formData.append("framework_id", updateData.framework_id);

      console.log("Form Data Before Submit:", formData); // Log form data to debug

      await updateQuestion(formData);
      setOpen(false); // Close the dialog after submitting
    } catch (error) {
      console.error("Error during question update:", error);
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

  // Reset form values when dialog opens and existingData changes
  useEffect(() => {
    if (open && existingData) {
      setCurrentStep(0);

      // Log existing data to ensure it has the expected values
      console.log("Existing Data on Open:", existingData);

      methods.reset({
        questionText: existingData?.question_text || '',
        answerType: existingData?.question_type || 'Text',
        answerOptions: existingData?.answer_config || [], // Ensure this is an array
        isRequired: existingData?.is_required || false,
        minLength: existingData?.validation_rules?.[0]?.min || 0,
        maxLength: existingData?.validation_rules?.[1]?.max || 100,
        helpText: existingData?.help_text || "",
      });

      // Check if reset worked and answerOptions is an array
      console.log("Form state after reset:", methods.getValues());
    }
  }, [open, existingData, methods]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button
          type="button"
          className="px-2 bg-green-600 h-9 hover:bg-green-900 rounded-md"
        >
          <Pencil className="w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Update an existing question with dynamic answer type configuration.
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
                {methods.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
