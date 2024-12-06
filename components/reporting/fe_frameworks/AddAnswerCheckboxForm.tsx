"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { creatanswerAssessment } from "@/lib/frameworks/action";

// Validation schema ensuring that the answer is either "Yes" or "No"
export const answerEditorFormSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Answer is required." })
    .refine((val) => val === "Yes" || val === "No", {
      message: "You must select either Yes or No",
    }),
});

interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
}

export default function CreateAnswerCheckboxForm({
  open,
  setOpen,
  QuestionData,
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);

  // React Hook Form initialization
  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: "No", // Default answer is "No"
    },
  });

  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const onSubmit = async (data: z.infer<typeof answerEditorFormSchema>) => {
    setLoading(true);

    const frameworkId = "807a68a7-3160-4b0b-871c-e8183daddf86";
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("answer", data.answer);  // Send selected answer ("Yes" or "No")
    formData.append("metadata", JSON.stringify(QuestionData.metadata));

    await creatanswerAssessment(formData, frameworkId);
    setLoading(false);
    closeDialog();
  };

  // Handles checkbox change, setting the answer to "Yes" or "No" based on the checkbox state
  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("answer", checked ? "Yes" : "No");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <div className="mb-4">
            <p>
              <strong>{QuestionData?.question_text}</strong>
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Help text:</strong> {QuestionData?.help_text}
            </p>
          </div>

          <FormField control={form.control} name="answer" render={({ field }) => (
            <FormItem>
              <FormLabel>Select your answer</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value === "Yes"} // If "Yes", check the box
                    onCheckedChange={(checked) => handleCheckboxChange(checked)} // Change the answer to "Yes" or "No"
                    className="h-6 w-6"
                  />
                  <span>{field.value === "Yes" ? "Yes" : "No"}</span> {/* Display Yes/No based on checkbox */}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex mt-5">
          <div className="flex-auto">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Answer"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
