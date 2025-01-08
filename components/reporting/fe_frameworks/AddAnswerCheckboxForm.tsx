"use client";

import React, { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { creatanswerAssessment, fetchExistingAnswerForCheckbox } from "@/lib/frameworks/action";
import { getQuestionLogsById } from "@/lib/frameworks/action";
import { DataTable } from "@/components/table/data-table";
import { question_table_log } from "@/components/table/QuestionLogsTableColumns";
import { QuestionComments } from "./QuestionComments";
import { useTranslations } from "next-intl";

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
  FrameworkID:string;
  AssessmentID:string;
}

export default function CreateAnswerCheckboxForm({
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

  // React Hook Form initialization
  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answer: "No", // Default answer is "No"
    },
  });
  useEffect(() => {
    const loadExistingAnswer = async () => {
      if (open) {
        const answerData = await fetchExistingAnswerForCheckbox(QuestionData.id);
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
    formData.append("answer", data.answer);  // Send selected answer ("Yes" or "No")
    formData.append("metadata", JSON.stringify(QuestionData.metadata));

    await creatanswerAssessment(formData, frameworkId,isUpdate,assessmentID);
    setLoading(false);
    closeDialog();
  };

  // Handles checkbox change, setting the answer to "Yes" or "No" based on the checkbox state
  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("answer", checked ? "Yes" : "No");
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

  const t = useTranslations('reporting-com')
  return (
    <>
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
              <strong>{t("fe_frameworks.Help text:")}</strong> {QuestionData?.help_text}
            </p>
          </div>

          <FormField control={form.control} name="answer" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fe_frameworks.Select your answer")}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value === "Yes"} // If "Yes", check the box
                    onCheckedChange={(checked) => handleCheckboxChange(checked)} // Change the answer to "Yes" or "No"
                    className="h-6 w-6"
                  />
                  <span>{field.value === "Yes" ? t("fe_frameworks.Yes") : t("fe_frameworks.No")}</span> {/* Display Yes/No based on checkbox */}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex mt-5">
          <div className="flex-auto">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? t("fe_frameworks.Creating") : t("fe_frameworks.Create Answer")}
            </Button>
          </div>
        </div>
      </form>
      <Tabs defaultValue="comments" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">{t("fe_frameworks.Comments")}</TabsTrigger>
              <TabsTrigger value="activitylog">{t("fe_frameworks.Activity Logs")}</TabsTrigger>
            </TabsList>
            <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
              <TabsContent value="comments">
              <QuestionComments QuestionId={QuestionData.id} frameworkId={FrameworkID} assessmentID={AssessmentID} isOpen={true} />
              </TabsContent>
              <TabsContent value="activitylog">
                <h2 className="font-semibold text-xl mb-3">{t("fe_frameworks.Activity Logs")}</h2>
                <div className="overflow-x-auto max-w-[880px]">
                <DataTable columns={question_table_log} data={Logs} filter={'user'} sort={'Created At'}/>
                </div>
              </TabsContent>
            </div>
          </Tabs>
    </Form>
    </>
  );
}
