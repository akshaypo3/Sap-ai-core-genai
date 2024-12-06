'use client';

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { creatanswerAssessment } from "@/lib/frameworks/action";

// Updated schema to allow both positive and negative decimal numbers
export const answerEditorFormSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Value is required" })
    .refine(value => !isNaN(parseFloat(value)), {
      message: "Must be a valid number",
    })
    .transform(value => parseFloat(value)) // Convert to a number after validation
});

interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
}

export default function CreateAnswerNumericForm({
  open,
  setOpen,
  QuestionData,
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: "", // default value set to an empty string
    },
  });

  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const onSubmit = async (data: z.infer<typeof answerEditorFormSchema>) => {
    setLoading(true);

    // Since we already transform and parse the value above, it's now a valid number
    const answerValue = data.answer;

    const frameworkId = "807a68a7-3160-4b0b-871c-e8183daddf86";
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("answer", answerValue.toString()); // Convert number to string for formData
    formData.append("metadata", JSON.stringify(QuestionData.metadata));

    await creatanswerAssessment(formData, frameworkId);
    setLoading(false);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <div className="mb-4">
            <p><strong>{QuestionData?.question_text}</strong></p>
          </div>
          <div className="mb-4">
            <p><strong>i</strong> Help text: {QuestionData?.help_text}</p>
          </div>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    placeholder="Enter your numeric answer"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
