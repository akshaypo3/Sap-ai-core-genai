'use client';

import React, { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { creatanswerAssessment, fetchExistingAnswerForNumeric } from "@/lib/frameworks/action";
import { getQuestionLogsById } from "@/lib/frameworks/action";
import { DataTable } from "@/components/table/data-table";
import { question_table_log } from "@/components/table/QuestionLogsTableColumns";
import { QuestionComments } from "./QuestionComments";

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
  FrameworkID:string;
  AssessmentID:string;
}

export default function CreateAnswerNumericForm({
  open,
  setOpen,
  QuestionData,
  FrameworkID,
  AssessmentID
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetchExistingAnswers, setfetchExistingAnswers] = useState("");
  const [Logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState<'comments' | 'activitylog'>('comments');

  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: fetchExistingAnswers || "", // default value set to an empty string
    },
  });

  useEffect(() => {
    const loadExistingAnswer = async () => {
      if (open) {
        const answerData = await fetchExistingAnswerForNumeric(QuestionData.id);
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

    const answerValue = data.answer;

    const frameworkId=FrameworkID
    const assessmentID=AssessmentID
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("answer", answerValue.toString()); // Convert number to string for formData
    formData.append("metadata", JSON.stringify(QuestionData.metadata));

    await creatanswerAssessment(formData, frameworkId,isUpdate,assessmentID);
    setLoading(false);
    closeDialog();
  };

  const fetchLogs = async () => {
    try {
      const Logs = await getQuestionLogsById(QuestionData.id);
      setLogs(Logs);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
      fetchLogs();
    }, [open]);

  return (
    <>
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
      <Tabs defaultValue="comments" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="activitylog">Activity Log</TabsTrigger>
            </TabsList>
            <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
              <TabsContent value="comments">
                <QuestionComments QuestionId={QuestionData.id} frameworkId={FrameworkID} assessmentID={AssessmentID} isOpen={true} />
              </TabsContent>
              <TabsContent value="activitylog">
                <h2 className="font-semibold text-xl mb-3">Activity Logs</h2>
                <div className="min-w-full table-auto border-collapse">
                  {/* <DataTable columns={columns_task_log} data={Logs} filter={'user'} sort={'Created At'} /> */}
                </div>
              </TabsContent>
            </div>
          </Tabs>
    </Form>
      <DataTable columns={question_table_log} data={Logs} filter={'user'} sort={'Created At'}/>
   </>
  );
}
