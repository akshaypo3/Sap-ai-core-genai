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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { creatanswerAssessmentTable } from "@/lib/frameworks/action";

interface AnswerFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  QuestionData: any;
}

export default function CreateAnswerTableForm({
  open,
  setOpen,
  QuestionData,
}: AnswerFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Check if QuestionData is available
  if (!QuestionData?.qu_columns1 || QuestionData.qu_columns1.length === 0) {
    console.error("Error: No columns available in QuestionData");
    return <div>No columns found</div>;
  }

  // Dynamically create Zod schema based on the columns in QuestionData
  const answerEditorFormSchema = z.object({
    answers: z.array(
      z.object(
        QuestionData.qu_columns1.reduce((acc, col) => {
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
      answers: [
        QuestionData.qu_columns1.reduce((acc: any, col: string) => {
          acc[col] = ""; // Initialize empty value for each column
          return acc;
        }, {}),
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const onSubmit = async (data: z.infer<typeof answerEditorFormSchema>) => {
    setLoading(true);

    // Log the form data for debugging
    console.log("Form Data:", data);
    const frameworkId = "807a68a7-3160-4b0b-871c-e8183daddf86";
    const formData = new FormData();
    formData.append("assessment_id", QuestionData.assessment_id);
    formData.append("id", QuestionData.id);
    formData.append("metadata", JSON.stringify(QuestionData.metadata));
    formData.append("answer",JSON.stringify(data.answers));

    await creatanswerAssessmentTable(formData, frameworkId);
    setLoading(false);
    setOpen(false);
  };

  return (
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
    </Form>
  );
}
