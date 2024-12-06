"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { creatanswerAssessment, fetchExistingAnswerForText } from "@/lib/frameworks/action";


export const answerEditorFormSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Answer is required." })
    .max(255, { message: "Answer must not exceed 255 characters." }),
});

interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
  FrameworkID:string;
  AssessmentID:string;
}

export default function CreateAnswerTextForm({
  open,
  setOpen,
  QuestionData,
  FrameworkID,
  AssessmentID
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetchExistingAnswers, setfetchExistingAnswers] = useState("");


  
  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: "",
    },
  });
  useEffect(() => {
    const loadExistingAnswer = async () => {
      if (open) {
        const answerData = await fetchExistingAnswerForText(QuestionData.id);
        setfetchExistingAnswers(answerData);

        if (answerData) {
          form.setValue("answer", answerData);
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      }
    };

    loadExistingAnswer();
  }, [open, QuestionData.id, form]);
 
  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  
  const onSubmit = async (data: z.infer<typeof answerEditorFormSchema>) => {
    setLoading(true);

    const frameworkId=FrameworkID
    const assessmentID=AssessmentID
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("answer", data.answer);
    formData.append("metadata", JSON.stringify(QuestionData.metadata));
  
    await creatanswerAssessment(formData,frameworkId,isUpdate,assessmentID)
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
            <p><strong> i </strong>Help text: {QuestionData?.help_text}</p>
          </div>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <ReactQuill
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Enter your answer..."
                    modules={{
                      toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                      ],
                    }}
                    style={{
                        height: "200px",
                        marginBottom: "45px"
                      }}
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
