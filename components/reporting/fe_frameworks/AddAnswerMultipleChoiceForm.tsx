"use client";

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

export const answerEditorFormSchema = z.object({
  answer: z
    .array(z.string().min(1, { message: "At least one answer must be selected." }))
    .min(1, { message: "Answer is required." })
    .max(255, { message: "Answer must not exceed 255 characters." }),
});

interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
}

export default function CreateAnswerMultipleChoiceForm({
  open,
  setOpen,
  QuestionData,
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);

  const options = QuestionData.answer_config;

  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: [],
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
    formData.append("answer", data.answer.join(", "));  // Convert array to string for submission
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
              <FormLabel>Select your answers</FormLabel>
              <FormControl>
                <div>
                  {options?.map((option: string, index: number) => (
                    <div key={index} className="mb-2">
                      <label>
                        <input
                          type="checkbox"
                          name="answer"
                          value={option}
                          onChange={(e) => {const newValue = e.target.checked
                              ? [...field.value, option]
                              : field.value.filter((val: string) => val !== option);
                            field.onChange(newValue);
                          }}
                          checked={field.value.includes(option)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
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
