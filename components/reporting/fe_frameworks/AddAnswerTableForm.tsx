'use client'
 
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { creatanswerAssessmentTable, fetchExistingAnswerForTable } from "@/lib/frameworks/action";
import { getQuestionLogsById } from "@/lib/frameworks/action";
import { DataTable } from "@/components/table/data-table";
import { question_table_log } from "@/components/table/QuestionLogsTableColumns";
import { QuestionComments } from "./QuestionComments";
 
interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
  FrameworkID:string;
  AssessmentID:string;
}
 
export default function CreateAnswerTableForm({
  open,
  setOpen,
  QuestionData,
  FrameworkID,
  AssessmentID
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetchExistingAnswers, setfetchExistingAnswers] = useState([{}]);
  const [Logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState<'comments' | 'activitylog'>('comments');

   // Dynamically create Zod schema based on the columns in QuestionData
   const answerEditorFormSchema = z.object({
    answers: z.array(
      z.object(
        (QuestionData.qu_columns1 || []).reduce((acc, col) => {
          acc[col] = z.string().min(1, { message: `${col} is required.` });
          return acc;
        }, {})
      )
    ).min(1, { message: "At least one row must be entered." }),
  });
 
  // Initialize the form with dynamic default values based on QuestionData
  const form = useForm<z.infer<typeof answerEditorFormSchema>>({
    resolver: zodResolver(answerEditorFormSchema),
    defaultValues: {
      answers: fetchExistingAnswers.length > 0
        ? fetchExistingAnswers
        : [
          (QuestionData.qu_columns1 || []).reduce((acc: any, col: string) => {
              acc[col] = "";
              return acc;
            }, {}),
          ],
    },
  });
 
  useEffect(() => {
    const loadExistingAnswer = async () => {
      if (open) {
        const answerData = await fetchExistingAnswerForTable(QuestionData.id);
        setfetchExistingAnswers(answerData);

        if (answerData.length > 0) {
          form.setValue("answers", answerData);
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      }
    };

    loadExistingAnswer();
  }, [open, QuestionData.id]);
 
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });
 
  const onSubmit = async (data: z.infer<typeof answerEditorFormSchema>) => {
    setLoading(true);
 
   const frameworkId=FrameworkID
    const assessmentID=AssessmentID
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("metadata", JSON.stringify(QuestionData.metadata));
    formData.append("answer",JSON.stringify(data.answers));
 
    await creatanswerAssessmentTable(formData, frameworkId,assessmentID);
    setLoading(false);
    setOpen(false);
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
 
        <div className="mb-4">
          <Button
            onClick={() =>
              append(
                QuestionData?.qu_columns1?.reduce((acc: any, col: string) => {
                  acc[col] = ""; // Start with empty value for each column in new row
                  return acc;
                }, {})
              )
            }
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            Add Row
          </Button>
        </div>
 
        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow>
                {QuestionData?.qu_columns1?.map((column: string, index: number) => (
                  <TableHead key={index} className="px-4 py-2 border border-gray-300">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="px-4 py-2 border border-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={QuestionData?.qu_columns1?.length + 1} className="text-center border border-gray-300">
                    No rows available
                  </TableCell>
                </TableRow>
              ) : (
                fields.map((field, rowIndex) => (
                  <TableRow key={field.id}>
                    {QuestionData?.qu_columns1?.map((column: string, colIndex: number) => (
                      <TableCell key={colIndex} className="px-1 py-1 border border-gray-300">
                        <Controller
                          name={`answers.${rowIndex}.${column}`} // Bind the correct column for each row
                          control={form.control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Enter"
                              className="input-class w-full p-2 border border-gray-300 rounded-md"
                            />
                          )}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="px-4 py-2 border border-gray-300">
                      <Button
                        type="button"
                        onClick={() => remove(rowIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
 
        <div className="flex justify-between mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !form.formState.isValid}
          >
            {loading ? "Creating..." : "Create Answer"}
          </Button>
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
                <div className="">
                <DataTable columns={question_table_log} data={Logs} filter={'user'} sort={'Created At'}/>
                </div>
              </TabsContent>
            </div>
          </Tabs>
    </Form>
    </>
  );
}